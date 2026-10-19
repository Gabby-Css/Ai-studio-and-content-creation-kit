TITLE = "Bo and the Pancake 41: Grandma's Picnic"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body41.js)
tBan = W(1, 5)
tCous = W(6, 1)
tBsk = W(7, 4)
tBan2 = W(8, 4)
tOpen = W(10, 3)
tHop = W(11, 2)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_clothflap():
    out = np.zeros(int(SR * .9)); add(out, 0, sfx_whoosh(.7) * .8); add(out, .1, sfx_flip(.7) * .6); add(out, .55, sfx_thud() * .4); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: birds on a sunny Sunday
for t in [.2, 3.0, 7.5, 12.0, 17.5, 22.0]: S(t, sfx_chirp, .13)
S(0.0, lambda: sfx_swell(2.0), .15)
# --- scene 1: Grandma walks in, the board drops
S(.05, lambda: sfx_patter(1.9), .22)
S(tBan - .2, lambda: sfx_whoosh(.5, False), .35); S(tBan + .35, sfx_thud, .6); S(tBan + .35, sfx_bigpop, .5); S(tBan + .38, sfx_sparkle, .55); S(tBan + .4, lambda: sfx_cheer(1.6), .45)
# --- scene 2: Grandma and the recipe book
S(L[2] + .1, sfx_pop, .5); S(L[2] + .15, sfx_sparkle, .5); S(L[2] + .5, sfx_heart, .4); S(L[2] + .55, sfx_ting, .3)
# --- scene 3: Bo loves picnics
S(L[3] + .25, sfx_boing, .4); S(W(3, 4), sfx_boing, .4); S(W(3, 4), sfx_heart, .4); S(W(3, 4) + .05, sfx_sparkle, .35)
# --- scene 4: pancake flips
for k in range(3):
    t = L[4] + .5 + k * .45
    S(t, lambda: sfx_flip(.4), .3); S(t + .4, sfx_pop, .3); S(t + .42, sfx_sparkle, .25)
# --- scene 5: Mochi counts
for k in range(3): S(W(5, 3) + .1 + k * .28, sfx_tick, .5)
# --- scene 6: three shadows in the bubble
S(tCous - .1, sfx_pop, .5)
for i in range(3): S(tCous + .15 + i * .28, sfx_ting, .4 + .05 * i); S(tCous + .17 + i * .28, sfx_gasp, .15)
S(W(6, 4), sfx_heart, .4)
# --- scene 7: the basket drops in and opens
S(L[7] + .02, sfx_beep, .4); S(L[7] + .3, sfx_beep, .35)
S(L[7] + .05, lambda: sfx_whoosh(.5, False), .3); S(L[7] + .5, sfx_thud, .7); S(L[7] + .55, sfx_boing, .3)
S(tBsk, lambda: sfx_creak(.4), .3); S(tBsk + .02, sfx_pop, .5); S(tBsk + .08, sfx_sparkle, .5); S(tBsk + .1, sfx_ting, .4)
# --- scene 8: Coco's bananas
S(L[8] + .15, sfx_boing, .4); S(L[8] + .8, sfx_boing, .4); S(tBan2 - .1, sfx_pop, .45); S(tBan2, sfx_sparkle, .35); S(tBan2 + .05, sfx_heart, .3)
# --- scene 9: Boo, the lookout
S(L[9] + .02, lambda: sfx_swell(1.0), .15)
for t in [.3, .8, 1.3]: S(L[9] + t, lambda: sfx_whoosh(.25), .12)
# --- scene 10: the blanket
S(tOpen - .4, sfx_clothflap, .55); S(tOpen - .4, lambda: sfx_riser(.4), .2); S(tOpen + .55, sfx_thud, .4)
S(tOpen + .6, sfx_sparkle, .5); S(tOpen + .8, lambda: sfx_cheer(1.6), .5)
# --- scene 11: three shadows hop over the hill
S(L[11] - .3, lambda: sfx_swell(2.8), .3)
for i in range(3):
    for k in range(4): S(tHop + i * .35 + k * .5 + .4, sfx_boing, .22)
S(tHop + 1.9, lambda: sfx_riser(.8), .25)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'intro'), ('L[2]', 'drive'), ('L[6]', 'magic'), ('L[7]', 'drive'), ('L[10]', 'build'), ('L[11]', 'hush')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tBan + .35 + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([76, 79, 84]): add(music, tBsk + j * .06, marimba(midi(nn + 12), .45), .22)
for j, nn in enumerate([64, 67, 71, 76]): add(music, tHop + j * .35, marimba(midi(nn + 12), .5), .2)
add(music, tStk, marimba(midi(88), .8), .18)''')
