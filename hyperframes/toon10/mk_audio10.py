"""Generate toon10/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 10: Bo's Big Birthday'").replace("_scenes3.js", "_scenes10.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

moments = r'''# ---- key moments (mirror of the constants in _scenes10.js)
tSw = .4
tSq = W(1, 2); tTaDa = W(1, 6)
tHB = W(2, 2); tRem = W(2, 4)
tGather = W(4, 1); tPush = W(4, 4)
tSpr = W(5, 4) - .5
tCandles = W(6, 3)
tWish = L[7] + .1; tBite = W(7, 3); tBlow = L[7] + DU[7] - .05
tCousins = W(8, 3)
tShare = L[9] + .1
tYum = L[10] + .05
tFin = L[11]
tStk = L[11] + DU[11] + .35


'''

newsfx = r'''def sfx_trumpet(d=.7):
    t = T(d); f = 330 + 170 * np.minimum(1, t / .12) - 40 * (t / d) + 12 * np.sin(2 * np.pi * 7 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) + .6 * np.sin(2 * ph) + .4 * np.sin(3 * ph) + .25 * np.sin(4 * ph)
    return lowpass(s, .35) * np.minimum(1, t / .03) * np.minimum(1, (d - t) / .12) * .5
def sfx_sprinkle():
    t = T(.1); n = rng.standard_normal(len(t)); y = n - lowpass(n, .4)
    return y * np.exp(-t * 45) * .35
def sfx_ignite():
    t = T(.22); n = rng.standard_normal(len(t)); y = lowpass(n, .3) - lowpass(n, .02)
    return y * (t / .22) ** .5 * np.exp(-t * 11) * .8 + np.sin(2 * np.pi * (300 + 900 * t) * t) * np.exp(-t * 14) * .2
def sfx_blow(d=.6):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .22) - lowpass(n, .02)
    return y * np.sin(np.pi * t / d) ** .8 * 1.3
def sfx_cheer(d=1.1):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .12) - lowpass(n, .015)
    v = .6 + .4 * np.sin(2 * np.pi * 6 * t + 2 * np.sin(2 * np.pi * 1.3 * t))
    return y * v * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .3) * 1.1
def sfx_roar(d=.7):
    t = T(d); f = 78 + 22 * np.sin(2 * np.pi * 6 * t) - 20 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .03) * np.exp(-t * 3.2) * .9
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8
def sfx_squish():
    t = T(.3); f = 300 + 180 * np.sin(2 * np.pi * 5 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10) * .5


'''

events = r'''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: swish to the kitchen, Peanut squeezes through the window, the cake pops onto the table
S(tSw, lambda: sfx_whoosh(.6), .5)
S(tSq - .02, sfx_boing, .6); S(tSq, sfx_squeak, .45); S(tSq + .1, lambda: sfx_whoosh(.9), .4)
S(tSq + 1.0, sfx_thud, .8); S(tSq + 1.02, sfx_stomp, .4)
S(tTaDa, sfx_pop, .85); S(tTaDa + .04, sfx_sparkle, .6); S(tTaDa + .08, sfx_ding, .5); S(tTaDa + .1, lambda: sfx_trumpet(.4), .3)
for k in range(5): S(tTaDa + .15 + k * .06, sfx_pop, .22)
# --- scene 2: "Happy birthday, Bo!" — a trumpet toot and a confetti burst
S(tHB - .1, lambda: sfx_trumpet(.7), .7)
S(tHB + .02, sfx_pop, .7); S(tHB + .05, sfx_sparkle, .6)
for k in range(6): S(tHB + .08 + k * .05, sfx_pop, .22)
S(L[2] + .1, sfx_squeak, .2)
# --- scene 3: Bo runs over, overjoyed
for k in np.arange(L[3] - .2, L[3] + .7, .15): S(k, sfx_thud, .2); S(k + .05, sfx_tick, .25)
S(L[3] + .4, sfx_heart, .5); S(L[3] + .45, sfx_sparkle, .5)
for k in range(4): S(L[3] + .7 + k * .28, sfx_boing, .25)
# --- scene 4: everybody gathers, the cake slides off and lands
for k in np.arange(tGather, tGather + 1.0, .17): S(k, sfx_tick, .22); S(k + .05, sfx_thud, .15)
S(tPush - .15, sfx_squeak, .3); S(tPush, lambda: sfx_whoosh(.7), .5)
S(tPush + .7, sfx_thud, 1.0); S(tPush + .72, sfx_stomp, .7); S(tPush + .74, sfx_squish, .6); S(tPush + .8, sfx_boing, .5)
S(tPush + .85, sfx_thud, .6)
# --- scene 5: sprinkles
for k in np.arange(tSpr, tSpr + 2.2, .06): S(k, sfx_sprinkle, .35)
S(W(5, 4), sfx_sparkle, .5); S(W(5, 4) + .08, sfx_heart, .4)
# --- scene 6: Boo lights the candles
for i in range(5):
    S(tCandles + i * .12, sfx_ignite, .6); S(tCandles + i * .12 + .03, sfx_sparkle, .35)
S(tCandles + .6, sfx_sparkle, .7); S(L[6], lambda: sfx_whoosh(.6), .3)
# --- scene 7: the wish, the big breath, the blow
S(tBite, sfx_gasp, .5)
S(tBlow - .3, sfx_gasp, .6)
S(tBlow, lambda: sfx_blow(.6), .9)
for i in range(5): S(tBlow + i * .05, sfx_tick, .35)
# --- scene 8: the cake is full of cousins
S(tCousins, sfx_eep, .5); S(tCousins + .08, sfx_squeak, .35)
for k in range(6): S(tCousins + .2 + k * .14, sfx_tick, .3)
S(L[8], sfx_boing, .5); S(L[8] + .6, sfx_gulp, .4)
# --- scene 9: sharing the cake
for i in range(7):
    t = tShare + i * .22
    S(t, lambda: sfx_whoosh(.5), .3); S(t + .55, sfx_gulp, .5); S(t + .6, sfx_crunch, .5)
S(tShare + 1.6, lambda: sfx_whoosh(.7), .5); S(tShare + 2.3, sfx_gulp, .8)
S(tShare + .6, sfx_heart, .4); S(tShare + .7, sfx_sparkle, .5)
# --- scene 10: Gumdrop's mouthful
S(tYum, lambda: sfx_roar(.7), .7); S(tYum + .02, sfx_thud, .4)
S(W(10, 3), sfx_sparkle, .5); S(W(10, 3) + .05, sfx_heart, .4)
# --- scene 11: the finale — confetti, cheers, trumpet
S(tFin - .1, lambda: sfx_trumpet(.8), .6)
for k in range(10): S(tFin + k * .1, sfx_pop, .4)
S(tFin + .05, lambda: sfx_cheer(1.4), .6); S(tFin + 1.1, lambda: sfx_cheer(1.2), .45)
for k in range(5): S(tFin + .2 + k * .35, sfx_sparkle, .45)
S(tFin + .3, sfx_ding, .5); S(tFin + .9, lambda: sfx_trumpet(.5), .35)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = r'''# ---------- music (120 BPM; the same C - Am - F - G tune as the whole series — this is the big finale arrangement) ----------
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
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_intro = t < tTaDa
    sec_party1 = tTaDa <= t < tSpr
    sec_sprinkle = tSpr <= t < tCandles
    sec_candles = tCandles <= t < tWish
    sec_wish = tWish <= t < tBlow + .3
    sec_cousins = tBlow + .3 <= t < tShare
    sec_share = tShare <= t < tFin
    sec_fin = tFin <= t
    if sec_intro:
        if e == 0: add(music, t, bass(midi(36), 1.0), .4)
        if e in (3, 6): add(music, t, marimba(midi(ARPU[(k // 3) % 8] + 12), .5), .16)
        continue
    if sec_wish:
        if e == 0: add(music, t, bass(midi(root), 1.2), .35)
        if e in (2, 6): add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .5), .2)
        continue
    if sec_cousins:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .32)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    if sec_candles:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .2)
        if e % 2 == 1: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .5), .2)
        continue
    sv = {True: .9}.get(sec_party1 or sec_share or sec_fin, .6)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_share or sec_fin) else 0)), .55), .30)
    if sec_sprinkle:
        if e % 2 == 1: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .4), .2)
    if sec_party1 or sec_share or sec_fin:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    if sec_fin:
        if e in (0, 2, 4, 6): add(music, t, kick(), .3)
        add(music, t, bass(midi(root + (12 if e % 2 else 0)), .3), .35)
# stingers: the ta-da, the ignition run, the blow-out, the finale run
for j, nn in enumerate([60, 64, 67, 72, 76, 79]):
    add(music, tTaDa + j * .08, marimba(midi(nn + 12), .5), .25)
for j, nn in enumerate([72, 74, 76, 79, 81, 84, 88]):
    add(music, tCandles - .1 + j * .1, marimba(midi(nn + 12), .4), .22)
add(music, tBlow + .1, bass(midi(36), .8), .5)
for j, t in enumerate(np.arange(tFin - .4, tFin + .6, .08)):
    add(music, float(t), marimba(midi(RUN[(j * 2) % len(RUN)] - 12), .3), .22)
for nn in [48, 60, 64, 67, 72, 76, 79]:
    add(music, 29.4, pluck(midi(nn), .7), .36)
add(music, 29.4, marimba(midi(88), .7), .4)
add(music, 29.4, bass(midi(36), 1.0), .5)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + newsfx + events + music + tail)
print("audio.py written")
