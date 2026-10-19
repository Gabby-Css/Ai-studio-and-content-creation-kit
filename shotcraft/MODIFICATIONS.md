# Modifications to video-shotcraft

Apache License 2.0 section 4(b) requires that modified files carry prominent notices
stating that they were changed. This file is that statement.

**Upstream:** https://github.com/Vincentwei1021/video-shotcraft
**Upstream commit this copy derives from:** `d491544`
**Upstream author:** Yihao
**Upstream licence:** Apache License 2.0 (unchanged — see `LICENSE`)

---

## 1. Files removed

| Removed | Why |
|---|---|
| `assets/audio/` (149 SFX + 5 BGM, 36 MB) | Mixkit licence permits use in a project, not redistribution as an asset pack. Upstream flags 6 files as untraceable and unverified for commercial use. Restored on the user's own machine by `fetch-audio.cjs`. |
| `template/public/audio/` (11 MP3s, 1.2 MB) | A second copy of the same Mixkit audio that the Remotion template loads via `staticFile()`. Four of the eleven are among upstream's untraceable set. Same reasoning; same fetcher restores it. |
| `assets/brand/` (logo marks, lockups, brand board) | Apache-2.0 §6 grants no trademark rights. These are the upstream project's marks. |
| `gallery/` (marketing site: HTML/CSS/JS + 104 duplicate `.md` + logo SVGs) | Upstream's own branded website. Carries their marks, and the 104 markdown files are SEO duplicates of `references/shots/`. |
| `README.md`, `README_CN.md`, `README_JA.md` | Upstream's READMEs embed their logo and describe their repo. Replaced by `SHOTCRAFT.md`, which credits upstream and documents how the library is used inside this studio. |
| `.github/`, `.claude-plugin/`, `.git/` | CI config, plugin manifest, and history specific to the upstream repository. |

Nothing was removed from the shot library itself: all **104 shot recipe cards**, all
reference docs, all Remotion demos, the template, and `assets/lib` + `assets/scripts`
are present.

## 2. Files added

| Added | What it is |
|---|---|
| `NOTICE` | Attribution, trademark position, and the audio explanation, per Apache-2.0 §4. |
| `MODIFICATIONS.md` | This file, per Apache-2.0 §4(b). |
| `SHOTCRAFT.md` | Replacement README: credits upstream, explains how the shot library plugs into this studio's pipeline. |
| `fetch-audio.cjs` | Downloads the removed audio from upstream onto the user's machine. Prints the attribution table and the untraceable-file warning first. Supports `--dry-run`. |

## 3. Files changed

**Documentation translated from Chinese to English.** The upstream docs are written in
Chinese. The buyer-facing layer has been translated so the shot library is usable by an
English-speaking reader:

- `references/shots/**` — all 104 shot recipe cards
- `references/*.md` — `aesthetic-rules`, `pipeline`, `sound-design`, `guided-free-creation`,
  `final-review`, `music-beat-sync`
- `references/sequences/promo-energy-arc.md`
- `SKILL.md` — the Claude skill definition
- `template/TEMPLATE.md` — the template's API reference

Translation preserved all technical content: frame numbers, easing curves, timing values,
component names, file paths, and the reasoning behind each recipe. Where a Chinese term of
art had no clean English equivalent, the original is kept in parentheses on first use.

**Inline code comments inside `.tsx`/`.ts` demo sources were left in Chinese.** They are
implementation commentary sitting next to self-describing code, and machine-translating
comments inside working animation source is a good way to introduce errors in a file that
currently renders correctly. The card for each demo — the part you read to *use* it — is
translated.

**Audio path references left intact.** Docs still reference `assets/audio/...` paths. Those
paths become valid once `fetch-audio.cjs` has run; rewriting them would desynchronise the
docs from upstream.

No functional code was modified. The Remotion components, helper libraries under
`assets/lib`, and build scripts under `assets/scripts` are byte-identical to upstream apart
from the translations noted above.
