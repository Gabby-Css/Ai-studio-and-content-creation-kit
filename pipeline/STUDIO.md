# Video and animation studio — production process

Use this workflow for an authorized video brief. It is guidance, not a background automation or permission to generate, publish, download, or spend. All commands below use the extracted kit root.

## 1. Define the brief and inputs

Record topic, audience, length, aspect ratio, narration, visual approach, output location, and acceptance checks. Supply owned/licensed footage in `longform/inbox/` or another explicitly selected folder. Third-party reference media are omitted; consult `references/ADD-YOUR-OWN-LICENSED-MEDIA.md`.

Study permitted reference material for framing, timing, palette, legibility, and motion principles. Document transferable craft in `pipeline/playbooks/` without implying rights to copy its footage or distinctive assets.

## 2. Plan with the craft library

Read `pipeline/skills/00-CINEMATIC-CHECKLIST.md`, `EDITING-CRAFT.md`, and `pipeline/MONTAGE-CRAFT.md`. The optional authoring helper loads bundled craft notes:

```bash
node pipeline/generators/generate-shot-pack.cjs --concept="Your brief" --shots=6 --aspect=9:16
```

Use `--frames` for first/last-frame prompts, `--pic` for image prompts, or `--character` for character planning. Outputs go under `pipeline/generators/output/`. With a configured model it submits the prepared text to that provider; otherwise it exports a prompt. Provider calls may cost. No private panel, judge, model, or runtime is assumed.

For a complete film, follow `pipeline/cookbooks/ai-film-full-workflow.md`. For graphics over footage, follow `pipeline/cookbooks/motion-graphics-full-workflow.md`.

## 3. Choose the engine

| Need | Included entry or setup guide | Dependencies |
|---|---|---|
| Abstract or custom 3D motion | `motion/html3d-render.cjs` | Browser/Node packages, ffmpeg, authorized assets |
| Text, captions, or data-driven video | `pipeline/generators/remotion/README.md` | Separate Remotion setup and applicable terms |
| Existing-footage edit | `longform/docs/README.md` | Source footage and media tools |
| Unreal scene | `pipeline/UNREAL-SETUP.md` | Separately installed editor and compatible bridge |
| Hosted image/video generation | Prepared shot pack plus your chosen provider | Recipient account, permissions, data-use review, possible charges |

## 4. Prepare narration and render

Use your own audio or configure a voice option using `voice/VOXCPM-GUIDE.md`. The included ElevenLabs callers are hosted operations; they do not use a bundled local TTS model. Run only with authorized credentials and cost approval.

After installing the motion dependencies, inspect a still before a full render:

```bash
node motion/html3d-render.cjs --html motion/compositions/itm-3-ignite.html --still 90 --stillout preview.png
```

Remotion instructions are in `pipeline/generators/remotion/README.md`. The optional `longform/remotion/gen-story-cinematic.cjs` driver can request hosted narration and render on `--execute`; that is not an offline setup check.

## 5. Assemble and verify

Use the long-form assembler or Remotion project to combine visuals, voice, and captions. Review ffmpeg filter/font requirements in `pipeline/tool-guides/ffmpeg.md`. Whisper provides estimated transcription/timing; correct errors before export.

Inspect multiple frames and play the full video. Check motion continuity, crop, text, sources, speech, sync, duration, and ending. Use `pipeline/generators/slideshow-risk.cjs` as a plan heuristic and `pipeline/generators/qa-attention-gate.cjs` for review at selected timestamps, not as proof of audience retention.

## 6. Deliver deliberately

Export to `output/` or the brief's chosen folder, report the path and known limitations, and obtain any required final approval. Publishing is a separate manual action. No historical posting quota, overnight permission, or automatic deployment policy travels with this kit.

Record useful observations as candidate lessons. Compare changes on real work before claiming quality or cost improvements.
