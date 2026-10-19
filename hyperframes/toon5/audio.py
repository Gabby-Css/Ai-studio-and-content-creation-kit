"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 5: Pizza Party!' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes5.js)."""
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

# ---- key moments (mirror of the constants in _scenes5.js)
tReveal = W(1, 2) - .1
tSqz = W(1, 3); tOut = W(1, 6) + .3; tLand = tOut + .7
tBase = W(2, 3)
tSauce = W(3, 0) + .05; tCheese = W(3, 1) + .05; tTopP = W(3, 3) + .05
tTaste = [W(3, 6), W(3, 7), W(3, 8), W(3, 9)]
tBo = W(4, 0)
tNot = W(5, 0); tPinch = W(5, 4)
tBake = W(6, 0) + .05; tDing = W(6, 5); tOutPz = tDing + .2
tSl = [W(7, 1) - .05, W(7, 2), W(7, 3) + .1, W(7, 3) + .35, W(7, 4) + .25]
tFz = W(8, 1) - .05; tSw0 = W(8, 2) - .1; tGrab = tSw0 + .55
tPeel = W(9, 1) - .15
tStk = L[10] + DU[10] + .2


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


def sfx_sniff():
    t = T(.13); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * np.sin(np.pi * np.minimum(1, t / .13)) ** 1.2 * .55
def sfx_chew():
    out = np.zeros(int(SR * .5))
    for k in range(4):
        t = T(.07); add(out, k * .12, np.sin(2 * np.pi * (260 - 60 * k) * t) * np.exp(-t * 40) * .5)
    return out
def sfx_splat():
    t = T(.28); n = rng.standard_normal(len(t)); y = lowpass(n, .25) - lowpass(n, .02)
    return (y * np.exp(-t * 11) * 1.6 + np.sin(2 * np.pi * (200 - 120 * t / .28) * t) * np.exp(-t * 14) * .5)
def sfx_rubber():   # squeezing through a tight window: rubbery squeak
    t = T(.2); f = 600 + 500 * np.sin(np.pi * t / .2) + 40 * np.sin(2 * np.pi * 35 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .2) * .35
def sfx_tock(f=620):
    t = T(.07); return np.sin(2 * np.pi * f * t) * np.exp(-t * 55) * .55
def sfx_ovending():
    t = T(1.1); return (np.sin(2 * np.pi * 2093 * t) + .5 * np.sin(2 * np.pi * 4186 * t)) * np.exp(-t * 3.6) * .5
def sfx_zip():      # the monkey zips past
    t = T(.5); n = rng.standard_normal(len(t)); y = lowpass(n, .45) - lowpass(n, .05)
    return y * np.sin(np.pi * t / .5) ** 1.2 * 1.9
def sfx_plop(): t = T(.18); f = 500 - 330 * (t / .18); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 18) * .6


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: silhouette sniffs, Truffle is revealed, squeezes through the window
for k in range(5): S(.15 + k * .24, sfx_sniff, .6)
S(tReveal, sfx_pop, .8); S(tReveal + .05, sfx_sparkle, .5)
for k in np.arange(tSqz, tOut, .22): S(k, sfx_rubber, .55)
S(tSqz + .1, sfx_thud, .25)
S(tOut, sfx_pop, .8); S(tOut + .02, lambda: sfx_whoosh(.6), .45)
S(tLand, sfx_thud, .7); S(tLand, sfx_boing, .5)
for k in np.arange(tLand + .2, L[2] - .1, .17): S(k, sfx_tick, .3)
# --- scene 2: the pizza base pops in
S(tBase, sfx_pop, .8); S(tBase + .2, sfx_sparkle, .55); S(tBase + .22, sfx_ding, .4)
S(W(2, 3) + .05, sfx_boing, .3)
# --- scene 3: sauce, cheese, toppings, tasting
S(tSauce + .08, sfx_splat, .8); S(tSauce + .12, sfx_gloop, .6)
for k in range(3): S(tCheese + k * .13, sfx_pop, .45); S(tCheese + .35 + k * .13, sfx_squeakmouse, .3)
S(tCheese + .55, sfx_sparkle, .45)
for k in range(4): S(tTopP + .1 + k * .1, sfx_thud, .25); S(tTopP + .1 + k * .1, sfx_tick, .35)
S(tTopP + .5, sfx_sparkle, .5)
for t in tTaste: S(t - .05, sfx_chew, .75); S(t + .1, sfx_gulp, .5); S(t + .15, sfx_boing, .22)
S(tTaste[3] + .2, sfx_gulp, .8); S(tTaste[3] + .22, sfx_squeak, .35)
# --- scene 4/5: Bo wants a bite, Truffle says not yet, a pinch of love
for k in np.arange(tBo - .15, tBo + .8, .17): S(k, sfx_tick, .3)
S(tBo + .1, sfx_gloop, .5); S(tBo + .45, sfx_gloop, .45)
for k in range(3): S(tNot + .2 + k * .24, sfx_tock, .5)
S(tPinch - .1, lambda: sfx_whoosh(.4), .3)
for k in range(8): S(tPinch + k * .07, sfx_sparkle, .22)
S(tPinch + .4, sfx_heart, .7); S(tPinch + .45, sfx_ding, .45)
# --- scene 6: the oven
S(tBake, lambda: sfx_whoosh(.7), .5)
S(tBake + .7, sfx_pop, .6)
for k in np.arange(tBake + 1.0, tDing - .05, .5): S(k, sfx_tock, .55); S(k + .25, lambda: sfx_tock(480), .4)
S(tDing, sfx_ovending, .9); S(tDing, sfx_thud, .3)
S(tOutPz, sfx_pop, .8); S(tOutPz + .3, sfx_sparkle, .6)
# --- scene 7: slices
for t in tSl: S(t, lambda: sfx_whoosh(.35), .35)
S(tSl[0] + .55, sfx_chew, .7); S(tSl[1] + .5, sfx_chew, .6); S(tSl[2] + .5, sfx_chew, .6); S(tSl[3] + .5, sfx_chew, .55); S(tSl[4] + .5, sfx_chew, .7)
S(W(7, 7), sfx_sparkle, .6); S(W(7, 7) + .05, sfx_ding, .4)
# --- scene 8: Coco
S(tFz - .05, sfx_gasp, .8)
S(tSw0, lambda: sfx_zip(), .7)
S(tGrab, sfx_pop, .8); S(tGrab + .02, sfx_thud, .4); S(tGrab + .05, sfx_zip, .55)
# --- scene 9/10: peel + "My pizza!"
S(tPeel + .45, sfx_plop, .7)
S(L[10] - .15, sfx_gasp, .6)
S(L[10] + .05, sfx_boing, .5)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-4) ----------
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
ARP = [0, 1, 2, 1, 0, 1, 2, 1]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_open = t < tReveal
    sec_enter = tReveal <= t < L[2]
    sec_cook = L[2] <= t < tBake
    sec_bake = tBake <= t < tOutPz
    sec_party = tOutPz <= t < tFz
    sec_hush = tFz <= t < tGrab + .15
    sec_cheeky = tGrab + .15 <= t < L[10] - .1
    sec_end = L[10] - .1 <= t
    if sec_open:
        if e == 0: add(music, t, bass(midi(33), 1.0), .5)
        if e in (3, 7): add(music, t, pizz(midi(SNEAK[e]), .2), .3)
        continue
    if sec_bake:                                      # ticking suspense
        if e in (0, 4): add(music, t, bass(midi(root), .5), .4)
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 12), .15), .22)
        continue
    if sec_hush:
        continue
    if sec_cheeky:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 3), .18), .45)
        if e == 0: add(music, t, bass(midi(33), .6), .5)
        continue
    if sec_end:
        if e in (0, 4): add(music, t, bass(midi(root - 12), .8), .5)
        if e in (2, 6): add(music, t, pizz(midi(CH[bar][1] + 12), .25), .3)
        continue
    sv = .85 if sec_party else (.55 if sec_enter else .62)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4)):
        add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_party else 0)), .55), .30)
    if sec_cook or sec_party:
        if e in (0, 4): add(music, t, kick(), .4 if sec_cook else .55)
        if e in (2, 6): add(music, t, clap(), .35 if sec_cook else .5)
        if e % 2 == 1: add(music, t, shaker(), .4)
# hush: low stinger at the freeze; final button
add(music, tFz, bass(midi(33), 1.2), .6)
for nn in [48, 60, 63, 67, 72, 75]:
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
