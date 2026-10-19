# Reference Study — 2026-07-19

Watched (contact sheets in `_frames/study/ref*.jpg`, 16 frames sampled across each):

| ref | duration | what it is | dominant craft |
|---|---|---|---|
| 8 | 20:03 | YouTube commentary / video essay | receipts-as-cutaways, recreated platform UI |
| 9 | 38:37 | Pilecki / Auschwitz documentary | colour-isolated silhouettes, portrait chips, tally grids |
| 10 | 21:53 | **Vox explainer** | pointing callouts, drawing charts, org diagrams |
| 11 | 20:54 | **Fern** — Cold War doc | **document highlight-sweep**, outline diagrams |
| 12 | 9:25 | Operation Ivy Bells — premium doc | 3D map with grid coords, tracked-out name cards |
| 13 | 22:02 | YouTube commentary | article cards, highlight bar, PiP reaction grids |

Shorts 3–7 (6–20s, vertical) are hook/pacing references, not layout references.

---

## The eight transferable techniques

Ranked by fit for talking-head + claim-driven content (which is what this channel makes).

**1. Tally grid — a count you can SEE.** (ref9)
A grid of tiny marks, one per unit, filling in. ref9 uses it for "100,000 prisoners" beside a map callout. Infinitely better than a spinning counter: the viewer *perceives* the quantity instead of reading it. For "300 videos" → 300 marks fill in over ~1.5s.

**2. Highlight sweep.** (ref11, ref13)
A document/quote on screen; a marker bar wipes across the one sentence that matters, in the accent colour, while the frame slowly pushes in. This is Fern's signature and it is the single highest value-per-line technique in the whole library. Works on any quote, claim, or headline.

**3. Pointing callout with leader line.** (ref10, ref9)
`ZHOU ENLAI / 1898–1976` + a short red leader line + arrowhead touching the person in the archival photo. The label *points at a thing in frame*. This is what separates an explainer from a lower-third: it makes the graphic and the footage one image instead of two layers.

**4. Drawing line chart.** (ref10)
`CHINA'S GDP, IN CONSTANT 2015 US DOLLARS` — hairline gridlines, tiny axis labels, source credit under the title, and the line *draws* left-to-right. Thin, quiet, factual. Never a fat 3D bar chart.

**5. Portrait / icon chip + name.** (ref9)
Small framed photo, thin border, name in a serif underneath, dropped over the scene. Also used as a legend: bordered box `CARPENTRY WORKSHOP` + person glyph + name.

**6. Tiny metadata line at frame bottom.** (ref9, ref10)
A nearly-illegible grey citation under every archival frame. Nobody reads it; everybody feels it. It is the cheapest possible signal of "this is researched."

**7. Date / time stamp tick.** (ref10, ref9)
Small accent tick + `1931` / `11:30 AM` in a corner. Anchors a cutaway in time instantly.

**8. Colour-isolated subject.** (ref9)
Figures rendered in flat accent colour against a desaturated environment. Expensive to author, but the *principle* is cheap: one saturated element, everything else muted.

---

## What is consistent across every single reference

- **Near-black ground, ONE accent.** Vox red, Fern olive-yellow, Ivy Bells orange, ref9 red. Never two accents competing.
- **Tiny tracked-out uppercase labels** are the connective tissue. 15–22px, 4–9px letter-spacing, mid-grey. They carry all secondary information so the primary can stay huge.
- **Grid / coordinate scaffolding** as decoration — map grids, cross ticks, hairline rules. Implies rigour.
- **Type is either very large or very small.** Nothing in between. No 40px body copy anywhere in 2 hours of footage.
- **The graphic and the footage are one image.** Callouts touch things. Highlights sit on real documents. Charts appear where the eye already is.

## What this changes about how we build

The house comp vocabulary before this study was: panel, scorecard, couplet, chip, CTA. Every one of those is a **box that sits next to the footage**. Not one of them *engages* the footage. The references almost never do that — they point at it, mark it up, or replace it entirely.

Assets built from this study, as they ACTUALLY shipped (`longform/comps-lib/`, copied down
into `work/<slug>/comps/`). The planned `asset-*` names above were never used — check this
list, not that one:

| technique | shipped as |
|---|---|
| 1 tally grid + 9 field morph | `regroup-grid.html`, and `volume-sort.html` at broadcast grade |
| 2 highlight sweep + 10 | `highlight-sweep.html`, and the `sweep` scene in `broadcast-layer.html` |
| 3 pointing callout + 11 | `point-callout.html`, and the `callout` scene in `broadcast-layer.html` |
| 4 drawing line chart | the `chart` scene in `broadcast-layer.html` |
| 12 ranked chips | `ranked-chips.html`, and the `ranked` scene in `broadcast-layer.html` |
| 13 name lower-third | the shared `.lt` furniture in `broadcast-layer.html` |

Metadata line (6) and stamp tick (7) are always-on furniture in `broadcast-layer.html` — they
ride the entire cut rather than being per-scene decoration, which is how the references use
them: nobody reads the citation, everybody feels it.

**All thirteen techniques now have an asset.** `broadcast-layer.html` is the one to reach for
on a full cut — a variant is a scene SUBSET of it, not a new comp.

---

## Part 2 — MOTION study (same day, after you: "watch through all of them… implement those animations into a correlated topic")

Part 1 studied **contact sheets** — spread-out stills. Those teach composition and
nothing about motion. This pass sampled **dense scans** (1 frame / 12s over a 300s window)
to locate the moments where graphics actually animate, which the sparse sheets had missed
twice: my first two frame-strips landed on raw archival footage.

### The finding that changes how we build comps

**In the references, the motion IS the argument — it is not decoration on top of one.**

ref10, 300–340s: a dot field labelled CENTRAL COMMITTEE (~200 dots) does not cut to the
next graphic. It **morphs down the hierarchy** — dots leave, the field re-forms as
POLITBURO (fewer), re-forms again as GENERAL SECRETARY (a single row), and one dot turns
red. Nobody counts the dots. The *shrinking* is the point: you feel power concentrating.

A static grid states a number. A **regrouping** grid states what happens *to* the number.
Every house comp we had stated numbers.

### Techniques confirmed in motion (with the moment they were found)

| # | Technique | Where | Reads as |
|---|---|---|---|
| 9 | **Field morph / regroup** — one field of marks re-forms into a different arrangement | ref10 @300–340s | quantity being concentrated, sorted, or distributed |
| 10 | **Highlight sweep on dimmed body copy** — full paragraph greyed, one phrase burns white | ref10 @~396s | "this specific clause is the whole story" |
| 11 | **Bracket/tree drawn onto the photo** — connectors run from a label down to real faces in the still | ref10 @~528s ("LONG MARCH SURVIVORS 1961") | the graphic and the footage are ONE image |
| 12 | **Portrait chips ranked by size + colour** — principal in a large red circle, subordinates smaller and teal | ref10 @~336–480s | hierarchy without a word of explanation |
| 13 | **Name lower-third, tiny, bottom-left, one accent tick** | ref10 @~420s (expert interview) | authority, cheaply |

### What shipped from this pass

`longform/comps-lib/` — a **shared comp library**, which did not exist before. Every prior
reference study died inside the one video it was made for. Assets here are copied down into
`work/<slug>/comps/` and retuned via a `CONFIG` block.

First asset: **`regroup-grid.html`** (technique 9). N marks fill, then regroup into k
labelled clusters, deterministic under `__seek`, ~55s to render 135 frames.

**Topic match — this is the part you asked for.** The asset was not chosen because it
looks good. This video's line at 9.8s is *"clipping 300 videos… posts them everywhere."*
That is literally quantity being distributed to destinations, so the field fills to 300 and
regroups into four platform piles of 75. Scene 01 of `v6-kinetic-cutaway` was rebuilt on it
and re-shipped (PASS, 30/30). The same asset in *reduce* mode (fill → collapse to one
accent mark) would be the correct read for a line about one thing mattering — **the mode
follows the sentence.**

### Craft note caught in the build

Cluster pitch must exceed `markSize × endScale` or the piles fuse into solid slabs and the
"one mark = one video" reading — the entire reason to draw 300 marks — is destroyed. Caught
on a still-check at t=3.6s, before rendering.

### Higgsfield → Hyperframes transfer (you: "the same thing you learned from Higgs Field")

These techniques are **engine-agnostic by construction**: they are timing and arrangement,
not renderer features. Field morph, highlight sweep, and ranked chips are all pure DOM/CSS
in Hyperframes and cost nothing. Higgsfield's job stays what it is good at — photoreal
footage that cannot be filmed — and it should never be asked to draw type, logos, or
counts, which it garbles. The division: **Higgsfield makes the image, Hyperframes makes
the argument.**

### Still unstudied

Shorts 3–7 and both `videoplayback` clips. Refs 8–13 (the long-form, graphics-heavy ones)
are where the transferable craft lives; the shorts are pacing/hook references and are worth
a separate pass keyed to a short-form build, not this one.
