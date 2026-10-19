"""Assemble toon5/build/template.tpl from the toon4 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon4", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs5.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init5.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes5.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 4 - Cheese, Please</title>", "<title>Bo and the Pancake 5 - Pizza Party</title>")
head = rep(head, """<span class="stk1">WHO'S COOKING?</span>""", """<span class="stk1">WHO TOOK THE PIZZA?</span>""")

# ---- window: Truffle's colour rig sits behind the mullions, like the silhouette
head = rep(head, ' <g id="pigMount"></g>\n', ' <g id="pigMount"></g>\n <g clip-path="url(#cpGlass)"><g id="twMount"></g></g>\n')

# ---- layers: Truffle (free) -> pizza -> oven -> Nibbles ; Coco swings in front of everything
head = rep(head, '<g id="panMount"></g>\n<g id="nmMount"></g>\n',
           '<g id="panMount"></g>\n<g id="tfMount"></g>\n<g id="pizzaMount"></g>\n<g id="ovenMount"></g>\n<g id="nmMount"></g>\n')
head = rep(head, '<g id="fxMount"></g>', '<g id="cocoMount"></g>\n<g id="fxMount"></g>')

# ---- new defs after the toon4 ones
endm = "document.getElementById('pigMount').innerHTML=pigSilSVG;"
head = rep(head, endm, endm + "\n" + defs.rstrip("\n"))

# ---- fx pool: pizza slices
head = rep(head, "document.getElementById('fxMount').innerHTML=fx;", "for(let i=0;i<6;i++) fx+=sliceSVG(i);\ndocument.getElementById('fxMount').innerHTML=fx;")

# ---- captions
head = rep(head, "const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6'};",
           "const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6',COCO:'#C9A27A'};")
head = rep(head, "for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;", "for(const ln of [1,2,3,4,5,6,7,8,9,10]){let idx=0;")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endm = "gsap.set('#pigG',{opacity:0});"
b = head.index(endm) + len(endm)
head = head[:a] + init.rstrip("\n") + head[b:]

head = rep(head, "const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm');", "const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm'), TF=mkRock('tf'), TW=mkRock('tw');")

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
