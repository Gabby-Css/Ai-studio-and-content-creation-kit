# 🎞️ COOKBOOK — MOTION GRAPHICS: the full pipeline (transcript → nine distinct edits)

Sibling of `ai-film-full-workflow.md`. Same discipline, different medium. The AI-film pipeline
earns its quality by **locking a foundation once and testing it with evidence**; motion graphics
fails in exactly the same places, for exactly the same reasons, and the fixes translate.

**The translation table — read this first:**

| AI film | motion graphics | why it maps |
|---|---|---|
| **Location** | **VISUAL SYSTEM** — ground, palette, type, texture, depth model | every beat inherits it; get it wrong once and all 14 beats are wrong |
| **Blocking anchor** | **FIXED FRAME ELEMENT** — a rail, an eyebrow label, a corner slate that persists | gives every beat a testable position instead of "on the left" |
| **One sun / light logic** | **ONE GLOW MODEL** — either elements emit light or they don't | mixing emissive and flat is the MG version of two suns |
| **Materials, concrete nouns** | **NAMED TEXTURE** — "halftone dot tile, 6px pitch, 18% opacity" | "textured" gives the builder nothing to hold |
| **Atmospheric haze = depth** | **DEPTH TIERS** — scale + blur + opacity, assigned in bands | without tiers everything reads at one distance: flat, instantly slop |
| **3/4 default** | **OFF-AXIS DEFAULT** — never dead-centre, never perfectly symmetric | dead-centre flattens; symmetry reads as generated |
| **The reverse test** | **THE LATE-BEAT TEST** — does beat 12 still read as the same system as beat 2? | a system that drifts is not a system |
| **Character sheet** | **COMPONENT SHEET** — chip, node, bar, plate, badge, rendered once, authoritatively | every beat reads it literally; a flaw here bleeds into all of them |
| **Oversharpened / oily** | **LINEAR EASING + NO MOTION BLUR** | the single loudest amateur tell in each medium |

---

## PHASE 0 — LOCK THE FOUNDATION (once per edit, reused by every beat)

Resolve the **five locks** before authoring a single scene. If a later rewrite drops one,
restore it before rendering.

1. **GROUND** — the base plane. Near-black? Paper? Living gradient? Light/dark inversion?
2. **ACCENT** — how many, and where sampled from. **One accent beats three.** Sampling it from
   the footage's own practical light (a red lamp in his set → `#E8202A`) is the single cheapest
   way to make graphics feel native rather than pasted on.
3. **TYPE SYSTEM** — display face + label face. Two classes maximum. Name them; "a bold sans" is
   not a decision.
4. **TEXTURE** — named and measured, or explicitly ZERO. "Zero glow, zero texture" is a valid and
   powerful lock (it is what separates an analog-paper edit from every emissive one).
5. **DEPTH MODEL** — flat vector / floating slab with shadow / glassmorphic / perspective grid /
   bevel-and-bloom. **Pick one.** This is the lock most often left unresolved, and it is why
   edits look "the same but recoloured".

> **THE SAMENESS TRAP.** A variant produced by changing the palette of a fixed scene library is
> a *parameter sweep*, not an edit. Nine recoloured cuts read as one edit nine times. If two
> edits share a depth model AND a texture lock, they will collide no matter how different the
> hex codes are. Force the split on depth + texture first, colour last.

---

## PHASE 1 — THE BEAT SHEET (transcript-driven, never template-driven)

The transcript decides the technique, beat by beat. **The motion must match the sentence.**
- Scarcity → a field with a HOLE in it. The absence is the subject.
- Mechanism → a diagram that BUILDS, and that CONTINUES rather than restarting on its second beat.
- Scale → a counter, or a grid that overflows the frame.
- Claim → type that lands hard and holds long enough to read.

Assign each beat **OVERLAY** or **FULL-SCREEN** before designing it:
- **OVERLAY** — graphics live ON the footage: lower thirds, corner chips, side rails, callouts
  pointing at the speaker, word highlights, frame brackets, badges.
- **FULL-SCREEN** — graphics REPLACE the frame.

**Target roughly 50/50.** This is the whole density answer. An all-full-screen edit hides the
speaker (measured: a 90%-full-screen cut showed the presenter in 1 of 12 sampled frames); an
all-overlay edit never earns a visual moment. Half and half keeps graphics nearly continuous
*and* keeps the human on screen. Reference edits sit at 40–50% full-screen.

---

## PHASE 2 — THE COMPONENT SHEET (this is ~most of the final quality)

Exactly as a character sheet is generated once and then read literally, build each reusable
element ONCE, authoritatively:
- the chip / pill, the node card, the bar row, the headline plate, the badge, the connector.
- Fix its geometry, its stroke weight, its corner radius, its type scale, its entrance.

**Then never redraw it per beat.** Drift between beats is the MG equivalent of two competing
identities on a character sheet — the viewer cannot name it, but the edit stops feeling designed.

**Component-sheet slop tells (reject on sight):**
- The same element with two corner radii in one edit.
- Stroke weights that vary because they were typed by hand each time.
- Type that changes optical size between beats because it was sized in px against different boxes.

---

## PHASE 3 — MOTION SPEC (per beat, via `animation-director`)

Six slots, all resolved: **SUBJECT · ACTION · STAGING · TIMING · EASING · CONSTRAINTS.**
- ONE subject carries the beat; name what stays still.
- Stagger by **destination**, never by index or hash.
- Type lags its plate by ~2 comp-frames so it reads as printed, not painted.
- Name easings as curves: `outCubic`, `spring(damping 15, stiffness 110)`, `steps(12)`.
- **Motion blur wherever velocity is high** — its absence is why 2D reads cheap.
- **Continuity:** if a beat revisits an element, it CONTINUES that element's state. Restarting
  reads as the diagram running backwards. (Real defect, caught 2026-07-20, present in five
  shipped cuts before anyone sampled two frames close enough together to see it.)

---

## PHASE 4 — RENDER + COMPOSITE

- Hyperframes for typographic + diagrammatic systems (DOM/CSS/SVG, `window.__seek(t)` contract).
- Remotion for spring physics, 3D transforms, path morphing.
- Higgsfield for abstract plates no local renderer can make — **abstract motion only, never
  photoreal b-roll standing in for the subject.**
- Full-screen alpha layers are ~6 GB as qtrle (grain defeats RLE; ProRes buys only 1.4×).
  Render → assemble → **delete the intermediate**, per variant.

---

## PHASE 5 — QA (the test is the finish line, not the render)

**LOOK AT IT. Composited. As a contact sheet.** Every defect in the 2026-07-19/20 build was
invisible until composited and read as a sheet — the burn paragraph unreadable at frame scale,
a whole line accidentally accented, an org chart running backwards, three cuts truncated to 8s.

- **Verdict by measurement, never by a gate's own PASS line.** A verify step that cannot open its
  input may print nothing and let the previous item's result stand. Gate on measured duration.
- **Count face frames** on the sheet. That number is the density answer, and it is not what you
  intended — it is what shipped.
- **The late-beat test:** put beat 2 and beat 12 side by side. Same system, or drift?
- **A downscaled tile lies.** Judge colour and weight at full resolution.

---

## THE MINDSET (slop vs designed)

| slop | designed |
|---|---|
| fades | masks, wipes, and hard cuts that land on a word |
| linear easing | named curves with overshoot and settle |
| everything centred | off-axis, with a fixed anchor element |
| one library recoloured N times | N systems that disagree on depth and texture |
| graphics beside the footage | graphics that own the frame, alternating with graphics that ride it |
| "it rendered" | "I looked at it composited and counted what was on screen" |

**The rule that outranks all of it:** if two of your edits could be described with the same
sentence, you built one edit twice.
