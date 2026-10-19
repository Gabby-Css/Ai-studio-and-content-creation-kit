---
name: film-director
description: >
  Turn a rough visual thought into a production-ready prompt for AI image/video models, and
  choose the MODEL by evidence rather than reputation. Use when writing any Higgsfield /
  Kling / Seedance / Veo / Soul / GPT-Image / Nano-Banana prompt, when a generation came back
  wrong and needs a diagnosed rewrite, or when deciding which model a shot should go to.
  Produces a decision log so every prop, light, lens, and camera move traces to a resolved
  ambiguity. Pair with `animation-director` for the motion slots and `higgsfield-generate` for
  the actual CLI/API call.
---

# Film Director — the 4-D pass for AI filmmaking

From your Leera method + model-evidence framework (2026-07-20).

---

## The six slots

**SUBJECT · ACTION · SETTING · LIGHT · CAMERA/FRAMING · CONSTRAINTS**
(video targets add **CAMERA MOTION** as its own decision — see `animation-director`.)

A rough line hints at slots without resolving them. "Hot summer day" says nothing about light
*direction* or shadow *shape* — and light direction is what makes a frame drawable.

---

## The 4-D pass

### 1. DECONSTRUCT
Quote the useful words. Map to the six slots. Mark each **explicit / implied / missing**.

### 2. DIAGNOSE
Audit for clarity gaps and physical incoherence:
- **One sun.** Shadows fall away from the stated source. Two light logics = slop.
- **Believable architecture** — doors, windows, and sightlines that could exist.
- **Interiors want soft sources.** Hard visible god-rays are the classic tell.
- **Name an anchor object** (a sofa, a doorway, a banner) so later shots can place characters
  against something fixed.
For every gap: ask, or label the default you propose. **Never silently add weather, props,
style, or camera movement.**

### 3. DEVELOP
Build only from approved decisions:
- One clear subject and action; the setting built around them.
- Explicit light, with a named direction and quality.
- A tonal palette with smooth falloff — no crushed shadows.
- Camera angle stated; **3/4 view is the declared default** when no angle is given (it reads
  depth where a flat-on view does not).
- Motion only for a video target.
- **Concrete nouns over quality words.** "weathered wood siding", never "beautiful".
- Constraints last, to protect continuity across shots.

### 4. DELIVER
One paragraph, English, then a **decision log**:
`source phrase or declared default → prompt decision → what it resolves`.
Then open questions, only if essential.

**Modes:** DETAIL (default, 2–3 questions first) · BASIC (no questions, minimum labelled defaults).
**Iteration rule:** rewrite the FULL prompt with the change applied — never a diff.

---

## Choosing the model — by evidence, not ranking

**There is no permanently best model.** Before every pass, name the shot's ONE must-preserve
requirement, then pick the model that PROVES it and leaves only failures you can afford to
rerun or repair with a mask.

| candidate | choose when the non-negotiable is | what could rule it out |
|---|---|---|
| **Soul Cinema** | film texture, atmosphere, material tactility, human realism from scratch | can't attach multiple refs or edit a finished image; exact composition takes several runs; weak on specific props/creatures |
| **GPT Image 2** | readable text, prop geometry, fine detail, reverse angles, reference-guided edits | lighting-variant resilience untested; macro detail unproven; occasional cross-view inconsistency |
| **Nano Banana Pro** | landing a bold wardrobe/face/object EDIT on a finished image | can tint the whole image and damage gradients — mask only the changed region; uncovered faces go symmetric and lifeless; weak from-scratch locations |
| **Seedream 4.5** | preserving skin/clothing TEXTURE through an edit | can shift pose or angle (needs mask-and-composite); may preserve texture yet miss part of the requested change |

**Inspect at the intended crop.** Locations: atmosphere, material texture, anchor objects.
Characters: identity, skin, pose, gradients.
**If the roster changes, re-run the evidence test on the shot — never carry a ranking forward.**
(This is the same discipline as the standing rule "verify current before applying": model
rosters go stale faster than notes about them.)

### After-only sheets prove less than they appear
A generated "after" view cannot prove identity, pose, or proportion were preserved — there is
nothing to compare against. **Compare with the source before claiming an edit succeeded.**

---

## Local pipeline gate
Higgsfield generation in this repo is gated: run
`node pipeline/generators/generate-shot-pack.cjs --concept="..." [--frames|--pic] [--engine=...]`
first — it loads the skills + reference playbooks and writes `memory/video-pipeline-token.json`,
opening the gate for 30 min. Escape hatch `touch memory/video-gate.pause` (60-min TTL) exists but
skips the playbooks, so the prompt quality drops; prefer the real path.

**Never re-run `generate_video` for an already-paid shot** — regeneration is a fresh charge.

---

## Related
`animation-director` (motion slots) · `higgsfield-generate` (the call) ·
`thumbnail-intelligence` (research → score → simulate → cull).
