#!/usr/bin/env node
/**
 * lf-thumbs.cjs — optional long-form thumbnail generation helper.
 *
 * The default mode writes a portable plan and performs no provider call. `--run` explicitly enables
 * the configured Higgsfield CLI workflow, which requires a separate installation, authentication,
 * credits, and acceptance of the provider's current terms. Verify command syntax against current
 * provider documentation before a live run.
 *
 * Usage:
 *   node longform/bin/lf-thumbs.cjs <slug> [--faces <dir>] [--run]
 *     [--name <referenceName>] [--jst <model>] [--quality 2k]
 */
"use strict";
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const https = require("https");
const http = require("http");

const A = { _: [] };
for (let i = 2; i < process.argv.length; i++) {
  const key = process.argv[i];
  if (key.startsWith("--")) {
    const name = key.slice(2);
    if (process.argv[i + 1] && !process.argv[i + 1].startsWith("--")) A[name] = process.argv[++i];
    else A[name] = true;
  } else A._.push(key);
}

const slug = A._[0];
if (!slug) {
  console.error("usage: lf-thumbs.cjs <slug> [--faces <dir>] [--run] [--name <referenceName>] [--jst <model>] [--quality 2k]");
  process.exit(1);
}

const ROOT = process.env.STUDIO_ROOT || path.resolve(__dirname, "..", "..");
const STUDIO = path.join(ROOT, "longform");
const workDir = path.join(STUDIO, "work", slug, "thumbnails");
const conceptsPath = path.join(workDir, "concepts.json");
const faceDir = path.resolve(A.faces || path.join(STUDIO, "inbox", "face-references"));
if (!fs.existsSync(conceptsPath)) {
  console.error("no concepts.json at " + conceptsPath);
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(conceptsPath, "utf8"));
if (!Array.isArray(cfg.concepts) || cfg.concepts.length === 0) {
  console.error("concepts.json must contain a non-empty concepts array");
  process.exit(1);
}
const JST = A.jst || "text2image_soul_v2";
const QUALITY = A.quality || "2k";
const AR = cfg.output_ratio || "16:9";
const referenceName = A.name || ("creator-" + slug).slice(0, 40);
const faces = fs.existsSync(faceDir)
  ? fs.readdirSync(faceDir).filter((file) => /\.(jpg|jpeg|png)$/i.test(file)).map((file) => path.join(faceDir, file))
  : [];

const quote = (value) => `"${String(value).replace(/"/g, '\\"')}"`;
const portableFace = (file) => `<FACE_DIR>/${path.basename(file)}`;
const commandText = (args) => args.map((arg) => /\s/.test(arg) ? quote(arg) : arg).join(" ");

function soulArgs({ portable = false } = {}) {
  const images = faces.flatMap((file) => ["--image", portable ? portableFace(file) : file]);
  return ["soul-id", "create", "--name", referenceName, "--soul-2", ...images];
}

function generateArgs(concept, referenceId) {
  return ["generate", "create", JST, "--prompt", concept.prompt, "--soul-id", referenceId,
    "--quality", QUALITY, "--aspect_ratio", AR, "--wait"];
}

const plan = {
  version: 2,
  mode: "plan-only-unless-run-is-supplied",
  provider: "Higgsfield CLI (optional; verify current setup and syntax)",
  slug,
  referenceName,
  model: JST,
  quality: QUALITY,
  aspectRatio: AR,
  faceReferences: faces.map((file) => path.basename(file)),
  setup: "Install and authenticate the provider CLI using its current official documentation before --run.",
  referenceCommand: commandText(["higgsfield", ...soulArgs({ portable: true })]),
  concepts: cfg.concepts.map((concept) => ({
    id: concept.id,
    text: concept.text || "(no text)",
    emotion: concept.emotion || null,
    generateCommand: commandText(["higgsfield", ...generateArgs(concept, "<REFERENCE_ID>")]),
    outputFile: `longform/work/${slug}/thumbnails/${concept.id}.png`,
  })),
  review: [
    "Inspect identity consent, factual claims, hands, faces, logos, lettering, and crop zones.",
    "Treat any automated thumbnail score as synthetic and advisory, not a CTR prediction.",
    "Do not share face references, provider IDs, signed URLs, API keys, or account details.",
  ],
};

fs.mkdirSync(workDir, { recursive: true });
const planPath = path.join(workDir, "gen-plan.json");
fs.writeFileSync(planPath, JSON.stringify(plan, null, 2));

if (!A.run) {
  console.log("lf-thumbs plan-only mode");
  console.log(`  slug: ${slug} · concepts: ${cfg.concepts.length} · face files found: ${faces.length}`);
  console.log(`  plan: ${path.relative(ROOT, planPath)}`);
  console.log("  No provider call was made. Review the plan and use --run only after manual provider setup.");
  process.exit(0);
}

if (faces.length === 0) {
  console.error(`no face-reference images found; pass --faces <dir> (looked in ${faceDir})`);
  process.exit(2);
}

function findCli() {
  for (const candidate of ["higgsfield", "higgsfield.cmd", "higgsfield.exe"]) {
    const result = spawnSync(candidate, ["--version"], { encoding: "utf8", windowsHide: true });
    if (!result.error && result.status === 0) return candidate;
  }
  return null;
}

function runChecked(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, windowsHide: true });
  if (result.error || result.status !== 0) {
    const detail = ((result.stderr || result.stdout || "") + "").trim().split(/\r?\n/).slice(-6).join("\n");
    throw new Error(`${command} failed${result.status == null ? "" : ` (exit ${result.status})`}${detail ? `:\n${detail}` : ""}`);
  }
  return `${result.stdout || ""}\n${result.stderr || ""}`;
}

function firstUrl(text) {
  const match = text.match(/https?:\/\/\S+\.(?:png|jpe?g|webp)(?:\?\S*)?/i);
  return match ? match[0].replace(/[),.;]+$/, "") : null;
}

function firstId(text) {
  const match = text.match(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i);
  return match ? match[0] : null;
}

function download(url, destination, redirects = 0) {
  if (redirects > 5) return Promise.reject(new Error("too many redirects"));
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https:") ? https : http;
    const request = client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        const next = new URL(response.headers.location, url).toString();
        return download(next, destination, redirects + 1).then(resolve, reject);
      }
      if (response.statusCode !== 200) {
        response.resume();
        return reject(new Error(`download returned HTTP ${response.statusCode}`));
      }
      const file = fs.createWriteStream(destination);
      response.pipe(file);
      file.on("finish", () => file.close(() => resolve(destination)));
      file.on("error", reject);
    });
    request.on("error", reject);
  });
}

(async () => {
  const cli = findCli();
  if (!cli) throw new Error("Higgsfield CLI is unavailable; install and authenticate it using current official documentation");

  console.log(`creating provider identity reference from ${faces.length} consented image(s)…`);
  const referenceOutput = runChecked(cli, soulArgs());
  const referenceId = firstId(referenceOutput);
  if (!referenceId) throw new Error("provider output did not contain a reference ID");
  runChecked(cli, ["soul-id", "wait", referenceId]);

  const report = { version: 2, slug, generatedAt: new Date().toISOString(), thumbnails: [] };
  for (const concept of cfg.concepts) {
    process.stdout.write(`generating ${concept.id}… `);
    const output = runChecked(cli, generateArgs(concept, referenceId));
    const url = firstUrl(output);
    const entry = { id: concept.id, text: concept.text || null, file: null, status: "provider-returned-no-image-url" };
    if (url) {
      const destination = path.join(workDir, `${concept.id}.png`);
      await download(url, destination);
      entry.file = path.relative(ROOT, destination).replace(/\\/g, "/");
      entry.status = "downloaded-for-review";
      console.log("ok");
    } else console.log("no image URL");
    report.thumbnails.push(entry);
  }

  const reportPath = path.join(workDir, "report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`report: ${path.relative(ROOT, reportPath)}`);
  console.log("Provider IDs and signed URLs were not saved. Review every image before use.");
})().catch((error) => {
  console.error("lf-thumbs failed:", error.message);
  process.exit(1);
});
