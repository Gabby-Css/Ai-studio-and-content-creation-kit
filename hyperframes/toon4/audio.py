"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 4: Cheese, Please!' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes4.js)."""
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

# ---- key moments (mirror of the constants in _scenes4.js)
tBite = [W(1, 1), W(1, 2) + .04, W(1, 3), W(1, 4)]; tWant = W(1, 9)
tHop = L[4] - .5; tWake = L[5] - .55; tDown = L[6] - .5; tch0 = L[6] - .1
tA = .45
while tch0 + tA < L[7] + .2: tA += 2
tN0 = L[6] + .9; tN1 = tN0 + .3; tN2 = tN1 + .8; tN3 = tN2 + .9; tN4 = tN3 + .35
tPickN = L[8] - .35
tTip0 = max(tN4, W(7, 2) - .1); tTip1 = tPickN - .1
tToss = [W(9, 0) + .1, W(9, 1) + .2, W(9, 1) + .5]
tHush = W(10, 0) - .05; tPig = W(10, 2) - .35
tStk = L[11] + DU[11] + .15


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


def sfx_snore():   # a sleepy cat snore: breathy rumble in, short tone out
    t = T(.9); n = rng.standard_normal(len(t)); y = lowpass(n, .06)
    env = np.sin(np.pi * np.minimum(1, t / .55)) ** 1.5 * (t < .55) + .5 * np.exp(-((t - .55).clip(0)) * 7) * (t >= .55)
    tone = np.sin(2 * np.pi * (95 + 25 * np.sin(2 * np.pi * 7 * t)) * t) * .4
    return (y * 2.2 + tone) * env * .6
def sfx_sniff():
    t = T(.13); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * np.sin(np.pi * np.minimum(1, t / .13)) ** 1.2 * .55
def sfx_yawn():
    t = T(.8); f = 420 - 230 * (t / .8) ** .8 + 12 * np.sin(2 * np.pi * 6 * t)
    n = lowpass(rng.standard_normal(len(t)), .2)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .5 + n * .6) * np.sin(np.pi * t / .8) ** 1.3 * .5
def sfx_pounce(): return sfx_whoosh(.22) * .9
def sfx_chew():
    out = np.zeros(int(SR * .5))
    for k in range(4):
        t = T(.07); add(out, k * .12, np.sin(2 * np.pi * (260 - 60 * k) * t) * np.exp(-t * 40) * .5)
    return out


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: Nibbles gobbles his last bite
for t in tBite: S(t, sfx_crunch, .8)
S(tBite[3] + .1, sfx_gulp, .6); S(tBite[3] + .14, sfx_sparkle, .4)
S(tWant, sfx_eep, .4)
for k in range(3): S(tWant + .1 + k * .24, sfx_sniff, .6)
# --- scene 2: the sleepy cat
S(L[2] - .8, lambda: sfx_whoosh(.7), .45)
for k in np.arange(L[2] - .2, tWake - .1, 2.3): S(k, sfx_snore, .55)
S(W(2, 9) - .05, sfx_sparkle, .5); S(W(2, 9), sfx_ding, .4)
# --- scene 3/4: Bo's plan, Flapjack's hop
S(L[3] - .55, lambda: sfx_whoosh(.5), .4)
S(W(3, 2), sfx_pop, .6); S(W(3, 4) - .1, sfx_thud, .3)
S(tHop, sfx_boing, .7); S(tHop + .5, sfx_thud, .4)
for k in np.arange(L[4] + .1, L[4] + DU[4], .2): S(k, sfx_tick, .22)
# --- scene 5: Mochi wakes up
S(tWake - .2, lambda: sfx_whoosh(.5), .35)
S(tWake + .05, sfx_yawn, .7)
S(tWake + .1, sfx_gasp, .5)
S(W(5, 0), sfx_thud, .25)
# --- scene 6: the chase
S(tDown, lambda: sfx_whoosh(.4), .4); S(tDown + .45, sfx_thud, .5)
for k in np.arange(tch0, tch0 + tA, .14): S(k, sfx_thud, .17)
for k in np.arange(tch0 + .05, tch0 + tA, .14): S(k, sfx_tick, .22)
for tt in np.arange(tch0 + .45, tch0 + tA, 1.0): S(tt, sfx_boing, .35); S(tt + .25, sfx_boing, .22)
for tt in np.arange(tch0 + .6, tch0 + tA - .3, 1.0): S(tt, sfx_pounce, .5)
# --- scene 7: Nibbles tiptoes
S(tN0, sfx_pop, .7); S(tN0 + .1, sfx_squeakmouse, .4)
for k in np.arange(tN1, tN2, .4): S(k, sfx_tick, .35)
for k in np.arange(tN2, tN3, .15): S(k, sfx_tick, .3)
S(tN3 + .3, sfx_thud, .3)
for k in np.arange(tTip0, tTip1, .62): S(k, sfx_tick, .3)
S(tPickN, sfx_pop, .8); S(tPickN + .05, sfx_sparkle, .6); S(tPickN + .1, sfx_ding, .4)
# --- scene 8
S(W(8, 1), sfx_sparkle, .6); S(W(8, 1) + .1, sfx_ding, .45)
# --- scene 9: cheese for everyone
S(L[9] - .25, lambda: sfx_whoosh(.5), .35)
for t in tToss: S(t - .05, lambda: sfx_whoosh(.3), .35)
S(tToss[0] + .5, sfx_chew, .7); S(tToss[0] + .9, sfx_sparkle, .45)
S(tToss[1] + .6, sfx_chew, .7); S(tToss[2] + .5, sfx_chew, .6)
S(tHush - .05, sfx_gasp, .8)
S(tPig - .1, lambda: sfx_whoosh(.6), .45); S(tPig + .3, sfx_pop, .6)
for k in range(5): S(tPig + .6 + k * .2, sfx_sniff, .75)
S(L[11] - .1, sfx_gasp, .4)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-3) ----------
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
    sec_open = t < L[2] - .5
    sec_nap = L[2] - .5 <= t < tHop - .5
    sec_plan = tHop - .5 <= t < tWake
    sec_wake = tWake <= t < tDown
    sec_chase = tDown <= t < tch0 + tA + .2
    sec_tip = tch0 + tA + .2 <= t < tPickN
    sec_win = tPickN <= t < tHush
    sec_hush = tHush <= t < L[11] - .1
    sec_end = L[11] - .1 <= t
    if sec_open:                                   # cosy: tiny pizzicato under the bites
        if e in (0, 4): add(music, t, bass(midi(root), .5), .35)
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 12), .2), .3)
        continue
    if sec_nap:                                    # lullaby
        if e == 0: add(music, t, bass(midi(root), 1.0), .4)
        if e in (0, 3, 6): add(music, t, marimba(midi(chord[(e // 3) % 3] + 24), .7), .16)
        continue
    if sec_plan:                                   # scheming pizzicato
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e])), .5)
        if e == 0: add(music, t, bass(midi(33), .9), .5)
        continue
    if sec_wake:                                   # deadpan: one low note
        if e == 0: add(music, t, bass(midi(root - 12), .9), .5)
        if e == 4: add(music, t, pizz(midi(52), .3), .35)
        continue
    if sec_hush:
        continue
    if sec_tip:                                    # tiptoe: sparse sneaky plucks
        if e in (0, 3, 5): add(music, t, pizz(midi(SNEAK[e]), .2), .45)
        if e == 0: add(music, t, bass(midi(33), .7), .4)
        continue
    if sec_end:                                    # mysterious: slow low plucks
        if e in (0, 4): add(music, t, bass(midi(root - 12), .8), .5)
        if e in (2, 6): add(music, t, pizz(midi(CH[bar][1] + 12), .25), .3)
        continue
    sv = .85 if sec_chase else .6
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4)) or (sec_chase and e % 2 == 0):
        add(music, t, bass(midi(root), .45), .55 * (1.15 if sec_chase else 1))
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_win else 0)), .55), .30)
    if sec_chase:
        add(music, t, pizz(midi(chord[ARP[e]] + 24), .14), .28)      # fast arpeggio ostinato
        if e in (0, 4): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 1: add(music, t, shaker(), .5)
    if sec_win:
        if e in (0, 4): add(music, t, kick(), .4)
        if e in (2, 6): add(music, t, clap(), .35)
        if e % 2 == 1: add(music, t, shaker(), .4)
# hush: low stinger; then a final button
add(music, tHush, bass(midi(33), 1.2), .6)
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
