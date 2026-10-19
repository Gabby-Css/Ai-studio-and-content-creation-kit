PAIRS = [
    (" DEPTH.lay.insertAdjacentHTML('beforeend',KART_HTML(r.k,r.c[0],r.c[1]).replace(`<g id=\"${r.k}\"><g id=\"${r.k}S\">`,`<g transform=\"translate(0,${-r.b})\"><g id=\"${r.k}\"><g id=\"${r.k}S\">`).replace(/<\\/g><\\/g><\\/g>$/,'</g></g></g></g>'));",
     " DEPTH.lay.insertAdjacentHTML('beforeend',KART_HTML(r.k,r.c[0],r.c[1],r.b));"),
    ("gsap.set('#'+p,{opacity:1,x:cx,y:cy+r.b*0,scale:r.cs===.58?.58:r.cs});", "gsap.set('#'+p,{opacity:1,x:cx,y:cy,scale:r.cs});"),
]
