"""KiddoVerse LEARN #4 - "The Shape Workshop"   ORIGINAL lyrics + melodies, 120 BPM, 4/4, C major (key lifts at the end).
A ~3 minute TikTok-speed sing-along: Gizmo's shape machine got jumbled and the crew sorts EIGHT shapes.  Every shape gets a 7-bar stop:
  bars 0-1  "What shape is this?"  -> kids: "A circle!"        (a mystery silhouette on the conveyor belt)
  bars 2-3  the name twice + one fact ("three sides!", "round and round!")
  bars 4-6  three everyday things with that shape ("Ball is a circle!") - the shape's outline traces round each one
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

# ---- the eight shapes: key, sung name, syllables, key shift, picture world, what the shape's own sound-effect instrument is, its 3 objects (picture kind, sung word, syllables)
SHAPES = [
    dict(key="circle",    name="circle",    syl=["cir", "cle"],        tr=-2, world="c_red",    objs=[("ball", "ball", ["ball"]), ("cookie", "cookie", ["cook", "ie"]), ("orange", "orange", ["or", "ange"])]),
    dict(key="square",    name="square",    syl=["square"],            tr=-2, world="c_blue",   objs=[("quilt", "quilt", ["quilt"]), ("window", "window", ["win", "dow"]), ("gift", "gift", ["gift"])]),
    dict(key="triangle",  name="triangle",  syl=["tri", "an", "gle"],  tr=-2, world="c_yellow", objs=[("pizza", "pizza", ["piz", "za"]), ("tent", "tent", ["tent"]), ("sail", "sail", ["sail"])]),
    dict(key="rectangle", name="rectangle", syl=["rec", "tangle"], tr=0,  world="c_green",  objs=[("door", "door", ["door"]), ("book", "book", ["book"]), ("flag", "flag", ["flag"])]),
    dict(key="oval",      name="oval",      syl=["o", "val"],          tr=0,  world="c_purple", objs=[("egg", "egg", ["egg"]), ("lemon", "lemon", ["lem", "on"]), ("leaf", "leaf", ["leaf"])]),
    dict(key="star",      name="star",      syl=["star"],              tr=0,  world="c_orange", objs=[("starfish", "starfish", ["star", "fish"]), ("badge", "badge", ["badge"]), ("sticker", "sticker", ["stick", "er"])]),
    dict(key="heart",     name="heart",     syl=["heart"],             tr=2,  world="abc",      objs=[("card", "card", ["card"]), ("heartballoon", "balloon", ["bal", "loon"]), ("heartcookie", "cookie", ["cook", "ie"])]),
    dict(key="diamond",   name="diamond",   syl=["dia", "mond"],        tr=2,  world="numland",  objs=[("kite", "kite", ["kite"]), ("gem", "gem", ["gem"]), ("sign", "sign", ["sign"])]),
]
BYKEY = {s["key"]: s for s in SHAPES}

def word(syl, notes, lens, punct=""):
    """one sung word: syllables joined with '+' (the last one carries the punctuation); notes/lens one per syllable"""
    return " ".join(f"{s}{'+' if i < len(syl) - 1 else punct}:{notes[i]}:{lens[i]}" for i, s in enumerate(syl))

def split_len(n_syl, total):
    """total eighths shared evenly over the syllables, the last one gets the remainder"""
    base = [total // n_syl] * n_syl; base[-1] += total - sum(base)
    return base

# ---- what each shape says about itself (the 2-bar chant: 16 eighths)
CHANT = {
    "circle":    "Cir+:G4:2 cle,:G4:2 cir+:A4:2 cle,:A4:2 round:C5:2 and:A4:2 round!:G4:4",
    "square":    "Square,:G4:3 square,:A4:3 four:A4:2 sides!:C5:4 _:4",
    "triangle":  "Tri+:G4:1 an+:G4:1 gle,:G4:2 tri+:A4:1 an+:A4:1 gle,:A4:2 three:A4:2 sides!:C5:4 _:2",
    "rectangle": "Rec+:G4:2 tangle,:G4:2 rec+:A4:2 tangle,:A4:2 long:A4:2 and:A4:1 wide!:C5:3 _:2",
    "oval":      "O+:G4:2 val,:G4:2 o+:A4:2 val,:A4:2 like:A4:2 an:A4:1 egg!:C5:3 _:2",
    "star":      "Star,:G4:3 star,:A4:3 five:A4:2 points!:C5:4 _:4",
    "heart":     "Heart,:G4:3 heart,:A4:3 full:A4:2 of:A4:1 love!:C5:3 _:4",
    "diamond":   "Dia+:G4:1 mond,:G4:3 dia+:A4:1 mond,:A4:3 shine:A4:2 and:A4:1 glow!:C5:3 _:2",
}

def stop_lines(sh):
    """the five lines of one shape stop: ask (2 bars), chant (2 bars), three object lines (1 bar each)"""
    N, syl = sh["name"], sh["syl"]; an = "An" if N[0] in "aeiou" else "A"
    ask = f"What:E4:2 shape:G4:2 is:G4:1 this?:C5:3 ~{an}:G4:2 ~" + word(syl, ["C5", "A4", "G4"][: len(syl)] if len(syl) > 1 else ["C5"], split_len(len(syl), 6) if len(syl) > 1 else [6], "!")
    out = [("ask", ask), ("chant", CHANT[N])]
    art = "an" if N[0] in "aeiou" else "a"
    for i, (kind, w, osyl) in enumerate(sh["objs"]):
        o_len = 2; n_len = 6 - o_len
        ow = word(osyl, ["G4", "A4"][: len(osyl)] if len(osyl) > 1 else ["G4"], split_len(len(osyl), o_len))
        nw = word(syl, ["C5", "A4", "G4"][: len(syl)] if len(syl) > 1 else ["C5"], split_len(len(syl), n_len), "!")
        out.append((f"obj{i}", f"{ow[0].upper() + ow[1:]} is:G4:1 {art}:G4:1 {nw}"))
    return out

# --- the hook (2 lines x 2 bars) and the other songs
HOOK = [
    "Beep:E4:2 boop!:G4:2 Shapes:A4:2 are:G4:1 all:G4:1 mixed:A4:2 up!:C5:4 _:2",
    "Come:E4:2 on,:G4:2 let's:A4:2 sort:G4:2 them:E4:2 out!:C5:4 _:2",
]
FIN_LAST = "Bye:G4:2 bye,:E4:2 shapes!:E4:2 Kid+:E4:2 do:G4:2 verse!:C5:4 _:2"
INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
YOGA = [
    "Cir+:E4:1 cle:G4:1 arms!:A4:2 _:2 Tri+:E4:1 an+:G4:1 gle:A4:1 hands!:C5:3 _:4",
    "Star:E4:2 pose!:G4:2 _:2 Freeze!:C5:4 _:6",
]
HOUSE = [
    "Square:E4:2 walls,:G4:2 tri+:A4:1 an+:A4:1 gle:A4:1 roof!:C5:3 _:6",
    "Rec+:E4:1 tangle:G4:2 door,:G4:1 cir+:A4:1 cle:A4:1 win+:G4:1 dow!:C5:3 _:6",
    "Star:E4:2 on:G4:1 top,:A4:1 heart:A4:2 so:G4:1 sweet!:C5:3 _:6",
    "O+:E4:1 val:G4:1 pond,:A4:2 dia+:A4:1 mond:A4:1 kite!:G4:2 _:2 Ta:G4:1 da!:C5:3 _:2",
]
GAMES = [dict(key="triangle", cards=["circle", "square", "triangle"]), dict(key="heart", cards=["heart", "star", "oval"]), dict(key="diamond", cards=["rectangle", "diamond", "circle"])]
def game_q(sh):
    N, syl = sh["name"], sh["syl"]
    nw = word(syl, ["C5", "A4", "G4"][: len(syl)] if len(syl) > 1 else ["C5"], split_len(len(syl), 4), "?")
    return f"Where:E4:2 is:G4:1 the:G4:1 {nw}"
def game_a(sh):
    N, syl = sh["name"], sh["syl"]
    nw = word(syl, ["E4", "E4", "E4"][: len(syl)], split_len(len(syl), 4), "!")
    nw = "~" + nw
    return f"~Yes!:C5:2 ~It's:A4:1 ~the:G4:1 {nw}"

# ================================================================ section plan
PLAN = []
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 2)
S("hook", 4)
for i, sh in enumerate(SHAPES): S("stop", 7, i=i, shape=sh["key"])
for i, g in enumerate(GAMES): S("game", 4, k=i, shape=g["key"], cards=g["cards"])
S("yoga", 4)
S("house", 8)
S("fin", 2)
S("outro", 4)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

def prog_for(kind, bars, k=0):
    if kind == "intro": return ["C", "G"]
    if kind == "hook": return ["C", "G", "Am", "F"]
    if kind == "stop": return ["C", "G", "Am", "F", "C", "G", "C"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "yoga": return ["C", "F", "G", "C"]
    if kind == "house": return ["C", "G", "Am", "F", "C", "G", "F", "G"]
    if kind == "fin": return ["G", "C"]
    if kind == "outro": return ["C", "F", "C", "C"]
    return ["C"] * bars
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"house": 2, "fin": 2}

def section_starts():
    out, bar = [], 0
    for i, (kind, bars, meta) in enumerate(PLAN):
        tr = BYKEY[meta["shape"]]["tr"] if kind == "stop" else TRANSPOSE.get(kind, 0)
        out.append(dict(i=i, kind=kind, bar0=bar, bars=bars, t0=bar * BAR, t1=(bar + bars) * BAR, prog=prog_for(kind, bars, meta.get("k", 0)), transpose=tr, meta=meta))
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

def build():
    secs = section_starts(); lines, speech = [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))
    for s in secs:
        k, t0, tr, m = s["kind"], s["t0"], s["transpose"], s["meta"]
        if k == "intro": add(s, INTRO_SUNG, t0, 8)
        elif k == "outro": add(s, OUTRO_SUNG, t0, 8)
        elif k == "hook":
            for li, dsl in enumerate(HOOK): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "fin": add(s, FIN_LAST, t0, 16, dict(li=0), tr)
        elif k == "yoga":
            for li, dsl in enumerate(YOGA): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "house":
            for li, dsl in enumerate(HOUSE): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "stop":
            sh = BYKEY[m["shape"]]; bar = 0
            for li, (part, dsl) in enumerate(stop_lines(sh)):
                nb = 2 if part in ("ask", "chant") else 1
                add(s, dsl, t0 + bar * BAR, 8 * nb, dict(part=part, li=li), tr); bar += nb
        elif k == "game":
            sh = BYKEY[m["shape"]]
            add(s, game_q(sh), t0, 8, dict(part="q")); add(s, game_a(sh), t0 + 3 * BAR, 8, dict(part="a"))
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "gizmo", "Shape workshop!"), ("intro", 0, 1, 2, "all", "Let's go!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 2, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech,
                shapes=[dict(key=s["key"], name=s["name"], world=s["world"], tr=s["tr"], objs=[dict(kind=o[0], word=o[1]) for o in s["objs"]]) for s in SHAPES])

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
    for sh in (SHAPES[0], SHAPES[2], SHAPES[6]):
        print("  --", sh["key"])
        for p, dsl in stop_lines(sh): print("    ", p, "|", dsl)
