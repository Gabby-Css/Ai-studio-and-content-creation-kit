"""Assemble toon10/build/template.tpl from the toon9 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon9", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs10.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init10.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes10.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 9 - Blip and Zap</title>", "<title>Bo and the Pancake 10 - Bo's Big Birthday</title>")
head = rep(head, """<span class="stk1">WHO'S THE PARTY GUEST?</span>""", """<span class="stk1">THE END... OR IS IT?</span>""")
head = rep(head, """<span class="stk2">GUESS IN THE COMMENTS!</span>""", """<span class="stk2">SEASON 2 COMING SOON!</span>""")

# ---- mounts: the banner on the wall; Peanut + the cake with the other characters
head = rep(head, '<g id="partyFloor"></g>', '<g id="bannerMount"></g>\n<g id="partyFloor"></g>')
head = rep(head, '<g id="bpMount"></g>', '<g id="bpMount"></g>\n<g id="ptMount"></g>\n<g id="ckMount"></g>')

# ---- new defs before episode 9's
endm = "/* ================= episode 9 additions"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- helpers
head = rep(head, "ZP=mkRock('zp');", "ZP=mkRock('zp'), PT=mkRock('pt');")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#ufoL',{opacity:0,x:880,y:FLOOR});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
