"""KiddoVerse LEARN #5 - "Gizmo's Counting Machine"   ORIGINAL lyrics + melodies, 120 BPM, 4/4, C major (the key lifts as the numbers grow).
A ~3 minute TikTok-speed sing-along: Gizmo's counting machine has a full ten-frame, so the crew counts on from TEN up to TWENTY, then counts by 2s, 5s and 10s.
Every number 11-20 gets a 5-bar stop:
  bar 0      lead   "Ten and three more!"            (the ten-frame is full, the extra counters drop in one by one)
  bar 1      kids   "Thirteen!"                       (Gizmo's display lights up)
  bars 2-3   lead   "Eleven, twelve, thirteen!"       (counting on - the last three numbers, a badge on each counter)
  bar 4      lead   "Thirteen apples!"                (what the machine counted)
Then three 6-bar skip-counting stops (socks in pairs, fingers on a hand, ten-frame trains) and three 4-bar quiz rounds.
One data model drives: the singer (voices + notes), the music arrangement, karaoke captions, mouth shapes and the storyboard.

Line DSL (eighth-note grid, 0.25 s):   text:NOTE:len     len in eighths.  '_:n' = rest.   'ap+' joins to the next token -> ONE sung word with several syllable-notes.
'~Word' = sung by the KIDS' choir (everything else: the lead voice).  Only the FIRST token of a word carries the ~.
"""
import re, json, os

BPM = 120
BAR = 60 / BPM * 4          # 2.0 s
EIGHTH = BAR / 8            # 0.25 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ---- number words, sung syllables (the parts JOIN to the spelling)
NUMSYL = {1: ["one"], 2: ["two"], 3: ["three"], 4: ["four"], 5: ["five"], 6: ["six"], 7: ["sev", "en"], 8: ["eight"], 9: ["nine"], 10: ["ten"],
          11: ["e", "lev", "en"], 12: ["twelve"], 13: ["thir", "teen"], 14: ["four", "teen"], 15: ["fif", "teen"], 16: ["six", "teen"], 17: ["sev", "en", "teen"],
          18: ["eigh", "teen"], 19: ["nine", "teen"], 20: ["twen", "ty"], 30: ["thir", "ty"], 40: ["for", "ty"], 50: ["fif", "ty"]}
def nword(n): return "".join(NUMSYL[n])

# ---- the ten counting stops: number, what the machine counted (picture kind, sung plural syllables), picture world, key shift
NUMS = [
    dict(n=11, obj="star",    pl=["stars"],          world="numland",  tr=-2),
    dict(n=12, obj="cookie",  pl=["cook", "ies"],    world="workshop", tr=-2),
    dict(n=13, obj="apple",   pl=["ap", "ples"],     world="hills",    tr=-2),
    dict(n=14, obj="balloon", pl=["bal", "loons"],   world="disco",    tr=0),
    dict(n=15, obj="heart",   pl=["hearts"],         world="cloud",    tr=0),
    dict(n=16, obj="fish",    pl=["fish"],           world="space",    tr=0),
    dict(n=17, obj="ball",    pl=["balls"],          world="dino",     tr=2),
    dict(n=18, obj="gem",     pl=["gems"],           world="c_blue",   tr=2),
    dict(n=19, obj="flower",  pl=["flow", "ers"],    world="c_purple", tr=2),
    dict(n=20, obj="bee",     pl=["bees"],           world="finale",   tr=2),
]
BYN = {s["n"]: s for s in NUMS}

def word(syl, notes, lens, punct=""):
    """one sung word: syllables joined with '+' (the last one carries the punctuation); notes/lens one per syllable"""
    return " ".join(f"{s}{'+' if i < len(syl) - 1 else punct}:{notes[i]}:{lens[i]}" for i, s in enumerate(syl))

def split_len(n_syl, total):
    """total eighths shared evenly over the syllables, the last one gets the remainder"""
    base = [total // n_syl] * n_syl; base[-1] += total - sum(base)
    return base

def contour(k, lo="G4", mid="A4", hi="C5"):
    """note per syllable: rising, the last syllable on the top note"""
    return [lo] if k == 1 else [lo] * (k - 2) + [mid, hi] if k > 2 else [lo, hi]

def kidify(dsl):
    """turn a lead line into a kids' line: '~' on the first token of every word"""
    out, new = [], True
    for tok in dsl.split():
        if tok.startswith("_:"): out.append(tok); new = True; continue
        out.append(("~" + tok) if new else tok); new = not tok.split(":")[0].endswith("+")
    return " ".join(out)

# ---- the lines of one counting stop
def stop_lines(sh):
    """ten-and-more (1 bar), the kids say the number (1 bar), counting on (2 bars), what the machine counted (1 bar)"""
    n = sh["n"]; m = n - 10; ms = NUMSYL[m]; sy = NUMSYL[n]; k = len(sy)
    if len(ms) == 1: plus = f"Ten:E4:2 and:G4:2 {ms[0]}:A4:2 more!:C5:2"
    else: plus = f"Ten:E4:2 and:G4:1 {ms[0]}+:A4:1 {ms[1]}:A4:2 more!:C5:2"
    if k == 1: say = f"~{sy[0]}!:C5:4 _:4"
    elif k == 2: say = "~" + word(sy, ["G4", "C5"], [2, 4], "!") + " _:2"
    else: say = "~" + word(sy, ["G4", "A4", "C5"], [2, 2, 4], "!")
    trio = [NUMSYL[n - 2], NUMSYL[n - 1], sy]; used = 0; parts = []
    for j, t in enumerate(trio):
        if j < 2:
            ln = split_len(len(t), {1: 3, 2: 4, 3: 6}[len(t)]); used += sum(ln)
            parts.append(word(t, ["G4" if j == 0 else "A4"] * len(t), ln, ","))
        else:
            last = 16 - 2 - used; ln = [2] * (len(t) - 1) + [0]; ln[-1] = last - sum(ln)
            parts.append(word(t, ["A4"] * (len(t) - 1) + ["C5"], ln, "!"))
    on = " ".join(parts) + " _:2"
    ne = 2 * k if k > 1 else 3; oe = 8 - ne; pl = sh["pl"]
    obj = word(sy, contour(k, "G4", "A4", "A4"), split_len(k, ne)) + " " + word(pl, ["A4"] * (len(pl) - 1) + ["C5"], split_len(len(pl), oe), "!")
    return [("plus", plus, 1), ("say", say, 1), ("on", on, 2), ("obj", obj, 1)]

# ---- the three skip-counting stops (6 bars: title, the numbers, the kids' echo, the total)
SKIPS = [
    dict(key="twos",  title="Count:G4:2 by:G4:2 twos!:C5:4",   vals=[2, 4, 6, 8, 10],   item="sock",
         nums="Two,:G4:3 four,:A4:3 six,:A4:3 eight,:A4:3 ten!:C5:4",
         res="Five:G4:2 pairs,:A4:2 ten:A4:2 socks!:C5:2", world="hills", tr=2),
    dict(key="fives", title="Count:G4:2 by:G4:2 fives!:C5:4",  vals=[5, 10, 15, 20],    item="hand",
         nums="Five,:G4:3 ten,:A4:3 fif+:A4:2 teen,:A4:3 twen+:A4:2 ty!:C5:3",
         res="Twen+:G4:2 ty:G4:2 fin+:A4:2 gers!:C5:2", world="cloud", tr=2),
    dict(key="tens",  title="Count:G4:2 by:G4:2 tens!:C5:4",   vals=[10, 20, 30, 40, 50], item="train",
         nums="Ten,:G4:3 twen+:A4:2 ty,:A4:1 thir+:A4:2 ty,:A4:1 for+:A4:2 ty,:A4:1 fif+:A4:2 ty!:C5:2",
         res="Five:G4:2 tens,:A4:2 fif+:A4:2 ty!:C5:2", world="numland", tr=4),
]
BYSKIP = {s["key"]: s for s in SKIPS}
def skip_lines(sk):
    return [("title", sk["title"], 1), ("nums", sk["nums"], 2), ("echo", kidify(sk["nums"]), 2), ("res", sk["res"], 1)]

# --- the hook (2 lines x 2 bars) and the other songs
HOOK = [
    "Beep:E4:2 boop!:G4:2 Ten:A4:2 is:G4:2 full!:C5:4 _:4",
    "Come:E4:2 on,:G4:2 count:A4:2 to:G4:2 twen+:E4:2 ty!:C5:4 _:2",
]
FIN_LAST = "Bye:G4:2 bye,:E4:2 num+:E4:1 bers!:E4:1 Kid+:E4:2 do:G4:2 verse!:C5:4 _:2"
INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"

# ---- the three quiz rounds: the question (1 bar), two bars of thinking, the kids' answer (bar 3)
GAMES = [
    dict(k="after", q="What:E4:1 comes:G4:1 af+:G4:1 ter:G4:1 four+:A4:1 teen?:C5:3", ans=15, cards=[15, 13, 17]),
    dict(k="count", q="How:E4:2 man+:G4:2 y:A4:2 stars?:C5:2",                       ans=16, cards=[18, 16, 14], items=16, item="star"),
    dict(k="next",  q="Two,:E4:1 four,:G4:1 six,:A4:1 what:G4:1 comes:G4:1 next?:C5:3", ans=8, cards=[10, 7, 8]),
]
def game_a(g):
    sy = NUMSYL[g["ans"]]
    w = (f"~{sy[0]}!:E4:4" if len(sy) == 1 else "~" + word(sy, ["E4"] * len(sy), split_len(len(sy), 4), "!"))
    return f"~Yes!:C5:2 ~It's:A4:2 {w}"

# ================================================================ section plan
PLAN = []
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 2)
S("hook", 4)
for i, sh in enumerate(NUMS):
    if i == 5: S("game", 4, k=0, cards=GAMES[0]["cards"], ans=GAMES[0]["ans"], tr=0)
    S("stop", 5, i=i, n=sh["n"], tr=sh["tr"])
S("game", 4, k=1, cards=GAMES[1]["cards"], ans=GAMES[1]["ans"], tr=2)
for sk in SKIPS: S("skip", 6, skip=sk["key"], tr=sk["tr"])
S("game", 4, k=2, cards=GAMES[2]["cards"], ans=GAMES[2]["ans"], tr=4)
S("fin", 2)
S("outro", 4)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

def prog_for(kind, bars):
    if kind == "intro": return ["C", "G"]
    if kind == "hook": return ["C", "G", "Am", "F"]
    if kind == "stop": return ["C", "G", "Am", "F", "C"]
    if kind == "skip": return ["C", "G", "Am", "F", "C", "G"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "fin": return ["G", "C"]
    if kind == "outro": return ["C", "F", "C", "C"]
    return ["C"] * bars
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"fin": 4}

def section_starts():
    out, bar = [], 0
    for i, (kind, bars, meta) in enumerate(PLAN):
        tr = meta.get("tr", TRANSPOSE.get(kind, 0))
        out.append(dict(i=i, kind=kind, bar0=bar, bars=bars, t0=bar * BAR, t1=(bar + bars) * BAR, prog=prog_for(kind, bars), transpose=tr, meta=meta))
        bar += bars
    return out

def parse_line(dsl, t0, transpose=0):
    pos, words, cur = 0, [], None
    for tok in dsl.split():
        parts = tok.split(":")
        if parts[0] == "_": pos += int(parts[1]); continue
        text, note, ln = parts[0], parts[1], int(parts[2])
        who = "lead"
        if text.startswith("~"): who = "kids"; text = text[1:]
        join = text.endswith("+"); text = text.rstrip("+")
        ph = None
        if "|" in text: text, ph = text.split("|", 1)
        syl = dict(note=midi(note) + transpose, t0=t0 + pos * EIGHTH, dur=ln * EIGHTH)
        if cur is None: cur = dict(parts=[text], syl=[syl], who=who, ph=ph)
        else: cur["parts"].append(text); cur["syl"].append(syl)
        pos += ln
        if not join:
            disp = "".join(cur["parts"])
            cur.update(disp=disp, text=re.sub(r"[^A-Za-z']", "", disp), t0=cur["syl"][0]["t0"], t1=cur["syl"][-1]["t0"] + cur["syl"][-1]["dur"])
            words.append(cur); cur = None
    assert cur is None, dsl
    return words, pos

def merge_brand(words):
    out, i = [], 0
    while i < len(words):
        w = words[i]
        if w["text"].lower() == "kiddo" and i + 1 < len(words) and words[i + 1]["text"].lower() == "verse":
            n = words[i + 1]
            out.append(dict(w, disp="KiddoVerse" + re.sub(r"[A-Za-z']", "", n["disp"]), t1=n["t1"], merged=True, subs=[w, n])); i += 2
        else: out.append(dict(w)); i += 1
    return out

KIDS_UNISON = {"say", "echo", "a"}

def build():
    secs = section_starts(); lines, speech, hid = [], [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))
        if dsl.lstrip().startswith("~") and mm.get("part") in KIDS_UNISON:       # the kids' short shouts are hard to understand alone: the lead voice sings along (hidden = no caption, same notes)
            w2, _ = parse_line(dsl.replace("~", ""), t0, tr)
            hid.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", hidden=True, t0=w2[0]["t0"], t1=w2[-1]["t1"], words=w2, meta=mm))
    for s in secs:
        k, t0, tr, m = s["kind"], s["t0"], s["transpose"], s["meta"]
        if k == "intro": add(s, INTRO_SUNG, t0, 8)
        elif k == "outro": add(s, OUTRO_SUNG, t0, 8)
        elif k == "hook":
            for li, dsl in enumerate(HOOK): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "fin": add(s, FIN_LAST, t0, 16, dict(li=0), tr)
        elif k in ("stop", "skip"):
            rows = stop_lines(BYN[m["n"]]) if k == "stop" else skip_lines(BYSKIP[m["skip"]]); bar = 0
            for li, (part, dsl, nb) in enumerate(rows):
                add(s, dsl, t0 + bar * BAR, 8 * nb, dict(part=part, li=li), tr); bar += nb
        elif k == "game":
            g = GAMES[m["k"]]
            add(s, g["q"], t0, 8, dict(part="q"), tr); add(s, game_a(g), t0 + 3 * BAR, 8, dict(part="a"), tr)
    lines.extend(hid)                                  # hidden lines go LAST so the storyboard's per-section line indexes stay the same
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "gizmo", "Counting machine!"), ("intro", 0, 1, 2, "all", "Let's count!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 2, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech,
                nums=[dict(n=s["n"], word=nword(s["n"]), obj=s["obj"], plural="".join(s["pl"]), world=s["world"], tr=s["tr"]) for s in NUMS],
                skips=[dict(key=s["key"], vals=s["vals"], item=s["item"], world=s["world"], tr=s["tr"], words=[nword(v) for v in s["vals"]]) for s in SKIPS],
                games=[dict(k=g["k"], ans=g["ans"], cards=g["cards"], items=g.get("items", 0), item=g.get("item", "")) for g in GAMES])

if __name__ == "__main__":
    d = build()
    here = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(os.path.join(here, "..", "data"), exist_ok=True)
    json.dump(d, open(os.path.join(here, "..", "data", "song.json"), "w"), indent=1)
    flat = lambda l: [x for w in l["words"] for x in w.get("subs", [w])]
    lo = min(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"]); hi = max(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    shortest = min(s["dur"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    print(f"bars {TOTAL_BARS}  duration {DURATION:.1f}s = {int(DURATION // 60)}:{int(DURATION % 60):02d}  sections {len(d['sections'])}  lines {len(d['lines'])}  speech {len(d['speech'])}")
    print(f"melody range midi {lo}-{hi}   shortest syllable {shortest:.2f}s")
    for sh in (NUMS[0], NUMS[2], NUMS[6], NUMS[9]):
        print("  --", sh["n"])
        for p, dsl, nb in stop_lines(sh): print("    ", p, "|", dsl)
    for sk in SKIPS:
        print("  --", sk["key"])
        for p, dsl, nb in skip_lines(sk): print("    ", p, "|", dsl)
    for g in GAMES: print("  -- game", g["k"], "|", g["q"], "|", game_a(g))
