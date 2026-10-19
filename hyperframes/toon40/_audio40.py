TITLE = "Bo and the Pancake 40: The Real Treasure"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body40.js)
tClick = L[4] + .05
tKey = W(3, 5)
tStk = L[11] + DU[11] + .5


'''

extra = '''def sfx_snore2():
    out = np.zeros(int(SR * 1.3)); add(out, 0, sfx_snore(.6) * .9); add(out, .7, sfx_snore(.55) * .8); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: evening wind
S(0.0, lambda: sfx_swell(2.4), .2)
# --- scene 1: the lock glows
S(W(1, 5), sfx_ting, .5); S(W(1, 5) + .02, sfx_sparkle, .45); S(W(1, 5) + .2, sfx_ting, .35); S(W(1, 5) + .4, sfx_ting, .3)
# --- scene 2: Bo points
S(L[2] + .15, sfx_boing, .35); S(W(2, 3), sfx_boing, .35)
# --- scene 3: Truffle brings the pan, slots it in
S(L[3] - .25, sfx_pop, .5); S(L[3] - .2, sfx_sparkle, .5); S(L[3] + .2, lambda: sfx_whoosh(.3), .2)
S(W(3, 3), lambda: sfx_whoosh(.6), .3); S(tKey + .1, sfx_clink, .6); S(tKey + .2, sfx_creak, .35)
# --- scene 4: click! the chest pops open
S(tClick - .1, lambda: sfx_ring(2200, .12), .4); S(tClick, sfx_tick, .9); S(tClick + .01, sfx_clink, .7); S(tClick + .05, sfx_bigpop, .6)
S(tClick + .08, lambda: sfx_creak(.5), .4); S(tClick + .1, sfx_sparkle, .6); S(tClick + .1, lambda: sfx_cheer(1.4), .4); S(tClick + .2, sfx_ting, .5); S(tClick + .3, sfx_heart, .4)
# --- scene 5: Grandma snores
S(L[5] + .05, sfx_snore2, .5); S(L[5] + 1.4, sfx_snore2, .45)
# --- scene 6: Flapjack
S(L[6] + .02, sfx_gasp, .3); S(W(6, 3), sfx_heart, .5); S(W(6, 3) + .05, sfx_sparkle, .4)
# --- scene 7: Grandma wakes
S(L[7] - .2, lambda: sfx_swell(.7), .2); S(L[7] + .1, sfx_pop, .3); S(L[7] + .25, sfx_boing, .3); S(L[7] + .3, sfx_squeak, .25)
# --- scene 8: Mochi
S(W(8, 4), sfx_heart, .45); S(W(8, 4) + .05, sfx_sparkle, .4); S(W(8, 4) + .1, sfx_ting, .3)
# --- scene 9: pancakes for everybody
for k in range(5):
    t = L[9] + .15 + k * .3
    S(t, lambda: sfx_flip(.5), .3); S(t + .45, sfx_pop, .3); S(t + .5, sfx_sparkle, .3)
S(L[9] + .7, sfx_boing, .4)
# --- scene 10: cheers and fireworks
S(L[10], lambda: sfx_cheer(2.2), .55); S(L[10] + .1, lambda: sfx_trumpet(.7), .45)
for t in [L[10] + .5, L[10] + 1.0, L[10] + 1.4]: S(t, sfx_firework, .6)
S(L[10] + .3, sfx_heart, .4)
# --- scene 11: the end
for i in range(5): S(L[11] + .2 + i * .55, sfx_firework, .55)
S(L[11] + .5, lambda: sfx_cheer(2.4), .45); S(L[11] + .2, lambda: sfx_swell(2.4), .25)
S(tStk - .1, sfx_firework, .65); S(tStk, sfx_stickerpop, .9)
for i in range(4): S(tStk + .4 + i * .5, sfx_firework, .5)
S(29.4, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('finale', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'magic'), ('L[4]', 'build'), ('L[5]', 'hush'), ('L[7]', 'magic'), ('L[8]', 'intro'), ('L[9]', 'drive'), ('L[10]', 'finale')],
                  stingers='''for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tClick + j * .05, marimba(midi(nn + 12), .5), .3)
add(music, tClick, bass(midi(36), 1.4), .6)
for nn in [48, 55, 60, 64, 67, 72]: add(music, L[10], pluck(midi(nn), 1.6), .32)
add(music, L[10], bass(midi(36), 1.4), .6)
for nn in [48, 55, 60, 64, 67, 72, 76]: add(music, 28.6, pluck(midi(nn), 1.4), .3)
add(music, 28.6, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
