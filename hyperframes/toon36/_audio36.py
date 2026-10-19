TITLE = "Bo and the Pancake 36: The Map in the Pan"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body36.js)
tM = W(3, 4)
tX = W(4, 2)
tI = W(9, 4)
SLT = [L[10] + .1, W(10, 2), W(10, 4)]
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_scribble():
    t = T(.18); n = rng.standard_normal(len(t)); return lowpass(n, .5) * np.exp(-t * 9) * .5 * np.sin(2 * np.pi * 38 * t) ** 2


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: a sunny morning, Munch trots away, the pan glints
S(0.0, lambda: sfx_swell(1.8), .2); S(.1, lambda: sfx_patter(2.6), .12)
S(W(1, 3), sfx_sparkle, .5); S(W(1, 3), sfx_ting, .35)
# --- scene 2: Truffle runs up and lifts the pan
S(L[1] + .5, lambda: sfx_patter(1.6), .25)
S(L[2] + .1, sfx_boing, .3); S(W(2, 2) - .2, lambda: sfx_whoosh(.4), .3); S(W(2, 2), sfx_heart, .4)
# --- scene 3: the fire, the sizzle, the map pops out
S(L[3] - .7, lambda: sfx_whoosh(.4), .3); S(L[3] - .25, sfx_ignite, .5); S(L[3] - .1, lambda: sfx_sizzle(1.7), .38)
S(tM - .05, lambda: sfx_riser(.35), .3); S(tM, sfx_bigpop, .55); S(tM + .03, sfx_sparkle, .6); S(tM + .05, sfx_ting, .5); S(tM + .1, sfx_gasp, .35)
S(tM + .45, lambda: sfx_whoosh(.6), .22)
# --- scene 4: Zap scans the map, the X is drawn
S(L[4] + .25, lambda: sfx_scan(1.2), .3)
for k in range(3): S(L[4] + .3 + k * .3, sfx_ring, .22)
S(tX, sfx_scribble, .7); S(tX + .18, sfx_scribble, .7); S(tX + .36, sfx_ting, .6); S(tX + .38, sfx_sparkle, .5)
# --- scene 6: Bo cheers
S(L[6] + .2, sfx_boing, .4); S(W(6, 2), sfx_heart, .45); S(W(6, 2) + .05, sfx_chirp, .25)
# --- scene 7: Pebble
S(L[7] + .02, sfx_squeak, .3); S(W(7, 2), sfx_squeak, .3); S(W(7, 2), sfx_heart, .3)
# --- scene 8: the dotted path crawls out to sea
S(L[8] - .4, lambda: sfx_whoosh(.7), .25)
for i in range(15): S(L[8] + .2 + i * .055, sfx_tick, .3 + .01 * i)
S(W(8, 5), sfx_ting, .5); S(W(8, 5) + .05, sfx_sparkle, .4)
# --- scene 9: the boat idea
S(tI, sfx_pop, .55); S(tI + .05, sfx_ting, .45); S(tI + .25, sfx_sparkle, .45)
# --- scene 10: the pancake boat is built
S(L[10] - .2, lambda: sfx_patter(.8), .2)
for i, t in enumerate(SLT):
    S(t, lambda: sfx_whoosh(.35, False), .25); S(t + .42, sfx_thud, .6); S(t + .42, lambda f=midi(60 + 4 * i): sfx_stackdrop(f), .35); S(t + .6, sfx_boing, .2)
S(SLT[2] + .5, sfx_pop, .4); S(SLT[2] + .55, sfx_sparkle, .4)
S(L[11] - .25, lambda: sfx_riser(.5), .3); S(L[11] - .1, sfx_clink, .4)
# --- scene 11: sail, flag, sunset cheer
S(L[11] + .1, lambda: sfx_whoosh(.6), .35); S(L[11] + .5, sfx_creak, .2)
S(W(11, 5) - .1, sfx_pop, .5); S(W(11, 5), lambda: sfx_trumpet(.6), .45); S(W(11, 5), sfx_sparkle, .55)
S(W(11, 5) + .05, lambda: sfx_cheer(1.8), .5); S(W(11, 5) + .1, sfx_heart, .4)
S(L[11] + .1, lambda: sfx_swell(2.4), .2)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'intro'), ('L[3]', 'magic'), ('L[5]', 'drive'), ('L[9]', 'build'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tM + j * .06, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([76, 79, 84, 88]): add(music, tI + j * .06, marimba(midi(nn + 12), .4), .2)
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, W(11, 5) + j * .05, marimba(midi(nn + 12), .5), .26)
add(music, tStk, marimba(midi(88), .8), .18)''')
