"""KiddoVerse song spec: "Zoom, Zoom, Kiddoverse!"  (ORIGINAL lyrics + melody, 120 BPM, 4/4)
One data model drives: vocals synth, music arrangement, karaoke captions, lip-sync and the storyboard.

Line DSL (2 bars = 16 eighth-notes per line):   text:NOTE:len   len in eighths. '_:n' = rest.
  'Kid+' joins to the next token -> one sung word with several syllable-notes ("Kid"+"do" = "Kiddo").
  '||' separates lead part from a gang (kids-chorus) echo part.
"""
import re, json, os

BPM = 120
BAR = 60 / BPM * 4          # 2.0 s
EIGHTH = BAR / 8            # 0.25 s
BRAND = "KiddoVerse"

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n):                # 'G4' -> 67
    return 12 * (int(n[-1]) + 1) + NOTE[n[0]]

# ---------------------------------------------------------------- sections (kind, bars)
SECTIONS = [
    ("intro", 4), ("chorus", 8), ("v1", 8), ("chorus", 8), ("v2", 8), ("chorus", 8),
    ("v3", 8), ("dance", 8), ("v4", 8), ("bridge", 8), ("fin", 8), ("fin2", 8), ("outro", 6),
]
TOTAL_BARS = sum(b for _, b in SECTIONS)             # 98
DURATION = TOTAL_BARS * BAR                          # 196 s

# ---------------------------------------------------------------- chords (per bar)
C_CH = ["C", "G", "Am", "F", "C", "G", "F", "G"]
C_VE = ["C", "Am", "F", "G", "C", "Am", "F", "G"]
PROG = {
    "intro": ["C", "C", "C", "G"],
    "chorus": C_CH, "v1": C_VE, "v2": C_VE, "v3": C_VE, "v4": C_VE,
    "dance": ["C", "C", "C", "F", "F", "G", "G", "C"],
    "bridge": ["Am", "F", "C", "G", "Am", "F", "G", "G"],
    "fin": C_CH, "fin2": C_CH,
    "outro": ["C", "F", "C", "C", "C", "C"],
}
CHORD = {  # root (bass midi, octave 2) + triad intervals
    "C": (36, (0, 4, 7)), "G": (43, (0, 4, 7)), "Am": (45, (0, 3, 7)), "F": (41, (0, 4, 7)),
}
TRANSPOSE = {"fin": 2, "fin2": 2}

# ---------------------------------------------------------------- lyrics (2-bar lines)
HOOK = "Zoom,:G4:2 zoom,:G4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
LYR = {
    "chorus": [
        HOOK + " Hop:A4:1 on:G4:1 board,:E4:2 let's:D4:2 go!:E4:2",
        "Zoom,:A4:2 zoom,:A4:2 Kid+:E4:1 do:A4:1 verse!:C5:2 Clap,:A4:1 clap,:A4:1 here:G4:2 we:A4:2 go!:C5:2",
        "Round:E4:1 the:G4:1 stars:A4:2 and:G4:1 back:E4:1 a+:G4:1 gain,:E4:1 ev+:G4:1 ery+:G4:1 bod+:A4:1 y's:G4:1 wel+:E4:1 come:G4:1 in!:C5:2",
        "Zoom,:A4:2 zoom,:A4:2 Kid+:E4:1 do:A4:1 verse!:C5:2 Let's:G4:1 go,:E4:1 let's:G4:1 go,:E4:1 let's:G4:1 go!:C5:3",
    ],
    "v1": [
        "Rain+:E4:2 bow:G4:2 Hills,:A4:2 what:G4:2 do:E4:2 we:G4:2 see?:C5:4",
        "Red:A4:2 bal+:A4:2 loons:G4:2 float+:F4:2 ing:A4:2 free!:G4:6",
        "Yel+:E4:2 low:G4:2 sun:A4:2 and:G4:1 a:E4:1 deep:G4:2 blue:A4:2 sea,:E4:4",
        "Green,:A4:2 green:A4:2 grass:G4:2 for:E4:2 you:G4:2 and:A4:2 me!:C5:4",
    ],
    "v2": [
        "Rum+:G4:2 ble:G4:1 the:E4:1 di+:G4:2 no:A4:2 goes:G4:2 stomp,:E4:2 stomp,:E4:2 stomp!:C4:2",
        "Count+:A4:2 ing:A4:1 the:G4:1 eggs:F4:2 pop,:A4:2 pop,:A4:2 pop!:G4:6",
        "One,:C4:3 two,:D4:3 three,:E4:3 four,:G4:3 five!:A4:4",
        "Five:A4:2 lit+:G4:1 tle:A4:1 di+:G4:2 nos:E4:2 come:G4:2 a+:A4:1 live!:C5:5",
    ],
    "v3": [
        "Some+:E4:2 times:G4:1 I'm:A4:1 hap+:G4:2 py:E4:2 shin+:G4:2 ing:A4:1 bright,:C5:5",
        "Some+:E4:2 times:G4:1 I'm:A4:1 sad,:G4:2 and:E4:1 I:D4:1 rain:E4:2 at:D4:1 night.:D4:5",
        "Take:E4:2 a:G4:1 deep:A4:3 breath,:G4:3 count:E4:2 to:G4:1 two!:A4:4",
        "Hug:A4:2 a:A4:1 friend,:G4:3 the:E4:1 sun:G4:2 comes:A4:2 through!:C5:5",
    ],
    "v4": [
        "Cir+:G4:2 cle,:E4:2 cir+:G4:2 cle:E4:2 wheels:G4:2 go:A4:2 round!:G4:4",
        "Square,:A4:2 square,:A4:2 blocks:G4:2 on:E4:2 the:G4:2 ground!:E4:6",
        "Tri+:E4:1 an+:G4:1 gle,:A4:2 tri+:E4:1 an+:G4:1 gle,:A4:2 roofs:G4:2 up:A4:2 high!:C5:4",
        "Star,:A4:2 star,:A4:2 shin+:G4:2 ing:E4:1 in:G4:1 the:A4:2 sky!:C5:6",
    ],
    "bridge": [
        "Big:E4:2 or:E4:2 small,:G4:4 near:E4:2 or:G4:2 far!:A4:4",
        "Ev+:G4:2 ery:G4:1 one:A4:1 of:G4:2 us:E4:2 is:G4:1 a:A4:1 star!:C5:6",
        "Dif+:E4:1 fer+:G4:1 ent:A4:2 friends:G4:2 from:E4:2 ev+:G4:1 ery+:A4:1 where,:G4:6",
        "Kid+:G4:2 do:A4:2 verse:C5:4 has:A4:2 room:G4:2 to:E4:1 spare!:G4:3",
    ],
}
LYR["fin"] = LYR["chorus"]
LYR["fin2"] = LYR["chorus"][:3] + [
    "Zoom,:A4:2 zoom,:A4:2 Kid+:E4:1 do:A4:1 verse!:C5:2 Kid+:E4:2 do:G4:2 verse!:C5:4",
]

# dance break: (start_bar_in_section, "lead || gang echo")
DANCE = [
    (1, "Wig+:G4:1 gle:G4:1 left,:E4:1 wig+:A4:1 gle:A4:1 right!:G4:2 _:1 || Wig+:G4:1 gle:G4:1 left,:E4:1 wig+:A4:1 gle:A4:1 right!:G4:2 _:1"),
    (3, "Jump:G4:1 up:A4:1 high!:C5:2 spin:A4:1 a+:G4:1 round!:E4:2 || Jump:G4:1 up:A4:1 high!:C5:2 spin:A4:1 a+:G4:1 round!:E4:2"),
    (5, "Clap,:A4:1 clap!:A4:1 _:2 stomp,:E4:1 stomp!:E4:1 _:2 || Clap,:A4:1 clap!:A4:1 _:2 stomp,:E4:1 stomp!:E4:1 _:2"),
]
OUTRO_SUNG = "Bye:G4:2 bye,:E4:2 Kid+:E4:1 do:G4:1 verse!:C5:2"
INTRO_SUNG = "Kid+:E4:2 do:G4:2 verse!:C5:4"

# ---------------------------------------------------------------- spoken character lines
# (section, bar, beat) -> who says what   (who selects the voice treatment in build_audio.py)
SPEECH = [
    ("intro", 1, 0, "kiko", "All aboard the Zoomie!"),
    ("intro", 2, 0, "luma", "Ready?"),
    ("intro", 2, 2, "all", "Ready!"),
    ("intro", 3, 0, "kiko", "Three!"), ("intro", 3, 1, "luma", "Two!"),
    ("intro", 3, 2, "gizmo", "One!"), ("intro", 3, 3, "all", "Zoom!"),
    ("dance", 0, 0, "kiko", "Time for the Kiddo Wiggle!"),
    ("dance", 7, 0, "all", "Freeze!"),
    ("outro", 1, 0, "all", "See you next time!"),
    ("outro", 3, 0, "luma", "Ask a grown-up to subscribe!"),
]

# ================================================================ builders
def section_starts():
    out, bar = [], 0
    for i, (kind, bars) in enumerate(SECTIONS):
        out.append(dict(i=i, kind=kind, bar0=bar, bars=bars, t0=bar * BAR, t1=(bar + bars) * BAR,
                        prog=PROG[kind], transpose=TRANSPOSE.get(kind, 0)))
        bar += bars
    return out


def parse_line(dsl, t0, voice, transpose=0):
    """DSL -> list of words [{text, disp, syl:[{note,t0,dur}], t0, t1}] with absolute seconds."""
    pos, words, cur = 0, [], None
    for tok in dsl.split():
        parts = tok.split(":")
        if parts[0] == "_":
            pos += int(parts[1]); continue
        text, note, ln = parts[0], parts[1], int(parts[2])
        join = text.endswith("+")
        text = text.rstrip("+")
        syl = dict(note=midi(note) + transpose, t0=t0 + pos * EIGHTH, dur=ln * EIGHTH)
        if cur is None:
            cur = dict(parts=[text], syl=[syl], voice=voice)
        else:
            cur["parts"].append(text); cur["syl"].append(syl)
        pos += ln
        if not join:
            disp = "".join(cur["parts"])
            cur.update(disp=disp, text=re.sub(r"[^A-Za-z']", "", disp),
                       t0=cur["syl"][0]["t0"], t1=cur["syl"][-1]["t0"] + cur["syl"][-1]["dur"])
            words.append(cur); cur = None
    assert cur is None, dsl
    return words, pos


def merge_brand(words):
    """'Kiddo'+'verse' -> one caption word 'Kiddoverse!' (sung as two TTS words)."""
    out, i = [], 0
    while i < len(words):
        w = words[i]
        if w["text"].lower() == "kiddo" and i + 1 < len(words) and words[i + 1]["text"].lower() == "verse":
            n = words[i + 1]
            out.append(dict(w, disp="Kiddoverse" + re.sub(r"[A-Za-z']", "", n["disp"]), t1=n["t1"], merged=True, subs=[w, n]))
            i += 2
        else:
            out.append(dict(w)); i += 1
    return out


def build():
    secs = section_starts()
    lines, speech = [], []
    for s in secs:
        k, t0, tr = s["kind"], s["t0"], s["transpose"]
        if k == "dance":
            for bar, dsl in DANCE:
                lead, gang = [p.strip() for p in dsl.split("||")]
                lw, _ = parse_line(lead, t0 + bar * BAR, "lead")
                gw, _ = parse_line(gang, t0 + (bar + 1) * BAR, "gang")
                lines.append(dict(sec=s["i"], kind=k, voice="lead", t0=lw[0]["t0"], t1=lw[-1]["t1"], words=merge_brand(lw)))
                lines.append(dict(sec=s["i"], kind=k, voice="gang", t0=gw[0]["t0"], t1=gw[-1]["t1"], words=merge_brand(gw)))
            continue
        if k == "intro":
            lw, n = parse_line(INTRO_SUNG, t0, "lead"); gw, _ = parse_line(INTRO_SUNG, t0, "gang")
            lines.append(dict(sec=s["i"], kind=k, voice="lead", t0=lw[0]["t0"], t1=lw[-1]["t1"], words=merge_brand(lw)))
            lines.append(dict(sec=s["i"], kind=k, voice="gang", t0=gw[0]["t0"], t1=gw[-1]["t1"], words=merge_brand(gw), hidden=True))
            continue
        if k == "outro":
            lw, n = parse_line(OUTRO_SUNG, t0, "lead"); gw, _ = parse_line(OUTRO_SUNG, t0, "gang")
            lines.append(dict(sec=s["i"], kind=k, voice="lead", t0=lw[0]["t0"], t1=lw[-1]["t1"], words=merge_brand(lw)))
            lines.append(dict(sec=s["i"], kind=k, voice="gang", t0=gw[0]["t0"], t1=gw[-1]["t1"], words=merge_brand(gw), hidden=True))
            continue
        for li, dsl in enumerate(LYR[k]):
            lt0 = t0 + li * 2 * BAR
            lw, n = parse_line(dsl, lt0, "lead", tr)
            assert n == 16, (k, li, n, dsl)
            lines.append(dict(sec=s["i"], kind=k, voice="lead", t0=lw[0]["t0"], t1=lw[-1]["t1"], words=merge_brand(lw)))
            if k in ("chorus", "fin", "fin2"):          # kids' chorus doubles the hook
                gw, _ = parse_line(dsl, lt0, "gang", tr)
                lines.append(dict(sec=s["i"], kind=k, voice="gang", t0=gw[0]["t0"], t1=gw[-1]["t1"], words=merge_brand(gw), hidden=True))
    secidx = {(s["kind"], s["i"]): s for s in secs}
    for kind, bar, beat, who, text in SPEECH:
        s = next(x for x in secs if x["kind"] == kind)
        speech.append(dict(t=s["t0"] + bar * BAR + beat * BAR / 4, who=who, text=text, kind=kind))
    return dict(bpm=BPM, bar=BAR, duration=DURATION, brand=BRAND, sections=secs, lines=lines, speech=speech)


if __name__ == "__main__":
    d = build()
    here = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(here, "..", "data", "song.json")
    json.dump(d, open(out, "w"), indent=1)
    words = {}
    flat = lambda l: [x for w in l["words"] for x in w.get("subs", [w])]
    for ln in d["lines"]:
        for w in flat(ln):
            words[w["text"].lower()] = 1
    lo = min(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"]); hi = max(s["note"] for l in d["lines"] for w in flat(l) for s in w["syl"])
    print(f"bars {TOTAL_BARS}  duration {DURATION:.0f}s  sections {len(d['sections'])}  lines {len(d['lines'])}  speech {len(d['speech'])}")
    print(f"unique sung words {len(words)}  melody range midi {lo}-{hi}")
    print(sorted(words))
