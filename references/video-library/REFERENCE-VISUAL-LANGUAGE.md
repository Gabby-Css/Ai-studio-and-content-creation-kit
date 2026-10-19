# Reference Visual Language — learned from `assets/motion/video references/`

your directive (2026-07-17): *"These are really nice references of visuals. Put them in your arsenal and use the asset folder to really learn and implement. This is the pipeline you have to use: cookbook → skills → references → videos we transcribe."* Study these before authoring any longform motion layer; match this craft level.

## The 7 references
- **`videoplayback.mp4`** (5.4 min) + **`videoplayback (1).mp4`** (10.2 min) — the "Nate / AIS" GPT-5.6-Soul explainer (transcript captured in session 2026-07-17). The gold-standard **editorial tech-explainer** style + the production method (Codex/agent → ElevenLabs voice → HeyGen avatar → **Hyperframes** render → adversarial QA of frames).
- **`3.mp4` `4.mp4` `5.mp4` `6.mp4` `7.mp4`** (6–20s verticals) — short before/after + effect references (warm cinematic grade, neon outline icons, illustrated characters, app-badge reveals).

## The style, distilled (what makes it read "premium / designed")
1. **Editorial minimalism, ONE accent.** Near-monochrome (black / white / gray), one data accent (green) + one emphasis accent (cyan). Massive negative space. Nothing decorative — every graphic maps to a spoken phrase.
2. **Typographic data cards, not stickers.** The vocabulary is: big bold sans headline ("The numbers moved.") + a real **data viz** — benchmark **bars** (SOL ULTRA 91.9 vs GPT-5 85.6, green fill), a vertical **timeline** (JUN 26 → JUL 09, thin connector + node dots), huge **stat number** ("97%" + 7/5/1 win/tie/loss cells), labeled **slider/lane rows** (Timing · Layout · Facts · Avatar presence with dots on tracks).
3. **Eyebrow labels.** Tiny tracked-caps section markers with a leading bullet: `• OFFICIAL REPORTED SCORES`, `• MOTION ENGINE CONTROL`, `• INDEPENDENT ADVERSARIAL QA`. Persistent corner tags: `SMALL LOCAL CHECK`, `GPT-5.6-SOL · ULTRA`.
4. **Glassmorphic glowing UI (the depth layer).** Rounded glass cards with a soft glowing border + icon + label, connected by **dashed connector lines** into node graphs ("Auditing team" / "Time-consuming tasks" wired to a hub); comparison pills ("AI Users" ▲green vs "Non-Users" ▼red diamond icons); alert **toasts** (warning triangle + red ✕ "Automating Annoyances"). This is where 3D-ish depth belongs — subtle, on UI, not photoreal scenes.
5. **Avatar-integrated, never covered.** The talking head is **shifted** (or briefly replaced by a full-frame cutaway — article screenshot with a yellow **highlight** on the key phrase; real b-roll; an abstract glowing intro) and the cards fill the freed space. He stays visible through the edit; graphics enter beside him, not over his face.
6. **Before/after grade (the verticals).** Plain flat clip → warm cinematic red/orange grade + neon **outline** line-icons (phone/laptop/controller) + illustrated character + brand app-badge. Shows the "level-up" the motion layer buys.
7. **Motion = the craft (§ motion-editor).** Everything eases (spline in/out), staggers, motion-blurs, and **exits before it overstays**. Cuts map to the exact phrase that triggers them.

## The pipeline (use it — do not free-style)
`pipeline/cookbooks/` (recipes) → `.claude/skills/` (motion-editor, thumbnail-intelligence — the judgment) → **these references** (the look) → transcribe long tutorials (`transcribe/whisper-transcribe.py` / `transcribe/learn-from-transcript.cjs`; or reuse a pasted transcript) → author the comp in **Remotion** (`pipeline/generators/remotion/`, `@remotion/motion-blur`, `spring()/interpolate()`) or **Hyperframes** (`motion/`, `__seek(t)`) → render (`lf-motion.cjs`) → **adversarial frame QA** (inspect rendered frames for off-frame text / avatar drops / claim errors) → fix → ship.

## Higgsfield vs Remotion/Hyperframes — which engine per beat
- **Remotion / Hyperframes** = the DEFAULT for this style. Clean typographic cards, data viz, glassmorphic UI, kinetic type, slider/timeline/bar/toast components — all vector, crisp at any scale, deterministic, editable. This is what the references are built in.
- **Higgsfield** = reserve for a **photoreal / impossible hero moment** (the folder-erupting-clips scene, a money storm) that vector can't fake — then composite the crisp Remotion text/logos on top. Not for UI, cards, logos, or text (it garbles them).
- Proven this session: the Higgsfield folder→4-phones distribution (`work/long-form-intro-a-iaedit/comps/_platforms3d/PLATFORMS-3D.mp4`) is a good photoreal hero; the editorial CARDS around it should be Remotion.
