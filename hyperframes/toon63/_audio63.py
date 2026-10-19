TITLE = "Bo and the Pancake 63: The Haunted House"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body63.js)
tCut = L[8] - .25
tStk = L[11] + DU[11] + .45


'''

extra = ''''''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: night wind + crickets (gone inside the hall)
S(0.0, lambda: sfx_swell(2.4), .1)
for k in range(5): S(.3 + k * 3.4, lambda: sfx_swell(3.0), .07)
for k in range(17): S(.4 + k * .9, sfx_cricket, .5)
# --- scene 1: marching up the hill, a bat flutters by
S(.3, lambda: sfx_patter(L[2] + .3), .35)
for k in range(8): S(.4 + k * .5, sfx_stomp, .1)
S(1.2, lambda: sfx_flutter(2.2), .25); S(W(1, 4), lambda: sfx_howl(1.5), .3)
# --- scene 2: Peanut sees the glowing house
S(L[2] + .02, sfx_gasp, .35); S(W(2, 4), sfx_sparkle, .5); S(W(2, 4), sfx_ting, .4)
# --- scene 3: the gate
S(L[3] - .1, sfx_pop, .45); S(L[3] + .15, sfx_thud, .4); S(W(3, 4), lambda: sfx_creak(1.0), .45); S(W(3, 4) + .1, sfx_squeak, .3); S(W(3, 4) + .2, sfx_squeak, .25)
# --- scene 4: Zap scans
S(L[4] + .02, sfx_beep, .4); S(L[4] + .3, sfx_beep, .3); S(W(4, 3), lambda: sfx_scan(1.0), .3)
for k in range(3): S(W(4, 3) + k * .22, sfx_ring, .25)
S(W(4, 4), sfx_ding, .4)
# --- scene 5: the bats
S(W(5, 3) - .1, sfx_bigpop, .4); S(W(5, 3), lambda: sfx_flutter(2.6), .5); S(W(5, 3) + .3, lambda: sfx_flutter(2.4), .4); S(W(5, 2), sfx_gasp, .4)
# --- scene 6: Coco clutches Bo's hand
for k in range(5): S(L[6] - .9 + k * .18, sfx_squeak, .1)
S(L[6] + .02, sfx_eep, .35)
for k in range(8): S(L[6] + .3 + k * .13, sfx_squeak, .08)
S(W(6, 4), sfx_heart, .35)
# --- scene 7: the big door
S(W(7, 3), lambda: sfx_creak(1.4), .5); S(W(7, 3) + .1, lambda: sfx_rumble(1.0), .25); S(W(7, 4), sfx_sparkle, .5)
# --- scene 8: cut to black, the dark hall
S(tCut - .25, lambda: sfx_whoosh(.4), .4); S(tCut + .02, lambda: sfx_swell(1.6), .25); S(tCut + .05, sfx_thud, .4)
S(L[8] + .02, sfx_eep, .3)
for k in range(6): S(L[8] + .3 + k * .15, sfx_squeak, .08)
# --- scene 9: Boo glows
S(L[9] + .15, sfx_boing, .3); S(W(9, 4), lambda: sfx_swell(.9), .35); S(W(9, 4), sfx_sparkle, .5); S(W(9, 5), sfx_ding, .5)
# --- scene 10: light
S(L[10] - .05, lambda: sfx_riser(.9), .3); S(L[10] + .1, sfx_ignite, .4); S(L[10] + .3, sfx_ignite, .35); S(L[10] + .5, sfx_ignite, .35); S(L[10] + .2, sfx_sparkle, .6); S(L[10] + .4, sfx_heart, .4)
# --- scene 11: a giant shadow
S(L[11] - .15, lambda: sfx_rumble(DU[11] + .9), .45); S(W(11, 2), sfx_gasp, .5); S(W(11, 2), sfx_thump, .5); S(W(11, 2), lambda: sfx_roar(.8), .22)
for k in range(5): S(W(11, 3) + k * .08, sfx_squeak, .1)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('spooky', [(0, 'drive'), ('L[2]', 'hush'), ('L[3]', 'intro'), ('L[4]', 'magic'), ('L[5]', 'drive'), ('L[7]', 'hush'), ('tCut', 'hush'), ('L[9]', 'magic'), ('L[10]', 'drive'), ('L[11]', 'hush')],
                  stingers='''for j, nn in enumerate([69, 72, 76, 81]): add(music, W(3, 4) + j * .08, marimba(midi(nn + 12), .5), .25)
for j, nn in enumerate([81, 84, 88, 93, 96]): add(music, L[10] + .1 + j * .09, marimba(midi(nn), .5), .24)
for j, nn in enumerate([64, 58, 52]): add(music, W(11, 2) + j * .1, marimba(midi(nn), .8), .3)
add(music, W(11, 2), bass(midi(33), 1.0), .5)
add(music, tStk, marimba(midi(88), .8), .18)''')
