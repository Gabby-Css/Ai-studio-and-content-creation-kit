"""Stages of the unattended KiddoVerse LEARN #1 pipeline.  run_all.py reloads this module before EVERY stage, so a fix saved
here while the pipeline is running takes effect for every stage that has not started yet.
Every stage is idempotent (skips work whose output already exists) and returns True on success."""
import os, sys, re, time, json, glob, shutil, hashlib, datetime, subprocess

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); HF = os.path.dirname(ROOT)
TOOLS = os.path.join(os.path.dirname(HF), "tools"); SXPY = os.path.join(TOOLS, "sxenv", "Scripts", "python.exe")
NODE = r"C:\Program Files\nodejs\node.exe"; PY = sys.executable
WINGET = r"C:\Users\softenic\AppData\Local\Microsoft\WinGet\Links"
def _ffmpeg_dirs():
    """where ffmpeg/ffprobe can live: the winget Links folder, or the Gyan.FFmpeg package folder (which is on the user PATH but not always on a detached task's PATH)"""
    pk = os.path.join(os.path.dirname(WINGET), "Packages")
    return [WINGET] + sorted(glob.glob(os.path.join(pk, "Gyan.FFmpeg*", "*", "bin")), reverse=True)
if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
    os.environ["PATH"] = os.pathsep.join(d for d in _ffmpeg_dirs() if os.path.isdir(d)) + os.pathsep + os.environ.get("PATH", "")
DELIVER = os.path.join(ROOT, "deliver"); LOGF = os.path.join(DELIVER, "run_all.log"); STATUS = os.path.join(DELIVER, "STATUS.txt")
PIC = os.path.join(ROOT, "renders", "learn1_picture.mp4"); DURATION = 354.0
DESK = r"C:\Users\softenic\Desktop\KiddoVerse_Learn1"
F_KEY = "41582c12ba"                                                    # the "F, fuh, fish" line (first realisation had a mis-timed final "sh")

def now(): return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
def log(*a):
    line = f"[{now()}] " + " ".join(str(x) for x in a)
    try:
        with open(LOGF, "a", encoding="utf8") as f: f.write(line + "\n")
    except Exception: pass
    print(line, flush=True)
def status(text):
    try: open(STATUS, "w", encoding="utf8").write(f"{now()}  {text}\n")
    except Exception: pass

def sh(cmd, cwd=None, env=None, tries=1, wait=60, name=None, ok=None):
    """run a command (output appended to the log); retry until it exits 0 and ok() holds"""
    cmd = [str(c) for c in cmd]; name = name or os.path.basename(cmd[1] if len(cmd) > 1 else cmd[0])
    e = os.environ.copy(); e.update({k: str(v) for k, v in (env or {}).items()})
    for t in range(1, tries + 1):
        log(f"RUN {name} (try {t}/{tries}): {' '.join(cmd)[:300]}"); t0 = time.time()
        try:
            with open(LOGF, "ab") as f: rc = subprocess.run(cmd, cwd=cwd, env=e, stdout=f, stderr=subprocess.STDOUT).returncode
        except OSError as ex:                                              # missing binary / bad cwd: a failed try, not a crash
            log(f"could not start {name}: {ex}"); rc = 127
        log(f"EXIT {name} code {rc} after {(time.time() - t0) / 60:.1f} min")
        try: good = rc == 0 and (ok is None or ok())
        except Exception as ex: log("ok() check failed:", ex); good = False
        if good: return True
        if t < tries: time.sleep(wait)
    return False

def free_gb(): return shutil.disk_usage("C:\\").free / 2 ** 30
def wait_disk(need=5.0, max_wait=3600):
    t0 = time.time()
    while free_gb() < need and time.time() - t0 < max_wait:
        log(f"low disk space: {free_gb():.1f} GB free, waiting"); time.sleep(120)
    log(f"disk free: {free_gb():.1f} GB")

def duration(path):
    try:
        out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", path], capture_output=True, text=True, timeout=300).stdout
        return float(out.strip())
    except Exception: return 0.0

def loudness(path):
    """(integrated LUFS, true peak dBTP) of the audio of any media file"""
    try: r = subprocess.run(["ffmpeg", "-nostats", "-i", path, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
    except OSError as ex: log("loudness(): ffmpeg could not start:", ex); return None, None
    i =re.findall(r"I:\s+(-?\d+\.\d+) LUFS", r.stderr); p = re.findall(r"Peak:\s+(-?\d+\.\d+) dBFS", r.stderr)
    return (float(i[-1]) if i else None), (float(p[-1]) if p else None)

# ------------------------------------------------------------------------------------------------ sound effects
def stage_sfx():
    stem, js, idx = os.path.join(HERE, "sfx_stem.wav"), os.path.join(ROOT, "data", "sfx.json"), os.path.join(ROOT, "index.html")
    if os.path.exists(stem) and os.path.getmtime(stem) > os.path.getmtime(idx): return True
    if not (os.path.exists(js) and os.path.getmtime(js) > os.path.getmtime(idx)):
        if not sh([NODE, "dump_sfx.cjs"], cwd=os.path.join(ROOT, "build"), tries=4, wait=90, name="dump_sfx", ok=lambda: os.path.exists(js)): return False
    return sh([PY, "sfx.py"], cwd=HERE, tries=2, name="sfx.py", ok=lambda: os.path.exists(stem))

# ------------------------------------------------------------------------------------------------ picture (1080p, no final audio yet)
def picture_current():
    """False if index.html / data/song.json (the picture is rendered from them; NOT audio/master.wav, which is muxed in later) is newer than the render:
    size + duration alone would accept an OLD render that still has the old captions / artwork"""
    try: return os.path.getmtime(PIC) >= max(os.path.getmtime(p) for p in (os.path.join(ROOT, "index.html"), os.path.join(ROOT, "data", "song.json")) if os.path.exists(p))
    except (OSError, ValueError): return False
def valid_picture(): return os.path.exists(PIC) and os.path.getsize(PIC) > 8e6 and abs(duration(PIC) - DURATION) < 1.5 and picture_current()
def render_running():
    """True while a 'hyperframes render learn1' node process exists (e.g. one left running by an earlier driver)"""
    try:
        r = subprocess.run(["powershell", "-NoProfile", "-Command", "@(Get-CimInstance Win32_Process -Filter \"name='node.exe'\" | Where-Object { $_.CommandLine -match 'hyperframes.mjs render learn1' }).Count"],
                           capture_output=True, text=True, timeout=240)
        return r.stdout.strip() not in ("", "0")
    except Exception: return False
def stage_picture():
    while render_running(): log("a render is already running - waiting for it to finish"); status("waiting for the running picture render"); time.sleep(120)
    if valid_picture(): log("picture already rendered"); return True
    os.makedirs(os.path.dirname(PIC), exist_ok=True)
    if os.path.exists(PIC) and not picture_current():                    # an OLD render (older than index.html / song.json): keep it aside, render the new one
        old = PIC[:-4] + "_old_" + datetime.datetime.fromtimestamp(os.path.getmtime(PIC)).strftime("%Y%m%d_%H%M") + ".mp4"
        try: os.replace(PIC, old); log("old picture render kept as", os.path.basename(old))
        except OSError as ex: log("could not move the old picture aside:", ex)
    master = os.path.join(HERE, "master.wav")                            # the composition references audio/master.wav; the final audio is muxed in later, so a placeholder is fine
    if not os.path.exists(master):
        sh(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(HERE, "music_stem_cm.wav"), "-t", "354", "-ar", "48000", "-ac", "2", master], name="placeholder master")
    wait_disk(5.0)
    cmd = [NODE, "node_modules/hyperframes/bin/hyperframes.mjs", "render", "learn1", "--workers", "1", "--fps", "30", "-o", PIC,
           "--protocol-timeout", "900000", "--player-ready-timeout", "300000", "--browser-timeout", "900"]
    return sh(cmd, cwd=HF, env=dict(PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS="900000"), tries=3, wait=120, name="hyperframes render", ok=valid_picture)

def stage_thumbs():
    out = os.path.join(DELIVER, "thumbs")
    if len(glob.glob(os.path.join(out, "*.jpg"))) >= 3: return True
    return sh([NODE, "make_thumbs.cjs", out], cwd=os.path.join(ROOT, "build"), tries=2, name="thumbnails")

# ------------------------------------------------------------------------------------------------ singing (SoulX-Singer, CPU, resumable)
def seg_keys():
    segs = json.load(open(os.path.join(HERE, "sx", "lead_all.json"), encoding="utf8")); keys = []
    for s in segs:
        k = hashlib.md5("|".join((s["phoneme"], s["note_pitch"], s["note_type"], s["duration"])).encode()).hexdigest()[:10]
        if k not in keys: keys.append(k)
    return keys
def n_done(d="mel_lead"): return sum(os.path.exists(os.path.join(HERE, "sx", d, k + ".pt")) for k in seg_keys())

MEL = [SXPY, "-u", "sx_local.py", "mel", "lead", "sx/prompt_lead2", "12306", "32", "4"]
def redo_F():
    marker = os.path.join(HERE, "sx", "redo_F.done")
    if os.path.exists(marker) or F_KEY not in seg_keys(): return
    old = os.path.join(HERE, "sx", "_old"); os.makedirs(old, exist_ok=True)
    for sub, ext in (("mel_lead", ".pt"), ("wav_lead", ".wav")):
        p = os.path.join(HERE, "sx", sub, F_KEY + ext)
        if os.path.exists(p): shutil.move(p, os.path.join(old, F_KEY + ext))
    sh(MEL, cwd=HERE, env=dict(SX_Q8="1", SX_ONLY=F_KEY, SX_SEEDOFF="1"), tries=3, name="F line, new take", ok=lambda: os.path.exists(os.path.join(HERE, "sx", "mel_lead", F_KEY + ".pt")))
    open(marker, "w").write(now())

def stage_vocals():
    keys = seg_keys(); log(f"{len(keys)} unique sung lines, {n_done()} already rendered")
    redo_F()
    status(f"singing: {n_done()}/{len(keys)} lines rendered")
    if not sh(MEL, cwd=HERE, env=dict(SX_Q8="1", SX_FIRST="112-190,230-270,282-306"), tries=12, wait=120, name="SoulX singing", ok=lambda: n_done() == len(keys)): return False
    if not sh([SXPY, "-u", "sx_local.py", "voc", "lead"], cwd=HERE, env=dict(SX_Q8="1"), tries=4, wait=60, name="vocoder"): return False
    return place_vocals()

def place_vocals():
    r = subprocess.run([SXPY, "sx_local.py", "place", "lead", "sx/lead_sx.wav"], cwd=HERE, capture_output=True, text=True)
    log("place:", (r.stdout or "")[-400:].strip(), (r.stderr or "")[-300:].strip())
    return r.returncode == 0 and "missing: []" in (r.stdout or "")

def stage_qa():
    p = os.path.join(HERE, "qa_reroll.py")
    if os.path.exists(os.path.join(HERE, "sx", "qa_done.flag")): log("QA already ran its 2 rounds on these takes (sx/qa_done.flag) - skipped"); return True
    if not os.path.exists(p): log("no qa_reroll.py - skipped"); return True
    return sh([PY, p], cwd=HERE, tries=1, name="qa_reroll")

# ------------------------------------------------------------------------------------------------ mix + master
def stage_mix():
    safe = os.path.join(HERE, "master_L1_safe.wav"); final = os.path.join(HERE, "master.wav"); raw = os.path.join(HERE, "master_v3_L1.wav")
    lead = os.path.join(HERE, "sx", "lead_sx.wav")
    if os.path.exists(os.path.join(HERE, "sx", "mix_ok.flag")) and os.path.exists(safe) and os.path.exists(final): log("mix is current for these takes (sx/mix_ok.flag) - skipped"); return True
    if os.path.exists(safe) and os.path.exists(lead) and os.path.getmtime(safe) > os.path.getmtime(lead) and os.path.getmtime(final) >= os.path.getmtime(safe): return True
    env = dict(MIX_MUSIC="music_stem_cm.wav", MIX_OUTTAG="L1", M3_LOOK="0.04", M3_HFCUT="4", M3_HFPRES="4.5", M3_CV="3", M3_DSTH="-31", M3_CARVE="2.0", M3_DUCK="0.7", M3_MAXCUT="20", M3_ONSET="3")   # v2 clarity mix (A/B on the weakest sections: ESTOI +0.03-0.04)
    if not sh([PY, "mix3.py", "13"], cwd=HERE, env=env, tries=2, name="mix3", ok=lambda: os.path.exists(raw)): return False
    if not sh([PY, "aac_safe.py", raw, safe, "0.89"], cwd=HERE, tries=2, name="aac_safe"): return False
    i, tp = loudness(safe); log(f"master after aac_safe: {i} LUFS, true peak {tp} dBTP")
    if i is not None and abs(i + 14.0) > 0.5:                              # loudnorm is single-pass: trim to the -14 LUFS target
        g = round(-14.0 - i, 2); trim = os.path.join(HERE, "master_L1_trim.wav")
        sh(["ffmpeg", "-y", "-v", "error", "-i", safe, "-af", f"volume={g}dB,alimiter=limit=0.89:attack=3:release=60:level=0", "-ar", "48000", trim], name="trim")
        if sh([PY, "aac_safe.py", trim, safe, "0.89"], cwd=HERE, name="aac_safe 2"):
            i, tp = loudness(safe); log(f"master after trim: {i} LUFS, true peak {tp} dBTP")
    shutil.copyfile(safe, final); return os.path.exists(final)

# ------------------------------------------------------------------------------------------------ videos + files for the user
def final_checks(paths):
    """explicit PASS/FAIL lines: length within 0.5 s of DURATION, loudness within 1 dB of -14 LUFS, true peak <= -0.3 dBTP (NOTE above -1.0)"""
    rep, fails = [], 0
    for p in paths:
        n = os.path.basename(p); d = duration(p); i, tp = loudness(p)
        rep.append(f"{n}: {os.path.getsize(p) / 1e6:.0f} MB, {d:.1f} s, {i} LUFS, true peak {tp} dBTP")
        tests = [("duration", abs(d - DURATION) <= 0.5, f"{d:.1f} s (target {DURATION:.0f} s +/- 0.5)"),
                 ("loudness", i is not None and abs(i + 14.0) <= 1.0, f"{i} LUFS (target -14 +/- 1)"),
                 ("true peak", tp is not None and tp <= -0.3, f"{tp} dBTP (must be <= -0.3)")]
        for what, good, det in tests:
            rep.append(f"  {'PASS' if good else 'FAIL'}  {n}  {what}: {det}"); fails += (not good)
        if tp is not None and -1.0 < tp <= -0.3: rep.append(f"  NOTE  {n}: true peak {tp} dBTP is acceptable but above -1.0 dBTP (little headroom for YouTube's re-encode)")
    rep.append("OVERALL: ALL CHECKS PASS" if not fails else f"OVERALL: {fails} CHECK(S) FAILED - see the FAIL lines above")
    return rep

def make_shorts(src, outdir):
    """9:16 1080x1920 clips cut from the muxed 1080p file: a blurred, enlarged copy of the picture as background, the 16:9 picture centred on top"""
    os.makedirs(outdir, exist_ok=True); all_ok = True
    fc = ("[0:v]split=2[a][b];[a]scale=216:384:force_original_aspect_ratio=increase,crop=216:384,boxblur=6:2,scale=1080:1920,setsar=1[bg];"
          "[b]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v]")
    for name, t0, dur in (("ABC_song", 190, 20), ("Count_to_10", 24, 60)):      # both clips start/end on section boundaries (silence between the lines): ABC song 190-210 s, counting 24-84 s
        out = os.path.join(outdir, f"KiddoVerse_Learn1_short_{name}.mp4")
        if os.path.exists(out) and os.path.getsize(out) > 1e5 and os.path.getmtime(out) > os.path.getmtime(src): continue
        all_ok &= sh(["ffmpeg", "-y", "-v", "error", "-ss", t0, "-t", dur, "-i", src, "-filter_complex", fc, "-map", "[v]", "-map", "0:a:0", "-af", f"afade=t=out:st={dur - 0.4}:d=0.4",
                      "-c:v", "libx264", "-preset", "veryfast", "-crf", "21", "-r", "30", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", out],
                     name=f"short {name}", tries=2, ok=lambda o=out: os.path.exists(o) and os.path.getsize(o) > 1e5)
    return all_ok

def write_youtube_description(dest=None):
    """YOUTUBE_DESCRIPTION.txt: title, description, chapters (copied from the chapters file), tags, made-for-kids + synthetic-content wording"""
    ch = os.path.join(DELIVER, "KiddoVerse_Learn1_chapters.txt")
    chapters = open(ch, encoding="utf8").read().strip() if os.path.exists(ch) else "(chapters file not found - run the text build step)"
    txt = f"""KIDDOVERSE LEARN #1 - YOUTUBE DESCRIPTION (copy and paste)
=========================================================
Decide the channel name BEFORE uploading (see README_START_HERE.txt, trademark note). If the name changes, change "KiddoVerse" in the
title, description and tags below as well.

TITLE (under 100 characters)
Count 1 to 10, ABC & Two-Letter Words | Learn with KiddoVerse | Songs for Toddlers

DESCRIPTION (everything between the lines)
------------------------------------------
Count from 1 to 10, sing the ABC song, hear the sound of every letter and read ten two-letter words (at, in, on, up, go, no, me, be, it, my)
with Kiko, Luma and Gizmo on the Learning Express! Also inside: a brain-break dance, a "Can you find it?" game and a final sing-along.
Grown-ups: watch together and answer out loud when the characters ask a question.

Chapters
{chapters}

Made with animation and AI: the characters are animated, and the voices and music are AI-generated.
The lyrics use American pronunciation.
------------------------------------------

SUGGESTED TAGS (comma separated; tags matter little for search, the title and description matter more)
counting for kids, count to 10, ABC song, alphabet song, learn the alphabet, letter sounds, phonics for kids, two letter words, learn to read,
toddler learning, preschool learning, kids songs, learning songs for kids, KiddoVerse

AUDIENCE SETTING
Choose "Yes, it's made for kids". On made-for-kids videos YouTube turns off comments, end screens and cards, so the video ends with a clean
outro instead of "watch next" elements.

ALTERED / SYNTHETIC CONTENT QUESTION
The facts: the characters are animated; the singing and spoken voices and the music are AI-generated (SoulX-Singer for singing, Kokoro for the
spoken lines). Read the question exactly as YouTube words it in Studio and answer it honestly. Putting the sentence "Made with animation and AI:
the characters are animated, and the voices and music are AI-generated." in the description is a safe extra. Nothing in this project's files
states that answering YES is mandatory.

CAPTIONS
The captions are already burned into the picture. The SRT file (KiddoVerse_Learn1.srt) would show the same words a second time, so upload it
only if you want it for search or translation (or after accepting the double text).
"""
    p = dest or os.path.join(DELIVER, "YOUTUBE_DESCRIPTION.txt")
    open(p, "w", encoding="utf8").write(txt); return p

def stage_deliver():
    master = os.path.join(HERE, "master.wav"); os.makedirs(DESK, exist_ok=True)
    if not valid_picture() and os.path.exists(PIC) and not picture_current():
        log("picture is older than its sources (index.html / song.json) - re-rendering it now"); status("rendering the final picture (about 1 hour)"); stage_picture()
    if not valid_picture(): log("no valid picture" + ("" if picture_current() else f": {PIC} is OLDER than index.html / data/song.json")); return False
    v1080 = os.path.join(DESK, "KiddoVerse_Learn1_1080p.mp4"); v720 = os.path.join(DESK, "KiddoVerse_Learn1_720p.mp4")
    aud = ["-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", "-movflags", "+faststart"]
    if not sh(["ffmpeg", "-y", "-v", "error", "-i", PIC, "-i", master, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy"] + aud + [v1080], name="mux 1080p"): return False
    if not sh(["ffmpeg", "-y", "-v", "error", "-i", PIC, "-i", master, "-map", "0:v:0", "-map", "1:a:0", "-vf", "scale=1280:720:flags=lanczos",
               "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30"] + aud + [v720], name="encode 720p", tries=2): return False
    sh(["ffmpeg", "-y", "-v", "error", "-i", master, "-c:a", "libmp3lame", "-b:a", "320k", os.path.join(DESK, "KiddoVerse_Learn1_song.mp3")], name="mp3")
    shutil.copyfile(master, os.path.join(DESK, "KiddoVerse_Learn1_master_48k.wav"))
    try: write_youtube_description()
    except Exception as ex: log("YOUTUBE_DESCRIPTION.txt failed:", ex)
    for f in ("KiddoVerse_Learn1.srt", "KiddoVerse_Learn1_script.txt", "KiddoVerse_Learn1_chapters.txt", "KiddoVerse_Learn1_Recommendations.md", "YOUTUBE_DESCRIPTION.txt"):
        src = os.path.join(DELIVER, f)
        if not os.path.exists(src): continue
        if f.endswith("_script.txt"):                                       # the script is copied without the "(c) KiddoVerse" ownership line (the name is not cleared)
            kept = [ln for ln in open(src, encoding="utf8").read().split("\n") if "(c) KiddoVerse" not in ln]
            open(os.path.join(DESK, f), "w", encoding="utf8").write("\n".join(kept))
        else: shutil.copyfile(src, os.path.join(DESK, f))
    th = os.path.join(DELIVER, "thumbs")
    if os.path.isdir(th): shutil.copytree(th, os.path.join(DESK, "Thumbnails"), dirs_exist_ok=True)
    try:
        if not make_shorts(v1080, os.path.join(DESK, "Shorts")): log("some vertical clips failed (not fatal)")
    except Exception as ex: log("vertical clips failed (not fatal):", ex)
    rep = final_checks((v1080, v720))
    log("FINAL CHECK:\n" + "\n".join(rep))
    open(os.path.join(DELIVER, "FINAL_REPORT.txt"), "w", encoding="utf8").write("\n".join(rep) + "\n")
    shutil.copyfile(os.path.join(DELIVER, "FINAL_REPORT.txt"), os.path.join(DESK, "FINAL_REPORT.txt"))
    write_readme(rep)
    try: os.remove(os.path.join(DESK, "_IN_PROGRESS.txt"))
    except OSError: pass
    return True

def write_readme(rep):
    txt = """KIDDOVERSE LEARN #1 - "Count, ABC & Read with KiddoVerse"   (finished __NOW__)
==============================================================================

THE VIDEO
  KiddoVerse_Learn1_1080p.mp4   <- upload this one to YouTube (best quality)
  KiddoVerse_Learn1_720p.mp4    <- smaller file for phones / WhatsApp
  Length 5 min 54 s: counting 1-10, the alphabet A-Z (letter, sound, picture word), a brain-break dance,
  ten two-letter words (at, in, on, up, go, no, me, be, it, my), a "can you find it?" game and a final sing-along.
  The video ends with a clean outro. It does not depend on YouTube end screens or cards (see point 1 below).

OTHER FILES
  YOUTUBE_DESCRIPTION.txt               title, description, chapters, tags and the made-for-kids / AI wording, ready to paste
  FINAL_REPORT.txt                      the automatic PASS/FAIL checks (also listed below)
  KiddoVerse_Learn1.srt                 captions file (optional, read point 5 first)
  KiddoVerse_Learn1_chapters.txt        chapter list for the description (first line must stay 0:00)
  KiddoVerse_Learn1_script.txt          all the words that are sung / spoken
  KiddoVerse_Learn1_Recommendations.md  upload checklist + possible next episodes
  KiddoVerse_Learn1_song.mp3 / _master_48k.wav   the audio only
  Thumbnails\\                           three thumbnail pictures (pick the clearest one)
  Shorts\\                               two vertical 1080x1920 clips (ABC song, 20 s; counting 1-10, 60 s) cut from the 1080p video.
                                        Both start and end in the pause between two lines (checked on the voice track); still watch them once before posting.

CHECKS DONE AUTOMATICALLY (measurements only, the pipeline did not listen to the result)
__REP__

BEFORE YOU PUBLISH
  1. Audience: choose "Yes, it's made for kids". On made-for-kids videos YouTube does not offer end screens or cards, so
     do not plan on adding them. The video ends with a clean outro instead.
  2. Altered / synthetic content question: the characters are animated, and the singing voice, the spoken voices and the music are
     AI-generated. Read YouTube's question as it is worded in Studio and answer it honestly. Saying so in the description
     (the sentence is in YOUTUBE_DESCRIPTION.txt) is a safe extra. This project does not state that YES is mandatory.
  3. Channel name and trademark: KIDDOVERSE is a registered US trademark (22LEARN, LLC, Reg. 5762831, downloadable game
     software, registered 2019), and the owner has a toddler learning product. The registration could not be confirmed as still
     live. Decide the channel name BEFORE uploading: the name is in the logo, the thumbnails, the captions AND the sung audio
     ("Zoom, zoom, KiddoVerse!"), so changing it later means re-making all of them. This is not legal advice.
  4. Voices: the singing is SoulX-Singer (Apache-2.0); the spoken character lines are Kokoro (Apache-2.0). The alphabet lines (letter, sound, picture word) and the two-letter-word lines are chanted by the same Kokoro voice instead of sung, because the singing model could not pronounce short consonant sounds clearly; the theme songs, counting songs and the ABC song are sung. The singing voice prompt
     is an 8.2 s synthetic clip made inside this project (the project files show no recording of a real person; code notes say it was
     cut from earlier SoulX-Singer output, which was guided by a Kokoro-generated reference), but the exact creation step was not logged:
     origin of the voice prompt file is not documented - check before commercial use.
  5. Captions: the words are burned into the picture AND an SRT file is provided. Uploading the SRT shows the text twice
     (burned-in plus YouTube captions) unless the viewer turns captions off. Upload the SRT only if you want it for search or
     translation, or accept the double text.
  6. Pronunciation: the lyrics and captions use American pronunciation (for example "zee" for Z and "vase" for V). That suits
     a US audience; viewers in the UK or Ghana say "zed" and may notice.
  7. Listening check: the automatic checks above are measurements, not listening. Play the video once all the way through; if a word
     sounds unclear, note the time (for example "3:12 letter F") so that line can be re-sung.
  8. Music is an original arrangement played with a commercially-usable SoundFont (GeneralUser GS); fonts are open-licence.
"""
    txt = txt.replace("__NOW__", now()).replace("__REP__", "\n".join("  " + r for r in rep))
    open(os.path.join(DESK, "README_START_HERE.txt"), "w", encoding="utf8").write(txt)
