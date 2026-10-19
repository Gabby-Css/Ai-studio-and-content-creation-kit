TITLE = "Bo and the Pancake 61: The Pumpkin Patch"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body61.js)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_flutter(d=.6):
    out = np.zeros(int(SR * d)); t = T(d)
    for k in range(int(d * 14)): n = rng.standard_normal(int(SR * .04)); add(out, k * .07, (n - lowpass(n, .1)) * np.exp(-T(.04) * 60), .35)
    return out * np.sin(np.pi * t / d) ** .7


def sfx_howl(d=1.6):
    t = T(d); f = 420 + 380 * np.sin(np.pi * t / d) ** .8 + 12 * np.sin(2 * np.pi * 6 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return (np.sin(ph) + .35 * np.sin(2 * ph)) * np.sin(np.pi * t / d) ** 1.4 * .22


def sfx_spook(d=1.0):
    t = T(d); f = 700 - 360 * (t / d) + 24 * np.sin(2 * np.pi * 7 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) * .22


def sfx_cricket(d=.5):
    t = T(d); return np.sin(2 * np.pi * 4300 * t) * (np.sin(2 * np.pi * 28 * t) > .2) * np.sin(np.pi * t / d) * .06


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: night wind, crickets, a far howl
S(0.0, lambda: sfx_swell(2.4), .1)
for k in range(8): S(.3 + k * 3.4, lambda: sfx_swell(3.0), .07)
for k in range(30): S(.4 + k * .9, sfx_cricket, .5)
S(L[1] + .8, lambda: sfx_howl(1.5), .5)
# --- scene 1: the moon rises, bats flutter past
S(.1, lambda: sfx_riser(2.0), .12); S(.5, lambda: sfx_flutter(2.6), .3); S(.9, lambda: sfx_flutter(2.8), .22); S(1.3, lambda: sfx_flutter(2.6), .18); S(W(1, 4), sfx_gasp, .3)
# --- scene 2: Bo, and five pumpkins hop
S(L[2] + .2, sfx_boing, .4); S(W(2, 4), sfx_boing, .4)
for i in range(5): S(W(2, 3) + i * .12, sfx_boing, .14); S(W(2, 3) + i * .12 + .3, sfx_thud, .12)
# --- scene 3: Truffle carves
for k in range(7): S(L[3] + .3 + k * .22, sfx_scratch, .3)
S(W(3, 4) - .45, sfx_crunch, .3); S(W(3, 4) - .25, sfx_crunch, .3); S(W(3, 4) + .1, sfx_pop, .5); S(W(3, 4) + .1, sfx_sparkle, .5); S(W(3, 4) + .12, sfx_boing, .3)
# --- scene 4: Zap's laser
S(L[4] + .02, sfx_beep, .4); S(L[4] + .3, sfx_beep, .3); S(W(4, 3), sfx_zapbeam, .5); S(W(4, 3) + .05, lambda: sfx_riser(.6), .2)
# --- scene 5: laser carving
S(W(5, 1), lambda: sfx_sizzle(1.4), .3)
for k in range(5): S(W(5, 2) + k * .25, sfx_tick, .25)
S(W(5, 4), sfx_pop, .5); S(W(5, 4), sfx_sparkle, .6); S(W(5, 4), sfx_ding, .4)
# --- scene 6: Mochi's scary face
S(L[6] + .1, sfx_whimper, .08); S(W(6, 3) - .4, sfx_scratch, .3); S(W(6, 3) + .05, sfx_pop, .5); S(W(6, 3) + .05, lambda: sfx_spook(.8), .3); S(W(6, 3) + .1, sfx_thump, .3)
# --- scene 7: Coco's face
S(L[7] + .2, sfx_boing, .3); S(W(7, 3) - .4, sfx_scratch, .3); S(W(7, 3) + .05, sfx_pop, .5); S(W(7, 3) + .05, sfx_sparkle, .5); S(W(7, 4), sfx_boing, .3)
# --- scene 8: candles light one by one
for i in range(4): S(L[8] + .15 + i * .28, sfx_ignite, .5); S(L[8] + .2 + i * .28, sfx_sparkle, .35)
S(L[8] + .1, lambda: sfx_swell(1.4), .25)
# --- scene 9: Gumdrop roars
S(L[9] + .02, sfx_roar, .5); S(W(9, 0) + .2, sfx_pop, .5); S(W(9, 0) + .2, sfx_bigpop, .4); S(W(9, 0) + .2, lambda: sfx_rumble(.7), .35); S(W(9, 0) + .5, sfx_ignite, .5); S(W(9, 0) + .55, sfx_sparkle, .6)
# --- scene 10: a whisper in the dark: Boo!
S(L[10] + .05, lambda: sfx_swell(1.8), .3); S(W(10, 2), lambda: sfx_spook(1.2), .35)
for k in range(5): S(W(10, 2) + k * .2, sfx_sparkle, .25)
S(W(10, 4) - .05, lambda: sfx_riser(.4), .3); S(W(10, 4), sfx_cymbal, .5); S(W(10, 4), sfx_bigpop, .5); S(W(10, 4), sfx_gasp, .5); S(W(10, 4) + .2, sfx_eep, .3)
# --- scene 11: the tiny ghost flies by
S(L[11] + .1, lambda: sfx_spook(1.6), .22); S(L[11] + .2, lambda: sfx_howl(1.6), .25); S(W(11, 4), sfx_sparkle, .55); S(W(11, 4), sfx_ting, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('spooky', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'magic'), ('L[6]', 'march'), ('L[8]', 'magic'), ('L[9]', 'drive'), ('L[10]', 'hush'), ('L[11]', 'magic')],
                  stingers='''for j, nn in enumerate([69, 72, 76, 81]): add(music, 0.3 + j * .35, marimba(midi(nn + 12), .8), .2)
for j, nn in enumerate([81, 84, 88, 93]): add(music, L[8] + .15 + j * .28, marimba(midi(nn), .5), .22)
for j, nn in enumerate([76, 70, 64]): add(music, W(10, 4) + j * .08, marimba(midi(nn), .7), .3)
add(music, W(10, 4), bass(midi(40), .9), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
