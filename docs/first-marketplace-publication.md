# First-time marketplace publishing: AEGIS Totem

Verified against official documentation on 2026-10-17. These instructions prepare publication; neither registry has been published by this walkthrough.

## Identity and package

- Display name: AEGIS Totem
- Publisher / namespace currently configured: thelight1122
- Extension name: aegis-totem-vscode
- Full identifier: thelight1122.aegis-totem-vscode
- Version in existing package: 0.1.1 (early public alpha)
- License: MIT; distributed free
- Package: G:\AEGIS_UTILITY_APP_REPOS\AEGIS_MULTI_AGENT_TOTEM_SYSTEM\dist\aegis-totem-vscode-0.1.3.vsix
- GitHub release: https://github.com/5DSSG-Dev/AEGIS_MULTI_AGENT_TOTEM_SYSTEM/releases/tag/v0.1.1-alpha.1

Publisher ID is the account identity, not the product title. The manifest does not prove ownership. If thelight1122 is unavailable, stop and tell Codex before creating a substitute: changing it requires rebuilding and rechecking the VSIX. An AEGIS Totem display name can still be used under this ID.

## 1. Verify the actual install

Open VS Code, open a disposable repository, then Extensions -> ... -> Install from VSIX. Select the exact package above. Do not double-click it in Windows Explorer.

Open the AEGIS Totem sidebar. Click Initialize System. Confirm Doctor opens; Root Totem and Folder Totems appear; run AEGIS: Live Test Checklist. Create two lanes using the CLI in the disposable repo, send a lane message, append a Folder Totem update, and run AEGIS: Validate. Repeat in Cursor for a Cursor compatibility claim. Automated package checks already passed, but do not replace this editor UI check.

## 2. VS Code Marketplace: account-owner steps

1. Visit https://marketplace.visualstudio.com/manage and sign in with the Microsoft account you intend to keep as publisher owner.
2. If a publisher already exists, select it and check its ID. Otherwise choose Create publisher.
3. For ID, request thelight1122. For display name, use your chosen public identity, such as Tracey Prutch or AEGIS Developer Tools. The ID is permanent; do not improvise a replacement if unavailable.
4. Complete required contact/profile fields and account verification. Read and accept publisher terms yourself if you agree.
5. Select the publisher. Use New extension -> Visual Studio Code (or the equivalent VS Code upload option shown by the current UI).
6. Upload the exact VSIX listed above. Check the parsed name, version, README, icon, and free/MIT positioning before confirming publication.
7. Wait for processing and validation. Uploaded/processing does not mean publicly available. Report any validation error verbatim, without credentials.
8. Open the resulting public listing and install it from VS Code search. Confirm the identifier and repeat the smoke test.

Microsoft documents manual VSIX upload as an alternative to CLI publication. That route avoids creating an Azure DevOps PAT for this initial upload. If we automate later, use the current identity-based guidance; Microsoft says global Azure DevOps PATs retire December 1, 2026.

## 3. Open VSX: account-owner steps

1. Visit https://open-vsx.org and sign in with GitHub as the account responsible for this repository.
2. Register/sign in at https://accounts.eclipse.org. Associate the same GitHub username.
3. On Open VSX, avatar -> Settings -> Log in with Eclipse; link the Eclipse account.
4. Open Show Publisher Agreement, read it, and choose Agree only if you accept. This is the Open VSX Publisher Agreement, not the Eclipse Contributor Agreement.
5. Settings -> Access Tokens -> Generate New Token. Use a descriptive label such as AEGIS Totem local publishing. Save it privately; do not paste it in chat, source files, or screenshots.
6. The namespace must match the manifest publisher: thelight1122. Creating a namespace does not itself confer verified ownership. Follow the official Namespace Access process for an ownership claim; if it already exists or publishing is restricted, stop for that process rather than choosing an unrelated name.

After the account and agreement are ready, the following is the local PowerShell 7 publishing sequence. It prompts privately for the token, creates the namespace, then publishes the existing VSIX. These commands perform external writes. If the namespace already exists, skip its creation only after confirming your access. If namespace creation fails, resolve the error before running publish.

```powershell
Set-Location -LiteralPath 'G:\AEGIS_UTILITY_APP_REPOS\AEGIS_MULTI_AGENT_TOTEM_SYSTEM'
$env:OVSX_PAT = Read-Host 'Open VSX token (hidden)' -MaskInput
npx --yes ovsx create-namespace thelight1122
```

After namespace creation/access succeeds:

```powershell
try {
    npx --yes ovsx publish '.\dist\aegis-totem-vscode-0.1.3.vsix'
} finally {
    Remove-Item Env:OVSX_PAT -ErrorAction SilentlyContinue
}
```

If stopping before publish, also run `Remove-Item Env:OVSX_PAT -ErrorAction SilentlyContinue`. The token is not printed, but exists in the process environment until removed. npx may download the official ovsx CLI. A successful upload still needs public listing verification and an install test. Registry scans or namespace checks can prevent immediate discoverability.

## Public listing copy

Name: AEGIS Totem

Short description: Repository continuity and separate agent lanes for multi-agent coding and respectful collaboration.

Summary: AEGIS Totem keeps shared reference inside your repository. Root and Folder Totems preserve responsibilities, decisions, known shortfalls, and verification evidence. Separate participant lanes make intent, questions, and handoffs visible. Append-only updates preserve attribution and corrections. Free under MIT, local-first, with no account or telemetry requirement. Early alpha; does not lock source files or guarantee collision-free work.

The packaged extension README supplies the detailed listing. npm is a separate registry for CLI installation; publishing the extension does not publish the npm package.

## Evidence and remaining limits

Local alpha checks passed in the release turn: 35 tests, build/typecheck, CLI install, MCP integration, packaged VSIX smoke, Cursor metadata, docs/preflight. Production audit was clean; six high development-only packaging dependency findings remain disclosed in release notes. Hosted CI did not execute because GitHub reported an account billing lock. Manual UI verification and actual publisher ownership remain to be established.

## Official references

- Microsoft publishing and manual VSIX upload: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- Open VSX account, agreement, namespace and publishing: https://github.com/eclipse-openvsx/openvsx/wiki/Publishing-Extensions
- Open VSX token environment variable and VSIX upload CLI: https://github.com/eclipse-openvsx/openvsx/blob/main/cli/README.md
- Namespace ownership: https://github.com/eclipse-openvsx/openvsx/wiki/Namespace-Access
