# 🎬 MEGAPROMPT v2 — "How to Upgrade Your AI Agents" (the 0.1%-editor cut)

**The production bible for the flagship all-tools video. v2 (2026-06-24) — revamped from internet-scavenged top-1%/0.1% Unreal + After-Effects + editing craft (sources folded into `MONTAGE-CRAFT.md` §14–17 + `ARSENAL-REFERENCES.md`).** The bar moved: not "looks like $500–800," but **"a human master made this — a virtual cinematographer + a 0.1% MoGraph artist + a film colorist, working together."** Every frame is camera-moved, eased, motion-blurred, synced to the voice, and graded like film. Nothing static, nothing linear, nothing uncorresponded.

Run end-to-end through ``. Read `STACK.md → STUDIO.md → MONTAGE-CRAFT.md (esp. §14–17) → UNREAL-SETUP.md` first. This file is the *application* of that craft to this specific piece.

---

## THE THREE LAWS OF THIS CUT (non-negotiable)
1. **EVERYTHING IS MOVING.** No static frame exists. Even a "hold" gets a 2–5% camera push or a Perlin micro-drift. Linear motion and locked frames are the amateur tell (`MONTAGE-CRAFT §10/§14/§15`).
2. **EVERYTHING CORRESPONDS TO THE VOICE.** Every line of VO has a *literal* visual in the 3D environment that lands on the keyword. The viewer never hears a thing the picture isn't showing. This is the B-ROLL MAP below — it is the spine of the edit (`§16`).
3. **EVERYTHING IS GRADED AS ONE.** Unreal, Hyperframes, Remotion type — all pass through ONE film-emulation chain (AgX → halation → grain → gate-weave → CA → vignette → letterbox) so nothing looks pasted in (`§17`).

---

## NORTH STAR — three visual registers, one grade
1. **Photoreal Unreal 5.8** — a moody neon server-hall; a **robot "agent"** as the subject (real b-roll, walking). Rendered through **Sequencer + Movie Render Queue**, not viewport grabs.
2. **AE-grade FUI tracked to 3D** — holographic labels + scanning HUD + data tags that **lock to world points** (MEMORY · TOOLS · REASONING · AUTONOMY), built element-by-element with a scan-line (Ash Thorp), grid-locked thin 1px strokes (GMUNK), monospace data orbiting the agent (Jayse Hansen).
3. **Abstract Hyperframes / Niagara** — neural-ignition bursts that fire on each "upgrade" beat, audio-reactive.

## SCRIPT (VO — ~22s, deep cinematic narrator; VoxCPM free/local OR ElevenLabs cloned)
1. **(0.0–3.0s, HOOK)** "Your AI agent, out of the box, is basic. It answers. That's it."
2. **(3.0–6.5s)** "But you can upgrade it into something that runs your business while you sleep."
3. **(6.5–10s)** "Give it **memory** — so it never forgets a customer."
4. **(10–13s)** "Give it **tools** — so it actually does the work, not just talks about it."
5. **(13–16s)** "Give it **reasoning** — so it thinks before it acts."
6. **(16–20s)** "Give it **autonomy** — and it runs the whole loop itself, 24/7."
7. **(20–24s, RESOLVE+CTA+LOOP)** "That's not the future. You can build it today." → loops to the basic agent.

Run the VO through the **MONTAGE-CRAFT VO chain** (HPF 80 → cut 500 → boost 2–5k → de-ess → comp 3:1 → limit −1.5dBTP → −14 LUFS). Pause a beat before each capitalized keyword to "bold" it; keep the breaths.

---

## 🎯 THE B-ROLL MAP — what the 3D world SHOWS as each word is said (the spine)
*Mark a locator on every bolded word; the visual lands ~2 frames BEFORE the word (audio-lead reads as synced, `§16`).*

| VO moment | The word | What the Unreal/FUI frame literally shows (synced) | Sync craft |
|---|---|---|---|
| 0.0s hook | "basic… answers. That's it." | Agent stands dim, one cold rim light, head down. A single flat line of text types out and dead-stops. Tracked tag **`AGENT v0 — BASIC`**. | Text dead-stops on "it." — silence holds 0.3s. |
| 3.4s | "**upgrade**" | Hard cut to a violet→cyan Hyperframes ignition converging on the agent's chest; agent's head lifts. | Cut on the transient of "up-". Whoosh leads 15ms. |
| 4.8s | "runs your business **while you sleep**" | Camera cranes up; behind the agent a wall of dim panels flickers awake in sequence (a business running itself). | Panels light on the syllable stresses. |
| 7.2s | "**memory**" | A glowing **memory-bank lattice** ignites on the agent's left; a customer face-card slots in and *stays lit* (never forgets). Tracked label **MEMORY** locks to it with a scan-line build. | Bank lights ON "mem-"; rack-focus pulls fg→the bank. |
| 10.4s | "**tools**" | The agent's hand reaches; holographic **tool-icons** (wrench/terminal/send) materialize and one *executes* (a task bar fills, not just glows). Label **TOOLS**. | Tool icon slams in on "tools" with a sub-bass boom. |
| 13.3s | "**reasoning** — thinks before it acts" | A **branching reasoning-tree** lights node by node above the agent's head; it pauses, then one branch commits (thinks → acts). Label **REASONING**. | Nodes tick to the consonants; a held beat on "thinks." |
| 16.4s | "**autonomy** — runs the whole loop itself, 24/7" | The four modules (memory/tools/reasoning + this) connect into a **closed glowing loop** orbiting the agent; a **clock/ring** spins 24/7. Label **AUTONOMY**. Light goes cold→warm→electric. | The loop closes ON "loop"; emission audio-reactive to the VO. |
| 20.0s | "build it **today**" | Pull back to the fully-upgraded agent glowing, hall fully lit, a slow orbit; title **UPGRADE YOUR AGENTS** kinetic-types in. Music drops to silence ~1.5s at power-on, then hits. | Music silence → boom on the title slam. |
| 23.5s | (loop) | Final frame matches S1 framing exactly; last emission fades to the S1 cold rim → seamless replay. | Loop seam; a 1-frame callback detail rewards the rewatch. |

---

## SHOT LIST — each shot states the 5 aspects + the EXACT camera move, FUI, FX, cut
*(5-Aspect: Subject · Subject-Motion · Scene · Spatial-Framing · Camera. Vary shot length, never 3 the same: 3.4 · 1.4 · 3.0 · 3.2 · 2.7 · 3.6 · 4.0 — breathing.)*

- **S1 HOOK (Unreal, 3.4s).** Subject: dim robot, head down. Motion: a slow breath, head lifts on the last beat. Scene: dark volumetric-fog server-hall, one cold rim light (5600K), 4-level fog. Framing: 2.39:1, agent on a third, deep negative space. **Camera: slow push-in on a Camera Rig Rail, ease-OUT (cubic tangents flattened), aperture breathing f/2.8→f/2.0 as it pushes; Perlin handheld micro-shake (low-freq, tiny amp).** 50mm. Tracked tag `AGENT v0 — BASIC` types on, dead-stops. **Cut: hold the silence, then HARD cut on the "up-" transient.**
- **S2 IGNITION (Hyperframes, 1.4s).** Abstract violet→cyan particle convergence (Niagara/Three.js), 3+ depth layers, sharp glowing elements in fog. Audio-reactive scale on bass. **Hard-cut in; whoosh leads 15ms.** A pattern-interrupt — quick, then back to Unreal.
- **S3–S6 THE FOUR UPGRADES (Unreal + tracked FUI + Niagara micro-burst each).** The agent powers up stage by stage. Each beat: (a) a glowing **module ignites in 3D** at the agent (the literal B-roll above), (b) a **tracked uppercase label** builds with a scan-line and locks to the world point, (c) a **0.3s Niagara neural-burst** punctuates, (d) light builds cold→warm→electric as upgrades stack. **Cameras:** S3 rack-focus fg→memory-bank (85mm, shallow f/1.8); S4 quick dolly-in on the hand + tool execute (35mm); S5 slow crane-up over the reasoning-tree (50mm); S6 begin the orbit as the loop closes (Camera Rig Crane, eased). Every move splined, eased, motion-blurred (180°). **Cuts: J/L cuts across the beats (audio leads 0.5–1s); each module lands ~2 frames before its word.**
- **S7 RESOLVE HERO (Unreal, 4.0s).** Subject: fully-upgraded agent, glowing, all four modules orbiting in the closed loop. Motion: slow majestic orbit + the loop rotating. Scene: hall now fully lit, warm-electric, god-rays through fog. Framing: hero-centered, then settle to S1's composition for the loop. **Camera: slow orbit on a crane, ease-in to a stop; title `UPGRADE YOUR AGENTS` kinetic-types (Remotion) with overshoot-settle.** **Audio: music drops to silence ~1.5s at the power-on, slams back with a sub-bass boom on the title.** Final frame = S1 framing → **seamless LOOP.**

---

## 🎥 CAMERA + MOTION SPEC (apply `MONTAGE-CRAFT §14/§15` literally)
- **Every camera on a Rig Rail or Crane**, never raw transform keys. Tangents = **Cubic/User, flattened** for ease-in/ease-out. **Never Linear.**
- **Perlin-noise CameraShake on EVERY camera** — three named assets: `handheld` (low-freq, small amp), `steadicam` (smaller), `tripod` (≈0). The single biggest "operated by a human" upgrade. Drive a touch off the VO low-end on the hits.
- **Aperture breathing** — open the iris slightly as the camera pushes in (real-lens feel); **Smooth Focus Changes** on; manual focus distance rigged + tracked to the subject.
- **Motion blur everywhere** — UE Motion Blur Amount 0.5 (180° shutter); on graphics/text re-implement as directional blur length `velocity·(0.5/fps)`.
- **Text/FUI motion = overshoot + settle** — value ladder **120 → 90 → 105 → 97.5 → 101.25 → 100**, keys 2–4 frames apart; or the damped-sine `target + v·amp·sin(2π·freq·t)·e^(−decay·t)` (amp 0.1, freq 2, decay 2). Tracking from −10 → 0. Per-letter cascade 1–2 frames. **Overlap** related layers by 2–4 frames.
- **One speed-ramp** — slow-mo into the S6 loop-closing, snap to real-time on the "loop" hit (motion-blurred through the ramp). The most expensive-looking move; use it once.

## 🎨 FINISHING CHAIN (one grade over ALL sources — `§17`)
`render EXR linear (Disable Tone Curve) → AgX/ACES filmic tonemap → teal-orange split (cold→warm color-script across the 22s) → halation (highlights luma>0.65, blur, red→orange, screen back) → film grain (per-frame, ~5% opacity, weighted in mids) → gate-weave (0.2px low-freq drift) → chromatic aberration (radial R/B 1–2px, 0 at center) → vignette (~0.5 radial) → 2.39:1 letterbox (138px bars) → supersample 2× then downscale.` Skin/agent metal never over-saturated. Add 1-frame light-leak at the S6 power-on (human-imperfection). **Audio master −14 LUFS, true-peak −1 dBTP.**

---

## 🛠 TOOL ROUTING — the SPECIFIC assets (from `ARSENAL-REFERENCES.md`)
- **Environment:** **Modular Sci-Fi Corridors and Rooms** (Fab) as the server-hall base + **Electric Dreams** free volumetric-fog setup; light with **William Faucher's** exposure/fog/Lumen recipe. Wide establishing look pulled from **City Sample** wet-neon materials.
- **The robot agent (closes the b-roll gap):** **Sci-Fi Robot Character Pack** (Fab, rigged to Epic skeleton) **retargeted onto the Game Animation Sample** project → instant walking/idle agent, no rigging. Fallback: a free **Sketchfab CC-BY drone/bot**, or the stylized emissive-mesh agent (ships now).
- **Neural-ignition / data-burst beats:** **HOLOGRAM VFX With Niagara** + **Niagara Energy Beam Pack V2**, triggered **in Sequencer (CGHOW method)** on each upgrade beat; data-streams arcing between modules = "agent networking."
- **Tracked FUI:** lock 2D labels to 3D world points by projecting world→screen per frame (capture the actor's screen-space position via Unreal, feed coords to a Remotion/ffmpeg overlay) OR render the label as an in-scene 3D `TextRender`/widget so it tracks for free. Build with a scan-line (never hard cut-in); grid-locked 1px strokes; orbiting monospace data tags.
- **Hyperframes (`html3d-render.cjs`):** the abstract ignition + any pure-abstract beats (3+ depth layers, sharp glowing elements in fog, varied easing).
- **Remotion (`pipeline/generators/remotion`):** kinetic title card + the karaoke-caption layer (word-level from Whisper, active-word glow, hard-kill per group).
- **Voice:** VoxCPM (free/local) primary + ElevenLabs (cloned) alt → the VO chain above.
- **Whisper:** word timings → karaoke captions + the B-roll-map locators.
- **ffmpeg:** assembly per `MONTAGE-CRAFT` — transient-snapped cuts, ≤4 transition types (no banned glitch/RGB/wipe), J/L cuts on the hard transitions, music bed −18dB sidechain-ducked under VO, held silence at the power-on, whoosh-leads-15ms, the finishing chain.
- **TribeV2:** score the cut → fix the dipped seconds → Claude-watch the flagged frames → re-score.

## 📺 MRQ RENDER SETTINGS (so Unreal reads as film, not game — `§14`)
Temporal samples **9–16** (odd: 9/15), **AA override = None** above 8 samples, **Engine Warm Up + Render Warm Up frames** on (Lumen/particles settle), **extend Sequencer tracks 1 frame before** the render range (no pop), output **EXR + Disable Tone Curve** (grade externally), **Game Overrides → Cinematic Quality**. Lumen Hit-Lighting reflections + Virtual Shadow Maps. Manual exposure lock per shot.

## 📚 STUDY BEFORE BUILDING (preview these — `ARSENAL-REFERENCES.md`)
**FUI/look:** Territory Studio *Blade Runner 2049* reel · GMUNK *Oblivion/Tron* · Jayse Hansen *JARVIS HUD* · Ash Thorp *Ghost in the Shell* scan-line builds. **Unreal craft:** William Faucher "make UE cinematic" · CGHOW Niagara-hologram-in-Sequencer · pwnisher montage (match-cut the same agent across escalating states = literally "upgrade"). **The STEAL-THIS / USE-THIS lists in `ARSENAL-REFERENCES.md` map each to our exact shots.**

---

## ✅ QA GATE (run before calling it done — `MONTAGE-CRAFT` QA + §14–17)
Hook text by 0.5s + motion + voice in frame 1 · visual change every 1–3s · pattern-interrupt every 2–4s · never repeat a shot length 3× · **every VO keyword has its synced visual landing ~2 frames early** · ≤4 transitions, zero banned · J/L-cuts on the hard transitions · captions word-synced + hard-killed · VO chain + −14 LUFS · music ducked + held silence at the reveal · **every camera moved + eased + Perlin-shaken + motion-blurred** · **one grade over all sources (AgX→halation→grain→gate-weave→CA→vignette→letterbox)** · ±10% runtime · CTA+LOOP close + a rewatch-callback detail · **TribeV2 ≥ target** then ship.

## OUTPUT
`./output/upgrade-your-ai-agents-{voxcpm|elevenlabs}.mp4` (9:16 and/or 16:9). Score saved next to it.

---

## HONEST NOW-vs-GAP + the build path (§0-PRE)
- **Live now:** Unreal 5.8 via MCP (env/lights/actors/capture), Hyperframes, Remotion, VoxCPM+ElevenLabs, Whisper, ffmpeg, TribeV2, the full craft layer + finishing chain.
- **Gaps to close for the full v2 look (each named, not skipped):** (1) **Sequencer + MRQ camera-move path** — the single biggest jump from "viewport grab" to "film"; build a small UE Python helper the plugin runs, or drive via `execute_script`. (2) **The robot asset in-project** — retarget the Sci-Fi Robot Pack onto Game Animation Sample (above). (3) **World→screen tracking export** for the FUI labels. (4) **The neon server-hall environment** (Modular Sci-Fi Corridors + Electric Dreams fog).
- **The path:** ship a strong **v1** with what's live (stylized/retargeted agent + light-sweep Unreal + Hyperframes bursts + tracked text + VO + karaoke + the FULL craft/finishing chain) — already a 0.1%-grade *edit*. Then add the **Sequencer/MRQ + robot retarget + world→screen tracking** for the **v2** that fully reads as a human master's Unreal+AE piece. Build iteratively; verify each shot from the viewer's seat (render a still, LOOK, iterate) — never ship unseen.

*v2 supersedes v1. The craft this prompt applies lives durably in `MONTAGE-CRAFT.md` §14–17 (so every video inherits it) and the reference pieces/assets live in `ARSENAL-REFERENCES.md`. Internet-scavenged 2026-06-24 from top-1%/0.1% Unreal + AE + editing + color sources.*
