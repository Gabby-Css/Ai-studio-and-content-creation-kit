"""Human-singer mix (v3): SoulX-Singer lead + kids' gang (two takes, spread L/R), produced like a kids'-pop record:
clean, bright, up-front lead; gang wide behind it; short plate + quiet 1/8 slap; music carved and ducked under words.
-> audio/master_v3.wav (48 kHz, -14 LUFS).   Old masters (master.wav, master_v2.wav) are left untouched for A/B.
usage: python mix3.py [voice-over-music dB, default 4.5]"""
import numpy as np, soundfile as sf, os, subprocess, sys
from scipy.signal import lfilter, resample_poly, fftconvolve
import song
from mix import load, fit, eq, compress, biquad, SR, HERE, DUR
from mix2 import env_follow, deess, rms_db

VMR = float(sys.argv[1]) if len(sys.argv) > 1 else 4.5
D = song.build()
BEAT = 60 / D["bpm"]
rng = np.random.default_rng(7)

def load_sx(name, n):
    p = os.path.join(HERE, "sx", name)
    if not os.path.exists(p): return None
    x, sr = sf.read(p, dtype="float64")
    if x.ndim == 2: x = x.mean(1)
    if sr != SR: x = resample_poly(x, SR // 300, sr // 300) if sr % 300 == 0 else resample_poly(x, SR, sr)
    x = x[:n] if len(x) >= n else np.pad(x, (0, n - len(x)))
    return x

def filt(x, bands):
    return eq(x[:, None], bands)[:, 0] if x.ndim == 1 else eq(x, bands)

def expander(x, thr_db=-46.0, floor_db=-18.0):
    """soft downward expander: hiss/breath noise between phrases drops up to |floor_db|, singing untouched."""
    e = env_follow(np.abs(x), .002, .12); db = 20 * np.log10(e + 1e-9)
    g_db = np.clip((db - thr_db) * 1.5, floor_db, 0.0)
    return x * 10 ** (g_db / 20)

def air(x, amt_db=-17.0):
    """bandwidth extension: the singer model stops at 12 kHz; regenerate soft 12-16 kHz 'air' from the 5-11 kHz band."""
    b, a = biquad("hp", 5200, .7); band = lfilter(b, a, x)
    k = 4.0 / (np.max(np.abs(band)) + 1e-9); h = np.tanh(band * k) / k
    for _ in range(3): b, a = biquad("hp", 11800, .7); h = lfilter(b, a, h)
    return x + h * 10 ** (amt_db / 20) * 4

def pan(x, p):
    th = (p + 1) * np.pi / 4; return np.stack([x * np.cos(th), x * np.sin(th)], 1)

def plate(x, rt=1.5, wet=.16, pre=.022, lo=320, hi=7000):
    """stereo plate-like reverb send (dense decorrelated noise IR, pre-delay, filtered return)."""
    n = int(rt * SR); t = np.arange(n) / SR
    ir = rng.standard_normal((n, 2)) * np.exp(-t * 6.9 / rt)[:, None]
    ir[: int(.004 * SR)] *= np.linspace(0, 1, int(.004 * SR))[:, None]
    ir = np.pad(ir, ((int(pre * SR), 0), (0, 0)))
    ir /= np.sqrt((ir ** 2).sum(0)) / 4
    src = x if x.ndim == 2 else np.stack([x, x], 1)
    wetsig = np.stack([fftconvolve(src[:, c], ir[:, c])[: len(src)] for c in range(2)], 1)
    return filt(wetsig, [("hp", lo, .7, 0), ("hshelf", hi, .7, -9)]) * wet

def slap(x, t=BEAT / 2, fb=.22, wet=.07):
    """filtered ping-pong eighth-note echo, kept low: adds 'record' sheen without blurring words."""
    d = int(t * SR); src = filt(x, [("hp", 600, .7, 0), ("hshelf", 5000, .7, -8)])
    out = np.zeros((len(x), 2)); tap = src.copy(); side = 0
    for k in range(4):
        tap = np.pad(tap, (d, 0))[: len(x)] * (fb if k else 1.0)
        out[:, side] += tap; side ^= 1
    return out * wet

def main():
    n = int((DUR + 3) * SR)
    music = fit(load("music_stem.wav"), n); spk = fit(load("vocals_speech.wav"), n); sfx = fit(load("sfx_stem.wav"), n)
    lead = load_sx("test_mix/lead.wav", n)
    gangA = load_sx("test_mix/gang.wav", n); gangB = load_sx("gang_sx_b.wav", n)
    if lead is None: sys.exit("missing sx/lead_sx.wav")

    # ---- lead: clean, warm, present, bright, steady
    lead = expander(lead)
    lead = filt(lead, [("hp", 95, .7, 0), ("peak", 280, .9, -2.0), ("peak", 3000, .8, 2.5), ("peak", 5200, 1.2, 1.0), ("hshelf", 9000, .7, 1.5)])
    lead = air(lead)
    lead = deess(np.stack([lead, lead], 1))[:, 0]
    lead = compress(lead[:, None], -24, 3.0, .004, .09, 5.0)[:, 0]
    lead = compress(lead[:, None], -15, 2.0, .02, .35, 1.5)[:, 0]
    lead_st = pan(lead, 0.0)

    # ---- gang: two different takes, wide, a little darker and further back
    gang_st = np.zeros((n, 2))
    if gangA is not None:
        if gangB is None:                                            # second take missing -> ADT copy (18 ms, +8 cents)
            gangB = resample_poly(gangA, 1000, 1005)[:n]; gangB = np.pad(gangB, (int(.018 * SR), 0))[:n]
        for g, p in ((gangA, -.6), (gangB, .6)):
            g = expander(g)
            g = filt(g, [("hp", 160, .7, 0), ("peak", 380, .9, -3.0), ("peak", 3200, .8, 2.0), ("hshelf", 9000, .7, 1.0)])
            g = air(g, -20)
            g = compress(g[:, None], -24, 3.0, .006, .12, 4.0)[:, 0]
            gang_st += pan(g, p)
        lead_rms = rms_db(lead, np.abs(lead) > 1e-3); gang_rms = rms_db(gang_st.mean(1), np.abs(gang_st.mean(1)) > 1e-3)
        gang_st *= 10 ** ((lead_rms - 3.5 - gang_rms) / 20)          # gang sits ~3.5 dB under the lead
        print(f"lead {lead_rms:.1f} dB, gang -> {lead_rms - 3.5:.1f} dB")

    # ---- character speech: same polish as v2
    voc_eq = [("hp", 120, .7, 0), ("peak", 350, .9, -3.0), ("peak", 2800, .8, 3.5), ("hshelf", 10000, .7, 2.0)]
    spk = compress(compress(deess(eq(spk, voc_eq)), -22, 3.5, .004, .09, 5.0), -16, 2.0, .02, .35, 2.0)
    spk = spk / (np.max(np.abs(spk)) + 1e-9) * np.max(np.abs(lead_st)) * 1.05

    dry = lead_st + gang_st
    voice = dry + plate(lead, 1.5, .13) + plate(gang_st.mean(1), 1.8, .2) + slap(lead) + spk + plate(spk.mean(1), .9, .07)

    # ---- music: carve the voice band, duck under words, per-section balance (as v2, gentler now the voice is real)
    music = eq(music, [("hp", 32, .7, 0), ("peak", 1200, .9, -1.5), ("peak", 2900, .7, -4.0), ("peak", 4500, 1.0, -1.5)])
    venv = env_follow(np.abs(dry + spk).max(1), .010, .30)
    p95 = np.percentile(venv[venv > 1e-4], 95)
    music = music * (1 - .42 * np.clip(venv / p95, 0, 1) ** .6)[:, None]
    active = venv > p95 * .18; g = np.ones(n)
    for sec in D["sections"]:
        a, b = int(sec["t0"] * SR), min(n, int(sec["t1"] * SR)); m = active[a:b]
        if m.sum() < SR * .5: continue
        vd = rms_db(voice[a:b].mean(1), m); md = rms_db(music[a:b].mean(1), m)
        gain_db = np.clip(vd - VMR - md, -10, 2); g[a:b] = 10 ** (gain_db / 20)
        print(f"{sec['kind']:7s} voice {vd:6.1f}  music {md:6.1f}  -> music {gain_db:+5.1f} dB")
    k = int(.35 * SR); c = np.cumsum(np.pad(g, (k + 1, k), mode="edge")); g = (c[2 * k + 1:] - c[:-2 * k - 1]) / (2 * k + 1)
    music = music * g[:, None]
    sfx = sfx * (1 - .35 * np.clip(venv / p95, 0, 1))[:, None]

    mix = (music + voice + sfx * .45)[: int(DUR * SR)]
    fi = int(.05 * SR); mix[:fi] *= np.linspace(0, 1, fi)[:, None]; fo = int(2.2 * SR); mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    mix = compress(mix, -14, 1.5, .03, .25, 1.0)
    mix = mix / (np.max(np.abs(mix)) + 1e-9) * .89
    pre = os.path.join(HERE, "sx/test_mix/pre.wav"); sf.write(pre, mix.astype(np.float32), SR)
    sf.write(os.path.join(HERE, "sx/test_mix/dry.wav"), (dry + spk)[: int(DUR * SR)].astype(np.float32), SR)
    out = os.path.join(HERE, "sx/test_mix/master.wav")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", pre, "-af", "loudnorm=I=-14:TP=-1.2:LRA=9,alimiter=limit=0.93:attack=3:release=60",
                    "-ar", "48000", "-ac", "2", out], check=True)
    print("master written", out)

if __name__ == "__main__": main()
