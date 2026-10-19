"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 13: Home Sweet Kitchen' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes13.js)."""
import numpy as np, wave, subprocess, os, json

SR = 44100
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(13)  # seeded -> deterministic
HERE = os.path.dirname(os.path.abspath(__file__))
A = lambda *p: os.path.join(HERE, *p)

PLAN = json.load(open(A("plan.json")))
WJ = json.load(open(A("words.json")))
L = {int(k): v for k, v in PLAN["LINE_T"].items()}
WD = {int(k): v for k, v in WJ["words"].items()}
DU = {int(k): v for k, v in WJ["dur"].items()}
W = lambda ln, i: L[ln] + WD[ln][i]["s"]
WE = lambda ln, i: L[ln] + WD[ln][i]["e"]

# ---- key moments (mirror of the constants in _scenes13.js)
RAMPG = 750
SX = {'mc': 900, 'cm': 678, 'nm': 784, 'tf': 840, 'zp': 896, 'bp': 970, 'bo': 1830, 'pt': 1940, 'gm': 2100}
tPopG = L[1] + .5
tBulb = W(2, 3) - .3
tGrid = L[3] - .2
tEat = L[6] - .35
tGo = {'gm': 17.0, 'bo': 17.1, 'pt': 17.2, 'mc': 17.35, 'cm': 17.45, 'nm': 17.55, 'tf': 17.65, 'zp': 17.75, 'bp': 17.85}
tLift = 19.0
tKit = L[8] - .1
tOut = {'mc': tKit + .4, 'cm': tKit + .55, 'nm': tKit + .7, 'tf': tKit + .85, 'zp': tKit + 1.0, 'bp': tKit + 1.15, 'pt': tKit + 1.3, 'gm': tKit + 1.45, 'bo': tKit + .2}
tStow = L[9]
tHopOut = L[10] - .2
tPlate = L[10] + .4; tBite = W(11, 4) - .5
tStk = L[11] + DU[11] + .35


def midi(n): return 440.0 * 2 ** ((n - 69) / 12)


def add(buf, t0, sig, gain=1.0):
    i = int(t0 * SR)
    if i >= len(buf) or i < 0: return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def T(d): return np.arange(int(SR * d)) / SR


def lowpass(x, a):  # one-pole
    y = np.zeros_like(x); s = 0.0
    for i in range(len(x)):
        s += a * (x[i] - s); y[i] = s
    return y


# ---------- instruments ----------
def pluck(f, d=0.9, bright=1.0):
    t = T(d)
    s = (np.sin(2 * np.pi * f * t) * np.exp(-t * 5) + .5 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 8) * bright
         + .22 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 13) * bright)
    return s * np.minimum(1, t / 0.003)


def pizz(f, d=0.22):
    t = T(d)
    s = (np.sin(2 * np.pi * f * t) + .45 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 30) + .2 * np.sin(2 * np.pi * 3 * f * t) * np.exp(-t * 40)) * np.exp(-t * 20)
    return s * np.minimum(1, t / 0.002)


def marimba(f, d=0.6):
    t = T(d)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 6) + .4 * np.sin(2 * np.pi * 4 * f * t) * np.exp(-t * 20) + .15 * np.sin(2 * np.pi * 10 * f * t) * np.exp(-t * 45)
    return s * np.minimum(1, t / 0.002)


def bass(f, d=0.5):
    t = T(d)
    return (np.sin(2 * np.pi * f * t) * np.exp(-t * 4) + .3 * np.sin(2 * np.pi * 2 * f * t) * np.exp(-t * 7)) * np.minimum(1, t / 0.004)


def kick():
    t = T(0.25); f = 45 + 90 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)


def clap():
    t = T(0.14); n = rng.standard_normal(len(t))
    n = n - lowpass(n, 0.08)
    return n * np.exp(-t * 38) * .5


def shaker():
    t = T(0.07); n = rng.standard_normal(len(t)); n = n - lowpass(n, 0.3)
    return n * np.exp(-t * 55) * .35


# ---------- sfx ----------
def sfx_pop(): t = T(.12); return np.sin(2 * np.pi * np.cumsum(700 * np.exp(-t * 18) + 150) / SR) * np.exp(-t * 28)
def sfx_tick(): t = T(.05); n = rng.standard_normal(len(t)); return (lowpass(n, .15) * 1.3 + np.sin(2 * np.pi * 220 * t)) * np.exp(-t * 70) * .6
def sfx_boing():
    t = T(.5); f = 220 + 260 * np.sin(np.pi * np.minimum(1, t / .22)) * np.exp(-t * 3) + 18 * np.sin(2 * np.pi * 14 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5.5) * np.minimum(1, t / .005)
def sfx_whoosh(d=.5, up=True):
    t = T(d); n = rng.standard_normal(len(t)); y = np.zeros_like(n); s = 0.0
    for i in range(len(n)):
        k = i / len(n); a = (.02 + .5 * np.sin(np.pi * k)) if up else (.02 + .5 * np.sin(np.pi * (1 - k) * .999))
        s += a * (n[i] - s); y[i] = s
    return y * np.sin(np.pi * np.linspace(0, 1, len(t))) ** 1.5 * 1.6
def sfx_gasp(): t = T(.32); n = rng.standard_normal(len(t)); return lowpass(n, .22) * (t / .32) ** 1.3 * np.exp(-((t - .3) * 14).clip(0) ** 2) * 1.8
def sfx_thud(): t = T(.3); f = 40 + 70 * np.exp(-t * 22); return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 11) + lowpass(rng.standard_normal(len(t)), .2) * np.exp(-t * 60) * .6)
def sfx_skid():
    t = T(.45); n = rng.standard_normal(len(t)); y = lowpass(n, .5) - lowpass(n, .08)
    return y * np.exp(-t * 4) * np.minimum(1, t / .02) * 1.8
def sfx_sparkle():
    out = np.zeros(int(SR * .5))
    for i, f in enumerate([1568, 1976, 2349, 3136]):
        t = T(.25); add(out, i * .06, np.sin(2 * np.pi * f * t) * np.exp(-t * 14) * .35)
    return out
def sfx_ding(f=1318): t = T(.7); return (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * 2 * f * t)) * np.exp(-t * 6.5) * .4
def sfx_crunch():
    out = np.zeros(int(SR * .2))
    for k in range(4):
        n = rng.standard_normal(int(SR * .025)); add(out, k * .03, (n - lowpass(n, .1) * .6) * np.exp(-T(.025) * 70), 1.0)
    return out * .8
def sfx_squeak(): t = T(.14); f = 1700 + 900 * (t / .14); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 16) * .35
def sfx_eep(): t = T(.22); f = 950 + 450 * np.sin(np.pi * t / .22) + 30 * np.sin(2 * np.pi * 28 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .22) * .3
def sfx_gulp(): t = T(.15); f = 320 - 190 * (t / .15); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * .5
def sfx_heart(): out = np.zeros(int(SR * .5)); add(out, 0, sfx_thud() * .9); add(out, .16, sfx_thud() * .6); return out
def sfx_stickerpop(): out = np.zeros(int(SR * .8)); add(out, 0, sfx_pop() * 1.1); add(out, .06, sfx_ding(1568)); return out
def sfx_knock():
    t = T(.22); f = 210 - 60 * t / .22
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26) + .5 * np.sin(2 * np.pi * 410 * t) * np.exp(-t * 40)
    click = lowpass(rng.standard_normal(len(t)), .4) * np.exp(-t * 180) * .8
    return (body + click) * 1.3
def sfx_splash():
    t = T(.6); n = rng.standard_normal(len(t)); y = lowpass(n, .3) - lowpass(n, .03)
    return y * np.exp(-t * 6) * np.minimum(1, t / .01) * 1.8
def sfx_gloop():   # thick honey bubble
    t = T(.22); f = 380 - 230 * (t / .22) ** .6
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 12) * .6
def sfx_bubble(): t = T(.09); f = 450 + 1700 * (t / .09); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38) * .4
def sfx_clink():   # glass jar ticks the floor
    t = T(.3); return (np.sin(2 * np.pi * 2400 * t) + .6 * np.sin(2 * np.pi * 3700 * t) + .3 * np.sin(2 * np.pi * 5200 * t)) * np.exp(-t * 22) * .35
def sfx_buzz(d=1.0, base=215):   # a small swarm of bees
    t = T(d); out = np.zeros(len(t))
    for k in range(6):
        f = base * (1 + .12 * k) * (1 + .035 * np.sin(2 * np.pi * (3.1 + .7 * k) * t + k))
        ph = 2 * np.pi * np.cumsum(f) / SR
        out += (np.sin(ph) + .5 * np.sin(2 * ph) + .3 * np.sin(3 * ph)) * (.65 + .35 * np.sin(2 * np.pi * (36 + 3 * k) * t))
    env = np.minimum(1, t / .15) * np.minimum(1, (d - t) / .25)
    return out / 6 * env * .9
def sfx_squeakmouse():
    t = T(.18); f = 2300 + 700 * np.sin(np.pi * t / .18) + 120 * np.sin(2 * np.pi * 30 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .18) * .25


def sfx_beep(f=880, d=.11):
    t = T(d); return np.sin(2 * np.pi * f * t) * np.minimum(1, t / .004) * np.minimum(1, (d - t) / .02) * .4
def sfx_ting(): t = T(.6); return (np.sin(2 * np.pi * 1760 * t) + .4 * np.sin(2 * np.pi * 3520 * t)) * np.exp(-t * 7) * .45
def sfx_chirp():
    t = T(.16); f = 1500 + 900 * np.sin(2 * np.pi * 22 * t) + 500 * (t / .16)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .16) * .3
def sfx_squelchj():
    t = T(.3); n = rng.standard_normal(len(t)); y = lowpass(n, .18) - lowpass(n, .02)
    return (y * np.exp(-t * 10) * 1.2 + np.sin(2 * np.pi * (260 - 140 * t / .3) * t) * np.exp(-t * 12) * .5)
def sfx_sprinkle():
    t = T(.1); n = rng.standard_normal(len(t)); y = n - lowpass(n, .4)
    return y * np.exp(-t * 45) * .35
def sfx_ignite():
    t = T(.22); n = rng.standard_normal(len(t)); y = lowpass(n, .3) - lowpass(n, .02)
    return y * (t / .22) ** .5 * np.exp(-t * 11) * .8 + np.sin(2 * np.pi * (300 + 900 * t) * t) * np.exp(-t * 14) * .2
def sfx_trumpet(d=.5):
    t = T(d); f = 330 + 170 * np.minimum(1, t / .12) - 40 * (t / d) + 12 * np.sin(2 * np.pi * 7 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) + .6 * np.sin(2 * ph) + .4 * np.sin(3 * ph) + .25 * np.sin(4 * ph)
    return lowpass(s, .35) * np.minimum(1, t / .03) * np.minimum(1, (d - t) / .12) * .5
def sfx_swell(d=.7):
    t = T(d); f = 180 + 900 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .35 + lowpass(rng.standard_normal(len(t)), .15) * .15) * np.sin(np.pi * t / d) ** .8
def sfx_riser(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * (t / d) ** 2 * .55 + np.sin(2 * np.pi * np.cumsum(220 + 1200 * (t / d) ** 2) / SR) * (t / d) ** 2 * .2
def sfx_shrink():
    t = T(.55); f = 1100 * np.exp(-t * 4.2) + 180 + 40 * np.sin(2 * np.pi * 14 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .45
def sfx_grow():
    t = T(.5); f = 200 + 700 * (t / .5) ** 1.5
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .5) * .35
def sfx_rumble(d=1.0):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .01) * 7
    s = np.sin(2 * np.pi * 46 * t + 3 * np.sin(2 * np.pi * 7 * t)) * (.6 + .4 * np.sin(2 * np.pi * 11 * t))
    return (s + n * .6) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .4) * .85
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8
def sfx_burp():
    t = T(.5); f = 105 - 40 * (t / .5) + 18 * np.sin(2 * np.pi * 24 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .6 * np.sin(2 * ph) + .4 * np.sin(3 * ph)) * (.7 + .3 * np.sign(np.sin(2 * np.pi * 38 * t)))
    return lowpass(s, .3) * np.sin(np.pi * t / .5) ** .5 * 1.0
def sfx_cheer(d=1.1):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .12) - lowpass(n, .015)
    v = .6 + .4 * np.sin(2 * np.pi * 6 * t + 2 * np.sin(2 * np.pi * 1.3 * t))
    return y * v * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .3) * 1.0
def sfx_roar(d=.8):
    t = T(d); f = 70 + 20 * np.sin(2 * np.pi * 6 * t) - 18 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 29 * t))
    return (s * .6 + lowpass(rng.standard_normal(len(t)), .12) * .8) * np.minimum(1, t / .04) * np.exp(-t * 3) * .9


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: the hungry Gloop King; the little Gloopians pop up
S(.1, sfx_gulp, .4)
S(L[1] + .4, lambda: sfx_rumble(1.2), .8); S(L[1] + .45, sfx_roar, .35)
for i in range(4):
    t = tPopG + i * .15; S(t, sfx_squelchj, .5); S(t + .3, sfx_pop, .45); S(t + .35, sfx_chirp, .4)
S(tPopG + .5, sfx_gasp, .5)
# --- scene 2: Truffle's big idea
S(tBulb, sfx_ting, .8); S(tBulb + .03, sfx_sparkle, .55)
S(tBulb + .2, sfx_boing, .45); S(tBulb + .8, sfx_boing, .45)
# --- scene 3: the montage
S(tGrid, lambda: sfx_whoosh(.4), .4); S(tGrid + .15, sfx_pop, .7); S(tGrid + .2, sfx_ding, .4)
for i in range(5): S(tGrid + .3 + i * .1, sfx_ignite, .4)
S(tGrid + .1, lambda: sfx_trumpet(.4), .35)
for k in range(6): S(tGrid + .1 + k * .32, lambda: sfx_whoosh(.3), .22)
for k in range(5): S(tGrid + .25 + k * .17, lambda: sfx_beep(740 if k % 2 else 988, .08), .3)
S(tGrid + .6, sfx_ignite, .8); S(tGrid + .62, lambda: sfx_whoosh(.5), .4); S(tGrid + .65, sfx_sparkle, .5)
S(tGrid + .4, lambda: sfx_whoosh(.5), .4); S(tGrid + .45, sfx_boing, .5)
for k in np.arange(tGrid + .3, tGrid + 1.0, .07): S(k, sfx_sprinkle, .3)
for k in range(3): S(tGrid + .6 + k * .22, sfx_squelchj, .6)
S(tGrid + 1.0, sfx_pop, .8); S(tGrid + 1.05, sfx_sparkle, .6)
# --- scene 4: syrup!
for k in range(5):
    t = W(4, 3) - .1 + k * .45
    S(t, sfx_bubble, .5); S(t + .06, sfx_squelchj, .45); S(t + .25, sfx_boing, .3)
S(L[4], sfx_tick, .15)
# --- scene 5: it grows
S(L[5], lambda: sfx_swell(1.2), .6); S(L[5] + .3, sfx_sparkle, .6); S(L[5] + 1.0, sfx_sparkle, .6); S(L[5] + .6, sfx_heart, .4)
S(L[5] + 1.1, lambda: sfx_cheer(1.2), .5); S(L[5] + 1.15, lambda: sfx_trumpet(.5), .3)
# --- scene 6: the King eats it
S(tEat, lambda: sfx_whoosh(.9), .6)
S(tEat + .7, sfx_gulp, .9); S(tEat + .72, sfx_crunch, .5); S(tEat + .85, sfx_gulp, .7); S(tEat + .78, sfx_boing, .5)
S(tEat + 1.2, sfx_burp, .7); S(tEat + .75, sfx_sparkle, .6); S(tEat + .9, sfx_heart, .4)
for i in range(4): S(tEat + .9 + i * .08, sfx_chirp, .35)
# --- scene 7: goodbye, into the saucer, lift-off
for p, t0 in tGo.items():
    spd = 1000 if p in ('gm', 'bo', 'pt') else 700
    d1 = max(.05, abs(SX[p] - RAMPG) / spd)
    for k in np.arange(t0, t0 + d1, .16): S(k, sfx_tick, .16); S(k + .06, sfx_thud, .09)
    S(t0 + d1, sfx_shrink, .5); S(t0 + d1 + .52, sfx_pop, .4)
for i in range(4): S(L[7] + i * .05, sfx_chirp, .3)
S(tLift - .3, lambda: sfx_riser(.4), .5); S(tLift, lambda: sfx_whoosh(.7), .7); S(tLift, lambda: sfx_rumble(.8), .7); S(tLift + .05, sfx_stomp, .5)
# --- scene 8: home
S(tKit - .1, lambda: sfx_swell(.5), .45); S(tKit, lambda: sfx_whoosh(.5), .55)
S(tKit + .33, sfx_thud, .9); S(tKit + .35, sfx_stomp, .6); S(tKit + .4, sfx_clink, .5)
for p, t0 in tOut.items(): S(t0, sfx_pop, .45); S(t0 + .05, sfx_grow, .35)
S(L[8] + .5, sfx_boing, .4); S(L[8] + .7, sfx_heart, .4); S(L[8] + .75, sfx_sparkle, .4)
# --- scene 9: a rustle in the scarf
for k in np.arange(tStow, tStow + 2.1, .1): S(k, sfx_tick, .13);
for k in range(5): S(tStow + .3 + k * .38, sfx_squeak, .15)
S(tStow + .6, sfx_gasp, .3)
# --- scene 10: a tiny voice
S(tHopOut, sfx_boing, .4); S(tHopOut + .55, sfx_squelchj, .4); S(tHopOut + .6, sfx_thud, .25)
S(L[10] + .3, sfx_sparkle, .4); S(L[10] + .35, sfx_heart, .4)
# --- scene 11: sharing is caring
S(tPlate, sfx_pop, .7); S(tPlate + .05, sfx_sparkle, .5)
S(tBite, lambda: sfx_whoosh(.5), .3); S(tBite + .5, sfx_gulp, .6); S(tBite + .55, sfx_crunch, .5); S(tBite + .6, sfx_chirp, .5)
S(tBite + .7, sfx_heart, .5); S(tBite + .75, sfx_sparkle, .6); S(tBite + .8, lambda: sfx_cheer(1.4), .55); S(tBite + .85, lambda: sfx_trumpet(.6), .4)
for k in range(7): S(tBite + .8 + k * .13, sfx_pop, .22)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .6)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; the series tune again, with the biggest arrangement of the season for the finale) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
SNEAK = [57, 58, 59, 60, 59, 58, 57, 52]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_tense = t < tBulb - .1
    sec_idea = tBulb - .1 <= t < tGrid
    sec_cook = tGrid <= t < L[5]
    sec_grow = L[5] <= t < tEat
    sec_feast = tEat <= t < L[7]
    sec_bye = L[7] <= t < tKit
    sec_home = tKit <= t < tStow
    sec_sneak = tStow <= t < tHopOut
    sec_cute = tHopOut <= t < tBite
    sec_fin = tBite <= t
    if sec_tense:
        if e in (0, 4): add(music, t, bass(midi(28 if bar % 2 == 0 else 31), .9), .55)
        if e % 2 == 1: add(music, t, pizz(midi(40 + 2 * (k % 3)), .1), .26)
        continue
    if sec_sneak:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .32)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    if sec_bye or sec_cute:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.1), .2)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(ARPU[(k // 2) % 8] if sec_bye else ARPU[(k // 2) % 8] + 12), .5), .2)
        if e == 0: add(music, t, bass(midi(root), .8), .4)
        continue
    sv = .9 if (sec_cook or sec_feast or sec_fin or sec_home) else .6
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_feast or sec_fin or sec_home) else 0)), .55), .30)
    if sec_cook or sec_feast or sec_fin or sec_home:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    if sec_grow:
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(ARPU[(k // 2) % 8]), .3), .22)
    if sec_fin:
        add(music, t, bass(midi(root + (12 if e % 2 else 0)), .3), .35)
# stingers
add(music, tBulb, marimba(midi(91), .6), .3)
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, tGrid + j * .08, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, L[5] + j * .12, marimba(midi(nn), .5), .22)
add(music, tEat + .75, bass(midi(36), 1.0), .6)
add(music, tLift, bass(midi(28), 1.4), .55)
for j, nn in enumerate([60, 64, 67, 72]): add(music, tKit + j * .06, marimba(midi(nn + 12), .5), .25)
add(music, tBite + .7, bass(midi(36), 1.0), .55)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tBite + .75 + j * .07, marimba(midi(nn), .6), .26)
# the big finale button (a little longer than usual)
for nn in [48, 55, 60, 64, 67, 72, 76, 79]:
    add(music, 29.2, pluck(midi(nn), .9), .34)
add(music, 29.2, marimba(midi(88), .8), .4)
add(music, 29.2, bass(midi(36), 1.0), .5)

# ducking: music lowers under every spoken line
pts = []
for i in L:
    a, b = L[i], L[i] + DU[i]
    pts += [(a - .2, 1), (a, .42), (b, .42), (b + .25, 1)]
pts.sort()
duck = np.interp(np.arange(N) / SR, [p[0] for p in pts] + [DUR], [p[1] for p in pts] + [1])
music *= duck
music *= np.minimum(1, np.arange(N) / SR / .15)
music = np.tanh(music * .9)
music = music / np.max(np.abs(music)) * .36


def save(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


save(A("assets/music.wav"), music)
save(A("assets/sfx.wav"), sfx / np.max(np.abs(sfx)) * .5)

# ---------- voiceover: place lines, then run the kit's recommended voice chain ----------
vo = np.zeros(N)
for i, t0 in L.items():
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", A(f"assets/vo/line{i}.wav"), "-ar", str(SR), "-ac", "1", "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    add(vo, t0, np.frombuffer(raw, dtype="<f4"))
save(A("assets/vo_raw.wav"), vo)
subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", A("assets/vo_raw.wav"), "-af",
                "highpass=f=80,equalizer=f=500:t=q:w=1:g=-2,equalizer=f=3500:t=q:w=1:g=2.5,"
                "acompressor=threshold=-18dB:ratio=3:attack=5:release=80,loudnorm=I=-14:TP=-1.5:LRA=7,"
                "apad=whole_dur=30,atrim=0:30", "-ar", "44100", "-ac", "1", A("assets/vo.wav")], check=True)
os.remove(A("assets/vo_raw.wav"))
print("audio ok")
