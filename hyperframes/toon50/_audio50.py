TITLE = "Bo and the Pancake 50: The Snow Day Party"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body50.js)
tFire = W(1, 3)
tMug = W(2, 1) - .1
tPan = W(2, 4) - .1
tNight = L[10] - .3
tBang = W(11, 7) - .1
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_fireloop(d=3.0):
    t = T(d); n = rng.standard_normal(len(t)); pops = np.zeros(len(t))
    for k in range(int(d * 9)):
        i = int(rng.uniform(0, len(t) - 400)); pops[i:i + 300] += rng.standard_normal(300) * np.exp(-np.arange(300) / 40.0) * rng.uniform(.2, .8)
    return lowpass(n, .15) * .25 + pops * .4


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: soft wind, the crackling fire (from the moment it is lit), glittering snow
S(0.0, lambda: sfx_swell(2.4), .14)
for k in range(8): S(.6 + k * 3.4, lambda: sfx_swell(2.8), .06)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .025)
for k in range(9): S(tFire + k * 3.0, lambda: sfx_fireloop(3.2), .35)
# --- scene 1: the fire is lit
S(tFire - .1, sfx_ignite, .6); S(tFire, lambda: sfx_riser(.4), .25); S(tFire + .2, sfx_sparkle, .5); S(W(1, 5), lambda: sfx_cheer(1.3), .3); S(W(1, 6), sfx_bigpop, .4)
# --- scene 2: cocoa and pancakes
S(L[2] + .15, sfx_boing, .35)
for i in range(5): S(tMug + i * .12, sfx_pop, .4); S(tMug + i * .12 + .05, sfx_ting, .3)
S(tPan, sfx_pop, .5); S(tPan + .05, sfx_sizzle, .35); S(tPan + .2, sfx_sparkle, .5); S(tPan + .3, sfx_heart, .4)
# --- scene 3: Grandma
S(L[3] + .3, lambda: sfx_swell(1.4), .15); S(W(3, 5), sfx_heart, .35)
# --- scene 4: the secret
S(L[4] + .1, lambda: sfx_swell(1.6), .15); S(W(4, 3), sfx_ding, .3)
# --- scene 5: warmest friends
S(L[5] + .3, sfx_boing, .3); S(W(5, 4), lambda: sfx_riser(1.0), .3); S(W(5, 5), sfx_heart, .5)
for i in range(6): S(W(5, 5) + i * .1, sfx_sparkle, .4)
# --- scene 6: the hug
for k in range(4): S(L[6] + .3 + k * .2, sfx_patter, .2)
S(L[6] + 1.15, sfx_squeak, .35); S(L[6] + 1.2, sfx_heart, .5); S(L[6] + 1.25, sfx_sparkle, .5)
# --- scene 7: Mochi
S(L[7] + .3, sfx_whimper, .1)
# --- scene 8: Mochi smiles
S(W(8, 4), sfx_ting, .5); S(W(8, 4) + .05, sfx_sparkle, .6); S(W(8, 5), sfx_heart, .5); S(W(8, 5) + .2, sfx_gasp, .35)
# --- scene 9: happy snow day
S(L[9] - .05, lambda: sfx_cheer(1.8), .5); S(L[9] + .05, sfx_bigpop, .5)
for i in range(9): S(L[9] + .1 + i * .03, sfx_boing, .15)
S(L[9] + .3, sfx_heart, .5)
# --- scene 10: night, singing
S(tNight, lambda: sfx_swell(2.6), .3)
for i in range(5): S(L[10] + .4 + i * .35, sfx_chirp, .22); S(L[10] + .45 + i * .35, sfx_ting, .28)
S(W(10, 6), sfx_firework, .55); S(W(10, 6) + .5, sfx_firework, .5)
# --- scene 11: fireworks
for i, d in enumerate([.1, .5, .9, 1.3, 1.7]): S(L[11] + d, sfx_firework, .55)
for i, d in enumerate([0, .18, .36, .54, .72]): S(tBang + d, sfx_firework, .65); S(tBang + d, sfx_bigpop, .3)
S(tBang, lambda: sfx_cheer(2.6), .55); S(tBang + .2, sfx_heart, .5); S(tBang + .2, sfx_sparkle, .6)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('finale', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'hush'), ('L[5]', 'magic'), ('L[7]', 'hush'), ('L[8]', 'magic'), ('L[9]', 'drive'), ('L[10]', 'build'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, tFire + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([84, 88, 91, 96]): add(music, W(8, 4) + j * .08, marimba(midi(nn), .4), .22)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, L[9] + .05 + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tBang + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, tBang, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
