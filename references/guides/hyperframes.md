# Hyperframes

**What it is:** Our hand-coded 3D motion-graphics engine — it renders glowing, abstract, "AI-looking" scenes (neural nets, particles, energy cores) into finished video clips, using a configured local browser renderer and ffmpeg.

## Why it's in the pipeline

When a video needs those signature animated backdrops — the glowing neural-net swirl, drifting particles, the abstract sense of "intelligence happening" — Hyperframes makes them. Instead of paying a stock site or an AI service per clip, we *build* the scene in code and render it ourselves. The included renderer does not call a generative model, but dependencies, asset downloads, and local compute still require setup. Inspect composition code for remote resources and confirm asset licenses before rendering. It's the part of the studio that produces the high-end, branded "tech magic" moments.

## Where it lives

The engine ships in this kit under:

```
motion/
```

Inside that folder: `html3d-render.cjs` is the renderer (the thing that turns a scene into a video), and `compositions/*.html` are the individual scenes. Each scene is a small web page that draws itself in 3D; the renderer photographs it one frame at a time and stitches those frames into an MP4. Add your own scenes by dropping a new `.html` into `compositions/`.

## How to use it

After installing the kit dependencies and ffmpeg, run from the extracted kit root to render a 5-second vertical (1080×1920) clip at 30fps:

```
node motion/html3d-render.cjs --html motion/compositions/itm-3-ignite.html --out out.mp4 --fps 30 --dur 5 --w 1080 --h 1920
```

Want to eyeball the look before committing to a full render? Grab a single still frame instead:

```
node motion/html3d-render.cjs --html motion/compositions/itm-3-ignite.html --still 90 --stillout f.png
```

Open `f.png`, confirm it looks right, then run the full clip.

---

**Complements:** Hyperframes makes the abstract MG backdrops; pair it with the editor/compositor that lays voiceover, text, and footage over those clips to assemble the finished video.
