TITLE = "Bo and the Pancake 23: The Balloon Chase"

moments = '''# ---- key moments (mirror of the constants in _body23.js)
tFly = W(5, 3) - .1
FD = 2.2
tCatch = tFly + FD + .3
tPopB = L[9] + .1
tDown = L[9] + 1.25
DD = L[11] + 1.0 - tDown
tStk = L[11] + DU[11] + .35
ZT0 = L[4] + .2
ZD = 2.0


'''

extra = '''def sfx_rocket(d=2.0):
    t = T(d); n = rng.standard_normal(len(t)); env = np.minimum(1, t * 6) * np.minimum(1, (d - t) * 3)
    return (lowpass(n, .25) * .5 + np.sin(2 * np.pi * np.cumsum(90 + 140 * (t / d)) / SR) * .25) * env * .7
def sfx_sputter(d=.9):
    t = T(d); n = rng.standard_normal(len(t)); env = (np.sin(2 * np.pi * 14 * t * (1 + t)) > 0) * np.exp(-t * 2.2)
    return lowpass(n, .3) * env * .6
def sfx_balloonpop():
    t = T(.18); n = rng.standard_normal(len(t)); return (n - lowpass(n, .4)) * np.exp(-t * 38) * .9 + np.sin(2 * np.pi * 180 * t) * np.exp(-t * 30) * .4


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the spatula floats higher and higher
S(0.0, lambda: sfx_swell(2.0), .25); S(.2, lambda: sfx_whoosh(1.8), .25); S(1.0, sfx_sparkle, .35)
for k in range(6): S(.4 + k * .4, lambda f=700 + k * 120: sfx_beep(f, .08), .1)
# --- scene 2: Bo jumps for it
for d in [.2, .75, 1.3]: S(L[2] + d, sfx_boing, .5)
S(L[2] + .1, sfx_gasp, .35)
# --- scene 3: rocket boots ready
S(L[3] + .2, lambda: sfx_ding(1318), .3)
for k in range(3): S(L[3] + .6 + k * .3, lambda: sfx_beep(660 + k * 100, .12), .3)
S(L[3] + .5, lambda: sfx_ignite(), .5); S(L[3] + .6, lambda: sfx_rumble(1.2), .4)
# --- scene 4: blast off
S(ZT0 - .1, lambda: sfx_riser(.4), .4); S(ZT0, lambda: sfx_rocket(ZD), .85); S(ZT0, sfx_stomp, .5); S(ZT0 + .05, lambda: sfx_whoosh(ZD), .5)
S(ZT0 + ZD - .2, sfx_pop, .3)
# --- scene 5: Gumdrop's roar launches Bo
S(L[5] - .95, lambda: sfx_patter(1.0), .4); S(L[5] + .05, lambda: sfx_roar(.5), .5); S(L[5] + .45, sfx_boing, .45)
S(tFly - .15, lambda: sfx_swell(.3), .3); S(tFly, lambda: sfx_whoosh(.9), .8); S(tFly, sfx_bigpop, .7); S(tFly + .05, sfx_stomp, .5)
# --- scene 6: Bo flies
S(tFly + .1, lambda: sfx_whoosh(FD, True), .5); S(L[6], lambda: sfx_cheer(1.0), .4); S(L[6] + .2, sfx_chirp, .35)
for k in range(8): S(tFly + k * .22, sfx_sparkle, .22)
S(L[6] + .3, lambda: sfx_sputter(.9), .5); S(L[6] + 1.8, sfx_thud, .5)
# --- scene 7/8: Boo helps
S(L[7] - .2, lambda: sfx_swell(1.6), .3)
for k in range(6): S(L[7] + k * .3, sfx_sparkle, .22)
S(L[8] + .1, sfx_squeak, .3); S(L[8] + .6, lambda: sfx_chirp(), .25)
# --- scene 9: pop pop pop, the catch
for i in range(4): S(tPopB + i * .24, sfx_balloonpop, .7); S(tPopB + i * .24 + .02, sfx_sparkle, .35)
S(tPopB + .45, lambda: sfx_whoosh(.75, False), .45); S(tPopB + 1.2, sfx_gulp, .3); S(tPopB + 1.25, sfx_ting, .6); S(tPopB + 1.3, sfx_sparkle, .5)
# --- scene 10: gentle float down
S(tDown, lambda: sfx_swell(DD * .6), .25)
for k in range(5): S(tDown + .3 + k * (DD / 5), lambda: sfx_ding(1046), .12)
S(L[10] + .5, sfx_squeak, .2)
# --- scene 11: landing, cheers
S(L[11] + 1.0, sfx_thud, .4); S(L[11] + 1.0, lambda: sfx_cheer(1.8), .6); S(L[11] + 1.05, sfx_bigpop, .5); S(L[11] + 1.1, sfx_sparkle, .6)
S(L[11] + 1.1, lambda: sfx_trumpet(.8), .4)
for i in range(9): S(L[11] + 1.3 + i * .05, sfx_boing, .14)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; an adventurous chase theme, a floaty middle, a triumphant landing) ----------
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
    sec_float = t < L[2]
    sec_chase = L[2] <= t < L[7]
    sec_hover = L[7] <= t < tDown
    sec_down = tDown <= t < L[11] + 1.0
    sec_fin = L[11] + 1.0 <= t
    if sec_float:
        if e in (0, 4): add(music, t, bass(midi(root), 1.0), .4)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[e] + 0), .35), .16)
        continue
    if sec_hover:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.2), .15)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .3), .14)
        if e == 0: add(music, t, bass(midi(root), 1.2), .3)
        continue
    if sec_down:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.6), .16)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(MEL[bar][0][1] + (0 if e < 4 else 5)), .5), .18)
        if e == 0: add(music, t, bass(midi(root), 1.4), .32)
        continue
    sv = 1.0
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_fin else 0)), .55), .30)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
    if sec_chase and e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .12), .22)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, ZT0 + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, ZT0, bass(midi(36), 1.0), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tFly + j * .05, marimba(midi(nn), .5), .26)
for j, nn in enumerate([84, 79, 76, 72]): add(music, tPopB + j * .24, marimba(midi(nn), .3), .22)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, L[11] + 1.0 + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, L[11] + 1.0, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .2)

'''
