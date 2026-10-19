# ALL-IN-ONE PASTE — Bo and the Pancake + KiddoVerse handoff pack

**For the AI reading this:** this single file is a complete reference pack for continuing two kids' video series (Bo and the Pancake, KiddoVerse). It contains: the start-here README, the master rules, a mega prompt + story/brand bible + production playbook for each series, fill-in templates, next-storyline drafts and an appendix of every voice line. Read all of it. The user will then give you ONE task; follow the matching MEGA PROMPT section (file 01 for Bo, file 04 for KiddoVerse), answer first with your understanding + plan, and WAIT for approval. If you have no file/terminal access you cannot render anything — then produce scripts, lyrics, storyboards, prompts and exact commands for the user to run, and say so.



==================================================================================================
# FILE: README_START_HERE.md
==================================================================================================
# CURSOR HANDOFF PACK — Bo and the Pancake + KiddoVerse

Everything another AI coding agent (Cursor, or any agent with file + terminal access) needs to **continue making your videos exactly the way they have been made so far**: the story canon, the character voices, the art style, the build pipeline, the traps that cost days, and ready-to-paste "mega prompts".

Snapshot date: **2026-10-13**. Workspace root: `C:\Users\softenic\Downloads\ai-video-studio-kit`.

---

## 1. Quick start in Cursor (5 minutes)

1. **File → Open Folder →** `C:\Users\softenic\Downloads\ai-video-studio-kit` (the kit root, NOT a sub-folder).
2. The rules in `.cursor/rules/` load by themselves (`studio-core.mdc` is always on; the Bo and KiddoVerse rules attach when you touch their folders). Nothing to paste for the basics.
3. Open a new **Agent** chat. Pick the strongest agent model your Cursor plan offers and turn on its "thinking/max" mode if there is one — these jobs are long, multi-file and unforgiving.
4. Paste ONE mega prompt, then fill in its `TASK` block at the bottom:
   - Bo and the Pancake → `01_BO_MEGA_PROMPT.md`
   - KiddoVerse → `04_KIDDOVERSE_MEGA_PROMPT.md`
   - (Both start with `00_MASTER_PROMPT.md` rules; they already include the important ones, paste `00` only if you use a chat tool that ignores `.cursor/rules`.)
5. Tell the agent to **plan first and wait for your OK** (the prompts already say so). Read the plan, answer its questions, then let it build.

> If your AI tool has NO file/terminal access (a plain chat window), paste `ALL_IN_ONE_PASTE.md` instead. That agent can write scripts, lyrics, storyboards and prompts, but it cannot render anything — you would have to run the commands yourself.

---

## 2. What is in this folder

| File | What it is | Who reads it |
|---|---|---|
| `00_MASTER_PROMPT.md` | Studio-wide rules, machine limits, never-do list, working method | paste once / rules |
| `01_BO_MEGA_PROMPT.md` | **Paste-ready prompt** for any new Bo and the Pancake episode or season | paste |
| `02_BO_STORY_BIBLE.md` | Canon: world, 29+ characters (look, voice, catchphrase), running gags, episode guide ep1–35, continuity wrinkles | reference |
| `03_BO_PRODUCTION_PLAYBOOK.md` | Exact build chain, file formats, engine helpers, render/QA/delivery, every gotcha | reference |
| `04_KIDDOVERSE_MEGA_PROMPT.md` | **Paste-ready prompt** for any new KiddoVerse learning video / short | paste |
| `05_KIDDOVERSE_BIBLE.md` | Brand, crew of 7, colours, fonts, sonic logo, safety rules, Learn #1 and Learn #2 canon, publishing/legal notes | reference |
| `06_KIDDOVERSE_PRODUCTION_PLAYBOOK.md` | Song data model, audio pipeline (SoulX-Singer / Kokoro chant / mix), picture build, delivery, traps | reference |
| `07_TEMPLATES_AND_GENERIC_VIDEO_PROMPTS.md` | Fill-in briefs + character/style prompt blocks for any **hosted** text-to-video / image tool | paste |
| `08_NEXT_STORYLINES.md` | **Season 8 full draft (ep36–40)**, Season 9/10 pitches, guest-character plan, next KiddoVerse episodes | pick & approve |
| `09_APPENDIX_ALL_VOICE_LINES.md` | Every voice line of every Bo episode (auto-extracted from the `tts.py` files) | reference |
| `ALL_IN_ONE_PASTE.md` | All of the above in one file for chat tools without file access | paste |

Also installed for you: `.cursor/rules/studio-core.mdc`, `bo-and-pancake.mdc`, `kiddoverse.mdc`.

---

## 3. Current state (verified 2026-10-13, ~15:10)

**Bo and the Pancake**
- Episodes 1–30 are rendered, levelled (≈ -14.2 LUFS) and delivered in `C:\Users\softenic\Desktop\Content Creation\Videos\` (video + COVER png each).
- **Season 7 (ep31–35 "The Great Pancake Race") is fully BUILT (index.html + audio recipe + voice lines) but NOT rendered or delivered.** The render queue (`hyperframes\run_queue_s7.ps1`) ran at 14:43 today and **ep31 FAILED with "FFmpeg cannot start"**; ep32's render died at 58 %. No render process is running now. FFmpeg itself works again (`ffmpeg -version` OK), so the fix is simply to re-launch the queue (see `03_BO_PRODUCTION_PLAYBOOK.md` §9). Nothing else is broken that I could find.
- Next creative step after S7 is delivered: **Season 8** (the S7 end card promises "SEASON 8 COMING SOON"). A full draft is in `08_NEXT_STORYLINES.md`.

**KiddoVerse**
- Delivered: *Zoom, Zoom, Kiddoverse!* (3:16 music video) and **Learn #1 "Count, ABC & Read with KiddoVerse"** (5:54, polished v2 delivered 2026-10-12).
- **Learn #2 "The Color Train" (302 s, 108 BPM, six colours) is IN PROGRESS** in `hyperframes\learn2\`. Files were being edited today between 14:08 and 14:44 (song data, storyboard, singer v3 stems, composition `index.html`). It has no `data/sfx.json`, no render, nothing in `deliver\`. Another Claude session may still be working on it — check before touching (see `06_...` §8).
- Open decisions that only YOU can make: the **channel name** (KIDDOVERSE is a registered US trademark of 22LEARN, LLC, Reg. 5762831 — not legal advice) and the YouTube AI-disclosure answer. See `05_KIDDOVERSE_BIBLE.md` §9.

---

## 4. Machine facts every agent must respect

- Windows 11, **2 CPU cores, ~7.7 GB RAM**. One heavy job at a time. A Bo render is ~5–8 min; a KiddoVerse 1080p render is 40–60 min; singing on CPU is 4–10 min per line.
- Node ≥ 22.12, Python 3.12 (`C:\Users\softenic\AppData\Local\Programs\Python\Python312\python.exe`), ffmpeg = WinGet *Gyan.FFmpeg 9.0.2 full build* (`...\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin`) — it is **not always on PATH** of detached shells.
- HyperFrames **0.8.40** + GSAP **3.13.0** pinned in `hyperframes\package.json`. Do not upgrade.
- Kokoro TTS (local, Apache-2.0) models in `~\.cache\kokoro-onnx\`; faster-whisper `small.en` for word timings and QA.
- Cursor itself is already on this machine's PATH (`C:\Program Files\cursor\resources\app\bin`).

---

## 5. Honest limits (read once)

- An AI agent **cannot watch or hear** the finished video. Everything it reports (ASR transcripts, loudness, contact sheets, overlap probes) is a proxy. Always play each final MP4 yourself and give the agent timestamps of anything off ("0:14 Mochi's mouth", "3:12 letter F").
- Nothing here guarantees views, revenue or YouTube approval for made-for-kids / AI content. The KiddoVerse bible lists the policy facts that were checked and the ones that were not.
- The story drafts in `08_NEXT_STORYLINES.md` are **proposals**, not canon. Canon = what is already rendered (`02_BO_STORY_BIBLE.md`).



==================================================================================================
# FILE: 00_MASTER_PROMPT.md
==================================================================================================
# 00 — MASTER PROMPT (studio-wide rules)

Paste this once at the start of a chat if your tool does not auto-load `.cursor/rules/`. The series prompts (`01_…`, `04_…`) repeat the essentials, so this is optional in Cursor.

---------------------------------------------------------------- COPY FROM HERE ----------------------------------------------------------------

You are the **showrunner, animation engineer and audio producer** for a one-person, zero-cost kids'-video studio. You continue an existing production; you do not start a new one. Two series live in this workspace (`C:\Users\softenic\Downloads\ai-video-studio-kit`):

1. **Bo and the Pancake** — 30-second vertical (1080×1920, 30 fps) cartoon shorts, 35 episodes made (7 seasons of 3–10 episodes). Folders `hyperframes/toon`, `toon2` … `toon35`.
2. **KiddoVerse** — a sing-along / learning brand for toddlers and preschoolers, 16:9 (1920×1080) long videos plus vertical Shorts. Folders `hyperframes/kiddoverse`, `hyperframes/learn1`, `hyperframes/learn2`, `hyperframes/kv_short_*`.

Everything is **code-generated**: SVG characters animated with GSAP inside an HTML composition, rendered to MP4 by HeyGen **HyperFrames 0.8.40** (GSAP **3.13.0**), voices by local **Kokoro** TTS (+ SoulX-Singer for sung KiddoVerse lines), music/SFX synthesised in Python, QA with **faster-whisper** and **ffmpeg**. There is no paid service in the loop and none should be added without asking me first.

## Read before you act
- `CURSOR_HANDOFF/README_START_HERE.md` (state + map), then the bible and playbook of the series you are about to touch (`02/03` for Bo, `05/06` for KiddoVerse).
- The previous episode's files (`toonN/_initN.js`, `_bodyN.js`, `tts.py`, `build/template.tpl`) or the previous video's `build/*.js` + `data/song.json`. **New work is always built from the previous work, never from scratch.**

## Hard rules (each one cost hours once)
1. **Machine = 2 cores / 7.7 GB.** Run exactly ONE heavy job (render, singing, whisper-large) at a time. Before any render run `Get-CimInstance Win32_Process | ? { $_.CommandLine -match 'hyperframes\.mjs render|run_all|run_final' }` and wait if something is running.
2. **Never kill processes you did not start.** No `taskkill`/`Stop-Process` on python/node/ffmpeg unless I say so; never let a sub-agent do it. A helper once killed the singer mid-song.
3. **Long jobs run detached**, outside your session, using `Invoke-CimMethod -ClassName Win32_Process -MethodName Create` (PowerShell `Start-Process -WindowStyle Hidden` and bash `nohup &` both died at session restarts). After launching, verify the process exists, then poll its log — do not assume.
4. **ffmpeg may be missing from PATH** in detached/new shells: prepend the Gyan `bin` folder (path in README §4). If a render says "FFmpeg cannot start", fix PATH and re-run — do not reinstall.
5. Set these env vars for every HyperFrames snapshot/render (the PC is slow): `PRODUCER_PAGE_NAVIGATION_TIMEOUT_MS=300000 PRODUCER_PLAYER_READY_TIMEOUT_MS=300000 PRODUCER_RENDER_READY_TIMEOUT_MS=300000 PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS=300000`.
6. **Never edit a composition `index.html` while a render of it runs** (KiddoVerse treats a render older than `index.html` as stale and re-renders from 0; the CLI cannot resume).
7. **Write files as UTF-8 WITHOUT BOM.** PowerShell `Set-Content -Encoding utf8` adds a BOM and breaks JS/JSON; use `[IO.File]::WriteAllText(path, text, (New-Object Text.UTF8Encoding($false)))`, or write with your editor tool.
8. **Do not invent canon.** Characters, voices, catchphrases, colours, fonts, loudness targets and delivery names are fixed in the bibles. If something is missing, ask or mark it as a proposal.
9. **Kids' safety (both series):** nothing scary, mean or violent; no strobing (single soft flashes ≤ 0.3 s); no real children or real voices; no brand placements; captions always on; loudness ≈ -14 LUFS.
10. **You cannot listen or watch.** Report ASR/loudness/probe numbers as proxies and ask me to play the result. Say plainly what you did NOT verify.
11. **Report honestly:** if a check fails, show the output; if you skipped a step, say so. Do not claim "done" for a render until the MP4 exists, ffprobe shows the right duration/size, and loudness is measured.
12. **Ask before** anything outward-facing or irreversible: uploading, publishing, deleting folders, overwriting delivered videos, spending money, installing/upgrading packages, changing the pinned HyperFrames/GSAP versions.

## Working method (every task)
1. **Understand** → read the files above; summarise in ≤ 10 lines what exists and what the task adds.
2. **Plan** → list the exact files you will create/modify, the commands, the expected outputs, and the risks. For story work: the full script (lines + beats) for my approval. **Stop and wait for my OK.**
3. **Build in small verified steps** → after each step run its check (syntax check, page-error probe, still frames, ASR) before the next one.
4. **Render + QA + deliver** with the series scripts (never hand-roll a second pipeline).
5. **Report** → a short table: what was produced (paths), measured facts, what is unverified, what I should look at/listen to (with timestamps), and the next step.
6. **Update the docs**: append what you learned (new helper, new gotcha, new episode status) to the series playbook and, if you can, to the memory/notes file, so the next session starts warm.

---------------------------------------------------------------- COPY UNTIL HERE ----------------------------------------------------------------



==================================================================================================
# FILE: 01_BO_MEGA_PROMPT.md
==================================================================================================
# 01 — BO AND THE PANCAKE · MEGA PROMPT (paste-ready)

How to use: open the kit root in Cursor → new Agent chat → paste everything between the two COPY lines → edit the **TASK** block at the bottom (default = Season 8) → send. The agent must answer with an understanding + a plan and then WAIT for your OK.

---------------------------------------------------------------- COPY FROM HERE ----------------------------------------------------------------

# ROLE
You are the showrunner, animation engineer and sound producer of **"Bo and the Pancake"**, a 30-second vertical kids' cartoon series that is built entirely from code in `C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\` (episodes in `toon`, `toon2` … `toon35`). 35 episodes exist across 7 seasons. You continue the series with the same look, voices, humour, pipeline and quality bar. You do not redesign, re-platform or "improve" the pipeline; you extend it.

# FIRST, READ (in this order, summarise in ≤ 10 lines, do not skip)
1. `CURSOR_HANDOFF/README_START_HERE.md` — current state.
2. `CURSOR_HANDOFF/02_BO_STORY_BIBLE.md` — canon, cast, voices, gags, continuity wrinkles.
3. `CURSOR_HANDOFF/03_BO_PRODUCTION_PLAYBOOK.md` — the exact build chain, helpers and gotchas.
4. The previous episode's files: `hyperframes/toon35/{tts.py,_init35.js,_body35.js,_defs35.js,_audio35.py,plan.json}` and `hyperframes/mk_s7_setup.py`, `mk_template_s6.py`, `mk_audio_n.py`, `run_episode.ps1`, `run_queue_s7.ps1`, `qa_episode.py`.
5. `CURSOR_HANDOFF/08_NEXT_STORYLINES.md` — drafts and pitches for what comes next.

# THE PRODUCT (fixed)
- **Format:** 30.0 s, 1080×1920, 30 fps, MP4. **11 voice lines** per episode (Kokoro TTS), word-timed ALL-CAPS captions (Baloo 2 ExtraBold, white, dark-brown `#2b1a14` stroke), end-card sticker for the last ≈ 2.5 s (yellow `#FFE14D` two-line headline + green `#2EBE85` call to action). Loudness ≈ **-14.2 LUFS**.
- **Style:** flat 2-D vector, thick dark-brown outline, big glossy eyes, pink blush, warm high-key colours; SVG rigs animated with GSAP in one HTML composition rendered by HyperFrames 0.8.40 (GSAP 3.13.0). Characters stay on-model — see the bible for each character's look.
- **Tone:** warm, silly, safe. Problems are solved by sharing food and teamwork. No villain; every "monster" is just hungry. Every episode ends on a cliff-hanger ("But then…") that the next episode opens with; the last episode of a season says "And that was the end of Season N!" and the end card announces the next season.
- **Hero & gags:** Bo the fox ("Just one tiny bite!"), Flapjack the pancake ("Catch me if you can!"), Mochi the cat ("Hmph. … Obviously."), Truffle the pig chef ("Needs a pinch more love!"), Zap the robot ("Beep boop!"), Coco the monkey ("Ooh-ooh, bananas!"), Gumdrop the monster ("Roar! …did that work?"), Boo the ghost ("B-boo?"), Peanut the elephant ("I remember everything!"), Rocky the raccoon ("Nobody saw anything."), Blip the alien ("Is this… a sandwich?"), Nibbles the mouse ("Squeak! Cheese?"), plus the King (Sunday pancakes), Jiggle(s), Munch (giant gray, gentle) and baby Pebble (pink, sparkles).
- **Voices (never change):** Narrator `af_heart`; Bo `am_puck` 1.05; Mochi `bf_emma` 0.9; Zap `am_michael` pitch 0.9 + ROBOT filter; Coco `am_echo` pitch 1.18; Truffle `bm_george` 0.92; Blip `af_sky` pitch 1.35; Gumdrop `am_onyx` 0.88 pitch 0.9; Boo `af_sky`; Peanut `af_bella` pitch 1.08; Jiggles `af_sky` pitch 1.7; Pebble `af_bella` pitch 1.75; Munch `am_onyx` 0.8 pitch 0.72 + HUGE; King `am_onyx` 0.85 pitch 0.8; Everybody `am_puck` 1.1 pitch 1.1; Rocky `am_adam` 0.92; Flapjack `af_nova` 1.1.
- **Writing rules for lines:** **4–7 words per line, ≈ 50–62 words in total, aim ≈ 56** (eps 3–35 ran 48–74, ep31–35 averaged 53; line 11 must end before ≈ 26.6 s); plain words (Kokoro garbles interjections and invented words); ages 2–7 vocabulary; every featured character speaks at least once; at most ONE new character per episode (every new character needs a new SVG rig); line 11 must END before ≈ 26.6 s.

# THE PIPELINE (use exactly this; details in the playbook)
`mk_sN_setup.py` (voice lines → `toonN/tts.py`) → `python tts.py` (Kokoro + Whisper → `words.json`) → `python mk_s6_setup.py plan N` (→ `plan.json`) → write `_defsN.js`, `_initN.js`, `_bodyN.js`, `_audioN.py` → add `META[N]` in `mk_template_s6.py` → `python mk_template_s6.py N` → `node toonN\build.cjs` → `node chk_js.cjs toonN` → `node errprobe.cjs toonN` → `python mk_audio_n.py N` → `cd toonN; python audio.py` → stills (`hyperframes snapshot`, `spaceprobe.cjs`, `stageshot.cjs`) → render+QA+deliver via `run_episode.ps1` / a `run_queue_sN.ps1` launched **detached** with `Invoke-CimMethod Win32_Process Create`.
Delivery names: `Desktop\Content Creation\Videos\NN_Bo_and_the_Pancake_N_Title_With_Underscores.mp4` + `NN_Bo_and_the_Pancake_N_COVER.png`.
Each episode is built from the **previous episode's** `build/template.tpl`; build episode N completely (through delivery) before starting N+1.

# NON-NEGOTIABLE RULES
- ONE heavy job at a time (2 cores / 7.7 GB). Check for a running `hyperframes.mjs render` / KiddoVerse `run_all`/`run_final` first. Never kill processes you did not start.
- Set the four `PRODUCER_*_TIMEOUT_MS=300000` env vars and prepend the Gyan ffmpeg `bin` to PATH in every shell. Launch long jobs detached. Verify the process exists after launching.
- Files UTF-8 **without BOM**. Never edit `index.html` while it renders. Never overwrite a delivered video without asking; deliver new/changed versions under the same naming only when I approve.
- Use the existing helpers (depth rows `ROWB/ROWF/ROWD/ROWJ`, `camOn/camE`, `faces2/lookAll2`, `wrapDepth`, race and egg helpers). Do not redeclare names that exist in the shared template head (`BOS`, `RK`, `MW`, `NS`, `RKX`, `T0` …). New rig prefixes need `svgOrigin:'0 0'` before any x/y/scale.
- Do not invent canon. If the bible and the files disagree, trust the files and tell me.
- You cannot hear or watch the result. Prove what you can (page errors = none, timeline = 30 s, stills read, ASR transcript equals the 11 lines, LUFS, duration, resolution), list what you could not, and tell me which seconds to look at / listen to.
- Safety: nothing scary or mean; no strobing (single soft flashes only); no real people.
- Ask before: uploading/publishing, deleting, overwriting delivered files, installing/upgrading packages, anything that costs money.

# DEFINITION OF DONE (per episode)
[ ] script approved by me · [ ] `chk_js` + `errprobe` clean (timeline 30 s) · [ ] stills reviewed: faces visible, no character cut by the frame, captions clear of faces, speaker in front · [ ] audio generated (vo/music/sfx) and footsteps/impacts timed to the choreography · [ ] render exists, 1080×1920, 30.0 s · [ ] final ≈ -14.2 LUFS, peak ≤ -0.3 dBTP · [ ] ASR transcript = the 11 lines · [ ] contact sheet checked · [ ] delivered with cover PNG · [ ] docs/notes updated (bible episode guide, playbook gotchas) · [ ] I was told what to listen to.

# OUTPUT FORMAT FOR YOUR FIRST REPLY (then STOP and wait)
1. **What exists** (≤ 10 lines). 2. **What I will make** — for each episode: title, logline, the 11 lines with speakers, scene-by-scene beats (camera + staging + new props), new characters/rigs needed, end-card text, cover-frame idea. 3. **Files/commands** you will touch, in order. 4. **Risks/questions** (max 5). 5. **Time estimate** per episode on this PC.

# TASK  ← EDIT THIS BLOCK
**Default:** Build **Season 8 episode 36** from the draft in `CURSOR_HANDOFF/08_NEXT_STORYLINES.md` (title "The Map in the Pan"), starting from the last frame of ep35, and prepare (but do not build) the script/beats for ep37–40. First, if I say so, re-launch the failed Season-7 render queue (playbook §5) — one heavy job at a time, so do NOT start Season-8 renders while it runs.
**Alternatives (replace the default with one):**
- "Re-launch and monitor the Season-7 render queue; report status every poll."
- "Write a brand-new season outline from these characters: …; give me 3 pitches, I pick."
- "Fix this problem in episode N: …" (give timestamps).
- "Make a 15-second teaser / Short from episode N" (vertical already; propose the cut and captions).
- "Create a rig for the new character <name> based on the cast-sheet art in `Content Creation\Characters\NN_<name>\` (SVG) and show a still on the kitchen set."

---------------------------------------------------------------- COPY UNTIL HERE ----------------------------------------------------------------



==================================================================================================
# FILE: 02_BO_STORY_BIBLE.md
==================================================================================================
# 02 — BO AND THE PANCAKE · STORY BIBLE (canon through episode 35)

Source of truth for story, cast and continuity. Facts here were read from the project files (`hyperframes/toonN/tts.py`, `mk_s6_setup.py`, `mk_s7_setup.py`, `mk_template_s6.py`), the delivered covers, and the project memory notes. Full voice lines of every episode: `09_APPENDIX_ALL_VOICE_LINES.md`.

---

## 1. Premise and tone

**Bo** is a curious, slightly greedy little **fox** whose kitchen keeps filling up with new friends. In episode 1 he nearly eats the last pancake; the pancake (**Flapjack**) runs away, whispers "please don't!", and becomes his best friend. Almost every episode ends with a knock, a squeak, a light or a rumble — the next friend or problem arrives, and the next episode starts exactly there.

- **Audience:** toddlers to early primary; parents co-watch. Vocabulary ≈ age 5. No scary content, no real danger, no villains — every "monster" is just hungry. Problems end with **sharing food**.
- **Humour:** catchphrase gags (see §4), slapstick that never hurts (slip, bounce, sticky), tiny deadpan cat.
- **Heart:** friendship, sharing, "everybody wins", never being alone ("He had never had friends before").
- **Always a cliff-hanger** on line 9–11 ("But then…"), and an **end card** sticker asking the viewer to guess/comment or announcing the next season.

## 2. Format (fixed — do not change)

| Item | Value |
|---|---|
| Length | **30.0 s** exactly (`data-duration="30"`) |
| Picture | **1080×1920 (9:16)**, 30 fps, MP4 H.264 + AAC |
| Voice | **11 lines per episode** (≈ 4–7 words each; episodes ran 48–74 words, typically 50–62; aim ≈ 56), spoken by Kokoro; line 11 must END before ≈ 26.6 s so the end card has room |
| Captions | burned in, word-timed, ALL CAPS, 2–3 short chunks per line, Baloo 2 ExtraBold, white with thick dark-brown (`#2b1a14`) stroke; speaker tag above for non-narrator lines; captions sit at top (y≈215) or lower (y≈1470) so faces stay free |
| End card | yellow sticker `#FFE14D` (2 big lines) + green pill `#2EBE85` (call to action), last ≈ 2.5 s |
| Loudness | **≈ -14.2 LUFS**, peak limited to 0.84 (QA script sets it) |
| Delivery | `Desktop\Content Creation\Videos\NN_Bo_and_the_Pancake_N_Title_With_Underscores.mp4` + `NN_Bo_and_the_Pancake_N_COVER.png` (cover = one full frame, no text) |

**The 11-line formula** (what every episode from ep6 on does; ep1 = 6 long narrator lines, ep2 = 9 lines, ep5 = 10 lines — see the appendix):
1. NARRATOR hook / recap of the previous cliff-hanger.
2–8. Alternating character lines and narrator beats; every featured character gets ≥ 1 line and ≥ 1 catchphrase if natural.
9. The turn (a plan works / a surprise).
10. The payoff or the joke.
11. The cliff-hanger or "that was the end of Season N!"

## 3. Look

- **Style:** flat 2-D vector cartoon, thick **dark-brown outline `#2b1a14`**, big glossy eyes (white sclera, black pupils, highlights), pink blush cheeks, soft gradients, warm high-key colours. Characters are rigs of SVG groups (head, body, arms, ears, tail, brows, mouth shapes `mOp/mFr/mBg/mSm`, eye modes `wide/lids/happy/O`).
- **Kitchen set (S1–S3, S4 end, S5 start):** peach polka-dot wall `#FFE6BE`, mint tile band, cream/beige checkerboard floor, window with teal curtains (Rocky peeks in, Barnaby knocks), wall clock, jar shelf, **mouse hole** (Nibbles), **fridge on the right** (monsters, Jiggle, the Gloop King pop out of it), table, ceiling lamp.
- **Other sets built so far:** spaceship interior and cockpit window, Planet Gloop (jelly, teal `gJelly`), Planet Zorp (gray → colourful, purple sky, ringed planet, giant mushrooms), the festival hall (bunting, stage, scoreboard), sunny sky for the balloon chase, grassy hills + campfire + night (S6), race track with scrolling layers, syrup river, dark cliff tunnel, finish gantry + dusk fireworks (S7).
- **Camera:** a single `#cam` div over a 2600×2200 SVG world, moved by `camTo/camOn/camE`; 1080×1920 viewport. Shake, vignette, flash overlays exist.

## 4. Cast (29 designed characters + story extras)

Full list also in `Desktop\Content Creation\00_CAST_LIST.txt`; art in `Content Creation\Characters\NN_Name\` (4 expressions each, PNG + SVG) and `00_ALL_CHARACTERS.png`. **Only the characters marked ★ have working animation rigs in the episodes.** All others are art only.

| # | Character | Look (from the cast sheet / covers) | Personality | Catchphrase | Rig |
|---|---|---|---|---|---|
| 01 | **Bo the Fox** (hero) | orange fox, cream belly & cheeks, **green dotted scarf**, bushy tail | curious, a bit greedy, always up to something, brave when friends need him | **"Just one tiny bite!"** | ★ `bo` (offset pivot!) |
| 02 | **Flapjack the Pancake** | thick golden pancake, butter pat on top, syrup drip, big eyes, tiny white feet, stick arms; often rides on Bo's head | cheeky runaway, dramatic, secretly sweet | **"Catch me if you can!"** | ★ |
| 03 | **Mochi the Cat** | gray tabby, stripes, long whiskers, tiny gold bell collar, white belly | lazy, sarcastic, secretly the smartest | **"Hmph. … Obviously."** (she adds "Obviously." to any observation) | ★ `mc` |
| 04 | Biscuit the Dog | golden pup, blue polka-dot bandana | endlessly happy, clumsy | "Best day EVER!" | art only |
| 05 | Clover the Bunny | white bunny, long pink-lined ears, pink bow | sweet, easily scared, brave when it counts | "Eeek! …okay, I am ready!" | art only |
| 06 | **Barnaby the Bear** | brown bear, red bow tie | big, gentle, loves honey | **"Is it snack time yet?"** | ★ (S1 only) |
| 07 | Pixel the Panda | panda with blue headphones | chill gamer, secretly competitive | "One more round." | art only |
| 08 | Waddles the Penguin | penguin, red bobble hat | clumsy, cheerful | "Whoa— I am okay!" | art only |
| 09 | Ribbit the Frog | green frog, tiny gold crown | hyper, dramatic prince of the pond | "Behold, the great Ribbit!" | art only |
| 10 | Hootie the Owl | brown owl, graduation cap, round glasses | the professor | "Actually… let me explain." | art only |
| 11 | **Truffle the Pig** | pink pig, **white chef's hat**, apron | foodie chef, tastes everything first | **"Needs a pinch more love!"** (also "…more disco/sprinkles") | ★ `tf` |
| 12 | Leo the Lion | golden lion, mane, crown | proud, secretly soft | "Bow to the king! …please?" | art only |
| 13 | **Coco the Monkey** | brown monkey, tan face, tail with a banana tip | prankster, snack thief | **"Ooh-ooh, bananas!"** | ★ `cm` |
| 14 | **Peanut the Elephant** | blue-gray baby elephant, **striped party hat**, big pink ears | gentle giant, never forgets a birthday | **"I remember everything!"** | ★ `pt` |
| 15 | Tora the Tiger | tiger cub, red headband | sporty, hates losing | "Race you there!" | art only |
| 16 | Kiki the Koala | gray koala with a leaf | sleepy, hugger | "Five more minutes…" | art only |
| 17 | **Rocky the Raccoon** | gray raccoon, black mask/cap, ringed tail | sneaky snack thief with a heart of gold; always plans (it fails) | **"Nobody saw anything."** | ★ `rk` |
| 18 | Quackers the Duck | yellow duck, blue bow tie | loud, joker | "Quack! Did you hear that?" | art only |
| 19 | Pip the Chick | yellow chick, half eggshell "helmet" | tiny, fearless | "I am NOT small!" | art only |
| 20 | **Nibbles the Mouse** | small gray mouse, pink ears & feet, carries cheese | tiny, quick, cheese-obsessed, lives in the **mouse hole** | **"Squeak! Cheese?"** | ★ `nm` |
| 21 | Hugo the Hippo | lavender hippo, yellow bow tie | bouncy, apologises | "Oops! Sorry, sorry!" | art only |
| 22 | **Zap the Robot** | silver-blue boxy robot, dark screen face with a smile, red-tipped antenna, chest panel with a heart | super-smart sidekick; takes jokes literally; **robot-filtered voice** | **"Beep boop! Processing fun!"** (also "Beep boop! …" + status) | ★ `zp` |
| 23 | **Blip the Alien** | green alien, two yellow-ball antennae, spots; has a tiny saucer | curious visitor, misunderstands everything | **"Is this… a sandwich?"** | ★ `bp`? (verify id) |
| 24 | Dex the Dino | green baby T-rex, orange spikes | tiny arms, huge dreams | "Rawr! …hi." | art only |
| 25 | **Boo the Ghost** | white ghost, pink bow | shy, floaty, scared by everyone; makes things glow | **"B-boo?"** (S6+: "I… I'll help. Boo.") | ★ `gh` |
| 26 | **Gumdrop the Monster** | big blue-purple one-eyed (cast sheet) fuzzy monster, two small horn-ears, spots | looks scary, acts sweet; huge appetite | **"Roar! …did that work?"** (also "Roar! …I mean, hello!") | ★ `gm` |
| 27 | Avo the Avocado | avocado with a brown-pit face | calm, "just chilling" | "It is all good, my friend." | art only |
| 28 | Dumpling the Bao | steamed bun in a basket | soft, cheerful | "Fresh and steamy!" | art only |
| 29 | Berry the Strawberry | strawberry, leafy top | sweet, dramatic blusher | "Aww, stop it, you!" | art only |

**Story extras (created inside the episodes, not in the 29):**

| Character | Look | Role |
|---|---|---|
| **Jiggle** (S3) → **the four Jiggles** | small round jelly creatures with two antennae (pink, yellow, blue, orange), cute freckles; very sticky | a Gloopian stowaway in Bo's scarf (ep13) who gets a name (ep14); a hiccup makes him split into four (ep14); they squish back together (ep15); they love games, play with the Golden Spatula (ep22) |
| **The Gloop King** ("King") | big round yellow face with orange freckle dots and pink blush (see the ep16 cover; check `toon16/index.html` for crown/arms before drawing him again), deep slow voice | ruler of Planet Gloop; keeps visitors "forever" for pancakes (ep12); comes through the **fridge** for Jiggle (ep16); agrees to **pancakes every Sunday**; hosts the festival (S5) and the race (S7) |
| **Gloopians / "The Great Round One"** | tiny jelly people | crown Flapjack "king of the jelly" (ep12) |
| **Commander of Zorp & the Zorpians** | colourful (after being fed) antenna creatures, gray when sad | ep17–20 |
| **Munch** | **giant gray round monster**, lighter-gray belly with a **pink heart**, pink blush, small horn-ears, buck teeth, enormous deep voice; *only loves gray things* | ep19 first seen; waves from far away (ep25); leaves an egg + note (ep26); returns (ep30); shares the Golden Pan (ep35) |
| **Pebble** (baby Munch) | small **pink**, sparkly baby with a heart on the belly; turns pink on his first pancake; squeaky voice; glows pink in the dark (ep34) | hatched ep28, named ep29, goes home with Papa ep30, **visits** for the race (ep31–35) |

## 5. Voices (Kokoro, local) — keep exactly

Defined as helper lambdas in `hyperframes/mk_s6_setup.py` / `mk_s7_setup.py`: `(voice, speed, text, caption_chunks, speaker_tag, pitch_factor, extra_filter)`.

| Character | Kokoro voice | speed | pitch ×| filter |
|---|---|---|---|---|
| Narrator (also "Everybody" in chorus) | `af_heart` | 1.0 | 1 | — |
| Bo | `am_puck` | 1.05 | 1 | — |
| Mochi | `bf_emma` | 0.90 | 1 | — |
| Zap | `am_michael` | 1.0 | 0.9 | `ROBOT` |
| Coco | `am_echo` | 1.08 | 1.18 | — |
| Truffle | `bm_george` | 0.92 | 1 | — |
| Blip | `af_sky` | 1.0 | 1.35 | — |
| Gumdrop | `am_onyx` | 0.88 | 0.9 | — |
| Boo | `af_sky` (S1 eps 7/8/10 used `af_nicole`) | 0.95 | 1 | — |
| Peanut | `af_bella` | 0.95 | 1.08 | — |
| Jiggles | `af_sky` | 1.0 | 1.7 | — |
| Pebble / Baby | `af_bella` | 1.0 | 1.75 | — |
| Munch | `am_onyx` | 0.80 | 0.72 | `HUGE` |
| The King | `am_onyx` | 0.85 | 0.80 | — |
| Everybody (group shout) | `am_puck` | 1.10 | 1.10 | — |
| Rocky | `am_adam` | 0.92 | 1 | — |
| Flapjack | `af_nova` | 1.10 | 1 | — |
| Barnaby | `am_onyx` | 0.95 | 1 | — |
| Nibbles | `af_bella` | 1.05 | 1.22 | — |
| Commander (Zorp) | `am_liam` | — | — | — |
| Zorpians / Gloopians | `af_nova` / `af_sky` | — | — | — |

Kokoro garbles interjections and made-up words ("Aww!", "Boh-boh"). Write lines in **plain words**; ep28 had to be re-voiced for this ("Bo! Bo!", "Look! He knows my name!").

## 6. Running gags & motifs (use them; they are the brand)
- Bo's **"Just one tiny bite!"** — a wish, a request, a final joke ("…for everybody!").
- Mochi's **"Hmph. <observation>. Obviously."** — usually the correct deduction that solves the problem.
- Truffle's **"Needs a pinch more love!"** — adapts to the event ("more disco", "more sprinkles").
- Rocky's **"Nobody saw anything."** — he always was seen; in ep20 he finally admits "Okay, I saw something. Pass the pancakes!". He stows away (ep17).
- Flapjack's **"Catch me if you can!"** — flips/escapes; he is also a prize/guest of honour.
- Zap's **"Beep boop!"** + a status/number ("Thirty-seven degrees. Perfect!").
- Coco's banana pranks; Gumdrop's accidental roar; Boo's shy "B-boo?" → brave "I'll help."
- **Fridge door** = portal for surprises (Gumdrop ep6, King ep16). **Knock/squeak/light/rumble** = next-episode trigger.
- **Sunday pancakes with the King** (from ep16) and the **giant shared pancake / tower** as the universal solution.
- Everybody wins — contests end in ties or "everybody wins the Golden Spatula/golden pan".

## 7. Episode guide (canon)

Format: **#. Title** — beats · cliff-hanger · end card (when known). Seasons are marked on the end cards.

### Season 1 — "Kitchen Chaos" (ep1–10; ep10 end card: Season 2 coming soon)
1. **Bo and the Pancake** — Would you eat the last pancake? Bo only wants one tiny bite; it jumps off the plate and runs through the kitchen, into the fridge; Bo opens wide — "please don't!" — so he eats cereal. *(Folder `toon`, assets `script.txt`.)*
2. **Knock, Knock!** — Flapjack is Bo's new best friend (cereal for Bo, a syrup bath for Flapjack). Rocky snatches him and runs, but he was only hungry — Bo shares cereal. → *knock, knock!* (Barnaby).
3. **Honey Trouble** — Barnaby brings honey, tosses the jar into Flapjack's bath; the sweet smell calls the **bees**; chaos; Rocky tosses the jar outside. → *squeak?* (Nibbles).
4. **Cheese Please** — Nibbles wants cheese but Mochi naps on the big cheese. "Operation Cheese is a go!"; Mochi chases Flapjack round and round while Nibbles tiptoes in; cheese for everyone. → *sniff, sniff…* (Truffle).
5. **Pizza Party** — Truffle squeezes through the window and cooks a giant pizza ("Not yet! Needs a pinch more love!"), everyone gets a slice. → something swings by (Coco).
6. **Monkey Business** — Coco takes the pizza onto the fridge ("Finders keepers!"); Mochi's **banana-peel trap** makes him slip. → the fridge creaks open (Gumdrop).
7. **Gumdrop's Secret** — a huge monster steps out — "Wait! I'm only hungry!" Mochi: "He's a softie. Obviously." Truffle cooks him a giant feast; he never had friends before. → lights out, "B-boo?"
8. **Boo's Glow Party** — the ghost is scared too; Boo makes the room glow; everybody dances (Truffle: "Needs a pinch more disco!"). → a strange light outside (Blip).
9. **Blip and Zap** — Blip's tiny saucer lands ("Is this… a sandwich?"), chases Flapjack; **Zap** joins ("Beep boop! Processing fun!"); Mochi: "Don't lose your head." / "Head not found."; Blip's scanner: it is somebody's **birthday** — Bo's! → Peanut ("I remember everything!").
10. **Bo's Big Birthday** — Peanut brings a giant pancake cake; Boo lights the candles; Bo's wish = "just one tiny bite!"; Flapjack: "Those are my cousins!" so they share the cake. *End card:* **SEASON 2 COMING SOON**.

### Season 2 — "Planet Gloop" (ep11–13; ep13 end card: See you in Season 3)
11. **Blast Off** — Blip's spaceship is bigger on the inside; Zap: seatbelts; Mochi "I'm not scared. Obviously."; Gumdrop "Are we there yet?"; past the moon and stars. → a giant jelly planet: "Welcome to Planet Gloop!"
12. **Planet Gloop** — everything is jelly (Bo bounces); the tiny Gloopians crown Flapjack "the Great Round One"; Truffle: "Pancakes for everybody!" → the ground wobbles; the **Gloop King**: "Pancakes? Then you must stay forever!"
13. **Home Sweet Kitchen** — Truffle's plan: the biggest pancake in the universe, everybody cooks it; the King lets them go. Home. → a Gloopian stowed away in Bo's scarf: "Pancake, please?" *End card:* **SEE YOU IN SEASON 3**.

### Season 3 — "Jiggle" (ep14–16; ep16 end card: Season 4 coming soon)
14. **Jiggle Moves In** — the stowaway is named **Jiggle**; bounces to the ceiling; very sticky; Rocky sneaks in; hiccup → pop! **four** Jiggles.
15. **Four Jiggles** — "I'm Jiggle! No, I'm Jiggle!"; Zap: "Each one is twenty-five percent Jiggle!"; Bo's pancake test makes all four jump and squish back into one. → *knock, knock* from the **fridge**.
16. **The King's Visit** — out of the fridge pops the Gloop King for Jiggle; "The palace is so quiet"; Truffle: **pancakes every Sunday**; "Deal!"; big hug. "And that was only the beginning!" *End card:* **SEASON 4 COMING SOON**.

### Season 4 — "The Message from Space" (ep17–20; built 2026-10-09/10; finals in `hyperframes/season4_final/`)
17. **The Message from Space** — Zap/Blip get a hologram call: Planet **Zorp** has run out of pancakes ("Help!" — the Commander). Truffle flips "Fifty pancakes!" (an 18-layer pancake tower); everyone boards. → **Rocky** is hiding in the pancakes (stowaway).
18. **The Gray Planet** — Rocky grins from the tower; Zorp is **gray and sad**; one tiny bite for every Zorpian ("Yum yum yum!") brings **colour back to the planet**. → the ground shakes (giant silhouette).
19. **The Gray Muncher** — a giant gray monster stomps over the hill: **Munch** ("Who took my gray?"); everyone hides behind Gumdrop; Truffle's **extra-crispy burnt pancake** = "Crunchy gray! My favorite!"; Bo: "He's not scary. He's just hungry!" → his **rainbow burp** lights the way home.
20. **Rainbow Road Home** — a rainbow from Zorp to Earth; the saucer slides down it ("Wheeee!"); the King: "It's Sunday! Pancakes for everybody!"; Rocky: "Okay, I saw something." *End card:* **SEASON 5 COMING SOON**.

### Season 5 — "The Great Pancake Festival" (ep21–25; v2 re-staged and delivered 2026-10-11)
21. **The Great Pancake Festival** — the King opens the games; free samples; Zap rolls out the **Golden Spatula** (prize for best flipper). → **blackout**; the spatula is gone.
22. **The Missing Spatula** — "Find it, or no more pancakes ever!"; detective **Mochi** takes the case; sticky footprints → **the Jiggles** only wanted to play; **Peanut** tied balloons to it → it floats away.
23. **The Balloon Chase** — Zap's rocket boots, **Gumdrop launches Bo**, Boo helps; balloons pop → the spatula lands in Bo's hands.
24. **The Great Flip-Off** — Truffle's pancake hits the ceiling, Mochi's spins like a spaceship, Bo flips Flapjack ("Wheee!"); everyone gets a perfect ten.
25. **Festival Finale** — nobody can pick one winner: **everybody wins** the Golden Spatula; one giant pancake, **fireworks**, Munch waves from far away; "Happy Pancake Festival!" *End card:* **SEASON 6 COMING SOON! / THANKS FOR WATCHING!**

### Season 6 — "The Mystery Egg" (ep26–30; delivered 2026-10-12)
26. **The Big Gray Egg** *(end card: WHAT'S INSIDE? / GUESS IN THE COMMENTS!)* — a giant egg + a note: "Please keep my egg warm. Love, Munch." → tap, tap, tap inside.
27. **Keep It Warm** *(IS IT HATCHING? / GUESS IN THE COMMENTS!)* — Truffle toasts it, Zap measures 37 °, Gumdrop cuddles; it **rolls down the hill**; Bo and Boo catch it.
28. **Crack** *(NAME THE BABY! / TELL US IN THE COMMENTS!)* — night, glowing egg, "Crack, crack, CRACK!" — a **baby Munch**: "Bo! Bo!"; first pancake → turns **pink and sparkly**.
29. **Pebble's Big Day** *(WHO IS COMING? / GUESS IN THE COMMENTS!)* — they name him **Pebble**; hide-and-seek; he falls asleep in the pancake pile; → the ground shakes.
30. **Happy Hatching Day** *(end card: SEASON 7 COMING SOON! / THANKS FOR WATCHING!)* — **Munch** is back ("Papa! Papa!"); goodbye hug; party, "Happy hatching day!"

### Season 7 — "The Great Pancake Race" (ep31–35; BUILT 2026-10-13, **not yet rendered/delivered**)
31. **The Great Pancake Race** *(WHO WILL WIN? / GUESS IN THE COMMENTS!)* — the King announces the race; winner gets the **golden pan**; Zap gives everyone a kart (Bo's is orange; Mochi: "Mine is faster."; Truffle's runs on pancakes); Pebble rides with Bo; "Three, two, one… go!"
32. **The Syrup River** *(WHO IS IN FRONT? / GUESS IN THE COMMENTS!)* — tracking shot; Truffle spills syrup → everybody slides and spins; Zap's rocket boost jumps it; Coco gets stuck; Bo and Pebble push him out.
33. **Flat Tire** *(WHAT IS IN THE TUNNEL? / GUESS IN THE COMMENTS!)* — Mochi leads, her wheel **pops**; Bo stops to help; Pebble rolls a **pancake wheel**; Zap fixes it; "Now they all raced together!"
34. **The Dark Tunnel** *(ALMOST THERE! / WHO WINS? TELL US!)* — dark cliff tunnel; Coco and Truffle scared; **Pebble sparkles pink**; Boo scouts; burst into sunshine; "Hooray for Pebble!"
35. **Photo Finish** *(end card: SEASON 8 COMING SOON! / THANKS FOR WATCHING!)* — slow-motion, slanted finish line, all five karts cross together; the King: "A tie! Everybody wins!"; **Munch** brings the golden pan and makes giant pancakes; giant pancake tower; dusk fireworks. **Last frame = start state of Season 8**: dusk lawn, fireworks, whole gang, finish gantry, Munch + Pebble, the golden pan, a tall pancake tower.

## 8. Continuity wrinkles (decide once, then stay consistent)
1. **Blip's home planet.** Eps 11–13 make **Planet Gloop** Blip's home ("Welcome to Planet Gloop!"; cast sheet: "Alien from Planet Gloop") but the Gloop King is the *ruler* there; ep17 line 3 says the **Zorp** call is "from my home planet". Suggested fix for new scripts: never state Blip's home again, or say Blip is from Gloop and *visited* Zorp friends.
2. **Boo's voice** changed (`af_nicole` in the Season-1 episodes → `af_sky` in the Season-5+ files that were checked). Keep `af_sky` going forward.
3. **Pebble lives with Munch** (ep30 goodbye) but is back in ep31–35 as a **visiting** guest. Mention "Pebble's visiting for the day / weekend" when he reappears.
4. **Munch** loves *gray* things (ep19) and lives "far away" (ep25 wave). He is gentle despite size.
5. **The "King"** is called "the Gloop King" in S2/S3 and just "King" afterwards. Same character.
6. **Barnaby, Rocky, Nibbles** have been quiet since S1/S4; Rocky reappears with the stowaway gag, Nibbles mostly stays in his mouse hole as set decoration.
7. Episode 1's folder is `hyperframes/toon` (no number); its storyboard predates later conventions — never copy from it.

## 9. Unused cast = guest pool (each needs a NEW RIG; budget ≈ 1–3 h each)
Biscuit (dog), Clover (bunny), Pixel (panda), Waddles (penguin), Ribbit (frog), Hootie (owl), Leo (lion), Tora (tiger — born for a race), Kiki (koala), Quackers (duck), Pip (chick), Hugo (hippo), Dex (dino), Avo, Dumpling, Berry. Use **at most one new guest rig per episode**; otherwise reuse ★ rigs and re-tint (`tintGum`).



==================================================================================================
# FILE: 03_BO_PRODUCTION_PLAYBOOK.md
==================================================================================================
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



==================================================================================================
# FILE: 04_KIDDOVERSE_MEGA_PROMPT.md
==================================================================================================
# 04 — KIDDOVERSE · MEGA PROMPT (paste-ready)

How to use: open the kit root in Cursor → new Agent chat → paste everything between the two COPY lines → edit the **TASK** block at the bottom → send. The agent answers with an understanding + a plan and WAITS for your OK.

---------------------------------------------------------------- COPY FROM HERE ----------------------------------------------------------------

# ROLE
You are the creative director, children's songwriter, music/audio producer, animation engineer and QA lead of **KiddoVerse**, a kids' sing-along & learning brand (toddlers and preschoolers, ages ≈ 2–6). You continue an existing production in `C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\` (`kiddoverse/` = video #1, `learn1/` = Learn #1 finished, `learn2/` = Learn #2 "The Color Train" in progress). You reuse the existing engine; you do not re-platform it.

# FIRST, READ (summarise in ≤ 10 lines before planning)
1. `CURSOR_HANDOFF/README_START_HERE.md` (state + machine rules)
2. `CURSOR_HANDOFF/05_KIDDOVERSE_BIBLE.md` (brand, crew, identity, finished videos, Learn #2 status, legal/policy)
3. `CURSOR_HANDOFF/06_KIDDOVERSE_PRODUCTION_PLAYBOOK.md` (data model, audio pipeline, build, render, deliver, traps)
4. The code you will extend: `learn2/audio/song.py`, `learn2/build/{color_story,color_props,color_objects,color_worlds,kv_engine,kv_chars}.js`, `learn2/data/song.json`, `learn1/audio/{stages.py,run_all.py,run_final.py}`.
5. `CURSOR_HANDOFF/08_NEXT_STORYLINES.md` §3 (episode briefs).

# THE PRODUCT (fixed)
- **Format:** 16:9, 1920×1080, 30 fps, 5–6 min Learn episodes (+ 15–60 s vertical 1080×1920 Shorts). Burned-in karaoke captions (Fredoka 70 px, white, 15 px indigo `#2B1B5E` stroke; sung word turns sunshine-yellow, echo lines pink); logo top-centre; nothing important in the outer 6 %.
- **Brand:** Bright · Kind · Curious. Crew of seven on the rocket-bus **the Zoomie**: **Kiko** (leader, "All aboard the Zoomie!"), **Luma** (singer, "Sing it with me!"), **Bloop** (jelly alien, only says "bloop"), **Rumble** (baby triceratops, "Stomp stomp, hooray!"), **Gizmo** (pocket robot, "Calculating… FUN!"), **Nimbus** (cloud-lamb, feelings, "It's okay to feel!"), **Zoom** (the bus, "Beep beep, all aboard!"). Every character gets one job per episode. Outline colour `#2B1B5E`; palette violet `#6C4CF1`, coral `#FF5E7E`, sun `#FFC93C`, mint `#2EC4B6`, sky `#4CC9F0`, orange `#FF8A3D`, magenta `#C65BFF`. Fonts Fredoka + Baloo 2 (**keep the capital-B `unicode-range:U+0042` fix**).
- **Episode shape (Learn template):** intro (logo + "All aboard…" + 3-2-1 Zoom/Go) → theme song → teaching blocks (one theme, 6–10 items, same structure per item: say it → show it on the sung word → count/repeat → question with a pause) → recap → brain-break dance (clap, stomp, jump, spin, wiggle, FREEZE) → game "Can you find it?" (3 rounds, silent thinking pause with countdown) → theme song again, key up → plain goodbye outro (no end screens: made for kids).
- **Song rules ("teacher's checklist"):** every sung word is a real note ≥ 0.55 s (0.28 s only for tiny words); the key learning word is the longest note; one new idea per verse; the same tune for every item; three objects per item; an echo and a question with a pause for the answer; lines 5–8 syllables; kids' voices answer the lead; hook repeated ≥ 4×; American pronunciation. 100 % original lyrics, melody, characters, logo — never imitate another brand's characters, songs or catch-phrases.
- **Sound:** sonic logo E–G–C ("Kid-do-verse!") opens/closes; sung = theme, counting, ABC-type songs; **chanted by Kokoro `af_heart` (not sung)** = letter names, sounds, word recaps and anything with hard consonant sounds; spoken = Kokoro. Master ≈ -14 LUFS, true peak ≤ -0.3 dBTP (aim ≤ -1).
- **Safety:** nothing scary or mean; no strobing (single soft white pops ≤ 0.3 s); no real children's faces or voices; no brand placements; colour-blind-friendly lessons (shape + colour).

# HARD RULES
- 2-core / 7.7 GB PC: ONE heavy job at a time (render ≈ 40–60 min, SoulX singing 4–10 min per line). Check running processes first. **Never kill processes you did not start** (a helper once killed the singer). Another Claude session (Bo and the Pancake) shares this PC — coordinate through the user / `ListAgents`+`SendMessage`; never overlap two renders.
- Launch long jobs **detached** via `Invoke-CimMethod Win32_Process Create` (`cmd /c run_all.cmd`); read `deliver/STATUS.txt` + `tasklist` at the start of every session and after every wait; the pipeline is idempotent/resumable per line. Verify it is really running.
- **Never edit `index.html` while a render runs**; the sfx stage wants a 40-min rebuild after any `index.html` edit → compare `dump_sfx.cjs` output with `data/sfx.json`; if unchanged just `touch audio/sfx_stem.wav`. The CLI cannot resume a killed render.
- After changing any vocal take delete `audio/sx/qa_done.flag` and `mix_ok.flag`.
- Test builds WITHOUT touching `index.html`: write `zz_test_index.html` and run `KV_PAGE=<file> node build/preview_frames.cjs <outdir> t1,t2,…` (also reports page errors).
- UTF-8 without BOM; ffmpeg path: prepend the Gyan `bin` folder (see README §4); don't upgrade pinned HyperFrames 0.8.40 / GSAP 3.13.0.
- **You cannot listen.** ASR (Whisper), ESTOI, loudness and probes are proxies. Say so; give the user exact timestamps to listen to; accept their corrections as the truth.
- **Do not upload or publish anything.** Open decisions that are the user's alone: (1) the channel/brand name — KIDDOVERSE is a registered US trademark (22LEARN, LLC, Reg. 5762831; not legal advice) and is baked into logo, captions and sung audio; (2) YouTube's AI/synthetic-content answer (be factual: animated characters; AI voices & music); (3) made-for-kids = Yes (comments/end screens off).
- Report honestly: what you ran, measured numbers, what is unverified, what remains.

# DEFINITION OF DONE (per video)
[ ] brief + lyrics approved by the user · [ ] `song.json` valid (section beats = bars×4, duration as planned) · [ ] stills reviewed at every section (no overlaps, faces visible, text legible, objects on the sung beat) · [ ] SFX + music stems · [ ] vocals: sung/chanted/spoken stems QA'd (windowed ASR, ESTOI) · [ ] mix: -13.9…-14 LUFS, TP ≤ -0.3 · [ ] picture rendered after the last `index.html`/`song.json` edit · [ ] 1080p + 720p muxed, `FINAL_REPORT.txt` all PASS · [ ] SRT, chapters, YouTube description + tags, 3 thumbnails, Shorts · [ ] gallery rebuilt · [ ] notes/docs updated · [ ] the user told what to listen to.

# OUTPUT FORMAT FOR YOUR FIRST REPLY (then STOP and wait)
1. **What exists / what's missing** (≤ 10 lines). 2. **The plan:** episode brief (learning goal, items, structure table with timestamps and bars, lyrics draft with notes/BPM/key, storyboard idea per section, game questions, brain-break), 3. **Files/commands** in order, 4. **Compute/time budget** on this PC, 5. **Risks/questions** (≤ 5).

# TASK  ← EDIT THIS BLOCK
**Default:** Resume **Learn #2 "The Color Train"** (see bible §8 and playbook §6): audit what exists, verify the vocal stems with a windowed ASR check, preview stills of every section, produce the missing SFX/mix, and run the unattended pipeline (adapted `stages.py`/`run_all.py` for `learn2`) to a delivered 1080p/720p/Shorts/thumbnails/YouTube-text package in `Desktop\KiddoVerse_Learn2`. Ask me first whether another session is still editing `learn2/`.
**Alternatives (replace the default with one):**
- "Plan Learn #3 **Shape Workshop** with Gizmo" (brief in `08_NEXT_STORYLINES.md` §3.1) — script/lyrics only, no rendering yet.
- "Plan Learn #4 **Animals & their Sounds**" (§3.2).
- "Make three vertical Shorts (hook / counting / colours) from the finished Learn #1 and Learn #2."
- "Fix this in Learn #1 (give timestamps): …" — re-render only after approval; remember a v2 render takes ≈ 34 min + 5 min packaging.
- "Prepare the YouTube upload kit for <video> (title/description/chapters/tags/playlist) — do NOT upload."
- "Rename-proof the project: list every place the name 'KiddoVerse' appears (logo, captions, sung audio) and estimate the cost of a rename to <new name>."

---------------------------------------------------------------- COPY UNTIL HERE ----------------------------------------------------------------



==================================================================================================
# FILE: 05_KIDDOVERSE_BIBLE.md
==================================================================================================
# 05 — KIDDOVERSE · BRAND & CONTENT BIBLE

Sources: `hyperframes/kiddoverse/deliver/KiddoVerse_Brand_Bible.html` (v1.0, Oct 2026), `KiddoVerse_Upload_Kit.md`, `hyperframes/learn1/deliver/*` (script, description, recommendations, final report), `hyperframes/learn2/{data/song.json, audio/song.py, build/color_story.js, build/template.html}`, and the project memory notes. Anything not verified in a file is marked *(unverified)*.

---

## 1. What KiddoVerse is

A **kids' sing-along & learning brand** ("The kiddo version") for **toddlers and preschoolers (ages ≈ 2–6)**. A crew of seven friends rides **the Zoomie** (a rocket-bus) to a new **Pocket World** in every song, learns one thing and feels one thing. It is separate from *Bo and the Pancake* (different style, different pipeline, different audience, 16:9 not 9:16) but shares the same HyperFrames/GSAP/Kokoro tool chain and the same PC.

Products so far:
| Video | Length | Status |
|---|---|---|
| **KIDDOVERSE_01 "Zoom, Zoom, Kiddoverse!"** — original music video (+ 3 Shorts: Zoom-Zoom hook, Count with Rumble, Kiddo Wiggle) | 3:16 | delivered → `Desktop\KiddoVerse\` |
| **LEARN #1 "Count, ABC & Read with KiddoVerse"** | 5:54 (354 s) | first delivery 2026-10-10; **polished v2 delivered 2026-10-12 03:37** → `Desktop\KiddoVerse_Learn1\` (1080p 490 MB, 720p 111 MB, SRT, chapters, YouTube description, thumbnails, 2 Shorts: ABC 20 s, counting 60 s). All automatic checks PASS, -13.9 LUFS, TP -0.6 dBTP |
| **LEARN #2 "The Color Train"** — colours red→purple | 302 s | **IN PROGRESS** (`hyperframes/learn2/`) — see §8 |

`Desktop\KiddoVerse_ALL_VIDEOS\index.html` = playable gallery of everything (39 videos incl. all Bo episodes), rebuilt with `node hyperframes/learn1/deliver/build_gallery.cjs`.

## 2. Brand promise & personality
- **Promise:** "Every song is a trip — and everyone is welcome aboard."
- **Personality:** Bright · Kind · Curious. Voice: warm, playful, never sarcastic, never scary; short sentences; sing-along-able; a grown-up should enjoy the 20th replay.
- **Global, not local:** placeless pocket galaxy, mixed-heritage crew; cultures appear as *guest worlds* (ideas: "Jollof Jamboree", "Lantern Lane", "Samba Sky", "Taco Twirl", "Bhangra Bazaar") done respectfully with a native-speaker consultant and credit.
- **Content pillars:** Zoomie Songs (3-min music videos) · Feelings with Nimbus (1–2 min) · Gizmo's Lab (numbers, shapes, tiny science) · Kiddo Wiggle (15–40 s dance challenges) · Pocket Stories (5–8 min) · Moon Library (sleepy lullabies, 10-min loops) · **Learn episodes** (5–6 min, one curriculum theme each; the series the user is building now).
- **Always:** original music/characters/words · one clear learning idea per song · a move kids can copy (clap/stomp/wiggle) · kind endings, every character gets a moment. **Never:** imitate another brand's characters/logo/melody/catch-phrases · scary, violent or mean-spirited humour · fast strobing or screaming audio · real children's faces/voices without consent.

## 3. The crew (7 recurring characters)

| Character | Type | Looks (use these words in any image prompt) | Job in an episode | Catchphrase | Signature sound |
|---|---|---|---|---|---|
| **Kiko** | 6-year-old human explorer | warm-brown skin, spiky black hair with a golden star clip, orange star hoodie, teal shorts, white sneakers | the leader; starts every trip; says the 3-2-1 | "Adventure o'clock!" · "All aboard the Zoomie!" | bright marimba run C-E-G-C ("ba-dum!") |
| **Luma** | 6-year-old human singer | light-olive skin, deep-purple hair in two big buns with gold star clips, mint dress with a yellow music-note badge, yellow boots | the heart and voice; leads songs; stage fright | "Sing it with me!" | celesta twinkle + soft "ooh" |
| **Bloop** | jelly alien ("3 galaxy-years") | teal-mint translucent jelly body, big eyes, pink cheeks, antenna with a glowing orb that changes colour with mood (pink = happy) | comic relief; speaks only in "bloops" | "Bloop bloop!" | bubble-pop synth glide |
| **Rumble** | baby triceratops, age 4 | lime-green, cream belly, orange-pink spotted frill, three tiny horns | the strong soft friend; counts eggs; stomp-dances; his tail knocks things over | "Stomp stomp, hooray!" | comic sousaphone "oom-pah" + stomp |
| **Gizmo** | pocket robot ("built last Tuesday") | round silver-blue head, dark visor with LED face, orange ear-dials, chest display showing a number (5), small treads | the brain: counts, sorts, shapes; "recharge nap" when excited | "Calculating… FUN!" | chiptune arpeggio + blip |
| **Nimbus** | cloud-lamb weather spirit, age 5 | fluffy white cloud body, pink ears, rosy cheeks, glow gold (happy) / blue (sad) / lilac (nervous) | feelings guide ("feelings are weather — they pass"); leaks rain when sad | "It's okay to feel!" | soft flute + pad + wind chime |
| **Zoom "the Zoomie"** | rocket-bus with a face | chunky violet-and-yellow bus, rocket fins, flame thruster, round headlight eyes, smile bumper | home base & ride; dad-jokes, safety first; runs on "rainbow fuel made of kindness" | "Beep beep, all aboard!" | engine rumble + "doo-doo" horn |

Kiko starts it, Luma sings it, Bloop breaks it, Rumble carries it, Gizmo explains it, Nimbus feels it, Zoom takes everyone there. **Give every character one job per episode.** Mascot of the logo: **Orbie** (a smiling purple planet with a star).
Spare names if a trademark check fails (not cleared): bus → Whoosh / Rocket Roo / Vroomie; robot → Cogsy / Tinker-Bot / Bleep.

## 4. Visual identity
- **Palette:** Violet `#6C4CF1` (primary) · Night/outline `#2B1B5E` · Coral `#FF5E7E` · Sun `#FFC93C` · Mint `#2EC4B6` · Sky `#4CC9F0` · Orange `#FF8A3D` · Magenta `#C65BFF`. Stage background of the Learn pages `#1F1650`.
- **Rules:** every character has a bold dark-indigo outline (6–8 px at 1080p); backgrounds are soft, outline-free paintings so the cast pops; high-key, saturated, never muddy; colour-blind-friendly lessons (shape + colour pairs).
- **Fonts (SIL OFL):** **Fredoka** (logo, titles, captions) and **Baloo 2 ExtraBold** (small labels/taglines). **Known bug:** Fredoka 700/600 draw a malformed capital **B**; fixed globally by an extra `@font-face` with `unicode-range:U+0042` pointing to Baloo 2 800 in `build/template.html` AND `build/make_thumbs.cjs`. Keep it in any new template.
- **Captions (burned in):** 70 px, white, 15 px indigo stroke (`-webkit-text-stroke` + `paint-order:stroke fill`), bottom-centre; the sung word turns **sunshine yellow**, echo/response lines **pink**; karaoke style. Logo top-centre; nothing important in the outer 6 %.
- **Motion rules:** characters hop on every beat (squash → stretch → land); nobody stands perfectly still; cut every 2–3 s on average; camera always drifting (slow push-in); a "punch" pulse on chorus downbeats; every teaching word appears on screen **at the exact sung beat**. Flashes = single soft white pops ≤ 0.3 s. Thumbnails: one big face + one big word (≤ 3 words), 3 colours.

## 5. Sonic identity
- **Sonic logo:** three rising notes **E–G–C** ("Kid-do-verse!") on glockenspiel + marimba, then a sparkle. Opens every video, is the chorus hook, closes every video.
- **Songs:** Learn #1 = 120 BPM C major (final choruses D major); Learn #2 = 108 BPM, 4/4, C major with colour stops climbing in key (+2, +4 semitones) and a big finale in F; Zoom Zoom = 120 BPM C major, key-up finale in D.
- **Instruments:** ukulele, marimba, glockenspiel, claps, tuba bass; original arrangement played with the GeneralUser GS SoundFont (licence permits commercial use); the logo jingle is original.
- **Voices:** theme songs, counting songs and the ABC song are **sung** (SoulX-Singer, Apache-2.0, CPU, 4–10 min/line in Learn #1); the **alphabet lines, two-letter-word lines and the word recap are CHANTED** by Kokoro `af_heart` (IPA for the sounds) because the singer's consonants were unintelligible (ASR 53 %); spoken character lines are Kokoro. Learn #2 uses a newer **"singer v3"**: every lyric word first spoken by Kokoro, then a WORLD vocoder puts vowels on the melody (stems: lead `af_heart`, double `af_nicole`, harmony `af_sarah`, kids A/B/C `af_nova`/`af_river`/…). Lyrics use **American pronunciation** ("zee", "vase"); UK/Ghana viewers say "zed".
- **Loudness:** master ≈ -14 LUFS (Learn #1: -13.9 LUFS, TP -0.6 dBTP).

## 6. Pocket Worlds (backgrounds that exist as code in `kv_worlds.js`, `edu_worlds.js`, `color_worlds.js`)
Rainbow Hills (colours) · Dino Valley (counting, volcano, eggs) · Cloud Kingdom (feelings) · Robot Workshop (shapes, gears, conveyor) · Wiggle Stage (disco dance break) · plus the Learn worlds *Number Meadow, Alphabet Garden, Word Workshop, Game Galaxy* (Learn #1) and *hub, c_<colour> stops, disco, finale, space, numland, abc* (Learn #2 world keys). Unbuilt ideas: Ocean Deep (animals/sea words), Candy Kitchen (sharing, fractions), Moon Library (letters/sleep), Jungle Drumbeat (rhythm), Festival Street (rotating cultures).

## 7. Canon of the finished videos

### 7.1 "Zoom, Zoom, Kiddoverse!" (3:16, 120 BPM)
Intro (3-2-1 "Zoom!") → Chorus ("Zoom, zoom, Kiddoverse! Hop on board, let's go! … Round the stars and back again, everybody's welcome in!") → V1 Rainbow Hills (colours) → V2 Dino Valley (Rumble counts eggs 1–5) → V3 Cloud Kingdom (feelings, deep breath) → Dance break *The Kiddo Wiggle* ("Wiggle left, wiggle right! … FREEZE!") → V4 Robot Workshop (circle/square/triangle/star) → Bridge "Every one of us is a star!" → Final chorus (key up) → Outro "Bye bye, Kiddoverse!" 96 shots, karaoke captions. Chapters in `KiddoVerse_Upload_Kit.md`.

### 7.2 LEARN #1 "Count, ABC & Read with KiddoVerse" (354 s) — the template for every Learn episode
| Time | Section (`kind` in song.json) | Content |
|---|---|---|
| 0:00 | `intro` | logo jingle; Kiko "All aboard the Learning Express!" Luma "Ready?" All "Ready!" 3-2-1 **Zoom!** |
| 0:08 | `chorus` | **Theme song**: "Zoom, zoom, KiddoVerse! Learn with me today! Count and sing and say A B C, hooray! Numbers, letters, words to know, learning more each day! Zoom, zoom, KiddoVerse! Let's learn and play!" |
| 0:24 | `numintro`, `num` ×10, `numrev` | Number Meadow: each number = big numeral + word + items pop in one by one while the sung count rises ("one, one, little star… ten, ten, big balloons"); counting recap "one two … ten! hooray!" |
| 1:32 | `chorus` | theme song again |
| 1:48 | `abcintro`, `abc` ×7, `abcsong` | Alphabet Garden: each letter = **letter name → sound → picture word** ("A a apple! B buh ball! …"); then the ABC song lights up the whole alphabet (1:48–3:30) |
| 3:30 | `dance` | **Brain break** (clap/stomp/jump/spin/wiggle, "Freeze!") |
| 3:46 | `wordsintro`, `word` ×10, `wordrev` | Word Workshop: at, in, on, up, go, no, me, be, it, my — letters slide together, picture + action show meaning; recap "We can read!" |
| 4:38 | `gameintro`, `game` ×3 | Game Galaxy "Can you find it?" — question, quiet thinking pause with countdown, answer ("Where is number five? Yes! It's five!" / letter M / word *go*) |
| 5:06 | `fin`, `fin2` | theme song, key up; big finish |
| 5:38 | `outro` | "Bye bye, KiddoVerse! See you next time! Ask a grown-up to subscribe!" (no end-screens: made-for-kids) |

Known leftover minor visuals (v2): row-2 count bubbles overlap, music note over V/W tile ~199–203 s, "ME!" burst 10 px, game thinking pause 3.75 s. Recommendations doc: `learn1/deliver/KiddoVerse_Learn1_Recommendations.md`.

### 7.3 LEARN #2 "The Color Train" (302.2 s, 108 BPM) — from `learn2/data/song.json`
| `i` | kind | t0–t1 (s) | Lyrics / content |
|---|---|---|---|
| 0 | intro | 0–8.9 | logo; Kiko "All aboard the Color Train!" Luma "Ready?" All "Ready!" 3-2-1 "Go!" |
| 1 | chorus | 8.9–26.7 | "Toot toot! Here comes the train! Rainbow colors, big and bright! Red and blue and yellow too! Let's find the colors with me!" (train arrives, rainbow lights band by band, three colour orbs) |
| 2 | story | 26.7–44.4 | "Oh no! The rainbow's gray! Where did the colors go? Let's ride the train and find them! All aboard! Toot toot!" |
| 3–8 | stop ×6 | 44.4–204.4 (≈ 26.7 s each) | one stop per colour, **same tune, key climbs**: "Toot toot, stop stop! Here's red! red red red… apples are red, hearts are red, cherries are red. What color is it? Red!" Colours: **red `#FF3B4E` (apple, heart, cherry) · orange `#FF9F1C` (orange, carrot, fish) · yellow `#FFD60A` (sun, duck, star) · green `#2FCB5A` (tree, frog, leaf) · blue `#2F8BFF` (whale, balloon, blue ball) · purple `#9B5CFF` (grapes, flower, hat)**; the world turns from gray to that colour |
| 9 | rainbow | 204.4–222.2 | "Red, orange, yellow, green, blue, purple! A rainbow! Look at the rainbow! Hooray!" |
| 10–13 | gameintro, game ×3 | 222.2–253.3 | "Let's play a game! Find the color! Where is blue? Yes! It's blue!" (blue, green, orange) |
| 14 | fin | 253.3–271.1 | chorus again (key up) |
| 15 | fin2 | 271.1–288.9 | chorus; last line "Colors, colors, we love colors!" |
| 16 | outro | 288.9–302.2 | "Bye bye, Kiddo(verse)! See you next time! Ask a grown-up to subscribe!" |
Design rules in `song.py` (the "teacher's checklist"): every sung word is a real note ≥ 0.55 s (0.28 s only for tiny words); the **colour word is always the longest note**; one new idea per verse; same tune for every colour; three objects per colour; an echo ("Red!") and a question with a pause for the answer; lines 5–8 syllables; children's voices answer the lead (call-and-response).

## 8. Learn #2 — what exists / what is missing (checked 2026-10-13 15:10)
Exists: `data/song.json` (65 lines, 17 sections), `audio/song.py` (DSL), `audio/singer.py` (v3), `audio/sing_song.py`, stems `audio/stems/{lead,double,harm,kidsA,kidsB,kidsC}.wav` (all six files exist, full-song length ≈ 301.8 s at 24 kHz mono; their *content/quality* was not checked), 573 cached word tokens in `audio/tok/`, `audio/music_stem_cm.wav` + `master.wav` (same size → master is probably the music-only placeholder, **not** the final mix), `build/{color_story,color_props,color_objects,color_worlds}.js`, `index.html` (248 KB, built 14:44 today).
Missing / not done: `data/sfx.json` + `audio/sfx_stem.wav`, final mix (`mix3.py` run), QA of the sung stems (ASR/ESTOI), picture render (`renders/` empty), thumbnails, Shorts, `deliver/` (empty), YouTube text. There is **no `stages.py`/`run_all.py` in `learn2/audio`** — copy the learn1 versions and adapt `PIC`, `DURATION=302.2`, folder names (`learn1`→`learn2`), `DESK`, and the sung-vs-chanted handling. **A Claude session was editing these files today (14:08–14:44); check `ListAgents`/ask the user before touching.**

## 9. Publishing, policy and legal facts (not legal advice; facts as documented in the project)
1. **Name:** KIDDOVERSE is a **registered US trademark** (22LEARN, LLC, Reg. 5762831, downloadable game software, registered 28 May 2019) and at least two toddler-learning apps are called Kiddoverse (one kidSAFE-certified). It could not be confirmed the registration is still live. The name is baked into the logo, thumbnails, captions **and the sung audio** ("Zoom, zoom, KiddoVerse!") — **decide before uploading**; a later rename = re-making logo, thumbnails, captions, re-singing. Backup brand ideas (uncleared): Glimmerverse, Wonderpocket, Twinkle Orbit, Orbie's World, Starpocket (avoid "Pocketverse", "Kiddozoom"). "Zoom" and "Gizmo" are also heavily-used names; run a USPTO/EUIPO/WIPO search in classes 9, 28, 41.
2. **Audience:** choose **"Yes, it's made for kids"**. YouTube then disables comments, end screens and cards and limits personalised ads/notifications (revenue is typically lower) → the videos end with a plain goodbye, no end-screen elements.
3. **AI disclosure:** characters are animated; the voices (SoulX-Singer sung, Kokoro spoken/chanted) and the music are AI-generated. Answer YouTube's "altered/synthetic content" question honestly as it is worded in Studio; the description already says "Made with animation and AI: the characters are animated, and the voices and music are AI-generated." Policy scrutiny of AI kids' content is rising (2026 letters from 200+ child-development groups) — the Brand Bible's advice: be transparent, lead with original characters + human creative direction + real educational value, avoid mass-produced look-alikes, and plan to replace synthetic vocals with a human singer when budget allows.
4. **Voice prompt origin:** the SoulX-Singer prompt `audio/sx/prompt_lead2.wav` (8.2 s) is a synthetic clip made inside the project; its exact creation step was **not logged** → check before commercial use.
5. **Fonts/Music/Software:** Fredoka + Baloo 2 (SIL OFL), GeneralUser GS SoundFont (commercial OK), Kokoro-82M (Apache-2.0), SoulX-Singer (Apache-2.0), HyperFrames (Apache-2.0), GSAP "no-charge" Standard License (keep notice).
6. **Captions:** burned in; SRT provided — uploading it duplicates the text unless wanted for search/translation.
7. **Channel plan (suggested, untested):** one Learn episode + a couple of Shorts per week; playlists "Learn with KiddoVerse", "Zoomie Songs", "Dance & Wiggle", "Feelings with Nimbus"; "Where's Bloop?" hidden-character gag; #KiddoWiggle challenge (parent-permission only); one master song → twelve assets (hook cut 20 s, Wiggle 30 s, counting 18 s, colour hunt 16 s, Nimbus calm-down 20 s, Gizmo shape quiz 20 s, karaoke version, 10-minute loop, audio single, printables, 7 × 10 s "Meet the crew"). Targets like CTR 4–5 % are rules of thumb, not promises.

## 10. Roadmap of Learn episodes
See `08_NEXT_STORYLINES.md` §3 for a full brief per episode (Learn #2 finish, #3 Shapes, #4 Animals & Sounds, #5 Numbers 11–20, #6 Three-letter words, …).



==================================================================================================
# FILE: 06_KIDDOVERSE_PRODUCTION_PLAYBOOK.md
==================================================================================================
# 06 — KIDDOVERSE · PRODUCTION PLAYBOOK

How a KiddoVerse video is made, from the files in `hyperframes/learn1/` (finished and polished), `hyperframes/learn2/` (in progress), `hyperframes/kiddoverse/` (video #1) and the project memory notes. Paths relative to `C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes` unless absolute. The sung-voice engine lives outside, in `..\tools\sxenv\` (SoulX-Singer venv).

---

## 1. Architecture

**One data model drives everything: `data/song.json`.** It contains `bpm`, `bar` (seconds), `duration`, `brand`, `sections` (kind, bars, t0/t1, chord progression `prog`, `transpose`, `meta`), `lines` (each with `words`, every word with `syl` notes `{note, t0, dur}`, `voice`, phonemes `ph`, display text, exact times), `speech` (spoken one-liners with time, speaker, text) and — in Learn #2 — `colors`. From it are generated: the sung voice, the music arrangement, karaoke captions, mouth shapes, and the **storyboard** (`*_story.js` places a picture on every sung word, on the beat grid).

Build chain: `audio/song.py` (lyrics DSL → `song.json`) → `build/build.cjs` inlines data + all JS into one **1920×1080 single-file `index.html`** (GSAP 3.13 timeline at `window.__timelines.main`, `data-duration` = song duration) → HyperFrames renders it → audio is muxed in later (the picture render uses a placeholder `audio/master.wav`).

### Build files (`build/`)
| File | Role |
|---|---|
| `template.html` | page shell: fonts (+ the Capital-B fix), caption/brand/end-card CSS, stage `#stage` 1920×1080 |
| `kv_chars.js` | the 7-character rigs (Kiko, Luma, Bloop, Rumble, Gizmo, Nimbus, Zoom) incl. mouths/eyes/expressions |
| `kv_worlds.js`, `edu_worlds.js`, `color_worlds.js` | background worlds |
| `kv_props.js`, `edu_props.js`, `color_props.js` | animated props: `train`, `rainbow`, `orb`, `badge`, `text`, `chip`, `banner`, `sparkles`, `confetti`, `fireworks`, `hearts`, `speed`, `notes(…)`, counters… (`P: (T)=>[['kind','layer',x,y,…args]]`) |
| `edu_objects.js`, `color_objects.js` | drawable objects (apple, star, whale, balloon…) |
| `kv_logo.js` | Orbie planet + rainbow wordmark (`KVLogo.html(size)`) |
| `kv_engine.js` | the engine: `window.KVW`, actors `A(...)`, camera presets (`wide`, `wideIn`, `low`, `{face,z}`), `punch`, mouth sync, SFX log `window.__LOG/__SFX` |
| `learn_story.js` (Learn #1), `color_story.js` (Learn #2), `kv_story.js` (video #1) | the storyboard: `section(kind, nth, shots)`; each shot `{b: beats, w: world, cam, A: actors, P: props, fx, flash, punch}`; `place()` **throws if a section's beats ≠ bars×4** |
| `kv_story_v.js`, `template_v.html`, `build_v.cjs <hook\|wiggle\|count>` | vertical 1080×1920 Shorts (`hyperframes/kv_short_<id>/`) cut from the song |
| `make_thumbs.cjs` | thumbnails (puppeteer; contains the B-font fix too) |
| `preview_frames.cjs` | puppeteer stills at given times, reports page errors |
| `dump_sfx.cjs` | loads the page and dumps the SFX events (`window.__SFX`) → `data/sfx.json` |
| `contact_objs.cjs`, `preview_chars.cjs` | contact sheets of objects/characters |

### Audio files (`audio/`)
`song.py` (DSL) · `sfx.py` (+ `sfx_stem.wav`) · `music_cm.py` / `music2.py` (arrangement → `cm_events.json`) · `cm_render.py` (renders events with the GeneralUser GS SoundFont → `music_stem_cm.wav`, stems in `cm_stems/{bass,drums,harm,mel}.wav`) · `vocals.py`, `sx_*.py`, `run_vocals_learn.sh` (SoulX-Singer sung lines, Learn #1) · `singer.py` + `sing_song.py` (Kokoro+WORLD "singer v3", Learn #2) · `make_speech.py` / `make_texts.py` (spoken lines) · `mix3.py` (the mix) · `aac_safe.py` (AAC-safe loudness/peak) · `qa_asr_mix.py`, `qa_sing.py`, `sx_stoi.py` (QA) · `stages.py` + `run_all.py` + `run_final.py` + `.cmd` wrappers (Learn #1 unattended pipeline).

## 2. Anatomy of a Learn episode (the reusable template)
`intro` (logo + 3-2-1 + theme) → `chorus` (theme song) → **teaching blocks** (Learn #1: numbers ×10 → recap; letters ×26 in 7 groups → ABC song; two-letter words ×10 → recap. Learn #2: story "Oh no, the rainbow's gray" → 6 colour stops → rainbow) → brain-break dance → **game** (3 rounds with a silent thinking pause) → `fin`/`fin2` (theme, key up) → `outro` (goodbye). ≈ 5–6 minutes. Rule: **one curriculum theme, 6–10 items, same structure repeated per item, the same hook sung 4–5 times**. Every item: say it → show it on the sung word → count/repeat it → question with a pause.

## 3. Create a new episode (e.g. Learn #3 "Shape Workshop")
1. **Brief** (see `08_NEXT_STORYLINES.md` §3 and `07_TEMPLATES…`): learning goal, 6–10 items, 3 sub-objects each, characters' jobs, world, game questions, brain-break theme, theme-song variation, title/description/tags.
2. **Folder:** copy the newest finished/in-progress folder (`learn2`) to `learn3`, EXCLUDING generated heavy data. Example (dry-run first with `/L`):
   `robocopy learn2 learn3 /E /XD renders cache cm_stems stems tok proto sx _backup* _prev_mix_v1 __pycache__ deliver /XF *.wav *.mp4 *.pt`
   Then rename references (`learn2`→`learn3`, title strings, `DURATION`, `DESK` path) — the Learn #1 pipeline has **28** hard-coded `learn1/Learn1/LEARN` mentions in `stages.py`.
3. **Lyrics/melody → `audio/song.py`** following its "teacher's checklist" (§7.3 of the bible). Run `cd audio ; python song.py` (its `__main__` writes `..\data\song.json`; `song.build()` is the importable form used by `singer`/`sing_song`/`music`/`sfx`). Check: `duration` ≈ target, each section has the right bars.
4. **Storyboard** `build/<theme>_story.js`: one `section(kind, nth, [shots…])` per section; shots sum to `bars*4` beats; put each teaching object on the exact word via `W[li][wi].t0`. New props/objects → `<theme>_props.js`, `<theme>_objects.js`; new worlds → `<theme>_worlds.js`; register the new `__TOKEN__`s in `build.cjs` and `template.html`.
5. **Build + preview** (never run a long render before this passes):
   ```powershell
   node build\build.cjs                                   # → index.html (do NOT do this while a render is running)
   $env:KV_PAGE='C:\...\learn3\zz_test_index.html'        # safer: write a test build next to index.html
   node build\preview_frames.cjs C:\tmp\l3 12,30,60,100,150,200,260   # stills + page errors (puppeteer at kit root node_modules)
   ```
   Test builds without touching `index.html`: copy `build.cjs` to write `zz_test_index.html` and use `KV_PAGE`. Read the stills (faces, overlaps, counting rows 290 px apart and ×0.9 scale for 6–8 objects, no badge touching the row above).
6. **SFX:** `node build\dump_sfx.cjs` → `data\sfx.json` → `python audio\sfx.py` → `audio\sfx_stem.wav`. **Any later edit to `index.html` makes the sfx stage want a rebuild (≈ 40 min)** — if the events are unchanged (compare `dump_sfx` output with `data/sfx.json`), just `touch` `audio/sfx_stem.wav`.
7. **Music:** run the arrangement (Learn #1: `music_cm.py`; Learn #2: `music2.py` "nursery-rhyme pop" with real sampled instruments, same chords/melody/sections/timing as `song.py`, the 0–2 s sonic logo timed to the `KVTitle` letter pops → `cm_events.json`) and `cm_render.py` (FluidSynth CLI + GeneralUser GS from `..\tools\soundfonts`) → `cm_stems/{harm,mel,bass,drums}.wav` → `music_stem_cm.wav`. Sonic logo E–G–C at the start/end. `mix3.py` (v3 "human-singer mix") was written for the SoulX lead + kids' gang; for Learn #2's singer-v3 stems adapt its inputs (`stems/*.wav`) and A/B against the dry voice.
8. **Voices:**
   - **Sung lines** (theme, counting, ABC song): Learn #1 = SoulX-Singer on CPU via `vocals.py`/`run_vocals_learn.sh` (4–10 min per line, resumable: `sx/mel_lead/*.pt` + `sx/wav_lead/*.wav`, segments listed in `sx/lead_all.json`, keyed by md5 of phonemes/pitch/duration). Learn #2 = singer v3: `python audio\sing_song.py [lead double harm kidsA kidsB kidsC]` → `stems\*.wav`.
   - **Chanted lines** (letter name → sound → word; two-letter words; recaps): Kokoro `af_heart` with IPA for sounds, tokens placed at the **same word times** so captions/mouths stay in sync (Learn #1 v2 `chant.py`; old sung versions kept in `sx/_old/chant`). Reason: sung consonant sounds were unintelligible (ASR 53 %).
   - **Spoken lines:** Kokoro (`make_speech.py`/`make_texts.py`).
   - **Delete `sx/qa_done.flag` and `sx/mix_ok.flag`** after changing any take; a fresh qa re-roll reuses the same seeds and wastes ≈ 1 h.
9. **QA the voice:** `qa_asr_mix.py` (Whisper per section is noisy — re-check with a windowed word-timestamp run before re-singing a "low" line), ESTOI vs dry voice (Learn #1: sung mix 0.642 → clarity mix 0.682 → chant mix 0.740 across 44 sections), listen test by the user. Honest caveat: the agent cannot listen.
10. **Mix:** `mix3.py` with `MIX_MUSIC=music_stem_cm.wav`, `M3_LOOK=0.04 M3_HFCUT=4 M3_HFPRES=4.5 M3_CV=3 M3_DSTH=-31 M3_CARVE=2.0 M3_DUCK=0.7 M3_MAXCUT=20 M3_ONSET=3` (the "v2 clarity mix") → `aac_safe.py raw safe 0.89` → trim to **-14 LUFS** (`volume`+`alimiter 0.89`) → `master.wav`. Target: -13.9/-14 LUFS, true peak ≤ -0.3 dBTP (ideally ≤ -1).
11. **Render the picture** (the slow one, 34–60 min for ≈ 6 min of 1080p; the CLI cannot resume or render a range — a killed render restarts at 0):
    `node node_modules/hyperframes/bin/hyperframes.mjs render learn3 --workers 1 --fps 30 -o learn3\renders\learn3_picture.mp4 --protocol-timeout 900000 --player-ready-timeout 300000 --browser-timeout 900` with `PRODUCER_PUPPETEER_PROTOCOL_TIMEOUT_MS=900000`. `valid_picture()` demands: file > 8 MB, duration ± 1.5 s of target, **newer than `index.html` and `data/song.json`** (an older render is moved aside as `*_old_<stamp>.mp4`). **NEVER edit `index.html` while it renders.**
12. **Deliver** (`stage_deliver`): mux picture + `master.wav` → `<Name>_1080p.mp4` (AAC 256k, faststart) and `_720p.mp4` (libx264 crf 20) + mp3 + master wav + SRT + script (without the "(c) KiddoVerse" line while the name is uncleared) + chapters + recommendations + `YOUTUBE_DESCRIPTION.txt` + thumbnails + Shorts (`make_shorts`) + `FINAL_REPORT.txt` (PASS/FAIL: duration ±0.5 s, loudness -14 ±1, true peak ≤ -0.3) + `README_START_HERE.txt` into `Desktop\KiddoVerse_LearnN\`. Rebuild the gallery: `node learn1\deliver\build_gallery.cjs`.
13. **Tell the user** exactly what to listen to; add timestamps for anything unclear; log the result in the notes.

## 4. Launch the unattended pipeline (Learn #1 pattern)
```powershell
Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
  CommandLine = 'cmd /c C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\learn1\audio\run_all.cmd'
  CurrentDirectory = 'C:\Users\softenic\Downloads\ai-video-studio-kit\hyperframes\learn1\audio' }
```
`run_all.py` stages (each idempotent, `stages.py` hot-reloaded before every stage): **sfx → picture → thumbs → vocals → qa → mix → deliver**; it keeps the PC awake (`SetThreadExecutionState`), writes `deliver/STATUS.txt` (one line), `deliver/run_all.log`, and `deliver/ALL_DONE.flag` at the end; `run_final.py/.cmd` = just picture + deliver (sets STATUS "FINAL DONE"/"FINAL STOPPED"). **At the start of every session: read `deliver/STATUS.txt` and `tasklist`; if the pipeline died, restart it (progress is saved per line).** `run_final.py` imports `stages.py` once — edits to `stages.py` do not reach a running deliver; re-run `make_shorts`/`write_readme` from a fresh python afterwards.
The `.cmd` wrappers hard-code a long PATH (Cursor, Node, Python 3.12, WinGet…) — copy it when making `run_all.cmd` for learn3.

## 5. Shorts / clips (vertical 1080×1920)
- Learn #1: `make_shorts` cuts two clips from the finished 1080p (ABC song 3:10–3:30 → 20 s; counting 0:24–1:24 → 60 s) at clean boundaries (between two lines, checked on the voice track; the ABC short was changed to 190–210 s because a 30 s cut ended mid-line). Watch each once.
- Video #1: `node build\build_v.cjs hook|wiggle|count` → `hyperframes/kv_short_<id>/` (windows: hook 6–24 s, wiggle 104–120 s, count 56–72 s of the master) then render that folder.
- Hook ideas for Shorts: "Can your toddler count to 5 with a baby dino?", "What colour is the balloon?", "Wiggle left… wiggle right… FREEZE!", "Spot the sneaky Bloop!".

## 6. Resume Learn #2 "The Color Train" (checklist)
0. `Get-Content learn2\deliver\STATUS.txt` (does not exist yet) and look for other sessions (`ListAgents`) — someone was editing at 14:08–14:44 on 2026-10-13.
1. `node learn2\build\build.cjs` only if no render is running; preview stills across all 17 sections; fix overlaps.
2. Verify the vocal stems (ASR windowed check, ESTOI) — the stems exist but were not checked.
3. `dump_sfx` → `sfx.py`; music stem is present (`music_stem_cm.wav`), `master.wav` is a placeholder.
4. Copy/adapt `stages.py`, `run_all.py/.cmd`, `run_final.py/.cmd`, `make_thumbs.cjs` settings for learn2 (`DURATION=302.2`, titles, `DESK=Desktop\KiddoVerse_Learn2`). Mix → deliver → user listens.
5. Provide YouTube text (title idea: "Learn Colors for Toddlers | The Color Train | Songs for Kids | KiddoVerse" — change if the name changes).

## 7. Traps (each cost hours — in order)
1. **Pipeline deaths, not work, ate the time** (3 days for Learn #1 on a 2-core/7.7 GB laptop). Launch detached via WMI; check STATUS first thing; scheduled tasks and tool-shell children got Ctrl+C'd; it still died at some session restarts.
2. **ffmpeg vanished from PATH once and killed every render** — `stages.py` now searches the WinGet Links + `Gyan.FFmpeg*` bin folders itself.
3. **Never let helper agents run `taskkill/Stop-Process` on python/node** (an audit killed the singer once). The other Claude session (Bo and Pancake) shares the PC: one heavy render at a time, message it via `SendMessage` (its name changes: `ai-video-studio-kit-97` → `-ca` → …; use `ListAgents`).
4. **Editing `index.html` mid-run** → sfx stage rebuild (40 min) and the stale-render check discards a good render.
5. **Capital B in Fredoka** (see bible §4).
6. **SoulX-sung consonants unintelligible** → chant those lines (done in v2).
7. Learn #1 leftover visuals: row-2 count bubbles overlap; music note over V/W tile ≈ 199–203 s; "ME!" burst 10 px; game thinking pause 3.75 s.
8. Whisper per-section ASR is noisy; don't re-sing on a single low score.
9. Verified clean in v2: no clicks in chant segments or dry voice, no clipping (peak .918), only intentional silences (FREEZE at 224.7–225.9 s; 100 ms music dips before downbeats).
10. **Open decisions for the user:** channel name (trademark), AI-disclosure answer, made-for-kids consequences (no end screens). Do not upload anything.
11. Write a note to the user: "I (the agent) cannot listen. ASR/ESTOI are proxies — please play the final and give me timestamps."



==================================================================================================
# FILE: 07_TEMPLATES_AND_GENERIC_VIDEO_PROMPTS.md
==================================================================================================
# 07 — TEMPLATES & GENERIC VIDEO PROMPTS

Fill-in briefs you can paste into Cursor (or any AI) plus **consistent character/style prompt blocks** for hosted image/video generators (Higgsfield, Runway, Kling, Veo, Seedance, Midjourney-type tools…) in case you ever want a shot made outside the local HyperFrames pipeline. Hosted tools can cost money and upload your prompts/images — ask before using them with this project, and never paste private data.

---

## 1. Bo and the Pancake — EPISODE BRIEF (fill in, then paste with `01_BO_MEGA_PROMPT.md`)
```
EPISODE: <N> — "<Title>"     SEASON: <n> (episode <k> of <m>)
CONTINUES FROM: ep<N-1> last line "<…>" / last frame: <where everyone stands>
SET: <kitchen | lawn | space | new set…>   TIME OF DAY: <morning | day | dusk | night>
FEATURED: <characters, ≤ 1 new>        NEW PROPS/SETS: <list>
LOGLINE (1 sentence, kid-clear): <…>
PROBLEM → TRY → TWIST → SOLUTION (sharing/teamwork): <…>
THE 11 LINES (4–7 words each, ≈ 50–62 total, aim 56):
 1 NAR  | …            — beat/camera: …
 2 …
 11 NAR | …            — CLIFF-HANGER or "end of Season N"
CATCHPHRASES USED: <Bo "Just one tiny bite!" …>
RUNNING GAG / CALLBACK: <…>
END CARD: line 1 "<…>"   line 2 "<…>"   (guess-bait or "SEASON N COMING SOON!" / "THANKS FOR WATCHING!")
COVER FRAME at ≈ <seconds> s (full frame, no captions): <what it shows>
MUST NOT: <anything scary / new rigs / …>
```

## 2. Bo — SEASON PITCH template
```
SEASON <n>: "<Title>"   episodes <a>–<b>   one-line promise to the viewer: <…>
WHY NOW (what the last finale handed us): <…>
EPISODE LADDER: <5 × (title — one-sentence beat — cliff-hanger)>
NEW CHARACTER(S): <≤ 1 per episode, rig effort>   NEW SETS: <…>
GAGS PAID OFF: <…>   CONTINUITY FIXES: <…>
END-OF-SEASON HOOK for Season <n+1>: <…>
RISKS (engine/time): <…>
```

## 3. KiddoVerse — LEARN EPISODE BRIEF (fill in, then paste with `04_KIDDOVERSE_MEGA_PROMPT.md`)
```
LEARN #<n>: "<Title>"      LEADER CHARACTER: <Gizmo/Nimbus/…>      WORLD: <…>      BPM/KEY: <108 C…>   TARGET LENGTH: <5:00–6:00>
LEARNING GOAL (one sentence a parent would search for): <…>
ITEMS (6–10): <…>   3 OBJECTS PER ITEM: <…>
STORY HOOK (replaces "the rainbow's gray"): <…>
STOP VERSE TEMPLATE (same tune every item): "<…> Here's <ITEM>! <ITEM> <ITEM> … <obj1> are <ITEM>, <obj2>… What <thing> is it? <ITEM>!"
RECAP LINES: <…>     BRAIN BREAK (movements): <…>
GAME (3 rounds): 1 "<Where is …>"  2 "<…>"  3 "<…>"   thinking pause: 3.75 s
CHARACTER JOBS: Kiko <…> Luma <…> Bloop <…> Rumble <…> Gizmo <…> Nimbus <…> Zoom <…>
SUNG vs CHANTED vs SPOKEN: <which lines are chanted by Kokoro because of hard consonants>
NEW ART/SFX NEEDED (props, animal/animated sounds…): <…>
TITLE / DESCRIPTION LINE 1 (outcome first) / TAGS: <…>
THUMBNAIL (one face + ≤ 3 words): <…>
```

## 4. KiddoVerse — SHORT (vertical) BRIEF
```
SHORT: "<name>"  SOURCE: <episode + start–end seconds, cut between two lines>  LENGTH: 15–60 s
HOOK (first 2 s): "<Can your toddler …?>"  ON-SCREEN TEXT (≤ 3 words): <…>
MOVE KIDS CAN COPY: <…>   LOOP-FRIENDLY ENDING: <…>   CAPTIONS: burned-in
```

## 5. Daily "status check" prompt (paste at the start of any new session)
```
Status check, read-only. 1) Is anything running? (Get-CimInstance Win32_Process for hyperframes.mjs render, run_all, run_final, python/node jobs from this project.) 2) Tail hyperframes\run_episode.log, hyperframes\learn1\deliver\STATUS.txt (and learn2). 3) For Bo: which toonN have output\*-final.mp4 and which are delivered in Desktop\Content Creation\Videos? 4) ffmpeg -version OK? disk free? 5) Report in a table and tell me the next safe action. Do not start or kill anything.
```

## 6. How to give feedback after you watched/listened (copy this shape)
```
EP/VIDEO: <35 / Learn #1>   TIME: <0:14–0:17>   PROBLEM: <Mochi's mouth doesn't move | letter F unclear | caption covers Bo's face | too loud>
EXPECTED: <…>   PRIORITY: <must fix | nice to fix>
```
The agent then re-times/re-voices only that part and re-renders only what it must (a Bo episode is ≈ 5 min; a KiddoVerse render is 34–60 min — batch your notes first).

## 7. "Update the docs" prompt (end of every session)
```
Update CURSOR_HANDOFF/02_BO_STORY_BIBLE.md (episode guide + continuity), 03/06 playbooks (new helpers + gotchas), README_START_HERE.md §3 (current state) and the project memory notes with exactly what was built, measured and delivered today, what failed, and the next safe action. Keep it factual; mark anything unverified.
```

---

## 8. STYLE BLOCKS for hosted image/video tools

### 8.1 Bo and the Pancake style block (append to every prompt)
> flat 2D vector children's cartoon, thick dark-brown outline (#2b1a14), big glossy eyes with white sclera and black pupils with highlights, pink blush cheeks, soft gradient shading, warm high-key saturated colours, clean simple background, vertical 9:16, front or three-quarter view, full body, bouncy squash-and-stretch pose.
> **Negative:** photorealistic, 3D render, real person, extra fingers, morphing face, text, watermark, scary, creepy eyes, dark mood, gore, copyrighted character.

**Character one-liners (paste the ones in the shot):**
- **Bo** — small orange fox with cream belly and cheeks, bushy tail, big white-ringed eyes, **green dotted knitted scarf**.
- **Flapjack** — a thick golden-brown pancake character with a butter pat on top, syrup drip, big round eyes, tiny stick arms and little white feet.
- **Mochi** — gray tabby cat with darker stripes, long whiskers, tiny gold bell collar, white belly, long curled tail, deadpan half-lidded eyes.
- **Truffle** — round pink pig in a tall white chef's hat and white apron, curly tail.
- **Zap** — boxy silver-blue robot, dark rectangular screen face with a curved smile, small antenna with a red tip, round chest panel with a pink heart, stubby arms.
- **Coco** — brown monkey with a tan face and belly, long tail with a banana at the tip, mischievous grin.
- **Gumdrop** — big round blue-violet fuzzy monster with one huge eye, two small horn-ears, round spots, big friendly smile.
- **Boo** — small white floaty ghost with a wavy hem, pink bow, rosy cheeks, shy eyes.
- **Peanut** — baby elephant, blue-gray, big pink-lined ears, striped party hat, curled trunk.
- **Rocky** — gray raccoon with a black eye mask, a dark cap/hood, ringed tail, sly smile.
- **Blip** — small green alien, two antennae with yellow balls, spotted body, big curious eyes.
- **Nibbles** — tiny gray mouse, big pink-lined round ears, pink feet, a wedge of cheese.
- **Jiggles** — four small round jelly creatures with two antennae each (pink, yellow, blue, orange), freckles.
- **The King** — big round yellow ruler with orange freckle dots and rosy cheeks, golden crown *(check ep16 cover)*.
- **Munch** — giant round gray monster, lighter-gray belly with a pink heart, pink cheeks, small horn-ears, big buck teeth, gentle smile.
- **Pebble** — tiny pink baby version of Munch, heart on the belly, sparkles.
- **Settings:** (a) *kitchen*: peach polka-dot wall, mint tile band, cream-and-beige checkerboard floor, window with teal curtains, round wall clock, jar shelf, mouse hole, fridge on the right; (b) *lawn*: bright green grass, rolling hills, round trees, blue sky; (c) *Planet Zorp*: purple sky with a ringed yellow planet, giant spotted mushrooms, pink-salmon hills.

### 8.2 KiddoVerse style block
> flat-vector 2D children's cartoon, thick dark-indigo outline (#2B1B5E), soft gradient shading, big glossy eyes, rosy cheeks, high-key saturated palette (violet #6C4CF1, coral #FF5E7E, sun #FFC93C, mint #2EC4B6, sky #4CC9F0), clean light background, front view, full body, 16:9.
> **Negative:** photorealistic, 3D render, real person, copyrighted character, text, watermark, extra fingers, scary, creepy eyes, dark mood.

**Crew one-liners:** **Kiko** — 6-year-old boy explorer, warm-brown skin, spiky black hair with a golden star clip, orange hoodie with a big yellow star, teal shorts, white sneakers. **Luma** — 6-year-old girl singer, light-olive skin, deep-purple hair in two big buns with gold star clips, mint dress with a yellow music-note badge, yellow boots. **Bloop** — cute jelly alien blob, teal-mint translucent body, big eyes, pink cheeks, antenna with a glowing pink orb, tiny arms and feet. **Rumble** — baby triceratops, lime-green with cream belly, orange-pink spotted frill, three tiny horns, stubby legs, friendly toothy smile. **Gizmo** — small round robot, silver-blue head with a dark glass visor and LED eyes, orange ear dials, chest display showing the number 5, small treads. **Nimbus** — fluffy cloud-lamb, white cloud body with pastel-blue shading, pink ears, rosy cheeks, soft golden glow. **Zoom** — chunky violet-and-yellow rocket-bus with fins and flame thruster, headlight eyes in the windshield, smile bumper.

### 8.3 Image-to-video shot template
```
[Attach the character-sheet image as reference]
SHOT: <medium close-up | wide | over-the-shoulder>, slow push-in, <5 s>
SUBJECT: <Rumble> <stomps to the beat, tail wagging>
WORLD: <Dino Valley — volcano, ferns, warm peach sky>
STYLE: same flat-vector outlined look as the reference
MOTION: bouncy, on-beat at <120> BPM, squash & stretch; camera slowly drifting
AVOID: morphing faces, extra limbs, text, photoreal, dark mood
```
Worked example (Bo): *SHOT: medium close-up, slow push-in, 5 s · SUBJECT: Truffle the pig chef lifts a glowing golden pan and a red X appears on it · WORLD: warm kitchen, peach polka-dot wall · MOTION: Truffle's eyes widen, pan sparkles softly (no flashing) · AVOID: morphing faces, text.*

### 8.4 Music prompt for an AI music tool (needs a paid tool; ask first)
> Original children's pop-folk, 108–120 BPM, C major. Ukulele, marimba, glockenspiel, claps, tuba/acoustic bass, soft kit with shaker and tambourine. Bright child-like lead vocal + kids' gang chorus. Structure: 4-bar intro, 8-bar chorus (hook "Zoom, zoom, KiddoVerse!" sung E–G–C), verses with one learning idea each, dance break with call-and-response, bridge, key-up final chorus. No reference to any existing song. Lyrics: {paste lyrics}.

### 8.5 Rules for hosted tools
- Ask the user before any spend or upload. Keep a log of prompts + seeds in `CURSOR_HANDOFF/prompts_log.md` (create it).
- Always attach the character-sheet PNG as reference to keep the look; reject any frame where the face morphs or text appears.
- Keep every generated clip ≥ the series' loudness/size specs after editing; 9:16 for Bo, 16:9 for KiddoVerse.
- Disclose AI use according to the platform's wording; kids' content rules (no scary, no strobing, no real children) still apply.



==================================================================================================
# FILE: 08_NEXT_STORYLINES.md
==================================================================================================
# 08 — NEXT STORYLINES (proposals — NOT canon until the user approves and it is rendered)

Everything below is a **draft for the user to approve, cut or rewrite**. Canon lives in `02_BO_STORY_BIBLE.md` / `05_KIDDOVERSE_BIBLE.md`.

**Length budget for Bo scripts (measured from ep31–35):** 11 lines, **≈ 4–7 words per line, ≈ 50–62 words in total (aim ≈ 56; eps 3–35 ran 48–74)** → line 11 ends at ≈ 24–25.5 s (the planner warns beyond 26.6 s). Kokoro speaks ≈ 2.5–3 words/s; every line adds 0.36 s of gap; the first line starts at 0.6 s.

---

# PART A — BO AND THE PANCAKE

## A1. SEASON 8 — "The Treasure of Pancake Island" (ep36–40) — full draft

**Why this season:** (1) The S7 finale left us with the **Golden Pan** and Munch/Pebble/King all present; a pan that reveals a map when heated is a natural, kid-clear mystery. (2) A **treasure hunt** reuses the engine's strengths (tracking shots from S7, close-ups, depth rows, the night/glow helpers) and every ★ rig, needs only **one new character** (Grandma Flapjack = Flapjack rig + shawl + glasses) and a handful of new sets/props. (3) It pays off running gags: Rocky's stowaway, Peanut's memory, Mochi's deductions, Flapjack as "the answer to the riddle", Boo's courage, Truffle's pan. (4) The ending sets up **Season 9: Flapjack's Family Reunion**.

**Cast for the trip:** Bo, Flapjack (on Bo's head), Mochi, Truffle, Zap, Coco, Gumdrop, Boo, Blip, Peanut, baby Pebble (visiting for the week), Rocky (stowaway, revealed ep37). Jiggles stay home as the "sail" (ep37). Munch/King = cameos (waving off in 36; optional).
**New voice lambdas to add** in `mk_s8_setup.py`: `ROCKY = lambda t,c: ("'am_adam'", 0.92, t, c, 'ROCKY', 1.0, None)`, `FLAP = lambda t,c: ("'af_nova'", 1.10, t, c, 'FLAPJACK', 1.0, None)`, `NIB = lambda t,c: ("'af_bella'", 1.05, t, c, 'NIBBLES', 1.22, None)`, and **Grandma** (proposal): `GRAN = lambda t,c: ("'bf_isabella'", 0.85, t, c, 'GRANDMA', 0.9, None)` — audition the voice before approving.
**Start state:** last frame of ep35 (dusk lawn, fireworks, finish gantry, all gang, Munch + Pebble, golden pan, pancake tower). Ep36 jumps to **"The next morning"** in the kitchen (set exists) — so `_init36.js` mostly resets to the kitchen start layout of the S5/S6 openers; copy how `toon26/_init26.js` handled "The next morning, a giant egg appeared!".

### Ep36 — "The Map in the Pan"   (cover: Truffle holding the glowing pan, a red X on it; end card **WHERE IS THE X?** / **GUESS IN THE COMMENTS!**)
Logline: Munch drops the Golden Pan at the kitchen door (Pebble asleep inside for a sleepover). Truffle heats it; a **treasure map** appears. The island is far — Truffle and Zap build a **pancake boat**.
| # | Speaker | Line | Beat / staging |
|---|---|---|---|
| 1 | NAR | Munch left the Golden Pan outside! | wide kitchen door; giant gray hand/silhouette (Munch) waving away in the window; pan on the floor |
| 2 | TRUF | Wow! Let's cook in it! | Truffle close-up, pan on the griddle (`griddleMount`) |
| 3 | NAR | Sizzle, sizzle... and a map appeared! | steam, glow; the map burns into the pan (SVG path draw-on, X in red) |
| 4 | ZAP | Beep boop! X marks the spot! | Zap scans; map hologram overlay |
| 5 | MOCHI | Hmph. Treasure map. Obviously. | Mochi deadpan close-up |
| 6 | BO | Treasure! Let's go find it! | Bo jumps; Flapjack on head |
| 7 | PEB | Me too! Me too! | Pebble pops out of the pan, sleepy, sparkles |
| 8 | NAR | But the island was far away! | camera pulls out to the window: sea outside (new backdrop) |
| 9 | TRUF | Then we need a pancake boat! | Truffle flips a giant pancake like a raft |
| 10 | ZAP | Beep boop! Building the boat! | quick-build montage: spatula oars, syrup-bottle mast, Peanut waves from the dock |
| 11 | NAR | By sunset, the boat was ready! | wide dusk shot, boat full of friends, sail up (Jiggles) |

New: map overlay prop, sea backdrop, pancake boat (**keep a clean boat rig for ep37**), window-sea transition.

### Ep37 — "Rough Seas"   (end card **WHAT IS ON THE ISLAND?** / **GUESS IN THE COMMENTS!**)
Logline: The pancake boat sails; wind steals the map, Blip's antenna catches it; Boo is scared of the waves; a sneeze from the snack crate reveals **Rocky** the stowaway. "Land ahoy!"
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | The pancake boat sailed out to sea! | tracking shot over gentle waves (reuse S7 scroll layers: `scrollProfile` for waves/clouds) |
| 2 | BO | Wheee! I love the waves! | Bo bounces at the bow |
| 3 | GUM | Roar! I'll row! | Gumdrop rows with a giant spatula |
| 4 | NAR | Then the wind blew the map away! | the map flutters off the boat (simple flutter tween, no new rig) |
| 5 | BLIP | Whoa! My antenna caught it! | Blip's antenna snags the map; close-up |
| 6 | BOO | Waves! I'm scared. Boo. | Boo hides behind Bo |
| 7 | BO | Hold my hand, Boo! | brave hand-hold, Boo glows softly |
| 8 | NAR | Then somebody sneezed in the snacks! | camera to the snack crate; "ah-choo" pop |
| 9 | ROCKY | Nobody saw anything. | Rocky pops up with a pancake in each hand |
| 10 | BO | Rocky! You stowed away again! | group laugh (callback to ep17/ep20) |
| 11 | NAR | And then... land ahoy! | Coco in the crow's nest points; island silhouette shaped like a pancake |

New: Rocky already has a rig; sea set; waves; Blip's antenna snag; island silhouette.

### Ep38 — "The Riddle Gate"   (end card **CAN YOU SOLVE IT?** / **ANSWER IN THE COMMENTS!**)
Logline: A stone gate asks a riddle whose answer is… Flapjack. Mochi solves it; the jungle is full of pancake trees; Nibbles — who secretly rode along in Bo's scarf (show a one-frame cameo of his tail in ep37) — finds a secret path that ends at a canyon.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | A giant gate blocked the jungle! | beach → jungle edge, huge stone gate with a carved face |
| 2 | NAR | It said: Round, golden, and flipped! | riddle text appears on the gate as a chip; **comment-bait: pause the camera on the gate 1 s** |
| 3 | COCO | Ooh-ooh! A banana? | wrong guess; banana gag |
| 4 | TRUF | Needs a pinch more thinking! | Truffle taps his chef hat |
| 5 | MOCHI | Hmph. It's a pancake. Obviously. | Mochi solves it; everyone looks at Flapjack |
| 6 | FLAP | Wait... that's me! | Flapjack blushes |
| 7 | NAR | The gate rumbled and swung open! | gate opens, light rays, dust, shake |
| 8 | BO | Pancake trees! Just one tiny bite! | jungle of pancake-stack trees |
| 9 | NIB | Squeak! Cheese? | Nibbles pops out of Bo's scarf |
| 10 | NAR | Nibbles found a secret path! | Nibbles scurries ahead, group follows (tracking shot) |
| 11 | NAR | But the path ended at a canyon! | wide shot: canyon, far side with a red X flag |

New: stone gate (prop with face + riddle chip), jungle set, pancake trees. Nibbles' rig exists (`nm`) but he is a **tiny** character in the mouse-hole role so far — check his scale/pose set in `toon3`/`toon4` before relying on close-ups.

### Ep39 — "The Wobbly Bridge"   (end card **WHAT IS IN THE CHEST?** / **GUESS IN THE COMMENTS!**)
Logline: Teamwork across a wobbly bridge (Gumdrop holds it), syrup smudges the map, **Peanut remembers everything** and leads them to the X; the chest is locked.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | A wobbly bridge crossed the canyon! | side-on canyon shot (reuse S7 side-on tunnel framing logic) |
| 2 | ZAP | Beep boop! Two at a time! | Zap counts; sign "2 MAX" |
| 3 | GUM | Roar! I'll hold the bridge! | Gumdrop braces, muscles, wobble |
| 4 | NAR | Step by step, they crossed. | pairs cross, bridge sways (never fall) |
| 5 | BOO | I'll float across. Boo. | Boo floats over, gives a tiny thumbs-up |
| 6 | NAR | Syrup splashed on the map! | Coco swings past and flicks Truffle's syrup bottle; the map gets a brown smudge |
| 7 | BO | Oh no! We can't read it! | Bo's big worried eyes |
| 8 | PEAN | I remember the map! Go left! | Peanut's memory bubble re-draws the map |
| 9 | NAR | Peanut led them to the big X! | tracking shot, dune/palm, huge red X on sand |
| 10 | TRUF | A treasure chest! Let's open it! | chest rises from the sand |
| 11 | NAR | But the chest was locked tight! | lock shaped like a pan handle; **cliff-hanger** |

New: bridge prop, canyon set, syrup-smudged map overlay, chest + pan-handle lock.

### Ep40 — "The Real Treasure"   (end card **SEASON 9 COMING SOON!** / **THANKS FOR WATCHING!**)
Logline: The lock is pan-handle-shaped: the Golden Pan is the key. Inside the chest sleeps **Grandma Flapjack** (+ an old recipe book). The real treasure = family; shared pancakes; Season 9 hook.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | The lock looked like a pan handle! | close-up on the lock, then on the pan in Truffle's hands |
| 2 | BO | Truffle, the Golden Pan! | Bo points |
| 3 | TRUF | Here you go! One golden key! | Truffle inserts the pan handle |
| 4 | NAR | Click! The chest creaked open. | light beam, dust, sparkles (soft, no strobe) |
| 5 | NAR | Inside, a tiny pancake was napping! | Grandma Flapjack asleep (shawl, glasses) |
| 6 | FLAP | Grandma? Is that you? | Flapjack's big eyes, heart |
| 7 | GRAN | Who woke me? Is it Sunday? | Grandma stretches |
| 8 | MOCHI | Hmph. The treasure is family. Obviously. | Mochi's rare soft smile |
| 9 | TRUF | Pancakes for everybody! | Truffle + Grandma's recipe book |
| 10 | EVERY | Happy pancake treasure day! | group cheer, confetti |
| 11 | NAR | And that was the end of Season eight! | dusk beach, fireworks, end card |

New: Grandma Flapjack (rig variant), recipe book prop. **Decision for the user:** is Grandma a new voice (needs approval of the voice audition) or should the treasure be something else (e.g. "a never-ending jar of sprinkles")?

### Alternate Season-8 pitches (pick one instead if the treasure hunt isn't it)
1. **"Camp Pancake"** — the gang camps by the lake (campfire + night helpers exist from S6): ep36 Pitching the Tents (Gumdrop's tent), ep37 The Campfire Song (Boo's glow-in-the-dark "ghost story" that is actually a joke), ep38 The Midnight Snack (Rocky + Coco raid), ep39 The Lost Marshmallow (Mochi's detective mode, callback to S5), ep40 The Shooting Star (Blip/Zap build a wish rocket; Munch's giant wave from far). New guest: **Kiki the Koala** (sleepy camper).
2. **"Pancake School"** — Truffle opens a cooking school with **Hootie the Owl** as professor (riddles, quizzes), lessons about sharing, flipping, measuring (Zap), "first day jitters" (Boo). Great for parent-friendly learning beats. New guest: Hootie.
3. **"The Moon Pancake"** — Blip and Zap's rocket to the moon (callback to ep11); gravity gags (Bo bounces, Gumdrop floats), moon-craters = pancakes, Munch's gray moon snack, a tiny moon baby; new guest: **Dex the Dino** as moon-rock enthusiast. Reuses the spaceship interior + night/glow work.

## A2. Season 9 & 10 pitches (one-liners — develop only after S8)
- **S9 "Flapjack's Family Reunion"** (direct sequel): Grandma Flapjack's picnic, 3 pancake cousins (the cousins from ep10's cake!), a lost recipe, a family-photo finale; end card S10.
- **S10 "The Great Snow Day"**: the syrup freezes → icicle waffles; Waddles the Penguin guest (new rig), sledding with kart helpers, Pebble's first snow, Mochi hates cold; Munch makes a snow-gray castle.
- **S11 "The Pancake Olympics"**: Tora (tiger) + Hugo (hippo) + Quackers guests; reuses race tooling and the "everybody wins" arc.
- **Standalone specials (30–60 s):** "Bo's Bedtime" lullaby; "Rocky's Snack Diary"; "Mochi's Obviously Compilation" (all her lines).

## A3. Cheap content that needs NO new animation (use the existing art and episodes)
- **29 × 5 s "Meet the character" Shorts** from the `*_CARD.png` posters + catchphrase voice (Kokoro line + a pop).
- **"Guess the next friend" teasers:** the last 2 s of an episode + a "WHO IS KNOCKING?" chip.
- **Season recaps** (20 s per season) cut from existing finals with a Kokoro narrator.
- **Catchphrase compilations:** "Hmph. … Obviously." (Mochi), "Just one tiny bite!" (Bo), "Nobody saw anything." (Rocky).
- **Covers/thumbnails:** one full frame, no text (already the delivery convention); add a text-free square crop for Instagram.

## A4. Guest-character plan (each = new rig = extra cost)
| Priority | Character | Where | Why |
|---|---|---|---|
| 1 | Hootie the Owl | S8-alt "Pancake School", riddles in ep38 | riddle/quiz voice, parent appeal |
| 2 | Tora the Tiger | S11 Olympics / any race rematch | already "Race you there!" |
| 3 | Kiki the Koala | Camp Pancake | sleepy gag |
| 4 | Waddles the Penguin | S10 snow | slipping gags |
| 5 | Biscuit the Dog / Clover the Bunny | any ensemble | cute, big audience appeal |
Rig effort: reuse `tintGum`-style re-tint of an existing body when the silhouette is similar; otherwise a new SVG rig with `svgOrigin:'0 0'`.

---

# PART B — KIDDOVERSE EPISODE BRIEFS (Learn series)

All briefs follow the Learn template (`05_KIDDOVERSE_BIBLE.md` §7.2, playbook §2). Default structure ≈ 5–6 min: intro 9 s → theme 18 s → story/hook 18 s → **N teaching stops of ≈ 27 s** → recap 18 s → brain break 16 s → game 3 × 9 s → theme ×2 (key up) 36 s → outro 13 s. Lyric rule: 5–8 syllables per line, key word on the longest note, 3 objects per item, an echo and a question with a pause.

## B0. Finish LEARN #2 "The Color Train" — see playbook §6.

## B1. LEARN #3 "The Shape Workshop" (Gizmo leads; world: Robot Workshop; Zoom is the delivery truck)
- **Learning goal:** recognise and name 8 shapes. **Items:** circle, square, triangle, rectangle, oval, star, heart, diamond.
- **Story hook (replaces "the rainbow's gray"):** "Oh no! Gizmo's shape machine got mixed up! The shapes are all jumbled!" → the crew sorts them on a conveyor belt, stop by stop.
- **Per-stop objects (3 each):** circle — wheel, clock, cookie · square — window, box, cracker · triangle — roof, pizza slice, sail · rectangle — door, book, flag · oval — egg, mirror, leaf · star — sea star, night-sky star, gold-star sticker · heart — balloon, card, cookie · diamond — kite, gem, road sign.
- **Stop verse template (same tune each time):** "Beep boop, shape stop! Here's *circle*! Circle, circle, round and round! Wheels are round, clocks are round, cookies are round. What shape is it? *Circle!*" (colour/shape word = longest note.)
- **Finale:** "Build a house" — roof triangle + square walls + rectangle door + circle window + star on the chimney, assembled shape by shape on the sung words; Rumble stomps the "finish" thump.
- **Game (3 rounds):** "Where is the triangle?", "Which one is a heart?", "Find the circle!" (silhouette choices, countdown pause 3.75 s).
- **Brain break:** "Shape yoga" — make a circle with your arms, a triangle with your hands, a star with your whole body, FREEZE.
- **Tune:** keep 108 BPM and the Color Train structure so the same engine/storyboard generator can be reused; shift key per shape like colour stops (+2/+4).
- **Titles:** "Learn Shapes for Toddlers | The Shape Workshop | Songs for Kids | KiddoVerse".

## B2. LEARN #4 "Animals & Their Sounds" (world: Animal Parade / Farm Meadow + Ocean Deep; Rumble's roar is the bonus)
- **Items:** cow *moo*, dog *woof*, cat *meow*, duck *quack*, pig *oink*, sheep *baa*, horse *neigh*, lion *roar*.
- **Hook:** "Zoom's horn is broken! Which animal makes the BEEP? Let's ask the animals!" Each animal gives its sound; the game asks "Who says moo?"
- **Audio risk:** animal sounds must be **synthesised** in `sfx.py` (new SFX functions) or sung/chanted by Kokoro ("moo" as a vowel note); never use recordings with unknown licence.
- **Art risk:** 8 new animal props (flat vector, 3 poses each) → budget the art; reuse Dino Valley/Rainbow Hills worlds.

## B3. LEARN #5 "Gizmo's Counting Machine" — numbers 11–20, then counting by 2s, 5s, 10s
- **Structure:** Gizmo's machine eats objects and shows the number on his chest display; each 11–20 stop adds ten frames (rows of 5) so kids see "ten and some more"; "count by 2s" = socks in pairs, "by 5s" = fingers on a hand, "by 10s" = ten-frame trains.
- **Game:** "Which number comes after 14?" / "How many stars?"

## B4. LEARN #6 "Three-Letter Words" (cat, dog, sun, hat, pig, bus, cup, red, big, run)
- **Method:** "sound it out": c-a-t → cat, letters slide together (as in the two-letter words), picture + action; chanted by Kokoro (not sung).
- **Recap line:** "We can read cat, dog, sun…!" Game: "Which word says *sun*?"

## B5. LEARN #7 "Days, Months & Seasons — Zoom's Calendar Trip"
7 days (one stop each), then 12 months in four season groups; weather props with Nimbus.

## B6. LEARN #8 "Feelings & Manners with Nimbus" (please, thank you, sorry, hello, sharing)
Feelings are weather: happy (gold), sad (blue), scared (lilac), angry (red rain-cloud, safe), calm breathing; manners as little scenes with Bloop making mistakes and apologising.

## B7. LEARN #9 "My Body & Five Senses" · LEARN #10 "Opposites" (big/small, up/down, hot/cold, fast/slow, happy/sad, open/closed) · LEARN #11 "Daily Routines" (wash hands, brush teeth, bedtime — original lyrics only).

## B8. Shorts from every Learn episode (the "one song, twelve assets" rule)
Hook 20 s (theme chorus), the best 30–60 s teaching stop, the game round as a 20 s quiz, the brain break 16 s, and a "Where's Bloop?" hidden-character 15 s teaser. Post pace suggestion: 1 Learn + 2–4 Shorts per week (untested).

## B9. Lyric-writing template (for the agent to fill)
```
SECTION  <kind>  bars=<n>   key=<C/D/F>   BPM=<108|120>
LINE  "<text 5-8 syllables>"   notes: <melody contour>   key word: <word> (longest note)
OBJECTS on the beat:  word -> object (e.g. "apples" -> 3 apples pop in, one per eighth-note)
ECHO:  "<word>!"  (kids' choir)
QUESTION: "What <thing> is it?"  [pause 1 bar]  ANSWER: "<word>!"
```



==================================================================================================
# FILE: 09_APPENDIX_ALL_VOICE_LINES.md
==================================================================================================
# 09 — APPENDIX · every voice line of Bo and the Pancake (ep1–35)

Auto-extracted from `hyperframes/toonN/tts.py` (`LINES`) and the ep1/ep2 `script.txt` on 2026-10-13. Speaker `NARR` = narrator (`af_heart`). Ep2's lines 7–9 are the cast catchphrases (Rocky, Flapjack, Barnaby). Use this to match tone, length and gag placement. Source of truth is always the `tts.py` of each episode.

## Ep1 — Bo and the Pancake  (Season 1) — 6 lines, 72 words

 1. **NARR**: Would you eat the last pancake? Bo the fox did!
 2. **NARR**: It was warm, golden, and absolutely perfect. Bo only wanted one tiny bite.
 3. **NARR**: But the pancake had other plans. It jumped off the plate, and ran!
 4. **NARR**: Bo chased it over the table, through the kitchen, and straight into the fridge!
 5. **NARR**: Finally, Bo opened wide... but the pancake whispered, please don't!
 6. **NARR**: So Bo ate cereal instead. Now, would you eat the last pancake?

## Ep2 — Knock, Knock!  (Season 1) — 9 lines, 73 words

 1. **NARR**: Remember the pancake Bo almost ate? Meet Flapjack, his new best friend!
 2. **NARR**: Every morning, they share breakfast. Cereal for Bo, and a syrup bath for Flapjack.
 3. **NARR**: But someone sneaky was watching!
 4. **NARR**: Rocky grabbed Flapjack, and ran! Bo chased him all around the kitchen!
 5. **NARR**: But Rocky was only hungry. So Bo shared his cereal with his new friend!
 6. **NARR**: Then... knock, knock!
 7. **ROCKY**: Nobody saw anything.
 8. **FLAPJACK**: Catch me if you can!
 9. **BARNABY**: Is it snack time yet?

## Ep3 — Honey Trouble  (Season 1) — 11 lines, 63 words

 1. **NARR**: Knock, knock! It was Barnaby the bear, and he brought honey!
 2. **NARR**: Splash! He tossed the jar right into Flapjack's bath!
 3. **BO**: Just one tiny bite!
 4. **NARR**: But the sweet smell called the bees!
 5. **NARR**: They chased everyone around the kitchen!
 6. **NARR**: Rocky tossed the jar outside, and the bees followed!
 7. **BARNABY**: Is it snack time yet?
 8. **FLAPJACK**: Catch me if you can!
 9. **ROCKY**: Nobody saw anything.
10. **NARR**: Then... squeak?
11. **NIBBLES**: Squeak! Cheese?

## Ep4 — Cheese Please  (Season 1) — 11 lines, 62 words

 1. **NARR**: Nibbles gobbled his last bite of cheese, and he wanted more!
 2. **NARR**: But Mochi the cat was napping right on the big cheese!
 3. **BO**: Operation Cheese is a go!
 4. **FLAPJACK**: Catch me if you can!
 5. **MOCHI**: Hmph. Obviously.
 6. **NARR**: Mochi chased the pancake round and round!
 7. **NARR**: And Nibbles tiptoed right to the cheese!
 8. **NIBBLES**: Squeak! Cheese!
 9. **NARR**: Cheese for everyone!
10. **NARR**: But then... sniff, sniff...
11. **TRUFFLE**: Needs a pinch more love!

## Ep5 — Pizza Party  (Season 1) — 10 lines, 59 words

 1. **NARR**: Truffle the pig squeezed through the window, ready to cook!
 2. **TRUFFLE**: Let's make a giant pizza!
 3. **NARR**: Sauce, cheese, and toppings... and he tasted every single one!
 4. **BO**: Just one tiny bite!
 5. **TRUFFLE**: Not yet! Needs a pinch more love!
 6. **NARR**: Into the oven it went... ding!
 7. **NARR**: Everyone got a slice, and it was delicious!
 8. **NARR**: But then... something swung by!
 9. **COCO**: Ooh-ooh, bananas!
10. **TRUFFLE**: My pizza!

## Ep6 — Monkey Business  (Season 1) — 11 lines, 51 words

 1. **NARR**: Coco the monkey swung onto the fridge, munching the pizza!
 2. **COCO**: Finders keepers!
 3. **BO**: Give it back!
 4. **NARR**: Bo jumped. Truffle jumped. Nobody could reach!
 5. **MOCHI**: Hmph. Banana peel. Obviously.
 6. **NARR**: So they set a slippery trap!
 7. **COCO**: Ooh-ooh, bananas!
 8. **NARR**: He leaped down... and slipped!
 9. **TRUFFLE**: Pizza saved!
10. **NARR**: But then... the fridge creaked open!
11. **GUMDROP**: Roar! ...Did that work?

## Ep7 — Gumdrop's Secret  (Season 1) — 11 lines, 50 words

 1. **NARR**: Out stepped Gumdrop. He was huge!
 2. **BO**: Monster! Run!
 3. **GUMDROP**: Wait! I'm only hungry!
 4. **NARR**: His tummy rumbled like thunder!
 5. **MOCHI**: Hmph. He's a softie. Obviously.
 6. **NARR**: So Truffle cooked a giant feast!
 7. **TRUFFLE**: Needs a pinch more love!
 8. **GUMDROP**: Yum! Thank you, friends!
 9. **NARR**: He had never had friends before.
10. **NARR**: But then... the lights went out!
11. **BOO**: B-boo?

## Ep8 — Boo's Glow Party  (Season 1) — 11 lines, 50 words

 1. **NARR**: The ghost was scared too!
 2. **BOO**: Hi... can I play too?
 3. **GUMDROP**: Roar! ...I mean, hello!
 4. **BO**: A glow party! Just one dance!
 5. **NARR**: Boo made the whole room glow!
 6. **NARR**: Everybody danced!
 7. **TRUFFLE**: Needs a pinch more disco!
 8. **MOCHI**: Hmph. Not bad. Obviously.
 9. **NARR**: Then... a strange light shone outside!
10. **BOO**: B-boo? What's that?
11. **BLIP**: Is this... a sandwich?

## Ep9 — Blip and Zap  (Season 1) — 11 lines, 57 words

 1. **NARR**: A tiny spaceship landed on the floor!
 2. **BLIP**: Greetings, Earth! Is this... a sandwich?
 3. **FLAPJACK**: Catch me if you can!
 4. **NARR**: Blip chased him all around the kitchen!
 5. **ZAP**: Beep boop! Processing fun!
 6. **MOCHI**: Hmph. Don't lose your head. Obviously.
 7. **ZAP**: Head not found. Beep.
 8. **NARR**: Then Blip's scanner went beep, beep, beep!
 9. **BLIP**: It is somebody's birthday!
10. **BO**: Wait... it's MY birthday?
11. **PEANUT**: I remember everything!

## Ep10 — Bo's Big Birthday  (Season 1) — 11 lines, 65 words

 1. **NARR**: Peanut squeezed through the window with a giant cake!
 2. **PEANUT**: Happy birthday, Bo! I remember everything!
 3. **BO**: You remembered my birthday!
 4. **NARR**: Everybody gathered around the big pancake cake.
 5. **TRUFFLE**: Needs a pinch more sprinkles!
 6. **NARR**: Boo made the candles glow!
 7. **BO**: I wish for... just one tiny bite!
 8. **FLAPJACK**: Hey! Those are my cousins!
 9. **NARR**: So they shared the cake with everyone.
10. **GUMDROP**: Roar! ...I mean, yummy!
11. **NARR**: It was the best birthday ever!

## Ep11 — Blast Off  (Season 2) — 11 lines, 57 words

 1. **NARR**: After the party, Blip had a surprise!
 2. **BLIP**: Come inside my spaceship!
 3. **BO**: Whoa! It's bigger on the inside!
 4. **ZAP**: Beep boop! Fasten your seatbelts!
 5. **NARR**: Three... two... one... blast off!
 6. **MOCHI**: Hmph. I'm not scared. Obviously.
 7. **GUMDROP**: Roar! ...Are we there yet?
 8. **NARR**: They zoomed past the moon and the stars!
 9. **COCO**: Ooh-ooh, bananas!
10. **NARR**: Then... a giant jelly planet appeared!
11. **BLIP**: Welcome to Planet Gloop!

## Ep12 — Planet Gloop  (Season 2) — 11 lines, 65 words

 1. **NARR**: They stepped out onto Planet Gloop!
 2. **BLIP**: Hello, my friends! Everything here is jelly!
 3. **BO**: Boing! I can jump so high!
 4. **NARR**: The little Gloopians had never seen a pancake!
 5. **GLOOPIANS**: Ooh! The Great Round One!
 6. **FLAPJACK**: Um... I'm just a pancake?
 7. **NARR**: They crowned him king of the jelly!
 8. **TRUFFLE**: Pancakes for everybody!
 9. **NARR**: But then... the ground began to wobble!
10. **KING**: Pancakes? Then you must stay forever!
11. **BO**: Uh-oh... just one tiny problem!

## Ep13 — Home Sweet Kitchen  (Season 2) — 11 lines, 63 words

 1. **NARR**: The Gloop King wanted pancakes forever!
 2. **TRUFFLE**: I have a plan! The biggest pancake ever!
 3. **NARR**: Everybody helped to cook it!
 4. **MOCHI**: Hmph. Needs more syrup. Obviously.
 5. **NARR**: It was the biggest pancake in the universe!
 6. **KING**: Yum! You may go home, friends!
 7. **NARR**: They waved goodbye and flew back to Earth.
 8. **BO**: Home sweet kitchen!
 9. **NARR**: But somebody had sneaked into Bo's scarf!
10. **GLOOPIAN**: Pancake, please?
11. **BO**: Okay... just one tiny bite!

## Ep14 — Jiggle Moves In  (Season 3) — 11 lines, 58 words

 1. **NARR**: Bo's new friend needed a name!
 2. **BO**: How about... Jiggle?
 3. **JIGGLE**: Jiggle! I love it!
 4. **NARR**: He bounced on the table, and up to the ceiling!
 5. **MOCHI**: Hmph. Stuck on the ceiling. Obviously.
 6. **NARR**: Then Rocky sneaked in for a snack!
 7. **ROCKY**: Nobody saw anything.
 8. **NARR**: But Jiggle was very, very sticky!
 9. **JIGGLE**: Hic! Hic! Uh-oh!
10. **NARR**: And then... pop! There were four!
11. **BO**: Which one is Jiggle?

## Ep15 — Four Jiggles  (Season 3) — 11 lines, 61 words

 1. **NARR**: Now there were four Jiggles!
 2. **JIGGLES**: I'm Jiggle! No, I'm Jiggle!
 3. **BO**: Zap, can you help?
 4. **ZAP**: Beep boop! Scanning all four Jiggles!
 5. **ZAP**: Each one is twenty-five percent Jiggle!
 6. **MOCHI**: Hmph. They are all Jiggle. Obviously.
 7. **NARR**: So Bo tried a sneaky pancake test!
 8. **BO**: Who wants a pancake?
 9. **NARR**: All four jumped at once... and squish!
10. **JIGGLE**: Hee hee! I'm back together!
11. **NARR**: Then the fridge went... knock, knock!

## Ep16 — The King's Visit  (Season 3) — 11 lines, 63 words

 1. **NARR**: Out of the fridge popped... the Gloop King!
 2. **KING**: Jiggle! Time to come home!
 3. **JIGGLE**: But I like it here...
 4. **BO**: Wait! Jiggle is our friend!
 5. **KING**: But I miss him. The palace is so quiet.
 6. **NARR**: So Truffle had a delicious idea!
 7. **TRUFFLE**: Come for pancakes every Sunday!
 8. **KING**: Pancakes every Sunday? Deal!
 9. **NARR**: Everybody hugged the King!
10. **BO**: Just one tiny bite... for everybody!
11. **NARR**: And that was only the beginning!

## Ep17 — The Message from Space  (Season 4) — 11 lines, 60 words

 1. **NARR**: Season four began with a beep from the spaceship!
 2. **ZAP**: Beep boop! Incoming message!
 3. **BLIP**: It's from my home planet!
 4. **COMMANDER**: Help! We ran out of pancakes!
 5. **BO**: Don't worry! We'll bring some!
 6. **NARR**: Truffle flipped the biggest stack ever!
 7. **TRUFFLE**: Order up! Fifty pancakes!
 8. **MOCHI**: Hmph. Don't drop them. Obviously.
 9. **NARR**: Everybody climbed aboard, and zoom!
10. **BLIP**: Next stop, Planet Zorp!
11. **NARR**: But somebody was hiding in the pancakes!

## Ep18 — The Gray Planet  (Season 4) — 11 lines, 57 words

 1. **NARR**: Rocky grinned from the pancake tower!
 2. **BO**: Rocky! You sneaky snack thief!
 3. **ROCKY**: Nobody saw anything.
 4. **BLIP**: We're landing on Planet Zorp!
 5. **NARR**: But Zorp was gray and very sad.
 6. **COMMANDER**: Pancakes! You really came!
 7. **NARR**: One tiny bite for every Zorpian!
 8. **ZORPIANS**: Yum yum yum!
 9. **NARR**: And color came back to the whole planet!
10. **COMMANDER**: Thank you, Bo!
11. **NARR**: But then the ground began to shake!

## Ep19 — The Gray Muncher  (Season 4) — 11 lines, 57 words

 1. **NARR**: A giant gray monster stomped over the hill!
 2. **MUNCH**: Who took my gray?
 3. **NARR**: Everybody hid behind Gumdrop!
 4. **GUMDROP**: Roar! ...I mean, hello?
 5. **MUNCH**: Sniff. I just love gray.
 6. **NARR**: Then Truffle had a crunchy idea!
 7. **TRUFFLE**: One extra crispy pancake!
 8. **MOCHI**: Hmph. It's burnt. Obviously.
 9. **MUNCH**: Crunchy gray! My favorite!
10. **BO**: He's not scary. He's just hungry!
11. **NARR**: And his rainbow burp lit the way home!

## Ep20 — Rainbow Road Home  (Season 4) — 11 lines, 60 words

 1. **NARR**: A rainbow stretched from Zorp to Earth!
 2. **BLIP**: That's the way home!
 3. **COMMANDER**: Come back soon, friends!
 4. **MUNCH**: Bye bye, little friends!
 5. **NARR**: So the saucer slid down the rainbow!
 6. **BO**: Wheeee!
 7. **NARR**: And landed in the kitchen at last!
 8. **KING**: It's Sunday! Pancakes for everybody!
 9. **NARR**: They shared the biggest feast ever.
10. **ROCKY**: Okay, I saw something. Pass the pancakes!
11. **NARR**: And that was the end of Season four!

## Ep21 — The Great Pancake Festival  (Season 5) — 11 lines, 64 words

 1. **NARR**: Today was the Great Pancake Festival!
 2. **KING**: Welcome, everybody! Let the games begin!
 3. **BO**: Wow! So many pancakes!
 4. **TRUFFLE**: Free samples! Get them while they're hot!
 5. **COCO**: Ooh-ooh, banana pancakes!
 6. **NARR**: Then Zap rolled out the Golden Spatula!
 7. **ZAP**: Beep boop! The prize for the best flipper!
 8. **MOCHI**: Hmph. It's shiny. Obviously.
 9. **NARR**: But suddenly, all the lights went out!
10. **BLIP**: Whoa! Who turned off the lights?
11. **NARR**: And the Golden Spatula was gone!

## Ep22 — The Missing Spatula  (Season 5) — 11 lines, 74 words

 1. **NARR**: Everybody gasped. The spatula was missing!
 2. **KING**: Find it, or no more pancakes ever!
 3. **MOCHI**: Hmph. I will take the case. Obviously.
 4. **BO**: I'll help! I can sniff out clues!
 5. **NARR**: They found sticky little footprints.
 6. **ZAP**: Beep boop! Tiny, round, and very sticky!
 7. **BO**: Tiny and round? It must be Jiggle!
 8. **NARR**: Four Jiggles popped out from behind the cake!
 9. **JIGGLES**: We just wanted to play with it!
10. **PEANUT**: Oops! I tied my balloons to it!
11. **NARR**: And up, up, away it floated!

## Ep23 — The Balloon Chase  (Season 5) — 11 lines, 58 words

 1. **NARR**: The golden spatula floated higher and higher!
 2. **BO**: We have to catch it!
 3. **ZAP**: Beep boop! Rocket boots, ready!
 4. **NARR**: Zap blasted off into the sky!
 5. **GUMDROP**: Roar! Here comes Bo!
 6. **BO**: Wheeee! I'm flying!
 7. **NARR**: Boo floated up to help, too!
 8. **BOO**: I... I'll help. Boo.
 9. **NARR**: Pop, pop, pop! The balloons burst!
10. **MOCHI**: Hmph. Somebody catch it. Obviously.
11. **NARR**: And it landed right in Bo's hands!

## Ep24 — The Great Flip-Off  (Season 5) — 11 lines, 59 words

 1. **NARR**: Now the Great Flip-Off could begin!
 2. **ZAP**: Beep boop! First up, Truffle!
 3. **TRUFFLE**: Watch me flip it high!
 4. **NARR**: The pancake flew up, up, up!
 5. **COCO**: Ooh-ooh! It hit the ceiling!
 6. **MOCHI**: Hmph. My turn. Obviously.
 7. **NARR**: Mochi's pancake spun like a spaceship!
 8. **BO**: Here goes. Just one tiny flip!
 9. **NARR**: But Bo flipped Flapjack, too!
10. **FLAPJACK**: Wheee! Catch me if you can!
11. **NARR**: Everybody got a perfect ten!

## Ep25 — Festival Finale  (Season 5) — 11 lines, 59 words

 1. **NARR**: Nobody could pick just one winner!
 2. **KING**: Then everybody wins the Golden Spatula!
 3. **NARR**: So they cooked one giant pancake together.
 4. **TRUFFLE**: Needs a pinch more love!
 5. **BO**: Just one tiny bite!
 6. **NARR**: Fireworks lit up the sky!
 7. **ZAP**: Beep boop! Three, two, one, boom!
 8. **JIGGLES**: Ooh, pretty colors!
 9. **NARR**: Even Munch waved from far away.
10. **EVERYBODY**: Happy Pancake Festival!
11. **NARR**: And that was the end of Season five!

## Ep26 — The Big Gray Egg  (Season 6) — 11 lines, 61 words

 1. **NARR**: The next morning, a giant egg appeared!
 2. **BO**: Wow! What is it?
 3. **MOCHI**: Hmph. An egg. Obviously.
 4. **ZAP**: Beep boop! Warm and wiggling!
 5. **COCO**: Ooh-ooh! A giant banana?
 6. **NARR**: Then they found a tiny note.
 7. **TRUFFLE**: Please keep my egg warm. Love, Munch.
 8. **BO**: Munch trusts us! Let's help!
 9. **NARR**: So they tucked it in nice and warm.
10. **BLIP**: Whoa! It wiggled again!
11. **NARR**: And inside, something went tap, tap, tap!

## Ep27 — Keep It Warm  (Season 6) — 11 lines, 61 words

 1. **NARR**: Everybody wanted to keep the egg warm!
 2. **TRUFFLE**: I'll toast it! Hot, hot, hot!
 3. **MOCHI**: Hmph. Too hot. Obviously.
 4. **ZAP**: Beep boop! Thirty-seven degrees. Perfect!
 5. **GUMDROP**: Roar! I'll give it a cuddle!
 6. **NARR**: But the egg wiggled and rolled away!
 7. **COCO**: Ooh-ooh! Stop that egg!
 8. **NARR**: Down, down, down the hill it rolled!
 9. **BO**: I'll catch it!
10. **BOO**: I... I'll help. Boo.
11. **NARR**: And together, they caught it just in time!

## Ep28 — Crack  (Season 6) — 11 lines, 48 words

 1. **NARR**: That night, the egg began to glow!
 2. **JIGGLES**: It's cracking! It's cracking!
 3. **MOCHI**: Hmph. Stand back. Obviously.
 4. **NARR**: Crack, crack, CRACK!
 5. **BO**: It's a baby Munch!
 6. **BABY**: Bo! Bo!
 7. **BO**: Look! He knows my name!
 8. **TRUFFLE**: He must be hungry! Pancakes!
 9. **NARR**: The baby took one tiny bite...
10. **BABY**: Yum, yum, yummy!
11. **NARR**: ...and turned pink and sparkly!

## Ep29 — Pebble's Big Day  (Season 6) — 11 lines, 56 words

 1. **NARR**: They named the baby Pebble!
 2. **PEBBLE**: Pebble! Pebble!
 3. **PEANUT**: Oops! He's so tiny!
 4. **NARR**: Pebble loved playing hide and seek!
 5. **BO**: Ready or not, here I come!
 6. **NARR**: But Pebble crawled away, all alone.
 7. **BLIP**: Where did he go?
 8. **ZAP**: Beep boop! Scanning... pancake pile!
 9. **NARR**: Pebble was fast asleep in the pancakes!
10. **MOCHI**: Hmph. Found him. Obviously.
11. **NARR**: But then the ground began to shake!

## Ep30 — Happy Hatching Day  (Season 6) — 11 lines, 52 words

 1. **NARR**: Thump, thump! Munch was back!
 2. **MUNCH**: Pebble! My little Pebble!
 3. **PEBBLE**: Papa! Papa!
 4. **NARR**: Pebble gave Bo one last hug.
 5. **BO**: Goodbye, Pebble! We'll miss you!
 6. **MUNCH**: Thank you, my tiny friends.
 7. **GUMDROP**: Roar! Party time!
 8. **NARR**: Big friends and little friends danced!
 9. **ZAP**: Beep boop! Best party ever!
10. **EVERYBODY**: Happy hatching day!
11. **NARR**: And that was the end of Season six!

## Ep31 — The Great Pancake Race  (Season 7) — 11 lines, 56 words

 1. **NARR**: The King announced the Great Pancake Race!
 2. **KING**: The winner gets the golden pan!
 3. **ZAP**: Beep boop! Everybody gets a kart!
 4. **BO**: Wow! Mine is orange!
 5. **MOCHI**: Hmph. Mine is faster. Obviously.
 6. **TRUFFLE**: Mine runs on pancakes!
 7. **NARR**: Little Pebble wanted to race, too!
 8. **PEBBLE**: Me too! Me too!
 9. **NARR**: So Bo made room for him.
10. **ZAP**: Three, two, one... go!
11. **NARR**: And they zoomed away!

## Ep32 — The Syrup River  (Season 7) — 11 lines, 57 words

 1. **NARR**: The racers zoomed down the hill!
 2. **BO**: Wheee! Faster, faster!
 3. **MOCHI**: Hmph. Out of my way. Obviously.
 4. **NARR**: But a river of syrup blocked the road!
 5. **TRUFFLE**: Oops! I spilled my syrup!
 6. **NARR**: Everybody slid and spun around!
 7. **ZAP**: Beep boop! Rocket boost!
 8. **NARR**: Zap blasted right over it!
 9. **COCO**: Ooh-ooh! I am stuck!
10. **BO**: Hold on! We'll push you!
11. **NARR**: Bo and Pebble pushed Coco out!

## Ep33 — Flat Tire  (Season 7) — 11 lines, 49 words

 1. **NARR**: Mochi was winning the race!
 2. **MOCHI**: Nobody can catch me. Obviously.
 3. **NARR**: Then her wheel went pop!
 4. **MOCHI**: Meow! My wheel!
 5. **BO**: Stop! Mochi needs help!
 6. **NARR**: Bo skidded to a stop.
 7. **TRUFFLE**: Use a pancake wheel!
 8. **NARR**: Pebble rolled a pancake over!
 9. **ZAP**: Beep boop! Wheel fixed!
10. **MOCHI**: Hmph. Thank you. Obviously.
11. **NARR**: Now they all raced together!

## Ep34 — The Dark Tunnel  (Season 7) — 11 lines, 51 words

 1. **NARR**: The road went into a dark tunnel!
 2. **COCO**: Ooh-ooh! I cannot see!
 3. **TRUFFLE**: I want to go home!
 4. **NARR**: Then Pebble began to sparkle!
 5. **PEBBLE**: Sparkle! Sparkle!
 6. **NARR**: His pink light showed the way!
 7. **BOO**: I'll float ahead. Boo.
 8. **NARR**: Boo found the way out!
 9. **ZAP**: Beep boop! Exit ahead!
10. **EVERYBODY**: Hooray for Pebble!
11. **NARR**: They burst out into the sunshine!

## Ep35 — Photo Finish  (Season 7) — 11 lines, 52 words

 1. **NARR**: The finish line was just ahead!
 2. **MOCHI**: Hmph. I will win. Obviously.
 3. **BO**: No, I will win!
 4. **ZAP**: Beep boop! Maximum speed!
 5. **NARR**: Closer and closer they zoomed!
 6. **NARR**: And they crossed together!
 7. **KING**: A tie! Everybody wins!
 8. **MUNCH**: Share the golden pan!
 9. **NARR**: Munch made giant pancakes in it!
10. **EVERYBODY**: Yummy pancakes!
11. **NARR**: And that was the end of Season seven!

<!-- episodes without extracted lines: [] -->

