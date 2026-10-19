TITLE = "Bo and the Pancake 53: The Sandcastle Contest"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body53.js)
tCrash = W(7, 2) - .3
tStk = L[11] + DU[11] + .45
WVD, WVU = 1330, 2300
TWY = [2070, 2000, 2000, 2000, 2000]


'''

extra = '''def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_sandup(d=1.3):
    t = T(d); n = rng.standard_normal(len(t)); return lowpass(n, .5) * np.sin(np.pi * t / d) ** 2 * .45 + np.sin(2 * np.pi * (200 + 260 * t / d) * t) * np.sin(np.pi * t / d) ** 2 * .12


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: waves, gull, glitter
S(0.0, lambda: sfx_swell(2.4), .12)
for k in range(9): S(.6 + k * 3.3, lambda: sfx_swell(3.0), .1)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
S(3.5, sfx_gull, .2)
# --- scene 1: five towers start
for i in range(5): S(L[1] + .45 + i * .22, lambda: sfx_sandup(.8), .3); S(L[1] + .5 + i * .22, sfx_boing, .2)
# --- scene 2: Bo's tall tower
S(L[2] + .2, sfx_boing, .4); S(L[2] + .35, lambda: sfx_sandup(1.4), .4); S(L[2] + 1.65, sfx_sparkle, .5); S(L[2] + 1.65, sfx_ting, .4)
# --- scene 3: Munch's gigantic one
S(L[3] + .02, lambda: sfx_roar(.7), .3); S(L[3] + .3, lambda: sfx_sandup(1.4), .5); S(L[3] + 1.5, sfx_thud, .6); S(L[3] + 1.5, lambda: sfx_rumble(.8), .4)
# --- scene 4: Mochi's neat one
S(L[4] + .4, lambda: sfx_sandup(1.4), .35); S(L[4] + 1.8, sfx_sparkle, .5); S(L[4] + 1.8, sfx_ting, .4)
# --- scene 5: Zap's square one + Coco's
S(L[5] + .02, sfx_beep, .4); S(L[5] + .3, sfx_beep, .3); S(L[5] + .3, lambda: sfx_sandup(1.4), .35); S(L[5] + .5, lambda: sfx_sandup(1.6), .3); S(L[5] + 1.7, sfx_ring, .3)
# --- scene 6: Peanut sees the wave
S(L[6] + .05, sfx_gasp, .4); S(W(6, 2) - .2, lambda: sfx_riser(1.0), .35); S(W(6, 2) - .2, lambda: sfx_swell(2.0), .4)
# --- scene 7: the wave crashes over the beach
S(tCrash - .1, lambda: sfx_whoosh(1.3), .55); S(tCrash, lambda: sfx_swell(2.4), .5); S(tCrash + .8, lambda: sfx_rumble(1.2), .4)
for i in range(5):
    tt = tCrash + 1.2 * ((TWY[i] - WVD) / (WVU - WVD)) ** .5
    S(tt, sfx_splash, .55); S(tt + .05, sfx_crunch, .4); S(tt + .08, sfx_thud, .45)
S(tCrash + 1.5, lambda: sfx_whoosh(1.4), .3)
# --- scene 8: Coco's sad
S(L[8] + .05, sfx_eep, .35)
for k in range(5): S(L[8] + .5 + k * .2, sfx_whimper, .1)
# --- scene 9: together
S(L[9] + .2, sfx_boing, .4); S(W(9, 3), sfx_pop, .5); S(W(9, 3) + .05, sfx_sparkle, .5); S(W(9, 3), sfx_heart, .4)
# --- scene 10: buckets
for i in range(4): t = W(10, 1) + i * .38; S(t - .1, sfx_pop, .35); S(t + .15, sfx_boing, .25); S(t + .22, lambda: sfx_sandup(.5), .35); S(t + .3, sfx_thud, .3); S(t + .35, sfx_sparkle, .4)
# --- scene 11: the giant castle
S(L[11] + .05, lambda: sfx_cheer(2.2), .5); S(L[11] + .2, sfx_sparkle, .6); S(L[11] + .3, sfx_heart, .5)
for k in range(6): S(L[11] + .3 + k * .3, sfx_ting, .2)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'intro'), ('L[2]', 'drive'), ('L[4]', 'drive'), ('L[6]', 'build'), ('tCrash', 'hush'), ('L[9]', 'magic'), ('L[10]', 'drive'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 67, 62, 55, 48]): add(music, tCrash + 1.0 + j * .06, marimba(midi(nn), .4), .24)
add(music, tCrash + 1.0, bass(midi(36), .8), .5)
for j, nn in enumerate([72, 76, 79, 84]): add(music, W(9, 3) + j * .06, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, L[11] + .1 + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, tStk, marimba(midi(88), .8), .18)''')
