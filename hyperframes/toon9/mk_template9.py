"""Assemble toon9/build/template.tpl from the toon8 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon8", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs9.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init9.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes9.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 8 - Boo's Glow Party</title>", "<title>Bo and the Pancake 9 - Blip and Zap</title>")
head = rep(head, """<span class="stk1">WHAT'S THAT LIGHT?</span>""", """<span class="stk1">WHO'S THE PARTY GUEST?</span>""")

# ---- mounts: the little saucer under the characters; Blip + Zap in front of the gang; Peanut's silhouette in the window glass
head = rep(head, '<g id="partyFloor"></g>', '<g id="partyFloor"></g>\n<g id="ufoLMount"></g>')
head = rep(head, '<g id="bananaMount"></g>', '<g id="bananaMount"></g>\n<g id="zpMount"></g>\n<g id="bpMount"></g>')
head = rep(head, '<g id="ufoMount"></g>', '<g id="ufoMount"></g><g id="peanutMount"></g>')

# ---- new defs before episode 8's
endm = "/* ================= episode 8 additions"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- captions + helpers
head = rep(head, "BLIP:'#8DF0A8'};", "BLIP:'#8DF0A8',ZAP:'#9FD8FF',PEANUT:'#C9D2E6'};")
head = rep(head, "GH=mkRock('gh');", "GH=mkRock('gh'), BP=mkRock('bp'), ZP=mkRock('zp');")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#ufo',{opacity:0});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
