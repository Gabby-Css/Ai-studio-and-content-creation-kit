p = "stages.py"; s = open(p, encoding="utf8").read()
a = s.index("    cuts = ((\"Theme_And_Eleven\"")
b = s.index("    fc = (\"[0:v]split=2")
s = s[:a] + '''    rhy = [x for x in S if x["kind"] == "rhyme"]; games = [x for x in S if x["kind"] == "game"]; recap = first("recap"); fin = first("fin")
    cuts = (("Theme_And_Cat", first("hook")["t0"], stops[0]["t1"] - first("hook")["t0"]),
            ("Rhyme_Time_And_Quiz", rhy[0]["t0"], games[0]["t1"] - rhy[0]["t0"]),
            ("We_Can_Read", recap["t0"], fin["t1"] - recap["t0"]))
''' + s[b:]
s = s.replace("theme song + eleven, counting by 2s 5s and 10s, twenty + the star-counting quiz", "theme song + cat, rhyme time + the first quiz, the we-can-read recap")
a = s.index('    txt = f"""KIDDOVERSE LEARN #6 - YOUTUBE PACK')
b = s.index('    p = dest or os.path.join(DELIVER, "YOUTUBE_DESCRIPTION.txt")')
s = s[:a] + open("yt_block6.txt", encoding="utf8").read() + s[b:]
a = s.index('    txt = """KIDDOVERSE LEARN #6 - "Gizmo')
b = s.index('    txt = txt.replace("__NOW__", now())')
s = s[:a] + open("readme_block6.txt", encoding="utf8").read() + s[b:]
old = s[s.index('HARD_WORDS = '):s.index('\n', s.index('HARD_WORDS = '))]
s = s.replace(old, 'HARD_WORDS = "(see the delivery message)"')
open(p, "w", encoding="utf8").write(s); print("patched")
