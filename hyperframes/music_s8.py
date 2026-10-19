"""Season-8 music generator: adv_music(prog, sec, stingers) -> the `music = ...` code block for an _audioN.py (120 BPM, five sections).
   prog: a name in PROGS (chords/roots/melody); sec: dict of Python expressions (strings) for the section boundaries A < B < C < D
   (A: intro ends / magic starts, B: adventure starts, C: build starts, D: finale starts); stingers: extra python lines appended after the loop."""
PROGS = {
    # (chords, roots, melody [(eighth, midi)] per bar, arpeggio)
    'bright': ([[60, 64, 67], [55, 59, 62], [57, 60, 64], [53, 57, 60]], [48, 43, 45, 41],
               [[(0, 76), (2, 79), (3, 84), (4, 81), (6, 79), (7, 76)], [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)],
                [(0, 76), (2, 81), (3, 84), (4, 81), (6, 76), (7, 72)], [(0, 77), (2, 81), (3, 84), (4, 81), (6, 77), (7, 81)]], [72, 76, 79, 84, 88, 84, 79, 76]),
    'sea': ([[62, 66, 69], [57, 61, 64], [59, 62, 66], [55, 59, 62]], [50, 45, 47, 43],
            [[(0, 78), (2, 81), (3, 86), (4, 83), (6, 81), (7, 78)], [(0, 76), (2, 81), (3, 85), (4, 81), (6, 76), (7, 81)],
             [(0, 78), (2, 83), (3, 86), (4, 83), (6, 78), (7, 74)], [(0, 79), (2, 83), (3, 86), (4, 83), (6, 79), (7, 83)]], [74, 78, 81, 86, 90, 86, 81, 78]),
    'jungle': ([[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 56, 59]], [45, 41, 43, 40],
               [[(0, 76), (1, 79), (3, 81), (4, 79), (6, 76), (7, 72)], [(0, 77), (1, 81), (3, 84), (4, 81), (6, 77), (7, 74)],
                [(0, 79), (1, 83), (3, 86), (4, 83), (6, 79), (7, 76)], [(0, 76), (1, 80), (3, 83), (4, 80), (6, 76), (7, 80)]], [69, 72, 76, 81, 84, 81, 76, 72]),
    'canyon': ([[64, 67, 71], [60, 64, 67], [57, 60, 64], [59, 63, 66]], [40, 36, 45, 47],
               [[(0, 79), (2, 83), (3, 88), (4, 86), (6, 83), (7, 79)], [(0, 76), (2, 79), (3, 84), (4, 83), (6, 79), (7, 76)],
                [(0, 81), (2, 84), (3, 88), (4, 84), (6, 81), (7, 76)], [(0, 83), (2, 87), (3, 90), (4, 87), (6, 83), (7, 80)]], [76, 79, 83, 88, 91, 88, 83, 79]),
    'finale': ([[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]], [48, 45, 41, 43],
               [[(0, 76), (1, 79), (2, 84), (4, 81), (5, 79), (6, 76)], [(0, 76), (2, 81), (3, 79), (4, 76), (6, 72), (7, 76)],
                [(0, 77), (1, 81), (2, 84), (3, 81), (4, 77), (6, 79), (7, 77)], [(0, 74), (2, 79), (3, 83), (4, 79), (6, 74), (7, 79)]], [72, 76, 79, 84, 88, 91, 88, 84]),
    # Season 12 circus: oom-pah march in C major (tonic / dominant), a bouncy marimba tune
    'circus': ([[60, 64, 67], [55, 59, 62], [60, 64, 67], [55, 59, 62]], [48, 43, 48, 43],
               [[(0, 79), (1, 84), (2, 88), (3, 84), (4, 79), (6, 84)], [(0, 83), (1, 86), (2, 83), (4, 79), (5, 83), (6, 86)],
                [(0, 84), (1, 88), (2, 91), (3, 88), (4, 84), (6, 79)], [(0, 83), (2, 86), (4, 79), (6, 83), (7, 86)]], [72, 76, 79, 84, 79, 76, 72, 67]),
    # Season 13 spooky night: A minor (Am F Dm E), playful minor-key tune
    'spooky': ([[57, 60, 64], [53, 57, 60], [50, 53, 57], [52, 56, 59]], [45, 41, 38, 40],
               [[(0, 81), (1, 84), (2, 88), (4, 84), (6, 81), (7, 76)], [(0, 77), (1, 81), (2, 84), (4, 81), (6, 77), (7, 72)],
                [(0, 74), (1, 77), (2, 81), (4, 77), (6, 74), (7, 69)], [(0, 76), (1, 80), (2, 83), (4, 80), (6, 76), (7, 80)]], [69, 72, 76, 81, 76, 72, 69, 64]),
}


def adv_music(prog, segs, stingers=''):
    """segs: [(start_expr, kind), ...] in time order; kind in intro | magic | hush | drive | build | finale | march (start_expr is a python expression string)"""
    ch, roots, mel, arp = PROGS[prog]
    seg = ', '.join(f"({a}, '{k}')" for a, k in segs)
    return f'''# ---------- music (120 BPM; {prog}) ----------
music = np.zeros(N)
CH = {ch}
ROOT = {roots}
MEL = {mel}
ARPU = {arp}
SEG = [{seg}]
E8 = .25
for k in range(int(DUR / E8)):
    t = k * E8
    bar = int(t // 2) % 4; e = k % 8
    chord, root = CH[bar], ROOT[bar]
    if t >= 29.7: continue
    kind = [kk for s0, kk in SEG if t >= s0 - 1e-6][-1]
    tD = [s0 for s0, kk in SEG if kk == 'finale'][0] if any(kk == 'finale' for s0, kk in SEG) else 99
    if kind == 'intro':      # curious
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .02, pluck(midi(nn + 12), 1.0), .17)
        if e == 0: add(music, t, bass(midi(root), .9), .4)
        if e == 4: add(music, t, bass(midi(root + 7), .5), .28)
        for ee, nn in MEL[bar]:
            if ee == e and bar in (0, 2): add(music, t, marimba(midi(nn), .5), .24)
        if e % 2 == 1: add(music, t, shaker(), .22)
    elif kind == 'magic':    # marimba arpeggio over soft chords
        if e in (0, 4):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .03, pluck(midi(nn + 12), 1.4), .15)
        if e == 0: add(music, t, bass(midi(root), 1.4), .34)
        add(music, t, marimba(midi(ARPU[e]), .3), .17)
        if e in (2, 6): add(music, t, shaker(), .2)
    elif kind == 'hush':     # sparse, a held breath
        if e == 0:
            for n_i, nn in enumerate(chord): add(music, t + n_i * .05, pluck(midi(nn), 1.8), .13)
            add(music, t, bass(midi(root - 12 + 12), 1.6), .3)
        if e in (3, 7): add(music, t, marimba(midi(ARPU[(k // 2) % 8] + 12), .4), .1)
    elif kind == 'march':    # circus oom-pah: bass on the beats, chord stabs on the off-beats, a snare on 2 and 4, bouncy melody
        if e in (0, 4): add(music, t, bass(midi(root + (7 if e == 4 else 0)), .3), .52)
        if e in (2, 6):
            for n_i, nn in enumerate(chord): add(music, t + n_i * .01, pluck(midi(nn + 12), .35), .2)
            add(music, t, clap(), .38)
        if e in (0, 4): add(music, t, kick(), .38)
        if e % 2 == 1: add(music, t, shaker(), .3)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .4), .3)
    elif kind == 'drive':    # adventure drive
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .19)
        if e in (0, 4): add(music, t, kick(), .5)
        if e in (2, 6): add(music, t, clap(), .42)
        if e % 2 == 0: add(music, t, bass(midi(root + (7 if e % 4 == 2 else 0)), .3), .48)
        if e % 2 == 1: add(music, t, shaker(), .34)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .27)
    elif kind == 'build':    # denser, claps on every eighth near the end
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .5), .2)
        if e in (0, 2, 4, 6): add(music, t, kick(), .5)
        if e % 2 == 1 or t > tD - 1.2: add(music, t, clap(), .38)
        if e % 2 == 0: add(music, t, bass(midi(root), .3), .5)
        add(music, t, marimba(midi(ARPU[e] + 12), .25), .16)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .5), .27)
    else:                    # warm finale
        for n_i, nn in enumerate(chord):
            if e in (0, 2, 3, 5, 7): add(music, t + n_i * .012, pluck(midi(nn + 12), .9), .22)
        if e in (0, 4): add(music, t, kick(), .45)
        if e in (2, 6): add(music, t, clap(), .4)
        if e in (0, 4): add(music, t, bass(midi(root), .45), .52)
        for ee, nn in MEL[bar]:
            if ee == e: add(music, t, marimba(midi(nn + 12), .55), .29)
        if e % 2 == 1: add(music, t, shaker(), .34)
{stingers}
'''
