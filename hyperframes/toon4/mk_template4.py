"""Assemble toon4/build/template.tpl from the toon3 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon3", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs4.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init4.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes4.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


def cut_between(s, a, b, keep_b=True):
    i = s.index(a); j = s.index(b, i)
    return s[:i] + (s[j:] if keep_b else s[j + len(b):])


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 3 - Honey Trouble</title>", "<title>Bo and the Pancake 4 - Cheese, Please</title>")
head = rep(head, """<span class="stk1">WHO'S SQUEAKING?</span>""", """<span class="stk1">WHO'S COOKING?</span>""")

# ---- window: Barnaby's silhouette + the 3rd-episode bear are gone; Truffle's silhouette (pig + chef hat) lives behind the mullions
head = cut_between(head, ' <g id="barnG" opacity="0"', ' <rect x="544" y="334" width="14"')
head = rep(head, ' <rect x="544" y="334" width="14"', ' <g id="pigMount"></g>\n <rect x="544" y="334" width="14"')
head = rep(head, ' <g clip-path="url(#cpGlass)"><g id="bwMount"></g></g>\n', '')

# ---- no syrup bath this time: the table is free for the cheese
head = cut_between(head, '<!-- syrup bath', '<g id="panMount"></g>')
head = cut_between(head, '<g id="tubFront"', '<g id="boMount"></g>')
head = rep(head, '<g id="panMount"></g>\n<g id="jarMount"></g>\n<g id="rkClip" clip-path="url(#cpNoTable)"><g id="rkMount"></g></g>\n',
           '<g id="cheeseMount"></g>\n<g id="mcMount"></g>\n<g id="wedgeMount"></g>\n<g id="panMount"></g>\n<g id="nmMount"></g>\n')

# ---- new rigs replace Barnaby / jar / bees
a = head.index("/* ---------------- BARNABY THE BEAR")
endm = "document.getElementById('jarMount').innerHTML=jarSVG('jar');"
b = head.index(endm) + len(endm)
head = head[:a] + defs.rstrip("\n") + head[b:]
head = rep(head, "document.getElementById('rkMount').innerHTML=rockySVG('rk',false);\n", "")

# ---- fx pools: cheese cubes + Zzz instead of bees
head = rep(head, "for(let i=0;i<7;i++) fx+=beeSVG(i);\n",
           "for(let i=0;i<6;i++) fx+=`<g id=\"cw${i}\"><g id=\"cc${i}\" class=\"ccb\" opacity=\"0\"><rect x=\"-17\" y=\"-17\" width=\"34\" height=\"34\" rx=\"7\" fill=\"#FFD84A\" ${sw(5)}/><circle cx=\"-4\" cy=\"-4\" r=\"5\" fill=\"#E8B52E\"/><circle cx=\"7\" cy=\"8\" r=\"4\" fill=\"#E8B52E\"/></g></g>`;\n"
           "for(let i=0;i<4;i++) fx+=`<g id=\"zw${i}\"><text id=\"zz${i}\" class=\"zzz\" text-anchor=\"middle\" font-family=\"Baloo2,sans-serif\" font-weight=\"800\" font-size=\"84\" fill=\"#fff\" stroke=\"#2b1a14\" stroke-width=\"11\" stroke-linejoin=\"round\" paint-order=\"stroke\" opacity=\"0\">Z</text></g>`;\n")

# ---- captions
head = rep(head, "const HLC={'':'#FFE14D',ROCKY:'#A9B8FF',FLAPJACK:'#FF8FC4',BARNABY:'#F0A868',BO:'#FFB35C',NIBBLES:'#E6B7D6'};",
           "const HLC={'':'#FFE14D',MOCHI:'#9FB4FF',FLAPJACK:'#FF8FC4',TRUFFLE:'#FFA6B8',BO:'#FFB35C',NIBBLES:'#E6B7D6'};")
head = rep(head, "const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);", "const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);")
head = rep(head, "for(const ln of [1,7,2,3,8,4,5,9,6,10,11]){let idx=0;", "for(const ln of [1,2,3,4,5,6,7,8,9,10,11]){let idx=0;")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endm = "gsap.set('#nb',{x:1640,y:1620,scale:.46});"
b = head.index(endm) + len(endm)
head = head[:a] + init.rstrip("\n") + head[b:]

head = rep(head, "const BW=mkRock('bw'), RK=mkRock('rk'), NM=mkRock('nb');", "const MC=mkRock('mc'), NM=mkRock('nb'), NN=mkRock('nm');")

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
