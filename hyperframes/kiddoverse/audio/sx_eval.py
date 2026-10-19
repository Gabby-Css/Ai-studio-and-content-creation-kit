"""Compare candidate vocal renders: ASR words, pitch error vs score, vibrato, and a spectrogram sheet.
usage: python sx_eval.py <meta.json> <song_t0_s> <out.png> <label=wav> [<label=wav> ...]
  each wav starts at song time <song_t0_s>; meta = SoulX target metadata (absolute song times)."""
import json, re, sys, difflib
import numpy as np, soundfile as sf, parselmouth
from scipy.signal import resample_poly
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from faster_whisper import WhisperModel

meta = json.load(open(sys.argv[1], encoding="utf8")); T0 = float(sys.argv[2]); out_png = sys.argv[3]
cands = [a.split("=", 1) for a in sys.argv[4:]]
ref_words = []
notes = []      # (t0, t1, midi) absolute
for s in meta:
    t = s["time"][0] / 1000
    for d, ph, p, ty in zip(s["duration"].split(), s["phoneme"].split(), s["note_pitch"].split(), s["note_type"].split()):
        d = float(d); p = int(p)
        if p > 0: notes.append((t, t + d, p))
        t += d
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
norm = lambda w: re.sub(r"[^a-z']", "", w.lower())
fig, axes = plt.subplots(len(cands), 1, figsize=(14, 3.2 * len(cands)))
axes = np.atleast_1d(axes)
for ax, (label, wav) in zip(axes, cands):
    x, sr = sf.read(wav, dtype="float32")
    if x.ndim == 2: x = x.mean(1)
    x16 = resample_poly(x, 16000, sr) if sr != 16000 else x
    segs, _ = model.transcribe(x16.astype(np.float32), language="en", beam_size=5, condition_on_previous_text=False, vad_filter=False)
    heard = " ".join(s.text.strip() for s in segs)
    # pitch accuracy inside notes (middle 60% of each note, voiced frames)
    snd = parselmouth.Sound(x.astype("float64"), sr); pt = snd.to_pitch(time_step=0.01, pitch_floor=120, pitch_ceiling=1000)
    errs, vib = [], []
    for a, b, m in notes:
        ta, tb = a - T0 + (b - a) * .2, a - T0 + (b - a) * .8
        ts = np.arange(ta, tb, .01)
        f = np.array([pt.get_value_at_time(t) for t in ts], dtype=float); f = f[np.isfinite(f) & (f > 0)]
        if len(f) < 3: continue
        cents = 1200 * np.log2(f / (440 * 2 ** ((m - 69) / 12)))
        errs.append(np.median(cents)); vib.append(np.std(cents))
    errs = np.abs(np.array(errs))
    print(f"[{label}] heard: {heard}")
    print(f"[{label}] pitch |median err| {np.median(errs):.0f} c, notes within 50c: {100 * np.mean(errs < 50):.0f}%, within-note pitch movement (std) {np.median(vib):.0f} c, notes measured {len(errs)}/{len(notes)}")
    # spectrogram
    n = 1024; hop = 256
    S = np.abs(np.array([np.fft.rfft(x[i:i + n] * np.hanning(n)) for i in range(0, len(x) - n, hop)])).T
    S = 20 * np.log10(S + 1e-6); fr = np.fft.rfftfreq(n, 1 / sr); keep = fr < 6000
    ax.imshow(S[keep], origin="lower", aspect="auto", extent=[0, len(x) / sr, 0, 6000], vmin=S.max() - 80, vmax=S.max(), cmap="magma")
    for a, b, m in notes: ax.plot([a - T0, b - T0], [440 * 2 ** ((m - 69) / 12)] * 2, color="cyan", lw=1, alpha=.6)
    ax.set_title(f"{label}: {heard[:90]}", fontsize=9); ax.set_ylabel("Hz")
plt.tight_layout(); plt.savefig(out_png, dpi=80); print("sheet", out_png)
