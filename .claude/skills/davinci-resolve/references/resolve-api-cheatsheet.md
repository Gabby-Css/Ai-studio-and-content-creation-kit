# DaVinciResolveScript — object model used by the bridge

Access chain (what `resolve_lib.py::context()` returns):
```
resolve  = bmd.scriptapp("Resolve")
pm       = resolve.GetProjectManager()
project  = pm.GetCurrentProject()
timeline = project.GetCurrentTimeline()
mp       = project.GetMediaPool()
```

## Resolve
- `GetProductName()` → "DaVinci Resolve" / "DaVinci Resolve Studio"
- `GetVersionString()` → e.g. "20.2.1.6"
- `GetProjectManager()`, `Fusion()` (UIManager lives on the Fusion object)

## Project
- `GetName()`
- `GetCurrentTimeline()`, `GetMediaPool()`
- `GetSetting('timelineFrameRate' | 'timelineResolutionWidth' | 'timelineResolutionHeight')`

## Timeline (read)
- `GetName()`, `GetStartFrame()`, `GetEndFrame()`, `GetCurrentTimecode()`
- `GetTrackCount('video'|'audio'|'subtitle')`
- `GetTrackName(trackType, index)` (1-based index)
- `GetItemListInTrack(trackType, index)` → list of TimelineItem
- `GetMarkers()` → `{ frame: {color,duration,note,name,customData} }`

## Timeline (write)
- `AddTrack('video'|'audio'|'subtitle')`
- `DeleteClips([TimelineItem], rippleDelete=bool)`  (Resolve 18.1+)
- `AddMarker(frameId, color, name, note, duration, customData)` — `frameId` is relative to
  timeline start (frame 0 = first frame), NOT the absolute record frame
- `DeleteMarkerAtFrame(frameId)`
- `SetCurrentTimecode('HH:MM:SS:FF')`

## TimelineItem
- `GetName()`, `GetStart()`, `GetEnd()`, `GetDuration()` — all **absolute** timeline frames
- `GetLeftOffset()`, `GetRightOffset()` — source in/out relative offsets
- `SetProperty(key, value)` (Pan/Tilt/ZoomX/… for transforms)

## MediaPool
- `GetRootFolder()` → Folder
- `AppendToTimeline([clipInfo])` — clipInfo dict:
  ```
  { "mediaPoolItem": item,      # required
    "startFrame": int,          # source in
    "endFrame":   int,          # source out
    "recordFrame":int,          # ABSOLUTE timeline frame to drop at (gap before = empty space)
    "trackIndex": int,          # 1-based target track
    "mediaType":  1|2 }         # 1=video only, 2=audio only
  ```

## Folder
- `GetName()`, `GetClipList()` → [MediaPoolItem], `GetSubFolderList()` → [Folder]

## MediaPoolItem
- `GetName()`
- `GetClipProperty('Duration'|'FPS'|'Type'|...)`

## Notes / gotchas
- The API is strong for **building** (AppendToTimeline) and **reading**; it does **not** expose
  moving an existing item to a new frame or inserting a ripple-gap between existing clips —
  emulate with delete + re-append.
- Frame conventions differ by call: TimelineItem frames are absolute; `AddMarker` frameId is
  timeline-relative. Read state first, compute deliberately.
- Free Resolve supports these timeline ops; a handful of finishing/render calls are Studio-only.
