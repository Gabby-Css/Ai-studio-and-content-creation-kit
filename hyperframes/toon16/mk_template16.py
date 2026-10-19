"""Assemble toon16/build/template.tpl from the toon15 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon15", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs16.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init16.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes16.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 15 - Four Jiggles</title>", "<title>Bo and the Pancake 16 - The King's Visit</title>")
head = rep(head, """<span class="stk1">WHO'S<br>KNOCKING?</span>""", """<span class="stk1">SEASON 4<br>COMING SOON!</span>""")
head = rep(head, """<span class="stk2">GUESS IN THE COMMENTS!</span>""", """<span class="stk2">THANKS FOR WATCHING!</span>""")

# ---- the King must be drawn BEHIND the cast (everybody hugs him from the front)
head = rep(head, '<g id="gpMount"></g>\n', '')
head = rep(head, '<g id="mcMount"></g>', '<g id="gpMount"></g>\n<g id="mcMount"></g>')

# ---- new defs after episode 15's
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#kdEyes',{opacity:1});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
