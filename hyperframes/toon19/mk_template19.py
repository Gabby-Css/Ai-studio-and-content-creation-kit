"""Assemble toon19/build/template.tpl from the toon18 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon18", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs19.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init19.js"), encoding="utf-8").read()
body = open(os.path.join(HERE, "_body19.js"), encoding="utf-8").read()
s16 = open(os.path.join(HERE, "..", "toon16", "_scenes16.js"), encoding="utf-8").read()
hdr = s16[:s16.index("/* ===== this episode's key moments")]      # captions + the shared helper functions


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]
head = rep(head, "<title>Bo and the Pancake 18 - The Gray Planet</title>", "<title>Bo and the Pancake 19 - The Gray Muncher</title>")
head = rep(head, """<span class="stk1">WHO'S THAT<br>MONSTER?</span>""", """<span class="stk1">WHERE DOES<br>IT GO?</span>""")
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)
anchor = "\nlet camCur=null;"
head = rep(head, anchor, "\n" + init.rstrip("\n") + "\n" + anchor)
open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + hdr + body)
print("template.tpl written", len(head + hdr + body))
