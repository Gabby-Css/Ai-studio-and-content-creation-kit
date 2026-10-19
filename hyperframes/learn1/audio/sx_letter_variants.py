"""Build test segments (voice 'test') for alternative pronunciations of the hard phonics lines F, W, X -> sx/test_all.json
run with the SoulX venv python:  python sx_letter_variants.py      then:  SX_Q8=1 python sx_local.py mel test sx/prompt_lead2 12306 32 4 ; python sx_local.py voc test"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import song, sx_meta

V = {  # name: (line DSL, eighths)
    "F_ff":   ("F|EH1-F:G4:2 ff|F:G4:3 fish!:C5:3", 8),                 # continuous 'ffff' sound instead of 'fuh'
    "F_fuhsoft": ("F|EH1-F:G4:2 f|F-AH0:G4:2 fish!:C5:4", 8),           # lighter schwa
    "F_word": ("F|EH1-F:G4:2 F|F-IH1-SH:G4:2 fish!:C5:4", 8),           # sound = the word's own first syllable
    "W_long": ("W|D-AH1-B-AH0-L-Y-UW0:A4:4 wuh|W-AH1:A4:2 worm!:D5:4", 10),   # letter name gets a full beat
    "X_ks":   ("X|EH1-K-S:C5:2 ks|K-S:C5:2 box!:E5:4", 8),              # current
    "X_ksuh": ("X|EH1-K-S:C5:2 ks|K-S-AH0:C5:2 box!:E5:4", 8),
    "X_ex":   ("X|EH1-K-S:C5:3 ks|K-S:C5:2 box!:E5:3", 8),
}
segs = []
for name, (dsl, n) in V.items():
    words, pos = song.parse_line(dsl, 0.0, "lead"); assert pos == n, (name, pos, n)
    ln = dict(voice="lead", words=song.merge_brand(words))
    ns = sx_meta.notes_for_line(ln)
    for c in sx_meta.chunk(ns):
        s = sx_meta.segment(ln, c); s["index"] = "test_" + name; segs.append(s)
# distinct start times so the 'place' logic is never needed; each is rendered on its own
for i, s in enumerate(segs): s["time"] = [i * 10000, i * 10000 + (s["time"][1] - s["time"][0])]
json.dump(segs, open(os.path.join(HERE, "sx", "test_all.json"), "w", encoding="utf8"), indent=1)
print(len(segs), "variant segments ->", [s["index"] for s in segs])
