TITLE = "Bo and the Pancake 58: The Flying Coco"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body58.js)
tClimb = W(1, 1)
tNet = W(5, 3) - .1
tGo = W(6, 3) + .05
tRel = W(8, 3)
tFl0 = L[9] + .05
tFl1 = W(10, 1) - .4
tLand = W(10, 1) + .02
TP = (tRel - tGo) / 1.5
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_rung(): t = T(.09); return (np.sin(2 * np.pi * 380 * t) * np.exp(-t * 55) + lowpass(rng.standard_normal(len(t)), .3) * np.exp(-t * 80) * .6) * .6


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: Coco climbs the ladder (a rung every .2 s)
S(0.0, lambda: sfx_swell(1.4), .1)
for k in range(int((L[2] - .35 - tClimb) / .2)): S(tClimb + k * .2, sfx_rung, .35)
S(L[2] - .3, sfx_thud, .3)
# --- scene 2: it is so high
S(L[2] + .02, sfx_eep, .35); S(L[2] + .5, sfx_gulp, .3)
for k in range(8): S(L[2] + .4 + k * .13, sfx_squeak, .08)
# --- scene 3: Waddles flaps
for k in range(5): S(L[3] + .3 + k * .2, sfx_clothflap, .25)
S(W(3, 5), sfx_boing, .3); S(W(3, 5), sfx_heart, .4)
# --- scene 4: Bo
S(L[4] + .2, sfx_boing, .35); S(W(4, 4), sfx_boing, .3)
# --- scene 5: the friends run, the net pops up
S(L[5] - .2, lambda: sfx_patter(1.4), .35)
for k in range(4): S(L[5] + .05 + k * .2, sfx_stomp, .1)
S(tNet, sfx_bigpop, .55); S(tNet + .05, sfx_boing, .4); S(tNet + .25, sfx_sparkle, .6)
# --- scene 6: Coco grabs the bar
S(L[6] + .02, sfx_eep, .3); S(W(6, 2), sfx_boing, .3); S(tGo, lambda: sfx_whoosh(.5), .35); S(tGo, sfx_thump, .3)
# --- scene 7: swings (a whoosh every time the bar passes the bottom)
for k in range(1, 6): S(tGo + TP * (k - .25) / 2, lambda: sfx_whoosh(.6), .22 + .03 * k)
for k in range(4): S(tGo + .4 + k * TP / 2, lambda: sfx_creak(.6), .12)
S(W(7, 4), sfx_sparkle, .4)
# --- scene 8: let go
S(tRel - .05, lambda: sfx_whoosh(.7), .5); S(tRel, sfx_boing, .3); S(tRel + .1, lambda: sfx_drumroll(tLand - tRel - .3), .26)
# --- scene 9: three somersaults
for k in range(3): S(tFl0 + .2 + k * .55, sfx_flip, .5); S(tFl0 + .25 + k * .55, lambda: sfx_whoosh(.4), .3)
S(tFl1, lambda: sfx_riser(.4), .25)
# --- scene 10: soft landing on the net
S(tLand, sfx_cymbal, .5); S(tLand, sfx_bounce3, .5); S(tLand, sfx_thud, .4); S(tLand + .12, sfx_boing, .45); S(tLand + .82, sfx_boing, .3); S(tLand + .05, sfx_sparkle, .6)
S(tLand + .35, lambda: sfx_applause(2.0), .6); S(tLand + .3, sfx_heart, .5)
# --- scene 11: I can really fly
S(L[11] + .02, sfx_boing, .3); S(L[11] + .3, sfx_bigpop, .5); S(L[11] + .3, lambda: sfx_cheer(2.2), .5); S(L[11] + .4, sfx_heart, .4); S(L[11] + .4, sfx_sparkle, .6)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('circus', [(0, 'intro'), ('L[2]', 'hush'), ('L[4]', 'magic'), ('L[5]', 'march'), ('L[7]', 'drive'), ('L[9]', 'build'), ('tLand', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, tNet + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([79, 83, 86, 91]): add(music, tRel + j * .08, marimba(midi(nn), .4), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tLand + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, tLand, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
