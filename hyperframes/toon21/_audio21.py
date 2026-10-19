TITLE = "Bo and the Pancake 21: The Great Pancake Festival"

moments = '''# ---- key moments (mirror of the constants in _body21.js)
tTable = .8
tSpat = W(7, 3)
tBlack = L[9] + .15
tLights = L[11] - .05
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_blackout():
    t = T(.5); f = 900 * np.exp(-t * 7) + 60
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 6) * .5
def sfx_lightson():
    t = T(.4); f = 120 + 900 * (t / .4) ** 2
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .4) ** .7 * .35


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the saucer leaves, the festival table pops up
S(.1, lambda: sfx_creak(.4), .25); S(.3, lambda: sfx_whoosh(.9), .6); S(.35, sfx_stomp, .4)
S(tTable, sfx_bigpop, .55); S(tTable + .05, lambda: sfx_swell(.8), .3)
for i in range(6): S(tTable + .4 + i * .1 + .3, sfx_thud, .22); S(tTable + .4 + i * .1 + .3, sfx_pop, .22)
S(tTable + .9, sfx_sparkle, .55)
# --- scene 2: the King opens the games
S(L[2], lambda: sfx_trumpet(.7), .45); S(L[2] + .7, lambda: sfx_cheer(1.8), .6); S(L[2] + .8, sfx_bigpop, .5); S(L[2] + .85, sfx_sparkle, .6)
for i in range(9): S(L[2] + 1.0 + i * .05, sfx_boing, .14)
# --- scene 3: "Wow!"
S(L[3] + .4, sfx_boing, .5); S(L[3] + .6, sfx_heart, .5); S(L[3] + .65, sfx_sparkle, .45)
# --- scene 4: free samples
for i in range(4): S(L[4] + .6 + i * .28, lambda: sfx_whoosh(.35), .3); S(L[4] + 1.15 + i * .28, sfx_crunch, .4); S(L[4] + 1.3 + i * .28, sfx_gulp, .25)
S(L[4] + .5, sfx_sparkle, .4)
# --- scene 5: Coco jumps for joy
for d in [.1, .8]: S(L[5] + d, sfx_boing, .55)
S(L[5] + .1, lambda: sfx_cheer(.8), .3); S(L[5] + .4, sfx_heart, .4)
# --- scene 6: Zap rolls the pedestal in
S(L[6] - 1.05, lambda: sfx_patter(.8), .35); S(L[6] - .2, lambda: sfx_patter(1.5), .5)
for k in range(12): S(L[6] - .2 + k * .12, sfx_tick, .22)
for k in range(4): S(L[6] + .5 + k * .32, sfx_sparkle, .45)
S(L[6] + 1.1, sfx_ting, .6)
# --- scene 7: the prize
for k in range(3): S(tSpat + k * .3, sfx_ting, .5); S(tSpat + k * .3, sfx_sparkle, .4)
S(L[7] + .3, lambda: sfx_trumpet(.4), .3)
# --- scene 8: Mochi is unimpressed
S(L[8] - .5, lambda: sfx_patter(.8), .4); S(L[8] + .3, sfx_sparkle, .3); S(L[8] + .5, sfx_squeak, .2)
# --- scene 9: blackout, something takes the spatula
S(tBlack, sfx_blackout, .9); S(tBlack, sfx_gasp, .5); S(tBlack + .05, lambda: sfx_swell(1.5), .35)
for k in range(4): S(tBlack + .3 + k * .1, sfx_tick, .35)
S(tBlack + .55, sfx_pop, .5); S(tBlack + .6, sfx_sparkle, .4)
for k in range(10): S(tBlack + .6 + k * .15, sfx_tick, .13)
S(tBlack + 1.0, sfx_squeak, .35); S(tBlack + 1.3, sfx_squeak, .3)
# --- scene 10: Blip is scared
S(L[10] + .1, sfx_eep, .4); S(L[10] + .3, lambda: sfx_buzz(1.0, 160), .12)
# --- scene 11: lights on, an empty pedestal
S(tLights, sfx_lightson, .7); S(tLights + .15, sfx_thump, .5); S(tLights + .2, sfx_gasp, .5)
S(tLights + .3, lambda: sfx_swell(1.2), .3)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a bright festival, a shiny prize, then a sudden dark mystery) ----------
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
MYST = [57, 60, 63, 60, 57, 60, 62, 59]
SNEAK = [57, 58, 59, 60, 59, 58, 57, 52]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.6: continue
    sec_fest = t < L[6] - .3
    sec_prize = L[6] - .3 <= t < tBlack
    sec_dark = tBlack <= t
    if sec_dark:
        if e in (0, 4): add(music, t, bass(midi(28 if e == 0 else 26), .9), .5)
        if e % 2 == 1: add(music, t, pizz(midi(MYST[e] + 12), .15), .2)
        if e == 6 and t < tLights: add(music, t, marimba(midi(MYST[e] + 24), .25), .12)
        continue
    sv = 1.0 if sec_fest else .8
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55 * (1 if sv >= 1 else .75))
    if e == 5 and sv >= 1: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_fest else 0)), .55), .30 * (1 if sv >= 1 else .75))
    if sec_fest:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    elif sec_prize:
        if e % 2 == 1: add(music, t, shaker(), .25)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .12)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, L[2] + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, L[2], bass(midi(36), 1.0), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tSpat + j * .06, marimba(midi(nn), .5), .24)
add(music, tBlack, bass(midi(24), 1.6), .8)
for nn in [45, 52, 57, 60]:
    add(music, tLights + .15, pluck(midi(nn), 1.6), .32)
add(music, tStk, marimba(midi(88), .8), .2)

'''
