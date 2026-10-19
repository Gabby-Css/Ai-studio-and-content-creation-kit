PAIRS = [
    ("document.getElementById('fxMount').insertAdjacentHTML('beforeend',SPD_HTML);", "document.getElementById('fxMount').insertAdjacentHTML('beforeend',SPD_HTML+GP_HTML);"),
    ("gsap.set('#raceSet,#startW,#spdW',{opacity:0});", "gsap.set('#raceSet,#startW,#spdW,#gpanW',{opacity:0});gsap.set('#gpanW,#gpan',{svgOrigin:'0 0'});"),
    ("// the spectators stand behind the fence on the grass", "for(const p of Object.keys(KRC)) gsap.set('#'+KRC[p].k+'W',{opacity:0});            // the karts arrive in scene 3 of #31\n// the spectators stand behind the fence on the grass"),
]
