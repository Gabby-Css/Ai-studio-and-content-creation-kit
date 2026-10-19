TITLE = "Bo and the Pancake 32: The Syrup River"

moments = '''# ---- key moments (mirror of the constants in _body32.js)
tCut = L[4] - .15
tSpill = W(5, 2)
tSlide = L[6]
tRock = W(7, 3)
tFlyZ = L[8] + .05
FZ = 1.45
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_slurp(d=.8):
    t = T(d); f = 300 - 200 * (t / d) ** .6 + 40 * np.sin(2 * np.pi * 9 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-(t / d) ** 2 * 3) * .4 + lowpass(rng.standard_normal(len(t)), .1) * np.exp(-t * 6) * .3


def sfx_skidslide(d=1.2):
    t = T(d); n = rng.standard_normal(len(t)); return (n - lowpass(n, .3)) * np.exp(-t * 2.5) * np.minimum(1, t * 40) * .5 * (.7 + .3 * np.sin(2 * np.pi * 16 * t))


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scenes 1-3: racing down the hill
S(0.0, lambda: sfx_engine(7.0, 90, 150), .32)
for k in range(5): S(.3 + k * .12, lambda: sfx_whoosh(1.3), .12)
S(L[2] + .1, sfx_boing, .4); S(L[2] + .3, lambda: sfx_cheer(1.0), .35); S(W(2, 1), sfx_chirp, .4); S(W(2, 2), sfx_chirp, .4)
S(W(3, 1) - .1, lambda: sfx_sputter(1.0), .4); S(W(3, 1) - .1, lambda: sfx_whoosh(1.2), .45)
# --- scene 4: the river appears
S(tCut, lambda: sfx_whoosh(.8, False), .35); S(tCut + .3, lambda: sfx_swell(1.6), .25)
S(W(4, 4), lambda: sfx_slurp(1.0), .4); S(W(4, 4) + .1, sfx_gloop, .45)
for k in range(4): S(W(4, 4) + .2 + k * .35, sfx_gloop, .22)
S(W(4, 2), sfx_gasp, .35)
# --- scene 5: Truffle spills her syrup
S(tSpill - .3, lambda: sfx_whoosh(.4, False), .3); S(tSpill + .05, sfx_splat, .6); S(tSpill + .1, sfx_gloop, .55)
for k in range(5): S(tSpill + .2 + k * .12, sfx_plip, .3)
S(tSpill + .3, lambda: sfx_slurp(1.2), .35)
# --- scene 6: sliding and spinning
S(tSlide, sfx_gasp, .4)
for i, d in enumerate([.1, .15, .2, .25, .3]): S(tSlide + d, lambda: sfx_skidslide(1.6), .35); S(tSlide + d + .3, sfx_squeak, .22)
S(tSlide + .6, sfx_boing, .35); S(tSlide + .9, sfx_boing, .35); S(tSlide + 1.2, sfx_thud, .4)
S(tSlide + 1.0, lambda: sfx_wobble(.8), .3)
# --- scene 7: Zap's rocket boost
S(L[7] + .2, lambda: sfx_beep(880, .12), .3); S(tRock - .4, lambda: sfx_riser(.5), .4); S(tRock - .3, lambda: sfx_sputter(1.2), .45)
# --- scene 8: Zap jumps the river
S(tFlyZ, lambda: sfx_rocket(FZ + .4), .65); S(tFlyZ, sfx_bigpop, .5); S(tFlyZ + .1, lambda: sfx_whoosh(FZ), .5)
S(W(8, 3), lambda: sfx_cheer(1.2), .4)
# --- scene 9: Coco is stuck
S(L[9] + .05, lambda: sfx_whimper(.5), .3); S(L[9] + .1, lambda: sfx_slurp(.7), .35)
for k in range(5): S(L[9] + .3 + k * .28, sfx_gloop, .22); S(L[9] + .35 + k * .28, sfx_plip, .18)
S(L[9] + .2, sfx_chirp, .35)
# --- scene 10: Bo to the rescue
S(L[10] - .1, lambda: sfx_engine(1.4, 70, 150), .4); S(L[10] + .1, sfx_boing, .4)
# --- scene 11: push, pop, cheer
S(W(11, 2) - .25, lambda: sfx_engine(1.6, 90, 130), .35)
for k in range(5): S(W(11, 2) + k * .24, sfx_thump, .3)
S(W(11, 4) + .1, lambda: sfx_slurp(.9), .4); S(W(11, 5) - .1, sfx_bigpop, .55)
S(W(11, 5), lambda: sfx_cheer(2.0), .6); S(W(11, 5), sfx_sparkle, .5)
for i in range(8): S(W(11, 5) + .1 + i * .05, sfx_boing, .13)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a speedy racing groove, tension when the river shows up, wobbly slides, a boost, and a triumphant rescue) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
CHM = [[57, 60, 64], [52, 55, 59], [53, 57, 60], [52, 56, 59]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
WOB = [69, 72, 65, 69, 72, 76, 72, 65]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_race = t < tCut
    sec_river = tCut <= t < tSlide
    sec_slide = tSlide <= t < L[7]
    sec_boost = L[7] <= t < L[9]
    sec_stuck = L[9] <= t < L[10]
    sec_win = t >= L[10]
    if sec_race:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .45)
        if e % 2 == 1: add(music, t, shaker(), .38)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .26)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .13)
    elif sec_river:
        ch = CHM[bar]
        if e in (0, 4):
            for n_i, nn in enumerate(ch): add(music, t + n_i * .04, pluck(midi(nn), 1.4), .15)
        if e == 0: add(music, t, bass(midi(ch[0] - 12), 1.4), .34)
        if e % 2 == 0: add(music, t, kick(), .3)
        if e in (3, 7): add(music, t, shaker(), .3)
    elif sec_slide:
        add(music, t, marimba(midi(WOB[e] + 12 - (k % 3) * 2), .25), .22)
        if e in (0, 4): add(music, t, bass(midi(root), .3), .4)
        if e % 2 == 1: add(music, t, shaker(), .3)
    elif sec_boost:
        if e % 2 == 0: add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e in (0, 4): add(music, t, bass(midi(root), .4), .45)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .18)
        if e in (0, 3, 5):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
    elif sec_stuck:
        if e in (0, 4):
            for n_i, nn in enumerate(CHM[bar]): add(music, t + n_i * .03, pluck(midi(nn), 1.0), .14)
        if e in (2, 6): add(music, t, marimba(midi(WOB[e] + 12), .4), .18)
        if e == 0: add(music, t, bass(midi(ROOT[bar] - 7), 1.0), .3)
    else:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .8), .22)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tRock + j * .05, marimba(midi(nn + 12), .5), .25)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, W(11, 5) + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, W(11, 5), bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)

'''
