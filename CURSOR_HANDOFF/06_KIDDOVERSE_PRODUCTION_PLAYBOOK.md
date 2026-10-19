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
