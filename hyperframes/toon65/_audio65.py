TITLE = "Bo and the Pancake 65: The Ghost Party"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body65.js)
tOn = W(1, 3)
tStk = L[11] + DU[11] + .45


'''

extra = ''''''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: low hall hum, then party sparkle
S(0.0, lambda: sfx_swell(2.4), .1)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .02)
# --- scene 1: darkness, then the lights
for k in range(6): S(.3 + k * .3, sfx_squeak, .08)
S(tOn - .25, lambda: sfx_riser(.4), .3); S(tOn - .05, sfx_relay, .6); S(tOn, sfx_cymbal, .5); S(tOn, sfx_bigpop, .5); S(tOn + .05, sfx_sparkle, .7); S(tOn + .1, sfx_pop, .45); S(tOn + .18, sfx_pop, .4); S(tOn + .3, lambda: sfx_cheer(1.8), .4)
# --- scene 2: Boo is overjoyed
S(L[2] + .02, sfx_gasp, .3); S(L[2] + .2, sfx_boing, .4); S(W(2, 3), sfx_boing, .35); S(W(2, 4), sfx_heart, .5); S(W(2, 4), sfx_sparkle, .5)
# --- scene 3: Mama
S(L[3] + .02, sfx_heart, .35); S(W(3, 4), sfx_heart, .35); S(W(3, 4), sfx_sparkle, .4)
# --- scene 4: Papa starts the party
S(L[4] + .02, lambda: sfx_trumpet(.35), .4); S(W(4, 2), sfx_bigpop, .5); S(W(4, 2), lambda: sfx_cheer(1.8), .45); S(W(4, 2), sfx_sparkle, .6)
# --- scene 5: candy rain
S(L[5] - .1, sfx_cymbal, .4)
for k in range(12): S(L[5] + .25 + k * .09 + .85, sfx_plop, .3); S(L[5] + .25 + k * .09 + .85, sfx_ting, .12)
S(L[5] + .3, lambda: sfx_cheer(2.2), .5); S(L[5] + .6, sfx_bigpop, .4)
# --- scene 6: trick or treat
S(L[6] + .2, sfx_boing, .4); S(W(6, 0), lambda: sfx_cheer(1.0), .3); S(W(6, 3), sfx_boing, .4); S(W(6, 3), sfx_heart, .4)
# --- scene 7: Mochi's lollipop
S(L[7] + .1, sfx_whimper, .06); S(L[7] + .3, sfx_pop, .35); S(W(7, 4) + .4, sfx_heart, .4); S(W(7, 4) + .45, sfx_ting, .5); S(W(7, 4) + .5, sfx_sparkle, .5)
# --- scene 8: the ghost dance
S(L[8] - .1, lambda: sfx_cheer(2.4), .45)
for k in range(8): S(L[8] + k * .34, sfx_boing, .12)
for k in range(6): S(L[8] + .3 + k * .35, sfx_giggle, .3)
S(L[8] + .4, lambda: sfx_whoosh(.9), .35); S(L[8] + .5, sfx_heart, .4)
# --- scene 9: being a ghost is great
S(L[9] + .15, sfx_boing, .35); S(W(9, 3), sfx_heart, .5); S(W(9, 4), sfx_sparkle, .6); S(W(9, 4), sfx_bigpop, .4)
# --- scene 10: Happy Halloween
S(L[10] - .05, sfx_bigpop, .5); S(L[10] + .05, lambda: sfx_cheer(2.2), .5)
for i in range(3): S(L[10] + .1 + i * .3, sfx_firework, .55)
for k in range(9): S(L[10] + .1 + k * .03, sfx_boing, .12)
# --- scene 11: the finale fireworks
for i in range(6): S(L[11] + .1 + i * .36, sfx_firework, .6)
S(L[11] + .3, lambda: sfx_cheer(2.8), .5); S(L[11] + .4, sfx_heart, .5); S(L[11] + .4, sfx_sparkle, .6); S(L[11] + .5, sfx_cymbal, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('spooky', [(0, 'hush'), ('tOn', 'finale'), ('L[3]', 'march'), ('L[5]', 'drive'), ('L[7]', 'magic'), ('L[8]', 'build'), ('L[9]', 'march'), ('L[10]', 'finale')],
                  stingers='''for j, nn in enumerate([69, 72, 76, 81, 84, 88]): add(music, tOn + j * .05, marimba(midi(nn + 12), .6), .3)
add(music, tOn, bass(midi(33), 1.0), .6)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, L[5] + .25 + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([69, 72, 76, 81, 84, 88, 93]): add(music, L[11] + .1 + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, L[11] + .1, bass(midi(33), 1.0), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
