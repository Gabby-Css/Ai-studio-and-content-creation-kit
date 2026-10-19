TITLE = "Bo and the Pancake 44: The Secret Ingredient"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body44.js)
tMun = L[4] - .2
tSet = L[4] + 1.6
tEgg = W(6, 3)
tChip = W(7, 4)
tStr = W(8, 3)
tTow = L[11] + .4
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_whirl(d=1.6):
    t = T(d); n = rng.standard_normal(len(t)); return lowpass(n, .3) * (.4 + .3 * np.sin(2 * np.pi * 6 * t)) * np.exp(-((t - d * .5) / (d * .45)) ** 2) * .8


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient
for t in [.3, 5.0, 11.0, 17.0, 22.0]: S(t, sfx_chirp, .12)
S(0.0, lambda: sfx_swell(2.0), .16)
# --- scene 1: the page glows
S(.2, lambda: sfx_whoosh(.5), .3); S(.3, sfx_pop, .4); S(W(1, 5) - .3, lambda: sfx_swell(1.0), .25)
for k in range(6): S(W(1, 5) - .3 + k * .3, sfx_heart, .22)
S(W(1, 5), sfx_sparkle, .55); S(W(1, 5), sfx_ting, .45)
# --- scene 2: Grandma
S(L[2] + .3, sfx_boing, .3); S(W(2, 3), sfx_heart, .5); S(W(2, 3) + .05, sfx_sparkle, .4)
# --- scene 3: Truffle
S(L[3] + .2, sfx_boing, .3); S(W(3, 4), sfx_heart, .4); S(W(3, 4) + .05, sfx_sparkle, .4)
# --- scene 4: Munch brings the bowl
S(tMun - .3, lambda: sfx_rumble(1.9), .45)
for i in range(4): S(tMun + .3 + i * .45, sfx_stomp, .5); S(tMun + .32 + i * .45, sfx_thump, .4)
S(tSet, lambda: sfx_whoosh(.7), .3); S(tSet + .72, sfx_thud, .8); S(tSet + .75, sfx_clink, .5); S(tSet + .8, sfx_sparkle, .5)
S(tMun + .5, lambda: sfx_cheer(1.2), .3)
# --- scene 5: Zap whirls the spoon
S(L[5] + .02, sfx_beep, .4); S(L[5] + .3, lambda: sfx_whirl(1.8), .5)
for k in range(8): S(L[5] + .35 + k * .22, sfx_gloop, .2)
# --- scenes 6-8: the cousins add their ingredients
S(tEgg - .2, lambda: sfx_whoosh(.4), .25); S(tEgg + .36, sfx_splat, .5); S(tEgg + .4, sfx_pop, .35)
for k in range(4): S(tChip - .1 + k * .14 + .3, sfx_tick, .4)
S(tChip + .35, sfx_sprinkle, .4)
S(tStr - .1, lambda: sfx_whoosh(.4), .25); S(tStr + .46, sfx_splat, .4); S(tStr + .5, sfx_pop, .35)
S(L[7] + .25, sfx_boing, .3); S(L[8] + .2, sfx_boing, .3)
# --- scene 9: Pebble wants more
for d in [0, .4, .8]: S(L[9] + .02 + d, sfx_squeak, .35); S(L[9] + .05 + d, sfx_boing, .3); S(L[9] + .1 + d, sfx_heart, .3)
# --- scene 10: lovely smells
S(L[10] + .1, lambda: sfx_swell(2.0), .3)
for i in range(3): S(L[10] + .1 + i * .25, sfx_chirp, .15)
for i in range(6): S(L[10] + .6 + i * .07, sfx_sniff, .25)
S(L[10] + .5, sfx_heart, .4); S(L[10] + .6, sfx_sparkle, .35)
# --- scene 11: the pancake tower
for i in range(18):
    f = midi(72 + [0, 2, 4, 7, 9][i % 5] + 12 * (i // 5)); S(tTow + i * .075 + .24, lambda f=f: sfx_stackdrop(f), .3)
S(tTow + 18 * .075 + .12, sfx_sparkle, .6); S(tTow + 18 * .075 + .12, lambda: sfx_cheer(1.4), .45); S(tTow + 18 * .075 + .2, sfx_heart, .4)
S(tTow + 1.5, lambda: sfx_cheer(1.8), .5)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'magic'), ('L[3]', 'drive'), ('L[5]', 'build'), ('L[9]', 'drive'), ('L[10]', 'magic'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, W(1, 5) + j * .06, marimba(midi(nn + 12), .5), .25)
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, tTow + 18 * .075 + .12 + j * .05, marimba(midi(nn + 12), .5), .26)
add(music, tSet + .72, bass(midi(36), .8), .55)
add(music, tStk, marimba(midi(88), .8), .18)''')
