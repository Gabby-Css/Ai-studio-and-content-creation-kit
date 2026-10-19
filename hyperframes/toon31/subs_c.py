PAIRS = [
    ("gsap.set('.wh,.kfl',{svgOrigin:'0 0'});gsap.set('#raceSet,#startW,#spdW',{opacity:0});",
     "gsap.set('.wh,.kfl,#spdW,.spl,#startW,#startG,#raceSet',{svgOrigin:'0 0'});gsap.set('#raceSet,#startW,#spdW',{opacity:0});\nfor(const p of Object.keys(KRC)) gsap.set(`#${KRC[p].k}W,#${KRC[p].k}`,{svgOrigin:'0 0'});"),
]
