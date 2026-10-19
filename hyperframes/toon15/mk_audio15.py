"""Generate toon15/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 15: Four Jiggles'").replace("_scenes3.js", "_scenes15.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

# the shared sfx library built up by the previous episodes (beep ... whistle) comes from toon14's generated audio.py
a14 = open(os.path.join(HERE, "..", "toon14", "audio.py"), encoding="utf-8").read()
lib = a14[a14.index("def sfx_beep"):a14.index("SFX = []")]

moments = '''# ---- key moments (mirror of the constants in _scenes15.js)
JX = [1300, 1470, 1650, 1810]                       # j2, j1, j3, j4
tTag = [W(2, 1) - .1, W(2, 1) + .25, W(2, 3) - .05, W(2, 4) - .15]
tScan = W(4, 2) - .25; dScan = 1.6
tPct = W(5, 3)
tPancake = L[7] + 1.25
tJump = W(9, 2); tM = W(9, 6) - .05
tBack = L[10] - .05
tK1 = W(11, 4); tK2 = W(11, 5)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_scan(d=1.6):
    t = T(d); f = 380 + 900 * (t / d); y = np.sin(2 * np.pi * np.cumsum(f) / SR) * .22 + np.sin(2 * np.pi * np.cumsum(f * 2.01) / SR) * .08
    return y * np.minimum(1, t / .05) * np.minimum(1, (d - t) / .1)
def sfx_creak(d=.9):
    t = T(d); f = 150 + 70 * np.sin(2 * np.pi * 5 * t) + 120 * (t / d)
    y = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .22 + lowpass(rng.standard_normal(len(t)), .05) * .1
    return lowpass(y, .25) * np.sin(np.pi * t / d) ** .7
def sfx_thump():
    t = T(.28); f = 62 + 80 * np.exp(-t * 25)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.3 + lowpass(rng.standard_normal(len(t)), .12) * np.exp(-t * 45) * .6


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1/2: four Jiggles, all claiming the name
S(.3, sfx_boing, .3); S(.5, sfx_chirp, .3)
for i, t in enumerate(tTag):
    S(t, sfx_pop, .55); S(t + .02, sfx_chirp, .4); S(t + .05, sfx_boing, .4); S(t + .1, sfx_sparkle, .3)
# --- scene 3: Bo calls Zap
S(L[3] + .35, lambda: sfx_whoosh(.3), .25)
for k in np.arange(L[3] + .4, L[3] + 1.15, .22): S(k, sfx_clink, .16); S(k + .05, sfx_tick, .16)
# --- scene 4: the scan
S(tScan, lambda: sfx_scan(dScan), .65); S(tScan, lambda: sfx_whoosh(.5), .2)
for i, x in enumerate(JX):
    ts = tScan + (x - 1230) / 670 * dScan
    S(ts, lambda i=i: sfx_beep(740 + 130 * i, .1), .5); S(ts + .02, sfx_boing, .25)
for i, t in enumerate([tPct + k * .14 for k in range(4)]):
    S(t, sfx_pop, .5); S(t + .03, lambda i=i: sfx_ding(988 + 110 * i), .35)
# --- scene 5: Mochi
for k in np.arange(L[6] - .45, L[6] + .2, .3): S(k, sfx_tick, .13)
S(L[6] + 1.0, sfx_squeak, .1); S(L[6] + 1.4, sfx_squeak, .1)
# --- scene 6: the sneaky pancake test
S(tPancake - .25, lambda: sfx_whoosh(.3), .3); S(tPancake, sfx_pop, .7); S(tPancake + .05, sfx_sparkle, .6); S(tPancake + .15, lambda: sfx_ding(1568), .4)
for i in range(4): S(L[8] + .05 + i * .05, sfx_gasp, .3); S(L[8] + .1 + i * .06, sfx_chirp, .35)
# --- scene 7: jump, jump, jump... SQUISH!
for i in range(4): S(tJump + i * .03, lambda: sfx_whoosh(.35), .25); S(tJump + i * .03, sfx_boing, .4)
S(tM, sfx_bigpop, .9); S(tM + .01, sfx_splat, .8); S(tM + .03, sfx_sparkle, .7); S(tM + .15, sfx_sparkle, .5)
S(tM + .55, sfx_thud, .7); S(tM + .57, sfx_squelchj, .5)
for k in np.arange(tM + .75, tM + 1.4, .17): S(k, sfx_crunch, .5)
S(tM + 1.4, sfx_gulp, .7); S(tM + 1.55, sfx_burp, .35)
# --- scene 8: back together
S(tBack, lambda: sfx_goo(.5), .5); S(tBack + .2, sfx_boing, .5); S(W(10, 1), sfx_heart, .5); S(W(10, 1) + .03, sfx_sparkle, .5)
S(W(10, 2), sfx_boing, .4); S(W(10, 4), sfx_boing, .4)
for i in range(3): S(L[10] + .05 + i * .22, sfx_chirp, .35)
# --- scene 9: knock, knock...
S(L[11] - .3, lambda: sfx_swell(.6), .3)
for k in range(3): S(tK1 + k * .08, sfx_thump, .7)
S(tK1 + .02, sfx_knock, .7); S(tK1 + .1, sfx_eep, .5); S(tK1 + .15, lambda: sfx_whoosh(.4), .4)
for k in range(4): S(tK2 + k * .07, sfx_thump, .9)
S(tK2 + .02, sfx_knock, .9); S(tK2 + .1, sfx_knock, .6)
S(tK2 + .08, lambda: sfx_creak(1.0), .5)
S(tK2 + .3, lambda: sfx_swell(1.0), .6)
S(tK2 + .75, sfx_ting, .8); S(tK2 + .78, sfx_sparkle, .7)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .4)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; the series tune again, with a mystery section for the cliffhanger) ----------
music = np.zeros(N)
CH = [[60, 64, 67], [57, 60, 64], [57, 60, 65], [59, 62, 67]]
ROOT = [48, 45, 41, 43]
MEL = [
    [(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)],
    [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
    [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)],
    [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
]
SNEAK = [57, 58, 59, 60, 59, 58, 57, 52]
ARPU = [72, 76, 79, 84, 88, 91, 88, 84]
MYST = [57, 60, 63, 60, 57, 60, 62, 59]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.5: continue
    sec_a = t < L[4] - .2                       # claim the name
    sec_scan = L[4] - .2 <= t < L[6] - .6       # the scan
    sec_dry = L[6] - .6 <= t < L[7]             # Mochi
    sec_plan = L[7] <= t < tJump                # the sneaky test
    sec_jump = tJump <= t < tM + 1.6
    sec_fin = tM + 1.6 <= t < L[11] - .3
    sec_myst = L[11] - .3 <= t
    if sec_myst:
        if e in (0, 4): add(music, t, bass(midi(33 if bar % 2 == 0 else 31), 1.0), .6)
        if e % 2 == 0: add(music, t, pizz(midi(MYST[e] + 12), .18), .22 + .08 * (t - (L[11] - .3)) / 3)
        if e in (3, 7): add(music, t, marimba(midi(MYST[e] + 24), .25), .12)
        continue
    if sec_dry:
        if e in (0, 4): add(music, t, bass(midi(28 if bar % 2 == 0 else 31), .9), .5)
        if e % 2 == 1: add(music, t, pizz(midi(40 + 2 * (k % 3)), .1), .22)
        continue
    if sec_plan:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .32)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        if e in (3, 7): add(music, t, marimba(midi(SNEAK[e] + 24), .2), .11)
        continue
    if sec_jump:
        if e in (0, 4): add(music, t, bass(midi(root), .35), .5)
        if e in (0, 2, 4, 6): add(music, t, kick(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
        add(music, t, marimba(midi(ARPU[k % 8] + (12 if t - tJump > 1.0 else 0)), .22), .16 + .12 * min(1, (t - tJump) / max(.8, tM - tJump)))
        continue
    sv = 1.0
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_fin else 0)), .55), .30)
    if sec_scan:
        if e in (2, 6): add(music, t, clap(), .35)
        if e % 2 == 1: add(music, t, shaker(), .3)
        if e in (1, 5): add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .2), .12)
    else:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
for j, nn in enumerate([60, 64, 67, 72]): add(music, tTag[0] + j * .06, marimba(midi(nn + 12), .5), .2)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tM + j * .06, marimba(midi(nn), .5), .26)
add(music, tM, bass(midi(36), 1.0), .6)
add(music, tK2 + .1, bass(midi(28), 1.8), .7)
add(music, tK2 + .75, marimba(midi(96), .8), .25)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + lib + extra + events + music + tail)
print("audio.py written")
