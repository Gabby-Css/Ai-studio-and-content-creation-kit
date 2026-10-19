TITLE = "Bo and the Pancake 48: The Big Sled"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body48.js)
tGo = L[5] - .1
tHit = W(10, 2) + .05
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_crashsnow(d=1.0):
    t = T(d); n = rng.standard_normal(len(t))
    return (lowpass(n, .5) * np.exp(-t * 5) * 1.3 + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 8) * .9 + np.sin(2 * np.pi * 150 * t) * np.exp(-t * 14) * .4)


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: cold wind, glittering snow
S(0.0, lambda: sfx_swell(2.4), .2)
for k in range(8): S(.6 + k * 3.4, lambda: sfx_swell(2.8), .08)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
# --- scene 1: the sled and the waving friends
S(.2, sfx_pop, .5); S(.25, sfx_sparkle, .45)
for i in range(4): S(.6 + i * .1, sfx_boing, .2)
# --- scene 2: Bo steers
S(L[2] + .25, sfx_boing, .4); S(L[2] + .4, lambda: sfx_clothflap(), .2)
# --- scene 3: Waddles
S(L[3] + .25, sfx_boing, .4); S(L[3] + .3, sfx_squeak, .3)
# --- scene 4: Gumdrop pushes
S(L[4] + .02, lambda: sfx_roar(.6), .35)
for k in range(5): S(L[4] + .4 + k * .2, sfx_stomp, .3); S(L[4] + .4 + k * .2, sfx_skid, .12)
# --- scene 5: the sled zooms off
S(tGo - .15, lambda: sfx_riser(.5), .3); S(tGo, lambda: sfx_whoosh(1.6), .6); S(tGo + .05, lambda: sfx_skidslide(2.2), .45)
S(tGo + .5, lambda: sfx_swell(3.0), .3)
for k in range(10): S(tGo + .6 + k * .5, sfx_sparkle, .12)
# --- scene 6: Coco
S(L[6] + .1, sfx_eep, .35); S(L[6] + .5, sfx_boing, .25)
# --- scene 7: Mochi
S(L[7] + .3, sfx_whimper, .12)
# --- scene 8: Boo
S(L[8] + .05, lambda: sfx_echo(sfx_ting()), .22); S(L[8] + .3, lambda: sfx_swell(1.2), .2)
# --- scene 9: Zap's brakes
S(L[9] + .02, sfx_beep, .4); S(L[9] + .3, sfx_beep, .3)
for k in range(4): S(L[9] + .7 + k * .2, sfx_buzz, .25)
# --- scene 10: crash
S(tHit - .25, lambda: sfx_riser(.3), .35); S(tHit, sfx_bigpop, .6); S(tHit, lambda: sfx_crashsnow(1.0), .7); S(tHit + .02, sfx_thud, .8)
for k in range(5): S(tHit + .1 + k * .07, sfx_splat, .25)
S(tHit + .2, sfx_gasp, .3)
for i in range(6): S(tHit + .35 + i * .08, sfx_boing, .22)
S(tHit + .2, lambda: sfx_skid(), .3)
# --- scene 11: the snowman wears the scarf
S(L[11] + .3, sfx_pop, .5); S(L[11] + .35, sfx_sparkle, .55); S(L[11] + .4, sfx_ting, .4)
S(L[11] + .9, lambda: sfx_cheer(2.0), .5); S(L[11] + .95, sfx_heart, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'hush'), ('L[2]', 'intro'), ('L[4]', 'drive'), ('L[5]', 'build'), ('L[6]', 'drive'), ('L[8]', 'magic'), ('L[10]', 'hush'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([60, 64, 67, 72, 76]): add(music, tGo + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, tGo, bass(midi(36), .8), .6)
for j, nn in enumerate([72, 67, 62, 55]): add(music, tHit + j * .08, marimba(midi(nn), .4), .2)
for j, nn in enumerate([72, 76, 79, 84]): add(music, L[11] + .3 + j * .05, marimba(midi(nn + 12), .5), .26)
add(music, tStk, marimba(midi(88), .8), .18)''')
