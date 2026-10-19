TITLE = "Bo and the Pancake 39: The Wobbly Bridge"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body39.js)
PAIRS_T = [L[2] + .35, L[2] + 1.5, L[3] + .55, L[3] + 1.5, L[4] - .1, L[4] + .8]
tGum = L[5] + .4
tBoo = L[5] - .1
tSyr = W(6, 1)
tBX = W(9, 6) - .1
tCh = W(10, 2) - .05
tStk = L[11] + DU[11] + .5


'''

extra = '''def sfx_planks():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_creak(.35) * .8); add(out, .08, sfx_tick() * 1.2); add(out, .2, sfx_tick() * .9); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: canyon wind and a few birds
S(0.0, lambda: sfx_swell(2.4), .2)
for t in [3.0, 8.0, 12.5, 17.0]: S(t, lambda: sfx_swell(2.2), .08)
for t in [1.6, 6.3, 14.2]: S(t, sfx_chirp, .1)
# --- scene 1: the bridge drops into place
S(.1, lambda: sfx_whoosh(.5, False), .3); S(.55, sfx_thud, .6); S(.58, sfx_planks, .6); S(.9, sfx_gasp, .25)
# --- scene 2: Zap and Bo step out
S(L[2] + .02, sfx_beep, .4); S(L[2] + .3, sfx_beep, .35)
# --- scene 3: Gumdrop grips the post
S(L[3], lambda: sfx_roar(.5), .3); S(L[3] + .15, sfx_thud, .4); S(L[3] + .4, lambda: sfx_wobble(1.0), .25)
# --- the crossings: footsteps, creaking planks
for i, t in enumerate(PAIRS_T):
    S(t, lambda: sfx_patter(2.0), .16)
    for k in range(4): S(t + .3 + k * .45, sfx_planks, .22)
S(tGum, lambda: sfx_patter(1.5), .2); S(tGum + .2, lambda: sfx_roar(.4), .12)
for k in range(3): S(tGum + .2 + k * .4, sfx_planks, .3)
S(tGum + 1.5, sfx_thud, .5)
# --- scene 5: Boo floats
S(tBoo, lambda: sfx_whoosh(1.8), .25); S(tBoo + .1, lambda: sfx_whimper(), .18)
# --- scene 6: syrup splashes on the map
S(L[6] - .15, sfx_pop, .45); S(L[6] - .1, sfx_sparkle, .3)
S(tSyr - .4, lambda: sfx_whoosh(.4, False), .3); S(tSyr, sfx_splat, .7); S(tSyr + .03, sfx_goo, .45); S(tSyr + .1, sfx_gasp, .4)
# --- scene 7: Bo is sad
S(L[7] + .02, sfx_whimper, .3); S(L[7] + .3, lambda: sfx_wobble(.5), .2)
# --- scene 8: Peanut remembers
S(L[8] + .02, sfx_squeakmouse, .4); S(L[8] + .1, sfx_boing, .3); S(W(8, 4), sfx_pop, .5); S(W(8, 4) + .05, sfx_ting, .5)
# --- scene 9: to the X
S(L[9] + .05, lambda: sfx_patter(1.8), .26)
S(tBX, sfx_scribble, .7); S(tBX + .2, sfx_scribble, .7); S(tBX + .4, sfx_ting, .6); S(tBX + .42, sfx_sparkle, .5)
# --- scene 10: the chest pops out of the sand
S(tCh - .1, lambda: sfx_riser(.4), .3); S(tCh, sfx_bigpop, .6); S(tCh + .25, sfx_thud, .7); S(tCh + .3, sfx_sparkle, .6); S(tCh + .3, lambda: sfx_cheer(1.4), .45); S(tCh + .4, sfx_heart, .4)
S(W(10, 3), lambda: sfx_cheer(1.0), .35)
# --- scene 11: locked tight
S(L[11] - .3, lambda: sfx_whoosh(.4), .2)
for k in range(10): S(L[11] + .2 + k * .06, sfx_clink, .3)
S(L[11] + .3, sfx_thud, .5); S(L[11] + .35, sfx_gasp, .4); S(L[11] + .5, lambda: sfx_swell(1.8), .25)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('canyon', [(0, 'intro'), ('L[2]', 'drive'), ('L[5]', 'magic'), ('L[6]', 'hush'), ('L[8]', 'drive'), ('L[10]', 'build'), ('L[11]', 'hush')],
                  stingers='''for j, nn in enumerate([76, 79, 83, 88]): add(music, tCh + j * .06, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([64, 67, 71, 76]): add(music, tBX + j * .06, marimba(midi(nn + 12), .5), .22)
add(music, tSyr, bass(midi(36), .5), .5)
add(music, L[11] + .3, bass(midi(35), 1.4), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
