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
| `10_SEASON8_9_AND_LESSONS.md` | **Seasons 8 and 9 are BUILT** (ep36-45), the TikTok 576x1024 delivery format, the new QA tools (preflight/selcheck/timings) and the rules learned | read after the playbook |
| `09_APPENDIX_ALL_VOICE_LINES.md` | Every voice line of every Bo episode (auto-extracted from the `tts.py` files) | reference |
| `ALL_IN_ONE_PASTE.md` | All of the above in one file for chat tools without file access | paste |

Also installed for you: `.cursor/rules/studio-core.mdc`, `bo-and-pancake.mdc`, `kiddoverse.mdc`.

---

## 3. Current state (verified 2026-10-13, ~15:10)

**Bo and the Pancake**
- Episodes 1–30 are rendered, levelled (≈ -14.2 LUFS) and delivered in `C:\Users\softenic\Desktop\Content Creation\Videos\` (video + COVER png each).
- **Season 7 (ep31–35 "The Great Pancake Race") is fully BUILT (index.html + audio recipe + voice lines) but NOT rendered or delivered.** The render queue (`hyperframes\run_queue_s7.ps1`) ran at 14:43 today and **ep31 FAILED with "FFmpeg cannot start"**; ep32's render died at 58 %. No render process is running now. FFmpeg itself works again (`ffmpeg -version` OK), so the fix is simply to re-launch the queue (see `03_BO_PRODUCTION_PLAYBOOK.md` §9). Nothing else is broken that I could find.
- Seasons 8 and 9 (ep36-45) exist now (see `10_SEASON8_9_AND_LESSONS.md`); the next creative step is **Season 10** (pitch in `08_NEXT_STORYLINES.md`).

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
