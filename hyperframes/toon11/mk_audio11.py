"""Generate toon11/audio.py from the toon3 audio engine (instruments + voice chain) and this episode's SFX / music cues."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
v3 = open(os.path.join(HERE, "..", "toon3", "audio.py"), encoding="utf-8").read()

head = v3[:v3.index("# ---- key moments")]
head = head.replace("'Bo and the Pancake 3: Honey Trouble'", "'Bo and the Pancake 11: Blast Off!'").replace("_scenes3.js", "_scenes11.js")
inst = v3[v3.index("def midi"):v3.index("SFX = []")]
tail = v3[v3.index("# ducking"):]

moments = r'''# ---- key moments (mirror of the constants in _scenes11.js)
RAMP_B = 1070
X0 = {'cm': 560, 'nm': 690, 'mc': 820, 'tf': 1510, 'zp': 1620, 'bp': 1100, 'bo': 1360, 'pt': 1290, 'gm': 1960}
tEnter = {'cm': 3.6, 'nm': 3.85, 'mc': 4.1, 'tf': 4.35, 'pt': 4.6, 'gm': 3.9, 'zp': 4.8, 'bo': 5.0, 'bp': 5.3}
tCut = L[3] - .1
tCd = [W(5, 0), W(5, 1), W(5, 2)]; tLaunch = W(5, 3)
tMoon = L[7] + .2
tComet = L[9] - .25
tPlanet = L[10] + .1
tStk = L[11] + DU[11] + .35


'''

newsfx = r'''def sfx_beep(f=880, d=.11):
    t = T(d); return np.sin(2 * np.pi * f * t) * np.minimum(1, t / .004) * np.minimum(1, (d - t) / .02) * .4
def sfx_servo(d=.35):
    t = T(d); f = 380 + 900 * (t / d) ** .8
    s = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .25 + lowpass(rng.standard_normal(len(t)), .2) * .2
    return s * np.minimum(1, t / .02) * np.minimum(1, (d - t) / .05)
def sfx_shrink():
    t = T(.55); f = 1100 * np.exp(-t * 4.2) + 180 + 40 * np.sin(2 * np.pi * 14 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .45
def sfx_swell(d=.7):
    t = T(d); f = 180 + 900 * (t / d) ** 2
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .35 + lowpass(rng.standard_normal(len(t)), .15) * .15) * np.sin(np.pi * t / d) ** .8
def sfx_rumble(d=3.0):
    t = T(d); n = lowpass(rng.standard_normal(len(t)), .01) * 7
    s = np.sin(2 * np.pi * 48 * t + 3 * np.sin(2 * np.pi * 8 * t)) * (.6 + .4 * np.sin(2 * np.pi * 12 * t))
    return (s + n * .6) * np.minimum(1, t / .08) * np.minimum(1, (d - t) / .8) * .85
def sfx_riser(d=1.0):
    t = T(d); n = rng.standard_normal(len(t)); y = n - lowpass(n, .12)
    return y * (t / d) ** 2 * .55 + np.sin(2 * np.pi * np.cumsum(220 + 1200 * (t / d) ** 2) / SR) * (t / d) ** 2 * .2
def sfx_roar(d=.7):
    t = T(d); f = 78 + 22 * np.sin(2 * np.pi * 6 * t) - 20 * t
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = (np.sin(ph) + .7 * np.sin(2 * ph) + .5 * np.sin(3 * ph) + .35 * np.sin(4 * ph)) * (.6 + .4 * np.sin(2 * np.pi * 31 * t))
    n = lowpass(rng.standard_normal(len(t)), .12)
    return (s * .6 + n * .9) * np.minimum(1, t / .03) * np.exp(-t * 3.2) * .9
def sfx_stomp():
    t = T(.38); f = 30 + 60 * np.exp(-t * 18)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 1.4 + lowpass(rng.standard_normal(len(t)), .15) * np.exp(-t * 40) * .8


'''

events = r'''SFX = []
def S(t, fn, g=1.0): SFX.append((float(t), fn, g))

# --- scene 0/1: party over, Blip waddles to his saucer
S(.3, lambda: sfx_whoosh(.5), .35)
for k in np.arange(.9, 3.0, .17): S(k, sfx_tick, .22); S(k + .08, sfx_squeak, .1)
S(.95, sfx_pop, .4)
# --- scene 2: everybody walks up the ramp, shrinking
for p, t0 in tEnter.items():
    spd = 900 if p == 'gm' else 600
    d1 = max(.05, abs(X0[p] - RAMP_B) / spd)
    for k in np.arange(t0, t0 + d1, .16): S(k, sfx_tick, .18); S(k + .06, sfx_thud, .1)
    S(t0 + d1, sfx_shrink, .55); S(t0 + d1 + .52, sfx_pop, .45); S(t0 + d1 + .55, sfx_sparkle, .3)
S(tEnter['gm'] + 1.0, sfx_squeak, .5); S(tEnter['gm'] + 1.15, sfx_squeak, .45); S(tEnter['gm'] + 1.3, sfx_squeak, .4)
S(tEnter['gm'] + 1.45, sfx_pop, .8); S(tEnter['gm'] + 1.4, sfx_thud, .5)
# --- scene 3: the cut to the inside
S(tCut - .15, lambda: sfx_swell(.7), .6); S(tCut, lambda: sfx_whoosh(.6), .5); S(tCut + .05, sfx_sparkle, .7); S(tCut + .1, sfx_pop, .5)
for k in range(7): S(tCut + .1 + k * .06, sfx_boing, .12)
S(L[3] + .05, sfx_boing, .5); S(L[3] + .1, sfx_sparkle, .4)
# --- scene 4: Zap's safety announcement
for k in range(5): S(L[4] + .1 + k * .38, lambda: sfx_beep(740 if k % 2 else 988, .09), .35)
S(L[4], lambda: sfx_servo(.3), .4)
for i in range(8): S(W(4, 4) + i * .03, sfx_tick, .35)
S(W(4, 4) + .1, sfx_clink, .5); S(W(4, 4) + .12, sfx_sparkle, .4)
# --- scene 5: countdown + lift-off
for t in tCd: S(t, lambda: sfx_beep(660, .16), .7)
S(tLaunch - .05, lambda: sfx_beep(1320, .45), .7)
S(tLaunch - .3, lambda: sfx_riser(.4), .5)
S(tLaunch, lambda: sfx_rumble(4.0), .95); S(tLaunch, lambda: sfx_whoosh(1.8), .8); S(tLaunch + .02, sfx_stomp, .9)
S(tLaunch + .05, sfx_eep, .35); S(tLaunch + .1, sfx_eep, .3)
for k in np.arange(tLaunch + .6, tLaunch + 4.0, .5): S(k, sfx_stomp, .22)
# --- scene 6: Mochi is NOT scared
for k in np.arange(L[6] + .1, L[6] + DU[6] - .2, .3): S(k, sfx_tick, .16)
S(WE(6, 3), sfx_squeak, .3)
# --- scene 7/8: the moon, the stars
S(L[7], lambda: sfx_roar(.7), .8); S(L[7] + .02, sfx_thud, .4)
S(tMoon, lambda: sfx_whoosh(1.4), .45)
S(W(8, 4), sfx_sparkle, .5); S(W(8, 7), sfx_sparkle, .5); S(L[8] + .1, sfx_ding, .35)
# --- scene 9: the banana comet
S(tComet, lambda: sfx_whoosh(1.2), .6)
S(L[9], sfx_boing, .6); S(L[9] + .7, sfx_boing, .6); S(W(9, 1), sfx_sparkle, .5); S(W(9, 1) + .1, sfx_heart, .4)
# --- scene 10: the jelly planet
S(tPlanet, lambda: sfx_riser(2.4), .7)
S(tPlanet + .3, lambda: sfx_swell(2.0), .35)
S(tPlanet + 2.1, sfx_gasp, .7); S(tPlanet + 2.2, sfx_sparkle, .6); S(tPlanet + 2.25, sfx_ding, .5)
# --- scene 11: welcome
S(L[11] - .05, sfx_pop, .7); S(L[11], sfx_sparkle, .6)
for k in range(5): S(L[11] + .1 + k * .3, sfx_boing, .2)
S(W(11, 3), sfx_heart, .5)
S(tStk, sfx_stickerpop, .9)
S(29.4, sfx_sparkle, .5)

sfx = np.zeros(N)
for t0, fn, g in SFX:
    add(sfx, t0, fn(), g)
sfx = np.tanh(sfx * 1.1) * .85

'''

music = r'''# ---------- music (120 BPM; the same C - Am - F - G tune as the whole series; season 2 goes to space) ----------
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
SCI = [84, 88, 91, 86, 89, 93, 88, 91]
ARP = [0, 1, 2, 1, 0, 1, 2, 1]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.4: continue
    sec_party = t < 3.2
    sec_enter = 3.2 <= t < tCut
    sec_inside = tCut <= t < tCd[0] - .3
    sec_count = tCd[0] - .3 <= t < tLaunch - .05
    sec_fly = tLaunch - .05 <= t < tPlanet
    sec_planet = tPlanet <= t < L[11] - .1
    sec_end = L[11] - .1 <= t
    if sec_party:
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .16)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .45)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn), .55), .26)
        continue
    if sec_enter:
        if e % 2 == 0: add(music, t, pizz(midi(SNEAK[e] + 12), .15), .34)
        if e == 0: add(music, t, bass(midi(33), .9), .4)
        continue
    if sec_inside:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.2), .17)
        if e in (3, 6): add(music, t, marimba(midi(SCI[(k // 3) % 8]), .5), .16)
        if e == 0: add(music, t, bass(midi(root - 12 if root > 40 else root), 1.0), .4)
        continue
    if sec_count:
        if e in (0, 4): add(music, t, bass(midi(31), .6), .5)
        if e % 2 == 1: add(music, t, pizz(midi(SCI[e] - 12), .1), .28)
        continue
    if sec_fly:
        sv = .9
        if e in (0, 2, 3, 5, 7):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .2 * sv * (1.15 if e == 0 else 1))
        if e in (0, 4): add(music, t, bass(midi(root), .45), .55)
        if e == 5: add(music, t, bass(midi(root + 7), .4), .35)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .30)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .4)
        if e % 2 == 1: add(music, t, shaker(), .4)
        add(music, t, marimba(midi(chord[ARP[e]] + 24), .2), .16)
        continue
    if sec_planet:
        if e == 0:
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn), 2.0), .2)
        if e % 2 == 0: add(music, t, marimba(midi(SCI[(k // 2) % 8] - 12 + 12 * ((k * 3) % 2)), .4), .2)
        continue
    if sec_end:
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .015, pluck(midi(nn + 12), .9), .22)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .28)
        if e in (0, 4): add(music, t, kick(), .4)
        if e in (2, 6): add(music, t, clap(), .35)
        continue
# stingers
add(music, tCut, marimba(midi(88), .8), .3); add(music, tCut + .1, marimba(midi(91), .8), .26)
add(music, tLaunch, bass(midi(28), 1.6), .65)
for j, nn in enumerate([60, 64, 67, 72, 76, 79, 84]): add(music, tLaunch + j * .06, marimba(midi(nn + 12), .5), .24)
for j, nn in enumerate([72, 76, 79, 84, 88, 91]): add(music, tPlanet + 1.6 + j * .12, marimba(midi(nn), .6), .24)
add(music, L[11], bass(midi(36), 1.0), .5)
for nn in [48, 60, 64, 67, 72, 76]:
    add(music, 29.4, pluck(midi(nn), .6), .33)
add(music, 29.4, marimba(midi(84), .6), .4)

'''

open(os.path.join(HERE, "audio.py"), "w", encoding="utf-8").write(head + moments + inst + newsfx + events + music + tail)
print("audio.py written")
