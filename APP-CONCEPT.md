# Studio — app concept and roadmap

This document describes a proposed one-window interface. It is not a shipped desktop app, an installed analyser, or a promise that a launcher/installer is included. The current delivery is the source toolkit described in `README.md`.

## Proposed interface

A future app could let a user select owned/licensed footage, choose a motion template, add narration, edit captions, review the result, and export a video. Each operation would show its prerequisites and obtain confirmation before downloads, provider calls, or file replacement.

| Proposed action | Required implementation and limits |
|---|---|
| Review | Timeline playback, frame inspection, and user-selected weak moments; optional research scores must be labeled experimental |
| Add motion | Connect included compositions to preview/render jobs after dependencies are configured |
| Voice | User recording or explicitly selected local/hosted provider, with data-use and cost disclosure |
| Caption | Transcription plus an editor for correcting words and timing |
| Export | Validated render settings, progress, cancellation, output paths, and playback checks |

## Design principles to evaluate

1. Make dependencies and missing configuration visible; do not silently install models or accept licenses.
2. Show whether each operation is local or sends data to a provider. A local browser UI alone does not establish privacy.
3. Ask before potentially billable operations and expose the selected provider. Do not promise a zero-cost workflow.
4. Allow offline input preparation where supported; report network/model requirements separately.
5. Ship examples only when source and redistribution rights are documented. Third-party reference media are omitted from the current delivery.
6. Keep failures actionable, with logs and recovery options; do not claim every error can be self-healed.

## Roadmap, not installed status

- Design and implement the app shell and job orchestration.
- Integrate dependency checks, configuration, permission prompts, and provider/data-use disclosure.
- Add preview, caption correction, export, and cancellation interfaces.
- Test supported operating systems and a representative hardware/dependency matrix.
- Obtain necessary application/model licenses and cleared sample media.
- Verify a fresh recipient installation and document remaining limitations.

The code, workflows, and templates can inform this work, but no end-to-end app, automatic scorer download, installed voice environment, setup duration, or performance result is certified by this concept. See `LICENSES.md` and `pipeline/00-START-HERE.md` for the current package boundaries.
