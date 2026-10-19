"""KiddoVerse LEARN #1 - "Count, ABC & Read with KiddoVerse!"   ORIGINAL lyrics + melodies, 120 BPM, 4/4, C major (final choruses in D).
One data model drives: SoulX singing meta, music arrangement, karaoke captions, mouth shapes and the storyboard.

Line DSL (eighth-note grid, 0.25 s):   text[|ARPA]:NOTE:len     len in eighths.  '_:n' = rest.
  'ap+' joins to the next token -> ONE sung word with several syllable-notes.
  '|ARPA' overrides the pronunciation of that word (letter names, phonics sounds), e.g.  A|EY1  ah|AA1  S|EH1-S
Sections are made of units (a number, a letter, a two-letter word, a game round ...) so the storyboard can be generated from data.
"""
import re, json, os

BPM = 120
BAR = 60 / BPM * 4          # 2.0 s
EIGHTH = BAR / 8            # 0.25 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ================================================================ curriculum data
# --- numbers 1-10: (word, bars, bar-1 song line, counting bars)   counting bars sing one..N going UP the scale as the items pop
UP = "one,:C4:2 two,:D4:2 three,:E4:2 four,:F4:2 five,:G4:2 six,:A4:2"          # 12 eighths
NUMBERS = [
    dict(n=1, word="one", item="star", items="little star", bars=2,
         l1="one,:C4:2 one,:C4:2 lit+:E4:1 tle:E4:1 star:G4:2", l2="Just:E4:2 one:C4:4 star!:G4:2"),
    dict(n=2, word="two", item="ball", items="bouncy balls", bars=2,
         l1="two,:D4:2 two,:D4:2 bounc+:F4:1 y:F4:1 balls:A4:2", l2="one,:C4:2 two!:D4:4 _:2"),
    dict(n=3, word="three", item="apple", items="round apples", bars=2,
         l1="three,:E4:2 three,:E4:2 round:G4:2 ap+:A4:1 ples:G4:1", l2="one,:C4:2 two,:D4:2 three!:E4:4"),
    dict(n=4, word="four", item="fish", items="tiny fish", bars=2,
         l1="four,:F4:2 four,:F4:2 tin+:A4:1 y:A4:1 fish:C5:2", l2="one,:C4:2 two,:D4:2 three,:E4:2 four!:F4:2"),
    dict(n=5, word="five", item="flower", items="bright flowers", bars=2,
         l1="five,:G4:2 five,:G4:2 bright:B4:2 flow+:A4:1 ers:G4:1", l2="one:C4:1 two:D4:1 three:E4:2 four:F4:2 five!:G4:2"),
    dict(n=6, word="six", item="bee", items="busy bees", bars=3,
         l1="six,:A4:2 six,:A4:2 bus+:C5:1 y:C5:1 bees:D5:2", l2=UP.replace("six,", "six!").replace("six!:A4:2", "six!:A4:4") + " _:2"),
    dict(n=7, word="seven", item="heart", items="red hearts", bars=3,
         l1="sev+:B4:1 en,:B4:1 sev+:B4:1 en,:B4:1 red:D5:2 hearts:B4:2", l2=UP + " sev+:B4:1 en!:B4:3"),
    dict(n=8, word="eight", item="cookie", items="yummy cookies", bars=4,
         l1="eight,:C5:2 eight,:C5:2 yum+:E5:1 my:D5:1 cook+:C5:1 ies:A4:1", l2=UP + " sev+:B4:1 en,:B4:1 eight!:C5:4 _:6"),
    dict(n=9, word="nine", item="duck", items="happy ducks", bars=4,
         l1="nine,:D5:2 nine,:D5:2 hap+:B4:1 py:B4:1 ducks:G4:2", l2=UP + " sev+:B4:1 en,:B4:1 eight,:C5:2 nine!:D5:4 _:4"),
    dict(n=10, word="ten", item="balloon", items="big balloons", bars=4,
         l1="ten,:E5:2 ten,:E5:2 big:C5:2 bal+:A4:1 loons:G4:1", l2=UP + " sev+:B4:1 en,:B4:1 eight,:C5:2 nine,:D5:2 ten!:E5:4 _:2"),
]
NUMREV = ("one,:C4:2 two,:D4:2 three,:E4:2 four,:F4:2 five,:G4:2 six,:A4:2 sev+:B4:1 en,:B4:1 eight,:C5:2 nine,:D5:2 ten!:E5:4 "
          "hoo+:G4:2 ray!:C5:4 _:4")

# --- alphabet: letter -> (name phonemes, sound token, sound phonemes, word, syllables(durations), group)
LET = {  # name ARPA            sound disp, ph                 word      syl split
    "A": ("EY1",   "ah",  "AE1",    "apple",    ["ap", "ple"]),
    "B": ("B-IY1", "buh", "B-AH1",  "ball",     ["ball"]),
    "C": ("S-IY1", "kuh", "K-AH1",  "cat",      ["cat"]),
    "D": ("D-IY1", "duh", "D-AH1",  "dog",      ["dog"]),
    "E": ("IY1",   "eh",  "EH1",    "egg",      ["egg"]),
    "F": ("EH1-F", "fuh", "F-AH1",  "fish",     ["fish"]),
    "G": ("JH-IY1", "guh", "G-AH1", "grapes",   ["grapes"]),
    "H": ("EY1-CH", "huh", "HH-AH1", "hat",     ["hat"]),
    "I": ("AY1",   "ih",  "IH1",    "igloo",    ["ig", "loo"]),
    "J": ("JH-EY1", "juh", "JH-AH1", "jam",     ["jam"]),
    "K": ("K-EY1", "kuh", "K-AH1",  "kite",     ["kite"]),
    "L": ("EH1-L", "luh", "L-AH1",  "lemon",    ["lem", "on"]),
    "M": ("EH1-M", "muh", "M-AH1",  "moon",     ["moon"]),
    "N": ("EH1-N", "nuh", "N-AH1",  "nest",     ["nest"]),
    "O": ("OW1",   "ah",  "AA1",    "octopus",  ["oc", "to", "pus"]),
    "P": ("P-IY1", "puh", "P-AH1",  "pizza",    ["piz", "za"]),
    "Q": ("K-Y-UW1", "kwuh", "K-W-AH1", "quilt", ["quilt"]),
    "R": ("AA1-R", "ruh", "R-AH1",  "rainbow",  ["rain", "bow"]),
    "S": ("EH1-S", "suh", "S-AH1",  "sun",      ["sun"]),
    "T": ("T-IY1", "tuh", "T-AH1",  "tree",     ["tree"]),
    "U": ("Y-UW1", "uh",  "AH1",    "umbrella", ["um", "brel", "la"]),
    "V": ("V-IY1", "vuh", "V-AH1",  "vase",     ["vase"]),
    "W": ("D-AH1-B-AH0-L-Y-UW0", "wuh", "W-AH1", "worm", ["worm"]),
    "X": ("EH1-K-S", "ks", "K-S",   "box",      ["box"]),
    "Y": ("W-AY1", "yuh", "Y-AH1",  "yo-yo",    ["yo-", "yo"]),
    "Z": ("Z-IY1", "zuh", "Z-AH1",  "zebra",    ["ze", "bra"]),
}
GROUPS = ["ABCD", "EFGH", "IJKL", "MNOP", "QRST", "UVWX", "YZ"]
GNAMES = {"ABCD": ["E4", "G4", "A4", "G4"], "EFGH": ["G4", "A4", "C5", "A4"], "IJKL": ["A4", "C5", "D5", "C5"],
          "MNOP": ["E4", "G4", "A4", "C5"], "QRST": ["G4", "A4", "C5", "D5"], "UVWX": ["C5", "A4", "G4", "E4"], "YZ": ["A4", "C5"]}
PENTA = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5"]
def up(n, k=1): return PENTA[min(len(PENTA) - 1, PENTA.index(n) + k)]

NAMELEN = {"W": 4}                                                            # "double-u" has 7 sounds: it gets a full beat (the rest shrinks to match)
def letter_line(ch, name_note):
    nm, sd, sp, word, syl = LET[ch]; nl = NAMELEN.get(ch, 2)
    parts = [f"{ch}|{nm}:{name_note}:{nl}", f"{sd}|{sp}:{name_note}:2"]
    w_hi, w_lo = up(name_note, 2), name_note
    if len(syl) == 1: parts.append(f"{word}!:{w_hi}:4")
    elif len(syl) == 2: parts += [f"{syl[0]}+:{up(name_note, 1)}:2", f"{syl[1]}!:{w_lo}:2"]
    else: parts += [f"{syl[0]}+:{up(name_note, 1)}:2", f"{syl[1]}+:{up(name_note, 2)}:1", f"{syl[2]}!:{w_lo}:1"]
    return " ".join(parts) + f" _:{4 - (nl - 2)}"                             # 12 eighths = 1.5 bars

# --- the alphabet song (review): letter names climbing and falling, one letter per quarter note
def names(s, notes): return " ".join(f"{c}|{LET[c][0]}:{n}:2" for c, n in zip(s, notes))
ABCREV = [
    names("ABCDEFG", ["E4", "G4", "A4", "C5", "A4", "G4", "E4"]) + " _:2",
    names("HIJKLMN", ["G4", "A4", "C5", "D5", "C5", "A4", "G4"]) + " _:2",
    names("OPQRSTU", ["A4", "C5", "D5", "E5", "D5", "C5", "A4"]) + " _:2",
    names("VWXY", ["G4", "A4", "C5", "A4"]) + " and:G4:2 Z!|Z-IY1:C5:4 _:2",
    "Now:E4:2 I:G4:2 know:A4:2 my:G4:2 A|EY1-B-IY1-S-IY1-Z+:E4:1 B+:G4:1 C's:C5:4 _:2",
]

# --- two-letter words: (word, letter1 ph, letter2 ph, bar-2 phrase)
WORDS = [
    ("at", "EY1", "T-IY1", "Look:G4:2 at:E4:2 the:G4:2 stars!:C5:2"),
    ("in", "AY1", "EH1-N", "Hop:G4:2 in:E4:2 the:G4:2 box!:C5:2"),
    ("on", "OW1", "EH1-N", "Hat:G4:2 on:E4:2 my:G4:2 head!:C5:2"),
    ("up", "Y-UW1", "P-IY1", "Jump:G4:2 up,:E4:2 up,:G4:2 up!:C5:2"),
    ("go", "JH-IY1", "OW1", "Zoom:G4:2 go,:E4:2 go,:G4:2 go!:C5:2"),
    ("no", "EH1-N", "OW1", "Shake:G4:2 no,:E4:2 no,:G4:2 no!:C5:2"),
    ("me", "EH1-M", "IY1", "Me,:G4:2 me,:E4:2 that's:G4:2 me!:C5:2"),
    ("be", "B-IY1", "IY1", "Be:G4:2 kind,:E4:2 be:G4:2 brave!:C5:2"),
    ("it", "AY1", "T-IY1", "Find:G4:2 it,:E4:2 got:G4:2 it!:C5:2"),
    ("my", "EH1-M", "W-AY1", "My:G4:2 hat,:E4:2 my:G4:2 ball!:C5:2"),
]
def word_line(w, p1, p2, phrase):
    a, b = w[0].upper(), w[1].upper()
    return f"{a}|{p1}:E4:2 {b}|{p2}:G4:2 {w}!:C5:4 " + phrase
WORDSREV = ("at,:E4:2 in,:G4:2 on,:A4:2 up,:G4:2 go,:E4:2 no,:G4:2 me,:A4:2 be,:G4:2 it,:A4:2 my,:C5:2 "
            "We:G4:2 can:A4:2 read!:C5:4 _:4")

# --- the theme chorus (4 x 2 bars)
CHORUS = [
    "Zoom,:G4:2 zoom,:G4:2 Kid+:E4:1 do:G4:1 verse!:C5:2 Learn:A4:2 with:G4:2 me:E4:2 to+:D4:1 day!:C4:1",
    "Count:E4:2 and:G4:1 sing:A4:1 and:G4:2 say:E4:2 A|EY1:E4:1 B|B-IY1:G4:1 C,|S-IY1:A4:2 hoo+:G4:2 ray!:C5:2",
    "Num+:E4:1 bers,:G4:1 let+:A4:1 ters,:G4:1 words:E4:2 to:D4:2 know,:E4:2 learn+:G4:1 ing:G4:1 more:A4:2 each:G4:1 day!:C5:1",
    "Zoom,:A4:2 zoom,:A4:2 Kid+:E4:1 do:A4:1 verse!:C5:2 Let's:G4:2 learn:E4:2 and:G4:2 play!:C5:2",
]
CHORUS_END2 = CHORUS[:3] + ["Zoom,:A4:2 zoom,:A4:2 Kid+:E4:1 do:A4:1 verse!:C5:2 Kid+:E4:2 do:G4:2 verse!:C5:4"]

INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
NUMINTRO = "Let's:E4:2 count:G4:2 to:A4:2 ten:G4:2 Rea+:E4:2 dy,:E4:2 set,:G4:2 count!:C5:2"
ABCINTRO = "Let's:E4:2 learn:G4:2 the:A4:2 ABCs|EY1-B-IY1-S-IY1-Z:G4:2 Let+:E4:2 ter,:G4:2 sound,:A4:2 word!:C5:2"
WORDSINTRO = "Two:E4:2 let+:G4:1 ter:G4:1 words,:A4:2 let's:G4:2 read:E4:2 them:G4:2 to+:A4:1 geth+:G4:1 er!:C5:2"
GAMEINTRO = "Let's:E4:2 play:G4:2 a:A4:2 game!:C5:2 Can:E4:2 you:G4:2 find:A4:2 it?:C5:2"
GAMES = [
    dict(type="number", q="Where:E4:2 is:G4:2 num+:A4:1 ber:A4:1 five?:C5:2", a="Yes!:C5:2 It's:A4:2 five!:G4:4", answer="5"),
    dict(type="letter", q="Where:E4:2 is:G4:2 let+:A4:1 ter:A4:1 M?|EH1-M:C5:2", a="Yes!:C5:2 It's:A4:2 M!|EH1-M:G4:4", answer="M"),
    dict(type="word", q="Which:E4:2 word:G4:2 says:A4:2 go?|G-OW1:C5:2", a="Yes!:C5:2 It's:A4:2 go!|G-OW1:G4:4", answer="go"),
]
DANCE = [
    "Clap,:G4:1 clap,:G4:1 A|EY1:A4:1 B|B-IY1:A4:1 C!|S-IY1:C5:4 Stomp,:E4:1 stomp,:E4:1 one,:G4:1 two,:G4:1 three!:A4:4",
    "Jump,:A4:1 jump,:A4:1 up,:C5:1 up,:C5:1 up!:E5:4 Spin:C5:1 a+:A4:1 round:G4:2 and:E4:2 shake!:G4:2",
    "Wig+:G4:1 gle:G4:1 left,:E4:1 wig+:A4:1 gle:A4:1 right!:G4:2 _:1 Count:E4:2 to:G4:2 ten,:A4:2 then:G4:2",
]

# ================================================================ section plan
PLAN = []                     # (kind, bars, meta)
def S(kind, bars, **meta): PLAN.append((kind, bars, meta))
S("intro", 4)
S("chorus", 8, nth=0)
S("numintro", 2)
for nd in NUMBERS: S("num", nd["bars"], n=nd["n"])
S("numrev", 4)
S("chorus", 8, nth=1)
S("abcintro", 2)
for gi, g in enumerate(GROUPS): S("abc", 6 if len(g) == 4 else 3, group=g)
S("abcsong", 10)
S("dance", 8)
S("wordsintro", 2)
for i, w in enumerate(WORDS): S("word", 2, w=w[0], k=i)
S("wordrev", 4)
S("gameintro", 2)
for i, g in enumerate(GAMES): S("game", 4, k=i, **g)
S("fin", 8, nth=2)
S("fin2", 8, nth=3)
S("outro", 8)

SECTIONS = [(k, b) for k, b, _ in PLAN]
TOTAL_BARS = sum(b for _, b in SECTIONS)
DURATION = TOTAL_BARS * BAR

# chord per bar (cycled)
CH_CHORUS = ["C", "G", "Am", "F", "C", "G", "F", "G"]
CYC = ["C", "Am", "F", "G"]
def prog_for(kind, bars, k=0):
    if kind == "intro": return ["C", "C", "C", "G"]
    if kind in ("chorus", "fin", "fin2"): return CH_CHORUS
    if kind in ("numintro", "abcintro", "wordsintro", "gameintro"): return ["C", "G"]
    if kind == "dance": return ["C", "C", "C", "F", "F", "G", "G", "C"]
    if kind == "outro": return ["C", "F", "C", "C", "C", "C", "C", "C"]
    if kind == "word": return ["C", "G"] if k % 2 == 0 else ["F", "C"]
    if kind == "wordrev": return ["C", "F", "G", "C"]
    if kind == "game": return ["Am", "F", "C", "G"]
    if kind == "abcsong": return ["C", "Am", "F", "G", "C", "Am", "F", "G", "C", "G"]
    return [CYC[i % 4] for i in range(bars)]          # num, numrev, abc
CHORD = {"C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7))}
TRANSPOSE = {"fin": 2, "fin2": 2}

# ================================================================ builders
def section_starts():
    out, bar = [], 0
    for i, (kind, bars, meta) in enumerate(PLAN):
        out.append(dict(i=i, kind=kind, bar0=bar, bars=bars, t0=bar * BAR, t1=(bar + bars) * BAR,
                        prog=prog_for(kind, bars, meta.get("k", 0)), transpose=TRANSPOSE.get(kind, 0), meta=meta))
        bar += bars
    return out

def parse_line(dsl, t0, voice, transpose=0):
    """DSL -> (words [{text, disp, ph, syl:[{note,t0,dur}], t0, t1}], total eighths)."""
    pos, words, cur = 0, [], None
    for tok in dsl.split():
        parts = tok.split(":")
        if parts[0] == "_":
            pos += int(parts[1]); continue
        text, note, ln = parts[0], parts[1], int(parts[2])
        join = text.endswith("+")
        text = text.rstrip("+")
        ph = None
        if "|" in text: text, ph = text.split("|", 1)
        syl = dict(note=midi(note) + transpose, t0=t0 + pos * EIGHTH, dur=ln * EIGHTH)
        if cur is None: cur = dict(parts=[text], syl=[syl], voice=voice, ph=ph)
        else: cur["parts"].append(text); cur["syl"].append(syl)
        pos += ln
        if not join:
            disp = "".join(cur["parts"])
            cur.update(disp=disp, text=re.sub(r"[^A-Za-z']", "", disp), t0=cur["syl"][0]["t0"], t1=cur["syl"][-1]["t0"] + cur["syl"][-1]["dur"])
            words.append(cur); cur = None
    assert cur is None, dsl
    return words, pos

def merge_brand(words):
    """'Kiddo'+'verse' -> one caption word 'Kiddoverse!' (sung as two words)."""
    out, i = [], 0
    while i < len(words):
        w = words[i]
        if w["text"].lower() == "kiddo" and i + 1 < len(words) and words[i + 1]["text"].lower() == "verse":
            n = words[i + 1]
            out.append(dict(w, disp="KiddoVerse" + re.sub(r"[A-Za-z']", "", n["disp"]), t1=n["t1"], merged=True, subs=[w, n]))
            i += 2
        else:
            out.append(dict(w)); i += 1
    return out

def polish_disp(kind, meta, words):
    """DISPLAY-ONLY punctuation / spelling fixes for captions, SRT and script.  Never touches text / ph / parts / syl (= the sung data)."""
    for w in words:
        t = w["text"]
        if kind == "numintro" and t == "ten": w["disp"] = "ten!"                       # "Let's count to ten! Ready, set, count!"
        if kind == "abcintro" and t == "ABCs": w["disp"] = "ABCs!"                     # "Let's learn the ABCs! Letter, sound, word!"
        if kind == "wordrev" and t == "my": w["disp"] = "my!"                          # "... it, my! We can read!"
        if kind == "abcsong" and t == "ABC's": w["disp"] = "ABCs"
    if kind == "wordsintro" and len(words) > 1 and words[0]["text"] == "Two" and words[1]["text"] == "letter":
        words[0]["disp"] = "Two-"; words[0]["glue"] = True                             # "Two-letter words" (glue = no space after this word)
    if kind == "abc" and meta.get("ch") == "A" and len(words) > 1 and words[1]["disp"] == "ah":
        words[1]["disp"] = "a"                                                         # A says the short-a of apple (O keeps "ah")
    return words

def build():
    secs = section_starts(); lines, speech = [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, "lead", tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=polish_disp(sec["kind"], mm, merge_brand(words)), meta=mm))
    for s in secs:
        k, t0, tr, m = s["kind"], s["t0"], s["transpose"], s["meta"]
        if k == "intro": add(s, INTRO_SUNG, t0, 8)
        elif k == "outro": add(s, OUTRO_SUNG, t0, 8)
        elif k in ("chorus", "fin", "fin2"):
            src = CHORUS_END2 if k == "fin2" else CHORUS
            for li, dsl in enumerate(src): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li), tr)
        elif k == "numintro": add(s, NUMINTRO, t0, 16)
        elif k == "abcintro": add(s, ABCINTRO, t0, 16)
        elif k == "wordsintro": add(s, WORDSINTRO, t0, 16)
        elif k == "gameintro": add(s, GAMEINTRO, t0, 16)
        elif k == "num":
            nd = NUMBERS[m["n"] - 1]
            add(s, nd["l1"], t0, 8, dict(part="intro"))
            add(s, nd["l2"], t0 + BAR, (nd["bars"] - 1) * 8, dict(part="count"))
        elif k == "numrev": add(s, NUMREV, t0, 32)
        elif k == "abc":
            g = m["group"]
            for j, ch in enumerate(g): add(s, letter_line(ch, GNAMES[g][j]), t0 + j * 12 * EIGHTH, 12, dict(ch=ch, word=LET[ch][3], j=j))
        elif k == "abcsong":
            for li, dsl in enumerate(ABCREV): add(s, dsl, t0 + li * 2 * BAR, 16, dict(li=li))
        elif k == "dance":
            for li, dsl in enumerate(DANCE): add(s, dsl, t0 + (1 + 2 * li) * BAR, 16, dict(li=li))
        elif k == "word":
            w, p1, p2, phrase = WORDS[m["k"]]
            add(s, word_line(w, p1, p2, phrase), t0, 16)
        elif k == "wordrev": add(s, WORDSREV, t0, 32)
        elif k == "game":
            add(s, m["q"], t0, 8, dict(part="q")); add(s, m["a"], t0 + 3 * BAR, 8, dict(part="a"))
    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]
    def at(kind, nth, bar, beat): return first(kind, nth)["t0"] + bar * BAR + beat * BAR / 4
    SP = [("intro", 0, 1, 0, "kiko", "All aboard the Learning Express!"), ("intro", 0, 2, 0, "luma", "Ready?"), ("intro", 0, 2, 2, "all", "Ready!"),
          ("intro", 0, 3, 0, "kiko", "Three!"), ("intro", 0, 3, 1, "luma", "Two!"), ("intro", 0, 3, 2, "gizmo", "One!"), ("intro", 0, 3, 3, "all", "Zoom!"),
          ("dance", 0, 0, 0, "kiko", "Time to move and learn!"), ("dance", 0, 7, 0, "all", "Freeze!"),
          ("outro", 0, 1, 0, "all", "See you next time!"), ("outro", 0, 3, 0, "luma", "Ask a grown-up to subscribe!")]
    for kind, nth, bar, beat, who, text in SP: speech.append(dict(t=at(kind, nth, bar, beat), who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech)

if __name__ == "__main__":
    d = build()
    here = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(os.path.join(here, "..", "data"), exist_ok=True)
    json.dump(d, open(os.path.join(here, "..", "data", "song.json"), "w"), indent=1)
    flat = lambda l: [x for w in l["words"] for x in w.get("subs", [w])]
    lo = min(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"]); hi = max(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    uniq = {(l["kind"], tuple((x["text"], s["note"], round(s["dur"], 2)) for x in flat(l) for s in x["syl"])) for l in d["lines"]}
    sung = sum(l["t1"] - l["t0"] for l in d["lines"])
    print(f"bars {TOTAL_BARS}  duration {DURATION:.0f}s = {int(DURATION // 60)}:{int(DURATION % 60):02d}  sections {len(d['sections'])}  lines {len(d['lines'])} (unique {len(uniq)})  speech {len(d['speech'])}")
    print(f"melody range midi {lo}-{hi}   total sung time {sung:.0f}s")
