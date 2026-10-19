# 🎞️ MOTION-GRAPHICS — the pipeline home

**Use this pipeline when the deliverable is graphics over/replacing real footage:** talking-head
edits, longform motion layers, kinetic type, lower-thirds, callouts, data animation, explainers.

For *generated cinematic footage* (locations, characters, shots) use **`../AI-FILM/`** instead.
They share assets and Higgsfield; they do not share doctrine.

---

## Read in this order

| # | file | what it gives you |
|---|---|---|
| 1 | **`reference-library.md`** ← start here | Thirteen complete visual systems mined from real frames, with a **collision matrix**. Pick a row and build that world. |
| 2 | `../../digital-products/ai-video-studio-kit/pipeline/cookbooks/motion-graphics-full-workflow.md` | The five phases: lock the system → beat sheet → component sheet → motion spec → render → QA |
| 3 | skill **`motion-editor`** | Which technique serves this shot (2D-first creed) |
| 4 | skill **`animation-director`** | The 4-D pass that turns a rough thought into a motion spec with a decision log |
| 5 | `comps-lib/README.md` (in `../longform/`) | The five broadcast-grade laws (posterize, stagger-by-destination, stepped reveals, lens pass, one treatment) |

---

## The engines (all live, none need moving)

| engine | lives at | best for |
|---|---|---|
| **Hyperframes** | `../longform/comps-lib/*.html` → `longform/bin/lf-motion.cjs` | typographic + diagrammatic systems. DOM/CSS/SVG, `window.__seek(t)` contract |
| **Remotion** | `../longform/remotion/` | spring physics, 3D transforms, path morphing, real overshoot |
| **Higgsfield** | MCP (`generate_video`) | abstract plates no local renderer can make — **abstract motion only, never photoreal b-roll standing in for the subject** |

**Assembly** is shared: `lf-scan.cjs` → `lf-assemble.cjs <slug> --final --variant=<name>` →
verify by **measured ffprobe duration**.

---

## The assets (stop rebuilding what exists)

- **`../assets/motion/`** — ~1030 transparent procedural SVG overlays, 22 categories, 1920×1080.
  Arrows, bokeh, bursts, confetti, dust, flares, frames, glows, grain, gridfloor, halftone,
  lightleaks, rings, scanlines, shapes, sparkles, speedlines, streaks, swooshes, vignette.
  Inline them straight into a Hyperframes DOM or a Remotion layer. `INDEX.json` has the palette
  and per-category usage notes.
- **`../assets/library/fonts/`** — Inter, Space Mono (+bold), Bebas, Archivo, Oswald,
  Courier Prime (+bold), Playfair.
- **`../assets/library/`** — icons-line (32), logos-brands (24), logos-ai (22), emoji-3d (8).
- **`../assets/hf-plates/`** — generated abstract plates (ink, chrome, neon tunnel).
- **`../assets/motion/video references/`** — the source videos + the mined studies.

---

## The four rules that were learned expensively

1. **A variant is a SYSTEM, not a parameter.** Recolouring one scene library N times produces one
   edit N times. Split on **depth model and texture first**, colour last.
2. **~50% overlay / ~50% full-screen.** All-full-screen hides the presenter (measured: 1 face
   frame in 12); all-overlay never earns a visual moment. Half and half lets graphics run nearly
   continuously while the human stays on screen.
3. **The motion must match the sentence.** Scarcity → a field with a hole. Mechanism → a diagram
   that builds *and continues* on its second beat rather than restarting.
4. **LOOK AT IT, composited, as a contact sheet.** Every defect in the 2026-07 build was invisible
   until composited: unreadable body type, a whole line accidentally accented, a chart running
   backwards, three cuts truncated to 8s that the gate reported as PASS.

## The QA that outranks the render
Verdict by **measured duration**, never a gate's own PASS line — a verify step that cannot open
its input prints neither PASS nor FAIL and lets the previous item's result stand.
Count face frames on the sheet: that number is what shipped, not what you intended.

---

## Current work
`../longform/output/long-form-intro-a-iaedit/` — E-series (`e1-spec-sheet` …), nine distinct edits.
Superseded: v20–v38 (the recoloured-matrix generation, rated 3/10 — kept for reference, do not extend).
