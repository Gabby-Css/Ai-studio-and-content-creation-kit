# AI Video Studio Kit — start here

This package contains source tools, examples, and workflow guidance. Optional applications, Python environments, model weights, accounts, and reference media must be supplied separately. Commands below use the extracted kit root as the working directory.

## 1. Check setup

Inspect and run the appropriate setup script:

```bash
# macOS / Linux
./setup.sh

# Windows
setup.bat

# Report dependencies after setup:
npm run check
```

Setup may download packages and browser components. The check reports detected tools; it does not install every optional engine, certify a complete render, or configure providers. Python is needed for transcription and optional local models. Unreal and Resolve have separate application requirements. Follow the guide for the lane you choose.

## 2. Choose a workflow

| Brief | Read |
|---|---|
| New HeyGen HyperFrames HTML/CSS/GSAP composition | `hyperframes/README.md` — optional separate npm ci installation |
| Motion graphics, captions, lower-thirds, or graphics over footage | `pipeline/cookbooks/motion-graphics-full-workflow.md` |
| Generated cinematic scenes and connected shots | `pipeline/cookbooks/ai-film-full-workflow.md` |
| Existing long-form footage to edit | `longform/docs/README.md` |
| Long video to short clips | `clipper/README.md` |
| Mixed or uncertain brief | `pipeline/STUDIO-ROUTER.md` |

Read `EDITING-CRAFT.md` and `pipeline/MONTAGE-CRAFT.md` before editing. Written reference analysis in `references/motion-graphics/reference-library.md` can help select a visual system; it does not mean the source footage is bundled.

## 3. Find the tools

| Location | Purpose and setup guide |
|---|---|
| `hyperframes/` | HeyGen HyperFrames 0.8.40 / GSAP 3.13.0 — `hyperframes/README.md` |
| `motion/` | Preserved legacy HTML/Three.js renderer — `pipeline/STUDIO.md`; not the HeyGen runtime |
| `longform/bin/` | Scan, dissect, assemble, and verify — `longform/docs/README.md` |
| `pipeline/generators/remotion/` | React video compositions — its `README.md` |
| `voice/` | Hosted voice scripts plus optional local setup — `voice/VOXCPM-GUIDE.md` |
| `transcribe/` | Whisper wrapper and transcript learning — `transcribe/WHISPER-GUIDE.md` |
| `clipper/` | Short-form editing CLI — `clipper/README.md` |
| `resolve/` | External editor bridge — `resolve/README.md` |
| `pipeline/unreal/` | External Unreal adapters — `pipeline/UNREAL-SETUP.md` |
| `pipeline/generators/` | Shot-pack authoring, diagnosis, and QA helpers |
| `pipeline/bin/` | Additional tools and compatibility entrypoints |
| `shotcraft/` | Shot-design recipes and template — `shotcraft/SKILL.md` |

`pipeline/skills/` holds craft cards, `pipeline/cookbooks/` holds complete workflows, and `pipeline/playbooks/` holds examples. Optional agent instructions live under `.claude/`; using those with a hosted agent can send supplied context to that provider.

## 4. Supply inputs and check rights

Third-party reference footage, reference thumbnail images, and reference plates are omitted. The notes under `references/` and `ctr/docs/` remain as written study material. Add owned or appropriately licensed input files and retain source/permission records; see `references/ADD-YOUR-OWN-LICENSED-MEDIA.md`.

`assets/00-INDEX.json` describes asset sources, and `assets/arsenal-fetch.cjs` can fetch additional assets when deliberately invoked. An index entry is not proof the asset is included or that every proposed use is authorized. Check `LICENSES.md` and the relevant source terms.

Use `longform/inbox/` for your source footage. `output/` and `memory/` are working folders, empty initially or created by tools. `templates/` contains guidance, not guaranteed pre-rendered outputs.

## 5. Produce and review one sample

1. Write the brief and narration; choose the workflow and dependencies.
2. Record your own voice or configure a local/hosted voice option.
3. Build visuals using your supplied assets or configured generation provider.
4. Assemble and transcribe; manually check speech, spelling, timing, crops, and transitions.
5. Review the result directly. `pipeline/generators/slideshow-risk.cjs` offers a motion heuristic; `pipeline/generators/qa-attention-gate.cjs` can work from manually chosen weak timestamps and optionally a configured language model.
6. Revise and compare the exports. A heuristic or research-model score does not establish improved real-world retention.

## 6. Understand external setup and cost

Local engines still require compatible dependencies, compute, downloads, and storage. Hosted language models and generation providers require your own account/configuration, receive the data their calls submit, and may charge. No installation state, setup duration, hardware performance, zero-cost outcome, or privacy guarantee is inherited from this package.

TRIBE-style research scoring is optional: its runtime, weights, and web app are not bundled or automatically installed. Obtain it separately only after checking its terms and permitted use. See `pipeline/tool-guides/tribev2.md`.

The YouTube CTR Arena is separate; this kit retains thumbnail craft notes only. `APP-CONCEPT.md` describes a proposed app, not an installed one-click shell. See `LICENSES.md` before commercial use or redistribution.
