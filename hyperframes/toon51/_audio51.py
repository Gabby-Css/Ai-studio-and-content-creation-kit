TITLE = "Bo and the Pancake 51: Beach Day"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body51.js)
tMelt = W(1, 4)
tMarch = L[8] - .2
tBeach = L[8] + .1
tRun = L[11] - .6
tSplash = W(11, 2)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


def sfx_scratch(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); return (n - lowpass(n, .3)) * (np.sin(2 * np.pi * 14 * t) > 0) * np.exp(-t * 3) * .5


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: gentle waves from the moment the beach shows up, a couple of gulls, glittering light
S(0.0, lambda: sfx_swell(2.4), .12)
for k in range(6): S(tBeach - .3 + k * 3.2, lambda: sfx_swell(3.0), .12)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
S(L[9] + .6, sfx_gull, .22); S(L[10] + .5, sfx_gull, .2)
# --- scene 1: the sun melts the snow
S(tMelt - .25, lambda: sfx_riser(.4), .35); S(tMelt - .1, sfx_bigpop, .55); S(tMelt - .08, sfx_sparkle, .7); S(tMelt, lambda: sfx_swell(1.6), .3)
for k in range(8): S(tMelt + .2 + k * .17, sfx_drip, .26)
# --- scene 2: Waddles is too hot
S(L[2] + .05, sfx_gasp, .35)
for k in range(5): S(L[2] + .2 + k * .3, sfx_plip, .25)
for k in range(6): S(L[2] + .3 + k * .14, sfx_clothflap, .1)
# --- scene 3: Bo
S(L[3] + .2, sfx_boing, .4); S(W(3, 4) - .1, sfx_boing, .4); S(W(3, 4), sfx_heart, .4)
# --- scene 4: Pebble and the ball
for k in range(3): S(W(4, k) + .02, sfx_squeak, .3); S(W(4, k) + .04, sfx_boing, .35); S(W(4, k) + .3, sfx_thud, .25)
S(W(4, 0) - .15, sfx_pop, .45)
# --- scene 5: Truffle's basket
S(W(5, 3) - .2, sfx_pop, .45); S(W(5, 3) - .1, sfx_thud, .4); S(W(5, 4) - .05, sfx_creak, .3); S(W(5, 4) + .15, sfx_pop, .4); S(W(5, 4) + .15, sfx_sparkle, .5); S(L[5] + .15, sfx_boing, .3)
# --- scene 6: Zap
S(L[6] + .02, sfx_beep, .4); S(L[6] + .3, sfx_beep, .3); S(W(6, 2), sfx_pop, .5); S(W(6, 2) + .05, sfx_ting, .45)
# --- scene 7: Mochi's itchy feet
for k in range(4): S(W(7, 3) + k * .2, sfx_scratch, .25); S(W(7, 3) + k * .2, sfx_squeak, .1)
S(L[7] + .3, sfx_whimper, .1)
# --- scene 8: marching (footsteps) while the beach scrolls by
S(tMarch, lambda: sfx_patter(2.6), .3)
for k in range(5): S(tMarch + .3 + k * .5, sfx_stomp, .12)
S(tBeach, lambda: sfx_swell(2.0), .35)
# --- scene 9: Coco
S(L[9] + .02, sfx_eep, .3); S(L[9] + .45, sfx_boing, .3); S(W(9, 4), sfx_sparkle, .5)
# --- scene 10: sparkling waves
for k in range(8): S(W(10, 2) - .2 + k * .16, sfx_ting, .2 + .02 * k)
S(L[10] + .5, lambda: sfx_cheer(1.4), .3)
# --- scene 11: the dive
S(tRun, lambda: sfx_patter(1.2), .3); S(tSplash - .05, sfx_bigpop, .4)
for i, d in enumerate([0, .1, .22]): S(tSplash + d, sfx_splash, .6 - .1 * i)
S(tSplash + .05, sfx_sparkle, .6); S(tSplash + .2, lambda: sfx_cheer(2.0), .5); S(tSplash + .3, sfx_heart, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'hush'), ('tMelt', 'magic'), ('L[3]', 'intro'), ('L[5]', 'drive'), ('L[7]', 'hush'), ('L[8]', 'drive'), ('L[10]', 'magic'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([74, 78, 81, 86, 90]): add(music, tMelt + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([84, 88, 91, 96]): add(music, W(10, 2) + j * .12, marimba(midi(nn), .4), .18)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tSplash + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tStk, marimba(midi(88), .8), .18)''')
