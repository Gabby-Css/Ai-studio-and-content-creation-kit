"""Season 11 ("The Great Beach Day", ep51-55) setup:  python mk_s11_setup.py -> toon51..toon55 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-10 (see 10_SEASON8_9_AND_LESSONS.md): 11 lines, 4-7 words each, total <= ~57 words so line 11 ends <= 25.8 s,
a real word next to every interjection, no stand-alone onomatopoeia, the pitched-up baby only says plain words, slow voices (Grandma) at speed 0.93."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
ROCKY = lambda text, ch: ("'am_adam'", 0.92, text, ch, 'ROCKY', 1.0, None)
GRAN = lambda text, ch: ("'bf_isabella'", 0.93, text, ch, 'GRANDMA', 0.9, None)
WADD = lambda text, ch: ("'am_eric'", 1.0, text, ch, 'WADDLES', 1.12, None)
MOM = lambda text, ch: ("'af_nova'", 0.97, text, ch, 'MOM', 1.05, None)
DAD = lambda text, ch: ("'bm_lewis'", 0.95, text, ch, 'DAD', 0.95, None)

EPS = {
    51: ("Beach Day", {}, {
        1: NAR('One morning, the sun melted all the snow!', ['ONE MORNING,', 'THE SUN MELTED', 'ALL THE SNOW!']),
        2: WADD('Oh no! I am too hot!', ['OH NO!', 'I AM', 'TOO HOT!']),
        3: BO("Don't worry! Let's go swimming!", ["DON'T WORRY!", "LET'S GO", 'SWIMMING!']),
        4: BABY('Play! Play! Play!', ['PLAY!', 'PLAY!', 'PLAY!']),
        5: TRUF('I packed the picnic basket!', ['I PACKED THE', 'PICNIC', 'BASKET!']),
        6: ZAP('Beep boop! Sunscreen level fifty!', ['BEEP BOOP!', 'SUNSCREEN', 'LEVEL FIFTY!']),
        7: MOCHI('Hmph. Sand is itchy. Obviously.', ['HMPH. SAND', 'IS ITCHY.', 'OBVIOUSLY.']),
        8: NAR('They marched over the sandy hill!', ['THEY MARCHED', 'OVER THE', 'SANDY HILL!']),
        9: COCO('Ooh-ooh! I see the ocean!', ['OOH-OOH!', 'I SEE', 'THE OCEAN!']),
        10: NAR('Blue waves sparkled in the sun!', ['BLUE WAVES', 'SPARKLED IN', 'THE SUN!']),
        11: NAR('And Waddles splashed right in!', ['AND WADDLES', 'SPLASHED', 'RIGHT IN!']),
    }),
    52: ("The Ice Cream Stand", {}, {
        1: NAR('Truffle opened an ice cream stand!', ['TRUFFLE OPENED', 'AN ICE CREAM', 'STAND!']),
        2: TRUF('Fresh ice cream, everybody!', ['FRESH', 'ICE CREAM,', 'EVERYBODY!']),
        3: ZAP("Beep boop! It's melting fast!", ['BEEP BOOP!', "IT'S MELTING", 'FAST!']),
        4: NAR('Ice cream dripped everywhere!', ['ICE CREAM', 'DRIPPED', 'EVERYWHERE!']),
        5: WADD("Penguins know cold. I'll help!", ['PENGUINS', 'KNOW COLD.', "I'LL HELP!"]),
        6: NAR('He blew, and it froze!', ['HE BLEW,', 'AND IT', 'FROZE!']),
        7: GUM('Roar! I want ten scoops!', ['ROAR! I', 'WANT TEN', 'SCOOPS!']),
        8: NAR('Gumdrop ate them all, fast!', ['GUMDROP ATE', 'THEM ALL,', 'FAST!']),
        9: GUM('Ow! My head is frozen!', ['OW! MY', 'HEAD IS', 'FROZEN!']),
        10: MOCHI('Hmph. Brain freeze. Obviously.', ['HMPH. BRAIN', 'FREEZE.', 'OBVIOUSLY.']),
        11: NAR('And everyone shared the rest!', ['AND EVERYONE', 'SHARED', 'THE REST!']),
    }),
    53: ("The Sandcastle Contest", {}, {
        1: NAR('Then the sandcastle contest began!', ['THEN THE', 'SANDCASTLE', 'CONTEST BEGAN!']),
        2: BO("I'll build the tallest tower!", ["I'LL BUILD", 'THE TALLEST', 'TOWER!']),
        3: MUNCH('My castle will be gigantic!', ['MY CASTLE', 'WILL BE', 'GIGANTIC!']),
        4: MOCHI('Hmph. Mine is neat. Obviously.', ['HMPH. MINE', 'IS NEAT.', 'OBVIOUSLY.']),
        5: ZAP('Beep boop! Perfect square towers!', ['BEEP BOOP!', 'PERFECT', 'SQUARE TOWERS!']),
        6: PEAN('Look! A giant wave is coming!', ['LOOK! A', 'GIANT WAVE', 'IS COMING!']),
        7: NAR('The wave crashed over everything!', ['THE WAVE', 'CRASHED OVER', 'EVERYTHING!']),
        8: COCO('Ooh-ooh! My tower is gone!', ['OOH-OOH!', 'MY TOWER', 'IS GONE!']),
        9: BO("Let's build one together!", ["LET'S BUILD", 'ONE', 'TOGETHER!']),
        10: NAR('They stacked sand, bucket by bucket!', ['THEY STACKED', 'SAND, BUCKET', 'BY BUCKET!']),
        11: NAR('And one giant castle stood tall!', ['AND ONE GIANT', 'CASTLE', 'STOOD TALL!']),
    }),
    54: ("The Message in a Bottle", {}, {
        1: NAR('A shiny bottle floated up onto the beach!', ['A SHINY BOTTLE', 'FLOATED UP', 'ONTO THE BEACH!']),
        2: BOO('I found something strange. Boo.', ['I FOUND', 'SOMETHING', 'STRANGE. BOO.']),
        3: BO('There is a letter inside the bottle!', ['THERE IS', 'A LETTER', 'INSIDE THE BOTTLE!']),
        4: ZAP('Beep boop! Scanning the letter!', ['BEEP BOOP!', 'SCANNING', 'THE LETTER!']),
        5: NAR("It came from Waddles' family!", ['IT CAME FROM', "WADDLES'", 'FAMILY!']),
        6: WADD('My family is coming to visit!', ['MY FAMILY', 'IS COMING', 'TO VISIT!']),
        7: BO("Let's get ready for a party!", ["LET'S GET", 'READY FOR', 'A PARTY!']),
        8: NAR('They built a big welcome sign!', ['THEY BUILT', 'A BIG WELCOME', 'SIGN!']),
        9: COCO("Ooh-ooh! I'll make coconut juice!", ['OOH-OOH!', "I'LL MAKE", 'COCONUT JUICE!']),
        10: NAR('Then something big floated closer and closer!', ['THEN SOMETHING', 'BIG FLOATED', 'CLOSER AND CLOSER!']),
        11: NAR('And it was a giant iceberg!', ['AND IT WAS', 'A GIANT', 'ICEBERG!']),
    }),
    55: ("The Penguin Family", {}, {
        1: NAR('The iceberg slid up to shore!', ['THE ICEBERG', 'SLID UP', 'TO SHORE!']),
        2: WADD('Mom and Dad, you came!', ['MOM AND DAD,', 'YOU', 'CAME!']),
        3: MOM('We missed you, little one!', ['WE MISSED YOU,', 'LITTLE', 'ONE!']),
        4: DAD('Thank you for being his friends!', ['THANK YOU', 'FOR BEING', 'HIS FRIENDS!']),
        5: BO('Welcome to Pancake Beach!', ['WELCOME TO', 'PANCAKE', 'BEACH!']),
        6: NAR('Waddles introduced all his best friends!', ['WADDLES', 'INTRODUCED ALL', 'HIS BEST FRIENDS!']),
        7: MOCHI('Hmph. Penguins are cool. Obviously.', ['HMPH. PENGUINS', 'ARE COOL.', 'OBVIOUSLY.']),
        8: NAR('The penguins slid down the sandy dunes!', ['THE PENGUINS', 'SLID DOWN THE', 'SANDY DUNES!']),
        9: EVERY('Happy beach day, everybody!', ['HAPPY', 'BEACH DAY,', 'EVERYBODY!']),
        10: NAR('And the golden sun set on the sea!', ['AND THE', 'GOLDEN SUN SET', 'ON THE SEA!']),
        11: NAR('And that was the end of Season eleven!', ['AND THAT WAS', 'THE END OF', 'SEASON ELEVEN!']),
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
