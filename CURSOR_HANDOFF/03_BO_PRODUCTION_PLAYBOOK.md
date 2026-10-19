# 03 — BO AND THE PANCAKE · PRODUCTION PLAYBOOK

How an episode is actually built, rendered, checked and delivered on this machine. Everything here was read from the working scripts in `hyperframes/` (`mk_s6_setup.py`, `mk_s7_setup.py`, `mk_template_s6.py`, `mk_audio_n.py`, `run_episode.ps1`, `qa_episode.py`, `run_queue_s7.ps1`, `chk_js.cjs`, `errprobe.cjs`, `stageshot.cjs`, `spaceprobe.cjs`, `subs.py`) and from the notes written while building ep17–35. All paths are relative to `C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes` unless absolute.

---

## 1. Architecture in one minute

- An **episode is one self-contained HTML file** (`toonN/index.html`, ≈ 200–250 KB): an inline 2600×2200 SVG "world", a `#cam` wrapper that is panned/zoomed, overlay layers (captions `#caps/#capsB`, end-card `#sticker`, `#flash`, `#vig`, `#dim`), and a **paused GSAP timeline registered as `window.__timelines.main`** (30 s). HyperFrames loads the page, seeks the timeline frame by frame, screenshots it, and muxes the pre-made audio. Everything must be **deterministic and seekable** (no `Math.random` at runtime, no real-time clocks).
- The composition root: `<div id="root" data-composition-id="main" data-start="0" data-duration="30" data-width="1080" data-height="1920" data-fps="30">`.
- **Each episode's template is the previous episode's template + this episode's new code.** `mk_template_s6.py N` copies `toon{N-1}/build/template.tpl` (the part before `/* ===== captions ===== */`), injects `_defsN.js` and `_initN.js`, then appends the shared helper header and `_bodyN.js`. So helpers defined in earlier `_init*/_defs*` files are available forever; **body code is not inherited**.
- Audio is produced by Python **before** rendering: `tts.py` (Kokoro voices + Whisper word times → `words.json`), `audio.py` (voice track + synthesised music + SFX → `assets/vo.wav`, `music.wav`, `sfx.wav`), then HyperFrames mixes them into the MP4. `qa_episode.py` then levels loudness.

## 2. Folder layout of one episode (`toonN/`)

| Path | What | Made by |
|---|---|---|
| `tts.py` | the 11 voice lines (`LINES`) + synth script | `mk_sN_setup.py` |
| `assets/vo/lineK.wav`, `words.json` | voice wavs + per-word timings, durations (`dur`), caption chunks, speaker tags | `python tts.py` (run inside `toonN`) |
| `plan.json` | `{"LINE_T": {"1":0.6, "2":3.05, …}}` start time of each line | `python mk_s6_setup.py plan N` |
| `_defsN.js` | NEW SVG props/characters for this episode (runs before `FLOOR` etc. exist → use literals) | you |
| `_initN.js` | start state = last frame of the previous episode + helpers that later episodes also need (**accumulates**) | you |
| `_bodyN.js` | scenes + timeline for this episode (**not inherited**) | you |
| `_audioN.py` | audio recipe: `TITLE`, `moments`, `extra`, `events`, `music` strings | you |
| `build/template.tpl` | assembled template with `__PLAN__` placeholder | `python mk_template_s6.py N` |
| `build.cjs` | words.json + plan.json + template → `index.html` | copied by setup |
| `audio.py` | generated from toon3's audio engine + all earlier SFX + `_audioN.py` | `python mk_audio_n.py N` |
| `assets/fonts/baloo-2-latin-800-normal.woff2`, `vendor/gsap.min.js` | copied by setup | setup |
| `output/bo-and-the-pancake-N.mp4` / `-final.mp4` | raw render / levelled final | render / QA |
| `qa/sheet.png`, `qa.out`, `render.log` | contact sheet (5×3, one frame every 2 s), ASR transcript, render log | QA |
| `snapS/` | preview stills | `hyperframes snapshot` |

## 3. Environment (paste at the top of every PowerShell session / script)

```powershell
$h  = 'C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes'
$ff = 'C:\Users\softenic\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin'
$env:PATH += ";$ff"
$env:PYTHONIOENCODING = 'utf-8'
$env:PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS   = '300000'
$env:PRODUCER_PLAYER_READY_TIMEOUT_MS      = '300000'
$env:PRODUCER_RENDER_READY_TIMEOUT_MS      = '300000'
$env:PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS= '300000'
Set-Location $h
```

Python = `C:\Users\softenic\AppData\Local\Programs\Python\Python312\python.exe` (needs `kokoro_onnx`, `soundfile`, `numpy`, `faster_whisper`). Kokoro models: `%USERPROFILE%\.cache\kokoro-onnx\kokoro-v1.0.onnx` + `voices-v1.0.bin`. Node ≥ 22.12 (`C:\Program Files\nodejs\node.exe`). HyperFrames CLI: `node node_modules/hyperframes/bin/hyperframes.mjs <snapshot|render|lint|…>`.

## 4. Build a new episode — the exact chain (example: ep36)

### 4.0 Write the script first (get the user's OK)
11 lines; `(speaker, text, caption chunks)`. Rules: **4–7 words per line, ≈ 50–62 words in total, aim ≈ 56** (eps 3–35 ran 48–74); plain words only; caption chunks = 2–3 words each, ALL CAPS, break at natural pauses; the **sum of voice durations + 0.36 s gaps + 0.6 s lead-in must end line 11 before ≈ 26.6 s** (the planner prints a WARNING otherwise). Line 1 continues the previous cliff-hanger; line 11 = cliff-hanger / "end of Season N".

### 4.1 Voice lines → `tts.py` for each new episode
Copy `mk_s7_setup.py` to `mk_s8_setup.py`. Change `EPS = {36: ("Title", {}, {1: NAR('…', ['…','…']), 2: BO('…', […]), …}), …}`. The helper lambdas (`NAR BO MOCHI ZAP COCO TRUF BLIP GUM BOO PEAN JIG BABY MUNCH EVERY`, `KING`, `PEB`) come from `mk_s6_setup.py` (see the voice table in `02_BO_STORY_BIBLE.md` §5). A **new character needs a new lambda** `("'kokoro_voice'", speed, text, chunks, 'TAG', pitch, filter)`. In `setup()` replace the title string of the base file you copy from (`toon25/tts.py` contains `'Bo and the Pancake 25: Festival Finale'`). Run:

```powershell
python mk_s8_setup.py          # creates toon36..40 (assets/fonts, vendor, build, build.cjs) + tts.py
```

### 4.2 Speak + time the words (≈ 1–8 min per episode, one at a time)
```powershell
cd toon36 ; python tts.py *> tts.out ; cd ..          # Kokoro per line (+ pitch via ffmpeg) + Whisper word timing → words.json
python mk_s6_setup.py plan 36                          # → plan.json (prints line start times + 'ends X s'; WARNING if line 11 ends after 26.6 s)
```
`tts.py` re-uses existing `assets/vo/lineK.wav`; delete a wav to force a re-speak after editing text. `run_tts_s7.ps1` is the batch pattern (one ep at a time, appends to `tts_chain7.log`). Kokoro mangles interjections/made-up words → write plain words.

### 4.3 Write the picture code
Start from the previous episode: `Copy-Item toon35\_init35.js toon36\_init36.js` etc. and read `toon35/_body35.js` as the model.
- `_defs36.js` — new SVG defs/props (`mkPan`, `mkRock`-style builders). Executed **before** `FLOOR`/`ROW*` exist → use numeric literals (e.g. 1640).
- `_init36.js` — set the start state (positions of every character = the **last frame of ep35**), then any helper later episodes need. Don't redeclare helpers that exist (`toon21/_init21.js` staging system, `toon26/_init26.js` egg/Pebble helpers, `toon31/_init31.js` + `toon33/_init33.js` race helpers).
- `_body36.js` — **must begin with** `/* ===== this episode's key moments` (the template builder cuts the shared header there). Use `L[n]` (line start), `DU[n]` (line duration), `W(n,i)` (word start), `tl` (the GSAP timeline), the camera/staging helpers in §6, and finish with `window.__timelines.main = wrapDepth(tl)` only if the previous bodies do (check `_body35.js` tail; the depth wrapper is part of the template chain from ep21 on).
- `subs.py file pairs.py` applies exact-string replacements with count checks (`PAIRS=[(old,new[,count])]`) — use it for surgical edits instead of ad-hoc regex.

### 4.4 Add the episode to the template builder, assemble, check
Edit `mk_template_s6.py` → `META[36] = ("Title", "END-CARD<br>LINE 1", "CALL TO ACTION")` (and make sure `META[35]` exists — it does). The builder asserts that the previous episode's `<title>` and two `stk1/stk2` strings occur **exactly once** in its template.
```powershell
python mk_template_s6.py 36        # toon36/build/template.tpl
node toon36\build.cjs               # → toon36/index.html (words.json + plan.json inlined)
node chk_js.cjs toon36              # syntax of each <script>, 'called but never declared', every getElementById mount exists
node errprobe.cjs toon36            # opens the page: prints PAGEERROR / console errors, and {tl:true, dur:30}
```
`errprobe` must print `dur` ≈ 30 and no PAGEERROR. A **blank frozen scene** almost always means a runtime exception (e.g. `camTo(...CAM.x)` with a key missing in `CAM` → "undefined is not iterable").

### 4.5 Audio recipe → wav files
`_audio36.py` defines (see `_audio35.py` as model): `TITLE`, `moments` (Python constants mirroring the JS timings, e.g. `tF = W(6,2)+.02`), `extra` (new SFX functions), `events` (`S(time, sfx_fn, gain)` list: footsteps, whooshes, boings, sparkles, cheers, per-word chimes), `music` (120-BPM chord/melody generator). Then:
```powershell
python mk_audio_n.py 36            # → toon36/audio.py (= toon3 engine + SFX library of all earlier eps + _audio36.py)
cd toon36 ; python audio.py ; cd ..  # → assets/vo.wav, music.wav, sfx.wav
```
When choreography changes, **re-time the footstep/impact cues in `_audioN.py`, then re-run both commands**.

### 4.6 Look at it (stills, not a render)
```powershell
node node_modules/hyperframes/bin/hyperframes.mjs snapshot toon36 -o toon36/snapS --at 2,6,10,14,18,22,26,29 --no-end
node spaceprobe.cjs toon36 auto --brief         # hidden faces (elementsFromPoint) + edge crops; --sizes = world sizes/eye offsets
node stageshot.cjs toon36 12.5 out.png layout.json   # freeze at t, optionally try camera/character marks without rebuilding
```
`spaceprobe` flags: "face 0 % + 86 % off-frame" in a close-up = that character is out of shot, not a bug. Edge flags in close-ups are normal. Read each still (the agent can view images). Check: faces visible, nobody cut by the frame, captions not covering faces, speaker is in front, end card readable.

### 4.7 Render + QA + deliver (one episode or a queue)
Single episode: `powershell -File run_episode.ps1 -N 36 -Title The_Map_in_the_Pan -Cover 22.0` (Cover = the second to export as `…_COVER.png`; pick a full-frame moment without captions). It does: render (`--workers 1 --fps 30`) → `qa_episode.py` → copy to `Desktop\Content Creation\Videos` → cover PNG → appends to `run_episode.log` ("ep N delivered HH:MM:SS" or "FAILED").
Queue (resumable, waits while any `hyperframes.mjs render` is running): copy `run_queue_s7.ps1` to `run_queue_s8.ps1`, edit `$eps = @(@(36,'The_Map_in_the_Pan',22.0), …)`. **Launch detached** (survives the session):

```powershell
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
  CommandLine      = 'powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\run_queue_s8.ps1'
  CurrentDirectory = 'C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes' }
```
Then poll `run_episode.log`, `toonN\render.log` (tail) and `Get-CimInstance Win32_Process` for `hyperframes.mjs render`. A render takes ≈ 5 min (5–8 when the PC is busy).

`qa_episode.py N` (also run alone from `hyperframes\`): probes the raw render, measures loudness, writes `-final.mp4` with `volume=<gain>dB, alimiter=limit=0.84`, target **-14.2 LUFS**, prints final LUFS/true peak/size, makes `qa/sheet.png` (5×3 contact sheet) and prints a faster-whisper `small.en` transcript. **Deliver only if**: duration 30.0 s, 1080×1920, ≈ -14.2 LUFS (-14.2/-14.3 was normal), transcript matches the 11 lines, contact sheet looks right.

### 4.8 After delivery
Append the episode to the memory/notes (title, what was new, gotchas); update `02_BO_STORY_BIBLE.md` (episode guide + continuity), `hyperframes/seasonN_final/` copy of the finals if the season is complete; rebuild the gallery: `node hyperframes/learn1/deliver/build_gallery.cjs` (hard links, re-runnable → `Desktop\KiddoVerse_ALL_VIDEOS\index.html`, includes all Bo episodes).

## 5. Pending job right now: render Season 7 (ep31–35)

State on 2026-10-13: `toon31…toon35` have `index.html`, `audio.py`, `words.json`, `plan.json` (all built). The queue ran at 14:43; **ep31 failed with "FFmpeg cannot start … Failed to run …\ffmpeg.exe -version"**, the queue went on to ep32 whose render was at 58 % when its process disappeared; `output/` is empty for 31, has only a `.hf-transaction-*` folder for 32, and does not exist for 33–35. `ffmpeg -version` works now. The cause of the failure was **not determined** (candidate causes: memory pressure while another job ran, antivirus/file lock, session restart).

Safe procedure:
1. `ffmpeg -version` in the same kind of shell the queue uses (detached). Confirm no `hyperframes.mjs render`/`run_all`/`run_final` process is running.
2. Delete the stale `toon32\output\.bo-and-the-pancake-32.hf-transaction-*` folder only after confirming it belongs to a dead render.
3. Optionally check each S7 episode first: `node chk_js.cjs toonN`, `node errprobe.cjs toonN`, snapshots (they were built but this session could not verify every frame).
4. Launch `run_queue_s7.ps1` detached (command in §4.7 with `run_queue_s7.ps1`). Expected delivery names: `31_Bo_and_the_Pancake_31_The_Great_Pancake_Race.mp4`, `32_…_The_Syrup_River`, `33_…_Flat_Tire`, `34_…_The_Dark_Tunnel`, `35_…_Photo_Finish` + `…_COVER.png`.
5. Poll; when a render fails again, read the **first** error in `toonN\render.log` (the progress bar spam is long; search for `✗`/`Error`).

## 6. Engine reference (what the helpers are; open the defining file before using)

Names below were taken from the generated `toon35/index.html` and the build notes. **Verify the signature in the source before calling** (`grep -n "function name" toon*/_init*.js`).

**Timing:** `tl` (the GSAP master timeline) · `L[n]` start of voice line n · `DU[n]` duration · `W(n,i)` start of word i in line n · `T0`.
**Camera:** `camSet(t,x,y,s,sx,sy)` · `camTo(t,dur,x,y,s,sx,sy,ease)` (most calls spread a preset: `camTo(L[2]-.4,.7,...CAM.mc,'power2.inOut')`) · `camOn(eyeX,eyeY,s,sx,sy)` frames a speaker's eyes at a screen spot · `camE(ex,ey,s,sx,sy)` unclamped eye camera · `eyeAt(p,x,y,s)` · table `EYE` of eye offsets per character · wide shot for 14 characters = `[380,-220,.53]` (King scale 1.5, Gumdrop 1.05; Boo parks at (1650,330,.75)). A missing key in the `CAM` object throws at load.
**Depth staging (from `toon21/_init21.js`):** rows `ROWB`=1640 (back), `ROWF`=1840 (front, in the gaps of the back row), `ROWD`=2060 (front of stage, featured characters), `ROWJ`=2170 (Jiggles). Bo needs `+BOY` (=70) on his y. `#depthLayer` + `depthSort()` draw whoever stands lower in front, re-sorted every frame because the body ends with `window.__timelines.main = wrapDepth(tl)` (wraps `tl` in a master timeline with setter tweens). Frame-fixed objects (thermometer, banners, glow, scoreboard) go in `fxMount` so characters don't cover them. Big props (egg `eggW`, baby `pb` in `pbMount`, pile `pileW`) live in the depth layer.
**Characters (mount prefixes seen in the page):** `bo` (Bo), `mc` (Mochi), `zp` (Zap), `cm` (Coco), `tf` (Truffle), `gm` (Gumdrop), `gh` (Boo), `pt` (Peanut), `nm` (Nibbles), `rk` (Rocky), `bp`, `jg` (Jiggles; `j1…j4`), `kg` (King), `pb` (Pebble), `g5`, `gp`, `ck`. Mount ids in the page: `boMount, mcMount, zpMount, cmMount/cocoMount, tfMount, gmMount, ghMount, ptMount/peanutMount, nmMount/nbMount, rkMount, bpMount, jgMount, pbMount, pigMount, twMount, ufoMount/ufoLMount, bowlMount, cheeseMount, feastMount, griddleMount, ovenMount, panMount, pizzaMount, setMount, litterMount, wedgeMount, bananaMount, bannerMount, fxMount, g5Mount, gpMount, ckMount` — **z-order is the mount order in the template**: Bo is drawn above every other character, the tower/feast mount above all characters, so never stand Bo in front of whoever is speaking.
**Faces & talking:** `bTalk(t0,t1)`, `brows(...)`, `eyesMode(t,'wide'|'lids'|'happy'|'O')`, `look(...)`, per-rig objects `MC.m/.talk/.brows/.eyes`, `ZP.talk/.eyes`, `PB.m/.eyes`, group helpers `faces2(t,'wide','Big')`, `lookAll2(t,dx,dy)`, `mcEyes`, `tintGum(prefix,color)` (re-tint a rig; Pebble = `tintGum('pb',PBC)` + `feColorMatrix saturate` filter `fSat`, 0 = gray). Bo's rig has an **offset pivot**: at scale s his position shifts by `(1-s)*(-274,-746)` → use `chPos()` when scaling him.
**FX:** `sparks(t,x,y,n,spread)`, `confetti`, `burst`, `hearts`, `dust`, `steam`, `bubbles`, `sprinkle`, `drops`, `shake(t,a,b)`, `pingAt`, `runTo`, `cycle`.
**Race helpers (S7):** karts `KRC{cm,tf,zp,mc,bo}` on 5 `LANE` y's; `place`, `drive`, `driveBo`, `driveY`, `wheels`, `bumpKart`, `trail`, `speedLines`; `camE`; scenery layers `#rsDash #rsFence #rsMid #rsFar #rsCloud` scrolled by ONE tween per layer via `scrollProfile(pts,T)` (speed profile; sequential tweens on a wrapped layer break); ground objects (river, tunnel, finish gantry, crowd) use `SPD.ground(id,x0)`; `scrollBy`, `groundMove`.
**Egg set (S6):** `runTo, confetti, bTalk, SQC, JQ, pingAt, eggWobble, eggBump, crack, lookAll2, faces2, MN, PB, PBS=.42, EGX/EGY/EGS` live in `toon26/_init26.js`.

## 7. Audio engine notes
`toon3/audio.py` is the base: tiny numpy synth (`midi()`, instruments, `sfx_*` library accumulated over episodes: boing, whoosh, sparkle, pop, cheer, engine, rocket, firework, stickerpop, stack drops, crunch, gulp, rumble, roar, trumpet, heart, ting, chirp, tick, riser, swell, skidslide, camera…), ducking of music under voice, final `tanh` soft clip. Music per episode = a 120-BPM chord/arp/melody generator in `_audioN.py:music`, with sections keyed to line times (`L[k]`). Footsteps/impacts must be re-timed whenever the choreography moves. Loudness is fixed afterwards by `qa_episode.py`.

## 8. Gotchas (all of these happened — in order of how much time they cost)
1. **PC contention.** 2 cores, 7.7 GB, often shared with the KiddoVerse pipeline (SoulX singing, 1080p render). Snapshots/renders then die with "Navigation timeout of 10000 ms" → the four `PRODUCER_*` env vars (§3). Run ONE Bo render at a time; the queue scripts wait for any `hyperframes.mjs render` to end. **Never taskkill processes you didn't start.**
2. **Detached jobs.** `Start-Process -WindowStyle Hidden` and `nohup &` died at session restarts (a render was killed at 58 %). Use `Invoke-CimMethod Win32_Process Create` (§4.7). A killed render restarts from 0 — the CLI cannot resume.
3. **ffmpeg not on PATH** of fresh/detached shells → prepend the Gyan `bin` (scripts do). "FFmpeg cannot start" = ffmpeg missing or unrunnable (see §5).
4. **GSAP `fromTo` ignores properties that exist only in the from-vars** → switch opacity on with a separate `tl.set`.
5. **Don't add `svgOrigin` to an element after it already has x/y** (pivot jumps far away). A **new rig prefix needs `svgOrigin:'0 0'`** before any x/y/scale (see init26 'pb'); a child group's x/y must be applied after svgOrigin; offsets inside a scaled rig are in unscaled units (divide by the scale).
6. **Const names in the shared template head clash** with new ones: `BOS` (shared head), `RK` (renamed `KRC`), `MW` (renamed `MWH`), `NS`, `RKX`, `T0` … → rename yours; `chk_js.cjs` reports syntax errors. Body consts are NOT inherited (only defs+init accumulate) → shared helpers go in `_initN`. A late-defined helper (e.g. `cmEyes()`) cannot be called from `_init`.
7. **`_defsN.js` runs before `FLOOR`/`ROW*` exist** → literals only. A missing key in `CAM` → `camTo(...CAM.x)` throws and the page is an empty frozen scene → run `node errprobe.cjs toonN`.
8. **GSAP `stagger` + `repeat`** repeats the whole group (`stagger*n + dur`): a repeat sized to a single tween makes the timeline 40+ s → size it ≈ `dur + stagger*n`.
9. **BOM:** PowerShell `Set-Content -Encoding utf8` writes a BOM → write with `[IO.File]::WriteAllText(p, s, (New-Object Text.UTF8Encoding($false)))`.
10. **PowerShell alias clash:** `R`/`r` is `Invoke-History` — never name a function `R`.
11. **Z-order is fixed by template mount order** (Bo above everyone; tower/feast above all) — don't stand Bo in front of the speaker; Nibbles (`nm`)/Peanut (`pt`) get hidden behind Bo/Truffle in back rows → give them front-row/edge spots.
12. **Kokoro garbles "Aww!", "Boh-boh"** etc. → plain words; re-voice by deleting `assets/vo/lineK.wav` and re-running `tts.py`.
13. HyperFrames lint prints warnings (`overlapping_gsap_tweens`, `composition_file_too_large` ≈ 2000 lines) and **continues** ("Continuing render despite lint issues") — they are not failures.
14. Season-5 lesson: ~12 characters piled into 40 % of the frame hid faces. Use the depth rows + `camOn` close-ups; run `spaceprobe` before rendering.
15. Sound: `audio.py` needs `ffmpeg` on PATH (pitch shift uses `asetrate/atempo`); Kokoro first load takes ~3–30 s.

## 9. Season-8 kick-off checklist
1. Read ep35's last frame state: `toon35/_init35.js` + `_body35.js` end (positions of every character, the pan, the tower, fireworks) → this is `_init36` start state.
2. Decide the script with the user (`08_NEXT_STORYLINES.md` has a full draft). Voice lines → `mk_s8_setup.py`.
3. Add `META[36..40]` to `mk_template_s6.py`.
4. Build ep36 completely (render + deliver) **before** starting ep37 — mistakes in shared `_init` code propagate down the chain.
5. After each episode: `qa.out` transcript check, contact sheet view, user listens.
