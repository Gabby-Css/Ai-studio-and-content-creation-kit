---
version: 0.1.0
name: thumbnail-intelligence
description: |
  The high-CTR YouTube-thumbnail brain. Researches what is actually winning right now (surfs YouTube
  via vidIQ outliers/similar-thumbnails/search + web), extracts the repeating patterns, recursive-learns
  them to memory, and APPLIES them to our designs. Core creed: a thumbnail must DEPICT THE VIDEO'S OWN
  mechanism and payoff — not a generic money-face — and it is built as a COMPOSITE (real logos + real
  clip-grid + crisp text over an AI-generated hero) so nothing garbles. Use whenever designing, judging,
  or regenerating a thumbnail; whenever a thumbnail "feels generic / doesn't represent the video."
allowed-tools: Read, Edit, Write, Bash
---

# Thumbnail Intelligence — research → learn → design for the click

You design **high-CTR YouTube thumbnails** that actually represent the video. Two failure modes you exist
to kill: (1) **generic** — a shocked face + money that could sell any get-rich video; (2) **AI-garbled**
— letting the image model render UI, logos, or text (it hallucinates gibberish like "SNRING MATORTATICO").

**your laws (2026-07-17):**
- *"They need to represent the video themselves and correlate with it."* → **CORRELATION LAW** (§2). The
  thumbnail must show THIS video's specific mechanism and promise. For the auto-clip video that means:
  ONE video → hundreds of clips → auto-posted to every platform → thousands/day → money. If a stranger
  can't guess the video from the thumbnail, it's wrong.
- *"Way too basic."* → richer, layered, story-driven compositions beat one-subject stock shots.
- Face fidelity is non-negotiable: it must be **him** (see §4), and honor wardrobe notes (e.g. blank
  hoodie, no logo).

## 1. Research loop — surf the winners first (never design blind)
Run BEFORE designing, and re-run to refresh the pattern bank. Tools (all metered ~5 credits — check
`vidiq_balance`, keep to a few targeted calls):
- **`vidiq_outliers`** `{keyword, contentType:'long', publishedWithin:'sixMonths'}` — videos over-performing
  their channel. Read the winning TITLES (they reveal the promise the thumbnail must visualize).
- **`vidiq_similar_thumbnails`** `{description}` or `{videoId}` — how common is our concept; what visual
  styles win in the niche. `videoId` mode needs a real YT video.
- **`vidiq_youtube_search`** / **`vidiq_channel_videos`** on reference channels (MrBeast + top AI/automation
  creators) → pull `videoThumbnail` (`i.ytimg.com/vi/<id>/maxresdefault.jpg`) and vision-Read a batch.
- **Web**: `WebSearch`/`WebFetch` for "best youtube thumbnails <niche> 2026", thumbnail-teardown blogs.
- Extract the repeating pattern: dominant emotion, element count, text length, color contrast, what
  OBJECT carries the concept, gaze direction. Write it to the pattern bank (§5).

## 2. The CORRELATION LAW — depict the mechanism (the #1 rule)
Before anything, answer: **"What does this video literally promise, and what single image proves it?"**
Then build THAT. For the auto-clip/auto-post video the winning hero images are the MECHANISM, not a face:
- ONE video **multiplying** into a geyser/fan/wall of hundreds of small clip cards.
- Those clips **flooding into** the four platform icons (IG/TikTok/Snap/FB).
- **Scale** made visible: a wall of dozens of posting phones; a counter "1,000 POSTS/DAY".
- Money as the **result** of the machine, not the whole subject.
The face is the *reaction* to the mechanism, not the subject. ≤3 readable elements, but the scene can be
dense (a hundred tiny clips reads as ONE element: "so many").

## 3. The COMPOSITE pipeline — crisp story over an AI hero (never let the model render UI/text)
nano_banana renders photoreal PEOPLE + PRACTICAL FX beautifully but **garbles logos, UI, and text**. So
split the layers:
1. **HERO (Higgsfield)** — photoreal: him (face-locked, §4) + emotion + practical FX (phone erupting
   clip-cards, money, glow). Prompt for a clean zone for the story layer. Say "no text". See
   [[higgsfield-mcp-generation]] for the connector + the `medias`-in-`params` face-lock.
2. **STORY LAYER (you composite it, crisp)** via ffmpeg over the hero:
   - **Real platform logos** — `output/work/<slug>/components/graphics/web-{instagram,
     tiktok-card,snapchat,facebook}.png` (transparent, correct brand). Never trust AI logos.
   - **Real clip-grid** — extract N frames from the ACTUAL source video (`ffmpeg -ss <t> -i <video>
     -frames:v 1 -vf scale=320:-1`) and tile them into a fan/wall = literal "your video → many clips".
   - **Crisp headline** — use the fonts top YouTubers actually use, NOT Arial Black: **Anton**
     (heavy condensed, THE money-hype headline font), **Bebas Neue**, or **Montserrat Black/ExtraBold**.
     Free Google Fonts — pull raw TTF from `github.com/google/fonts/raw/main/ofl/<family>/…` (Anton, bebasneue)
     or the JulietaUla/Montserrat repo for a static Black. Vendor them to `thumbnails/fonts/`. Max 2 fonts
     (headline + accent). 150–220px, thick black stroke (`borderw=14-16`), ≤3 words. `textfile=` to dodge
     `$`/comma escaping — and NEVER put `%` in a drawtext string (it errors "Stray %"; spell it "100X"/drop it).
   - **Color-wheel contrast (not flat palette):** headline color = the COMPLEMENT of the scene's dominant
     glow. Cyan/violet AI-tech scenes → **yellow `#FFE500`** headline (max pop) + white accent word + a
     brand/coral third (triadic). This complementary pop is the classic high-CTR move; verify it holds at 220px.
   - **Brand badge** (feature a tool, e.g. Claude Code): download the REAL logo (Wikimedia Commons SVG→PNG via
     `iiurlwidth`), build a dark rounded pill (`drawbox` fill + coral border) with symbol + wordmark in
     Montserrat Black, overlay a bottom corner. Size the pill WIDE (~940px) or the wordmark clips. Never let
     the image model render brand text.
   - A big **counter** ("1,000 CLIPS/DAY", "487 POSTS TODAY") sells scale better than adjectives.
3. **Verify** at full size AND 220px (mobile). Re-read the composite; kill anything garbled or covering
   the face.

## 4. Face fidelity (non-negotiable)
- Refs live in `brand/face/` (confirmed Higgsfield media_ids in `thumbnails/gen-jobs.json`).
- **The face-drop trap:** the gated `generate_image` wrapper reads everything from `params` — you MUST
  mirror `medias` (and model+prompt) INTO `params`, else refs are silently dropped (`input_images:[]` in
  job_status) and you get a stranger. Always verify `input_images` is populated. Add "the man's face must
  exactly match the reference photos" to the prompt. Full recipe: [[higgsfield-mcp-generation]].
- Honor wardrobe: if he says blank hoodie/no logo, put it in the prompt ("plain blank black hoodie, NO
  logo or text"). For a permanently locked identity across a set, offer to train a Higgsfield **Soul**.

## 5. Recursive learning — every batch teaches the next
After a batch: append what won/failed to the pattern bank so the next run starts smarter.
- Bank file: `ctr/docs/THUMBNAIL-PATTERNS.jsonl` (one line per learning:
  `{date, niche, pattern, evidence, source}`). Load it at the top of §1.
- Durable doctrine → the mega-prompt `ctr/docs/THUMBNAIL-MEGA-PROMPT.md` + memory
  [[longform-video-bay]]. Cross-session lessons → a `feedback_*`/`reference_*` memory + MEMORY.md pointer.
- **Optional simulation** — use a separately configured thumbnail-ranking tool such as the YouTube CTR Arena; the legacy simulator is not included in this kit.
  Score each thumb 0-10 on 11 attributes (faceEmotion eyeContact colorPop contrast textClarity curiosity
  relevance moneyCue clutter credibility brand), then it runs a YouTube-front-page Monte Carlo: 8 bot
  personas (genre-fan/-agnostic, color-lover, minimalist, skeptic, face-driven, mobile-scroller,
  money-motivated) each softmax-pick the ONE thumb that maximizes their taste vs competitor decoys, or
  scroll past. Output = ranked click-share + attribute-driver correlations + per-persona favorites + a
  keep/cull list. Cull the losers, amplify the high-corr traits in the next batch. **Proven law:** money-cue
  and clutter are NEGATIVE drivers (skeptics/minimalists reject raining-cash + busy scenes); contrast,
  curiosity, faceEmotion, textClarity win. Dial money WAY down.
- `vidiq_score_thumbnail` only accepts YouTube-hosted images (not CloudFront/local), so for unpublished
  customs the SIM + buyer's-eye LOOK are the rank. Feed the winner's traits back into the bank.
  The loop: research → score-attributes → SIMULATE → cull → design better from what won.

## 6. The self-check before shipping any thumbnail
- [ ] Could a stranger guess THIS video from the thumbnail alone? (correlation) If not → redesign.
- [ ] Is the MECHANISM visible (clip→post→scale→money), not just a face + cash?
- [ ] Are all logos/UI/text REAL composited layers, zero AI-rendered gibberish?
- [ ] Is it unmistakably HIM (input_images populated), correct wardrobe?
- [ ] ≤3 readable elements, one dominant emotion, extreme contrast, reads at 220px?
- [ ] Headline ≤3 words / a specific number, thick stroke, off the face?
- [ ] Did I bank what I learned for next time?
