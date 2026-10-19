"""Assemble toon14/build/template.tpl from the toon13 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon13", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs14.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init14.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes14.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 13 - Home Sweet Kitchen</title>", "<title>Bo and the Pancake 14 - Jiggle Moves In</title>")
head = rep(head, """<span class="stk1">SEE YOU IN<br>SEASON 3!</span>""", """<span class="stk1">WHICH ONE<br>IS JIGGLE?</span>""")
head = rep(head, """<span class="stk2">THANKS FOR WATCHING!</span>""", """<span class="stk2">GUESS IN THE COMMENTS!</span>""")

# ---- a ceiling (the kitchen never had one) with a lamp that Jiggle can bump
wall = '<rect x="-1800" y="-1800" width="6200" height="2800" fill="url(#pDots)"/>'
ceiling = wall + """
<g id="ceiling">
 <rect x="-1800" y="-1800" width="6200" height="1556" fill="#FFF1D4"/>
 <rect x="-1800" y="-246" width="6220" height="34" fill="#fff" stroke="#2b1a14" stroke-width="7"/>
 <g id="lamp"><line x1="1450" y1="-212" x2="1450" y2="-120" stroke="#2b1a14" stroke-width="7"/>
  <path d="M1360,-20 Q1360,-130 1450,-130 Q1540,-130 1540,-20Z" fill="#FFD84A" stroke="#2b1a14" stroke-width="7" stroke-linejoin="round"/>
  <ellipse cx="1450" cy="-20" rx="92" ry="14" fill="#FFB020" stroke="#2b1a14" stroke-width="6"/><circle cx="1450" cy="-6" r="22" fill="#FFF7C2" stroke="#2b1a14" stroke-width="5"/></g>
</g>"""
head = rep(head, wall, ceiling)

# ---- Rocky + the four Jiggles are mounted in front of the crowd
head = rep(head, '<g id="feastMount"></g>\n', '')     # the pancake stack rides on Rocky's head, so it must be drawn in front of Bo + Rocky
head = rep(head, '<g id="g5Mount"></g>', '<g id="g5Mount"></g>\n<g id="rkMount"></g>\n<g id="feastMount"></g>\n<g id="jgMount"></g>')
head = rep(head, "KG=mkRock('kg'), G5=mkRock('g5');", "KG=mkRock('kg'), G5=mkRock('g5'), RK=mkRock('rk'), J1=mkRock('j1'), J2=mkRock('j2'), J3=mkRock('j3'), J4=mkRock('j4');")

# ---- new defs after episode 13's
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- captions
head = rep(head, "GLOOPIAN:'#FF8FC8'};", "GLOOPIAN:'#FF8FC8',JIGGLE:'#FF8FC8',ROCKY:'#B9C0CF'};")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#g5',{opacity:0,x:1700,y:FLOOR,scale:.5});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
