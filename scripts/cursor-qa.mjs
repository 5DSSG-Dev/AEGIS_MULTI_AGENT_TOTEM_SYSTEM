import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import yauzl from "yauzl";

const root = process.cwd();
const vsixPath = join(root, "dist", "aegis-totem-vscode-0.1.1.vsix");

function fail(message) {
  console.error(`Cursor QA failed: ${message}`);
  process.exit(1);
}

function requireIncludes(text, expected, label) {
  if (!text.includes(expected)) fail(`${label} missing ${expected}`);
}

function openZip(path) {
  return new Promise((resolve, reject) => {
    yauzl.open(path, { lazyEntries: true }, (error, zip) => {
      if (error) reject(error);
      else resolve(zip);
    });
  });
}

async function readManifest(path) {
  const zip = await openZip(path);
  return new Promise((resolve, reject) => {
    zip.readEntry();
    zip.on("entry", (entry) => {
      if (entry.fileName !== "extension/package.json") {
        zip.readEntry();
        return;
      }
      zip.openReadStream(entry, (error, stream) => {
        if (error) return reject(error);
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(JSON.parse(Buffer.concat(chunks).toString("utf8"))));
      });
    });
    zip.on("error", reject);
    zip.on("end", () => reject(new Error("missing extension/package.json")));
  });
}

if (!existsSync(vsixPath)) {
  fail(`expected packaged VSIX at ${vsixPath}; run npm run vscode:qa first`);
}

const manifest = await readManifest(vsixPath);
if (manifest.engines?.vscode !== "^1.85.0") fail(`unexpected VS Code engine ${manifest.engines?.vscode}`);
if (manifest.repository?.url !== "https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM.git") {
  fail("manifest repository URL does not point to the public AEGIS Totem repository");
}
if (!manifest.keywords?.includes("cursor")) fail("manifest missing cursor keyword");
if (!manifest.keywords?.includes("open-vsx")) fail("manifest missing open-vsx keyword");

const docs = [
  ["README.md", readFileSync(join(root, "README.md"), "utf8")],
  ["docs/quickstart.md", readFileSync(join(root, "docs", "quickstart.md"), "utf8")],
  ["docs/cursor-open-vsx.md", readFileSync(join(root, "docs", "cursor-open-vsx.md"), "utf8")],
  ["vscode-extension/README.md", readFileSync(join(root, "vscode-extension", "README.md"), "utf8")]
];

for (const [label, text] of docs) {
  requireIncludes(text, "Cursor", label);
  requireIncludes(text, "Open VSX", label);
  requireIncludes(text, "dist/aegis-totem-vscode-0.1.1.vsix", label);
}

const cursorDoc = docs.find(([label]) => label === "docs/cursor-open-vsx.md")[1];
requireIncludes(cursorDoc, "Publication is a separate gate", "Cursor guide");
requireIncludes(cursorDoc, "Do not publish", "Cursor guide");
requireIncludes(cursorDoc, "Install from VSIX", "Cursor guide");

console.log("Cursor QA passed: VSIX metadata and Cursor/Open VSX docs are present.");
