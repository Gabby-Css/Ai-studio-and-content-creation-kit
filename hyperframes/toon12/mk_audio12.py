"""Generate toon12/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 12: Planet Gloop'").replace("_scenes3.js", "_scenes12.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

moments = r'''# ---- key moments (mirror of the constants in _scenes12.js)
tCut = .85
tExit = {'bp': 1.0, 'zp': 1.25, 'bo': 1.5, 'mc': 1.75, 'tf': 2.0, 'cm': 2.25, 'nm': 2.5, 'pt': 2.75, 'gm': 3.0}
tPop = W(2, 3)
tJump = L[3]
tCrown = W(7, 1)
tPar0 = W(7, 3); tPar1 = L[8] + .2
tCook = L[8]
tQuake = L[9] + .4
tKing = L[10] - .5
tStk = L[11] + DU[11] + .35


'''

newsfx = r'''def sfx_chirp():
    t = T(.16); f = 1500 + 900 * np.sin(2 * np.pi * 22 * t) + 500 * (t / .16)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .16) * .3
def sfx_squelchj():
    t = T(.3); n = rng.standard_normal(len(t)); y = lowpass(n, .18) - lowpass(n, .02)
    return (y * np.exp(-t * 10) * 1.2 + np.sin(2 * np.pi * (260 - 140 * t / .3) * t) * np.exp(-t * 12) * .5)
def sfx_grow():
    t = T(.5); f = 200 + 700 * (t / .5) ** 1.5
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .5) * .35
def sfx_rumble(d=3.0):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .01) * 7
    s = np.sin(2 * np.pi * 44 * t + 3 * np.sin(2 * np.pi * 7 * t)) * (.6 + .4 * np.sin(2 * np.pi * 11 * t))
    return (s + n * .6) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .8) * .85
def sfx_crack():
    t = T(.5); n = rng.standard_normal(len(t)); y = n - lowpass(n, .3)
    return y * np.exp(-t * 14) * .9 + np.sin(2 * np.pi * np.cumsum(120 * np.exp(-t * 6) + 40) / SR) * np.exp(-t * 6) * .5
def sfx_geyser(d=.9):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .3) - lowpass(n, .02)
    return y * np.sin(np.pi * t / d) ** .6 * 1.2
def sfx_roar(d=1.0):
    t = T(d); f = 62 + 18 * np.sin(2 * np.pi * 5 * t) - 14 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 27 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .04) * np.exp(-t * 2.2) * 1.0
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8
def sfx_fanfare():
    out = np.zeros(int(SR * 1.2))
    for i, f in enumerate([523, 659, 784, 1047]):
        t = T(.45); add(out, i * .12, (np.sin(2 * np.pi * f * t) + .4 * np.sin(4 * np.pi * f * t)) * np.exp(-t * 4) * .35)
    return out


'''

events = r'''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: the cut outside, everybody steps out of the saucer and grows back to size
S(.1, sfx_sparkle, .4)
S(tCut - .1, lambda: sfx_whoosh(.6), .55); S(tCut, sfx_sparkle, .6); S(tCut + .05, sfx_ding, .4)
for p, t0 in tExit.items():
    S(t0, sfx_pop, .55 if p != 'gm' else .9); S(t0 + .05, sfx_grow, .4)
    for k in np.arange(t0 + .5, t0 + 1.4, .17): S(k, sfx_tick, .16)
S(tExit['gm'] + .5, sfx_thud, .7); S(tExit['gm'] + .52, sfx_squelchj, .6)
# --- scene 2: jelly ground, little Gloopians pop out
for i in range(4):
    t = tPop + i * .18
    S(t, sfx_squelchj, .6); S(t + .3, sfx_pop, .55); S(t + .35, sfx_chirp, .5)
for i in range(6): S(tPop + .05 * i, sfx_squelchj, .22)
for i in range(4): S(tPop + .8 + i * .28, sfx_chirp, .35)
# --- scene 3: low-gravity jumps
for k in range(2):
    for i in range(6):
        S(tJump + i * .04 + k * 1.35 - .1, sfx_boing, .3); S(tJump + i * .04 + k * 1.35 + .62, lambda: sfx_whoosh(.6), .15)
    S(tJump + k * 1.35 + 1.33, sfx_squelchj, .8)
# --- scene 4/5: the Gloopians discover Flapjack
for k in np.arange(L[4], L[4] + .9, .17): S(k, sfx_tick, .2)
S(L[4] + .5, sfx_gasp, .6)
for i in range(4): S(L[5] + i * .1, sfx_chirp, .5)
S(L[5] + .3, sfx_sparkle, .5)
# --- scene 6
S(L[6], sfx_eep, .3)
# --- scene 7: the crowning and the parade
S(tCrown, lambda: sfx_whoosh(.5), .35); S(tCrown + .6, sfx_pop, .8); S(tCrown + .62, sfx_sparkle, .7); S(tCrown + .65, sfx_fanfare, .6)
for k in np.arange(tPar0, tPar1 - .2, .42): S(k, sfx_boing, .22); S(k + .05, sfx_tick, .2)
for k in np.arange(tPar0, tPar1, .6): S(k, sfx_sparkle, .22)
# --- scene 8: Truffle cooks, pancake slices fly
S(tCook - .1, lambda: sfx_whoosh(.4), .3)
for i in range(5):
    t = tCook + .5 + i * .28
    S(t, lambda: sfx_whoosh(.5), .3); S(t + .55, sfx_gulp, .5); S(t + .6, sfx_crunch, .5); S(t + .65, sfx_chirp, .4)
S(tCook + .6, sfx_heart, .4)
# --- scene 9: the ground wobbles
S(tQuake - .1, lambda: sfx_rumble(3.2), .95)
for k in range(7): S(tQuake + k * .45, sfx_stomp, .35)
S(tQuake + 1.0, sfx_crack, .9)
for i in range(4): S(tQuake + 1.6 + i * .08, sfx_pop, .45); S(tQuake + 1.6 + i * .08, sfx_eep, .3)
S(tQuake, sfx_gasp, .7)
# --- scene 10: the Gloop King rises
S(tKing - .1, lambda: sfx_rumble(2.2), .9); S(tKing, lambda: sfx_geyser(1.0), .8); S(tKing + .05, sfx_squelchj, .8)
S(tKing + .9, sfx_stomp, .9); S(tKing + .92, sfx_thud, .8); S(tKing + .95, sfx_sparkle, .4)
S(L[10], lambda: sfx_roar(1.0), .85)
S(tKing + .95, sfx_gasp, .6)
# --- scene 11: uh-oh
S(L[11] - .05, sfx_gulp, .5)
for k in range(4): S(L[11] + .2 + k * .3, sfx_tick, .15)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = r'''# ---------- music (120 BPM; the series tune with an exotic pentatonic twist for Planet Gloop) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
PENT = [72, 74, 76, 79, 81, 84, 81, 79]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_cock = t < tCut
    sec_out = tCut <= t < tPop
    sec_play = tPop <= t < L[4]
    sec_wonder = L[4] <= t < tPar0 - .5
    sec_parade = tPar0 - .5 <= t < tQuake - .3
    sec_quake = tQuake - .3 <= t < tKing + 1.2
    sec_king = tKing + 1.2 <= t < L[11] - .1
    sec_end = L[11] - .1 <= t
    if sec_cock:
        if e in (0, 4): add(music, t, bass(midi(root), .45), .45)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .26)
        continue
    if sec_quake:
        if e in (0, 2, 4, 6): add(music, t, bass(midi(28 if (e // 2) % 2 == 0 else 31), .5), .6)
        if e % 2 == 1: add(music, t, pizz(midi(40 + 2 * (k % 3)), .1), .3)
        continue
    if sec_king:
        if e in (0, 4): add(music, t, bass(midi(26 if bar % 2 == 0 else 29), 1.0), .6)
        if e in (2, 6): add(music, t, marimba(midi(PENT[(k // 2) % 8] - 12), .5), .25)
        continue
    if sec_end:
        if e == 0: add(music, t, bass(midi(28), 1.2), .45)
        if e in (2, 6): add(music, t, pizz(midi(PENT[(k // 2) % 8] + 12), .15), .26)
        continue
    sv = .85 if (sec_parade or sec_play) else .6
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    if sec_out or sec_wonder:
        if e % 2 == 0: add(music, t, marimba(midi(PENT[(k // 2) % 8]), .5), .24)
    else:
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
    if sec_play or sec_parade:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
add(music, tCut, marimba(midi(91), .8), .3)
add(music, tCrown + .6, marimba(midi(84), .6), .3); add(music, tCrown + .62, marimba(midi(88), .6), .26); add(music, tCrown + .64, marimba(midi(91), .6), .24)
add(music, tQuake + 1.0, bass(midi(24), 1.6), .65)
add(music, tKing + .9, bass(midi(24), 1.8), .7)
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .33)
add(music, 29.4, marimba(midi(84), .6), .4)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + newsfx + events + music + tail)
print("audio.py written")
