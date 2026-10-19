"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 60: The Grand Finale' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_body60.js)."""
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

# ---- key moments (mirror of the constants in _body60.js)
tC0 = L[3] - .2
tTurn = W(4, 3) - .1
TPEN_ = 2.4
tPop = W(5, 2) - .05
D5 = L[6] - .25 - tPop
tStk = L[11] + DU[11] + .45


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


def sfx_hic(f=900):
    t = T(.13); fr = f * (1 + .6 * np.exp(-t * 30))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 20) * .5
def sfx_goo(d=.7):
    t = T(d); f = 420 + 700 * (t / d) ** 1.5 + 30 * np.sin(2 * np.pi * 18 * t)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .3 + lowpass(rng.standard_normal(len(t)), .08) * .25) * np.sin(np.pi * t / d) ** .6
def sfx_splat():
    t = T(.35); n = rng.standard_normal(len(t)); y = lowpass(n, .2) - lowpass(n, .015)
    return y * np.exp(-t * 12) * 1.0 + np.sin(2 * np.pi * np.cumsum(220 * np.exp(-t * 9) + 70) / SR) * np.exp(-t * 11) * .6
def sfx_plop():
    t = T(.18); f = 200 + 500 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 20) * .7
def sfx_bigpop():
    t = T(.3); f = 1100 * np.exp(-t * 14) + 120
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) + lowpass(rng.standard_normal(len(t)), .3) * np.exp(-t * 40) * .6) * 1.1
def sfx_whistle():
    t = T(.35); f = 1500 + 300 * np.sin(2 * np.pi * 6 * t) - 500 * (t / .35)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .35) * .22


def sfx_scan(d=1.6):
    t = T(d); f = 380 + 900 * (t / d); y = np.sin(2 * np.pi * np.cumsum(f) / SR) * .22 + np.sin(2 * np.pi * np.cumsum(f * 2.01) / SR) * .08
    return y * np.minimum(1, t / .05) * np.minimum(1, (d - t) / .1)
def sfx_creak(d=.9):
    t = T(d); f = 150 + 70 * np.sin(2 * np.pi * 5 * t) + 120 * (t / d)
    y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .22 + lowpass(rng.standard_normal(len(t)), .05) * .1
    return lowpass(y, .25) * np.sin(np.pi * t / d) ** .7
def sfx_thump():
    t = T(.28); f = 62 + 80 * np.exp(-t * 25)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.3 + lowpass(rng.standard_normal(len(t)), .12) * np.exp(-t * 45) * .6


def sfx_whimper(d=.55, f0=520):
    t = T(d); f = f0 * (1 - .45 * (t / d)) + 14 * np.sin(2 * np.pi * 9 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .8 * .3
def sfx_plip():
    t = T(.12); f = 1300 - 700 * (t / .12)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 28) * .35
def sfx_patter(d=1.3):
    out = np.zeros(int(SR * d))
    for k in np.arange(0, d - .05, .11): add(out, k, sfx_tick() * .6)
    return out


def sfx_static(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); env = (np.sin(2 * np.pi * 13 * t) > -.25) * 1.0
    return lowpass(n, .55) * env * np.minimum(1, t * 30) * np.minimum(1, (d - t) * 20) * .3
def sfx_ring(f=1040, d=.34):
    t = T(d); return np.sin(2 * np.pi * f * t) * (np.sin(2 * np.pi * 24 * t) > 0) * np.exp(-t * 4) * .3
def sfx_holoon(d=.5, up=True):
    t = T(d); f = 300 + 1500 * ((t / d) ** 2 if up else (1 - t / d) ** 2)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .6 * .32
def sfx_stackdrop(f):
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_ding(f) * .9); add(out, 0, sfx_plop() * .5); return out
def sfx_waddle():
    t = T(.1); f = 480 + 260 * np.sin(2 * np.pi * 9 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22) * .3


def sfx_wobble(d=.6):
    t = T(d); f = 180 + 60 * np.sin(2 * np.pi * 7 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) * .25


def sfx_sizzle(d=1.5):
    t = T(d); n = rng.standard_normal(len(t)); hp = n - lowpass(n, .35)
    return hp * (.5 + .5 * np.sin(2 * np.pi * 17 * t) ** 2) * np.minimum(1, t * 12) * np.minimum(1, (d - t) * 6) * .32



def sfx_blackout():
    t = T(.5); f = 900 * np.exp(-t * 7) + 60
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6) * .5
def sfx_lightson():
    t = T(.4); f = 120 + 900 * (t / .4) ** 2
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .4) ** .7 * .35


def sfx_sniff():
    t = T(.22); n = rng.standard_normal(len(t)); return lowpass(n, .3) * np.sin(np.pi * t / .22) ** .8 * .35
def sfx_inflate(d=.45):
    t = T(d); f = 260 + 700 * (t / d) ** 1.5; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .6 * .3


def sfx_rocket(d=2.0):
    t = T(d); n = rng.standard_normal(len(t)); env = np.minimum(1, t * 6) * np.minimum(1, (d - t) * 3)
    return (lowpass(n, .25) * .5 + np.sin(2 * np.pi * np.cumsum(90 + 140 * (t / d)) / SR) * .25) * env * .7
def sfx_sputter(d=.9):
    t = T(d); n = rng.standard_normal(len(t)); env = (np.sin(2 * np.pi * 14 * t * (1 + t)) > 0) * np.exp(-t * 2.2)
    return lowpass(n, .3) * env * .6
def sfx_balloonpop():
    t = T(.18); n = rng.standard_normal(len(t)); return (n - lowpass(n, .4)) * np.exp(-t * 38) * .9 + np.sin(2 * np.pi * 180 * t) * np.exp(-t * 30) * .4


def sfx_flip(d=.9):
    t = T(d); f = 500 + 900 * np.sin(np.pi * t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .5 * .22
def sfx_splat2():
    t = T(.3); n = rng.standard_normal(len(t)); return lowpass(n, .3) * np.exp(-t * 14) * .6 + np.sin(2 * np.pi * 120 * t) * np.exp(-t * 16) * .4


def sfx_firework():
    out = np.zeros(int(SR * 1.3))
    t = T(.35); f = 400 + 1500 * (t / .35) ** 2; add(out, 0, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .18)
    n = rng.standard_normal(int(SR * .6)); tt = T(.6); add(out, .35, (n - lowpass(n, .5)) * np.exp(-tt * 7) * .55 + np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 9) * .5)
    for k in range(7): add(out, .45 + k * .06, sfx_sparkle(), .12)
    return out


def sfx_egglump():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_thud() * .9); add(out, .05, sfx_tick() * .8); return out


def sfx_crackle(d=1.0):
    n = rng.standard_normal(int(SR * d)); t = T(d)
    gate = (rng.random(len(t)) > .965).astype(float)
    return (n - lowpass(n, .4)) * lowpass(gate, .25) * 2.2 * np.exp(-t * .9)


def sfx_roll(d=2.0):
    n = rng.standard_normal(int(SR * d)); t = T(d)
    return lowpass(n, .06) * (.4 + .6 * (t / d) ** 2) * (1 + .5 * np.sin(2 * np.pi * (3 + 6 * (t / d)) * t)) * 2.6


def sfx_crackegg():
    out = np.zeros(int(SR * .6))
    n = rng.standard_normal(int(SR * .25)); tt = T(.25)
    add(out, 0, (n - lowpass(n, .5)) * np.exp(-tt * 22) * .8)
    add(out, .02, sfx_knock() * .8); add(out, .06, sfx_tick() * .9)
    return out


def sfx_hatch():
    out = np.zeros(int(SR * 1.2))
    add(out, 0, sfx_bigpop() * .9); add(out, .02, sfx_crackegg()); add(out, .1, sfx_whoosh(.5) * .6)
    for k in range(6): add(out, .12 + k * .05, sfx_tick() * .5)
    return out


def sfx_snore(d=.9):
    t = T(d); f = 95 + 25 * np.sin(2 * np.pi * 1.2 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(np.pi * t / d) ** 2) * .32 + lowpass(rng.standard_normal(len(t)), .08) * (np.sin(np.pi * t / d) ** 2) * .5


def sfx_bigstep():
    out = np.zeros(int(SR * .6)); add(out, 0, sfx_stomp() * .9); add(out, .01, sfx_thump() * .8); add(out, .02, sfx_rumble(.5) * .35); return out


def sfx_engine(d=1.0, f0=70, f1=140):
    t = T(d); f = f0 + (f1 - f0) * (t / d) ** 1.5
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
    return (lowpass(saw, .12) * .55 + lowpass(rng.standard_normal(len(t)), .05) * .3) * np.minimum(1, t * 30) * np.exp(-((t - d).clip(0)) * 10) * (.6 + .4 * np.sin(2 * np.pi * (14 + 20 * t / d) * t))


def sfx_horn(d=.5):
    t = T(d); return (np.sin(2 * np.pi * 440 * t) + .6 * np.sin(2 * np.pi * 554 * t) + .3 * np.sin(2 * np.pi * 880 * t)) * np.minimum(1, t * 40) * np.exp(-(t / d) ** 2 * 2) * .3


def sfx_slurp(d=.8):
    t = T(d); f = 300 - 200 * (t / d) ** .6 + 40 * np.sin(2 * np.pi * 9 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-(t / d) ** 2 * 3) * .4 + lowpass(rng.standard_normal(len(t)), .1) * np.exp(-t * 6) * .3


def sfx_skidslide(d=1.2):
    t = T(d); n = rng.standard_normal(len(t)); return (n - lowpass(n, .3)) * np.exp(-t * 2.5) * np.minimum(1, t * 40) * .5 * (.7 + .3 * np.sin(2 * np.pi * 16 * t))


def sfx_tirepop():
    out = np.zeros(int(SR * .7))
    add(out, 0, sfx_bigpop() * 1.0); add(out, .0, sfx_balloonpop() * .8)
    n = rng.standard_normal(int(SR * .5)); tt = T(.5); add(out, .05, (n - lowpass(n, .4)) * np.exp(-tt * 9) * .4)
    return out


def sfx_echo(sig, n=4, gap=.18, dec=.55):
    out = np.zeros(len(sig) + int(SR * gap * n))
    for k in range(n): add(out, k * gap, sig, dec ** k)
    return out


def sfx_drip():
    t = T(.25); f = 1400 * np.exp(-t * 22) + 500
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 20) * .35


def sfx_camera():
    out = np.zeros(int(SR * .5))
    add(out, 0, sfx_tick() * 1.2); add(out, .06, sfx_pop() * .7); add(out, .09, (lowpass(rng.standard_normal(int(SR * .08)), .4)) * np.exp(-T(.08) * 30) * .6)
    return out


def sfx_scribble():
    t = T(.18); n = rng.standard_normal(len(t)); return lowpass(n, .5) * np.exp(-t * 9) * .5 * np.sin(2 * np.pi * 38 * t) ** 2


def sfx_achoo():
    out = np.zeros(int(SR * .9))
    add(out, 0, sfx_riser(.3) * .5)
    t = T(.35); n = rng.standard_normal(len(t)); add(out, .3, lowpass(n, .45) * np.exp(-t * 9) * 1.4)
    add(out, .3, sfx_pop() * .8)
    return out


def sfx_bite():
    out = np.zeros(int(SR * .4)); add(out, 0, sfx_crunch() * .9); add(out, .1, sfx_crunch() * .7); add(out, .2, sfx_gulp() * .6); return out


def sfx_planks():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_creak(.35) * .8); add(out, .08, sfx_tick() * 1.2); add(out, .2, sfx_tick() * .9); return out


def sfx_snore2():
    out = np.zeros(int(SR * 1.3)); add(out, 0, sfx_snore(.6) * .9); add(out, .7, sfx_snore(.55) * .8); return out


def sfx_clothflap():
    out = np.zeros(int(SR * .9)); add(out, 0, sfx_whoosh(.7) * .8); add(out, .1, sfx_flip(.7) * .6); add(out, .55, sfx_thud() * .4); return out


def sfx_bounce3():
    out = np.zeros(int(SR * 1.1)); add(out, 0, sfx_boing() * .8); add(out, .32, sfx_boing() * .7); add(out, .62, sfx_boing() * .6); return out


def sfx_munch():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_crunch() * .7); add(out, .2, sfx_crunch() * .6); return out


def sfx_whirl(d=1.6):
    t = T(d); n = rng.standard_normal(len(t)); return lowpass(n, .3) * (.4 + .3 * np.sin(2 * np.pi * 6 * t)) * np.exp(-((t - d * .5) / (d * .45)) ** 2) * .8


def sfx_shutter():
    out = np.zeros(int(SR * .6)); add(out, 0, sfx_tick() * 1.4); add(out, .05, sfx_clink() * .6); add(out, .12, sfx_tick() * 1.1); add(out, .16, sfx_pop() * .7); return out


def sfx_shiver(d=1.0):
    out = np.zeros(int(SR * d))
    for k in range(int(d / .06)): add(out, k * .06, sfx_tick() * .7)
    return out


def sfx_zapbeam(d=.8):
    t = T(d); n = rng.standard_normal(len(t)); return (lowpass(n, .6) * np.sin(2 * np.pi * 90 * t) ** 2 * 1.2 + np.sin(2 * np.pi * (700 + 500 * np.sin(2 * np.pi * 12 * t)) * t) * .25) * np.exp(-((t - d * .5) / (d * .5)) ** 2)


def sfx_crashsnow(d=1.0):
    t = T(d); n = rng.standard_normal(len(t))
    return (lowpass(n, .5) * np.exp(-t * 5) * 1.3 + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 8) * .9 + np.sin(2 * np.pi * 150 * t) * np.exp(-t * 14) * .4)


def sfx_snowhit(d=.3):
    t = T(d); n = rng.standard_normal(len(t))
    return lowpass(n, .45) * np.exp(-t * 14) * .9 + np.sin(2 * np.pi * 110 * t) * np.exp(-t * 20) * .5


def sfx_throw(d=.35):
    t = T(d); n = rng.standard_normal(len(t))
    return lowpass(n, .3) * np.sin(np.pi * t / d) ** 2 * .7


def sfx_fireloop(d=3.0):
    t = T(d); n = rng.standard_normal(len(t)); pops = np.zeros(len(t))
    for k in range(int(d * 9)):
        i = int(rng.uniform(0, len(t) - 400)); pops[i:i + 300] += rng.standard_normal(300) * np.exp(-np.arange(300) / 40.0) * rng.uniform(.2, .8)
    return lowpass(n, .15) * .25 + pops * .4


def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_scratch(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); return (n - lowpass(n, .3)) * (np.sin(2 * np.pi * 14 * t) > 0) * np.exp(-t * 3) * .5


def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_sandup(d=1.3):
    t = T(d); n = rng.standard_normal(len(t)); return lowpass(n, .5) * np.sin(np.pi * t / d) ** 2 * .45 + np.sin(2 * np.pi * (200 + 260 * t / d) * t) * np.sin(np.pi * t / d) ** 2 * .12


def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_drumroll(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .25) - lowpass(n, .02)
    return y * (np.sin(2 * np.pi * 26 * t) > -.2) * (.3 + .7 * t / d) * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .05) * 1.2


def sfx_cymbal(d=1.2):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .5)
    return y * np.exp(-t * 3.2) * .5


def sfx_relay():
    out = np.zeros(int(SR * .3)); add(out, 0, sfx_thump() * .8); add(out, .06, sfx_tick() * 1.2); return out


def sfx_applause(d=2.0):
    out = np.zeros(int(SR * d)); t = T(d)
    for k in range(int(d * 24)): add(out, rng.random() * (d - .15), clap(), .5 + .5 * rng.random())
    return out * np.minimum(1, t / .2) * np.minimum(1, (d - t) / .4) * .8


def sfx_rung(): t = T(.09); return (np.sin(2 * np.pi * 380 * t) * np.exp(-t * 55) + lowpass(rng.standard_normal(len(t)), .3) * np.exp(-t * 80) * .6) * .6


def sfx_giggle(d=.5):
    t = T(d); f = 900 + 260 * np.sin(2 * np.pi * 11 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(2 * np.pi * 9 * t) > 0) * np.sin(np.pi * t / d) * .22


def sfx_firecracker(d=.6):
    out = np.zeros(int(SR * d))
    for k in range(9): add(out, k * .05 + rng.random() * .02, sfx_pop() * (.5 + .5 * rng.random()), .5)
    return out


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the lights flash, the crowd roars
S(.05, lambda: sfx_drumroll(.5), .3); S(.3, sfx_relay, .5); S(.4, sfx_relay, .5); S(.45, sfx_cymbal, .5); S(.5, lambda: sfx_cheer(2.0), .6); S(L[1] + .2, sfx_bigpop, .5); S(L[1] + .25, sfx_sparkle, .6)
S(L[1] + .3, lambda: sfx_trumpet(.4), .3)
# --- scene 2: Dad's welcome
S(L[2] + .02, lambda: sfx_trumpet(.35), .4); S(L[2] + .4, lambda: sfx_trumpet(.5), .35); S(W(2, 3), sfx_sparkle, .6); S(W(2, 3), sfx_boing, .3); S(W(2, 3) + .1, lambda: sfx_applause(1.6), .4)
# --- scene 3: five pancakes
for k in range(11): S(L[3] + .2 + k * .14, sfx_tick, .22)
for k in range(3): S(L[3] + .25 + k * .4, lambda: sfx_whoosh(.3), .15)
S(W(3, 4), sfx_sparkle, .5); S(W(3, 4), sfx_boing, .3); S(W(3, 4) + .2, lambda: sfx_applause(1.4), .35)
# --- scene 4: Coco swings, one giant turn
for k in range(1, 6): S(tC0 + TPEN_ * (k - .25) / 2, lambda: sfx_whoosh(.6), .22)
S(tTurn, lambda: sfx_whoosh(.9), .5); S(tTurn + .05, sfx_flip, .5); S(tTurn + .8, sfx_sparkle, .5); S(tTurn + 1.1, sfx_boing, .3)
S(L[4] + .1, lambda: sfx_cheer(1.8), .4)
# --- scene 5: tap, tap, poof
for tt in (L[5] + .1, L[5] + .4): S(tt + .09, sfx_ting, .5); S(tt + .09, sfx_thud, .2); S(tt + .12, sfx_sparkle, .4)
S(tPop - .05, sfx_bigpop, .6); S(tPop, lambda: sfx_whoosh(.7), .4); S(tPop + .05, sfx_boing, .4); S(tPop + .1, sfx_sparkle, .6); S(tPop + .02, sfx_cymbal, .25)
for k in range(4): S(tPop + .3 + k * .22, sfx_giggle, .45)
S(tPop + D5, sfx_thud, .4)
# --- scene 6: Munch's tower
S(W(6, 1) - .05, lambda: sfx_rumble(.9), .4); S(W(6, 1), sfx_grow, .45); S(W(6, 3), sfx_bigpop, .5); S(W(6, 3), lambda: sfx_stackdrop(1568), .5); S(W(6, 4), sfx_thud, .5); S(W(6, 4), sfx_sparkle, .6)
for k in range(5): S(W(6, 4) + .2 + k * .3, sfx_wobble, .2)
# --- scene 7: the drum roll
S(L[7] + .02, lambda: sfx_trumpet(.3), .4); S(L[7] + .2, lambda: sfx_drumroll(L[8] - L[7] - .1), .45)
for k in range(4): S(L[7] + .3 + k * .3, sfx_relay, .3)
S(W(7, 3), sfx_sparkle, .6)
# --- scene 8: the pancake rain
S(L[8] - .05, sfx_cymbal, .6); S(L[8] + .1, lambda: sfx_cheer(2.4), .55)
for k in range(12): S(L[8] + .35 + k * .09 + .8, sfx_plop, .3); S(L[8] + .35 + k * .09 + .8, sfx_boing, .12)
S(L[8] + .3, sfx_bigpop, .5); S(L[8] + .7, sfx_heart, .4)
# --- scene 9: thank you
S(L[9] + .05, sfx_bigpop, .5); S(L[9] + .05, lambda: sfx_applause(2.4), .55); S(L[9] + .1, sfx_boing, .3); S(W(9, 4), sfx_heart, .5); S(W(9, 4), sfx_sparkle, .6)
# --- scene 10: the crowd goes wild
S(L[10] - .05, lambda: sfx_cheer(3.0), .6); S(L[10] + .1, lambda: sfx_applause(3.0), .6); S(L[10] + .1, sfx_bigpop, .5); S(L[10] + .3, sfx_sparkle, .6)
# --- scene 11: fireworks
for i in range(6): S(L[11] + .1 + i * .38, sfx_firework, .6)
S(L[11] + .3, lambda: sfx_cheer(2.6), .5); S(L[11] + .4, sfx_heart, .5); S(L[11] + .4, sfx_sparkle, .6); S(L[11] + .5, sfx_cymbal, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; circus) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [55, 59, 62], [60, 64, 67], [55, 59, 62]]
ROOT = [48, 43, 48, 43]
MEL = [[(0, 79), (1, 84), (2, 88), (3, 84), (4, 79), (6, 84)], [(0, 83), (1, 86), (2, 83), (4, 79), (5, 83), (6, 86)], [(0, 84), (1, 88), (2, 91), (3, 88), (4, 84), (6, 79)], [(0, 83), (2, 86), (4, 79), (6, 83), (7, 86)]]
ARPU = [72, 76, 79, 84, 79, 76, 72, 67]
SEG = [(0, 'finale'), (L[2], 'march'), (L[5], 'drive'), (L[7], 'hush'), (L[8], 'build'), (L[9], 'finale')]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    kind = [kk for s0, kk in SEG if t >= s0 - 1e-6][-1]
    tD = [s0 for s0, kk in SEG if kk == 'finale'][0] if any(kk == 'finale' for s0, kk in SEG) else 99
    if kind == 'intro':      # curious
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .17)
        if e == 0: add(music, t, bass(midi(root), .9), .4)
        if e == 4: add(music, t, bass(midi(root + 7), .5), .28)
        for ee, nn in MEL[bar]:
            if ee == e and bar in (0, 2): add(music, t, marimba(midi(nn), .5), .24)
        if e % 2 == 1: add(music, t, shaker(), .22)
    elif kind == 'magic':    # marimba arpeggio over soft chords
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.4), .15)
        if e == 0: add(music, t, bass(midi(root), 1.4), .34)
        add(music, t, marimba(midi(ARPU[e]), .3), .17)
        if e in (2, 6): add(music, t, shaker(), .2)
    elif kind == 'hush':     # sparse, a held breath
        if e == 0:
            for n_i, nn in enumerate(chord): add(music, t + n_i * .05, pluck(midi(nn), 1.8), .13)
            add(music, t, bass(midi(root - 12 + 12), 1.6), .3)
        if e in (3, 7): add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .4), .1)
    elif kind == 'march':    # circus oom-pah: bass on the beats, chord stabs on the off-beats, a snare on 2 and 4, bouncy melody
        if e in (0, 4): add(music, t, bass(midi(root + (7 if e == 4 else 0)), .3), .52)
        if e in (2, 6):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .01, pluck(midi(nn + 12), .35), .2)
            add(music, t, clap(), .38)
        if e in (0, 4): add(music, t, kick(), .38)
        if e % 2 == 1: add(music, t, shaker(), .3)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .4), .3)
    elif kind == 'drive':    # adventure drive
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .19)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .42)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .48)
        if e % 2 == 1: add(music, t, shaker(), .34)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .27)
    elif kind == 'build':    # denser, claps on every eighth near the end
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e % 2 == 1 or t > tD - 1.2: add(music, t, clap(), .38)
        if e % 2 == 0: add(music, t, bass(midi(root), .3), .5)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .16)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .27)
    else:                    # warm finale
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .22)
        if e in (0, 4): add(music, t, kick(), .45)
        if e in (2, 6): add(music, t, clap(), .4)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .52)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .29)
        if e % 2 == 1: add(music, t, shaker(), .34)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, .35 + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, .35, bass(midi(36), .9), .6)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tPop + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, L[8] + .3 + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, L[8] + .3, bass(midi(36), .9), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, L[11] + .1 + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, L[11] + .1, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)
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
