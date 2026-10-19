"""Assemble toon23/build/template.tpl from the toon22 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon22", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs23.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init23.js"), encoding="utf-8").read()
body = open(os.path.join(HERE, "_body23.js"), encoding="utf-8").read()
s16 = open(os.path.join(HERE, "..", "toon16", "_scenes16.js"), encoding="utf-8").read()
hdr = s16[:s16.index("/* ===== this episode's key moments")]


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]
head = rep(head, "<title>Bo and the Pancake 22 - The Missing Spatula</title>", "<title>Bo and the Pancake 23 - The Balloon Chase</title>")
head = rep(head, """<span class="stk1">CATCH THAT<br>BALLOON!</span>""", """<span class="stk1">WHO WILL<br>WIN?</span>""")
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)
anchor = "\nlet camCur=null;"
head = rep(head, anchor, "\n" + init.rstrip("\n") + "\n" + anchor)
open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + hdr + body)
print("template.tpl written", len(head + hdr + body))
