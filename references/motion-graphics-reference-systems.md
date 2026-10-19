# 📐 Motion-Graphics Reference Systems — thirteen visual worlds, mined from frames

A reference library of **thirteen complete, independent motion-graphics systems**, each read from the
actual frames of real reference videos (contact sheets), not from memory or filenames. Use it to give a
talking-head edit, an explainer, or a longform its own look — and to keep two edits from looking alike.

**Why this file exists.** It's easy to build "nine different edits" by recolouring **one** scene library.
They read as one edit nine times. The fix is not more themes — it is more **SYSTEMS**. Each entry below is a
complete, independent visual world: ground, accent, type, texture, depth model, and a signature technique
that appears nowhere else.

**How to use it.** Pick a row. Build that entire world — do not mix two rows, and do not import a scene from
another edit "because it worked". If two edits share a **depth model** and a **texture** lock, they will
collide no matter how far apart their hex codes are.

---

## The systems

### "Violet Mesh Deck"
- **Ground** living violet mesh gradient (`#B9A2E8` → `#6B3FD4`), slowly drifting
- **Accent** violet `#8B2FE0` · **Card** near-black `#101014`
- **Type** light geometric sans, lowercase, wide-tracked; a UI grotesk inside cards
- **Texture** fine dot-grid / halftone screen printed INSIDE the dark card face (regular matrix, not grain)
- **Depth** floating 16:9 rounded-rect slab (~24px radius) with a heavy soft drop shadow — physically *above* the bg
- **Signature** line-chart path draw-on with a **glowing head-dot leading the stroke**; pill labels with
  favicon glyphs pop as the dot passes each anchor; ends by growing macOS window chrome
- **Needs** dot-grid tile, mesh-gradient plate, brand favicons, light geometric display face

### "Neon Ember"
- **Ground** near-black `#080607` (framed by paper white `#F3F1EB`)
- **Accent** hot lamp-red `#E8202A` — **sampled from a practical light in the set**
- **Type** heavy geometric sans caps; label plates in **bookish serif caps** inside thin red strokes
- **Texture** bloom + heavy glow everywhere; paper grain on the outer frame
- **Depth** glow-behind — the halo arrives *before* the shape resolves
- **Signature** neon line-icon tiles lighting one at a time L→R under a header plate; frosted-glass panel
  with white bars growing inside it; one full-frame orange light-leak wash as a transition
- **Needs** 2px single-weight line-icon set, serif caps face, glow plate, light-leak footage, flat-vector characters

### "Warm Room / Desk Objects"
- **Ground** near-black `#050403` with a warm amber radial bleed (`#8A5A22` → `#2A1A0C`) from off-frame
- **Accent** warm amber
- **Type** rounded UI sans for tooltip chips + **handwritten script** for annotations
- **Texture** none to speak of — the warmth IS the texture
- **Depth** thin 1px glowing rounded-rect outline — a "lit frame", not a card
- **Signature** **real 3D object props** (app icon, cursor, key-ring) + an **OS-cursor interaction metaphor**
  — a cursor flies in and *clicks*, the icon presses down; objects multiply as the point accumulates
- **Needs** 3D emoji/object renders, script face, hand-drawn arc SVGs, amber glow plate

### "Red Grid Diagnostic"
- **Ground** saturated crimson field, `#3A0507` → brighter base; charcoal `#181818` outer frame
- **Accent** hot red `#FF2B2B` · white
- **Type** bold condensed caps; small mono inside pills; thin editorial serif watermark
- **Texture** film grain over the red
- **Depth** **perspective floor grid** converging to a vanishing point
- **Signature** numbered chips **tumble in rotated, then settle into an even arc** (scatter-then-regroup);
  curved connectors fan from each chip down to a shared 3D anatomical prop; **text-behind-subject masking**
- **Needs** 3D anatomical model, perspective-grid generator, grain plate, subject roto matte, condensed face

### "Annotated Paper"  ← highest differentiation in the entire set
- **Ground** warm paper `#E0DEDE`–`#F0EDE8`, strong dark vignette
- **Accent** ink navy `#1F2A6B`, correction red `#C81E1E`, sticky-note yellow `#F5D23A`
- **Type** old-style / typewriter serif body; chunky stencil-techno display
- **Texture** paper fibre + faint pencil-sketch underlay
- **Depth** **flat and physical — ZERO GLOW.** Every other system emits light; this one absorbs it
- **Signature** vintage engraving cutouts, hand-tinted; red pen X strike-through; dashed leader lines with
  travelling hand-drawn arrowheads; a numbered worksheet that fills itself in; whole-board hand-held wobble
- **Needs** paper scan, public-domain engravings, sticky-note + dash/arrowhead SVGs, typewriter serif, stencil face

### "Tabloid TV Doc"  ← the opposite pole from everything else
- **Ground** blurred archival plates, graph paper, wood grain
- **Accent** **hue-coded per segment** (rainbow tiers cyan→red), broadcast red `#FF0000`, olive highlighter
- **Type** elegant serif (Garamond/Times) for narration subs AND headline cards, with **coloured keyword emphasis**
- **Texture** heavy bloom, strong vignette
- **Depth** bevel + emboss + drop shadow — deliberately 2000s broadcast
- **Signature** rainbow tiered pyramid building bottom-up; screenshot cards floated in 3D and parallaxed; a
  3D logo that **shatters**; highlighter blocks wiping in behind words; full-width serif narration subtitles
- **Needs** rainbow ramp, graph paper, wood texture, 3D logo + shatter matte, polaroid frames, bevel styles

### "Spec Sheet"  ← a 100% typographic look
- **Ground** dual-mode: near-black `#06090A` **and** cream `#F5F3EF`, same layout inverted
- **Accent** acid green `#C6F24E`. Zero other hues
- **Type** tight grotesk headlines + all-caps letterspaced mono labels
- **Texture** **ZERO** — no glow, no grain, no shadow. Pure vector
- **Depth** none. Flat. Hierarchy from scale and rule-weight only
- **Signature** mono eyebrow with a leading dot typed in BEFORE the headline; two-tone headline (line 1 ink,
  line 2 accent); benchmark bar rows with count-up values and delta chips; numbered chips 01–12 lighting in
  sequence; schematic pipeline with filling underscores + a pulsing status pill; hard disclosure slate bottom-left
- **Needs** a mono + a tight grotesk. Nothing else — this look is 100% typographic

### "Teal Node Graph"
- **Ground** black with a teal radial glow rising from the bottom edge (`#0E4F4A` → black)
- **Accent** teal `#2DD4BF`, secondary electric blue `#3B82F6`
- **Type** clean UI sans for node labels; **italic serif numerals** for step markers
- **Texture** none; the glow is the finish
- **Depth** glassmorphic — dark rounded rects, 1px cyan border, small icon tile at left
- **Signature** **dashed cyan connectors with right-angle elbow routing** drawing on marching-ants style;
  radial hub with concentric rings and N/E/S/W satellites; dashed group containers wrapping sub-flows;
  hexagon badge overlay beside the talking head
- **Needs** teal glow plate, single-weight outline icon set, hexagon vector, dashed elbow-connector system

### Five more (documentary / editorial family)
- **"Org-Chart Doc"** near-black, ONE red, mint+blue used SEMANTICALLY in an org chart; ~40–50% of runtime is
  a full-frame graphic REPLACING the shot. Dot fields where the **hole** is the subject
- **"Line-Art Schematic"** near-black green, olive-yellow, every box a stroked line-art schematic; a document
  burn where one phrase burns in under a marker wipe
- **"Colour-Coded Dossier"** deep navy, red/amber/blue colour-coded roles, thin outlined stat numbers
- **"Premium Warm Doc"** premium documentary look, warm orange on a colder ground
- **"Platform-UI-as-3D"** recreated platform UI as a full-screen graphic — the most on-topic technique for
  anything about social posting

---

## Collision matrix — enforce before building

| system | ground | depth model | texture | must not ship beside |
|---|---|---|---|---|
| Violet Mesh Deck | living gradient | floating slab | halftone dots | — |
| Neon Ember | black | glow-behind | bloom | **Red Grid** (both red → split on texture) |
| Warm Room | black + amber | lit frame | none | — |
| Red Grid | crimson | perspective grid | grain | **Neon Ember** |
| Annotated Paper | paper | flat physical | paper fibre | — (unique: zero glow) |
| Tabloid TV | archival | bevel + bloom | heavy bloom | — |
| Spec Sheet | black **and** cream | none (flat) | **zero** | **Teal Node** (same family → split typographic vs diagrammatic) |
| Teal Node | black + teal glow | glassmorphic | none | **Spec Sheet** |

**The rule:** if you can describe two of your edits with the same sentence, you built one edit twice.

---

## Worked example — nine edits, nine worlds

A useful stress test: cut the *same* talking-head longform nine different ways, and force every cut to be its
own world. No two share a **ground + depth + texture** triple, so no two can be described with one sentence.
This is what replaces a recoloured-matrix set that reads as one edit nine times.

| # | edit | ground | accent | type | texture | depth | signature motion |
|---|---|---|---|---|---|---|---|
| 1 | Spec Sheet | black **and** cream (inverts) | acid green `#C6F24E` | Inter + Space Mono | **zero** | flat | mono eyebrow types before headline; bench bars; 01–12 chips |
| 2 | Teal Node Graph | black + teal floor-glow | teal `#2DD4BF` / blue `#3B82F6` | Inter + Playfair italic numerals | none | glassmorphic | dashed elbow connectors draw marching-ants; radial hub; hexagon badge |
| 3 | Annotated Paper | warm paper | ink navy / pen red / sticky yellow | Courier Prime + Oswald | paper fibre + vignette | flat physical **(zero glow)** | hand-drawn ellipse/X/tally; sticky notes swing; DONE stamp slams |
| 4 | Red Grid Diagnostic | crimson | pure red `#FF2B2B` | Oswald + Courier | film grain | perspective grid | chips tumble in rotated → settle into an arc (scatter→regroup) |
| 5 | Neon Ember | black in a paper frame | lamp red `#E8202A` | Anton + Playfair | **bloom** | glow-behind | neon icon tiles light L→R; frosted panel bars grow; light-leak wash |
| 6 | Violet Mesh Deck | drifting violet mesh | violet `#8B2FE0` | Archivo lowercase + mono | printed dot-matrix | floating slab | line-chart draws with a glowing head-dot; pills pop as it passes |
| 7 | Desk 3D Objects | warm amber void | amber `#FFA53C` / cream | Oswald tooltip + Playfair script | rendered 3D props | real 3D depth | a lit folder clicks open, clip-cards fan out & stream; tooltip type **pops** (backOut) |
| 8 | Broadcast Shatter | near-black charcoal stage | icy cyan `#7FE9FF` / steel | Oswald chyron + Space Mono | chrome-glass + haze | real 3D depth | chrome emblem **cracks → shatters → title-plate rises**; broadcast chyron **slams** in (outQuint + scanline) |
| 9 | Platform Feed | deep blue-charcoal void | electric-blue `#2E6BFF` / white | **Archivo** card + Space Mono | glass tiles + softbox | real 3D depth | one clip-card **fans into a 5-platform wall** + counter; post-cards **rise** (spring) |

**Split discipline used here:** edits 1↔2 come from the same source family → split typographic vs glassmorphic
+ green vs teal. Edits 4↔5 are both red → split grain+grid vs bloom+glow-behind (opposite texture AND depth).
Edits 8↔9 are both blue → held apart by value+hue (cyan-on-dark vs blue-on-white) and by motion (horizontal
slam vs vertical spring). Each edit runs ~50% overlay beats (host on screen, graphics ride the footage) /
~50% full-screen (graphics replace the footage).

---

## Asset shopping list (deduped across all systems)
paper + grain textures · halftone dot tile · light-leak plates · 3D emoji/key/cursor renders · 3D anatomical
model · public-domain engraving PNGs · sticky-note + polaroid frames · single-weight outline icon set ·
hexagon/badge vectors · dashed elbow-connector system · fonts across seven classes (geometric light sans,
condensed bold caps, bookish serif caps, typewriter serif, stencil display, script/handwriting, mono).

**A finishing library helps.** A set of transparent procedural SVG/PNG overlays — arrows, bokeh, bursts,
confetti, dust, flares, frames, glows, grain, gridfloor, halftone, light-leaks, rings, scanlines, shapes,
sparkles, speedlines, streaks, swooshes, vignette — sized 1920×1080, drops straight into a DOM/HTML render or
a Remotion layer for the finishing pass. Good free sources: your own procedural generators, and open overlay
packs. Font classes worth keeping on hand: Inter, Space Mono, Bebas, Archivo, Oswald, Courier Prime, Playfair.
