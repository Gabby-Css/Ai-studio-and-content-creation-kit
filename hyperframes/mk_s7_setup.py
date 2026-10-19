"""Season 7 ("The Great Pancake Race", ep31-35) setup:  python mk_s7_setup.py        -> toon31..toon35 folders + tts.py from the LINES below
                                                      python mk_s6_setup.py plan N  -> plan.json (same planner as season 6)"""
import os, re, shutil
import mk_s6_setup as S6
from mk_s6_setup import NAR, BO, MOCHI, ZAP, COCO, TRUF, BLIP, GUM, BOO, PEAN, JIG, BABY, MUNCH, EVERY
ROOT = S6.ROOT
KING = lambda text, ch: ("'am_onyx'", 0.85, text, ch, 'KING', 0.8, None)
PEB = lambda text, ch: BABY(text, ch, 'PEBBLE')

EPS = {
    31: ("The Great Pancake Race", {}, {
        1: NAR('The King announced the Great Pancake Race!', ['THE KING ANNOUNCED', 'THE GREAT PANCAKE', 'RACE!']),
        2: KING('The winner gets the golden pan!', ['THE WINNER', 'GETS THE', 'GOLDEN PAN!']),
        3: ZAP('Beep boop! Everybody gets a kart!', ['BEEP BOOP!', 'EVERYBODY', 'GETS A KART!']),
        4: BO('Wow! Mine is orange!', ['WOW! MINE', 'IS ORANGE!']),
        5: MOCHI('Hmph. Mine is faster. Obviously.', ['HMPH. MINE', 'IS FASTER.', 'OBVIOUSLY.']),
        6: TRUF('Mine runs on pancakes!', ['MINE RUNS', 'ON PANCAKES!']),
        7: NAR('Little Pebble wanted to race, too!', ['LITTLE PEBBLE', 'WANTED TO', 'RACE, TOO!']),
        8: PEB('Me too! Me too!', ['ME TOO!', 'ME TOO!']),
        9: NAR('So Bo made room for him.', ['SO BO MADE', 'ROOM FOR', 'HIM.']),
        10: ZAP('Three, two, one... go!', ['THREE, TWO,', 'ONE... GO!']),
        11: NAR('And they zoomed away!', ['AND THEY', 'ZOOMED', 'AWAY!']),
    }),
    32: ("The Syrup River", {}, {
        1: NAR('The racers zoomed down the hill!', ['THE RACERS', 'ZOOMED DOWN', 'THE HILL!']),
        2: BO('Wheee! Faster, faster!', ['WHEEE!', 'FASTER,', 'FASTER!']),
        3: MOCHI('Hmph. Out of my way. Obviously.', ['HMPH. OUT', 'OF MY WAY.', 'OBVIOUSLY.']),
        4: NAR('But a river of syrup blocked the road!', ['BUT A RIVER', 'OF SYRUP BLOCKED', 'THE ROAD!']),
        5: TRUF('Oops! I spilled my syrup!', ['OOPS! I', 'SPILLED MY', 'SYRUP!']),
        6: NAR('Everybody slid and spun around!', ['EVERYBODY', 'SLID AND SPUN', 'AROUND!']),
        7: ZAP('Beep boop! Rocket boost!', ['BEEP BOOP!', 'ROCKET', 'BOOST!']),
        8: NAR('Zap blasted right over it!', ['ZAP BLASTED', 'RIGHT OVER', 'IT!']),
        9: COCO('Ooh-ooh! I am stuck!', ['OOH-OOH!', 'I AM', 'STUCK!']),
        10: BO("Hold on! We'll push you!", ['HOLD ON!', "WE'LL PUSH", 'YOU!']),
        11: NAR('Bo and Pebble pushed Coco out!', ['BO AND PEBBLE', 'PUSHED COCO', 'OUT!']),
    }),
    33: ("Flat Tire", {}, {
        1: NAR('Mochi was winning the race!', ['MOCHI WAS', 'WINNING THE', 'RACE!']),
        2: MOCHI('Nobody can catch me. Obviously.', ['NOBODY CAN', 'CATCH ME.', 'OBVIOUSLY.']),
        3: NAR('Then her wheel went pop!', ['THEN HER', 'WHEEL WENT', 'POP!']),
        4: MOCHI('Meow! My wheel!', ['MEOW!', 'MY WHEEL!']),
        5: BO('Stop! Mochi needs help!', ['STOP! MOCHI', 'NEEDS HELP!']),
        6: NAR('Bo skidded to a stop.', ['BO SKIDDED', 'TO A STOP.']),
        7: TRUF('Use a pancake wheel!', ['USE A', 'PANCAKE', 'WHEEL!']),
        8: NAR('Pebble rolled a pancake over!', ['PEBBLE ROLLED', 'A PANCAKE', 'OVER!']),
        9: ZAP('Beep boop! Wheel fixed!', ['BEEP BOOP!', 'WHEEL', 'FIXED!']),
        10: MOCHI('Hmph. Thank you. Obviously.', ['HMPH. THANK', 'YOU.', 'OBVIOUSLY.']),
        11: NAR('Now they all raced together!', ['NOW THEY ALL', 'RACED', 'TOGETHER!']),
    }),
    34: ("The Dark Tunnel", {}, {
        1: NAR('The road went into a dark tunnel!', ['THE ROAD WENT', 'INTO A DARK', 'TUNNEL!']),
        2: COCO('Ooh-ooh! I cannot see!', ['OOH-OOH!', 'I CANNOT', 'SEE!']),
        3: TRUF('I want to go home!', ['I WANT TO', 'GO HOME!']),
        4: NAR('Then Pebble began to sparkle!', ['THEN PEBBLE', 'BEGAN TO', 'SPARKLE!']),
        5: PEB('Sparkle! Sparkle!', ['SPARKLE!', 'SPARKLE!']),
        6: NAR('His pink light showed the way!', ['HIS PINK LIGHT', 'SHOWED THE', 'WAY!']),
        7: BOO("I'll float ahead. Boo.", ["I'LL FLOAT", 'AHEAD. BOO.']),
        8: NAR('Boo found the way out!', ['BOO FOUND', 'THE WAY', 'OUT!']),
        9: ZAP('Beep boop! Exit ahead!', ['BEEP BOOP!', 'EXIT', 'AHEAD!']),
        10: EVERY('Hooray for Pebble!', ['HOORAY FOR', 'PEBBLE!']),
        11: NAR('They burst out into the sunshine!', ['THEY BURST', 'OUT INTO THE', 'SUNSHINE!']),
    }),
    35: ("Photo Finish", {}, {
        1: NAR('The finish line was just ahead!', ['THE FINISH LINE', 'WAS JUST', 'AHEAD!']),
        2: MOCHI('Hmph. I will win. Obviously.', ['HMPH. I WILL', 'WIN.', 'OBVIOUSLY.']),
        3: BO('No, I will win!', ['NO, I WILL', 'WIN!']),
        4: ZAP('Beep boop! Maximum speed!', ['BEEP BOOP!', 'MAXIMUM', 'SPEED!']),
        5: NAR('Closer and closer they zoomed!', ['CLOSER AND', 'CLOSER THEY', 'ZOOMED!']),
        6: NAR('And they crossed together!', ['AND THEY', 'CROSSED', 'TOGETHER!']),
        7: KING('A tie! Everybody wins!', ['A TIE!', 'EVERYBODY', 'WINS!']),
        8: MUNCH('Share the golden pan!', ['SHARE THE', 'GOLDEN PAN!']),
        9: NAR('Munch made giant pancakes in it!', ['MUNCH MADE', 'GIANT PANCAKES', 'IN IT!']),
        10: EVERY('Yummy pancakes!', ['YUMMY', 'PANCAKES!']),
        11: NAR('And that was the end of Season seven!', ['AND THAT WAS', 'THE END OF', 'SEASON SEVEN!']),
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
