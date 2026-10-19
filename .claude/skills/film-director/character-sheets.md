# Character sheets — the reference Seedance reads literally

A character lives or dies on its sheet. **Seedance reads it literally, so every flaw in the sheet
becomes a flaw in every shot.** A stray rim light, a mismatched face, or plastic skin here bleeds
into everything downstream.

## The pipeline — four moves, always this order

1. **GENERATE** — moodboard and description first, then ONE production prompt packing every
   angle into a single generation.
2. **INSPECT** — audit the sheet before anything downstream touches it.
3. **EDIT MASKED ONTO THE ORIGINAL** — fix flaws with masks composited onto the original sheet.
   **Never regenerate the whole thing** — drift and grime pile up with every re-generation.
4. **TEST IN SEEDANCE** on a good location. **The test is the finish line, not the generation.**

## Which model for which role

| model | role |
|---|---|
| **Soul Cinema** | first choice for GENERATING characters |
| **Seedream 4.5** | also generates — run in parallel |
| **AI Cast (Cinema Studio)** | strong casting tool, worth exploring |
| **Nano Banana Pro** | EDITING a finished sheet only — never generating one |
| **GPT Image 2** | creatures + one precise addition on top of an existing character. On human skin it goes oversharp and slops — it is the creature model, not the human model |

---

## The rules that make a sheet Seedance-proof

- **Angle the portrait.** Slightly off-frontal beats dead-on — it reads the head's volume
  instantly. Or add a smaller separate 3/4 portrait.
- **Eyes are never black.** Iris colour must read clearly; crushed-black eyes give Seedance no
  light info and tones drift between generations.
- **Catchlight, or dead eyes.** There is always a glint, exactly as in a real photoshoot.
- **Break the symmetry.** Real faces are symmetric but never perfect. Perfect mirroring reads
  as AI.
- **No 3D-game-render look.** Seedance recognizes the game-model mood and will animate the
  character like game footage.
- **Deep neutral grey background (`#3a3a3c`).** White bleeds into the video and washes out the
  location; black eats detail. Grey is the golden middle.
- **Crop the head off the full-body panels.** On a full-length panel the face always distorts and
  drifts from the portrait. Remove it and Seedance is forced to take face texture from the
  portrait panel, where the pixels and the precision actually are.
- **The portrait must dominate** — roughly 25–30% of the frame.

---

## The three slop sheets — what to reject on sight

**The dirty sheet.** A mottled, grimy plate (from repeated whole-sheet re-generations layering
grime into the background, which Seedance treats as part of the asset) PLUS a full-body face
that doesn't match the portrait, giving Seedance two competing identities. → Mask repairs onto
the original, then audit again.

**The game render.** Plastic game-model textures + an orange rim light baked into the sheet
(which bleeds into every downstream generation) + a portrait strip far under 25–30%, so Seedance
lacks facial evidence and invents it differently shot to shot. → Becomes identity drift, orange
edges, and game-like motion.

**Standard Nano-Banana slop.** Mirror-symmetric face + soapy poreless skin (read as identity
texture and reproduced as plastic in every scene) + six near-equal tiles with no authoritative
portrait. → The same synthetic, drifting character recurs in every shot.

---

## The production template

Two things NEVER change: the **deep neutral grey background** and the **split into columns with a
dominant portrait**. Columns may be added when the character needs them. Everything in the
CHARACTER block is rewritten per character.

```
Character reference sheet of a single consistent female character, presented
on a pure clean deep neutral grey (#3a3a3c) seamless studio background, clean
editorial layout arranged in three vertical sections, horizontal landscape
composition read left to right, identical character identity, lighting and color
grading across every panel for perfect consistency:

— COLUMN 1 (largest, leftmost): chest-up portrait, front view, head and upper
chest in frame, sharp focus on the eyes, soft catchlights in both eyes.

— COLUMN 2: full-body front view, standing relaxed neutral A-pose, arms slightly
away from the body, weight evenly distributed, full figure head-to-toe inside
the frame with even margins.

— COLUMN 3 (rightmost): full-body back view, same standing pose mirrored,
showing hair fall, back posture, garment fit and shoe heels.

CHARACTER (must remain identical in all panels): woman, mid-20s, height ~175cm,
elegant proportions, oval face, sharp high cheekbones, defined but soft jawline,
straight nose, full natural lips, light scattered freckles across the nose and
cheeks, clear fair skin with realistic natural texture and subtle imperfections,
grey-green eyes with detailed iris, well-groomed natural brows, straight auburn
hair with a center part falling just past the shoulders with a soft natural
sheen, neutral calm relaxed expression.

LIGHTING & RENDER: clean soft even studio lighting, large diffused key light
with gentle fill, soft natural shadows, no harsh highlights, true-to-life skin
tones, neutral white balance, minimal high-fashion editorial presentation,
polished modern professional model sheet aesthetic, shot on full-frame camera
with an 85mm lens look, shallow yet controlled depth of field, crisp tack-sharp
detail, high dynamic range, 8k.
```

**Ask Claude for the prompt rather than hand-writing it** — it knows the shape; your job is
approving the decision log, not assembling the sentence.

## The audit that outranks the generation
An after-only sheet cannot prove identity, pose, or proportion were preserved — there is nothing
to compare against. **Compare with the source before claiming an edit succeeded.**
