TITLE = "Bo and the Pancake 37: Rough Seas"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body37.js)
tFly = W(4, 2) - .2
tG = W(4, 1) - .1
tSnag = W(5, 1) + .6
tSn = W(8, 2)
tStk = L[11] + DU[11] + 1.0


'''

extra = '''def sfx_achoo():
    out = np.zeros(int(SR * .9))
    add(out, 0, sfx_riser(.3) * .5)
    t = T(.35); n = rng.standard_normal(len(t)); add(out, .3, lowpass(n, .45) * np.exp(-t * 9) * 1.4)
    add(out, .3, sfx_pop() * .8)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: slow waves and a few gulls
for k in range(9): S(k * 3.3, lambda: sfx_swell(2.6), .07)
for t in [1.4, 5.1, 12.3, 19.0]: S(t, sfx_chirp, .12)
# --- scene 1: out to sea
S(0.0, lambda: sfx_swell(1.8), .2); S(.9, lambda: sfx_whoosh(.5), .2); S(.9, sfx_cheer, .25)
S(1.0, sfx_splash, .35); S(1.6, sfx_splash, .35)
# --- scene 2: Bo loves the waves
S(L[2] + .15, sfx_boing, .4); S(W(2, 4), sfx_splash, .5); S(W(2, 4) + .1, sfx_splash, .4); S(W(2, 4), sfx_heart, .4)
# --- scene 3: Gumdrop rows
S(L[3], lambda: sfx_roar(.5), .25)
for i in range(int((L[5] + .3 - L[3] - .35) / .62)):
    t = L[3] + .35 + i * .62
    S(t, lambda: sfx_whoosh(.3), .16); S(t + .22, sfx_splash, .24); S(t + .1, lambda: sfx_creak(.25), .1)
# --- scene 4: the wind
S(tG, lambda: sfx_whoosh(1.4), .5); S(tG + .1, lambda: sfx_riser(.8), .25); S(tG + .2, sfx_gasp, .3)
S(tFly, sfx_pop, .35); S(tFly + .05, lambda: sfx_whoosh(.9), .35)
for k in range(5): S(tFly + .1 + k * .17, sfx_flip, .2)
# --- scene 5: Blip catches the map
S(W(5, 1), lambda: sfx_whoosh(.6), .35); S(tSnag, sfx_boing, .5); S(tSnag + .02, sfx_ting, .5); S(tSnag + .05, sfx_sparkle, .45)
for k in range(4): S(tSnag + .1 + k * .1, sfx_chirp, .12)
# --- scene 6: Boo is scared
S(L[6], sfx_gasp, .4); S(L[6] + .1, sfx_splash, .6); S(L[6] + .25, sfx_splash, .5); S(L[6] + .2, lambda: sfx_whimper(), .3); S(L[6] + .05, lambda: sfx_wobble(1.0), .25)
# --- scene 7: hold my hand
S(L[7] + .1, sfx_boing, .25); S(W(7, 3), sfx_heart, .5); S(W(7, 3) + .05, sfx_sparkle, .45); S(W(7, 3) + .1, sfx_ting, .3)
# --- scene 8: the sneeze in the snacks
S(W(8, 1), lambda: sfx_wobble(.7), .35); S(tSn - .05, sfx_achoo, .8); S(tSn, sfx_boing, .3); S(tSn + .02, sfx_sparkle, .3)
# --- scene 9: Rocky pops up
S(L[9] - .25, sfx_pop, .5); S(L[9] - .2, sfx_squeak, .25); S(L[9] + .3, lambda: sfx_whoosh(.25), .1)
# --- scene 10: caught!
S(L[10] + .15, sfx_boing, .3); S(L[10] + .5, sfx_ting, .3); S(L[10] + .6, sfx_chirp, .2)
# --- scene 11: land ahoy
S(W(11, 2) - .1, lambda: sfx_riser(.4), .3); S(W(11, 2), lambda: sfx_trumpet(.7), .5); S(W(11, 2), sfx_sparkle, .5)
S(W(11, 3), lambda: sfx_cheer(2.0), .55); S(W(11, 3) + .1, sfx_heart, .4)
for t in [W(11, 3) + .5, W(11, 3) + 1.1, W(11, 3) + 1.9]: S(t, sfx_chirp, .14)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('sea', [(0, 'intro'), ('L[2]', 'drive'), ('L[6]', 'hush'), ('L[7]', 'magic'), ('L[9]', 'build'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([74, 78, 81, 86]): add(music, tSnag + j * .06, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([74, 78, 81, 86, 90]): add(music, W(11, 2) + j * .06, marimba(midi(nn + 12), .5), .26)
add(music, tSn, bass(midi(40), .4), .5)
add(music, tStk, marimba(midi(90), .8), .18)''')
