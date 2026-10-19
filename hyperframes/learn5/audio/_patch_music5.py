p = "music5_tail.py"; s = open(p, encoding="utf8").read()

# ---------- header + word painting
a = s.index("# ------------------------------------------------------------------ \"The Shape Workshop\"")
b = s.index("def robot_arp(")
new_top = '''# ------------------------------------------------------------------ "Gizmo's Counting Machine": electro-pop robot party (120 BPM, TikTok-speed)
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
        if sec["kind"] in ("intro", "outro"): continue
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

'''
s = s[:a] + new_top + s[b:]

# ---------- stop section (5 bars) replaces the 7-bar shape stop
a = s.index("            # ============================================================ SHAPE STOP")
b = s.index("            # ============================================================ GAME")
new_stop = '''            # ============================================================ NUMBER STOP (5 bars: ten-and-more 0, kids' number 1, counting on 2-3, the counted things 4)
            if k == "stop":
                if b == 0:
                    robot_arp(bt, tr)
                    groove(bt, ch, nr, tr, .8, kick4=False, claps=False, synth=True)
                    for e in range(8): DR(T(e), "wood_h" if e % 2 else "wood_l", 40)      # counters ticking into the frame
                elif b == 1:
                    groove(bt, ch, nr, tr, 1.0); DR(T(0), "crash", 80); DR(T(0), "tom_l", 70)
                else:
                    groove(bt, ch, nr, tr, 1.0)
                    if b == 2: N("celesta", T(4), PNO[ch][2] + tr + 24, .8, 52)
                if b == 4:                                                    # a whoosh of a fill into the next number
                    fill(bt, 90, "snare")
                    for q, n in enumerate([0, 2, 4, 5, 7, 9, 11, 12]): N("harp", T(4) + q * .06, 60 + tr + n, .35, 56 + 4 * q, jit=0)
                continue
'''
s = s[:a] + new_stop + s[b:]

# ---------- skip section replaces yoga + house
a = s.index("            # ============================================================ SHAPE YOGA")
b = s.index("            # ============================================================ FINALE")
new_skip = '''            # ============================================================ SKIP COUNTING (6 bars): the party groove, a pulse on every counted number (word_paint)
            if k == "skip":
                groove(bt, ch, nr, tr, .92 if b == 0 else 1.08, gtr=(b >= 3), synth=(b % 2 == 0))
                if b == 0: DR(T(0), "crash", 96)
                if b in (0, 2, 4): N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if b % 2 == 0: N("brass", T(0), PNO[ch][0] + tr + 12, .5, 52); N("brass", T(0), PNO[ch][2] + tr + 12, .5, 50)
                if last: fill(bt, 92, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
'''
s = s[:a] + new_skip + s[b:]

# ---------- melody doubling per section kind
s = s.replace('if k in ("hook", "house", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))', 'if k in ("hook", "skip", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))')
s = s.replace('if k == "stop": double_lines(sec, "marimba", 40, (0, 1))', 'if k == "stop": double_lines(sec, "marimba", 40, (0, 2))')
open(p, "w", encoding="utf8").write(s); print("ok")
