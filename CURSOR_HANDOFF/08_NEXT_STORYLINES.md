# 08 — NEXT STORYLINES (proposals — NOT canon until the user approves and it is rendered)

Everything below is a **draft for the user to approve, cut or rewrite**. Canon lives in `02_BO_STORY_BIBLE.md` / `05_KIDDOVERSE_BIBLE.md`.

**Length budget for Bo scripts (measured from ep31–35):** 11 lines, **≈ 4–7 words per line, ≈ 50–62 words in total (aim ≈ 56; eps 3–35 ran 48–74)** → line 11 ends at ≈ 24–25.5 s (the planner warns beyond 26.6 s). Kokoro speaks ≈ 2.5–3 words/s; every line adds 0.36 s of gap; the first line starts at 0.6 s.

---

# PART A — BO AND THE PANCAKE

## A1. SEASON 8 — "The Treasure of Pancake Island" (ep36–40) — full draft

**Why this season:** (1) The S7 finale left us with the **Golden Pan** and Munch/Pebble/King all present; a pan that reveals a map when heated is a natural, kid-clear mystery. (2) A **treasure hunt** reuses the engine's strengths (tracking shots from S7, close-ups, depth rows, the night/glow helpers) and every ★ rig, needs only **one new character** (Grandma Flapjack = Flapjack rig + shawl + glasses) and a handful of new sets/props. (3) It pays off running gags: Rocky's stowaway, Peanut's memory, Mochi's deductions, Flapjack as "the answer to the riddle", Boo's courage, Truffle's pan. (4) The ending sets up **Season 9: Flapjack's Family Reunion**.

**Cast for the trip:** Bo, Flapjack (on Bo's head), Mochi, Truffle, Zap, Coco, Gumdrop, Boo, Blip, Peanut, baby Pebble (visiting for the week), Rocky (stowaway, revealed ep37). Jiggles stay home as the "sail" (ep37). Munch/King = cameos (waving off in 36; optional).
**New voice lambdas to add** in `mk_s8_setup.py`: `ROCKY = lambda t,c: ("'am_adam'", 0.92, t, c, 'ROCKY', 1.0, None)`, `FLAP = lambda t,c: ("'af_nova'", 1.10, t, c, 'FLAPJACK', 1.0, None)`, `NIB = lambda t,c: ("'af_bella'", 1.05, t, c, 'NIBBLES', 1.22, None)`, and **Grandma** (proposal): `GRAN = lambda t,c: ("'bf_isabella'", 0.85, t, c, 'GRANDMA', 0.9, None)` — audition the voice before approving.
**Start state:** last frame of ep35 (dusk lawn, fireworks, finish gantry, all gang, Munch + Pebble, golden pan, pancake tower). Ep36 jumps to **"The next morning"** in the kitchen (set exists) — so `_init36.js` mostly resets to the kitchen start layout of the S5/S6 openers; copy how `toon26/_init26.js` handled "The next morning, a giant egg appeared!".

### Ep36 — "The Map in the Pan"   (cover: Truffle holding the glowing pan, a red X on it; end card **WHERE IS THE X?** / **GUESS IN THE COMMENTS!**)
Logline: Munch drops the Golden Pan at the kitchen door (Pebble asleep inside for a sleepover). Truffle heats it; a **treasure map** appears. The island is far — Truffle and Zap build a **pancake boat**.
| # | Speaker | Line | Beat / staging |
|---|---|---|---|
| 1 | NAR | Munch left the Golden Pan outside! | wide kitchen door; giant gray hand/silhouette (Munch) waving away in the window; pan on the floor |
| 2 | TRUF | Wow! Let's cook in it! | Truffle close-up, pan on the griddle (`griddleMount`) |
| 3 | NAR | Sizzle, sizzle... and a map appeared! | steam, glow; the map burns into the pan (SVG path draw-on, X in red) |
| 4 | ZAP | Beep boop! X marks the spot! | Zap scans; map hologram overlay |
| 5 | MOCHI | Hmph. Treasure map. Obviously. | Mochi deadpan close-up |
| 6 | BO | Treasure! Let's go find it! | Bo jumps; Flapjack on head |
| 7 | PEB | Me too! Me too! | Pebble pops out of the pan, sleepy, sparkles |
| 8 | NAR | But the island was far away! | camera pulls out to the window: sea outside (new backdrop) |
| 9 | TRUF | Then we need a pancake boat! | Truffle flips a giant pancake like a raft |
| 10 | ZAP | Beep boop! Building the boat! | quick-build montage: spatula oars, syrup-bottle mast, Peanut waves from the dock |
| 11 | NAR | By sunset, the boat was ready! | wide dusk shot, boat full of friends, sail up (Jiggles) |

New: map overlay prop, sea backdrop, pancake boat (**keep a clean boat rig for ep37**), window-sea transition.

### Ep37 — "Rough Seas"   (end card **WHAT IS ON THE ISLAND?** / **GUESS IN THE COMMENTS!**)
Logline: The pancake boat sails; wind steals the map, Blip's antenna catches it; Boo is scared of the waves; a sneeze from the snack crate reveals **Rocky** the stowaway. "Land ahoy!"
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | The pancake boat sailed out to sea! | tracking shot over gentle waves (reuse S7 scroll layers: `scrollProfile` for waves/clouds) |
| 2 | BO | Wheee! I love the waves! | Bo bounces at the bow |
| 3 | GUM | Roar! I'll row! | Gumdrop rows with a giant spatula |
| 4 | NAR | Then the wind blew the map away! | the map flutters off the boat (simple flutter tween, no new rig) |
| 5 | BLIP | Whoa! My antenna caught it! | Blip's antenna snags the map; close-up |
| 6 | BOO | Waves! I'm scared. Boo. | Boo hides behind Bo |
| 7 | BO | Hold my hand, Boo! | brave hand-hold, Boo glows softly |
| 8 | NAR | Then somebody sneezed in the snacks! | camera to the snack crate; "ah-choo" pop |
| 9 | ROCKY | Nobody saw anything. | Rocky pops up with a pancake in each hand |
| 10 | BO | Rocky! You stowed away again! | group laugh (callback to ep17/ep20) |
| 11 | NAR | And then... land ahoy! | Coco in the crow's nest points; island silhouette shaped like a pancake |

New: Rocky already has a rig; sea set; waves; Blip's antenna snag; island silhouette.

### Ep38 — "The Riddle Gate"   (end card **CAN YOU SOLVE IT?** / **ANSWER IN THE COMMENTS!**)
Logline: A stone gate asks a riddle whose answer is… Flapjack. Mochi solves it; the jungle is full of pancake trees; Nibbles — who secretly rode along in Bo's scarf (show a one-frame cameo of his tail in ep37) — finds a secret path that ends at a canyon.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | A giant gate blocked the jungle! | beach → jungle edge, huge stone gate with a carved face |
| 2 | NAR | It said: Round, golden, and flipped! | riddle text appears on the gate as a chip; **comment-bait: pause the camera on the gate 1 s** |
| 3 | COCO | Ooh-ooh! A banana? | wrong guess; banana gag |
| 4 | TRUF | Needs a pinch more thinking! | Truffle taps his chef hat |
| 5 | MOCHI | Hmph. It's a pancake. Obviously. | Mochi solves it; everyone looks at Flapjack |
| 6 | FLAP | Wait... that's me! | Flapjack blushes |
| 7 | NAR | The gate rumbled and swung open! | gate opens, light rays, dust, shake |
| 8 | BO | Pancake trees! Just one tiny bite! | jungle of pancake-stack trees |
| 9 | NIB | Squeak! Cheese? | Nibbles pops out of Bo's scarf |
| 10 | NAR | Nibbles found a secret path! | Nibbles scurries ahead, group follows (tracking shot) |
| 11 | NAR | But the path ended at a canyon! | wide shot: canyon, far side with a red X flag |

New: stone gate (prop with face + riddle chip), jungle set, pancake trees. Nibbles' rig exists (`nm`) but he is a **tiny** character in the mouse-hole role so far — check his scale/pose set in `toon3`/`toon4` before relying on close-ups.

### Ep39 — "The Wobbly Bridge"   (end card **WHAT IS IN THE CHEST?** / **GUESS IN THE COMMENTS!**)
Logline: Teamwork across a wobbly bridge (Gumdrop holds it), syrup smudges the map, **Peanut remembers everything** and leads them to the X; the chest is locked.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | A wobbly bridge crossed the canyon! | side-on canyon shot (reuse S7 side-on tunnel framing logic) |
| 2 | ZAP | Beep boop! Two at a time! | Zap counts; sign "2 MAX" |
| 3 | GUM | Roar! I'll hold the bridge! | Gumdrop braces, muscles, wobble |
| 4 | NAR | Step by step, they crossed. | pairs cross, bridge sways (never fall) |
| 5 | BOO | I'll float across. Boo. | Boo floats over, gives a tiny thumbs-up |
| 6 | NAR | Syrup splashed on the map! | Coco swings past and flicks Truffle's syrup bottle; the map gets a brown smudge |
| 7 | BO | Oh no! We can't read it! | Bo's big worried eyes |
| 8 | PEAN | I remember the map! Go left! | Peanut's memory bubble re-draws the map |
| 9 | NAR | Peanut led them to the big X! | tracking shot, dune/palm, huge red X on sand |
| 10 | TRUF | A treasure chest! Let's open it! | chest rises from the sand |
| 11 | NAR | But the chest was locked tight! | lock shaped like a pan handle; **cliff-hanger** |

New: bridge prop, canyon set, syrup-smudged map overlay, chest + pan-handle lock.

### Ep40 — "The Real Treasure"   (end card **SEASON 9 COMING SOON!** / **THANKS FOR WATCHING!**)
Logline: The lock is pan-handle-shaped: the Golden Pan is the key. Inside the chest sleeps **Grandma Flapjack** (+ an old recipe book). The real treasure = family; shared pancakes; Season 9 hook.
| # | Speaker | Line | Beat |
|---|---|---|---|
| 1 | NAR | The lock looked like a pan handle! | close-up on the lock, then on the pan in Truffle's hands |
| 2 | BO | Truffle, the Golden Pan! | Bo points |
| 3 | TRUF | Here you go! One golden key! | Truffle inserts the pan handle |
| 4 | NAR | Click! The chest creaked open. | light beam, dust, sparkles (soft, no strobe) |
| 5 | NAR | Inside, a tiny pancake was napping! | Grandma Flapjack asleep (shawl, glasses) |
| 6 | FLAP | Grandma? Is that you? | Flapjack's big eyes, heart |
| 7 | GRAN | Who woke me? Is it Sunday? | Grandma stretches |
| 8 | MOCHI | Hmph. The treasure is family. Obviously. | Mochi's rare soft smile |
| 9 | TRUF | Pancakes for everybody! | Truffle + Grandma's recipe book |
| 10 | EVERY | Happy pancake treasure day! | group cheer, confetti |
| 11 | NAR | And that was the end of Season eight! | dusk beach, fireworks, end card |

New: Grandma Flapjack (rig variant), recipe book prop. **Decision for the user:** is Grandma a new voice (needs approval of the voice audition) or should the treasure be something else (e.g. "a never-ending jar of sprinkles")?

### Alternate Season-8 pitches (pick one instead if the treasure hunt isn't it)
1. **"Camp Pancake"** — the gang camps by the lake (campfire + night helpers exist from S6): ep36 Pitching the Tents (Gumdrop's tent), ep37 The Campfire Song (Boo's glow-in-the-dark "ghost story" that is actually a joke), ep38 The Midnight Snack (Rocky + Coco raid), ep39 The Lost Marshmallow (Mochi's detective mode, callback to S5), ep40 The Shooting Star (Blip/Zap build a wish rocket; Munch's giant wave from far). New guest: **Kiki the Koala** (sleepy camper).
2. **"Pancake School"** — Truffle opens a cooking school with **Hootie the Owl** as professor (riddles, quizzes), lessons about sharing, flipping, measuring (Zap), "first day jitters" (Boo). Great for parent-friendly learning beats. New guest: Hootie.
3. **"The Moon Pancake"** — Blip and Zap's rocket to the moon (callback to ep11); gravity gags (Bo bounces, Gumdrop floats), moon-craters = pancakes, Munch's gray moon snack, a tiny moon baby; new guest: **Dex the Dino** as moon-rock enthusiast. Reuses the spaceship interior + night/glow work.

## A2. Season 9 & 10 pitches (one-liners — develop only after S8)
- **S9 "Flapjack's Family Reunion"** (direct sequel): Grandma Flapjack's picnic, 3 pancake cousins (the cousins from ep10's cake!), a lost recipe, a family-photo finale; end card S10.
- **S10 "The Great Snow Day"**: the syrup freezes → icicle waffles; Waddles the Penguin guest (new rig), sledding with kart helpers, Pebble's first snow, Mochi hates cold; Munch makes a snow-gray castle.
- **S11 "The Pancake Olympics"**: Tora (tiger) + Hugo (hippo) + Quackers guests; reuses race tooling and the "everybody wins" arc.
- **Standalone specials (30–60 s):** "Bo's Bedtime" lullaby; "Rocky's Snack Diary"; "Mochi's Obviously Compilation" (all her lines).

## A3. Cheap content that needs NO new animation (use the existing art and episodes)
- **29 × 5 s "Meet the character" Shorts** from the `*_CARD.png` posters + catchphrase voice (Kokoro line + a pop).
- **"Guess the next friend" teasers:** the last 2 s of an episode + a "WHO IS KNOCKING?" chip.
- **Season recaps** (20 s per season) cut from existing finals with a Kokoro narrator.
- **Catchphrase compilations:** "Hmph. … Obviously." (Mochi), "Just one tiny bite!" (Bo), "Nobody saw anything." (Rocky).
- **Covers/thumbnails:** one full frame, no text (already the delivery convention); add a text-free square crop for Instagram.

## A4. Guest-character plan (each = new rig = extra cost)
| Priority | Character | Where | Why |
|---|---|---|---|
| 1 | Hootie the Owl | S8-alt "Pancake School", riddles in ep38 | riddle/quiz voice, parent appeal |
| 2 | Tora the Tiger | S11 Olympics / any race rematch | already "Race you there!" |
| 3 | Kiki the Koala | Camp Pancake | sleepy gag |
| 4 | Waddles the Penguin | S10 snow | slipping gags |
| 5 | Biscuit the Dog / Clover the Bunny | any ensemble | cute, big audience appeal |
Rig effort: reuse `tintGum`-style re-tint of an existing body when the silhouette is similar; otherwise a new SVG rig with `svgOrigin:'0 0'`.

---

# PART B — KIDDOVERSE EPISODE BRIEFS (Learn series)

All briefs follow the Learn template (`05_KIDDOVERSE_BIBLE.md` §7.2, playbook §2). Default structure ≈ 5–6 min: intro 9 s → theme 18 s → story/hook 18 s → **N teaching stops of ≈ 27 s** → recap 18 s → brain break 16 s → game 3 × 9 s → theme ×2 (key up) 36 s → outro 13 s. Lyric rule: 5–8 syllables per line, key word on the longest note, 3 objects per item, an echo and a question with a pause.

## B0. Finish LEARN #2 "The Color Train" — see playbook §6.

## B1. LEARN #3 "The Shape Workshop" (Gizmo leads; world: Robot Workshop; Zoom is the delivery truck)
- **Learning goal:** recognise and name 8 shapes. **Items:** circle, square, triangle, rectangle, oval, star, heart, diamond.
- **Story hook (replaces "the rainbow's gray"):** "Oh no! Gizmo's shape machine got mixed up! The shapes are all jumbled!" → the crew sorts them on a conveyor belt, stop by stop.
- **Per-stop objects (3 each):** circle — wheel, clock, cookie · square — window, box, cracker · triangle — roof, pizza slice, sail · rectangle — door, book, flag · oval — egg, mirror, leaf · star — sea star, night-sky star, gold-star sticker · heart — balloon, card, cookie · diamond — kite, gem, road sign.
- **Stop verse template (same tune each time):** "Beep boop, shape stop! Here's *circle*! Circle, circle, round and round! Wheels are round, clocks are round, cookies are round. What shape is it? *Circle!*" (colour/shape word = longest note.)
- **Finale:** "Build a house" — roof triangle + square walls + rectangle door + circle window + star on the chimney, assembled shape by shape on the sung words; Rumble stomps the "finish" thump.
- **Game (3 rounds):** "Where is the triangle?", "Which one is a heart?", "Find the circle!" (silhouette choices, countdown pause 3.75 s).
- **Brain break:** "Shape yoga" — make a circle with your arms, a triangle with your hands, a star with your whole body, FREEZE.
- **Tune:** keep 108 BPM and the Color Train structure so the same engine/storyboard generator can be reused; shift key per shape like colour stops (+2/+4).
- **Titles:** "Learn Shapes for Toddlers | The Shape Workshop | Songs for Kids | KiddoVerse".

## B2. LEARN #4 "Animals & Their Sounds" (world: Animal Parade / Farm Meadow + Ocean Deep; Rumble's roar is the bonus)
- **Items:** cow *moo*, dog *woof*, cat *meow*, duck *quack*, pig *oink*, sheep *baa*, horse *neigh*, lion *roar*.
- **Hook:** "Zoom's horn is broken! Which animal makes the BEEP? Let's ask the animals!" Each animal gives its sound; the game asks "Who says moo?"
- **Audio risk:** animal sounds must be **synthesised** in `sfx.py` (new SFX functions) or sung/chanted by Kokoro ("moo" as a vowel note); never use recordings with unknown licence.
- **Art risk:** 8 new animal props (flat vector, 3 poses each) → budget the art; reuse Dino Valley/Rainbow Hills worlds.

## B3. LEARN #5 "Gizmo's Counting Machine" — numbers 11–20, then counting by 2s, 5s, 10s
- **Structure:** Gizmo's machine eats objects and shows the number on his chest display; each 11–20 stop adds ten frames (rows of 5) so kids see "ten and some more"; "count by 2s" = socks in pairs, "by 5s" = fingers on a hand, "by 10s" = ten-frame trains.
- **Game:** "Which number comes after 14?" / "How many stars?"

## B4. LEARN #6 "Three-Letter Words" (cat, dog, sun, hat, pig, bus, cup, red, big, run)
- **Method:** "sound it out": c-a-t → cat, letters slide together (as in the two-letter words), picture + action; chanted by Kokoro (not sung).
- **Recap line:** "We can read cat, dog, sun…!" Game: "Which word says *sun*?"

## B5. LEARN #7 "Days, Months & Seasons — Zoom's Calendar Trip"
7 days (one stop each), then 12 months in four season groups; weather props with Nimbus.

## B6. LEARN #8 "Feelings & Manners with Nimbus" (please, thank you, sorry, hello, sharing)
Feelings are weather: happy (gold), sad (blue), scared (lilac), angry (red rain-cloud, safe), calm breathing; manners as little scenes with Bloop making mistakes and apologising.

## B7. LEARN #9 "My Body & Five Senses" · LEARN #10 "Opposites" (big/small, up/down, hot/cold, fast/slow, happy/sad, open/closed) · LEARN #11 "Daily Routines" (wash hands, brush teeth, bedtime — original lyrics only).

## B8. Shorts from every Learn episode (the "one song, twelve assets" rule)
Hook 20 s (theme chorus), the best 30–60 s teaching stop, the game round as a 20 s quiz, the brain break 16 s, and a "Where's Bloop?" hidden-character 15 s teaser. Post pace suggestion: 1 Learn + 2–4 Shorts per week (untested).

## B9. Lyric-writing template (for the agent to fill)
```
SECTION  <kind>  bars=<n>   key=<C/D/F>   BPM=<108|120>
LINE  "<text 5-8 syllables>"   notes: <melody contour>   key word: <word> (longest note)
OBJECTS on the beat:  word -> object (e.g. "apples" -> 3 apples pop in, one per eighth-note)
ECHO:  "<word>!"  (kids' choir)
QUESTION: "What <thing> is it?"  [pause 1 bar]  ANSWER: "<word>!"
```
