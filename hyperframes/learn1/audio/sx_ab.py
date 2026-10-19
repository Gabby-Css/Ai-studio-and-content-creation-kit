"""Score excerpt mixes: % of intended lead lyric words an ASR hears.   usage: python sx_ab.py <t0> <t1> <label=wav> ...
(each wav starts at song time t0)"""
import sys, re, difflib
from faster_whisper import WhisperModel
import song

D = song.build(); t0, t1 = float(sys.argv[1]), float(sys.argv[2])
norm = lambda s: re.sub(r"[^a-z']", "", s.lower())
ref = [norm(x["disp"]) for ln in D["lines"] if ln["voice"] == "lead" and t0 <= ln["t0"] < t1
       for w in ln["words"] for x in (w.get("subs") or [w])]
ref = [r for r in ref if r]
m = WhisperModel("small.en", device="cpu", compute_type="int8", cpu_threads=2)
for arg in sys.argv[3:]:
    label, wav = arg.split("=", 1)
    segs, _ = m.transcribe(wav, language="en", beam_size=5, condition_on_previous_text=False, vad_filter=False)
    heard = " ".join(s.text.strip() for s in segs)
    hyp = [norm(w) for w in heard.replace("-", " ").split() if norm(w)]
    hit = sum(b.size for b in difflib.SequenceMatcher(None, ref, hyp).get_matching_blocks())
    print(f"{label:10s} {100 * hit / len(ref):3.0f}%  ({hit}/{len(ref)})  {heard}", flush=True)
