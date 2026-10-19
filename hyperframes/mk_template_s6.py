"""python mk_template_s6.py N  ->  toonN/build/template.tpl  (Season 6: the toon(N-1) template + this episode's _defsN/_initN/_bodyN, new title + end-card text)"""
import os, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
n = int(sys.argv[1])
# episode: (title, end-card line 1, end-card line 2)
META = {
    25: ("Festival Finale", "SEASON 6<br>COMING SOON!", "THANKS FOR WATCHING!"),
    26: ("The Big Gray Egg", "WHAT'S<br>INSIDE?", "GUESS IN THE COMMENTS!"),
    27: ("Keep It Warm", "IS IT<br>HATCHING?", "GUESS IN THE COMMENTS!"),
    28: ("Crack", "NAME THE<br>BABY!", "TELL US IN THE COMMENTS!"),
    29: ("Pebble's Big Day", "WHO IS<br>COMING?", "GUESS IN THE COMMENTS!"),
    30: ("Happy Hatching Day", "SEASON 7<br>COMING SOON!", "THANKS FOR WATCHING!"),
    31: ("The Great Pancake Race", "WHO WILL<br>WIN?", "GUESS IN THE COMMENTS!"),
    32: ("The Syrup River", "WHO IS IN<br>FRONT?", "GUESS IN THE COMMENTS!"),
    33: ("Flat Tire", "WHAT IS IN<br>THE TUNNEL?", "GUESS IN THE COMMENTS!"),
    34: ("The Dark Tunnel", "ALMOST<br>THERE!", "WHO WINS? TELL US!"),
    35: ("Photo Finish", "SEASON 8<br>COMING SOON!", "THANKS FOR WATCHING!"),
    36: ("The Map in the Pan", "WHERE IS<br>THE TREASURE?", "GUESS IN THE COMMENTS!"),
    37: ("Rough Seas", "WHAT IS ON<br>THE ISLAND?", "GUESS IN THE COMMENTS!"),
    38: ("The Riddle Gate", "CAN THEY<br>CROSS?", "GUESS IN THE COMMENTS!"),
    39: ("The Wobbly Bridge", "WHAT IS IN<br>THE CHEST?", "GUESS IN THE COMMENTS!"),
    40: ("The Real Treasure", "SEASON 9<br>COMING SOON!", "THANKS FOR WATCHING!"),
    41: ("Grandmas Picnic", "WHO ARE THE<br>THREE COUSINS?", "GUESS IN THE COMMENTS!"),
    42: ("The Three Cousins", "WHERE DID THE<br>PAGE GO?", "GUESS IN THE COMMENTS!"),
    43: ("The Lost Recipe", "WHAT IS THE<br>SECRET?", "GUESS IN THE COMMENTS!"),
    44: ("The Secret Ingredient", "SMILE FOR<br>THE PHOTO!", "SEE YOU IN THE NEXT ONE!"),
    45: ("The Family Photo", "SEASON 10<br>COMING SOON!", "THANKS FOR WATCHING!"),
    46: ("Snow Day", "WHO IS<br>WADDLES?", "GUESS IN THE COMMENTS!"),
    47: ("The Frozen Syrup", "WHO WILL<br>RIDE THE SLED?", "GUESS IN THE COMMENTS!"),
    48: ("The Big Sled", "WHAT DID<br>MUNCH BUILD?", "GUESS IN THE COMMENTS!"),
    49: ("Munchs Snow Castle", "WHAT IS WADDLES'<br>SECRET?", "GUESS IN THE COMMENTS!"),
    50: ("The Snow Day Party", "SEASON 11<br>COMING SOON!", "THANKS FOR WATCHING!"),
    51: ("Beach Day", "WHAT DID<br>TRUFFLE OPEN?", "GUESS IN THE COMMENTS!"),
    52: ("The Ice Cream Stand", "WHO WILL WIN<br>THE CONTEST?", "GUESS IN THE COMMENTS!"),
    53: ("The Sandcastle Contest", "WHAT FLOATED<br>ASHORE?", "GUESS IN THE COMMENTS!"),
    54: ("The Message in a Bottle", "WHO IS ON<br>THE ICEBERG?", "GUESS IN THE COMMENTS!"),
    55: ("The Penguin Family", "SEASON 12<br>COMING SOON!", "THANKS FOR WATCHING!"),
    56: ("The Big Top", "WHAT WILL BO<br>JUGGLE?", "GUESS IN THE COMMENTS!"),
    57: ("The Juggling Act", "CAN COCO<br>FLY?", "GUESS IN THE COMMENTS!"),
    58: ("The Flying Coco", "WHAT IS IN<br>MOCHI'S HAT?", "GUESS IN THE COMMENTS!"),
    59: ("The Magic Hat", "IS IT SHOW<br>TIME YET?", "GUESS IN THE COMMENTS!"),
    60: ("The Grand Finale", "SEASON 13<br>COMING SOON!", "THANKS FOR WATCHING!"),
    61: ("The Pumpkin Patch", "WHO IS<br>HIDING?", "GUESS IN THE COMMENTS!"),
    62: ("Boos Big Scare", "WHERE DO REAL<br>GHOSTS LIVE?", "GUESS IN THE COMMENTS!"),
    63: ("The Haunted House", "WHAT IS<br>INSIDE?", "GUESS IN THE COMMENTS!"),
    64: ("The Giant Shadow", "WHO IS IN<br>THE HOUSE?", "GUESS IN THE COMMENTS!"),
    65: ("The Ghost Party", "SEASON 14<br>COMING SOON!", "THANKS FOR WATCHING!"),
}
D = os.path.join(ROOT, f"toon{n}")
rd = lambda p: open(p, encoding="utf-8").read()
src = rd(os.path.join(ROOT, f"toon{n-1}", "build", "template.tpl"))
defs = rd(os.path.join(D, f"_defs{n}.js")) if os.path.exists(os.path.join(D, f"_defs{n}.js")) else ""
init = rd(os.path.join(D, f"_init{n}.js"))
body = rd(os.path.join(D, f"_body{n}.js"))
s16 = rd(os.path.join(ROOT, "toon16", "_scenes16.js"))
hdr = s16[:s16.index("/* ===== this episode's key moments")]


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


cut = src.index("/* ===== captions ===== */")
head = src[:cut]
if n == 36:    # Season 8 is made TikTok-style: captions + end card sit above the platform UI zone (bottom ~20 %), everything else unchanged (inherited by 37-40)
    head = rep(head, "#capsB{top:1470px}", "#capsB{top:1250px}")
    head = rep(head, "#sticker{position:absolute;left:50%;bottom:90px;", "#sticker{position:absolute;left:50%;bottom:380px;")
old, new = META[n - 1], META[n]
head = rep(head, f"<title>Bo and the Pancake {n-1} - {old[0]}</title>", f"<title>Bo and the Pancake {n} - {new[0]}</title>")
head = rep(head, f'<span class="stk1">{old[1]}</span>', f'<span class="stk1">{new[1]}</span>')
head = rep(head, f'<span class="stk2">{old[2]}</span>', f'<span class="stk2">{new[2]}</span>')
endm = "/* ---------------- captions (word-timed by Whisper"
if defs.strip():
    head = rep(head, endm, defs.rstrip("\n") + "\n" + endm)
anchor = "\nlet camCur=null;"
head = rep(head, anchor, "\n" + init.rstrip("\n") + "\n" + anchor)
os.makedirs(os.path.join(D, "build"), exist_ok=True)
open(os.path.join(D, "build", "template.tpl"), "w", encoding="utf-8").write(head + hdr + body)
print("template.tpl written", n, len(head + hdr + body))
