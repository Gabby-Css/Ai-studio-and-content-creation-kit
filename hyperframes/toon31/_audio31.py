TITLE = "Bo and the Pancake 31: The Great Pancake Race"

moments = '''# ---- key moments (mirror of the constants in _body31.js)
tPan = W(2, 4)
tKart = W(3, 5)
tGo = W(10, 3)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_engine(d=1.0, f0=70, f1=140):
    t = T(d); f = f0 + (f1 - f0) * (t / d) ** 1.5
    saw = 2 * ((np.cumsum(f) / SR) % 1) - 1
    return (lowpass(saw, .12) * .55 + lowpass(rng.standard_normal(len(t)), .05) * .3) * np.minimum(1, t * 30) * np.exp(-((t - d).clip(0)) * 10) * (.6 + .4 * np.sin(2 * np.pi * (14 + 20 * t / d) * t))


def sfx_horn(d=.5):
    t = T(d); return (np.sin(2 * np.pi * 440 * t) + .6 * np.sin(2 * np.pi * 554 * t) + .3 * np.sin(2 * np.pi * 880 * t)) * np.minimum(1, t * 40) * np.exp(-(t / d) ** 2 * 2) * .3


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the King announces
S(0.0, lambda: sfx_swell(1.4), .22); S(.5, lambda: sfx_trumpet(.9), .45); S(.55, sfx_bigpop, .5)
S(L[1] + .9, lambda: sfx_cheer(1.6), .55)
for i in range(8): S(L[1] + 1.0 + i * .05, sfx_boing, .13)
S(W(1, 5), sfx_sparkle, .45)
# --- scene 2: the golden pan
S(tPan - .05, lambda: sfx_whoosh(.3), .3); S(tPan, sfx_pop, .5); S(tPan + .05, sfx_ting, .6); S(tPan + .1, sfx_sparkle, .55)
for k in range(4): S(tPan + .3 + k * .3, sfx_sparkle, .25)
# --- scene 3: Zap hands out karts
for i in range(5): S(tKart + i * .14 + .5, sfx_thud, .5); S(tKart + i * .14 + .5, sfx_boing, .3); S(tKart + i * .14 + .1, lambda: sfx_whoosh(.4, False), .22)
S(tKart + .5, lambda: sfx_cheer(1.2), .4); S(tKart + .6, sfx_horn, .4)
# --- scene 4: Bo loves orange
S(L[4] + .35, sfx_boing, .4); S(L[4] + .5, sfx_heart, .5); S(L[4] + .55, sfx_sparkle, .4); S(L[4] + .2, lambda: sfx_engine(.8, 60, 100), .3)
# --- scene 5: Mochi's faster kart
S(W(5, 2), lambda: sfx_wobble(.4), .3); S(W(5, 3), lambda: sfx_sputter(1.0), .4); S(W(5, 3), lambda: sfx_engine(1.2, 80, 190), .35)
# --- scene 6: Truffle's pancake kart
S(L[6] + .2, lambda: sfx_squelchj(), .4); S(W(6, 3), sfx_heart, .5); S(W(6, 3) + .05, sfx_gulp, .35); S(W(6, 3), lambda: sfx_sizzle(1.0), .25)
# --- scene 7: Pebble waddles in
S(L[7] + .1, lambda: sfx_patter(1.6), .3); S(L[7] + .15, sfx_squeakmouse, .35)
# --- scene 8: me too
S(W(8, 0), sfx_boing, .4); S(W(8, 0) + .02, sfx_chirp, .35); S(W(8, 2), sfx_boing, .4); S(W(8, 2) + .02, sfx_chirp, .35)
# --- scene 9: room for him
S(L[9] + .1, lambda: sfx_whoosh(.3), .25); S(L[9] + .35, lambda: sfx_whoosh(.7), .3); S(L[9] + 1.0, sfx_boing, .5); S(L[9] + 1.02, sfx_heart, .5); S(L[9] + 1.05, sfx_sparkle, .4)
# --- scene 10: three, two, one, go
for t in [W(10, 0), W(10, 1), W(10, 2)]: S(t, lambda: sfx_beep(660, .22), .5)
S(tGo, lambda: sfx_beep(1320, .5), .6); S(tGo, lambda: sfx_riser(.2), .3)
S(W(10, 2) + .1, lambda: sfx_engine(1.0, 70, 220), .5)
# --- scene 11: zoom away
for i, d in enumerate([.12, .22, .32, .42, .52]):
    S(tGo + d, lambda: sfx_whoosh(1.7), .3); S(tGo + d, lambda: sfx_engine(1.9, 100, 340), .3)
S(tGo, lambda: sfx_cheer(2.0), .55)
for i in range(7): S(tGo + .2 + i * .1, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a bright "start your engines" theme: sparkly fanfare, bouncy kart groove, a count-in, then full speed) ----------
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
    sec_fan = t < tKart - .1
    sec_race = tKart - .1 <= t < W(10, 0) - .1
    sec_count = W(10, 0) - .1 <= t < tGo - .05
    sec_go = t >= tGo - .05
    if sec_fan:
        if e in (0, 2, 4, 6):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .7), .17)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .5)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn), .5), .27)
        if e in (2, 6): add(music, t, clap(), .3)
        if e % 2 == 1: add(music, t, shaker(), .3)
    elif sec_race:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .45)
        if e % 2 == 1: add(music, t, shaker(), .38)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .15)
    elif sec_count:
        if e % 2 == 0: add(music, t, kick(), .45)
        if e in (0, 4): add(music, t, bass(midi(root), .3), .4)
    else:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .22)
        add(music, t, kick(), .55) if e in (0, 2, 4, 6) else None
        if e in (2, 6): add(music, t, clap(), .5)
        add(music, t, bass(midi(root + (7 if e % 4 == 3 else 0)), .3), .5) if e % 2 == 0 else None
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .3)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .18)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tPan + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tKart + j * .05, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tGo + j * .05, marimba(midi(nn + 12), .5), .3)
add(music, tGo, bass(midi(36), 1.2), .65)
add(music, tStk, marimba(midi(88), .8), .18)

'''
