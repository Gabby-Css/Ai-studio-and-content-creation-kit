# Thumbnail design playbook

Use this playbook to develop and review thumbnail concepts. It is a creative checklist, not a
CTR predictor. Actual click-through rate depends on the audience, title, traffic source, topic,
competition, and distribution. Validate decisions with platform analytics and controlled tests.

## Core brief

Build one clear visual promise that still reads at thumbnail size:

- one focal subject or object;
- one supporting cue that connects the image to the video topic;
- no more than a few words of large, legible text;
- sufficient contrast between the focal area and its background;
- an open question that the video can honestly answer.

Do not invent results, revenue, view counts, product screens, endorsements, or platform data. If a
number is part of the story, use a sourced number and preserve its context.

## Practical rules

1. **Match the video.** A viewer should be able to infer the subject without reading the title.
2. **Choose one focal point.** Remove objects that do not improve recognition or curiosity.
3. **Design at delivery size.** Inspect at roughly 168–220 px wide as well as full resolution.
4. **Keep text short.** Prefer zero to three words; avoid duplicating the title.
5. **Protect legibility.** Use a clear silhouette, simple background, and strong local contrast.
6. **Use emotion honestly.** Expression and gaze should support the story, not imply an event that
   did not happen.
7. **Composite brand marks carefully.** Use authorized, accurate artwork; do not ask an image model
   to recreate logos or interfaces.
8. **Keep claims supportable.** Label mockups and illustrative data where a viewer might mistake
   them for measured results.
9. **Check accessibility.** Review grayscale separation, color contrast, and small-screen clarity.
10. **Review artifacts.** Inspect faces, hands, letters, logos, edges, and cropping at 100%.
11. **Compare variants.** Change one meaningful variable at a time when possible.
12. **Use analytics as evidence.** A real platform experiment is stronger evidence than a simulated
    score or a designer's preference.

## Advisory rubric

Score each item from 0–5. The total is useful for organizing a review, but it is not an estimate of
real CTR.

| Criterion | Review question |
|---|---|
| Topic match | Does the image clearly relate to the video's actual subject? |
| Focal clarity | Is there one obvious place to look first? |
| Small-size legibility | Does the idea survive at 168–220 px wide? |
| Text clarity | Is any text brief, accurate, and readable? |
| Contrast | Does the focal area separate from its immediate background? |
| Curiosity | Does the image create an honest unanswered question? |
| Credibility | Are faces, logos, UI, and claims plausible and artifact-free? |
| Composition | Are gaze, gesture, and negative space guiding attention deliberately? |
| Brand fit | Does the treatment fit the recipient's own channel system? |
| Accessibility | Does it remain understandable in grayscale and on a dim display? |

## Concept-to-release workflow

1. Write the video's factual promise in one sentence.
2. Draft several visually distinct concepts around that same promise.
3. Create text-free plates when using an image generator.
4. Add licensed logos, UI, and typography in post for accuracy.
5. Inspect all variants at small size and full size.
6. Rank them with the rubric above. Treat any automated or synthetic score as advisory only.
7. Remove concepts with artifacts, unsupported claims, or weak topic match.
8. Publish a defensible finalist and use real analytics to inform the next iteration.

## Pattern log

Record reusable observations in `THUMBNAIL-PATTERNS.jsonl`. Each line must be valid JSON and should
identify whether the evidence came from a real experiment, a visual review, or a simulation. Never
record customer names, account identifiers, private URLs, signed media links, or local machine paths.

Related files: `THUMBNAIL-MEGA-PROMPT.md` and `THUMBNAIL-PATTERNS.jsonl`.
