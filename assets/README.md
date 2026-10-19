# Assets — bundled samples and optional library tools

This folder contains a small set of working samples plus scripts for building a larger local asset
library. It does not include a complete production library or access to third-party accounts.

## Bundled samples

- `samples/hdris/` — two 2K HDRI environment maps.
- `samples/textures/` — two PBR texture sets.
- `samples/props/` — two glTF props with their required binary and texture files.
- `00-INDEX.json` — an inventory and licensing note for the bundled sample set.

At the time this release was prepared, the sample tree contained 6 logical assets across 22 files
(50,416,163 bytes). Check the files in your copy rather than relying on this historical count after
you add or remove anything.

## Licensing

The bundled samples are identified as Poly Haven CC0 assets. Keep source records with your project,
and confirm the current source metadata if you redistribute the original files. Brand logos and any
assets you add have their own trademark, copyright, and provider-term considerations.

## Optional fetcher

```bash
node assets/arsenal-fetch.cjs --hdris 2 --textures 2 --models 2 --res 2k
```

The fetcher makes live requests to Poly Haven and writes into `assets/samples/`. It requires network
access, `curl`, and enough disk space. Availability and download size depend on the provider's current
catalog. Review the generated `assets/samples/_INDEX-assets.json` before using downloaded files.

The separate `assets/library/` directory contains logos, icons, and fonts used by examples. Read its
README and verify every asset's current license and brand guidelines before publishing.
