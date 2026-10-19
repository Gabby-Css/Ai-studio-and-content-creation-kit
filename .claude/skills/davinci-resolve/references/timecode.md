# Frame math & recipes

Read `fps` from `status`/`timeline_state` first. Common project rates: 23.976, 24, 25,
29.97, 30, 59.94, 60. A "2 second gap" = `round(2 * fps)` frames.

## Timecode ↔ frames
```
frames = ((HH*3600 + MM*60 + SS) * fps) + FF
```
`resolve_lib.tc_to_frames(tc, fps)` and `secs_to_frames(sec, fps)` do this. `append_clip`
also accepts `record_seconds` / `record_timecode` and converts internally
(`record_seconds` is measured **from the timeline start frame**).

## Absolute vs relative (the thing that bites)
- TimelineItem `start`/`end` (from `timeline_state`) are **absolute** timeline frames — a
  timeline starting at 01:00:00:00 @ 59.94 has `start_frame = 216000`.
- `append_clip record_frame` is **absolute** too — pass an item's `end` directly to butt a
  clip against it, or `end + gap` to leave empty space.
- `add_marker frame` is **timeline-relative** (0 = first frame). To mark at an absolute
  frame `A`, pass `A - start_frame`. (`add_marker` also accepts `timecode`.)

## Recipes
**Gap then clip, after the last clip on V1**
```
timeline_state            # note last item's `end` (E) and `fps`
append_clip --arg media_name=<X> --arg record_frame=<E + round(2*fps)>   # 2s gap before X
```

**Place b-roll at 14s on video track 2**
```
append_clip --arg media_name=broll --arg record_seconds=14 --arg track_index=2
```

**Delete clip #3 on V1 and close the gap**
```
delete_item --arg track_index=1 --arg item_index=2 --arg ripple=true
```

**"Move" clip #3 to frame F** (API has no move — delete + re-append)
```
# read clip #3's source name/in-out from timeline_state, then:
delete_item --arg track_index=1 --arg item_index=2
append_clip --arg media_name=<that clip> --arg record_frame=F [--arg start_frame=.. --arg end_frame=..]
# tell you you did this as delete+re-add
```

**Mark the hook green at 5s**
```
add_marker --arg timecode=00:00:05:00 --arg color=Green --arg name=hook
```

Marker colors: Blue, Cyan, Green, Yellow, Red, Pink, Purple, Fuchsia, Rose, Lavender, Sky,
Mint, Lemon, Sand, Cocoa, Cream.
