TITLE = "Bo and the Pancake 56: The Big Top"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body56.js)
tTent = W(1, 3) - .25
tCut = L[5] + 1.0
tLights = W(10, 3) - .1
tBnr = W(11, 2) - .25
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_drumroll(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = lowpass(n, .25) - lowpass(n, .02)
    return y * (np.sin(2 * np.pi * 26 * t) > -.2) * (.3 + .7 * t / d) * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .05) * 1.2


def sfx_cymbal(d=1.2):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .5)
    return y * np.exp(-t * 3.2) * .5


def sfx_relay():
    out = np.zeros(int(SR * .3)); add(out, 0, sfx_thump() * .8); add(out, .06, sfx_tick() * 1.2); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: waves + gulls on the beach, a dim tent hush inside, sparkly light
S(0.0, lambda: sfx_swell(2.4), .12)
for k in range(3): S(.6 + k * 3.3, lambda: sfx_swell(3.0), .1)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
S(1.0, sfx_gull, .2); S(8.0, sfx_gull, .16)
# --- scene 1: the tent grows out of the sand
S(tTent - .1, lambda: sfx_rumble(1.0), .4); S(tTent, lambda: sfx_riser(.7), .35); S(tTent + .25, sfx_grow, .45); S(tTent + .8, sfx_bigpop, .6); S(tTent + .85, sfx_sparkle, .7); S(tTent + .9, sfx_thud, .5)
for i in range(5): S(tTent + .25 + i * .1, lambda: sfx_whoosh(.35), .2)
# --- scene 2: Dad's fanfare
S(L[2] + .02, lambda: sfx_trumpet(.35), .4); S(L[2] + .4, lambda: sfx_trumpet(.5), .4); S(W(2, 4), sfx_sparkle, .6); S(W(2, 4), sfx_boing, .3)
# --- scene 3: Bo
S(L[3] + .2, sfx_boing, .4); S(W(3, 4), sfx_boing, .4); S(W(3, 4), sfx_heart, .5)
# --- scene 4: Mom opens her arms
S(L[4] + .2, sfx_squeak, .3); S(W(4, 3), sfx_sparkle, .5); S(W(4, 4), sfx_heart, .4)
# --- scene 5: marching, cut to black, a hush
S(L[5] + .05, lambda: sfx_patter(1.0), .35)
for k in range(4): S(L[5] + .15 + k * .22, sfx_stomp, .1)
S(tCut - .3, lambda: sfx_whoosh(.4), .4); S(tCut + .05, lambda: sfx_swell(1.2), .22)
# --- scene 6: Zap juggles (one soft tick per throw)
S(L[6] + .02, sfx_beep, .4); S(L[6] + .3, sfx_beep, .3)
for k in range(14): S(W(6, 2) - .1 + k * .17, sfx_tick, .22)
for k in range(5): S(W(6, 2) + k * .45, lambda: sfx_whoosh(.3), .12)
# --- scene 7: the trapeze comes down, Coco hops
S(L[7] - .35, lambda: sfx_whoosh(.5, False), .35); S(L[7] + .15, sfx_boing, .3); S(L[7] + .2, lambda: sfx_creak(.7), .2); S(W(7, 3), sfx_eep, .3); S(W(7, 3), sfx_sparkle, .5)
# --- scene 8: Mochi taps the hat
S(L[8] - .3, sfx_pop, .45); S(L[8] + .3, lambda: sfx_whoosh(.3), .25)
for k in range(2): S(W(8, 4) + k * .28, sfx_ting, .5); S(W(8, 4) + k * .28 + .1, sfx_sparkle, .5); S(W(8, 4) + k * .28, sfx_thud, .15)
# --- scene 9: popcorn
S(L[9] - .2, sfx_pop, .5); S(L[9] + .2, sfx_boing, .3)
for k in range(8): S(W(9, 4) + k * .06, sfx_pop, .3 + .02 * k)
for k in range(8): S(W(9, 4) + .6 + k * .07, sfx_plip, .2)
# --- scene 10: the spotlights switch on
S(tLights - .4, lambda: sfx_drumroll(.5), .3); S(tLights - .05, sfx_relay, .6); S(tLights + .07, sfx_relay, .5); S(tLights + .14, sfx_relay, .6); S(tLights + .15, lambda: sfx_swell(1.0), .4)
S(tLights + .18, sfx_cymbal, .5); S(tLights + .2, sfx_sparkle, .7); S(tLights + .5, lambda: sfx_cheer(1.6), .45)
# --- scene 11: the banner drops
S(tBnr - .05, lambda: sfx_whoosh(.5, False), .4); S(tBnr + .55, sfx_thud, .5); S(tBnr + .7, sfx_thud, .3); S(tBnr + .8, sfx_ding, .5)
S(W(11, 5), sfx_bigpop, .5); S(W(11, 5), sfx_sparkle, .7); S(W(11, 5) + .1, lambda: sfx_cheer(2.0), .5); S(W(11, 5) + .1, sfx_cymbal, .35)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('circus', [(0, 'intro'), ('L[2]', 'march'), ('L[5]', 'hush'), ('L[9]', 'march'), ('tLights', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, tTent + .8 + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([79, 84, 88, 91]): add(music, tLights + .1 + j * .05, marimba(midi(nn), .5), .3)
add(music, tLights + .1, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
