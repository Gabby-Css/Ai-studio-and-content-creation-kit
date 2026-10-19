"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 11: Blast Off!' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes11.js)."""
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

# ---- key moments (mirror of the constants in _scenes11.js)
RAMP_B = 1070
X0 = {'cm': 560, 'nm': 690, 'mc': 820, 'tf': 1510, 'zp': 1620, 'bp': 1100, 'bo': 1360, 'pt': 1290, 'gm': 1960}
tEnter = {'cm': 3.6, 'nm': 3.85, 'mc': 4.1, 'tf': 4.35, 'pt': 4.6, 'gm': 3.9, 'zp': 4.8, 'bo': 5.0, 'bp': 5.3}
tCut = L[3] - .1
tCd = [W(5, 0), W(5, 1), W(5, 2)]; tLaunch = W(5, 3)
tMoon = L[7] + .2
tComet = L[9] - .25
tPlanet = L[10] + .1
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
def sfx_servo(d=.35):
    t = T(d); f = 380 + 900 * (t / d) ** .8
    s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .25 + lowpass(rng.standard_normal(len(t)), .2) * .2
    return s * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .05)
def sfx_shrink():
    t = T(.55); f = 1100 * np.exp(-t * 4.2) + 180 + 40 * np.sin(2 * np.pi * 14 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .45
def sfx_swell(d=.7):
    t = T(d); f = 180 + 900 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .35 + lowpass(rng.standard_normal(len(t)), .15) * .15) * np.sin(np.pi * t / d) ** .8
def sfx_rumble(d=3.0):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .01) * 7
    s = np.sin(2 * np.pi * 48 * t + 3 * np.sin(2 * np.pi * 8 * t)) * (.6 + .4 * np.sin(2 * np.pi * 12 * t))
    return (s + n * .6) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .8) * .85
def sfx_riser(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * (t / d) ** 2 * .55 + np.sin(2 * np.pi * np.cumsum(220 + 1200 * (t / d) ** 2) / SR) * (t / d) ** 2 * .2
def sfx_roar(d=.7):
    t = T(d); f = 78 + 22 * np.sin(2 * np.pi * 6 * t) - 20 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .03) * np.exp(-t * 3.2) * .9
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: party over, Blip waddles to his saucer
S(.3, lambda: sfx_whoosh(.5), .35)
for k in np.arange(.9, 3.0, .17): S(k, sfx_tick, .22); S(k + .08, sfx_squeak, .1)
S(.95, sfx_pop, .4)
# --- scene 2: everybody walks up the ramp, shrinking
for p, t0 in tEnter.items():
    spd = 900 if p == 'gm' else 600
    d1 = max(.05, abs(X0[p] - RAMP_B) / spd)
    for k in np.arange(t0, t0 + d1, .16): S(k, sfx_tick, .18); S(k + .06, sfx_thud, .1)
    S(t0 + d1, sfx_shrink, .55); S(t0 + d1 + .52, sfx_pop, .45); S(t0 + d1 + .55, sfx_sparkle, .3)
S(tEnter['gm'] + 1.0, sfx_squeak, .5); S(tEnter['gm'] + 1.15, sfx_squeak, .45); S(tEnter['gm'] + 1.3, sfx_squeak, .4)
S(tEnter['gm'] + 1.45, sfx_pop, .8); S(tEnter['gm'] + 1.4, sfx_thud, .5)
# --- scene 3: the cut to the inside
S(tCut - .15, lambda: sfx_swell(.7), .6); S(tCut, lambda: sfx_whoosh(.6), .5); S(tCut + .05, sfx_sparkle, .7); S(tCut + .1, sfx_pop, .5)
for k in range(7): S(tCut + .1 + k * .06, sfx_boing, .12)
S(L[3] + .05, sfx_boing, .5); S(L[3] + .1, sfx_sparkle, .4)
# --- scene 4: Zap's safety announcement
for k in range(5): S(L[4] + .1 + k * .38, lambda: sfx_beep(740 if k % 2 else 988, .09), .35)
S(L[4], lambda: sfx_servo(.3), .4)
for i in range(8): S(W(4, 4) + i * .03, sfx_tick, .35)
S(W(4, 4) + .1, sfx_clink, .5); S(W(4, 4) + .12, sfx_sparkle, .4)
# --- scene 5: countdown + lift-off
for t in tCd: S(t, lambda: sfx_beep(660, .16), .7)
S(tLaunch - .05, lambda: sfx_beep(1320, .45), .7)
S(tLaunch - .3, lambda: sfx_riser(.4), .5)
S(tLaunch, lambda: sfx_rumble(4.0), .95); S(tLaunch, lambda: sfx_whoosh(1.8), .8); S(tLaunch + .02, sfx_stomp, .9)
S(tLaunch + .05, sfx_eep, .35); S(tLaunch + .1, sfx_eep, .3)
for k in np.arange(tLaunch + .6, tLaunch + 4.0, .5): S(k, sfx_stomp, .22)
# --- scene 6: Mochi is NOT scared
for k in np.arange(L[6] + .1, L[6] + DU[6] - .2, .3): S(k, sfx_tick, .16)
S(WE(6, 3), sfx_squeak, .3)
# --- scene 7/8: the moon, the stars
S(L[7], lambda: sfx_roar(.7), .8); S(L[7] + .02, sfx_thud, .4)
S(tMoon, lambda: sfx_whoosh(1.4), .45)
S(W(8, 4), sfx_sparkle, .5); S(W(8, 7), sfx_sparkle, .5); S(L[8] + .1, sfx_ding, .35)
# --- scene 9: the banana comet
S(tComet, lambda: sfx_whoosh(1.2), .6)
S(L[9], sfx_boing, .6); S(L[9] + .7, sfx_boing, .6); S(W(9, 1), sfx_sparkle, .5); S(W(9, 1) + .1, sfx_heart, .4)
# --- scene 10: the jelly planet
S(tPlanet, lambda: sfx_riser(2.4), .7)
S(tPlanet + .3, lambda: sfx_swell(2.0), .35)
S(tPlanet + 2.1, sfx_gasp, .7); S(tPlanet + 2.2, sfx_sparkle, .6); S(tPlanet + 2.25, sfx_ding, .5)
# --- scene 11: welcome
S(L[11] - .05, sfx_pop, .7); S(L[11], sfx_sparkle, .6)
for k in range(5): S(L[11] + .1 + k * .3, sfx_boing, .2)
S(W(11, 3), sfx_heart, .5)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; the same C - Am - F - G tune as the whole series; season 2 goes to space) ----------
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
SCI = [84, 88, 91, 86, 89, 93, 88, 91]
ARP = [0, 1, 2, 1, 0, 1, 2, 1]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_party = t < 3.2
    sec_enter = 3.2 <= t < tCut
    sec_inside = tCut <= t < tCd[0] - .3
    sec_count = tCd[0] - .3 <= t < tLaunch - .05
    sec_fly = tLaunch - .05 <= t < tPlanet
    sec_planet = tPlanet <= t < L[11] - .1
    sec_end = L[11] - .1 <= t
    if sec_party:
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .16)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .45)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn), .55), .26)
        continue
    if sec_enter:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .34)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    if sec_inside:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.2), .17)
        if e in (3, 6): add(music, t, marimba(midi(SCI[(k // 3) % 8]), .5), .16)
        if e == 0: add(music, t, bass(midi(root - 12 if root > 40 else root), 1.0), .4)
        continue
    if sec_count:
        if e in (0, 4): add(music, t, bass(midi(31), .6), .5)
        if e % 2 == 1: add(music, t, pizz(midi(SCI[e] - 12), .1), .28)
        continue
    if sec_fly:
        sv = .9
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .30)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .4)
        if e % 2 == 1: add(music, t, shaker(), .4)
        add(music, t, marimba(midi(chord[ARP[e]] + 24), .2), .16)
        continue
    if sec_planet:
        if e == 0:
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 2.0), .2)
        if e % 2 == 0: add(music, t, marimba(midi(SCI[(k // 2) % 8] - 12 + 12 * ((k * 3) % 2)), .4), .2)
        continue
    if sec_end:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .9), .22)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .28)
        if e in (0, 4): add(music, t, kick(), .4)
        if e in (2, 6): add(music, t, clap(), .35)
        continue
# stingers
add(music, tCut, marimba(midi(88), .8), .3); add(music, tCut + .1, marimba(midi(91), .8), .26)
add(music, tLaunch, bass(midi(28), 1.6), .65)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tLaunch + j * .06, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tPlanet + 1.6 + j * .12, marimba(midi(nn), .6), .24)
add(music, L[11], bass(midi(36), 1.0), .5)
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .33)
add(music, 29.4, marimba(midi(84), .6), .4)

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
