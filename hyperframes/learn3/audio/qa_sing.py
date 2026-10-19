"""Per-line intelligibility check of a vocal stem or the final mix: Whisper (small.en) on each sung line, scored against the lyric.
usage: python qa_sing.py <stem.wav> [t0 t1] [who=lead|kids|any]
Counts a lyric word as heard if the same word (or a close spelling / a known sound-alike of an animal sound) appears in the transcript of that line's window."""
import sys, re, os, difflib, tempfile, numpy as np, soundfile as sf
from faster_whisper import WhisperModel
import song

# what a listener (or the recogniser) may hear for the animal sounds: these count as correct
ALIKE = {"moo": {"moo", "mu", "moos", "mooo", "moooo"}, "quack": {"quack", "quak", "kwak", "quacks", "quacking"},
         "oink": {"oink", "oinks", "oynk", "oik"}, "baa": {"baa", "bah", "ba", "baaa", "baah", "baaah"},
         "woof": {"woof", "wuff", "woofs", "wuf"}, "meow": {"meow", "meowing", "miao", "mew", "meo"},
         "neigh": {"neigh", "nay", "neighed", "neighs", "nae"}, "roar": {"roar", "rawr", "roared", "roars", "raw"}}

stem = sys.argv[1]; lo = float(sys.argv[2]) if len(sys.argv) > 2 else 0; hi = float(sys.argv[3]) if len(sys.argv) > 3 else 1e9
who = sys.argv[4] if len(sys.argv) > 4 else "lead"
D = song.build()
y, sr = sf.read(stem, dtype="float32")
if y.ndim > 1: y = y.mean(axis=1)
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
tot = hit = 0; rows = []; per_word = {}
tmp = os.path.join(tempfile.gettempdir(), "_qa_seg_l3.wav")
for ln in D["lines"]:
    if not (lo <= ln["t0"] < hi): continue
    exp = [re.sub(r"[^a-z']", "", x["text"].lower()) for w in ln["words"] for x in (w.get("subs") or [w]) if who == "any" or x["who"] == who]
    exp = [e for e in exp if e]
    if not exp: continue
    a, b = int(max(0, ln["t0"] - .4) * sr), int((ln["t1"] + .7) * sr)
    sf.write(tmp, y[a:b], sr)
    sg, _ = m.transcribe(tmp, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, vad_filter=False)
    heard = " ".join(re.sub(r"[^a-z' ]", "", s.text.lower()) for s in sg).split()
    h = 0
    for e in exp:
        ok = e in heard or any(difflib.SequenceMatcher(None, e, w).ratio() >= .78 for w in heard if len(e) > 3) or (e in ALIKE and any(w in ALIKE[e] for w in heard))
        h += ok; pw = per_word.setdefault(e, [0, 0]); pw[0] += ok; pw[1] += 1
    tot += len(exp); hit += h
    rows.append((ln["t0"], ln["kind"], ln["meta"].get("part", ""), h, len(exp), " ".join(exp), " ".join(heard)))
    print(f"{ln['t0']:7.1f}s {ln['kind']:8s} {ln['meta'].get('part',''):7s} {h}/{len(exp)} {'OK ' if h == len(exp) else 'LOW' if h * 2 < len(exp) else 'mid'} | {' '.join(exp):42s} | {' '.join(heard)}", flush=True)
print(f"TOTAL {hit}/{tot} = {100 * hit / max(1, tot):.0f}%")
sound_words = [w for w in ALIKE if w in per_word]
print("animal sound words:", "  ".join(f"{w} {per_word[w][0]}/{per_word[w][1]}" for w in sound_words))
