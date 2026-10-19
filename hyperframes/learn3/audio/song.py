"""KiddoVerse LEARN #3 - "Animal Sounds Dance Party"   ORIGINAL lyrics + melodies, 120 BPM, 4/4, C major (8 animal stops, key lifts, finale up).
A 3-minute, TikTok-speed sing-along: every animal gets 6 bars (12 s) built on the same tune: question -> animal pops in -> the sound three ways.
One data model drives: the singer (voices + notes), the music arrangement, karaoke captions, mouth shapes and the storyboard.

Line DSL (eighth-note grid, 0.25 s):   text[|ARPA]:NOTE:len     len in eighths.  '_:n' = rest.
  'ap+' joins to the next token -> ONE sung word with several syllable-notes.   '~Moo!' = sung by the KIDS' choir (everything else: the lead voice).
"""
import re, json, os

BPM = 120
BAR = 60 / BPM * 4          # 2.0 s
EIGHTH = BAR / 8            # 0.25 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ---- the eight animals: key, the name as sung ('the cow'), its sound, key shift, world tint colour, melody-doubling instrument
ANIMALS = [
    dict(key="cow",   name="cow",   sound="moo",   tr=-2, world="c_green",  inst="tuba"),
    dict(key="duck",  name="duck",  sound="quack", tr=-2, world="c_blue",   inst="oboe"),
    dict(key="pig",   name="pig",   sound="oink",  tr=0,  world="c_red",    inst="bassoon"),
    dict(key="sheep", name="sheep", sound="baa",   tr=0,  world="c_purple", inst="flute"),
    dict(key="dog",   name="dog",   sound="woof",  tr=0,  world="c_orange", inst="banjo"),
    dict(key="cat",   name="cat",   sound="meow",  tr=0,  world="c_yellow", inst="sax"),
    dict(key="horse", name="horse", sound="neigh", tr=2,  world="c_green",  inst="trumpet"),
    dict(key="lion",  name="lion",  sound="roar",  tr=2,  world="c_orange", inst="brass"),
]
BYKEY = {a["key"]: a for a in ANIMALS}

def stop_lines(a):
    """the three 2-bar lines (16 eighths each) of one animal stop"""
    s, n = a["sound"], a["name"]
    return [
        ("ask",   f"Who:E4:2 says:G4:2 {s}?:C5:4 ~The:G4:2 ~{n}!:C5:6"),                 # who says moo?  -> kids: the cow!
        ("sound", f"{s},:G4:4 {s},:A4:4 ~{s}!:C5:4 _:4"),                                # moo, moo, (kids) moo!
        ("say",   f"The:G4:2 {n}:A4:2 says:G4:2 {s}!:E4:4 _:2 ~{s}!:C5:4"),             # the cow says moo!  (kids) moo!
    ]

# --- the hook (3 lines x 2 bars)
HOOK = [
    "An+:E4:2 i+:G4:1 mals!:A4:1 Let's:G4:2 hear:E4:2 them:G4:2 all!:C5:4 _:2",
    "Moo,:G4:2 quack,:G4:2 oink,:A4:2 baa,:A4:2 woof,:C5:2 meow,:A4:2 neigh,:G4:2 roar!:E4:2",
    "Come:E4:2 on,:G4:2 sing:A4:2 and:G4:2 dance:E4:2 with:D4:2 me!:C4:4",
]
FIN_LAST = "Bye:G4:2 bye,:E4:2 an+:E4:1 i+:G4:1 mals!:C5:2 Kid+:E4:2 do:G4:2 verse!:C5:4"
INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
DANCE = [
    "Flap,:G4:2 flap,:G4:2 like:A4:2 a:G4:2 duck!:C5:6 _:2",
    "Jump,:A4:2 jump,:A4:2 like:C5:2 a:A4:2 cat!:G4:6 _:2",
    "Stomp,:G4:2 stomp,:G4:2 like:A4:2 a:G4:2 lion!:E4:4 ~Roar!:C5:4",
]
GAMES = [dict(key="duck", cards=["cow", "duck", "pig"]), dict(key="lion", cards=["sheep", "cat", "lion"]), dict(key="pig", cards=["horse", "dog", "pig"])]
def game_q(a): return f"Who:E4:2 says:G4:2 {a['sound']}?:C5:4"
def game_a(a): return f"~Yes!:C5:2 ~It's:A4:2 ~the:G4:2 ~{a['name']}!:E4:2"

# ================================================================ section plan
PLAN = []
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 2)
S("hook", 6, nth=0)
for i, a in enumerate(ANIMALS[:4]): S("stop", 6, i=i, animal=a["key"])
S("midhook", 4)
for i, a in enumerate(ANIMALS[4:], 4): S("stop", 6, i=i, animal=a["key"])
S("dance", 6)
for i, g in enumerate(GAMES): S("game", 4, k=i, animal=g["key"], cards=g["cards"])
S("fin", 8)
S("outro", 5)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

def prog_for(kind, bars, k=0):
    if kind == "intro": return ["C", "G"]
    if kind in ("hook", "fin"): return ["C", "G", "Am", "F", "C", "G", "F", "G"][:bars] if bars <= 8 else ["C"] * bars
    if kind == "midhook": return ["Am", "F", "C", "G"]
    if kind == "stop": return ["C", "G", "Am", "F", "C", "G"]
    if kind == "dance": return ["C", "C", "F", "F", "G", "C"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "outro": return ["C", "F", "C", "C", "C"]
    return ["C"] * bars
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"fin": 2, "midhook": 0}

def section_starts():
    out, bar = [], 0
    for i, (kind, bars, meta) in enumerate(PLAN):
        tr = BYKEY[meta["animal"]]["tr"] if kind == "stop" else TRANSPOSE.get(kind, 0)
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
        elif k == "midhook":
            for li, dsl in enumerate(HOOK[1:]): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li + 1), tr)
        elif k == "fin":
            for li, dsl in enumerate(HOOK + [FIN_LAST]): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "stop":
            a = BYKEY[m["animal"]]
            for li, (part, dsl) in enumerate(stop_lines(a)): add(s, dsl, t0 + li * 2 * BAR, 16, dict(part=part, li=li), tr)
        elif k == "dance":
            for li, dsl in enumerate(DANCE): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "game":
            a = BYKEY[m["animal"]]
            add(s, game_q(a), t0, 8, dict(part="q")); add(s, game_a(a), t0 + 3 * BAR, 8, dict(part="a"))
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "kiko", "Animal party!"), ("intro", 0, 1, 2, "all", "Let's go!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 2, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech,
                animals=[dict(key=a["key"], name=a["name"], sound=a["sound"], world=a["world"], tr=a["tr"], inst=a["inst"]) for a in ANIMALS])

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
    for a in ANIMALS[:1]: [print("   ", p, "|", dsl) for p, dsl in stop_lines(a)]
