PAIRS = [
    ("tl.set('#pileW',{opacity:0},L[3]+.6);\n", ""),
    ("tl.to('#mn',{rotation:0,duration:.01},0);\n", ""),
    ("tl.fromTo('#gh',{rotation:0},{rotation:360,duration:.9,ease:'power1.inOut'},L[8]+.5);", "[0,1,2].forEach(i=>hop('#ghSq',L[8]+.5+i*.45,60,.18,.22));"),
]
