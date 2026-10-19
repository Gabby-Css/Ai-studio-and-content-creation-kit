"""Quality check of rendered vocal chunks (sx/wav_lead/<key>.wav): what the recogniser hears vs the lyric, and pitch accuracy vs the score.
usage: python sx_check.py [key key ...]   (default: every wav in sx/wav_lead)   -> sx/check.txt"""
import json, hashlib, os, re, sys, difflib
import numpy as np, soundfile as sf, parselmouth
from scipy.signal import resample_poly
from faster_whisper import WhisperModel

HERE = os.path.dirname(os.path.abspath(__file__)); VOICE = os.environ.get("VOICE", "lead")
segs = json.load(open(os.path.join(HERE, "sx", f"{VOICE}_all.json"), encoding="utf8")); song = json.load(open(os.path.join(HERE, "..", "data", "song.json"), encoding="utf8"))
WORDS = [x for l in song["lines"] for ww in l["words"] for x in (ww.get("subs") or [ww])]
key = lambda s: hashlib.md5("|".join((s["phoneme"], s["note_pitch"], s["note_type"], s["duration"])).encode()).hexdigest()[:10]
byk = {}
for s in segs: byk.setdefault(key(s), s)
keys = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(os.path.join(HERE, "sx", f"wav_{VOICE}")))
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=4)
norm = lambda w: re.sub(r"[^a-z']", "", w.lower())
out, tot_hit, tot_ref = [], 0, 0
for k in keys:
    s = byk.get(k)
    if not s: print("unknown key", k); continue
    x, sr = sf.read(os.path.join(HERE, "sx", f"wav_{VOICE}", k + ".wav"), dtype="float32")
    if x.ndim == 2: x = x.mean(1)
    t0, t1 = s["time"][0] / 1000, s["time"][1] / 1000
    exp = [w["disp"] for w in WORDS if t0 - .02 <= w["t0"] < t1]
    ref = [norm(w["text"]) for w in WORDS if t0 - .02 <= w["t0"] < t1 and norm(w["text"])]
    x16 = resample_poly(x, 2, 3).astype(np.float32)
    segs_, _ = model.transcribe(x16, language="en", beam_size=5, condition_on_previous_text=False, temperature=0.0, compression_ratio_threshold=None, log_prob_threshold=None, no_speech_threshold=None)
    heard = " ".join(g.text.strip() for g in segs_); hyp = [norm(w) for w in heard.replace("-", " ").split() if norm(w)]
    hit = sum(b.size for b in difflib.SequenceMatcher(None, ref, hyp).get_matching_blocks()); tot_hit += hit; tot_ref += len(ref)
    # pitch vs score
    snd = parselmouth.Sound(x.astype("float64"), sr); pt = snd.to_pitch(time_step=.01, pitch_floor=120, pitch_ceiling=1000)
    t = 0.0; errs = []; unv = 0; nn = 0
    for d, ph, p in zip(s["duration"].split(), s["phoneme"].split(), s["note_pitch"].split()):
        d = float(d); p = int(p)
        if p > 0 and d >= .2:
            nn += 1; ts = np.arange(t + d * .25, t + d * .8, .01); f = np.array([pt.get_value_at_time(q) for q in ts], dtype=float); f = f[np.isfinite(f) & (f > 0)]
            if len(f) < 3: unv += 1
            else: errs.append(abs(np.median(1200 * np.log2(f / (440 * 2 ** ((p - 69) / 12))))))
        t += d
    e = np.array(errs) if errs else np.array([np.nan])
    line = f"{k} t={t0:6.1f}s  want: {' '.join(exp)[:60]:60s} | heard: {heard[:60]:60s} | words {hit}/{len(ref)}  pitch med err {np.nanmedian(e):4.0f} c  <50c {100 * np.mean(e < 50):3.0f}%  unvoiced {unv}/{nn}"
    print(line, flush=True); out.append(line)
print(f"WORDS {tot_hit}/{tot_ref} = {100 * tot_hit / max(1, tot_ref):.0f}%")
open(os.path.join(HERE, "sx", f"check_{VOICE}.txt"), "w", encoding="utf8").write("\n".join(out) + f"\nWORDS {tot_hit}/{tot_ref}\n")
