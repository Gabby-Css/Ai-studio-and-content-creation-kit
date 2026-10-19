---
description: "Plan a video using included generators, motion tools and Remotion; surface external setup and input requirements before execution."
---

# /video

Use the included planner to choose assets, assembly and delivery steps for the user's brief.
Run these commands from the extracted kit root. Planning does not generate or publish media.

When invoked with a video request (or before building/running ANY video tool):

```
node lib/video-pipeline.cjs plan "<the video request>"     # the unified plan (which assets → Remotion → distribute)
node lib/video-pipeline.cjs stack                           # the full stack + each tool's status
```

Then EXECUTE the plan in order:
1. **ASSETS** — use `pipeline/generators/generate-shot-pack.cjs` for shot prompts and `motion/html3d-render.cjs` for local motion compositions. `pipeline/bin/unreal.cjs` requires your separately installed Unreal editor and bridge. Supply your own footage or authorized avatar clips when the plan needs them.
2. **ASSEMBLE** — follow `pipeline/generators/remotion/README.md`, or `longform/docs/README.md` for a footage edit. Add the user's captions, CTA, logo and hook.
3. **DELIVER** — inspect the exported file, then publish manually through the user's chosen account when authorized. No social publishing account or automatic posting service is included.

Honesty (§0-PRE): if a layer is `needs-setup` / `needs-key` (e.g. UE editor not running), the plan SAYS so — surface it as a you action, never fake the missing step. Verify a real video by OPENING the rendered file (don't claim a render that didn't happen).

For the full craft workflow, read `pipeline/00-START-HERE.md` and `pipeline/STUDIO-ROUTER.md`.
