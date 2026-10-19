NAME = {"intro": "INTRO", "chorus": "THEME SONG - The Color Train", "story": "STORY - where did the colors go?", "stop": "COLOR STOP", "rainbow": "THE RAINBOW SONG",
        "gameintro": "COLOR GAME", "game": "GAME ROUND", "fin": "THEME SONG (key up)", "fin2": "FINAL THEME SONG", "outro": "OUTRO"}
with open(os.path.join(out, "KiddoVerse_Learn2_script.txt"), "w", encoding="utf8") as f:
    f.write("KiddoVerse Learn #2  -  The Color Train: Learn 6 Colors\nOriginal songs, lyrics and melodies (c) KiddoVerse. 108 BPM, C major (colour stops climb in key, final choruses in F major).\n\n")
    for s in S["sections"]:
        head = f"[{mmss(s['t0'])}] {NAME.get(s['kind'], s['kind'].upper())}"
        if s["kind"] == "stop": head += f"  {s['meta']['i'] + 1}: {s['meta']['color'].upper()}"
        if s["kind"] == "game": head += f"  {s['meta']['k'] + 1}: find {s['meta']['color']}"
        f.write("\n" + head + "\n")
        for ln in S["lines"]:
            if ln["sec"] == s["i"]: f.write("   " + join(ln["words"]) + "\n")
        for sp in S["speech"]:
            if s["t0"] <= sp["t"] < s["t1"]: f.write(f"   ({sp['who'].upper()}: {sp['text']})\n")

# ---- YouTube chapters (first must be 0:00; each chapter >= 10 s)
first = lambda kind: next(x for x in S["sections"] if x["kind"] == kind)
CH = [(S["sections"][0], "Welcome to the Color Train"), (first("story"), "Where Did the Colors Go?")]
CH += [(x, f"Color {x['meta']['i'] + 1}: {x['meta']['color'].capitalize()}") for x in S["sections"] if x["kind"] == "stop"]
CH += [(first("rainbow"), "The Rainbow Song"), (first("gameintro"), "Color Game: Can You Find It?"), (first("fin"), "Final Sing-Along"), (first("outro"), "Bye Bye")]
with open(os.path.join(out, "KiddoVerse_Learn2_chapters.txt"), "w", encoding="utf8") as f:
    for sec, title in CH: f.write(f"{mmss(sec['t0'])} {title}\n")
