"""Assemble toon3/build/template.tpl from the toon2 template + this episode's new parts."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, "..", "toon2", "build", "template.tpl"), encoding="utf-8").read()
defs = open(os.path.join(HERE, "_defs3.js"), encoding="utf-8").read()
init = open(os.path.join(HERE, "_init3.js"), encoding="utf-8").read()
scenes = open(os.path.join(HERE, "_scenes3.js"), encoding="utf-8").read()


def rep(s, a, b, cnt=1):
    c = s.count(a)
    assert c == cnt, (a[:90], c)
    return s.replace(a, b)


# ---- cut the file: [head ... '/* ===== captions ===== */'] + new scenes
cut = src.index("/* ===== captions ===== */")
head = src[:cut]

head = rep(head, "<title>Bo and the Pancake 2 - Knock, Knock!</title>", "<title>Bo and the Pancake 3 - Honey Trouble</title>")
head = rep(head, """<span class="stk1">WHO'S AT THE WINDOW?</span>""", """<span class="stk1">WHO'S SQUEAKING?</span>""")

# ---- window: no more Rocky peek; Barnaby (colour rig) sits in front of the mullions, behind the sill/curtains
head = rep(head, ' <g clip-path="url(#cpGlass)"><g id="rwMount"></g></g>\n', '')
head = rep(head, ' <rect x="280" y="760" width="540" height="34" rx="12" fill="#fff" stroke="#2b1a14" stroke-width="8"/>',
           ' <g clip-path="url(#cpGlass)"><g id="bwMount"></g></g>\n <rect x="280" y="760" width="540" height="34" rx="12" fill="#fff" stroke="#2b1a14" stroke-width="8"/>')

# ---- no window plant in this episode (it would hide Barnaby's face)
head = rep(head, ' <rect x="480" y="700" width="90" height="62" rx="12" fill="#D9703A" stroke="#2b1a14" stroke-width="6"/>\n', '')
head = rep(head, ' <g fill="#4FBF6B" stroke="#2b1a14" stroke-width="5"><ellipse cx="500" cy="680" rx="22" ry="40" transform="rotate(-20 500 680)"/><ellipse cx="528" cy="668" rx="22" ry="46"/><ellipse cx="556" cy="680" rx="22" ry="40" transform="rotate(20 556 680)"/></g>\n', '')
# ---- honey pool in the tub
head = rep(head, ' <ellipse cx="1000" cy="1063" rx="118" ry="9" fill="#E0962C" opacity=".8"/>',
           ' <ellipse cx="1000" cy="1063" rx="118" ry="9" fill="#E0962C" opacity=".8"/>\n'
           ' <g id="honeyPool" opacity="0"><ellipse cx="1000" cy="1067" rx="146" ry="17" fill="#F2A900"/><ellipse cx="1000" cy="1062" rx="108" ry="8" fill="#FFD04A" opacity=".85"/></g>')
# ---- jar layer (above Flapjack, below the tub's front wall) and the mouse hole
head = rep(head, '<g id="panMount"></g>', '<g id="panMount"></g>\n<g id="jarMount"></g>')
head = rep(head, '<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>',
           '<clipPath id="cpGlass"><rect x="334" y="334" width="432" height="402" rx="12"/></clipPath>\n'
           '<clipPath id="cpHole"><path d="M1520,1358 L1520,1272 Q1520,1156 1640,1156 Q1760,1156 1760,1272 L1760,1358Z"/></clipPath>')
head = rep(head, '<rect x="-10" y="1340" width="2620" height="36" fill="#fff" stroke="#2b1a14" stroke-width="7"/>',
           '<rect x="-10" y="1340" width="2620" height="36" fill="#fff" stroke="#2b1a14" stroke-width="7"/>\n'
           '<g id="mouseHole"><path d="M1515,1358 L1515,1270 Q1515,1150 1640,1150 Q1765,1150 1765,1270 L1765,1358Z" fill="#2a1810" stroke="#2b1a14" stroke-width="8" stroke-linejoin="round"/></g>\n'
           '<g clip-path="url(#cpHole)"><g id="nbMount"></g></g>\n'
           '<path d="M1500,1360 L1780,1360" stroke="#2b1a14" stroke-width="8" stroke-linecap="round"/>')

# ---- Bo carries Flapjack on his head in the chase ('bh' = pancake instance riding Bo)
head = rep(head, '   <g id="boSweat" opacity="0" transform="translate(138,-196)">',
           "   <g transform=\"translate(0,-232)\">${panSVG('bh')}</g>\n   <g id=\"boSweat\" opacity=\"0\" transform=\"translate(138,-196)\">")
# ---- honey glaze overlay on the pancake
butter = '<rect x="-34" y="-158" width="68" height="40" rx="9" fill="#FFE98A" ${sw(5)}/><path d="M-22,-146 L8,-146" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>'
glaze = ('\n <g id="${p}Glaze" opacity="0"><ellipse cx="0" cy="-122" rx="124" ry="31" fill="#F6B21E" opacity=".72"/>'
         '<path d="M-122,-116 q-8,42 8,54 q16,-12 10,-54z M-38,-92 q-5,46 10,60 q15,-14 9,-60z M64,-96 q-4,38 9,48 q12,-10 8,-48z M116,-110 q10,34 0,46 q-13,-10 -9,-46z" fill="#F6B21E" ${sw(4)}/></g>')
head = rep(head, butter, butter + glaze)

# ---- Rocky has no hat pancake any more; the 'rw' window Rocky is replaced by Barnaby / Nibbles / jar / bees
head = rep(head, "document.getElementById('rkMount').innerHTML=rockySVG('rk',true);", "document.getElementById('rkMount').innerHTML=rockySVG('rk',false);")
head = rep(head, "document.getElementById('rwMount').innerHTML=rockySVG('rw',false);", defs)

# ---- bees join the fx layer
head = rep(head, "document.getElementById('fxMount').innerHTML=fx;",
           "for(let i=0;i<7;i++) fx+=beeSVG(i);\ndocument.getElementById('fxMount').innerHTML=fx;")

# ---- captions: all at the bottom, new speaker colours, new line order
head = rep(head, "const HLC={'':'#FFE14D',ROCKY:'#A9B8FF',FLAPJACK:'#FF8FC4',BARNABY:'#F0A868'};",
           "const HLC={'':'#FFE14D',ROCKY:'#A9B8FF',FLAPJACK:'#FF8FC4',BARNABY:'#F0A868',BO:'#FFB35C',NIBBLES:'#E6B7D6'};")
head = rep(head, "const CAP_BOTTOM=new Set([3,7,6,9]);", "const CAP_BOTTOM=new Set([1,2,3,4,5,6,7,8,9,10,11]);")
head = rep(head, "for(const ln of [1,2,3,7,4,8,5,6,9]){let idx=0;", "for(const ln of [1,7,2,3,8,4,5,9,6,10,11]){let idx=0;")

# ---- episode constants / initial state
head = rep(head, "const S2=L[2]-.12, S3=L[3]-.15, S4=L[4]-.15, S5=L[8]-.4, S6=L[6]-.1;\nconst K1=L[6]+DU[6]+.1, K2=K1+.28, L9E=L[9]+DU[9];\n", "")
a = head.index("gsap.set('#cam',{transformOrigin:'0 0'});")
endm = "gsap.set('#panArmR,#phArmR',{rotation:18});"
b = head.index(endm) + len(endm)
head = head[:a] + init.rstrip("\n") + head[b:]

# ---- helper instances
head = rep(head, "const FJ=mkPan('pan'), FH=mkPan('ph');", "const FJ=mkPan('pan'), FB=mkPan('bh');")
head = rep(head, "const RW=mkRock('rw'), RK=mkRock('rk');", "const BW=mkRock('bw'), RK=mkRock('rk'), NM=mkRock('nb');")

open(os.path.join(HERE, "build", "template.tpl"), "w", encoding="utf-8").write(head + scenes)
print("template.tpl written", len(head + scenes))
