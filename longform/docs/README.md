# Long-form 16:9 editing workflow

Supply a raw video and editing assets; the workflow
dissects the video (transcript, silence map, scene map, contact-sheet "watch"), authors ONE
creative artifact — `work/<slug>/edit-plan.json` — and a dumb assembler renders the finished
16:9 MP4 with ffmpeg. No DaVinci Resolve dependency; entry point is `/longform`.

**The split is the design:** scripts do everything mechanical (probe, whisper, silence,
scenes, frames, indexing, assembly, verification); the agent does only the creative act —
reading the transcript, watching the frames, choosing components, writing the plan.

Use `EDIT-MEGA-PROMPT.md` alongside this file for the creative guidance (punch-in
rhythm via `keep[].zoom`, the full-length motion-layer comp rendered by `lf-motion.cjs` to a
transparent .mov, animation vocabulary, dark-glass style system, pattern-interrupt law). This
README covers mechanics; the mega-prompt covers craft and avoids an edit made only from static overlays.

## Folders (the drag-and-drop contract)

The folder paths in this table are relative to `longform/`. Run command examples from the extracted kit root.

| Folder | What goes in it |
|---|---|
| `inbox/` | Raw videos to edit. Newest file = next job (or pass a path to `/longform`). |
| `components/` | Assets you have verified for the intended use. Canonical buckets: `broll/ music/ sfx/ overlays/ luts/ graphics/ fonts/`. Loose drops anywhere inside are classified by the scanner. |
| `references/` | **STUDY-ONLY** style refs (edits to learn pacing/grammar from). Never shipped, can never appear in an edit plan. Fingerprint one: `lf-dissect.cjs --ref <path>`. |
| `work/<slug>/` | Per-video working dir: dissection artifacts, `edit-plan.json`, draft renders, verify frames. |
| `output/` | `<slug>-final.mp4` + a copy of the edit plan + verify report. |

Asset indexing applies (see `assets/arsenal-README.md` from the kit root): a component is not ready until it's an entry
in `components/00-INDEX.json` with a real path + size — run the scanner after every drop.
Heavy render intermediates use the operating system's temporary directory under `lf-build/<slug>/`.

## The scripts (`longform/bin/`)

```
node longform/bin/lf-scan.cjs                       # (re)index components/ → 00-INDEX.json
node longform/bin/lf-dissect.cjs "<video>"          # probe→audio→whisper→silence→scenes→frames
node longform/bin/lf-dissect.cjs --ref "<video>"    # fingerprint a reference (pacing numbers)
node longform/bin/lf-assemble.cjs <slug> --check    # validate plan + print computed timeline
node longform/bin/lf-assemble.cjs <slug> --draft    # 480p draft render
node longform/bin/lf-assemble.cjs <slug> --final    # full-quality render → output/
node longform/bin/lf-verify.cjs  <slug> --draft|--final   # frame LOOKs + duration/loudness gate
```

`lf-dissect` is idempotent (whisper is the long pole — cached unless `--force`). `lf-assemble`
is staged (`--stage cut|composite|audio|mux`) so a failed stage re-runs alone.

## Schema 1 — `components/00-INDEX.json` (machine-written by lf-scan)

```jsonc
{ "version": 1, "scanned_at": "…", "counts": { "broll": 12, "music": 4, … },
  "assets": [ {
    "id": "broll-city-drone-night-01",        // type-slug(rel path) — STABLE across re-scans
    "type": "broll",                          // broll|music|sfx|overlay|lut|graphic|font
    "path": "C:/…/components/broll/city drone night 01.mp4",
    "rel": "broll/city drone night 01.mp4", "bytes": 48211234,
    "duration": 14.62, "width": 3840, "height": 2160, "fps": 29.97,
    "hasAudio": true, "hasAlpha": false,
    "tags": ["city","drone","night"]          // filename tokens + non-canonical parent folders
  } ] }
```

## Schema 2 — `work/<slug>/edit-plan.json` (the ONLY agent-authored artifact)

**All times are SOURCE seconds** (`timebase:"source"`) — the same clock as the transcript,
silence map, and scene map. The assembler owns the source→output mapping and writes it to
`timeline-map.json`. Any event whose `at` lands in a cut range is a hard validation error
(exception: `at: 0` always means "start of the output").

```jsonc
{
  "version": 1, "slug": "my-video", "source": "longform/inbox/raw.mp4",
  "timebase": "source",
  "target": { "aspect": "16:9", "width": 1920, "height": 1080, "fps": 30, "lufs": -14 },

  "keep": [                                   // the cut list, in OUTPUT order (reordering allowed)
    { "in": 3.2, "out": 41.75, "note": "cold open — dead air 0-3.2 cut" },
    { "in": 44.1, "out": 171.9 } ],

  "broll": [                                  // type broll only; fullscreen = cutaway (speech continues)
    { "asset": "broll-city-drone-night-01", "at": 12.5, "dur": 4.0, "assetIn": 2.0, "mode": "fullscreen" },
    { "asset": "broll-terminal-02", "at": 63.0, "dur": 6.5, "mode": "pip",
      "pip": { "x": "W-w-60", "y": "60", "scale": 0.38 } } ],

  "overlays": [                               // type overlay|graphic; dur "full" = whole output
    { "asset": "overlay-film-grain-4k", "at": 0, "dur": "full", "blend": "screen", "opacity": 0.18, "loop": true },
    { "asset": "graphic-channel-logo", "at": 5.0, "dur": 6.0, "x": "60", "y": "60", "scale": 0.12, "fade": 0.35 } ],

  "sfx":   [ { "asset": "sfx-whoosh-03", "at": 12.5, "gain": -8 } ],   // gain dB; anchor to keep-in points for cut whooshes

  "music": [ { "asset": "music-lofi-bed-02", "at": 0, "dur": "full", "gain": -21, "loop": true,
               "duck": { "under": "speech", "ratio": 8, "attack_ms": 150, "release_ms": 400 } } ],

  "grade": { "lut": "lut-kodak-2383", "strength": 0.8, "extra": "eq=contrast=1.05:saturation=1.08" },
  "captions": { "burn": false, "srt": "transcript.srt" }
}
```

Every `asset` must resolve in `00-INDEX.json` with the allowed type for its array — this
mechanically enforces the USABLE-only rule (`references/` files can never render).

## GENERATE what the palette lacks (showcase the studio engines)

The dropped components are the floor, not the ceiling. When the transcript names a concept
with no matching component, **render one with the studio's own engines** — the edit should
showcase Hyperframes / Remotion / OpenMontage / the video-studio kit:

- **3D visuals (Hyperframes path):** author or reuse a composition in `motion/compositions/`
  (Three.js, `window.__seek(t)` + `window.__ready` contract), render 16:9 with
  `node motion/html3d-render.cjs --html <comp.html> --out components/broll/gen-<name>.mp4 --fps 30 --dur 6 --w 1920 --h 1080`
  (`--still N --stillout f.png` first to LOOK before committing the full render).
- **2D animations / kinetic type (Remotion path):** the Remotion project at
  `pipeline/generators/remotion/` and its `src/` templates; render 1920x1080 MP4s the
  same way the studio's short-form pipeline does.
- **Montage grammar:** `pipeline/MONTAGE-CRAFT.md`
  for the cut patterns these inserts should follow.

Generated renders land in `components/broll/` (or `components/overlays/` for alpha work) with a
`gen-` name prefix, then **re-run `lf-scan`** — a generated asset enters the plan exactly like a
dropped one, through the index. LOOK at a still of every generated render before it ships.

## The agent's creative checklist (read `pipeline/MONTAGE-CRAFT.md` before cutting)

1. **Cut the dead air** — `silence.json` is the starting cut list; also kill flubbed takes and
   rambles found in the transcript. Long-form breathes more than reels: keep natural pauses
   under ~1.2s, don't machine-gun a talking head.
2. **Hook** — the first 30s earns the next 10 minutes. Open on the strongest line (reordering
   `keep[]` is allowed and encouraged).
3. **B-roll is meaning, not decoration** — insert where the transcript NAMES the thing shown;
   fullscreen cutaways for story beats, PiP for screen/demo material. Cadence: something
   A 20–40 second cadence can be a useful starting point, but adjust it to the material.
4. **SFX punctuate cuts** — whooshes on section jumps (anchor at `keep[].in` boundaries), pops
   on graphic entrances. Sparingly; long-form ≠ reel.
5. **Music is a bed, not a lead** — −18 to −24 dB under speech, ducking on. Consider dropping
   the bed entirely for heavy-info sections.
6. **One grade over everything** (MONTAGE-CRAFT §17) — one LUT, applied once, over all footage.
7. **Watch before you plan, look before you ship** — vision-Read every contact sheet before
   authoring; vision-Read every verify frame before calling a render done (buyer's-eye).

## The ritual (what /longform runs)

1. `lf-scan` → 2. `lf-dissect` (background) → 3. READ transcript/silence/scenes + LOOK at all
`frames/sheet_*.png` + read `00-INDEX.json` → 4. author `edit-plan.json` → 5. `--check` →
6. `--draft` → 7. `lf-verify --draft`, LOOK at every event frame, amend plan + re-draft until
right → 8. `--final` (background) → 9. `lf-verify --final` → 10. report: what was cut, which
components landed where, duration, and LUFS. Any automated quality score is advisory; inspect and
watch the render yourself.

**Never skip the draft.** Never ship a render whose verify gate exited non-zero.
