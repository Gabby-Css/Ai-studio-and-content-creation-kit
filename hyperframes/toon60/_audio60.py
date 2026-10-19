TITLE = "Bo and the Pancake 60: The Grand Finale"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body60.js)
tC0 = L[3] - .2
tTurn = W(4, 3) - .1
TPEN_ = 2.4
tPop = W(5, 2) - .05
D5 = L[6] - .25 - tPop
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_firecracker(d=.6):
    out = np.zeros(int(SR * d))
    for k in range(9): add(out, k * .05 + rng.random() * .02, sfx_pop() * (.5 + .5 * rng.random()), .5)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the lights flash, the crowd roars
S(.05, lambda: sfx_drumroll(.5), .3); S(.3, sfx_relay, .5); S(.4, sfx_relay, .5); S(.45, sfx_cymbal, .5); S(.5, lambda: sfx_cheer(2.0), .6); S(L[1] + .2, sfx_bigpop, .5); S(L[1] + .25, sfx_sparkle, .6)
S(L[1] + .3, lambda: sfx_trumpet(.4), .3)
# --- scene 2: Dad's welcome
S(L[2] + .02, lambda: sfx_trumpet(.35), .4); S(L[2] + .4, lambda: sfx_trumpet(.5), .35); S(W(2, 3), sfx_sparkle, .6); S(W(2, 3), sfx_boing, .3); S(W(2, 3) + .1, lambda: sfx_applause(1.6), .4)
# --- scene 3: five pancakes
for k in range(11): S(L[3] + .2 + k * .14, sfx_tick, .22)
for k in range(3): S(L[3] + .25 + k * .4, lambda: sfx_whoosh(.3), .15)
S(W(3, 4), sfx_sparkle, .5); S(W(3, 4), sfx_boing, .3); S(W(3, 4) + .2, lambda: sfx_applause(1.4), .35)
# --- scene 4: Coco swings, one giant turn
for k in range(1, 6): S(tC0 + TPEN_ * (k - .25) / 2, lambda: sfx_whoosh(.6), .22)
S(tTurn, lambda: sfx_whoosh(.9), .5); S(tTurn + .05, sfx_flip, .5); S(tTurn + .8, sfx_sparkle, .5); S(tTurn + 1.1, sfx_boing, .3)
S(L[4] + .1, lambda: sfx_cheer(1.8), .4)
# --- scene 5: tap, tap, poof
for tt in (L[5] + .1, L[5] + .4): S(tt + .09, sfx_ting, .5); S(tt + .09, sfx_thud, .2); S(tt + .12, sfx_sparkle, .4)
S(tPop - .05, sfx_bigpop, .6); S(tPop, lambda: sfx_whoosh(.7), .4); S(tPop + .05, sfx_boing, .4); S(tPop + .1, sfx_sparkle, .6); S(tPop + .02, sfx_cymbal, .25)
for k in range(4): S(tPop + .3 + k * .22, sfx_giggle, .45)
S(tPop + D5, sfx_thud, .4)
# --- scene 6: Munch's tower
S(W(6, 1) - .05, lambda: sfx_rumble(.9), .4); S(W(6, 1), sfx_grow, .45); S(W(6, 3), sfx_bigpop, .5); S(W(6, 3), lambda: sfx_stackdrop(1568), .5); S(W(6, 4), sfx_thud, .5); S(W(6, 4), sfx_sparkle, .6)
for k in range(5): S(W(6, 4) + .2 + k * .3, sfx_wobble, .2)
# --- scene 7: the drum roll
S(L[7] + .02, lambda: sfx_trumpet(.3), .4); S(L[7] + .2, lambda: sfx_drumroll(L[8] - L[7] - .1), .45)
for k in range(4): S(L[7] + .3 + k * .3, sfx_relay, .3)
S(W(7, 3), sfx_sparkle, .6)
# --- scene 8: the pancake rain
S(L[8] - .05, sfx_cymbal, .6); S(L[8] + .1, lambda: sfx_cheer(2.4), .55)
for k in range(12): S(L[8] + .35 + k * .09 + .8, sfx_plop, .3); S(L[8] + .35 + k * .09 + .8, sfx_boing, .12)
S(L[8] + .3, sfx_bigpop, .5); S(L[8] + .7, sfx_heart, .4)
# --- scene 9: thank you
S(L[9] + .05, sfx_bigpop, .5); S(L[9] + .05, lambda: sfx_applause(2.4), .55); S(L[9] + .1, sfx_boing, .3); S(W(9, 4), sfx_heart, .5); S(W(9, 4), sfx_sparkle, .6)
# --- scene 10: the crowd goes wild
S(L[10] - .05, lambda: sfx_cheer(3.0), .6); S(L[10] + .1, lambda: sfx_applause(3.0), .6); S(L[10] + .1, sfx_bigpop, .5); S(L[10] + .3, sfx_sparkle, .6)
# --- scene 11: fireworks
for i in range(6): S(L[11] + .1 + i * .38, sfx_firework, .6)
S(L[11] + .3, lambda: sfx_cheer(2.6), .5); S(L[11] + .4, sfx_heart, .5); S(L[11] + .4, sfx_sparkle, .6); S(L[11] + .5, sfx_cymbal, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('circus', [(0, 'finale'), ('L[2]', 'march'), ('L[5]', 'drive'), ('L[7]', 'hush'), ('L[8]', 'build'), ('L[9]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, .35 + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, .35, bass(midi(36), .9), .6)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tPop + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, L[8] + .3 + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, L[8] + .3, bass(midi(36), .9), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, L[11] + .1 + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, L[11] + .1, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
