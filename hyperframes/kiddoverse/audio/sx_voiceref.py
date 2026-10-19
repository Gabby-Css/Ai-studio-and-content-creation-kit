"""Render a plain (old-pipeline) sung reference of song lines in [t_from, t_to) with ONE Kokoro voice, so it can be cut
into a SoulX timbre prompt with sx_prompt.py.   usage: python sx_voiceref.py <kokoro_voice> <resample> <t_from> <t_to> <out.wav>"""
import os, sys
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import vocals

v, rs, lo, hi, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
buf = np.zeros((vocals.N, 2))
for ln in vocals.D["lines"]:
    if ln["voice"] != "lead" or not (lo <= ln["t0"] < hi): continue
    for w in [x for ww in ln["words"] for x in ww.get("subs", [ww])]:
        r = vocals.load_raw(v, w["text"])
        if r is None: print("missing", w["text"]); continue
        notes = [s["note"] for s in w["syl"]]
        durs = [max(.12, s["dur"] * (.96 if i == len(w["syl"]) - 1 else 1.0)) for i, s in enumerate(w["syl"])]
        vocals.place(buf, w["t0"] - .012, vocals.sing(r[0], r[1], notes, durs, rs), 1.0, 0.0)
sf.write(out, buf.mean(1).astype(np.float32), vocals.SR)
print("ref", out)
