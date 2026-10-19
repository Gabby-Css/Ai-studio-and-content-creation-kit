"""KiddoVerse LEARN #2 - "The Color Train!"   ORIGINAL lyrics + melodies, 108 BPM, 4/4, C major (colour stops climb in key from B-flat to D, big finale in E-flat).
One data model drives: the singer (voices + notes), the music arrangement, karaoke captions, mouth shapes and the storyboard.

Design rules (teacher's checklist):
  * every sung word is a real note of its own, 0.55 s or longer (0.28 s only for tiny words like 'is'); the COLOUR word is always the longest note
  * one new idea per verse, the same tune for every colour, three objects per colour, an echo ("Red!") and a question with a pause for the answer
  * lines are 5-8 syllables; children's voices answer the lead (call-and-response)

Line DSL (eighth-note grid, 0.278 s):   text[|ARPA]:NOTE:len     len in eighths.  '_:n' = rest.
  'ap+' joins to the next token -> ONE sung word with several syllable-notes.   '~Red!' = sung by the KIDS' choir (everything else: the lead voice).
"""
import re, json, os

BPM = 108
BAR = 60 / BPM * 4          # 2.222 s
EIGHTH = BAR / 8            # 0.2778 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ================================================================ the colours (rainbow order) - everything for a stop is generated from this table
# key, spoken/sung word syllables, colour hex, key shift (semitones), the three objects (singular kind, plural as sung, syllables of the plural)
COLORS = [
    dict(key="red",    syl=["red"],        hex="#FF3B4E", tr=-2, objs=[("apple", ["ap", "ples"]), ("heart", ["hearts"]), ("cherry", ["cher", "ries"])]),
    dict(key="orange", syl=["or", "ange"], hex="#FF9F1C", tr=-2, objs=[("orange", ["or", "anges"]), ("carrot", ["car", "rots"]), ("fish", ["fish"])]),
    dict(key="yellow", syl=["yel", "low"], hex="#FFD60A", tr=0, objs=[("sun", ["suns"]), ("duck", ["ducks"]), ("star", ["stars"])]),
    dict(key="green",  syl=["green"],      hex="#2FCB5A", tr=0, objs=[("tree", ["trees"]), ("frog", ["frogs"]), ("leaf", ["leaves"])]),
    dict(key="blue",   syl=["blue"],       hex="#2F8BFF", tr=2, objs=[("whale", ["whales"]), ("balloon", ["bal", "loons"]), ("blueball", ["balls"])]),
    dict(key="purple", syl=["pur", "ple"], hex="#9B5CFF", tr=2, objs=[("grapes", ["grapes"]), ("flower", ["flow", "ers"]), ("hat", ["hats"])]),
]
BYKEY = {c["key"]: c for c in COLORS}

def cname(c):  return "".join(c["syl"])
def cdsl(c, note_a, note_b, ln_a, ln_b=None, pre=""):
    """the colour word as DSL tokens.  1 syllable -> one note (note_a, ln_a); 2 syllables -> two notes (note_a/note_b)."""
    s = c["syl"]
    if len(s) == 1: return f"{pre}{s[0]}!:{note_a}:{ln_a}"
    return f"{pre}{s[0]}+:{note_a}:{ln_a} {s[1]}!:{note_b}:{ln_b if ln_b else ln_a}"

def stop_lines(c):
    """the six 2-bar lines (16 eighths each) of one colour stop"""
    s = c["syl"]; two = len(s) == 2; nm = cname(c)
    L = []
    # 1 arrive: "Toot, toot, stop, stop! Here's red!"
    L.append(("arrive", "Toot,:G4:2 toot,:G4:2 stop,:E4:2 stop!:E4:2 Here's:A4:2 " + (cdsl(c, "C5", "A4", 6) if not two else cdsl(c, "C5", "A4", 3))))
    # 2 echo (kids): the colour word four-five times, climbing
    if not two:
        L.append(("echo", f"~{s[0]},:E4:2 ~{s[0]},:G4:2 ~{s[0]},:A4:2 ~{s[0]},:C5:2 ~{s[0]}!:C5:4 _:4"))
    else:
        L.append(("echo", f"~{s[0]}+:E4:2 ~{s[1]},:G4:2 ~{s[0]}+:A4:2 ~{s[1]},:C5:2 ~{s[0]}+:C5:2 ~{s[1]}!:C5:4 _:2"))
    # 3-5 the objects: lead says "<Objects> are <colour>!", kids echo the colour
    for oi, (kind, syl) in enumerate(c["objs"]):
        pre = []; notes = ["G4", "A4", "G4"] if len(syl) > 1 else ["G4"]
        for k, w in enumerate(syl):
            last = k == len(syl) - 1
            pre.append(f"{w}{'' if last else '+'}:{notes[min(k, len(notes) - 1)] if len(syl) > 1 else 'G4'}:2")
        if len(syl) == 1: lead = " ".join(pre) + " are:A4:2 " + cdsl(c, "E4", "E4", 4, 4 if not two else 2)
        else: lead = " ".join(pre) + " are:G4:2 " + cdsl(c, "E4", "D4", 4, 4 if not two else 2)
        if two: lead = lead.replace("!:", ",:") if False else lead
        lead_len = sum(int(t.split(":")[2]) for t in lead.split())
        # the kids' answer sits on the last half bar; the lead's last note must end before it
        kids_len = 4
        gap = 16 - lead_len - kids_len
        if gap < 0:                                           # a long line: shorten the lead's last note
            lead_toks = lead.split(); a, b, n = lead_toks[-1].rsplit(":", 2); lead_toks[-1] = f"{a}:{b}:{int(n) + gap}"; lead = " ".join(lead_toks); gap = 0
        ans = (f"~{s[0]}!:C5:4" if not two else f"~{s[0]}+:C5:2 ~{s[1]}!:A4:2")
        L.append((f"obj{oi + 1}", lead + (f" _:{gap}" if gap else "") + " " + ans))
    # 6 question + answer
    ans = (f"~{s[0]}!:C5:4" if not two else f"~{s[0]}+:C5:2 ~{s[1]}!:A4:2")
    L.append(("qa", "What:E4:2 col+:G4:2 or:G4:1 is:A4:1 it?:C5:2 _:4 " + ans))
    return L

# --- the theme (hook) - 4 lines x 2 bars
CHORUS = [
    "Toot,:G4:2 toot!:G4:2 Here:E4:2 comes:G4:2 the:A4:2 train!:G4:6",
    "Rain+:E4:2 bow:G4:2 col+:A4:2 ors:C5:2 big:A4:2 and:G4:2 bright!:E4:4",
    "Red:G4:2 and:G4:2 blue:A4:2 and:A4:2 yel+:C5:2 low:A4:2 too!:G4:4",
    "Let's:E4:2 find:G4:2 the:A4:2 col+:G4:2 ors:E4:2 with:D4:2 me!:C4:4",
]
CHORUS_END2 = CHORUS[:3] + ["Col+:C5:2 ors,:C5:2 col+:A4:2 ors,:G4:2 we:E4:2 love:G4:2 col+:A4:2 ors!:C5:2"]   # 8 syllables = 16 eighths

INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
STORY = [
    "Oh:E4:2 no!:D4:4 The:C4:2 rain+:E4:2 bow's:D4:2 gray!:C4:4",
    "Where:E4:2 did:G4:2 the:A4:2 col+:G4:2 ors:E4:2 go?:D4:6",
    "Let's:E4:2 ride:G4:2 the:A4:2 train:C5:2 and:A4:2 find:G4:2 them!:E4:4",
    "All:G4:2 a+:A4:2 board!:C5:4 Toot,:G4:2 toot!:C5:4 _:2",
]
RAINBOW = [
    "Red,:E4:3 or+:G4:2 ange,:G4:3 yel+:A4:2 low!:C5:6",
    "Green,:E4:3 blue,:G4:3 pur+:A4:2 ple!:C5:6 _:2",
    "A:G4:2 rain+:A4:2 bow!:C5:4 A:G4:2 rain+:A4:2 bow!:C5:4",
    "Look:E4:2 at:G4:2 the:A4:2 rain+:G4:2 bow!:E4:2 Hoo+:D4:2 ray!:C4:4",
]
GAMEINTRO = "Let's:E4:2 play:G4:2 a:A4:2 game!:C5:2 Find:E4:2 the:G4:2 col+:A4:2 or!:C5:2"
GAMES = [dict(key="blue", cards=["red", "blue", "yellow"]), dict(key="green", cards=["green", "purple", "orange"]), dict(key="orange", cards=["yellow", "orange", "blue"])]
def game_q(c): s = c["syl"]; return "Where:E4:2 is:G4:2 " + (f"{s[0]}?:C5:4" if len(s) == 1 else f"{s[0]}+:C5:2 {s[1]}?:C5:2")
def game_a(c): s = c["syl"]; return "~Yes!:C5:2 ~It's:A4:2 " + (f"~{s[0]}!:G4:4" if len(s) == 1 else f"~{s[0]}+:G4:2 ~{s[1]}!:G4:2")

# ================================================================ section plan
PLAN = []                     # (kind, bars, meta)
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 4)
S("chorus", 8, nth=0)
S("story", 8)
for i, c in enumerate(COLORS): S("stop", 12, i=i, color=c["key"])
S("rainbow", 8)
S("gameintro", 2)
for i, g in enumerate(GAMES): S("game", 4, k=i, color=g["key"], cards=g["cards"])
S("fin", 8, nth=1)
S("fin2", 8, nth=2)
S("outro", 6)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

CH_CHORUS = ["C", "G", "Am", "F", "C", "G", "F", "G"]
def prog_for(kind, bars, k=0):
    if kind == "intro": return ["C", "C", "C", "G"]
    if kind in ("chorus", "fin", "fin2"): return CH_CHORUS
    if kind == "story": return ["Am", "F", "C", "G", "Am", "F", "G", "G"]
    if kind == "stop": return ["C", "G", "Am", "F", "C", "G", "Am", "F", "C", "G", "F", "C"]
    if kind == "rainbow": return ["C", "Am", "F", "G", "C", "Am", "F", "G"]
    if kind == "gameintro": return ["C", "G"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "outro": return ["C", "F", "C", "C", "C", "C"]
    return ["C"] * bars
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"fin": 3, "fin2": 3}

# ================================================================ builders
def section_starts():
    out, bar = [], 0
    for i, (kind, bars, meta) in enumerate(PLAN):
        tr = BYKEY[meta["color"]]["tr"] if kind == "stop" else TRANSPOSE.get(kind, 0)
        out.append(dict(i=i, kind=kind, bar0=bar, bars=bars, t0=bar * BAR, t1=(bar + bars) * BAR,
                        prog=prog_for(kind, bars, meta.get("k", 0)), transpose=tr, meta=meta))
        bar += bars
    return out

def parse_line(dsl, t0, transpose=0):
    """DSL -> (words [{text, disp, ph, who, syl:[{note,t0,dur}], t0, t1}], total eighths)."""
    pos, words, cur = 0, [], None
    for tok in dsl.split():
        parts = tok.split(":")
        if parts[0] == "_":
            pos += int(parts[1]); continue
        text, note, ln = parts[0], parts[1], int(parts[2])
        who = "lead"
        if text.startswith("~"): who = "kids"; text = text[1:]
        join = text.endswith("+")
        text = text.rstrip("+")
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

def capitalise(words):
    """display only: the first word of a line starts with a capital, colour words keep their natural case"""
    return words

def build():
    secs = section_starts(); lines, speech = [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        mm = dict(meta or {}, **sec["meta"])
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]      # display only: a line starts with a capital
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))
    for s in secs:
        k, t0, tr, m = s["kind"], s["t0"], s["transpose"], s["meta"]
        if k == "intro": add(s, INTRO_SUNG, t0, 8)
        elif k == "outro": add(s, OUTRO_SUNG, t0, 8)
        elif k in ("chorus", "fin", "fin2"):
            src = CHORUS_END2 if k == "fin2" else CHORUS
            for li, dsl in enumerate(src): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "story":
            for li, dsl in enumerate(STORY): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "stop":
            c = BYKEY[m["color"]]
            for li, (part, dsl) in enumerate(stop_lines(c)): add(s, dsl, t0 + li * 2 * BAR, 16, dict(part=part, li=li), tr)
        elif k == "rainbow":
            for li, dsl in enumerate(RAINBOW): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "gameintro": add(s, GAMEINTRO, t0, 16)
        elif k == "game":
            c = BYKEY[m["color"]]
            add(s, game_q(c), t0, 8, dict(part="q")); add(s, game_a(c), t0 + 3 * BAR, 8, dict(part="a"))
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "kiko", "All aboard the Color Train!"), ("intro", 0, 2, 0, "luma", "Ready?"), ("intro", 0, 2, 2, "all", "Ready!"),
          ("intro", 0, 3, 0, "kiko", "Three!"), ("intro", 0, 3, 1, "luma", "Two!"), ("intro", 0, 3, 2, "gizmo", "One!"), ("intro", 0, 3, 3, "all", "Go!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 2, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech,
                colors=[dict(key=c["key"], hex=c["hex"], syl=c["syl"], tr=c["tr"], objs=[o[0] for o in c["objs"]]) for c in COLORS])

if __name__ == "__main__":
    d = build()
    here = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(os.path.join(here, "..", "data"), exist_ok=True)
    json.dump(d, open(os.path.join(here, "..", "data", "song.json"), "w"), indent=1)
    flat = lambda l: [x for w in l["words"] for x in w.get("subs", [w])]
    lo = min(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"]); hi = max(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    sung = sum(l["t1"] - l["t0"] for l in d["lines"]); shortest = min(s["dur"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    print(f"bars {TOTAL_BARS}  duration {DURATION:.1f}s = {int(DURATION // 60)}:{int(DURATION % 60):02d}  sections {len(d['sections'])}  lines {len(d['lines'])}  speech {len(d['speech'])}")
    print(f"melody range midi {lo}-{hi}   total sung time {sung:.0f}s   shortest syllable {shortest:.2f}s")
    for c in COLORS[:2] + COLORS[2:3]:
        print(c["key"]); [print("   ", p, "|", dsl) for p, dsl in stop_lines(c)]
