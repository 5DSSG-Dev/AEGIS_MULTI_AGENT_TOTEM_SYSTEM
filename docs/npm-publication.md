# Publishing the public CLI

The CLI package is `aegis-totem@0.1.2`; the extension has its own version. Distribution target is npmjs.org. GitHub Packages is not configured: it requires a lowercase scoped name and authenticated installation, which adds friction for this free public CLI.

The `Publish npm package` workflow is manual-only and defaults to dry-run. It runs full alpha checks and `npm publish --dry-run --tag alpha`. Normal pushes and pull requests cannot publish. Actual publication requires manually disabling dry-run and configuring `NPM_TOKEN` in repository Actions secrets using npm-supported publishing credentials for this package. Never commit a token to `.npmrc` or paste it into chat. Configure npm account ownership and any required two-factor authentication in the npm website first. CLI 0.1.2 has since been published through the owner’s local npm login. Repository-secret configuration is optional for future automated publication.

The current npm release uses the `alpha` dist-tag, so developers install with `npm install -g aegis-totem@alpha`. Version 0.1.2 is used; the alpha label is a registry tag. After successful first publication, future code changes need a new package version. Verify package ownership/name availability immediately before publishing. A green build is not proof of publication.

## Local validation

```powershell
npm ci
npm run alpha:check
npm publish --dry-run --tag alpha
```

## Git metadata incident

Generated TOTEM.md files were found under `.git/refs`, where Git interprets them as refs. They were quarantined outside the checkout with SHA-256 records, and a complete Git bundle was created. Fetch works after quarantine. An extension watcher must ignore metadata paths before filesystem reads or writes; the CLI also rejects explicit Totem creation within Git/Mercurial/Subversion metadata. Extension 0.1.3 packages these protections; installed 0.1.2 must be upgraded to receive them. Avoid running the older extension on this repository until upgraded.

## Verified distribution status — 2026-10-18

Public npm alpha is 0.1.2. The owner demonstrated global version/help output on NVM after upgrading. The default latest tag was still 0.1.1 when checked and requires owner authentication to change; use explicit @alpha until verified. Both extension registries expose0.1.2. Extension0.1.3 with metadata guards is prepared separately and must be uploaded to both registries.
