# 05 — KIDDOVERSE · BRAND & CONTENT BIBLE

Sources: `hyperframes/kiddoverse/deliver/KiddoVerse_Brand_Bible.html` (v1.0, Oct 2026), `KiddoVerse_Upload_Kit.md`, `hyperframes/learn1/deliver/*` (script, description, recommendations, final report), `hyperframes/learn2/{data/song.json, audio/song.py, build/color_story.js, build/template.html}`, and the project memory notes. Anything not verified in a file is marked *(unverified)*.

---

## 1. What KiddoVerse is

A **kids' sing-along & learning brand** ("The kiddo version") for **toddlers and preschoolers (ages ≈ 2–6)**. A crew of seven friends rides **the Zoomie** (a rocket-bus) to a new **Pocket World** in every song, learns one thing and feels one thing. It is separate from *Bo and the Pancake* (different style, different pipeline, different audience, 16:9 not 9:16) but shares the same HyperFrames/GSAP/Kokoro tool chain and the same PC.

Products so far:
| Video | Length | Status |
|---|---|---|
| **KIDDOVERSE_01 "Zoom, Zoom, Kiddoverse!"** — original music video (+ 3 Shorts: Zoom-Zoom hook, Count with Rumble, Kiddo Wiggle) | 3:16 | delivered → `Desktop\KiddoVerse\` |
| **LEARN #1 "Count, ABC & Read with KiddoVerse"** | 5:54 (354 s) | first delivery 2026-10-10; **polished v2 delivered 2026-10-12 03:37** → `Desktop\KiddoVerse_Learn1\` (1080p 490 MB, 720p 111 MB, SRT, chapters, YouTube description, thumbnails, 2 Shorts: ABC 20 s, counting 60 s). All automatic checks PASS, -13.9 LUFS, TP -0.6 dBTP |
| **LEARN #2 "The Color Train"** — colours red→purple | 302 s | **IN PROGRESS** (`hyperframes/learn2/`) — see §8 |

`Desktop\KiddoVerse_ALL_VIDEOS\index.html` = playable gallery of everything (39 videos incl. all Bo episodes), rebuilt with `node hyperframes/learn1/deliver/build_gallery.cjs`.

## 2. Brand promise & personality
- **Promise:** "Every song is a trip — and everyone is welcome aboard."
- **Personality:** Bright · Kind · Curious. Voice: warm, playful, never sarcastic, never scary; short sentences; sing-along-able; a grown-up should enjoy the 20th replay.
- **Global, not local:** placeless pocket galaxy, mixed-heritage crew; cultures appear as *guest worlds* (ideas: "Jollof Jamboree", "Lantern Lane", "Samba Sky", "Taco Twirl", "Bhangra Bazaar") done respectfully with a native-speaker consultant and credit.
- **Content pillars:** Zoomie Songs (3-min music videos) · Feelings with Nimbus (1–2 min) · Gizmo's Lab (numbers, shapes, tiny science) · Kiddo Wiggle (15–40 s dance challenges) · Pocket Stories (5–8 min) · Moon Library (sleepy lullabies, 10-min loops) · **Learn episodes** (5–6 min, one curriculum theme each; the series the user is building now).
- **Always:** original music/characters/words · one clear learning idea per song · a move kids can copy (clap/stomp/wiggle) · kind endings, every character gets a moment. **Never:** imitate another brand's characters/logo/melody/catch-phrases · scary, violent or mean-spirited humour · fast strobing or screaming audio · real children's faces/voices without consent.

## 3. The crew (7 recurring characters)

| Character | Type | Looks (use these words in any image prompt) | Job in an episode | Catchphrase | Signature sound |
|---|---|---|---|---|---|
| **Kiko** | 6-year-old human explorer | warm-brown skin, spiky black hair with a golden star clip, orange star hoodie, teal shorts, white sneakers | the leader; starts every trip; says the 3-2-1 | "Adventure o'clock!" · "All aboard the Zoomie!" | bright marimba run C-E-G-C ("ba-dum!") |
| **Luma** | 6-year-old human singer | light-olive skin, deep-purple hair in two big buns with gold star clips, mint dress with a yellow music-note badge, yellow boots | the heart and voice; leads songs; stage fright | "Sing it with me!" | celesta twinkle + soft "ooh" |
| **Bloop** | jelly alien ("3 galaxy-years") | teal-mint translucent jelly body, big eyes, pink cheeks, antenna with a glowing orb that changes colour with mood (pink = happy) | comic relief; speaks only in "bloops" | "Bloop bloop!" | bubble-pop synth glide |
| **Rumble** | baby triceratops, age 4 | lime-green, cream belly, orange-pink spotted frill, three tiny horns | the strong soft friend; counts eggs; stomp-dances; his tail knocks things over | "Stomp stomp, hooray!" | comic sousaphone "oom-pah" + stomp |
| **Gizmo** | pocket robot ("built last Tuesday") | round silver-blue head, dark visor with LED face, orange ear-dials, chest display showing a number (5), small treads | the brain: counts, sorts, shapes; "recharge nap" when excited | "Calculating… FUN!" | chiptune arpeggio + blip |
| **Nimbus** | cloud-lamb weather spirit, age 5 | fluffy white cloud body, pink ears, rosy cheeks, glow gold (happy) / blue (sad) / lilac (nervous) | feelings guide ("feelings are weather — they pass"); leaks rain when sad | "It's okay to feel!" | soft flute + pad + wind chime |
| **Zoom "the Zoomie"** | rocket-bus with a face | chunky violet-and-yellow bus, rocket fins, flame thruster, round headlight eyes, smile bumper | home base & ride; dad-jokes, safety first; runs on "rainbow fuel made of kindness" | "Beep beep, all aboard!" | engine rumble + "doo-doo" horn |

Kiko starts it, Luma sings it, Bloop breaks it, Rumble carries it, Gizmo explains it, Nimbus feels it, Zoom takes everyone there. **Give every character one job per episode.** Mascot of the logo: **Orbie** (a smiling purple planet with a star).
Spare names if a trademark check fails (not cleared): bus → Whoosh / Rocket Roo / Vroomie; robot → Cogsy / Tinker-Bot / Bleep.

## 4. Visual identity
- **Palette:** Violet `#6C4CF1` (primary) · Night/outline `#2B1B5E` · Coral `#FF5E7E` · Sun `#FFC93C` · Mint `#2EC4B6` · Sky `#4CC9F0` · Orange `#FF8A3D` · Magenta `#C65BFF`. Stage background of the Learn pages `#1F1650`.
- **Rules:** every character has a bold dark-indigo outline (6–8 px at 1080p); backgrounds are soft, outline-free paintings so the cast pops; high-key, saturated, never muddy; colour-blind-friendly lessons (shape + colour pairs).
- **Fonts (SIL OFL):** **Fredoka** (logo, titles, captions) and **Baloo 2 ExtraBold** (small labels/taglines). **Known bug:** Fredoka 700/600 draw a malformed capital **B**; fixed globally by an extra `@font-face` with `unicode-range:U+0042` pointing to Baloo 2 800 in `build/template.html` AND `build/make_thumbs.cjs`. Keep it in any new template.
- **Captions (burned in):** 70 px, white, 15 px indigo stroke (`-webkit-text-stroke` + `paint-order:stroke fill`), bottom-centre; the sung word turns **sunshine yellow**, echo/response lines **pink**; karaoke style. Logo top-centre; nothing important in the outer 6 %.
- **Motion rules:** characters hop on every beat (squash → stretch → land); nobody stands perfectly still; cut every 2–3 s on average; camera always drifting (slow push-in); a "punch" pulse on chorus downbeats; every teaching word appears on screen **at the exact sung beat**. Flashes = single soft white pops ≤ 0.3 s. Thumbnails: one big face + one big word (≤ 3 words), 3 colours.

## 5. Sonic identity
- **Sonic logo:** three rising notes **E–G–C** ("Kid-do-verse!") on glockenspiel + marimba, then a sparkle. Opens every video, is the chorus hook, closes every video.
- **Songs:** Learn #1 = 120 BPM C major (final choruses D major); Learn #2 = 108 BPM, 4/4, C major with colour stops climbing in key (+2, +4 semitones) and a big finale in F; Zoom Zoom = 120 BPM C major, key-up finale in D.
- **Instruments:** ukulele, marimba, glockenspiel, claps, tuba bass; original arrangement played with the GeneralUser GS SoundFont (licence permits commercial use); the logo jingle is original.
- **Voices:** theme songs, counting songs and the ABC song are **sung** (SoulX-Singer, Apache-2.0, CPU, 4–10 min/line in Learn #1); the **alphabet lines, two-letter-word lines and the word recap are CHANTED** by Kokoro `af_heart` (IPA for the sounds) because the singer's consonants were unintelligible (ASR 53 %); spoken character lines are Kokoro. Learn #2 uses a newer **"singer v3"**: every lyric word first spoken by Kokoro, then a WORLD vocoder puts vowels on the melody (stems: lead `af_heart`, double `af_nicole`, harmony `af_sarah`, kids A/B/C `af_nova`/`af_river`/…). Lyrics use **American pronunciation** ("zee", "vase"); UK/Ghana viewers say "zed".
- **Loudness:** master ≈ -14 LUFS (Learn #1: -13.9 LUFS, TP -0.6 dBTP).

## 6. Pocket Worlds (backgrounds that exist as code in `kv_worlds.js`, `edu_worlds.js`, `color_worlds.js`)
Rainbow Hills (colours) · Dino Valley (counting, volcano, eggs) · Cloud Kingdom (feelings) · Robot Workshop (shapes, gears, conveyor) · Wiggle Stage (disco dance break) · plus the Learn worlds *Number Meadow, Alphabet Garden, Word Workshop, Game Galaxy* (Learn #1) and *hub, c_<colour> stops, disco, finale, space, numland, abc* (Learn #2 world keys). Unbuilt ideas: Ocean Deep (animals/sea words), Candy Kitchen (sharing, fractions), Moon Library (letters/sleep), Jungle Drumbeat (rhythm), Festival Street (rotating cultures).

## 7. Canon of the finished videos

### 7.1 "Zoom, Zoom, Kiddoverse!" (3:16, 120 BPM)
Intro (3-2-1 "Zoom!") → Chorus ("Zoom, zoom, Kiddoverse! Hop on board, let's go! … Round the stars and back again, everybody's welcome in!") → V1 Rainbow Hills (colours) → V2 Dino Valley (Rumble counts eggs 1–5) → V3 Cloud Kingdom (feelings, deep breath) → Dance break *The Kiddo Wiggle* ("Wiggle left, wiggle right! … FREEZE!") → V4 Robot Workshop (circle/square/triangle/star) → Bridge "Every one of us is a star!" → Final chorus (key up) → Outro "Bye bye, Kiddoverse!" 96 shots, karaoke captions. Chapters in `KiddoVerse_Upload_Kit.md`.

### 7.2 LEARN #1 "Count, ABC & Read with KiddoVerse" (354 s) — the template for every Learn episode
| Time | Section (`kind` in song.json) | Content |
|---|---|---|
| 0:00 | `intro` | logo jingle; Kiko "All aboard the Learning Express!" Luma "Ready?" All "Ready!" 3-2-1 **Zoom!** |
| 0:08 | `chorus` | **Theme song**: "Zoom, zoom, KiddoVerse! Learn with me today! Count and sing and say A B C, hooray! Numbers, letters, words to know, learning more each day! Zoom, zoom, KiddoVerse! Let's learn and play!" |
| 0:24 | `numintro`, `num` ×10, `numrev` | Number Meadow: each number = big numeral + word + items pop in one by one while the sung count rises ("one, one, little star… ten, ten, big balloons"); counting recap "one two … ten! hooray!" |
| 1:32 | `chorus` | theme song again |
| 1:48 | `abcintro`, `abc` ×7, `abcsong` | Alphabet Garden: each letter = **letter name → sound → picture word** ("A a apple! B buh ball! …"); then the ABC song lights up the whole alphabet (1:48–3:30) |
| 3:30 | `dance` | **Brain break** (clap/stomp/jump/spin/wiggle, "Freeze!") |
| 3:46 | `wordsintro`, `word` ×10, `wordrev` | Word Workshop: at, in, on, up, go, no, me, be, it, my — letters slide together, picture + action show meaning; recap "We can read!" |
| 4:38 | `gameintro`, `game` ×3 | Game Galaxy "Can you find it?" — question, quiet thinking pause with countdown, answer ("Where is number five? Yes! It's five!" / letter M / word *go*) |
| 5:06 | `fin`, `fin2` | theme song, key up; big finish |
| 5:38 | `outro` | "Bye bye, KiddoVerse! See you next time! Ask a grown-up to subscribe!" (no end-screens: made-for-kids) |

Known leftover minor visuals (v2): row-2 count bubbles overlap, music note over V/W tile ~199–203 s, "ME!" burst 10 px, game thinking pause 3.75 s. Recommendations doc: `learn1/deliver/KiddoVerse_Learn1_Recommendations.md`.

### 7.3 LEARN #2 "The Color Train" (302.2 s, 108 BPM) — from `learn2/data/song.json`
| `i` | kind | t0–t1 (s) | Lyrics / content |
|---|---|---|---|
| 0 | intro | 0–8.9 | logo; Kiko "All aboard the Color Train!" Luma "Ready?" All "Ready!" 3-2-1 "Go!" |
| 1 | chorus | 8.9–26.7 | "Toot toot! Here comes the train! Rainbow colors, big and bright! Red and blue and yellow too! Let's find the colors with me!" (train arrives, rainbow lights band by band, three colour orbs) |
| 2 | story | 26.7–44.4 | "Oh no! The rainbow's gray! Where did the colors go? Let's ride the train and find them! All aboard! Toot toot!" |
| 3–8 | stop ×6 | 44.4–204.4 (≈ 26.7 s each) | one stop per colour, **same tune, key climbs**: "Toot toot, stop stop! Here's red! red red red… apples are red, hearts are red, cherries are red. What color is it? Red!" Colours: **red `#FF3B4E` (apple, heart, cherry) · orange `#FF9F1C` (orange, carrot, fish) · yellow `#FFD60A` (sun, duck, star) · green `#2FCB5A` (tree, frog, leaf) · blue `#2F8BFF` (whale, balloon, blue ball) · purple `#9B5CFF` (grapes, flower, hat)**; the world turns from gray to that colour |
| 9 | rainbow | 204.4–222.2 | "Red, orange, yellow, green, blue, purple! A rainbow! Look at the rainbow! Hooray!" |
| 10–13 | gameintro, game ×3 | 222.2–253.3 | "Let's play a game! Find the color! Where is blue? Yes! It's blue!" (blue, green, orange) |
| 14 | fin | 253.3–271.1 | chorus again (key up) |
| 15 | fin2 | 271.1–288.9 | chorus; last line "Colors, colors, we love colors!" |
| 16 | outro | 288.9–302.2 | "Bye bye, Kiddo(verse)! See you next time! Ask a grown-up to subscribe!" |
Design rules in `song.py` (the "teacher's checklist"): every sung word is a real note ≥ 0.55 s (0.28 s only for tiny words); the **colour word is always the longest note**; one new idea per verse; same tune for every colour; three objects per colour; an echo ("Red!") and a question with a pause for the answer; lines 5–8 syllables; children's voices answer the lead (call-and-response).

## 8. Learn #2 — what exists / what is missing (checked 2026-10-13 15:10)
Exists: `data/song.json` (65 lines, 17 sections), `audio/song.py` (DSL), `audio/singer.py` (v3), `audio/sing_song.py`, stems `audio/stems/{lead,double,harm,kidsA,kidsB,kidsC}.wav` (all six files exist, full-song length ≈ 301.8 s at 24 kHz mono; their *content/quality* was not checked), 573 cached word tokens in `audio/tok/`, `audio/music_stem_cm.wav` + `master.wav` (same size → master is probably the music-only placeholder, **not** the final mix), `build/{color_story,color_props,color_objects,color_worlds}.js`, `index.html` (248 KB, built 14:44 today).
Missing / not done: `data/sfx.json` + `audio/sfx_stem.wav`, final mix (`mix3.py` run), QA of the sung stems (ASR/ESTOI), picture render (`renders/` empty), thumbnails, Shorts, `deliver/` (empty), YouTube text. There is **no `stages.py`/`run_all.py` in `learn2/audio`** — copy the learn1 versions and adapt `PIC`, `DURATION=302.2`, folder names (`learn1`→`learn2`), `DESK`, and the sung-vs-chanted handling. **A Claude session was editing these files today (14:08–14:44); check `ListAgents`/ask the user before touching.**

## 9. Publishing, policy and legal facts (not legal advice; facts as documented in the project)
1. **Name:** KIDDOVERSE is a **registered US trademark** (22LEARN, LLC, Reg. 5762831, downloadable game software, registered 28 May 2019) and at least two toddler-learning apps are called Kiddoverse (one kidSAFE-certified). It could not be confirmed the registration is still live. The name is baked into the logo, thumbnails, captions **and the sung audio** ("Zoom, zoom, KiddoVerse!") — **decide before uploading**; a later rename = re-making logo, thumbnails, captions, re-singing. Backup brand ideas (uncleared): Glimmerverse, Wonderpocket, Twinkle Orbit, Orbie's World, Starpocket (avoid "Pocketverse", "Kiddozoom"). "Zoom" and "Gizmo" are also heavily-used names; run a USPTO/EUIPO/WIPO search in classes 9, 28, 41.
2. **Audience:** choose **"Yes, it's made for kids"**. YouTube then disables comments, end screens and cards and limits personalised ads/notifications (revenue is typically lower) → the videos end with a plain goodbye, no end-screen elements.
3. **AI disclosure:** characters are animated; the voices (SoulX-Singer sung, Kokoro spoken/chanted) and the music are AI-generated. Answer YouTube's "altered/synthetic content" question honestly as it is worded in Studio; the description already says "Made with animation and AI: the characters are animated, and the voices and music are AI-generated." Policy scrutiny of AI kids' content is rising (2026 letters from 200+ child-development groups) — the Brand Bible's advice: be transparent, lead with original characters + human creative direction + real educational value, avoid mass-produced look-alikes, and plan to replace synthetic vocals with a human singer when budget allows.
4. **Voice prompt origin:** the SoulX-Singer prompt `audio/sx/prompt_lead2.wav` (8.2 s) is a synthetic clip made inside the project; its exact creation step was **not logged** → check before commercial use.
5. **Fonts/Music/Software:** Fredoka + Baloo 2 (SIL OFL), GeneralUser GS SoundFont (commercial OK), Kokoro-82M (Apache-2.0), SoulX-Singer (Apache-2.0), HyperFrames (Apache-2.0), GSAP "no-charge" Standard License (keep notice).
6. **Captions:** burned in; SRT provided — uploading it duplicates the text unless wanted for search/translation.
7. **Channel plan (suggested, untested):** one Learn episode + a couple of Shorts per week; playlists "Learn with KiddoVerse", "Zoomie Songs", "Dance & Wiggle", "Feelings with Nimbus"; "Where's Bloop?" hidden-character gag; #KiddoWiggle challenge (parent-permission only); one master song → twelve assets (hook cut 20 s, Wiggle 30 s, counting 18 s, colour hunt 16 s, Nimbus calm-down 20 s, Gizmo shape quiz 20 s, karaoke version, 10-minute loop, audio single, printables, 7 × 10 s "Meet the crew"). Targets like CTR 4–5 % are rules of thumb, not promises.

## 10. Roadmap of Learn episodes
See `08_NEXT_STORYLINES.md` §3 for a full brief per episode (Learn #2 finish, #3 Shapes, #4 Animals & Sounds, #5 Numbers 11–20, #6 Three-letter words, …).
