PAIRS = [
    ("const PK=[105,4];                                          // Pebble's seat relative to Bo's kart (x, y offset to his feet)",
     "const PK=[105,-120];                                       // Pebble's seat in Bo's kart: x offset, and y offset from the kart's origin (its ground contact)\nconst KY=(p)=>LANE[KRC[p].L]+KRC[p].b;                     // kart origin (world y) of a racer\nconst FEET=(p)=>LANE[KRC[p].L]-34;                         // a racer's character origin (world y)\nconst EYEY=(p,s)=>FEET(p)-EH[p]*s;                         // ... and his eyes"),
    ("gsap.set('#bo',{x:chPos('bo',PX0.bo-6-52,0)[0]});          // Bo scoots left a little to make room for Pebble (as at the end of #31)\n", ""),
    ("gsap.set('#pb',{opacity:1,x:PX0.bo+PK[0],y:FEET('bo')+PK[1],scale:PBS});", "gsap.set('#pb',{opacity:1,x:PX0.bo+PK[0],y:KY('bo')+PK[1],scale:PBS});"),
]
