TITLE = "Bo and the Pancake 45: The Family Photo"
from music_s8 import adv_music

moments = '''# ---- key moments (mirror of the constants in _body45.js)
tMove = L[3] + .15
tBeep = [L[9] + .15, L[9] + .65, L[9] + 1.15]
tFlash = L[10] + .9
tPol = tFlash + .4
tStk = L[11] + DU[11] + .45


'''

extra = '''def sfx_shutter():
    out = np.zeros(int(SR * .6)); add(out, 0, sfx_tick() * 1.4); add(out, .05, sfx_clink() * .6); add(out, .12, sfx_tick() * 1.1); add(out, .16, sfx_pop() * .7); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- ambient: birds
for t in [.3, 4.0, 9.5, 15.0, 21.0]: S(t, sfx_chirp, .12)
S(0.0, lambda: sfx_swell(2.0), .16)
# --- scene 1: the camera pops in
S(.4, lambda: sfx_whoosh(.5, False), .3); S(.95, sfx_thud, .6); S(.98, sfx_clink, .4); S(W(1, 5), sfx_sparkle, .4)
for k in range(6): S(1.2 + k * .5, sfx_beep, .15)
# --- scene 2: the King
S(L[2] + .1, lambda: sfx_trumpet(.5), .35); S(L[2] + .3, sfx_boing, .3); S(W(2, 1), sfx_heart, .4); S(W(2, 1) + .05, sfx_sparkle, .35)
# --- scene 3: everybody squeezes in
S(L[3] + .25, sfx_boing, .4); S(tMove + .5, lambda: sfx_patter(1.8), .35); S(L[3] + .9, sfx_pop, .4); S(L[3] + .95, lambda: sfx_whoosh(.4), .25)
# --- scene 4: Gumdrop crouches
S(L[4] + .02, lambda: sfx_roar(.4), .22); S(W(4, 4), lambda: sfx_wobble(.5), .3); S(W(4, 4) + .35, sfx_thud, .4)
# --- scene 5: the timer
S(L[5] + .02, sfx_beep, .4); S(L[5] + .3, sfx_beep, .3); S(W(5, 4), sfx_pop, .5); S(W(5, 4) + .05, sfx_ting, .45)
for k in range(10): S(L[5] + .4 + k * .4, sfx_tick, .15)
# --- scene 6: Mochi steps left
S(L[6] + .02, sfx_tick, .3); S(W(6, 5) - .1, lambda: sfx_patter(.6), .25); S(W(6, 5) + .5, sfx_ting, .35)
# --- scene 7: Boo floats off
S(L[7] + .3, lambda: sfx_whoosh(.9), .25); S(L[7] + .35, sfx_whimper, .2); S(W(7, 3), lambda: sfx_whoosh(.6, False), .25); S(W(7, 3) + .6, sfx_pop, .3)
# --- scene 8: Rocky tiptoes
S(L[8] - 1.4, lambda: sfx_patter(1.0), .15); S(L[8] + .1, sfx_squeak, .25)
# --- scene 9: three beeps
for t in tBeep: S(t, sfx_beep, .6); S(t + .01, sfx_ting, .3)
S(L[9] + .02, lambda: sfx_riser(1.6), .2)
# --- scene 10: flash + photo
S(L[10] + .1, lambda: sfx_cheer(1.2), .45); S(L[10] + .12, sfx_heart, .4); S(tFlash - .02, sfx_shutter, .8); S(tFlash, sfx_bigpop, .5); S(tFlash + .02, sfx_sparkle, .6)
S(tFlash + .2, lambda: sfx_whoosh(.5), .3); S(tPol + .3, sfx_pop, .5); S(tPol + .32, sfx_ting, .5); S(tPol + .35, sfx_sparkle, .5)
# --- scene 11: the end
S(L[11] + .02, lambda: sfx_cheer(2.4), .5); S(L[11] + .1, sfx_heart, .4); S(L[11] + .3, sfx_sparkle, .5)
for i in range(4): S(L[11] + .6 + i * .5, sfx_firework, .45)
S(tStk, sfx_stickerpop, .9)
for i in range(3): S(tStk + .4 + i * .5, sfx_firework, .4)
S(29.4, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = adv_music('finale', [(0, 'intro'), ('L[3]', 'drive'), ('L[5]', 'magic'), ('L[7]', 'drive'), ('L[9]', 'hush'), ('L[10]', 'build'), ('L[11]', 'finale')],
                  stingers='''for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tFlash + j * .05, marimba(midi(nn + 12), .5), .3)
add(music, tFlash, bass(midi(36), 1.4), .6)
for nn in [48, 55, 60, 64, 67, 72]: add(music, L[11], pluck(midi(nn), 1.6), .3)
for nn in [48, 55, 60, 64, 67, 72, 76]: add(music, 28.6, pluck(midi(nn), 1.4), .3)
add(music, 28.6, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)''')
