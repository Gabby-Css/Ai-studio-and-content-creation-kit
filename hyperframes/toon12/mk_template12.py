"""Assemble toon12/build/template.tpl from the toon11 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon11", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs12.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init12.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes12.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 11 - Blast Off</title>", "<title>Bo and the Pancake 12 - Planet Gloop</title>")
head = rep(head, """<span class="stk1">WHAT'S ON PLANET GLOOP?</span>""", """<span class="stk1">CAN THEY GO HOME?</span>""")

# ---- gradients / clip for the planet
head = rep(head, '<clipPath id="cpGlass">',
           '<linearGradient id="gSkyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B2285"/><stop offset=".45" stop-color="#C45CC4"/><stop offset=".8" stop-color="#FF9AD0"/><stop offset="1" stop-color="#FFD6A5"/></linearGradient>\n'
           '<linearGradient id="gJelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5BE8D0"/><stop offset="1" stop-color="#23988F"/></linearGradient>\n'
           '<clipPath id="cpAbove"><rect x="-2000" y="-3000" width="7000" height="4700"/></clipPath>\n<clipPath id="cpGlass">')

# ---- mounts: the Gloopians + King between the gang and Peanut; the litter behind Flapjack
head = rep(head, '<g id="bpMount"></g>', '<g id="bpMount"></g>\n<g id="gpMount"></g>')
head = rep(head, '<g id="panMount"></g>', '<g id="litterMount"></g>\n<g id="panMount"></g>')

# ---- new defs: after all the earlier ones (they need blipSVG, rnd ...)
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- captions + helpers
head = rep(head, "PEANUT:'#C9D2E6'};", "PEANUT:'#C9D2E6',GLOOPIANS:'#FF8FC8',KING:'#FFD36B'};")
head = rep(head, "PT=mkRock('pt');", "PT=mkRock('pt'), G1=mkRock('g1'), G2=mkRock('g2'), G3=mkRock('g3'), G4=mkRock('g4'), KG=mkRock('kg');")

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "gsap.set('#gloopW',{scale:.02,x:0,y:0});"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
