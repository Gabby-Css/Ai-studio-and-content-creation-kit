TITLE = "Bo and the Pancake 59: The Magic Hat"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body59.js)
tPoof = W(5, 0)
tPop = W(9, 1) - .05
D9 = W(9, 3) - tPop + .2
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_giggle(d=.5):
    t = T(d); f = 900 + 260 * np.sin(2 * np.pi * 11 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(2 * np.pi * 9 * t) > 0) * np.sin(np.pi * t / d) * .22


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: Mochi swishes her wand
S(0.0, lambda: sfx_swell(1.4), .1)
for k in range(4): S(W(1, 2) + k * .4, lambda: sfx_whoosh(.25), .18)
S(W(1, 4), sfx_sparkle, .5); S(L[1] + .3, sfx_squeak, .15)
# --- scene 2: Hmph
for k in range(4): S(L[2] + .3 + k * .5, lambda: sfx_whoosh(.25), .15)
S(L[2] + .1, sfx_whimper, .08)
# --- scene 3: tap, tap
for tt in (W(3, 3) - .12, W(3, 4) - .08): S(tt + .09, sfx_ting, .5); S(tt + .09, sfx_thud, .2); S(tt + .12, sfx_sparkle, .4)
# --- scene 4: the magic words
S(L[4] - .1, lambda: sfx_riser(1.0), .3)
for k in range(5): S(W(4, 1) + k * .25, sfx_sparkle, .45)
S(W(4, 3), sfx_ding, .5); S(W(4, 3) + .05, sfx_sparkle, .5)
# --- scene 5: POOF
S(tPoof - .05, sfx_bigpop, .65); S(tPoof, lambda: sfx_whoosh(.5), .35); S(tPoof + .05, sfx_sparkle, .7); S(tPoof + .02, sfx_cymbal, .25)
S(tPoof + .35, sfx_boing, .35); S(tPoof + .95, sfx_thud, .25); S(tPoof + .98, sfx_ding, .35)
# --- scene 6: Bo cheers
S(L[6] + .2, sfx_boing, .35); S(W(6, 0), lambda: sfx_cheer(1.0), .3); S(W(6, 4), sfx_boing, .35); S(W(6, 4), sfx_heart, .4)
# --- scene 7: the hat rattles
S(L[7] + .15, lambda: sfx_rumble(L[9] - L[7]), .3)
for k in range(8): S(L[7] + .25 + k * .24, sfx_tick, .22)
S(L[7] + .4, sfx_gasp, .35); S(W(7, 3), lambda: sfx_creak(.8), .2)
# --- scene 8: Zap scans
S(L[8] + .02, sfx_beep, .4); S(L[8] + .3, sfx_beep, .3); S(W(8, 2), lambda: sfx_scan(1.0), .3)
for k in range(3): S(W(8, 2) + k * .22, sfx_ring, .25)
# --- scene 9: Rocky pops out
S(tPop - .05, sfx_bigpop, .6); S(tPop, lambda: sfx_whoosh(.7), .4); S(tPop + .05, sfx_boing, .4); S(tPop + .1, sfx_sparkle, .6); S(tPop + .02, sfx_cymbal, .25)
for k in range(5): S(tPop + .3 + k * .22, sfx_giggle, .5)
S(tPop + D9, sfx_thud, .4); S(tPop + D9 + .02, sfx_boing, .3)
# --- scene 10: Surprise!
S(L[10] + .02, lambda: sfx_trumpet(.3), .35); S(W(10, 0), sfx_bigpop, .4); S(W(10, 0), lambda: sfx_cheer(1.8), .45); S(W(10, 0) + .1, sfx_sparkle, .6); S(W(10, 4), sfx_boing, .3); S(W(10, 3), sfx_heart, .3)
# --- scene 11: a tiny smile
S(W(11, 3) - .05, sfx_heart, .45); S(W(11, 3), sfx_ting, .5); S(W(11, 3) + .05, sfx_sparkle, .6); S(W(11, 4), lambda: sfx_cheer(1.2), .25)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('circus', [(0, 'intro'), ('L[2]', 'hush'), ('L[3]', 'magic'), ('tPoof', 'march'), ('L[7]', 'hush'), ('tPop', 'drive'), ('L[10]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tPoof + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([84, 88, 91, 96]): add(music, W(4, 3) + j * .06, marimba(midi(nn), .4), .2)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tPop + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([79, 84, 88, 91]): add(music, W(11, 3) + j * .1, marimba(midi(nn), .6), .18)
add(music, tStk, marimba(midi(88), .8), .18)''')
