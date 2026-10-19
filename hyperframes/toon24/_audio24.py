TITLE = "Bo and the Pancake 24: The Great Flip-Off"

moments = '''# ---- key moments (mirror of the constants in _body24.js)
tCut = L[1] + .55
tT = W(3, 3)
tHit = tT + 1.0
tM = L[7] + .1
tB = W(8, 5)
tF = W(9, 3)
tScore = L[11] + .2
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_flip(d=.9):
    t = T(d); f = 500 + 900 * np.sin(np.pi * t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .5 * .22
def sfx_splat2():
    t = T(.3); n = rng.standard_normal(len(t)); return lowpass(n, .3) * np.exp(-t * 14) * .6 + np.sin(2 * np.pi * 120 * t) * np.exp(-t * 16) * .4


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: back to the kitchen
S(tCut - .1, lambda: sfx_whoosh(.4), .4); S(tCut, sfx_bigpop, .5); S(tCut + .1, lambda: sfx_cheer(1.2), .45); S(tCut + .2, sfx_sparkle, .5)
S(tCut + .2, lambda: sfx_trumpet(.5), .3)
# --- scene 2: the scoreboard
S(L[2] - .3, sfx_pop, .5); S(L[2] - .25, lambda: sfx_holoon(.4), .4)
for k in range(3): S(L[2] + .3 + k * .2, lambda: sfx_beep(880 + k * 220, .1), .3)
S(L[2] + .9, sfx_boing, .4)
# --- scene 3/4: Truffle's flip hits the ceiling
S(tT - .12, lambda: sfx_whoosh(.3), .4); S(tT, lambda: sfx_flip(1.0), .6); S(tT, sfx_boing, .4)
S(tHit, sfx_splat2, .9); S(tHit + .02, sfx_thud, .5); S(tHit + .1, sfx_gasp, .5)
for k in range(3): S(tHit + .5 + k * .3, sfx_plip, .35)
# --- scene 5: Coco jumps
S(L[5] + .1, sfx_boing, .5); S(L[5] + .8, sfx_boing, .5); S(L[5], lambda: sfx_cheer(.8), .3)
# --- scene 6/7: Mochi's spaceship pancake
S(L[6] - .6, lambda: sfx_patter(.8), .4); S(L[2] + 1.3, lambda: sfx_patter(.8), .3); S(L[5] + .1, lambda: sfx_patter(.9), .22); S(tM + 2.3, lambda: sfx_patter(.7), .22); S(L[6] + .8, sfx_chirp, .3)
S(tM, lambda: sfx_riser(.5), .5); S(tM + .5, lambda: sfx_holoon(1.7), .45); S(tM + .5, lambda: sfx_buzz(1.7, 330), .12)
for k in range(10): S(tM + .5 + k * .17, sfx_sparkle, .22)
S(tM + 2.2, lambda: sfx_whoosh(.5, False), .5); S(tM + 2.75, sfx_pop, .5); S(tM + 2.8, sfx_sparkle, .5)
# --- scene 8: Bo's flip
S(tB - .12, lambda: sfx_whoosh(.3), .4); S(tB, lambda: sfx_flip(.8), .55); S(tB + .05, sfx_boing, .4)
S(L[8] + .4, lambda: sfx_swell(1.0), .25); S(tB + 1.6, sfx_plop, .4)
# --- scene 9/10: Flapjack flies
S(tF - .05, lambda: sfx_whoosh(.9), .55); S(tF, sfx_boing, .5); S(tF + .1, sfx_gasp, .4); S(tF + .1, lambda: sfx_flip(.9), .45)
S(L[10] + .9, lambda: sfx_whoosh(.9, False), .4); S(L[10] + 1.7, sfx_thud, .5)
for d in [1.7, 1.95, 2.1]: S(L[10] + d, sfx_boing, .22)
# --- scene 11: perfect tens
for i in range(3): S(tScore + i * .45, sfx_stickerpop, .7); S(tScore + i * .45 + .05, sfx_ding, .45); S(tScore + i * .45, sfx_sparkle, .5)
S(tScore + .8, lambda: sfx_cheer(2.0), .6); S(tScore + .85, lambda: sfx_trumpet(1.0), .4)
for i in range(9): S(tScore + 1.0 + i * .05, sfx_boing, .14)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a game-show theme: a bright opener, a tense flip, a silly spaceship, a happy finish) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
SNEAK = [57, 58, 59, 60, 59, 58, 57, 52]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_open = t < L[3]
    sec_tense = L[3] <= t < tHit
    sec_play = tHit <= t < L[7]
    sec_ship = L[7] <= t < L[8]
    sec_bo = L[8] <= t < tScore
    if sec_tense:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .12), .3)
        if e in (0, 4): add(music, t, bass(midi(33 if e == 0 else 32), .6), .42)
        if e in (6,): add(music, t, marimba(midi(ARPU[e] + 12), .2), .15)
        continue
    sv = 1.0 if (sec_open or sec_play or sec_bo or t >= tScore) else .85
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if t >= tScore else 0)), .55), .30)
    if sec_ship and e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .22), .16)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tCut + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, tCut, bass(midi(36), 1.0), .6)
add(music, tHit, bass(midi(28), .9), .6); add(music, tHit, marimba(midi(96), .4), .2)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tM + j * .06, marimba(midi(nn), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tB + j * .05, marimba(midi(nn), .5), .26)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tScore + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, tScore, bass(midi(36), 1.2), .65)
add(music, tStk, marimba(midi(88), .8), .2)

'''
