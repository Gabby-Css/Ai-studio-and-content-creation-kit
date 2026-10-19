"""Generate toon6/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 6: Monkey Business!'").replace("_scenes3.js", "_scenes6.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

moments = r'''# ---- key moments (mirror of the constants in _scenes6.js)
tPan = W(1, 3) - .2
tPeel0 = L[2] + .15
tJB = W(4, 0) + .05; tJT = W(4, 2) + .05; tJN = W(4, 4) - .05
tHmph = W(5, 0); tIdea = W(5, 3)
tBan = W(6, 2)
tSniff = L[7]; tLeap = W(8, 1) - .05; tSlip = W(8, 4) - .02
tPzFly = tSlip + .02; tPzLand = tPzFly + .95
tFz = W(10, 1) - .02; tCreak = W(10, 4) - .1; tOpen = W(10, 5)
tRoar = L[11] + .02; tSweet = W(11, 1) - .05
tStk = L[11] + DU[11] + .25
munch1 = []; _t = tPan + .85
while _t < L[2] - .35: munch1.append(_t); _t += .62
munch2 = []; _t = W(5, 0) + .4
while _t < L[6] - .3: munch2.append(_t); _t += .7


'''

newsfx = r'''def sfx_sniff():
    t = T(.13); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * np.sin(np.pi * t / .13) ** 1.2 * .55
def sfx_chew():
    out = np.zeros(int(SR * .5))
    for k in range(4):
        t = T(.07); add(out, k * .12, np.sin(2 * np.pi * (260 - 60 * k) * t) * np.exp(-t * 40) * .5)
    return out
def sfx_slidewhistle(up=False):
    t = T(.55); f = 1500 * np.exp(-2.1 * t / .55) + 160
    if up: f = f[::-1]
    return np.sin(2 * np.pi * np.cumsum(f) / SR + .6 * np.sin(2 * np.pi * 7 * t)) * np.sin(np.pi * np.minimum(1, t / .05)) * np.exp(-t * 1.2) * .5
def sfx_creak(d=1.9):
    t = T(d); f = 150 + 90 * np.sin(2 * np.pi * 2.3 * t + 1.2) + 40 * np.sin(2 * np.pi * 9 * t) + 30 * lowpass(rng.standard_normal(len(t)), .003) * 6
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .6 * np.sin(2 * ph) + .45 * np.sin(3 * ph) + .3 * np.sin(5 * ph)) * (.55 + .45 * np.sin(2 * np.pi * 3.7 * t + .4))
    return lowpass(s, .35) * np.minimum(1, t / .2) * np.minimum(1, (d - t) / .3) * .8
def sfx_roar(d=1.0):
    t = T(d); f = 78 + 22 * np.sin(2 * np.pi * 6 * t) - 20 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .03) * np.exp(-t * 2.4) * 1.1
def sfx_ting(): t = T(.6); return (np.sin(2 * np.pi * 1760 * t) + .4 * np.sin(2 * np.pi * 3520 * t)) * np.exp(-t * 7) * .45
def sfx_squelch():
    t = T(.25); n = rng.standard_normal(len(t)); y = lowpass(n, .2) - lowpass(n, .02)
    return (y * np.exp(-t * 12) * 1.4 + np.sin(2 * np.pi * (240 - 150 * t / .25) * t) * np.exp(-t * 14) * .5)
def sfx_plop(): t = T(.18); f = 500 - 330 * (t / .18); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 18) * .6
def sfx_razz():     # Coco blowing a raspberry
    t = T(.4); f = 120 + 30 * np.sin(2 * np.pi * 36 * t); n = lowpass(rng.standard_normal(len(t)), .3)
    return (np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .3 + n * .5) * np.sin(np.pi * t / .4) * .7


'''

events = r'''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: frozen table, swish to the fridge, the gang dashes over, Coco munches
S(.1, sfx_gasp, .6)
S(tPan, lambda: sfx_whoosh(.8), .6)
for k in np.arange(tPan + .1, tPan + 1.7, .14): S(k, sfx_thud, .18); S(k + .05, sfx_tick, .25)
for k in np.arange(tPan + .75, tPan + 1.7, .5): S(k, sfx_boing, .22)
S(tPan + 1.55, sfx_thud, .5); S(tPan + 1.7, sfx_thud, .4); S(tPan + 1.85, sfx_skid, .4)
for t in munch1 + munch2: S(t, lambda: sfx_whoosh(.3), .25); S(t + .32, sfx_crunch, .7); S(t + .42, sfx_chew, .5)
# --- scene 2/3: taunt, peel drops, "give it back"
S(L[2], sfx_razz, .7)
S(tPeel0 + .9, sfx_plop, .7)
S(L[3] - .05, sfx_gasp, .3)
for k in range(4): S(L[3] + .1 + k * .12, sfx_thud, .25)
# --- scene 4: the jumps
for t, f in ((tJB, 1), (tJT, 1)):
    S(t - .05, sfx_boing, .7); S(t + .72, sfx_thud, .6); S(t + .74, sfx_gulp, .4)
for k in range(4): S(tJN + k * .05, sfx_boing, .4)
S(tJN + .85, sfx_thud, .6); S(tJN + .9, sfx_gulp, .5)
for k in range(3): S(tJN + 1.0 + k * .3, sfx_eep, .22)
# --- scene 5: Mochi's idea
S(tHmph, sfx_thud, .2)
S(tIdea - .2, sfx_ting, .8); S(tIdea - .15, sfx_sparkle, .55)
# --- scene 6: the trap
S(tBan, lambda: sfx_whoosh(.4), .4); S(tBan + .42, sfx_thud, .5); S(tBan + .45, sfx_sparkle, .45)
for k in range(3): S(W(6, 4) - .15 + k * .22, sfx_tick, .3)
# --- scene 7: Coco sniffs the bait
S(tSniff, sfx_gasp, .5)
for k in range(5): S(tSniff + .1 + k * .2, sfx_sniff, .5)
# --- scene 8: the leap, the slip, the crash
S(tLeap, lambda: sfx_whoosh(tSlip - tLeap + .1), .7)
S(tSlip - .02, sfx_squelch, .8)
S(tSlip, sfx_slidewhistle, .8)
S(tSlip + .25, lambda: sfx_slidewhistle(True), .5)
S(tPzFly, lambda: sfx_whoosh(.9), .5)
S(tSlip + .85, sfx_thud, 1.0); S(tSlip + .87, sfx_squelch, .8); S(tSlip + .9, sfx_boing, .5)
for k in range(5): S(tSlip + 1.0 + k * .13, sfx_tick, .4)
# --- scene 9: Truffle catches the pizza
S(tPzLand, sfx_pop, .8); S(tPzLand + .02, sfx_boing, .5); S(tPzLand + .05, sfx_sparkle, .6)
S(L[9] + .1, sfx_ding, .5)
# --- scene 10/11: the fridge creaks open, Gumdrop roars
S(tFz - .05, sfx_gasp, .7)
S(tCreak, lambda: sfx_creak(1.9), .8)
S(tOpen + .1, sfx_pop, .4)
S(tRoar, lambda: sfx_roar(1.1), 1.0)
for k in range(4): S(tRoar + .02 + k * .05, sfx_thud, .3)
S(tSweet + .3, sfx_eep, .3)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = r'''# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-5) ----------
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
ARP = [0, 1, 2, 1, 0, 1, 2, 1]
RUN = [88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_freeze = t < tPan
    sec_munch = tPan <= t < L[4] - .1
    sec_jump = L[4] - .1 <= t < tHmph - .1
    sec_plan = tHmph - .1 <= t < tSniff
    sec_leap = tSniff <= t < tPzLand
    sec_party = tPzLand <= t < tFz
    sec_creak = tFz <= t < tRoar
    sec_end = tRoar <= t
    if sec_freeze:
        if e == 0: add(music, t, bass(midi(33), 1.0), .5)
        continue
    if sec_creak:
        continue
    if sec_end:
        if e in (0, 4) and t > tSweet: add(music, t, pizz(midi(CH[bar][e // 4] + 12), .2), .3)
        continue
    if sec_plan:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e])), .5)
        if e == 0: add(music, t, bass(midi(33), .9), .5)
        continue
    if sec_leap:
        if e in (0, 4): add(music, t, bass(midi(33), .6), .4)
        if e in (2, 6) and t < tLeap - .1: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        continue
    sv = .85 if sec_party else (.55 if sec_munch else .65)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_party else 0)), .55), .30)
    if sec_munch or sec_jump:
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 24), .14), .28)
    if sec_party or sec_jump:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
# the leap: a fast marimba run down to the slip
_k = 0
for t in np.arange(tLeap, tSlip, .09):
    add(music, float(t), marimba(midi(RUN[_k % len(RUN)]), .16), .22); _k += 1
# low stinger at the creak, then the button
add(music, tFz, bass(midi(33), 1.4), .55)
add(music, tRoar, bass(midi(28), 1.2), .6)
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .33)
add(music, 29.4, marimba(midi(84), .6), .4)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + newsfx + events + music + tail)
print("audio.py written")
