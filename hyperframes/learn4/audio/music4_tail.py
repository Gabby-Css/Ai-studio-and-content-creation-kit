# ------------------------------------------------------------------ "The Shape Workshop": electro-pop robot party (120 BPM, TikTok-speed)
# every sung shape NAME is also "said" by a little sound of its own (a vibes bell for circle, wood blocks for square, a real triangle for triangle,
# knock-knock for rectangle, bloop-bloop for oval, a glockenspiel twinkle for star, a heartbeat for heart, a celesta sparkle for diamond) - always AFTER the voice and quiet
AFTER = .035        # voice first, so the first consonant is never masked
SHAPE_NAMES = {"circle", "square", "triangle", "rectangle", "oval", "star", "heart", "diamond"}

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

def shape_hit(name, t, note, vel):
    v = vel
    if name == "circle": N("vibes", t, note + 12, .5, int(60 * v), jit=0); N("vibes", t + .12, note + 19, .4, int(46 * v), jit=0)
    elif name == "square": DR(t, "wood_h", int(70 * v)); DR(t + .16, "wood_l", int(58 * v))
    elif name == "triangle": DR(t, "tri", int(80 * v)); DR(t + .12, "tri_m", int(60 * v))
    elif name == "rectangle": DR(t, "wood_l", int(72 * v)); DR(t + .14, "wood_l", int(64 * v))
    elif name == "oval": N("marimba", t, note + 24, .16, int(46 * v), jit=0); N("marimba", t + .11, note + 29, .18, int(40 * v), jit=0)
    elif name == "star":
        for q, n in enumerate((0, 4, 7)): N("glock", t + q * .07, note + 24 + n, .5, int((56 - 4 * q) * v), jit=0)
    elif name == "heart": DR(t, "tom_l", int(54 * v)); DR(t + .16, "tom_l", int(44 * v)); N("celesta", t + .02, note + 12, .5, int(40 * v), jit=0)
    elif name == "diamond":
        for q, n in enumerate((0, 4, 7, 12)): N("celesta", t + q * .05, note + 24 + n, .45, int((52 - 3 * q) * v), jit=0)

def word_paint():
    """shape names get their own little sound; every object word gets a soft pluck; 'beep boop' is a robot bleep"""
    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        if sec["kind"] in ("intro", "outro"): continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                word = x["text"].lower(); s0 = x["syl"][0]; kids = x.get("who") == "kids"
                if word in SHAPE_NAMES and not (sec["kind"] == "game" and ln["meta"].get("part") == "q"):
                    shape_hit(word, x["t0"] + AFTER, s0["note"], .62 if kids else 1.0)
                elif ln["meta"].get("part", "").startswith("obj") and x is ln["words"][0]:
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
                if b == 0: DR(T(0), "crash", 104)
                if b in (0, 2): N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if last: fill(bt, 88, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
            # ============================================================ SHAPE STOP (7 bars: ask 0-1, chant 2-3, three objects 4-6)
            if k == "stop":
                if b == 0: robot_arp(bt, tr)
                if b < 2:                                                    # the question: lighter, a mystery shape rides the belt
                    groove(bt, ch, nr, tr, .8, kick4=False, claps=(b == 1), synth=True)
                    if b == 0:
                        for e in range(8): DR(T(e), "wood_h" if e % 2 else "wood_l", 40)      # gears ticking
                    if b == 1: DR(T(0), "tom_l", 70); N("celesta", T(4), PNO[ch][2] + tr + 24, .8, 60)
                else:                                                         # the name chant and the objects: full groove
                    groove(bt, ch, nr, tr, 1.0)
                    if b == 2: DR(T(0), "crash", 80)
                if b == 6:                                                    # a whoosh of a fill into the next shape
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
                    DR(T(0), "crash", 100); DR(T(0), "kick", 104); DR(T(4), "kick", 90)
                    for e in (2, 6): DR(T(e), "clap", 90)
                    for e in range(8): DR(T(e), "shaker", 54 + (8 if e % 2 else 0))
                    for e, d in ((0, True), (2, True), (3, False), (5, False), (6, True), (7, False)): strum(T(e), ch, tr, 84 if d else 62, d, .45)
                    N("bass", T(0), r, .4, 96); N("bass", T(4), r + 7, .4, 88)
                    for j, n in enumerate((84, 88, 91, 96)): N("glock", T(0) + j * .06, n + tr, 1.0, 84, jit=0)
                continue
            # ============================================================ SHAPE YOGA: a lighter half-time groove, then silence for FREEZE!
            if k == "yoga":
                if b < 2:
                    DR(T(0), "kick", 96); DR(T(4), "kick", 86); DR(T(4), "clap", 90); DR(T(4), "snare", 46)
                    for e in range(8): DR(T(e), "shaker", 50); DR(T(e), "tamb", 44) if e % 2 else None
                    for e, d in ((0, True), (3, False), (4, True), (7, False)): strum(T(e), ch, tr, 70, d, .45)
                    N("synbass", T(0), r, .8, 92); N("synbass", T(4), r + 7, .6, 84)
                    N("strings", T(0), PNO[ch][0] + tr, 2.2, 46); N("strings", T(0), PNO[ch][2] + tr, 2.2, 42)
                elif b == 2:
                    DR(T(0), "kick", 96); DR(T(4), "kick", 86); DR(T(4), "clap", 90)
                    for e in range(8): DR(T(e), "shaker", 50)
                    for e, d in ((0, True), (3, False), (4, True), (7, False)): strum(T(e), ch, tr, 72, d, .45)
                    N("synbass", T(0), r, .8, 92)
                    for e in range(4, 8): DR(T(e), "snare", 40 + 8 * (e - 4))                   # a little build into the freeze
                else:                                                                        # bar 3: STAR POSE ... FREEZE! then a held shimmer (the pose) and a riser into the house
                    DR(T(0), "kick", 90); DR(T(0), "crash", 80); N("strings", T(0), PNO[ch][0] + tr, 2.2, 52)
                    for q, n in enumerate((96, 100, 103, 108)): N("celesta", T(2) + q * .06, n, 1.2, 60 - 4 * q, jit=0)
                    for e in range(5, 8): N("glock", T(e), 96 + tr, .4, 40 + 6 * (e - 5), jit=0)
                continue
            # ============================================================ BUILD A HOUSE (key up): the biggest party groove, a pop on every shape word
            if k == "house":
                groove(bt, ch, nr, tr, 1.1, gtr=True, synth=(b % 2 == 0))
                if b == 0: DR(T(0), "crash", 108)
                N("strings", T(0), PNO[ch][0] + tr, 2.2, 52); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 48)
                if b % 2 == 0: N("brass", T(0), PNO[ch][0] + tr + 12, .5, 56); N("brass", T(0), PNO[ch][2] + tr + 12, .5, 54)
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
        if k in ("hook", "house", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))
        if k == "stop": double_lines(sec, "marimba", 40, (0, 1))
    EV.sort(key=lambda e: e["t"])
    return EV

if __name__ == "__main__":
    ev = arrange()
    json.dump(ev, open(os.environ.get("CM_EVENTS") or os.path.join(HERE, "cm_events.json"), "w"))
    by = {}
    for e in ev: by[e["inst"]] = by.get(e["inst"], 0) + 1
    print(len(ev), "events", dict(sorted(by.items())), "last t", ev[-1]["t"])
