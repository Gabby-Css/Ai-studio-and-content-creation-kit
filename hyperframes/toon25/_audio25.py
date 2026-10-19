TITLE = "Bo and the Pancake 25: Festival Finale"

moments = '''# ---- key moments (mirror of the constants in _body25.js)
tTower = L[3] + .05
NSL = 18
tBite = W(5, 3)
tNight = L[6] - .35
tBoom = W(7, 5)
tMunch = L[9] + .1
tAll = L[10]
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_firework():
    out = np.zeros(int(SR * 1.3))
    t = T(.35); f = 400 + 1500 * (t / .35) ** 2; add(out, 0, np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .18)
    n = rng.standard_normal(int(SR * .6)); tt = T(.6); add(out, .35, (n - lowpass(n, .5)) * np.exp(-tt * 7) * .55 + np.sin(2 * np.pi * 70 * tt) * np.exp(-tt * 9) * .5)
    for k in range(7): add(out, .45 + k * .06, sfx_sparkle(), .12)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1/2: a draw, then the King's decision
S(.0, lambda: sfx_swell(1.2), .2); S(.3, sfx_gulp, .25)
S(L[2] + .1, lambda: sfx_trumpet(.7), .4); S(W(2, 3), sfx_ting, .7); S(W(2, 3) + .05, sfx_sparkle, .6)
for k in range(4): S(W(2, 3) + .2 + k * .4, sfx_sparkle, .35)
S(L[2] + 1.2, sfx_heart, .5); S(L[2] + 1.6, lambda: sfx_cheer(1.6), .55)
for i in range(9): S(L[2] + 1.7 + i * .05, sfx_boing, .13)
# --- scene 3: building the giant pancake together
for i in range(NSL):
    f = midi(72 + [0, 2, 4, 7, 9][i % 5] + 12 * (i // 5)); S(tTower + i * .075 + .22, lambda f=f: sfx_stackdrop(f), .3)
for k in range(5): S(tTower + k * .28, sfx_boing, .22)
S(tTower + NSL * .075 + .12, sfx_sparkle, .6); S(tTower + NSL * .075 + .12, lambda: sfx_cheer(1.2), .45)
# --- scene 4: a pinch more love
S(L[4] + .4, sfx_heart, .5)
for k in range(7): S(L[4] + .4 + k * .12, sfx_ting, .12)
S(L[4] + .6, sfx_sparkle, .5)
# --- scene 5: one tiny bite
S(tBite - .1, lambda: sfx_whoosh(.4), .35); S(tBite + .45, sfx_crunch, .6); S(tBite + .6, sfx_gulp, .4); S(tBite + .6, sfx_heart, .4)
for k in range(5): S(tBite + .1 + k * .08, sfx_pop, .22)
# --- scene 6: dusk, first fireworks
S(tNight, lambda: sfx_whoosh(.5), .35); S(tNight + .1, lambda: sfx_swell(1.2), .25)
S(L[6] + .4, sfx_firework, .7); S(L[6] + 1.1, sfx_firework, .6)
# --- scene 7: three, two, one, boom
for k, f in enumerate([880, 880, 880]): S(L[7] + .3 + k * .35, lambda f=f: sfx_beep(f, .12), .3)
S(tBoom - .05, lambda: sfx_riser(.3), .4)
for d in [0, .18, .34]: S(tBoom + d, sfx_firework, .7)
S(tBoom, sfx_bigpop, .5); S(tBoom + .2, lambda: sfx_cheer(1.4), .45)
# --- scene 8: ooh, pretty colours
for t0 in [.2, .7, 1.2]: S(L[8] + t0, sfx_firework, .6)
for i in range(4): S(L[8] + .1 + i * .1, sfx_boing, .25)
S(L[8] + .3, lambda: sfx_cheer(1.0), .35)
# --- scene 9: Munch waves from the far hill
S(tMunch - .2, sfx_pop, .5); S(tMunch, lambda: sfx_roar(.6), .22); S(tMunch + .2, sfx_chirp, .3)
S(tMunch + .4, sfx_heart, .4); S(L[9] + 1.4, sfx_firework, .55)
# --- scene 10: everybody!
S(tAll, lambda: sfx_trumpet(1.0), .45); S(tAll + .1, lambda: sfx_cheer(2.0), .65)
for i in range(5): S(tAll + i * .25, sfx_firework, .6)
for i in range(9): S(tAll + .1 + i * .05, sfx_boing, .14)
# --- scene 11: the finale
for i in range(6): S(L[11] + i * .3, sfx_firework, .55)
S(L[11] + .3, lambda: sfx_cheer(2.0), .5)
S(tStk, sfx_stickerpop, .9)
for i in range(5): S(tStk + i * .5, sfx_firework, .5)
S(29.4, sfx_sparkle, .3)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a warm decision, a cosy cooking jam, a dreamy dusk, a big festival finale) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
SAD = [69, 72, 76, 72, 67, 71, 74, 71]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_think = t < L[2]
    sec_cook = L[2] <= t < tNight
    sec_dusk = tNight <= t < tBoom
    sec_party = tBoom <= t
    if sec_think:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .15)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .18)
        if e == 0: add(music, t, bass(midi(root), 1.4), .32)
        continue
    if sec_dusk:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.4), .16)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .35), .15)
        if e == 0: add(music, t, bass(midi(root), 1.4), .34)
        continue
    sv = 1.0
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_party else 0)), .55), .30)
    if sec_party and e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, W(2, 3) + j * .06, marimba(midi(nn + 12), .5), .26)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tTower + NSL * .075 + .12 + j * .06, marimba(midi(nn), .5), .24)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tBoom + j * .05, marimba(midi(nn + 12), .5), .28)
add(music, tBoom, bass(midi(36), 1.0), .6)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tAll + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, tAll, bass(midi(36), 1.2), .65)
for nn in [48, 55, 60, 64, 67, 72]:
    add(music, 28.8, pluck(midi(nn), 1.4), .34)
add(music, 28.8, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .2)

'''
