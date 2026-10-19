---
name: davinci-resolve
description: >
  Edit a LIVE, already-open DaVinci Resolve timeline directly from Claude Code — insert
  clips, leave gaps/empty space, cut/delete items, add markers, move the playhead, read
  the timeline. Use whenever the user wants to change the Resolve timeline ("add a gap after
  clip 3", "drop the b-roll at 00:14", "cut that clip", "what's on my timeline", "mark the
  hook", "check the panel"), or mentions DaVinci Resolve editing. Connects directly via the
  scripting API — no daemon, no watchdog.
---

# DaVinci Resolve — live timeline editing

Edit your **currently-open** Resolve timeline in near-real-time. A short Python call
connects to the running Resolve, does one operation, and exits (~1s) — the change appears
in Resolve immediately. There is **no background service**; you are the assistant acting
directly, one op per instruction.

## The two ways the user gives instructions
1. **Directly in Claude Code chat** — he tells you what to do; you run the CLI.
2. **From the in-Resolve panel** — a little UIManager window inside Resolve where he types
   an instruction and clicks *Send to Claude*. When he says **"check the panel"** (or runs
   `/resolve-edit`), read the inbox and act, then push a reply he sees on *Refresh*.

## First move, every time
Before editing, **read state** so frame math is correct:
```
py resolve/resolve_ctl.py status            # is Resolve reachable? project/timeline/fps
py resolve/resolve_ctl.py timeline_state    # tracks, items (name/start/end/duration frames), playhead
py resolve/resolve_ctl.py list_media        # media-pool items with the index/name you place by
```
Run from the extracted kit root. Use the `py` launcher (64-bit);
`python` may segfault on interpreter shutdown *after* printing valid output — harmless, but
`py` is clean. All commands print `{success, message, data}`.

## The frame model (get this right)
- Everything is **frames** at the timeline's fps (read `fps` from `status`/`timeline_state`).
- A timeline usually **starts at a large frame** (e.g. `start_frame: 216000` = 01:00:00:00 at
  59.94). Item `start`/`end` in `timeline_state` are **absolute** frames.
- `append_clip` accepts `record_frame` (absolute), or the conveniences `record_seconds`
  (from timeline start) and `record_timecode` (HH:MM:SS:FF). Setting a record point **past
  the last clip leaves a gap/empty space** before the new clip — this is the core primitive.
- To place "2 seconds after clip N", read clip N's `end`, add `2 * fps`, pass as `record_frame`.

## Intent → command cheat-sheet
| The user says | You run |
|---|---|
| "what's on my timeline" | `timeline_state` |
| "what clips can I use" | `list_media` |
| "put clip X at 14s / 00:00:14:00" | `append_clip --arg media_name=X --arg record_seconds=14` |
| "drop media #2 on video track 2 at frame F" | `append_clip --arg media_index=2 --arg record_frame=F --arg track_index=2` |
| "leave a gap then add X after the last clip" | read last `end` → `append_clip --arg media_name=X --arg record_frame=<end+gap>` |
| "add a video/audio track" | `add_track --arg track_type=video` |
| "delete the 3rd clip on video 1" | `delete_item --arg track_index=1 --arg item_index=2` |
| "…and close the gap" | add `--arg ripple=true` |
| "clear video track 2" | `delete_item --arg track_index=2` (omit item_index) |
| "mark the hook at 5s green" | `add_marker --arg timecode=00:00:05:00 --arg color=Green --arg name=hook` |
| "jump the playhead to 00:00:10:00" | `set_playhead --arg timecode=00:00:10:00` |
| anything not wrapped | `raw --arg "expr=timeline.GetTrackCount('video')"` (read/traverse only) |

`item_index` is **0-based** in track order. `--arg` values auto-type (numbers/bools/JSON);
use `--json '{...}'` for complex payloads.

## "check the panel" flow
```
py resolve/resolve_ctl.py inbox                       # prints + marks-read the panel's instructions
# → interpret each instruction, run the matching op(s) above
py resolve/resolve_ctl.py reply "Done — <what you did>"   # panel shows this on Refresh
```

## Preconditions & failure modes
- Resolve must be **open** with **External scripting = Local** (Preferences → System → General).
- `status` returns `connected:false` with a reason → surface it; don't retry blindly.
- "No timeline is open" → ask you to open one.
- Media not found → run `list_media`, place by the index/name it shows.
- `append_clip` returns nothing → `record_frame` is before timeline start, or clip in/out invalid.

## What this can and cannot do (be honest)
- **Solid:** append/place at record frame (gaps), add/clear tracks, delete items (with ripple),
  markers, playhead, full read-back. Verified live.
- **Not directly supported by Resolve's API:** moving an existing item to a new frame, or
  ripple-*inserting* empty space between two existing clips. Do those by delete + re-append,
  and tell you that's what you're doing. Don't claim a move you can't make.

## Setup / reference
- `references/resolve-api-cheatsheet.md` — the DaVinciResolveScript object model used here.
- `references/timecode.md` — frame math, gap/ripple recipes.
- Full setup + the in-Resolve panel install: `resolve/README.md`.
- Never leave test artifacts (markers, clips) on your real timeline — clean up after a probe.
