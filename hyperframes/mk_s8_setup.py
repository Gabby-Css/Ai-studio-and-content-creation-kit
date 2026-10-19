"""Season 8 ("The Treasure of Pancake Island", ep36-40) setup:  python mk_s8_setup.py -> toon36..toon40 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-7 (see voice_lessons.py): 11 lines, 4-7 words each, a real word next to every interjection,
no stand-alone onomatopoeia ("Meow!", "Hooray!", "Aww!"), the pitched-up baby only says plain words ("Me too!")."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
PEB = lambda text, ch: BABY(text, ch, 'PEBBLE')
ROCKY = lambda text, ch: ("'am_adam'", 0.92, text, ch, 'ROCKY', 1.0, None)
FLAP = lambda text, ch: ("'af_nova'", 1.10, text, ch, 'FLAPJACK', 1.0, None)
NIB = lambda text, ch: ("'af_bella'", 1.05, text, ch, 'NIBBLES', 1.22, None)
GRAN = lambda text, ch: ("'bf_isabella'", 0.85, text, ch, 'GRANDMA', 0.9, None)

EPS = {
    36: ("The Map in the Pan", {}, {
        1: NAR('Munch left the Golden Pan outside!', ['MUNCH LEFT THE', 'GOLDEN PAN', 'OUTSIDE!']),
        2: TRUF("Wow! Let's cook in it!", ['WOW! LET\'S', 'COOK IN IT!']),
        3: NAR('Sizzle, sizzle... and a map appeared!', ['SIZZLE, SIZZLE...', 'AND A MAP', 'APPEARED!']),
        4: ZAP('Beep boop! X marks the spot!', ['BEEP BOOP!', 'X MARKS', 'THE SPOT!']),
        5: MOCHI('Hmph. Treasure map. Obviously.', ['HMPH. TREASURE', 'MAP.', 'OBVIOUSLY.']),
        6: BO("Treasure! Let's go find it!", ['TREASURE!', "LET'S GO", 'FIND IT!']),
        7: PEB('Me too! Me too!', ['ME TOO!', 'ME TOO!']),
        8: NAR('But the island was far away!', ['BUT THE ISLAND', 'WAS FAR', 'AWAY!']),
        9: TRUF('Then we need a pancake boat!', ['THEN WE NEED', 'A PANCAKE', 'BOAT!']),
        10: ZAP('Beep boop! Building the boat!', ['BEEP BOOP!', 'BUILDING', 'THE BOAT!']),
        11: NAR('By sunset, the boat was ready!', ['BY SUNSET,', 'THE BOAT', 'WAS READY!']),
    }),
    37: ("Rough Seas", {}, {
        1: NAR('The pancake boat sailed out to sea!', ['THE PANCAKE BOAT', 'SAILED OUT', 'TO SEA!']),
        2: BO('Wheee! I love the waves!', ['WHEEE!', 'I LOVE', 'THE WAVES!']),
        3: GUM("Roar! I'll row the boat!", ['ROAR! I\'LL', 'ROW THE', 'BOAT!']),
        4: NAR('Then the wind blew the map away!', ['THEN THE WIND', 'BLEW THE', 'MAP AWAY!']),
        5: BLIP('Look! My antenna caught it!', ['LOOK! MY', 'ANTENNA', 'CAUGHT IT!']),
        6: BOO("Waves! I'm scared. Boo.", ['WAVES!', "I'M SCARED.", 'BOO.']),
        7: BO('Hold my hand, Boo!', ['HOLD MY', 'HAND, BOO!']),
        8: NAR('Then somebody sneezed in the snacks!', ['THEN SOMEBODY', 'SNEEZED IN', 'THE SNACKS!']),
        9: ROCKY('Nobody saw anything.', ['NOBODY SAW', 'ANYTHING.']),
        10: BO('Rocky! You stowed away again!', ['ROCKY! YOU', 'STOWED AWAY', 'AGAIN!']),
        11: NAR('And then... land ahoy!', ['AND THEN...', 'LAND', 'AHOY!']),
    }),
    38: ("The Riddle Gate", {}, {
        1: NAR('A giant gate blocked the jungle!', ['A GIANT GATE', 'BLOCKED', 'THE JUNGLE!']),
        2: NAR('It said: Round, golden, and flipped!', ['IT SAID:', 'ROUND, GOLDEN,', 'AND FLIPPED!']),
        3: COCO('Ooh-ooh! Is it a banana?', ['OOH-OOH!', 'IS IT', 'A BANANA?']),
        4: TRUF('Needs a pinch more thinking!', ['NEEDS A', 'PINCH MORE', 'THINKING!']),
        5: MOCHI("Hmph. It's a pancake. Obviously.", ["HMPH. IT'S", 'A PANCAKE.', 'OBVIOUSLY.']),
        6: FLAP('Wait... that is me!', ['WAIT...', 'THAT IS', 'ME!']),
        7: NAR('The gate rumbled and swung open!', ['THE GATE', 'RUMBLED AND', 'SWUNG OPEN!']),
        8: BO('Pancake trees! Just one tiny bite!', ['PANCAKE TREES!', 'JUST ONE', 'TINY BITE!']),
        9: NIB('Squeak! Is that cheese?', ['SQUEAK!', 'IS THAT', 'CHEESE?']),
        10: NAR('Nibbles found a secret path!', ['NIBBLES FOUND', 'A SECRET', 'PATH!']),
        11: NAR('But the path ended at a cliff!', ['BUT THE PATH', 'ENDED AT', 'A CLIFF!']),
    }),
    39: ("The Wobbly Bridge", {}, {
        1: NAR('A wobbly bridge crossed the canyon!', ['A WOBBLY BRIDGE', 'CROSSED', 'THE CANYON!']),
        2: ZAP('Beep boop! Two at a time!', ['BEEP BOOP!', 'TWO AT', 'A TIME!']),
        3: GUM("Roar! I'll hold the bridge!", ["ROAR! I'LL", 'HOLD THE', 'BRIDGE!']),
        4: NAR('Step by step, they crossed.', ['STEP BY STEP,', 'THEY CROSSED.']),
        5: BOO("I'll float across. Boo.", ["I'LL FLOAT", 'ACROSS. BOO.']),
        6: NAR('Syrup splashed on the map!', ['SYRUP SPLASHED', 'ON THE', 'MAP!']),
        7: BO("Oh no! We can't read it!", ['OH NO!', "WE CAN'T", 'READ IT!']),
        8: PEAN('I remember the map! Go left!', ['I REMEMBER', 'THE MAP!', 'GO LEFT!']),
        9: NAR('Peanut led them to the big X!', ['PEANUT LED', 'THEM TO', 'THE BIG X!']),
        10: TRUF('A treasure chest! Open it!', ['A TREASURE', 'CHEST!', 'OPEN IT!']),
        11: NAR('But the chest was locked tight!', ['BUT THE CHEST', 'WAS LOCKED', 'TIGHT!']),
    }),
    40: ("The Real Treasure", {}, {
        1: NAR('The lock looked like a pan handle!', ['THE LOCK', 'LOOKED LIKE', 'A PAN HANDLE!']),
        2: BO('Truffle, the Golden Pan!', ['TRUFFLE,', 'THE GOLDEN', 'PAN!']),
        3: TRUF('Here you go! One golden key!', ['HERE YOU GO!', 'ONE GOLDEN', 'KEY!']),
        4: NAR('Click! The chest popped open!', ['CLICK! THE', 'CHEST POPPED', 'OPEN!']),
        5: NAR('Inside, a tiny pancake was napping!', ['INSIDE, A TINY', 'PANCAKE WAS', 'NAPPING!']),
        6: FLAP('Grandma? Is that you?', ['GRANDMA?', 'IS THAT', 'YOU?']),
        7: GRAN('Who woke me? Is it Sunday?', ['WHO WOKE ME?', 'IS IT', 'SUNDAY?']),
        8: MOCHI('Hmph. The treasure is family. Obviously.', ['HMPH. THE', 'TREASURE IS', 'FAMILY.', 'OBVIOUSLY.']),
        9: TRUF('Pancakes for everybody!', ['PANCAKES FOR', 'EVERYBODY!']),
        10: EVERY('Happy pancake treasure day!', ['HAPPY PANCAKE', 'TREASURE', 'DAY!']),
        11: NAR('And that was the end of Season eight!', ['AND THAT WAS', 'THE END OF', 'SEASON EIGHT!']),
    }),
}


def setup():
    base = open(os.path.join(ROOT, "toon25", "tts.py"), encoding="utf-8").read()
    for n, (title, synth, lines) in EPS.items():
        d = os.path.join(ROOT, f"toon{n}")
        for sub in ("assets/fonts", "vendor", "build"):
            os.makedirs(os.path.join(d, *sub.split("/")), exist_ok=True)
        for rel in ("vendor/gsap.min.js", "assets/fonts/baloo-2-latin-800-normal.woff2", "build.cjs"):
            shutil.copy(os.path.join(ROOT, "toon25", *rel.split("/")), os.path.join(d, *rel.split("/")))
        s = re.sub(r"LINES = \{.*?\n\}\n", lambda m: S6.lines_block(lines) + "\n", base, count=1, flags=re.S)
        s = s.replace("'Bo and the Pancake 25: Festival Finale'", f"'Bo and the Pancake {n}: {title}'")
        s = re.sub(r"SYNTH = \{\}", "SYNTH = " + repr(synth), s, count=1)
        open(os.path.join(d, "tts.py"), "w", encoding="utf-8", newline="\n").write(s)
        print("toon", n, "tts.py written;", len(lines), "lines")


if __name__ == "__main__":
    setup()
