import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import path from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync("vscode-extension/extension.js", "utf8");
const report = JSON.stringify({ ok: false, checks: [{ ok: false, label: "Agent lanes", detail: "Create a lane." }] });
function invoke(args: string[], stdout: string, code: number, stderr = "", script = source) {
  const error = code ? Object.assign(new Error("Command failed"), { code }) : null;
  const run = runInNewContext(script + "\nrun;", {
    require: (name: string) => {
      if (name === "vscode") return { workspace: { workspaceFolders: [{ uri: { fsPath: process.cwd() } }] } };
      if (name === "node:fs") return { existsSync: () => true };
      if (name === "node:path") return path;
      if (name === "node:child_process") return { execFile: (_c: unknown, _a: unknown, _o: unknown, cb: Function) => cb(error, stdout, stderr) };
      throw new Error(name);
    },
    process: { execPath: "Code.exe" }, module: { exports: {} }
  });
  return run({ extensionPath: process.cwd() }, args);
}
describe("extension CLI result handling", () => {
  it("opens Doctor panel with a valid first-run readiness warning", async () => {
    await expect(invoke(["doctor", "--json"], report, 1)).resolves.toBe(report);
  });
  it("keeps malformed Doctor output as a command error", async () => {
    await expect(invoke(["doctor", "--json"], "not-json", 1)).rejects.toThrow("not-json");
  });
  it("rejects unrelated JSON and unexpected exit codes", async () => {
    await expect(invoke(["doctor", "--json"], "{}", 1)).rejects.toThrow();
    await expect(invoke(["doctor", "--json"], report, 2, "runtime failure")).rejects.toThrow("runtime failure");
  });
  it("does not swallow errors from other commands", async () => {
    await expect(invoke(["start", "--json"], report, 1)).rejects.toThrow();
  });
  it("preserves successful command output", async () => {
    await expect(invoke(["status"], "ready\n", 0)).resolves.toBe("ready");
  });
});


describe("extension metadata exclusion", () => {
  it.each([".git/refs/codex", ".GIT/refs/codex", "nested/.git/refs", ".hg/store", ".svn/pristine", "node_modules/tool", "../outside/folder"])("ignores watcher events in %s", async (relative) => {
    let reads = 0;
    let launches = 0;
    const root = process.cwd();
    const watch = runInNewContext(source + "\ncreateFolderTotemForPath;", {
      require: (name: string) => {
        if (name === "vscode") return { workspace: { workspaceFolders: [{ uri: { fsPath: root } }] } };
        if (name === "node:path") return path;
        if (name === "node:fs") return { existsSync: () => true, statSync: () => ({ isDirectory: () => true }), readdirSync: () => { reads++; return []; } };
        if (name === "node:child_process") return { execFile: () => { launches++; } };
        throw new Error(name);
      },
      process, module: { exports: {} }
    });
    await watch(path.resolve(root, relative), { context: { extensionPath: root }, refresh: () => {} });
    expect(reads).toBe(0);
    expect(launches).toBe(0);
  });
});
