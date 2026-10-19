"""KiddoVerse music v2 - "nursery-rhyme pop" production with REAL sampled instruments (General-MIDI SoundFont).
It plays an ORIGINAL arrangement of our own song: same chords, melody, sections and timing as song.py, so the video,
captions and vocals stay in sync. Only the production STYLE follows the reference (ukulele/nylon strums, glockenspiel +
xylophone hooks, bouncy acoustic bass, soft kit with claps/shaker/tambourine, piano + pizzicato colour); no melody,
lyric, jingle or audio from any reference is used. The 0-2 s sonic logo is our own, timed to the KVTitle letter pops.

  arrange()            -> list of note events  {t, dur, inst, note, vel, pan}
  python music_cm.py   -> renders with cm_render.render_inst() into audio/cm_stems/*.wav and audio/music_stem_cm.wav
"""
import os, json
import numpy as np
import song

HERE = os.path.dirname(os.path.abspath(__file__))
D = song.build()
BAR, E8 = song.BAR, song.EIGHTH            # 2.0 s, 0.25 s
BEAT, E16 = BAR / 4, song.EIGHTH / 2
rng = np.random.default_rng(5)

# name: (GM program, bus, default pan)      programs are General MIDI (0-based); drums use the GM percussion map
INST = {
    "uke": (24, "harm", -.28),     # nylon guitar, played in re-entrant ukulele voicings
    "gtr": (25, "harm", .32),      # steel-string layer for sparkle on big choruses
    "piano": (0, "harm", .08),
    "pizz": (45, "harm", .22),
    "strings": (48, "harm", 0.0),
    "bass": (32, "bass", 0.0),
    "tuba": (58, "bass", 0.0),
    "glock": (9, "mel", .35),
    "xylo": (13, "mel", -.35),
    "marimba": (12, "mel", -.18),
    "celesta": (8, "mel", .22),
    "musicbox": (10, "mel", -.25),
    "harp": (46, "mel", -.15),
    "whistle": (78, "mel", .30),
    "steeldr": (114, "mel", .25),
    "drums": (0, "drums", 0.0),
}
DRUM = dict(kick=36, snare=38, clap=39, chh=42, ohh=46, crash=49, ride=51, tamb=54, cowbell=56, shaker=70,
            tri=81, tri_m=80, tom_l=45, tom_m=47, tom_h=50, wood_h=76, wood_l=77, splash=55)

EV = []
def N(inst, t, note, dur, vel, pan=None, jit=.004):
    """add one note; light humanisation (timing +-jit s, velocity +-6)."""
    if t < 0: return
    j = float(rng.uniform(-jit, jit)) if jit else 0.0
    EV.append(dict(t=max(0.0, round(float(t) + j, 4)), dur=float(dur), inst=inst, note=int(note),
                   vel=int(np.clip(vel + rng.integers(-6, 7), 1, 127)), pan=INST[inst][2] if pan is None else pan))

def DR(t, name, vel, jit=.003): N("drums", t, DRUM[name], .4, vel, jit=jit)

# ------------------------------------------------------------------ harmony helpers
UKE = {"C": [67, 60, 64, 72], "G": [67, 62, 67, 71], "Am": [69, 60, 64, 69], "F": [69, 60, 65, 69]}   # strings 4..1 (re-entrant)
PNO = {"C": [60, 64, 67], "G": [59, 62, 67], "Am": [57, 60, 64], "F": [57, 60, 65]}
GTR = {"C": [48, 55, 60, 64, 67], "G": [43, 50, 55, 59, 67], "Am": [45, 52, 57, 60, 64], "F": [41, 48, 53, 57, 65]}
def root(ch, tr): return song.CHORD[ch][0] + tr          # octave-2 bass root (C2 = 36)
def third(ch): return 3 if ch == "Am" else 4
SCALE = {0, 2, 4, 5, 7, 9, 11}
def approach(nxt, tr):
    """scale tone just below the next bass root (diatonic in C major, or in D major for the +2 finale)."""
    return nxt - 1 if (nxt - 1 - tr) % 12 in SCALE else nxt - 2

def strum(t, ch, tr, vel, down=True, dur=.6, inst="uke"):
    ns = [n + tr for n in (UKE[ch] if inst == "uke" else GTR[ch])]
    ns = ns if down else ns[::-1]
    gap = .013 if down else .009
    for k, n in enumerate(ns):
        N(inst, t + k * gap, n, dur, vel * (1 - .06 * k) * (1 if down else .72), jit=.002)

def chord(inst, t, ch, tr, vel, dur, octave=0, add_bass=False):
    for n in PNO[ch]: N(inst, t, n + tr + octave, dur, vel, jit=.003)
    if add_bass: N(inst, t, root(ch, tr) + 12, dur, vel * .9)

# ------------------------------------------------------------------ melody data (lead syllables per section)
SYL = {}
for ln in D["lines"]:
    if ln["voice"] != "lead": continue
    for w in ln["words"]:
        for x in w.get("subs", [w]):
            for s in x["syl"]:
                SYL.setdefault(ln["sec"], []).append(s)

def held_answers(sec, inst, vel, ch_at):
    """call-and-response: while the singer holds a long note (>= 1 s), a mallet answers with a short chord-tone lick."""
    for s in SYL.get(sec["i"], []):
        if s["dur"] < 1.0 - 1e-6: continue
        t = s["t0"] + s["dur"] - .75; ch = ch_at(t); tr = sec["transpose"]
        base = [n + tr + 12 for n in PNO[ch]]
        for k, n in enumerate([base[0], base[1], base[2], base[0] + 12][: 3 if s["dur"] < 1.4 else 4]):
            N(inst, t + k * E16 * 1.5, n, .3, vel * (.85 + .1 * k))

def double_hook(sec, inst, vel, octave=12, only_hook=True):
    """mallet doubles the sung melody softly (only the 'Zoom, zoom, Kiddoverse!' hook by default)."""
    for s in SYL.get(sec["i"], []):
        rel = (s["t0"] - sec["t0"]) % (2 * BAR); line = int((s["t0"] - sec["t0"]) // (2 * BAR)) % 4
        if only_hook and (rel >= BAR - 1e-6 or line == 2): continue   # hook = 1st bar of chorus lines 1, 2, 4
        N(inst, s["t0"], s["note"] + octave, min(.6, s["dur"]), vel)

# ------------------------------------------------------------------ the sonic logo (0-2 s), synced to KVTitle in build/kv_logo.js
def sonic_logo():
    """Letters pop: K,i,d @ 0.00/.05/.10 | d,o @ .50/.55 | V,e,r,s,e @ 1.00..1.20 ; letter wave 1.12-1.53 ; tag 1.15 ;
    title zooms out 1.80. Kids sing Kid(E4 @0) - do(G4 @.5) - verse(C5 @1.0). All notes below are original."""
    # planet spin-in: quick harp sweep up
    for k, n in enumerate([60, 64, 67, 72, 76, 79]): N("harp", 0.0 + k * .028, n, .6, 70 + 5 * k, jit=0)
    # "Kid": burst + xylophone grace run on the three letters
    DR(0.0, "kick", 96); N("bass", 0.0, 36, .45, 92)
    for k, n in enumerate([76, 79, 84]): N("xylo", 0.0 + k * .05, n, .35, 92 + 6 * k, jit=0)
    N("glock", 0.0, 88, .9, 84, jit=0)
    # "do"
    DR(.5, "kick", 82); N("bass", .5, 43, .4, 84)
    for k, n in enumerate([79, 84]): N("xylo", .5 + k * .05, n, .35, 96 + 6 * k, jit=0)
    N("glock", .5, 91, .9, 88, jit=0)
    # "verse!" landing: full chord + crash + 5-note glockenspiel run, one note per letter V-e-r-s-e
    DR(1.0, "kick", 110); DR(1.0, "crash", 92); N("bass", 1.0, 36, .9, 100)
    strum(1.0, "C", 0, 100, dur=1.0); chord("piano", 1.0, "C", 0, 88, .95, add_bass=True)
    for k, n in enumerate([84, 88, 91, 96, 100]): N("glock", 1.0 + k * .05, n, .9, 90 + 4 * k, jit=0)
    # letter wave: celesta sparkle rising across the ten letters (45 ms apart)
    for k, n in enumerate([84, 86, 88, 91, 93, 96, 98, 100, 103, 105]): N("celesta", 1.12 + k * .045, n, .5, 56 + 3 * k, jit=0)
    DR(1.15, "tri", 70)                                    # tagline appears
    # 1.80 title zooms away: soft harp sweep down hands over to the groove at 2.0
    for k, n in enumerate([84, 79, 76, 72, 67, 64]): N("harp", 1.80 + k * .025, n, .5, 66 - 3 * k, jit=0)

# ------------------------------------------------------------------ arrangement
def ch_lookup(t):
    for s in D["sections"]:
        if s["t0"] <= t < s["t1"]:
            return s["prog"][min(len(s["prog"]) - 1, int((t - s["t0"]) // BAR))]
    return "C"

def fill(bt, vel=80, kind="snare"):
    """last two beats of a section: 16th fill."""
    if kind == "snare":
        for k in range(8): DR(bt + BAR / 2 + k * E16, "snare", vel * (.55 + .06 * k))
    elif kind == "toms":
        for k, d in enumerate(["tom_h", "tom_h", "tom_m", "tom_m", "tom_l", "tom_l", "snare", "snare"]): DR(bt + BAR / 2 + k * E16, d, vel * (.7 + .04 * k))
    elif kind == "claps":
        for k in (4, 5, 6, 7): DR(bt + k * E8, "clap", vel * (.7 + .08 * (k - 4)))

def word_paint():
    """small, playful hits that act out the lyrics (a staple of the style); all on our own words/timing."""
    for ln in D["lines"]:
        if ln["voice"] != "lead": continue
        tr = D["sections"][ln["sec"]]["transpose"]
        for w in ln["words"]:
            for x in w.get("subs", [w]):
                word, t, s0 = x["text"].lower(), x["t0"], x["syl"][0]
                if word == "clap": DR(t, "clap", 96); DR(t + .012, "clap", 70)
                elif word == "stomp": DR(t, "tom_l", 100); DR(t, "kick", 92)
                elif word == "pop": N("xylo", t, 96 + tr, .2, 92, jit=0); N("pizz", t, 84 + tr, .2, 80, jit=0)
                elif word in ("one", "two", "three", "four", "five") and ln["kind"] == "v2" and x is w:
                    N("glock", t, s0["note"] + 12, .7, 84, jit=0)
                elif word == "triangle" and x["syl"]: DR(t, "tri", 84)
                elif word in ("star", "stars") and ln["kind"] in ("v4", "bridge"):
                    for k, n in enumerate([84, 88, 91, 96]): N("celesta", t + k * .05, n + tr, .6, 62 + 4 * k, jit=0)
                elif word == "floating":
                    for k, n in enumerate([67, 69, 72, 74, 76, 79, 81, 84]): N("harp", t + k * .06, n, .5, 52 + 3 * k, jit=0)
                elif word == "rainbow" and ln["kind"] == "v1":
                    for k, n in enumerate([60, 62, 64, 67, 69, 72, 74, 76, 79, 81, 84]): N("harp", t + k * .045, n, .5, 50 + 3 * k, jit=0)
                elif word == "bye" and ln["kind"] == "outro" and s0["note"] == 67:
                    for k, n in enumerate([79, 76]): N("glock", t + k * .5, n + 12, .8, 64, jit=0)

def arrange():
    EV.clear()
    sonic_logo(); word_paint()
    for sec in D["sections"]:
        k, t0, tr, bars, prog = sec["kind"], sec["t0"], sec["transpose"], sec["bars"], sec["prog"]
        for b in range(bars):
            bt = t0 + b * BAR; ch = prog[b]; r = root(ch, tr)
            T = lambda e: bt + e * E8
            last = b == bars - 1
            # ============================================================ INTRO (logo bar handled by sonic_logo)
            if k == "intro":
                if b == 0: continue
                if b in (1, 2):                                       # "All aboard the Zoomie!" / "Ready? Ready!"
                    DR(T(0), "kick", 88); DR(T(4), "kick", 70)
                    for e in range(8): DR(T(e), "shaker", 52 + (12 if e % 2 else 0))
                    DR(T(2), "clap", 60); DR(T(6), "clap", 64)
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 66 if d else 50, d, .45)
                    N("bass", T(0), r, .45, 86); N("bass", T(3), r, .2, 66); N("bass", T(4), r + 7, .45, 80); N("bass", T(7), r + 9 if b == 1 else r + 11, .2, 66)
                    if b == 2: [N("glock", T(e), n, .5, 66) for e, n in ((5, 79), (6, 84), (7, 88))]
                if b == 3:                                            # countdown 3-2-1-Zoom on the four beats (badges + "ZOOM!")
                    for q, (n, d) in enumerate(((67, "tom_l"), (71, "tom_m"), (74, "tom_h"), (79, "crash"))):
                        DR(T(2 * q), d, 92 + 6 * q); N("xylo", T(2 * q), n + 12, .4, 96 + 5 * q, jit=0)
                        N("pizz", T(2 * q), n - 12, .3, 84 + 4 * q, jit=0)
                    for e in range(8): DR(T(e) + E16, "shaker", 44 + 5 * e)
                    for k2 in range(8): N("harp", T(6) + k2 * .055, 67 + [0, 2, 4, 5, 7, 9, 11, 12][k2], .35, 64 + 5 * k2, jit=0)
                continue
            # ============================================================ OUTRO
            if k == "outro":
                if b <= 2:
                    for e, d in ((0, True), (3, False), (4, True), (6, True)): strum(T(e), ch, tr, 64, d, .7)
                    N("bass", T(0), r, 1.0, 80); N("bass", T(4), r + 7, .9, 70)
                    if b == 0:
                        DR(T(0), "kick", 84); DR(T(4), "kick", 70); DR(T(2), "clap", 60); DR(T(6), "clap", 60); DR(T(0), "crash", 70)
                        for s in SYL.get(sec["i"], []): N("glock", s["t0"], s["note"] + 12, .6, 60)
                    for e in range(8): DR(T(e), "shaker", 40)
                if b == 3:                                            # gentle sparkle bed under "Ask a grown-up to subscribe!"
                    for e, n in enumerate([72, 76, 79, 84, 79, 76, 72, 67]): N("musicbox", T(e), n, .9, 54)
                    N("strings", T(0), 48, 2.0, 50); N("strings", T(0), 55, 2.0, 48); N("strings", T(0), 64, 2.0, 46)
                if b == 4:                                            # final cadence: logo motif answer (E-G-C) + big soft chord
                    for e, n in ((0, 76), (2, 79), (4, 84)): N("glock", T(e), n + 12, 1.4, 78, jit=0); N("xylo", T(e), n, .5, 70, jit=0)
                    strum(T(4), "C", 0, 84, dur=2.0); chord("piano", T(4), "C", 0, 70, 2.4, add_bass=True); N("bass", T(4), 36, 2.4, 82)
                    DR(T(4), "crash", 70)
                    for k2, n in enumerate([84, 88, 91, 96, 100, 103]): N("celesta", T(5) + k2 * .06, n, .6, 50 + 4 * k2, jit=0)
                continue
            # ============================================================ DANCE (calls vs echoes, FREEZE at the end)
            if k == "dance":
                if b == 7:                                            # FREEZE: one hit then silence
                    DR(T(0), "crash", 104); DR(T(0), "kick", 110); strum(T(0), ch, tr, 96, dur=.35); N("bass", T(0), r, .35, 100)
                    continue
                if b == 0:                                            # "Time for the Kiddo Wiggle!"
                    for e in range(8): DR(T(e), "shaker", 60)
                    DR(T(0), "kick", 90); DR(T(4), "kick", 86)
                    for e in (4, 5, 6, 7): DR(T(e), "clap", 70 + 8 * (e - 4))
                    N("strings", T(0), PNO[ch][0] + tr, 2.0, 52); N("strings", T(0), PNO[ch][2] + tr, 2.0, 50)
                    continue
                for e in (0, 2, 4, 6): DR(T(e), "kick", 98)          # four on the floor
                for e in (2, 6): DR(T(e), "clap", 96)
                for e in range(8): DR(T(e), "tamb", 58 + (16 if e % 2 else 0))
                for e in (1, 3, 5, 7): DR(T(e), "ohh", 44)
                for e in range(8): N("bass", T(e), r + (12 if e % 2 else 0), .22, 84 if e % 2 == 0 else 70)
                call = b in (1, 3, 5)
                if call:                                              # singer calls: bright uke + piano stabs
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 76, d, .4)
                    for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 62, .18, octave=12)
                else:                                                 # kids echo: steel drums + whistle answer the call
                    for e in (0, 2, 4, 6): N("steeldr", T(e), PNO[ch][(e // 2) % 3] + tr + 12, .3, 78)
                    for e in range(8): DR(T(e) + E16, "shaker", 48)
                    for e in (1, 3, 5, 7): DR(T(e), "cowbell", 46)
                    if b == 6:
                        for e, n in ((4, 79), (5, 81), (6, 84), (7, 86)): N("whistle", T(e), n, .22, 70)
                continue
            # ============================================================ shared section templates
            full = k in ("chorus", "fin", "fin2")
            E = {"chorus": 1.0, "fin": 1.07, "fin2": 1.12, "v1": .9, "v2": .95, "v3": .7, "v4": .92, "bridge": .82}[k]
            if full:
                DR(T(0), "kick", 104 * E); DR(T(4), "kick", 98 * E)
                if k != "chorus" and b % 2 == 1: DR(T(3), "kick", 66)          # syncopated push in the final choruses
                for e in (2, 6): DR(T(e), "clap", 98 * E); DR(T(e), "snare", 52 * E)
                for e in range(16): DR(bt + e * E16, "shaker", (60 if e % 2 else 44) * E)
                if k != "chorus":
                    for e in range(8): DR(T(e), "tamb", (64 if e % 2 else 50))
                for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)):
                    strum(T(e), ch, tr, (84 if d else 64) * E, d, .45)
                if k != "chorus" or b >= 4:
                    for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 50 * E, d, .9, inst="gtr")
                for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 46 * E, .2, octave=12)   # bouncy off-beat piano
                N("bass", T(0), r, .4, 96); N("bass", T(3), r, .2, 78); N("bass", T(4), r + 7, .4, 90)
                N("bass", T(7), approach(root(prog[(b + 1) % bars], tr), tr), .2, 74)
                if k != "chorus":
                    N("strings", T(0), PNO[ch][0] + tr, 2.0, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.0, 46)
                if b == 0: DR(T(0), "crash", 100 * E)
                if k != "chorus" and b == 4: DR(T(0), "crash", 84)
                if last:
                    fill(bt, 92, "claps" if k == "chorus" else "snare")
                if k == "fin2" and b == 7:                            # grand finale = the sonic-logo motif on the last "Kid-do-verse!"
                    EV[:] = [e for e in EV if not (bt - 1e-6 <= e["t"] < bt + BAR and e["inst"] in ("uke", "gtr", "piano", "drums", "bass"))]
                    for q, (bn, xs) in enumerate(((r, [76, 79, 84]), (r + 7, [79, 84]))):
                        DR(T(2 * q), "kick", 100); N("bass", T(2 * q), bn, .45, 92); N("glock", T(2 * q), (88, 91)[q] + tr, .9, 86, jit=0)
                        for k2, n in enumerate(xs): N("xylo", T(2 * q) + k2 * .05, n + tr, .35, 94 + 5 * k2, jit=0)
                    DR(T(4), "crash", 112); DR(T(4), "kick", 114); N("bass", T(4), r, 1.6, 104)
                    strum(T(4), ch, tr, 106, dur=1.8); chord("piano", T(4), ch, tr, 94, 1.8, add_bass=True)
                    N("strings", T(4), PNO[ch][0] + tr, 1.8, 72); N("strings", T(4), PNO[ch][2] + tr + 12, 1.8, 68)
                    for k2, n in enumerate([84, 88, 91, 96, 100]): N("glock", T(4) + k2 * .05, n + tr, 1.2, 90, jit=0)
                    for k2, n in enumerate([84, 86, 88, 91, 93, 96, 98, 100]): N("celesta", T(4) + .12 + k2 * .045, n + tr, .5, 58 + 3 * k2, jit=0)
                if b == 0:
                    double_hook(sec, "glock", 54 * E); held_answers(sec, "xylo", 76 * E, ch_lookup)
                continue
            if k == "v1":                                             # Rainbow Hills: light and sparkly
                DR(T(0), "kick", 84); DR(T(4), "kick", 64)
                for e in (2, 6): DR(T(e), "clap", 66)
                for e in range(8): DR(T(e), "shaker", 56 if e % 2 else 40)
                for e, d in ((0, True), (3, False), (4, True), (6, True), (7, False)): strum(T(e), ch, tr, (72 if d else 54), d, .5)
                N("bass", T(0), r, .5, 86); N("bass", T(4), r + 7, .45, 76)
                if b % 2 == 1: N("glock", T(6), PNO[ch][2] + 24 + tr, .8, 60)
                if b == 0: held_answers(sec, "xylo", 72, ch_lookup)
            elif k == "v2":                                           # Dino Valley: tuba + pizzicato oom-pah, toms on "stomp"
                for e in (0, 4): DR(T(e), "kick", 94); DR(T(e), "tom_l", 70)
                for e in (2, 6): DR(T(e), "clap", 72)
                for e in range(8): DR(T(e), "shaker", 44)
                N("tuba", T(0), r, .42, 98); N("tuba", T(4), r + 7, .42, 90)
                for e in (2, 6): [N("pizz", T(e), n + tr, .25, 74) for n in PNO[ch]]
                for e in (1, 3, 5, 7): N("pizz", T(e), PNO[ch][2] + tr + 12, .2, 56)
                if b == 0: held_answers(sec, "marimba", 80, ch_lookup)
            elif k == "v3":                                           # Cloud Kingdom (feelings): soft piano + strings + celesta
                if b % 2 == 0: DR(T(0), "kick", 50)
                for q in range(4): DR(T(2 * q), "shaker", 36)
                if b % 2 == 0: DR(T(0), "tri", 50)
                N("bass", T(0), r, 1.9, 70)
                N("strings", T(0), PNO[ch][0] + tr, 2.0, 58); N("strings", T(0), PNO[ch][1] + tr, 2.0, 54); N("strings", T(0), PNO[ch][2] + tr + 12, 2.0, 50)
                for e in range(8): N("piano", T(e), [PNO[ch][0], PNO[ch][1], PNO[ch][2], PNO[ch][1]][e % 4] + tr + (12 if e >= 4 else 0), .6, 52)
                if b % 2 == 1:
                    for e, n in ((4, 84), (5, 88), (6, 91), (7, 96)): N("celesta", T(e), n + tr, .6, 46)
                if b == 0: held_answers(sec, "celesta", 60, ch_lookup)
            elif k == "v4":                                           # Robot Workshop (shapes): marimba ostinato + woodblock ticks
                for e in (0, 4): DR(T(e), "kick", 92)
                for e in (2, 6): DR(T(e), "clap", 80)
                for e in range(8): DR(T(e), "wood_h" if e % 2 else "wood_l", 52)
                for e in range(16): N("marimba", bt + e * E16, [PNO[ch][0], PNO[ch][1], PNO[ch][2], PNO[ch][1]][e % 4] + tr + 12, .18, 58 + (10 if e % 4 == 0 else 0))
                for e in range(8): N("bass", T(e), r + (12 if e in (3, 7) else 0), .22, 82)
                for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 60, d, .4)
                if b == 0: held_answers(sec, "xylo", 76, ch_lookup)
            elif k == "bridge":                                       # Everyone is a star: warm, building into the key change
                DR(T(0), "kick", 72); DR(T(4), "clap", 70)
                for e in range(8): DR(T(e), "shaker", 40 + 3 * b)
                N("bass", T(0), r, 1.9, 76)
                N("strings", T(0), PNO[ch][0] + tr, 2.0, 60); N("strings", T(0), PNO[ch][1] + tr + 12, 2.0, 56); N("strings", T(0), PNO[ch][2] + tr, 2.0, 54)
                for e in range(8): N("harp", T(e), [PNO[ch][0], PNO[ch][1], PNO[ch][2], PNO[ch][1] + 12][e % 4] + tr + 12, .7, 52)
                for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 56, d, .9)
                if b == 0: held_answers(sec, "glock", 60, ch_lookup)
                if b == 7:                                            # snare build + harp glissando into the final chorus (+2)
                    for k2 in range(16): DR(bt + k2 * E16, "snare", 40 + 4 * k2)
                    for k2 in range(12): N("harp", T(4) + k2 * .08, 62 + [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19][k2], .4, 60 + 3 * k2, jit=0)
            if last and k in ("v1", "v2", "v4"):
                fill(bt, 80, "toms" if k == "v2" else "snare")
    EV.sort(key=lambda e: e["t"])
    return EV

if __name__ == "__main__":
    ev = arrange()
    json.dump(ev, open(os.path.join(HERE, "cm_events.json"), "w"))
    by = {}
    for e in ev: by[e["inst"]] = by.get(e["inst"], 0) + 1
    print(len(ev), "events", dict(sorted(by.items())), "last t", ev[-1]["t"])
