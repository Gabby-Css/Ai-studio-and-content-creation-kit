"""Assemble toon7/build/template.tpl from the toon6 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon6", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs7.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init7.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes7.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 6 - Monkey Business</title>", "<title>Bo and the Pancake 7 - Gumdrop's Secret</title>")
head = rep(head, """<span class="stk1">WHO'S IN THE FRIDGE?</span>""", """<span class="stk1">WHO'S THAT GHOST?</span>""")

# ---- the set continues far beyond the old 2600x2200 world, so wide camera shots never show the edge
head = rep(head, "#world{display:block}", "#world{display:block;overflow:visible}")
head = rep(head, '<rect x="0" y="0" width="2600" height="1360" fill="url(#gWall)"/>', '<rect x="-1800" y="-1800" width="6200" height="3160" fill="url(#gWall)"/>')
head = rep(head, '<rect x="0" y="0" width="2600" height="1000" fill="url(#pDots)"/>', '<rect x="-1800" y="-1800" width="6200" height="2800" fill="url(#pDots)"/>')
head = rep(head, '<rect x="0" y="1000" width="2600" height="360" fill="url(#pTile)"/>', '<rect x="-1800" y="1000" width="6200" height="360" fill="url(#pTile)"/>')
head = rep(head, '<rect x="-10" y="990" width="2620" height="22"', '<rect x="-1800" y="990" width="6220" height="22"')
head = rep(head, '<rect x="0" y="1360" width="2600" height="840" fill="url(#pFloor)"/>', '<rect x="-1800" y="1360" width="6200" height="2400" fill="url(#pFloor)"/>')
head = rep(head, '<rect x="-10" y="1340" width="2620" height="36"', '<rect x="-1800" y="1340" width="6220" height="36"')

# ---- ghost glow gradient
head = rep(head, '<clipPath id="cpGlass">',
           '<radialGradient id="gGlow"><stop offset="0" stop-color="#EAF3FF" stop-opacity=".95"/><stop offset=".42" stop-color="#BBD7FF" stop-opacity=".38"/><stop offset="1" stop-color="#BBD7FF" stop-opacity="0"/></radialGradient>\n<clipPath id="cpGlass">')

# ---- Gumdrop stands behind the gang (between the fridge and the table); the feast dishes sit on the table in front of the oven;
#      the night overlay + Boo are above everything but the fx
head = rep(head, '<!-- ============ TABLE ============ -->', '<g id="gmMount"></g>\n<!-- ============ TABLE ============ -->')
head = rep(head, '<g id="ovenMount"></g>', '<g id="ovenMount"></g>\n<g id="feastMount"></g>')
head = rep(head, '<g id="fxMount"></g>', '<rect id="night" x="-2500" y="-2500" width="9000" height="9000" fill="#070625" opacity="0"/>\n<g id="ghMount"></g>\n<g id="fxMount"></g>')

# ---- new defs after the fx layer is built
endm = "document.getElementById('fxMount').innerHTML=fx;"
head = rep(head, endm, endm + "\n" + defs.rstrip("\n"))

# ---- captions
head = rep(head, "GUMDROP:'#B9AEFF'};", "GUMDROP:'#B9AEFF',BOO:'#CFE3FF'};")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#bananas',{opacity:0,x:1990,y:1664});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

head = rep(head, "CM=mkRock('cm');", "CM=mkRock('cm'), GM=mkRock('gm'), GH=mkRock('gh');")

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
