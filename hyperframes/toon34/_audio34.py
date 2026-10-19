TITLE = "Bo and the Pancake 34: The Dark Tunnel"

moments = '''# ---- key moments (mirror of the constants in _body34.js)
tExit = W(11, 1)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_echo(sig, n=4, gap=.18, dec=.55):
    out = np.zeros(len(sig) + int(SR * gap * n))
    for k in range(n): add(out, k * gap, sig, dec ** k)
    return out


def sfx_drip():
    t = T(.25); f = 1400 * np.exp(-t * 22) + 500
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 20) * .35


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: racing towards the tunnel
S(0.0, lambda: sfx_engine(3.0, 90, 160), .32); S(.3, lambda: sfx_whoosh(1.4), .15)
S(1.5, lambda: sfx_swell(1.6), .3); S(W(1, 6) - .1, sfx_gasp, .35)
S(1.9, lambda: sfx_whoosh(1.0, False), .35); S(2.1, lambda: sfx_rumble(1.8), .25)
# --- the dark: engines hum low, water drips echo
for k, t in enumerate([2.9, 4.2, 5.7, 7.6, 9.3, 11.0, 12.8, 15.0, 16.9]): S(t, sfx_drip, .22)
S(2.6, lambda: sfx_engine(14.0, 70, 90), .22)
# --- scene 2/3: Coco and Truffle are scared
S(L[2] + .05, lambda: sfx_whimper(.7, 620), .35); S(L[2] + .2, sfx_eep, .4)
S(L[3] + .05, lambda: sfx_whimper(.8, 520), .4); S(W(3, 4) + .1, lambda: sfx_echo(sfx_eep(), 3, .22), .25)
# --- scene 4/5: Pebble sparkles
S(W(4, 3) - .25, lambda: sfx_swell(1.2), .3); S(W(4, 4), sfx_sparkle, .6); S(W(4, 4) + .02, sfx_ting, .6); S(W(4, 4) + .1, sfx_heart, .4)
for k in range(5): S(W(4, 4) + .2 + k * .16, sfx_ting, .2 + k * .03)
S(W(5, 0), sfx_chirp, .45); S(W(5, 0), sfx_sparkle, .5); S(W(5, 1), sfx_chirp, .5); S(W(5, 1), sfx_sparkle, .55)
# --- scene 6: the light spreads
S(L[6] + .1, lambda: sfx_riser(1.2), .3); S(L[6] + .3, lambda: sfx_holoon(1.0, True), .25)
# --- scene 7/8: Boo
S(L[7] - .45, lambda: sfx_whoosh(.5), .3); S(L[7] - .4, sfx_ting, .4); S(W(7, 2), lambda: sfx_whoosh(1.2), .3)
S(L[8] + .1, sfx_chirp, .3); S(W(8, 3) - .2, lambda: sfx_swell(1.4), .3); S(W(8, 3), sfx_ding, .4)
# --- scene 9: Zap scans
S(L[9] + .15, lambda: sfx_scan(1.2), .3)
for k in range(4): S(L[9] + .15 + k * .28, sfx_ring, .2)
S(W(9, 2), lambda: sfx_beep(1046, .12), .3)
# --- scene 10: hooray
S(L[10], lambda: sfx_cheer(1.4), .5)
for i in range(8): S(L[10] + .05 + i * .05, sfx_boing, .14)
S(L[10] + .1, sfx_heart, .4); S(L[10] + .2, sfx_sparkle, .5)
# --- scene 11: out into the sun
S(tExit - .9, lambda: sfx_riser(1.0), .4); S(tExit - .4, lambda: sfx_swell(.8), .35)
S(tExit, sfx_bigpop, .5); S(tExit, lambda: sfx_cheer(2.2), .6); S(tExit + .05, sfx_sparkle, .6)
S(tExit, lambda: sfx_whoosh(1.4, False), .4); S(tExit + .2, lambda: sfx_engine(3.0, 100, 240), .4)
for i in range(9): S(tExit + .2 + i * .05, sfx_boing, .13)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a cheerful run-up, an eerie low hum in the dark, a twinkly lullaby when Pebble glows, then a brave march and a blaze of sunshine) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
CHM = [[57, 60, 64], [52, 55, 59], [53, 57, 60], [52, 56, 59]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
TWK = [84, 88, 91, 88, 84, 79, 84, 88]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    sec_run = t < 1.9
    sec_dark = 1.9 <= t < L[4]
    sec_glow = L[4] <= t < L[7]
    sec_march = L[7] <= t < tExit - .9
    sec_sun = t >= tExit - .9
    if sec_run:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 0: add(music, t, bass(midi(root), .3), .45)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .24)
    elif sec_dark:
        ch = CHM[bar]
        if e in (0, 4):
            for n_i, nn in enumerate(ch): add(music, t + n_i * .05, pluck(midi(nn - 12), 1.6), .16)
        if e == 0: add(music, t, bass(midi(ch[0] - 24), 1.8), .38)
        if e in (3,): add(music, t, marimba(midi(ch[(k // 2) % 3] + 24), .3), .08)
    elif sec_glow:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.4), .15)
        if e == 0: add(music, t, bass(midi(root), 1.4), .3)
        add(music, t, marimba(midi(TWK[e]), .35), .2) if e % 2 == 0 else None
        if e % 2 == 1: add(music, t, shaker(), .16)
    elif sec_march:
        for n_i, nn in enumerate(chord):
            if e in (0, 3, 5): add(music, t + n_i * .015, pluck(midi(nn + 12), .8), .17)
        if e in (0, 4): add(music, t, kick(), .42)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .45)
        if e in (2, 6): add(music, t, clap(), .3)
        add(music, t, marimba(midi(ARPU[e] + 12), .3), .16) if e % 2 == 0 else None
    else:
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .8), .22)
        if e in (0, 2, 4, 6): add(music, t, kick(), .55)
        if e in (2, 6): add(music, t, clap(), .5)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .5)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .3)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .16)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, W(4, 4) + j * .08, marimba(midi(nn), .5), .25)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84, 88]): add(music, tExit + j * .06, marimba(midi(nn + 12), .5), .3)
add(music, tExit, bass(midi(36), 1.2), .6)
add(music, tStk, marimba(midi(88), .8), .18)

'''
