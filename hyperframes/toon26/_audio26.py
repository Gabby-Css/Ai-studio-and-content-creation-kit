TITLE = "Bo and the Pancake 26: The Big Gray Egg"

moments = '''# ---- key moments (mirror of the constants in _body26.js)
tFound = W(6, 2)
tBlank = W(9, 2)
tWarm = W(9, 7)
tTap = [W(11, 4), W(11, 5), W(11, 6)]
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_egglump():
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_thud() * .9); add(out, .05, sfx_tick() * .8); return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: a quiet morning, the egg appears, Munch tiptoes away
S(0.0, lambda: sfx_swell(1.6), .2); S(.3, lambda: sfx_patter(2.6), .1)
S(.6, lambda: sfx_wobble(.6), .3)
S(W(1, 3), sfx_bigpop, .4); S(W(1, 3) + .05, sfx_sparkle, .5); S(W(1, 3) + .1, sfx_gasp, .4)
# --- scene 2: Bo
S(L[2] + .2, sfx_boing, .3); S(L[2] + .45, sfx_chirp, .2)
# --- scene 3: Mochi steps up and knocks
S(L[3] - .8, lambda: sfx_patter(.7), .3)
S(W(3, 2) - .1, sfx_knock, .6); S(W(3, 2) + .1, sfx_knock, .5); S(W(3, 2) + .15, lambda: sfx_wobble(.4), .3)
# --- scene 4: Zap scans it
S(L[4] + .3, lambda: sfx_scan(1.4), .35)
for k in range(4): S(L[4] + .3 + k * .35, sfx_ring, .22)
S(W(4, 3), lambda: sfx_wobble(.6), .4); S(W(4, 3), sfx_squeak, .2)
# --- scene 5: Coco's banana idea
S(L[5] + .1, sfx_boing, .4); S(L[5] + .8, sfx_boing, .4); S(W(5, 3), sfx_pop, .4); S(W(5, 3) + .05, sfx_sparkle, .35)
# --- scene 6: the tiny note
S(tFound - .05, lambda: sfx_whoosh(.3), .3); S(tFound, sfx_pop, .5); S(tFound + .05, sfx_ting, .5); S(tFound + .1, sfx_sparkle, .4)
# --- scene 7: Truffle reads it
S(L[7] - 1.0, lambda: sfx_patter(.8), .3); S(W(7, 5), sfx_heart, .5); S(W(7, 5) + .05, sfx_sparkle, .35)
# --- scene 8: Bo promises
S(L[8] + .45, sfx_boing, .4); S(L[8] + .5, sfx_heart, .4)
# --- scene 9: the cosy blanket
S(tBlank, lambda: sfx_whoosh(.5, False), .35); S(tBlank + .45, sfx_egglump, .5); S(tBlank + .5, sfx_sparkle, .5)
S(tWarm, sfx_heart, .5); S(tWarm + .1, sfx_ting, .3)
# --- scene 10: Blip sees it wiggle
S(W(10, 2), lambda: sfx_wobble(.6), .45); S(L[10] + .05, sfx_gasp, .35)
# --- scene 11: tap, tap, tap
for i, t in enumerate(tTap):
    S(t, sfx_tick, .8); S(t + .01, sfx_knock, .5); S(t + .05, sfx_ting, .25 + .1 * i)
S(tTap[2] + .3, lambda: sfx_swell(1.2), .25)
S(tStk, sfx_stickerpop, .9)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a curious morning, a mysterious note, a cosy blanket, a held breath for the taps) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]       # C  Am  F  G
CHM = [[57, 60, 64], [52, 55, 59], [53, 57, 60], [52, 56, 59]]      # Am Em  F  E  (the mysterious bit)
ROOT = [48, 45, 41, 43]
MELA = [(0, 76), (2, 79), (3, 84), (4, 81), (6, 79), (7, 76)]
ARP = [72, 76, 79, 84, 79, 76, 79, 76]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    if t >= 29.7: continue
    chord, root = CH[bar], ROOT[bar]
    sec_play = t < L[6]
    sec_mys = L[6] <= t < tBlank - .2
    sec_cosy = tBlank - .2 <= t < L[11] - .1
    sec_hold = t >= L[11] - .1
    if sec_play:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .17)
        if e == 0: add(music, t, bass(midi(root), .9), .4)
        if e == 4: add(music, t, bass(midi(root + 7), .5), .28)
        for ee, nn in [(0, 76), (2, 79), (3, 84), (4, 81), (6, 79), (7, 76)]:
            if ee == e and bar in (0, 2): add(music, t, marimba(midi(nn), .5), .26)
        if e % 2 == 1: add(music, t, shaker(), .22)
    elif sec_mys:
        ch = CHM[bar]
        if e in (0, 4):
            for n_i, nn in enumerate(ch): add(music, t + n_i * .04, pluck(midi(nn), 1.8), .15)
        if e == 0: add(music, t, bass(midi(ch[0] - 12), 1.6), .34)
        if e in (2, 6): add(music, t, marimba(midi(ch[(k // 2) % 3] + 24), .4), .12)
    elif sec_cosy:
        if e in (0, 3, 5):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .9), .2)
        if e in (0, 4): add(music, t, bass(midi(root), .5), .5)
        add(music, t, marimba(midi(ARP[e] + 0), .3), .16) if e % 2 == 0 else None
        if e in (2, 6): add(music, t, clap(), .22)
        if e % 2 == 1: add(music, t, shaker(), .26)
    else:
        if e == 0:
            for n_i, nn in enumerate([57, 60, 64]): add(music, t + n_i * .05, pluck(midi(nn), 2.0), .14)
            add(music, t, bass(midi(45), 1.8), .3)
# stingers
for j, nn in enumerate([72, 76, 79, 84, 88]): add(music, tFound + j * .06, marimba(midi(nn), .5), .2)
for j, nn in enumerate([60, 64, 67, 72, 76, 79]): add(music, tBlank + .45 + j * .06, marimba(midi(nn + 12), .5), .22)
for i, t in enumerate(tTap): add(music, t, marimba(midi([81, 84, 88][i]), .5), .24)
add(music, tStk, marimba(midi(88), .8), .18)

'''
