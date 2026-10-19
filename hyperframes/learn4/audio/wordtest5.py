import re, sys
sys.argv = [sys.argv[0]]
import wordtest as W
LINES = {
 "cur [1,1,2]": "Rec+:G4:1 tan+:G4:1 gle,:G4:2 rec+:A4:1 tan+:A4:1 gle,:A4:2 long:A4:2 and:A4:1 wide!:C5:3 _:2",
 "A [2,1,1]":   "Rec+:G4:2 tan+:G4:1 gle,:G4:1 rec+:A4:2 tan+:A4:1 gle,:A4:1 long:A4:2 and:A4:1 wide!:C5:3 _:2",
 "B [1,2,1]":   "Rec+:G4:1 tan+:G4:2 gle,:G4:1 rec+:A4:1 tan+:A4:2 gle,:A4:1 long:A4:2 and:A4:1 wide!:C5:3 _:2",
 "C 2 notes":   "Rec+:G4:2 tangle,:G4:2 rec+:A4:2 tangle,:A4:2 long:A4:2 and:A4:1 wide!:C5:3 _:2",
 "D [1,1,2]x3": "Rec+:G4:1 tan+:G4:1 gle,:G4:2 rec+:A4:1 tan+:A4:1 gle,:A4:2 rec+:A4:1 tan+:A4:1 gle!:C5:2 _:4",
}
for name, dsl in LINES.items():
    print(f"  {name:14s}", " ".join(W.hear(W.render_line(dsl))), flush=True)
