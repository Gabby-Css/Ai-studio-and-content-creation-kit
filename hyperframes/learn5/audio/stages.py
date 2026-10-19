"""Stages of the unattended KiddoVerse LEARN #5 "The Shape Workshop" pipeline (sfx -> picture -> mix -> thumbs -> deliver).
run_all.py reloads this module before EVERY stage.  Every stage is idempotent and returns True on success.
The vocal stems (audio/stems/*.wav) and the music stem are built by sing_song.py / music2.py + cm_render.py + music_cm_mix.py (see README in the playbook)."""
import os, sys, re, time, json, glob, shutil, datetime, subprocess

HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); HF = os.path.dirname(ROOT)
NODE = r"C:\Program Files\nodejs\node.exe"; PY = sys.executable
WINGET = r"C:\Users\softenic\AppData\Local\Microsoft\WinGet\Links"
def _ffmpeg_dirs():
    pk = os.path.join(os.path.dirname(WINGET), "Packages")
    return [WINGET] + sorted(glob.glob(os.path.join(pk, "Gyan.FFmpeg*", "*", "bin")), reverse=True)
if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
    os.environ["PATH"] = os.pathsep.join(d for d in _ffmpeg_dirs() if os.path.isdir(d)) + os.pathsep + os.environ.get("PATH", "")
DELIVER = os.path.join(ROOT, "deliver"); LOGF = os.path.join(DELIVER, "run_all.log"); STATUS = os.path.join(DELIVER, "STATUS.txt")
PIC = os.path.join(ROOT, "renders", "learn5_picture.mp4")
SONGJ = json.load(open(os.path.join(ROOT, "data", "song.json"), encoding="utf8")); DURATION = round(SONGJ["duration"], 3)
DESK = r"C:\Users\softenic\Desktop\KiddoVerse_Learn5"
NAME = "KiddoVerse_Learn5"
HARD_WORDS = "the kids' number shouts (0:14 eleven, 1:42 nineteen, 1:52 twenty), the quiz answers (1:08 fifteen, 2:06 sixteen, 2:50 eight), the tens echo (2:38 twenty, thirty, forty, fifty) and \"Beep boop!\" (0:04)."

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
    cmd = [str(c) for c in cmd]; name = name or os.path.basename(cmd[1] if len(cmd) > 1 else cmd[0])
    e = os.environ.copy(); e.update({k: str(v) for k, v in (env or {}).items()})
    for t in range(1, tries + 1):
        log(f"RUN {name} (try {t}/{tries}): {' '.join(cmd)[:300]}"); t0 = time.time()
        try:
            with open(LOGF, "ab") as f: rc = subprocess.run(cmd, cwd=cwd, env=e, stdout=f, stderr=subprocess.STDOUT).returncode
        except OSError as ex:
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
    try: r = subprocess.run(["ffmpeg", "-nostats", "-i", path, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True)
    except OSError as ex: log("loudness(): ffmpeg could not start:", ex); return None, None
    i = re.findall(r"I:\s+(-?\d+\.\d+) LUFS", r.stderr); p = re.findall(r"Peak:\s+(-?\d+\.\d+) dBFS", r.stderr)
    return (float(i[-1]) if i else None), (float(p[-1]) if p else None)

# ------------------------------------------------------------------------------------------------ sound effects
def stage_sfx():
    stem, js, idx = os.path.join(HERE, "sfx_stem.wav"), os.path.join(ROOT, "data", "sfx.json"), os.path.join(ROOT, "index.html")
    if os.path.exists(stem) and os.path.getmtime(stem) > os.path.getmtime(idx): return True
    if not (os.path.exists(js) and os.path.getmtime(js) > os.path.getmtime(idx)):
        if not sh([NODE, "dump_sfx.cjs"], cwd=os.path.join(ROOT, "build"), tries=3, wait=60, name="dump_sfx", ok=lambda: os.path.exists(js)): return False
    return sh([PY, "sfx.py"], cwd=HERE, tries=2, name="sfx.py", ok=lambda: os.path.exists(stem))

# ------------------------------------------------------------------------------------------------ mix + master (stems must exist)
MIXENV = dict(MIX_MUSIC="music_stem_cm.wav", MIX_OUTTAG="L5", SFX_DUCK="0.8",M3_LOOK="0.04", M3_HFCUT="4", M3_HFPRES="4.5", M3_CV="3", M3_DSTH="-31", M3_CARVE="2.0", M3_DUCK="0.7", M3_MAXCUT="20", M3_ONSET="3", M3_CODA="3", DBL_DB="-16", HRM_DB="-13", GANG_DB="0", GANG_B_DB="-8", GANG_C_DB="-9")
def stage_mix(force=False):
    safe = os.path.join(HERE, "master_L5_safe.wav"); final = os.path.join(HERE, "master.wav"); raw = os.path.join(HERE, "master_l5_L5.wav")
    if not force and os.path.exists(os.path.join(HERE, "mix_ok.flag")) and os.path.exists(safe) and os.path.exists(final): log("mix is current (mix_ok.flag) - skipped"); return True
    env = dict(MIXENV); env.update({k: v for k, v in os.environ.items() if k.startswith(("M3_", "DBL_", "HRM_", "GANG_"))})
    if force or not os.path.exists(raw):
        if not sh([PY, "mix4.py", os.environ.get("VMR", "13")], cwd=HERE, env=env, tries=2, name="mix4", ok=lambda: os.path.exists(raw)): return False
    if not sh([PY, "aac_safe.py", raw, safe, "0.89"], cwd=HERE, tries=2, name="aac_safe"): return False
    i, tp = loudness(safe); log(f"master after aac_safe: {i} LUFS, true peak {tp} dBTP")
    if i is not None and abs(i + 14.0) > 0.5:
        g = round(-14.0 - i, 2); trim = os.path.join(HERE, "master_L5_trim.wav")
        sh(["ffmpeg", "-y", "-v", "error", "-i", safe, "-af", f"volume={g}dB,alimiter=limit=0.89:attack=3:release=60:level=0", "-ar", "48000", trim], name="trim")
        if sh([PY, "aac_safe.py", trim, safe, "0.89"], cwd=HERE, name="aac_safe 2"):
            i, tp = loudness(safe); log(f"master after trim: {i} LUFS, true peak {tp} dBTP")
    shutil.copyfile(safe, final); open(os.path.join(HERE, "mix_ok.flag"), "w").write(now()); return os.path.exists(final)

# ------------------------------------------------------------------------------------------------ picture (1080p, no final audio yet)
def picture_current():
    try: return os.path.getmtime(PIC) >= max(os.path.getmtime(p) for p in (os.path.join(ROOT, "index.html"), os.path.join(ROOT, "data", "song.json")) if os.path.exists(p))
    except (OSError, ValueError): return False
def valid_picture(): return os.path.exists(PIC) and os.path.getsize(PIC) > 8e6 and abs(duration(PIC) - DURATION) < 1.5 and picture_current()
def render_running():
    try:
        r = subprocess.run(["powershell", "-NoProfile", "-Command", "@(Get-CimInstance Win32_Process -Filter \"name='node.exe'\" | Where-Object { $_.CommandLine -match 'hyperframes.mjs render' }).Count"], capture_output=True, text=True, timeout=240)
        return r.stdout.strip() not in ("", "0")
    except Exception: return False
def stage_picture():
    while render_running(): log("a hyperframes render is already running (this PC is shared) - waiting"); status("waiting for another render to finish"); time.sleep(120)
    if valid_picture(): log("picture already rendered"); return True
    os.makedirs(os.path.dirname(PIC), exist_ok=True)
    if os.path.exists(PIC) and not picture_current():
        old = PIC[:-4] + "_old_" + datetime.datetime.fromtimestamp(os.path.getmtime(PIC)).strftime("%Y%m%d_%H%M") + ".mp4"
        try: os.replace(PIC, old); log("old picture render kept as", os.path.basename(old))
        except OSError as ex: log("could not move the old picture aside:", ex)
    master = os.path.join(HERE, "master.wav")
    if not os.path.exists(master): sh(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(HERE, "music_stem_cm.wav"), "-t", str(int(DURATION + 1)), "-ar", "48000", "-ac", "2", master], name="placeholder master")
    wait_disk(5.0)
    cmd = [NODE, "node_modules/hyperframes/bin/hyperframes.mjs", "render", "learn5", "--workers", "1", "--fps", "30", "-o", PIC, "--protocol-timeout", "900000", "--player-ready-timeout", "300000", "--browser-timeout", "900"]
    return sh(cmd, cwd=HF, env=dict(PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS="900000"), tries=3, wait=120, name="hyperframes render", ok=valid_picture)

def stage_thumbs():
    out = os.path.join(DELIVER, "thumbs")
    if len(glob.glob(os.path.join(out, "*.jpg"))) >= 3: return True
    return sh([NODE, "make_thumbs.cjs", out], cwd=os.path.join(ROOT, "build"), tries=2, name="thumbnails")

# ------------------------------------------------------------------------------------------------ videos + files for the user
def final_checks(paths):
    rep, fails = [], 0
    for p in paths:
        n = os.path.basename(p); d = duration(p); i, tp = loudness(p)
        rep.append(f"{n}: {os.path.getsize(p) / 1e6:.0f} MB, {d:.1f} s, {i} LUFS, true peak {tp} dBTP")
        tests = [("duration", abs(d - DURATION) <= 0.5, f"{d:.1f} s (target {DURATION:.1f} s +/- 0.5)"),
                 ("loudness", i is not None and abs(i + 14.0) <= 1.0, f"{i} LUFS (target -14 +/- 1)"),
                 ("true peak", tp is not None and tp <= -0.3, f"{tp} dBTP (must be <= -0.3)")]
        for what, good, det in tests:
            rep.append(f"  {'PASS' if good else 'FAIL'}  {n}  {what}: {det}"); fails += (not good)
        if tp is not None and -1.0 < tp <= -0.3: rep.append(f"  NOTE  {n}: true peak {tp} dBTP is acceptable but above -1.0 dBTP (little headroom for YouTube's re-encode)")
    rep.append("OVERALL: ALL CHECKS PASS" if not fails else f"OVERALL: {fails} CHECK(S) FAILED - see the FAIL lines above")
    return rep

def make_shorts(src, outdir):
    """9:16 clips cut on SECTION boundaries (so they start and end between two lines): theme song + eleven, counting by 2s 5s and 10s, twenty + the star-counting quiz"""
    os.makedirs(outdir, exist_ok=True); all_ok = True
    S = SONGJ["sections"]; first = lambda kind: next(s for s in S if s["kind"] == kind); stops = [s for s in S if s["kind"] == "stop"]
    games = [x for x in S if x["kind"] == "game"]; skips = [x for x in S if x["kind"] == "skip"]
    cuts = (("Theme_And_Eleven", first("hook")["t0"], stops[0]["t1"] - first("hook")["t0"]),
            ("Count_By_2s_5s_10s", skips[0]["t0"], skips[-1]["t1"] - skips[0]["t0"]),
            ("Twenty_And_Quiz", stops[-1]["t0"], games[1]["t1"] - stops[-1]["t0"]))
    fc = ("[0:v]split=2[a][b];[a]scale=216:384:force_original_aspect_ratio=increase,crop=216:384,boxblur=6:2,scale=1080:1920,setsar=1[bg];"
          "[b]scale=1080:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,format=yuv420p[v]")
    for name, t0, dur in cuts:
        out = os.path.join(outdir, f"{NAME}_short_{name}.mp4")
        if os.path.exists(out) and os.path.getsize(out) > 1e5 and os.path.getmtime(out) > os.path.getmtime(src): continue
        all_ok &= sh(["ffmpeg", "-y", "-v", "error", "-ss", f"{t0:.3f}", "-t", f"{dur:.3f}", "-i", src, "-filter_complex", fc, "-map", "[v]", "-map", "0:a:0", "-af", f"afade=t=out:st={dur - 0.4:.2f}:d=0.4",
                      "-c:v", "libx264", "-preset", "veryfast", "-crf", "21", "-r", "30", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-movflags", "+faststart", out],
                     name=f"short {name}", tries=2, ok=lambda o=out: os.path.exists(o) and os.path.getsize(o) > 1e5)
    return all_ok

def write_youtube_description(dest=None):
    ch = os.path.join(DELIVER, f"{NAME}_chapters.txt")
    chapters = open(ch, encoding="utf8").read().strip() if os.path.exists(ch) else "(chapters file not found - run make_texts.py)"
    txt = f"""KIDDOVERSE LEARN #5 - YOUTUBE PACK (copy and paste)
=========================================================
Decide the channel name BEFORE uploading (see README_START_HERE.txt, trademark note). If the name changes, change "KiddoVerse" in the
title, description, hashtags and tags below as well.

TITLE  (use #1; #2 and #3 are alternatives for YouTube's "Test & compare" title test, if your channel has it.  Keep it under 100 characters;
search results show about the first 60, so the keywords "Learn to Count" and "Counting Song" come first)
1. Learn to Count to 20 for Kids 🔢 Counting Song for Toddlers | KiddoVerse
2. Counting Song 11 to 20 + Count by 2s, 5s, 10s! 🔢 Number Song for Kids | KiddoVerse
3. What Comes After 14? 🔢 Counting Game and Song for Kids | KiddoVerse

THUMBNAIL: Thumbnails\\ has three pictures; the first ("COUNT TO 20!" with the ten-frames and Gizmo's number display) is the one to try first.

DESCRIPTION (everything between the lines; the first two lines are what shows in search, so they carry the keywords)
------------------------------------------
🔢 Learn to count to 20 with Gizmo, Kiko and Luma! Gizmo's counting machine has a full ten-frame, so we count on from ten: 11, 12, 13 ... 20, then count by 2s, 5s and 10s!
A counting song for toddlers and preschoolers, with ten-frames to see "ten and some more", a "What comes after 14?" quiz and a "How many stars?" game.

At every stop: "Ten and three more!" ... the number lights up on Gizmo's display ... we count on ("eleven, twelve, thirteen!") ... and see what the machine counted.
Then count by twos with socks, by fives with fingers on a hand, and by tens with a ten-frame train!

👨‍👩‍👧 For grown-ups: sing along, count real things at home (socks, fingers, stairs), and pause at the quiz so your child can answer before the number appears.
What your child practices: counting from 11 to 20, "ten and some more" (tens and ones), the number order, skip counting by 2s, 5s and 10s, listening and answering, moving to a steady beat.

⏱ Chapters
{chapters}

🎵 The songs, lyrics, melodies, characters and music are original (c) KiddoVerse.
Made with animation and AI: the characters are animated, and the voices and music are AI-generated.

#CountingSong #LearnToCount #KidsSongs #ToddlerLearning #KiddoVerse
------------------------------------------
HASHTAGS: YouTube's own help page says that of the hashtags in the description "up to three hashtags that are considered most engaging will appear by your video title",
so put the 3 most important first (as above) and keep the total small (3 to 5).  It also says a video with more than 60 hashtags has ALL of them ignored.

SUGGESTED TAGS (comma separated, 8-12 specific ones are enough; tags matter little for search, the title and description matter more)
counting song, learn to count, count to 20 for kids, numbers 11 to 20, skip counting for kids, count by 2s 5s 10s, number song for toddlers, counting for preschool,
kids learning songs, toddler learning videos, counting game, KiddoVerse

SHORTS (the three clips in Shorts\\): post each as its own Short with a title like
  "Count to 20! 🔢 Ten and some more"  /  "Count by 2s, 5s and 10s! 🧦✋🚂 Skip counting song"  /  "How many stars? ⭐ Counting quiz for kids"
and the hashtags #LearnToCount #KidsSongs #Shorts.   Pick "made for kids" for them as well.

AUDIENCE SETTING
Choose "Yes, it's made for kids". On made-for-kids videos YouTube turns off comments, end screens and cards, so the video ends with a clean
outro instead of "watch next" elements.

ALTERED / SYNTHETIC CONTENT QUESTION
The facts: the characters are animated; the singing and spoken voices and the music are AI-generated (the lead, double, harmony and children's-choir
voices are made from the Kokoro text-to-speech voices, re-timed and tuned to the melody; the band is a SoundFont orchestra). Read the question exactly
as YouTube words it in Studio and answer it honestly. The sentence "Made with animation and AI: the characters are animated, and the voices and music
are AI-generated." in the description is a safe extra.

CAPTIONS
The captions are already burned into the picture. The SRT file ({NAME}.srt) would show the same words a second time, so upload it only if
you want it for search or translation.
"""
    p = dest or os.path.join(DELIVER, "YOUTUBE_DESCRIPTION.txt")
    open(p, "w", encoding="utf8").write(txt); return p

def stage_deliver():
    master = os.path.join(HERE, "master.wav"); os.makedirs(DESK, exist_ok=True)
    if not valid_picture() and os.path.exists(PIC) and not picture_current():
        log("picture is older than its sources - re-rendering it now"); status("rendering the picture"); stage_picture()
    if not valid_picture(): log("no valid picture" + ("" if picture_current() else f": {PIC} is OLDER than index.html / data/song.json")); return False
    v1080 = os.path.join(DESK, f"{NAME}_1080p.mp4"); v720 = os.path.join(DESK, f"{NAME}_720p.mp4")
    aud = ["-c:a", "aac", "-b:a", "256k", "-ar", "48000", "-shortest", "-movflags", "+faststart"]
    if not sh(["ffmpeg", "-y", "-v", "error", "-i", PIC, "-i", master, "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy"] + aud + [v1080], name="mux 1080p"): return False
    if not sh(["ffmpeg", "-y", "-v", "error", "-i", PIC, "-i", master, "-map", "0:v:0", "-map", "1:a:0", "-vf", "scale=1280:720:flags=lanczos",
               "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", "-pix_fmt", "yuv420p", "-r", "30"] + aud + [v720], name="encode 720p", tries=2): return False
    sh(["ffmpeg", "-y", "-v", "error", "-i", master, "-c:a", "libmp3lame", "-b:a", "320k", os.path.join(DESK, f"{NAME}_song.mp3")], name="mp3")
    shutil.copyfile(master, os.path.join(DESK, f"{NAME}_master_48k.wav"))
    try: write_youtube_description()
    except Exception as ex: log("YOUTUBE_DESCRIPTION.txt failed:", ex)
    for f in (f"{NAME}.srt", f"{NAME}_script.txt", f"{NAME}_chapters.txt", "YOUTUBE_DESCRIPTION.txt"):
        src = os.path.join(DELIVER, f)
        if os.path.exists(src): shutil.copyfile(src, os.path.join(DESK, f))
    th = os.path.join(DELIVER, "thumbs")
    if os.path.isdir(th): shutil.copytree(th, os.path.join(DESK, "Thumbnails"), dirs_exist_ok=True)
    try:
        if not make_shorts(v1080, os.path.join(DESK, "Shorts")): log("some vertical clips failed (not fatal)")
    except Exception as ex: log("vertical clips failed (not fatal):", ex)
    rep = final_checks((v1080, v720)); log("FINAL CHECK:\n" + "\n".join(rep))
    open(os.path.join(DELIVER, "FINAL_REPORT.txt"), "w", encoding="utf8").write("\n".join(rep) + "\n")
    shutil.copyfile(os.path.join(DELIVER, "FINAL_REPORT.txt"), os.path.join(DESK, "FINAL_REPORT.txt"))
    write_readme(rep); return True

def write_readme(rep):
    txt = """KIDDOVERSE LEARN #5 - "Gizmo's Counting Machine"   (finished __NOW__)
==============================================================================

THE VIDEO
  KiddoVerse_Learn5_1080p.mp4   <- upload this one to YouTube (best quality)
  KiddoVerse_Learn5_720p.mp4    <- smaller file for phones / WhatsApp
  Length about 3 min, fast and bright like the big kids' channels: Gizmo's counting machine has a full ten-frame, so the crew counts on from TEN up to TWENTY.
  Each number 11-20 gets a stop: "Ten and three more!" (the extra counters drop into a second ten-frame) -> the kids say "Thirteen!" and Gizmo's display lights up ->
  counting on ("eleven, twelve, thirteen!", a badge on each counter) -> what the machine counted ("Thirteen apples!").
  A quiz round after 14 ("What comes after fourteen?"), another after 20 ("How many stars?"), then skip counting: by 2s (socks in pairs), by 5s (fingers on a hand),
  by 10s (ten-frame train), a last quiz ("Two, four, six, what comes next?") and a bye-bye in a higher key.
  The video ends with a clean outro. It does not depend on YouTube end screens or cards.

OTHER FILES
  YOUTUBE_DESCRIPTION.txt               three title options, the description, hashtags, tags, chapters and the made-for-kids / AI wording, ready to paste
  FINAL_REPORT.txt                      the automatic PASS/FAIL checks (also listed below)
  KiddoVerse_Learn5.srt                 captions file (optional: the captions are already burned into the picture)
  KiddoVerse_Learn5_chapters.txt        chapter list for the description (first line must stay 0:00)
  KiddoVerse_Learn5_script.txt          all the words that are sung / spoken
  KiddoVerse_Learn5_song.mp3 / _master_48k.wav   the audio only
  Thumbnails\\                           three thumbnail pictures (pick the clearest one)
  Shorts\\                               three vertical 1080x1920 clips (theme + eleven, counting by 2s 5s 10s, twenty + the star quiz); each starts and ends between two lines.

CHECKS DONE AUTOMATICALLY (measurements only, the pipeline did not listen to the result)
__REP__

BEFORE YOU PUBLISH
  1. Audience: choose "Yes, it's made for kids". On made-for-kids videos YouTube does not offer end screens or cards, and comments are off.
  2. Altered / synthetic content question: the characters are animated; the singing voices, spoken voices and music are AI-generated. Read YouTube's question as
     worded in Studio and answer it honestly. This project does not state that YES is mandatory.
  3. Channel name and trademark: KIDDOVERSE is a registered US trademark (22LEARN, LLC, Reg. 5762831). Decide the channel name BEFORE uploading: the name is in the logo,
     the thumbnails, the captions AND the sung audio ("Kid-do-verse!"). This is not legal advice.
  4. Voices: every voice (lead, double, harmony, the children's choir, the characters) is made from Kokoro text-to-speech voices (Apache-2.0), re-timed and tuned to the melody
     with the WORLD vocoder; the children's choir is three adult voices shifted to a child-like timbre. No real person's voice or recording was used. Gizmo's display beeps and
     the counting sounds are synthesised; no recordings were used.
  5. Listening check: the automatic checks above are measurements, not listening. Play the video once all the way through; if a word sounds unclear, note the time
     (for example "1:50 seventeen") so that line can be re-sung.
     Words that the speech-recognition proxy found hardest (please listen to these first): __HARD__
  6. Music is an original arrangement played with a commercially-usable SoundFont (GeneralUser GS); fonts are open-licence.
  7. Pronunciation: American English.
"""
    txt = txt.replace("__NOW__", now()).replace("__REP__", "\n".join("  " + r for r in rep))
    open(os.path.join(DESK, "README_START_HERE.txt"), "w", encoding="utf8").write(txt)
