---
description: Auto-edit a 16:9 YouTube long-form video — dissect (transcribe/watch), author an edit plan from the dropped components, render + verify the final MP4.
---

Long-form auto-edit bay. **First load BOTH doctrines — `longform/docs/README.md`
(folder contract, both JSON schemas) and `longform/docs/EDIT-MEGA-PROMPT.md`
(the edit grammar: punch-in rhythm, the motion layer, animation vocabulary and style system)
— plus `pipeline/MONTAGE-CRAFT.md`.** Run commands from the extracted kit root. Then:

1. **Resolve the input** — `$ARGUMENTS` is a video path or an existing work slug; otherwise take
   the newest video in `longform/inbox/`. Nothing there → ask you to drop one.
2. **Index the palette** — `node longform/bin/lf-scan.cjs` (always; drops may be new).
3. **Dissect** — `node longform/bin/lf-dissect.cjs "<video>"` **in the background** (whisper
   is the long pole). While it runs, fingerprint any new folders in `references/` with `--ref`.
4. **Watch and read** — `longform/work/<slug>/`: READ `transcript.json` (content beats, flubbed takes),
   `silence.json` (dead-air cut list), `scenes.json` (existing rhythm), `longform/components/00-INDEX.json`
   (the palette); vision-Read EVERY `frames/sheet_*.png`. This is the watch — do not plan blind.
5. **Download referenced visuals** — every product/platform/number he SAYS gets a visual: PNGs via
   the Wikimedia Commons API (mega-prompt §4) into `longform/components/graphics/web-*.png`; re-run `lf-scan`;
   LOOK at each tiled on gray.
6. **Author the MOTION LAYER** — `longform/work/<slug>/comps/motion-layer.html`: ONE full-length transparent
   HYBRID comp = a Three.js WebGL canvas (3D layer) behind absolutely-positioned DOM (2D layer), both
   driven by `window.__seek(t)` (mega-prompt §3; `lf-motion.cjs` vendors three + jsm addons and renders
   WebGL headless via ANGLE/SwiftShader). **Positioning LAW (§3a): every callout in the eye-view LOWER
   THIRD, center-weighted (y≈62–92%), NEVER top corners, always clear the face + mic/desk.** Maximal
   vocabulary (§3b): extruded 3D numbers (TextGeometry — use `depth:` NOT `height:` on three ≥0.163 or
   digits balloon into beams), gold coin bursts/showers with glow, platform tiles on a glowing connector
   arc, curl/particle swarms, odometers, mask reveals, glass banners. LOOK at a still per cue
   (`lf-motion.cjs --html <comp> --still <t> --stillout f.png`, composite over gray to check alpha),
   then render: `node longform/bin/lf-motion.cjs --html <comp> --out longform/components/overlays/<slug>-motion.mov
   --dur <outDur> --fps 30`; `lf-scan` after.
7. **Author the plan** — write `longform/work/<slug>/edit-plan.json` (schema in the doctrine; all times
   SOURCE seconds): PUNCH-INS on sentence boundaries (`keep[].zoom`, mega-prompt §2), the motion
   layer as one full-frame overlay, sfx on major entrances. Then
   `node longform/bin/lf-assemble.cjs <slug> --check` and fix every validation error.
8. **Draft** — `lf-assemble.cjs <slug> --draft` → `lf-verify.cjs <slug> --draft` → vision-Read every
   LOOK frame from the viewer's seat (callout ON its word? face uncovered? punch crops well? any
   static 8s+ stretch?). Amend and re-draft (stages cache; NOTE: asset-file changes don't bust the
   cache — force `--stage=composite` then `--stage=mux`). Never skip the draft.
9. **Final** — `lf-assemble.cjs <slug> --final` **in the background**, then
   `lf-verify.cjs <slug> --final`. Non-zero verify exit = do not ship; fix and re-render.
10. **Report** — what was cut, punch rhythm, which motion cues landed where, final duration, LUFS,
   and the output path `longform/output/<slug>-final.mp4`.
11. **Thumbnails (high-CTR)** — load `ctr/docs/THUMBNAIL-MEGA-PROMPT.md` (the click
    grammar: face+exaggerated-emotion, ≤3 elements, ≤3 words, specific numbers, extreme contrast,
    curiosity gap — from MrBeast + vidIQ outlier analysis). Author `longform/work/<slug>/thumbnails/concepts.json`
    (10 diverse directions), then `node longform/bin/lf-thumbs.cjs <slug>` (dry-run prints the
    exact Higgsfield commands + writes gen-plan.json). Face refs live in `brand/face/`.
    Generation is auth-gated: once `higgsfield auth login` is done, `lf-thumbs.cjs <slug> --run` trains
    a Soul + generates all 10; then upscale each to 4K (MCP `upscale_image`), score with vidIQ
    `vidiq_score_thumbnail`, rank, LOOK at the top 3 at 220px + full size, ship the winner.

Rules: components are USABLE only if indexed (`lf-scan` after every drop); `references/` never
renders. One grade over everything. TribeV2 scoring is advisory-only for long-form.

Input (optional video path or slug): $ARGUMENTS
