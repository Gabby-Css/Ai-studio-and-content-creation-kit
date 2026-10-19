"""Can a speech recogniser understand the sung lyrics? Compare its transcript to the intended words per section."""
import sys, re, difflib, json
from faster_whisper import WhisperModel
import song

D = song.build()
model = WhisperModel(sys.argv[1] if len(sys.argv) > 1 else "base.en", device="cpu", compute_type="int8")
segs, _ = model.transcribe("vocal_check.wav", language="en", word_timestamps=True, vad_filter=False, beam_size=5, condition_on_previous_text=False)
words = [(w.start, w.end, re.sub(r"[^a-z']", "", w.word.lower())) for s in segs for w in s.words]
json.dump(words, open("asr_words.json", "w"))
norm = lambda s: re.sub(r"[^a-z' ]", "", s.lower())
tot_ref = tot_hit = 0
for sec in D["sections"]:
    ref = []
    for ln in D["lines"]:
        if ln["sec"] != sec["i"] or ln["voice"] != "lead": continue
        ref += [norm(x["disp"]) for w in ln["words"] for x in (w.get("subs") or [w])]
    ref = [r for r in ref if r]
    hyp = [w for (a, b, w) in words if sec["t0"] - .3 <= a < sec["t1"] and w]
    sm = difflib.SequenceMatcher(None, ref, hyp); hit = sum(b.size for b in sm.get_matching_blocks())
    tot_ref += len(ref); tot_hit += hit
    print(f"{sec['kind']:7s} t={sec['t0']:5.0f}s  words {len(ref):3d}  recognised {hit:3d} ({100 * hit / max(1, len(ref)):3.0f}%)   heard: {' '.join(hyp)[:110]}")
print(f"OVERALL recognised {tot_hit}/{tot_ref} = {100 * tot_hit / tot_ref:.0f}%")
