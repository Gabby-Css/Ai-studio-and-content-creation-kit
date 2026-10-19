# Scene generation — the loop that actually produces the film

Assets are the setup. **This** is the work. Source: a 39-minute production breakdown of a 4K
Seedance action short (four settings, ~400 generations), transcribed 2026-07-20.

The single most important sentence in the whole method:

> **Run it, look at it, ask for the exact changes, run it again.**

Not "write a better prompt." The prompt is a draft. The critique is the craft. Everything below is
either how to set up so the loop converges, or the vocabulary to critique with.

---

## Settings, locked

| setting | value | why |
|---|---|---|
| aspect | **21:9** | cinematic; the format does part of the work |
| resolution | **4K** | explosions stay sharp instead of turning to blurry slop. Visible on impact frames |
| duration | **15s** | long enough to hold a beat and its reaction |
| batches | **FOUR, always** | you are not generating a shot, you are generating *options* |

**Batching is not insurance — it is the edit.** The finished shot is routinely assembled from
different batches: opening from batch 1, the middle from batch 2, the reverse angle from batch 3.
Generate to have material to choose from, then cut.

---

## The critique vocabulary

When a generation is wrong, name the defect precisely and hand it back. Every one of these is a
real note that produced a fix:

| what you see | the note that fixes it |
|---|---|
| props merging into each other | "too much random stuff on the table — bottles, rags, ropes are merging. Reduce the clutter." |
| every beat drags | "the pacing is slow. The shot needs more dynamics." |
| light contradicts the story | "it looks like night behind the door, but this scene is daytime." |
| character just stares | "he should **react the second** he hears the line — start moving on the cue." |
| a shot that breaks the flow | "the third shot ruins the visual flow and doesn't belong. Delete it." |
| camera facing the wrong way | "flip it — the camera needs to look toward the bow." |
| a detail contradicts the event | "the deck is dry, but the ship is under fire. Make it wet and messy." |
| the action lands in a random place each run | draw it (see below) |
| it's boring | "make him run like he's clumsy" / "have the parrot talk" — comedy is a *direction*, not a hope |

**The pattern:** every good note is either a physical fact the model got wrong, or a specific
behaviour you want added. Never "make it better."

---

## The five pro techniques

### 1. Draw the geometry — don't describe it
When the spatial relationship matters (where the cannonball lands, where each character stands),
**draw it and hand over the picture.** One crude drawing tells the model what ten sentences can't.
This also saves credits directly: every failed batch you avoid is credits you keep.

### 2. A sub-location is its own location asset
The script needed an oasis; the desert location didn't have one. Treating the oasis as a **separate
location asset** — not as a phrase inside the desert prompt — locked the spot and the surrounding
landscape so it looked the same in every generation.

**Rule:** any place the camera returns to is an asset, at whatever scale. A corner of a room counts.

### 3. Reverse-angle environment references — mandatory for dialogue
Cutting between two people in a room, the background will jump between generations unless the model
has seen **both directions of that room**. Generate reverse-angle environment references and feed
them in. This gives the model a blueprint of the space instead of a single wall.

Also lock, explicitly, in the dialogue prompt:
- **the 180° rule** — camera static; her from the *same angle* on her lines; cut to him **over her
  left shoulder** on his. Break the axis and the audience loses who is standing where.
- **prop scale** — a hand-held device will change size between cuts unless you state its size.
- **prop state** — "the parrot sits *on top of* the cage, not inside it."

### 4. A state change needs a second character sheet
The jaguar rips his pants; a second later the pants are whole again. Prompting harder does not fix
this. **Generate a new character sheet showing the post-change state** (torn pants, boxers) and feed
*that* sheet for every shot after the change. The model can only hold a state it has been shown.

Generalises to: blood, dirt, a lost hat, a wet costume, a bandage.

### 5. Swapping an asset mid-production is normal
Mandrills read cartoonish — bright noses made the scene look animated. They were swapped for white
macaques and the scene worked. **Keep a few asset variations ready** for exactly this. Changing an
asset mid-film to avoid a plastic look or to make the action clearer is a normal move, not a failure.

---

## Shot-type rules learned by failing

- **POV must be ONE continuous shot.** A multi-shot POV request failed outright — asked to make the
  camera behave like an eye, the model pushed the spider *into* the eye. Restrict POV to a single
  continuous take: "the eye opens slowly like shutters, and we see the spider."
- **Keep the subject of a jump scare off-centre.** Dead-centre reads staged; off to the side reads
  natural.
- **Ask for multi-shot when the comedy is in the cuts.** The joke lives in the edit — say so.
- **Author the transition into the next scene.** Thick dust at the end of one scene buys a smooth cut
  into the next; a fall into water hands off to the next setting. Write the hand-off into the prompt
  of the *outgoing* shot.

---

## The script stage (this is where quality is actually decided)

Never ask for a script. **Ask for your idea to be expanded**, and answer the questions that come
back — runtime, settings, plot twists. Build it in passes.

> Nothing good comes out of one lazy request. The details are what make it work.

Same principle as the 4-D pass in `SKILL.md`: the interrogation *is* the method. A one-line request
produces a one-line-quality result at every stage of this pipeline — script, asset, and shot alike.

---

## Order of operations for one scene

1. Split the scene into shots (a prompt-builder skill does this well).
2. Upload **only the assets this shot needs** — plus one "extras" asset if the shot needs background
   people who match the world.
3. Generate 4 batches at 21:9 / 4K / 15s.
4. **Watch them.** Write specific notes from the table above.
5. Regenerate with the notes. Repeat until it holds.
6. **Mark which piece of which batch goes to the edit** — you are selecting, not just approving.

---

## Related
`SKILL.md` (the 4-D pass) · `asset-pipeline.md` (naming, tagging, the two-model routine) ·
`locations.md` (the five locks) · `character-sheets.md` (single-face rule, Seedance-proofing)
