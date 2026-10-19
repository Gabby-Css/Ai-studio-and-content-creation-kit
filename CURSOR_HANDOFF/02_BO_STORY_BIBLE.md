# 02 — BO AND THE PANCAKE · STORY BIBLE (canon through episode 35)

Source of truth for story, cast and continuity. Facts here were read from the project files (`hyperframes/toonN/tts.py`, `mk_s6_setup.py`, `mk_s7_setup.py`, `mk_template_s6.py`), the delivered covers, and the project memory notes. Full voice lines of every episode: `09_APPENDIX_ALL_VOICE_LINES.md`.

---

## 1. Premise and tone

**Bo** is a curious, slightly greedy little **fox** whose kitchen keeps filling up with new friends. In episode 1 he nearly eats the last pancake; the pancake (**Flapjack**) runs away, whispers "please don't!", and becomes his best friend. Almost every episode ends with a knock, a squeak, a light or a rumble — the next friend or problem arrives, and the next episode starts exactly there.

- **Audience:** toddlers to early primary; parents co-watch. Vocabulary ≈ age 5. No scary content, no real danger, no villains — every "monster" is just hungry. Problems end with **sharing food**.
- **Humour:** catchphrase gags (see §4), slapstick that never hurts (slip, bounce, sticky), tiny deadpan cat.
- **Heart:** friendship, sharing, "everybody wins", never being alone ("He had never had friends before").
- **Always a cliff-hanger** on line 9–11 ("But then…"), and an **end card** sticker asking the viewer to guess/comment or announcing the next season.

## 2. Format (fixed — do not change)

| Item | Value |
|---|---|
| Length | **30.0 s** exactly (`data-duration="30"`) |
| Picture | **1080×1920 (9:16)**, 30 fps, MP4 H.264 + AAC |
| Voice | **11 lines per episode** (≈ 4–7 words each; episodes ran 48–74 words, typically 50–62; aim ≈ 56), spoken by Kokoro; line 11 must END before ≈ 26.6 s so the end card has room |
| Captions | burned in, word-timed, ALL CAPS, 2–3 short chunks per line, Baloo 2 ExtraBold, white with thick dark-brown (`#2b1a14`) stroke; speaker tag above for non-narrator lines; captions sit at top (y≈215) or lower (y≈1470) so faces stay free |
| End card | yellow sticker `#FFE14D` (2 big lines) + green pill `#2EBE85` (call to action), last ≈ 2.5 s |
| Loudness | **≈ -14.2 LUFS**, peak limited to 0.84 (QA script sets it) |
| Delivery | `Desktop\Content Creation\Videos\NN_Bo_and_the_Pancake_N_Title_With_Underscores.mp4` + `NN_Bo_and_the_Pancake_N_COVER.png` (cover = one full frame, no text) |

**The 11-line formula** (what every episode from ep6 on does; ep1 = 6 long narrator lines, ep2 = 9 lines, ep5 = 10 lines — see the appendix):
1. NARRATOR hook / recap of the previous cliff-hanger.
2–8. Alternating character lines and narrator beats; every featured character gets ≥ 1 line and ≥ 1 catchphrase if natural.
9. The turn (a plan works / a surprise).
10. The payoff or the joke.
11. The cliff-hanger or "that was the end of Season N!"

## 3. Look

- **Style:** flat 2-D vector cartoon, thick **dark-brown outline `#2b1a14`**, big glossy eyes (white sclera, black pupils, highlights), pink blush cheeks, soft gradients, warm high-key colours. Characters are rigs of SVG groups (head, body, arms, ears, tail, brows, mouth shapes `mOp/mFr/mBg/mSm`, eye modes `wide/lids/happy/O`).
- **Kitchen set (S1–S3, S4 end, S5 start):** peach polka-dot wall `#FFE6BE`, mint tile band, cream/beige checkerboard floor, window with teal curtains (Rocky peeks in, Barnaby knocks), wall clock, jar shelf, **mouse hole** (Nibbles), **fridge on the right** (monsters, Jiggle, the Gloop King pop out of it), table, ceiling lamp.
- **Other sets built so far:** spaceship interior and cockpit window, Planet Gloop (jelly, teal `gJelly`), Planet Zorp (gray → colourful, purple sky, ringed planet, giant mushrooms), the festival hall (bunting, stage, scoreboard), sunny sky for the balloon chase, grassy hills + campfire + night (S6), race track with scrolling layers, syrup river, dark cliff tunnel, finish gantry + dusk fireworks (S7).
- **Camera:** a single `#cam` div over a 2600×2200 SVG world, moved by `camTo/camOn/camE`; 1080×1920 viewport. Shake, vignette, flash overlays exist.

## 4. Cast (29 designed characters + story extras)

Full list also in `Desktop\Content Creation\00_CAST_LIST.txt`; art in `Content Creation\Characters\NN_Name\` (4 expressions each, PNG + SVG) and `00_ALL_CHARACTERS.png`. **Only the characters marked ★ have working animation rigs in the episodes.** All others are art only.

| # | Character | Look (from the cast sheet / covers) | Personality | Catchphrase | Rig |
|---|---|---|---|---|---|
| 01 | **Bo the Fox** (hero) | orange fox, cream belly & cheeks, **green dotted scarf**, bushy tail | curious, a bit greedy, always up to something, brave when friends need him | **"Just one tiny bite!"** | ★ `bo` (offset pivot!) |
| 02 | **Flapjack the Pancake** | thick golden pancake, butter pat on top, syrup drip, big eyes, tiny white feet, stick arms; often rides on Bo's head | cheeky runaway, dramatic, secretly sweet | **"Catch me if you can!"** | ★ |
| 03 | **Mochi the Cat** | gray tabby, stripes, long whiskers, tiny gold bell collar, white belly | lazy, sarcastic, secretly the smartest | **"Hmph. … Obviously."** (she adds "Obviously." to any observation) | ★ `mc` |
| 04 | Biscuit the Dog | golden pup, blue polka-dot bandana | endlessly happy, clumsy | "Best day EVER!" | art only |
| 05 | Clover the Bunny | white bunny, long pink-lined ears, pink bow | sweet, easily scared, brave when it counts | "Eeek! …okay, I am ready!" | art only |
| 06 | **Barnaby the Bear** | brown bear, red bow tie | big, gentle, loves honey | **"Is it snack time yet?"** | ★ (S1 only) |
| 07 | Pixel the Panda | panda with blue headphones | chill gamer, secretly competitive | "One more round." | art only |
| 08 | Waddles the Penguin | penguin, red bobble hat | clumsy, cheerful | "Whoa— I am okay!" | art only |
| 09 | Ribbit the Frog | green frog, tiny gold crown | hyper, dramatic prince of the pond | "Behold, the great Ribbit!" | art only |
| 10 | Hootie the Owl | brown owl, graduation cap, round glasses | the professor | "Actually… let me explain." | art only |
| 11 | **Truffle the Pig** | pink pig, **white chef's hat**, apron | foodie chef, tastes everything first | **"Needs a pinch more love!"** (also "…more disco/sprinkles") | ★ `tf` |
| 12 | Leo the Lion | golden lion, mane, crown | proud, secretly soft | "Bow to the king! …please?" | art only |
| 13 | **Coco the Monkey** | brown monkey, tan face, tail with a banana tip | prankster, snack thief | **"Ooh-ooh, bananas!"** | ★ `cm` |
| 14 | **Peanut the Elephant** | blue-gray baby elephant, **striped party hat**, big pink ears | gentle giant, never forgets a birthday | **"I remember everything!"** | ★ `pt` |
| 15 | Tora the Tiger | tiger cub, red headband | sporty, hates losing | "Race you there!" | art only |
| 16 | Kiki the Koala | gray koala with a leaf | sleepy, hugger | "Five more minutes…" | art only |
| 17 | **Rocky the Raccoon** | gray raccoon, black mask/cap, ringed tail | sneaky snack thief with a heart of gold; always plans (it fails) | **"Nobody saw anything."** | ★ `rk` |
| 18 | Quackers the Duck | yellow duck, blue bow tie | loud, joker | "Quack! Did you hear that?" | art only |
| 19 | Pip the Chick | yellow chick, half eggshell "helmet" | tiny, fearless | "I am NOT small!" | art only |
| 20 | **Nibbles the Mouse** | small gray mouse, pink ears & feet, carries cheese | tiny, quick, cheese-obsessed, lives in the **mouse hole** | **"Squeak! Cheese?"** | ★ `nm` |
| 21 | Hugo the Hippo | lavender hippo, yellow bow tie | bouncy, apologises | "Oops! Sorry, sorry!" | art only |
| 22 | **Zap the Robot** | silver-blue boxy robot, dark screen face with a smile, red-tipped antenna, chest panel with a heart | super-smart sidekick; takes jokes literally; **robot-filtered voice** | **"Beep boop! Processing fun!"** (also "Beep boop! …" + status) | ★ `zp` |
| 23 | **Blip the Alien** | green alien, two yellow-ball antennae, spots; has a tiny saucer | curious visitor, misunderstands everything | **"Is this… a sandwich?"** | ★ `bp`? (verify id) |
| 24 | Dex the Dino | green baby T-rex, orange spikes | tiny arms, huge dreams | "Rawr! …hi." | art only |
| 25 | **Boo the Ghost** | white ghost, pink bow | shy, floaty, scared by everyone; makes things glow | **"B-boo?"** (S6+: "I… I'll help. Boo.") | ★ `gh` |
| 26 | **Gumdrop the Monster** | big blue-purple one-eyed (cast sheet) fuzzy monster, two small horn-ears, spots | looks scary, acts sweet; huge appetite | **"Roar! …did that work?"** (also "Roar! …I mean, hello!") | ★ `gm` |
| 27 | Avo the Avocado | avocado with a brown-pit face | calm, "just chilling" | "It is all good, my friend." | art only |
| 28 | Dumpling the Bao | steamed bun in a basket | soft, cheerful | "Fresh and steamy!" | art only |
| 29 | Berry the Strawberry | strawberry, leafy top | sweet, dramatic blusher | "Aww, stop it, you!" | art only |

**Story extras (created inside the episodes, not in the 29):**

| Character | Look | Role |
|---|---|---|
| **Jiggle** (S3) → **the four Jiggles** | small round jelly creatures with two antennae (pink, yellow, blue, orange), cute freckles; very sticky | a Gloopian stowaway in Bo's scarf (ep13) who gets a name (ep14); a hiccup makes him split into four (ep14); they squish back together (ep15); they love games, play with the Golden Spatula (ep22) |
| **The Gloop King** ("King") | big round yellow face with orange freckle dots and pink blush (see the ep16 cover; check `toon16/index.html` for crown/arms before drawing him again), deep slow voice | ruler of Planet Gloop; keeps visitors "forever" for pancakes (ep12); comes through the **fridge** for Jiggle (ep16); agrees to **pancakes every Sunday**; hosts the festival (S5) and the race (S7) |
| **Gloopians / "The Great Round One"** | tiny jelly people | crown Flapjack "king of the jelly" (ep12) |
| **Commander of Zorp & the Zorpians** | colourful (after being fed) antenna creatures, gray when sad | ep17–20 |
| **Munch** | **giant gray round monster**, lighter-gray belly with a **pink heart**, pink blush, small horn-ears, buck teeth, enormous deep voice; *only loves gray things* | ep19 first seen; waves from far away (ep25); leaves an egg + note (ep26); returns (ep30); shares the Golden Pan (ep35) |
| **Pebble** (baby Munch) | small **pink**, sparkly baby with a heart on the belly; turns pink on his first pancake; squeaky voice; glows pink in the dark (ep34) | hatched ep28, named ep29, goes home with Papa ep30, **visits** for the race (ep31–35) |

## 5. Voices (Kokoro, local) — keep exactly

Defined as helper lambdas in `hyperframes/mk_s6_setup.py` / `mk_s7_setup.py`: `(voice, speed, text, caption_chunks, speaker_tag, pitch_factor, extra_filter)`.

| Character | Kokoro voice | speed | pitch ×| filter |
|---|---|---|---|---|
| Narrator (also "Everybody" in chorus) | `af_heart` | 1.0 | 1 | — |
| Bo | `am_puck` | 1.05 | 1 | — |
| Mochi | `bf_emma` | 0.90 | 1 | — |
| Zap | `am_michael` | 1.0 | 0.9 | `ROBOT` |
| Coco | `am_echo` | 1.08 | 1.18 | — |
| Truffle | `bm_george` | 0.92 | 1 | — |
| Blip | `af_sky` | 1.0 | 1.35 | — |
| Gumdrop | `am_onyx` | 0.88 | 0.9 | — |
| Boo | `af_sky` (S1 eps 7/8/10 used `af_nicole`) | 0.95 | 1 | — |
| Peanut | `af_bella` | 0.95 | 1.08 | — |
| Jiggles | `af_sky` | 1.0 | 1.7 | — |
| Pebble / Baby | `af_bella` | 1.0 | 1.75 | — |
| Munch | `am_onyx` | 0.80 | 0.72 | `HUGE` |
| The King | `am_onyx` | 0.85 | 0.80 | — |
| Everybody (group shout) | `am_puck` | 1.10 | 1.10 | — |
| Rocky | `am_adam` | 0.92 | 1 | — |
| Flapjack | `af_nova` | 1.10 | 1 | — |
| Barnaby | `am_onyx` | 0.95 | 1 | — |
| Nibbles | `af_bella` | 1.05 | 1.22 | — |
| Commander (Zorp) | `am_liam` | — | — | — |
| Zorpians / Gloopians | `af_nova` / `af_sky` | — | — | — |

Kokoro garbles interjections and made-up words ("Aww!", "Boh-boh"). Write lines in **plain words**; ep28 had to be re-voiced for this ("Bo! Bo!", "Look! He knows my name!").

## 6. Running gags & motifs (use them; they are the brand)
- Bo's **"Just one tiny bite!"** — a wish, a request, a final joke ("…for everybody!").
- Mochi's **"Hmph. <observation>. Obviously."** — usually the correct deduction that solves the problem.
- Truffle's **"Needs a pinch more love!"** — adapts to the event ("more disco", "more sprinkles").
- Rocky's **"Nobody saw anything."** — he always was seen; in ep20 he finally admits "Okay, I saw something. Pass the pancakes!". He stows away (ep17).
- Flapjack's **"Catch me if you can!"** — flips/escapes; he is also a prize/guest of honour.
- Zap's **"Beep boop!"** + a status/number ("Thirty-seven degrees. Perfect!").
- Coco's banana pranks; Gumdrop's accidental roar; Boo's shy "B-boo?" → brave "I'll help."
- **Fridge door** = portal for surprises (Gumdrop ep6, King ep16). **Knock/squeak/light/rumble** = next-episode trigger.
- **Sunday pancakes with the King** (from ep16) and the **giant shared pancake / tower** as the universal solution.
- Everybody wins — contests end in ties or "everybody wins the Golden Spatula/golden pan".

## 7. Episode guide (canon)

Format: **#. Title** — beats · cliff-hanger · end card (when known). Seasons are marked on the end cards.

### Season 1 — "Kitchen Chaos" (ep1–10; ep10 end card: Season 2 coming soon)
1. **Bo and the Pancake** — Would you eat the last pancake? Bo only wants one tiny bite; it jumps off the plate and runs through the kitchen, into the fridge; Bo opens wide — "please don't!" — so he eats cereal. *(Folder `toon`, assets `script.txt`.)*
2. **Knock, Knock!** — Flapjack is Bo's new best friend (cereal for Bo, a syrup bath for Flapjack). Rocky snatches him and runs, but he was only hungry — Bo shares cereal. → *knock, knock!* (Barnaby).
3. **Honey Trouble** — Barnaby brings honey, tosses the jar into Flapjack's bath; the sweet smell calls the **bees**; chaos; Rocky tosses the jar outside. → *squeak?* (Nibbles).
4. **Cheese Please** — Nibbles wants cheese but Mochi naps on the big cheese. "Operation Cheese is a go!"; Mochi chases Flapjack round and round while Nibbles tiptoes in; cheese for everyone. → *sniff, sniff…* (Truffle).
5. **Pizza Party** — Truffle squeezes through the window and cooks a giant pizza ("Not yet! Needs a pinch more love!"), everyone gets a slice. → something swings by (Coco).
6. **Monkey Business** — Coco takes the pizza onto the fridge ("Finders keepers!"); Mochi's **banana-peel trap** makes him slip. → the fridge creaks open (Gumdrop).
7. **Gumdrop's Secret** — a huge monster steps out — "Wait! I'm only hungry!" Mochi: "He's a softie. Obviously." Truffle cooks him a giant feast; he never had friends before. → lights out, "B-boo?"
8. **Boo's Glow Party** — the ghost is scared too; Boo makes the room glow; everybody dances (Truffle: "Needs a pinch more disco!"). → a strange light outside (Blip).
9. **Blip and Zap** — Blip's tiny saucer lands ("Is this… a sandwich?"), chases Flapjack; **Zap** joins ("Beep boop! Processing fun!"); Mochi: "Don't lose your head." / "Head not found."; Blip's scanner: it is somebody's **birthday** — Bo's! → Peanut ("I remember everything!").
10. **Bo's Big Birthday** — Peanut brings a giant pancake cake; Boo lights the candles; Bo's wish = "just one tiny bite!"; Flapjack: "Those are my cousins!" so they share the cake. *End card:* **SEASON 2 COMING SOON**.

### Season 2 — "Planet Gloop" (ep11–13; ep13 end card: See you in Season 3)
11. **Blast Off** — Blip's spaceship is bigger on the inside; Zap: seatbelts; Mochi "I'm not scared. Obviously."; Gumdrop "Are we there yet?"; past the moon and stars. → a giant jelly planet: "Welcome to Planet Gloop!"
12. **Planet Gloop** — everything is jelly (Bo bounces); the tiny Gloopians crown Flapjack "the Great Round One"; Truffle: "Pancakes for everybody!" → the ground wobbles; the **Gloop King**: "Pancakes? Then you must stay forever!"
13. **Home Sweet Kitchen** — Truffle's plan: the biggest pancake in the universe, everybody cooks it; the King lets them go. Home. → a Gloopian stowed away in Bo's scarf: "Pancake, please?" *End card:* **SEE YOU IN SEASON 3**.

### Season 3 — "Jiggle" (ep14–16; ep16 end card: Season 4 coming soon)
14. **Jiggle Moves In** — the stowaway is named **Jiggle**; bounces to the ceiling; very sticky; Rocky sneaks in; hiccup → pop! **four** Jiggles.
15. **Four Jiggles** — "I'm Jiggle! No, I'm Jiggle!"; Zap: "Each one is twenty-five percent Jiggle!"; Bo's pancake test makes all four jump and squish back into one. → *knock, knock* from the **fridge**.
16. **The King's Visit** — out of the fridge pops the Gloop King for Jiggle; "The palace is so quiet"; Truffle: **pancakes every Sunday**; "Deal!"; big hug. "And that was only the beginning!" *End card:* **SEASON 4 COMING SOON**.

### Season 4 — "The Message from Space" (ep17–20; built 2026-10-09/10; finals in `hyperframes/season4_final/`)
17. **The Message from Space** — Zap/Blip get a hologram call: Planet **Zorp** has run out of pancakes ("Help!" — the Commander). Truffle flips "Fifty pancakes!" (an 18-layer pancake tower); everyone boards. → **Rocky** is hiding in the pancakes (stowaway).
18. **The Gray Planet** — Rocky grins from the tower; Zorp is **gray and sad**; one tiny bite for every Zorpian ("Yum yum yum!") brings **colour back to the planet**. → the ground shakes (giant silhouette).
19. **The Gray Muncher** — a giant gray monster stomps over the hill: **Munch** ("Who took my gray?"); everyone hides behind Gumdrop; Truffle's **extra-crispy burnt pancake** = "Crunchy gray! My favorite!"; Bo: "He's not scary. He's just hungry!" → his **rainbow burp** lights the way home.
20. **Rainbow Road Home** — a rainbow from Zorp to Earth; the saucer slides down it ("Wheeee!"); the King: "It's Sunday! Pancakes for everybody!"; Rocky: "Okay, I saw something." *End card:* **SEASON 5 COMING SOON**.

### Season 5 — "The Great Pancake Festival" (ep21–25; v2 re-staged and delivered 2026-10-11)
21. **The Great Pancake Festival** — the King opens the games; free samples; Zap rolls out the **Golden Spatula** (prize for best flipper). → **blackout**; the spatula is gone.
22. **The Missing Spatula** — "Find it, or no more pancakes ever!"; detective **Mochi** takes the case; sticky footprints → **the Jiggles** only wanted to play; **Peanut** tied balloons to it → it floats away.
23. **The Balloon Chase** — Zap's rocket boots, **Gumdrop launches Bo**, Boo helps; balloons pop → the spatula lands in Bo's hands.
24. **The Great Flip-Off** — Truffle's pancake hits the ceiling, Mochi's spins like a spaceship, Bo flips Flapjack ("Wheee!"); everyone gets a perfect ten.
25. **Festival Finale** — nobody can pick one winner: **everybody wins** the Golden Spatula; one giant pancake, **fireworks**, Munch waves from far away; "Happy Pancake Festival!" *End card:* **SEASON 6 COMING SOON! / THANKS FOR WATCHING!**

### Season 6 — "The Mystery Egg" (ep26–30; delivered 2026-10-12)
26. **The Big Gray Egg** *(end card: WHAT'S INSIDE? / GUESS IN THE COMMENTS!)* — a giant egg + a note: "Please keep my egg warm. Love, Munch." → tap, tap, tap inside.
27. **Keep It Warm** *(IS IT HATCHING? / GUESS IN THE COMMENTS!)* — Truffle toasts it, Zap measures 37 °, Gumdrop cuddles; it **rolls down the hill**; Bo and Boo catch it.
28. **Crack** *(NAME THE BABY! / TELL US IN THE COMMENTS!)* — night, glowing egg, "Crack, crack, CRACK!" — a **baby Munch**: "Bo! Bo!"; first pancake → turns **pink and sparkly**.
29. **Pebble's Big Day** *(WHO IS COMING? / GUESS IN THE COMMENTS!)* — they name him **Pebble**; hide-and-seek; he falls asleep in the pancake pile; → the ground shakes.
30. **Happy Hatching Day** *(end card: SEASON 7 COMING SOON! / THANKS FOR WATCHING!)* — **Munch** is back ("Papa! Papa!"); goodbye hug; party, "Happy hatching day!"

### Season 7 — "The Great Pancake Race" (ep31–35; BUILT 2026-10-13, **not yet rendered/delivered**)
31. **The Great Pancake Race** *(WHO WILL WIN? / GUESS IN THE COMMENTS!)* — the King announces the race; winner gets the **golden pan**; Zap gives everyone a kart (Bo's is orange; Mochi: "Mine is faster."; Truffle's runs on pancakes); Pebble rides with Bo; "Three, two, one… go!"
32. **The Syrup River** *(WHO IS IN FRONT? / GUESS IN THE COMMENTS!)* — tracking shot; Truffle spills syrup → everybody slides and spins; Zap's rocket boost jumps it; Coco gets stuck; Bo and Pebble push him out.
33. **Flat Tire** *(WHAT IS IN THE TUNNEL? / GUESS IN THE COMMENTS!)* — Mochi leads, her wheel **pops**; Bo stops to help; Pebble rolls a **pancake wheel**; Zap fixes it; "Now they all raced together!"
34. **The Dark Tunnel** *(ALMOST THERE! / WHO WINS? TELL US!)* — dark cliff tunnel; Coco and Truffle scared; **Pebble sparkles pink**; Boo scouts; burst into sunshine; "Hooray for Pebble!"
35. **Photo Finish** *(end card: SEASON 8 COMING SOON! / THANKS FOR WATCHING!)* — slow-motion, slanted finish line, all five karts cross together; the King: "A tie! Everybody wins!"; **Munch** brings the golden pan and makes giant pancakes; giant pancake tower; dusk fireworks. **Last frame = start state of Season 8**: dusk lawn, fireworks, whole gang, finish gantry, Munch + Pebble, the golden pan, a tall pancake tower.

## 8. Continuity wrinkles (decide once, then stay consistent)
1. **Blip's home planet.** Eps 11–13 make **Planet Gloop** Blip's home ("Welcome to Planet Gloop!"; cast sheet: "Alien from Planet Gloop") but the Gloop King is the *ruler* there; ep17 line 3 says the **Zorp** call is "from my home planet". Suggested fix for new scripts: never state Blip's home again, or say Blip is from Gloop and *visited* Zorp friends.
2. **Boo's voice** changed (`af_nicole` in the Season-1 episodes → `af_sky` in the Season-5+ files that were checked). Keep `af_sky` going forward.
3. **Pebble lives with Munch** (ep30 goodbye) but is back in ep31–35 as a **visiting** guest. Mention "Pebble's visiting for the day / weekend" when he reappears.
4. **Munch** loves *gray* things (ep19) and lives "far away" (ep25 wave). He is gentle despite size.
5. **The "King"** is called "the Gloop King" in S2/S3 and just "King" afterwards. Same character.
6. **Barnaby, Rocky, Nibbles** have been quiet since S1/S4; Rocky reappears with the stowaway gag, Nibbles mostly stays in his mouse hole as set decoration.
7. Episode 1's folder is `hyperframes/toon` (no number); its storyboard predates later conventions — never copy from it.

## 9. Unused cast = guest pool (each needs a NEW RIG; budget ≈ 1–3 h each)
Biscuit (dog), Clover (bunny), Pixel (panda), Waddles (penguin), Ribbit (frog), Hootie (owl), Leo (lion), Tora (tiger — born for a race), Kiki (koala), Quackers (duck), Pip (chick), Hugo (hippo), Dex (dino), Avo, Dumpling, Berry. Use **at most one new guest rig per episode**; otherwise reuse ★ rigs and re-tint (`tintGum`).
