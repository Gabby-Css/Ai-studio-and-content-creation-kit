#!/usr/bin/env python
"""Stage 2: pure ffmpeg silence classification. Reads sc_raw.json (written by
`resolve_ctl.py raw`), runs silencedetect on each unique source (cached), classifies each
clip dead/speech/partial, and atomically writes sc_dead_indices.json. NO Resolve connection
is used here, so it cannot crash the bridge.

  py sc_classify.py [--noise=-30dB] [--dur=0.6] [--frac=0.9] [--ffmpeg=ffmpeg]
"""
import sys, os, re, json, shutil, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "sc_dead_indices.json")
TMP_OUT = OUT + ".tmp"
for stale in (OUT, TMP_OUT):
    try:
        os.remove(stale)
    except FileNotFoundError:
        pass

def arg(flag, d):
    for a in sys.argv[1:]:
        if a.startswith(flag + "="):
            return a.split("=", 1)[1]
    return d

NOISE = arg("--noise", "-30dB")
DUR = float(arg("--dur", "0.6"))
FRAC = float(arg("--frac", "0.9"))
FPS = float(arg("--fps", "59.94"))
if DUR <= 0:
    raise SystemExit("--dur must be greater than zero")
if not 0 < FRAC <= 1:
    raise SystemExit("--frac must be greater than zero and at most 1")
if FPS <= 0:
    raise SystemExit("--fps must be greater than zero")

ffmpeg_spec = arg("--ffmpeg", os.environ.get("FFMPEG_BIN", "ffmpeg"))
ffmpeg_expanded = os.path.expanduser(os.path.expandvars(ffmpeg_spec))
FFMPEG = shutil.which(ffmpeg_expanded)
if not FFMPEG:
    raise SystemExit(
        "ffmpeg was not found. Install it on PATH, set FFMPEG_BIN, "
        "or pass --ffmpeg=<executable>."
    )
try:
    ffmpeg_check = subprocess.run([FFMPEG, "-version"], capture_output=True, text=True, timeout=30)
except (OSError, subprocess.SubprocessError) as e:
    raise SystemExit("Could not start ffmpeg: %s" % e) from e
if ffmpeg_check.returncode != 0:
    raise SystemExit("ffmpeg -version failed with exit %d" % ffmpeg_check.returncode)

_cache = {}
def silences(path):
    if path in _cache:
        return _cache[path]
    regions = []
    try:
        p = subprocess.run([FFMPEG, "-i", path, "-af",
                            "silencedetect=noise=%s:d=%g" % (NOISE, DUR), "-f", "null", "-"],
                           capture_output=True, text=True, timeout=600)
    except (OSError, subprocess.SubprocessError) as e:
        raise RuntimeError(
            "Could not run ffmpeg for %s: %s. Install ffmpeg on PATH, set FFMPEG_BIN, "
            "or pass --ffmpeg=<executable>." % (path, e)
        ) from e
    if p.returncode != 0:
        detail = next((line.strip() for line in reversed((p.stderr or "").splitlines()) if line.strip()),
                      "ffmpeg exited with no diagnostic")
        raise RuntimeError("ffmpeg failed for %s (exit %d): %s" % (path, p.returncode, detail))
    cur = None
    for line in (p.stderr or "").splitlines():
        m = re.search(r"silence_start:\s*([-\d.]+)", line)
        if m:
            cur = float(m.group(1)); continue
        m = re.search(r"silence_end:\s*([-\d.]+)", line)
        if m and cur is not None:
            regions.append((cur, float(m.group(1)))); cur = None
    _cache[path] = regions
    return regions

def overlap(a0, a1, b0, b1):
    return max(0.0, min(a1, b1) - max(a0, b0))

# sc_raw.json = {"success":..,"data":{"value":[[leftOffset,duration,path],...]}} from
# `resolve_ctl.py raw` (the reliable dispatch path). Index = position in the list.
raw = json.load(open(os.path.join(HERE, "sc_raw.json"), encoding="utf-8"))
rows = raw["data"]["value"]
fps = FPS
dead, speech, partial, skipped = [], [], [], 0
dead_frames = 0
for idx, (left, dur, path) in enumerate(rows):
    if not path or not os.path.exists(path):
        skipped += 1; continue
    in_s, out_s = left / fps, (left + dur) / fps
    span = max(1e-6, out_s - in_s)
    sil = sum(overlap(in_s, out_s, s0, s1) for (s0, s1) in silences(path))
    frac = sil / span
    if frac >= FRAC:
        dead.append(idx); dead_frames += dur
    elif frac <= 0.1:
        speech.append(idx)
    else:
        partial.append(idx)

if rows and skipped == len(rows):
    raise RuntimeError("Every timeline clip was skipped because its source path was missing; no cut list was written.")

dead.sort()
with open(TMP_OUT, "w", encoding="utf-8") as fh:
    json.dump({"track": 1, "dead_indices": dead, "count": len(dead),
               "frames": dead_frames, "seconds": dead_frames / fps,
               "partial": partial, "speech_count": len(speech), "skipped": skipped}, fh)
    fh.flush()
    os.fsync(fh.fileno())
os.replace(TMP_OUT, OUT)
print("%d clips | fps %.2f | noise %s dur %.2f frac %.2f" % (len(rows), fps, NOISE, DUR, FRAC))
print("  DEAD %d (%.1fs) | SPEECH %d | PARTIAL %d | skipped %d" % (len(dead), dead_frames / fps, len(speech), len(partial), skipped))
print("  wrote -> %s" % OUT)
