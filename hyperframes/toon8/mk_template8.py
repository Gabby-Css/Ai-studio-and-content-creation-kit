"""Assemble toon8/build/template.tpl from the toon7 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon7", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs8.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init8.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes8.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 7 - Gumdrop's Secret</title>", "<title>Bo and the Pancake 8 - Boo's Glow Party</title>")
head = rep(head, """<span class="stk1">WHO'S THAT GHOST?</span>""", """<span class="stk1">WHAT'S THAT LIGHT?</span>""")

# ---- mounts: the dance floor sits under the characters, the disco ball + beams above the dark overlay, the UFO in the window glass
head = rep(head, '<g id="gmMount"></g>', '<g id="partyFloor"></g>\n<g id="gmMount"></g>')
head = rep(head, '<g id="ghMount"></g>', '<g id="partyTop"></g>\n<g id="ghMount"></g>')
head = rep(head, '<g id="twMount"></g>', '<g id="twMount"></g><g id="ufoMount"></g>')

# ---- new defs after episode 7's
endm = "document.getElementById('ghMount').innerHTML=ghostSVG('gh');"
head = rep(head, endm, endm + "\n" + defs.rstrip("\n"))

# ---- captions
head = rep(head, "BOO:'#CFE3FF'};", "BOO:'#CFE3FF',BLIP:'#8DF0A8'};")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#night',{opacity:0});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
