"""Assemble toon13/build/template.tpl from the toon12 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon12", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs13.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init13.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes13.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 12 - Planet Gloop</title>", "<title>Bo and the Pancake 13 - Home Sweet Kitchen</title>")
head = rep(head, """<span class="stk1">CAN THEY GO HOME?</span>""", """<span class="stk1">SEE YOU IN<br>SEASON 3!</span>""")
head = rep(head, """<span class="stk2">GUESS IN THE COMMENTS!</span>""", """<span class="stk2">THANKS FOR WATCHING!</span>""")

# ---- the griddle sits with the other floor props
head = rep(head, '<g id="feastMount"></g>\n', '')
head = rep(head, '<g id="ckMount"></g>', '<g id="griddleMount"></g>\n<g id="feastMount"></g>\n<g id="ckMount"></g>')   # the pancake sits IN FRONT of the griddle

# ---- the stowaway Gloopian gets its own mount in front of everyone (home in the kitchen)
head = rep(head, '<g id="boMount"></g>', '<g id="boMount"></g>\n<g id="g5Mount"></g>')
head = rep(head, "KG=mkRock('kg');", "KG=mkRock('kg'), G5=mkRock('g5');")

# ---- new defs after episode 12's
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- captions
head = rep(head, "KING:'#FFD36B'};", "KING:'#FFD36B',GLOOPIAN:'#FF8FC8'};")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#crwn,#kcrn',{opacity:0});gsap.set('#litter',{opacity:0,x:1300,y:FLOOR-235});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
