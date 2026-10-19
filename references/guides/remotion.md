# Remotion — Video Built From Code

**What it is:** Remotion makes video out of React code. You describe each scene as a component — text, colors, timing, motion — and Remotion renders it into a finished MP4. No timeline, no mouse-dragging; the video *is* the code.

## Why it's in the pipeline

It's our specialist for the "words and numbers" half of video — the stuff that has to be pixel-perfect and exactly on the beat:

- **Kinetic typography** — headlines and phrases that snap, slide, and scale on cue.
- **Captions** — clean, synced subtitles that match the voiceover.
- **Data-driven overlays** — charts, counters, and stats that animate from real numbers.
- **Narration sync** — words that light up in time with the spoken track.

Because it's code, the same template can spit out a hundred variations (swap the text, swap the data) without re-editing anything by hand. Local rendering requires recipient-installed dependencies and compute. Check the applicable Remotion terms; hosted assets or narration can introduce provider charges and data transfers.

## Where it lives

The included Remotion project and its setup instructions are in `pipeline/generators/remotion/README.md`. Its components are in:

```
pipeline/generators/remotion/src/
```

The `src/` tree contains registered compositions and shared components. Adapt a registered composition and its props for your own content.

## How to use it

Drive it from a small script that picks a reel component, feeds it your story and data, and renders the MP4. So a request like *"a 15-second clip where the cost numbers count up while the narration explains them"* becomes a data-driven Remotion reel, rendered to a file, ready to post. You bring the story; it brings the polish. (Remotion renders locally with `npx remotion render`.)

---

**Complements:** Remotion (kinetic text, captions, data) pairs with **Hyperframes** for abstract 3D backdrops and **Unreal** for photoreal cinematic shots — words from one, atmosphere from the others.
