# 🎬 SKILL — Local & Cloud Generation
_two lanes to make every shot: cloud AI-gen for photoreal, configured local engines for motion-graphics + kinetic video. Pick per shot. Apply EVERY video._

## The two lanes (decide per shot, not per project)
- **Cloud AI-gen** — when the shot needs photoreal footage, a real-looking person/product, or a look you can't hand-code (skin, fabric, weather, a set). Costs credits, runs on a service.
- **Local generation** — when the shot is abstract motion-graphics, kinetic text/captions, a data-driven overlay, or a stylized 3D backdrop. Runs on your machine after dependency setup. Compute, licensing, asset access, and any optional provider calls must be considered.
- Most finished videos MIX both: photoreal hero shots from the cloud, titles/captions/MG backdrops/transitions from the local engines, assembled with ffmpeg.

## Lane 1 — Cloud AI-gen (images, cinematic frames, video)
- Driver: `pipeline/generators/generate-shot-pack.cjs` — uses the brief and craft notes to draft prompts covering lens, lighting, character consistency, and engine-specific considerations. Review for missing requirements before using a provider.
- Text-to-video shot list (default mode):
  `node pipeline/generators/generate-shot-pack.cjs --concept="..." --shots=6 --aspect=9:16 --realism=hero`
- First-frame / last-frame image-to-video (most controllable motion): add `--frames`.
- Standalone pictures (product shots, character/reference sheets): add `--pic`.
- Reusable character you keep consistent across a whole video: add `--character` to build a character bible first, then reference it in every shot.
- Compare the cost and usefulness of image references and video iterations for the selected provider; an extra reference sheet may help, but savings are not guaranteed.

## Lane 2 — Local generation (recipient setup required)
### Hyperframes — cinematic motion-graphics (Three.js)
- Use for: glowing abstract "AI-looking" backdrops (neural nets, particles, energy cores), animated MG loops, and still cinematic frames — all rendered locally.
- Lives at `pipeline/generators/html3d-render.cjs`; the scenes are `pipeline/generators/compositions/*.html`.
- Render a 6s vertical clip: `node pipeline/generators/html3d-render.cjs --html pipeline/generators/compositions/itm-3-ignite.html --out out.mp4 --fps 30 --dur 6 --w 1080 --h 1920` (run from the extracted kit root).
- **Eyeball a still first**: `node pipeline/generators/html3d-render.cjs --html pipeline/generators/compositions/itm-3-ignite.html --still 90 --stillout f.png` → open `f.png`, confirm the look, THEN commit to the full render.
- Character animation: the scenes can load a rigged GLB with BVH / FBX / Lottie motion (see `compositions/models/`), so a character can walk/gesture in-scene when the renderer and asset formats support the selected animation; verify rights and compatibility.

### Remotion — kinetic-typography, captions, data-driven video (React)
- Use for: headlines that snap/slide on the beat, voiceover-synced captions, counters/charts/stats that animate from real numbers — the pixel-perfect "words and numbers" half of video.
- Lives at `pipeline/generators/remotion/`. Install compatible dependencies and review Remotion terms: `cd pipeline/generators/remotion && npm install`.
- Preview + scrub live: `npx remotion studio`.
- Render a composition (the `id` comes from `src/Root.tsx`): `npx remotion render CostReel out.mp4`, or feed data: `npx remotion render ProductReel out.mp4 --props='{"productName":"Your Product","price":"$XX"}'`.
- Every `src/*Reel.tsx` and `src/scenes/*` is a fill-in-the-blanks template; the reusable blocks are in `src/components/` (KineticCaptions, FitText, AuroraShader).

## Assembly
- Stitch the lanes together with **ffmpeg**: lay cloud footage as B-roll under a Remotion caption pass, drop a Hyperframes MG backdrop behind a title, cut between beats, and mux the voiceover. One timeline, two sources of pixels.

## Pick-fast rules
- Photoreal human/product/place → **Cloud (Lane 1)**.
- Abstract/energy/tech backdrop or animated logo moment → **Hyperframes**.
- Text, captions, counters, or a hundred data-swapped variations → **Remotion**.
- In-scene rigged character motion → **Hyperframes (GLB + BVH/FBX/Lottie)**.
- Always render ONE still/preview before a full render — a flaw in the frame compounds across every frame of the clip.

Authoring uses your configured model or exports prompts; it is not itself a hosted video renderer. Provider requests may submit content externally and cost money. Inspect the final motion and caption alignment. See `LICENSES.md` and `pipeline/00-START-HERE.md`.
