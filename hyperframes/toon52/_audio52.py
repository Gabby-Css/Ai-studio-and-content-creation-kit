TITLE = "Bo and the Pancake 52: The Ice Cream Stand"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body52.js)
tPop = L[1] + .15
tHot = W(3, 3) - .1
tFrz = W(6, 3)
tEat = L[8] + .05
tFreeze = W(9, 2)
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
S(4.0, sfx_gull, .2); S(19.5, sfx_gull, .18)
# --- scene 1: the stand pops up, four cones
S(tPop - .05, lambda: sfx_riser(.35), .3); S(tPop + .3, sfx_bigpop, .5); S(tPop + .32, sfx_thud, .5); S(tPop + .35, sfx_sparkle, .6)
for i in range(4): S(tPop + .8 + i * .2, sfx_pop, .4); S(tPop + .85 + i * .2, sfx_ting, .3)
S(tPop + .5, sfx_boing, .4)
# --- scene 2: Truffle
S(W(2, 3), sfx_heart, .4); S(W(2, 3), lambda: sfx_cheer(1.2), .3)
for i in range(9): S(W(2, 3) + i * .04, sfx_boing, .1)
# --- scene 3: it is melting
S(L[3] + .02, sfx_beep, .4); S(L[3] + .3, sfx_beep, .3); S(tHot, sfx_pop, .5); S(tHot + .05, sfx_ting, .45)
for k in range(6): S(tHot + .4 + k * .2, sfx_drip, .3)
# --- scene 4: puddles
for k in range(8): S(L[4] + .2 + k * .16, sfx_plip, .3); S(L[4] + .4 + k * .2, sfx_splat, .15)
S(L[4] + .3, sfx_gasp, .35)
# --- scene 5: Waddles
S(L[5] + .3, sfx_boing, .4); S(W(5, 3), sfx_squeak, .3)
# --- scene 6: the cold breath
S(W(6, 1), lambda: sfx_whoosh(.9), .5); S(W(6, 1), lambda: sfx_swell(1.4), .25)
for i in range(8): S(tFrz + .15 + i * .09, sfx_ting, .22 + .02 * i)
S(tFrz + .1, sfx_crackle, .3); S(tFrz + .3, sfx_sparkle, .55)
# --- scene 7: Gumdrop runs in
S(L[7] - .5, lambda: sfx_patter(1.2), .35); S(L[7] + .02, lambda: sfx_roar(.6), .4); S(L[7] + .5, sfx_stomp, .4)
# --- scene 8: gulp gulp gulp
for i in range(4): S(tEat + i * .5, lambda: sfx_whoosh(.4), .35); S(tEat + i * .5 + .36, sfx_gulp, .5); S(tEat + i * .5 + .38, sfx_munch, .4)
S(tEat + 1.9, sfx_burp, .4)
# --- scene 9: brain freeze
S(L[9] + .02, sfx_gasp, .4)
for k in range(3): S(tFreeze + k * .22, sfx_ring, .3)
S(tFreeze, sfx_crackle, .35); S(tFreeze + .1, lambda: sfx_wobble(.9), .3); S(L[9] + .3, sfx_whimper, .12)
# --- scene 10: Mochi
S(L[10] - .2, sfx_pop, .4); S(L[10] + .3, sfx_boing, .2)
# --- scene 11: sharing
for k in range(3): S(L[11] + .15 + k * .2, sfx_pop, .4); S(L[11] + .2 + k * .2, sfx_sparkle, .4)
S(L[11] + .4, sfx_heart, .5); S(L[11] + .5, lambda: sfx_cheer(2.0), .5)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'intro'), ('L[2]', 'drive'), ('L[3]', 'hush'), ('L[5]', 'magic'), ('L[7]', 'drive'), ('L[9]', 'hush'), ('L[10]', 'drive'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, tPop + .3 + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([84, 88, 91, 96, 100]): add(music, tFrz + j * .08, marimba(midi(nn), .4), .2)
for j, nn in enumerate([60, 55, 52, 48]): add(music, tFreeze + j * .1, marimba(midi(nn), .4), .24)
add(music, tStk, marimba(midi(88), .8), .18)''')
