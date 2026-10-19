"""Caption file (SRT), plain lyrics/script and YouTube chapter list for the LEARN video, generated from data/song.json (exact sung timing).
usage: python make_texts.py <out_dir>

SRT rules (kept in sync with the burned-in captions in build/kv_engine.js):
  - sung lines + spoken lines + the sung "KiddoVerse!" title + the spoken 3-2-1-Zoom countdown
  - an outgoing cue never overlaps the next one: end = next start - 0.02 s
  - the game question stays up through the thinking pause (until the answer cue)
  - lines are wrapped at <= 42 characters, preferably at a sentence / comma boundary
  - a dangling "..., then" cue is merged with the "Freeze!" that completes it"""
import json, os, sys, re

HERE = os.path.dirname(os.path.abspath(__file__))
S = json.load(open(os.path.join(HERE, "..", "data", "song.json"), encoding="utf8"))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "deliver"); os.makedirs(out, exist_ok=True)
MAXLEN = 42

def ts(t):
    ms = max(0, int(round(t * 1000))); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"
def mmss(t): return f"{int(t // 60)}:{int(t % 60):02d}"
def join(words):
    """display words -> text ('glue' = no space after the word, e.g. Two-letter)"""
    s = ""
    for i, w in enumerate(words): s += w["disp"] + ("" if (w.get("glue") or i == len(words) - 1) else " ")
    return s

def wrap(text, maxlen=MAXLEN):
    """<= maxlen characters per line: one line if it fits, else the most balanced split (a bonus for breaking after . ! ? ,)"""
    if len(text) <= maxlen: return text
    ws = text.split(" "); best = None
    for k in range(1, len(ws)):
        a, b = " ".join(ws[:k]), " ".join(ws[k:])
        if len(a) > maxlen or len(b) > maxlen: continue
        score = abs(len(a) - len(b)) - (18 if a[-1] in ".!?" else 7 if a[-1] == "," else 0)
        if best is None or score < best[0]: best = (score, a, b)
    if best: return best[1] + "\n" + best[2]
    # fallback: three lines
    n = len(ws); parts = [" ".join(ws[i * n // 3:(i + 1) * n // 3]) for i in range(3)]
    return "\n".join(parts)

# ---- captions: same rules as the burned-in ones
items = []
lines = [l for l in S["lines"] if not l.get("hidden") and l["kind"] != "intro"]
for i, ln in enumerate(lines):
    nxt = lines[i + 1] if i + 1 < len(lines) else None; end = ln["t1"] + .3
    if nxt and nxt["t0"] < end: end = nxt["t0"] - .02
    if ln["kind"] == "game" and ln.get("meta", {}).get("part") == "q" and nxt: end = nxt["t0"]     # the question stays up through the thinking time
    items.append(dict(words=ln["words"], first=ln["t0"], start=max(0, ln["t0"] - .12), core=ln["t1"], end=end))
for sp in S["speech"]:
    ws = sp["text"].split(" "); dd = max(.6, len(ws) * .34 + .2)
    items.append(dict(words=[dict(disp=w, t0=sp["t"] + k * (dd - .2) / len(ws)) for k, w in enumerate(ws)], first=sp["t"], start=sp["t"] - .05, core=sp["t"] + .1 + .3 * len(ws), end=sp["t"] + dd + .35))
intro = [l for l in S["lines"] if l["kind"] == "intro" and not l.get("hidden")]
if intro:                                                                                          # the sung "KiddoVerse!" title (0.00 - 1.90)
    items.append(dict(words=intro[0]["words"], first=intro[0]["t0"], start=0.0, core=intro[0]["t1"], end=1.90))
items.sort(key=lambda c: c["start"])
for i in range(1, len(items)):
    p, c = items[i - 1], items[i]
    if c["start"] < p["end"]:
        c["start"] = max(c["start"], min(p["core"], c["first"] - .03)); p["end"] = min(p["end"], c["start"])

# merge a dangling "..., then" with the "Freeze!" that completes it: [Wiggle left, wiggle right!] [Count to ten, then Freeze!]
merged = []
i = 0
while i < len(items):
    c = items[i]; w = c["words"]
    if i + 1 < len(items) and w[-1]["disp"].lower().strip(",.!") == "then" and items[i + 1]["words"][0]["disp"].lower().startswith("freeze"):
        n = items[i + 1]; cut = max([k for k, x in enumerate(w[:-1]) if x["disp"][-1] in ".!?"] or [-1]) + 1
        if cut > 0:
            a = dict(c, words=w[:cut], end=min(c["end"], w[cut]["t0"] - .12))
            b = dict(first=w[cut]["t0"], start=w[cut]["t0"] - .12, core=n["core"], end=n["end"], words=w[cut:] + n["words"])
            merged += [a, b]
        else:
            merged.append(dict(c, words=w + n["words"], end=n["end"], core=n["core"]))
        i += 2; continue
    merged.append(c); i += 1
items = merged
cues = []
for i, c in enumerate(items):
    end = c["end"]
    if i + 1 < len(items): end = min(end, items[i + 1]["start"] - .02)
    cues.append((c["start"], end, wrap(join(c["words"]))))
bad = [(round(a, 2), round(b - a, 2), t) for a, b, t in cues if b - a < .25]
if bad: print("WARNING short cues:", bad)
with open(os.path.join(out, "KiddoVerse_Learn3.srt"), "w", encoding="utf8") as f:
    for k, (a, b, txt) in enumerate(cues, 1): f.write(f"{k}\n{ts(a)} --> {ts(b)}\n{txt}\n\n")

# ---- script with timestamps, by section
NAME = {"intro": "INTRO", "hook": "THEME SONG - Animals! Let's hear them all", "stop": "ANIMAL STOP", "midhook": "SING-ALONG (half way)", "dance": "DANCE BREAK",
        "game": "QUIZ ROUND", "fin": "FINAL PARTY SONG (key up)", "outro": "OUTRO"}
with open(os.path.join(out, "KiddoVerse_Learn3_script.txt"), "w", encoding="utf8") as f:
    f.write("KiddoVerse Learn #3  -  Animal Sounds Dance Party\nOriginal songs, lyrics and melodies (c) KiddoVerse. 120 BPM, C major (animal stops change key, the finale is a tone higher).\n\n")
    for s in S["sections"]:
        head = f"[{mmss(s['t0'])}] {NAME.get(s['kind'], s['kind'].upper())}"
        if s["kind"] == "stop": head += f"  {s['meta']['i'] + 1}: {s['meta']['animal'].upper()}"
        if s["kind"] == "game": head += f"  {s['meta']['k'] + 1}: who says it? ({s['meta']['animal']})"
        f.write("\n" + head + "\n")
        for ln in S["lines"]:
            if ln["sec"] == s["i"]: f.write("   " + join(ln["words"]) + "\n")
        for sp in S["speech"]:
            if s["t0"] <= sp["t"] < s["t1"]: f.write(f"   ({sp['who'].upper()}: {sp['text']})\n")

# ---- YouTube chapters (first must be 0:00; each chapter >= 10 s, at least 3)
first = lambda kind: next(x for x in S["sections"] if x["kind"] == kind)
ANIMAL_CH = {a["key"]: f"{a['sound'].capitalize()}! The {a['name'].capitalize()}" for a in S["animals"]}
CH = [(S["sections"][0], "Animal Party Theme Song")]
CH += [(x, ANIMAL_CH[x["meta"]["animal"]]) for x in S["sections"] if x["kind"] == "stop"]
CH += [(first("dance"), "Dance Like the Animals"), (first("game"), "Quiz: Who Says It?"), (first("fin"), "Final Party Song"), (first("outro"), "Bye Bye")]
for (a, ta), (b, tb) in zip(CH, CH[1:] + [(dict(t0=S["duration"]), "")]):
    assert b["t0"] - a["t0"] >= 10 - 1e-6, ("chapter shorter than 10 s", ta)
with open(os.path.join(out, "KiddoVerse_Learn3_chapters.txt"), "w", encoding="utf8") as f:
    for sec, title in CH: f.write(f"{mmss(sec['t0'])} {title}\n")
print("cues", len(cues), "-> SRT, script, chapters in", os.path.abspath(out))
