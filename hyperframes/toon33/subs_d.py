PAIRS = [
    ("const WIDE3=[900,560,.66];                                 // the still wide shot (view x 900..2536)", "const WIDE3=[700,560,.66];                                 // the still wide shot (view x 700..2336): Bo is already in it at the left edge when he speaks"),
    ("tl.set('#kboW',{x:300},L[4]+.6);tl.set('#bo',{x:bx(300)},L[4]+.6);tl.set('#pb',{x:300+PK[0]},L[4]+.6);",
     "tl.set('#kboW',{x:150},L[4]+.55);tl.set('#bo',{x:bx(150)},L[4]+.55);tl.set('#pb',{x:150+PK[0]},L[4]+.55);\ndriveBo(L[4]+.65,.95,900,'power2.out');                    // ... and he drives back in while the camera is still on Mochi: he is in the wide shot BEFORE his line starts"),
    ("driveBo(L[5]-.1,1.5,1200,'none');wheels(L[5]-.1,L[5]+1.5,6);speedLines(L[5]-.1,L[5]+1.4);", "driveBo(L[5]+.05,1.3,1200,'sine.out');wheels(L[5]-.1,L[5]+1.5,6);speedLines(L[5]+.05,L[5]+1.4);"),
    ("for(let k=0;k<6;k++) trail(L[5]+.1+k*.2,300+(1200-300)*Math.min(1,(k*.2+.1)/1.5)-120,LANE[4]+6,1.1);", "for(let k=0;k<5;k++) trail(L[5]+.1+k*.2,900+(1200-900)*Math.min(1,(k*.2+.1)/1.3)-120,LANE[4]+6,1.1);"),
]
