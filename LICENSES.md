# Licenses, attribution, and supplied media

This notice describes the delivery boundaries. It does not grant rights to third-party software, model weights, voices, images, footage, music, trademarks, or services beyond their own terms. Package availability or price does not determine those rights.

The kit's `package.json` declares MIT, but individual components retain their own licenses and notices. Preserve the applicable license files and attribution when sharing modified sources. Confirm terms for the exact dependency/model version and intended use; this summary is not a legal opinion or a blanket commercial-use clearance.

## Included sources and optional dependencies

| Component | Location or delivery boundary | What to check |
|---|---|---|
| HeyGen HyperFrames 0.8.40 | Installed separately by hyperframes/package-lock.json | Upstream declares Apache-2.0; preserve installed notices. Source: https://github.com/heygen-com/hyperframes |
| GSAP 3.13.0 | Installed separately; wrapper copies its script locally for rendering | GSAP Standard License, not MIT; retain script headers and review https://gsap.com/community/standard-license/ |
| video-shotcraft sources | `shotcraft/` | Preserve `shotcraft/LICENSE`, `shotcraft/NOTICE`, and `shotcraft/MODIFICATIONS.md`; these identify the upstream Apache-2.0 material and modifications |
| Auto-clipper | `clipper/` | Preserve `clipper/LICENSE` |
| Three.js and supporting assets | `motion/compositions/` and dependency manifests | Retain upstream headers/notices; check separate font and asset terms |
| Remotion and related packages | `pipeline/generators/remotion/`, `longform/remotion/`, `shotcraft/template/` | Check the applicable Remotion terms and any required commercial license; no company-size or free-use entitlement is promised here |
| ffmpeg | Separately installed executable | Licensing depends on the actual build, libraries, and distribution; the kit does not grant codec or redistribution rights |
| Whisper | Recipient-installed package and downloaded model | Review the exact upstream code/model terms before use |
| VoxCPM | Optional external runtime and model, not bundled | Review the selected code/model terms and the rights to any reference voice |
| ElevenLabs or other hosted providers | Recipient's own account and credentials | Provider pricing, usage, output, voice-consent, and data-processing terms apply |
| Unreal Engine and DaVinci Resolve | Separately installed applications and integrations | Check application, plugin, scripting, and output terms for the versions used |
| Sample assets and fetcher sources | `assets/` and relevant asset notices | Verify each file's provenance and license; a source catalog or fetch command is not a blanket grant |

## Optional research scoring

The TRIBE v2-related documentation refers to an optional research model. The model weights, upstream runtime, and analyser web app are not bundled and are not installed automatically by this kit. There is no promised one-click download or verified scoring service.

Prior source notes identify non-commercial restrictions. Verify the exact current model/code license directly with the upstream source before obtaining or using it; do not assume that evaluating monetized or client content is permitted merely because no separate scoring fee is charged. Keep any required attribution. The kit does not sublicense weights or provide commercial permission.

Research-model outputs are experimental signals, not guarantees of human attention, virality, retention, or revenue. This kit is not affiliated with or endorsed by the model provider.

## Reference media are omitted

Third-party reference footage, reference thumbnail images, and reference plates are omitted from this delivery. Written notes may describe or link to other creators' examples; those descriptions neither include the files nor grant permission to copy, publish, or redistribute them.

Add your own owned or appropriately licensed files. Keep a record of the source, license/permission, and allowed use. See `references/ADD-YOUR-OWN-LICENSED-MEDIA.md`. The separate YouTube CTR Arena should be reviewed under its own delivery and licensing terms; this notice makes no inventory claim about it.

The shotcraft sound-effect and music collection is also not bundled. Its optional `shotcraft/fetch-audio.cjs` downloader displays source/attribution information. Review that information and resolve uncertain provenance before downloading or using audio; a working downloader is not permission to redistribute an asset pack.

## Generated work and redistribution

Before publishing an output, confirm rights to inputs, reference voices, music, fonts, likenesses, and provider-generated material. Review application/model licenses and any client restrictions independently of the kit's source-code license.

When rebranding or sharing the source package, preserve third-party licenses, notices, modification disclosures, and these delivery boundaries. Do not represent omitted media, optional environments, separately licensed models, or hosted services as bundled assets or free entitlements.
