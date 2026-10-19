"""Word-recognition score on a 'reel' of the hardest sections of a full-song master, averaged over two decode offsets
(Whisper results wobble with where its 30 s windows fall).   usage: python sx_reel.py <label=master.wav> [...]"""
import sys, re, difflib
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from faster_whisper import WhisperModel
import song

D = song.build()
SEGS = [(24, 40), (72, 88), (104, 120), (136, 152), (152, 168), (168, 184)]
GAP = 1.0
norm = lambda s: re.sub(r"[^a-z']", "", s.lower())
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=3)

def ref_words(a, b):
    return [r for r in (norm(x["disp"]) for ln in D["lines"] if ln["voice"] == "lead" and a <= ln["t0"] < b
                        for w in ln["words"] for x in (w.get("subs") or [w])) if r]

def reel(x, sr, lead_in):
    parts, marks, t = [np.zeros((int(lead_in * sr), 2))], [], lead_in
    for a, b in SEGS:
        seg = x[int(a * sr): int(b * sr)]; marks.append((t, t + (b - a))); parts.append(seg); parts.append(np.zeros((int(GAP * sr), 2)))
        t += (b - a) + GAP
    return np.concatenate(parts), marks

for arg in sys.argv[1:]:
    label, path = arg.split("=", 1)
    x, sr = sf.read(path, dtype="float32")
    if x.ndim == 1: x = np.stack([x, x], 1)
    hit = tot = 0; per = np.zeros(len(SEGS)); cnt = np.zeros(len(SEGS))
    for lead_in in (0.0, 11.0):
        y, marks = reel(x, sr, lead_in)
        if sr % 16000: raise SystemExit("master must be a multiple of 16 kHz (use the 48 kHz master)")
        y16 = np.ascontiguousarray(resample_poly(y.mean(1), 1, sr // 16000), dtype=np.float32)   # anti-aliased 16 kHz for Whisper
        segs, _ = model.transcribe(y16, language="en", word_timestamps=True, beam_size=5, condition_on_previous_text=False, vad_filter=False,
                                   temperature=0.0, compression_ratio_threshold=None, log_prob_threshold=None, no_speech_threshold=None)
        words = [(w.start, norm(w.word)) for s in segs for w in s.words if norm(w.word)]
        for i, ((a, b), (m0, m1)) in enumerate(zip(SEGS, marks)):
            ref = ref_words(a, b); hyp = [w for t, w in words if m0 - .3 <= t < m1 + .2]
            h = sum(bl.size for bl in difflib.SequenceMatcher(None, ref, hyp).get_matching_blocks())
            hit += h; tot += len(ref); per[i] += h; cnt[i] += len(ref)
    print(f"{label:10s} {100 * hit / tot:3.0f}%   per segment: " + "  ".join(f"{a}s:{100 * p / c:.0f}%" for (a, _), p, c in zip(SEGS, per, cnt)), flush=True)
