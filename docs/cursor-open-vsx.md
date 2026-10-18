# Cursor And Open VSX Readiness

AEGIS Totem uses the existing VS Code extension adapter as the Cursor path. Cursor uses VS Code-compatible extension packaging through Open VSX, so the near-term goal is compatibility and distribution readiness, not a separate Cursor codebase.

## Local Cursor Smoke Path

Build the same local VSIX used for VS Code:

```bash
npm run vscode:qa
```

Then install the generated package in Cursor:

```text
Extensions -> ... -> Install from VSIX...
dist/aegis-totem-vscode-0.1.3.vsix
```

After installation, open a temporary repository in Cursor and run the same alpha smoke path:

1. Open the AEGIS Totem sidebar.
2. Click `Initialize System`.
3. Confirm Doctor readiness opens.
4. Confirm Root Totem, Folder Totems, and lanes appear in the sidebar.
5. Open `AEGIS: Live Test Checklist`.
6. Confirm the panel reports the bundled VSIX runtime and CLI version `0.1.2`.
7. Send one lane message in a temporary repo.
8. Append one Folder Totem update in a temporary repo.
9. Run `AEGIS: Validate`.

## Open VSX Publication Gate

Publication is a separate gate. Do not publish to Open VSX until Tracey explicitly authorizes that publication action.

Before any Open VSX publication, re-run:

```bash
npm run alpha:check
npm run cursor:qa
```

Then verify:

- The VSIX still contains the bundled alpha CLI runtime.
- The extension metadata points to the AEGIS Totem repository.
- The Cursor guide, VS Code README, release checklist, and alpha release notes are current.
- The package has been manually smoke-tested in Cursor from `dist/aegis-totem-vscode-0.1.3.vsix`.

## Product Boundary

Cursor support should remain a distribution and compatibility target unless a Cursor-specific API creates a concrete user benefit. The source of truth remains the AEGIS Totem CLI, repo files, and MCP tools.
