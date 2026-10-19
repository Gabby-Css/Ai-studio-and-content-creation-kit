# DaVinci Resolve bridge

The included CLI and panel sources can control a separately installed, already-running DaVinci Resolve through its scripting API. No Resolve application, menu loader, running watcher, or agent account is installed by extracting this kit. Availability depends on your Resolve edition/version, platform, scripting settings, and Python environment.

## Files

| File | Role |
|---|---|
| `resolve/resolve_lib.py` | Connection and timeline operations |
| `resolve/resolve_ctl.py` | CLI returning operation results as JSON |
| `resolve/resolve_claude_panel.py` | Optional in-Resolve instruction/reply panel |
| `resolve/resolve-mcp.cjs` | Optional agent bridge source |
| `resolve/sc_cut.sh` | Three-stage, dry-run-first silence classifier and optional ripple-delete helper |

## Recipient setup

1. Install a compatible Resolve edition and Python runtime using their own documentation.
2. Enable external scripting locally if your edition/version supports it, then restart Resolve as required.
3. Check `RESOLVE_SCRIPT_API` and `RESOLVE_SCRIPT_LIB` against your installation. The helper seeds standard Windows locations; override them for another location or platform.
4. Open a test project and timeline. Back up projects before using mutation commands.
5. Run the read-only check below from the extracted kit root. Use `python` instead of the Windows `py` launcher where appropriate.

```bash
py resolve/resolve_ctl.py status
py resolve/resolve_ctl.py timeline_state
py resolve/resolve_ctl.py list_media
```

Inspect the result for a successful connection and the expected project/timeline. Do not treat a historical verification note as evidence that your environment is configured.

## Editing commands

After checking the target state, the CLI supports operations such as:

```bash
py resolve/resolve_ctl.py add_marker --arg timecode=00:00:05:00 --arg color=Green --arg name=hook
py resolve/resolve_ctl.py append_clip --arg media_name=broll --arg record_seconds=14
```

Commands such as `delete_item` modify the live project. Read `.claude/skills/davinci-resolve/SKILL.md` and confirm track/item targets before use. Pass arguments with `--arg key=value` or the CLI's JSON option.

### Optional silence-cut helper

`sc_cut.sh` requires Bash, Python 3, and `ffmpeg` on `PATH`. Set `PYTHON_BIN` or `FFMPEG_BIN`
when either executable has a different name or location; `--ffmpeg=<executable>` overrides the
FFmpeg environment value for one run.

```bash
bash resolve/sc_cut.sh --noise=-30dB --dur=0.6 --frac=0.9
```

That command is a dry run: it extracts Video Track 1 metadata, analyzes the referenced source
files, and writes `resolve/sc_dead_indices.json`. Review that file and the open timeline. Only then
may you add `--apply` to ripple-delete the classified clips from the live timeline:

```bash
bash resolve/sc_cut.sh --noise=-30dB --dur=0.6 --frac=0.9 --apply
```

The classifier removes any old cut list before analysis and writes a new one atomically. A missing
or failed FFmpeg executable, invalid threshold, skipped source, malformed result, or failed Resolve
deletion stops the workflow with a nonzero exit. Back up or duplicate the timeline before `--apply`.

## Optional panel and agent workflow

To use the panel, install/run `resolve/resolve_claude_panel.py` according to the scripting instructions for your Resolve version. No permanent menu loader is already installed. Preserve the original script location or configure `RESOLVE_BRIDGE_MEMORY` consistently for the panel and CLI.

The panel writes instruction/reply JSONL files under the kit's `memory/` by default. It does not autonomously execute requests. An agent can read the inbox and reply when deliberately asked:

```bash
py resolve/resolve_ctl.py inbox
py resolve/resolve_ctl.py reply "Reviewed the requested edit."
```

A hosted agent or remote integration may receive timeline details, instructions, or other supplied context and may charge. Local scripting alone is not a guarantee that an entire agent workflow stays on the machine.

## Limits

Test operations on a duplicate timeline first. Scripting APIs differ by edition/version and may not support moving existing items or ripple-inserting empty space directly. Workarounds can require destructive delete/re-append operations; inspect the implementation and backup before applying them. Connection time and edit latency are not guaranteed.
