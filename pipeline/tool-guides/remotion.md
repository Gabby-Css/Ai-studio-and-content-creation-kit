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

The editable Remotion project is included directly in:

```
pipeline/generators/remotion
```

Inside that folder, `src/` holds registered compositions and shared components (for example `CostReel.tsx`, `MemoryReel.tsx`, `TerminalReel.tsx`). Adapt the composition's props and verify its displayed copy before publishing.

## How to use it

Open `pipeline/generators/remotion/README.md` for installation, preview and render commands.
Run them from that project directory, choose a composition registered in `src/Root.tsx`, and
provide your own props and audio. The optional driver `longform/remotion/gen-story-cinematic.cjs`
can generate synchronized narration and render a cinematic story; its `--execute` mode requires
your configured voice provider and may incur charges.

---

**Complements:** Remotion (kinetic text, captions, data) pairs with **Hyperframes** for abstract 3D backdrops and **Unreal** for photoreal cinematic shots — words from one, atmosphere from the others.
