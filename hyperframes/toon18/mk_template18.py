"""Assemble toon18/build/template.tpl from the toon17 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon17", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs18.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init18.js"), encoding="utf-8").read()
body = open(os.path.join(HERE, "_body18.js"), encoding="utf-8").read()
s16 = open(os.path.join(HERE, "..", "toon16", "_scenes16.js"), encoding="utf-8").read()
hdr = s16[:s16.index("/* ===== this episode's key moments")]      # captions + the shared helper functions


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]
head = rep(head, "<title>Bo and the Pancake 17 - The Message from Space</title>", "<title>Bo and the Pancake 18 - The Gray Planet</title>")
head = rep(head, """<span class="stk1">WHO'S<br>HIDING?</span>""", """<span class="stk1">WHO'S THAT<br>MONSTER?</span>""")
head = rep(head, "COMMANDER:'#8FF0FF'}", "COMMANDER:'#8FF0FF',ZORPIANS:'#FFC8F0',MUNCH:'#CBB8FF'}")
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)
anchor = "\nlet camCur=null;"
head = rep(head, anchor, "\n" + init.rstrip("\n") + "\n" + anchor)
open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + hdr + body)
print("template.tpl written", len(head + hdr + body))
