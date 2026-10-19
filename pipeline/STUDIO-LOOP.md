# Video Studio iteration loop

Use this checklist to take one video from a brief to a reviewed export. It is a workflow document;
it does not install a scheduler or start background work. Choose a time and compute budget for
any automation you configure in your own environment.

Run commands from the extracted kit root. Start with `pipeline/00-START-HERE.md` and
`pipeline/STUDIO-ROUTER.md` to choose the relevant tools.

## Produce the video

1. **Brief.** Define the audience, hook, outcome, duration and delivery format.
2. **Script.** Write narration and map each beat to a visual that supports its meaning.
3. **Voiceover.** Use `voice/gen-vo.cjs` with your configured provider, or follow
   `voice/VOXCPM-GUIDE.md` for optional local voice setup. Provider charges may apply.
4. **Timing.** Use `transcribe/whisper-transcribe.py` to obtain transcript timing. For footage
   edits, `longform/bin/lf-dissect.cjs` prepares transcript, silence, scene and frame artifacts.
5. **Visuals.** Choose the engine per beat:
   - Local motion: `motion/html3d-render.cjs` and `motion/compositions/`.
   - Kinetic text and captions: `pipeline/generators/remotion/`.
   - Shot prompts: `pipeline/generators/generate-shot-pack.cjs`; use your own model or prompt-export mode.
   - Unreal: `pipeline/bin/unreal.cjs` after following `pipeline/UNREAL-SETUP.md` in your own editor.
   - Reusable assets: `assets/` and the licensing notes in `LICENSES.md`.
6. **Assemble.** Follow `longform/docs/README.md` for a footage edit, or
   `pipeline/generators/remotion/README.md` for a composition. Keep narration, captions and visual beats aligned.
7. **Review.** Inspect representative stills, then the full draft. Check safe areas, legibility,
   face visibility, timing, audio levels and whether each visual supports the spoken point.
8. **Verify.** For longform output, run `node longform/bin/lf-verify.cjs <slug> --draft`,
   correct failures, and verify the final render before delivery. Optional attention scoring is
   advisory; see `pipeline/tool-guides/tribev2.md` and `LICENSES.md` for separate installation and limits.
9. **Deliver.** Save the final file and review evidence under `output/` or `longform/output/`.
   Publish through your own account when authorized.

## Review one iteration

- Record the active video, current artifact paths, checks run, failures found and the next useful step.
- Fix the weakest observed beat before adding more effects or producing another variant.
- Record a verified reusable craft rule in `pipeline/VIDEO-CRAFT-LEARNED.md` or a focused
  `pipeline/playbooks/` file. Keep hypotheses distinct from measured results.
- To study a transcript, run `node transcribe/learn-from-transcript.cjs <transcript.txt> --prompt-only`.
  Review the exported prompt and resulting digest, then import it with `--digest=<reviewed.md>`.
  The learner records ingestion; it does not train model weights or prove performance improvement.
- Re-run the checks affected by an edit. A completed render is not sufficient evidence of a good video.

## Handoff note

```text
Video: <name and brief>
Current files: <script, inputs, edit plan, latest draft>
Checks: <commands and observed results>
Open issues: <specific timestamps or frames>
Next step: <one bounded action>
Reusable lesson: <verified finding, or hypothesis awaiting evidence>
```

The tool command references are in `pipeline/tool-guides/`. Optional external editors, models and
accounts must be configured by the recipient; this kit includes no private workspace services.
