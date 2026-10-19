"""Final mix: vocal chain (EQ, compression, reverb) + music ducked under the voice + SFX -> master.wav (-14 LUFS)."""
import numpy as np, soundfile as sf, os, subprocess
from scipy.signal import lfilter, fftconvolve
import song

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
rng = np.random.default_rng(3)
DUR = song.DURATION

def load(name):
    x, sr = sf.read(os.path.join(HERE, name), dtype="float64"); assert sr == SR
    return x if x.ndim == 2 else np.stack([x, x], 1)

def fit(x, n):
    return x[:n] if len(x) >= n else np.pad(x, ((0, n - len(x)), (0, 0)))

def biquad(kind, f0, q=.8, gain=0.0):                      # RBJ cookbook
    A = 10 ** (gain / 40); w = 2 * np.pi * f0 / SR; al = np.sin(w) / (2 * q); c = np.cos(w)
    if kind == "hp": b = [(1 + c) / 2, -(1 + c), (1 + c) / 2]; a = [1 + al, -2 * c, 1 - al]
    elif kind == "peak": b = [1 + al * A, -2 * c, 1 - al * A]; a = [1 + al / A, -2 * c, 1 - al / A]
    elif kind == "hshelf":
        s = 2 * np.sqrt(A) * al; b = [A * ((A + 1) + (A - 1) * c + s), -2 * A * ((A - 1) + (A + 1) * c), A * ((A + 1) + (A - 1) * c - s)]; a = [(A + 1) - (A - 1) * c + s, 2 * ((A - 1) - (A + 1) * c), (A + 1) - (A - 1) * c - s]
    b, a = np.array(b) / a[0], np.array(a) / a[0]; return b, a

def eq(x, bands):
    for k, f, q, g in bands:
        b, a = biquad(k, f, q, g); x = np.stack([lfilter(b, a, x[:, c]) for c in range(x.shape[1])], 1)
    return x

def compress(x, thr_db=-20, ratio=3.2, attack=.006, release=.12, makeup=4.0):
    m = np.max(np.abs(x), 1); fr = int(.005 * SR); nf = len(m) // fr
    rms = np.sqrt(np.mean(m[: nf * fr].reshape(nf, fr) ** 2, 1) + 1e-12); db = 20 * np.log10(rms + 1e-9)
    g = np.where(db > thr_db, -(db - thr_db) * (1 - 1 / ratio), 0.0)
    a, r = np.exp(-.005 / attack), np.exp(-.005 / release); s = np.zeros(nf); cur = 0.0
    for i in range(nf):                                       # attack on gain reduction, release back to 0
        cur = a * cur + (1 - a) * g[i] if g[i] < cur else r * cur + (1 - r) * g[i]; s[i] = cur
    gain = np.repeat(10 ** ((s + makeup) / 20), fr); gain = np.pad(gain, (0, len(m) - len(gain)), mode="edge")
    return x * gain[:, None]

def reverb(x, rt=.7, wet=.12):
    n = int(rt * SR); t = np.arange(n) / SR
    ir = np.stack([rng.standard_normal(n), rng.standard_normal(n)], 1) * np.exp(-t * 6.9 / rt)[:, None]; ir[: int(.012 * SR)] *= np.linspace(0, 1, int(.012 * SR))[:, None]
    ir /= np.sqrt((ir ** 2).sum()) / 5
    out = np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], 1); return x * (1 - wet * .4) + out * wet

def main():
    n = int((DUR + 3) * SR)
    music = fit(load("music_stem.wav"), n); sung = fit(load("vocals_sung.wav"), n); spk = fit(load("vocals_speech.wav"), n)
    sfxp = os.path.join(HERE, "sfx_stem.wav"); sfx = fit(load("sfx_stem.wav"), n) if os.path.exists(sfxp) else np.zeros((n, 2))
    voc_eq = [("hp", 140, .7, 0), ("peak", 420, 1.0, -2.5), ("peak", 3200, .9, 3.5), ("hshelf", 9500, .7, 2.5)]
    sung = reverb(compress(eq(sung, voc_eq), -22, 3.0, makeup=5.0), .8, .13); spk = reverb(compress(eq(spk, voc_eq), -20, 3.0, makeup=4.0), .5, .08)
    voice = sung * 1.0 + spk * 1.1
    # sidechain: music dips under the voice
    mono = np.abs(voice).max(1); a = np.exp(-1 / (.012 * SR)); r = np.exp(-1 / (.28 * SR))
    env = np.maximum(lfilter([1 - r], [1, -r], mono), lfilter([1 - a], [1, -a], mono)); p95 = np.percentile(env[env > 1e-4], 95) if np.any(env > 1e-4) else 1
    duck = 1 - .36 * np.clip(env / p95, 0, 1) ** .7
    mix = music * .78 * duck[:, None] + voice * 1.0 + sfx * .5
    mix = mix[: int(DUR * SR)]
    fi = int(.05 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]; fo = int(2.2 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    mix = np.tanh(mix * .9) / np.tanh(.9)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * .89
    pre = os.path.join(HERE, "premaster.wav"); sf.write(pre, mix.astype(np.float32), SR)
    out = os.path.join(ROOT, "audio", "master.wav"); os.makedirs(os.path.dirname(out), exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", pre, "-af", "loudnorm=I=-14:TP=-1.5:LRA=9,alimiter=limit=0.94", "-ar", "44100", "-ac", "2", out], check=True)
    print("master written", out)

if __name__ == "__main__": main()
