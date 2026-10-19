TITLE = "Bo and the Pancake 20: Rainbow Road Home"

moments = '''# ---- key moments (mirror of the constants in _body20.js)
tBoard = L[4] + .1
tLift = L[5] - .3
tS0 = L[5] + .55
SD = L[7] - .3 - tS0 - .1
tEarth = L[7] - .55
tKit = L[7] - .25
tK0 = tKit + 1.1
tSun = W(8, 1)
tTower = W(8, 2)
tSl = W(9, 0) + .25
tRk = W(10, 4)
tStk = L[11] + DU[11] + .35
NSL = 18


'''

extra = '''
'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the rainbow stretches across the sky (a rising chime run)
S(0.0, lambda: sfx_swell(1.6), .25); S(.25, lambda: sfx_whoosh(2.0), .3)
for k, f in enumerate([523, 587, 659, 784, 880, 1046, 1175, 1318]): S(.3 + k * .2, lambda f=f: sfx_ding(f), .26)
S(1.6, sfx_sparkle, .45); S(2.0, sfx_sparkle, .45)
# --- scene 2: Blip points the way
S(L[2], sfx_boing, .45); S(L[2] + .1, sfx_chirp, .4); S(L[2] + .6, sfx_boing, .4); S(L[2] + .3, sfx_heart, .35)
S(L[2] + .35, lambda: sfx_cheer(1.0), .35)
# --- scene 3: the Commander says goodbye
S(L[3] - .3, lambda: sfx_patter(.6), .35); S(L[3] + .4, sfx_sparkle, .5); S(L[3] + .5, sfx_heart, .5)
for i in range(3): S(L[3] + .4 + i * .22 + .2, sfx_plip, .4)
# --- scene 4: Munch waves bye bye (happy sobbing), everybody boards
S(L[4] + .05, lambda: sfx_whimper(1.0, 170), .5); S(L[4] + 1.2, lambda: sfx_whimper(.9, 160), .4)
for i in range(6): S(L[4] + .2 + i * .22 + .2, sfx_plip, .45)
S(tBoard, lambda: sfx_patter(2.0), .75)
for tt in [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4]: S(tBoard + tt, sfx_shrink, .22)
S(tBoard + 1.4, sfx_squelchj, .5); S(tBoard + 1.7, sfx_stomp, .45)
# --- scene 5: lift off and slide down the rainbow
S(tLift - .3, lambda: sfx_creak(.5), .3); S(tLift - .3, lambda: sfx_rumble(.8), .5); S(tLift - .1, lambda: sfx_riser(.5), .5)
S(tLift, lambda: sfx_whoosh(.9), .7); S(tLift + .1, sfx_bigpop, .45)
S(tS0, lambda: sfx_holoon(SD, False), .4); S(tS0, lambda: sfx_whoosh(SD, True), .45)
for k in range(12): S(tS0 + SD * ((k + 1) / 13) ** .8, sfx_sparkle, .3)
for k, f in enumerate([1318, 1175, 1046, 880, 784, 659, 587, 523]): S(tS0 + .1 + k * .26, lambda f=f: sfx_ding(f), .2)
# --- scene 6: Wheeee!
S(L[6] - .05, lambda: sfx_cheer(1.0), .55); S(L[6], sfx_boing, .4); S(L[6] + .2, sfx_chirp, .4)
# --- scene 7: arriving at Earth, landing in the kitchen
S(tEarth, sfx_shrink, .5); S(tEarth + .3, sfx_bigpop, .75); S(tEarth + .32, sfx_sparkle, .6)
S(tKit, lambda: sfx_whoosh(.6, False), .6); S(tKit + .7, sfx_thump, .9); S(tKit + .75, lambda: sfx_creak(.5), .4)
S(tK0, lambda: sfx_patter(1.8), .55)
for i in range(9): S(tK0 + i * .1, sfx_grow, .15)
# --- scene 8: the King: it's Sunday
S(L[8], lambda: sfx_trumpet(.5), .35); S(tSun, sfx_stickerpop, .85); S(tSun + .05, sfx_sparkle, .5)
for i in range(NSL):
    f = midi(72 + [0, 2, 4, 7, 9][i % 5] + 12 * (i // 5)); S(tTower + i * .07 + .22, lambda f=f: sfx_stackdrop(f), .3)
S(tTower + NSL * .07 + .1, lambda: sfx_cheer(1.4), .5); S(tTower + NSL * .07 + .1, sfx_sparkle, .6)
for i in range(9): S(tTower + .3 + i * .05, sfx_boing, .14)
# --- scene 9: the feast
S(tSl - .2, lambda: sfx_swell(.8), .3)
for i in range(9): S(tSl + i * .09, lambda: sfx_whoosh(.4), .28); S(tSl + .6 + i * .09, sfx_crunch, .4); S(tSl + .8 + i * .09, sfx_gulp, .22)
for k in range(17): S(tSl + .25 + k * .05, sfx_pop, .13)
S(tSl + .6, lambda: sfx_cheer(1.8), .6); S(tSl + .7, sfx_heart, .5); S(tSl + 1.5, sfx_burp, .45)
for i in range(9): S(tSl + .9 + i * .05, sfx_boing, .13)
# --- scene 10: Rocky confesses
S(L[10] + .05, sfx_chirp, .35); S(tRk, lambda: sfx_whoosh(.4), .35); S(tRk + .55, sfx_crunch, .55); S(tRk + .75, sfx_gulp, .45)
S(tRk + .6, sfx_heart, .4); S(L[10] + .5, lambda: sfx_cheer(1.0), .35)
# --- scene 11: the finale
S(L[11], lambda: sfx_trumpet(1.0), .4); S(L[11] + .2, lambda: sfx_cheer(2.0), .6)
for k in range(8): S(L[11] + .3 + k * .25, sfx_sparkle, .35)
for i in range(9): S(L[11] + .3 + i * .05, sfx_boing, .14); S(L[11] + 1.2 + i * .05, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)
S(28.6, sfx_sparkle, .4)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a wonder, a tender goodbye, a joyful slide, a cosy home, a party, a big finale) ----------
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
SAD = [69, 72, 76, 72, 67, 71, 74, 71]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_wonder = t < L[2]
    sec_bye = L[2] <= t < tLift
    sec_slide = tLift <= t < tKit
    sec_home = tKit <= t < tTower
    sec_party = tTower <= t < L[11]
    sec_fin = L[11] <= t
    if sec_wonder:
        if e in (0, 4): add(music, t, bass(midi(root), 1.0), .35)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[e] + 0), .35), .16)
        if e in (0,):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.6), .14)
        continue
    if sec_bye:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .16)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .2)
        if e == 0: add(music, t, bass(midi(root), 1.4), .35)
        continue
    sv = 1.0 if (sec_slide or sec_party or sec_fin) else .8
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55 * (1 if sv >= 1 else .75))
    if e == 5 and sv >= 1: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_slide or sec_fin) else 0)), .55), .30 * (1 if sv >= 1 else .75))
    if sec_slide or sec_fin:
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
    if sec_slide or sec_party or sec_fin:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    elif sec_home:
        if e % 2 == 1: add(music, t, shaker(), .25)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tLift + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, tLift, bass(midi(36), 1.0), .6)
add(music, tEarth + .3, marimba(midi(91), .6), .3)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tTower + NSL * .07 + .1 + j * .06, marimba(midi(nn), .5), .26)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, L[11] + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, L[11], bass(midi(36), 1.2), .65)
# the very last chord
for nn in [48, 55, 60, 64, 67, 72]:
    add(music, 28.9, pluck(midi(nn), 1.4), .34)
add(music, 28.9, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .2)

'''
