# HyperFrames update — September 2026

This optional lane adds **HeyGen HyperFrames 0.8.40** with **GSAP 3.13.0** and an original four-second silent starter. It is distinct from the older HTML/Three.js renderer in the kit's motion folder. Existing workflows remain available.

## Install and run

Requires Node.js **22.12.0 or newer**, npm, a compatible Chrome browser and ffmpeg. Installation downloads dependencies; rendering uses your machine's CPU, memory and disk. Performance varies. Start in this folder (from the kit root: `cd hyperframes`).

```bash
npm ci
npm run doctor
npm test
npm run lint
npm run preview
npm run render
```

The first install needs internet. If doctor reports a missing browser, inspect `node node_modules/hyperframes/bin/hyperframes.mjs browser --help` and follow the pinned CLI's browser-install instructions. Install ffmpeg separately if missing. Doctor is a dependency report, not a guarantee of a completed render.

The wrapper copies the installed GSAP script into the starter's vendor directory before running the CLI. The composition uses no remote fonts, media or CDN scripts. Native HyperFrames can have telemetry/network behavior; inspect its `telemetry --help` command and upstream policy. Optional cloud, publishing, generation, speech and provider features are not invoked by this wrapper and may have separate downloads, terms, accounts and costs.

Render writes output/starter.mp4 and refuses an existing filename. For a revision:

```bash
node run.cjs render output/starter-r2.mp4
```

## Author your edit

Edit starter/index.html: replace the text, colors and layout; set composition dimensions/duration; author a paused GSAP timeline registered at `window.__timelines.main`. Initial states use gsap.set. Keep animations deterministic and seekable. Use your own licensed media and check the pinned upstream documentation before adding timed video or audio.

This is an authored composition workflow, not an automatic script-to-finished-video service. The starter is silent; it does not generate narration, captions, editing decisions, music or a final mix. Add those deliberately and review the result. Private workspace orchestration, agent accounts, reference footage and internal Studio lifecycle commands are not part of this pack.

Do not paste legacy window.__seek compositions into this engine without porting them. Render those with the existing legacy renderer or adapt and test their timeline intentionally.

## Verify before delivery

```bash
ffprobe -v error -show_streams -show_format output/starter.mp4
ffmpeg -v error -i output/starter.mp4 -f null -
```

Watch the actual MP4. Check first/middle/last frames, title clipping, contrast, timing, and output dimensions. For your own audiovisual edits, listen to the entire export and verify speech, captions and synchronization. A passing lint/decode is not creative review or proof of improved retention.

## Versions and rights

The lockfile pins installation; use npm ci. Do not silently switch to latest during a project. Runtime packages are downloaded at install time, not bundled in this ZIP. HyperFrames declares Apache-2.0; GSAP uses its own Standard License, not the kit's MIT license. Preserve their notices and inspect terms for your intended use. See the kit's LICENSES.md.

Sources: [HeyGen HyperFrames](https://github.com/heygen-com/hyperframes), [GSAP license](https://gsap.com/community/standard-license/).
