"""Producer pass for the sampled-instrument music: bus balance + EQ, kick-sidechain bounce, risers/impacts/engine,
gentle glue -> audio/music_stem_cm.wav (44.1 kHz stereo; mix3.py takes it via MIX_MUSIC=music_stem_cm.wav).
Knobs (env, dB): CM_BASS -15, CM_DRUMS -3, CM_HARM +5, CM_MEL +4, CM_FX 0  (defaults tuned so the tonal balance matches the reference mix)."""
import os, json, sys
import numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt
import song
from mix import eq, compress, reverb, fit, SR, HERE

D = song.build(); BAR = song.BAR
N = int((D["duration"] + 4) * SR)
rng = np.random.default_rng(21)
STEM = os.environ.get("CM_STEMS") or os.path.join(HERE, "cm_stems")
P = lambda k, d=0.0: float(os.environ.get(k, d))
db = lambda x: 10 ** (x / 20)

def T(d): return np.arange(int(SR * d)) / SR
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], "bp", fs=SR, output="sos"), x)
def lp(x, fc): return sosfilt(butter(2, fc, "lp", fs=SR, output="sos"), x)
def hp(x, fc): return sosfilt(butter(2, fc, "hp", fs=SR, output="sos"), x)

def riser(d):
    t = T(d); k = t / d; n = rng.standard_normal(len(t)); out = np.zeros(len(t))
    for lo, hi, c in [(250, 700, 0), (700, 2000, .3), (2000, 6000, .6), (5000, 12000, .85)]:
        out += bp(n, lo, hi) * np.clip((k - c) / .3, 0, 1) ** 1.5 * (1 - np.clip((k - c - .5) / .3, 0, .6))
    sweep = np.sin(2 * np.pi * np.cumsum(300 + 2500 * k ** 2) / SR) * .12
    return (out * 1.2 + sweep) * k ** 1.4
def impact(d=1.6):
    t = T(d); f = 90 * np.exp(-t * 1.5) + 28
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2) + lp(rng.standard_normal(len(t)), 600) * np.exp(-t * 8) * .5) * .9
def engine(d):
    t = T(d); f = 52 + 6 * np.sin(2 * np.pi * .7 * t); ph = np.cumsum(f) / SR
    s = lp(2 * (ph % 1) - 1, 380) * (.6 + .4 * np.sin(2 * np.pi * 11 * t)) + lp(rng.standard_normal(len(t)), 300) * .25
    return s * np.minimum(1, t / .3)

def load(bus):
    x, sr = sf.read(os.path.join(STEM, bus + ".wav"), dtype="float64"); assert sr == SR
    return fit(x, N)

def place(buf, t, sig, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig)); buf[i:j, 0] += sig[: j - i] * g; buf[i:j, 1] += sig[: j - i] * g

def main():
    drums, bass, harm, mel = load("drums"), load("bass"), load("harm"), load("mel")
    ev = json.load(open(os.environ.get("CM_EVENTS") or os.path.join(HERE, "cm_events.json")))

    # ---- kick envelope from the actual kick events (for the sidechain bounce)
    kenv = np.zeros(N); tk = T(.28)
    for e in ev:
        if e["inst"] == "drums" and e["note"] == 36:
            i = int(e["t"] * SR)
            if i >= N: continue
            seg = np.exp(-tk * 11) * (e["vel"] / 110); n = min(len(seg), N - i); kenv[i:i + n] = np.maximum(kenv[i:i + n], seg[:n])

    # ---- per-bus tone
    bass = eq(bass, [("hp", 38, .7, 0), ("peak", 90, .9, 2.0), ("peak", 280, 1.0, -2.0), ("hshelf", 1500, .7, -6)])
    sat = np.tanh(bass * 3.0) / 3.0                                    # harmonics so the bass is audible on phone speakers
    bass = bass * .6 + sat * 1.4
    drums = eq(drums, [("hp", 35, .7, 0), ("peak", 70, 1.0, 2.5), ("peak", 350, 1.0, -2.0), ("peak", 3500, .9, 1.0), ("hshelf", 9000, .7, -1.5)])
    harm = eq(harm, [("hp", 110, .7, 0), ("peak", 250, .9, -1.5), ("peak", 2800, .8, -1.5), ("hshelf", 7500, .7, 1.0)])
    mel = eq(mel, [("hp", 300, .7, 0), ("peak", 2800, .8, -1.5), ("hshelf", 8000, .7, -1.0)])
    duck = 1 - .26 * kenv
    harm *= duck[:, None]; mel *= (1 - .18 * kenv)[:, None]; bass *= (1 - .32 * kenv)[:, None]

    # ---- fx layer: a riser + impact into the party sections, a quick whoosh into each animal stop, a soft landing for the outro
    fx = np.zeros((N, 2))
    for s in D["sections"]:
        if s["kind"] in ("hook", "midhook", "fin", "dance") and s["t0"] >= 2.0: place(fx, s["t0"] - 2.0, riser(2.0), .55); place(fx, s["t0"], impact(1.5), .55)
        if s["kind"] == "stop": place(fx, s["t0"] - 1.0, riser(1.0), .28)
        if s["kind"] == "game": place(fx, s["t0"] + 3 * BAR - .8, riser(.8), .3)
        if s["kind"] == "outro": place(fx, s["t0"], impact(1.4), .4)

    gb, gd, gh, gm, gf = (db(P("CM_BASS", -15)), db(P("CM_DRUMS", -3)), db(P("CM_HARM", 5)), db(P("CM_MEL", 4)), db(P("CM_FX", 0)))
    m = drums * 1.0 * gd + bass * 1.15 * gb + harm * .95 * gh + mel * 1.25 * gm + fx * .8 * gf
    m = reverb(m, 1.0, .08)                                            # a little shared room glue
    m = compress(m, -20, 2.0, .015, .2, 2.0)
    m = np.tanh(m * .9) / np.tanh(.9)
    out = os.environ.get("CM_OUTFILE") or os.path.join(HERE, "music_stem_cm.wav")
    sf.write(out, (m / (np.max(np.abs(m)) + 1e-9) * .8).astype(np.float32), SR)
    bar = int(BAR * SR); rms = [round(20 * np.log10(np.sqrt(np.mean(m[i * bar:(i + 1) * bar] ** 2)) + 1e-9), 1) for i in range(song.TOTAL_BARS)]
    print("music_stem_cm ok; rms dB per bar (every 4th):", rms[::4])

if __name__ == "__main__":
    main()
