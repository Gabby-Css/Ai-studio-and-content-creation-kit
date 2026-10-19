"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 2' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl."""
import numpy as np, wave, subprocess, os, json

SR = 44100
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(11)  # seeded -> deterministic
HERE = os.path.dirname(os.path.abspath(__file__))
A = lambda *p: os.path.join(HERE, *p)

PLAN = json.load(open(A("plan.json")))
WJ = json.load(open(A("words.json")))
L = {int(k): v for k, v in PLAN["LINE_T"].items()}
WD = {int(k): v for k, v in WJ["words"].items()}
DU = {int(k): v for k, v in WJ["dur"].items()}
W = lambda ln, i: L[ln] + WD[ln][i]["s"]
WE = lambda ln, i: L[ln] + WD[ln][i]["e"]

S2 = L[2] - .12; S3 = L[3] - .15; S4 = L[4] - .15; S5 = L[8] - .4; S6 = L[6] - .1
gT = W(4, 1) - .05; hop = W(2, 10) - .15; rise = W(3, 1) - .45
rA = gT + .6; rB = gT + 1.15; rC = rB + .5; rD = rC + .75
bA = gT + .8; bB = bA + 2.0
tA = L[8]; tB = L[8] + DU[8]; rumble = W(5, 3); bw = W(5, 6); eat = W(5, 9)
K1 = L[6] + DU[6] + .1; K2 = K1 + .28; L9E = L[9] + DU[9]


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


def pizz(f, d=0.22):  # short staccato pluck for the sneaky motif
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
def sfx_creak():
    t = T(.5); f = 330 - 90 * (t / .5) + 25 * np.sin(2 * np.pi * 23 * t)
    ph = np.cumsum(f) / SR * 2 * np.pi
    return (np.sin(ph) + .6 * np.sin(2 * ph) + .4 * np.sin(3 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t)) * np.sin(np.pi * t / .5) * .35
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
def sfx_knock():  # hollow wooden tock on a window frame
    t = T(.22); f = 210 - 60 * t / .22
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26) + .5 * np.sin(2 * np.pi * 410 * t) * np.exp(-t * 40)
    click = lowpass(rng.standard_normal(len(t)), .4) * np.exp(-t * 180) * .8
    return (body + click) * 1.3
def sfx_rumble():  # big tummy growl
    t = T(1.0); f = 70 - 22 * (t / 1.0) + 8 * np.sin(2 * np.pi * 6 * t)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR)
    n = lowpass(rng.standard_normal(len(t)), .035)
    am = .55 + .45 * np.sin(2 * np.pi * 9 * t + 1.2)
    env = np.sin(np.pi * np.clip(t / 1.0, 0, 1)) ** .7
    return (n * 7 + sub * .9) * am * env
def sfx_splash():
    t = T(.5); n = rng.standard_normal(len(t)); y = lowpass(n, .3) - lowpass(n, .03)
    return y * np.exp(-t * 7) * np.minimum(1, t / .01) * 1.6
def sfx_bubble(): t = T(.09); f = 450 + 1700 * (t / .09); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 38) * .4


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: best friends
S(.20, sfx_pop, .9)
for k in np.arange(.2, W(1, 7) - .15, .5): S(k + .17, sfx_tick, .35)
S(W(1, 3), sfx_gasp, .7); S(W(1, 4) + .1, sfx_gulp, .6)
S(W(1, 6), sfx_squeak, .7); S(W(1, 7) + .1, sfx_sparkle, .5); S(W(1, 7) + .2, sfx_boing, .45)
S(W(1, 10) + .1, sfx_thud, .4); S(W(1, 11) - .05, sfx_heart, .6); S(W(1, 11), sfx_sparkle, .45)
# --- scene 2: breakfast + bath
S(W(2, 5) - .45, sfx_pop, .8)
for t in [W(2, 5) + .1, W(2, 5) + .55, W(2, 5) + 1.0, W(2, 5) + 1.45]: S(t, sfx_crunch, .8)
S(hop - .05, lambda: sfx_whoosh(.35), .45); S(hop + .5, sfx_splash, .9)
for k in range(5): S(hop + .55 + k * .18, sfx_bubble, .5)
S(hop + 1.6, sfx_bubble, .4); S(hop + 2.6, sfx_bubble, .4); S(WE(2, 13) - .1, sfx_ding, .35)
# --- scene 3: sneaky window
S(rise, sfx_creak, .5)
for k in range(3): S(rise + .55 + k * .22, sfx_tick, .35)
for t in [S3 + .25, S3 + .85, S3 + 1.45, S3 + 2.05, S3 + 2.65]: S(t, sfx_crunch, .6)
S(L[7] + .02, sfx_sparkle, .22)
S(S4 - .3, lambda: sfx_whoosh(.3, False), .5)
# --- scene 4: grab + chase
for t in [S4 + .15, S4 + .65]: S(t, sfx_crunch, .55)
S(gT - .3, lambda: sfx_whoosh(.3), .5); S(gT, sfx_eep, .95); S(gT + .05, sfx_boing, .8); S(gT + .4, sfx_thud, .5)
S(gT + .3, sfx_gasp, .8); S(gT + .55, sfx_thud, .5)
S(rA, lambda: sfx_whoosh(.4), .5)
for k in np.arange(rA, rB, .12): S(k, sfx_tick, .4)
S(rB, sfx_boing, .7); S(rB + .05, lambda: sfx_whoosh(.4), .45); S(rC, sfx_thud, .8)
for k in np.arange(rC + .1, rD, .11): S(k, sfx_tick, .4)
for k in np.arange(bA, bB, .2): S(k, sfx_thud, .2)
for k in np.arange(bA + .05, bB, .13): S(k, sfx_tick, .22)
S(bB, sfx_skid, .8); S(bB + .2, sfx_thud, .8); S(rD, sfx_skid, .7); S(rD + .15, sfx_thud, .6)
# --- scene 5: taunt, tummy, cereal
S(tA - .1, lambda: sfx_whoosh(.3), .3)
S(rumble, sfx_rumble, 1.0)
S(W(5, 4) + .3, sfx_ding, .4)
S(bw, sfx_pop, .8); S(bw + .1, sfx_sparkle, .5); S(W(5, 8), lambda: sfx_whoosh(.3), .4)
for k in range(4):
    S(eat + k * .42 + .08, sfx_crunch, 1.0); S(eat + k * .42 + .16, sfx_crunch, .7)
S(eat + 1.5, sfx_heart, .5); S(eat + 1.55, sfx_sparkle, .4)
# --- scene 6: knock knock
for t in [S6 + .35, S6 + .95, S6 + 1.55]: S(t, sfx_crunch, .45)
S(S6 + .4, sfx_bubble, .4); S(S6 + 1.6, sfx_bubble, .4)
S(K1, sfx_knock, 1.0); S(K1 + .02, sfx_gasp, .8); S(K1 + .06, sfx_eep, .6)
S(K2, sfx_knock, 1.0)
S(L9E + .12, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; the same C - Am - F - G tune as video 1, with a sneaky middle) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
SNEAK = [57, 58, 59, 60, 59, 58, 57, 52]   # chromatic tiptoe, one note per 8th
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    if K1 - .05 <= t < L9E + .1:                    # knock + Barnaby: music holds its breath
        if abs(t - round(t / 1.0) * 1.0) < 1e-6 and t >= K1: add(music, t, bass(midi(33), 1.0), .5)
        continue
    if rumble - .02 <= t < rumble + .45: continue   # the tummy rumble: everything stops
    sec_intro = t < S2
    sec_spa = S2 <= t < S3
    sec_sneak = S3 <= t < S4
    sec_chase = (S4 <= t < rumble - .02)
    sec_soft = (rumble + .45 <= t < eat - .15)
    sec_eat = (eat - .15 <= t < S6)
    sec_end = S6 <= t
    if sec_sneak:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e])), .5)
        if e == 0: add(music, t, bass(midi(33), .9), .5)
        if e == 4: add(music, t, shaker(), .25)
        continue
    sv = .45 if (sec_spa or sec_soft) else (.85 if (sec_chase or sec_eat) else .7)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4) and not sec_spa) or (sec_spa and e == 0) or ((sec_chase or sec_eat) and e % 2 == 0):
        add(music, t, bass(midi(root), .45), .55 * (1.15 if (sec_chase or sec_eat) else 1))
    if (e == 5) and not sec_spa: add(music, t, bass(midi(root + 7), .4), .35)
    if sec_spa or sec_chase or sec_eat or sec_soft or sec_end or (sec_intro and t >= 2.0):
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_chase or sec_eat) else 0)), .55), .30 * (.6 if (sec_spa or sec_soft) else 1))
    if sec_chase or sec_eat:
        if e in (0, 4): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 1: add(music, t, shaker(), .5)
# the knock stingers + final button
add(music, K1, bass(midi(33), 1.2), .7); add(music, K2, bass(midi(33), 1.2), .7)
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
