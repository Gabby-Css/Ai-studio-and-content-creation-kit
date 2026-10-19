"""Back up everything that is NOT in git (videos, audio, renders, assets...) to GitHub Releases of a PRIVATE repo.

Why: GitHub blocks files > 100 MiB in git and recommends repos < 1 GB, but release assets have no total-size / bandwidth limit
(each file must be < 2 GiB, <= 1000 assets per release). So the media is split into ~100 MB zip parts (bigger files are cut into 100 MB chunks) and uploaded as release assets.

    python tools/backup_media_to_github.py --dry-run          # list tiers / sizes, upload nothing
    python tools/backup_media_to_github.py                    # upload (resumable: finished parts are skipped)
    python tools/backup_media_to_github.py --tier 1           # only the final videos

Tiers (most valuable first): 1 = final videos, 2 = audio masters / stems, 3 = everything else.
Skipped on purpose: node_modules, virtualenvs, third-party checkouts, caches (tok/, cache/), temp / snapshot / QA folders,
raw duplicates of finished renders, reference plates of unclear origin, and anything that looks like a secret.
Restore: download the parts of a tier and unzip the *.zip parts into the project root (paths are relative); for a big file cut into
*.partNNN chunks, join them in order (`cat name.part* > original_file`; see MANIFEST-*.json for the original path and sha256).
State lives in .backup_state/ (git-ignored).  Needs: gh CLI logged in, Python 3.9+."""
import argparse, hashlib, json, os, re, subprocess, sys, time, zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATE = os.path.join(ROOT, ".backup_state")
PARTS = os.path.join(STATE, "parts")
TIERS = {1: ("tier1-final-videos", "Final videos (season finals, episode finals, lesson renders)"),
         2: ("tier2-audio", "Audio masters, stems and mixes"),
         3: ("tier3-other", "Everything else not in git (assets, per-episode voice lines, samples, covers, data)")}
SKIP_DIRS = {"node_modules", ".git", "__pycache__", ".backup_state"}
SKIP_PREFIX = ("tools/sxenv/", "tools/SoulX-Singer/", "references/plates/")          # venv, third-party clone, plates of unclear origin
SKIP_PARTS = ("/tok/", "/cache/", "tmp/", "/_prev", "/_backup", ".hf-transaction")  # caches / temp / old backups
SNAP_RE = re.compile(r"^(snap[A-Za-z0-9_]*|qa[0-9]*)$")
SECRET_HINT = (".env", ".pem", ".key", "credential", "secret", "token", "settings.local.json", "id_rsa")
STORE_EXT = {".mp4", ".png", ".jpg", ".jpeg", ".mp3", ".zip", ".woff2", ".webp"}      # already compressed: store; wav/npz/others get deflate


def lower_priority():
    if os.name == "nt":
        import ctypes
        ctypes.windll.kernel32.SetPriorityClass(ctypes.windll.kernel32.GetCurrentProcess(), 0x00004000)   # BELOW_NORMAL


def tracked_files():
    out = subprocess.run(["git", "ls-files", "-z"], cwd=ROOT, capture_output=True, check=True).stdout.decode("utf-8", "replace")
    return set(p for p in out.split("\0") if p)


def skipped(rel):
    low = rel.lower()
    if rel.startswith(SKIP_PREFIX) or any(s in "/" + low for s in SKIP_PARTS) or low.endswith(".pyc"):
        return True
    segs = rel.split("/")
    if any(SNAP_RE.match(sg) for sg in segs[:-1]):                       # snapshot / QA frame folders (snapS, snap_x, qa, qa6 ...)
        return True
    name = segs[-1].lower()
    if any(h in name for h in SECRET_HINT):
        return True
    # raw render duplicates: bo-and-the-pancake-N.mp4 when a -final exists next to it
    if "/output/" in rel and name.startswith("bo-and-the-pancake-") and name.endswith(".mp4") and "-final" not in name and "576x1024" not in name:
        return True
    return False


def tier_of(rel):
    ext = os.path.splitext(rel)[1].lower()
    if ext == ".mp4" or "_final/" in rel:
        return 1
    if ext in (".wav", ".mp3", ".flac", ".npz") and "/audio/" in rel:
        return 2
    return 3


def collect():
    tracked = tracked_files()
    files = {1: [], 2: [], 3: []}
    for dp, dns, fns in os.walk(ROOT):
        reld = os.path.relpath(dp, ROOT).replace("\\", "/")
        dns[:] = [d for d in dns if d not in SKIP_DIRS and not ((reld + "/" + d).lstrip("./") + "/").startswith(SKIP_PREFIX)]
        for fn in fns:
            rel = (fn if reld == "." else reld + "/" + fn)
            if rel in tracked or skipped(rel):
                continue
            try:
                size = os.path.getsize(os.path.join(ROOT, rel))
            except OSError:
                continue
            files[tier_of(rel)].append((rel, size))
    for t in files:
        files[t].sort()
    return files


def make_parts(items, part_bytes):
    """-> list of ("zip", [(rel, size), ...]) groups (< part_bytes raw) and ("big", rel, size) entries for files >= part_bytes,
    which are uploaded as raw chunks of part_bytes (rejoin with `cat <name>.part* > file`). Small parts matter: GitHub's upload server
    drops a single request that stays open for ~6 minutes, so on a slow uplink every asset must finish in a few minutes."""
    parts, cur, cur_size = [], [], 0
    for rel, size in items:
        if size >= part_bytes:
            if cur:
                parts.append(("zip", cur)); cur, cur_size = [], 0
            parts.append(("big", rel, size)); continue
        if cur and cur_size + size > part_bytes:
            parts.append(("zip", cur)); cur, cur_size = [], 0
        cur.append((rel, size)); cur_size += size
    if cur:
        parts.append(("zip", cur))
    return parts


def safe_name(rel):
    return "".join(c if c.isalnum() or c in "-_." else "_" for c in rel.replace("/", "__"))[-150:]


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def upload(repo, tag, path):
    for attempt in range(1, 9):
        r = sh(["gh", "release", "upload", tag, path, "--repo", repo, "--clobber"], check=False)
        if r.returncode == 0:
            return True
        print(f"  upload attempt {attempt} failed: {r.stderr.strip()[:160]}", flush=True)
        time.sleep(min(120, 15 * attempt))
    return False


def sh(cmd, check=True, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, check=check, **kw)


def ensure_repo(repo):
    if sh(["gh", "repo", "view", repo], check=False).returncode != 0:
        print("creating PRIVATE repo", repo)
        sh(["gh", "repo", "create", repo, "--private", "--add-readme", "--description",
            "Private backup of large media (release assets) for the AI studio kit - not source code"])
    vis = sh(["gh", "repo", "view", repo, "--json", "visibility", "--jq", ".visibility"]).stdout.strip()
    if vis != "PRIVATE":
        sys.exit(f"refusing to upload: {repo} is {vis}, not PRIVATE")


def ensure_release(repo, tag, title):
    if sh(["gh", "release", "view", tag, "--repo", repo], check=False).returncode != 0:
        sh(["gh", "release", "create", tag, "--repo", repo, "--title", title, "--notes",
            f"{title}. Parts are zips of paths relative to the project root (unzip into the project root); *.partNNN files are chunks of one big file (cat in order). See MANIFEST-*.json."])


def build_zip(path, files):
    with zipfile.ZipFile(path, "w", allowZip64=True) as z:
        for rel, _ in files:
            ap = os.path.join(ROOT, rel)
            if not os.path.exists(ap):
                continue
            comp = zipfile.ZIP_STORED if os.path.splitext(rel)[1].lower() in STORE_EXT else zipfile.ZIP_DEFLATED
            try:
                z.write(ap, rel, compress_type=comp, compresslevel=6 if comp == zipfile.ZIP_DEFLATED else None)
            except OSError as e:
                print("  skipped (unreadable / being written):", rel, e)
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", default="Gabby-Css/ai-studio-media-backup")
    ap.add_argument("--tier", type=int, choices=(1, 2, 3))
    ap.add_argument("--part-mb", type=int, default=100)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    lower_priority()
    os.makedirs(PARTS, exist_ok=True)
    files = collect()
    plan = {t: make_parts(files[t], a.part_mb * 1024 * 1024) for t in files}
    for t in (1, 2, 3):
        raw = sum(s for _, s in files[t])
        nassets = sum(1 if e[0] == "zip" else -(-e[2] // (a.part_mb * 1024 * 1024)) for e in plan[t])
        print(f"tier {t} {TIERS[t][0]:22s} {len(files[t]):5d} files  {raw / 2**30:6.2f} GB raw  -> {nassets:3d} release assets")
    if a.dry_run:
        return
    state_file = os.path.join(STATE, "state.json")
    state = json.load(open(state_file)) if os.path.exists(state_file) else {"done": {}}
    ensure_repo(a.repo)
    sent = 0
    for t in ([a.tier] if a.tier else [1, 2, 3]):
        tag, title = TIERS[t]
        ensure_release(a.repo, tag, title)
        manifest = state.setdefault("manifest", {}).setdefault(tag, {})
        zi = bi = 0
        for entry in plan[t]:
            if entry[0] == "zip":
                zi += 1
                name = f"{tag}-{zi:03d}.zip"
                work = [(name, entry[1], None)]
            else:
                bi += 1
                _, rel, fsize = entry
                n = -(-fsize // (a.part_mb * 1024 * 1024))
                work = [(f"{tag}-big{bi:02d}-{safe_name(rel)}.part{j:03d}", rel, (j, n)) for j in range(1, n + 1)]
            for name, src, chunk in work:
                if state["done"].get(name):
                    continue
                zp = os.path.join(PARTS, name)
                if chunk is None:
                    print(f"[{time.strftime('%H:%M:%S')}] building {name} ({len(src)} files, {sum(s for _, s in src) / 2**20:.0f} MB raw)", flush=True)
                    digest = build_zip(zp, src)
                    info = {"files": [r_ for r_, _ in src]}
                else:
                    j, n = chunk
                    print(f"[{time.strftime('%H:%M:%S')}] cutting {name} (chunk {j}/{n} of {src})", flush=True)
                    with open(os.path.join(ROOT, src), "rb") as f, open(zp, "wb") as o:
                        f.seek((j - 1) * a.part_mb * 1024 * 1024); o.write(f.read(a.part_mb * 1024 * 1024))
                    digest = sha256_file(zp)
                    info = {"source": src, "chunk": j, "of": n}
                size = os.path.getsize(zp)
                if not upload(a.repo, tag, zp):
                    print("  GIVING UP on", name, "- rerun the script to resume", flush=True); sys.exit(1)
                manifest[name] = {"bytes": size, "sha256": digest, **info}
                state["done"][name] = True
                json.dump(state, open(state_file, "w"), indent=1)
                os.remove(zp)
                sent += size
                print(f"[{time.strftime('%H:%M:%S')}] uploaded {name} ({size / 2**20:.0f} MB, total {sent / 2**30:.2f} GB this run)", flush=True)
        mpath = os.path.join(STATE, f"MANIFEST-{tag}.json")
        json.dump(manifest, open(mpath, "w"), indent=1)
        sh(["gh", "release", "upload", tag, mpath, "--repo", a.repo, "--clobber"], check=False)
    print("DONE", time.strftime("%H:%M:%S"), flush=True)


if __name__ == "__main__":
    main()
