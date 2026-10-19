import sys, re, json, numpy as np, soundfile as sf, time
import singer
BPM = 108; E8 = 60 / BPM / 2
NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def midi(n): return 12 * (int(n[-1]) + 1) + NOTE[n[0]]
def line(dsl, t0):
    """'rain+:E4:2 bow:G4:2 big:A4:2 _:2' -> [(word, [(midi,t0,dur)...])]"""
    pos = 0; words = []; cur = None
    for tok in dsl.split():
        p = tok.split(":")
        if p[0] == "_": pos += int(p[1]); continue
        txt, note, ln = p[0], p[1], int(p[2]); join = txt.endswith("+"); txt = txt.rstrip("+")
        syl = (midi(note), t0 + pos * E8, ln * E8); pos += ln
        if cur is None: cur = [[txt], [syl]]
        else: cur[0].append(txt); cur[1].append(syl)
        if not join: words.append(("".join(cur[0]), cur[1])); cur = None
    return words, pos * E8
LINES = [
 "Toot:G4:2 toot:G4:2 Here:E4:2 comes:G4:2 the:A4:2 train:G4:6",
 "Rain+:E4:2 bow:G4:2 col+:A4:2 ors:C5:2 big:A4:2 and:G4:2 bright:E4:4",
 "Red:G4:2 and:G4:2 blue:A4:2 and:A4:2 yel+:C5:2 low:A4:2 too:G4:4",
 "Let's:E4:2 find:G4:2 the:A4:2 col+:G4:2 ors:E4:2 with:D4:2 me:C4:4",
]
voice = sys.argv[1] if len(sys.argv) > 1 else "af_heart"
out = np.zeros(int(30 * singer.SR), np.float32); t = 0.5; expect = []
for dsl in LINES:
    words, dur = line(dsl, t); t0 = time.time()
    for w, notes in words:
        y, ts = singer.sing_syllables(w, voice, notes, rng=np.random.default_rng(abs(hash(w)) % 1000))
        a = int(round(ts * singer.SR)); out[a:a + len(y)] += y[: len(out) - a]
        expect.append(re.sub(r"[^a-z']", "", w.lower()))
    print("line", dsl.split()[0], "done", round(time.time() - t0, 1), "s", flush=True)
    t += dur + .6
out = out[: int((t + .5) * singer.SR)]
sf.write(f"proto/p1_{voice}.wav", out, singer.SR)
print("expected:", " ".join(expect))
