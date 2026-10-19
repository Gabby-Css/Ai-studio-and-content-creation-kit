"""Intelligibility of the FULL MIX (what listeners hear): ASR transcript vs intended lead lyrics, per section.
usage: python qa_asr_mix.py <audio.wav> [model]"""
import sys, re, difflib
from faster_whisper import WhisperModel
import song

D = song.build()
path = sys.argv[1]
model = WhisperModel(sys.argv[2] if len(sys.argv) > 2 else "small.en", device="cpu", compute_type="int8", cpu_threads=4)
segs, _ = model.transcribe(path, language="en", word_timestamps=True, vad_filter=False, beam_size=5, condition_on_previous_text=False,
                          **(dict(temperature=0.0, compression_ratio_threshold=None, log_prob_threshold=None, no_speech_threshold=None) if __import__("os").environ.get("QA_ROBUST") else {}))
words = [(w.start, w.end, re.sub(r"[^a-z']", "", w.word.lower())) for s in segs for w in s.words]
norm = lambda s: re.sub(r"[^a-z' ]", "", s.lower())
tot_ref = tot_hit = 0
for sec in D["sections"]:
    ref = []
    for ln in D["lines"]:
        if ln["sec"] != sec["i"] or ln["voice"] != "lead": continue
        ref += [norm(x["disp"]) for w in ln["words"] for x in (w.get("subs") or [w])]
    ref = [r for r in ref if r]
    if not ref: continue
    hyp = [w for (a, b, w) in words if sec["t0"] - .3 <= a < sec["t1"] and w]
    sm = difflib.SequenceMatcher(None, ref, hyp); hit = sum(b.size for b in sm.get_matching_blocks())
    tot_ref += len(ref); tot_hit += hit
    print(f"{sec['kind']:7s} t={sec['t0']:5.0f}s  words {len(ref):3d}  recognised {hit:3d} ({100 * hit / max(1, len(ref)):3.0f}%)   heard: {' '.join(hyp)[:100]}", flush=True)
print(f"OVERALL {path}: recognised {tot_hit}/{tot_ref} = {100 * tot_hit / tot_ref:.0f}%")
