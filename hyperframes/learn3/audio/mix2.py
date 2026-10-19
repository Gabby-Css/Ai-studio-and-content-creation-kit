"""Clarity mix (v2): vocals forward and steady, music carved + ducked around the voice, per-section auto-balance.
-> audio/master_v2.wav (48 kHz).  Old mix.py / master.wav are left untouched for A/B."""
import numpy as np, soundfile as sf, os, subprocess, sys
from scipy.signal import lfilter
import song
from mix import load, fit, eq, compress, reverb, biquad, SR, HERE, DUR

VMR = float(sys.argv[1]) if len(sys.argv) > 1 else 5.0      # target voice-over-music ratio (dB) where someone sings
D = song.build()

def env_follow(x, att, rel):
    a, r = np.exp(-1 / (att * SR)), np.exp(-1 / (rel * SR))
    return np.maximum(lfilter([1 - r], [1, -r], x), lfilter([1 - a], [1, -a], x))

def deess(x, f=5800, thr_db=-34.0, ratio=4.0):
    """split-band de-esser: only the band above f is turned down when it gets loud."""
    b, a = biquad("hp", f, .7)
    hi = np.stack([lfilter(b, a, x[:, c]) for c in range(2)], 1)
    e = env_follow(np.abs(hi).max(1), .001, .045); db = 20 * np.log10(e + 1e-9)
    red = np.where(db > thr_db, (db - thr_db) * (1 - 1 / ratio), 0.0)
    g = 10 ** (-red / 20)
    return x - hi * (1 - g)[:, None]

def cvr(x, boost_db=5.0, floor_db=-50.0):
    """consonant-vowel-ratio enhancement: frames dominated by 2-8 kHz energy (consonants: v, f, h, b-release, t, k...)
    get up to +boost_db, so short consonants survive under music. (hearing-aid style intelligibility trick)"""
    m = x.mean(1); hop = int(.005 * SR); nf = len(m) // hop
    b1, a1 = biquad("hp", 2000, .7); hf = lfilter(b1, a1, m)
    e_all = np.sqrt(np.mean(m[: nf * hop].reshape(nf, hop) ** 2, 1) + 1e-12)
    e_hf = np.sqrt(np.mean(hf[: nf * hop].reshape(nf, hop) ** 2, 1) + 1e-12)
    ratio = e_hf / e_all; lvl = 20 * np.log10(e_all + 1e-9)
    w = np.clip((ratio - .35) / .35, 0, 1) * (lvl > floor_db)           # 0..1 "how consonant-like"
    w = np.convolve(w, np.ones(3) / 3, mode="same")                         # 15 ms smoothing
    g = np.repeat(10 ** (boost_db * w / 20), hop); g = np.pad(g, (0, len(m) - len(g)), mode="edge")
    return x * g[:, None]

def rms_db(x, m=None):
    y = x if m is None else x[m]
    return 20 * np.log10(np.sqrt(np.mean(y ** 2)) + 1e-9) if len(y) else -120.0

def main():
    n = int((DUR + 3) * SR)
    music = fit(load("music_stem.wav"), n); sung = fit(load("vocals_sung.wav"), n); spk = fit(load("vocals_speech.wav"), n)
    sfx = fit(load("sfx_stem.wav"), n)

    # ---- vocal chain: clean lows, less boxiness, strong presence, de-ess, two-stage levelling, short dry-ish room
    voc_eq = [("hp", 120, .7, 0), ("peak", 350, .9, -3.0), ("peak", 2800, .8, 4.5), ("peak", 5200, 1.2, 1.5), ("hshelf", 10000, .7, 2.0)]
    CV = float(sys.argv[2]) if len(sys.argv) > 2 else 0.0      # consonant boost tested: +5 dB scored lower (82% vs 85%), so off
    if CV: sung = cvr(sung, CV); spk = cvr(spk, CV * .6)
    sung = eq(sung, voc_eq); spk = eq(spk, voc_eq)
    sung = deess(sung); spk = deess(spk)
    sung = compress(compress(sung, -24, 3.5, .004, .09, 6.0), -16, 2.0, .02, .35, 2.0)
    spk = compress(compress(spk, -22, 3.5, .004, .09, 5.0), -16, 2.0, .02, .35, 2.0)
    sung = reverb(sung, .6, .07); spk = reverb(spk, .4, .04)
    voice = sung + spk * 1.15

    # ---- music: rumble cut + permanent pocket where speech intelligibility lives, then dynamic ducking under the voice
    music = eq(music, [("hp", 32, .7, 0), ("peak", 1200, .9, -2.0), ("peak", 2800, .7, -4.5), ("peak", 4500, 1.0, -2.0)])
    venv = env_follow(np.abs(voice).max(1), .010, .30)
    p95 = np.percentile(venv[venv > 1e-4], 95)
    duck = 1 - .50 * np.clip(venv / p95, 0, 1) ** .6               # up to ~-6 dB while singing
    music = music * duck[:, None]

    # ---- per-section auto-balance: music gain so voice sits VMR dB above it where the voice is active
    active = venv > p95 * .18
    g = np.ones(n)
    for sec in D["sections"]:
        a, b = int(sec["t0"] * SR), min(n, int(sec["t1"] * SR)); m = active[a:b]
        if m.sum() < SR * .5: continue
        vd = rms_db(voice[a:b].mean(1), m); md = rms_db(music[a:b].mean(1), m)
        want = vd - VMR; gain_db = np.clip(want - md, -10, 2)
        g[a:b] = 10 ** (gain_db / 20)
        print(f"{sec['kind']:7s} voice {vd:6.1f}  music {md:6.1f}  -> music gain {gain_db:+5.1f} dB")
    k = int(.35 * SR); c = np.cumsum(np.pad(g, (k + 1, k), mode="edge")); g = (c[2 * k + 1:] - c[:-2 * k - 1]) / (2 * k + 1)   # smooth section changes (running mean)
    music = music * g[:, None]

    sfx = sfx * (1 - .35 * np.clip(venv / p95, 0, 1))[:, None]       # sound effects step back under words too
    mix = music + voice + sfx * .45
    mix = mix[: int(DUR * SR)]
    fi = int(.05 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]; fo = int(2.2 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    mix = compress(mix, -14, 1.6, .03, .25, 1.0)                      # gentle glue
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * .89
    pre = os.path.join(HERE, "premaster_v2.wav"); sf.write(pre, mix.astype(np.float32), SR)
    out = os.path.join(HERE, "master_v2.wav")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", pre, "-af", "loudnorm=I=-13:TP=-1.2:LRA=8,alimiter=limit=0.93:attack=3:release=60", "-ar", "48000", "-ac", "2", out], check=True)
    print("master written", out)

if __name__ == "__main__": main()
