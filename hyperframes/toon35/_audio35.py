TITLE = "Bo and the Pancake 35: Photo Finish"

moments = '''# ---- key moments (mirror of the constants in _body35.js)
tF = W(6, 2) + .02
NSL = 18
TW0 = L[9] + .45
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_camera():
    out = np.zeros(int(SR * .5))
    add(out, 0, sfx_tick() * 1.2); add(out, .06, sfx_pop() * .7); add(out, .09, (lowpass(rng.standard_normal(int(SR * .08)), .4)) * np.exp(-T(.08) * 30) * .6)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scenes 1-4: the final sprint
S(0.0, lambda: sfx_engine(9.0, 100, 170), .32)
for k in range(5): S(.3 + k * .15, lambda: sfx_whoosh(1.4), .12)
S(W(1, 5), lambda: sfx_cheer(1.4), .3)
S(L[2] + .1, sfx_ting, .35); S(W(2, 3), sfx_chirp, .3)
S(L[3] - .2, lambda: sfx_whoosh(1.2), .45); S(L[3] - .2, lambda: sfx_engine(1.4, 100, 260), .4); S(L[3] + .05, sfx_boing, .35)
S(W(4, 2) - .1, lambda: sfx_riser(.4), .35); S(W(4, 2) - .1, lambda: sfx_sputter(1.2), .45); S(W(4, 2) - .1, lambda: sfx_rocket(1.3), .5)
# --- scene 5: slow-motion tension
S(L[5] - .2, lambda: sfx_swell(2.0), .3)
for k in range(8): S(L[5] + .1 + k * .24, sfx_tick, .22)
S(L[5] + .8, lambda: sfx_engine(2.4, 80, 140), .3)
S(tF - .6, lambda: sfx_riser(.6), .4)
# --- scene 6: photo finish
S(tF - .05, sfx_camera, .8); S(tF, sfx_bigpop, .5); S(tF + .05, lambda: sfx_cheer(2.0), .55); S(tF + .05, sfx_sparkle, .55)
S(tF + .2, lambda: sfx_skidslide(1.2), .3)
for i in range(8): S(tF + .5 + i * .05, sfx_boing, .13)
# --- scene 7: the King
S(L[7] - .1, lambda: sfx_trumpet(.8), .45); S(W(7, 1), sfx_ting, .5); S(W(7, 1), sfx_sparkle, .5); S(W(7, 3), sfx_heart, .5)
S(W(7, 3), lambda: sfx_cheer(1.4), .5)
# --- scene 8: Munch arrives
S(L[8] - 1.9, lambda: sfx_rumble(1.9), .5)
for t in [L[8] - 1.5, L[8] - .8]: S(t, sfx_stomp, .55); S(t + .02, sfx_thump, .45)
S(L[8] + .5, lambda: sfx_roar(.5), .2); S(W(8, 2), sfx_pop, .5); S(W(8, 2) + .05, sfx_ting, .6); S(W(8, 2) + .1, sfx_sparkle, .55)
# --- scene 9: the tower of pancakes
S(L[9] + .1, lambda: sfx_sizzle(1.4), .3)
for i in range(NSL):
    f = midi(72 + [0, 2, 4, 7, 9][i % 5] + 12 * (i // 5)); S(TW0 + i * .075 + .24, lambda f=f: sfx_stackdrop(f), .3)
S(TW0 + NSL * .075 + .12, sfx_sparkle, .6); S(TW0 + NSL * .075 + .12, lambda: sfx_cheer(1.2), .45); S(TW0 + NSL * .075 + .2, sfx_heart, .4)
# --- scene 10: yummy
S(L[10], lambda: sfx_cheer(1.4), .5)
for i in range(5): S(L[10] + .1 + i * .12, lambda: sfx_whoosh(.35), .25); S(L[10] + .5 + i * .12, sfx_crunch, .35); S(L[10] + .65 + i * .12, sfx_gulp, .25)
for i in range(9): S(L[10] + .2 + i * .05, sfx_boing, .13)
# --- scene 11: fireworks
for i in range(6): S(L[11] + i * .3, sfx_firework, .6)
S(L[11] + .3, lambda: sfx_cheer(2.0), .5)
S(tStk, sfx_stickerpop, .9)
for i in range(5): S(tStk + i * .5, sfx_firework, .5)
S(29.4, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a driving final sprint, a held-breath slow-motion, a big photo-finish stinger, a warm festive finale) ----------
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
    sec_sprint = t < L[5]
    sec_slow = L[5] <= t < tF - .1
    sec_cheer = tF - .1 <= t < L[8]
    sec_munch = L[8] <= t < L[11]
    sec_end = t >= L[11]
    if sec_sprint:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .5)
        if e % 2 == 1: add(music, t, shaker(), .4)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .27)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .14)
    elif sec_slow:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .04, pluck(midi(nn + 12), 1.4), .15)
        if e == 0: add(music, t, bass(midi(root), 1.4), .3)
        if e % 2 == 0: add(music, t, kick(), .22)
        if e in (2, 6): add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .4), .13)
    elif sec_cheer:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .22)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
        if e % 2 == 1: add(music, t, shaker(), .38)
    elif sec_munch:
        for n_i, nn in enumerate(chord):
            if e in (0, 3, 5): add(music, t + n_i * .015, pluck(midi(nn + 12), .8), .19)
        if e in (0, 4): add(music, t, bass(midi(root), .5), .42)
        if e % 4 == 0: add(music, t, kick(), .35)
        if e in (2, 6): add(music, t, clap(), .3)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .24)
        if e % 2 == 1: add(music, t, shaker(), .3)
    else:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .22)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .15) if e % 2 == 0 else None
        if e % 2 == 1: add(music, t, shaker(), .38)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tF + j * .05, marimba(midi(nn + 12), .5), .3)
add(music, tF, bass(midi(36), 1.4), .65)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, W(7, 1) + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, TW0 + NSL * .075 + .12 + j * .06, marimba(midi(nn), .5), .24)
for nn in [48, 55, 60, 64, 67, 72]: add(music, 28.8, pluck(midi(nn), 1.4), .34)
add(music, 28.8, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)

'''
