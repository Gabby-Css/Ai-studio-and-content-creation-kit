"""A/B speech-clarity test of mix variants on an EXCERPT of the song (the real mix4.py with MIX_RANGE, then Whisper small.en on every sung line).
usage: python mixtest.py <t0> <t1> [-v] name[:ENV=VAL,ENV=VAL] ...        e.g.  python mixtest.py 16 64 base nosfx:SFX_G=0 nomusic:MIX_MUSIC=silent.wav
A line counts a word as heard if it (or a close spelling / a known sound-alike of an animal sound) is in the transcript of the line's window."""
import sys, os, re, subprocess, difflib, numpy as np, soundfile as sf
sys.stdout.reconfigure(encoding="utf-8")
from faster_whisper import WhisperModel
import song, stages

HERE = os.path.dirname(os.path.abspath(__file__))
ALIKE = {"moo": {"moo", "mu", "moos", "mooo", "moooo"}, "quack": {"quack", "quak", "kwak", "quacks", "quacking"}, "oink": {"oink", "oinks", "oynk", "oik"},
         "baa": {"baa", "bah", "ba", "baaa", "baah", "baaah", "bye"}, "woof": {"woof", "wuff", "woofs", "wuf"}, "meow": {"meow", "meowing", "miao", "mew", "meo"},
         "neigh": {"neigh", "nay", "neighed", "neighs", "nae"}, "roar": {"roar", "rawr", "roared", "roars", "raw"}}
D = song.build()
t0, t1 = float(sys.argv[1]), float(sys.argv[2]); args = [a for a in sys.argv[3:] if a != "-v"]; verbose = "-v" in sys.argv
if not os.path.exists(os.path.join(HERE, "silent.wav")):
    sf.write(os.path.join(HERE, "silent.wav"), np.zeros((int(190 * 44100), 2), np.float32), 44100)
model = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
TMP = os.path.join(os.environ.get("TEMP", "."), "_mixtest_l3.wav")

def hear(y, sr):
    sf.write(TMP, y, sr)
    sg, _ = model.transcribe(TMP, language="en", beam_size=5, temperature=0.0, condition_on_previous_text=False, vad_filter=False)
    return " ".join(re.sub(r"[^a-z' ]", "", s.text.lower()) for s in sg).split()

def ok(e, heard):
    return e in heard or any(difflib.SequenceMatcher(None, e, w).ratio() >= .78 for w in heard if len(e) > 3) or (e in ALIKE and any(w in ALIKE[e] for w in heard))

def run(name, env):
    e = os.environ.copy(); e.update({k: v for k, v in stages.MIXENV.items() if k != "MIX_OUTTAG"})
    e.update(MIX_RANGE=f"{t0},{t1}", MIX_TAG=name, PYTHONUTF8="1"); e.update(env)
    r = subprocess.run([sys.executable, "mix4.py", env.get("VMR", os.environ.get("VMR", "13"))], cwd=HERE, env=e, capture_output=True, text=True)
    out = os.path.join(HERE, f"master_l4_{name}.wav")
    if r.returncode or not os.path.exists(out): print("MIX FAILED", name, r.stderr[-400:]); return None
    y, sr = sf.read(out, dtype="float32"); y = y.mean(axis=1) if y.ndim > 1 else y
    tot = {"any": [0, 0], "lead": [0, 0], "kids": [0, 0]}; sw = {}
    for ln in D["lines"]:
        if not (t0 + .3 <= ln["t0"] < t1 - 1.0): continue
        a, b = int(max(0, ln["t0"] - .4 - t0) * sr), int((ln["t1"] + .7 - t0) * sr)
        heard = hear(y[a:b], sr); words = [(re.sub(r"[^a-z']", "", x["text"].lower()), x["who"]) for w in ln["words"] for x in (w.get("subs") or [w])]
        words = [(w, who) for w, who in words if w]
        for w, who in words:
            h = ok(w, heard)
            for k in ("any", who): tot[k][0] += h; tot[k][1] += 1
            if w in ALIKE: sw.setdefault(w, [0, 0]); sw[w][0] += h; sw[w][1] += 1
        if verbose: print(f"     {ln['t0']:6.1f} {ln['meta'].get('part',''):6s} {' '.join(w for w, _ in words):38s} | {' '.join(heard)}")
    pct = lambda k: f"{100 * tot[k][0] / max(1, tot[k][1]):3.0f}% ({tot[k][0]}/{tot[k][1]})"
    print(f"{name:12s} any {pct('any')}  lead {pct('lead')}  kids {pct('kids')}  | " + " ".join(f"{w} {v[0]}/{v[1]}" for w, v in sw.items()), flush=True)

for a in args:
    name, _, envs = a.partition(":")
    run(name, dict(kv.split("=", 1) for kv in envs.split(",") if kv))
