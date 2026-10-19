"""Generate toon16/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 16: The King\\'s Visit'").replace("_scenes3.js", "_scenes16.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

# the shared sfx library built up by the previous episodes (beep ... creak) comes from toon15's generated audio.py
a15 = open(os.path.join(HERE, "..", "toon15", "audio.py"), encoding="utf-8").read()
lib = a15[a15.index("def sfx_beep"):a15.index("SFX = []")]

moments = '''# ---- key moments (mirror of the constants in _scenes16.js)
tPop = W(1, 4)
tBulb = L[6] + .35
tSun = W(7, 3)
tDeal = W(8, 3)
tSlice = W(10, 5) - .2
tStk = L[11] + DU[11] + .35


'''

extra = '''def sfx_whimper(d=.55, f0=520):
    t = T(d); f = f0 * (1 - .45 * (t / d)) + 14 * np.sin(2 * np.pi * 9 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / d) ** .8 * .3
def sfx_plip():
    t = T(.12); f = 1300 - 700 * (t / .12)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 28) * .35
def sfx_patter(d=1.3):
    out = np.zeros(int(SR * d))
    for k in np.arange(0, d - .05, .11): add(out, k, sfx_tick() * .6)
    return out


'''

events = '''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 1: something is in the fridge... POP! the King squeezes out
S(.2, lambda: sfx_creak(1.0), .3)
for k in np.arange(tPop - .75, tPop - .05, .2): S(k, sfx_thump, .55)
S(tPop - .75, lambda: sfx_rumble(.8), .55); S(tPop - .45, lambda: sfx_riser(.45), .55)
S(tPop, sfx_bigpop, 1.0); S(tPop, lambda: sfx_whoosh(.5), .6); S(tPop + .02, sfx_sparkle, .7); S(tPop + .1, sfx_sparkle, .5); S(tPop + .1, sfx_gasp, .5)
S(tPop + .3, sfx_boing, .6); S(tPop + .52, sfx_stomp, .9); S(tPop + .55, sfx_squelchj, .5); S(tPop + .7, lambda: sfx_roar(.7), .3)
# --- scene 2/3: Jiggle hides, sniffles
S(L[2] + .25, sfx_eep, .45)
for k in np.arange(L[2] + .3, L[2] + .95, .16): S(k, sfx_tick, .14)
S(L[3] + .05, lambda: sfx_whimper(.5, 600), .7); S(L[3] + .55, lambda: sfx_whimper(.5, 540), .6)
for i in range(4): S(L[3] + .15 + i * .22 + .1, sfx_plip, .55)
# --- scene 4: Bo steps in
for k in np.arange(L[4] - .15, L[4] + .35, .17): S(k, sfx_tick, .15); S(k + .05, sfx_thud, .08)
S(L[4] + .4, sfx_boing, .4); S(L[4] + .05, sfx_gasp, .3)
# --- scene 5: the King is sad
S(L[5] + .05, lambda: sfx_whimper(.9, 300), .6); S(L[5] + 1.3, lambda: sfx_whimper(.9, 280), .55)
for i in range(7): S(L[5] + .25 + i * .22 + .15, sfx_plip, .5)
S(L[5] + .3, sfx_gulp, .4)
# --- scene 6: Truffle's idea
S(tBulb, sfx_ting, .8); S(tBulb + .03, sfx_sparkle, .55); S(tBulb + .2, sfx_boing, .45); S(tBulb + .8, sfx_boing, .45)
# --- scene 7: "every Sunday!"
for k in np.arange(L[7] - .25, L[7] + .5, .17): S(k, sfx_tick, .13)
S(tSun, sfx_pop, .6); S(tSun + .03, sfx_ding, .5); S(tSun + .05, sfx_sparkle, .55)
# --- scene 8: deal!
S(L[8], lambda: sfx_trumpet(.4), .3); S(L[8] + .35, sfx_gasp, .3)
for k in range(8): S(tDeal + k * .12, sfx_boing, .22)
S(tDeal, sfx_heart, .6); S(tDeal + .05, sfx_sparkle, .7); S(tDeal + .03, sfx_stomp, .5)
# --- scene 9: everybody hugs the King
S(L[9] + .05, lambda: sfx_patter(1.3), .75); S(L[9] + .02, lambda: sfx_whoosh(.5), .35)
S(L[9] + .1, sfx_boing, .5); S(L[9] + 1.0, sfx_pop, .4)
S(L[9] + 1.3, sfx_squelchj, .5); S(L[9] + 1.4, sfx_heart, .6); S(L[9] + 1.45, sfx_sparkle, .6)
S(L[9] + 1.0, lambda: sfx_cheer(1.4), .55); S(L[9] + 1.6, lambda: sfx_trumpet(.5), .25)
for i in range(5): S(L[9] + 1.5 + i * .17, sfx_boing, .22)
# --- scene 10: a tiny bite for everybody
S(L[10] - .15, sfx_pop, .7); S(L[10] - .1, sfx_sparkle, .6); S(L[10] - .15, lambda: sfx_swell(.6), .35)
for i in range(8): S(tSlice + i * .1, lambda: sfx_whoosh(.3), .22); S(tSlice + i * .1 + .55, sfx_crunch, .35)
S(tSlice + .95, sfx_gulp, .8); S(tSlice + 1.1, sfx_burp, .5); S(tSlice + .9, sfx_sparkle, .6)
S(tSlice + .6, lambda: sfx_cheer(1.5), .6); S(tSlice + .5, lambda: sfx_trumpet(.6), .3)
for i in range(6): S(tSlice + .9 + i * .1, sfx_pop, .25)
# --- scene 11: the beginning... (the saucer pings)
S(L[11] - .2, lambda: sfx_swell(.7), .3)
for i, f in enumerate([880, 1100, 1320, 1760]): S(L[11] + .4 + i * .3, lambda f=f: sfx_beep(f, .14), .5)
S(L[11] + .5, sfx_sparkle, .45); S(L[11] + 1.1, sfx_sparkle, .45)
S(tStk, sfx_stickerpop, .9)
S(29.5, sfx_sparkle, .45)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = '''# ---------- music (120 BPM; the series tune: a sad middle, a big hug, a mystery wink at the end) ----------
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
    sec_pop = t < tPop + .9                     # fridge suspense + the pop
    sec_king = tPop + .9 <= t < L[3]            # the King wants Jiggle back
    sec_sad = L[3] <= t < L[6]                  # sad middle
    sec_idea = L[6] <= t < L[8]                 # hope
    sec_hug = L[8] <= t < L[10]                 # joyful hug
    sec_feast = L[10] <= t < L[11] - .3
    sec_end = L[11] - .3 <= t
    if sec_pop:
        if e in (0, 4): add(music, t, bass(midi(33 if bar % 2 == 0 else 31), 1.0), .55)
        if e % 2 == 0: add(music, t, pizz(midi(MYST[e] + 12), .18), .24)
        if e in (3, 7): add(music, t, marimba(midi(MYST[e] + 24), .25), .12)
        continue
    if sec_king:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .3)
        if e == 0: add(music, t, bass(midi(33), .9), .42)
        continue
    if sec_sad:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 1.8), .16)
        if e in (0, 2, 4, 6): add(music, t, marimba(midi(SAD[e] + 0), .5), .2)
        if e == 0: add(music, t, bass(midi(root), 1.4), .35)
        continue
    sv = 1.0 if (sec_hug or sec_feast) else .8
    if e in (0, 2, 3, 5, 7):
        for n_i, nn in enumerate(chord):
            add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
    if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
    if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
    for ee, nn in MEL[bar]:
        if ee == e: add(music, t, marimba(midi(nn + (12 if (sec_hug or sec_feast) else 0)), .55), .30)
    if sec_end:
        if e in (0, 4): add(music, t, bass(midi(33 if bar % 2 == 0 else 31), 1.0), .5)
        if e % 2 == 0: add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .25), .14)
        continue
    if sec_hug or sec_feast:
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .45)
        if e % 2 == 1: add(music, t, shaker(), .4)
    elif sec_idea:
        if e % 2 == 1: add(music, t, shaker(), .3)
# stingers
add(music, tPop, bass(midi(28), 1.4), .7)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tPop + j * .06, marimba(midi(nn), .5), .28)
add(music, tBulb, marimba(midi(91), .6), .3)
for j, nn in enumerate([60, 64, 67, 72]): add(music, tSun + j * .07, marimba(midi(nn + 12), .5), .22)
for j, nn in enumerate([72, 76, 79, 84, 88, 91, 96]): add(music, tDeal + j * .06, marimba(midi(nn), .5), .26)
add(music, L[9] + 1.0, bass(midi(36), 1.0), .55)
add(music, tStk, marimba(midi(88), .8), .22)
# the finale: a single mystery chord
for nn in [45, 52, 57, 60, 64, 69]:
    add(music, 29.2, pluck(midi(nn), 1.0), .32)
add(music, 29.2, bass(midi(33), 1.0), .5)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + lib + extra + events + music + tail)
print("audio.py written")
