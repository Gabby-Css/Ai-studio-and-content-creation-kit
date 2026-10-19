import re, io
p = "stages.py"; s = open(p, encoding="utf8").read()

# ---- shorts cuts
a = s.index("    cuts = ((\"Theme_And_Circle\"")
b = s.index("    fc = (\"[0:v]split=2")
s = s[:a] + '''    games = [x for x in S if x["kind"] == "game"]; skips = [x for x in S if x["kind"] == "skip"]
    cuts = (("Theme_And_Eleven", first("hook")["t0"], stops[0]["t1"] - first("hook")["t0"]),
            ("Count_By_2s_5s_10s", skips[0]["t0"], skips[-1]["t1"] - skips[0]["t0"]),
            ("Twenty_And_Quiz", stops[-1]["t0"], games[1]["t1"] - stops[-1]["t0"]))
''' + s[b:]
s = s.replace('cut on SECTION boundaries (so they start and end between two lines): theme song + the cow, the dance break + the first quiz, the lion', 'cut on SECTION boundaries (so they start and end between two lines): theme song + eleven, counting by 2s 5s and 10s, twenty + the star-counting quiz')

# ---- YouTube pack
a = s.index('    txt = f"""KIDDOVERSE LEARN #5 - YOUTUBE PACK')
b = s.index('    p = dest or os.path.join(DELIVER, "YOUTUBE_DESCRIPTION.txt")')
yt = open("yt_block5.txt", encoding="utf8").read()
s = s[:a] + yt + s[b:]

# ---- README
a = s.index('    txt = """KIDDOVERSE LEARN #5 - "The Shape Workshop"')
b = s.index('    txt = txt.replace("__NOW__", now())')
rd = open("readme_block5.txt", encoding="utf8").read()
s = s[:a] + rd + s[b:]
open(p, "w", encoding="utf8").write(s)
print("patched")
