"""Prompt-conditioned ASR + teacher-forced scoring of rendered sung chunks, to compare pronunciation variants.
usage: python sx_prompted.py VOICE key[:target text] ...      (wav in sx/wav_VOICE/key.wav)"""
import os, re, sys, numpy as np, soundfile as sf
from scipy.signal import resample_poly
from faster_whisper import WhisperModel
HERE = os.path.dirname(os.path.abspath(__file__))
PROMPT = os.environ.get("ASR_PROMPT", "Kids phonics song. A, ah, apple. B, buh, ball. C, cuh, cat. D, duh, dog. E, eh, egg. Counting: one, two, three, four, five. Two-letter words: at, in, on, up, go, no, me.")
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
voice = sys.argv[1]
for arg in sys.argv[2:]:
    k, _, target = arg.partition(":")
    x, sr = sf.read(os.path.join(HERE, "sx", f"wav_{voice}", k + ".wav"), dtype="float32")
    if x.ndim == 2: x = x.mean(1)
    x16 = resample_poly(x, 2, 3).astype(np.float32)
    outs = []
    for pr in (None, PROMPT):
        segs, _ = model.transcribe(x16, language="en", beam_size=5, condition_on_previous_text=False, temperature=0.0, compression_ratio_threshold=None, log_prob_threshold=None, no_speech_threshold=None, initial_prompt=pr)
        outs.append(" ".join(g.text.strip() for g in segs))
    print(f"{k} plain: {outs[0]!r:46s} prompted: {outs[1]!r}", flush=True)
