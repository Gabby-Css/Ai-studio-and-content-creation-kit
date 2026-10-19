---
description: "VIDEO PROMPT ARCHITECT — the prompting layer of the video studio. Turns any brief into an engine-matched, structured prompt + beat-by-beat shotlist BEFORE a frame renders. Borrows Higgsfield's cinema vocabulary + viral-preset grammar and vidIQ scoring as ADVISORY intelligence; our $0 engines (Hyperframes/Remotion/Unreal) still render. 'add skills to help prompting.'"
---

# /video-prompt — the Video Studio's prompt architect

The video studio routes engines (`/video`, `pipeline/STACK.md` + `STUDIO.md`) but had **no dedicated prompting step**. This is it.
Sits **after** engine routing (`node lib/video-pipeline.cjs plan "<request>"`) and **before** the engine's render step — turning a brief
into a precise, engine-shaped prompt + shotlist so the first render already lands instead of being guessed.

> **Higgsfield is ADVISORY only here, never the renderer.** It stays dropped as a generation engine ([[animation-cycle]]); we borrow its
> cinema model vocabulary, its viral-preset shot grammar, and (on explicit ask) `models_explore`/`presets_show`/`virality_predictor` as a
> *thinking aid* to shape prompts for our own $0 engines. No `generate_video`/credit spend from this skill.

## Run

1. **Brief → engine.** Confirm topic · AI-niche angle · length · format (9:16/16:9/1:1) · narrated? · vibe · reference(s). Get the engine
   from `lib/video-pipeline.cjs plan` (Hyperframes = abstract/3D MG · Remotion = text/caption/data · Unreal = photoreal depth, when live).
2. **Build the STRUCTURED PROMPT** (every field, in this order — vague prompts render flat):
   - **Subject** — what reads on screen (must READ as AI: neural nets, signal flow, data, model internals — [[project-video-studio-pipeline]]).
   - **Style / genre** — borrow Higgsfield's cinema genres: `epic · noir · drama · spectacle · suspense · intimate · action`.
   - **Camera & lens** — move (orbit / push-in / crane / handheld / locked-off) + lens (anamorphic, 35mm, telephoto) + DoF/focal hierarchy.
   - **Motion & easing** — custom easing (never linear/default-spring); speed-ramp grammar: `slowmo · speedup · impact`.
   - **Lighting** — direction, key/rim, volumetrics/fog.
   - **Palette** — ≤2 accents on a deep base.
   - **Post stack** — controlled bloom + film grain + vignette + (subtle) chromatic aberration. NOT full-frame gblur (washes flat — [[animation-cycle]]).
   - **Detail density** — MANY small SHARP glowing elements layered in DEPTH, not a few big soft blobs (the 2026-06-24 lesson).
3. **Beat-by-beat shotlist** — 3–5 beats, each: duration · the one idea · camera · the visual event. If narrated, snap beats to the VO spine.
4. **VIRAL SHOT GRAMMAR** (mined from Higgsfield presets — re-skin for AI-niche, build in OUR engine):
   - **CGI Breakdown** → neural-net *mesh → beauty pass*, each render layer cuts in, turntable, ends on the polished visual.
   - **3D Render orbit** → camera orbits a hyper-detailed model (use a dense neural volume), fast zooms, rotating lights.
   - **Android Assemble** → parts/nodes fly in and snap onto a core piece-by-piece, camera lands on the final frame.
   - **Earth zoom in/out** → data-point → global scale (one weight → the whole network).
   - **Disintegration / Free Fall** → dissolve or reassemble for transitions between concepts.
5. **OPTIONAL advisory pass** (only when it raises quality and is allowed):
   - `models_explore(action:'recommend', query, input)` — sanity-check the intended look against how a SOTA model would frame it; lift its
     camera/genre wording into the prompt. (Read-only; no generation.)
   - `presets_show` — pull a proven viral shot pattern to emulate.
   - Hook/title strength: `vidiq_score_title` / `vidiq_generate_titles` (5 credits/call) + Higgsfield `virality_predictor` — advisory only.
   - **Gate:** external research/scrape is night-only ([[no-daytime-harvest]]); Higgsfield calls are credit-aware (read-only `recommend`/`presets_show`
     are effectively free; `virality_predictor` may cost — only on explicit ask). If a layer is unavailable, say so — don't bluff ([[buyers-eye-verification]]).
6. **OUTPUT — the engine-ready prompt block:**
   - **Hyperframes** → composition brief: shapes/shaders, motion timeline, camera path, palette, post — to author `motion/compositions/<name>.html`.
   - **Remotion** → scene spec: text beats, per-word timing, brand layer, transitions.
   - **Unreal** → scene + Sequencer brief: geometry/materials, lighting, camera moves, MRQ settings.
   Then hand straight to the engine's render step in `STUDIO.md`, and **viewer-seat QA** the first still before the full render.

## Why this exists
A great engine with a vague prompt renders flat. This skill front-loads the craft (cinema language + viral grammar + detail principles)
so every render starts from intent, and uses Higgsfield/vidIQ as a *brain*, not a *bill*. Related: [[video-expertise]], [[render-frame-and-look-verify]].
