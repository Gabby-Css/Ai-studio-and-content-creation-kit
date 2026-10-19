"""python timings.py N -> per-line start, duration and word offsets (what the body's W(l,i) / DU / L use)"""
import json, sys
n = sys.argv[1]
W = json.load(open(f'toon{n}/words.json')); P = json.load(open(f'toon{n}/plan.json'))['LINE_T']
for k in sorted(W['words'], key=int):
    ws = W['words'][k]; t0 = P[k]
    print(f"L{k:>2} start {t0:6.2f}  dur {ws[-1]['e']:.2f}  end {t0+ws[-1]['e']:6.2f} | " + ' '.join(f"{i+1}:{w['w']}@{w['s']:.2f}" for i, w in enumerate(ws)))
