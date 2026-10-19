"""Make a master 'AAC-safe': the video's AAC encoder can overshoot full scale on sharp transients even when the WAV peaks at -1 dBFS.
Round-trips the master through the SAME ffmpeg AAC settings used for the videos, finds decoded samples above CEIL, and applies a
short (~30 ms) raised-cosine gain dip to the master around each one, repeating until the decoded audio stays under CEIL.
usage: python aac_safe.py <in.wav> <out.wav> [ceil=0.97]"""
import os, subprocess, sys, tempfile
import numpy as np, soundfile as sf

src, dst = sys.argv[1], sys.argv[2]; CEIL = float(sys.argv[3]) if len(sys.argv) > 3 else 0.97
x, sr = sf.read(src, dtype="float64"); assert sr == 48000
tmp = tempfile.mkdtemp()

def roundtrip(a):
    sf.write(os.path.join(tmp, "in.wav"), a, sr, subtype="PCM_24")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(tmp, "in.wav"), "-c:a", "aac", "-b:a", "256k", "-ar", "48000", os.path.join(tmp, "t.m4a")], check=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", os.path.join(tmp, "t.m4a"), "-c:a", "pcm_f32le", os.path.join(tmp, "dec.wav")], check=True)
    d, _ = sf.read(os.path.join(tmp, "dec.wav"), dtype="float64")
    return d

L = int(.030 * sr); half = L // 2
for it in range(6):
    d = roundtrip(x); n = min(len(d), len(x))
    pk = np.max(np.abs(d[:n]), 1); over = np.where(pk > CEIL)[0]
    print(f"pass {it}: decoded peak {20 * np.log10(pk.max() + 1e-9):.2f} dBFS, {len(over)} samples over {20 * np.log10(CEIL):.2f} dBFS", flush=True)
    if not len(over): break
    # group nearby overs, dip the master by the needed amount (+1 dB margin) around each group
    groups = np.split(over, np.where(np.diff(over) > half)[0] + 1)
    for g in groups:
        need = 20 * np.log10(CEIL / pk[g].max()) - 1.0                  # negative dB
        c = int(g.mean()); a, b = max(0, c - L), min(len(x), c + L)
        win = .5 * (1 - np.cos(np.linspace(0, 2 * np.pi, b - a)))       # 0 -> 1 -> 0
        x[a:b] *= (10 ** (need / 20)) ** win[:, None] if x.ndim == 2 else (10 ** (need / 20)) ** win
        print(f"   dip {need:.1f} dB at {c / sr:.3f} s", flush=True)
else:
    print("WARNING: still over after 6 passes")
sf.write(dst, x, sr, subtype="PCM_16"); print("wrote", dst)
