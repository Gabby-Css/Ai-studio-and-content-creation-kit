# 07 — TEMPLATES & GENERIC VIDEO PROMPTS

Fill-in briefs you can paste into Cursor (or any AI) plus **consistent character/style prompt blocks** for hosted image/video generators (Higgsfield, Runway, Kling, Veo, Seedance, Midjourney-type tools…) in case you ever want a shot made outside the local HyperFrames pipeline. Hosted tools can cost money and upload your prompts/images — ask before using them with this project, and never paste private data.

---

## 1. Bo and the Pancake — EPISODE BRIEF (fill in, then paste with `01_BO_MEGA_PROMPT.md`)
```
EPISODE: <N> — "<Title>"     SEASON: <n> (episode <k> of <m>)
CONTINUES FROM: ep<N-1> last line "<…>" / last frame: <where everyone stands>
SET: <kitchen | lawn | space | new set…>   TIME OF DAY: <morning | day | dusk | night>
FEATURED: <characters, ≤ 1 new>        NEW PROPS/SETS: <list>
LOGLINE (1 sentence, kid-clear): <…>
PROBLEM → TRY → TWIST → SOLUTION (sharing/teamwork): <…>
THE 11 LINES (4–7 words each, ≈ 50–62 total, aim 56):
 1 NAR  | …            — beat/camera: …
 2 …
 11 NAR | …            — CLIFF-HANGER or "end of Season N"
CATCHPHRASES USED: <Bo "Just one tiny bite!" …>
RUNNING GAG / CALLBACK: <…>
END CARD: line 1 "<…>"   line 2 "<…>"   (guess-bait or "SEASON N COMING SOON!" / "THANKS FOR WATCHING!")
COVER FRAME at ≈ <seconds> s (full frame, no captions): <what it shows>
MUST NOT: <anything scary / new rigs / …>
```

## 2. Bo — SEASON PITCH template
```
SEASON <n>: "<Title>"   episodes <a>–<b>   one-line promise to the viewer: <…>
WHY NOW (what the last finale handed us): <…>
EPISODE LADDER: <5 × (title — one-sentence beat — cliff-hanger)>
NEW CHARACTER(S): <≤ 1 per episode, rig effort>   NEW SETS: <…>
GAGS PAID OFF: <…>   CONTINUITY FIXES: <…>
END-OF-SEASON HOOK for Season <n+1>: <…>
RISKS (engine/time): <…>
```

## 3. KiddoVerse — LEARN EPISODE BRIEF (fill in, then paste with `04_KIDDOVERSE_MEGA_PROMPT.md`)
```
LEARN #<n>: "<Title>"      LEADER CHARACTER: <Gizmo/Nimbus/…>      WORLD: <…>      BPM/KEY: <108 C…>   TARGET LENGTH: <5:00–6:00>
LEARNING GOAL (one sentence a parent would search for): <…>
ITEMS (6–10): <…>   3 OBJECTS PER ITEM: <…>
STORY HOOK (replaces "the rainbow's gray"): <…>
STOP VERSE TEMPLATE (same tune every item): "<…> Here's <ITEM>! <ITEM> <ITEM> … <obj1> are <ITEM>, <obj2>… What <thing> is it? <ITEM>!"
RECAP LINES: <…>     BRAIN BREAK (movements): <…>
GAME (3 rounds): 1 "<Where is …>"  2 "<…>"  3 "<…>"   thinking pause: 3.75 s
CHARACTER JOBS: Kiko <…> Luma <…> Bloop <…> Rumble <…> Gizmo <…> Nimbus <…> Zoom <…>
SUNG vs CHANTED vs SPOKEN: <which lines are chanted by Kokoro because of hard consonants>
NEW ART/SFX NEEDED (props, animal/animated sounds…): <…>
TITLE / DESCRIPTION LINE 1 (outcome first) / TAGS: <…>
THUMBNAIL (one face + ≤ 3 words): <…>
```

## 4. KiddoVerse — SHORT (vertical) BRIEF
```
SHORT: "<name>"  SOURCE: <episode + start–end seconds, cut between two lines>  LENGTH: 15–60 s
HOOK (first 2 s): "<Can your toddler …?>"  ON-SCREEN TEXT (≤ 3 words): <…>
MOVE KIDS CAN COPY: <…>   LOOP-FRIENDLY ENDING: <…>   CAPTIONS: burned-in
```

## 5. Daily "status check" prompt (paste at the start of any new session)
```
Status check, read-only. 1) Is anything running? (Get-CimInstance Win32_Process for hyperframes.mjs render, run_all, run_final, python/node jobs from this project.) 2) Tail hyperframes\run_episode.log, hyperframes\learn1\deliver\STATUS.txt (and learn2). 3) For Bo: which toonN have output\*-final.mp4 and which are delivered in Desktop\Content Creation\Videos? 4) ffmpeg -version OK? disk free? 5) Report in a table and tell me the next safe action. Do not start or kill anything.
```

## 6. How to give feedback after you watched/listened (copy this shape)
```
EP/VIDEO: <35 / Learn #1>   TIME: <0:14–0:17>   PROBLEM: <Mochi's mouth doesn't move | letter F unclear | caption covers Bo's face | too loud>
EXPECTED: <…>   PRIORITY: <must fix | nice to fix>
```
The agent then re-times/re-voices only that part and re-renders only what it must (a Bo episode is ≈ 5 min; a KiddoVerse render is 34–60 min — batch your notes first).

## 7. "Update the docs" prompt (end of every session)
```
Update CURSOR_HANDOFF/02_BO_STORY_BIBLE.md (episode guide + continuity), 03/06 playbooks (new helpers + gotchas), README_START_HERE.md §3 (current state) and the project memory notes with exactly what was built, measured and delivered today, what failed, and the next safe action. Keep it factual; mark anything unverified.
```

---

## 8. STYLE BLOCKS for hosted image/video tools

### 8.1 Bo and the Pancake style block (append to every prompt)
> flat 2D vector children's cartoon, thick dark-brown outline (#2b1a14), big glossy eyes with white sclera and black pupils with highlights, pink blush cheeks, soft gradient shading, warm high-key saturated colours, clean simple background, vertical 9:16, front or three-quarter view, full body, bouncy squash-and-stretch pose.
> **Negative:** photorealistic, 3D render, real person, extra fingers, morphing face, text, watermark, scary, creepy eyes, dark mood, gore, copyrighted character.

**Character one-liners (paste the ones in the shot):**
- **Bo** — small orange fox with cream belly and cheeks, bushy tail, big white-ringed eyes, **green dotted knitted scarf**.
- **Flapjack** — a thick golden-brown pancake character with a butter pat on top, syrup drip, big round eyes, tiny stick arms and little white feet.
- **Mochi** — gray tabby cat with darker stripes, long whiskers, tiny gold bell collar, white belly, long curled tail, deadpan half-lidded eyes.
- **Truffle** — round pink pig in a tall white chef's hat and white apron, curly tail.
- **Zap** — boxy silver-blue robot, dark rectangular screen face with a curved smile, small antenna with a red tip, round chest panel with a pink heart, stubby arms.
- **Coco** — brown monkey with a tan face and belly, long tail with a banana at the tip, mischievous grin.
- **Gumdrop** — big round blue-violet fuzzy monster with one huge eye, two small horn-ears, round spots, big friendly smile.
- **Boo** — small white floaty ghost with a wavy hem, pink bow, rosy cheeks, shy eyes.
- **Peanut** — baby elephant, blue-gray, big pink-lined ears, striped party hat, curled trunk.
- **Rocky** — gray raccoon with a black eye mask, a dark cap/hood, ringed tail, sly smile.
- **Blip** — small green alien, two antennae with yellow balls, spotted body, big curious eyes.
- **Nibbles** — tiny gray mouse, big pink-lined round ears, pink feet, a wedge of cheese.
- **Jiggles** — four small round jelly creatures with two antennae each (pink, yellow, blue, orange), freckles.
- **The King** — big round yellow ruler with orange freckle dots and rosy cheeks, golden crown *(check ep16 cover)*.
- **Munch** — giant round gray monster, lighter-gray belly with a pink heart, pink cheeks, small horn-ears, big buck teeth, gentle smile.
- **Pebble** — tiny pink baby version of Munch, heart on the belly, sparkles.
- **Settings:** (a) *kitchen*: peach polka-dot wall, mint tile band, cream-and-beige checkerboard floor, window with teal curtains, round wall clock, jar shelf, mouse hole, fridge on the right; (b) *lawn*: bright green grass, rolling hills, round trees, blue sky; (c) *Planet Zorp*: purple sky with a ringed yellow planet, giant spotted mushrooms, pink-salmon hills.

### 8.2 KiddoVerse style block
> flat-vector 2D children's cartoon, thick dark-indigo outline (#2B1B5E), soft gradient shading, big glossy eyes, rosy cheeks, high-key saturated palette (violet #6C4CF1, coral #FF5E7E, sun #FFC93C, mint #2EC4B6, sky #4CC9F0), clean light background, front view, full body, 16:9.
> **Negative:** photorealistic, 3D render, real person, copyrighted character, text, watermark, extra fingers, scary, creepy eyes, dark mood.

**Crew one-liners:** **Kiko** — 6-year-old boy explorer, warm-brown skin, spiky black hair with a golden star clip, orange hoodie with a big yellow star, teal shorts, white sneakers. **Luma** — 6-year-old girl singer, light-olive skin, deep-purple hair in two big buns with gold star clips, mint dress with a yellow music-note badge, yellow boots. **Bloop** — cute jelly alien blob, teal-mint translucent body, big eyes, pink cheeks, antenna with a glowing pink orb, tiny arms and feet. **Rumble** — baby triceratops, lime-green with cream belly, orange-pink spotted frill, three tiny horns, stubby legs, friendly toothy smile. **Gizmo** — small round robot, silver-blue head with a dark glass visor and LED eyes, orange ear dials, chest display showing the number 5, small treads. **Nimbus** — fluffy cloud-lamb, white cloud body with pastel-blue shading, pink ears, rosy cheeks, soft golden glow. **Zoom** — chunky violet-and-yellow rocket-bus with fins and flame thruster, headlight eyes in the windshield, smile bumper.

### 8.3 Image-to-video shot template
```
[Attach the character-sheet image as reference]
SHOT: <medium close-up | wide | over-the-shoulder>, slow push-in, <5 s>
SUBJECT: <Rumble> <stomps to the beat, tail wagging>
WORLD: <Dino Valley — volcano, ferns, warm peach sky>
STYLE: same flat-vector outlined look as the reference
MOTION: bouncy, on-beat at <120> BPM, squash & stretch; camera slowly drifting
AVOID: morphing faces, extra limbs, text, photoreal, dark mood
```
Worked example (Bo): *SHOT: medium close-up, slow push-in, 5 s · SUBJECT: Truffle the pig chef lifts a glowing golden pan and a red X appears on it · WORLD: warm kitchen, peach polka-dot wall · MOTION: Truffle's eyes widen, pan sparkles softly (no flashing) · AVOID: morphing faces, text.*

### 8.4 Music prompt for an AI music tool (needs a paid tool; ask first)
> Original children's pop-folk, 108–120 BPM, C major. Ukulele, marimba, glockenspiel, claps, tuba/acoustic bass, soft kit with shaker and tambourine. Bright child-like lead vocal + kids' gang chorus. Structure: 4-bar intro, 8-bar chorus (hook "Zoom, zoom, KiddoVerse!" sung E–G–C), verses with one learning idea each, dance break with call-and-response, bridge, key-up final chorus. No reference to any existing song. Lyrics: {paste lyrics}.

### 8.5 Rules for hosted tools
- Ask the user before any spend or upload. Keep a log of prompts + seeds in `CURSOR_HANDOFF/prompts_log.md` (create it).
- Always attach the character-sheet PNG as reference to keep the look; reject any frame where the face morphs or text appears.
- Keep every generated clip ≥ the series' loudness/size specs after editing; 9:16 for Bo, 16:9 for KiddoVerse.
- Disclose AI use according to the platform's wording; kids' content rules (no scary, no strobing, no real children) still apply.
