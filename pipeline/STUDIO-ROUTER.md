# Studio router — choose tools for the brief

This is a decision guide, not an autonomous scheduler. Combine only the tools the brief needs and that the recipient has configured. Commands and paths below are relative to the extracted kit root.

## Routing table

| Request | Tool or guide | Important boundary |
|---|---|---|
| Photoreal shot prompts | `pipeline/generators/generate-shot-pack.cjs` | Authors prompts; hosted image/video execution is separate |
| Recurring character | Same helper with `--character` | Build reference consistency, then inspect each output |
| First/last-frame planning | Same helper with `--frames` | Keyframes can guide motion; results are not guaranteed |
| Image/asset prompts | Same helper with `--pic` | Check provider configuration, costs, and rights |
| Abstract 3D background | `motion/html3d-render.cjs` | Local render after dependency setup |
| Kinetic type, captions, data | `pipeline/generators/remotion/README.md` | Separate project dependencies and licensing |
| Cinematic editor scene | `pipeline/UNREAL-SETUP.md` | Editor and compatible bridge are external |
| Narration | `voice/VOXCPM-GUIDE.md` | Own recording, configured local runtime, or hosted provider |
| Long-form footage | `longform/docs/README.md` | Own/licensed source media |
| Short clips | `clipper/README.md` | Review selection, tracking, transcript, and timing |
| Plan review | `pipeline/generators/slideshow-risk.cjs` | Deterministic heuristic, not validated retention prediction |
| Finished-cut review | `pipeline/generators/qa-attention-gate.cjs` | Supply candidate weak timestamps; optional model analysis |
| Generation diagnosis | `pipeline/generators/diagnose-generation.cjs` | Suggestions require verification |
| Assets | `assets/arsenal-README.md` | Verify each source/license and download deliberately |

## Learn, author, review

1. Study an authorized transcript with `pipeline/generators/build-video-skills.cjs` or `transcribe/learn-from-transcript.cjs`.
2. Review proposed rules before relying on them. More notes do not automatically improve a model or every workflow.
3. Author a shot pack or build a local composition using the relevant skills.
4. Review the plan and render, identify weak moments, revise, and compare.
5. Keep evidence-supported lessons and discard contradicted ones. These files do not train model weights.

`pipeline/generators/llm.cjs` uses recipient configuration. Supported authoring helpers can export prompts when no model is configured; consult each tool's usage. A configured hosted model receives the submitted text and may charge. Rendering and external applications have their own requirements.

## Cooperation patterns

- **Narrated explainer:** authorized narration → transcription review → Remotion text/data → optional HTML motion → assembly.
- **Cinematic story:** character/location plan → configured generation or editor → diagnose candidates → assemble approved shots.
- **Footage edit:** scan owned footage → script/edit plan → overlays/captions → full playback review.
- **Learning experiment:** reviewed reference rule → one controlled change → compare exports and, where available, actual audience results.

Optional research scoring is separately installed and licensed. The QA helper does not run bundled TRIBE weights, and its suggestions do not prove an audience response. No lane is universally free, private, configured, or higher-performing by default.

Start at `pipeline/00-START-HERE.md`. Follow `pipeline/STUDIO.md` for production and `LICENSES.md` for package boundaries.
