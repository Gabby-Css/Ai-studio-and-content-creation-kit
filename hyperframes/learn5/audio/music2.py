"""KiddoVerse music v5 (LEARN #4 "The Shape Workshop") - "kid-pop dance" with REAL sampled instruments (General-MIDI SoundFont).
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
    # the animal "voices" (each plays its own sound word): all on the mel / harm buses so they stay bright and clear
    "oboe": (68, "mel", .15),      # duck: the nasal reed = quack
    "bassoon": (70, "harm", -.15), # pig: a snorty low reed = oink
    "sax": (65, "mel", .25),       # cat: alto sax glide = meow
    "trumpet": (56, "mel", -.2),   # horse: bright trumpet = neigh
    "timp": (47, "harm", 0.0),     # lion: timpani growl under the roar
    "squarelead": (80, "mel", .2), # the workshop robot: beep boop
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

# ------------------------------------------------------------------ "Gizmo's Counting Machine": electro-pop robot party (120 BPM, TikTok-speed)
# every sung NUMBER word 11-20 also gets a little glockenspiel twinkle that climbs the C-major scale as the numbers grow (always AFTER the voice, quiet, 2 octaves up);
# while skipping, every counted number gets a pulse of its own (wood blocks for 2s, a clap + tambourine for 5s, a deep tom for 10s). 'beep boop' is a robot bleep.
AFTER = .035        # voice first, so the first consonant is never masked
NUM_OFF = {"nine": -3, "ten": -1, "eleven": 0, "twelve": 2, "thirteen": 4, "fourteen": 5, "fifteen": 7, "sixteen": 9, "seventeen": 11, "eighteen": 12, "nineteen": 14, "twenty": 16}
SKIP_WORDS = {"two", "four", "six", "eight", "ten", "five", "fifteen", "twenty", "thirty", "forty", "fifty"}

def words_of(sec_i, who=None, part=None):
    out = []
    for ln in D["lines"]:
        if ln["sec"] != sec_i: continue
        if part and ln["meta"].get("part") != part: continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                if who is None or x.get("who") == who: out.append(x)
    return out

def double_lines(sec, inst, vel, lis, octave=12, dmax=.5):
    """a mallet plays the sung tune of the chosen lines (meta li) so little ears can find the melody"""
    for ln in D["lines"]:
        if ln["sec"] != sec["i"] or ln["meta"].get("li") not in lis: continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                for s in x["syl"]: N(inst, s["t0"], s["note"] + octave, min(dmax, max(.2, s["dur"] * .9)), vel)

def num_hit(word, t, tr, vel):
    """a two-note glockenspiel twinkle whose pitch climbs the scale with the number"""
    p = 79 + NUM_OFF[word] + tr
    N("glock", t, p, .45, int(50 * vel), jit=0); N("glock", t + .09, p + 7, .35, int(38 * vel), jit=0)

def skip_hit(kind, t, vel):
    if kind == "twos": DR(t, "wood_h", int(70 * vel)); DR(t + .09, "wood_l", int(52 * vel))
    elif kind == "fives": DR(t, "clap", int(70 * vel)); DR(t, "tamb", int(60 * vel))
    else: DR(t, "tom_l", int(84 * vel)); DR(t, "kick", int(70 * vel))

def word_paint():
    """number words get their own little sound, the counted object a soft pluck, 'beep boop' is a robot bleep"""
    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        if sec["kind"] in ("intro", "outro") or ln.get("hidden"): continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                word = x["text"].lower(); s0 = x["syl"][0]; kids = x.get("who") == "kids"; part = ln["meta"].get("part", "")
                if sec["kind"] == "stop" and word in NUM_OFF and part in ("on", "say", "obj"):
                    num_hit(word, x["t0"] + AFTER, tr, .55 if (kids or part == "on") else .9)
                elif sec["kind"] == "skip" and word in SKIP_WORDS and part in ("nums", "echo"):
                    skip_hit(sec["meta"]["skip"], x["t0"] + AFTER, .62 if kids else 1.0)
                elif sec["kind"] == "stop" and part == "obj" and x is ln["words"][-1]:
                    N("pizz", x["t0"] + AFTER, s0["note"] + 12, .22, 50, jit=0)
                elif word == "beep": N("squarelead", x["t0"] + AFTER, 84, .12, 70, jit=0)
                elif word == "boop": N("squarelead", x["t0"] + AFTER, 79, .14, 66, jit=0)

def robot_arp(t, tr=0, vel=60):
    """beep-boop-beep: the workshop tells you a new shape is coming"""
    for q, n in enumerate((84, 79, 88)): N("squarelead", t + q * .125, n + tr, .1, int(vel - 3 * q), jit=0)

def groove(bt, ch, nr, tr, vel=1.0, kick4=True, claps=True, chops=True, bass=True, gtr=False, synth=False):
    """one bar of the party groove: four-on-the-floor kick, claps on 2 and 4, open-hat offbeats, 16th shaker, tambourine,
    ukulele strums + piano offbeat chops, bouncy 8th-note bass that walks into the next chord (nr = next bar's bass root)"""
    T = lambda e: bt + e * E8; r = root(ch, tr)
    for e in ((0, 2, 4, 6) if kick4 else (0, 4)): DR(T(e), "kick", (100 if e % 4 == 0 else 86) * vel)
    if claps:
        for e in (2, 6): DR(T(e), "clap", 100 * vel); DR(T(e), "snare", 50 * vel)
    for e in range(16): DR(bt + e * E16, "shaker", (60 if e % 2 else 42) * vel)
    for e in (1, 3, 5, 7): DR(T(e), "ohh", 44 * vel); DR(T(e), "tamb", 56 * vel)
    if chops:
        for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, (84 if d else 62) * vel, d, .4)
        for e in (1, 3, 5, 7): chord("piano", T(e), ch, tr, 44 * vel, .18, octave=12)
        if gtr:
            for e in (1, 3, 5, 7): strum(T(e), ch, tr, 56 * vel, False, .3, inst="gtr")
    if bass:
        bi = "synbass" if synth else "bass"
        for e, (n, d, v) in enumerate(((r, .32, 98), (r, .18, 70), (r + 12, .22, 84), (r, .18, 72), (r + 7, .32, 92), (r + 7, .18, 68), (r + 12, .22, 82), (approach(nr, tr), .2, 74))):
            N(bi, T(e), n, d, v * vel)

def arrange():
    EV.clear()
    sonic_logo(); word_paint()
    secs = D["sections"]
    for si, sec in enumerate(secs):
        k, t0, tr, bars, prog = sec["kind"], sec["t0"], sec["transpose"], sec["bars"], sec["prog"]
        nxt = secs[si + 1] if si + 1 < len(secs) else None
        for b in range(bars):
            bt = t0 + b * BAR; ch = prog[b % len(prog)]; r = root(ch, tr)
            nr = root(prog[b + 1], tr) if b + 1 < bars else (root(nxt["prog"][0], nxt["transpose"]) if nxt else r)
            T = lambda e: bt + e * E8
            last = b == bars - 1
            # ============================================================ INTRO: bar 0 = the sonic logo, bar 1 = a one-bar build into the hook
            if k == "intro":
                if b == 0: continue
                for e in range(8): DR(T(e), "snare", 40 + 7 * e); DR(T(e), "shaker", 50)
                for q in range(4): N("xylo", T(2 * q), 84 + 2 * q + tr, .3, 84 + 6 * q, jit=0)
                for q, n in enumerate([60, 62, 64, 65, 67, 69, 71, 72]): N("harp", T(4) + q * .06, n, .35, 62 + 5 * q, jit=0)
                DR(T(0), "kick", 96); DR(T(4), "kick", 90); strum(T(0), ch, tr, 70, True, .5); N("synbass", T(0), r, .5, 90)
                continue
            # ============================================================ OUTRO (4 bars): groove, music box, final chord, lullaby
            if k == "outro":
                if b == 0:
                    groove(bt, ch, nr, tr, .62, kick4=False); DR(T(0), "crash", 70)
                if b == 1:
                    for e, n in enumerate([72, 76, 79, 84, 79, 76, 72, 67]): N("musicbox", T(e), n, .9, 54)
                    N("strings", T(0), 48, 2.2, 50); N("strings", T(0), 55, 2.2, 48); N("strings", T(0), 64, 2.2, 46)
                if b == 2:
                    for e, n in ((0, 76), (2, 79), (4, 84)): N("glock", T(e), n + 12, 1.4, 78, jit=0); N("xylo", T(e), n, .5, 70, jit=0)
                    strum(T(4), "C", 0, 84, dur=2.0); chord("piano", T(4), "C", 0, 70, 2.4, add_bass=True); N("bass", T(4), 36, 2.4, 82); DR(T(4), "crash", 70)
                    for q, n in enumerate([84, 88, 91, 96, 100, 103]): N("celesta", T(5) + q * .06, n, .6, 50 + 4 * q, jit=0)
                if b >= 3:
                    for e, n in enumerate([72, 76, 79, 84, 79, 76, 72, 67]): N("musicbox", T(e), n, .9, 22)
                    N("strings", T(0), 48, 2.2, 20); N("strings", T(0), 55, 2.2, 19)
                continue
            # ============================================================ HOOK: the full party groove with robot bleeps
            if k == "hook":
                groove(bt, ch, nr, tr, 1.0, gtr=True, synth=True)
                if b == 0: DR(T(0), "crash", 66)
                if b in (0, 2): N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if last: fill(bt, 88, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
            # ============================================================ NUMBER STOP (5 bars: ten-and-more 0, kids' number 1, counting on 2-3, the counted things 4)
            if k == "stop":
                if b == 0:
                    robot_arp(bt, tr)
                    groove(bt, ch, nr, tr, .8, kick4=False, claps=False, synth=True)
                    for e in range(8): DR(T(e), "wood_h" if e % 2 else "wood_l", 40)      # counters ticking into the frame
                elif b == 1:                                                  # the kids' number shout: the band thins out (kick, shakers, soft bass) so every word is heard
                    groove(bt, ch, nr, tr, .6, kick4=False, claps=False, chops=False, synth=True)
                else:
                    groove(bt, ch, nr, tr, 1.0)
                    if b == 2: N("celesta", T(4), PNO[ch][2] + tr + 24, .8, 52)
                if b == 4:                                                    # a whoosh of a fill into the next number
                    fill(bt, 90, "snare")
                    for q, n in enumerate([0, 2, 4, 5, 7, 9, 11, 12]): N("harp", T(4) + q * .06, 60 + tr + n, .35, 56 + 4 * q, jit=0)
                continue
            # ============================================================ GAME: the question (bar 0), thinking ticks (bars 1-2), TA-DA (bar 3)
            if k == "game":
                if b == 0:
                    for e in (0, 4): DR(T(e), "kick", 80)
                    for e in (2, 6): DR(T(e), "clap", 64)
                    for e in range(8): DR(T(e), "shaker", 48)
                    for e, d in ((0, True), (3, False), (4, True), (7, False)): strum(T(e), ch, tr, 66, d, .45)
                    N("synbass", T(0), r, .5, 82); N("synbass", T(4), r + 7, .5, 74)
                elif b in (1, 2):
                    for e in range(0, 8, 2): DR(T(e), "wood_h" if (e // 2) % 2 == 0 else "wood_l", 64)
                    N("synbass", T(0), r, .9, 62); N("synbass", T(4), r + 7, .9, 58)
                    for e, n in ((1, 0), (3, 1), (5, 2), (7, 1)): N("pizz", T(e), PNO[ch][n] + tr + 12, .25, 52)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 44); N("strings", T(0), PNO[ch][2] + tr, 2.2, 40)
                    if b == 2: N("celesta", T(4), PNO[ch][2] + tr + 24, .8, 48); N("celesta", T(6), PNO[ch][1] + tr + 24, .8, 54)
                else:
                    DR(T(0), "crash", 58); DR(T(0), "kick", 96); DR(T(4), "kick", 90)
                    for e in (2, 6): DR(T(e), "clap", 50)
                    for e in range(8): DR(T(e), "shaker", 54 + (8 if e % 2 else 0))
                    for e, d in ((0, True), (4, True)): strum(T(e), ch, tr, 60, d, .45)
                    N("bass", T(0), r, .4, 96); N("bass", T(4), r + 7, .4, 88)
                    for j, n in enumerate((84, 88, 91, 96)): N("glock", T(0) + .5 + j * .06, n + tr, 1.0, 60, jit=0)
                continue
            # ============================================================ SKIP COUNTING (6 bars): the party groove, a pulse on every counted number (word_paint)
            if k == "skip":
                groove(bt, ch, nr, tr, .92 if b == 0 else 1.08, gtr=(b >= 3), synth=(b % 2 == 0))
                if b == 0: DR(T(0), "crash", 64)
                if b in (0, 2, 4): N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if b % 2 == 0: N("brass", T(0), PNO[ch][0] + tr + 12, .5, 52); N("brass", T(0), PNO[ch][2] + tr + 12, .5, 50)
                if last: fill(bt, 92, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
            # ============================================================ FINALE: bye bye + the big finish
            if k == "fin":
                groove(bt, ch, nr, tr, 1.1, gtr=True)
                if b == 0: DR(T(0), "crash", 108); N("strings", T(0), PNO[ch][0] + tr, 2.2, 52)
                if last:                                                      # grand finish: hits on 1 and 3, then the big chord with a glockenspiel run
                    EV[:] = [e for e in EV if not (bt - 1e-6 <= e["t"] < bt + BAR and e["inst"] in ("uke", "gtr", "piano", "drums", "bass"))]
                    for q, (bn, xs) in enumerate(((r, [76, 79, 84]), (r + 7, [79, 84]))):
                        DR(T(2 * q), "kick", 100); N("bass", T(2 * q), bn, .45, 92)
                        for j, n in enumerate(xs): N("xylo", T(2 * q) + j * .05, n + tr, .35, 94 + 5 * j, jit=0)
                    DR(T(4), "crash", 112); DR(T(4), "kick", 114); N("bass", T(4), r, 1.6, 104); strum(T(4), ch, tr, 106, dur=1.8); chord("piano", T(4), ch, tr, 94, 1.8, add_bass=True)
                    for j, n in enumerate([84, 88, 91, 96, 100]): N("glock", T(4) + j * .05, n + tr, 1.2, 90, jit=0)
                continue
        # the tune on a mallet where the hook words are
        if k in ("hook", "skip", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))
        if k == "stop": double_lines(sec, "marimba", 40, (0, 2))
    EV.sort(key=lambda e: e["t"])
    return EV

if __name__ == "__main__":
    ev = arrange()
    json.dump(ev, open(os.environ.get("CM_EVENTS") or os.path.join(HERE, "cm_events.json"), "w"))
    by = {}
    for e in ev: by[e["inst"]] = by.get(e["inst"], 0) + 1
    print(len(ev), "events", dict(sorted(by.items())), "last t", ev[-1]["t"])
