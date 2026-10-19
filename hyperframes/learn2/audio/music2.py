"""KiddoVerse music v3 (LEARN #2 "The Color Train") - "nursery-rhyme pop" with REAL sampled instruments (General-MIDI SoundFont).
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
    "flute": (73, "mel", -.1),
    "brass": (61, "harm", .05),
    "vibes": (11, "mel", .3),
    "banjo": (105, "harm", -.2),
    "synbass": (38, "bass", 0.0),
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

def double_all(sec, inst, vel, octave=12, dmax=.35):
    """a mallet doubles EVERY sung syllable of the section (counting ladder, letters, words): helps little ears hear the pitch."""
    for s in SYL.get(sec["i"], []): N(inst, s["t0"], s["note"] + octave, min(dmax, max(.18, s["dur"])), vel)

def letter_sparkle(sec):
    """at each letter-line's WORD (apple, ball ...) a glockenspiel + celesta twinkle lands with the picture."""
    for ln in D["lines"]:
        if ln["sec"] != sec["i"] or ln["kind"] != "abc": continue
        ws = [x for w in ln["words"] for x in (w.get("subs") or [w])]
        if len(ws) < 3: continue
        n = ws[2]["syl"][0]["note"] + 12; t = ws[2]["t0"]
        N("glock", t, n, .8, 70, jit=0); N("celesta", t + .07, n + 7, .6, 52, jit=0)

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

# ------------------------------------------------------------------ new helpers for "The Color Train"
import re
COLOR_INST = ["xylo", "marimba", "glock", "steeldr", "vibes", "celesta"]      # the melody doubler of each colour stop (a new sound for every stop)

def words_of(sec_i, who=None, part=None):
    out = []
    for ln in D["lines"]:
        if ln["sec"] != sec_i: continue
        if part and ln["meta"].get("part") != part: continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                if who is None or x.get("who") == who: out.append(x)
    return out

def double_who(sec, inst, vel, who="lead", octave=12, dmax=.5, tmin=None, tmax=None, part=None):
    """a pitched instrument plays every sung syllable of one voice type (helps little ears find the tune)"""
    for x in words_of(sec["i"], who, part):
        for s in x["syl"]:
            if tmin is not None and not (tmin <= s["t0"] < tmax): continue
            N(inst, s["t0"], s["note"] + octave, min(dmax, max(.2, s["dur"] * .9)), vel)

def word_paint():
    """small playful hits that act out the lyrics: whistle on 'toot', harp run on 'rainbow', glock on 'hooray'"""
    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                word, t = x["text"].lower(), x["t0"]
                if word == "toot":                      # the toy whistle ANSWERS the word (after it), so it never hides the word
                    N("whistle", t + .32, 91 + tr, .14, 64, jit=0); N("whistle", t + .45, 91 + tr, .14, 52, jit=0)
                elif word in ("hooray", "ray") and ln["kind"] == "rainbow":
                    N("glock", t, 96, 1.2, 80, jit=0)

def train_groove(bt, vel=1.0):
    """steam-train shuffle on the shaker: accents on the 'e' and 'a' of every beat"""
    for e in range(16):
        DR(bt + e * E16, "shaker", (62 if e % 4 in (1, 3) else 40) * vel)

def arrange():
    EV.clear()
    sonic_logo(); word_paint()
    secs = D["sections"]
    for si, sec in enumerate(secs):
        k, t0, tr, bars, prog = sec["kind"], sec["t0"], sec["transpose"], sec["bars"], sec["prog"]
        nxt = secs[si + 1] if si + 1 < len(secs) else None
        for b in range(bars):
            bt = t0 + b * BAR; ch = prog[b]; r = root(ch, tr)
            T = lambda e: bt + e * E8
            last = b == bars - 1
            # ============================================================ INTRO
            if k == "intro":
                if b == 0: continue
                if b in (1, 2):
                    DR(T(0), "kick", 88); DR(T(4), "kick", 70)
                    for e in range(8): DR(T(e), "shaker", 52 + (12 if e % 2 else 0))
                    DR(T(2), "clap", 60); DR(T(6), "clap", 64)
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 66 if d else 50, d, .45)
                    N("bass", T(0), r, .45, 86); N("bass", T(3), r, .2, 66); N("bass", T(4), r + 7, .45, 80); N("bass", T(7), r + 9 if b == 1 else r + 11, .2, 66)
                    if b == 2: [N("glock", T(e), n, .5, 66) for e, n in ((5, 79), (6, 84), (7, 88))]
                if b == 3:
                    for q, (n, d) in enumerate(((67, "tom_l"), (71, "tom_m"), (74, "tom_h"), (79, "crash"))):
                        DR(T(2 * q), d, 92 + 6 * q); N("xylo", T(2 * q), n + 12, .4, 96 + 5 * q, jit=0); N("pizz", T(2 * q), n - 12, .3, 84 + 4 * q, jit=0)
                    for e in range(8): DR(T(e) + E16, "shaker", 44 + 5 * e)
                    for k2 in range(8): N("harp", T(6) + k2 * .055, 67 + [0, 2, 4, 5, 7, 9, 11, 12][k2], .35, 64 + 5 * k2, jit=0)
                continue
            # ============================================================ OUTRO (6 bars: groove, groove, music box, final chord, lullaby x2)
            if k == "outro":
                if b <= 1:
                    for e, d in ((0, True), (3, False), (4, True), (6, True)): strum(T(e), ch, tr, 64, d, .7)
                    N("bass", T(0), r, 1.0, 80); N("bass", T(4), r + 7, .9, 70)
                    if b == 0:
                        DR(T(0), "kick", 84); DR(T(4), "kick", 70); DR(T(2), "clap", 60); DR(T(6), "clap", 60); DR(T(0), "crash", 70)
                        for s in SYL.get(sec["i"], []): N("glock", s["t0"], s["note"] + 12, .6, 60)
                    for e in range(8): DR(T(e), "shaker", 40)
                if b == 2:
                    for e, n in enumerate([72, 76, 79, 84, 79, 76, 72, 67]): N("musicbox", T(e), n, .9, 54)
                    N("strings", T(0), 48, 2.2, 50); N("strings", T(0), 55, 2.2, 48); N("strings", T(0), 64, 2.2, 46)
                if b == 3:
                    for e, n in ((0, 76), (2, 79), (4, 84)): N("glock", T(e), n + 12, 1.4, 78, jit=0); N("xylo", T(e), n, .5, 70, jit=0)
                    strum(T(4), "C", 0, 84, dur=2.0); chord("piano", T(4), "C", 0, 70, 2.4, add_bass=True); N("bass", T(4), 36, 2.4, 82); DR(T(4), "crash", 70)
                    for k2, n in enumerate([84, 88, 91, 96, 100, 103]): N("celesta", T(5) + k2 * .06, n, .6, 50 + 4 * k2, jit=0)
                if b >= 4:
                    fade = max(.25, 1 - .4 * (b - 4))
                    for e, n in enumerate([72, 76, 79, 84, 79, 76, 72, 67]): N("musicbox", T(e), n, .9, int(50 * fade))
                    N("strings", T(0), 48, 2.2, int(44 * fade)); N("strings", T(0), 55, 2.2, int(42 * fade)); N("strings", T(0), 64, 2.2, int(40 * fade))
                continue
            # ============================================================ STORY: sad rainbow -> brave decision (8 bars)
            if k == "story":
                if b < 4:
                    if b % 2 == 0: DR(T(0), "tom_l", 46)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 52); N("strings", T(0), PNO[ch][2] + tr, 2.2, 48)
                    for e in range(8): N("piano", T(e), [PNO[ch][0], PNO[ch][1], PNO[ch][2], PNO[ch][1]][e % 4] + tr + (12 if e >= 4 else 0), .5, 38 + (6 if e % 4 == 0 else 0))
                    N("bass", T(0), r, 1.9, 58)
                    if b in (1, 3): N("celesta", T(6), PNO[ch][2] + tr + 24, 1.0, 46)
                else:
                    q = b - 4
                    DR(T(0), "kick", 70 + 4 * q); DR(T(4), "kick", 60 + 4 * q)
                    for e in (2, 6): DR(T(e), "clap", 56 + 4 * q)
                    for e in range(8): DR(T(e), "shaker", 40 + 3 * q + (8 if e % 2 else 0))
                    for e, d in ((0, True), (3, False), (4, True), (7, False)): strum(T(e), ch, tr, 56 + 4 * q, d, .45)
                    N("bass", T(0), r, .5, 76); N("bass", T(4), r + 7, .5, 70)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 50 + 3 * q); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46 + 3 * q)
                    if b == 7:
                        for k2 in range(16): DR(bt + k2 * E16, "snare", 36 + 4 * k2)
                        for k2 in range(12): N("harp", T(4) + k2 * .08, 62 + [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19][k2], .4, 56 + 3 * k2, jit=0)
                if b == 0: double_who(sec, "celesta", 44, "lead", 12, .6)
                continue
            # ============================================================ COLOUR STOP (12 bars): arrive 0-1, echo 2-3, objects 4-9, question 10, answer 11
            if k == "stop":
                ci = sec["meta"]["i"]; lead_inst = COLOR_INST[ci]
                part = "arrive" if b < 2 else "echo" if b < 4 else "obj" if b < 10 else "qa"
                if part in ("arrive", "echo", "obj") or b == 11:
                    DR(T(0), "kick", 98); DR(T(4), "kick", 84)
                    for e in (2, 6): DR(T(e), "clap", 82); DR(T(e), "snare", 40)
                    for e in range(8): DR(T(e), "shaker", 54 + (10 if e % 2 else 0))
                    if part == "arrive": train_groove(bt, .7)
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 74 if d else 56, d, .45)
                    for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 40, .2, octave=12)
                    N("bass", T(0), r, .4, 94); N("bass", T(3), r, .2, 76); N("bass", T(4), r + 7, .4, 88); N("bass", T(7), approach(root(prog[(b + 1) % len(prog)], tr), tr), .2, 72)
                    if part == "echo":
                        for e in range(8): DR(T(e), "tamb", 52 + (14 if e % 2 else 0))
                if part == "arrive" and b == 1:                                           # "Here's RED!" lands on beat 3 of this bar
                    DR(T(4), "crash", 100); N("glock", T(4), PNO[ch][2] + tr + 24, 1.4, 86)
                    for q, n in enumerate((72, 76, 79, 84)): N(lead_inst, T(4) + q * .06, n + tr, .5, 84 + 3 * q, jit=0)
                if part == "arrive" and b == 0: N("whistle", T(0), 91 + tr, .18, 80, jit=0)
                if part == "echo" and b == 2: double_who(sec, lead_inst, 46, "kids", 12, .3, t0 + 2 * BAR, t0 + 4 * BAR)
                if part == "obj":
                    for e in (2, 6): [N("pizz", T(e), n + tr, .25, 62) for n in PNO[ch]]
                    if b % 2 == 0: double_who(sec, lead_inst, 52, "lead", 12, .4, bt, bt + 2 * BAR)
                    if b % 2 == 1:
                        for e, n in ((4, PNO[ch][2]), (5, PNO[ch][1]), (6, PNO[ch][0])): N(lead_inst, T(e), n + tr + 24, .35, 70, jit=0)
                if b == 10:                                                              # the question: thin, with thinking ticks
                    DR(T(0), "kick", 70); N("bass", T(0), r, 1.0, 66)
                    for e in range(8): DR(T(e), "shaker", 40)
                    for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 56, d, .5)
                    for e in (4, 5, 6, 7): DR(T(e), "wood_h" if e % 2 else "wood_l", 62)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 42); N("strings", T(0), PNO[ch][2] + tr + 12, 2.2, 38)
                    double_who(sec, "celesta", 46, "lead", 12, .4, bt, bt + BAR)
                if b == 11:                                                              # the answer: TA-DA on the kids' word (beat 3)
                    DR(T(4), "crash", 104); N("glock", T(4), PNO[ch][2] + tr + 24, 1.6, 90)
                    for q, n in enumerate((84, 88, 91, 96)): N("celesta", T(4) + .05 * q, n + tr, .7, 70 + 4 * q, jit=0)
                    for q, n in enumerate((72, 76, 79, 84)): N(lead_inst, T(4) + q * .05, n + tr, .5, 86, jit=0)
                    if nxt and nxt["kind"] == "stop" and nxt["transpose"] != tr:           # key change coming: harp glissando + snare roll into it
                        for k2 in range(8): DR(T(4) + .65 + k2 * E16 * .9, "snare", 44 + 5 * k2)
                        for k2 in range(10): N("harp", T(5) + k2 * .07, 60 + tr + [0, 2, 4, 5, 7, 9, 11, 12, 14, 16][k2], .4, 54 + 3 * k2, jit=0)
                    elif nxt and nxt["kind"] == "rainbow":
                        for k2 in range(8): DR(T(4) + .65 + k2 * E16 * .9, "snare", 44 + 5 * k2)
                continue
            # ============================================================ RAINBOW review (8 bars)
            if k == "rainbow":
                for e in (0, 4): DR(T(e), "kick", 98)
                for e in (2, 6): DR(T(e), "clap", 92); DR(T(e), "snare", 46)
                for e in range(16): DR(bt + e * E16, "shaker", 58 if e % 2 else 42)
                for e in range(8): DR(T(e), "tamb", 56 + (12 if e % 2 else 0))
                for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 82 if d else 60, d, .45)
                for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 46, .2, octave=12)
                N("bass", T(0), r, .4, 94); N("bass", T(3), r, .2, 76); N("bass", T(4), r + 7, .4, 88)
                N("strings", T(0), PNO[ch][0] + tr, 2.2, 50 + 2 * b); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46 + 2 * b)
                if b == 0:
                    double_who(sec, "marimba", 66, "lead", 12, .45, t0, t0 + 4 * BAR)
                    double_who(sec, "glock", 60, "lead", 24, .35, t0, t0 + 4 * BAR)
                if b == 4: double_who(sec, "xylo", 62, "lead", 12, .4, t0 + 4 * BAR, t0 + 8 * BAR)
                if b == 3: DR(T(0), "crash", 96); N("glock", T(0), 96, 1.4, 80)
                if last: fill(bt, 92, "snare")
                continue
            # ============================================================ GAME
            if k == "gameintro":
                for e in (0, 4): DR(T(e), "kick", 96)
                for e in (2, 6): DR(T(e), "clap", 84)
                for e in range(8): DR(T(e), "shaker", 56 + (10 if e % 2 else 0))
                for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 78 if d else 56, d, .45)
                N("bass", T(0), r, .45, 92); N("bass", T(4), r + 7, .45, 84)
                if b == 0: N("glock", T(0), PNO[ch][2] + tr + 24, 1.2, 70); double_who(sec, "xylo", 52, "lead", 12, .4)
                else: fill(bt, 80, "claps")
                continue
            if k == "game":
                if b == 0:
                    for e in (0, 4): DR(T(e), "kick", 80)
                    for e in (2, 6): DR(T(e), "clap", 64)
                    for e in range(8): DR(T(e), "shaker", 48)
                    for e, d in ((0, True), (3, False), (4, True), (7, False)): strum(T(e), ch, tr, 66, d, .45)
                    N("bass", T(0), r, .5, 82); N("bass", T(4), r + 7, .5, 74); double_who(sec, "xylo", 54, "lead", 12, .4)
                elif b in (1, 2):
                    for e in range(0, 8, 2): DR(T(e), "wood_h" if (e // 2) % 2 == 0 else "wood_l", 64)
                    N("bass", T(0), r, .9, 62); N("bass", T(4), r + 7, .9, 58)
                    for e, n in ((1, 0), (3, 1), (5, 2), (7, 1)): N("pizz", T(e), PNO[ch][n] + tr + 12, .25, 52)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 44); N("strings", T(0), PNO[ch][2] + tr, 2.2, 40)
                    if b == 2: N("celesta", T(4), PNO[ch][2] + tr + 24, .8, 48); N("celesta", T(6), PNO[ch][1] + tr + 24, .8, 54)
                else:
                    DR(T(0), "crash", 100); DR(T(0), "kick", 104); DR(T(4), "kick", 90)
                    for e in (2, 6): DR(T(e), "clap", 90)
                    for e in range(8): DR(T(e), "shaker", 54 + (8 if e % 2 else 0))
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 84 if d else 62, d, .45)
                    N("bass", T(0), r, .4, 96); N("bass", T(4), r + 7, .4, 88)
                    for i, n in enumerate((84, 88, 91, 96)): N("glock", T(0) + i * .06, n + tr, 1.0, 84, jit=0)
                continue
            # ============================================================ HOOK CHORUS / FINALES (full band)
            E = {"chorus": 1.0, "fin": 1.07, "fin2": 1.12}[k]
            DR(T(0), "kick", 104 * E); DR(T(4), "kick", 98 * E)
            if k != "chorus" and b % 2 == 1: DR(T(3), "kick", 66)
            for e in (2, 6): DR(T(e), "clap", 98 * E); DR(T(e), "snare", 52 * E)
            for e in range(16): DR(bt + e * E16, "shaker", (60 if e % 2 else 44) * E)
            if k != "chorus":
                for e in range(8): DR(T(e), "tamb", (64 if e % 2 else 50))
            for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, (84 if d else 64) * E, d, .45)
            if k != "chorus" or b >= 4:
                for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 50 * E, d, .9, inst="gtr")
            for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 46 * E, .2, octave=12)
            N("bass", T(0), r, .4, 96); N("bass", T(3), r, .2, 78); N("bass", T(4), r + 7, .4, 90); N("bass", T(7), approach(root(prog[(b + 1) % bars], tr), tr), .2, 74)
            if k != "chorus":
                N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if b % 2 == 0: N("brass", T(0), PNO[ch][0] + tr + 12, .5, 52); N("brass", T(0), PNO[ch][2] + tr + 12, .5, 50)
            if b == 0: DR(T(0), "crash", 100 * E)
            if k != "chorus" and b == 4: DR(T(0), "crash", 84)
            if last: fill(bt, 92, "claps" if k == "chorus" else "snare")
            if k == "fin2" and b == 7:                                   # grand finale: hits on 1 and 3, then the big chord on beat 3 of the last bar
                EV[:] = [e for e in EV if not (bt - 1e-6 <= e["t"] < bt + BAR and e["inst"] in ("uke", "gtr", "piano", "drums", "bass"))]
                for q, (bn, xs) in enumerate(((r, [76, 79, 84]), (r + 7, [79, 84]))):
                    DR(T(2 * q), "kick", 100); N("bass", T(2 * q), bn, .45, 92); N("glock", T(2 * q), (88, 91)[q] + tr, .9, 86, jit=0)
                    for k2, n in enumerate(xs): N("xylo", T(2 * q) + k2 * .05, n + tr, .35, 94 + 5 * k2, jit=0)
                DR(T(4), "crash", 112); DR(T(4), "kick", 114); N("bass", T(4), r, 1.6, 104)
                strum(T(4), ch, tr, 106, dur=1.8); chord("piano", T(4), ch, tr, 94, 1.8, add_bass=True)
                N("strings", T(4), PNO[ch][0] + tr, 1.8, 72); N("strings", T(4), PNO[ch][2] + tr + 12, 1.8, 68)
                for k2, n in enumerate([84, 88, 91, 96, 100]): N("glock", T(4) + k2 * .05, n + tr, 1.2, 90, jit=0)
                for k2, n in enumerate([84, 86, 88, 91, 93, 96, 98, 100]): N("celesta", T(4) + .12 + k2 * .045, n + tr, .5, 58 + 3 * k2, jit=0)
            if b == 0 and k != "fin2":
                double_hook(sec, "glock", 54 * E); held_answers(sec, "xylo", 76 * E, ch_lookup)
    EV.sort(key=lambda e: e["t"])
    return EV

if __name__ == "__main__":
    ev = arrange()
    json.dump(ev, open(os.path.join(HERE, "cm_events.json"), "w"))
    by = {}
    for e in ev: by[e["inst"]] = by.get(e["inst"], 0) + 1
    print(len(ev), "events", dict(sorted(by.items())), "last t", ev[-1]["t"])
