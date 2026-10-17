# AEGIS Totem

Multi-agent coding continuity. Shared context. Respectful collaboration.

AEGIS Totem gives a repository a shared Root Totem, Folder Totems for local reference, and separate append-only lanes for agents, models, instances, and humans. The records stay in the repository as readable Markdown, so developers and coding tools can inspect the same context, decisions, handoffs, and verification history.

## Why It Exists

Multiple coding agents can lose context, duplicate work, or collide in shared files. AEGIS Totem gives each participant a lane for messages and working notes while preserving durable folder knowledge in Totems. Separate lanes make intent and ownership visible. Verified findings can then be distilled into shared Totems so the next participant can understand what changed and why.

The tool is free under the MIT license, local-first, and has no account, hosted service, or telemetry requirement. You may use, modify, and redistribute it, including commercially, under the license.

## Make The Repository Informational

Code shows what runs. Totems preserve the surrounding reference: folder responsibilities, decisions, known shortfalls, and evidence. Lanes let participants state their intended scope, ask for review, report uncertainty, and leave a usable handoff. Read before work; coordinate in your lane; append verified results afterward.

Respectful collaboration means preserving another participant's work, attributing findings, making disagreements explicit, and recording corrections without erasing the earlier record. Totems support that practice; they do not lock source files or guarantee that agents will follow it.

Try it with two coding agents on a small repository and share what helped, what created noise, and where context was still lost. See the [first repository walkthrough](docs/first-repo-walkthrough.md) and [public launch kit](docs/public-launch.md).

## Install

Download the CLI tarball or VS Code-compatible VSIX from the [public alpha release](https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM/releases/tag/v0.1.1-alpha.1).

For the CLI, download `aegis-totem-0.1.1.tgz`, then run from the download directory:

```bash
npm install -g ./aegis-totem-0.1.1.tgz
aegis-totem --help
```

Node.js 20 or newer and npm are required. Installation may fetch runtime dependencies from npm. The CLI is not yet published to the npm registry.

For VS Code, use **Extensions -> ... -> Install from VSIX...** and select `aegis-totem-vscode-0.1.1.vsix`. The package bundles the CLI. Cursor uses the same VSIX; manual editor compatibility remains an alpha feedback area.

To build from source:

```bash
git clone https://github.com/thelight1122/AEGIS_MULTI_AGENT_TOTEM_SYSTEM.git
cd AEGIS_MULTI_AGENT_TOTEM_SYSTEM
npm ci
npm run build
npm link
```

## Quick Start

Run these commands from the root of a repository:

```bash
aegis-totem start
aegis-totem start --json
aegis-totem lane create codex
aegis-totem lane create claude
aegis-totem lane message codex --to claude -m "I inspected src. Please review the parser boundary before editing."
aegis-totem totem append src --actor codex --kind verified-change -m "Added parser tests. Verification: npm test passed."
aegis-totem status
aegis-totem list
aegis-totem read root
aegis-totem read lane codex
aegis-totem read folder src
aegis-totem analytics
aegis-totem validate
aegis-totem doctor
aegis-totem mcp config
aegis-totem hooks install
```

## Generated Structure

```text
ROOT_TOTEM.md                 repo-wide orientation and append log
.aegis/config.json            local configuration
.aegis/lanes/<agent>.md       one append-only lane per participant
<branch-folder>/TOTEM.md      branch folder reference, subfolder element list, and durable append log
```

Read the relevant Totem before editing a folder. Use a lane for coordination, uncertainty, handoffs, and direct model-to-model messages. Append verified updates after work. Corrections and supersessions are appended as new records; historical entries are not silently rewritten or deleted.

Newly generated Root Totems include a short `For New AI Agents` tutorial so an arriving coding agent can understand the read-before-work, lane-for-coordination, append-after-verification loop without needing external context first.

## Commands

| Command | Purpose |
| --- | --- |
| `start` | Create the local AEGIS structure and seed Folder Totems for existing branch folders, with immediate subfolder elements listed. Use `--json` for IDEs, agents, and scripts. |
| `init` | Create only the base local AEGIS structure without seeding existing folders. |
| `lane create <name>` | Create an agent lane. |
| `lane message <lane> -m <text>` | Append a message, optionally addressed with `--to <lane>`. |
| `totem create <folder>` | Create a Folder Totem. |
| `totem append <folder>` | Append a durable update with `--actor`, `--kind`, and `--message`. |
| `status` | Show a read-only inventory. |
| `list` | List discovered lanes and Folder Totems, optionally filtered with `--lanes` or `--folders`. |
| `read root` | Print the Root Totem. |
| `read lane <name>` | Print an agent lane. |
| `read folder <folder>` | Print a Folder Totem. |
| `analytics` | Show read-only append activity counts, last activity, active/quiet lanes, and busiest Totem surfaces. |
| `validate` | Check required Totem and append-log structure. |
| `doctor` | Run a read-only readiness check before parallel agent work. Use `--json` for IDE/tooling output. |
| `mcp config` | Print copyable stdio MCP client JSON for the current repository. |
| `hooks install` | Install an optional local pre-commit hook that runs validation. |

## Development

```bash
npm test
npm run typecheck
npm run build
npm run local-install:qa
npm run mcp:qa
npm run vscode:qa
npm run docs:qa
npm run release:preflight
npm run alpha:check
```

The CLI, local MCP server, and VS Code-compatible extension share the same repository artifacts. Other native IDE adapters remain future work.

Use `aegis-totem read root`, `aegis-totem read lane <name>`, and `aegis-totem read folder <path>` after `list` when a terminal, script, or agent needs the actual Markdown content without manually opening files.

`aegis-totem start --json` returns the repository path, readiness flag, and seeded Folder Totem count for IDEs, agents, and scripts. `aegis-totem analytics --json` returns the same read-only coordination snapshot as structured JSON for IDEs, MCP clients, and local automation. `aegis-totem doctor --json` returns readiness checks in the same machine-readable style.

## VS Code And Cursor

The first extension adapter lives in `vscode-extension`. Its first job is to run Start in any existing repository through the bundled CLI's `start --json`: create the Totem structure, add assistant-facing `AGENTS.md` instructions when absent, seed Folder Totems only for existing branch folders, with immediate subfolder elements listed, and open Doctor readiness immediately after Start. Users can trigger that flow from the AEGIS Totem sidebar's visible `Initialize System` row or from the command palette with `AEGIS Totem: Start`. It then watches new branch folders and creates their Folder Totems, groups the Root Totem, Folder Totems, and agent lanes, opens list, analytics, structured doctor readiness, and a Live Test Checklist in read-only panels, and invokes the CLI for status, validation, lane messages, and Folder Totem updates.

Cursor support uses the same VS Code-compatible package path. The near-term Cursor target is compatibility and Open VSX readiness, not a separate adapter codebase.

Build an installable VS Code package locally:

```bash
npm run package:vscode
code --install-extension dist/aegis-totem-vscode-0.1.1.vsix
```

For local alpha VSIX testing, the package includes a bundled CLI runtime, so the extension can run before the npm package is published.

To verify the packaged extension before sharing it, run:

```bash
npm run vscode:qa
```

The QA packages the extension, inspects the `.vsix`, confirms required files and bundled CLI runtime are present, verifies the expected AEGIS commands, visible Initialize System action rows, List/Analytics/Doctor/Live Test Checklist panel wiring, and Activity Bar view are declared, then extracts the packaged VSIX and runs the bundled CLI in a fresh temporary repository.

Check Cursor/Open VSX readiness after VS Code QA:

```bash
npm run cursor:qa
```

See [Cursor and Open VSX readiness](docs/cursor-open-vsx.md) for the local Cursor smoke path and publication gate.

## MCP

The local MCP adapter exposes the same canonical repo surface to AI coding agents. Set `AEGIS_REPO_ROOT` to the repository path and run `npm run build`, then configure the MCP client to launch:

```json
{
  "mcpServers": {
    "aegis-totem": {
      "command": "node",
      "args": ["/absolute/path/to/aegis-totem/dist/src/mcp-server.js"],
      "env": { "AEGIS_REPO_ROOT": "/absolute/path/to/your/repo" }
    }
  }
}
```

The server provides tools to start and seed a configured repository, read the Root Totem, read Folder Totems and lanes, send lane messages, append Folder Totem updates, show status, list discovered surfaces, show analytics, validate structure, and run the readiness doctor. It is local and stateless; the repository files remain authoritative.

To print copyable MCP JSON for the current repository:

```bash
aegis-totem mcp config
```

See [MCP client examples](docs/mcp-clients.md) for Codex, Cursor, Claude Desktop, Cline, Windsurf, and other stdio MCP client configuration shapes.

## Project Records

- [Root Totem](ROOT_TOTEM.md)
- [Quickstart](docs/quickstart.md)
- [First repository walkthrough](docs/first-repo-walkthrough.md)
- [MCP client examples](docs/mcp-clients.md)
- [Cursor and Open VSX readiness](docs/cursor-open-vsx.md)
- [Release checklist](docs/release-checklist.md)
- [Draft release notes](docs/releases/v0.1.1-alpha.1.md)
- [Changelog](CHANGELOG.md)
- [Security policy](SECURITY.md)
- [MVP implementation plan](docs/superpowers/plans/2026-09-23-aegis-totem-mvp.md)
- [Flow, Locus, and Axiom evolution note](docs/evolution/2026-09-23-flow-locus-axiom-progression.md)

## License

MIT. See [LICENSE](LICENSE).
