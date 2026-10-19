"""Generate toon14/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 14: Jiggle Moves In'").replace("_scenes3.js", "_scenes14.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

# the shared sfx library (everything the previous episodes defined after the toon3 instruments) comes from toon13's generated audio.py
a13 = open(os.path.join(HERE, "..", "toon13", "audio.py"), encoding="utf-8").read()
lib = a13[a13.index("def sfx_beep"):a13.index("SFX = []")]

moments = '''# ---- key moments (mirror of the constants in _scenes14.js)
tA = L[4] + .1; tB = L[4] + .75; tC = L[4] + 1.3
tRk0 = L[5] + 1.1; tFreeze = L[5] + 3.2; tGo = L[6] + .1; tPick = L[7] - .25
tPeel = L[8] + .1; tLand = W(8, 5) + .05; tDrop = tLand - .4
tHic = [W(9, 0), W(9, 1), W(9, 2)]
tPop = W(10, 2)
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_hic(f=900):
    t = T(.13); fr = f * (1 + .6 * np.exp(-t * 30))
    return np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t * 20) * .5
def sfx_goo(d=.7):
    t = T(d); f = 420 + 700 * (t / d) ** 1.5 + 30 * np.sin(2 * np.pi * 18 * t)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .3 + lowpass(rng.standard_normal(len(t)), .08) * .25) * np.sin(np.pi * t / d) ** .6
def sfx_splat():
    t = T(.35); n = rng.standard_normal(len(t)); y = lowpass(n, .2) - lowpass(n, .015)
    return y * np.exp(-t * 12) * 1.0 + np.sin(2 * np.pi * np.cumsum(220 * np.exp(-t * 9) + 70) / SR) * np.exp(-t * 11) * .6
def sfx_plop():
    t = T(.18); f = 200 + 500 * np.exp(-t * 28)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 20) * .7
def sfx_bigpop():
    t = T(.3); f = 1100 * np.exp(-t * 14) + 120
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14) + lowpass(rng.standard_normal(len(t)), .3) * np.exp(-t * 40) * .6) * 1.1
def sfx_whistle():
    t = T(.35); f = 1500 + 300 * np.sin(2 * np.pi * 6 * t) - 500 * (t / .35)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / .35) * .22


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: Bo's new friend needs a name
S(.5, sfx_pop, .3)
S(W(2, 2), sfx_ting, .8); S(W(2, 2) + .03, sfx_sparkle, .55); S(W(2, 2) + .3, sfx_boing, .3)
for i in range(3): S(L[3] + .05 + i * .22, sfx_chirp, .35)
S(W(3, 0), sfx_boing, .5); S(W(3, 2), sfx_boing, .5); S(W(3, 3), sfx_heart, .5); S(W(3, 3) + .05, sfx_sparkle, .4)
# --- scene 2: bounce, bounce, SPLAT
S(L[4] - .1, sfx_gasp, .4)
S(tA, sfx_boing, .6); S(tA, lambda: sfx_whoosh(.4), .3); S(tA + .55, sfx_thud, .5); S(tA + .56, sfx_squelchj, .4)
S(tB, sfx_boing, .6); S(tB + .5, sfx_ding, .5); S(tB + .5, sfx_squelchj, .3)
S(tC, lambda: sfx_whoosh(.6), .55); S(tC, sfx_boing, .5)
S(tC + .62, sfx_splat, .9); S(tC + .64, sfx_clink, .5); S(tC + .75, sfx_clink, .3); S(tC + .9, sfx_clink, .25); S(tC + .65, sfx_sparkle, .4)
# --- scene 3: Mochi is unimpressed; the gang tries to reach
S(L[5] + .5, lambda: sfx_trumpet(.3), .4)
for k in (L[5] + .6, L[5] + 1.1): S(k, sfx_boing, .3)
for i in range(4): S(L[5] + .4 + i * .25, lambda i=i: sfx_beep(988 if i % 2 else 740, .08), .25)
for i in range(6): S(tC + 1.5 + i * 1.3, sfx_squeak, .1)
# --- scene 4: Rocky tiptoes in
for k in np.arange(tRk0, tFreeze, .28): S(k, sfx_tick, .13)
S(tFreeze + .08, sfx_eep, .35); S(tFreeze + .2, sfx_whistle, .45)
for k in np.arange(tGo, tPick, .28): S(k, sfx_tick, .13)
# --- scene 5: the pancake goes on his head
S(tPick, lambda: sfx_whoosh(.3), .4); S(tPick + .02, sfx_pop, .5); S(tPick + .4, sfx_sparkle, .35)
for k in np.arange(tPick + .4, L[8] + .5, .3): S(k, sfx_tick, .1)
# --- scene 6: sticky Jiggle peels off the ceiling
S(tPeel, lambda: sfx_goo(.9), .7)
for k in np.arange(tPeel + .2, tDrop, .22): S(k, sfx_squeak, .18)
S(tDrop, sfx_plop, .7); S(tDrop + .02, lambda: sfx_whoosh(.35), .4)
S(tLand, sfx_splat, 1.0); S(tLand + .02, sfx_boing, .5); S(tLand + .05, sfx_gasp, .45); S(tLand + .1, sfx_sparkle, .5)
for t0 in (tLand + .55, tLand + 1.15): S(t0, sfx_boing, .5); S(t0 + .04, lambda: sfx_goo(.4), .5); S(t0 + .44, sfx_splat, .4)
for k in np.arange(tLand + .5, tLand + 1.5, .14): S(k, sfx_squeak, .13)
for i in range(3): S(tLand + .95 + i * .06, sfx_pop, .25)
# --- scene 7: hic! hic! uh-oh!
for i, t in enumerate(tHic): S(t - .04, lambda i=i: sfx_hic(850 + i * 170), .8); S(t - .02, sfx_boing, .35)
S(tHic[1], lambda: sfx_swell(1.4), .5)
for k in np.arange(tHic[2], tPop, .09): S(k, sfx_tick, .1 + .15 * (k - tHic[2]) / max(.3, tPop - tHic[2]))
S(tPop - .5, lambda: sfx_riser(.5), .45)
# --- scene 8: POP! there were four
S(tPop, sfx_bigpop, .95); S(tPop, lambda: sfx_whoosh(.5), .5); S(tPop + .02, sfx_sparkle, .7); S(tPop + .12, sfx_sparkle, .5)
for i in range(4):
    t = tPop + .6 + i * .05
    S(t, sfx_thud, .3); S(t + .01, sfx_squelchj, .4); S(t + .03, sfx_boing, .3)
    S(tPop + .15 + i * .05, sfx_boing, .3)
for i in range(4): S(tPop + .9 + i * .1, sfx_chirp, .4)
S(tPop + .1, sfx_gasp, .4)
for k in np.arange(tPop + .9, tPop + 4.5, .3): S(k, sfx_tick, .1)
# --- scene 9: which one is Jiggle?
for i in range(4):
    S(L[11] + .15 + i * .28, sfx_boing, .3); S(L[11] + .2 + i * .2, sfx_chirp, .3)
S(L[11] + 1.2, sfx_boing, .25)
S(tStk, sfx_stickerpop, .9)
for i in range(4): S(tStk + .3 + i * .25, sfx_boing, .22)
S(29.4, sfx_sparkle, .55)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; the series tune again) ----------
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
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_intro = t < tA - .1
    sec_bounce = tA - .1 <= t < L[5]
    sec_dry = L[5] <= t < tRk0
    sec_sneak = tRk0 <= t < tPeel
    sec_chaos = tPeel <= t < tPop
    sec_fin = tPop <= t
    if sec_intro:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .2)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(ARPU[(k // 2) % 8]), .5), .17)
        if e == 0: add(music, t, bass(midi(root), .8), .4)
        if e % 2 == 1 and t > L[3]: add(music, t, shaker(), .25)
        continue
    if sec_dry:
        if e in (0, 4): add(music, t, bass(midi(28 if bar % 2 == 0 else 31), .9), .5)
        if e % 2 == 1: add(music, t, pizz(midi(40 + 2 * (k % 3)), .1), .22)
        continue
    if sec_sneak:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .34)
        if e == 0: add(music, t, bass(midi(33), .9), .42)
        if e in (3, 7): add(music, t, marimba(midi(SNEAK[e] + 24), .2), .12)
        continue
    if sec_chaos:
        if e in (0, 4): add(music, t, bass(midi(root), .35), .5)
        if e in (0, 2, 4, 6): add(music, t, kick(), .4)
        if e % 2 == 1: add(music, t, shaker(), .35)
        add(music, t, marimba(midi(ARPU[k % 8] + (12 if t - tPeel > 2 else 0)), .22), .16 + .12 * min(1, (t - tPeel) / max(1, tPop - tPeel)))
        continue
    sv = 1.0 if (sec_bounce or sec_fin) else .8
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if sec_fin else 0)), .55), .30)
    if e in (0, 4): add(music, t, kick(), .5)
    if e in (2, 6): add(music, t, clap(), .45)
    if e % 2 == 1: add(music, t, shaker(), .4)
    if sec_fin: add(music, t, bass(midi(root + (12 if e % 2 else 0)), .3), .35)
# stingers
for j, nn in enumerate([60, 64, 67, 72]): add(music, W(2, 2) + j * .07, marimba(midi(nn + 12), .5), .22)
add(music, tC + .62, bass(midi(36), .8), .5)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tPop + j * .06, marimba(midi(nn), .5), .26)
add(music, tPop, bass(midi(36), 1.0), .6)
# the finale button
for nn in [48, 55, 60, 64, 67, 72, 76, 79]:
    add(music, 29.2, pluck(midi(nn), .9), .34)
add(music, 29.2, marimba(midi(88), .8), .4)
add(music, 29.2, bass(midi(36), 1.0), .5)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + lib + extra + events + music + tail)
print("audio.py written")
