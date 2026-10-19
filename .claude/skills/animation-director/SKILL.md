---
name: animation-director
description: >
  Turn a rough animation thought into a shot-accurate MOTION direction using a visible decision
  pass. Use when authoring or reviewing any animated beat — motion graphics, kinetic type,
  lower-thirds, callouts, transitions, a longform motion layer, or a generated-video motion
  prompt. Produces a decision log so every added move traces to a resolved ambiguity, never to
  a default nobody chose. NOT a renderer — it decides WHAT moves and WHY; lf-motion.cjs /
  Hyperframes / Remotion execute it. Pair with `motion-editor` (which picks the technique) —
  this skill specifies the motion once the technique is chosen.
---

# Animation Director — the 4-D pass for MOTION

Adapted from your Leera method (2026-07-20). Leera resolves a *location* into six slots.
Motion needs different slots: a still frame can be fully specified and still animate wrong.

**The creed this inherits from `motion-editor`: 2D-first, motion blur and splines make motion feel
real, 3D is a rare hero move.** This skill does not re-litigate that — it operationalizes it.

---

## The six MOTION slots

Every animated beat resolves all six. A rough thought usually names one or two and silently
leaves four to chance — and the four it leaves are the ones that make it look amateur.

| slot | the question | failure when unresolved |
|---|---|---|
| **SUBJECT** | what element is moving — and what is deliberately still? | everything moves at once; no hierarchy; the eye has nowhere to land |
| **ACTION** | what does it DO — enter, build, morph, exit, react? | things fade. Fades are what you get when nobody decided. |
| **STAGING** | where in frame, in what order, against what? | elements collide, or all arrive centered and stacked |
| **TIMING** | duration, delay, stagger, and what beat in the audio it hits | motion floats free of the words; nothing lands on a syllable |
| **EASING** | the curve — overshoot, settle, snap, drift, hold | linear interpolation, the single loudest tell of an amateur edit |
| **CONSTRAINTS** | what must NOT happen; what must stay readable/registered | type unreadable at speed, elements drift out of register, glyphs clipped |

For a GENERATED video (Higgsfield/Kling/Seedance), add a seventh:
**CAMERA** — is the camera moving, or is the subject? Name one. Both at once reads as drift.

---

## The 4-D pass

### 1. DECONSTRUCT
Quote the useful words from the brief. Map them to the six slots. Mark each
**explicit / implied / missing**. Quote — do not paraphrase; paraphrasing is where invented
intent enters.

### 2. DIAGNOSE
Audit for the failures that specifically kill motion:
- **Does the motion match the sentence?** The technique must be what he is SAYING, not decoration.
  (Standing rule: animation-must-match-the-sentence.)
- **Is anything moving that should be still?** Stillness is a choice; name it.
- **Does timing hit a real beat?** If you cannot name the word it lands on, timing is unresolved.
- **Is the easing named?** "Animates in" is not an easing.
- **Is it readable at speed?** Type needs frames on screen, not just an entrance.
- **Continuity:** if this beat follows another of the same element, does it CONTINUE that
  element's state or restart it? (Restarting reads as the diagram running backwards — a real
  defect found in production 2026-07-20.)
Never silently add a move, a flourish, a texture, or a camera push.

### 3. DEVELOP
Build from approved decisions only:
- ONE subject carries the beat; everything else supports or holds still.
- Stagger by DESTINATION, never by hash or index — arrival order must read as meaning.
- Give type a lag behind its plate (~2 comp-frames) so it reads as printed, not painted.
- Name the easing as a curve, not a mood: `outCubic`, `spring(damping 15, stiffness 110)`,
  `steps(12)` for a posterized hold.
- Add motion blur wherever velocity is high — its absence is why 2D looks cheap.
- Constraints last: what stays registered, what stays legible, what must not clip.

### 4. DELIVER
Output the direction as ONE paragraph a builder can execute, then a **decision log**:
`source phrase or declared default → motion decision → the ambiguity it resolves`.
Then open questions, only if something essential is genuinely missing.

---

## Operating modes
- **DETAIL** (default for a new beat) — ask 2–3 clarifying questions, then a deep pass.
- **BASIC** (quick fix) — no questions, minimum clearly-labelled defaults, deliver immediately.

**Iteration rule:** when the brief changes ("make it land harder, drop the overshoot, hold two
beats longer"), rewrite the FULL direction with the change applied. Never a diff, never a fragment
— a partial rewrite is how slots silently fall out of agreement.

---

## Worked example

**Rough thought:** "the dots should lift out to show how much you're not posting"

**DECONSTRUCT**
- SUBJECT — *implied*: "the dots" (a field of them); which subset lifts is missing
- ACTION — *explicit*: "lift out"
- STAGING — *missing*: where the gap appears, what fills it
- TIMING — *missing*
- EASING — *missing*
- CONSTRAINTS — *implied*: the absence must read as the point

**DIAGNOSE**
- The sentence is about *scarcity*. So the HOLE is the subject, not the dots that leave.
- If the field is a centered motif, the hole reads as a design flourish. It must be full-bleed
  so the hole reads as missing inventory.
- Unresolved: does the lift stagger from the middle out, or by index? Index would read as random.

**DEVELOP**
A full-bleed field of 260 dots fills the frame edge-to-edge on a 46px pitch. On the phrase
"five to ten posts", a contiguous run of 8 dots in the top row lifts 112px, staggered from the
centre of the run outward at 0.28× the beat, each on `outCubic`; the lifted dots brighten to ink
white as they clear the field while the remaining field holds absolutely still. The vacated
cells stay empty and unlit — the hole is the subject and nothing fills it. Type lags the field by
2 comp-frames.

**Decision log**
- "dots" → full-bleed 260-dot field at 46px pitch → a centered motif would read as decoration, not inventory
- "lift out" → 112px rise + brighten to white → makes the departure legible against the dim field
- declared default → stagger from run-centre outward, 0.28× beat → index-order stagger reads as random noise
- "how much you're not posting" → vacated cells stay empty and unlit → the ABSENCE is the argument
- declared default → remaining field holds still → one moving subject; stillness gives the eye its anchor

---

## Related
`motion-editor` (which technique serves this shot) · `film-director` (generated-footage prompts +
model choice) · `longform/comps-lib/README.md` (the five broadcast-grade laws).
