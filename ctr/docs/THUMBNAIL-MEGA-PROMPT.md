# Long-form thumbnail prompt kit

This prompt kit helps turn a factual video brief into thumbnail concepts. It is provider-neutral:
use any image tool that you are licensed and configured to use, or create the plate manually. Image
generation, upscaling, and third-party scoring may require separate accounts and may incur charges.

No prompt or synthetic score can guarantee clicks. Use platform analytics and controlled tests for
performance decisions.

## 1. Intake

Complete this brief before generating anything:

```text
VIDEO SUBJECT:
FACTUAL PROMISE:
AUDIENCE:
ONE VISUAL MECHANISM:
OPTIONAL ON-SCREEN WORDS (0-3):
SUPPORTED NUMBER OR RESULT (optional, include source):
BRAND COLORS:
SUBJECT REFERENCE RIGHTS CONFIRMED: yes/no/not applicable
LOGO OR UI RIGHTS CONFIRMED: yes/no/not applicable
```

If a result, revenue figure, quote, or product screen cannot be supported, omit it or mark it clearly
as illustrative.

## 2. Concept framework

Create 6–10 genuinely different directions. Useful lanes include:

1. a close-up subject responding to one relevant object;
2. a clear before/after state supported by the video;
3. an input-to-output transformation;
4. a sourced number attached to its real-world referent;
5. a tool or product demonstration using accurate, authorized UI;
6. a simple object metaphor that remains faithful to the topic;
7. a warning or constraint without exaggerated fear language;
8. a text-free curiosity image.

Each concept should specify composition, focal point, expression or motion cue, background, color,
negative space, and optional text. Do not default every concept to shock faces, money imagery, neon
technology tropes, or the same layout.

## 3. Text-free plate prompt

```text
YouTube thumbnail plate, 16:9.

SUBJECT: [person/object], using only supplied references that may be used for this project.
ACTION OR EXPRESSION: [specific and truthful].
TOPIC MECHANISM: [one concrete visual that represents the video's actual subject].
COMPOSITION: one primary focal point on [left/right/center], clear negative space on the opposite
side, readable silhouette, uncluttered background, safe crop around face and hands.
LIGHT AND COLOR: [recipient brand palette], strong local contrast around the focal point, restrained
background saturation, natural skin and material color.
STYLE: [photographic/illustrative/editorial], coherent lighting, accurate anatomy, clean edges.

NEGATIVE: no words, letters, logos, watermark, fake UI, invented metrics, duplicated objects,
distorted hands, warped face, or irrelevant visual clutter.
```

Generate a plate without text, logos, or interface details whenever possible. Add those elements in
post so wording and marks stay accurate.

## 4. Post-composite checklist

- Add zero to three words in a licensed, legible typeface.
- Use only authorized brand marks and preserve their required clear space.
- If UI is necessary, use an approved screenshot or a clearly labeled mockup.
- Keep important content out of platform crop and duration-badge zones.
- Export a 16:9 sRGB image at the platform's current recommended dimensions.
- Inspect at 100% for artifacts and at 168–220 px wide for comprehension.
- Review on light and dark interfaces and in grayscale.

## 5. Optional identity workflow

If a provider offers a consent-based identity feature, use only reference images you have permission
to process. Follow that provider's current setup, privacy, retention, pricing, and output-rights
terms. Keep provider IDs, signed URLs, API keys, and local absolute paths out of project templates and
shared reports.

The included `longform/bin/lf-thumbs.cjs` is plan-only unless `--run` is supplied. Its provider
integration is optional and requires separate installation, authentication, credits, and review of
the current provider documentation.

## 6. Review and evidence

Rank concepts by topic match, focal clarity, small-size legibility, credibility, composition, and
brand fit. Automated or persona-based scoring is synthetic and advisory; it does not measure or
predict real CTR. The release decision should combine visual review, factual review, and—after
publication—actual platform analytics.

Store sanitized lessons in `THUMBNAIL-PATTERNS.jsonl`. Do not store customer data, face-reference
paths, account state, private campaign names, or provider job identifiers.
