"""Objective intelligibility of a mix: extended STOI (ESTOI) of the mix against its own clean voice stem, per song section.
Scale- and EQ-tolerant, deterministic (no ASR wobble); 0..1, higher = voice survives the music/reverb better.
usage: python sx_stoi.py <mix.wav> <clean_voice.wav> [song_t0_of_files=0] [label]
  clean_voice may be several files joined with '+' (they are summed), e.g. vocals_sung.wav+vocals_speech.wav"""
import sys, os
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from math import gcd
from pystoi import stoi
import song

HERE = os.path.dirname(os.path.abspath(__file__))
FS = 16000

def load(path):
    x, sr = sf.read(path if os.path.isabs(path) or os.path.exists(path) else os.path.join(HERE, path), dtype="float64")
    if x.ndim == 2: x = x.mean(1)
    g = gcd(FS, sr); return resample_poly(x, FS // g, sr // g)

def score(mix, ref, label="", t0_off=0.0, quiet=False):
    D = song.build(); n = min(len(mix), len(ref)); mix, ref = mix[:n], ref[:n]
    rows = []
    for sec in D["sections"]:
        a, b = int((sec["t0"] - t0_off) * FS), int((sec["t1"] - t0_off) * FS)
        if a < 0 or b > n or b - a < FS * 2: continue
        if np.sqrt(np.mean(ref[a:b] ** 2)) < 1e-4: continue
        rows.append((sec["kind"], sec["t0"], stoi(ref[a:b], mix[a:b], FS, extended=True)))
    if not quiet:
        for k, t, v in rows: print(f"  {k:7s} t={t:5.0f}s  ESTOI {v:.3f}")
    m = float(np.mean([v for *_, v in rows])) if rows else float("nan")
    print(f"{label or 'mix'}: mean ESTOI {m:.3f} over {len(rows)} sections", flush=True)
    return m

if __name__ == "__main__":
    mixp, refp = sys.argv[1], sys.argv[2]
    off = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
    label = sys.argv[4] if len(sys.argv) > 4 else os.path.basename(mixp)
    refs = [load(p) for p in refp.split("+")]; L = max(len(r) for r in refs)
    ref = sum(np.pad(r, (0, L - len(r))) for r in refs)
    score(load(mixp), ref, label, off)
