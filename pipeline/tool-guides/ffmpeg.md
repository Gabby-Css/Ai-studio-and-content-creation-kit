# ffmpeg — assembly and media inspection

ffmpeg encodes frames, combines clips, mixes narration, burns captions, and extracts preview frames. ffprobe reports media metadata. Install a suitable build separately and make both executables available on PATH; this package does not provide an installed shared tools directory.

From your shell, confirm the selected installation:

```bash
ffmpeg -version
ffprobe -version
```

The renderers and assemblers invoke these tools with their own filters. Verify that your build includes the codecs and filters the workflow needs. Review licensing for the actual build and its dependencies; see `LICENSES.md`.

## Caption-path caution

Filtergraph syntax has its own escaping rules. Windows drive-letter colons and other special characters can need escaping beyond shell quoting. A simple relative font path in a known working directory can reduce that ambiguity. Keep the font accessible and licensed, and inspect the rendered caption placement and text; no path convention guarantees every filtergraph will succeed.

After following `longform/docs/README.md` or the motion-rendering guide, inspect a short export before rendering the full project. Results depend on input formats, fonts, filters, dependencies, and available compute.
