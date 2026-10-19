TITLE = "Bo and the Pancake 18: The Gray Planet"

moments = '''# ---- key moments (mirror of the constants in _body18.js)
tCut = L[5] - .2
tOut0 = tCut + 1.05
tSl = W(7, 2)
tBite = tSl + .7
tWorld = W(9, 1)
tShake = L[11] - .1
tStk = L[11] + DU[11] + .35
tTw = tOut0 + .5
NSL = 18


'''

extra = '''def sfx_wobble(d=.6):
    t = T(d); f = 180 + 60 * np.sin(2 * np.pi * 7 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) * .25


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1-3: Rocky grins, Bo scolds, "nobody saw anything"
S(0.0, lambda: sfx_swell(1.2), .22); S(.1, sfx_chirp, .35); S(W(1, 4), sfx_gasp, .4)
S(L[2] - .25, lambda: sfx_patter(.7), .55); S(L[2] + .35, sfx_squeak, .4); S(L[2] + .45, sfx_boing, .4)
for k in range(5): S(L[2] + .4 + k * .13, sfx_tick, .2)
S(L[3] - .08, sfx_pop, .55); S(L[3] + .35, sfx_gulp, .35); S(L[3] + .8, lambda: sfx_cheer(.9), .3); S(L[3] + .9, sfx_boing, .3)
# --- scene 4: the saucer descends, rumble, landing thump
S(L[4] - .1, lambda: sfx_rumble(2.4), .5); S(L[4] + .7, lambda: sfx_riser(1.2), .45)
for k, f in enumerate([880, 1100, 988, 1320, 1100, 1480]): S(L[4] + .3 + k * .3, lambda f=f: sfx_beep(f, .1), .16)
S(tCut - .3, lambda: sfx_whoosh(.4), .5); S(tCut - .05, sfx_thud, .9); S(tCut, sfx_stomp, .6)
# --- scene 5: a gray, sad planet; the ship lands; everyone steps out
S(tCut, lambda: sfx_whoosh(.75, False), .6); S(tCut + .75, sfx_thump, .95); S(tCut + .8, lambda: sfx_creak(.5), .4)
S(tCut + 1.0, lambda: sfx_whimper(.7, 700), .35); S(tCut + 1.6, lambda: sfx_whimper(.6, 640), .3)
for i in range(12): S(tCut + 1.1 + i * .22 + .15, sfx_plip, .35)
for i in range(9): S(tOut0 + i * .12, sfx_grow, .16)
S(tOut0 + .5, lambda: sfx_patter(2.0), .6)
for k in range(13): S(tTw + k * .12, sfx_waddle, .28)
# --- scene 6: "Pancakes! You really came!"
S(L[6] - .05, sfx_gasp, .4)
for d in [.1, .6, 1.1]: S(L[6] + d, sfx_boing, .5)
S(L[6] + .2, lambda: sfx_trumpet(.4), .25); S(L[6] + .25, sfx_sparkle, .5)
# --- scene 7: the tower is sliced and eaten
S(tSl - .3, lambda: sfx_swell(.8), .3); S(tSl + .1, sfx_ding, .3)
for i in range(4): S(tSl + i * .12, lambda: sfx_whoosh(.4), .3); S(tBite + i * .12, sfx_crunch, .5); S(tBite + .45 + i * .12, sfx_gulp, .3)
for k in range(17): S(tSl + .25 + k * .05, sfx_pop, .13)
S(tSl + .3, sfx_sparkle, .45)
# --- scene 8: yum yum yum, the Zorpians turn colourful one by one
S(tBite, lambda: sfx_swell(1.2), .3)
for i in range(4): S(tBite + i * .12 + .2, sfx_sparkle, .5); S(tBite + i * .12 + .3, sfx_heart, .4); S(tBite + i * .12 + .2, lambda: sfx_trumpet(.3), .18)
for i in range(4):
    S(L[8] + .1 + i * .08, sfx_boing, .3); S(L[8] + .6 + i * .08, sfx_boing, .3)
# --- scene 9: colour floods the planet
S(tWorld, lambda: sfx_riser(1.2), .5); S(tWorld + .5, sfx_bigpop, .55); S(tWorld + .55, sfx_sparkle, .7)
S(tWorld + .5, lambda: sfx_trumpet(.7), .35); S(tWorld + .6, lambda: sfx_cheer(1.6), .6)
for k in range(5): S(tWorld + .3 + k * .12, sfx_pop, .3)
for i in range(9): S(tWorld + .6 + i * .05, sfx_boing, .15); S(tWorld + 1.4 + i * .05, sfx_boing, .12)
# --- scene 10: a thank-you hug
S(L[10] - .3, lambda: sfx_patter(.5), .35); S(L[10] + .3, sfx_heart, .6); S(L[10] + .4, sfx_sparkle, .55)
S(L[10] + .5, lambda: sfx_cheer(.9), .35)
# --- scene 11: the ground shakes, a shape rises behind the mountains
S(tShake, lambda: sfx_rumble(3.2), .8); S(tShake + .5, sfx_gasp, .5); S(tShake + 1.2, lambda: sfx_swell(1.6), .4)
for k in range(7): S(tShake + .1 + k * .42, sfx_thump, .4 + k * .06)
S(tShake + 1.3, lambda: sfx_roar(1.2), .5)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .35)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a mystery, a gray lonely planet, a hopeful turn, colour floods in, a dark rumbling end) ----------
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
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
MYST = [57, 60, 63, 60, 57, 60, 62, 59]
SAD = [69, 72, 76, 72, 67, 71, 74, 71]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.6: continue
    sec_a = t < L[2]
    sec_b = L[2] <= t < L[4]
    sec_land = L[4] <= t < tCut + 1.0
    sec_gray = tCut + 1.0 <= t < L[6]
    sec_hope = L[6] <= t < tBite
    sec_color = tBite <= t < L[10]
    sec_warm = L[10] <= t < tShake
    sec_dark = tShake <= t
    if sec_a:
        if e in (0, 4): add(music, t, bass(midi(33 if bar % 2 == 0 else 31), 1.0), .5)
        if e % 2 == 0: add(music, t, pizz(midi(MYST[e] + 12), .18), .22)
        if e in (3, 7): add(music, t, marimba(midi(MYST[e] + 24), .25), .12)
        continue
    if sec_b:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .26)
        if e in (0, 4): add(music, t, bass(midi(33 if e == 0 else 32), .6), .4)
        continue
    if sec_land:
        if e in (0, 4): add(music, t, bass(midi(28), .9), .55)
        if e % 2 == 1: add(music, t, marimba(midi(ARPU[e] - 12), .2), .13)
        continue
    if sec_gray:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .15)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .18)
        if e == 0: add(music, t, bass(midi(root), 1.4), .32)
        continue
    if sec_dark:
        if e in (0, 2, 4, 6): add(music, t, bass(midi(28 if e < 4 else 26), .9), .5)
        if e % 2 == 1: add(music, t, pizz(midi(MYST[e] + 0), .15), .2)
        continue
    sv = 1.0 if (sec_color or sec_warm) else .75
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55 * (1 if sv >= 1 else .7))
    if e == 5 and sv >= 1: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_color else 0)), .55), .30 * (1 if sv >= 1 else .7))
    if sec_color or sec_warm:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
add(music, tCut, bass(midi(24), 1.4), .7)
add(music, tBite, marimba(midi(91), .6), .3)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tWorld + j * .07, marimba(midi(nn + 12), .5), .28)
add(music, tWorld, bass(midi(36), 1.0), .6)
for j, nn in enumerate([72, 76, 79, 84]): add(music, L[6] + j * .07, marimba(midi(nn), .5), .22)
for nn in [40, 47, 52, 56]:
    add(music, tShake + 1.3, pluck(midi(nn), 1.8), .35)
add(music, tStk, marimba(midi(88), .8), .2)

'''
