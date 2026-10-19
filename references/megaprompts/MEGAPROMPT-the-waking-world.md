# 🎬 MEGA-PROMPT — "THE WAKING WORLD" (AI & Robotics City Cinematic)

A reusable, engine-agnostic master prompt for an *amazing*, Zootopia-smooth cinematic about an AI/robotics
world where humanoids, AI agents, and people coexist. Drives UE 5.8 (build directive) OR any text-to-video
model (Kling/Veo/Seedance/Sora-class). Authored for the FUSION Video Studio. 9:16 or 16:9, 25–35s.

---

## LOGLINE
At dawn in a city that runs on intelligence, the machines wake with the people — humanoid robots step into the
streets, AI light flows through glass towers, and at a thousand desks humans and synthetic minds work side by side.
One smooth, unbroken glide through a world that is finally, fully awake.

## LOOK & REFERENCES (the quality bar)
- **Smoothness of Zootopia / Pixar**: clean stylized-realism, soft global illumination, rounded forms, zero jitter,
  everything eased. Not gritty — *optimistic, luminous, alive*.
- **Plus Blade Runner 2049 volumetrics + Apple-keynote cleanliness**: deep atmospheric haze, god-rays, glossy floors,
  one or two hero colors on a calm base.
- **Palette**: deep ink-blue/charcoal base; **cyan + violet** AI accents; warm amber for human/desk light (the
  human-vs-AI contrast). ≤2 accents on the base.
- **Lensing**: anamorphic, shallow depth of field, gentle bloom on emissives, subtle film grain, faint chromatic
  aberration at edges. 24fps, 180° shutter (natural motion blur = the "smooth" feel).

## THE WORLD
A sunrise megacity built for minds. Mirror-glass towers with flowing data-light in their facades; wide clean
boulevards with reflective floors; holographic signage in a soft unknown script; floating transit drones tracing
light-trails. Inside ground-floor ateliers: rows of glowing workstations where **humans and AI avatars collaborate**.

## CAST (what moves, and how)
- **Humanoid robots** — graceful, matte-white-and-chrome, soft-jointed; they *walk smoothly* with weight and
  secondary motion (head settle, arm swing), waking and stepping into the street.
- **AI agents** — bodies of flowing cyan/violet light/particles, drifting between people like helpful spirits.
- **People** — at desks, on the move, sipping coffee, gesturing at holo-screens; calm, unhurried.
- **Drones** — small, fast, leaving clean light-trails high above.

## SEQUENCE (beat-by-beat shot list — one continuous, eased glide)
1. **0:00–0:05 — WAKE.** Macro on a dormant humanoid's eye; it ignites cyan. Rack focus out as it lifts its head.
   *Camera:* slow push-in, then ease back.
2. **0:05–0:11 — STREET.** Crane up + glide forward down a boulevard at golden dawn; humanoids step out of alcoves
   and begin to walk; drones streak overhead. *Camera:* smooth dolly + gentle crane, motion-blurred.
3. **0:11–0:18 — THE DESKS.** Glide through a glass atelier: humans and glowing AI avatars working side by side at
   warm-lit workstations, holo-screens blooming. *Camera:* lateral tracking, shallow DoF, foreground bokeh.
4. **0:18–0:24 — THE FLOW.** Tilt up the tower canyon: rivers of data-light climb the facades, transit drones thread
   between towers, the whole city pulsing in sync. *Camera:* sweeping tilt-up + slow orbit.
5. **0:24–0:30 — AWAKE.** Pull back to a hero wide: the city, the walkers, the light — alive together. A single title
   resolves. *Camera:* slow pull-back to lock-off.

## MOTION / ANIMATION PRINCIPLES (the "super smooth" rules)
- Every move **eased** (ease-in-out), never linear; constant velocity only on the camera glide.
- **Overlap + secondary motion** on every character (joints settle after the body stops).
- Camera always in gentle motion (drift/parallax) — no dead frames; one continuous virtual take, no hard cuts.
- 24fps + 180° shutter motion blur; physically-based light; nothing pops on/off (everything fades/eases).

## LIGHTING & COLOR
Golden-hour key (warm sun raking down the boulevard) + cool cyan/violet fill from the city's own AI light +
amber practicals at the desks. Volumetric fog for god-rays and depth. Glossy floor for reflections. Bloom only on
emissives. Cinematic tone-map (ACES), gentle vignette.

## AUDIO / VO (optional, on-brand)
Warm, hopeful VO over a building synth-orchestral bed: *"There was a morning the world stopped sleeping. When the
minds we built woke up — and chose to walk beside us. This is the day everything started working… together."*
SFX: soft servo-whirs, distant city hum, a rising tone on the final pull-back.

## TECHNICAL — UE 5.8 BUILD DIRECTIVE (for the in-engine version)
- **Lumen** GI + reflections ON; **Nanite** on all hero meshes; **Hardware Ray Tracing**/Path Tracer for the final.
- Characters: **MetaHumans** (people) + a rigged humanoid-robot (Fab/Quixel) with **walk/idle anim from the UE5
  mannequin locomotion set or Mixamo**; crowd via a simple spline-follow or MassAI.
- Environment: Quixel **Megascan** surfaces on towers/floor; **City Sample**/`SciFi` kit if available.
- Atmosphere: Exponential Height Fog + **Volumetric Fog ON**, SkyAtmosphere dawn, a low warm DirectionalLight.
- Camera: **CineCameraActor** (28–35mm, f/2.2, focus tracking) animated in a **LevelSequence**; render via
  **Movie Render Queue** (PNG sequence, 1080×1920 or 1920×1080, anti-aliasing 64 spp, motion blur on) → ffmpeg → MP4.
- Post: ACES tone-map, bloom 0.4, subtle grain + vignette, slight chromatic aberration.

## TEXT-TO-VIDEO PROMPT BLOCK (copy-paste for Kling/Veo/Seedance, image-to-video or text-to-video)
> Cinematic 9:16, 24fps, anamorphic, shallow depth of field. A luminous sunrise megacity of mirror-glass towers with
> flowing cyan and violet data-light. Graceful matte-white humanoid robots wake and step smoothly into clean
> reflective boulevards; glowing AI light-beings drift between calm people; inside glass ateliers humans and AI
> avatars work side by side at warm-lit holographic workstations; transit drones trace light-trails high between the
> towers. One continuous, buttery-smooth eased camera glide — push-in on a waking robot's igniting eye, crane up the
> boulevard, track through the desks, tilt up the data-light towers, pull back to a hero wide of the awake city.
> Golden-hour key + cool AI fill, volumetric god-rays, glossy floor reflections, gentle bloom, film grain, Pixar-clean
> stylized realism, optimistic and alive. No jitter, no hard cuts, everything eased.

## NEGATIVE / AVOID
glitchy motion, jitter, hard cuts, ugly faces, extra limbs, text artifacts, oversaturation, harsh shadows, cluttered
frame, dystopian grime (this is *hopeful*).
