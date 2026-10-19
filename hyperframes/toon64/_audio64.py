TITLE = "Bo and the Pancake 64: The Giant Shadow"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body64.js)
tStk = L[11] + DU[11] + .45


'''

extra = ''''''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: low hall hum (wind) + a few crickets
S(0.0, lambda: sfx_swell(2.4), .1)
for k in range(8): S(.3 + k * 3.4, lambda: sfx_swell(3.0), .07)
# --- scene 1: the shadow slides in and swells
S(.05, lambda: sfx_rumble(DU[1] + 1.0), .45); S(.1, sfx_gasp, .5); S(W(1, 2), sfx_thump, .5)
for k in range(6): S(.7 + k * .14, sfx_squeak, .08)
# --- scene 2: Truffle
S(L[2] + .02, sfx_eep, .35)
for k in range(8): S(L[2] + .2 + k * .12, sfx_tick, .14)
# --- scene 3: Gumdrop's brave roar, knocking knees
S(L[3] + .02, sfx_roar, .45)
for k in range(10): S(L[3] + .3 + k * .14, sfx_tick, .16)
S(L[3] + .1, sfx_thump, .3)
# --- scene 4: it grows, the lights flicker
S(L[4] - .1, lambda: sfx_riser(DU[4] + .6), .3); S(L[4], lambda: sfx_rumble(DU[4] + .8), .5)
for tt in (L[4] + .3, L[4] + .8): S(tt, sfx_relay, .5); S(tt + .15, sfx_relay, .4)
S(L[4] + .5, sfx_thump, .5); S(L[4] + .55, lambda: sfx_roar(.8), .25); S(L[4] + .1, sfx_gasp, .4)
# --- scene 5: Mochi trembles
S(L[5] + .1, sfx_whimper, .12)
for k in range(8): S(L[5] + .3 + k * .12, sfx_tick, .12)
# --- scene 6: Boo's resolve
S(L[6] + .02, lambda: sfx_swell(1.0), .3); S(L[6] + .25, sfx_ding, .5); S(L[6] + .3, sfx_sparkle, .5); S(W(6, 3), sfx_boing, .35)
# --- scene 7: floating toward the shadow
S(L[7] + .1, lambda: sfx_spook(DU[7] + .6), .25); S(L[7] + .6, sfx_sparkle, .4)
for k in range(4): S(L[7] + .2 + k * .3, lambda: sfx_swell(.6), .1)
# --- scene 8: the reveal: pop, Pebble's tiny steps
S(W(8, 3) - .05, sfx_bigpop, .5); S(W(8, 3), sfx_sparkle, .5); S(W(8, 3), sfx_boing, .3)
for k in range(10): S(W(8, 3) + k * .12, sfx_squeak, .1)
# --- scene 9: Pebble's candle
S(L[9] + .02, sfx_giggle, .4); S(L[9] + .2, sfx_ignite, .35); S(W(9, 2), sfx_boing, .3); S(W(9, 2), sfx_heart, .4)
# --- scene 10: the giant candle shadow
S(L[10] + .1, sfx_sparkle, .4); S(L[10] + .3, sfx_boing, .3); S(L[10] + .8, sfx_boing, .3)
for k in range(4): S(L[10] + .2 + k * .3, lambda: sfx_swell(.5), .1)
# --- scene 11: everybody laughs
for k in range(5): S(L[11] + .05 + k * .15, sfx_giggle, .3)
S(L[11] + .15, lambda: sfx_cheer(2.0), .5); S(L[11] + .2, sfx_bigpop, .5); S(L[11] + .3, sfx_heart, .5); S(L[11] + .3, sfx_sparkle, .6)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('spooky', [(0, 'hush'), ('L[1]', 'hush'), ('L[2]', 'intro'), ('L[4]', 'drive'), ('L[5]', 'hush'), ('L[6]', 'magic'), ('L[8]', 'march'), ('L[10]', 'march'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([64, 58, 52]): add(music, .15 + j * .12, marimba(midi(nn), .8), .3)
add(music, .15, bass(midi(33), 1.0), .5)
for j, nn in enumerate([76, 80, 83, 88]): add(music, L[6] + .25 + j * .07, marimba(midi(nn), .5), .25)
for j, nn in enumerate([81, 84, 88, 93]): add(music, W(8, 3) + j * .07, marimba(midi(nn), .5), .25)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, L[11] + .1 + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tStk, marimba(midi(88), .8), .18)''')
