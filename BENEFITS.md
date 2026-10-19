# What the AI Video Studio Kit is useful for

This source toolkit brings editing guidance, composition examples, and command-line helpers into one package. It is suited to creators and technical teams who want inspectable, adaptable workflows and are willing to configure dependencies.

## Practical strengths

- **Editable motion graphics:** HTML/Three.js and Remotion sources let you change layout, motion, colors, and data instead of treating a render as a sealed preset.
- **Connected production steps:** the clipper, transcription wrapper, long-form tools, and editor bridge can support a workflow built around your own input files.
- **Reusable craft guidance:** skill cards and playbooks offer starting points for planning, diagnosis, and review. Treat learned rules as hypotheses to test, not guaranteed improvements.
- **Choice of narration:** use your own recording, a separately installed local model, or a configured hosted voice provider.
- **Review aids:** plan heuristics and manually selected timestamps can help organize inspection. They do not measure actual audience retention or prove a video will perform.
- **Transparent source:** you can inspect scripts and their network/file operations before deciding which ones to run.

## What requires setup

| Capability | Recipient responsibility |
|---|---|
| Motion rendering | Install compatible Node/browser dependencies and ffmpeg; review asset and application terms |
| Remotion templates | Follow the separate project setup and applicable licensing |
| Transcription/captions | Install Whisper/model dependencies and manually review text and timing |
| Hosted voice or authoring | Supply your account/configuration; review submitted data and potential charges |
| Local voice | Install the external runtime and weights; verify hardware and voice rights |
| Resolve or Unreal | Install and configure the application and compatible integration |
| Optional research scoring | Obtain it separately under its own terms; interpret results cautiously |

## Important boundaries

The package is not an unlimited, all-local, zero-cost service. Local computation consumes hardware and storage; setup may download dependencies/models. Hosted providers receive submitted content and may charge. Privacy depends on the workflow you actually run.

The one-window app in `APP-CONCEPT.md` is a roadmap, not a delivered no-code launcher. Source editing and command-line setup may be required.

Third-party reference footage, thumbnails, and reference plates are omitted. Add owned or appropriately licensed assets and retain their provenance. No blanket commercial-use clearance is implied; see `LICENSES.md`.

Start with `README.md` and `pipeline/00-START-HERE.md`, configure one lane, and review a short sample before committing to a larger production.
