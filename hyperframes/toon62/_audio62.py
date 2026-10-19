TITLE = "Bo and the Pancake 62: Boo's Big Scare"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body62.js)
tStk = L[11] + DU[11] + .45


'''

extra = ''''''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: night wind + crickets
S(0.0, lambda: sfx_swell(2.4), .1)
for k in range(8): S(.3 + k * 3.4, lambda: sfx_swell(3.0), .07)
for k in range(30): S(.4 + k * .9, sfx_cricket, .5)
# --- scene 1: friends chat, Boo sneaks
for i in range(4): S(W(1, 2) + i * .09, sfx_squeak, .1)
S(W(1, 1), lambda: sfx_spook(.7), .15); S(W(1, 4), sfx_sparkle, .3)
# --- scene 2: the scary face
S(L[2] - .05, lambda: sfx_riser(.6), .25); S(L[2] + .15, sfx_boing, .3); S(L[2] + .2, lambda: sfx_spook(1.0), .3); S(W(2, 3), sfx_bigpop, .4); S(W(2, 3), sfx_sparkle, .4)
# --- scene 3: the leap
S(W(3, 1), lambda: sfx_whoosh(.7), .45); S(W(3, 1), sfx_boing, .35); S(W(3, 1) + .6, sfx_thud, .45); S(W(3, 1) + .6, sfx_gasp, .5); S(W(3, 1) + .62, sfx_cymbal, .3)
for i in range(5): S(W(3, 1) + .65 + i * .03, sfx_boing, .14)
S(W(3, 1) + .65, sfx_ignite, .4)
# --- scene 4: Bo thinks he is cute
S(L[4] + .2, sfx_boing, .35); S(W(4, 2), sfx_heart, .5); S(W(4, 2) + .05, sfx_sparkle, .5); S(W(4, 3), sfx_boing, .3)
# --- scene 5: Boo is sad
S(L[5] + .05, sfx_whimper, .25); S(L[5] + .6, sfx_gulp, .3); S(L[5] + .2, lambda: sfx_swell(1.2), .15)
# --- scene 6: Mochi
S(L[6] + .1, sfx_whimper, .08); S(W(6, 3), sfx_ting, .25)
# --- scene 7: Boo floats away crying
S(L[7] + .2, lambda: sfx_spook(DU[7] + .6), .25)
for k in range(6): S(L[7] + .5 + k * .35, sfx_plip, .3)
# --- scene 8: come back
S(L[8] + .02, sfx_eep, .3); S(L[8] + .25, sfx_boing, .3)
# --- scene 9: the idea
S(L[9] + .2, sfx_boing, .35); S(W(9, 1), sfx_ding, .5); S(W(9, 1), sfx_sparkle, .6); S(W(9, 2), sfx_boing, .3)
# --- scene 10: the house flares
S(L[10] - .1, lambda: sfx_riser(.7), .22); S(L[10] + .1, lambda: sfx_creak(1.2), .2); S(L[10] + .3, lambda: sfx_flutter(2.0), .3); S(W(10, 3), sfx_sparkle, .5); S(W(10, 3), lambda: sfx_howl(1.2), .3)
# --- scene 11: Boo returns, they march
S(L[11] + .02, sfx_boing, .35); S(L[11] + .5, sfx_heart, .5); S(L[11] + .5, lambda: sfx_patter(DU[11] + 1.0), .35)
for k in range(5): S(L[11] + .6 + k * .45, sfx_stomp, .1)
S(L[11] + .3, lambda: sfx_cheer(1.8), .35)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('spooky', [(0, 'hush'), ('L[1]', 'intro'), ('L[2]', 'hush'), ('L[3]', 'drive'), ('L[4]', 'magic'), ('L[5]', 'hush'), ('L[7]', 'hush'), ('L[9]', 'magic'), ('L[10]', 'drive'), ('L[11]', 'march')],
                  stingers='''for j, nn in enumerate([69, 72, 76, 81]): add(music, W(3, 1) + .55 + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([84, 88, 91, 96]): add(music, W(9, 1) + j * .07, marimba(midi(nn), .5), .22)
add(music, tStk, marimba(midi(88), .8), .18)''')
