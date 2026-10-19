# Long-form study references

This folder is for source material whose editing choices you are legally permitted to analyze. It
is not a stock-footage folder, and reference media must not be added to a render unless you have a
separate license for that use.

To create a local pacing fingerprint:

```bash
node longform/bin/lf-dissect.cjs --ref longform/references/example.mp4
```

The command writes summary metadata to `longform/references/00-FINGERPRINTS.json`. A fingerprint is
descriptive, not proof that a style will improve performance.

No third-party reference videos are included in the distributable kit. Add your own lawful sources,
retain their provenance, and remove the media and any private notes before redistributing a copy of
the kit. Do not store customer names, private links, signed URLs, or account identifiers here.

Nothing in this folder is selected by `lf-assemble.cjs`; renderable assets belong in
`longform/components/` and must be indexed there.
