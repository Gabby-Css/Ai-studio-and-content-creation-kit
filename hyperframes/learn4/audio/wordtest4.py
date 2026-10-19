"""rectangle / oval / star variants on the real lines (lead voice)"""
import re, sys
sys.argv = [sys.argv[0]]
import wordtest as W
W.TESTS[:] = [
    ("rectangle", [None, "ɹˈɛktæŋɡəl", ("ɹˈɛktæŋɡəl", None)], ["Rec+:G4:1 tan+:G4:1 gle,:G4:2 rec+:A4:1 tan+:A4:1 gle,:A4:2 long:A4:2 and:A4:1 wide!:C5:3 _:2", "Door:G4:2 is:G4:1 a:G4:1 rec+:C5:1 tan+:A4:1 gle!:G4:2"]),
]
W.ALIKE.update({"rectangle": {"rectangle", "rectangles"}})
for word, variants, lines in W.TESTS:
    for v in variants:
        ipa, kw = (v if isinstance(v, tuple) else (v, None))
        if ipa is None: W.singer.PHON.pop(word, None)
        else: W.singer.PHON[word] = ipa
        res = []
        for dsl in lines:
            y = W.render_line(dsl, target=word, kw=kw); res.append(" ".join(W.hear(y)))
        print(f"  {str(v):24s}", " // ".join(res), flush=True)
