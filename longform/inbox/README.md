# Long-form input folder

Place source media here, then pass the chosen file to the dissection command. The script does not
send the file to a remote service by itself, but transcription and other tools you configure may
have their own data-handling behavior.

```text
longform/inbox/
  my-video.mp4
```

From the extracted kit root:

```bash
node longform/bin/lf-dissect.cjs longform/inbox/my-video.mp4
```

The command requires the dependencies documented in the kit's setup guide. It probes the source,
extracts audio when present, performs the configured transcription and analysis stages, and writes
artifacts under `longform/work/<slug>/`. Cached stages are reused unless `--force` is supplied.

Accepted inputs depend on the installed FFmpeg build; common examples include `.mp4`, `.mov`,
`.mkv`, `.webm`, `.m4a`, and `.wav`. Runtime, memory, and disk use grow with source length and
resolution, so test a short file first.

Source files are opened for reading; generated artifacts go to `longform/work/` and
`longform/output/`. Keep backups and inspect the edit plan before rendering.

For optional thumbnail identity references, create a separate folder and pass it explicitly:

```bash
node longform/bin/lf-thumbs.cjs <slug> --faces longform/inbox/face-references
```

Use only images you have permission to process. Do not distribute those reference images with the
kit.
