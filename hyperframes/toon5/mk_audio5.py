"""Generate toon5/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 5: Pizza Party!'").replace("_scenes3.js", "_scenes5.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

moments = r'''# ---- key moments (mirror of the constants in _scenes5.js)
tReveal = W(1, 2) - .1
tSqz = W(1, 3); tOut = W(1, 6) + .3; tLand = tOut + .7
tBase = W(2, 3)
tSauce = W(3, 0) + .05; tCheese = W(3, 1) + .05; tTopP = W(3, 3) + .05
tTaste = [W(3, 6), W(3, 7), W(3, 8), W(3, 9)]
tBo = W(4, 0)
tNot = W(5, 0); tPinch = W(5, 4)
tBake = W(6, 0) + .05; tDing = W(6, 5); tOutPz = tDing + .2
tSl = [W(7, 1) - .05, W(7, 2), W(7, 3) + .1, W(7, 3) + .35, W(7, 4) + .25]
tFz = W(8, 1) - .05; tSw0 = W(8, 2) - .1; tGrab = tSw0 + .55
tPeel = W(9, 1) - .15
tStk = L[10] + DU[10] + .2


'''

newsfx = r'''def sfx_sniff():
    t = T(.13); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * np.sin(np.pi * np.minimum(1, t / .13)) ** 1.2 * .55
def sfx_chew():
    out = np.zeros(int(SR * .5))
    for k in range(4):
        t = T(.07); add(out, k * .12, np.sin(2 * np.pi * (260 - 60 * k) * t) * np.exp(-t * 40) * .5)
    return out
def sfx_splat():
    t = T(.28); n = rng.standard_normal(len(t)); y = lowpass(n, .25) - lowpass(n, .02)
    return (y * np.exp(-t * 11) * 1.6 + np.sin(2 * np.pi * (200 - 120 * t / .28) * t) * np.exp(-t * 14) * .5)
def sfx_rubber():   # squeezing through a tight window: rubbery squeak
    t = T(.2); f = 600 + 500 * np.sin(np.pi * t / .2) + 40 * np.sin(2 * np.pi * 35 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .2) * .35
def sfx_tock(f=620):
    t = T(.07); return np.sin(2 * np.pi * f * t) * np.exp(-t * 55) * .55
def sfx_ovending():
    t = T(1.1); return (np.sin(2 * np.pi * 2093 * t) + .5 * np.sin(2 * np.pi * 4186 * t)) * np.exp(-t * 3.6) * .5
def sfx_zip():      # the monkey zips past
    t = T(.5); n = rng.standard_normal(len(t)); y = lowpass(n, .45) - lowpass(n, .05)
    return y * np.sin(np.pi * t / .5) ** 1.2 * 1.9
def sfx_plop(): t = T(.18); f = 500 - 330 * (t / .18); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 18) * .6


'''

events = r'''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: silhouette sniffs, Truffle is revealed, squeezes through the window
for k in range(5): S(.15 + k * .24, sfx_sniff, .6)
S(tReveal, sfx_pop, .8); S(tReveal + .05, sfx_sparkle, .5)
for k in np.arange(tSqz, tOut, .22): S(k, sfx_rubber, .55)
S(tSqz + .1, sfx_thud, .25)
S(tOut, sfx_pop, .8); S(tOut + .02, lambda: sfx_whoosh(.6), .45)
S(tLand, sfx_thud, .7); S(tLand, sfx_boing, .5)
for k in np.arange(tLand + .2, L[2] - .1, .17): S(k, sfx_tick, .3)
# --- scene 2: the pizza base pops in
S(tBase, sfx_pop, .8); S(tBase + .2, sfx_sparkle, .55); S(tBase + .22, sfx_ding, .4)
S(W(2, 3) + .05, sfx_boing, .3)
# --- scene 3: sauce, cheese, toppings, tasting
S(tSauce + .08, sfx_splat, .8); S(tSauce + .12, sfx_gloop, .6)
for k in range(3): S(tCheese + k * .13, sfx_pop, .45); S(tCheese + .35 + k * .13, sfx_squeakmouse, .3)
S(tCheese + .55, sfx_sparkle, .45)
for k in range(4): S(tTopP + .1 + k * .1, sfx_thud, .25); S(tTopP + .1 + k * .1, sfx_tick, .35)
S(tTopP + .5, sfx_sparkle, .5)
for t in tTaste: S(t - .05, sfx_chew, .75); S(t + .1, sfx_gulp, .5); S(t + .15, sfx_boing, .22)
S(tTaste[3] + .2, sfx_gulp, .8); S(tTaste[3] + .22, sfx_squeak, .35)
# --- scene 4/5: Bo wants a bite, Truffle says not yet, a pinch of love
for k in np.arange(tBo - .15, tBo + .8, .17): S(k, sfx_tick, .3)
S(tBo + .1, sfx_gloop, .5); S(tBo + .45, sfx_gloop, .45)
for k in range(3): S(tNot + .2 + k * .24, sfx_tock, .5)
S(tPinch - .1, lambda: sfx_whoosh(.4), .3)
for k in range(8): S(tPinch + k * .07, sfx_sparkle, .22)
S(tPinch + .4, sfx_heart, .7); S(tPinch + .45, sfx_ding, .45)
# --- scene 6: the oven
S(tBake, lambda: sfx_whoosh(.7), .5)
S(tBake + .7, sfx_pop, .6)
for k in np.arange(tBake + 1.0, tDing - .05, .5): S(k, sfx_tock, .55); S(k + .25, lambda: sfx_tock(480), .4)
S(tDing, sfx_ovending, .9); S(tDing, sfx_thud, .3)
S(tOutPz, sfx_pop, .8); S(tOutPz + .3, sfx_sparkle, .6)
# --- scene 7: slices
for t in tSl: S(t, lambda: sfx_whoosh(.35), .35)
S(tSl[0] + .55, sfx_chew, .7); S(tSl[1] + .5, sfx_chew, .6); S(tSl[2] + .5, sfx_chew, .6); S(tSl[3] + .5, sfx_chew, .55); S(tSl[4] + .5, sfx_chew, .7)
S(W(7, 7), sfx_sparkle, .6); S(W(7, 7) + .05, sfx_ding, .4)
# --- scene 8: Coco
S(tFz - .05, sfx_gasp, .8)
S(tSw0, lambda: sfx_zip(), .7)
S(tGrab, sfx_pop, .8); S(tGrab + .02, sfx_thud, .4); S(tGrab + .05, sfx_zip, .55)
# --- scene 9/10: peel + "My pizza!"
S(tPeel + .45, sfx_plop, .7)
S(L[10] - .15, sfx_gasp, .6)
S(L[10] + .05, sfx_boing, .5)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = r'''# ---------- music (120 BPM; same C - Am - F - G tune as videos 1-4) ----------
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
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_open = t < tReveal
    sec_enter = tReveal <= t < L[2]
    sec_cook = L[2] <= t < tBake
    sec_bake = tBake <= t < tOutPz
    sec_party = tOutPz <= t < tFz
    sec_hush = tFz <= t < tGrab + .15
    sec_cheeky = tGrab + .15 <= t < L[10] - .1
    sec_end = L[10] - .1 <= t
    if sec_open:
        if e == 0: add(music, t, bass(midi(33), 1.0), .5)
        if e in (3, 7): add(music, t, pizz(midi(SNEAK[e]), .2), .3)
        continue
    if sec_bake:                                      # ticking suspense
        if e in (0, 4): add(music, t, bass(midi(root), .5), .4)
        if e in (2, 6): add(music, t, pizz(midi(chord[(e // 2) % 3] + 12), .15), .22)
        continue
    if sec_hush:
        continue
    if sec_cheeky:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 3), .18), .45)
        if e == 0: add(music, t, bass(midi(33), .6), .5)
        continue
    if sec_end:
        if e in (0, 4): add(music, t, bass(midi(root - 12), .8), .5)
        if e in (2, 6): add(music, t, pizz(midi(CH[bar][1] + 12), .25), .3)
        continue
    sv = .85 if sec_party else (.55 if sec_enter else .62)
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if (e in (0, 4)):
        add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_party else 0)), .55), .30)
    if sec_cook or sec_party:
        if e in (0, 4): add(music, t, kick(), .4 if sec_cook else .55)
        if e in (2, 6): add(music, t, clap(), .35 if sec_cook else .5)
        if e % 2 == 1: add(music, t, shaker(), .4)
# hush: low stinger at the freeze; final button
add(music, tFz, bass(midi(33), 1.2), .6)
for nn in [48, 60, 63, 67, 72, 75]:
    add(music, 29.4, pluck(midi(nn), .6), .33)
add(music, 29.4, marimba(midi(84), .6), .4)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + newsfx + events + music + tail)
print("audio.py written")
