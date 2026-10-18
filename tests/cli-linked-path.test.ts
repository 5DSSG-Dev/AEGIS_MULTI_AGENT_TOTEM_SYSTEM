import { mkdtempSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("CLI launched through a linked install directory", () => {
  it.each(["--version", "--help"])("prints output for %s through an NVM-style directory link", (argument) => {
    const sandbox = mkdtempSync(join(tmpdir(), "aegis-linked-cli-"));
    const linked = join(sandbox, "nodejs");
    symlinkSync(process.cwd(), linked, process.platform === "win32" ? "junction" : "dir");
    const result = spawnSync(process.execPath, [join(linked, "dist", "src", "cli.js"), argument], { cwd: sandbox, encoding: "utf8" });
    expect(result.status, result.stderr).toBe(0);
    expect(result.stdout.trim().length).toBeGreaterThan(0);
    if (argument === "--help") expect(result.stdout).toContain("start");
  });
});
