PAIRS = [
    ("const RACE=[300,200,.56];                                   // the camera for the race scenes", "const RACE=[520,800,.66];                                   // the camera for the race scenes (x0,y0,scale)\n// camera that puts a point (ex,ey) at screen (sx,sy) - no clamping, the race world is 14000 wide\nconst camE=(ex,ey,s,sx=540,sy=640)=>[Math.round(ex-sx/s),Math.round(ey-sy/s),s];\nconst EH={bo:465,tf:422,mc:426,cm:422,zp:371,nm:422,bp:342,pt:432,gm:544,kg:342,pb:544};   // eye height above the feet at scale 1 (Bo is measured at his real scale)"),
    # kart bias is in kart-local units (the kart is scaled)
    ("KART_HTML(r.k,r.c[0],r.c[1],r.b));", "KART_HTML(r.k,r.c[0],r.c[1],r.b/r.cs));"),
    ("const SPEC={gm:[640,1640,1.05],pt:[1040,1640,.7],bp:[1330,1640,.66],nm:[1640,1640,.54],kg:[2060,1640,1.15]};", "const SPEC={gm:[880,1640,1.05],pt:[1180,1640,.7],nm:[1370,1640,.54],bp:[1540,1640,.66],kg:[1990,1640,1.0]};"),
    ("{j1:380,j2:480,j3:1850,j4:1950}", "{j1:640,j2:760,j3:1700,j4:1800}"),
    ("gsap.set('#gh',{opacity:1,x:1150,y:520,scale:.7});", "gsap.set('#gh',{opacity:1,x:1300,y:1080,scale:.7});"),
    ("gsap.set('#startW',{opacity:1});gsap.set('#startG',{x:1950});", "gsap.set('#startW',{opacity:1});gsap.set('#startG',{x:1960});"),
    ("const ST={cm:1540,tf:1360,zp:1180,mc:1000,bo:820};", "const ST={cm:1560,tf:1380,zp:1200,mc:1020,bo:840};"),
]
