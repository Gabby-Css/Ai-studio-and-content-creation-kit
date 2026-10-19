"""Convert data/song.json (our score: every syllable with MIDI note + timing) into SoulX-Singer metadata.
One segment per lyric line, absolute times, word-level notes:
  first note of a word = type 2 with the whole word's ARPAbet, extra notes of the same word = type 3 (held/slur),
  rests = <SP> pitch 0 type 1.   Run with the SoulX venv (needs g2p_en).
usage: python sx_meta.py <voice: lead|gang> <out.json> [t_from t_to]"""
import json, os, re, sys
from g2p_en import G2p

HERE = os.path.dirname(os.path.abspath(__file__))
SONG = json.load(open(os.path.join(HERE, "..", "data", "song.json"), encoding="utf8"))
g2p = G2p()
OVERRIDE = {"kiddo": "K-IH1-D-OW0", "verse": "V-ER1-S", "zoomie": "Z-UW1-M-IY0", "kiko": "K-IY1-K-OW0", "luma": "L-UW1-M-AH0",
            "bloop": "B-L-UW1-P", "gizmo": "G-IH1-Z-M-OW0", "nimbus": "N-IH1-M-B-AH0-S", "rumble": "R-AH1-M-B-AH0-L",
            "a": "AH0", "the": "DH-AH0", "to": "T-UW1"}

def phon(word):
    w = re.sub(r"[^a-z']", "", word.lower())
    if w in OVERRIDE: return "en_" + OVERRIDE[w]
    ph = [p for p in g2p(w) if re.fullmatch(r"[A-Z]+[0-2]?", p)]
    return "en_" + "-".join(ph)

def notes_for_line(ln):
    """-> list of (start, end, phoneme, pitch, type) for the sung syllables of one line (no rests yet)."""
    out = []
    for w in ln["words"]:
        for x in (w.get("subs") or [w]):
            ph = phon(x["text"])
            for i, s in enumerate(x["syl"]):
                out.append([s["t0"], s["t0"] + s["dur"], ph, int(s["note"]), 2 if i == 0 else 3])
    out.sort(key=lambda n: n[0])
    return out

def segment(ln, pad_end=0.25, gap_rest=0.06):
    ns = notes_for_line(ln)
    if not ns: return None
    t0 = ns[0][0]
    items = []
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
    lo, hi = (float(sys.argv[3]), float(sys.argv[4])) if len(sys.argv) > 4 else (-1, 1e9)
    segs = [s for s in (segment(l) for l in SONG["lines"] if l["voice"] == voice and lo <= l["t0"] < hi) if s]
    segs.sort(key=lambda s: s["time"][0])
    # never let a segment's tail overlap the next segment's start
    for a, b in zip(segs, segs[1:]):
        if a["time"][1] > b["time"][0]:
            cut = (a["time"][1] - b["time"][0]) / 1000
            d = [float(x) for x in a["duration"].split()]; d[-1] = max(0.02, d[-1] - cut); a["duration"] = " ".join(f"{x:.3f}" for x in d)
            a["time"][1] = b["time"][0]
    json.dump(segs, open(out, "w", encoding="utf8"), indent=1)
    print(voice, len(segs), "segments ->", out)
    for s in segs[:2]: print(" ", s["time"], s["phoneme"][:120])
