# Whisper transcription — recipient setup

Whisper can transcribe locally after you install a compatible Python environment, the package, ffmpeg, and the required model weights. No preinstalled research-model environment or `tools/` junction is part of this kit.

## Setup

Use an environment appropriate for the upstream Whisper release and your hardware. The included wrapper imports `openai-whisper` and defaults to the `medium` model. Installing packages or fetching uncached weights requires network access; model storage and inference can be substantial. CPU/GPU behavior and performance depend on the actual environment.

After setting up the environment and adding ffmpeg to PATH, run from the extracted kit root:

```bash
python transcribe/whisper-transcribe.py --help
python transcribe/whisper-transcribe.py input.mp4 --out output/transcripts
```

Supply your own existing input file and create/select writable output locations. The wrapper writes TXT, SRT, and JSON transcripts and tracks completed input hashes in `memory/whisper-log.jsonl`. Inspect its options before batch processing.

## Review before using captions

Transcripts and timestamps are estimates, not exact ground truth. Check names, technical terms, language selection, omissions, hallucinations, and timing against the audio. Segment-level subtitles are not automatically precise word-level caption alignment.

Transcription does not predict whether a video will retain viewers. It provides text/timing inputs for editing and optional review tools.

Local inference can keep the media on your machine, but package/model downloads and any separately configured hosted analysis are distinct network steps. `transcribe/learn-from-transcript.cjs` may call your configured language model with transcript content; use its `--prompt-only` mode when you only want an offline prompt export. Read `LICENSES.md` and the terms for the installed software/model.
