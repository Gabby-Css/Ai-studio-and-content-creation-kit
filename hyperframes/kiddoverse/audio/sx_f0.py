"""Fill the 'f0' field (50 frames/s, Praat pitch) of SoulX metadata from the matching audio.
usage: python sx_f0.py <meta.json> <audio.wav> [audio_t0_ms]   (segment times are relative to audio_t0_ms)"""
import json, sys
import numpy as np, soundfile as sf, parselmouth

def f0_track(x, sr, nframes):
    snd = parselmouth.Sound(x.astype("float64"), sr)
    p = snd.to_pitch(time_step=0.02, pitch_floor=120, pitch_ceiling=900)
    ts = np.arange(nframes) * 0.02 + 0.01
    f = np.nan_to_num(np.array([p.get_value_at_time(t) for t in ts], dtype=float))
    return " ".join(f"{v:.1f}" for v in f)

meta_p, wav = sys.argv[1], sys.argv[2]
base = float(sys.argv[3]) / 1000 if len(sys.argv) > 3 else 0.0
x, sr = sf.read(wav, dtype="float32")
if x.ndim == 2: x = x.mean(1)
m = json.load(open(meta_p, encoding="utf8"))
for s in m:
    n = int(round(sum(float(v) for v in s["duration"].split()) * 50))
    a = s["time"][0] / 1000 - base
    seg = x[max(0, int(a * sr)): int((a + n / 50) * sr) + sr // 10]
    s["f0"] = f0_track(seg, sr, n)
json.dump(m, open(meta_p, "w", encoding="utf8"), indent=1)
print("f0 filled", meta_p, len(m), "segments")
