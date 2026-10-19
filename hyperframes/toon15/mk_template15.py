"""Assemble toon15/build/template.tpl from the toon14 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon14", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs15.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init15.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes15.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 14 - Jiggle Moves In</title>", "<title>Bo and the Pancake 15 - Four Jiggles</title>")
head = rep(head, """<span class="stk1">WHICH ONE<br>IS JIGGLE?</span>""", """<span class="stk1">WHO'S<br>KNOCKING?</span>""")

# ---- the pancake test: the pancake must be drawn IN FRONT of the four Jiggles
head = rep(head, '<g id="feastMount"></g>\n', '')
head = rep(head, '<g id="jgMount"></g>', '<g id="jgMount"></g>\n<g id="feastMount"></g>')

# ---- new defs after episode 14's
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- captions
head = rep(head, "JIGGLE:'#FF8FC8',ROCKY:'#B9C0CF'};", "JIGGLE:'#FF8FC8',JIGGLES:'#FF8FC8',ROCKY:'#B9C0CF'};")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#hic',{opacity:0});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
