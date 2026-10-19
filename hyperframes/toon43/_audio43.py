TITLE = "Bo and the Pancake 43: The Lost Recipe"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body43.js)
tClimb = L[8] + .9
tWob = L[9] + .05
tGrab = L[10] + .7
tFloat = L[11] + .1
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_munch():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_crunch() * .7); add(out, .2, sfx_crunch() * .6); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient
for t in [.3, 5.0, 10.5, 16.0, 21.0]: S(t, sfx_chirp, .12)
S(0.0, lambda: sfx_swell(2.0), .15)
# --- scene 1: the missing page
S(.5, lambda: sfx_flip(.6), .3); S(W(1, 4) - .1, sfx_gasp, .5); S(W(1, 4), sfx_boing, .3)
# --- scene 2: Grandma is upset
S(L[2] + .1, sfx_whimper, .25); S(L[2] + .5, lambda: sfx_wobble(.8), .2)
# --- scene 3: detective Mochi
S(L[3] - .1, sfx_pop, .5); S(L[3] - .05, sfx_sparkle, .5); S(W(3, 2), sfx_tick, .4); S(W(3, 3), sfx_ting, .35)
# --- scene 4: sticky footprints appear
for i in range(12): S(L[4] + .1 + i * .1, sfx_plip, .3)
S(L[4] + .12, sfx_boing, .3)
# --- scene 5: Zap scans
S(L[5] + .02, sfx_beep, .4); S(L[5] + .25, lambda: sfx_scan(1.3), .3)
for k in range(4): S(L[5] + .3 + k * .3, sfx_ring, .22)
# --- scene 6: Rocky chews
S(L[6] + .05, sfx_pop, .3)
for k in range(3): S(L[6] + .5 + k * .3, sfx_munch, .4)
S(L[6] + 1.2, sfx_gulp, .4)
# --- scene 7: the banana tree
S(L[7] + .15, sfx_boing, .4); S(L[7] + .8, sfx_boing, .4); S(W(7, 4), sfx_sparkle, .4); S(W(7, 4), sfx_ting, .3)
# --- scene 8: Bo runs and climbs
S(L[8] + .25, sfx_boing, .4); S(L[8] + .6, lambda: sfx_patter(.9), .26)
for k in range(5): S(tClimb + k * .24, sfx_tick, .35)
# --- scene 9: the wobbly branch
S(tWob, lambda: sfx_wobble(2.4), .45); S(tWob + .1, sfx_gasp, .4)
for k in range(5): S(tWob + .2 + k * .45, lambda: sfx_creak(.35), .3)
# --- scene 10: Boo grabs the page
S(L[10] + .05, lambda: sfx_swell(1.0), .2); S(tGrab - .4, lambda: sfx_whoosh(.6), .3); S(tGrab, sfx_pop, .5); S(tGrab + .05, sfx_sparkle, .5); S(tGrab + .1, sfx_heart, .3)
# --- scene 11: the page floats down
S(tFloat, lambda: sfx_swell(1.8), .25)
for k in range(5): S(tFloat + .2 + k * .28, sfx_ting, .12)
S(tFloat + 1.5, sfx_heart, .5); S(tFloat + 1.52, sfx_sparkle, .55); S(tFloat + 1.6, lambda: sfx_cheer(1.6), .5)
S(L[11] + .2, sfx_thud, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('jungle', [(0, 'hush'), ('L[2]', 'intro'), ('L[3]', 'magic'), ('L[4]', 'drive'), ('L[9]', 'hush'), ('L[10]', 'magic'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([64, 69, 72, 76]): add(music, L[3] + j * .07, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tFloat + 1.5 + j * .06, marimba(midi(nn + 12), .5), .27)
add(music, tWob, bass(midi(33), .8), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
