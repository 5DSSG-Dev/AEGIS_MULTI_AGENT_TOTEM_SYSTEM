# Changelog

## 0.1.2-alpha.1 - 2026-10-18

- Fix silent CLI startup through NVM directory symlinks by comparing resolved file paths.
- Add linked-path regression coverage for version/help and build before tests.
- Normalize package bin/repository metadata and use dynamic CLI version in package checks.


## 0.1.1-alpha.1 - 2026-10-17

Public alpha foundation for AEGIS Totem. Free MIT release focused on multi-agent coding continuity and respectful collaboration.

- Added public release installation instructions, launch kit, and two-agent demonstration.
- Included Cursor/Open VSX compatibility metadata QA alongside the shared VS Code adapter.
- Raised the MCP SDK minimum to 1.32.1 and updated source-map-js to 1.2.2.

### Added

- TypeScript CLI with `init`, agent lanes, lane messages, Folder Totems, append-only folder updates, `status`, `list`, and `validate`.
- Read-only `list` command for discovered lanes and Folder Totems, with lane-only and Folder-Totem-only filters.
- Read-only `read` commands for Root Totem, agent lanes, and Folder Totems.
- Read-only `doctor` command for first-repository readiness checks before parallel agent work, including JSON output for IDE/tooling use.
- Read-only analytics for append activity, last activity, active/quiet lanes, active/quiet Folder Totems, busiest surfaces, and JSON output for IDE/tooling use.
- Optional local pre-commit hook installation for Totem validation.
- MCP client examples for Codex, Cursor, Claude Desktop, Cline, Windsurf, and other stdio clients.
- Read-only `mcp config` command for printing copyable stdio MCP client JSON.
- First repository walkthrough for introducing AEGIS Totem into an existing project.
- Append-only write helper with lock-directory serialization for concurrent agent writes.
- MCP stdio adapter exposing Root Totem, Folder Totem, lane, append, status, list, analytics, validation, and doctor tools.
- VS Code adapter with a visible Initialize System action for first-run setup, browsing Totems and lanes, viewing read-only List, Analytics, and structured Doctor panels, sending lane messages, and appending Folder Totem updates.
- Local VS Code `.vsix` packaging with `npm run package:vscode`.
- Local install QA, MCP QA, VS Code package QA, and release preflight checks.
- CI workflow for tests, typecheck, build, npm pack dry-run, install QA, MCP QA, VS Code QA, and release preflight.

### Notes

- The CLI, MCP server, and VS Code adapter all use repo-native Markdown files as the canonical storage surface.
- No hosted service, account, telemetry, or external database is required.
- Marketplace, Open VSX, and npm publication are separate release gates and are not performed by the build itself.
