"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 9: Blip and Zap' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes9.js)."""
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

# ---- key moments (mirror of the constants in _scenes9.js)
tSwish1 = .45
tDesc = W(1, 1) - .1; tLand = W(1, 3) + .25
tRamp = tLand + .35; tBlipOut = tLand + .75; tZapOut = tLand + 1.45
tFJ = L[3] - .1
tZapGo = L[5] - .4
tPop = W(6, 4) - .05
tFound = L[7] + DU[7] + .15
tBeep = [W(8, 4), W(8, 5), W(8, 6)]
tCake = W(9, 2) - .1
tWow = L[10]
tSwish2 = L[11] - .55
tStk = L[11] + DU[11] + .35
tBw = L[2] - .1


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


def sfx_ufo(d=1.7, lo=260):
    t = T(d); f = lo + 140 * np.sin(2 * np.pi * 2.4 * t) + 380 * (t / d) ** 1.4
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .4 * np.sin(2 * ph)) * (.7 + .3 * np.sin(2 * np.pi * 15 * t)) + .5 * np.sin(2 * np.pi * 55 * t)
    return s * np.minimum(1, t / .25) * np.minimum(1, (d - t) / .35) * .4
def sfx_ufo_down(d=1.7):
    t = T(d); f = 900 * np.exp(-t * 1.6 / d) + 120 + 40 * np.sin(2 * np.pi * 5 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .4 * np.sin(2 * ph)) * (.7 + .3 * np.sin(2 * np.pi * 13 * t))
    return s * np.minimum(1, t / .2) * np.minimum(1, (d - t) / .12) * .42
def sfx_beep(f=880, d=.11):
    t = T(d); return np.sin(2 * np.pi * f * t) * np.minimum(1, t / .004) * np.minimum(1, (d - t) / .02) * .4
def sfx_hiss(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .08)
    return y * np.exp(-t * 6) * .6
def sfx_servo(d=.35):
    t = T(d); f = 380 + 900 * (t / d) ** .8
    s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .25 + lowpass(rng.standard_normal(len(t)), .2) * .2
    return s * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .05)
def sfx_roll(d=.6):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .04) * 4
    return n * (1 - t / d) ** 1.2 * (.6 + .4 * np.sin(2 * np.pi * 13 * t)) * .5
def sfx_ring():
    t = T(.5); f = 400 + 1400 * (t / .5)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5) * .3
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: the window saucer leaves, the little saucer lands
S(.05, lambda: sfx_ufo(.5), .35)
S(tSwish1, lambda: sfx_whoosh(.6), .5)
S(tDesc, lambda: sfx_ufo_down(tLand - tDesc + .25), .75)
S(tLand, sfx_thud, .9); S(tLand + .02, sfx_stomp, .6); S(tLand + .05, sfx_clink, .5); S(tLand + .08, lambda: sfx_hiss(.6), .7)
S(tLand + .1, sfx_sparkle, .45)
S(tRamp, lambda: sfx_servo(.35), .6); S(tRamp + .3, sfx_clink, .4)
S(tBlipOut, sfx_pop, .7)
for k in np.arange(tBlipOut + .05, tBlipOut + .55, .16): S(k, sfx_tick, .3)
S(tZapOut, lambda: sfx_servo(.3), .5); S(tZapOut + .05, lambda: sfx_beep(660), .5); S(tZapOut + .2, lambda: sfx_beep(990), .5)
for k in np.arange(tZapOut + .05, tZapOut + .6, .2): S(k, sfx_thud, .25)
# --- scene 2: Blip waddles over
for k in np.arange(tBw, tBw + 2.7, .17): S(k, sfx_tick, .22); S(k + .08, sfx_squeak, .1)
S(W(2, 4), sfx_eep, .3)
# --- scene 3/4: the chase
S(tFJ - .02, sfx_boing, .7); S(tFJ + .5, sfx_thud, .4)
for k in np.arange(tFJ + .55, tFJ + 4.85, .1): S(k, sfx_tick, .22)
for k in np.arange(tFJ + .6, tFJ + 4.9, .2): S(k, sfx_thud, .17)
for t in (tFJ + .55, tFJ + 1.6, tFJ + 2.75, tFJ + 3.85): S(t, lambda: sfx_whoosh(.4), .35)
S(tFJ + 4.4, sfx_boing, .5); S(tFJ + 4.85, sfx_pop, .5)
for k in np.arange(tFJ + .45, tFJ + 5.0, .3): S(k, sfx_squeak, .15)
# --- scene 5: Zap's robot dance
S(tZapGo, lambda: sfx_servo(.4), .4)
for k in range(6):
    S(L[5] + .1 + k * .28, lambda: sfx_beep(740 if k % 2 else 988, .1), .4)
    S(L[5] + .1 + k * .28, lambda: sfx_servo(.12), .3)
# --- scene 6: the head pops off
S(tPop, sfx_pop, .9); S(tPop + .02, sfx_boing, .8); S(tPop + .04, sfx_sparkle, .5)
S(tPop + .66, sfx_thud, .5); S(tPop + .84, sfx_thud, .4)
S(tPop + .95, lambda: sfx_roll(.7), .6)
S(tPop + .1, sfx_gasp, .7)
# --- scene 7: the head is found
for k in np.arange(L[7] + .2, tFound - .3, .5): S(k, lambda: sfx_beep(520, .08), .25)
S(tFound, lambda: sfx_servo(.3), .5); S(tFound + .35, sfx_clink, .7); S(tFound + .38, sfx_sparkle, .5); S(tFound + .4, lambda: sfx_beep(1175), .5)
# --- scene 8: scanner beep, beep, beep
for i, t in enumerate(tBeep):
    S(t - .02, lambda: sfx_beep(1175, .12), .75); S(t, sfx_ring, .45); S(t + .02, sfx_boing, .3)
# --- scene 9: the birthday cake pops up
S(tCake, sfx_pop, .6); S(tCake + .05, sfx_sparkle, .6); S(tCake + .1, sfx_ding, .5)
S(tCake + .4, sfx_heart, .4)
# --- scene 10: Bo's surprise
S(tWow - .08, sfx_gasp, .7); S(tWow + .02, sfx_boing, .5)
S(W(10, 2), sfx_heart, .5); S(W(10, 2) + .1, sfx_sparkle, .55)
# --- scene 11: Peanut at the window
S(tSwish2, lambda: sfx_whoosh(.6), .55)
S(L[11] - .15, sfx_pop, .8); S(L[11] - .1, sfx_sparkle, .5); S(L[11] + .05, sfx_squeak, .35); S(L[11] + .2, sfx_squeak, .3)
S(L[11] + .3, sfx_sparkle, .4)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-8; this one is sci-fi curious, then cheerful) ----------
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
SCI = [84, 88, 91, 86, 89, 93, 88, 91]
E8 = .25
t_chase0, t_chase1 = tFJ, tFJ + 4.9
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_arrive = t < tZapOut + .9
    sec_sneak = tZapOut + .9 <= t < t_chase0
    sec_chase = t_chase0 <= t < t_chase1
    sec_groove = t_chase1 <= t < tBeep[0] - .2
    sec_scan = tBeep[0] - .2 <= t < L[9]
    sec_party = L[9] <= t < tSwish2
    if sec_arrive:
        if e == 0: add(music, t, bass(midi(33), 1.0), .45)
        if e in (3, 6): add(music, t, marimba(midi(SCI[(k // 3) % 8]), .5), .18)
        continue
    if sec_scan:
        if e in (0, 4): add(music, t, bass(midi(root - 12 if root > 40 else root), .5), .45)
        continue
    if t >= tSwish2:
        if e == 0: add(music, t, bass(midi(28), 1.2), .4)
        if e in (2, 6) and t < L[11] + 1.0: add(music, t, marimba(midi(SCI[(k // 2) % 8]), .4), .2)
        continue
    if sec_sneak:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .32)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    sv = .85 if (sec_chase or sec_party) else .6
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_chase or sec_party) else 0)), .55), .30)
    if sec_chase:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    if sec_groove and e in (2, 6): add(music, t, clap(), .3)
# chase: fast chromatic runs on each dash
_k = 0
for t0 in (tFJ + .55, tFJ + 1.6, tFJ + 2.75, tFJ + 3.85):
    for j, t in enumerate(np.arange(t0, t0 + .7, .09)):
        add(music, float(t), marimba(midi(RUN[(j + _k) % len(RUN)]), .16), .2)
    _k += 5
# the birthday fanfare (an original rising arpeggio) + stingers + the button
for j, nn in enumerate([60, 64, 67, 72, 76, 79]):
    add(music, tCake + .1 + j * .1, marimba(midi(nn + 12), .5), .26)
add(music, tPop, bass(midi(36), .8), .5)
add(music, tFound + .35, marimba(midi(84), .5), .3)
add(music, tLand, bass(midi(26), 1.0), .5)
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
