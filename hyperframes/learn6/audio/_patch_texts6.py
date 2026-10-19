p = "make_texts.py"; s = open(p, encoding="utf8").read()
a = s.index("# ---- script with timestamps, by section")
b = s.index('print("cues", len(cues)')
new = '''# ---- script with timestamps, by section
NAME = {"intro": "INTRO", "hook": "THEME SONG - Beep boop, sound it out!", "stop": "WORD STOP", "rhyme": "RHYME TIME", "game": "QUIZ ROUND", "recap": "WE CAN READ! (recap)", "fin": "BYE BYE (key up)", "outro": "OUTRO"}
with open(os.path.join(out, "KiddoVerse_Learn6_script.txt"), "w", encoding="utf8") as f:
    f.write("KiddoVerse Learn #6  -  Sound It Out! Three-Letter Words\\nOriginal songs, lyrics and melodies (c) KiddoVerse. 120 BPM, C major (the key lifts as the words go on). The letter sounds are written in the script as the letters (c a t) and sung as the sounds (kuh, a, tuh).\\n\\n")
    for s_ in S["sections"]:
        head = f"[{mmss(s_['t0'])}] {NAME.get(s_['kind'], s_['kind'].upper())}"
        if s_["kind"] == "stop": head += f"  {s_['meta']['i'] + 1}: {s_['meta']['w'].upper()}"
        if s_["kind"] == "rhyme": head += f"  {s_['meta']['pair'][0]} / {s_['meta']['pair'][1]} (-{s_['meta']['end']})"
        if s_["kind"] == "game": head += f"  {s_['meta']['k'] + 1}: which word says {s_['meta']['w']}?"
        f.write("\\n" + head + "\\n")
        for ln in S["lines"]:
            if ln["sec"] == s_["i"] and not ln.get("hidden"): f.write("   " + join(ln["words"]) + "\\n")
        for sp in S["speech"]:
            if s_["t0"] <= sp["t"] < s_["t1"]: f.write(f"   ({sp['who'].upper()}: {sp['text']})\\n")

# ---- YouTube chapters (first must be 0:00; each chapter >= 10 s, at least 3): the rhyme + quiz stops are folded into the word stop before them
CH = [(S["sections"][0], "Sound It Out Theme Song")]
secs_ = S["sections"]
for n, x in enumerate(secs_):
    if x["kind"] == "stop":
        title = f"Word {x['meta']['i'] + 1}: {x['meta']['w']}"
        nxt = secs_[n + 1] if n + 1 < len(secs_) else None
        if nxt and nxt["kind"] == "rhyme": title += " + Rhyme Time and Quiz"
        CH.append((x, title))
CH.append((next(x for x in secs_ if x["kind"] == "recap"), "We Can Read! Recap and Bye Bye"))
for (a, ta), (b, tb) in zip(CH, CH[1:] + [(dict(t0=S["duration"]), "")]):
    assert b["t0"] - a["t0"] >= 10 - 1e-6, ("chapter shorter than 10 s", ta, b["t0"] - a["t0"])
with open(os.path.join(out, "KiddoVerse_Learn6_chapters.txt"), "w", encoding="utf8") as f:
    for sec, title in CH: f.write(f"{mmss(sec['t0'])} {title}\\n")
'''
s = s[:a] + new + s[b:]
open(p, "w", encoding="utf8").write(s); print("ok")
