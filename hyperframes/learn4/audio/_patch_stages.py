s = open("stages.py", encoding="utf8").read()
# names and paths
for a, b in (("learn3", "learn4"), ("Learn3", "Learn4"), ("LEARN #3", "LEARN #4"), ("_L3", "_L4"), ("_l3_", "_l4_")):
    s = s.replace(a, b)
s = s.replace('"Animal Sounds Dance Party"', '"The Shape Workshop"')
# YouTube pack
i0 = s.index('    txt = f"""KIDDOVERSE LEARN #4 - YOUTUBE PACK')
i1 = s.index('    p = dest or os.path.join(DELIVER, "YOUTUBE_DESCRIPTION.txt")')
s = s[:i0] + open("yt_block.txt", encoding="utf8").read() + s[i1:]
# README
j0 = s.index('    txt = """KIDDOVERSE LEARN #4 - "The Shape Workshop"')
j1 = s.index('    txt = txt.replace("__NOW__"')
s = s[:j0] + open("readme_block.txt", encoding="utf8").read() + s[j1:]
# shorts cuts
k0 = s.index("    cuts = (")
k1 = s.index("    fc = (")
s = s[:k0] + '''    cuts = (("Theme_And_Circle", first("hook")["t0"], stops[0]["t1"] - first("hook")["t0"]),
            ("Triangle_Stop", stops[2]["t0"], stops[2]["t1"] - stops[2]["t0"]),
            ("Yoga_And_House", first("yoga")["t0"], first("house")["t1"] - first("yoga")["t0"]))
''' + s[k1:]
s = s.replace('theme + the cow, the dance break + the first quiz, the lion', 'theme + the circle, the triangle stop, yoga + the house')
open("stages.py", "w", encoding="utf8").write(s)
print("stages patched")
