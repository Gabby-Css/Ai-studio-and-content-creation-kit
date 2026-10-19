"""Generate toon17/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 17: The Message from Space'").replace("_scenes3.js", "_body17.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

# the shared sfx library built up by the previous episodes (beep ... patter) comes from toon16's generated audio.py
a16 = open(os.path.join(HERE, "..", "toon16", "audio.py"), encoding="utf-8").read()
lib = a16[a16.index("def sfx_beep"):a16.index("SFX = []")]

moments = '''# ---- key moments (mirror of the constants in _body17.js)
tRun = .85
tHoloOn = W(2, 2)
tCmd = L[3] + DU[3] - .12
tHoloOff = L[5] + DU[5] + .12
tS0 = L[6] - .05
tFifty = W(7, 2)
tObv = W(8, 4)
tBoard = L[9] - .55
tZoom = W(9, 4) - .1
tCut = L[10] - .2
tHide = W(11, 3)
tStk = L[11] + DU[11] + .35
tSw = tBoard + .35
NSL = 18


'''

extra = '''def sfx_static(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); env = (np.sin(2 * np.pi * 13 * t) > -.25) * 1.0
    return lowpass(n, .55) * env * np.minimum(1, t * 30) * np.minimum(1, (d - t) * 20) * .3
def sfx_ring(f=1040, d=.34):
    t = T(d); return np.sin(2 * np.pi * f * t) * (np.sin(2 * np.pi * 24 * t) > 0) * np.exp(-t * 4) * .3
def sfx_holoon(d=.5, up=True):
    t = T(d); f = 300 + 1500 * ((t / d) ** 2 if up else (1 - t / d) ** 2)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .6 * .32
def sfx_stackdrop(f):
    out = np.zeros(int(SR * .5)); add(out, 0, sfx_ding(f) * .9); add(out, 0, sfx_plop() * .5); return out
def sfx_waddle():
    t = T(.1); f = 480 + 260 * np.sin(2 * np.pi * 9 * t); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22) * .3


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: the saucer pings, everybody runs over
for k, tt in enumerate([.15, .5, .85, 1.2, 1.55]):
    S(tt, lambda: sfx_beep(1318, .12), .5); S(tt + .02, sfx_ting, .3)
S(.2, sfx_gasp, .4); S(tRun, lambda: sfx_patter(1.9), .8); S(tRun, lambda: sfx_whoosh(.6), .35)
S(tRun + .9, lambda: sfx_patter(1.2), .45)
# --- scene 2: ring-ring, the hologram beam switches on (static first)
for k in range(5): S(L[2] + .1 + k * .36, lambda k=k: sfx_ring(1040 if k % 2 == 0 else 1320), .5)
S(tHoloOn, sfx_holoon, .8); S(tHoloOn + .03, sfx_sparkle, .55); S(tHoloOn + .05, lambda: sfx_static(2.2), .5)
S(tHoloOn, lambda: sfx_swell(.7), .3); S(tHoloOn + .1, sfx_gasp, .35)
# --- scene 3: Blip squeals, the Commander flickers in
for d in [.12, .6, 1.08]: S(L[3] + d, sfx_boing, .45)
S(L[3] + .3, sfx_heart, .4)
S(tCmd, lambda: sfx_holoon(.35), .55); S(tCmd + .05, sfx_chirp, .5); S(tCmd + .1, sfx_sparkle, .6)
for k in range(4): S(tCmd + k * .07, lambda: sfx_static(.08), .5)
# --- scene 4: the sad little Commander
S(L[4] + .05, lambda: sfx_whimper(.6, 780), .6); S(L[4] + .7, lambda: sfx_whimper(.5, 700), .5)
for i in range(5): S(L[4] + .3 + i * .22 + .15, sfx_plip, .5)
S(L[4] + .4, lambda: sfx_rumble(1.1), .55); S(L[4] + 1.3, sfx_gulp, .35)
# --- scene 5: Bo to the rescue
S(L[5] - .5, lambda: sfx_patter(.8), .6); S(L[5] + .3, sfx_boing, .5); S(L[5] + .35, lambda: sfx_trumpet(.4), .25)
S(L[5] + .5, sfx_heart, .55); S(L[5] + .5, sfx_sparkle, .6)
S(tHoloOff, lambda: sfx_holoon(.3, False), .6); S(tHoloOff + .02, sfx_pop, .6); S(tHoloOff + .05, sfx_sparkle, .5)
S(tHoloOff + .1, lambda: sfx_cheer(1.2), .45)
for i in range(8): S(tHoloOff + .1 + i * .04, sfx_boing, .14)
# --- scene 6: the tower goes up, pancake by pancake
S(tS0 - .1, lambda: sfx_swell(1.5), .3)
for i in range(NSL):
    f = midi(72 + [0, 2, 4, 7, 9][i % 5] + 12 * (i // 5)); S(tS0 + i * .075 + .22, lambda f=f: sfx_stackdrop(f), .35)
for k in range(5): S(tS0 + k * .28, sfx_boing, .22)
S(tS0 + NSL * .075 + .1, sfx_sparkle, .6); S(tS0 + NSL * .075 + .1, lambda: sfx_trumpet(.5), .3)
# --- scene 7: fifty!
S(tFifty, sfx_stickerpop, .9); S(tFifty + .05, sfx_sparkle, .6); S(tFifty + .1, lambda: sfx_cheer(1.0), .4)
for k in range(3): S(L[7] + .3 + k * .5, lambda: sfx_creak(.4), .18)
# --- scene 8: the tower wobbles dangerously
S(L[8] + .05, sfx_gasp, .5); S(L[8] + .2, lambda: sfx_swell(1.8), .3)
for k in range(5): S(L[8] + .3 + k * .45, lambda: sfx_creak(.6), .35); S(L[8] + .35 + k * .45, sfx_thump, .18)
S(tObv + .02, sfx_squeak, .25); S(tObv + .55, sfx_gulp, .25)
S(L[8] + 2.5, sfx_thud, .3)
# --- scene 9: all aboard, the tower waddles, ZOOM!
S(tBoard, lambda: sfx_patter(2.1), .8)
for k, tt in enumerate([1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4]): S(tBoard + tt, sfx_shrink, .22)
S(tBoard + 1.3, sfx_squelchj, .5); S(tBoard + 1.6, sfx_stomp, .45)
for k in range(int(.75 / .12) + 1): S(tSw + k * .12, sfx_waddle, .35)
S(tZoom - .45, lambda: sfx_rumble(.65), .6); S(tZoom - .3, lambda: sfx_riser(.45), .5)
S(tZoom, lambda: sfx_whoosh(.9), .9); S(tZoom, sfx_bigpop, .6); S(tZoom + .05, sfx_sparkle, .5)
# --- scene 10: inside the saucer, Planet Zorp
S(tCut, sfx_thump, .8); S(tCut, lambda: sfx_whoosh(.5), .5); S(tCut + .1, sfx_sparkle, .55); S(tCut + .1, sfx_grow, .4)
S(tCut, lambda: sfx_rumble(2.2), .25)
for k, f in enumerate([880, 1100, 988, 1320, 1100, 1480, 988, 1320]): S(tCut + .5 + k * .3, lambda f=f: sfx_beep(f, .1), .16)
S(tCut + .4, lambda: sfx_holoon(1.6), .3)
for d in [.05, .3, .6]: S(L[10] + d, sfx_boing, .3)
S(W(10, 2), lambda: sfx_cheer(1.2), .5); S(W(10, 2) + .1, sfx_heart, .4); S(W(10, 2) + .15, sfx_sparkle, .5)
for i in range(7): S(W(10, 2) + .05 + i * .05, sfx_boing, .14)
# --- scene 11: Rocky!
S(L[11] - .1, lambda: sfx_swell(.8), .3)
S(tHide, sfx_pop, .7); S(tHide + .04, sfx_squeak, .55); S(tHide + .3, sfx_chirp, .35); S(tHide + .9, sfx_squeak, .35)
for k in range(4): S(tHide + .3 + k * .22, sfx_creak, .12)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .45)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; a mystery ping, a sad call, a hero's theme, a tense wobble, a space flight, a sneaky ending) ----------
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
SAD = [69, 72, 76, 72, 67, 71, 74, 71]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.5: continue
    sec_ping = t < L[2]
    sec_msg = L[2] <= t < L[4]
    sec_sad = L[4] <= t < L[5]
    sec_hero = L[5] <= t < L[8]
    sec_tense = L[8] <= t < tBoard
    sec_board = tBoard <= t < tCut
    sec_space = tCut <= t < L[11] - .3
    sec_end = L[11] - .3 <= t
    if sec_ping:
        if e in (0, 4): add(music, t, bass(midi(33 if bar % 2 == 0 else 31), 1.0), .5)
        if e % 2 == 0: add(music, t, pizz(midi(MYST[e] + 12), .18), .22)
        if e in (3, 7): add(music, t, marimba(midi(MYST[e] + 24), .25), .12)
        continue
    if sec_msg:
        if e in (0, 4): add(music, t, bass(midi(33), .9), .45)
        if e % 2 == 1: add(music, t, marimba(midi(ARPU[e] - 12), .2), .14)
        if e in (2, 6): add(music, t, pizz(midi(MYST[e] + 12), .15), .2)
        continue
    if sec_sad:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .16)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .2)
        if e == 0: add(music, t, bass(midi(root), 1.4), .35)
        continue
    if sec_tense:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e in (0, 4): add(music, t, bass(midi(33 if e == 0 else 32), .6), .42)
        if e == 6: add(music, t, marimba(midi(SNEAK[e] + 24), .2), .14)
        continue
    sv = 1.0 if (sec_hero or sec_board or sec_space) else .8
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_board or sec_space) else 0)), .55), .30)
    if sec_end:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        continue
    if sec_space:
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
    if sec_hero or sec_board or sec_space:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# stingers
add(music, tHoloOn, bass(midi(28), 1.0), .6)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tCmd + j * .06, marimba(midi(nn), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, L[5] + .3 + j * .06, marimba(midi(nn), .5), .26)
add(music, tS0 + NSL * .075 + .1, marimba(midi(91), .6), .3)
for j, nn in enumerate([60, 64, 67, 72]): add(music, tFifty + j * .07, marimba(midi(nn + 12), .5), .22)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tZoom + j * .05, marimba(midi(nn + 12), .5), .26)
add(music, tZoom, bass(midi(36), 1.0), .6)
add(music, tHide, marimba(midi(88), .6), .3)
add(music, tStk, marimba(midi(88), .8), .22)
for nn in [45, 52, 57, 60, 64, 69]:
    add(music, 29.2, pluck(midi(nn), 1.0), .3)
add(music, 29.2, bass(midi(33), 1.0), .5)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + lib + extra + events + music + tail)
print("audio.py written")
