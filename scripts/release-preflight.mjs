import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const releaseTag = `v${packageJson.version}-alpha.1`;
const releaseNotesPath = join(root, "docs", "releases", `${releaseTag}.md`);
const requiredPackageFiles = ["dist/src", "README.md", "LICENSE"];
const requiredScripts = [
  "alpha:check",
  "local-install:qa",
  "mcp:qa",
  "vscode:qa",
  "release:preflight"
];

function fail(message) {
  console.error(`Release preflight failed: ${message}`);
  process.exit(1);
}

function requireFile(path, label) {
  if (!existsSync(path)) fail(`missing ${label}: ${path}`);
}

if (packageJson.name !== "aegis-totem") fail(`unexpected package name ${packageJson.name}`);
if (!/^\d+\.\d+\.\d+$/.test(packageJson.version)) fail(`unexpected version ${packageJson.version}`);
if (packageJson.license !== "MIT") fail(`unexpected license ${packageJson.license}`);
if (packageJson.bin?.["aegis-totem"] !== "dist/src/cli.js") fail("missing aegis-totem bin target");

for (const file of requiredPackageFiles) {
  if (!packageJson.files?.includes(file)) fail(`package.json files missing ${file}`);
}

for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) fail(`missing npm script ${script}`);
}

requireFile(join(root, "dist", "src", "cli.js"), "built CLI");
requireFile(join(root, "dist", "src", "mcp-server.js"), "built MCP server");
const extensionVersion = JSON.parse(readFileSync(join(root, "vscode-extension", "package.json"), "utf8")).version;
requireFile(join(root, "dist", `aegis-totem-vscode-${extensionVersion}.vsix`), "VS Code VSIX");
requireFile(releaseNotesPath, "release notes");

const changelog = readFileSync(join(root, "CHANGELOG.md"), "utf8");
if (!changelog.includes(`## ${packageJson.version}-alpha.1 -`)) {
  fail("CHANGELOG.md missing current dated release heading");
}

const releaseNotes = readFileSync(releaseNotesPath, "utf8");
for (const expected of [
  `AEGIS Totem ${releaseTag}`,
  "npm publish",
  "GitHub Release",
  "VS Code"
]) {
  if (!releaseNotes.includes(expected)) fail(`release notes missing ${expected}`);
}

console.log(`Release preflight passed for ${packageJson.name}@${packageJson.version} (${releaseTag}).`);
