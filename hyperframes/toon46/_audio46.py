TITLE = "Bo and the Pancake 46: Snow Day"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body46.js)
tWhite = W(1, 4)
tSlide = L[8] + .35
tSled = L[11] + .2
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_shiver(d=1.0):
    out = np.zeros(int(SR * d))
    for k in range(int(d / .06)): add(out, k * .06, sfx_tick() * .7)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: cold wind and glittering snow
S(0.0, lambda: sfx_swell(2.4), .22)
for k in range(8): S(.6 + k * 3.4, lambda: sfx_swell(2.8), .09)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .035)
# --- scene 1: the world turns white
S(.5, lambda: sfx_riser(1.4), .3); S(tWhite, sfx_bigpop, .5); S(tWhite + .02, sfx_sparkle, .6); S(tWhite + .05, lambda: sfx_cheer(1.2), .35)
# --- scene 2: Bo
S(L[2] + .25, sfx_boing, .4); S(W(2, 5), sfx_boing, .4); S(W(2, 5), sfx_heart, .4)
# --- scene 3: Pebble
for d in [0, .35, .7]: S(L[3] + .02 + d, sfx_squeak, .3); S(L[3] + .05 + d, sfx_boing, .3)
# --- scene 4: Mochi shivers
S(L[4] + .1, lambda: sfx_shiver(1.8), .5); S(L[4] + .3, sfx_whimper, .12)
# --- scene 5: scarves
S(L[5] + .2, sfx_boing, .3); S(W(5, 4), sfx_heart, .4)
for i in range(9): S(W(5, 4) + .1 + i * .08, sfx_sparkle, .35)
# --- scene 6: Zap's thermometer
S(L[6] + .02, sfx_beep, .4); S(L[6] + .3, sfx_beep, .3); S(W(6, 2), sfx_pop, .5); S(W(6, 2) + .05, sfx_ting, .45); S(L[6] + .4, lambda: sfx_shiver(1.2), .25)
# --- scene 7: frozen bananas
S(W(7, 2) - .1, sfx_pop, .45); S(W(7, 3), sfx_clink, .6); S(W(7, 3) + .15, sfx_clink, .5); S(W(7, 3) + .3, sfx_clink, .4); S(W(7, 4), sfx_sparkle, .5)
S(L[7] + .15, sfx_boing, .3)
# --- scene 8: the penguin slides in
S(tSlide - .2, lambda: sfx_riser(.5), .25); S(tSlide, lambda: sfx_skidslide(1.6), .5); S(tSlide, lambda: sfx_whoosh(1.4), .4)
S(tSlide + 1.45, sfx_boing, .5); S(tSlide + 1.5, sfx_thud, .6); S(tSlide + 1.55, sfx_sparkle, .5); S(tSlide + 1.2, sfx_gasp, .4)
# --- scene 9: Waddles
S(L[9] + .2, sfx_boing, .4); S(L[9] + .3, sfx_squeak, .3); S(W(9, 3), sfx_heart, .4)
S(L[9] + .3, lambda: sfx_patter(1.0), .25)
# --- scene 10: welcome
S(L[10] + .1, sfx_boing, .3); S(W(10, 3), sfx_heart, .5); S(W(10, 3) + .05, sfx_sparkle, .5)
# --- scene 11: the sled
S(tSled, lambda: sfx_whoosh(1.5), .45); S(tSled, lambda: sfx_skidslide(1.5), .35); S(tSled + 1.5, sfx_thud, .6)
S(tSled + 1.4, lambda: sfx_cheer(1.8), .5); S(tSled + 1.45, sfx_heart, .4); S(tSled + 1.5, sfx_sparkle, .5)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'magic'), ('L[2]', 'intro'), ('L[4]', 'hush'), ('L[5]', 'drive'), ('L[8]', 'magic'), ('L[9]', 'drive'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([74, 78, 81, 86, 90]): add(music, tWhite + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([86, 90, 93]): add(music, W(6, 2) + j * .06, marimba(midi(nn), .4), .2)
for j, nn in enumerate([72, 76, 79, 84]): add(music, tSlide + 1.45 + j * .05, marimba(midi(nn + 12), .5), .26)
add(music, tStk, marimba(midi(90), .8), .18)''')
