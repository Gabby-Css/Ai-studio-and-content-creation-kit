# Video production stack — package map

Start with `pipeline/00-START-HERE.md`. This map describes included source locations and external prerequisites, not the status of the recipient's machine.

## Visuals, audio, and assembly

| Role | Package entry | Setup boundary |
|---|---|---|
| HTML/Three.js motion | `motion/html3d-render.cjs` and `motion/compositions/` | Requires browser dependencies and ffmpeg |
| React video | `pipeline/generators/remotion/` | Install its dependencies and review applicable Remotion terms |
| Long-form assembly | `longform/bin/` | Input footage, ffmpeg, and workflow-specific dependencies |
| Short-form clipper | `clipper/` | Media tools and optional configured model |
| Hosted narration | `voice/gen-vo.cjs`, `voice/gen-story-vo.cjs` | Recipient ElevenLabs account/voice; submits text and may charge |
| Optional local narration | `voice/VOXCPM-GUIDE.md` | External VoxCPM runtime/weights; not installed or bundled |
| Transcription | `transcribe/whisper-transcribe.py` | Recipient Python/Whisper/model setup; review estimated timing |
| Resolve editing | `resolve/README.md` | Separately installed editor, scripting support, and Python |
| Unreal scene control | `pipeline/UNREAL-SETUP.md` | External editor/plugin/bridge, compatible build tools, and assets |

## Authoring and review

`pipeline/generators/generate-shot-pack.cjs` uses craft notes to prepare prompts. Related tools digest transcripts and suggest generation fixes. They use `pipeline/generators/llm.cjs` with the recipient's configuration, or a supported prompt-export mode; a hosted call can send content externally and cost money.

`pipeline/generators/slideshow-risk.cjs` evaluates a plan with heuristics. `pipeline/generators/qa-attention-gate.cjs` supports manually selected review timestamps and optional model suggestions. Neither proves actual viewer retention.

Research-model weights, upstream runtimes, analyser apps, and third-party connectors are not automatically installed. If separately chosen, review their terms, configuration, network behavior, and cost. Do not infer live connectivity, hardware acceleration, supported tools, or performance from historical examples.

## Inputs and outputs

- Supply owned/licensed footage in `longform/inbox/` or another chosen folder.
- Third-party reference footage, reference thumbnails, and reference plates are omitted; see `references/ADD-YOUR-OWN-LICENSED-MEDIA.md`.
- Read written craft material under `references/` and `pipeline/playbooks/`.
- Use `assets/arsenal-README.md` to inspect source catalogs; verify individual rights before downloading or reusing files.
- Working output locations include `output/` and tool-specific folders documented by each CLI.

The proposed one-window application is a roadmap in `APP-CONCEPT.md`, not an installed service. No recurring automation, publishing permission, free-use entitlement, or blanket licensing clearance is included. Follow `pipeline/STUDIO.md` and preserve `LICENSES.md`.
