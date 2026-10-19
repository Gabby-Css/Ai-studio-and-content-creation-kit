p = "music6_tail.py"; s = open(p, encoding="utf8").read()

# ---------- header + word painting
a = s.index("# ------------------------------------------------------------------ \"Gizmo's Counting Machine\"")
b = s.index("def robot_arp(")
new_top = '''# ------------------------------------------------------------------ "Sound It Out": electro-pop robot party (120 BPM, TikTok-speed)
# the band stays out of the way of the tiny letter sounds (kuh, a, tuh): bars 0-2 of a word stop are thin, the party starts with the sentence (bars 3-4).
# every rhyme ending (at / ig / un) gets a two-note glockenspiel twinkle; 'beep boop' is a robot bleep.
AFTER = .035        # voice first, so the first consonant is never masked
END_OFF = {"at": 0, "ig": 4, "un": 7}

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
        if ln["sec"] != sec["i"] or ln["meta"].get("li") not in lis or ln.get("hidden"): continue
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                for s in x["syl"]: N(inst, s["t0"], s["note"] + octave, min(dmax, max(.2, s["dur"] * .9)), vel)

def end_hit(word, t, tr, vel):
    p = 79 + END_OFF[word] + tr
    N("glock", t, p, .45, int(54 * vel), jit=0); N("glock", t + .09, p + 7, .35, int(40 * vel), jit=0)

def word_paint():
    """rhyme endings get a twinkle, the sentence's key word a soft pluck, 'beep boop' is a robot bleep"""
    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        if sec["kind"] in ("intro", "outro") or ln.get("hidden"): continue
        part = ln["meta"].get("part", "")
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                word = x["text"].lower(); s0 = x["syl"][0]
                if sec["kind"] == "rhyme" and part == "end" and word in END_OFF: end_hit(word, x["t0"] + AFTER, tr, .9)
                elif sec["kind"] == "stop" and part == "sent" and word in ("meow", "wag", "hot", "dig", "beep", "yum"): N("pizz", x["t0"] + AFTER, s0["note"] + 12, .22, 50, jit=0)
                elif word == "beep": N("squarelead", x["t0"] + AFTER, 84, .12, 70, jit=0)
                elif word == "boop": N("squarelead", x["t0"] + AFTER, 79, .14, 66, jit=0)

def thin(bt, ch, nr, tr, vel=1.0):
    """a very quiet bar: kick on 1 and 3, a soft bass and nothing in the 2-8 kHz band where the little consonants live"""
    T = lambda e: bt + e * E8; r = root(ch, tr)
    DR(T(0), "kick", 74 * vel); DR(T(4), "kick", 62 * vel)
    N("synbass", T(0), r, .5, 66 * vel); N("synbass", T(4), r + 7, .5, 58 * vel)

'''
s = s[:a] + new_top + s[b:]

# ---------- word stop (5 bars) + rhyme (4 bars) replace the number stop
a = s.index("            # ============================================================ NUMBER STOP")
b = s.index("            # ============================================================ GAME")
new_stop = '''            # ============================================================ WORD STOP (5 bars: sounds 0, blend 1, kids shout 2, the sentence 3-4)
            if k == "stop":
                if b == 0:
                    thin(bt, ch, nr, tr, .9); N("strings", T(0), PNO[ch][0] + tr, 2.2, 36)
                    for e in (2, 6): DR(T(e), "wood_l", 28)
                elif b == 1:
                    thin(bt, ch, nr, tr, 1.0)
                    for q, n in enumerate((0, 4, 7)): N("harp", T(5) + q * .07, 67 + tr + n, .5, 40 + 5 * q, jit=0)       # a little 'ta-da' lift after the blended word
                elif b == 2:
                    groove(bt, ch, nr, tr, .6, kick4=False, claps=False, chops=False, synth=True)                           # the kids' shout: the band thins out
                else:
                    groove(bt, ch, nr, tr, 1.0)
                    if b == 3: DR(T(0), "crash", 60)
                if b == 4:                                                                                                    # a whoosh of a fill into the next word
                    fill(bt, 90, "snare")
                    for q, n in enumerate([0, 2, 4, 5, 7, 9, 11, 12]): N("harp", T(4) + q * .06, 60 + tr + n, .35, 56 + 4 * q, jit=0)
                continue
            # ============================================================ RHYME TIME (4 bars): the full groove, a twinkle on every rhyme ending
            if k == "rhyme":
                groove(bt, ch, nr, tr, 1.0, gtr=(b >= 2), synth=(b % 2 == 0))
                if b == 0: DR(T(0), "crash", 62)
                if b % 2 == 0: N("strings", T(0), PNO[ch][0] + tr, 2.2, 48); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 44)
                if last: fill(bt, 90, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
'''
s = s[:a] + new_stop + s[b:]

# ---------- recap replaces the skip counting
a = s.index("            # ============================================================ SKIP COUNTING")
b = s.index("            # ============================================================ FINALE")
new_recap = '''            # ============================================================ RECAP (6 bars): the biggest party groove
            if k == "recap":
                groove(bt, ch, nr, tr, .95 if b == 0 else 1.1, gtr=(b >= 2), synth=(b % 2 == 0))
                if b == 0: DR(T(0), "crash", 64)
                if b in (0, 2, 4): N("strings", T(0), PNO[ch][0] + tr, 2.2, 50); N("strings", T(0), PNO[ch][1] + tr + 12, 2.2, 46)
                if b % 2 == 0: N("brass", T(0), PNO[ch][0] + tr + 12, .5, 52); N("brass", T(0), PNO[ch][2] + tr + 12, .5, 50)
                if last: fill(bt, 92, "snare"); N("harp", T(4), 72 + tr, .5, 70, jit=0)
                continue
'''
s = s[:a] + new_recap + s[b:]

s = s.replace('if k in ("hook", "skip", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))', 'if k in ("hook", "recap", "fin"): double_lines(sec, "xylo", 50, (0, 1, 2, 3))')
s = s.replace('if k == "stop": double_lines(sec, "marimba", 40, (0, 2))', 'if k == "stop": double_lines(sec, "marimba", 36, (3,))')
open(p, "w", encoding="utf8").write(s); print("ok")

# ---------- music_cm_mix: risers into the party sections
p = "music_cm_mix.py"; s = open(p, encoding="utf8").read()
s = s.replace('if s["kind"] in ("hook", "skip", "fin") and s["t0"] >= 2.0', 'if s["kind"] in ("hook", "recap", "fin") and s["t0"] >= 2.0')
open(p, "w", encoding="utf8").write(s)

# ---------- sfx: the effects duck away under the letter sounds too
p = "sfx.py"; s = open(p, encoding="utf8").read()
s = s.replace('ln["meta"].get("part") in ("say", "a")]', 'ln["meta"].get("part") in ("say", "a")] + [(ln["t0"] - .03, ln["t1"] + .15) for ln in D["lines"] if not ln.get("hidden") and ln["meta"].get("part") in ("snd", "blend")]')
open(p, "w", encoding="utf8").write(s); print("sfx ok", "snd" in s)
