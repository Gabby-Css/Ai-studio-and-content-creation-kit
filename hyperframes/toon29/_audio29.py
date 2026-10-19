TITLE = "Bo and the Pancake 29: Pebble's Big Day"

moments = '''# ---- key moments (mirror of the constants in _body29.js)
tName = W(1, 4)
tHide = W(4, 3)
tSeek = W(4, 5)
tCome = W(5, 3)
tArrow = W(8, 3)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_snore(d=.9):
    t = T(d); f = 95 + 25 * np.sin(2 * np.pi * 1.2 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(np.pi * t / d) ** 2) * .32 + lowpass(rng.standard_normal(len(t)), .08) * (np.sin(np.pi * t / d) ** 2) * .5


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the name
S(0.3, lambda: sfx_swell(1.2), .18); S(.9, sfx_boing, .3); S(1.0, sfx_heart, .4)
S(tName, sfx_pop, .5); S(tName + .05, sfx_ting, .5); S(tName + .2, sfx_sparkle, .55)
# --- scene 2: Pebble! Pebble!
S(W(2, 0), sfx_boing, .35); S(W(2, 1), sfx_boing, .35); S(W(2, 0) + .1, sfx_chirp, .25)
# --- scene 3: Peanut tiptoes and wobbles
S(L[3] - .9, lambda: sfx_patter(.7), .25); S(L[3] + .05, lambda: sfx_wobble(.5), .35); S(L[3] + .1, sfx_squeak, .3)
S(L[3] + .45, lambda: sfx_trumpet(.25), .2); S(L[3] + .6, sfx_boing, .25)
# --- scene 4: hide and seek
S(L[4] + .1, lambda: sfx_patter(.8), .25); S(tHide, sfx_pop, .3); S(tSeek, sfx_pop, .45); S(tSeek + .05, sfx_chirp, .35)
# --- scene 5: Bo counts, then comes looking
S(L[5] - .2, sfx_tick, .5); S(L[5] + .3, sfx_tick, .4); S(tCome, lambda: sfx_whoosh(.3), .3); S(tCome + .25, lambda: sfx_patter(.8), .3)
# --- scene 6: the crawl
for k in range(6): S(tCome + .5 + k * .5, sfx_waddle, .18)
S(tCome + .45, lambda: sfx_whoosh(.6), .15)
# --- scene 7: Blip
S(L[7] + .05, sfx_gasp, .35); S(L[7] + .3, sfx_chirp, .25)
# --- scene 8: Zap scans, the arrow
S(L[8] + .5, lambda: sfx_scan(1.6), .35)
for k in range(5): S(L[8] + .55 + k * .28, sfx_ring, .2)
S(tArrow, sfx_pop, .45); S(tArrow + .03, sfx_ding, .45)
# --- scene 9: asleep
S(L[9] - .05, lambda: sfx_whoosh(.5), .2); S(W(9, 3), lambda: sfx_snore(1.0), .5); S(W(9, 3) + 1.3, lambda: sfx_snore(1.0), .5)
S(W(9, 3) + .2, sfx_sparkle, .25)
# --- scene 10: found him
S(L[10] - 1.1, lambda: sfx_patter(1.0), .3); S(W(10, 1), sfx_ting, .5); S(W(10, 1) + .1, sfx_gasp, .3); S(W(10, 1) + .15, sfx_boing, .5)
S(W(10, 1) + .2, sfx_squeakmouse, .35); S(W(10, 2), sfx_heart, .45); S(W(10, 2) + .05, sfx_sparkle, .4)
# --- scene 11: the ground shakes
S(L[11] - .2, lambda: sfx_rumble(2.8), .6)
for t in np.arange(L[11] + .3, L[11] + 2.2, .7): S(t, sfx_stomp, .55); S(t + .02, sfx_thump, .45)
S(L[11] + .2, sfx_gasp, .4)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a bouncy "naming" tune, tiptoe pizzicato for the hide-and-seek, sneaky crawl, scanning beeps, a lullaby, then low drums) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
SNEAK = [57, 60, 64, 60, 55, 59, 62, 59]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_name = t < L[4]
    sec_hide = L[4] <= t < L[7]
    sec_scan = L[7] <= t < L[9] - .2
    sec_nap = L[9] - .2 <= t < L[11] - .2
    sec_shake = t >= L[11] - .2
    if sec_name:
        if e in (0, 2, 4, 6):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .7), .17)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .5)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn), .5), .27)
        if e in (2, 6): add(music, t, clap(), .28)
        if e % 2 == 1: add(music, t, shaker(), .28)
    elif sec_hide:
        if e % 2 == 0: add(music, t, pluck(midi(SNEAK[e] + 12 * (1 if bar % 2 else 0)), .25), .24)
        if e in (0, 4): add(music, t, bass(midi(root), .3), .4)
        if e % 4 == 2: add(music, t, shaker(), .3)
    elif sec_scan:
        if e in (0, 4): add(music, t, bass(midi(root), .35), .4)
        if e % 2 == 0: add(music, t, marimba(midi(SNEAK[e] + 24), .2), .2)
        if e in (3, 7): add(music, t, clap(), .25)
    elif sec_nap:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .05, pluck(midi(nn + 12), 1.8), .13)
        if e == 0: add(music, t, bass(midi(root), 1.6), .28)
        if e in (2, 6): add(music, t, marimba(midi(chord[(k // 2) % 3] + 24), .5), .1)
    else:
        if e % 4 == 0: add(music, t, kick(), .5)
        if e == 0: add(music, t, bass(midi(36), 1.4), .5)
        if e in (2, 6): add(music, t, shaker(), .2)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tName + j * .06, marimba(midi(nn), .5), .22)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, W(10, 1) + j * .06, marimba(midi(nn), .5), .24)
add(music, tStk, marimba(midi(88), .8), .18)

'''
