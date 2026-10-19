"""Build vo.wav, music.wav, sfx.wav for 'Bo and the Pancake 8: Boo's Glow Party' (30 s).
All music + sfx synthesized here (original, royalty-free). Voices: Kokoro lines from tts.py.
Event times are derived from plan.json + words.json exactly like the timeline in build/template.tpl (_scenes8.js)."""
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

# ---- key moments (mirror of the constants in _scenes8.js)
BEAT = .5
tPeek = L[1] - .2
tDisco = W(4, 2) - .1
tShuf = W(4, 3)
tGlow = L[5] + .05
tD0 = int(np.floor((W(6, 0) - .05) / BEAT + .5)) * BEAT
tD1 = L[9] - .35
tFreeze = tD1
tUfo = W(9, 2); tSwish = W(9, 4) - .1
tBlip = L[11] - .1
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


def sfx_roar(d=.8):
    t = T(d); f = 78 + 22 * np.sin(2 * np.pi * 6 * t) - 20 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .03) * np.exp(-t * 3.0) * 1.0
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8
def sfx_spooky(d=1.2):
    t = T(d); f = 520 + 40 * np.sin(2 * np.pi * 5.2 * t) + 70 * np.sin(np.pi * t / d)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .25 * np.sin(2 * ph)) * (.75 + .25 * np.sin(2 * np.pi * 7 * t))
    w = lowpass(rng.standard_normal(len(t)), .25) * .12
    return (s * .5 + w) * np.sin(np.pi * t / d) ** .7
def sfx_scratch():
    t = T(.5); n = rng.standard_normal(len(t)); y = n - lowpass(n, .05)
    env = np.abs(np.sin(2 * np.pi * 7 * t)) ** .7 * np.exp(-t * 3.2)
    tone = np.sin(2 * np.pi * np.cumsum(500 * np.exp(-t * 4) + 80) / SR) * .35
    return (y * .6 + tone) * env * 1.4
def sfx_ufo(d=1.7):
    t = T(d); f = 260 + 140 * np.sin(2 * np.pi * 2.4 * t) + 380 * (t / d) ** 1.4
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .4 * np.sin(2 * ph)) * (.7 + .3 * np.sin(2 * np.pi * 15 * t)) + .5 * np.sin(2 * np.pi * 55 * t)
    return s * np.minimum(1, t / .25) * np.minimum(1, (d - t) / .35) * .45
def sfx_beep(f=880, d=.11):
    t = T(d); return np.sin(2 * np.pi * f * t) * np.minimum(1, t / .004) * np.minimum(1, (d - t) / .02) * .4
def sfx_riser(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * (t / d) ** 2 * .6
def sfx_zap():
    t = T(.35); f = 1400 * np.exp(-t * 7) + 90
    return (np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .3 + lowpass(rng.standard_normal(len(t)), .3) * .4) * np.exp(-t * 7)


SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: the scream dies down, Boo peeks in
for k in range(3): S(.04 + k * .06, sfx_eep, .35)
S(.55, sfx_gulp, .4)
S(tPeek, lambda: sfx_spooky(1.1), .3); S(tPeek + .1, sfx_gasp, .4)
# --- scene 2: shy hello
S(L[2] + .55, sfx_sparkle, .3)
# --- scene 3: Gumdrop's (little) roar, then a wave
S(L[3] - .05, lambda: sfx_roar(.7), .7); S(L[3] - .03, sfx_thud, .4)
S(W(3, 2), sfx_sparkle, .35)
# --- scene 4: "a glow party!" — the disco ball drops
S(L[4] + .05, sfx_boing, .5)
S(tDisco - .15, lambda: sfx_whoosh(.5), .4)
S(tDisco + .1, sfx_thud, .6); S(tDisco + .12, sfx_clink, .7); S(tDisco + .35, sfx_clink, .5); S(tDisco + .6, sfx_clink, .35)
S(tDisco + .85, sfx_sparkle, .55)
S(tShuf, lambda: sfx_whoosh(.5), .35)
for k in range(5): S(tShuf + .6 + k * .04, sfx_thud, .3)
# --- scene 5: Boo makes everything glow
S(tGlow - .3, lambda: sfx_riser(.9), .5)
S(tGlow, lambda: sfx_whoosh(.9), .5); S(tGlow + .05, sfx_sparkle, .7); S(tGlow + .35, sfx_sparkle, .55); S(tGlow + .7, sfx_sparkle, .5)
S(tGlow + .1, sfx_pop, .5)
# --- the dance: little hops, claps, flips
_k = 0
for t in np.arange(tD0, tD1 - .25, BEAT):
    S(t, sfx_thud, .12)
    if _k % 4 == 3: S(t, lambda: sfx_whoosh(.4), .35)
    if _k % 4 == 0: S(t + .02, sfx_sparkle, .22)
    _k += 1
S(W(6, 1), sfx_heart, .4); S(W(6, 1) + .1, sfx_sparkle, .5)
S(W(7, 3) - .15, lambda: sfx_whoosh(.7), .5); S(W(7, 4), sfx_sparkle, .6); S(W(7, 4) + .05, sfx_pop, .5)
# --- scene 9: record scratch, a strange light
S(tFreeze, sfx_scratch, .9); S(tFreeze + .1, sfx_gasp, .8)
S(tUfo, lambda: sfx_ufo(1.8), .7)
S(tUfo + .9, sfx_zap, .4)
S(tSwish, lambda: sfx_whoosh(.7), .5)
# --- scene 10/11: Boo is startled, the little alien beams in
S(L[10] - .05, sfx_eep, .3)
S(tBlip, sfx_pop, .8); S(tBlip + .05, sfx_sparkle, .5)
S(tBlip + .4, lambda: sfx_beep(880), .6); S(tBlip + .55, lambda: sfx_beep(1175), .6); S(tBlip + .72, lambda: sfx_beep(740), .6)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-7, now with a disco groove for the party) ----------
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
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_timid = t < tDisco
    sec_build = tDisco <= t < tGlow
    sec_party = tGlow <= t < tFreeze
    sec_hush = tFreeze <= t < tUfo
    sec_ufo = tUfo <= t
    if sec_timid:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    if sec_hush:
        continue
    if sec_ufo:
        if e in (0, 4): add(music, t, bass(midi(28 if bar % 2 == 0 else 31), 1.0), .4)
        if e in (2, 6) and t < tBlip + 1.2: add(music, t, marimba(midi([79, 82, 85, 88][(e // 2 + bar) % 4]), .4), .22)
        continue
    sv = .65 if sec_build else .9
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + 12), .55), .30)
    if sec_build:
        if e in (0, 4): add(music, t, bass(midi(root), .45), .5)
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 24), .14), .28)
        if e % 2 == 1: add(music, t, shaker(), .3)
    if sec_party:
        # four-on-the-floor + offbeat shaker + clap on 2 and 4 + octave disco bass
        if e in (0, 2, 4, 6): add(music, t, kick(), .6)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 1: add(music, t, shaker(), .5)
        add(music, t, bass(midi(root + (12 if e % 2 else 0)), .3), .5)
# the build-up: a rising marimba run into the glow
_RUN = [72, 74, 76, 77, 79, 81, 83, 84]
for i, nn in enumerate(_RUN):
    add(music, tGlow - .5 + i * .0625 * 1.5, marimba(midi(nn + 12), .3), .22)
# stingers + the button
add(music, tFreeze, bass(midi(26), 1.6), .6)
add(music, tUfo, marimba(midi(91), 1.2), .25)
add(music, tBlip, marimba(midi(88), .8), .3)
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
