"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 3: Honey Trouble' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes3.js)."""
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

# ---- key moments (mirror of the constants in _scenes3.js)
tK1, tK2 = .14, .42
tRev = W(1, 4) - .12; tJarUp = W(1, 9) - .2
rel = L[2] - .5; spl = rel + .62
tB1 = L[3] - .45; tFJ = L[8] - .3
bee0 = L[4] - .1
ch0 = W(5, 1) - .35; ch1 = L[9] + DU[9] + .1
_span = ch1 - ch0 - .5; _tt = 0.0
while _tt < _span: _tt += .55
chEnd = ch0 + max(_tt + .45, ch1 - ch0)
tJump = W(6, 0) - .4; tPick = W(6, 1) - .05; tThrow = W(6, 3) - .05; bf0 = W(6, 5) - .15
tSq = W(10, 1); tNb = tSq + .5; nbEnd = L[11] + DU[11]


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


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: knock-knock, Barnaby appears with honey
S(tK1, sfx_knock, 1.0); S(tK2, sfx_knock, 1.0)
S(tRev, sfx_pop, .8); S(tRev + .05, sfx_sparkle, .4)
S(tJarUp + .2, sfx_sparkle, .5); S(tJarUp + .25, sfx_ding, .4)
for k in range(3): S(L[7] + .2 + k * .28, sfx_thud, .3)
# --- scene 2: the jar flies into the bath
S(rel - .28, lambda: sfx_whoosh(.3), .4)
S(rel, lambda: sfx_whoosh(.62), .5)
S(spl, sfx_splash, 1.0); S(spl + .02, sfx_gloop, .8); S(spl + .12, sfx_gloop, .6); S(spl + .3, sfx_clink, .5)
for k in range(4): S(spl + .1 + k * .17, sfx_bubble, .45)
S(spl + .3, sfx_sparkle, .45)
# --- scene 3: Bo sneaks, Flapjack escapes onto his head
S(tB1 - .05, sfx_clink, .6); S(tB1 + .05, sfx_thud, .3)
for k in np.arange(tB1 + .05, tB1 + .7, .17): S(k, sfx_tick, .35)
S(W(3, 3), sfx_crunch, .8); S(W(3, 3) + .14, sfx_crunch, .8)
S(tFJ - .02, sfx_eep, .8); S(tFJ, sfx_boing, .7); S(tFJ + .45, sfx_thud, .4)
# --- scene 4: the bees
S(bee0 - .05, sfx_gasp, .6)
S(bee0, lambda: sfx_buzz(bf0 + 1.25 - bee0, 205), .5)
# --- scene 5: the chase
for k in np.arange(ch0, chEnd, .13): S(k, sfx_thud, .17)
for k in np.arange(ch0 + .05, chEnd, .13): S(k, sfx_tick, .22)
for k in np.arange(ch0 + .55, chEnd, .55): S(k, sfx_boing, .22)
S(ch0 - .05, sfx_eep, .5); S(ch0 - .05, sfx_thud, .4)
S(L[9] - .12, sfx_squeak, .4)
S(chEnd, sfx_gulp, .5)
# --- scene 6: Rocky throws the jar
S(tJump, lambda: sfx_whoosh(.4), .45); S(tJump + .5, sfx_thud, .6)
S(tPick, sfx_sparkle, .5)
S(tThrow, lambda: sfx_whoosh(.55), .6)
S(tThrow + .55, sfx_clink, .5); S(tThrow + .6, sfx_sparkle, .45)
for k in np.arange(tThrow + .9, L[10] - .1, .36): S(k, sfx_gulp, .5)
# --- scene 7: squeak!
S(tSq - .1, sfx_gasp, .7); S(tSq, sfx_squeakmouse, .8)
S(tSq + .1, lambda: sfx_whoosh(.8), .5)
S(tNb, sfx_pop, .7); S(L[11] + .2, sfx_sparkle, .4)
S(nbEnd + .12, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-2) ----------
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
E8 = .25
t_calm = bf0 + 1.2
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_knock = t < tRev
    sec_warm = tRev <= t < tB1
    sec_sneak = tB1 <= t < tFJ + .45
    sec_chase = bee0 <= t < bf0 + .4
    sec_calm = bf0 + .4 <= t < tSq - .1
    sec_hush = tSq - .1 <= t < tNb
    sec_mouse = tNb <= t
    if sec_knock:
        if e == 0: add(music, t, bass(midi(33), .9), .55)
        continue
    if sec_hush:
        continue
    if sec_sneak:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e])), .5)
        if e == 0: add(music, t, bass(midi(33), .9), .5)
        continue
    if sec_mouse:                               # tiny cheerful pizzicato for the mouse
        if e in (0, 2, 4, 6): add(music, t, pizz(midi(CH[bar][(e // 2) % 3] + 24), .18), .4)
        if e in (0, 4): add(music, t, bass(midi(root), .4), .45)
        continue
    sv = .7 if sec_warm else (.85 if sec_chase else .5)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4)) or (sec_chase and e % 2 == 0):
        add(music, t, bass(midi(root), .45), .55 * (1.15 if sec_chase else 1))
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    if not sec_knock:
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + (12 if sec_chase else 0)), .55), .30 * (.6 if sec_calm else 1))
    if sec_chase:
        if e in (0, 4): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 1: add(music, t, shaker(), .5)
# bumblebee-style chromatic runs in the chase (our own pattern: 16th notes, down then up)
RUN = [88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
k = 0
for t in np.arange(bee0 + .2, bf0 + 1.0, .125):
    add(music, float(t), marimba(midi(RUN[k % len(RUN)]), .18), .22); k += 1
# hush: low stinger, then the squeak is the hook
add(music, tSq - .1, bass(midi(33), 1.0), .6)
# final button
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .35)
add(music, 29.4, marimba(midi(84), .6), .45)

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
