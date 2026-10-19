#!/usr/bin/env node
/**
 * asset-library.cjs — manage the kit's optional reference-asset library.
 *
 * One home: assets/library/ (categorized). Fetch commands make live network requests and should be
 * used only after checking the source's current license, attribution rules, and trademark guidance.
 *
 * Sources represented by the fetchers include Simple Icons, Iconify, and Twemoji. Their licenses
 * and the rights attached to individual marks are not interchangeable; verify each asset.
 *
 * Usage:
 *   node pipeline/bin/asset-library.cjs scan                      # rebuild INDEX.json from disk
 *   node pipeline/bin/asset-library.cjs stats                     # size + per-category inventory
 *   node pipeline/bin/asset-library.cjs get <id|name>             # print path (for comps to resolve)
 *   node pipeline/bin/asset-library.cjs fetch-logo <slug> [--color HEX] [--png 256]
 *   node pipeline/bin/asset-library.cjs fetch-icon <prefix:name>  [--png 256]
 *   node pipeline/bin/asset-library.cjs fetch-emoji <hexcode>     # e.g. 1f4b0 (money bag)
 *   node pipeline/bin/asset-library.cjs seed                      # pull the common studio starter set
 *
 * SVG is preferred (vector, crisp at any scale — the reference look). --png N
 * also rasterizes to N px wide if rsvg-convert / magick / node canvas is present.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join((process.env.STUDIO_ROOT || path.resolve(__dirname, '..', '..')), 'assets/library');
const INDEX = path.join(ROOT, "INDEX.json");

const CATS = {
  "logos-brands": "social / company brand logos",
  "logos-ai": "AI-tool logos (Claude, GPT, etc.)",
  "icons-line": "UI / neon / line icons",
  "icons-3d": "3D rendered icons",
  "textures": "grain, grunge, paper, noise",
  "gradients": "gradient meshes / blobs",
  "backgrounds": "full-frame backdrops",
  "overlays-fx": "light leaks, particles, dust (see assets/motion arsenal)",
  "shapes": "geometric shapes, arrows, frames",
  "emoji-3d": "emoji glyphs",
  "stock-photos": "stock photography / b-roll stills",
  "device-mockups": "phone / laptop frames",
  "fonts": "typefaces",
  "brand-custom": "recipient-supplied brand marks",
  "misc": "uncategorized",
};

const sh = (cmd, args) => execFileSync(cmd, args, { encoding: "buffer", stdio: ["ignore", "pipe", "pipe"] });
const has = (bin) => { try { execFileSync(bin, ["--version"], { stdio: "ignore" }); return true; } catch { return false; } };
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function curl(url) {
  // -L follow redirects, -f fail on http error, -s silent, 20s cap
  return sh("curl", ["-fsSL", "--max-time", "20", "-A", "Mozilla/5.0 (asset-library)", url]);
}

function ensureCat(cat) {
  if (!CATS[cat]) cat = "misc";
  const d = path.join(ROOT, cat);
  fs.mkdirSync(d, { recursive: true });
  return d;
}

const SHARP_DIR = 'sharp';
const hasSharp = (() => { try { require.resolve(SHARP_DIR); return true; } catch { return false; } })();
function rasterize(svgPath, pngPath, width) {
  // synchronous only — register() stats the PNG immediately after.
  // NOTE: bare `convert` on Windows is the disk-converter, NOT ImageMagick — never use it.
  if (has("rsvg-convert")) { sh("rsvg-convert", ["-w", String(width), svgPath, "-o", pngPath]); return true; }
  if (has("magick")) { sh("magick", ["-background", "none", "-density", "300", svgPath, "-resize", `${width}x`, pngPath]); return true; }
  if (hasSharp) {
    // run sharp in a child node so the parent stays synchronous
    const code = `const s=require(${JSON.stringify(SHARP_DIR)});s(require('fs').readFileSync(${JSON.stringify(svgPath)}),{density:300}).resize({width:${width}}).png().toFile(${JSON.stringify(pngPath)}).then(()=>process.exit(0)).catch(e=>{console.error(e.message);process.exit(1)});`;
    execFileSync(process.execPath, ["-e", code], { stdio: ["ignore", "ignore", "pipe"] });
    return fs.existsSync(pngPath);
  }
  if (has("inkscape")) { sh("inkscape", [svgPath, "-w", String(width), "-o", pngPath]); return true; }
  return false;
}

// ── manifest ───────────────────────────────────────────────────────────────
function loadIndex() {
  if (!fs.existsSync(INDEX)) return { updated: null, assets: [] };
  try { return JSON.parse(fs.readFileSync(INDEX, "utf-8")); } catch { return { updated: null, assets: [] }; }
}
function saveIndex(ix) { fs.writeFileSync(INDEX, JSON.stringify(ix, null, 2), "utf-8"); }

function scan() {
  const previous = loadIndex();
  const metadataByRel = new Map((previous.assets || []).map((asset) => [asset.rel, asset]));
  const assets = [];
  for (const cat of Object.keys(CATS)) {
    const d = path.join(ROOT, cat);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      const st = fs.statSync(p);
      if (!st.isFile() || f.startsWith(".")) continue;
      const ext = path.extname(f).slice(1).toLowerCase();
      const rel = `${cat}/${f}`;
      const prior = metadataByRel.get(rel) || {};
      assets.push({
        id: `${cat}/${path.basename(f, path.extname(f))}`,
        name: path.basename(f, path.extname(f)), category: cat, ext, rel,
        path: path.join(ROOT, rel), bytes: st.size,
        ...(prior.source ? { source: prior.source } : {}),
        ...(prior.license ? { license: prior.license } : {}),
        tags: slugify(path.basename(f, path.extname(f))).split("-").filter(Boolean),
      });
    }
  }
  const ix = previous;
  ix.updated = new Date().toISOString();
  delete ix.goalBytes;
  ix.assets = assets;
  saveIndex(ix);
  return ix;
}

function register(cat, file, source, license, tags) {
  const ix = loadIndex();
  const rel = `${cat}/${path.basename(file)}`;
  const st = fs.statSync(file);
  const id = `${cat}/${path.basename(file, path.extname(file))}`;
  ix.assets = (ix.assets || []).filter((a) => a.id !== id);
  ix.assets.push({
    id, name: path.basename(file, path.extname(file)), category: cat,
    ext: path.extname(file).slice(1).toLowerCase(), rel,
    path: path.join(ROOT, rel),
    bytes: st.size, source, license, tags: tags || [],
  });
  ix.updated = new Date().toISOString();
  saveIndex(ix);
  return id;
}

// ── fetchers ─────────────────────────────────────────────────────────────
function fetchLogo(slug, { color, png, ai } = {}) {
  slug = slugify(slug);
  const cat = ai ? "logos-ai" : "logos-brands";
  const dir = ensureCat(cat);
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
  let svg;
  try { svg = curl(url); } catch { throw new Error(`no Simple Icons logo "${slug}" (try the exact brand slug, e.g. tiktok, openai, youtube)`); }
  let out = svg.toString("utf-8");
  if (color) out = out.replace("<svg ", `<svg fill="#${color.replace('#','')}" `);
  const svgPath = path.join(dir, `${slug}.svg`);
  fs.writeFileSync(svgPath, out, "utf-8");
  const id = register(cat, svgPath, "simple-icons", "CC0-1.0", [slug, "logo", "brand"]);
  let pngPath = null;
  if (png) { pngPath = path.join(dir, `${slug}.png`); if (rasterize(svgPath, pngPath, png)) register(cat, pngPath, "simple-icons", "CC0-1.0", [slug, "logo", "png"]); else pngPath = "(no rasterizer: install rsvg-convert or magick)"; }
  return { id, svg: svgPath, png: pngPath };
}

function fetchIcon(ref, { png } = {}) {
  // ref = "prefix:name", e.g. "lucide:instagram", "mdi:robot"
  const [prefix, name] = ref.includes(":") ? ref.split(":") : ["lucide", ref];
  const dir = ensureCat("icons-line");
  const url = `https://api.iconify.design/${prefix}/${name}.svg`;
  let svg;
  try { svg = curl(url); } catch { throw new Error(`no Iconify icon "${prefix}:${name}"`); }
  if (svg.toString("utf-8").trim() === "404" || svg.length < 40) throw new Error(`Iconify returned empty for "${prefix}:${name}"`);
  const base = `${prefix}-${name}`;
  const svgPath = path.join(dir, `${base}.svg`);
  fs.writeFileSync(svgPath, svg);
  const id = register("icons-line", svgPath, `iconify:${prefix}`, "OFL/MIT (per set)", [prefix, name, "icon"]);
  let pngPath = null;
  if (png) { pngPath = path.join(dir, `${base}.png`); if (rasterize(svgPath, pngPath, png)) register("icons-line", pngPath, `iconify:${prefix}`, "OFL/MIT", [prefix, name, "png"]); else pngPath = "(no rasterizer)"; }
  return { id, svg: svgPath, png: pngPath };
}

function fetchEmoji(hex) {
  hex = hex.toLowerCase().replace(/^u\+/, "");
  const dir = ensureCat("emoji-3d");
  const url = `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/72x72/${hex}.png`;
  let png;
  try { png = curl(url); } catch { throw new Error(`no Twemoji for codepoint "${hex}"`); }
  const p = path.join(dir, `emoji-${hex}.png`);
  fs.writeFileSync(p, png);
  return { id: register("emoji-3d", p, "twemoji", "CC-BY-4.0", ["emoji", hex]) };
}

// Optional starter set. This performs live downloads and may require license/brand review.
const SEED_LOGOS = ["instagram", "tiktok", "facebook", "snapchat", "youtube", "x", "linkedin", "threads", "whatsapp", "telegram", "pinterest", "reddit"];
const SEED_AI = ["openai", "anthropic", "google", "perplexity", "midjourney", "runway", "elevenlabs", "notion", "canva", "figma", "capcut", "adobe"];
const SEED_ICONS = ["lucide:folder", "lucide:folder-open", "lucide:scissors", "lucide:zap", "lucide:rocket", "lucide:trending-up", "lucide:dollar-sign", "lucide:play", "lucide:upload", "lucide:check-circle", "lucide:sparkles", "lucide:bot", "lucide:calendar-clock", "lucide:repeat", "lucide:layers", "lucide:wand-2"];
const SEED_EMOJI = ["1f4b0", "1f680", "1f525", "26a1", "1f4c8", "2705", "1f929", "1f4f1"]; // money rocket fire zap chart check star-eyes phone

function seed() {
  const done = [], fail = [];
  const run = (label, fn) => { try { fn(); done.push(label); process.stdout.write("."); } catch (e) { fail.push(`${label}: ${e.message}`); process.stdout.write("x"); } };
  for (const s of SEED_LOGOS) run(`logo:${s}`, () => fetchLogo(s, { png: 256 }));
  for (const s of SEED_AI) run(`ai:${s}`, () => fetchLogo(s, { ai: true, png: 256 }));
  for (const s of SEED_ICONS) run(`icon:${s}`, () => fetchIcon(s, { png: 256 }));
  for (const s of SEED_EMOJI) run(`emoji:${s}`, () => fetchEmoji(s));
  process.stdout.write("\n");
  scan();
  console.log(`seeded ${done.length} · failed ${fail.length}`);
  if (fail.length) console.log(fail.slice(0, 8).join("\n"));
}

function stats() {
  const ix = scan();
  const byCat = {};
  let total = 0;
  for (const a of ix.assets) { byCat[a.category] = byCat[a.category] || { n: 0, b: 0 }; byCat[a.category].n++; byCat[a.category].b += a.bytes; total += a.bytes; }
  const GB = (b) => (b / 1073741824).toFixed(3) + " GB";
  const MB = (b) => (b / 1048576).toFixed(1) + " MB";
  console.log(`ASSET LIBRARY — ${ROOT}`);
  console.log(`  ${ix.assets.length} files · ${MB(total)}`);
  for (const c of Object.keys(CATS)) { const s = byCat[c]; if (s) console.log(`  ${c.padEnd(16)} ${String(s.n).padStart(5)}  ${MB(s.b)}`); }
}

function get(q) {
  const ix = loadIndex();
  const hit = ix.assets.find((a) => a.id === q || a.name === q || a.rel === q) ||
              ix.assets.find((a) => a.tags && a.tags.includes(slugify(q)));
  if (!hit) { console.error(`not in library: "${q}" — fetch it: node pipeline/bin/asset-library.cjs fetch-logo ${slugify(q)}`); process.exit(2); }
  console.log(path.join(ROOT, hit.rel));
}

// ── cli ──────────────────────────────────────────────────────────────────
const [cmd, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i >= 0 ? rest[i + 1] : d; };
try {
  fs.mkdirSync(ROOT, { recursive: true });
  if (cmd === "scan") { const ix = scan(); console.log(`indexed ${ix.assets.length} assets`); }
  else if (cmd === "stats" || !cmd) stats();
  else if (cmd === "get") get(rest[0]);
  else if (cmd === "fetch-logo") console.log(JSON.stringify(fetchLogo(rest[0], { color: flag("color"), png: flag("png") && +flag("png"), ai: rest.includes("--ai") }), null, 2));
  else if (cmd === "fetch-icon") console.log(JSON.stringify(fetchIcon(rest[0], { png: flag("png") && +flag("png") }), null, 2));
  else if (cmd === "fetch-emoji") console.log(JSON.stringify(fetchEmoji(rest[0]), null, 2));
  else if (cmd === "seed") seed();
  else { console.error("commands: scan | stats | get <id> | fetch-logo <slug> [--ai] [--color HEX] [--png N] | fetch-icon <prefix:name> [--png N] | fetch-emoji <hex> | seed"); process.exit(1); }
} catch (e) { console.error("asset-library:", e.message); process.exit(1); }
