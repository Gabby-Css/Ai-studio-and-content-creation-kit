"""Turn cached Kokoro words into SUNG vocals (Praat PSOLA to the melody) + character speech. Original + local."""
import os, sys, json
import numpy as np, soundfile as sf, parselmouth
from parselmouth.praat import call
from scipy.signal import resample_poly
import song

SR = 44100
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "cache")
D = song.build()
N = int((D["duration"] + 4) * SR)

def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def fname(w): return w.replace("'", "_") + ".wav"

def load_raw(voice, word):
    p = os.path.join(CACHE, voice, fname(word.lower()))
    if not os.path.exists(p): return None
    s, sr = sf.read(p, dtype="float64")
    pk = np.max(np.abs(s)) + 1e-9
    idx = np.where(np.abs(s) > 0.02 * pk)[0]
    a, b = max(0, idx[0] - int(.008 * sr)), min(len(s), idx[-1] + int(.012 * sr))
    return s[a:b], sr

def sing(raw, sr, notes, durs, rs, detune=0.0):
    """raw word -> sung. rs = pre-resample ratio (raises pitch+formants = younger voice)."""
    snd = parselmouth.Sound(raw, sampling_frequency=sr * rs)          # relabel = faster & higher
    cur = snd.duration; n = len(notes); seg = cur / n
    man = call(snd, "To Manipulation", 0.01, 80, 700)
    dt = call("Create DurationTier", "d", 0, cur)
    for i in range(n):
        a, b = i * seg, (i + 1) * seg; tgt = durs[i]
        on, co = min(.2 * seg, .07), min(.14 * seg, .05)
        if tgt <= seg: fo = fv = fc = tgt / seg
        else: fo = fc = 1.0; fv = (tgt - (on + co)) / (seg - on - co)
        for t, f in ((a + 1e-4, fo), (a + on, fo), (a + on + 2e-3, fv), (b - co, fv), (b - co + 2e-3, fc), (b - 1e-4, fc)):
            call(dt, "Add point", t, f)
    call([man, dt], "Replace duration tier")
    pt = call("Create PitchTier", "p", 0, cur)
    for i, m in enumerate(notes):
        a, b = i * seg, (i + 1) * seg
        base = mtof(m) * 2 ** (detune / 1200)
        out_dur = durs[i]; k = 0.0
        t = a + .02 * seg
        steps = max(2, int(out_dur / .02))                           # points every ~20 ms of OUTPUT time, with vibrato on long notes
        for q in range(steps + 1):
            tt = a + .02 * seg + (b - a - .04 * seg) * q / steps
            ot = out_dur * q / steps
            vib = 1 + (.0075 * np.sin(2 * np.pi * 5.3 * ot) * min(1, max(0, (ot - .22) / .25)) if out_dur >= .45 else 0)
            call(pt, "Add point", tt, base * vib)
    call(pt, "Add point", 0, mtof(notes[0]) * 2 ** (detune / 1200)); call(pt, "Add point", cur, mtof(notes[-1]) * 2 ** (detune / 1200))
    call([man, pt], "Replace pitch tier")
    out = call(man, "Get resynthesis (overlap-add)")
    y = out.values[0]; fs = out.sampling_frequency
    y = resample_poly(y, SR, int(round(fs))) if int(round(fs)) != SR else y
    pk = np.max(np.abs(y)) + 1e-9
    nf = int(.006 * SR); y = y / pk * .8
    y[:nf] *= np.linspace(0, 1, nf); y[-nf:] *= np.linspace(1, 0, nf)
    return y

def place(buf, t, y, g=1.0, pan=0.0):
    i = int(round(t * SR))
    if i < 0: y = y[-i:]; i = 0                                  # a word nudged before t=0 is trimmed, not wrapped
    j = min(buf.shape[0], i + len(y)); th = (pan + 1) * np.pi / 4
    buf[i:j, 0] += y[: j - i] * g * np.cos(th); buf[i:j, 1] += y[: j - i] * g * np.sin(th)

VOICES = {   # (kokoro voice, pre-resample, detune cents, pan, gain)
    "lead": [("af_heart", 1.22, 0, 0.0, 1.0)],
    "gang": [("af_sky", 1.30, +7, -.45, .55), ("bf_emma", 1.18, -7, +.45, .55)],
}

def render_sung():
    buf = np.zeros((N, 2)); miss = set(); stats = []
    for ln in D["lines"]:
        for w in [x for ww in ln["words"] for x in ww.get("subs", [ww])]:
            notes = [s["note"] for s in w["syl"]]
            durs = [max(.12, s["dur"] * (.96 if i == len(w["syl"]) - 1 else 1.0)) for i, s in enumerate(w["syl"])]
            for (v, rs, det, pan, g) in VOICES[ln["voice"]]:
                r = load_raw(v, w["text"])
                if r is None:
                    r = load_raw("af_heart", w["text"])               # fallback voice if a gang voice is not cached yet
                    if r is None: miss.add((v, w["text"])); continue
                y = sing(r[0], r[1], notes, durs, rs, det)
                jit = (hash((v, w["t0"])) % 17 - 8) / 1000.0 if ln["voice"] == "gang" else 0.0
                gain = g * (1.0 if ln["voice"] == "lead" else (.9 if ln["kind"] in ("dance",) else 1.0))
                place(buf, w["t0"] + jit - .012, y, gain, pan)
    return buf, miss

# ------------------------------------------------------------------ character speech
def robot(y):
    y = y.copy(); t = np.arange(len(y)) / SR
    y = y * (.55 + .45 * np.sign(np.sin(2 * np.pi * 70 * t)))             # square-wave ring mod
    y = np.tanh(y * 2.2) * .6
    d = int(.0042 * SR); out = y.copy(); out[d:] += .5 * y[:-d]          # metallic comb
    return out

def speak(raw, sr, who, k=0):
    snd = parselmouth.Sound(raw, sampling_frequency=sr)
    if who == "kiko":   x = call(snd, "Change gender", 75, 500, 1.30, 310, 1.25, 0.92)
    elif who == "luma": x = call(snd, "Change gender", 75, 500, 1.16, 285, 1.2, 0.95)
    elif who == "gizmo": x = call(snd, "Change gender", 75, 500, 1.1, 230, .05, 0.9)
    elif who == "all":  x = call(snd, "Change gender", 75, 500, 1.2 + .08 * k, [300, 250, 340][k % 3], 1.3, 0.9)
    else: x = snd
    y = x.values[0]; fs = int(round(x.sampling_frequency))
    y = resample_poly(y, SR, fs) if fs != SR else y
    if who == "gizmo": y = robot(y)
    return y / (np.max(np.abs(y)) + 1e-9) * .85

def render_speech():
    buf = np.zeros((N, 2))
    for i, sp in enumerate(D["speech"]):
        p = os.path.join(CACHE, "speech", f"{i:02d}_{sp['who']}.wav")
        if not os.path.exists(p): continue
        s, sr = sf.read(p, dtype="float64")
        idx = np.where(np.abs(s) > .02 * np.max(np.abs(s)))[0]; s = s[max(0, idx[0] - 200): idx[-1] + 400]
        if sp["who"] == "all":                                           # crowd = 3 differently-tuned copies
            for k, (off, pan, g) in enumerate(((0, -.4, .7), (.014, 0, .8), (-.01, .4, .7))):
                place(buf, sp["t"] + off, speak(s, sr, "all", k), g, pan)
        else:
            place(buf, sp["t"] - .01, speak(s, sr, sp["who"]), 1.0, {"kiko": -.15, "luma": .1, "gizmo": .15}.get(sp["who"], 0))
    return buf

if __name__ == "__main__":
    import time; t = time.time()
    sung, miss = render_sung(); print("sung", round(time.time() - t), "s; missing", sorted(miss)[:8], len(miss), flush=True)
    sp = render_speech(); print("speech", round(time.time() - t), "s", flush=True)
    sf.write(os.path.join(HERE, "vocals_sung.wav"), sung.astype(np.float32), SR)
    sf.write(os.path.join(HERE, "vocals_speech.wav"), sp.astype(np.float32), SR)
