TITLE = "Bo and the Pancake 38: The Riddle Gate"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body38.js)
tSg = [W(2, 2), W(2, 3), W(2, 5)]
tGo = W(7, 2)
tTr = W(7, 5) - .1
tStk = L[11] + DU[11] + .5


'''

extra = '''def sfx_bite():
    out = np.zeros(int(SR * .4)); add(out, 0, sfx_crunch() * .9); add(out, .1, sfx_crunch() * .7); add(out, .2, sfx_gulp() * .6); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: jungle birds
for t in [.3, 2.6, 6.0, 9.4, 13.2, 17.6]: S(t, sfx_chirp, .14)
S(0.0, lambda: sfx_swell(2.0), .18)
# --- scene 1: the gate drops in
S(.2, lambda: sfx_whoosh(.5, False), .35); S(.78, sfx_thud, .9); S(.78, lambda: sfx_rumble(.9), .5); S(.8, sfx_gasp, .35)
# --- scene 2: the sign lights up
S(L[2] + .02, lambda: sfx_swell(1.2), .2)
for t in tSg: S(t, sfx_ting, .5); S(t + .02, sfx_sparkle, .35)
# --- scene 3: Coco's banana
S(L[3] + .1, sfx_boing, .4); S(L[3] + .8, sfx_boing, .4); S(W(3, 4), sfx_pop, .45); S(W(3, 4) + .05, sfx_sparkle, .3)
# --- scene 4: Truffle thinks
S(W(4, 2), sfx_sprinkle, .4); S(L[4] + .3, lambda: sfx_wobble(.5), .15)
# --- scene 5: Mochi (nothing)
S(W(5, 2), sfx_tick, .3)
# --- scene 6: Flapjack
S(L[6] + .02, sfx_gasp, .3); S(W(6, 2), sfx_boing, .4); S(W(6, 3), sfx_boing, .45); S(W(6, 3), sfx_heart, .4); S(W(6, 3) + .05, sfx_ting, .5); S(W(6, 3) + .05, sfx_sparkle, .5)
# --- scene 7: the gate opens
S(tGo - .3, lambda: sfx_rumble(1.8), .6)
for k in range(5): S(tGo + k * .17, sfx_stomp, .22)
S(tGo, lambda: sfx_creak(1.0), .5); S(tGo + .2, lambda: sfx_creak(.8), .4); S(tGo + .9, sfx_thud, .5)
S(tTr - .05, lambda: sfx_riser(.5), .35); S(tTr, sfx_bigpop, .5); S(tTr + .05, sfx_sparkle, .55); S(tTr + .15, lambda: sfx_cheer(1.6), .5)
# --- scene 8: Bo takes a bite
S(L[8] + .25, sfx_boing, .4); S(W(8, 3), lambda: sfx_whoosh(.5), .3); S(W(8, 5), sfx_bite, .7); S(W(8, 5), sfx_heart, .4); S(W(8, 5) + .1, sfx_sparkle, .35)
# --- scene 9: Nibbles sniffs
S(L[9] + .02, sfx_squeakmouse, .45); S(L[9] + .05, sfx_boing, .2); S(W(9, 3), sfx_pop, .45); S(W(9, 3), sfx_sparkle, .3)
# --- scene 10: the secret path
S(L[10] - .3, lambda: sfx_patter(.9), .22); S(W(10, 3), lambda: sfx_whoosh(.4), .3); S(W(10, 3) + .1, sfx_bigpop, .5); S(W(10, 3) + .1, sfx_sparkle, .5)
S(W(10, 4) - .2, lambda: sfx_patter(2.4), .3)
# --- scene 11: the cliff
S(L[11] - .1, lambda: sfx_riser(.5), .3); S(L[11] + .1, sfx_skidslide, .4); S(L[11] + .15, sfx_gasp, .5); S(L[11] + .3, lambda: sfx_swell(2.0), .3)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('jungle', [(0, 'intro'), ('L[2]', 'magic'), ('L[6]', 'intro'), ('L[7]', 'drive'), ('L[9]', 'magic'), ('L[10]', 'build'), ('L[11]', 'hush')],
                  stingers='''for j, nn in enumerate([69, 72, 76, 81]): add(music, tSg[0] + j * .05, marimba(midi(nn + 12), .5), .18)
for j, nn in enumerate([76, 81, 84]): add(music, tSg[1] + j * .05, marimba(midi(nn + 12), .5), .18)
for j, nn in enumerate([81, 84, 88, 93]): add(music, tSg[2] + j * .05, marimba(midi(nn + 12), .5), .22)
for j, nn in enumerate([64, 69, 72, 76, 81, 88]): add(music, tTr + j * .06, marimba(midi(nn + 12), .5), .28)
add(music, .78, bass(midi(33), .8), .6)
add(music, L[11] + .1, bass(midi(34), 1.6), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
