# @Description Import staged CC0 Poly Haven assets (glTF props + HDRI) into the project. Kept under 30s.
import unreal, json
def P(*a): unreal.log("[import] " + " ".join(str(x) for x in a))
BASE = "./output"
OUT = BASE + "/_import_result.json"
at = unreal.AssetToolsHelpers.get_asset_tools()
res = {"imported": {}, "errors": []}

def import_one(src, dest):
    try:
        task = unreal.AssetImportTask()
        task.set_editor_property("filename", src)
        task.set_editor_property("destination_path", dest)
        task.set_editor_property("automated", True)
        task.set_editor_property("replace_existing", True)
        task.set_editor_property("save", True)
        at.import_asset_tasks([task])
        return [str(p) for p in task.get_editor_property("imported_object_paths")]
    except Exception as e:
        res["errors"].append(dest + ": " + str(e)); return []

props = [
    ("classic_laptop",   BASE + "/classic_laptop/classic_laptop_2k.gltf"),
    ("desk_lamp_arm_01", BASE + "/desk_lamp_arm_01/desk_lamp_arm_01_2k.gltf"),
    ("WoodenTable_02",   BASE + "/WoodenTable_02/WoodenTable_02_2k.gltf"),
    ("WoodenChair_01",   BASE + "/WoodenChair_01/WoodenChair_01_2k.gltf"),
]
for name, src in props:
    out = import_one(src, "/Game/PolyHaven/" + name)
    res["imported"][name] = out
    P(name, "->", len(out), "objects")

# HDRI (becomes a HDR Texture2D usable for skylight/backdrop)
res["imported"]["HDRI"] = import_one(BASE + "/studio_small_08_2k.hdr", "/Game/PolyHaven/HDRI")
P("HDRI ->", res["imported"]["HDRI"])

with open(OUT, "w") as f: json.dump(res, f, indent=2)
P("DONE wrote", OUT)
