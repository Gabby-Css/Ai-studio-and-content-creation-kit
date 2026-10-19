TITLE = "Bo and the Pancake 61: The Surprise Party"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body61.js)
tTurn = W(6, 3) - .05
tCake = W(10, 4)
tCarry = W(10, 5) - .1
tBlow = W(11, 1)
tP = W(11, 4) - .1
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_blow(d=.5):
    t = T(d); n = rng.standard_normal(len(t))
    return lowpass(n, .16) * np.sin(np.pi * t / d) ** 1.2 * .6


def sfx_roomtone(d=5.0):
    t = T(d)
    return (np.sin(2 * np.pi * 55 * t) * .5 + np.sin(2 * np.pi * 82.5 * t) * .3) * np.sin(np.pi * t / d) ** .5 * .12


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scenes 1-3: the dark, empty tent: a low room tone, a canvas flap, Bo's call
S(0.0, lambda: sfx_roomtone(5.5), 1.0); S(5.0, lambda: sfx_roomtone(6.0), 1.0)
S(L[1] + .1, sfx_ding, .12)
S(L[3] + .5, sfx_clothflap, .22)
# --- scene 4: the low point: a tiny sniff after "forgot my birthday"
S(L[4] + DU[4] + .12, sfx_sniff, .3)
# --- scene 5: Flapjack's kind little lie: a soft tick, the room holds its breath
S(L[5] + DU[5] + .3, sfx_tick, .12); S(L[5] + DU[5] + .8, sfx_tick, .12)
# --- scene 6: THE TURN: blackout, relay clicks, lights on, cheer
S(tTurn - .3, sfx_blackout, .5); S(tTurn - .05, sfx_lightson, .6)
for k, dd in enumerate((0, .08, .16, .24)): S(tTurn + dd, sfx_relay, .55)
S(tTurn, sfx_cymbal, .6); S(tTurn, lambda: sfx_cheer(2.4), .55); S(tTurn + .04, sfx_bigpop, .6); S(tTurn + .08, sfx_sparkle, .6)
S(tTurn + .1, lambda: sfx_trumpet(.4), .3); S(tTurn + .1, sfx_boing, .3); S(tTurn + .15, lambda: sfx_applause(1.6), .4)
# --- scene 7: "Surprise! Happy birthday, Bo!"
S(L[7] + .02, sfx_bigpop, .6); S(L[7] + .05, lambda: sfx_cheer(2.4), .55); S(L[7] + .1, sfx_sparkle, .6); S(L[7] + .15, lambda: sfx_applause(2.2), .5); S(W(7, 2), sfx_heart, .4)
# --- scene 8: Bo's joy
S(L[8] + .3, sfx_heart, .5); S(L[8] + .35, sfx_sparkle, .45)
# --- scene 9: Mochi's little smile, the others giggle
S(L[9] + DU[9] + .02, sfx_ting, .4); S(L[9] + DU[9] + .12, lambda: sfx_giggle(.6), .4)
# --- scene 10: Munch lifts the cake and sets it down by Bo
S(W(10, 1) - .05, lambda: sfx_rumble(.9), .4); S(W(10, 1), sfx_grow, .45)
S(tCake, sfx_bigpop, .5); S(tCake, lambda: sfx_stackdrop(1568), .5); S(tCake + .2, sfx_thud, .5); S(tCake + .2, sfx_sparkle, .6)
S(tCake + .3, lambda: sfx_crackle(1.2), .12)
S(tCarry, lambda: sfx_whoosh(.7), .3); S(tCarry + .85, sfx_thud, .55); S(tCarry + .88, sfx_wobble, .25); S(tCarry + .9, sfx_heart, .4)
# --- scene 11: a breath in, the blow, then the party
S(tBlow - .5, sfx_sniff, .4); S(tBlow, lambda: sfx_blow(.45), .6); S(tBlow + .25, sfx_ting, .3)
S(tP, sfx_cymbal, .6); S(tP, lambda: sfx_cheer(2.8), .6); S(tP + .1, sfx_bigpop, .5); S(tP + .1, lambda: sfx_applause(3.0), .5)
for i in range(6): S(tP + .1 + i * .38, sfx_firework, .6)
S(tP + .4, sfx_heart, .5); S(tP + .4, sfx_sparkle, .6)
for k in range(12): S(tP + .5 + k * .09 + .8, sfx_plop, .3); S(tP + .5 + k * .09 + .8, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'hush'), ('tTurn', 'march'), ('L[10]', 'magic'), ('tP', 'finale')],
                  stingers='''# the happy-birthday tune (public domain) on marimba: first phrase while the cake arrives, second phrase as the party starts
for dt, nn in zip([0, .375, .5, 1.0, 1.5, 2.0], [67, 67, 69, 67, 72, 71]): add(music, tCake + .1 + dt, marimba(midi(nn + 12), .5), .32)
for dt, nn in zip([0, .375, .5, 1.0, 1.5, 2.2], [67, 67, 69, 67, 74, 72]): add(music, tP + dt, marimba(midi(nn + 12), .6), .32)
add(music, tP, bass(midi(48), .9), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tTurn + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, tTurn, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
