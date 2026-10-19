TITLE = "Bo and the Pancake 28: Crack"

moments = '''# ---- key moments (mirror of the constants in _body28.js)
tH = W(4, 2)
tStk = L[11] + DU[11] + 1.0


'''

extra = '''def sfx_crackegg():
    out = np.zeros(int(SR * .6))
    n = rng.standard_normal(int(SR * .25)); tt = T(.25)
    add(out, 0, (n - lowpass(n, .5)) * np.exp(-tt * 22) * .8)
    add(out, .02, sfx_knock() * .8); add(out, .06, sfx_tick() * .9)
    return out


def sfx_hatch():
    out = np.zeros(int(SR * 1.2))
    add(out, 0, sfx_bigpop() * .9); add(out, .02, sfx_crackegg()); add(out, .1, sfx_whoosh(.5) * .6)
    for k in range(6): add(out, .12 + k * .05, sfx_tick() * .5)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: night, the egg hums and glows
S(0.0, lambda: sfx_swell(2.2), .22); S(.4, lambda: sfx_holoon(1.6, True), .22)
S(1.0, lambda: sfx_wobble(.5), .3); S(W(1, 6) - .1, lambda: sfx_wobble(.6), .4); S(W(1, 6), sfx_heart, .4)
# --- scene 2: the first cracks
S(W(2, 1) - .05, sfx_crackegg, .6); S(W(2, 3) - .05, sfx_crackegg, .65)
S(L[2] + .05, sfx_gasp, .35)
for i in range(4): S(L[2] + .1 + i * .08, sfx_boing, .14)
# --- scene 3: Mochi orders everybody back
S(W(3, 1) - .1, lambda: sfx_whoosh(.3), .25); S(W(3, 1), sfx_crackegg, .7); S(W(3, 3) - .3, lambda: sfx_wobble(.7), .45)
# --- scene 4: crack, crack, CRACK!
for i in range(3): S(W(4, i), sfx_crackegg, .75 + .1 * i); S(W(4, i), sfx_thud, .3 + .1 * i)
S(tH - .1, lambda: sfx_riser(.2), .3)
S(tH, sfx_hatch, .9); S(tH, lambda: sfx_cheer(1.0), .3); S(tH + .05, sfx_sparkle, .6)
for k in range(6): S(tH + .15 + k * .08, sfx_ting, .12)
# --- scene 5/6/7: a baby!
S(L[5] + .2, sfx_chirp, .35); S(L[5] + .35, sfx_boing, .35)
S(L[6] + .05, sfx_squeakmouse, .5); S(L[6] + .5, sfx_thud, .2); S(L[6] + .55, lambda: sfx_patter(.8), .3)
S(L[6] + .35, sfx_squeak, .35); S(L[6] + .8, sfx_chirp, .3)
S(L[7] + .3, sfx_heart, .5); S(L[7] + .35, sfx_sparkle, .4)
# --- scene 8: pancakes!
S(W(8, 4), sfx_pop, .5); S(W(8, 4) + .05, sfx_sparkle, .45); S(W(8, 4) + .1, sfx_ting, .4)
# --- scene 9: one tiny bite
S(W(9, 5) - .5, lambda: sfx_whoosh(.4), .3); S(W(9, 5), sfx_crunch, .7); S(W(9, 5) + .15, sfx_gulp, .5)
# --- scene 10: yum yum yummy
for i in range(3): S(W(10, i), sfx_boing, .35); S(W(10, i) + .02, sfx_chirp, .25)
# --- scene 11: the colour floods in
S(W(11, 1) - .15, lambda: sfx_riser(.4), .35); S(W(11, 1), sfx_sparkle, .6); S(W(11, 1) + .3, sfx_sprinkle, .5)
S(W(11, 2), sfx_heart, .5); S(W(11, 3), lambda: sfx_cheer(1.8), .6)
for i in range(9): S(W(11, 3) + .1 + i * .05, sfx_boing, .12)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a hushed glowing night, tense cracking, a joyful birth, a warm lullaby that turns into a party) ----------
music = np.zeros(N)
CH = [[57, 60, 64], [53, 57, 60], [60, 64, 67], [55, 59, 62]]       # Am F C G
CHB = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
ROOT = [45, 41, 48, 43]
ROOTB = [48, 45, 41, 43]
SAD = [69, 72, 76, 72, 67, 71, 74, 71]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    if t >= 29.7: continue
    chord, root = CH[bar], ROOT[bar]
    sec_night = t < L[4]
    sec_crack = L[4] <= t < tH
    sec_baby = tH <= t < W(11, 1) - .2
    sec_party = t >= W(11, 1) - .2
    if sec_night:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .04, pluck(midi(nn + 12), 1.8), .14)
        if e == 0: add(music, t, bass(midi(root), 1.6), .3)
        if e in (2, 6): add(music, t, marimba(midi(SAD[(k // 2) % 8] + 12), .45), .14)
    elif sec_crack:
        if e % 2 == 0: add(music, t, kick(), .35)
        if e in (0, 4): add(music, t, bass(midi(45), .7), .4)
    elif sec_baby:
        ch = CHB[bar]
        if e in (0, 2, 4, 6):
            for n_i, nn in enumerate(ch): add(music, t + n_i * .012, pluck(midi(nn + 12), .8), .2)
        if e in (0, 4): add(music, t, bass(midi(ROOTB[bar]), .5), .45)
        if e % 2 == 1: add(music, t, shaker(), .25)
        for ee, nn in [(0, 76), (2, 79), (3, 84), (4, 81), (6, 79), (7, 76)]:
            if ee == e and bar % 2 == 0: add(music, t, marimba(midi(nn), .5), .26)
    else:
        ch = CHB[bar]
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(ch): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2)
        if e in (0, 4): add(music, t, bass(midi(ROOTB[bar]), .45), .55)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .18) if e % 2 == 0 else None
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for i in range(3): add(music, W(4, i), bass(midi(36), .5), .5 + .1 * i)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tH + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tH, bass(midi(36), 1.2), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, W(11, 1) + j * .07, marimba(midi(nn), .5), .26)
add(music, tStk, marimba(midi(88), .8), .18)

'''
