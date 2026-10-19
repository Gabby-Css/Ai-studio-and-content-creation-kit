# Long-form components

`lf-scan.cjs` walks this folder, classifies supported files, probes media metadata, and writes
`components/00-INDEX.json`. The assembler resolves edit-plan asset IDs against that index.

Run this after adding or removing components:

```bash
node longform/bin/lf-scan.cjs
```

The index is rebuilt on each scan. Paths in a working index are local runtime data; sanitize or
regenerate it before sharing a project.

## Suggested layout

```text
longform/components/
  broll/        licensed cutaways and screen captures
  overlays/     transparent PNG, SVG, MOV, or WebM assets
  music/        licensed beds and loops
  sfx/          licensed transitions and impacts
  stingers/     recipient-branded transitions
  graphics/     approved stills and logos
```

Name files for their contents so an editor can match them to the transcript. Check alpha channels,
duration, resolution, and audio before adding an asset to an edit plan.

The procedural files under `motion/overlays/` are a separate source library. They are not read
directly by `lf-assemble.cjs`; first copy or render the asset you need into this components folder,
then run `lf-scan.cjs`.

## Licensing and privacy

Only add material you are allowed to use for the intended publication, including monetized or
sponsored work. Keep license receipts and required attribution. Open-source logo artwork does not
waive trademark rules, and stock licenses can differ by asset and use case.

Remove customer footage, private recordings, licensed source media, personal brand files, and local
indexes before distributing a clean copy of the kit.
