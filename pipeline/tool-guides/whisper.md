# Whisper — optional transcription

The included `transcribe/whisper-transcribe.py` wrapper requires a separately configured Python/Whisper environment, ffmpeg, and model weights. It is not already installed in a shared research-model environment.

Follow `transcribe/WHISPER-GUIDE.md` from the extracted kit root. Setup and uncached model downloads need network access; hardware, memory use, and throughput depend on your selected environment.

Whisper outputs estimated transcripts and timestamps. Review spelling and alignment; do not assume perfectly timed words or improved retention. The wrapper's subtitle output is segment-based.

Local transcription is separate from optional hosted analysis. If you send the transcript to a configured language model, that provider receives the submitted content and may charge. See `LICENSES.md`.
