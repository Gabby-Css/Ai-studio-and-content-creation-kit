"""Bootstrap a natural SoulX timbre prompt: join rendered lines (wav_<dir>/<key>.wav) of one voice into a single
8.2 s prompt clip + metadata, like prompt_lead2 was made from a SoulX output (keeps style human, no PSOLA artefacts).
usage: python sx_boot.py <voice> <wav_dir> <song_ms,song_ms> <out_prefix>     (keys looked up from song times)"""
import json, os, sys
import numpy as np, soundfile as sf
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sx_local import uniq, HERE

voice, wdir, times, out = sys.argv[1], sys.argv[2], [int(x) for x in sys.argv[3].split(",")], sys.argv[4]
by_t = {t: (k, m) for k, m, ts in uniq(voice) for t in ts}
audio, items = [], []
for t in times:
    k, m = by_t[t]
    seg_s = (m["time"][1] - m["time"][0]) / 1000
    y, sr = sf.read(os.path.join(HERE, "sx", wdir, k + ".wav"), dtype="float32")
    y = np.pad(y, (0, max(0, int(seg_s * sr) - len(y))))[: int(seg_s * sr)]; audio.append(y)
    seg = [list(x) for x in zip(*(m[f].split() for f in ("duration", "phoneme", "note_pitch", "note_type")))]
    used = 0.0
    for x in seg:                                            # clip the note list to exactly seg_s
        d = min(float(x[0]), seg_s - used)
        if d <= 0.001: break
        x[0] = f"{d:.3f}"; items.append(x); used += d
    if seg_s - used > 0.001: items.append([f"{seg_s - used:.3f}", "<SP>", "0", "1"])
items.append(["0.200", "<SP>", "0", "1"])
y = np.concatenate(audio + [np.zeros(int(.2 * sr), np.float32)]); y = y / (np.abs(y).max() + 1e-9) * .7
sf.write(out + ".wav", y, sr)
tot = sum(float(x[0]) for x in items)
json.dump([{"index": os.path.basename(out), "language": "English", "time": [0, int(round(tot * 1000))],
            "duration": " ".join(x[0] for x in items), "text": " ".join(x[1] if x[1] == "<SP>" else x[1][3:] for x in items),
            "phoneme": " ".join(x[1] for x in items), "note_pitch": " ".join(x[2] for x in items),
            "note_type": " ".join(x[3] for x in items), "f0": ""}], open(out + ".json", "w", encoding="utf8"), indent=1)
print("boot prompt", out, f"{tot:.2f}s audio {len(y) / sr:.2f}s")
