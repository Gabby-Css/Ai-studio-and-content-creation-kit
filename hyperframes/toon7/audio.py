"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 7: Gumdrop's Secret' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes7.js)."""
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

# ---- key moments (mirror of the constants in _scenes7.js)
tBang = .38
tHuge = W(1, 5) - .15
tMon = W(2, 0); tRun = W(2, 1) - .05
tWait = L[3]
tRum = L[4] - .2
tHmph = W(5, 0); tPoke = tHmph + 1.5
tHop = W(6, 1) - .1; tHopD = .7
tOven = W(6, 2); tDing = W(6, 5) - .05
tLove = W(7, 3) - .1
tEat = [L[8] - .05, L[8] + .55, L[8] + 1.0]
tBurp = WE(8, 3) + .12
tTear = L[9] + .1; tHug = W(9, 3) - .15; tHD = .7
tFlick = W(10, 2); tOut = W(10, 3) + .05
tBooIn = tOut + .3
tScare = L[11] + DU[11] + .08
tStk = tScare + 1.5


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


def sfx_slam():
    t = T(.45); f = 55 + 140 * np.exp(-t * 22)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)
    crack = lowpass(rng.standard_normal(len(t)), .5) * np.exp(-t * 70)
    rattle = np.sin(2 * np.pi * 330 * t) * np.exp(-t * 12) * .25
    return body * 1.3 + crack * .9 + rattle
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8
def sfx_rumble(d=1.3):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .01) * 7
    s = np.sin(2 * np.pi * 42 * t + 3 * np.sin(2 * np.pi * 7 * t)) * (.6 + .4 * np.sin(2 * np.pi * 11 * t))
    return (s + n * .6) * np.sin(np.pi * t / d) ** .6 * .9
def sfx_thunder():
    out = np.zeros(int(SR * 1.5)); t = T(.12)
    add(out, 0, (lowpass(rng.standard_normal(len(t)), .6) - lowpass(rng.standard_normal(len(t)), .05)) * np.exp(-t * 35) * 1.4)
    add(out, .05, sfx_rumble(1.3), .8)
    return out
def sfx_burp():
    t = T(.5); f = 105 - 40 * (t / .5) + 18 * np.sin(2 * np.pi * 24 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .6 * np.sin(2 * ph) + .4 * np.sin(3 * ph)) * (.7 + .3 * np.sign(np.sin(2 * np.pi * 38 * t)))
    return lowpass(s, .3) * np.sin(np.pi * t / .5) ** .5 * 1.1
def sfx_sizzle(d=1.3):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .35)
    crackle = (rng.random(len(t)) > .9985).astype(float)
    return (y * .35 + lowpass(crackle * 3, .5)) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .2)
def sfx_powerdown():
    t = T(.7); f = 1100 * np.exp(-t * 6.5) + 55
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4)
    zap = lowpass(rng.standard_normal(len(t)), .3) * np.exp(-t * 20) * .5
    return (s + zap) * .8
def sfx_spooky(d=1.7):
    t = T(d); f = 520 + 40 * np.sin(2 * np.pi * 5.2 * t) + 70 * np.sin(np.pi * t / d)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .25 * np.sin(2 * ph)) * (.75 + .25 * np.sin(2 * np.pi * 7 * t))
    w = lowpass(rng.standard_normal(len(t)), .25) * .12
    return (s * .5 + w) * np.sin(np.pi * t / d) ** .7
def sfx_scream(d=.65):
    t = T(d); f = 620 + 520 * np.sin(np.pi * np.minimum(1, t / .3) * .5) + 45 * np.sin(2 * np.pi * 19 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) + .5 * np.sin(2 * ph) + .35 * np.sin(3 * ph) + .2 * np.sin(5 * ph)
    return s * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .15) * .22
def sfx_squishy():
    t = T(.3); f = 300 + 180 * np.sin(2 * np.pi * 5 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10) * .5


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: the door slams open, Gumdrop stomps out
S(.12, sfx_gasp, .3)
S(tBang - .1, sfx_slam, 1.0); S(tBang, sfx_pop, .6); S(tBang + .05, sfx_sparkle, .4)
S(tBang + .05, sfx_gasp, .6); S(tBang + .15, sfx_eep, .4)
for k in (.3, .62, .92): S(tBang + k, sfx_stomp, .85)
S(tHuge, lambda: sfx_whoosh(.5), .4)
# --- scene 2: Monster! Run!
S(tMon - .02, sfx_eep, .6); S(tMon + .06, sfx_eep, .5); S(tMon + .12, sfx_eep, .45)
S(tMon, lambda: sfx_whoosh(.3), .3)
for k in np.arange(tRun, tRun + .95, .13): S(k, sfx_thud, .17); S(k + .05, sfx_tick, .22)
S(tRun, lambda: sfx_whoosh(.9), .45)
# --- scene 3: "Wait!"
S(tWait + .05, sfx_skid, .5)
# --- scene 4: the tummy rumbles like thunder
S(tRum, lambda: sfx_rumble(1.3), .9); S(tRum + .05, sfx_thunder, .6)
S(tRum + 1.25, sfx_gulp, .4)
# --- scene 5: Mochi walks up and pokes the belly
for k in np.arange(tHmph + .1, tHmph + 1.45, .17): S(k, sfx_tick, .25)
for k in np.arange(tHmph + .5, tHmph + 2.4, .26): S(k, sfx_tick, .15)
S(tPoke + .12, sfx_squishy, .7); S(tPoke + .14, sfx_pop, .4)
S(tPoke + .35, sfx_sparkle, .35)
# --- scene 6: Truffle jumps on the table, the oven cooks, DING
S(tHop - .05, sfx_boing, .6); S(tHop + tHopD, sfx_thud, .55); S(tHop + tHopD + .02, sfx_gulp, .3)
S(tHop + tHopD + .15, lambda: sfx_whoosh(.5), .3); S(tHop + tHopD + .65, sfx_thud, .3)
S(tOven, lambda: sfx_sizzle(tDing - tOven + .1), .5)
S(tDing, sfx_ding, .7); S(tDing + .05, sfx_pop, .6); S(tDing + .2, sfx_pop, .6)
S(tDing + .5, sfx_sparkle, .45); S(tDing + .65, sfx_sparkle, .45)
# --- scene 7: a pinch more love
S(tLove, sfx_sparkle, .5); S(tLove + .08, sfx_heart, .45)
# --- scene 8: feast flies into Gumdrop's mouth
for i, t in enumerate(tEat):
    S(t - .6, lambda: sfx_whoosh(.6), .35)
    S(t - .02, sfx_gulp, .8); S(t + .1, sfx_crunch, .6); S(t + .3, sfx_gulp, .4)
    S(t + .02, sfx_sparkle, .3)
S(tBurp, sfx_burp, .85)
# --- scene 9: tear, group hug
S(tTear + .55, sfx_bubble, .45)
for k in np.arange(tHug, tHug + tHD, .13): S(k, sfx_thud, .2); S(k + .05, sfx_tick, .2)
S(tHug + .45, sfx_thud, .5)
S(tHug + tHD, sfx_heart, .5); S(tHug + tHD + .12, sfx_sparkle, .5)
# --- scene 10: lights flicker, power down
for dt in (-.5, -.4, -.3, -.2, -.1, -.04): S(tOut + dt, sfx_tick, .55)
S(tOut - .02, sfx_powerdown, .85); S(tOut + .02, sfx_gasp, .8)
# --- scene 11: Boo
S(tBooIn, lambda: sfx_spooky(1.7), .5)
S(tBooIn + .3, sfx_sparkle, .25)
S(tScare - .02, sfx_scream, .75); S(tScare + .03, sfx_eep, .5); S(tScare + .08, sfx_scream, .5)
S(tScare + .2, lambda: sfx_whoosh(.5), .6)
S(tScare + .45, sfx_stomp, .8)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-6) ----------
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
RUN = [88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_open = t < tBang
    sec_burst = tBang <= t < tRun
    sec_flee = tRun <= t < tWait
    sec_hush = tWait <= t < tPoke - .2
    sec_soft = tPoke - .2 <= t < tHop
    sec_feast = tHop <= t < tTear - .1
    sec_hug = tTear - .1 <= t < tFlick - .25
    sec_dark = tFlick - .25 <= t < tScare
    sec_end = tScare <= t
    if sec_open:
        if e == 0: add(music, t, bass(midi(33), 1.0), .5)
        continue
    if sec_burst:
        if e in (0, 4): add(music, t, bass(midi(31 if e == 0 else 28), .7), .6)
        continue
    if sec_hush:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e == 0: add(music, t, bass(midi(33), .9), .45)
        continue
    if sec_dark:
        if e in (0, 4): add(music, t, bass(midi(28), 1.2), .5)
        continue
    if sec_end:
        if t > tScare + 1.0 and e in (0, 4): add(music, t, pizz(midi(CH[bar][e // 4] + 12), .2), .3)
        continue
    if sec_flee:
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .4)
        if e % 2 == 1: add(music, t, shaker(), .4)
        continue
    sv = .55 if sec_soft else (.85 if sec_feast else .45)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55 * (.7 if sec_hug else 1))
    if e == 5 and not sec_hug: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_feast or sec_hug) else 0)), .55), .30 * (.75 if sec_soft else 1))
    if sec_feast:
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 24), .14), .28)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# the flee: a fast chromatic marimba run
_k = 0
for t in np.arange(tRun, tWait, .09):
    add(music, float(t), marimba(midi(RUN[_k % len(RUN)]), .16), .2); _k += 1
# stingers: the bang, the rumble, the blackout, the scream
add(music, tBang, bass(midi(28), 1.4), .6)
add(music, tBang, marimba(midi(40), 1.0), .35)
add(music, tRum, bass(midi(26), 1.2), .55)
add(music, tOut, bass(midi(24), 1.8), .6)
for nn in [60, 61, 66]:
    add(music, tScare, marimba(midi(nn + 12), .5), .3)
# the button
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
