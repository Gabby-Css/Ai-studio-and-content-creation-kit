PAIRS = [
    ("const PK=[105,4];                                          // Pebble's seat relative to Bo's kart (x, y offset to his feet)",
     "const PK=[105,4];                                          // Pebble's seat relative to Bo's kart (x, y offset to his feet)\nconst FEET=(p)=>LANE[KRC[p].L]-34;                         // a seated racer's feet (world y)\nconst EYEY=(p,s)=>FEET(p)-EH[p]*s;                         // ... and his eyes"),
    ("y:FEET_Y(4)+PK[1]", "y:FEET('bo')+PK[1]"),
]
