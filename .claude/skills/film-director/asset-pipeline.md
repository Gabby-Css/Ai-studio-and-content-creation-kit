# The asset pipeline — build once, tag once, never hunt again

Source: a 39-minute production breakdown of a 4K Seedance short (~400 generations across four
settings), transcribed 2026-07-20. This file covers everything between "the script is done" and
"start generating shots."

---

## Structure before generation

Set this up **before** the first asset, not after:

```
project/                      ← Higgsfield Cinema Studio → new project
  scene-01/
    characters/
    locations/
    props/
  scene-02/
    ...
```

> Two weeks and 400 generations later, you'll be glad you did this.

Plus **one canvas as the workspace** — every *final* asset pinned to a single board so the whole
cast is in view and nothing gets lost. Locked assets go to the canvas; everything else stays in the
folders. The canvas is the answer to "which version did we agree on?"

---

## The two-model routine (this is the actual asset method)

Not one model per asset — **two models per asset, in a fixed order**:

| pass | model | job |
|---|---|---|
| **RAW** | **Soul Cinema** | simple prompt, a few batches, **lots of variety** — you are shopping for a direction. 8 images ≈ 1 credit, so this pass is nearly free |
| **EDIT + FINAL** | **GPT Image 2** | land specific changes on the chosen image and produce the clean final sheet. Best model for photorealistic sheets *when you already have a reference* |

Worked example — the enemy ship:
1. Soul Cinema, plain prompt: *"a pirate ship on water, front and back three-quarter views."*
2. Pick two from the spread — the big one becomes the enemy ship.
3. Hand the image over and ask for an **edit prompt** with the specific changes: open the sails
   (down sails make the ship look parked), turn them black (dangerous energy), add a skull logo in
   our colours.
4. Run the edit prompt in GPT Image 2. Lock it. Canvas.

**Every prop goes through this same loop.** More takes on the table always means better odds of
landing the shot you want.

---

## Naming and tagging — the boring step that pays the most

This is the step people skip, and it is the one that keeps a 400-generation project coherent.

1. **Name every asset.** Real names, not `sheet_final_v3`.
2. **Introduce each asset to the model by that name** when you brief it.
3. **Add it to Higgsfield as an element with the exact same name.**

Then during scene generation the prompts **auto-match your inputs by tag** — the right sheet lands on
the right slot, and nothing gets mixed up. Names that disagree between the brief and the elements
library are the failure mode; the whole benefit is in the *exactness*.

---

## What "aiming high" on a location means

> Locations carry the whole film. If the setting looks cheap, every shot inside it does too — and no
> amount of prompting fixes that later.

Target: **a set that could pass for an actual movie set.** In practice that means naming furniture,
a light source, a wall element, and how daylight enters — e.g. a captain's cabin with a table, a
single hanging lantern, a map on the wall, and thin rays of daylight leaking through the planks.

Judging the batch is a skill of its own. Real rejections from the session:
- *"the lighting feels off — it looks like there are two lamps now, and you can barely see the map"*
- *"the table got shoved into the corner and the map ended up on the side of the wall"*

The keeper had **two named light sources** (the lantern, and thin daylight rays) and the **anchor
object dead centre and readable**. Small details like visible light rays are what make a generation
feel real — and they pay off again at scene-generation time.

See `locations.md` for the five locks and the 3/4-angle default.

---

## Character sheets — the one rule that breaks films

**One face per sheet.** A sheet with a face on the full-body panel *and* a close-up looks fine to
you, and is fatal to the model: it doesn't know which face to grab, so it drifts a little every
scene — and by scene five the hero is a stranger.

**Fix:** erase the face from the full-body panel. Keep exactly one close-up as the face lock; the
full body is there for height and costume.

Also: **grey background, always.** Measured much higher win rate — zero background clutter means
more usable generations. See `character-sheets.md` for the full production template.

---

## When to stop making assets

When the cast board is complete: hero sheets, every location, every named prop, plus **a few
variations held in reserve** for the assets most likely to read wrong (animals, crowds, anything
whose style could come back cartoonish). Then go to `scene-generation.md`.

The assets are not the fun part. They are the part that decides whether the fun part converges.
