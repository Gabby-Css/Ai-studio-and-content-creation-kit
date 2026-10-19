"""Convert data/song.json (our score: every syllable with MIDI note + timing) into SoulX-Singer metadata for the LEARN video.
One segment per phrase chunk, absolute times, word-level notes:
  first note of a word = type 2 with the whole word's ARPAbet, extra notes of the same word = type 3 (held/slur),
  rests = <SP> pitch 0 type 1.
A line is split into chunks at rests >= GAP_SPLIT seconds and, inside long runs (counting 1..10), at word starts once a chunk
passes MAX_LEN seconds, so every singing job stays short.  Words may carry an explicit pronunciation ('ph' from the DSL
'text|ARPA'), used for letter names and phonics sounds.   Run with the SoulX venv (needs g2p_en).
usage: python sx_meta.py <voice: lead> <out.json>"""
import json, os, re, sys
from g2p_en import G2p

HERE = os.path.dirname(os.path.abspath(__file__))
SONG = json.load(open(os.path.join(HERE, "..", "data", "song.json"), encoding="utf8"))
g2p = G2p()
OVERRIDE = {"kiddo": "K-IH1-D-OW0", "verse": "V-ER1-S", "a": "AH0", "the": "DH-AH0", "to": "T-UW1",
            "yoyo": "Y-OW1-Y-OW1", "abcs": "EY1-B-IY1-S-IY1-Z"}
GAP_SPLIT, MAX_LEN = 1.0, 4.6

def phon(x):
    if x.get("ph"): return "en_" + x["ph"]
    w = re.sub(r"[^a-z']", "", x["text"].lower())
    if w in OVERRIDE: return "en_" + OVERRIDE[w]
    ph = [p for p in g2p(w) if re.fullmatch(r"[A-Z]+[0-2]?", p)]
    return "en_" + "-".join(ph)

def notes_for_line(ln):
    """-> list of [start, end, phoneme, pitch, type] for the sung syllables of one line (no rests yet)."""
    out = []
    for w in ln["words"]:
        for x in (w.get("subs") or [w]):
            ph = phon(x)
            for i, s in enumerate(x["syl"]):
                out.append([s["t0"], s["t0"] + s["dur"], ph, int(s["note"]), 2 if i == 0 else 3])
    out.sort(key=lambda n: n[0])
    return out

def chunk(ns):
    chunks, cur = [], []
    for n in ns:
        if cur:
            gap = n[0] - cur[-1][1]; span = n[1] - cur[0][0]
            if gap >= GAP_SPLIT or (span > MAX_LEN and n[4] == 2):
                chunks.append(cur); cur = []
        cur.append(n)
    if cur: chunks.append(cur)
    return chunks

def segment(ln, ns, pad_end=0.25, gap_rest=0.06):
    t0 = ns[0][0]; items = []
    for i, n in enumerate(ns):
        start, end = n[0], n[1]
        nxt = ns[i + 1][0] if i + 1 < len(ns) else None
        if nxt is not None:
            if nxt - end <= gap_rest: end = nxt                    # legato: hold into the next note
            end = min(end, nxt)
        items.append([end - start, n[2], n[3], n[4]])
        if nxt is not None and nxt - end > 1e-6:
            items.append([nxt - end, "<SP>", 0, 1])
    t_end = ns[-1][1] + pad_end
    items.append([pad_end, "<SP>", 0, 1])
    return {
        "index": f"{ln['voice']}_{int(t0 * 1000)}",
        "language": "English",
        "time": [int(round(t0 * 1000)), int(round(t_end * 1000))],
        "duration": " ".join(f"{d:.3f}" for d, *_ in items),
        "text": " ".join(("<SP>" if p == "<SP>" else p[3:].replace("-", "")) for _, p, *_ in items),
        "phoneme": " ".join(p for _, p, _, _ in items),
        "note_pitch": " ".join(str(p) for *_, p, _ in items),
        "note_type": " ".join(str(t) for *_, t in items),
        "f0": "",
    }

if __name__ == "__main__":
    voice, out = sys.argv[1], sys.argv[2]
    segs = []
    for l in SONG["lines"]:
        if l["voice"] != voice: continue
        ns = notes_for_line(l)
        if ns: segs += [segment(l, c) for c in chunk(ns)]
    segs.sort(key=lambda s: s["time"][0])
    for a, b in zip(segs, segs[1:]):                              # never let a segment's tail overlap the next segment's start
        if a["time"][1] > b["time"][0]:
            cut = (a["time"][1] - b["time"][0]) / 1000
            d = [float(x) for x in a["duration"].split()]; d[-1] = max(0.02, d[-1] - cut); a["duration"] = " ".join(f"{x:.3f}" for x in d)
            a["time"][1] = b["time"][0]
    json.dump(segs, open(out, "w", encoding="utf8"), indent=1)
    tot = sum((s["time"][1] - s["time"][0]) / 1000 for s in segs)
    uniq = {(s["phoneme"], s["note_pitch"], s["note_type"], s["duration"]) for s in segs}
    udur = {}
    for s in segs: udur[(s["phoneme"], s["note_pitch"], s["note_type"], s["duration"])] = (s["time"][1] - s["time"][0]) / 1000
    print(voice, len(segs), "segments,", len(uniq), "unique,", f"{tot:.0f}s total, {sum(udur.values()):.0f}s unique ->", out)
    print(" longest segment:", f"{max(udur.values()):.1f}s")
