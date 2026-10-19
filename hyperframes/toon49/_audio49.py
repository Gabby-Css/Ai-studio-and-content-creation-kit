TITLE = "Bo and the Pancake 49: Munch's Snow Castle"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body49.js)
tBuild = W(1, 1)
tTop = W(3, 2)
tEnter = L[4] + 1.6
tWob = W(10, 3) - .1
tOut = W(10, 5) + .2
tFall = W(11, 2)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_snowhit(d=.3):
    t = T(d); n = rng.standard_normal(len(t))
    return lowpass(n, .45) * np.exp(-t * 14) * .9 + np.sin(2 * np.pi * 110 * t) * np.exp(-t * 20) * .5


def sfx_throw(d=.35):
    t = T(d); n = rng.standard_normal(len(t))
    return lowpass(n, .3) * np.sin(np.pi * t / d) ** 2 * .7


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: cold wind, glittering snow
S(0.0, lambda: sfx_swell(2.4), .2)
for k in range(8): S(.6 + k * 3.4, lambda: sfx_swell(2.8), .08)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
# --- scene 1: the castle grows
S(tBuild - .1, lambda: sfx_riser(.6), .35); S(tBuild, lambda: sfx_rumble(1.2), .6); S(tBuild + .9, sfx_bigpop, .55); S(tBuild + .95, sfx_thud, .6); S(tBuild + .95, sfx_sparkle, .6)
for k in range(5): S(tBuild + .1 + k * .2, sfx_crunch, .22)
S(tBuild + .9, lambda: sfx_cheer(1.2), .3)
# --- scene 2: Munch invites
S(L[2] + .1, sfx_boing, .35); S(L[2] + .5, sfx_ding, .4); S(L[2] + .5, lambda: sfx_swell(2.0), .2)
# --- scene 3: Bo, the pancake tower
S(L[3] + .15, sfx_boing, .4); S(tTop, sfx_pop, .55); S(tTop + .05, sfx_sparkle, .6); S(tTop + .1, sfx_ting, .45); S(tTop + .3, sfx_heart, .4)
# --- scene 4: Truffle runs into the kitchen
S(L[4] + .1, sfx_boing, .3)
for k in range(5): S(L[4] + .65 + k * .2, sfx_patter, .22)
S(tEnter, sfx_knock, .3); S(tEnter + .15, sfx_sizzle, .4); S(tEnter + .2, sfx_sparkle, .4); S(tEnter + .6, sfx_ding, .35)
# --- scene 5: first snowball
S(L[5] + .15, sfx_boing, .3); S(W(5, 1) + .25, sfx_throw, .5); S(W(5, 1) + .25, sfx_whoosh, .3); S(W(5, 3) - .05, sfx_squeak, .3); S(W(5, 1) + 1.35, sfx_snowhit, .8); S(W(5, 1) + 1.4, sfx_gasp, .3)
# --- scene 6: snowballs fly everywhere
for i in range(8): S(L[6] + .02 + i * .32, sfx_throw, .4); S(L[6] + .02 + i * .32 + [.9, .9, 1.0, .7, .9, .8, 1.2, .9][i], sfx_snowhit, .5)
S(L[6] + .2, lambda: sfx_cheer(2.0), .25)
# --- scene 7: Mochi dodges
S(W(7, 1) - .4, sfx_throw, .45); S(W(7, 1) - .35, sfx_whoosh, .35); S(W(7, 1) + .05, sfx_clothflap, .3); S(L[7] + .5, sfx_whimper, .1)
# --- scene 8: Waddles throws
for k in range(3): S(W(8, 2) + .1 + k * .28, sfx_throw, .45); S(W(8, 2) + .1 + k * .28 + .45, sfx_snowhit, .6); S(W(8, 2) + .1 + k * .28 + .45, sfx_boing, .22)
S(L[8] + .2, sfx_boing, .3); S(W(8, 3), sfx_heart, .4)
# --- scene 9: Pebble: again!
for k in range(3): S(W(9, k) + .02, sfx_squeak, .35); S(W(9, k) + .02, sfx_boing, .3); S(W(9, k) - .2, sfx_throw, .4); S(W(9, k) + .3, sfx_snowhit, .7)
# --- scene 10: the castle wobbles
S(tWob - .1, lambda: sfx_rumble(1.8), .55); S(tWob, lambda: sfx_creak(1.4), .45); S(tWob, lambda: sfx_wobble(1.4), .3)
for k in range(6): S(tWob + .95 + k * .2, sfx_thud, .3); S(tWob + .95 + k * .2, sfx_crunch, .25)
S(tOut, sfx_knock, .4); S(tOut + .05, sfx_gasp, .35); S(tOut + .2, sfx_patter, .3)
# --- scene 11: collapse and laughter
S(tFall - .1, lambda: sfx_riser(.3), .3); S(tFall, lambda: sfx_rumble(1.0), .6); S(tFall + .3, sfx_thud, .9); S(tFall + .3, sfx_bigpop, .6); S(tFall + .35, sfx_splat, .5)
for k in range(5): S(tFall + .35 + k * .08, sfx_snowhit, .35)
S(L[11] + .1, lambda: sfx_cheer(2.4), .55); S(tFall + .35, sfx_sparkle, .6); S(tFall + .5, sfx_heart, .4)
for k in range(4): S(L[11] + .4 + k * .4, sfx_boing, .22)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'drive'), ('L[5]', 'build'), ('L[6]', 'drive'), ('L[8]', 'magic'), ('L[10]', 'hush'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([60, 64, 67, 72, 76]): add(music, tBuild + .9 + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tBuild + .9, bass(midi(36), .8), .55)
for j, nn in enumerate([84, 88, 91, 96]): add(music, tTop + j * .06, marimba(midi(nn), .4), .2)
for j, nn in enumerate([72, 67, 62, 55]): add(music, tFall + .3 + j * .07, marimba(midi(nn), .4), .2)
add(music, tStk, marimba(midi(88), .8), .18)''')
