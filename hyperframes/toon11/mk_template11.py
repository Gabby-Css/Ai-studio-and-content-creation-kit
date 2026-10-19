"""Assemble toon11/build/template.tpl from the toon10 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon10", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs11.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init11.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes11.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 10 - Bo's Big Birthday</title>", "<title>Bo and the Pancake 11 - Blast Off</title>")
head = rep(head, """<span class="stk1">THE END... OR IS IT?</span>""", """<span class="stk1">WHAT'S ON PLANET GLOOP?</span>""")
head = rep(head, """<span class="stk2">SEASON 2 COMING SOON!</span>""", """<span class="stk2">GUESS IN THE COMMENTS!</span>""")

# ---- gradients / clip for the cockpit
head = rep(head, '<clipPath id="cpGlass">',
           '<linearGradient id="gCock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E2B52"/><stop offset="1" stop-color="#3A5189"/></linearGradient>\n'
           '<radialGradient id="gGloop" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#E7C8FF"/><stop offset=".55" stop-color="#A56CF2"/><stop offset="1" stop-color="#6A3FC4"/></radialGradient>\n'
           '<pattern id="pMetal" width="200" height="200" patternUnits="userSpaceOnUse"><rect width="200" height="200" fill="#2B3768"/><rect width="100" height="100" fill="#35437A"/><rect x="100" y="100" width="100" height="100" fill="#35437A"/></pattern>\n'
           '<clipPath id="cpPort"><circle cx="1400" cy="640" r="372"/></clipPath>\n<clipPath id="cpGlass">')

# ---- the set sits above the kitchen background but below the characters
head = rep(head, '<g id="partyFloor"></g>', '<g id="setMount"></g>\n<g id="partyFloor"></g>')

# ---- new defs before episode 10's
endm = "/* ================= episode 10 additions"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)

# ---- episode init
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endi = "for(let i=0;i<5;i++){gsap.set('#ckF'+i,{opacity:0});gsap.set('#ckG'+i,{opacity:0});}"
b = head.index(endi) + len(endi)
head = head[:a] + init.rstrip("\n") + head[b:]

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
