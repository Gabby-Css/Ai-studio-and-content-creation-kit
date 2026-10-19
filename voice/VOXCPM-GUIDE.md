# Voiceover options — local VoxCPM or a hosted provider

VoxCPM is an optional external text-to-speech runtime. This kit does not bundle its Python environment, model weights, installation directory, or a configured voice. There is no assumed `tools/` junction or ready-to-run local voice service.

## Local setup

1. Obtain the chosen VoxCPM release and model from its upstream source after reviewing the exact code/model terms.
2. Create a separate Python environment and install the dependencies required by that release.
3. Download the model weights and verify storage, memory, and CPU/GPU compatibility.
4. Follow that release's own generation example, then export audio for the kit's assembly tools.
5. Listen to the result and check pronunciation, pauses, clipping, and duration.

Model downloads require network access. Local inference uses your hardware and compute; speed, languages, voice quality, GPU support, and supported APIs vary by release and configuration. No benchmark or universal zero-cost claim is made here. Use only authorized reference voices and respect consent and likeness rights.

## Included hosted scripts

`voice/gen-vo.cjs` and `voice/gen-story-vo.cjs` call ElevenLabs rather than VoxCPM. They require your own account, `ELEVENLABS_API_KEY`, and authorized voice selection. Provider charges may apply, and narration text is sent to that service.

After configuring the provider and supplying a narration file, the file-based caller is:

```bash
node voice/gen-vo.cjs --in narration.txt --out output/voice.mp3 --voice YOUR_VOICE_ID
```

Run from the extracted kit root. This command makes an external request; do not use it as an offline dependency check. You may instead record your own narration and supply that audio to the assembler.

Pair narration with `transcribe/WHISPER-GUIDE.md` for transcription and `longform/docs/README.md` for assembly. Review `LICENSES.md` before publication.
