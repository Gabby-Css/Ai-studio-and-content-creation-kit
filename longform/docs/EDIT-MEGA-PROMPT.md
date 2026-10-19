# LONGFORM EDIT MEGA-PROMPT — the edit grammar

**Load this with the adjacent README.md before authoring an edit plan. README covers mechanics and schemas; this file covers craft. Build motion and visual rhythm rather than relying only on static corner overlays.**

---

## 0. The mental model

Treat the edit as a sequence of deliberate attention cues. A long locked-off shot may reduce visual
variety, but pacing should follow the material rather than a promised retention formula:

1. **The talking head is the rhythm section** — punch-ins (digital zooms) are the drumbeat. Every sentence boundary is a candidate cut.
2. **The motion layer is the melody** — designed, animated graphics that visualize what is being SAID, the moment it's said.
3. **Sound sells the motion** — a whoosh/pop on an entrance makes 2D feel physical.

**Pacing heuristic:** review stretches longer than roughly 3–8 seconds with no visual change. Add a
punch-in or graphic only when it improves comprehension or emphasis; silence and stable shots can be
intentional.

## 1. The pipeline (what runs, in order)

```
lf-dissect        → transcript (word timestamps), scenes, contact sheets   [mechanical]
EDITOR: watch/read → pick punch rhythm and motion moments                  [creative]
prepare assets     → components/graphics/                                  [mechanical]
EDITOR: author     → work/<slug>/comps/motion-layer.html                    [creative]
lf-motion         → renders comp → components/overlays/<slug>-motion.mov   [mechanical]
EDITOR: author     → edit-plan.json (punch-ins + motion overlay + sfx)      [creative]
lf-assemble       → --check → --draft → lf-verify → LOOK → amend → --final [mechanical]
```

**The creative center of gravity moved: the edit-plan is now mostly PUNCH-INS and SOUND. The visual richness lives in the motion-layer comp.** Static PNG overlay events are the fallback for trivial cases only.

## 2. Punch-in grammar (`keep[].zoom`)

Source is usually 4K, target 1080p → up to 2.0x zoom with ZERO quality loss (crop happens on the full-res source in the cut stage).

- Split `keep[]` at **sentence boundaries** (word-timestamp precision), alternate `1.0 → 1.15-1.25 → 1.0`. A zoom CHANGE is a visible cut; same zoom across a boundary = invisible seam.
- Punch IN on: the claim, the number, the punchline, "here's the thing" moments.
- Punch OUT (back to wide) for: new topic, big gesture moments, anything where the motion layer needs room (keep WIDE during full-frame graphic sequences).
- `fx`/`fy` (0–1, default 0.5/0.45) aim the crop at the face — check a draft LOOK frame; a punch that crops the forehead is worse than no punch.
- Don't metronome it: two wides in a row is fine; three punches in a row reads frantic. 6–12 zoom changes per minute of talking head.

## 3. The motion layer (`lf-motion.cjs` + one HYBRID comp per video)

ONE full-length 1920×1080 transparent comp choreographs EVERY graphic moment, timed internally to OUTPUT seconds. It is a **hybrid**: a Three.js **WebGL canvas (the 3D layer)** sitting *behind* absolutely-positioned **DOM/Canvas (the 2D layer)**, both driven by the same `window.__seek(t)`. `lf-motion.cjs` renders it to a transparent qtrle .mov (WebGL uses `alpha:true` + `setClearColor(0,0,0,0)`; DOM stays `background:transparent`; puppeteer `omitBackground` captures both into one alpha layer — proven). Render:

```
node longform/bin/lf-motion.cjs --html work/<slug>/comps/motion-layer.html --out longform/components/overlays/<slug>-motion.mov --dur <outDur> --fps 30
# LOOK first: --still <t> --stillout f.png  (composite over gray to check alpha before the full render)
```

Plan wires it as ONE overlay event: `{ "asset": "overlay-<slug>-motion", "at": 0, "dur": <outDur>, "fade": 0 }`.

**Comp contract** (Hyperframes): expose `window.__seek(tSeconds)` + `window.__ready = true`; EVERYTHING derives from `t` — deterministic, frame-accurate. Author cues as data (`{t0, t1}`), never hand-timed CSS keyframes. WebGL: `import * as THREE from 'three'` via an importmap to `./three.module.js` (lf-motion vendors it + jsm addons next to the comp automatically). Render the scene INSIDE `__seek` (synchronous) so every frame is exact.

### 3a. Positioning — viewer-safe lower third
- **Default zone = the lower-third band, horizontally CENTER-WEIGHTED**: y ≈ **62–92%** of height (≈ y 670–990 of 1080). This is where the viewer's eyes already are (on the speaker's face/hands). NEVER default to the top corners.
- **Never cover the face** (center-upper) and **clear the mic/desk** (dead-center bottom). Per video, read the contact sheet: place callouts in the lower-third to the sides-and-center band that sits ABOVE the desk but BELOW the chin. When punched-in (face fills more frame), bias slightly lower/wider.
- 3D hero elements may bloom UP out of the lower-third into mid-frame briefly (a coin burst, a rising 3D number) as long as they resolve back down and never sit static over the face.
- Corners are ONLY for a small persistent chip (e.g. a channel handle) — not primary callouts.

### 3b. Animation vocabulary — choose 2D or 3D to match the meaning
Every moment picks the technique that MATCHES its meaning. Motion math = MONTAGE-CRAFT.md **§15** (overshoot+settle damped osc `out = target + amp·sin(2π·f·t)·e^(−decay·t)`, anticipation 3–6f, follow-through/overlap 2–4f offset, squash-stretch 5–15% volume-preserving, directional motion-blur). Guardrails = **§8** (≥3 depth layers per moment, NEVER reuse one easing across a scene, offset motion 0.1–0.3s off t=0, use weight 300 vs 900 not 400 vs 700).

**3D layer (Three.js — reference code lives in `motion/compositions/`):**
- **Extruded/beveled 3D numbers & words** — `TextGeometry` depth+bevel, per-letter kinetic stagger (rise + `backOut` pop + tip-up), fresnel material, bloom on bevels. Ref: `text-hero.html`. Use for the money figure, "300", big claims.
- **Particle burst / shatter on impact** — a word or object detonates into ~1–2k points with a spark flash, staggered ripple, DOF recede. Ref: `itm-1-shatter.html`, `cc-token-shatter.html`. Fire on the punchline / the number hit.
- **Floating 3D objects** — coins/bills for money, platform tiles (map `web-*.png` as a texture on a rounded plane/box), a folder, a robot — with `orbitCamera()` eased orbit+dolly, `fresnelMaterial()` glowing rim, additive glow sprites (`softDot`), UnrealBloom. Ref: `ai-cortex.html` (bloom/EffectComposer), `mg-core.js` (all primitives).
- **Curl-noise particle streams** — `curlNoise()` advected points flowing into/around a focus. Ref: `mg-core.js`. Use for "autonomous / system" energy.
- **glTF characters** (optional) — `RobotExpressive.glb` via GLTFLoader + AnimationMixer, HDRI + PBR. Ref: `waking-01-awaken.html`. For an "auto-worker" beat.
- Import the shared toolkit: copy `mg-core.js` next to the comp and `import { orbitCamera, fresnelMaterial, softDot, easeOutExpo, backOut, staggerP } from './mg-core.js'`.

**2D layer (DOM/Canvas — richer than v2's flat springs):**
- **Number odometer** — digits roll/tumble to the value (derive from t), not just count. Money/counts.
- **Mask/wipe reveals** — text revealed by a moving gradient mask or clip-path, not a plain fade.
- **Blur + chromatic-aberration entrance** — element resolves from blurred+RGB-split to sharp over ~0.3s.
- **Glassmorphism cards** with an animated gradient/aurora fill behind the glass.
- **Squash-stretch + overshoot** on every entrance (the §15 damped osc), directional motion-blur via a brief `filter: blur()` on the velocity axis.
- **Particle confetti / spark** DOM canvas burst on a beat (cheap 2D complement to the 3D shatter).
- **exit** — scale 0.92 + fade 0.25s; **idle** — ±3–8px sine bob / ±1.5° sway so nothing is ever frozen. NEVER let a graphic overstay >1s past its spoken moment.

### 3c. Example style system (replace with the recipient's brand)
- Card: `background: rgba(10,13,20,0.80); border:1px solid rgba(255,255,255,0.14); border-radius:20px; filter: drop-shadow(0 14px 34px rgba(0,0,0,0.5))`.
- Type: 800–900 weight, uppercase, tight tracking for headlines; accent GRADIENT text for money/numbers.
- Example semantic accents: values = gold `#FFD34D→#FF9A3D` · platforms = authorized brand colors · system/process = cyan `#4DD8FF`/violet `#7C3AED` · warning = red.
- Icons: `web-*.png` as `<img>` (2D) or textures (3D), both with drop-shadow/rim.

**The trigger list (what earns a moment):** every NUMBER → 3D-extruded figure or odometer + burst · every NAMED PLATFORM/PRODUCT → its logo (3D tile when it's a set) · every PROCESS ("drag and drop into a folder") → an animated mini-sequence (objects moving through a flow), not one static icon · every LIST spoken aloud → staggered rows/tiles landing on each word · the PUNCHLINE → a particle shatter or bloom hit.

**Pacing review:** inspect every 3–8 second span for clarity and visual variety, but do not add motion
that competes with the speaker or claim that a particular cadence guarantees retention.

## 4. Preparing external assets

External downloads are optional and require a license, attribution, and trademark review. Save only
approved files under `components/graphics/`, record their source, and inspect transparency on both
light and dark backgrounds before using them.

## 5. Sound design

- Whoosh/pop on every MAJOR motion-layer entrance (not every list item — the sequence gets ONE).
- SFX gain −6 to −10; they accent, never startle.
- Music bed only if a real (non-test) track exists in components; duck under speech (sidechain is wired).

## 6. Verify (buyer's-eye, unchanged + additions)

- Draft → LOOK at every event frame. Specifically check: does each callout land ON its word? Is the face uncovered? Do punch-ins crop well (fx/fy)? Is any 8s+ stretch static?
- All overlay x/y in edit-plan: resolution-relative expressions ONLY (`"W*0.05"`, `"H*0.9-h"`) — absolute pixels are off-frame in the 480p draft.
- Asset-file changes don't bust the stage cache (keys on plan mtime): force `--stage=composite` then `--stage=mux` after re-rendering the motion layer.
- Final gate: `lf-verify --final` PASS + LOOK. Then watch the actual MP4 start-to-end once (open it) before reporting.
