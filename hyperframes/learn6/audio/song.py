"""KiddoVerse LEARN #6 - "Sound It Out! Three-Letter Words"   ORIGINAL lyrics + melodies, 120 BPM, 4/4, C major (the key lifts as the words go on).
A ~3 minute TikTok-speed phonics sing-along: Gizmo's Word Machine makes a word out of three letter SOUNDS and the crew reads TEN words.
Every word gets a 5-bar stop:
  bar 0      lead   "kuh - a - tuh"        (three letter tiles pop into the machine, each says its sound)
  bar 1      lead   "k-a-t ... Cat!"       (the tiles slide together: blend it)
  bar 2      kids   "Cat! Cat!"            (the picture pops out)
  bars 3-4   lead   "Cat says meow, meow, meow!"   (the word in a little sentence, with the picture acting it out)
Then three RHYME stops (cat/hat, pig/big, sun/run), three "Which word says ...?" quiz rounds, a "We can read!" recap of all ten words and a bye-bye.
One data model drives: the singer (voices + notes), the music arrangement, karaoke captions, mouth shapes and the storyboard.

Line DSL (eighth-note grid, 0.25 s):   text:NOTE:len     len in eighths.  '_:n' = rest.   'ap+' joins to the next token -> ONE sung word with several syllable-notes.
'~Word' = sung by the KIDS' choir (everything else: the lead voice).  Only the FIRST token of a word carries the ~.
'c|k:G4:2' = the letter c is SHOWN (caption, tile) but the SOUND k ("kuh") is sung: the part after | is a key of SND in sing_song.py (IPA for Kokoro).
"""
import re, json, os

BPM = 120
BAR = 60 / BPM * 4          # 2.0 s
EIGHTH = BAR / 8            # 0.25 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ---- the ten words in the order they are taught: letters, the three sounds (SND keys), what the picture shows, picture world, key shift, the little sentence (2 bars = 16 eighths), the word to flash while it is sung
WORDS = [
    dict(w="cat", snd="kat", pic="cat",  world="hills",    tr=0, flash="MEOW!", sent="Cat:G4:2 says:A4:2 meow,:C5:2 meow,:A4:2 meow!:C5:4 _:4"),
    dict(w="dog", snd="dog", pic="dog",  world="dino",     tr=0, flash="WAG!",  sent="Dog:G4:2 can:G4:2 wag,:A4:2 wag,:A4:2 wag!:C5:4 _:4"),
    dict(w="sun", snd="sun", pic="sun",  world="cloud",    tr=0, flash="HOT!",  sent="Sun:G4:2 is:G4:2 hot,:A4:2 hot,:A4:2 hot!:C5:4 _:4"),
    dict(w="hat", snd="hat", pic="hat",  world="disco",    tr=0, flash="ON!",   sent="Hat:G4:2 on,:A4:2 hat:G4:2 on,:A4:2 hat:A4:1 on:A4:1 my:A4:1 head!:C5:3 _:2"),
    dict(w="pig", snd="pig", pic="pig",  world="c_green",  tr=2, flash="DIG!",  sent="Pig:G4:2 can:G4:2 dig,:A4:2 dig,:A4:2 dig!:C5:4 _:4"),
    dict(w="bus", snd="bus", pic="bus",  world="hub",      tr=2, flash="BEEP!", sent="Bus:G4:2 goes:A4:2 beep,:C5:2 beep,:A4:2 beep!:C5:4 _:4"),
    dict(w="cup", snd="kup", pic="cup",  world="c_orange", tr=2, flash="YUM!",  sent="Cup:G4:2 of:G4:2 milk,:A4:2 yum,:A4:2 yum!:C5:4 _:4"),
    dict(w="red", snd="red", pic="apple", world="c_red",   tr=2, flash="RED!",  sent="Red,:G4:2 red,:A4:2 red:A4:2 ap+:A4:2 ple!:C5:4 _:4"),
    dict(w="big", snd="big", pic="whale", world="space",   tr=2, flash="BIG!",  sent="Big,:G4:2 big,:A4:2 big:A4:2 whale!:C5:6 _:4"),
    dict(w="run", snd="run", pic="shoe", world="numland",  tr=4, flash="RUN!",  sent="Run,:G4:2 run,:A4:2 run,:A4:2 run,:A4:2 run!:C5:4 _:4"),
]
BYW = {x["w"]: x for x in WORDS}
SOUNDS = {"k": "kuh", "t": "tuh", "d": "duh", "g": "guh", "p": "puh", "b": "buh", "h": "huh", "s": "suh", "n": "nuh", "r": "ruh", "a": "a", "o": "o", "u": "u", "i": "i", "e": "e"}
RHYMES = [dict(pair=("cat", "hat"), end="at", tr=0), dict(pair=("pig", "big"), end="ig", tr=2), dict(pair=("sun", "run"), end="un", tr=4)]
GAMES = [dict(k=0, w="sun", cards=["bus", "sun", "cup"], tr=0), dict(k=1, w="red", cards=["big", "run", "red"], tr=2), dict(k=2, w="dog", cards=["dog", "cat", "pig"], tr=4)]

def letters_of(w):
    """the display letter and the sound key of each of the three tiles of a word"""
    return list(zip(w["w"], w["snd"]))

def word(syl, notes, lens, punct=""):
    return " ".join(f"{s}{'+' if i < len(syl) - 1 else punct}:{notes[i]}:{lens[i]}" for i, s in enumerate(syl))

def kidify(dsl):
    out, new = [], True
    for tok in dsl.split():
        if tok.startswith("_:"): out.append(tok); new = True; continue
        out.append(("~" + tok) if new else tok); new = not tok.split(":")[0].endswith("+")
    return " ".join(out)

# ---- the lines of one word stop
def stop_lines(w):
    L = letters_of(w); name = w["w"]
    snd = " ".join(f"{ch}|{k}:G4:2" for ch, k in L) + " _:2"                                   # three sounds on beats 1, 2, 3
    blend = " ".join(f"{ch}|{k}:{n}:1" for (ch, k), n in zip(L, ("E4", "G4", "A4"))) + f" _:1 {name}!:C5:4"   # k-a-t ... cat!
    say = f"~{name}!:C5:3 _:1 ~{name}!:C5:3 _:1"                                              # the kids shout it twice
    return [("snd", snd, 1), ("blend", blend, 1), ("say", say, 1), ("sent", w["sent"], 2)]

def rhyme_lines(r):
    a, b = r["pair"]; e = r["end"]
    return [("pair", f"{a}:G4:2 {b}!:A4:2 {a}:G4:2 {b}!:A4:2 They:G4:2 rhyme!:C5:4 _:2", 2),
            ("end", f"{e}:G4:2 {e}:A4:2 {e}:A4:2 {e}!:C5:4 _:6", 2)]

# --- the hook (2 lines x 2 bars) and the other songs
HOOK = [
    "Beep:E4:2 boop!:G4:2 Sound:A4:2 it:G4:2 out!:C5:4 _:4",
    "Slide:E4:2 it,:G4:2 say:A4:2 it,:G4:2 read:E4:2 it!:C5:4 _:2",
]
RECAP = [
    "We:E4:2 can:G4:2 read!:C5:4 We:E4:2 can:G4:2 read!:C5:4",
    "Cat,:G4:3 dog,:G4:3 sun,:A4:3 hat,:A4:3 pig!:C5:4",
    "Bus,:G4:3 cup,:G4:3 red,:A4:3 big,:A4:3 run!:C5:4",
]
FIN_LAST = "Bye:G4:2 bye,:E4:2 words!:E4:2 Kid+:E4:2 do:G4:2 verse!:C5:4 _:2"
INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
KIDS_UNISON = {"say", "a"}                           # the kids' short shouts are hard to understand alone: the lead voice sings along (hidden = no caption, same notes)

def game_q(g): return f"Which:E4:2 word:G4:2 says:A4:2 {g['w']}?:C5:2"
def game_a(g): return f"~Yes!:C5:2 ~It's:A4:2 ~{g['w']}!:E4:4"

# ================================================================ section plan
PLAN = []
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 2)
S("hook", 4)
for i, w in enumerate(WORDS):
    S("stop", 5, i=i, w=w["w"], tr=w["tr"])
    if i == 3: S("rhyme", 4, r=0, **RHYMES[0]); S("game", 4, **GAMES[0])
    if i == 8: S("rhyme", 4, r=1, **RHYMES[1]); S("game", 4, **GAMES[1])
    if i == 9: S("rhyme", 4, r=2, **RHYMES[2]); S("game", 4, **GAMES[2])
S("recap", 6)
S("fin", 2)
S("outro", 4)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

def prog_for(kind, bars):
    if kind == "intro": return ["C", "G"]
    if kind == "hook": return ["C", "G", "Am", "F"]
    if kind == "stop": return ["C", "G", "Am", "F", "C"]
    if kind == "rhyme": return ["C", "F", "C", "G"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "recap": return ["C", "G", "Am", "F", "C", "G"]
    if kind == "fin": return ["G", "C"]
    if kind == "outro": return ["C", "F", "C", "C"]
    return ["C"] * bars
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"recap": 4, "fin": 4}

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

def build():
    secs = section_starts(); lines, speech, hid = [], [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))
        if dsl.lstrip().startswith("~") and mm.get("part") in KIDS_UNISON:
            w2, _ = parse_line(dsl.replace("~", ""), t0, tr)
            hid.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", hidden=True, t0=w2[0]["t0"], t1=w2[-1]["t1"], words=w2, meta=mm))
    for s in secs:
        k, t0, tr, m = s["kind"], s["t0"], s["transpose"], s["meta"]
        if k == "intro": add(s, INTRO_SUNG, t0, 8)
        elif k == "outro": add(s, OUTRO_SUNG, t0, 8)
        elif k == "hook":
            for li, dsl in enumerate(HOOK): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "fin": add(s, FIN_LAST, t0, 16, dict(li=0), tr)
        elif k == "recap":
            for li, dsl in enumerate(RECAP): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k in ("stop", "rhyme"):
            rows = stop_lines(BYW[m["w"]]) if k == "stop" else rhyme_lines(m); bar = 0
            for li, (part, dsl, nb) in enumerate(rows):
                add(s, dsl, t0 + bar * BAR, 8 * nb, dict(part=part, li=li), tr); bar += nb
        elif k == "game":
            g = GAMES[m["k"]]
            add(s, game_q(g), t0, 8, dict(part="q"), tr); add(s, game_a(g), t0 + 3 * BAR, 8, dict(part="a"), tr)
    lines.extend(hid)                                  # hidden lines go LAST so the storyboard's per-section line indexes stay the same
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "gizmo", "Word machine!"), ("intro", 0, 1, 2, "all", "Let's read!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 2, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech,
                words=[dict(w=x["w"], letters=[dict(ch=c, snd=k, say=SOUNDS[k]) for c, k in letters_of(x)], pic=x["pic"], world=x["world"], tr=x["tr"], flash=x["flash"]) for x in WORDS],
                rhymes=[dict(a=r["pair"][0], b=r["pair"][1], end=r["end"], tr=r["tr"]) for r in RHYMES],
                games=[dict(k=g["k"], w=g["w"], cards=g["cards"], tr=g["tr"]) for g in GAMES])

if __name__ == "__main__":
    d = build()
    here = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(os.path.join(here, "..", "data"), exist_ok=True)
    json.dump(d, open(os.path.join(here, "..", "data", "song.json"), "w"), indent=1)
    flat = lambda l: [x for w in l["words"] for x in w.get("subs", [w])]
    lo = min(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"]); hi = max(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    shortest = min(s["dur"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    print(f"bars {TOTAL_BARS}  duration {DURATION:.1f}s = {int(DURATION // 60)}:{int(DURATION % 60):02d}  sections {len(d['sections'])}  lines {len(d['lines'])}  hidden {sum(1 for l in d['lines'] if l.get('hidden'))}  speech {len(d['speech'])}")
    print(f"melody range midi {lo}-{hi}   shortest syllable {shortest:.2f}s")
    for w in (WORDS[0], WORDS[7]):
        print("  --", w["w"])
        for p, dsl, nb in stop_lines(w): print("    ", p, "|", dsl)
    for r in RHYMES[:1]:
        for p, dsl, nb in rhyme_lines(r): print("    ", p, "|", dsl)
