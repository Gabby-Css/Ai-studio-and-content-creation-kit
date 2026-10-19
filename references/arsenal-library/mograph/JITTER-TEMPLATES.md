# Jitter Motion Templates — Study & Adopt

**Source:** https://jitter.video/templates/all/ (added by you — "look how good these animation templates are… take inspiration")
**What Jitter is:** browser-based motion-design tool. Its template gallery is a tight catalog of *contemporary 2D motion trends* with buttery spring easing. This is the **2D motion-graphics layer** of our stack (the Remotion / Hyperframes / caption layer) — complementary to the Unreal 3D layer.

## Template families (what to study)
| Family | Examples | Technique to steal |
|--------|----------|--------------------|
| **Kinetic typography** | Zero Gravity: Bouncy Words, Cascading Text, Sliding Text Reveal | spring-eased per-word/char reveals; overshoot + settle; stagger |
| **Morphs** | Dots→Text, Inflating Text, Animated Face | shape interpolation; one element *becomes* another (great for VO-literal transitions) |
| **UI microinteractions** | Glow Button, Glass Button, On/Off Toggle, Circular Loader, Progress Bar | snappy state changes; glass/glow; perfect-loop timing |
| **Counters** | Halftone, Frosted Glass, Glitch | number roll-ups with texture/treatment |
| **Blur / blend** | Swirl, Bubbles, Double Exposure, Gradient Orbs, Collage Shuffle | depth via blur; blend-mode compositing; gradient motion |
| **Backgrounds** | Procedural Gradient, Dithering, Ripple | living gradient beds behind type |
| **Social** | IG Story variants, Social Media Showcase, app mockups | clean 9:16 layout systems |

## The Jitter motion DNA — ADOPT in our Remotion/caption layer
1. **Spring easing, not linear.** Everything moves with a spring (overshoot → settle), never a constant-velocity tween. This is the single biggest "premium motion" tell. Map to our overshoot ladder (MONTAGE-CRAFT §15: 120→90→105→97.5→101.25→100) / damped-sine settle.
2. **Stagger.** Multi-element reveals cascade (each word/dot/line offset ~40–80ms). Never reveal a group all at once.
3. **One thing at a time.** Each beat animates ONE clear property change. Restraint reads as expensive.
4. **Microinteraction polish.** Buttons/toggles/loaders with glow + glass + perfect loops — reusable lower-third / UI accents.
5. **Morph as meaning.** A→B morphs literalize the VO ("dots become text", "text inflates"). This is the 2D cousin of our "B-roll = meaning" rule.
6. **Living backgrounds.** Subtle gradient/dither/ripple beds behind type — never a flat fill.

## How it slots into our pipeline
- These are **2D overlay/title-card techniques** → build as Remotion components in `arsenal/remotion/` (easing presets, transitions, kinetic-type templates) and as Hyperframes HTML comps.
- Pair with the Unreal 3D hero shots: **Unreal = the world/character; Jitter-style motion = the type, UI accents, and transitions on top.** Bold title card (UE58 study) + spring-eased kinetic type (Jitter) over a photoreal render = the look.
- NOTE: Jitter templates are proprietary (can't redistribute the files). We adopt the *techniques* and rebuild them as our own Remotion/Hyperframes presets — that's the asset that goes in the library.

## To build (from this study)
- [ ] `arsenal/remotion/easing/spring.ts` — spring + overshoot-ladder + damped-sine presets
- [ ] `arsenal/remotion/templates/kinetic-type-*` — bouncy-words, cascading, sliding-reveal
- [ ] `arsenal/remotion/transitions/` — morph, blur-swirl, double-exposure, collage-shuffle
- [ ] `arsenal/captions/karaoke-styles/` — spring-eased word pop (replaces the flat karaoke in rejected v1)
