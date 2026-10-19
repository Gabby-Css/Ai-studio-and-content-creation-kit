TITLE = "Bo and the Pancake 47: The Frozen Syrup"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body47.js)
tBurst = W(4, 5)
tZap = W(3, 3)
tIce = L[6] + .5
tBreak = W(8, 3)
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_zapbeam(d=.8):
    t = T(d); n = rng.standard_normal(len(t)); return (lowpass(n, .6) * np.sin(2 * np.pi * 90 * t) ** 2 * 1.2 + np.sin(2 * np.pi * (700 + 500 * np.sin(2 * np.pi * 12 * t)) * t) * .25) * np.exp(-((t - d * .5) / (d * .5)) ** 2)


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: cold wind, glittering snow
S(0.0, lambda: sfx_swell(2.4), .2)
for k in range(8): S(.6 + k * 3.4, lambda: sfx_swell(2.8), .08)
for k in range(40): S(.5 + k * .7, sfx_sparkle, .03)
# --- scene 1: the bottle freezes
S(W(1, 3) - .2, sfx_pop, .45); S(W(1, 4), sfx_clink, .5); S(W(1, 4) + .05, sfx_sparkle, .5)
for k in range(5): S(W(1, 4) + .2 + k * .25, sfx_tick, .15)
# --- scene 2: Truffle is sad
S(L[2] + .1, sfx_gasp, .35); S(L[2] + .5, lambda: sfx_wobble(.9), .25); S(L[2] + .5, sfx_clink, .3)
# --- scene 3: Zap warms it up
S(L[3] + .02, sfx_beep, .4); S(L[3] + .3, sfx_beep, .3); S(tZap, lambda: sfx_zapbeam(.8), .6); S(tZap, lambda: sfx_scan(1.0), .25)
for k in range(3): S(tZap + .1 + k * .2, sfx_ring, .2)
# --- scene 4: the bottle bursts
S(W(4, 1), lambda: sfx_wobble(.7), .4); S(tBurst - .15, lambda: sfx_riser(.3), .4); S(tBurst, sfx_bigpop, .8); S(tBurst + .02, sfx_splat, .7); S(tBurst + .05, sfx_goo, .5)
S(tBurst + .1, sfx_splash, .6); S(tBurst + .2, sfx_splash, .5); S(tBurst + .3, sfx_splash, .4); S(tBurst + .1, sfx_clink, .5); S(tBurst + .05, sfx_gasp, .4)
# --- scene 5: Gumdrop sits on it
S(L[5], lambda: sfx_roar(.5), .3); S(L[5] + .35, lambda: sfx_patter(.9), .3); S(L[5] + 1.2, sfx_thud, .8); S(L[5] + 1.25, sfx_squeak, .3); S(L[5] + 1.35, sfx_splash, .4); S(L[5] + 1.45, sfx_splash, .35)
# --- scene 6: Waddles' cold breath
S(L[6] + .02, sfx_boing, .3); S(L[6] + .45, lambda: sfx_whoosh(1.6), .45)
for i in range(9): S(tIce + i * .08, sfx_ting, .22 + .02 * i)
S(tIce + .3, lambda: sfx_swell(1.6), .25)
# --- scene 7: Peanut
S(L[7] + .3, sfx_boing, .3)
for k in range(4): S(W(7, 3) + k * .2, sfx_sparkle, .35)
# --- scene 8: Bo snaps off an icicle
S(L[8] + .25, sfx_boing, .4); S(L[8] + .55, lambda: sfx_patter(.9), .26); S(tBreak, sfx_clink, .7); S(tBreak + .02, sfx_crunch, .4); S(tBreak + .4, sfx_pop, .5); S(tBreak + .45, sfx_sparkle, .5)
# --- scene 9: waffles
for i in range(3): S(L[9] + .15 + (i + 1) * .28, sfx_pop, .45); S(L[9] + .3 + (i + 1) * .28, sfx_sparkle, .4)
S(L[9] + .8, sfx_heart, .4); S(L[9] + .3, lambda: sfx_cheer(1.4), .35)
# --- scene 10: Rocky licks
S(L[10] + .05, sfx_pop, .3)
for k in range(4): S(L[10] + .5 + k * .28, sfx_slurp, .35)
S(L[10] + .1, sfx_squeak, .2)
# --- scene 11: even better
S(L[11] + .3, lambda: sfx_cheer(2.0), .5); S(L[11] + .35, sfx_heart, .4); S(L[11] + .4, sfx_sparkle, .5)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('bright', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'drive'), ('L[5]', 'build'), ('L[6]', 'magic'), ('L[8]', 'drive'), ('L[10]', 'magic'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([60, 64, 67, 72, 76]): add(music, tBurst + j * .05, marimba(midi(nn + 12), .5), .3)
add(music, tBurst, bass(midi(36), .8), .6)
for j, nn in enumerate([84, 88, 91, 96]): add(music, tIce + j * .1, marimba(midi(nn), .4), .16)
add(music, tStk, marimba(midi(88), .8), .18)''')
