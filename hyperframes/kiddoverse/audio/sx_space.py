"""Render SoulX-Singer segments on the official HF Space (free GPU), window by window, into one 24 kHz track
aligned to song time.   usage: python sx_space.py <meta_abs.json> <prompt.wav> <prompt.json> <out.wav> [seed] [window_s]
Each window: segments re-based to t=0, the old vocal slice is sent as 'target audio' (format only; score mode
sings from the notes), result placed back at the window's song time.  Windows that fail are listed for a retry."""
import json, os, sys, time, shutil, subprocess
import numpy as np, soundfile as sf
from scipy.signal import resample_poly
from gradio_client import Client, handle_file

HERE = os.path.dirname(os.path.abspath(__file__))
meta_p, pw, pj, out = sys.argv[1:5]
seed = int(sys.argv[5]) if len(sys.argv) > 5 else 12306
WIN = float(sys.argv[6]) if len(sys.argv) > 6 else 50.0
SR = 24000
segs = json.load(open(meta_p, encoding="utf8"))
old, osr = sf.read(os.path.join(HERE, "vocals_sung.wav"), dtype="float32"); old = old.mean(1)
total = segs[-1]["time"][1] / 1000 + 1.0
track = np.zeros(int(total * SR), np.float32)
if os.path.exists(out):                                   # resume: keep what is already rendered
    prev, _ = sf.read(out, dtype="float32"); track[: min(len(prev), len(track))] = prev[: len(track)]
done_p = out + ".done.json"; done = set(json.load(open(done_p))) if os.path.exists(done_p) else set()

windows, cur = [], []
for s in segs:
    if cur and (s["time"][1] - cur[0]["time"][0]) / 1000 > WIN: windows.append(cur); cur = []
    cur.append(s)
if cur: windows.append(cur)
client = Client("Soul-AILab/SoulX-Singer", verbose=False)
tmp = os.path.join(HERE, "sx", "_win"); os.makedirs(tmp, exist_ok=True)
failed = []
for wi, w in enumerate(windows):
    key = f"{w[0]['time'][0]}-{w[-1]['time'][1]}"
    if key in done: print("skip (done)", key); continue
    base = w[0]["time"][0]
    ws = json.loads(json.dumps(w))
    for s in ws: s["time"] = [s["time"][0] - base, s["time"][1] - base]
    json.dump(ws, open(os.path.join(tmp, "t.json"), "w", encoding="utf8"))
    a, b = base / 1000, w[-1]["time"][1] / 1000
    sl = old[int(a * osr): int(b * osr)]
    sf.write(os.path.join(tmp, "t.wav"), resample_poly(sl, 80, 147).astype(np.float32), SR)
    ok = False
    for attempt in range(3):
        try:
            t = time.time()
            r = client.predict(prompt_audio=handle_file(pw), target_audio=handle_file(os.path.join(tmp, "t.wav")),
                               prompt_metadata=handle_file(pj), target_metadata=handle_file(os.path.join(tmp, "t.json")),
                               control="score", auto_shift=False, pitch_shift=0, seed=seed,
                               prompt_lyric_lang="English", target_lyric_lang="English", prompt_vocal_sep=False, target_vocal_sep=False,
                               api_name="/synthesis_function")
            if r and r[0]:
                y, ysr = sf.read(r[0], dtype="float32")
                if y.ndim == 2: y = y.mean(1)
                i0 = int(a * SR); n = min(len(y), len(track) - i0)
                seg_mask = np.zeros(n, bool)
                for s in ws:                                   # only copy inside this window's segments
                    seg_mask[int(s["time"][0] / 1000 * SR): int(s["time"][1] / 1000 * SR)] = True
                track[i0: i0 + n][seg_mask[:n]] = y[:n][seg_mask[:n]]
                done.add(key); json.dump(sorted(done), open(done_p, "w"))
                sf.write(out, track, SR)
                print(f"window {wi + 1}/{len(windows)} {a:.1f}-{b:.1f}s ok ({time.time() - t:.0f}s)", flush=True); ok = True; break
            print(f"window {wi + 1} empty result, attempt {attempt + 1}", flush=True)
        except Exception as e:
            print(f"window {wi + 1} error attempt {attempt + 1}: {str(e)[:300]}", flush=True)
        time.sleep(20 * (attempt + 1))
    if not ok: failed.append(key)
sf.write(out, track, SR)
print("DONE", out, "failed windows:", failed)
