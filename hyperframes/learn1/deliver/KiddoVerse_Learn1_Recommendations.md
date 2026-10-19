# KiddoVerse LEARN #1 - Recommendations

*Count, ABC & Read with KiddoVerse* (5 min 54 s). Everything below is practical advice and suggestions, not a promise of views or results.

## 1. What is inside the video
| Time | Part | What happens |
|---|---|---|
| 0:00 | Logo jingle + "All aboard the Learning Express!" 3-2-1-Zoom | a friendly start that can be reused in every episode |
| 0:08 | Theme song (Zoom, zoom, KiddoVerse!) | one hook, repeated 4 times |
| 0:24 | **Numbers 1-10** | each number: big numeral, number word, then items pop in one by one while the song counts (the ding goes up the scale) |
| 1:24 | Count to ten sing-along | all numbers in order, a marimba note on each (the theme song comes back at 1:32) |
| 1:48 | **Alphabet A-Z** | every letter is *letter name -> sound -> picture word* ("A - a - apple") |
| 3:10 | The ABC song | the whole alphabet lights up as it is sung |
| 3:30 | Brain break dance | a movement break between lessons |
| 3:46 | **Two-letter words** (at, in, on, up, go, no, me, be, it, my) | letters slide together to build the word, then a picture and action show what it means |
| 4:38 | Game: "Can you find it?" (a number, a letter, a word) | a question, a quiet thinking pause with a countdown, then the answer |
| 5:06 | Final theme song (key goes up) | big finish |
| 5:38 | Outro | a clean goodbye scene; the video does not rely on end screens or cards (see section 4) |

## 2. How parents and teachers can use it (suggestions)
- **Watch together and answer out loud.** The thinking pauses in the game rounds leave room for the child to point and say the answer.
- **One part at a time is fine.** Use the chapter list to jump to Numbers, Letters or Words.
- **Replaying is fine.** Songs and counting can be watched again; there is no need to move on quickly.
- **After the letter section**, ask "What starts with B?" around the house. After the words section, look for "up", "in", "on" in picture books.
- The content is aimed at toddlers and preschoolers. No age range has been tested or checked, so describe it as "toddlers and preschoolers" and let parents decide.

## 3. Possible next episodes (suggested order, not researched)
1. **Colors & Shapes** - the first KiddoVerse song already touches this.
2. **Animals & their sounds**
3. **Numbers 11-20 and counting by 2s, 5s, 10s**
4. **Three-letter words (cat, dog, sun, hat ...)** - the natural next step after two-letter words.
5. **Days of the week + months + seasons**
6. **Feelings & manners** (happy, sad, please, thank you)
7. **My body & the five senses**
8. **Opposites** (big/small, up/down, hot/cold)
9. **Daily routines** (wash hands, brush teeth, bedtime)
10. **Letter-by-letter mini episodes** (one 90-second video per letter) that point to the full alphabet video.

## 4. YouTube upload checklist
- **Audience:** choose **"Yes, it's made for kids"**. YouTube does not offer end screens or cards on made-for-kids videos (and turns comments off), so the video ends with a clean outro instead. Do not plan on end-screen elements.
- **Altered / synthetic content question:** the facts are that the characters are animated, and the singing voice, spoken voices and music are AI-generated. Read YouTube's question as it is worded in Studio and answer it honestly. Saying so in the description is a safe extra (the sentence is in `YOUTUBE_DESCRIPTION.txt`). Nothing here states that answering YES is mandatory.
- **Title idea:** `Count 1 to 10, ABC & Two-Letter Words | Learn with KiddoVerse | Songs for Toddlers` (change the name if the channel name changes, see section 5).
- **Description:** paste `YOUTUBE_DESCRIPTION.txt` (title, description, chapters, tags). The chapters also exist alone in `KiddoVerse_Learn1_chapters.txt` (the first line must be 0:00).
- **Captions:** the captions are burned into the picture, and an SRT file (`KiddoVerse_Learn1.srt`) is also provided. Uploading the SRT shows the text twice (burned-in plus YouTube captions) unless the burned-in text is accepted as is. Upload the SRT only if it is wanted for search or translation.
- **Thumbnail:** three options are in the thumbnails folder (big letter + number + smiling character, few words, bright colours). Pick the clearest one.
- **Vertical clips:** `Shorts\` holds two 1080x1920 clips (ABC song 3:10-3:30, counting 0:24-1:24) cut from the 1080p video. Both start and end in the pause between two lines (checked on the voice track), but still watch them once before posting.
- **Playlists:** keep a playlist "Learn with KiddoVerse" and put every learning episode in it, in order.
- **Posting pace:** choose a pace that can be kept (for example one episode plus a couple of short clips each week). This is a suggestion, not a tested rule.

## 5. Before you publish
- **Name and trademark:** KIDDOVERSE is a registered US trademark (22LEARN, LLC, Reg. 5762831, downloadable game software, registered 2019), and the owner has a toddler learning product. It could not be confirmed that the registration is still live. **Decide the channel name BEFORE uploading**: the name is in the logo, the thumbnails, the captions AND the sung audio ("Zoom, zoom, KiddoVerse!"), so a later change means re-making all of them, not changing one setting. This is not legal advice.
- **Voices:** the singing is SoulX-Singer (Apache-2.0); the spoken character lines are Kokoro (Apache-2.0). The alphabet lines (letter, sound, picture word) and the two-letter-word lines are chanted by the same Kokoro voice instead of sung, because the singing model could not pronounce short consonant sounds clearly; the theme songs, counting songs and the ABC song are sung. The singing voice prompt (`audio/sx/prompt_lead2.wav`, 8.2 s) is a synthetic clip made inside this project; the project files show no recording of a real person, and code notes say it was cut from earlier SoulX-Singer output that was guided by a Kokoro-generated reference. The exact creation step was not logged, so: origin of the voice prompt file is not documented - check before commercial use.
- **Music & sounds:** original arrangement played with the GeneralUser GS SoundFont (its licence allows commercial music). The logo jingle is original.
- **Fonts:** Fredoka and Baloo 2 (SIL Open Font Licence).
- **Pronunciation:** lyrics and captions use American pronunciation (for example "zee" for Z and "vase" for V). That suits a US audience; viewers in the UK or Ghana say "zed" and may notice.
- **Listening check:** the automatic checks (`FINAL_REPORT.txt`) are measurements, not listening. The automatic pipeline did not listen to the finished video. Play it once all the way through; if a word sounds unclear, note the time (for example "3:12 letter F") so that line can be re-sung.
