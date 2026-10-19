# Sample asset library

Use the bundled HDRIs, textures, and props as working examples. `00-INDEX.json` records what was
included when this release was prepared.

To request more Poly Haven CC0 assets:

```bash
node assets/arsenal-fetch.cjs --hdris 4 --textures 4 --models 4 --res 2k
```

This is an explicit network operation. It can consume substantial bandwidth and disk space, and the
result depends on the provider's current catalog. The script skips non-empty files that already
exist and writes a fresh catalog to `assets/samples/_INDEX-assets.json`.

Keep study references separate from renderable assets. For every file you add, retain its source,
license, attribution requirements, and any trademark or usage restrictions that apply to your use.
