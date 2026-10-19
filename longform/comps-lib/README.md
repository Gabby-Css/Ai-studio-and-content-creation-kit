# comps-lib — reusable Hyperframes comps

Reference-derived motion assets. Each one is a **self-contained** HTML file on the
Hyperframes contract (`window.__seek(t)` synchronous + deterministic, `window.__ready`
after first seek, transparent background, pure DOM/CSS, comp-local time from 0).

**How to use one:** copy it into `work/<slug>/comps/`, edit only the `CONFIG` block at
the top, render with `lf-motion.cjs`. Never edit the library copy for one video's needs —
if a video needs a new knob, add the knob here and copy down.

## Why this exists

Use the pipeline order: lawful references →
**assets you author from them** → cookbook → pipeline. Before this dir, every reference
study landed in one video and evaporated. An asset here is the study made durable.

## Assets

| File | Technique | Source ref | Best for |
|---|---|---|---|
| `regroup-grid.html` | A field of N marks fills, then **regroups** into k labelled clusters | Editorial data-animation pattern | quantity that gets *distributed* or *sorted* — "N things → k destinations" |
| `highlight-sweep.html` | Body copy sits dimmed; a marker wipes across the marked phrase and it **burns** bright | Document-emphasis pattern | one clause inside a larger statement mattering — a caveat, exception, fine print, buried admission |
| `point-callout.html` | A dot lands on a thing in frame, a leader **draws** out from it, a label wipes on | Editorial annotation pattern | naming things already visible — a face, a product, part of a screenshot |
| `ranked-chips.html` | Chips arrive all the **same size**, then resize themselves by rank; the leader takes the accent | Comparative-data pattern | ranking or comparing named things — market share, task share, or category size |
| `volume-sort.html` | Full-frame scene: a count runs up, the field fills, then sorts into k piles under authorized marks | Combined data-animation example | "N things go to k named destinations", when the beat deserves a full-frame scene rather than an overlay |

## Five craft heuristics

These settings can help browser-authored graphics feel more editorial. They are starting points,
not a claim of broadcast certification or equivalence to a particular commercial tool.

1. **POSTERIZE TO 12fps INSIDE A 30fps RENDER.** The single highest-impact change. First line
   of `__seek`: `const t = Math.floor(tRaw*12)/12`, and every value downstream reads `t`,
   never `tRaw`. Smooth 30fps interpolation is *the* tell that a graphic was made in a
   browser. Some editorial styles use deliberate stepped motion; use it only when it fits.
2. **MORPHS MOVE IN GROUPS, NEVER BY HASH.** Stagger by *destination*, not by a per-item
   random: everything bound for pile 0 travels together, then pile 1. Verified by rendering
   both — a hash stagger renders the midpoint as a swarm of noise; grouped, the midpoint
   still reads as sorting. A random stagger animates; a grouped one argues. Give the group
   currently in flight the accent colour so the eye knows where to look.
3. **REVEALS ARE JAGGED, AND TYPE LAGS ITS PLATE.** Quantise wipe progress to ~5 uneven
   stops (`jagged()` in `volume-sort`), and start the type's wipe ~4 comp-frames behind the
   plate's. Smooth `clip-path` ramps are what make CSS look like CSS.
4. **EVERY COMP GETS A LENS PASS** — chromatic aberration (two screened tinted copies offset
   ~1.3px), a vignette, and grain re-seeded each posterized frame. Graphics without one sit
   ON the footage instead of IN it. **Constraint learned the hard way:** hold the vignette's
   clear zone out past the type (`ellipse 78% 78%`, inner stop 62%). Pulling it to 42%
   crushed the headline and the count to mid-grey — a lens pass that dims the message is a
   worse graphic, not a more filmic one.
5. **REAL IMAGERY, ONE TREATMENT.** Use the actual marks from `assets/library/logos-brands/`,
   never abstract chips — but render them through a single treatment. A gradient Instagram
   tile next to a yellow Snapchat tile next to a black TikTok glyph reads as four things
   *pasted on*; the same four as white monochrome glyphs become part of the system. Recipe:
   force `fill="#FFFFFF"` on the SimpleIcons SVG, then `sharp().resize(256,256,{fit:'contain'})`.
   (The library PNGs are black-on-transparent — invisible on a dark plate. Always re-render
   from the `.svg`.)

Also: give the scene a **persistent scaffold** (the spine + ticks) rather than isolated cards,
and set titles and counts **directly onto the frame** with no plate behind them. A card is a
box that sits next to the footage; a scaffold is a frame the footage lives inside.

### `volume-sort` supplies — same convention as fonts

The comp expects four sibling files in `work/<slug>/comps/` alongside `anton.ttf`/`mont.ttf`:
`ig-w.png`, `tt-w.png`, `sc-w.png`, `fb-w.png` (white glyphs, 256×256, per law 5). Swap
`CONFIG.piles[].img` for a different destination set. `pile.cols` **must divide** `pile.n`
evenly or the last row renders as a ragged stub that reads as a bug.

### `ranked-chips` — the equal-then-resize order is the technique

Chips that arrive pre-sized **state** a ranking. Chips that arrive equal and then resize
**enact** one, and the viewer feels the gap open. Same law as `regroup-grid`: a static chart
states a number, a moving one states what happens to it. If nothing is being compared there
is no rank to enact — use `regroup-grid` for a quantity that is merely large.

Sizing is driven by **value, not rank index**, so four near-equal values render near-equal
instead of being forced into a fake staircase. Captions hang off the *largest* chip's edge,
never each chip's own, or the label row staggers — the references always keep it level.

### `point-callout` is the one that composites

Unlike the others it renders **alpha-transparent with no background of its own** — it is
built to sit OVER footage, which is the whole technique. Targets are normalized 0-1 coords
against the frame you are pointing into, so a reframe rescales them with the shot.

Order of operations is load-bearing and matches the references: dot lands FIRST (establish
the referent), one echo ring expands and dies (a looping pulse reads as a UI element, a
single echo reads as "look here, once"), the leader GROWS from the dot (a bar that slides
in reads as arriving, not as tracing to something), then the plate wipes on from the
leader's end. Never point at an empty plate — a leader aimed at nothing promises a referent
the frame does not have, which is worse than no graphic at all.

### `highlight-sweep` authoring

Wrap the phrase(s) to burn in `<mark>` inside `CONFIG.body`. Multiple `<mark>`s sweep in
document order at one **constant pixel speed**, so a two-word last line does not linger as
long as a full first line. A phrase that wraps across lines produces one bar per line
automatically — no manual splitting.

Two craft constraints are load-bearing:
- The bright layer is a **duplicate of the whole paragraph** clipped to the swept band, not
  re-typeset text. Re-typesetting drifts a pixel or two and reads as a double-exposure.
- Measurement happens after `document.fonts.ready`. Measuring a fallback face and then
  restyling puts the two layers out of register — same failure, different cause.

## Topic matching

The technique is chosen by **what's being said at that moment**, not by what looks good.
`regroup-grid` earns its place only when the line is about volume being routed somewhere.
If the line is about a single thing mattering, the same asset's *reduce* mode (fill →
collapse to one accent mark) is the correct read instead. Motion is the argument.
