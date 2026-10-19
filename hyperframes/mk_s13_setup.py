"""Season 13 ("The Spooky Pancake Night", ep61-65, Halloween) setup:  python mk_s13_setup.py [N...] -> toon61..toon65 folders + tts.py from the LINES below
   python mk_s6_setup.py plan N  -> plan.json (line start times from the real voice durations)
Script rules learned from seasons 5-12 (see 10_SEASON8_9_AND_LESSONS.md): 11 lines, 4-7 words each, total <= ~57 words so line 11 ends <= 25.8 s,
a real word next to every interjection, no stand-alone onomatopoeia, the pitched-up baby only says plain words (no sibilant shouts), 'creaked'/'wow'/'aww' are garbled by the ASR."""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
MAMA = lambda text, ch: ("'af_nova'", 0.95, text, ch, 'MAMA', 1.22, None)       # Boo's ghost mother (not a rig: the preflight ignores unknown tags)
PAPA = lambda text, ch: ("'bm_lewis'", 0.93, text, ch, 'PAPA', 0.88, None)       # Boo's ghost father

EPS = {
    61: ("The Pumpkin Patch", {}, {
        1: NAR('One spooky night, the moon rose!', ['ONE SPOOKY NIGHT,', 'THE MOON', 'ROSE!']),
        2: BO('Look! A giant pumpkin patch!', ['LOOK! A', 'GIANT PUMPKIN', 'PATCH!']),
        3: TRUF('I will carve funny faces!', ['I WILL', 'CARVE FUNNY', 'FACES!']),
        4: ZAP('Beep boop! Laser carving, ready!', ['BEEP BOOP!', 'LASER CARVING,', 'READY!']),
        5: NAR('The laser carved a perfect smile!', ['THE LASER', 'CARVED A', 'PERFECT SMILE!']),
        6: MOCHI('Hmph. Mine is scarier. Obviously.', ['HMPH. MINE', 'IS SCARIER.', 'OBVIOUSLY.']),
        7: COCO('Ooh-ooh! Mine looks like me!', ['OOH-OOH!', 'MINE LOOKS', 'LIKE ME!']),
        8: NAR('Candles glowed inside every pumpkin!', ['CANDLES GLOWED', 'INSIDE EVERY', 'PUMPKIN!']),
        9: GUM('Roar! Mine is the biggest!', ['ROAR! MINE', 'IS THE', 'BIGGEST!']),
        10: NAR('Then a voice whispered, Boo!', ['THEN A', 'VOICE WHISPERED,', 'BOO!']),
        11: NAR('But nobody could see who!', ['BUT NOBODY', 'COULD', 'SEE WHO!']),
    }),
    62: ("Boo's Big Scare", {}, {
        1: NAR('Boo wanted to scare his friends!', ['BOO WANTED', 'TO SCARE', 'HIS FRIENDS!']),
        2: BOO('I will be scary. Boo!', ['I WILL', 'BE SCARY.', 'BOO!']),
        3: NAR('He jumped out of nowhere!', ['HE JUMPED', 'OUT OF', 'NOWHERE!']),
        4: BO('You look so cute, Boo!', ['YOU LOOK', 'SO CUTE,', 'BOO!']),
        5: BOO('But I wanted to be scary!', ['BUT I', 'WANTED TO', 'BE SCARY!']),
        6: MOCHI('Hmph. Ghosts are cute. Obviously.', ['HMPH. GHOSTS', 'ARE CUTE.', 'OBVIOUSLY.']),
        7: NAR('Boo floated away, feeling sad.', ['BOO FLOATED', 'AWAY, FEELING', 'SAD.']),
        8: BO('Wait, Boo! Come back, please!', ['WAIT, BOO!', 'COME BACK,', 'PLEASE!']),
        9: BO('I know a haunted house!', ['I KNOW A', 'HAUNTED', 'HOUSE!']),
        10: NAR('Real ghosts live on the hill!', ['REAL GHOSTS', 'LIVE ON', 'THE HILL!']),
        11: NAR('So off they went, together!', ['SO OFF', 'THEY WENT,', 'TOGETHER!']),
    }),
    63: ("The Haunted House", {}, {
        1: NAR('They climbed the dark hill!', ['THEY CLIMBED', 'THE DARK', 'HILL!']),
        2: PEAN('Look! The house is glowing!', ['LOOK! THE', 'HOUSE IS', 'GLOWING!']),
        3: NAR('The gate opened with a squeak!', ['THE GATE', 'OPENED WITH', 'A SQUEAK!']),
        4: ZAP('Beep boop! Spooky level: high!', ['BEEP BOOP!', 'SPOOKY LEVEL:', 'HIGH!']),
        5: NAR('Bats flew from the chimney!', ['BATS FLEW', 'FROM THE', 'CHIMNEY!']),
        6: COCO('Ooh-ooh! Hold my hand, please!', ['OOH-OOH!', 'HOLD MY', 'HAND, PLEASE!']),
        7: NAR('The big door opened slowly.', ['THE BIG', 'DOOR OPENED', 'SLOWLY.']),
        8: BLIP('It is so dark inside!', ['IT IS', 'SO DARK', 'INSIDE!']),
        9: BOO('Do not worry. I will glow!', ['DO NOT WORRY.', 'I WILL', 'GLOW!']),
        10: NAR('Boo lit up the hall!', ['BOO LIT', 'UP THE', 'HALL!']),
        11: NAR('And something big moved ahead!', ['AND SOMETHING', 'BIG MOVED', 'AHEAD!']),
    }),
    64: ("The Giant Shadow", {}, {
        1: NAR('A huge shadow filled the wall!', ['A HUGE', 'SHADOW FILLED', 'THE WALL!']),
        2: TRUF('Is it a giant monster?', ['IS IT', 'A GIANT', 'MONSTER?']),
        3: GUM('Roar! I am not scared!', ['ROAR! I', 'AM NOT', 'SCARED!']),
        4: NAR('The shadow grew bigger and bigger!', ['THE SHADOW', 'GREW BIGGER', 'AND BIGGER!']),
        5: MOCHI('Hmph. I am not scared. Obviously.', ['HMPH. I AM', 'NOT SCARED.', 'OBVIOUSLY.']),
        6: BOO('I will go and look!', ['I WILL', 'GO AND', 'LOOK!']),
        7: NAR('Brave Boo floated toward the shadow!', ['BRAVE BOO', 'FLOATED TOWARD', 'THE SHADOW!']),
        8: BOO('It is only little Pebble!', ['IT IS', 'ONLY LITTLE', 'PEBBLE!']),
        9: BABY('I have a candle!', ['I HAVE', 'A', 'CANDLE!']),
        10: NAR('Her tiny candle made a giant shadow!', ['HER TINY', 'CANDLE MADE A', 'GIANT SHADOW!']),
        11: NAR('Everybody laughed, and Boo smiled!', ['EVERYBODY', 'LAUGHED, AND', 'BOO SMILED!']),
    }),
    65: ("The Ghost Party", {}, {
        1: NAR('Suddenly, the lights switched on!', ['SUDDENLY, THE', 'LIGHTS', 'SWITCHED ON!']),
        2: BOO('Mama! Papa! You are here!', ['MAMA! PAPA!', 'YOU ARE', 'HERE!']),
        3: MAMA('Welcome, Boo, and welcome friends!', ['WELCOME, BOO,', 'AND WELCOME', 'FRIENDS!']),
        4: PAPA("Happy Halloween! Let's party!", ['HAPPY', 'HALLOWEEN!', "LET'S PARTY!"]),
        5: NAR('Candy rained down from the ceiling!', ['CANDY RAINED', 'DOWN FROM', 'THE CEILING!']),
        6: BO('Trick or treat! Who wants candy?', ['TRICK OR TREAT!', 'WHO WANTS', 'CANDY?']),
        7: MOCHI('Hmph. Candy is acceptable. Obviously.', ['HMPH. CANDY', 'IS ACCEPTABLE.', 'OBVIOUSLY.']),
        8: NAR('The ghosts danced with everybody!', ['THE GHOSTS', 'DANCED WITH', 'EVERYBODY!']),
        9: BOO('Being a ghost is great!', ['BEING A', 'GHOST IS', 'GREAT!']),
        10: EVERY('Happy Halloween, everybody!', ['HAPPY', 'HALLOWEEN,', 'EVERYBODY!']),
        11: NAR('And that was the end of Season thirteen!', ['AND THAT WAS', 'THE END OF', 'SEASON THIRTEEN!']),
    }),
}


def setup(only=None):
    base = open(os.path.join(ROOT, "toon25", "tts.py"), encoding="utf-8").read()
    for n, (title, synth, lines) in EPS.items():
        if only and n not in only:
            continue
        d = os.path.join(ROOT, f"toon{n}")
        for sub in ("assets/fonts", "vendor", "build"):
            os.makedirs(os.path.join(d, *sub.split("/")), exist_ok=True)
        for rel in ("vendor/gsap.min.js", "assets/fonts/baloo-2-latin-800-normal.woff2", "build.cjs"):
            shutil.copy(os.path.join(ROOT, "toon25", *rel.split("/")), os.path.join(d, *rel.split("/")))
        s = re.sub(r"LINES = \{.*?\n\}\n", lambda m: S6.lines_block(lines) + "\n", base, count=1, flags=re.S)
        s = s.replace("'Bo and the Pancake 25: Festival Finale'", f"'Bo and the Pancake {n}: {title}'")
        s = re.sub(r"SYNTH = \{\}", "SYNTH = " + repr(synth), s, count=1)
        open(os.path.join(d, "tts.py"), "w", encoding="utf-8", newline="\n").write(s)
        print("toon", n, "tts.py written;", len(lines), "lines,", sum(len(v[2].split()) for v in lines.values()), "words")


if __name__ == "__main__":
    import sys
    setup([int(a) for a in sys.argv[1:]] or None)
