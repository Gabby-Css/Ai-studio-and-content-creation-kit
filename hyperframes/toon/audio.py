"""Build vo.wav, music.wav, sfx.wav for the 30s 'Bo and the Last Pancake' toon.
All audio is synthesized here (original, royalty-free) except the Kokoro voice lines."""
import numpy as np, wave, subprocess, os, json

SR = 44100
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(7)  # seeded -> deterministic
HERE = os.path.dirname(os.path.abspath(__file__))
A = lambda *p: os.path.join(HERE, *p)


def midi(n): return 440.0 * 2 ** ((n - 69) / 12)


def add(buf, t0, sig, gain=1.0):
    i = int(t0 * SR)
    if i >= len(buf): return
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
    n = n - lowpass(n, 0.08)  # crude high-pass
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
def sfx_slam():
    t = T(.7); body = sfx_thud(); out = np.zeros(len(t)); out[:len(body)] += body * 1.4
    ring = (np.sin(2 * np.pi * 340 * t) + .7 * np.sin(2 * np.pi * 571 * t) + .4 * np.sin(2 * np.pi * 903 * t)) * np.exp(-t * 7) * .22
    n = lowpass(rng.standard_normal(len(t)), .35) * np.exp(-t * 30) * 1.0
    return out + ring + n
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
def sfx_growl(): t = T(.7); n = lowpass(rng.standard_normal(len(t)), .03); return n * (.6 + .4 * np.sin(2 * np.pi * 11 * t)) * np.sin(np.pi * t / .7) * 6
def sfx_squeak(): t = T(.14); f = 1700 + 900 * (t / .14); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 16) * .35
def sfx_eep(): t = T(.22); f = 950 + 450 * np.sin(np.pi * t / .22) + 30 * np.sin(2 * np.pi * 28 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .22) * .3
def sfx_boop(): t = T(.12); f = 900 - 300 * (t / .12); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 20) * .45
def sfx_gulp(): t = T(.15); f = 320 - 190 * (t / .15); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) * .5
def sfx_heart(): out = np.zeros(int(SR * .5)); add(out, 0, sfx_thud() * .9); add(out, .16, sfx_thud() * .6); return out
def sfx_stickerpop(): out = np.zeros(int(SR * .8)); add(out, 0, sfx_pop() * 1.1); add(out, .06, sfx_ding(1568)); return out


SFX = [  # (time, fn, gain)
    (0.28, sfx_pop, .9),
    (0.55, sfx_tick, .55), (0.85, sfx_tick, .55), (1.15, sfx_tick, .55), (1.45, sfx_tick, .55), (1.75, sfx_tick, .55),
    (2.30, sfx_ding, .5),
    (3.72, sfx_heart, .6), (4.70, sfx_sparkle, .45), (6.35, sfx_sparkle, .45),
    (7.55, sfx_boop, .6), (8.55, sfx_gulp, .7),
    (9.35, lambda: sfx_whoosh(.35), .5),
    (10.35, sfx_squeak, .8),
    (11.25, sfx_boing, .9), (11.52, sfx_gasp, .8), (11.95, sfx_thud, .5),
    (13.55, lambda: sfx_whoosh(.35), .5), (13.95, sfx_thud, .45),
    (15.55, sfx_creak, .55), (16.15, sfx_boing, .7), (16.62, sfx_slam, 1.0), (16.78, sfx_skid, .8), (17.05, sfx_thud, .8),
    (18.05, lambda: sfx_whoosh(.3), .45),
    (18.65, sfx_creak, .5), (18.78, sfx_ding, .45),
    (19.30, sfx_growl, .7),
    (20.45, sfx_eep, .9),
    (21.00, sfx_pop, .8),
    (22.30, lambda: sfx_whoosh(.5), .5),
    (23.00, sfx_crunch, .8), (23.45, sfx_crunch, .8), (23.90, sfx_crunch, .8), (24.35, sfx_crunch, .8),
    (25.95, sfx_ding, .6),
    (26.75, sfx_stickerpop, .9),
    (27.30, sfx_sparkle, .45),
]
# patter steps while the pancake runs (table: 12.0-13.5, floor 14.1-15.9) and Bo chases (12.6-16.9)
for k in np.arange(12.05, 13.5, .14): SFX.append((float(k), sfx_tick, .4))
for k in np.arange(14.15, 16.0, .13): SFX.append((float(k), sfx_tick, .4))
for k in np.arange(12.7, 16.6, .2): SFX.append((float(k), sfx_thud, .18))

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

# ---------- music (120 BPM, C - Am - F - G) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    if 21.0 <= t < 22.4 or t >= 29.4: continue
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    secA, secB, secC, secD, secE = t < 3.5, 3.5 <= t < 9.3, 9.3 <= t < 18, 18 <= t < 21, t >= 22.4
    if secD:
        if e == 0: add(music, t, bass(midi(45), 1.9) * .9)
        if e in (0, 4): add(music, t, sfx_thud() * .35)
        continue
    sv = .45 if secB else (.85 if secC or secE else .7)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4) and not secB) or (secB and e == 0) or ((secC or secE) and e % 2 == 0):
        add(music, t, bass(midi(root), .45), .55 * (1.15 if secC or secE else 1))
    if (e == 5) and not secB: add(music, t, bass(midi(root + 7), .4), .35)
    if secB or secC or secE or (secA and t >= 2.0):
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + (12 if secC else 0)), .55), .30 * (.6 if secB else 1))
    if secC or secE:
        if e in (0, 4): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 1: add(music, t, shaker(), .5)
# final button: C major hit
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .35)
add(music, 29.4, marimba(midi(84), .6), .45)

# ducking: music lowers under the narration lines
LINE_T = {1: 0.30, 2: 3.70, 3: 9.45, 4: 13.45, 5: 18.20, 6: 22.50}
LINE_D = {1: 2.71, 2: 5.16, 3: 3.58, 4: 4.14, 5: 3.95, 6: 3.78}
xs, ys = [0, DUR], [1, 1]
pts = []
for i in LINE_T:
    a, b = LINE_T[i], LINE_T[i] + LINE_D[i]
    pts += [(a - .2, 1), (a, .42), (b, .42), (b + .25, 1)]
pts.sort()
duck = np.interp(np.arange(N) / SR, [p[0] for p in pts] + [DUR], [p[1] for p in pts] + [1])
music *= duck
# fade-in and a clean tail
music *= np.minimum(1, np.arange(N) / SR / .15)
music = np.tanh(music * .9)
music = music / np.max(np.abs(music)) * .36   # bed sits well under the voice


def save(path, x):
    x = np.clip(x, -1, 1)
    with wave.open(path, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype("<i2").tobytes())


save(A("assets/music.wav"), music)
save(A("assets/sfx.wav"), sfx / np.max(np.abs(sfx)) * .5)

# ---------- voiceover: place lines, then run the kit's recommended voice chain ----------
vo = np.zeros(N)
for i, t0 in LINE_T.items():
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
