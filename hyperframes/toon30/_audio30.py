TITLE = "Bo and the Pancake 30: Happy Hatching Day"

moments = '''# ---- key moments (mirror of the constants in _body30.js)
tHug = W(4, 5)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_bigstep():
    out = np.zeros(int(SR * .6)); add(out, 0, sfx_stomp() * .9); add(out, .01, sfx_thump() * .8); add(out, .02, sfx_rumble(.5) * .35); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: Munch's big footsteps
S(0.0, lambda: sfx_rumble(2.4), .45)
for t in [W(1, 0), W(1, 1), W(1, 2) + .3, W(1, 3) + .3]: S(t, sfx_bigstep, .75)
S(W(1, 2), sfx_gasp, .4); S(W(1, 4), lambda: sfx_roar(.5), .22); S(W(1, 4) + .15, sfx_heart, .45); S(W(1, 4) + .2, sfx_sparkle, .4)
# --- scene 2: Munch: Pebble!
S(L[2] + .3, lambda: sfx_swell(1.4), .22); S(W(2, 3), sfx_heart, .5); S(W(2, 3) + .05, sfx_ting, .4)
S(L[2] + .4, sfx_chirp, .35)
# --- scene 3: Papa! Papa! -> a run and a hug
S(L[3] + .05, lambda: sfx_patter(.9), .35); S(L[3] + .95, sfx_boing, .45); S(L[3] + .98, sfx_heart, .5); S(L[3] + 1.0, sfx_sparkle, .45)
# --- scene 4: the run to Bo, the last hug
S(L[4] + .1, lambda: sfx_patter(W(4, 4) - L[4] - .1), .35)
S(tHug, sfx_heart, .55); S(tHug + .05, sfx_sparkle, .45); S(tHug + .1, sfx_boing, .3)
# --- scene 5: goodbye
S(W(5, 2), sfx_whimper, .25); S(W(5, 3) + .2, lambda: sfx_patter(1.0), .3)
# --- scene 6: thank you (a soft bow)
S(L[6] + .4, lambda: sfx_whoosh(.5, False), .25); S(W(6, 4), sfx_heart, .5); S(W(6, 4) + .05, sfx_sparkle, .45)
# --- scene 7: roar, party time
S(L[7] + .02, lambda: sfx_roar(.6), .5); S(W(7, 1), sfx_bigpop, .6); S(W(7, 1), lambda: sfx_cheer(1.6), .5)
for i in range(7): S(W(7, 1) + i * .05, sfx_sparkle, .25)
S(W(7, 2) - .2, lambda: sfx_whoosh(.8), .4); S(W(7, 2) + .75, sfx_boing, .5); S(W(7, 2) + .78, sfx_chirp, .4)
# --- scene 8: dancing
for k in range(6): S(L[8] + .15 + k * .32, sfx_boing, .2); S(L[8] + .15 + k * .32, sfx_thud, .12)
S(L[8] + .2, lambda: sfx_cheer(1.8), .45); S(L[8] + .5, lambda: sfx_whoosh(.9), .25)
# --- scene 9: Zap
S(L[9] + .1, sfx_beep, .35)
for d in [.1, .4, .7, 1.0, 1.3]: S(L[9] + d, sfx_ting, .25)
S(W(9, 4), sfx_sparkle, .5); S(W(9, 4) + .05, lambda: sfx_cheer(1.0), .4)
# --- scene 10: Happy hatching day!
S(L[10] - .05, lambda: sfx_riser(.2), .3)
S(L[10], sfx_bigpop, .7); S(L[10], lambda: sfx_trumpet(1.0), .45); S(L[10] + .1, lambda: sfx_cheer(2.2), .65)
for i in range(4): S(L[10] + i * .2, sfx_firework, .5)
for i in range(9): S(L[10] + .1 + i * .05, sfx_boing, .14)
# --- scene 11: the end
for i in range(4): S(L[11] + .3 + i * .5, sfx_firework, .4)
S(L[11] + .3, lambda: sfx_cheer(2.0), .5)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a big footstep rumble, a tender reunion, a bittersweet goodbye, a joyful finale party) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
SOFT = [67, 71, 74, 71, 69, 72, 76, 72]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_foot = t < L[2]
    sec_tender = L[2] <= t < L[7]
    sec_party = t >= L[7]
    if sec_foot:
        if e % 4 == 0: add(music, t, kick(), .45)
        if e == 0: add(music, t, bass(midi(36), 1.2), .45)
    elif sec_tender:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .035, pluck(midi(nn + 12), 1.6), .16)
        if e == 0: add(music, t, bass(midi(root), 1.5), .32)
        if e in (2, 6): add(music, t, marimba(midi(SOFT[(k // 2) % 8] + 12), .45), .15)
    else:
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .21)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, W(1, 4) + j * .06, marimba(midi(nn + 12), .5), .22)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, L[3] + .98 + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tHug + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, L[10] + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, L[10], bass(midi(36), 1.2), .65)
for nn in [48, 55, 60, 64, 67, 72]: add(music, 28.8, pluck(midi(nn), 1.4), .34)
add(music, 28.8, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)

'''
