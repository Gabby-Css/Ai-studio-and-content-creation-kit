PAIRS = [
    ("const DARK=.76;", "const DARK=.66;"),
    ("tl.fromTo('#pglW',{opacity:0,scale:.2},{opacity:.9,scale:1,duration:1.2,ease:'sine.out'},W(4,3)-.2);", "tl.fromTo('#pglW',{opacity:0,scale:.2},{opacity:.85,scale:.9,duration:1.2,ease:'sine.out'},W(4,3)-.2);"),
    ("tl.fromTo('#pglW',{scale:1},{scale:1.35,duration:.2,yoyo:true,repeat:3},W(5,0));", "tl.fromTo('#pglW',{scale:.9},{scale:1.15,duration:.2,yoyo:true,repeat:3},W(5,0));"),
    ("tl.to('#pglW',{x:1450,y:2250,scale:2.1,duration:1.2,ease:'sine.inOut'},L[6]);\ntl.to('#night',{opacity:.62,duration:1.0},L[6]);", "tl.to('#pglW',{x:1450,y:2250,scale:1.5,duration:1.2,ease:'sine.inOut'},L[6]);\ntl.to('#night',{opacity:.52,duration:1.0},L[6]);"),
    ("tl.fromTo('#pglW',{scale:2.1},{scale:2.5,duration:.3,yoyo:true,repeat:3},L[10]);", "tl.fromTo('#pglW',{scale:1.5},{scale:1.8,duration:.3,yoyo:true,repeat:3},L[10]);"),
    ("tl.fromTo('#exgW',{scale:.8,opacity:.95},{scale:4.5,opacity:1,duration:.8,ease:'power2.in'},tExit-.9);\ntl.fromTo('#flash',{opacity:0},{opacity:.95,duration:.35,ease:'power2.in'},tExit-.35);", "tl.fromTo('#exgW',{scale:.8,opacity:.95},{scale:3.2,opacity:.95,duration:.8,ease:'power2.in'},tExit-.9);\ntl.fromTo('#flash',{opacity:0},{opacity:.7,duration:.35,ease:'power2.in'},tExit-.35);"),
]
