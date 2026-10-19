"""Render the vocal STEMS of the song from song.build():  lead, double, harmony, kids A/B/C   (24 kHz mono each, whole song length).
usage:  python sing_song.py [stem ...]      stems: lead double harm kidsA kidsB kidsC     (default: all)
Every stem is built word by word (singer.sing_syllables) and placed on the song time line; nothing is mixed here."""
import os, sys, re, hashlib, time, json
import numpy as np, soundfile as sf
import song, singer

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "stems"); os.makedirs(OUT, exist_ok=True)
SR = singer.SR
D = song.build()
DUR = D["duration"] + 4

# stem -> (voice, who it sings, formant, detune cents, timing offset s, gain dB, speed, which section kinds / mode)
STEMS = {
    "lead":   dict(voice="af_heart",   who="lead", formant=1.04, cents=0,   off=0.000, gain=0.0,  speed=1.0),
    "double": dict(voice="af_nicole",  who="lead", formant=1.04, cents=7,   off=0.012, gain=-3.0, speed=1.0),
    "harm":   dict(voice="af_sarah",     who="lead", formant=1.00, cents=-4,  off=0.006, gain=-2.0, speed=1.0, harmony=True),
    "kidsA":  dict(voice="af_nova",    who="kids", formant=1.00, cents=0,   off=0.000, gain=0.0,  speed=1.0),
    "kidsB":  dict(voice="af_river",   who="kids", formant=1.04, cents=-9,  off=0.010, gain=0.0,  speed=1.0),
    "kidsC":  dict(voice="af_nova",    who="kids", formant=1.10, cents=11,  off=0.020, gain=0.0,  speed=1.0),
}
SPLIT = {}                                           # words sung as two separate syllable-words (none needed for the animal song so far)
HARM_KINDS = {"hook", "midhook", "fin"}              # the third-below harmony voice joins only the big party sections
# pronunciation that is only better in one kind of line: a held "oink" (1 s note in the sound line) is heard as "i ain't" with the default phonemes
PART_PHON = {("oink", "sound"): "ˈoɪŋk"}
PART_WORDS = {w for w, _ in PART_PHON}
END_CAP = os.environ.get("END_CAP", "1") != "0"
DOUBLE_SKIP = set()                                  # the double thickens every lead line; the mix decides how loud

C_MAJ = [0, 2, 4, 5, 7, 9, 11]
def third_below(note, tr):
    """diatonic third below (C major shifted by tr)"""
    r = (note - tr) % 12
    if r not in C_MAJ: return note - 3
    i = C_MAJ.index(r); j = i - 2
    low = C_MAJ[j] if j >= 0 else C_MAJ[j % 7] - 12
    return note - (C_MAJ[i] - low)

def render(stem):
    cfg = STEMS[stem]; n = int(DUR * SR); out = np.zeros(n, np.float32); t0 = time.time(); count = 0
    rng_ = os.environ.get("SING_RANGE"); lo, hi = (float(v) for v in rng_.split(",")) if rng_ else (0, 1e9)
    tag = ("_" + os.environ.get("SING_TAG", "x")) if rng_ else ""
    for ln in D["lines"]:
        if not (lo <= ln["t0"] < hi): continue
        sec = D["sections"][ln["sec"]]
        if cfg.get("harmony") and sec["kind"] not in HARM_KINDS: continue
        seq = [xx for w in ln["words"] for xx in (w.get("subs") or [w]) if xx["who"] == cfg["who"] and re.sub(r"[^A-Za-z']", "", xx["text"])]
        for w in ln["words"]:
            for x in (w.get("subs") or [w]):
                if x["who"] != cfg["who"]: continue
                word = re.sub(r"[^A-Za-z']", "", x["text"]);
                if not word: continue
                tr = sec["transpose"]
                notes = []
                for s in x["syl"]:
                    m = s["note"]
                    if cfg.get("harmony"): m = third_below(m, tr)
                    notes.append((m + cfg["cents"] / 100.0, s["t0"] + cfg["off"], s["dur"]))
                seed = int(hashlib.md5(f"{stem}|{word}|{x['t0']:.3f}".encode()).hexdigest()[:8], 16)
                parts = [(SPLIT[word.lower()][k], [notes[k]]) for k in range(2)] if (word.lower() in SPLIT and len(notes) == 2) else [(word, notes)]
                for pw_, pn_ in parts:
                    kw = {}
                    if END_CAP and x in seq and seq.index(x) + 1 < len(seq):          # a word that follows without a gap: leave room for this word's final consonant
                        y = seq[seq.index(x) + 1]; gap = y["syl"][0]["t0"] - (x["syl"][-1]["t0"] + x["syl"][-1]["dur"])
                        if gap < .06:
                            try: kw["end_cap"] = y["syl"][0]["t0"] + cfg["off"] - singer.onset_dur(re.sub(r"[^A-Za-z']", "", y["text"]), cfg["voice"]) - .01
                            except Exception: pass
                    if pw_.lower() in PART_WORDS:                                  # per-line pronunciation (the shared analysis cache must not be reused between the variants)
                        ph = PART_PHON.get((pw_.lower(), ln["meta"].get("part")))
                        if ph: singer.PHON[pw_.lower()] = ph
                        else: singer.PHON.pop(pw_.lower(), None)
                        kw.update(an_cache={})
                    try:
                        y, ts = singer.sing_syllables(pw_, cfg["voice"], pn_, speed=cfg["speed"], formant=cfg["formant"], rng=np.random.default_rng(seed), gain_db=cfg["gain"], **kw)
                    except Exception as ex:
                        print("FAILED", stem, pw_, ex, flush=True); continue
                    a = int(round(ts * SR))
                    if a < 0: y = y[-a:]; a = 0
                    m_ = min(len(y), n - a)
                    if m_ > 0: out[a:a + m_] += y[:m_]
                count += 1
        print(f"  {stem}: line t={ln['t0']:7.2f}s done ({count} words, {time.time() - t0:.0f}s)", flush=True)
    sf.write(os.path.join(OUT, stem + tag + ".wav"), out, SR)
    print(f"{stem}: {count} words -> stems/{stem}{tag}.wav  peak {np.abs(out).max():.2f}", flush=True)

if __name__ == "__main__":
    for st in (sys.argv[1:] or list(STEMS)): render(st)
