TITLE = "Bo and the Pancake 19: The Gray Muncher"

moments = '''# ---- key moments (mirror of the constants in _body19.js)
tBulb = L[6] + .3
tPlace = W(7, 1) - .2
tSizz = W(7, 2)
tThrow = L[9] - .5
tCatch = tThrow + .7
tBurp = W(11, 2)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_sizzle(d=1.5):
    t = T(d); n = rng.standard_normal(len(t)); hp = n - lowpass(n, .35)
    return hp * (.5 + .5 * np.sin(2 * np.pi * 17 * t) ** 2) * np.minimum(1, t * 12) * np.minimum(1, (d - t) * 6) * .32


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: a giant steps over the hill
S(.05, lambda: sfx_rumble(2.8), .55)
for k in range(6): S(.05 + k * .35, sfx_thump, .45 + k * .05)
for tt in [.75, 1.4, 2.05]: S(tt, sfx_stomp, .85); S(tt + .05, lambda: sfx_rumble(.5), .4)
S(1.15, sfx_gasp, .45); S(1.2, lambda: sfx_patter(1.0), .55)
# --- scene 2: "Who took my gray?!" - everybody runs
S(L[2], lambda: sfx_roar(1.4), .7); S(L[2], lambda: sfx_rumble(1.6), .5); S(L[2] + .8, lambda: sfx_rumble(1.0), .35)
S(L[2] - .25, lambda: sfx_patter(1.4), .8); S(L[2] - .2, sfx_gasp, .45)
# --- scene 3: hiding behind Gumdrop, shivering
S(L[3] + .05, sfx_gulp, .45)
for k in range(11): S(L[3] + .1 + k * .16, sfx_tick, .16)
S(L[3] + .4, lambda: sfx_swell(1.2), .22)
# --- scene 4: Gumdrop's brave roar... and shy hello
S(L[4] - .1, sfx_stomp, .55); S(W(4, 0), lambda: sfx_roar(.5), .55); S(W(4, 0) + .02, lambda: sfx_trumpet(.3), .2)
S(W(4, 1), sfx_squeak, .5); S(W(4, 1) + .05, sfx_gulp, .4)
for k in range(3): S(W(4, 3) + k * .16, sfx_boing, .22)
# --- scene 5: the giant cries
S(L[5] + .05, lambda: sfx_whimper(1.3, 160), .65); S(L[5] + 1.5, lambda: sfx_whimper(1.1, 150), .55)
for i in range(8): S(L[5] + .15 + i * .22 + .2, sfx_plip, .5)
S(L[5] + .4, sfx_gulp, .4)
# --- scene 6: Truffle's crunchy idea
S(tBulb, sfx_ting, .85); S(tBulb + .03, sfx_sparkle, .55); S(tBulb + .2, sfx_boing, .45); S(tBulb + .7, sfx_boing, .45)
S(L[6] + 1.3, lambda: sfx_patter(.9), .5)
# --- scene 7: the hot rock, the pancake burns
S(tPlace - .1, sfx_pop, .7); S(tPlace, sfx_ignite, .5); S(tPlace + .05, sfx_sparkle, .5); S(tPlace + .12, sfx_boing, .4)
S(tSizz, lambda: sfx_sizzle(2.2), .55); S(tSizz + .3, lambda: sfx_creak(.5), .2)
# --- scene 8: Mochi inspects the burnt pancake
S(L[8] - .6, lambda: sfx_patter(.9), .45); S(L[8], lambda: sfx_sizzle(1.6), .3); S(L[8] + .3, sfx_squeak, .2)
# --- scene 9: the burnt pancake flies into Munch's mouth
S(tThrow - .15, lambda: sfx_whoosh(.4), .4); S(tThrow, lambda: sfx_whoosh(.7), .65)
S(tCatch, sfx_crunch, .95); S(tCatch + .12, sfx_crunch, .85); S(tCatch + .3, sfx_gulp, .6)
S(tCatch + .05, lambda: sfx_cheer(1.4), .5); S(tCatch + .1, sfx_heart, .5); S(tCatch + .15, sfx_sparkle, .6)
for d in [.2, .7, 1.2, 1.7]: S(tCatch + d, sfx_stomp, .65); S(tCatch + d + .05, sfx_boing, .3)
# --- scene 10: relief
S(L[10] - .35, lambda: sfx_patter(1.4), .6); S(L[10] + .5, sfx_heart, .5); S(L[10] + .55, sfx_sparkle, .5)
S(L[10] + .6, lambda: sfx_cheer(1.0), .4)
# --- scene 11: the rainbow burp
S(tBurp - .6, lambda: sfx_riser(.6), .5); S(tBurp, sfx_burp, .95); S(tBurp + .05, sfx_bigpop, .6)
S(tBurp + .1, lambda: sfx_trumpet(1.4), .5); S(tBurp, lambda: sfx_whoosh(1.8), .6)
for k in range(6): S(tBurp + .2 + k * .25, sfx_sparkle, .4)
S(tBurp + .6, lambda: sfx_cheer(1.8), .6)
for i in range(9): S(tBurp + .7 + i * .05, sfx_boing, .14); S(tBurp + 1.5 + i * .05, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .35)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; giant footsteps, panic, a sad giant, a sneaky idea, a joyful munch, a rainbow finale) ----------
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
    sec_b = L[2] <= t < L[5]
    sec_sad = L[5] <= t < L[6]
    sec_idea = L[6] <= t < tThrow
    sec_fin = tBurp - .6 <= t
    if sec_a:
        if e in (0, 4): add(music, t, bass(midi(28), .9), .6)
        if e in (2, 6): add(music, t, bass(midi(26), .6), .4)
        if e % 2 == 1: add(music, t, pizz(midi(MYST[e] + 12), .15), .18)
        continue
    if sec_b:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e in (0, 4): add(music, t, bass(midi(33 if e == 0 else 32), .6), .42)
        if e in (1, 5): add(music, t, marimba(midi(SNEAK[e] + 24), .2), .12)
        continue
    if sec_sad:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .15)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .18)
        if e == 0: add(music, t, bass(midi(root), 1.4), .32)
        continue
    if sec_idea:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .26)
        if e in (0, 4): add(music, t, bass(midi(root), .5), .38)
        if e in (3, 7): add(music, t, marimba(midi(MEL[bar][0][1] + 12), .25), .14)
        continue
    sv = 1.0
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_fin else 0)), .55), .30)
    if sec_fin and e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
add(music, .75, bass(midi(24), 1.2), .6)
add(music, tBulb, marimba(midi(91), .6), .3)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tCatch + j * .06, marimba(midi(nn), .5), .28)
add(music, tCatch, bass(midi(36), 1.0), .6)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tBurp + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, tBurp, bass(midi(36), 1.2), .65)
add(music, tStk, marimba(midi(88), .8), .2)

'''
