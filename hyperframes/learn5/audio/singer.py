"""KiddoVerse singer v3 - clear, human sing-song voice.

Every lyric WORD is first spoken by Kokoro (a natural, well-articulated voice), so all consonants and vowels are intact.  The WORLD vocoder
then (1) puts every vowel on the melody note (pitch), (2) holds the vowel for the note length while the consonants keep their natural
speed and are placed just BEFORE the beat (so the vowel lands on the beat, as a real singer does), (3) adds a little vibrato, scoop
and drift so it does not sound like a machine.  Voice 'layers' (double, harmony, children) are made from other voices / formant shifts.

  sing_syllables(word_text, voice, notes, ...)  notes = [(midi, t0, dur), ...]  (one tuple per syllable, absolute seconds)
  -> (samples24k, t_start)    samples are placed on the song time line by the caller
"""
import os, re, hashlib
import numpy as np, soundfile as sf, pyworld as pw
from scipy.signal import find_peaks, medfilt, lfilter

SR = 24000
CONS_ON = float(os.environ.get("CONS_ON", 0)); CONS_OFF = float(os.environ.get("CONS_OFF", 0))      # dB lift of the word-start / word-end consonants (0 = natural)
FP = 5.0                       # WORLD frame period, ms
HERE = os.path.dirname(os.path.abspath(__file__))
TOK = os.path.join(HERE, "tok"); os.makedirs(TOK, exist_ok=True)

# ---------------------------------------------------------------------------------------------- Kokoro
_k = None
def kokoro():
    global _k
    if _k is None:
        import kokoro_onnx
        M = os.path.expanduser("~/.cache/kokoro-onnx/")
        _k = kokoro_onnx.Kokoro(M + "kokoro-v1.0.onnx", M + "voices-v1.0.bin")
    return _k

# small words that Kokoro over-stresses when said alone: give the unstressed pronunciation (IPA)
PHON = {"the": "ðə", "a": "ɐ", "to": "tə", "of": "əv", "and": "ænd", "is": "ɪz", "are": "ɑːɹ", "it's": "ɪts", "i": "aɪ", "in": "ɪn", "at": "æt", "on": "ɑːn", "pul": "pəl", "who": "hˈu"}

def speak(text, voice="af_heart", speed=1.0):
    t = text.lower().strip()
    ph = PHON.get(t)
    key = hashlib.md5(f"{voice}|{t}|{speed:.2f}|{ph}".encode("utf8")).hexdigest()[:14]
    p = os.path.join(TOK, key + ".wav")
    if os.path.exists(p): return sf.read(p, dtype="float32")[0]
    s, sr = kokoro().create(ph or t, voice=voice, speed=speed, lang="en-us", is_phonemes=bool(ph))
    assert sr == SR
    s = np.asarray(s, np.float32); sf.write(p, s, SR); return s

# ---------------------------------------------------------------------------------------------- analysis
def analyze(y):
    y = np.asarray(y, np.float64)
    f0, t = pw.harvest(y, SR, f0_floor=70.0, f0_ceil=700.0, frame_period=FP)
    f0 = pw.stonemask(y, f0, t, SR)
    sp = pw.cheaptrick(y, f0, t, SR)
    ap = pw.d4c(y, f0, t, SR)
    n = len(f0); w = int(.020 * SR)
    pad = np.pad(y ** 2, (w, w)); c = np.cumsum(np.concatenate([[0], pad]))
    idx = (t * SR).astype(int) + w
    e = np.sqrt((c[np.clip(idx + w, 0, len(c) - 1)] - c[np.clip(idx - w, 0, len(c) - 1)]) / (2 * w) + 1e-12)
    E = 20 * np.log10(e + 1e-9)
    return dict(f0=f0, sp=sp, ap=ap, E=E, n=n)

def segment(an, nsyl):
    """-> list of nsyl dicts with frame ranges: on=(a,b) nuc=(b,c) coda=(c,d)   (frames of the analysed word)"""
    f0, E = an["f0"], an["E"]; n = an["n"]
    Es = np.convolve(medfilt(E, 3), np.ones(5) / 5, mode="same")
    emax = Es.max(); act = np.nonzero(Es > emax - 42)[0]
    w0, w1 = (int(act[0]), int(act[-1])) if len(act) else (0, n - 1)
    voiced = f0 > 0
    # close small gaps in voicing
    v = voiced.copy(); i = 0
    while i < n:
        if not v[i]:
            j = i
            while j < n and not v[j]: j += 1
            if 0 < i and j < n and j - i <= 4: v[i:j] = True
            i = j
        else: i += 1
    Ev = np.where(v, Es, -120.0)
    pk, _ = find_peaks(Ev, prominence=4.0, distance=max(8, int(.07 / (FP / 1000))))
    pk = [p for p in pk if w0 <= p <= w1]
    if len(pk) > nsyl: pk = sorted(sorted(pk, key=lambda p: -Es[p])[:nsyl])
    if len(pk) < nsyl:
        vi = np.nonzero(v & (np.arange(n) >= w0) & (np.arange(n) <= w1))[0]
        if len(vi) < nsyl: vi = np.arange(w0, w1 + 1)
        a, b = int(vi[0]), int(vi[-1])
        if len(pk) == 0 or nsyl == 1:
            pk = [int((a + b) / 2)] if nsyl == 1 else [int(a + (k + .5) * (b - a) / nsyl) for k in range(nsyl)]
        else:                                                    # keep the real peaks, add the missing ones in the biggest gaps
            pk = list(pk)
            while len(pk) < nsyl:
                edges = [a] + pk + [b]; gaps = [(edges[i + 1] - edges[i], i) for i in range(len(edges) - 1)]
                _, gi = max(gaps); pk.append(int((edges[gi] + edges[gi + 1]) / 2)); pk.sort()
    pk = sorted(pk)[:nsyl]
    # nucleus extents
    nuc = []
    for k, p in enumerate(pk):
        lo = pk[k - 1] if k else w0 - 1; hi = pk[k + 1] if k + 1 < len(pk) else w1 + 1
        l = p
        while l - 1 > (lo + p) // 2 and v[l - 1] and Es[l - 1] >= Es[p] - 9: l -= 1
        r = p
        while r + 1 < (p + hi) // 2 and v[r + 1] and Es[r + 1] >= Es[p] - 9: r += 1
        nuc.append([l, r + 1])
    segs = []
    for k in range(nsyl):
        on0 = w0 if k == 0 else (nuc[k - 1][1] + nuc[k][0]) // 2
        co1 = (w1 + 1) if k == nsyl - 1 else (nuc[k][1] + nuc[k + 1][0]) // 2
        segs.append(dict(on=(on0, nuc[k][0]), nuc=tuple(nuc[k]), coda=(nuc[k][1], max(co1, nuc[k][1]))))
    return segs

def cached_analysis(text, voice, speed):
    """WORLD analysis of one spoken word, cached on disk (the analysis is the slow part)"""
    h = hashlib.md5(f"{voice}|{text.lower().strip()}|{speed:.2f}|{PHON.get(text.lower().strip())}".encode("utf8")).hexdigest()[:14]
    p = os.path.join(TOK, h + ".npz")
    if os.path.exists(p):
        z = np.load(p); return {k: z[k] for k in ("f0", "sp", "ap", "E")} | {"n": int(z["n"])}
    an = analyze(speak(text, voice, speed))
    np.savez(p, f0=an["f0"], sp=an["sp"], ap=an["ap"], E=an["E"], n=an["n"]); return an

# ---------------------------------------------------------------------------------------------- the singing synthesis
def hz(m): return 440.0 * 2 ** ((np.asarray(m, float) - 69) / 12)

def onset_dur(text, voice, speed=1.0, lead_cap=.10):
    """length (s) of the consonants this word puts BEFORE its beat (so the word before it can finish its own last consonant first)"""
    an = cached_analysis(text, voice, speed); sg = segment(an, 1)[0]
    return min((sg["on"][1] - sg["on"][0]) * FP / 1000.0, lead_cap)

def sing_syllables(text, voice, notes, speed=1.0, formant=1.04, rng=None, vib=True, lead_cap=.10, coda_cap=.22, legato_gap=.06, scoop=True, drift=True, gain_db=0.0, intonation=0.15, an_cache={}, end_cap=None):
    """text: one lyric word.  notes: [(midi, t0, dur)] one per syllable (absolute seconds).  returns (y24k float32, t_start)."""
    rng = rng or np.random.default_rng(1)
    key = (text.lower(), voice, speed)
    if key not in an_cache: an_cache[key] = cached_analysis(text, voice, speed)
    an = an_cache[key]; ns = len(notes)
    segs = segment(an, ns)
    fp = FP / 1000.0
    # ---- output layout (seconds): consonants right before the beat, vowel on the beat
    lay = []
    for k, ((m, t0, d), sg) in enumerate(zip(notes, segs)):
        on = min((sg["on"][1] - sg["on"][0]) * fp, lead_cap); co = min((sg["coda"][1] - sg["coda"][0]) * fp, coda_cap)
        nxt = notes[k + 1] if k + 1 < ns else None
        legato = nxt is not None and (nxt[1] - (t0 + d)) < legato_gap
        lay.append(dict(on=on, co=co, legato=legato))
    for k in range(ns):
        m, t0, d = notes[k]; L = lay[k]
        end = t0 + d
        if k == ns - 1 and end_cap is not None: end = min(end, max(end_cap, t0 + .12))        # the next word starts right away: finish this word's last consonant before that word's first one
        if L["legato"]:
            nxt_on = lay[k + 1]["on"]; end = notes[k + 1][1] - nxt_on                      # coda + next onset share the gap before the next beat
        nuc_end = end - L["co"]
        if nuc_end < t0 + .09:                                                              # very short note: shrink the consonants
            sc = max(.35, (end - t0 - .09) / max(L["co"], 1e-3)); L["co"] *= min(1, sc); nuc_end = end - L["co"]
            nuc_end = max(nuc_end, t0 + .09)
        L["a"] = t0 - L["on"]; L["b"] = t0; L["c"] = nuc_end; L["d"] = nuc_end + L["co"]
    t_start = lay[0]["a"] - .02; t_end = lay[-1]["d"] + .03
    nf = int(np.ceil((t_end - t_start) / fp)) + 1
    tt = t_start + np.arange(nf) * fp
    # ---- input frame position for every output frame
    pos = np.full(nf, -1.0)
    def seg_map(o0, o1, i0, i1):
        m = (tt >= o0 - 1e-9) & (tt < o1 - 1e-9)
        if not m.any() or o1 <= o0: return
        u = (tt[m] - o0) / (o1 - o0); pos[m] = i0 + u * max(i1 - i0 - 1, 0)
    for k, sg in enumerate(segs):
        L = lay[k]
        seg_map(L["a"], L["b"], sg["on"][0], sg["on"][1])
        # vowel: natural-speed head and tail, stretched middle
        n0, n1 = sg["nuc"]; ln = max(n1 - n0, 2); ol = (L["c"] - L["b"]) / fp
        if ol <= ln * 1.15:
            seg_map(L["b"], L["c"], n0, n1)
        else:
            h = int(ln * .3); tl = int(ln * .3); mid0, mid1 = n0 + h, n1 - tl
            if mid1 <= mid0: mid0, mid1 = n0 + ln // 2, n0 + ln // 2 + 1
            hd = h * fp; tdur = tl * fp
            seg_map(L["b"], L["b"] + hd, n0, mid0)
            seg_map(L["b"] + hd, L["c"] - tdur, mid0, mid1)
            seg_map(L["c"] - tdur, L["c"], mid1, n1)
        seg_map(L["c"], L["d"], sg["coda"][0], sg["coda"][1])
    valid = pos >= 0
    fr = np.clip(pos, 0, an["n"] - 1)
    i0 = np.floor(fr).astype(int); i1 = np.minimum(i0 + 1, an["n"] - 1); w = (fr - i0)[:, None]
    lsp = np.log(an["sp"] + 1e-12)
    sp = np.exp(lsp[i0] * (1 - w) + lsp[i1] * w)
    ap = an["ap"][i0] * (1 - w) + an["ap"][i1] * w
    if formant != 1.0:                                                                      # >1 = smaller vocal tract (child / brighter)
        nb = sp.shape[1]; src = np.arange(nb) / formant
        sp = np.array([np.interp(src, np.arange(nb), r) for r in sp]); sp = np.maximum(sp, 1e-12)
    vo = an["f0"][np.rint(fr).astype(int)] > 0
    # ---- pitch curve: notes with short glides, vibrato, scoop, drift
    midi = np.full(nf, np.nan)
    for k, (m, t0, d) in enumerate(notes):
        a = lay[k]["a"]; z = lay[k + 1]["a"] if k + 1 < ns else lay[k]["d"] + .05
        midi[(tt >= a) & (tt < z)] = m
    idx = np.arange(nf); ok = ~np.isnan(midi)
    if ok.any(): midi = np.interp(idx, idx[ok], midi[ok])
    gl = max(3, int(.05 / fp)) | 1; midi = np.convolve(np.pad(midi, (gl, gl), mode="edge"), np.hanning(gl) / np.hanning(gl).sum(), mode="same")[gl:-gl]
    cents = np.zeros(nf)
    for k, (m, t0, d) in enumerate(notes):
        if vib and d >= .5:
            ph = rng.uniform(0, 6.28); tv = tt - (t0 + .22)
            amp = np.clip(tv / .25, 0, 1) * (tt < t0 + d) * (tt >= t0) * 22.0
            cents += amp * np.sin(2 * np.pi * rng.uniform(5.0, 5.8) * tv + ph)
        if scoop and d >= .38 and not (k > 0 and lay[k - 1]["legato"]):
            ts = tt - t0; cents += np.where((ts >= -.02) & (ts < .09), -45 * (1 - np.clip((ts + .02) / .11, 0, 1)) ** 2, 0)
    if drift:
        nz = rng.normal(size=nf // 40 + 3); drift_c = np.interp(idx / 40.0, np.arange(len(nz)), nz) * 5.0; cents += drift_c
    f0o = hz(midi + cents / 100.0)
    if intonation > 0:                                         # keep a share of the speaker's own intonation (relative to each syllable's mean): human micro-melody
        fs_ = an["f0"][np.rint(fr).astype(int)]; lf = np.where(fs_ > 0, np.log2(np.maximum(fs_, 1.0)), np.nan); dev = np.zeros(nf)
        for k in range(ns):
            a0 = lay[k]["a"]; z0 = lay[k + 1]["a"] if k + 1 < ns else lay[k]["d"] + .05
            sel = (tt >= a0) & (tt < z0) & ~np.isnan(lf)
            if sel.sum() < 3: continue
            nuc = sel & (tt >= lay[k]["b"]) & (tt < lay[k]["c"]); ref = np.nanmean(lf[nuc]) if nuc.sum() >= 2 else np.nanmean(lf[sel])
            dev[sel] = np.clip(lf[sel] - ref, -.45, .45)
        dev = medfilt(dev, 5); f0o = f0o * 2 ** (intonation * dev)
    f0o = np.where(vo & valid, f0o, 0.0)
    sp[~valid] = 1e-12; ap[~valid] = 1.0
    out = pw.synthesize(np.ascontiguousarray(f0o, np.float64), np.ascontiguousarray(sp, np.float64), np.ascontiguousarray(ap, np.float64), SR, FP)
    if CONS_ON or CONS_OFF:                                    # sung vowels are held for a second but the consonants stay short: lift them a little, as a real singer over-articulates
        g = np.ones(nf)
        for k in range(ns):
            L = lay[k]
            g[(tt >= L["a"]) & (tt < L["b"])] *= 10 ** (CONS_ON / 20); g[(tt >= L["c"]) & (tt < L["d"])] *= 10 ** (CONS_OFF / 20)
        g = np.convolve(np.pad(g, (2, 2), mode="edge"), np.ones(5) / 5, mode="valid")
        out = out * np.interp(np.arange(len(out)) / SR, (tt - tt[0])[: len(g)], g)
    # fade the edges, normalise the voiced level to a common loudness
    f = int(.008 * SR); out[:f] *= np.linspace(0, 1, f); out[-f:] *= np.linspace(1, 0, f)
    r = np.sqrt(np.mean(out[np.abs(out) > .02 * np.abs(out).max()] ** 2) + 1e-12)
    out = out * (10 ** ((-22.0 + gain_db) / 20) / r)
    pk = np.abs(out).max()
    if pk > .95: out *= .95 / pk
    return out.astype(np.float32), t_start
