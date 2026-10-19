p = "make_texts.py"; s = open(p, encoding="utf8").read()
a = s.index("# ---- script with timestamps, by section")
b = s.index('print("cues", len(cues)')
new = '''# ---- script with timestamps, by section
NAME = {"intro": "INTRO", "hook": "THEME SONG - Beep boop, count to twenty!", "stop": "NUMBER STOP", "game": "QUIZ ROUND", "skip": "SKIP COUNTING", "fin": "BYE BYE (key up)", "outro": "OUTRO"}
with open(os.path.join(out, "KiddoVerse_Learn5_script.txt"), "w", encoding="utf8") as f:
    f.write("KiddoVerse Learn #5  -  Gizmo's Counting Machine: Count to 20, then by 2s, 5s and 10s\\nOriginal songs, lyrics and melodies (c) KiddoVerse. 120 BPM, C major (the number stops change key as the numbers grow, the last quiz and bye-bye are higher).\\n\\n")
    for s_ in S["sections"]:
        head = f"[{mmss(s_['t0'])}] {NAME.get(s_['kind'], s_['kind'].upper())}"
        if s_["kind"] == "stop": head += f"  {s_['meta']['i'] + 1}: NUMBER {s_['meta']['n']}"
        if s_["kind"] == "game": head += f"  {s_['meta']['k'] + 1}: " + ["what comes after 14?", "how many stars?", "what comes next?"][s_["meta"]["k"]]
        if s_["kind"] == "skip": head += f"  count by {s_['meta']['skip']}"
        f.write("\\n" + head + "\\n")
        for ln in S["lines"]:
            if ln["sec"] == s_["i"]: f.write("   " + join(ln["words"]) + "\\n")
        for sp in S["speech"]:
            if s_["t0"] <= sp["t"] < s_["t1"]: f.write(f"   ({sp['who'].upper()}: {sp['text']})\\n")

# ---- YouTube chapters (first must be 0:00; each chapter >= 10 s, at least 3)
first = lambda kind: next(x for x in S["sections"] if x["kind"] == kind)
WORD = {11: "Eleven", 12: "Twelve", 13: "Thirteen", 14: "Fourteen", 15: "Fifteen", 16: "Sixteen", 17: "Seventeen", 18: "Eighteen", 19: "Nineteen", 20: "Twenty"}
CH = [(S["sections"][0], "Counting Machine Theme Song")]
games = [x for x in S["sections"] if x["kind"] == "game"]
for x in S["sections"]:
    if x["kind"] == "stop":
        n = x["meta"]["n"]; title = f"Number {n}: {WORD[n]}"
        if n == 15: title += " and Quiz: What Comes After 14?"
        if n == 20: title += " and Quiz: How Many Stars?"
        CH.append((x, title))
    elif x["kind"] == "skip": CH.append((x, f"Count by {x['meta']['skip'].capitalize()}"))
CH.append((games[2], "Quiz: What Comes Next? and Bye Bye"))
for (a, ta), (b, tb) in zip(CH, CH[1:] + [(dict(t0=S["duration"]), "")]):
    assert b["t0"] - a["t0"] >= 10 - 1e-6, ("chapter shorter than 10 s", ta, b["t0"] - a["t0"])
with open(os.path.join(out, "KiddoVerse_Learn5_chapters.txt"), "w", encoding="utf8") as f:
    for sec, title in CH: f.write(f"{mmss(sec['t0'])} {title}\\n")
'''
s = s[:a] + new + s[b:]
open(p, "w", encoding="utf8").write(s); print("ok")
