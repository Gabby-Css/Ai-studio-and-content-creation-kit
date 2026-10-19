"""Assemble toon26/build/template.tpl from the toon25 template + this episode's new parts (Season 6, ep 1)."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon25", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs26.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init26.js"), encoding="utf-8").read()
body = open(os.path.join(HERE, "_body26.js"), encoding="utf-8").read()
s16 = open(os.path.join(HERE, "..", "toon16", "_scenes16.js"), encoding="utf-8").read()
hdr = s16[:s16.index("/* ===== this episode's key moments")]


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]
head = rep(head, "<title>Bo and the Pancake 25 - Festival Finale</title>", "<title>Bo and the Pancake 26 - The Big Gray Egg</title>")
head = rep(head, """<span class="stk1">SEASON 6<br>COMING SOON!</span>""", """<span class="stk1">WHAT'S<br>INSIDE?</span>""")
head = rep(head, """<span class="stk2">THANKS FOR WATCHING!</span>""", """<span class="stk2">GUESS IN THE COMMENTS!</span>""")
head = rep(head, "MUNCH:'#CBB8FF'};", "MUNCH:'#CBB8FF',PEBBLE:'#FFA6D2',BABY:'#FFA6D2'};")
endm = "/* ---------------- captions (word-timed by Whisper"
head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)
anchor = "\nlet camCur=null;"
head = rep(head, anchor, "\n" + init.rstrip("\n") + "\n" + anchor)
open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + hdr + body)
print("template.tpl written", len(head + hdr + body))
