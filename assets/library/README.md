# Reference-asset library

This directory is a reusable home for assets referenced by compositions. The included library is a
starter set, not a complete stock collection.

## Commands

Run these from the extracted kit root:

```bash
node pipeline/bin/asset-library.cjs stats
node pipeline/bin/asset-library.cjs scan
node pipeline/bin/asset-library.cjs get <id-or-name>
node pipeline/bin/asset-library.cjs fetch-logo <slug> [--ai] [--png 256]
node pipeline/bin/asset-library.cjs fetch-icon <prefix:name> [--png 256]
node pipeline/bin/asset-library.cjs fetch-emoji <hex>
node pipeline/bin/asset-library.cjs seed
```

The `fetch-*` and `seed` commands perform live downloads and require `curl`; PNG conversion also
requires a supported rasterizer. Provider availability and terms can change. Review the current
source license, attribution rules, and brand/trademark guidance before publishing or redistributing
an asset. An open-source logo file does not grant rights to imply endorsement.

## Categories

`logos-brands` · `logos-ai` · `icons-line` · `icons-3d` · `textures` · `gradients` ·
`backgrounds` · `overlays-fx` · `shapes` · `emoji-3d` · `stock-photos` · `device-mockups` ·
`fonts` · `brand-custom` · `misc`

Prefer SVG when a vector is available. Use `INDEX.json` to locate files, but treat its license fields
as records to verify rather than legal advice. `scan` stores portable placeholder paths; `get`
resolves the corresponding path on the recipient's machine.

Add custom brand assets only to `brand-custom/`, and remove customer-specific material before
sharing the kit.
