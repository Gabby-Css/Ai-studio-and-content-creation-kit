"""Assemble toon6/build/template.tpl from the toon5 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon5", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs6.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init6.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes6.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 5 - Pizza Party</title>", "<title>Bo and the Pancake 6 - Monkey Business</title>")
head = rep(head, """<span class="stk1">WHO TOOK THE PIZZA?</span>""", """<span class="stk1">WHO'S IN THE FRIDGE?</span>""")

# ---- clip for the fridge's inside
head = rep(head, '<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>',
           '<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>\n'
           '<clipPath id="cpFridge"><rect x="1996" y="880" width="348" height="700" rx="22"/></clipPath>')

# ---- the fridge's inside sits between the fridge body and its door
head = rep(head, '<g id="fridgeDoor">', '<g id="fridgeInner"></g>\n<g id="fridgeDoor">')

# ---- Coco (colour) lives between Flapjack and Truffle; the banana bait sits below Bo
head = rep(head, '<g id="panMount"></g>\n<g id="tfMount"></g>', '<g id="panMount"></g>\n<g id="cmMount"></g>\n<g id="tfMount"></g>')
head = rep(head, '<g id="nmMount"></g>\n', '<g id="nmMount"></g>\n<g id="bananaMount"></g>\n')

# ---- new defs after the toon5 ones
endm = "document.getElementById('cocoMount').innerHTML=cocoSVG+peelSVG;"
head = rep(head, endm, endm + "\n" + defs.rstrip("\n"))

# ---- captions
head = rep(head, "COCO:'#C9A27A'};", "COCO:'#C9A27A',GUMDROP:'#B9AEFF'};")
head = rep(head, "for(const ln of [1,2,3,4,5,6,7,8,9,10]){let idx=0;", "for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endm = "gsap.set('#board',{opacity:0,svgOrigin:PZX+' '+PZY});"
b = head.index(endm) + len(endm)
head = head[:a] + init.rstrip("\n") + head[b:]

head = rep(head, "TF=mkRock('tf'), TW=mkRock('tw');", "TF=mkRock('tf'), TW=mkRock('tw'), CM=mkRock('cm');")

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
