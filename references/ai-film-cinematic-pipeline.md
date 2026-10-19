# 🎬 AI-Film — the cinematic-footage pipeline

**Use this pipeline when the deliverable is generated cinematic footage:** narrative films, shot sequences,
characters, locations, trailers — anything where the *image itself* is generated. (For graphics over or
replacing real footage — talking-head edits, kinetic type, data animation — use the motion-graphics reference
systems instead. Shared assets, different doctrine.)

---

## The four stages

**SCRIPT → ASSETS → SCENE GENERATION → EDIT.**

**Stage 1 · SCRIPT.** Never ask for a finished script in one shot. Ask for your *idea to be expanded*, and
answer the questions that come back — runtime, settings, plot twists. Build it in passes. Nothing good comes
out of one lazy request; that holds at every stage of this pipeline.

**Stage 2 · ASSETS.** One folder per scene, a subfolder per asset type, one canvas for locked finals. Use a
variety-pass model for the raw exploration (many cheap images), and an edit-capable model for clean finals.
**Name every asset and register it under the exact same name** as a reusable reference element — your prompts
then auto-match inputs by tag.

**Stage 3 · SCENE GENERATION.** Wide aspect (e.g. 21:9), 4K, ~15s, **four batches every time**. Batching is
not insurance, it is the edit — the finished shot is routinely assembled from pieces of different batches.
Then: *run it, look at it, ask for the exact changes, run it again.*

**Stage 4 · EDIT.** Mark which piece of which batch ships. You are selecting, not approving.

---

## The order that makes or breaks it

**LOCATION → CHARACTER → SHOT.** Never the reverse.

1. **LOCATION FIRST.** Every shot inherits its geography, light logic, and materials. A location is a
   *production contract*, not a pretty frame: actors can be blocked in it, the light has one logic, the camera
   sees depth, and a later view repeats the same geography. Lock five things — geography, blocking anchor,
   light logic, materials, depth/continuity.
2. **CHARACTER SHEET SECOND.** Image and video models read the sheet **literally** — every flaw in it becomes
   a flaw in every shot. Generate → inspect → **edit masked onto the original** (never regenerate the whole
   image) → test on a good location. The test is the finish line, not the generation.
3. **SHOTS LAST**, against a locked location and a tested sheet.

---

## Model choice — by evidence, never by ranking

Name the shot's ONE must-preserve requirement, pick the model that PROVES it, and accept only failures you can
rerun or mask. Model names change constantly; treat this as a *way to choose*, not a fixed roster.

| candidate role | when it wins | what rules it out |
|---|---|---|
| **Cinematic-realism generator** | film texture, atmosphere, human realism from scratch — first choice for characters | often can't attach multiple refs or edit a finished image; exact composition takes runs |
| **Precise image editor** | readable text, prop geometry, reverse angles, reference-guided edits, creatures | can oversharpen human skin; lighting-variant resilience varies |
| **Bold single-edit model** | landing one bold edit on a finished image | tends to tint the whole image — **mask only the changed region**; don't generate a location or hero from zero with it |
| **Texture-preserving editor** | preserving skin/clothing texture through an edit; also generates characters | can shift pose/angle; may preserve texture yet miss the requested change |
| **Fast text-to-video** | fast abstract plates, single start-frame animation | usually no reference stack |
| **Reference-driven video** | reference-driven identity, multi-shot consistency, 4K | needs a clean sheet or it inherits its flaws |

**If the roster changes, re-run the evidence test on the shot — never carry today's ranking forward.**

**Never re-run a paid video generation for an already-paid shot.** Regeneration is a fresh charge — select
from what you already rendered first.

---

## Verification (the part that is usually skipped)
- **Inspect at the intended crop.** Locations: atmosphere, material texture, anchor objects. Characters:
  identity, skin, pose, gradients.
- **An after-only sheet proves nothing** — there is no source to compare against. Compare *before* claiming an
  edit succeeded.
- **Two silent killers:** oversharpened oily surfaces (they swim and smear the moment anything moves) and
  missing atmospheric haze (near and far read at one distance — flat, instantly reads as "AI slop"). Add haze;
  soften the sharpening.
