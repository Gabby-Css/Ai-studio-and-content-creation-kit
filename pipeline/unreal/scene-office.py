# @Description Step 3: dark-room cinematic lighting (screen-glow key + warm fill + fog + grade), editor-viewport lit capture.
import unreal, json
def P(*a): unreal.log("[v3] " + " ".join(str(x) for x in a))
eas = unreal.get_editor_subsystem(unreal.EditorActorSubsystem)
les = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
ues = unreal.get_editor_subsystem(unreal.UnrealEditorSubsystem)
mel = unreal.MaterialEditingLibrary
OUT = "./output"
res = {}

try: les.eject_pilot_level_actor()
except: pass
try: les.editor_request_end_play()
except: pass
for a in list(eas.get_all_level_actors()):
    try: eas.destroy_actor(a)
    except: pass

# ---- dark floor material ----
def dark_mat(name, rgb, rough=0.6):
    path = "/Game/SceneMats/" + name
    if unreal.EditorAssetLibrary.does_asset_exist(path): unreal.EditorAssetLibrary.delete_asset(path)
    m = unreal.AssetToolsHelpers.get_asset_tools().create_asset(name, "/Game/SceneMats", unreal.Material, unreal.MaterialFactoryNew())
    bc = mel.create_material_expression(m, unreal.MaterialExpressionConstant3Vector, -400, 0)
    bc.set_editor_property("constant", unreal.LinearColor(*rgb, 1.0)); mel.connect_material_property(bc, "", unreal.MaterialProperty.MP_BASE_COLOR)
    rr = mel.create_material_expression(m, unreal.MaterialExpressionConstant, -400, 200)
    rr.set_editor_property("r", rough); mel.connect_material_property(rr, "", unreal.MaterialProperty.MP_ROUGHNESS)
    mel.recompile_material(m); return m
M_FLOOR = dark_mat("M_FloorDark", (0.02, 0.02, 0.025), 0.5)
M_WALL  = dark_mat("M_WallDark", (0.015, 0.016, 0.02), 0.85)

def find_mesh(folder):
    for p in unreal.EditorAssetLibrary.list_assets(folder, True, False):
        a = unreal.EditorAssetLibrary.load_asset(p)
        if isinstance(a, unreal.StaticMesh): return a
    return None
def bnd(a):
    o, e = a.get_actor_bounds(False); return o, e
def rest_on(a, surf, dx=0.0, dy=0.0):
    o, e = bnd(a); loc = a.get_actor_location()
    loc.x += dx; loc.y += dy; loc.z += (surf - (o.z - e.z))
    a.set_actor_location(loc, False, False)
    o2, e2 = bnd(a); return o2.z + e2.z
def add(folder, target, axis, label):
    m = find_mesh(folder)
    if not m: return None
    a = eas.spawn_actor_from_object(m, unreal.Vector(0,0,0), unreal.Rotator(0,0,0)); a.set_actor_label(label)
    o, e = bnd(a); cur = (2*max(e.x, e.y)) if axis == "w" else (2*e.z)
    s = target / cur if cur > 0.01 else 1.0
    a.set_actor_scale3d(unreal.Vector(s, s, s)); return a

# floor + back wall (dark room)
floor = eas.spawn_actor_from_object(unreal.EditorAssetLibrary.load_asset("/Engine/BasicShapes/Plane"), unreal.Vector(0,0,0), unreal.Rotator(0,0,0))
floor.set_actor_scale3d(unreal.Vector(40,40,1)); floor.set_actor_label("Floor")
floor.get_component_by_class(unreal.StaticMeshComponent).set_material(0, M_FLOOR)
wall = eas.spawn_actor_from_object(unreal.EditorAssetLibrary.load_asset("/Engine/BasicShapes/Plane"), unreal.Vector(140,0,150), unreal.Rotator(0,90,0))
wall.set_actor_scale3d(unreal.Vector(8,8,1)); wall.set_actor_label("BackWall")
wall.get_component_by_class(unreal.StaticMeshComponent).set_material(0, M_WALL)

# table scaled by HEIGHT (~75cm) so proportions read as a table
table = add("/Game/PolyHaven/WoodenTable_02", 75.0, "h", "Table")
desk_top = rest_on(table, 0.0)
res["desk_top"] = round(desk_top, 1)

laptop = add("/Game/PolyHaven/classic_laptop", 34.0, "w", "Laptop")
laptop.set_actor_rotation(unreal.Rotator(0,0,200), False)
rest_on(laptop, desk_top, 0, 6)

chair = add("/Game/PolyHaven/WoodenChair_01", 92.0, "h", "Chair")
chair.set_actor_rotation(unreal.Rotator(0,0,10), False)
rest_on(chair, 0.0, -62, 4)

# ---- lighting: screen-glow key + warm fill, dark ambient ----
scr_z = desk_top + 14
# cool screen-glow RectLight just above the laptop, facing the chair/viewer
rect = eas.spawn_actor_from_class(unreal.RectLight, unreal.Vector(2, 2, scr_z))
rect.set_actor_rotation(unreal.Rotator(-18, 195, 0), False)
rc = rect.get_component_by_class(unreal.RectLightComponent)
rc.set_intensity(28.0); rc.set_light_color(unreal.LinearColor(0.62, 0.78, 1.0, 1.0))
try: rc.set_editor_property("source_width", 30.0); rc.set_editor_property("source_height", 20.0); rc.set_editor_property("attenuation_radius", 320.0)
except Exception as e: P("rect", e)
res["screen_key"] = round(scr_z, 1)

# warm practical fill (off-frame lamp), upper-left behind
warm = eas.spawn_actor_from_class(unreal.PointLight, unreal.Vector(-70, 95, desk_top + 70))
wc = warm.get_component_by_class(unreal.PointLightComponent)
wc.set_intensity(2200.0); wc.set_light_color(unreal.LinearColor(1.0, 0.66, 0.36, 1.0))
try: wc.set_editor_property("attenuation_radius", 520.0); wc.set_editor_property("source_radius", 6.0)
except: pass

# cool rim from behind-right
rim = eas.spawn_actor_from_class(unreal.SpotLight, unreal.Vector(120, -120, desk_top + 120))
rim.set_actor_rotation(unreal.Rotator(-40, 200, 0), False)
rmc = rim.get_component_by_class(unreal.SpotLightComponent)
rmc.set_intensity(1400.0); rmc.set_light_color(unreal.LinearColor(0.5, 0.7, 1.0, 1.0))

# very dim cool ambient so shadows aren't pure black
sky = eas.spawn_actor_from_class(unreal.SkyLight, unreal.Vector(0,0,180))
try:
    sc = sky.get_component_by_class(unreal.SkyLightComponent); sc.set_intensity(0.08)
    sc.set_light_color(unreal.LinearColor(0.5, 0.62, 0.85, 1.0))
except Exception as e: P("sky", e)

# atmosphere
fog = eas.spawn_actor_from_class(unreal.ExponentialHeightFog, unreal.Vector(0,0,20))
fc = fog.get_component_by_class(unreal.ExponentialHeightFogComponent)
for k, v in [("fog_density", 0.06), ("fog_height_falloff", 0.5), ("volumetric_fog", True), ("volumetric_fog_extinction_scale", 1.2)]:
    try: fc.set_editor_property(k, v)
    except Exception as e: P("fog", k, e)
try: fc.set_editor_property("fog_inscattering_color", unreal.LinearColor(0.03, 0.05, 0.09, 1.0))
except: pass

# post-process (unbound): bloom + vignette + grain + cool grade
pp = eas.spawn_actor_from_class(unreal.PostProcessVolume, unreal.Vector(0,0,90))
pp.set_editor_property("unbound", True)
s = pp.get_editor_property("settings")
def setpp(f, v):
    try: s.set_editor_property(f, v); s.set_editor_property("override_" + f, True)
    except Exception as e: P("pp", f, e)
setpp("bloom_intensity", 0.55); setpp("vignette_intensity", 0.5); setpp("film_grain_intensity", 0.28)
try:
    s.set_editor_property("color_saturation", unreal.Vector4(0.96, 0.96, 1.04, 1.0)); s.set_editor_property("override_color_saturation", True)
    s.set_editor_property("color_contrast", unreal.Vector4(1.06, 1.06, 1.08, 1.0)); s.set_editor_property("override_color_contrast", True)
except Exception as e: P("grade", e)
pp.set_editor_property("settings", s)

# ---- editor-viewport framing (reliable; cine cam + MRQ for the final) ----
target = unreal.Vector(0, 4, desk_top + 8)
eye = unreal.Vector(118, -86, desk_top + 30)
rot = unreal.MathLibrary.find_look_at_rotation(eye, target)
ues.set_level_viewport_camera_info(eye, rot)
res["cam"] = {"eye": [round(eye.x), round(eye.y), round(eye.z)], "rot": [round(rot.pitch,1), round(rot.yaw,1)]}
for cmd in ["ShowFlag.BillboardSprites 0","ShowFlag.Grid 0","ShowFlag.Cameras 0","ShowFlag.Helpers 0","ShowFlag.Sprites 0","ShowFlag.GameView 1","ShowFlag.Lighting 1"]:
    try: unreal.SystemLibrary.execute_console_command(None, cmd)
    except: pass

json.dump(res, open(OUT,"w"), indent=2)
P("DONE", json.dumps(res))
