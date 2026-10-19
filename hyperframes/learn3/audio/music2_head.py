"""KiddoVerse music v4 (LEARN #3 "Animal Sounds Dance Party") - "kid-pop dance" with REAL sampled instruments (General-MIDI SoundFont).
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

