TITLE = "Bo and the Pancake 54: The Message in a Bottle"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body54.js)
tLand = W(1, 5) + .2
tCork = W(3, 4)
tSign = W(8, 1) - .1
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: waves, gulls, glitter
S(0.0, lambda: sfx_swell(2.4), .12)
for k in range(9): S(.6 + k * 3.3, lambda: sfx_swell(3.0), .1)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
S(2.0, sfx_gull, .2); S(15.0, sfx_gull, .18)
# --- scene 1: the bottle bobs in
for k in range(7): S(L[1] + .2 + k * .28, sfx_bubble, .2)
S(tLand, sfx_splash, .4); S(tLand + .02, sfx_clink, .5); S(tLand + .05, sfx_sparkle, .5); S(tLand, sfx_gasp, .3)
# --- scene 2: Boo
S(L[2] - .3, lambda: sfx_whoosh(.8), .25); S(L[2] + .02, sfx_ting, .25); S(L[2] + .3, lambda: sfx_swell(1.2), .2)
# --- scene 3: cork pops, letter pops out
S(L[3] + .2, sfx_boing, .4); S(tCork, sfx_bigpop, .6); S(tCork + .02, sfx_pop, .5); S(tCork + .15, sfx_sparkle, .6); S(tCork + .2, lambda: sfx_riser(.4), .25)
# --- scene 4: scanning
S(L[4] + .02, sfx_beep, .4); S(L[4] + .3, sfx_beep, .3); S(W(4, 3) - .1, lambda: sfx_scan(1.0), .4)
for k in range(3): S(W(4, 3) + k * .2, sfx_ring, .3)
# --- scene 5: it came from his family
S(L[5] + .1, sfx_heart, .4); S(W(5, 3), sfx_sparkle, .55)
for k in range(5): S(L[5] + .2 + k * .22, sfx_squeak, .12)
# --- scene 6: Waddles is overjoyed
S(L[6] + .25, sfx_boing, .45); S(L[6] + .3, sfx_squeak, .3); S(W(6, 4), sfx_boing, .4); S(W(6, 3), sfx_heart, .5); S(L[6] + .5, lambda: sfx_cheer(1.4), .35)
# --- scene 7: party time
S(L[7] + .2, sfx_boing, .4); S(W(7, 5), sfx_bigpop, .5); S(W(7, 5), lambda: sfx_cheer(2.0), .5)
for k in range(9): S(W(7, 5) + .1 + k * .04, sfx_boing, .1)
# --- scene 8: the sign goes up
for k in range(6): S(tSign + k * .09, sfx_knock, .3)
S(tSign + .1, sfx_planks, .4); S(tSign + .5, lambda: sfx_swell(.6), .15); S(tSign + .95, sfx_thud, .6); S(tSign + 1.0, sfx_sparkle, .6); S(tSign + 1.0, sfx_ting, .4)
# --- scene 9: coconut cups
S(L[9] + .02, sfx_eep, .3)
for i in range(5): S(W(9, 3) + i * .12, sfx_pop, .4); S(W(9, 3) + i * .12 + .05, sfx_clink, .35)
# --- scene 10: something big approaches (ice creaks, cold swell)
S(L[10] + .05, lambda: sfx_swell(3.2), .4); S(L[10] + .3, lambda: sfx_rumble(2.0), .25)
for k in range(6): S(L[10] + .6 + k * .45, sfx_crackle, .15)
S(L[10] + .4, sfx_gasp, .3)
# --- scene 11: a giant iceberg
S(W(11, 4) - .1, lambda: sfx_riser(.5), .35); S(W(11, 4), sfx_bigpop, .5); S(W(11, 4) + .05, sfx_sparkle, .6); S(W(11, 4) + .05, sfx_ring, .4); S(W(11, 4) + .1, sfx_boing, .4); S(W(11, 4) + .2, sfx_heart, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'intro'), ('L[2]', 'hush'), ('L[3]', 'magic'), ('L[5]', 'hush'), ('L[6]', 'drive'), ('L[8]', 'drive'), ('L[10]', 'build'), ('L[11]', 'magic')],
                  stingers='''for j, nn in enumerate([84, 88, 91, 96]): add(music, tCork + j * .07, marimba(midi(nn), .4), .22)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, W(7, 5) + j * .05, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([60, 67, 72, 76, 79]): add(music, W(11, 4) + j * .08, marimba(midi(nn + 12), .5), .26)
add(music, tStk, marimba(midi(88), .8), .18)''')
