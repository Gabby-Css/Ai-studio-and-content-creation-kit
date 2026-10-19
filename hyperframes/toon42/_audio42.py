TITLE = "Bo and the Pancake 42: The Three Cousins"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body42.js)
tTag = W(8, 2)
tFlip = L[10] + .5
tPage = L[11] + .55
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_bounce3():
    out = np.zeros(int(SR * 1.1)); add(out, 0, sfx_boing() * .8); add(out, .32, sfx_boing() * .7); add(out, .62, sfx_boing() * .6); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient birds
for t in [.3, 4.2, 9.0, 14.5, 19.5]: S(t, sfx_chirp, .12)
S(0.0, lambda: sfx_swell(1.8), .15)
# --- scene 1: the cousins bounce in
for i in range(3):
    for k in range(5): S(.35 + i * .28 + k * .34 + .2, sfx_boing, .2 + .03 * i)
S(1.9, sfx_bigpop, .5); S(1.92, sfx_sparkle, .5); S(1.95, lambda: sfx_cheer(1.5), .4)
# --- scene 2: Blueberry
for k in range(3): S(L[2] + .15 + k * .4, sfx_boing, .35)
S(W(2, 1), sfx_sparkle, .4); S(W(2, 3), sfx_heart, .3)
# --- scene 3: Choco
S(L[3] + .2, sfx_boing, .3); S(W(3, 3), sfx_heart, .5); S(W(3, 3) + .05, sfx_sparkle, .4)
# --- scene 4: Berry zips
S(W(4, 3) - .05, lambda: sfx_whoosh(.3), .45); S(W(4, 3) + .35, lambda: sfx_whoosh(.4, False), .4); S(W(4, 3) + .6, sfx_skid, .3)
# --- scene 5: the shuffle
for k in range(6): S(L[5] + .55 + k * .42, lambda: sfx_whoosh(.35), .26); S(L[5] + .55 + k * .42 + .36, sfx_pop, .22)
S(L[5] + .3, sfx_boing, .25)
# --- scene 6: the family hug
S(L[6] + .25, sfx_boing, .4); S(W(6, 3), sfx_heart, .5); S(W(6, 3) + .05, sfx_sparkle, .45)
for i in range(3): S(L[6] + .5 + i * .12, sfx_boing, .25)
# --- scene 7: Mochi
S(W(7, 2), sfx_tick, .3)
# --- scene 8: name tags
for i in range(3): S(tTag + i * .3, sfx_pop, .5); S(tTag + i * .3 + .05, sfx_ting, .4); S(tTag + i * .3 + .2, sfx_sparkle, .3)
# --- scene 9: Truffle's pan
S(L[9] + .2, sfx_pop, .5); S(L[9] + .25, sfx_sparkle, .5); S(W(9, 4), sfx_boing, .3)
# --- scene 10: the flipping contest
for j, (h, d) in enumerate([(300, 0), (380, .55), (560, 1.1)]):
    t = tFlip + d
    S(t, lambda: sfx_whoosh(.5), .35); S(t + .84, sfx_thud, .5); S(t + .86, sfx_sparkle, .4)
S(tFlip + 1.9, lambda: sfx_cheer(1.6), .5); S(tFlip + 1.95, sfx_heart, .4)
# --- scene 11: the page blows away
S(tPage - .3, lambda: sfx_whoosh(1.4), .5); S(tPage - .1, sfx_gasp, .4); S(tPage, lambda: sfx_flip(1.0), .4); S(tPage + .1, lambda: sfx_riser(.8), .25)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'drive'), ('L[5]', 'magic'), ('L[6]', 'drive'), ('L[9]', 'build'), ('L[11]', 'hush')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, 1.9 + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([72, 76, 79]): add(music, tTag + j * .3, marimba(midi(nn + 12), .45), .22)
for j, nn in enumerate([76, 81, 84, 88]): add(music, tFlip + 1.95 + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, tPage, bass(midi(40), .6), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
