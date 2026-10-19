TITLE = "Bo and the Pancake 57: The Juggling Act"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body57.js)
tThrow = W(3, 4) - .05
tLand = W(6, 1) + .05
tToss = L[8] - .1
tJug = W(8, 3) + .05
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_applause(d=2.0):
    out = np.zeros(int(SR * d)); t = T(d)
    for k in range(int(d * 24)): add(out, rng.random() * (d - .15), clap(), .5 + .5 * rng.random())
    return out * np.minimum(1, t / .2) * np.minimum(1, (d - t) / .4) * .8


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: Bo and Zap toss two pancakes
S(0.0, lambda: sfx_swell(1.6), .1)
for k in range(5): S(W(1, 3) + k * .3, lambda: sfx_whoosh(.3), .15); S(W(1, 3) + k * .3 + .12, sfx_tick, .2)
S(W(1, 3), sfx_boing, .25)
# --- scene 2: Zap juggles three (one soft tick per throw)
S(L[2] + .02, sfx_beep, .4); S(L[2] + .3, sfx_beep, .3)
for k in range(11): S(W(2, 2) - .1 + k * .17, sfx_tick, .22)
S(W(2, 4), sfx_ding, .35); S(W(2, 4), sfx_boing, .25)
# --- scene 3: Bo takes over
S(L[3] + .2, sfx_boing, .35)
for k in range(5): S(L[3] + .3 + k * .17, sfx_tick, .22)
# --- scene 4: the throw: a big whoosh up and a held sparkle
S(tThrow, lambda: sfx_whoosh(.8), .45); S(tThrow, lambda: sfx_riser(.9), .22); S(tThrow + .05, sfx_boing, .3); S(tThrow + .1, sfx_sparkle, .5)
for k in range(3): S(tThrow + .05 + k * .08, sfx_pop, .3)
# --- scene 5: Bo panics
S(L[5] + .02, sfx_gasp, .4); S(L[5] + .25, sfx_eep, .3)
for k in range(5): S(L[5] + .2 + k * .12, sfx_squeak, .1)
S(tLand - .6, lambda: sfx_whoosh(.5, False), .25)
# --- scene 6: plop, plop, plop on Gumdrop's head
for k in range(3): S(tLand + k * .1, sfx_plop, .55); S(tLand + k * .1, sfx_thud, .35); S(tLand + k * .1 + .02, sfx_boing, .2)
S(tLand + .05, sfx_sparkle, .5); S(tLand + .5, sfx_heart, .4)
# --- scene 7: Gumdrop roars
S(L[7] + .02, sfx_roar, .5); S(L[7] + .6, sfx_burp, .12); S(L[7] + .35, sfx_boing, .2)
for k in range(6): S(L[7] + .3 + k * .18, sfx_tick, .12)
# --- scene 8: the flick, and the passing starts
S(tToss, lambda: sfx_whoosh(.5), .4); S(tToss + .05, sfx_pop, .4); S(L[8] + .02, sfx_beep, .4); S(L[8] + .3, sfx_beep, .3)
for k in range(8): S(tJug + k * .22, sfx_tick, .22)
# --- scene 9: toss, catch
S(W(9, 1), lambda: sfx_whoosh(.3), .3); S(W(9, 1), sfx_boing, .25); S(W(9, 4), sfx_ting, .5); S(W(9, 4), sfx_sparkle, .5); S(W(9, 4), sfx_heart, .3)
# --- scene 10: five at once
for k in range(14): S(L[10] + .05 + k * .14, sfx_tick, .22)
for k in range(4): S(L[10] + .1 + k * .35, lambda: sfx_whoosh(.3), .15)
S(W(10, 3), sfx_bigpop, .4); S(W(10, 3), sfx_sparkle, .6); S(W(10, 5), sfx_boing, .3)
# --- scene 11: the whole tent claps
S(L[11] + .05, lambda: sfx_applause(2.4), .8); S(L[11] + .25, lambda: sfx_cheer(2.0), .5); S(L[11] + .3, sfx_bigpop, .5); S(L[11] + .3, sfx_cymbal, .35); S(L[11] + .4, sfx_heart, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('circus', [(0, 'intro'), ('L[2]', 'march'), ('L[4]', 'magic'), ('tLand', 'march'), ('L[8]', 'drive'), ('L[10]', 'build'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, tThrow + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([84, 88, 91, 96]): add(music, tLand + j * .1, marimba(midi(nn), .4), .22)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, L[11] + .1 + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tStk, marimba(midi(88), .8), .18)''')
