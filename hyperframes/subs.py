"""python subs.py file.js  <<< pairs given as python literal in a .py module: subs_<name>.py defines PAIRS=[(old,new),...]
usage: python subs.py toon27/_body27.js subs_27a.py   -> applies PAIRS (each `old` must occur exactly once unless a 3rd element gives the count)"""
import sys, os
f, mod = sys.argv[1], sys.argv[2]
ns = {}
exec(open(mod, encoding="utf-8").read(), ns)
s = open(f, encoding="utf-8").read()
for p in ns["PAIRS"]:
    old, new = p[0], p[1]
    cnt = p[2] if len(p) > 2 else 1
    c = s.count(old)
    if c != cnt:
        print("!! count", c, "(want", cnt, ") for:", old[:100]); continue
    s = s.replace(old, new)
open(f, "w", encoding="utf-8", newline="\n").write(s)
print("ok", f, len(ns["PAIRS"]), "pairs")
