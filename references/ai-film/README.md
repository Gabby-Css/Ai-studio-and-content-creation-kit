# 🎬 AI-FILM — the pipeline home

**Use this pipeline when the deliverable is generated cinematic footage:** narrative films, shot
sequences, characters, locations, trailers, anything where the *image itself* is generated.

For graphics over/replacing real footage (talking-head edits, kinetic type, data animation) use
**`../MOTION-GRAPHICS/`** instead. Shared assets and Higgsfield; different doctrine.

---

## Read in this order

| # | file | what it gives you |
|---|---|---|
| 1 | skill **`film-director`** | The 4-D pass (DECONSTRUCT → DIAGNOSE → DEVELOP → DELIVER) that turns a rough thought into a production-ready prompt **with a decision log** |
| 2 | `film-director/asset-pipeline.md` | Folder + canvas structure, the **two-model routine** (Soul Cinema raw → GPT Image 2 edit), and **naming/tagging** so prompts auto-match your inputs |
| 3 | `film-director/locations.md` | The **five locks** — geography, blocking anchor, light logic, materials, depth/continuity. Plus the 3/4 default and the reverse test |
| 4 | `film-director/character-sheets.md` | The four moves, the Seedance-proof rules, the three slop sheets, and the production template |
| 5 | `film-director/scene-generation.md` ← **where the film is actually made** | Settings (21:9 / 4K / 15s / **4 batches**), the critique vocabulary, and the five pro techniques: draw the geometry, sub-location-as-asset, reverse-angle env refs, second sheet for a state change, mid-production asset swaps |
| 6 | `../../digital-products/ai-video-studio-kit/pipeline/cookbooks/ai-film-full-workflow.md` | Phases 0–5, script → locked film |
| 7 | skill **`higgsfield-generate`** + `reference_higgsfield_mcp_generation.md` | The actual call, presets, upload quirks |

---

## The four stages

**SCRIPT → ASSETS → SCENE GENERATION → EDIT.**

**Stage 1 · SCRIPT.** Never ask for a script. Ask for your *idea to be expanded*, and answer the
questions that come back — runtime, settings, plot twists. Build it in passes. Nothing good comes
out of one lazy request; that holds at every stage of this pipeline.

**Stage 2 · ASSETS.** Folder per scene, subfolder per asset type, one canvas for locked finals.
Soul Cinema for the raw variety pass (8 images ≈ 1 credit), GPT Image 2 for edits and the clean
final sheet. **Name every asset and register it as a Higgsfield element under the exact same name**
— prompts then auto-match inputs by tag.

**Stage 3 · SCENE GENERATION.** 21:9, 4K, 15s, **four batches every time**. Batching is not
insurance, it is the edit — the finished shot is routinely assembled from pieces of different
batches. Then: *run it, look at it, ask for the exact changes, run it again.*

**Stage 4 · EDIT.** Mark which piece of which batch ships. You are selecting, not approving.

---

## The order that makes or breaks it

**LOCATION → CHARACTER → SHOT.** Never the reverse.

1. **LOCATION FIRST.** Every shot inherits its geography, light logic, and materials. A location
   is a *production contract*, not a pretty frame: actors can be blocked in it, the light has one
   logic, the camera sees depth, and a later view repeats the same geography.
2. **CHARACTER SHEET SECOND.** Seedance reads the sheet **literally** — every flaw in it becomes a
   flaw in every shot. Generate → inspect → **edit masked onto the original** (never regenerate
   whole) → test on a good location. The test is the finish line, not the generation.
3. **SHOTS LAST**, against a locked location and a tested sheet.

---

## Model choice — by evidence, never by ranking

Name the shot's ONE must-preserve requirement, pick the model that PROVES it, and accept only
failures you can rerun or mask.

| candidate | when it wins | what rules it out |
|---|---|---|
| **Soul Cinema** | film texture, atmosphere, human realism from scratch — first choice for characters | can't attach multiple refs or edit a finished image; exact composition takes runs |
| **GPT Image 2** | readable text, prop geometry, reverse angles, reference-guided edits, **creatures** | oversharpens human skin; lighting-variant resilience untested |
| **Nano Banana Pro** | landing a bold edit on a finished image | tints the whole image — **mask only the changed region**; never generate a location or hero from zero with it |
| **Seedream 4.5** | preserving skin/clothing texture through an edit; also generates characters | can shift pose/angle; may preserve texture yet miss the requested change |
| **Kling 3.0 Turbo** | fast text-to-video, abstract plates, single start-frame animation | no reference stack |
| **Seedance 2.0** | reference-driven identity, multi-shot consistency, 4K | needs a clean sheet or it inherits its flaws |

**If the roster changes, re-run the evidence test on the shot — never carry today's ranking forward.**

---

## The local gate (do not bypass casually)
```
node pipeline/generators/generate-shot-pack.cjs --concept="..." [--frames|--pic] [--engine=...]
```
loads the skills + reference playbooks and writes `memory/video-pipeline-token.json`, opening
generation for 30 min. Escape hatch `touch memory/video-gate.pause` (60-min TTL) skips the
playbooks and the prompt quality drops — use it only when the shot-pack itself fails, and say so.

**Never re-run `generate_video` for an already-paid shot.** Regeneration is a fresh charge.

---

## Assets
`../assets/library/` (fonts, icons, logos, emoji-3d) · `../assets/motion/` (~1030 overlay SVGs for
finishing passes) · `../assets/hf-plates/` (generated abstract plates) ·
`../arsenal/references/` · `../assets/motion/video references/` (source videos + mined studies).

## Verification (the part that is usually skipped)
- **Inspect at the intended crop.** Locations: atmosphere, material texture, anchor objects.
  Characters: identity, skin, pose, gradients.
- **An after-only sheet proves nothing** — there is no source to compare against. Compare before
  claiming an edit succeeded.
- **Two silent killers:** oversharpened oily surfaces (swim and smear the moment anything moves)
  and missing atmospheric haze (near and far read at one distance — flat, instantly slop).
