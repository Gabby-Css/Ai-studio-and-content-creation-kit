"""Detect the SoulX failure seen in the first "F, fuh, fish": a word-final fricative (sh/s/f/z/th/ch) is placed in the MIDDLE of the sung note
and the voice carries on (vowel again) after it.  Uses the score (note times) + pitch track + 4-10 kHz noise.
usage: python sx_tail.py [voice:key ...]        library: bad_notes(wav_path, seg) -> list of (note index, phonemes, note start s, why)"""
import os, sys, re, json, hashlib
import numpy as np, soundfile as sf, parselmouth
from scipy.signal import stft

HERE = os.path.dirname(os.path.abspath(__file__))
FRIC = {"S", "SH", "F", "Z", "TH", "CH", "JH", "V", "DH"}
key = lambda s: hashlib.md5("|".join((s["phoneme"], s["note_pitch"], s["note_type"], s["duration"])).encode()).hexdigest()[:10]

def analyse(x, sr):
    """frame times, voiced mask, noise mask (10 ms grid)"""
    snd = parselmouth.Sound(x.astype("float64"), sr); pt = snd.to_pitch(time_step=.01, pitch_floor=120, pitch_ceiling=1000)
    f, tt, Z = stft(x, fs=sr, nperseg=int(sr * .02), noverlap=int(sr * .02) - int(sr * .005), window="hann")
    P = np.abs(Z) ** 2; hf = P[(f >= 4000) & (f <= 10000)].sum(0); lf = P[(f >= 100) & (f <= 2000)].sum(0)
    e_hf = 10 * np.log10(hf + 1e-12); e_lf = 10 * np.log10(lf + 1e-12); ratio = e_hf - e_lf
    g = np.arange(0, len(x) / sr, .01)
    voiced = np.array([pt.get_value_at_time(t) > 0 if np.isfinite(pt.get_value_at_time(t)) else False for t in g])
    hfg = np.interp(g, tt, e_hf); rg = np.interp(g, tt, ratio)
    noise = (rg > -6) & (hfg > hfg.max() - 38) & ~voiced
    return g, voiced, noise

def bad_notes(path, seg):
    x, sr = sf.read(path, dtype="float32")
    if x.ndim == 2: x = x.mean(1)
    g, voiced, noise = analyse(x, sr); out = []; t0 = 0.0
    for i, (d, ph, p) in enumerate(zip(seg["duration"].split(), seg["phoneme"].split(), seg["note_pitch"].split())):
        d = float(d); toks = [q.replace("en_", "") for q in ph.split("-")] if ph != "<SP>" else []
        if int(p) > 0 and d >= .35 and toks and toks[-1] in FRIC:
            m = (g >= t0) & (g < t0 + d); s = "".join("N" if a else ("V" if b else ".") for a, b in zip(noise[m], voiced[m]))
            hit = re.search(r"V{8,}\.{0,3}N{8,}\.{0,3}V{15,}", s)                 # vowel -> long hiss -> vowel again, inside ONE note that should end on the hiss
            if hit: out.append((i, ph, t0, f"voiced / long '{toks[-1]}' noise / voiced again ({hit.start() / len(s):.0%}-{hit.end() / len(s):.0%} of the note)"))
            elif "N" not in s[-25:]: out.append((i, ph, t0, f"no '{toks[-1]}' noise at the end of the note"))
        t0 += d
    return out

if __name__ == "__main__":
    segs = {}
    for v in ("lead", "test"):
        p = os.path.join(HERE, "sx", f"{v}_all.json")
        if os.path.exists(p):
            for s in json.load(open(p, encoding="utf8")): segs.setdefault((v, key(s)), s)
    for it in sys.argv[1:]:
        v, k = it.split(":")[:2]; print(it, bad_notes(os.path.join(HERE, "sx", f"wav_{v}", k + ".wav"), segs[(v, k)]) or "ok")
