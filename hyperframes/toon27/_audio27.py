TITLE = "Bo and the Pancake 27: Keep It Warm"

moments = '''# ---- key moments (mirror of the constants in _body27.js)
TR0 = W(6, 5) - .1
RD = 6.8
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_crackle(d=1.0):
    n = rng.standard_normal(int(SR * d)); t = T(d)
    gate = (rng.random(len(t)) > .965).astype(float)
    return (n - lowpass(n, .4)) * lowpass(gate, .25) * 2.2 * np.exp(-t * .9)


def sfx_roll(d=2.0):
    n = rng.standard_normal(int(SR * d)); t = T(d)
    return lowpass(n, .06) * (.4 + .6 * (t / d) ** 2) * (1 + .5 * np.sin(2 * np.pi * (3 + 6 * (t / d)) * t)) * 2.6


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: everybody has an idea
S(.5, lambda: sfx_whoosh(.5, False), .35); S(1.0, lambda: sfx_wobble(.5), .3)
S(1.3, lambda: sfx_cheer(1.0), .35)
for i in range(9): S(1.3 + i * .05, sfx_boing, .12)
# --- scene 2: Truffle's campfire
S(W(2, 1) - .1, sfx_ignite, .5); S(W(2, 1), sfx_sparkle, .35)
S(W(2, 1), lambda: sfx_crackle(4.5), .3)
S(W(2, 3), lambda: sfx_sizzle(1.0), .4); S(W(2, 3), lambda: sfx_wobble(.6), .35)
for k in range(3): S(W(2, 3) + k * .22, sfx_squeak, .18)
# --- scene 3: Mochi's glare puts it out
S(W(3, 2), lambda: sfx_whoosh(.5, False), .35); S(W(3, 2) + .1, lambda: sfx_sizzle(.8), .4); S(W(3, 2) + .45, sfx_pop, .3)
# --- scene 4: Zap's thermometer
S(L[4] + .25, lambda: sfx_scan(1.2), .35)
for k in range(4): S(L[4] + .25 + k * .3, sfx_ring, .22)
S(W(4, 2), sfx_pop, .45); S(W(4, 2) + .05, sfx_beep, .3)
S(W(4, 4), sfx_ting, .6); S(W(4, 4) + .02, sfx_sparkle, .55); S(W(4, 4) + .1, sfx_heart, .35)
# --- scene 5: Gumdrop's cuddle
S(L[5] - 1.0, lambda: sfx_stomp(), .35); S(L[5] - .6, lambda: sfx_stomp(), .35)
S(L[5] + .05, lambda: sfx_roar(.5), .35)
S(W(5, 5) - .1, lambda: sfx_squeak(), .45); S(W(5, 5), sfx_heart, .5); S(W(5, 5) + .05, sfx_sparkle, .4)
# --- scene 6: the egg escapes and rolls
S(W(6, 3), lambda: sfx_wobble(.7), .45); S(W(6, 3) + .1, sfx_gasp, .35)
S(TR0, lambda: sfx_roll(RD), .5)
for t in np.arange(TR0 + .2, TR0 + RD - .3, .45): S(t, sfx_thud, .12 + .06 * (t - TR0) / RD * 3)
S(TR0 + .1, lambda: sfx_patter(RD - .5), .22)
# --- scene 7/8: Coco shouts, "down, down, down"
S(L[7] + .2, sfx_boing, .4); S(L[7] + .9, sfx_boing, .4)
for i in range(3): S(W(8, i), lambda: sfx_thump(), .3)
# --- scene 9: Bo sprints ahead
S(L[9] - .55, lambda: sfx_whoosh(.9), .4); S(L[9] - .55, lambda: sfx_patter(1.0), .3)
# --- scene 10: Boo swoops in, the egg is stopped
S(L[9] + .2, lambda: sfx_whoosh(1.4), .3); S(L[9] + .25, lambda: sfx_swell(1.2), .2)
S(TR0 + RD - .05, sfx_thud, .6); S(TR0 + RD - .05, sfx_bigpop, .35); S(TR0 + RD, sfx_sparkle, .5)
# --- scene 11: a big hug, the egg glows
S(W(11, 3), sfx_heart, .55); S(W(11, 3), sfx_sparkle, .55); S(W(11, 3) + .1, lambda: sfx_cheer(1.8), .55)
for i in range(9): S(W(11, 3) + .3 + i * .05, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a bustling "let's warm it up", a comic fire, a chase, a warm hug) ----------
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
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_warm = t < L[6]
    sec_chase = L[6] <= t < L[10] - .1
    sec_hug = t >= L[10] - .1
    if sec_warm:
        if e in (0, 2, 4, 6):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .7), .16)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .5)
        if e == 5: add(music, t, bass(midi(root + 7), .4), .3)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn), .5), .26)
        if e in (2, 6): add(music, t, clap(), .3)
        if e % 2 == 1: add(music, t, shaker(), .3)
    elif sec_chase:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .22)
        if e in (0, 2, 4, 6): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        add(music, t, bass(midi(root + (7 if e % 4 == 3 else 0)), .3), .45) if e % 2 == 0 else None
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .2)
        if e % 2 == 1: add(music, t, shaker(), .4)
    else:
        if e in (0, 3, 5):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .2)
        if e in (0, 4): add(music, t, bass(midi(root), .6), .45)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .28)
        if e % 2 == 1: add(music, t, shaker(), .26)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, W(4, 4) + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, W(11, 3) + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, W(11, 3), bass(midi(36), 1.2), .55)
add(music, tStk, marimba(midi(88), .8), .18)

'''
