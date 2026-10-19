TITLE = "Bo and the Pancake 22: The Missing Spatula"

moments = '''# ---- key moments (mirror of the constants in _body22.js)
tPrints = L[5] + .2
tPop = L[8] + .35
tTie = W(10, 4)
tFloat = L[11]
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_sniff():
    t = T(.22); n = rng.standard_normal(len(t)); return lowpass(n, .3) * np.sin(np.pi * t / .22) ** .8 * .35
def sfx_inflate(d=.45):
    t = T(d); f = 260 + 700 * (t / d) ** 1.5; return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .6 * .3


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: a gasp and an empty pedestal
S(.0, sfx_gasp, .5); S(.1, lambda: sfx_swell(1.4), .3); S(.5, sfx_creak, .2)
# --- scene 2: the King roars
S(L[2], lambda: sfx_roar(.9), .45); S(L[2], lambda: sfx_rumble(1.8), .45)
for k in range(3): S(L[2] + .3 + k * .35, sfx_thump, .3)
# --- scene 3: Mochi, detective
S(L[3] + .2, sfx_pop, .5); S(L[3] + .5, sfx_boing, .45); S(L[3] + .5, sfx_sparkle, .45)
S(L[3] + .7, sfx_ting, .5); S(L[3] + .75, sfx_whoosh, .25)
# --- scene 4: Bo sniffs
S(L[4] - .75, lambda: sfx_patter(.65), .45)
for k in range(6): S(L[4] + .6 + k * .3, sfx_sniff, .4)
# --- scene 5: sticky footprints
for i in range(12): S(tPrints + i * .14, sfx_plop, .35); S(tPrints + i * .14 + .04, sfx_squelchj, .12)
S(tPrints + .1, sfx_sparkle, .35); S(L[5] + .3, lambda: sfx_patter(1.0), .4)
# --- scene 6: Zap scans
for k in range(4): S(L[6] + .3 + k * .4, lambda: sfx_scan(.5), .3)
S(L[6] + .5, sfx_chirp, .3)
# --- scene 7: it must be Jiggle! the bulb, everyone looks
S(L[7] + .35, sfx_ting, .8); S(L[7] + .4, sfx_sparkle, .5); S(L[7] + .5, sfx_gasp, .4)
S(L[7] + 1.0, sfx_gulp, .3); S(L[7] + 1.0, sfx_squeak, .35)
# --- scene 8: Jiggles pop out
for i in range(4): S(tPop + i * .18, sfx_boing, .5); S(tPop + i * .18 + .1, sfx_pop, .5); S(tPop + i * .18 + .4, sfx_squelchj, .35)
S(tPop + .5, sfx_gasp, .4)
for i in range(4): S(tPop + .9 + i * .1, sfx_boing, .22)
# --- scene 9: the Jiggles' excuse
S(L[9] - .2, sfx_bigpop, .45); S(L[9], sfx_sparkle, .5); S(L[9] + .2, sfx_ting, .5)
for k in range(4): S(L[9] + .2 + k * .3, sfx_squeak, .2)
# --- scene 10: Peanut's balloons
S(L[9] + .6, lambda: sfx_patter(.9), .3); S(L[10] + .3, lambda: sfx_trumpet(.3), .2)
S(tTie, lambda: sfx_inflate(.45), .5); S(tTie + .35, sfx_pop, .4); S(tTie + .4, sfx_sparkle, .5)
S(tTie + .5, lambda: sfx_whoosh(.6), .4); S(tTie + .5, sfx_boing, .4)
# --- scene 11: up, up, away
S(L[11] - .1, lambda: sfx_riser(1.2), .35); S(L[11], lambda: sfx_whoosh(2.4), .45); S(L[11] + .2, sfx_gasp, .45)
for k in range(8): S(L[11] + .3 + k * .3, lambda f=900 + k * 90: sfx_beep(f, .08), .1)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; shock, a grumpy king, a sneaky detective theme, a reveal, a floating finish) ----------
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
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.6: continue
    sec_shock = t < L[3]
    sec_detect = L[3] <= t < L[7]
    sec_reveal = L[7] <= t < tTie
    sec_float = tTie <= t
    if sec_shock:
        if e in (0, 4): add(music, t, bass(midi(28 if e == 0 else 26), .9), .55)
        if e % 2 == 1: add(music, t, pizz(midi(MYST[e] + 12), .15), .2)
        continue
    if sec_detect:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e in (0, 4): add(music, t, bass(midi(33 if e == 0 else 32), .6), .42)
        if e in (3, 7): add(music, t, marimba(midi(SNEAK[e] + 24), .2), .13)
        continue
    sv = 1.0
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_float else 0)), .55), .30)
    if sec_float and e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
add(music, .05, bass(midi(24), 1.2), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, L[7] + .35 + j * .06, marimba(midi(nn), .5), .26)
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, tPop + j * .05, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tTie + .5 + j * .06, marimba(midi(nn), .5), .26)
for nn in [45, 52, 57, 60]:
    add(music, L[11] + 1.2, pluck(midi(nn), 1.6), .3)
add(music, tStk, marimba(midi(88), .8), .2)

'''
