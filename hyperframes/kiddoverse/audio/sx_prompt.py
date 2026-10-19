"""Cut a voice-prompt clip (24 kHz mono) + matching SoulX metadata from a vocal wav whose notes we know.
usage: python sx_prompt.py <src.wav> <voice lead|gang> <t_from> <t_to> <out_prefix> [src_offset_s]
  src_offset_s: where song-time 0 sits inside src.wav (default 0)."""
import json, os, sys
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from math import gcd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sx_meta import SONG, notes_for_line

src, voice, lo, hi, out = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), sys.argv[5]
off = float(sys.argv[6]) if len(sys.argv) > 6 else 0.0
ns = []
for ln in SONG["lines"]:
    if ln["voice"] == voice and lo <= ln["t0"] < hi: ns += notes_for_line(ln)
ns.sort(key=lambda n: n[0])
t0, pad = ns[0][0], 0.2
items = []
for i, n in enumerate(ns):
    start, end = n[0], n[1]
    nxt = ns[i + 1][0] if i + 1 < len(ns) else None
    if nxt is not None:
        if nxt - end <= .06: end = nxt
        end = min(end, nxt)
    items.append([end - start, n[2], n[3], n[4]])
    if nxt is not None and nxt - end > 1e-6: items.append([nxt - end, "<SP>", 0, 1])
items.append([pad, "<SP>", 0, 1])
t1 = ns[-1][1] + pad
x, sr = sf.read(src, dtype="float32")
if x.ndim == 2: x = x.mean(1)
x = x[int((t0 + off) * sr): int((t1 + off) * sr)]
g = gcd(24000, sr); y = resample_poly(x, 24000 // g, sr // g).astype(np.float32)
y = y / (np.max(np.abs(y)) + 1e-9) * 0.7
sf.write(out + ".wav", y, 24000)
meta = [{"index": os.path.basename(out), "language": "English", "time": [0, int(round((t1 - t0) * 1000))],
         "duration": " ".join(f"{d:.3f}" for d, *_ in items), "text": " ".join(("<SP>" if p == "<SP>" else p[3:]) for _, p, *_ in items),
         "phoneme": " ".join(p for _, p, _, _ in items), "note_pitch": " ".join(str(p) for *_, p, _ in items),
         "note_type": " ".join(str(t) for *_, t in items), "f0": ""}]
json.dump(meta, open(out + ".json", "w", encoding="utf8"), indent=1)
print("prompt", out, f"{t1 - t0:.2f}s", len(items), "notes")
