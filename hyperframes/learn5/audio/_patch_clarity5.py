import re
# ---------------- song.py: a hidden lead-voice duplicate under every kids' line (say / echo / game answer)
p = "song.py"; s = open(p, encoding="utf8").read()
old = '''    secs = section_starts(); lines, speech = [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))'''
new = '''    secs = section_starts(); lines, speech, hid = [], [], []
    def add(sec, dsl, t0, eighths, meta=None, tr=0):
        words, n = parse_line(dsl, t0, tr)
        assert n == eighths, (sec["kind"], eighths, n, dsl)
        if words and words[0]["disp"][:1].isalpha(): words[0]["disp"] = words[0]["disp"][0].upper() + words[0]["disp"][1:]
        mm = dict(meta or {}, **sec["meta"])
        lines.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", t0=words[0]["t0"], t1=words[-1]["t1"], words=merge_brand(words), meta=mm))
        if dsl.lstrip().startswith("~") and mm.get("part") in KIDS_UNISON:       # the kids' short shouts are hard to understand alone: the lead voice sings along (hidden = no caption, same notes)
            w2, _ = parse_line(dsl.replace("~", ""), t0, tr)
            hid.append(dict(sec=sec["i"], kind=sec["kind"], voice="lead", hidden=True, t0=w2[0]["t0"], t1=w2[-1]["t1"], words=w2, meta=mm))'''
assert old in s; s = s.replace(old, new)
s = s.replace("def build():", "KIDS_UNISON = {\"say\", \"echo\", \"a\"}\n\ndef build():", 1)
old = '''    first = lambda kind, nth=0: [s for s in secs if s["kind"] == kind][nth]'''
assert old in s; s = s.replace(old, "    lines.extend(hid)                                  # hidden lines go LAST so the storyboard's per-section line indexes stay the same\n" + old)
open(p, "w", encoding="utf8").write(s)

# ---------------- music tail: skip hidden lines, quieter crashes where the voice starts on beat 1
p = "music5_tail.py"; s = open(p, encoding="utf8").read()
old = '''    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        if sec["kind"] in ("intro", "outro"): continue
        for w in ln["words"]:'''
new = '''    for ln in D["lines"]:
        sec = D["sections"][ln["sec"]]; tr = sec["transpose"]
        if sec["kind"] in ("intro", "outro") or ln.get("hidden"): continue
        for w in ln["words"]:'''
assert old in s; s = s.replace(old, new)
old = "groove(bt, ch, nr, tr, 1.0); DR(T(0), \"crash\", 80); DR(T(0), \"tom_l\", 70)"
assert old in s; s = s.replace(old, "groove(bt, ch, nr, tr, 1.0)")
old = "if b == 0: DR(T(0), \"crash\", 104)"
assert old in s; s = s.replace(old, "if b == 0: DR(T(0), \"crash\", 66)")
old = "if b == 0: DR(T(0), \"crash\", 96)"
assert old in s; s = s.replace(old, "if b == 0: DR(T(0), \"crash\", 64)")
old = "DR(T(0), \"crash\", 100); DR(T(0), \"kick\", 104); DR(T(4), \"kick\", 90)"
assert old in s; s = s.replace(old, "DR(T(0), \"crash\", 58); DR(T(0), \"kick\", 96); DR(T(4), \"kick\", 90)")
old = "for j, n in enumerate((84, 88, 91, 96)): N(\"glock\", T(0) + j * .06, n + tr, 1.0, 84, jit=0)"
assert old in s; s = s.replace(old, "for j, n in enumerate((84, 88, 91, 96)): N(\"glock\", T(0) + .5 + j * .06, n + tr, 1.0, 60, jit=0)")
open(p, "w", encoding="utf8").write(s)

# ---------------- producer pass: a softer impact on the downbeat of the party sections
p = "music_cm_mix.py"; s = open(p, encoding="utf8").read()
old = 'place(fx, s["t0"], impact(1.5), .55)'
assert old in s; s = s.replace(old, 'place(fx, s["t0"], impact(1.5), .30)')
open(p, "w", encoding="utf8").write(s)

# ---------------- stages: SFX duck harder under the voice
p = "stages.py"; s = open(p, encoding="utf8").read()
old = 'MIX_OUTTAG="L5",'
assert old in s; s = s.replace(old, 'MIX_OUTTAG="L5", SFX_DUCK="0.8",')
open(p, "w", encoding="utf8").write(s)

# ---------------- make_texts: the script lists hidden lines too -> skip them
p = "make_texts.py"; s = open(p, encoding="utf8").read()
old = '''            if ln["sec"] == s_["i"]: f.write("   " + join(ln["words"]) + "\\n")'''
assert old in s; s = s.replace(old, '''            if ln["sec"] == s_["i"] and not ln.get("hidden"): f.write("   " + join(ln["words"]) + "\\n")''')
open(p, "w", encoding="utf8").write(s)
print("patched")
