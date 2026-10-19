"""Spectrogram contact sheet of rendered chunks with the score's phoneme boundaries overlaid.
usage: python sx_spec.py out.png voice:key[:title] ...   (wav sx/wav_<voice>/<key>.wav ; segments from sx/<voice>_all.json)"""
import os, sys, json, hashlib, numpy as np, soundfile as sf
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
from scipy.signal import stft
HERE = os.path.dirname(os.path.abspath(__file__))
key = lambda s: hashlib.md5("|".join((s["phoneme"], s["note_pitch"], s["note_type"], s["duration"])).encode()).hexdigest()[:10]
out = sys.argv[1]; items = sys.argv[2:]; n = len(items); cols = 2; rows = (n + 1) // 2
fig, axs = plt.subplots(rows, cols, figsize=(15, 2.7 * rows), squeeze=False); cache = {}
for i, it in enumerate(items):
    voice, k, *t = it.split(":"); title = t[0] if t else k
    if voice not in cache:
        jv = voice if os.path.exists(os.path.join(HERE, "sx", f"{voice}_all.json")) else voice.split("_")[0]     # lead_r1 -> lead_all.json
        cache[voice] = {key(s): s for s in json.load(open(os.path.join(HERE, "sx", f"{jv}_all.json"), encoding="utf8"))}
    s = cache[voice][k]; x, sr = sf.read(os.path.join(HERE, "sx", f"wav_{voice}", k + ".wav"), dtype="float32")
    if x.ndim == 2: x = x.mean(1)
    f, tt, Z = stft(x, fs=sr, nperseg=int(sr * .032), noverlap=int(sr * .032) - int(sr * .004), window="hann")
    S = 20 * np.log10(np.abs(Z) + 1e-6); S -= S.max(); ax = axs[i // cols][i % cols]
    ax.imshow(S, origin="lower", aspect="auto", extent=[tt[0], tt[-1], f[0] / 1000, f[-1] / 1000], vmin=-75, vmax=0, cmap="magma"); ax.set_ylim(0, 10)
    t0 = 0.0
    for d, ph, p in zip(s["duration"].split(), s["phoneme"].split(), s["note_pitch"].split()):
        d = float(d); ax.axvline(t0, color="cyan", lw=.8, ls="--"); ax.text(t0 + .01, 9.3, f"{ph}\n{p}", color="cyan", fontsize=7, va="top"); t0 += d
    ax.set_title(f"{title}   [{k}]", fontsize=9); ax.set_ylabel("kHz", fontsize=7); ax.tick_params(labelsize=7)
plt.tight_layout(); plt.savefig(out, dpi=100); print("saved", out)
