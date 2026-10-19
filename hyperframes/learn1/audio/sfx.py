"""Cartoon sound effects, synthesized from scratch and placed from data/sfx.json (events logged by the animation)."""
import numpy as np, json, os, soundfile as sf
from scipy.signal import butter, sosfilt
import song

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(5)
N = int((song.DURATION + 4) * SR)

def T(d): return np.arange(int(SR * d)) / SR
def hp(x, f): return sosfilt(butter(2, f, "hp", fs=SR, output="sos"), x)
def lp(x, f): return sosfilt(butter(2, f, "lp", fs=SR, output="sos"), x)
def bp(x, a, b): return sosfilt(butter(2, [a, b], "bp", fs=SR, output="sos"), x)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
def env(x, a=.002, r=.02):
    x = x.copy(); na, nr = int(a * SR), int(r * SR)
    if na: x[:na] *= np.linspace(0, 1, na)
    if nr: x[-nr:] *= np.linspace(1, 0, nr)
    return x
def sweep(f0, f1, d, k=1.0): t = T(d); f = f0 + (f1 - f0) * (t / d) ** k; return np.sin(2 * np.pi * np.cumsum(f) / SR)

def add(*xs):
    n = max(len(x) for x in xs); out = np.zeros(n)
    for x in xs: out[:len(x)] += x
    return out

def pop(f=700, d=.12): t = T(d); return env(sweep(f * 1.7, f * .6, d, .5) * np.exp(-t * 26), .001, .01) * .9
def bloop(f=380): t = T(.22); return env(sweep(f, f * 2.4, .22, .6) * np.exp(-t * 11), .002, .02) * .8
def boing(amp=130):
    d = .42; t = T(d); f = 180 + 320 * np.sin(np.pi * np.minimum(1, t / .2)) * np.exp(-t * 3.4) + 22 * np.sin(2 * np.pi * 17 * t) * np.exp(-t * 4)
    return env(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6), .003, .03) * .75
def ding(n=1):
    LAD = (72, 74, 76, 77, 79, 81, 83, 84, 86, 88)                 # counted items ding up the C-major scale (matches the song)
    f = mtof(LAD[((int(n) if str(n).isdigit() else 1) - 1) % 10]); t = T(.9)
    return env((np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 5) + .25 * np.sin(2 * np.pi * 5.4 * f * t) * np.exp(-t * 9)) * np.exp(-t * 4.2), .002, .05) * .7
def whoosh(g=1.0, d=.55):
    t = T(d); n = rng.standard_normal(len(t)); out = np.zeros(len(t))
    for lo, hi, c in [(300, 800, 0), (800, 2400, .15), (2400, 7000, .3)]:
        k = np.clip((t / d - c) / .5, 0, 1); out += bp(n, lo, hi) * np.sin(np.pi * k) ** 1.6
    return out * 1.5 * min(1.0, g)
def swish(): return whoosh(.6, .28)
def sparkle():
    out = np.zeros(int(SR * .6)); base = rng.choice([84, 88, 91, 96])
    for i, m in enumerate((base, base + 4, base + 7, base + 12)):
        t = T(.3); s = np.sin(2 * np.pi * mtof(m) * t) * np.exp(-t * 12) * .35; j = int(i * .055 * SR); out[j:j + len(s)] += s
    return out
def thud(): t = T(.4); f = 120 * np.exp(-t * 14) + 38; return env(np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) + lp(rng.standard_normal(len(t)), 260) * np.exp(-t * 30) * .5, .002, .03) * 1.1
def burst(): t = T(.5); return env(sweep(220, 55, .5, .5) * np.exp(-t * 8) * .9 + lp(rng.standard_normal(len(t)), 900) * np.exp(-t * 14) * .5, .002, .04)
def confetti():
    out = np.zeros(int(SR * .7)); n = hp(rng.standard_normal(int(SR * .25)), 1500) * np.exp(-T(.25) * 22) * .8; out[:len(n)] += n
    for i, dt in enumerate((.05, .1, .17)): p = pop(900 + i * 250, .1); j = int(dt * SR); out[j:j + len(p)] += p * .6
    return out
def hearts(): out = np.zeros(int(SR * .6)); [out.__setitem__(slice(int(i * .12 * SR), int(i * .12 * SR) + len(b := bloop(f))), out[int(i * .12 * SR):int(i * .12 * SR) + len(b)] + b * .6) for i, f in enumerate((420, 560, 700))]; return out
def firework():
    out = np.zeros(int(SR * 1.5)); w = sweep(500, 2200, .4, 1.4) * np.sin(np.pi * np.minimum(1, T(.4) / .4 * 1.2) / 1.2) * .35; out[:len(w)] += w
    j = int(.42 * SR); b = burst() * .8; out[j:j + len(b)] += b
    for k in range(9):
        c = hp(rng.standard_normal(int(.03 * SR)), 3000) * np.exp(-T(.03) * 60) * .45; jj = int((.5 + rng.random() * .8) * SR); out[jj:jj + len(c)] += c
    return out
def splash(): t = T(.8); return env(lp(rng.standard_normal(len(t)), 2400) * np.sin(np.pi * np.minimum(1, t / .8)) ** 1.2 * .8 + hp(rng.standard_normal(len(t)), 3000) * np.exp(-t * 9) * .3, .01, .15)
def sunrise(): out = np.zeros(int(SR * 1.4)); [out.__setitem__(slice(int(i * .16 * SR), int(i * .16 * SR) + len(g := ding(i))), out[int(i * .16 * SR):int(i * .16 * SR) + len(g)] + g * .6) for i in range(1, 4)]; return out
def grass(): out = np.zeros(int(SR * 1.2)); [out.__setitem__(slice(int(i * .09 * SR), int(i * .09 * SR) + len(p := pop(500 + i * 40, .1))), out[int(i * .09 * SR):int(i * .09 * SR) + len(p)] + p * .35) for i in range(10)]; return out
def crack(): out = np.zeros(int(SR * .5)); [out.__setitem__(slice(int(dt * SR), int(dt * SR) + int(.02 * SR)), hp(rng.standard_normal(int(.02 * SR)), 2500) * np.exp(-T(.02) * 80) * .9) for dt in (0, .07, .14, .26)]; return out
def hatch():
    out = np.zeros(int(SR * .9)); c = crack(); out[:len(c)] += c; p = pop(600, .14); j = int(.3 * SR); out[j:j + len(p)] += p
    ch = sweep(900, 1700, .14) * np.exp(-T(.14) * 10) * .5; j = int(.36 * SR); out[j:j + len(ch)] += ch; s = sparkle(); j = int(.4 * SR); out[j:j + len(s)] += s[:len(out) - j]; return out
def raincloud(): t = T(.7); return env(lp(rng.standard_normal(len(t)), 700) * np.sin(np.pi * t / .7) * .6, .02, .1)
def freeze(): out = np.zeros(int(SR * 1.0)); [out.__setitem__(slice(int(i * .03 * SR), int(i * .03 * SR) + len(g := glock_like(m))), out[int(i * .03 * SR):int(i * .03 * SR) + len(g)] + g) for i, m in enumerate((96, 100, 103, 108))]; return out
def glock_like(m, d=.9): t = T(d); f = mtof(m); return env((np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 6)) * np.exp(-t * 5) * .35, .001, .05)
def zoomtxt(): return whoosh(.9, .5) * .8 + sweep(160, 520, .35, 1.3) * np.exp(-T(.35) * 4) * .25 * 0
# ---- lesson sounds (learn video)
def tile_click():            # wooden toy block: soft knock + tiny pop
    t = T(.16); knock = bp(rng.standard_normal(len(t)), 700, 2600) * np.exp(-t * 38) * .8 + np.sin(2 * np.pi * 210 * t) * np.exp(-t * 30) * .6
    return add(env(knock, .001, .02), pop(520, .1) * .25)
def tick():                  # clock tick for the thinking pause
    t = T(.1); return env(np.sin(2 * np.pi * 1900 * t) * np.exp(-t * 70) + np.sin(2 * np.pi * 950 * t) * np.exp(-t * 55) * .6, .0005, .02) * .8
def tada():                  # correct answer: rising arpeggio + sparkle
    out = np.zeros(int(SR * 1.5))
    for i, m in enumerate((84, 88, 91, 96)):
        g = glock_like(m, 1.0) * 1.6; j = int(i * .07 * SR); out[j:j + len(g)] += g[: len(out) - j]
    s = sparkle(); j = int(.3 * SR); out[j:j + len(s)] += s[: len(out) - j] * .8; return out
def objpop():                # a drawn object bounces in
    return add(bloop(430) * .75, ding(3) * .22)

KIND = {
    "sparkle": lambda v: sparkle() * .55, "burst": lambda v: add(burst() * .6, sparkle() * .4), "confetti": lambda v: confetti() * .7, "balloon": lambda v: bloop(330) * .8,
    "eggin": lambda v: pop(520) * .5, "crack": lambda v: crack() * .7, "hatch": lambda v: hatch() * .9, "ding": lambda v: ding(v), "chip": lambda v: pop(780) * .55,
    "boing": lambda v: boing(v) * .55, "boing2": lambda v: (pop(480, .14) * .7 if v == "circle" else add(thud() * .35, pop(300) * .4) if v == "square" else ding(2) * .45 if v == "triangle" else sparkle() * .6),
    "swish": lambda v: swish() * .5, "whoosh": lambda v: whoosh(v if isinstance(v, (int, float)) else .9) * .45, "thud": lambda v: thud() * .8, "hearts": lambda v: hearts() * .7,
    "firework": lambda v: firework() * .6, "splash": lambda v: splash() * .6, "sunrise": lambda v: sunrise() * .7, "grass": lambda v: grass(), "raincloud": lambda v: raincloud() * .5,
}
def text_sfx(v):
    v = (v or "").upper()
    if "ZOOM" in v: return add(whoosh(.9, .5) * .5, pop(300) * .4)
    if "STOMP" in v: return thud() * 1.0
    if "FREEZE" in v: return freeze() * .9
    if "WIGGLE" in v or "WELCOME" in v: return add(pop(560) * .6, sparkle() * .5)
    return pop(600) * .6
KIND["text"] = text_sfx
KIND.update({"tile": lambda v: tile_click() * .9, "tick": lambda v: tick() * .6, "tada": lambda v: tada() * .75, "objpop": lambda v: objpop() * .7, "bubble": lambda v: bloop(560) * .5})

def render():
    ev = json.load(open(os.path.join(HERE, "..", "data", "sfx.json")))
    buf = np.zeros((N, 2)); n = 0
    for t, k, v in ev:
        fn = KIND.get(k)
        if fn is None or t < 0 or t >= song.DURATION: continue
        try: s = fn(v)
        except Exception as e: print("sfx fail", k, v, e); continue
        pk = np.max(np.abs(s)) + 1e-9
        if pk > .8: s = s / pk * .8
        pan = float(np.clip(rng.normal(0, .35), -.8, .8)); th = (pan + 1) * np.pi / 4
        i = int(t * SR); j = min(N, i + len(s))
        buf[i:j, 0] += s[: j - i] * np.cos(th); buf[i:j, 1] += s[: j - i] * np.sin(th); n += 1
    sf.write(os.path.join(HERE, "sfx_stem.wav"), buf.astype(np.float32), SR); print("sfx events placed", n)

if __name__ == "__main__": render()
