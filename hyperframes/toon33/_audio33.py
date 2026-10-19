TITLE = "Bo and the Pancake 33: Flat Tire"

moments = '''# ---- key moments (mirror of the constants in _body33.js)
tPop = W(3, 4)
tStop = L[4] + 1.6
tGoAgain = W(11, 0) - .1
tFix = W(9, 3)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_tirepop():
    out = np.zeros(int(SR * .7))
    add(out, 0, sfx_bigpop() * 1.0); add(out, .0, sfx_balloonpop() * .8)
    n = rng.standard_normal(int(SR * .5)); tt = T(.5); add(out, .05, (n - lowpass(n, .4)) * np.exp(-tt * 9) * .4)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scenes 1-2: Mochi is winning
S(0.0, lambda: sfx_engine(tPop + .3, 90, 160), .32)
for k in range(5): S(.3 + k * .15, lambda: sfx_whoosh(1.4), .12)
S(L[2] + .1, sfx_ting, .35); S(W(2, 3), sfx_chirp, .3)
S(.4, lambda: sfx_sputter(5.0), .2)
# --- scene 3: pop!
S(tPop - .05, sfx_tirepop, .9); S(tPop, lambda: sfx_whoosh(1.0), .45); S(tPop + .05, sfx_sparkle, .4)
S(tPop + .2, lambda: sfx_wobble(.8), .35); S(tPop + .9, sfx_thud, .4)
# --- scene 4: Mochi's distress
S(L[4] + .02, sfx_gasp, .4); S(L[4] + .1, lambda: sfx_whimper(.6), .4); S(L[4] + .2, lambda: sfx_skidslide(1.6), .45)
for k in range(5): S(L[4] + .2 + k * .2, sfx_tick, .22)
S(tStop - .4, lambda: sfx_wobble(.5), .3)
# --- scene 5: Bo zooms in
S(L[4] + .65, lambda: sfx_engine(1.0, 100, 200), .35); S(L[4] + .65, lambda: sfx_whoosh(.9), .25)
S(L[5] + .05, lambda: sfx_engine(1.3, 100, 250), .45); S(L[5] + .05, lambda: sfx_whoosh(1.2), .4); S(L[5] + .1, sfx_boing, .3)
# --- scene 6: the skid
S(L[6] - .05, lambda: sfx_skidslide(1.3), .6); S(L[6] + .1, sfx_squeak, .35); S(L[6] + .35, sfx_thud, .35)
# --- scene 7: Truffle's idea
S(W(7, 2), sfx_ting, .5); S(W(7, 2), sfx_sparkle, .4); S(W(7, 3), sfx_heart, .4)
# --- scene 8: Pebble rolls the wheel
S(L[8] + .1, sfx_boing, .4); S(L[8] + .12, sfx_squeakmouse, .3); S(L[8] + .2, sfx_thud, .3)
S(L[8] + .7, lambda: sfx_patter(1.1), .3); S(L[8] + .7, lambda: sfx_roll(1.1), .3)
# --- scene 9: Zap fixes it
for k in range(3): S(L[9] + .15 + k * .3, sfx_ring, .22)
S(L[9] + .1, lambda: sfx_scan(.9), .3)
S(tFix - .2, lambda: sfx_sputter(.5), .3); S(tFix - .02, sfx_bigpop, .5); S(tFix, sfx_ting, .6); S(tFix + .02, sfx_sparkle, .55)
S(tFix + .05, sfx_boing, .4)
# --- scene 10: Mochi says thanks
S(W(10, 1), sfx_heart, .5); S(W(10, 2), sfx_sparkle, .4); S(W(10, 2), sfx_chirp, .3)
# --- scene 11: all together again
S(tGoAgain, lambda: sfx_engine(2.2, 80, 220), .45); S(tGoAgain, lambda: sfx_whoosh(1.6), .45)
S(W(11, 4), lambda: sfx_cheer(2.0), .6); S(W(11, 4), sfx_sparkle, .5)
for i in range(8): S(W(11, 4) + .1 + i * .05, sfx_boing, .13)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a cocky race groove, a comic "pop" drop, a sad limp, a gentle helping tune, and a happy full-speed finish) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
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
    sec_race = t < tPop - .05
    sec_sad = tPop <= t < L[7] - .1
    sec_help = L[7] - .1 <= t < tFix
    sec_ok = tFix <= t < tGoAgain - .1
    sec_go = t >= tGoAgain - .1
    if sec_race:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .45)
        if e % 2 == 1: add(music, t, shaker(), .38)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .26)
    elif sec_sad:
        if e in (0, 4):
            for n_i, nn in enumerate([57, 60, 64]): add(music, t + n_i * .04, pluck(midi(nn), 1.4), .15)
        if e == 0: add(music, t, bass(midi(45), 1.4), .3)
        if e in (2, 6): add(music, t, marimba(midi(SAD[(k // 2) % 8] + 12), .45), .16)
    elif sec_help:
        for n_i, nn in enumerate(chord):
            if e in (0, 3, 5): add(music, t + n_i * .02, pluck(midi(nn + 12), .8), .17)
        if e in (0, 4): add(music, t, bass(midi(root), .4), .4)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[e] + 12), .3), .14)
        if e % 2 == 1: add(music, t, shaker(), .26)
    elif sec_ok:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .8), .2)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .5)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .28)
        if e % 2 == 1: add(music, t, shaker(), .3)
    else:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .22)
        if e in (0, 2, 4, 6): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .5)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .3)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .17)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([84, 79, 72, 67, 60]): add(music, tPop + j * .09, marimba(midi(nn), .5), .26)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tFix + j * .06, marimba(midi(nn), .5), .26)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, W(11, 4) + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, W(11, 4), bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)

'''
