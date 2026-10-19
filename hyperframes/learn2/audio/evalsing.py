import sys, re, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
import parselmouth
p = sys.argv[1]
y, sr = sf.read(p, dtype="float32")
if y.ndim > 1: y = y.mean(axis=1)
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
sg, _ = m.transcribe(p, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, word_timestamps=True, vad_filter=False)
ws = [(re.sub(r"[^a-z']", "", w.word.lower()), round(w.start, 2)) for s in sg for w in (s.words or [])]
print("ASR:", " ".join(f"{w}@{t}" for w, t in ws))
snd = parselmouth.Sound(p)
pit = snd.to_pitch_ac(time_step=0.01, pitch_floor=75, pitch_ceiling=800)
f = pit.selected_array["frequency"]; v = f > 0
midi = 69 + 12 * np.log2(np.where(v, f, 440) / 440)
print("voiced frames %.0f%%  median f0 %.0f Hz  range midi %.1f..%.1f" % (100 * v.mean(), np.median(f[v]), np.percentile(midi[v], 2), np.percentile(midi[v], 98)))
h = snd.to_harmonicity_cc(time_step=0.01, minimum_pitch=75)
hv = h.values[0]; hv = hv[hv > -100]
print("HNR median %.1f dB (natural singing ~12-20, robotic buzz >25 or <5)" % np.median(hv))
