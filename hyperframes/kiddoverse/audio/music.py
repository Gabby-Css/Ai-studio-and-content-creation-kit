"""KiddoVerse music engine — everything synthesized from scratch (original, royalty-free)."""
import numpy as np, functools, os, wave
from scipy.signal import lfilter, butter, sosfilt, fftconvolve
import song

SR = 44100
rng = np.random.default_rng(11)
D = song.build()
BAR, EIGHTH = song.BAR, song.EIGHTH
N = int((D["duration"] + 4) * SR)

def T(d): return np.arange(int(SR * d)) / SR
def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def _sos(kind, fc): return butter(2, fc, kind, fs=SR, output="sos")
def hp(x, fc): return sosfilt(_sos("hp", fc), x)
def lp(x, fc): return sosfilt(_sos("lp", fc), x)
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], "bp", fs=SR, output="sos"), x)
def fade(x, a=0.002, r=0.01):
    n = len(x); x = x.copy()
    na, nr = int(a * SR), int(r * SR)
    if na: x[:na] *= np.linspace(0, 1, na)
    if nr: x[-nr:] *= np.linspace(1, 0, nr)
    return x

# ------------------------------------------------------------------ instruments (cached by pitch)
@functools.lru_cache(maxsize=None)
def pluck(m, d=1.0):                       # Karplus-Strong guitar/ukulele pluck
    f = mtof(m); n = int(SR / f); L = int(SR * d)
    x = np.zeros(L); x[:n] = lp(rng.standard_normal(n), 5200) * 1.4
    a = np.zeros(n + 2); a[0] = 1; a[n] = -0.5 * 0.992; a[n + 1] = -0.5 * 0.992
    y = lfilter([1.0], a, x)
    return fade(y / (np.max(np.abs(y)) + 1e-9) * np.exp(-T(d) * 2.2), 0.001, 0.05)

@functools.lru_cache(maxsize=None)
def marimba(m, d=0.55):
    f = mtof(m); t = T(d)
    s = np.sin(2*np.pi*f*t)*np.exp(-t*7) + .45*np.sin(2*np.pi*4*f*t)*np.exp(-t*22) + .16*np.sin(2*np.pi*9.2*f*t)*np.exp(-t*55)
    return fade(s, 0.001, 0.03)

@functools.lru_cache(maxsize=None)
def glock(m, d=1.1):
    f = mtof(m); t = T(d)
    s = sum(a*np.sin(2*np.pi*f*r*t)*np.exp(-t*k) for r, a, k in [(1, 1, 3.2), (2.76, .5, 5), (5.4, .26, 8), (8.93, .12, 13)])
    return fade(s * 0.7, 0.001, 0.05)

@functools.lru_cache(maxsize=None)
def bass(m, d=0.5):
    f = mtof(m); t = T(d)
    s = np.sin(2*np.pi*f*t) + .32*np.sin(4*np.pi*f*t)*np.exp(-t*6) + .12*np.sin(6*np.pi*f*t)*np.exp(-t*9)
    s = np.tanh(s * 1.3) * np.minimum(1, t / 0.006) * np.exp(-np.maximum(0, t - d * .6) * 9)
    return fade(s * 0.8, 0.003, 0.03)

@functools.lru_cache(maxsize=None)
def tuba(m, d=0.45):                       # comedic sousaphone-ish bass for dinos
    f = mtof(m); t = T(d); ph = (f * t) % 1
    s = lp(2 * ph - 1, 520) * 1.6 + np.sin(2*np.pi*f*t) * .5
    return fade(np.tanh(s) * np.exp(-np.maximum(0, t - .15) * 6), 0.01, 0.04)

@functools.lru_cache(maxsize=None)
def flute(m, d=0.6):
    f = mtof(m); t = T(d)
    vib = 1 + .006 * np.sin(2*np.pi*5.2*t) * np.minimum(1, t / .25)
    s = np.sin(2*np.pi*f*t*vib) + .18*np.sin(4*np.pi*f*t*vib) + .1*bp(rng.standard_normal(len(t)), f, f*3) * .6
    env = np.minimum(1, t / .07) * np.exp(-np.maximum(0, t - d*.55) * 5)
    return fade(s * env * .7, 0.004, 0.06)

@functools.lru_cache(maxsize=None)
def pulse(m, d=0.2, duty=.25):             # chiptune
    f = mtof(m); t = T(d)
    s = (((f * t) % 1) < duty) * 2.0 - 1.0
    return fade(lp(s, 5200) * np.exp(-t * 9) * .55, 0.001, 0.02)

@functools.lru_cache(maxsize=None)
def saw_bass(m, d=0.3):
    f = mtof(m); t = T(d); s = lp(2 * ((f * t) % 1) - 1, 900)
    return fade(np.tanh(s * 1.6) * np.exp(-t * 7) * .8, 0.002, 0.02)

def pad_notes(ms, d, bright=1800):
    t = T(d + .6); out = np.zeros(len(t))
    for m in ms:
        f = mtof(m)
        for c in (-8, 0, 8):
            out += 2 * (((f * 2 ** (c / 1200)) * t) % 1) - 1
    out = lp(out, bright) / (len(ms) * 3)
    env = np.minimum(1, t / .35) * np.where(t < d, 1, np.exp(-(t - d) * 7))
    return out * env

def stab(ms, d=.22):
    t = T(d); out = np.zeros(len(t))
    for m in ms:
        f = mtof(m)
        out += 2 * ((f * t) % 1) - 1 + 2 * ((f * 1.004 * t) % 1) - 1
    return fade(lp(out, 3200) / (len(ms) * 2) * np.exp(-t * 12) * 1.3, 0.002, 0.02)

# drums / fx
def kick(dur=.3):
    t = T(dur); f = 46 + 120 * np.exp(-t * 32)
    s = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 9)
    s[:60] += np.linspace(.6, 0, 60) * rng.standard_normal(60)
    return s
def snare():
    t = T(.22); n = bp(rng.standard_normal(len(t)), 1300, 7500)
    return n * np.exp(-t * 24) * .9 + np.sin(2*np.pi*190*t) * np.exp(-t * 32) * .6
def clap():
    t = T(.2); n = hp(rng.standard_normal(len(t)), 900); env = np.zeros(len(t))
    for k in (0, .011, .022): env[int(k*SR):] += np.exp(-T(.2)[:len(t) - int(k*SR)] * 60) * .55
    return n * (env + np.exp(-t * 14) * .25) * .7
def hat(op=False):
    d = .26 if op else .06; t = T(d); return hp(rng.standard_normal(len(t)), 7000) * np.exp(-t * (11 if op else 70)) * .5
def shaker():
    t = T(.07); return bp(rng.standard_normal(len(t)), 4500, 9500) * np.minimum(1, t / .01) * np.exp(-t * 48) * .55
def tom(f=110):
    t = T(.35); fr = f + 70 * np.exp(-t * 18); return np.sin(2*np.pi*np.cumsum(fr)/SR) * np.exp(-t * 8) * .9
def crash(d=1.8):
    t = T(d); return hp(rng.standard_normal(len(t)), 3200) * np.exp(-t * 2.4) * .6
def impact(d=1.6):
    t = T(d); f = 90 * np.exp(-t * 1.5) + 28
    return (np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-t * 2.2) + lp(rng.standard_normal(len(t)), 600) * np.exp(-t * 8) * .5) * .9
def riser(d):
    t = T(d); k = t / d; n = rng.standard_normal(len(t))
    out = np.zeros(len(t))
    for lo, hi, c in [(250, 700, 0), (700, 2000, .3), (2000, 6000, .6), (5000, 12000, .85)]:
        out += bp(n, lo, hi) * np.clip((k - c) / .3, 0, 1) ** 1.5 * (1 - np.clip((k - c - .5) / .3, 0, .6))
    sweep = np.sin(2*np.pi*np.cumsum(300 + 2500 * k ** 2) / SR) * .12
    return (out * 1.2 + sweep) * k ** 1.4
def engine(d):
    t = T(d); f = 52 + 6 * np.sin(2*np.pi*.7*t); ph = np.cumsum(f) / SR
    s = lp(2 * (ph % 1) - 1, 380) * (.6 + .4 * np.sin(2*np.pi*11*t)) + lp(rng.standard_normal(len(t)), 300) * .25
    return s * np.minimum(1, t / .3)

# ------------------------------------------------------------------ mixer
class Bus:
    def __init__(self): self.a = np.zeros((N, 2))
    def add(self, t, sig, g=1.0, pan=0.0):
        i = int(t * SR)
        if i < 0 or i >= N: return
        j = min(N, i + len(sig)); sig = sig[: j - i]
        th = (pan + 1) * np.pi / 4
        self.a[i:j, 0] += sig * g * np.cos(th); self.a[i:j, 1] += sig * g * np.sin(th)

drums, bassb, harm, lead, fxb = Bus(), Bus(), Bus(), Bus(), Bus()
kick_env = np.zeros(N)

def K(t, g=1.0):
    k = kick(); drums.add(t, k, .95 * g)
    i = int(t * SR); kick_env[i:i + int(.18 * SR)] = np.maximum(kick_env[i:i + int(.18 * SR)], np.exp(-T(.18) * 14) * g)

VOI = {"C": [60, 64, 67], "G": [59, 62, 67], "Am": [57, 60, 64], "F": [57, 60, 65]}
def voicing(ch, tr): return [m + tr for m in VOI[ch]]
def root(ch, tr): return song.CHORD[ch][0] + tr

# lead-vocal syllable list per section (for melody doubling)
SYL = {}
for ln in D["lines"]:
    if ln["voice"] != "lead": continue
    for w in ln["words"]:
        for x in w.get("subs", [w]):
            for s in x["syl"]:
                SYL.setdefault(ln["sec"], []).append(s)

def strum(t, ch, tr, g, dur=.7, up=False, oct=0):
    ms = voicing(ch, tr); ms = ms[::-1] if up else ms
    for k, m in enumerate(ms):
        harm.add(t + k * .011, pluck(m + oct, dur), g * (.9 - .12 * k if not up else .6), pan=-.25 + .12 * k)

def melody(sec, inst, off, g, pan=.2, dmax=.8):
    for s in SYL.get(sec["i"], []):
        m = s["note"] + off
        lead.add(s["t0"], inst(m, min(dmax, max(.25, s["dur"] * 1.1))) if inst in (marimba, flute, pulse, glock) else inst(m), g, pan)

def render():
    for sec in D["sections"]:
        k, t0, tr, bars, prog = sec["kind"], sec["t0"], sec["transpose"], sec["bars"], sec["prog"]
        for b in range(bars):
            bt = t0 + b * BAR; ch = prog[b]; r = root(ch, tr); vo = voicing(ch, tr)
            T8 = lambda e: bt + e * EIGHTH
            last = b == bars - 1
            # ---------------------------------------------------------------- INTRO
            if k == "intro":
                if b == 0:
                    for e, m in ((0, 88), (2, 91), (4, 96)): lead.add(T8(e), glock(m + 0, 1.8), .9, .3 * (1 if e % 4 else -1))
                    for e, m in ((0, 76), (2, 79), (4, 84)): lead.add(T8(e), marimba(m, .8), .7, -.2)
                    harm.add(bt, pad_notes([48, 55, 60, 64, 67], 1.9), .5); fxb.add(bt, impact(1.6), .7)
                    for e in range(5, 8): lead.add(T8(e), glock(96 + (e - 5) * 4, .5), .35, .4)
                if b in (1, 2):
                    fxb.add(bt, engine(BAR), .55 if b == 1 else .7)
                    harm.add(bt, pad_notes(vo, BAR, 1500), .35)
                    for e in range(8): drums.add(T8(e), shaker(), .5 + .05 * b)
                    if b == 2:
                        for e in range(0, 8, 2): lead.add(T8(e), marimba(72 + (0, 4, 7, 4)[e // 2], .4), .4, .3)
                if b == 3:
                    harm.add(bt, pad_notes(vo, BAR, 1800), .4)
                    fxb.add(bt, riser(BAR), .85)
                    for e in range(8): drums.add(T8(e), snare(), .3 + e * .07)
                    for e in (0, 2, 4, 6): drums.add(T8(e), hat(), .6)
                continue
            # ---------------------------------------------------------------- OUTRO
            if k == "outro":
                fadeg = 1.0 if t0 + b * BAR < 188 else .8
                harm.add(bt, pad_notes(vo, BAR, 1500), .4 * fadeg)
                if b <= 2:
                    for e in (0, 3, 5): strum(T8(e), ch, tr, .5, .8)
                    bassb.add(bt, bass(r, 1.2), .6)
                    if b == 0:
                        K(bt, .8); K(T8(4), .7); drums.add(T8(2), clap(), .5); drums.add(T8(6), clap(), .5)
                        for s in SYL.get(sec["i"], []): lead.add(s["t0"], marimba(s["note"] + 12, .6), .3, .25)
                if b in (3, 5):
                    for e, m in ((0, 88), (2, 91), (4, 96)): lead.add(T8(e), glock(m, 2.2), .8 * (1 if b == 3 else .6), .3 * (1 if e % 4 else -1))
                    for e, m in ((0, 76), (2, 79), (4, 84)): lead.add(T8(e), marimba(m, .9), .5, -.2)
                if b == 3: fxb.add(bt, impact(1.4), .5)
                if b == 4: lead.add(bt + .2, glock(103, 3), .3, .5)
                continue

            # ---------------------------------------------------------------- DANCE (calls vs echoes)
            if k == "dance":
                if b == 7:                                           # FREEZE: hit then dead silence, tiny pop on the last 8th
                    drums.add(bt, crash(.5), .8); K(bt, 1.1)
                    fxb.add(bt + 7 * EIGHTH, riser(.25), .3)
                    continue
                if b == 0:
                    for e in range(8): drums.add(T8(e), shaker(), .5)
                    K(bt); K(T8(4)); drums.add(T8(6), snare(), .6); drums.add(T8(7), snare(), .7)
                    harm.add(bt, pad_notes(vo, BAR, 2000), .3)
                    continue
                for e in (0, 2, 4, 6): K(T8(e), 1.0)
                for e in (2, 6): drums.add(T8(e), clap(), .9)
                for e in range(8): drums.add(T8(e), hat(e == 7), .55 + (.25 if e % 2 else 0))
                for e in range(8): bassb.add(T8(e), saw_bass(r + (12 if e % 2 else 0), .25), .55)
                call = b in (1, 3, 5)
                if call:
                    for e in (0, 3, 6): harm.add(T8(e), stab(vo + [vo[0] + 12], .2), .55, pan=.3)
                    harm.add(bt, pad_notes(vo, BAR, 2200), .25)
                else:
                    for e in (0, 2, 4, 6): lead.add(T8(e), marimba(vo[(e // 2) % 3] + 12, .3), .45, -.3)
                    for e in range(8): drums.add(T8(e), shaker(), .4)
                    harm.add(bt, pad_notes(vo, BAR, 1800), .2)
                if b in (2, 4, 6):                                   # gang echo bars: cowbell-ish ticks + toms
                    for e in (0, 4): drums.add(T8(e), tom(130), .5)
                    for e in (1, 3, 5, 7): lead.add(T8(e), glock(vo[1] + 24, .3), .25, .4)
                continue

            # ---------------------------------------------------------------- common pieces per kind
            E = {"chorus": 1.0, "fin": 1.1, "fin2": 1.2, "v1": .8, "v2": .95, "v3": .55, "v4": .9, "bridge": .7}[k]
            full = k in ("chorus", "fin", "fin2")
            if full:
                for e in (0, 4): K(T8(e), 1.0)
                if k != "chorus" and b % 2 == 0: K(T8(3), .55)          # syncopated ghost kick in the big choruses
                for e in (2, 6): drums.add(T8(e), clap(), .85 * E); drums.add(T8(e), snare(), .35 * E)
                for e in range(8): drums.add(T8(e), hat(e == 7 and b % 2), (.7 if e % 2 else .45) * E)
                for e in (1, 3, 5, 7): drums.add(T8(e) + .06, shaker(), .5)
                bassb.add(T8(0), bass(r, .4), .8); bassb.add(T8(3), bass(r, .3), .6)
                bassb.add(T8(4), bass(r + 12, .3), .7); bassb.add(T8(6), bass(r + 7, .3), .6)
                for e, gg in ((0, 1.0), (2, .6), (3, .85), (5, .6), (7, .6)): strum(T8(e), ch, tr, .55 * gg * E, .55, up=e in (3, 7))
                harm.add(bt, pad_notes([m - 12 for m in vo], BAR, 1700), .30)
                if b == 0: drums.add(bt, crash(), .8 * E); fxb.add(bt, impact(1.2), .45)
                if k != "chorus" and b == 4: drums.add(bt, crash(1.4), .6)
                if b % 2 == 0: lead.add(bt, glock(vo[2] + 24, 1.2), .5 * E, .35)
                if last:
                    drums.add(T8(6), snare(), .6); drums.add(T8(6) + .125, snare(), .7); drums.add(T8(7), snare(), .8)
                if k == "fin2" and b == 7:                           # grand finale hit
                    drums.add(bt, crash(2.5), 1.0); K(bt, 1.2)
                    harm.add(bt, pad_notes([48 + tr, 55 + tr, 60 + tr, 64 + tr, 67 + tr], 3.0), .6)
                    for i, m in enumerate((88 + tr, 91 + tr, 96 + tr, 100 + tr)): lead.add(bt, glock(m, 3), .7, -.3 + i * .2)
                    for e in range(1, 8): lead.add(T8(e), glock(96 + tr + [0, 4, 7, 12][e % 4], .5), .3, .4)
                melody(sec, marimba, 12, .22 * E)
                if k != "chorus": melody(sec, glock, 24, .09, pan=-.3)
            elif k == "v1":
                K(T8(0), .7)
                for e in (2, 6): drums.add(T8(e), clap(), .45)
                for e in range(8): drums.add(T8(e), shaker(), .55 if e % 2 else .35)
                bassb.add(T8(0), bass(r, .5), .7); bassb.add(T8(4), bass(r + 7, .4), .55)
                for e, gg in ((0, 1), (3, .7), (5, .6)): strum(T8(e), ch, tr, .5 * gg, .6, up=e == 5)
                harm.add(bt, pad_notes([m - 12 for m in vo], BAR, 1500), .17)
                melody(sec, marimba, 12, .16)
                if b % 4 == 1: lead.add(T8(6), glock(vo[2] + 24, 1.0), .35, .4)
            elif k == "v2":
                for e in (0, 4): K(T8(e), 1.0); drums.add(T8(e), tom(95), .75)
                for e in (2, 6): drums.add(T8(e), clap(), .6)
                for e in range(8): drums.add(T8(e), shaker(), .4)
                bassb.add(T8(0), tuba(r, .42), .95); bassb.add(T8(4), tuba(r + 7, .42), .85)
                for e in (2, 6): strum(T8(e), ch, tr, .5, .25, oct=0)
                harm.add(bt, pad_notes([m - 12 for m in vo], BAR, 1400), .13)
                melody(sec, marimba, 12, .16)
            elif k == "v3":
                if b % 2 == 0: K(T8(0), .35)
                for q in range(4): drums.add(T8(q * 2), shaker(), .3)
                bassb.add(T8(0), bass(r, 1.6), .5)
                harm.add(bt, pad_notes([m - 12 for m in vo] + [vo[0]], BAR, 2000), .30)
                for e in range(8): lead.add(T8(e), glock(vo[[0, 1, 2, 1, 0, 1, 2, 1][e]] + 12, .7), .15, -.4 + e * .1)
                melody(sec, flute, 0, .24)
            elif k == "v4":
                for e in (0, 2, 4, 6): K(T8(e), .8)
                for e in (2, 6): drums.add(T8(e), clap(), .6)
                for e in range(8): drums.add(T8(e), hat(), .4)
                for e in range(16):
                    lead.add(bt + e * EIGHTH / 2, pulse(vo[[0, 1, 2, 1][e % 4]] + 12, .12), .22, -.4 + (e % 4) * .25)
                for e in range(8): bassb.add(T8(e), saw_bass(r + (12 if e in (3, 7) else 0), .22), .6)
                melody(sec, pulse, 12, .30, pan=.3, dmax=.5)
            elif k == "bridge":
                K(T8(0), .6); drums.add(T8(4), clap(), .6); drums.add(T8(4), snare(), .3)
                for e in range(8): drums.add(T8(e), shaker(), .3)
                bassb.add(T8(0), bass(r, 1.8), .65)
                harm.add(bt, pad_notes(vo + [vo[0] - 12], BAR, 1500), .38)
                for e in range(8): harm.add(T8(e), pluck(vo[[0, 1, 2, 1, 0, 1, 2, 1][e]] + (0 if e % 4 else 12), .9), .38, pan=-.3 + e * .08)
                melody(sec, glock, 12, .16); melody(sec, flute, 0, .12)
                if b == 6: fxb.add(bt, riser(BAR * 2 - EIGHTH), .6)       # 2-bar riser into the final chorus
                if b == 7:
                    for e in range(8): drums.add(T8(e), snare(), .2 + e * .09)
    return None

def reverb(x, rt=1.3, wet=.18):
    n = int(rt * SR); t = np.arange(n) / SR
    ir = np.stack([rng.standard_normal(n), rng.standard_normal(n)], 1) * np.exp(-t * 6.9 / rt)[:, None]
    ir = lp(ir.T, 5500).T; ir /= np.sqrt((ir ** 2).sum()) / 6
    out = np.stack([fftconvolve(x[:, c], ir[:, c])[:len(x)] for c in range(2)], 1)
    return x * (1 - wet * .5) + out * wet

def build_music():
    render()
    duck = 1 - .32 * np.clip(kick_env, 0, 1)
    h = harm.a * duck[:, None]; b = bassb.a * duck[:, None]
    m = drums.a * .9 + b * 1.0 + h * 1.0 + lead.a * 1.0 + fxb.a * .8
    m = reverb(m, 1.2, .16)
    m = np.tanh(m * .85) * 1.05
    return m

if __name__ == "__main__":
    import soundfile as sf, time
    t = time.time(); m = build_music()
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "music_stem.wav")
    sf.write(out, (m / np.max(np.abs(m)) * .8).astype(np.float32), SR)
    bar = int(BAR * SR); rms = [float(np.sqrt(np.mean(m[i*bar:(i+1)*bar] ** 2))) for i in range(song.TOTAL_BARS)]
    print("music ok", round(time.time() - t), "s  peak", round(float(np.max(np.abs(m))), 2), " rms/bar (every 4th):", [round(x, 2) for x in rms[::4]])
