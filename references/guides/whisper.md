# Whisper

**What it is:** A free, local speech-to-text engine that listens to a video's audio and writes out the transcript — every word, with the exact second it was spoken.

## Why it's in the pipeline / what job it does

Whisper is the *opposite* of a voiceover (text-to-speech) tool. Instead of turning text into a voice, it turns a voice back into text. That sounds small, but it unlocks two big things for us:

1. **Perfectly-timed captions.** Because Whisper knows *which* word was said at *which* moment (word-level timestamps), our captions land on the exact word as it's spoken. That word-on-the-beat sync is a real retention trick — viewers stay locked in.
2. **Smarter virality analysis.** Our virality analyser lines up the attention curve against *what is actually being said* each second — so we can see which lines hold people and which lines lose them.

It runs on PyTorch, on your own machine. No cloud, no per-minute fees, no upload.

## Where it lives

Whisper is a separate open-source tool. The easiest setup is to install it into the **TribeV2 virtual environment** (`.venv`) — the two work hand in hand, so sharing one self-contained Python environment means you install Whisper once and it's ready whenever the analyser needs it. (You can also give it its own `.venv` if you prefer.)

## How to use it

The pattern is simple: point Whisper at a finished video (or its audio), and it hands back the transcript plus timestamps. For example — once a clip's voiceover is rendered, Whisper "reads" the audio aloud back into text, and that timestamped text becomes both the on-screen captions and the script the virality analyser studies second-by-second.

In short: render the voice first, then let Whisper transcribe it. Everything downstream (captions, attention scoring) feeds off that transcript.

## Complements

Pairs with the **voiceover/TTS** step (Whisper transcribes what TTS speaks) and the **virality analyser** (which aligns its attention curve to Whisper's word-by-word timeline).
