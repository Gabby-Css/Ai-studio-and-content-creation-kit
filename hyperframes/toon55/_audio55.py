TITLE = "Bo and the Pancake 55: The Penguin Family"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body55.js)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_gull(d=.7):
    t = T(d); f = 1500 + 700 * np.sin(2 * np.pi * 5 * t) * np.exp(-t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** 2 * .3


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: waves, gulls, glitter
S(0.0, lambda: sfx_swell(2.4), .12)
for k in range(9): S(.6 + k * 3.3, lambda: sfx_swell(3.0), .1)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
S(1.5, sfx_gull, .2); S(12.0, sfx_gull, .18)
# --- scene 1: the iceberg slides up
S(L[1] - .1, lambda: sfx_skidslide(1.5), .45); S(L[1] + .05, lambda: sfx_whoosh(1.3), .4); S(L[1] + 1.2, sfx_splash, .5); S(L[1] + 1.25, sfx_thud, .45); S(L[1] + 1.25, sfx_sparkle, .5)
# --- scene 2: the family slides down on their bellies
for k, d in enumerate([0, .18, .34]): S(L[2] - .15 + d, lambda: sfx_skidslide(1.2), .35); S(L[2] + 1.0 + d, sfx_boing, .4); S(L[2] + 1.0 + d, sfx_thud, .35)
S(L[2] + .25, sfx_boing, .4); S(L[2] + .3, sfx_squeak, .3); S(W(2, 3), sfx_heart, .5)
# --- scene 3: the big hug
S(L[3] + .2, sfx_boing, .3); S(L[3] + .4, lambda: sfx_patter(.8), .3); S(L[3] + .95, sfx_squeak, .35); S(W(3, 3), sfx_heart, .5); S(W(3, 3) + .05, sfx_sparkle, .5)
# --- scene 4: Dad
S(L[4] + .4, sfx_boing, .25); S(W(4, 5), sfx_heart, .4)
# --- scene 5: welcome
S(L[5] + .2, sfx_boing, .4); S(W(5, 3), sfx_bigpop, .5); S(W(5, 3), lambda: sfx_cheer(1.6), .4); S(W(5, 3) + .05, sfx_sparkle, .6)
# --- scene 6: introductions
for k in range(4): S(W(6, 0) + k * .35, sfx_squeak, .3); S(W(6, 0) + k * .35 + .03, sfx_boing, .3)
for k in range(3): S(W(6, 2 + k) + .15, sfx_heart, .3)
# --- scene 7: Mochi, the dune rises, they run up
S(L[7] - .1, lambda: sfx_rumble(.8), .3); S(L[7] - .1, lambda: sfx_riser(.6), .25); S(L[7] + .5, lambda: sfx_patter(1.6), .35); S(W(7, 3), sfx_ting, .5); S(W(7, 3) + .05, sfx_sparkle, .5); S(L[7] + .3, sfx_whimper, .08)
# --- scene 8: four belly slides
for k, d in enumerate([0, .28, .56, .84]): S(L[8] + .35 + d, lambda: sfx_skidslide(1.1), .4); S(L[8] + .35 + d, lambda: sfx_whoosh(.9), .3); S(L[8] + 1.3 + d, sfx_boing, .35); S(L[8] + 1.3 + d, sfx_thud, .3)
S(L[8] + .9, lambda: sfx_cheer(1.6), .35)
# --- scene 9: happy beach day
S(L[9] - .05, lambda: sfx_cheer(2.0), .55); S(L[9] + .05, sfx_bigpop, .5)
for k in range(9): S(L[9] + .1 + k * .03, sfx_boing, .12)
for k in range(3): S(L[9] + .2 + k * .45, sfx_boing, .3); S(L[9] + .2 + k * .45, sfx_thud, .25)
S(L[9] + .3, sfx_heart, .5)
# --- scene 10: sunset
S(L[10], lambda: sfx_swell(3.2), .35); S(L[10] + .5, sfx_gull, .15)
# --- scene 11: fireworks
for i in range(6): S(L[11] + .1 + i * .38, sfx_firework, .6)
S(L[11] + .3, lambda: sfx_cheer(2.6), .5); S(L[11] + .4, sfx_heart, .5); S(L[11] + .4, sfx_sparkle, .6)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('finale', [(0, 'intro'), ('L[2]', 'magic'), ('L[3]', 'hush'), ('L[5]', 'drive'), ('L[7]', 'hush'), ('L[8]', 'drive'), ('L[9]', 'build'), ('L[10]', 'magic'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([72, 76, 79, 84]): add(music, L[1] + 1.2 + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([84, 88, 91, 96]): add(music, W(3, 3) + j * .07, marimba(midi(nn), .4), .2)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, L[9] + .05 + j * .05, marimba(midi(nn + 12), .5), .28)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, L[11] + .1 + j * .06, marimba(midi(nn + 12), .6), .3)
add(music, L[11] + .1, bass(midi(36), .9), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
