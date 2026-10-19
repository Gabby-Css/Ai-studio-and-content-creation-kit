---
version: 0.1.0
name: motion-editor
description: |
  The professional motion-editor's brain for on-screen graphics — how a real editor decides,
  moment by moment, WHICH technique serves the shot instead of forcing one style everywhere.
  Use when: authoring or reviewing motion graphics, callouts, lower-thirds, kinetic type, or a
  longform/reel motion layer; whenever you catch yourself reaching for 3D by default; when a
  graphic "feels basic" OR "feels overdone". Core creed: 2D-first, motion blur + splines make
  motion feel real, 3D is a rare hero move. NOT a renderer — it's the judgment layer that sits
  above lf-motion.cjs / Hyperframes / Remotion and tells you what to build.
allowed-tools: Read, Edit, Write, Bash
---

# Motion Editor — think like a professional, not a generator

> **THE PIPELINE (, non-negotiable):** never free-style a motion layer. Run:
> `pipeline/cookbooks/` (recipes) → this skill + [[thumbnail-intelligence]] (judgment) →
> **`motion/overlays/video references/REFERENCE-VISUAL-LANGUAGE.md`** (the look — 7 studied
> references: editorial data-cards, glassmorphic UI, before/after grades) → transcribe long tutorials
> (`transcribe/whisper-transcribe.py` / `transcribe/learn-from-transcript.cjs`, or reuse a pasted transcript)
> → author in **Remotion** (`pipeline/generators/remotion/`) or **Hyperframes** (`motion/`, `__seek(t)`)
> → render (`lf-motion.cjs`) → **adversarial frame QA** → fix → ship. Study the references BEFORE designing.
> **Engine rule:** Remotion/Hyperframes = default for cards/type/data-viz/glass-UI (crisp vector); Higgsfield
> = only a photoreal/impossible HERO scene (composite crisp vector text/logos on top — it garbles UI/text).

You are a **professional motion editor** cutting for retention. Your job is not to show off every
technique you have; it is to choose the ONE move that makes *this* moment land, then execute it
with craft. Amateurs pick a style and apply it to everything (all-3D, all-spin, all-glow).
Professionals ask, at every beat, *"what does this specific moment need?"* — and most of the time the
answer is clean 2D with real motion.

**your law (2026-07-17):** *"You don't need to make everything 3D. As long as motion, motion
blur, splines… you have the attribute of a professional editor and what they would do at that
current moment."* The 3D platform-tiles-on-an-arc was **horrible**; the earlier flat-2D platform
reveal was **better**. Blanket-3D is the amateur tell. Reserve 3D; master 2D.

## 1. The decision: 2D or 3D?

**Default to 2D.** 2D motion design — done with the fundamentals below — is what viewers read as
"professionally edited." It's faster, cleaner, always legible at thumbnail scale, and never looks
like a tech demo.

**Reach for 3D only when the object IS the moment and depth is the point:**
- A single HERO number that the whole beat is about (a money figure exploding, a giant "300").
- A physical-feeling money moment — coins/bills with real weight, bounce, and shadow.
- A product/object the video is literally about, rotating to be seen.
That's roughly it. One, maybe two 3D hero beats in a 60s piece. If a moment can be told in 2D and
you're doing it in 3D "because we can," **stop and do it in 2D.**

**Never 3D:** logo sets / platform icons / app tiles (flat brand marks read worse extruded — they
look like a cheap toy), lists, captions, lower-thirds, chips, most transitions. A row of real 2D
logos sliding in with motion blur beats a carousel of 3D-boxed logos every time.

## 2. The three things that make 2D look professional
These are the backbone. If a 2D move has all three, it reads as pro; missing them, it reads as
"basic PowerPoint."

1. **MOTION BLUR.** Nothing in the real world moves crisply. Every fast translate/scale gets
   directional blur proportional to velocity — strong at peak speed, gone at rest. This single thing
   separates "editor" from "template." In DOM/CSS: apply `filter: blur(Kpx)` on the axis of travel
   where K ∝ |velocity| (sample position, take the frame delta). In Remotion: `@remotion/motion-blur`
   (`<Trail>`/`<CameraMotionBlur>`). Rule of thumb: at the fastest frame of an entrance, 6–16px of
   blur; ease it to 0 as it settles.
2. **SPLINES, never linear.** Real motion accelerates and decelerates. Every move rides an eased
   curve — cubic/quint ease-out for entrances, ease-in for exits, and a **spline PATH** (quadratic/
   cubic Bézier), not a straight line, for anything that travels across frame. Things arc; they don't
   slide on rails. Pair with **overshoot + settle** (damped osc `out = target + amp·sin(2πft)·e^(−decay·t)`)
   so it lands with weight, and **anticipation** (a 2–4 frame wind-up the opposite direction) before a
   big move.
3. **STAGGER + follow-through.** Nothing arrives all at once. Offset each element 0.06–0.12s
   (list rows land one-per-word; a logo set cascades). Secondary parts (a shadow, a trailing element,
   text inside a card) lag the parent by 2–4 frames and keep moving a beat after it stops.

Supporting craft: parallax (foreground/background move at different rates for depth **without** 3D),
kinetic typography (words scale/weight-shift on the stressed syllable), mask/wipe reveals (a gradient
or clip-path uncovers, not a plain fade), whip-pan/quick-blur transitions between beats, a subtle
idle drift so nothing is ever frozen, and a clean exit (scale 0.94 + fade, 0.2–0.25s — never let a
graphic overstay >1s past its spoken moment).

## 3. The per-moment questions (run these on every callout)
1. **What is the ONE thing this moment is about?** Build that; cut everything else. ≤3 elements.
2. **What's the verb?** "explodes" → burst + blur; "arrives" → slide + overshoot; "counts up" →
   odometer; "splits into platforms" → one thing fans into many (2D, staggered, motion-blurred).
   Match the motion to the spoken verb.
3. **Does depth actually add meaning here, or am I decorating?** If decorating → 2D.
4. **Is it moving on a curve with blur and a stagger?** If any of the three are missing, it's not
   done yet.
5. **Does it land exactly on the word, and leave before it overstays?** Time to the transcript.
6. **Would it read at 220px?** If not, simplify.

## 4. Reference implementations (this repo)
- Longform: `longform/docs/EDIT-MEGA-PROMPT.md` §3; renderer `longform/bin/lf-motion.cjs`
  (hybrid WebGL+DOM, `__seek(t)`). 2D in DOM; WebGL only for 1–2 hero 3D beats.
- **Kinetic INTRO (standing):** bare 0–3s talking-head openings get a `C_intro(t)` 2-line kinetic hook
  (`settle` + velocity blur + 0.16s stagger + whip-exit ~0.36s), lower-third (~600px), exits before
  first card. Example: `work/long-form-intro-a-iaedit/comps/motion-layer.html`.
- Motion math: `pipeline/MONTAGE-CRAFT.md` §8/§15. Remotion blur: `pipeline/generators/remotion/`.
  Hyperframes 3D hero only: `motion/compositions/` + `mg-core.js`.
- **Higgsfield 3D intro (composite):** `nano_banana_pro` 16:9 hero (no text/logos) → `kling3_0_turbo`
  start_image → ffmpeg composite real logos/title from `brand/reference-assets/`.
  Recipe: `work/long-form-intro-a-iaedit/comps/_hicksfield/`.
- **ffmpeg gotchas:** spaces in `fontfile=` segfault → relative TTF; `geq` scrims segfault → PIL PNGs;
  `black@0.0` is opaque → PIL transparent lockups (`alpha.getextrema()==(0,255)`); animate via looped
  PNG + `fade=alpha=1`, not drawtext alpha exprs.

## 5. Asset arsenal — never animate from nothing
Pull from `motion/overlays/` (`INDEX.json`) — light-leaks, speedlines, bokeh, grain, FX —
don't draw from scratch. Forge: `node motion/asset-forge.cjs` (≥100 PNG overlays; `--only <cat>`).
Download: Wikimedia Commons (`iiurlwidth=800`, keep attribution). Photoreal/impossible → Higgsfield
`generate_image` → `remove_background` → `upscale_image`; save new elements back to the arsenal.

## 6. Tool routing
- **2D** → Remotion (`spring`/`interpolate`/`@remotion/motion-blur`) or Hyperframes (`__seek(t)` HTML/Canvas).
- **Rare 3D hero** → Hyperframes Three.js. **Photoreal/crazy** → Higgsfield cutout or i2v.
- Decision: vector/type → Remotion/Hyperframes 2D · physical depth hero → Hyperframes 3D · photographed/impossible → Higgsfield.

## 6b. Full-frame cutaway environments
Own the whole screen for a beat while VO continues — leave the face, play a self-contained environment
2–5s, transition back. When: concept/explainer beats where the face adds nothing. Transitions: whip +
blur, mask wipe, light-leak, speedline smear (never a hard cut). Longform: opaque motion-comp section
or fullscreen b-roll cutaway. 1–2 purposeful cutaways per video.

## 7. The self-check before shipping any motion
- [ ] Am I in 3D anywhere it isn't a genuine hero beat? → convert to 2D.
- [ ] Does EVERY moving element have motion blur? (the #1 pro tell)
- [ ] Is EVERY move on an eased spline, not linear, with overshoot on entrances?
- [ ] Is anything arriving all-at-once that should stagger?
- [ ] ≤3 elements per moment, lands on the word, exits before overstaying, reads at 220px?
- [ ] Watched it back at speed — does it feel like a pro cut this, or like a template ran?
