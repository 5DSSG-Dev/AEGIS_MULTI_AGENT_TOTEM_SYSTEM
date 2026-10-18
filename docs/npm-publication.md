# Publishing the public CLI

The CLI package is `aegis-totem@0.1.1`; the extension has its own version. Distribution target is npmjs.org. GitHub Packages is not configured: it requires a lowercase scoped name and authenticated installation, which adds friction for this free public CLI.

The `Publish npm package` workflow is manual-only and defaults to dry-run. It runs full alpha checks and `npm publish --dry-run --tag alpha`. Normal pushes and pull requests cannot publish. Actual publication requires manually disabling dry-run and configuring `NPM_TOKEN` in repository Actions secrets using npm-supported publishing credentials for this package. Never commit a token to `.npmrc` or paste it into chat. Configure npm account ownership and any required two-factor authentication in the npm website first. No token has been configured or registry package uploaded by this repair.

The first npm release uses the `alpha` dist-tag, so developers install with `npm install -g aegis-totem@alpha`. Version 0.1.1 is retained; the alpha label is a registry tag. After successful first publication, future code changes need a new package version. Verify package ownership/name availability immediately before publishing. A green build is not proof of publication.

## Local validation

```powershell
npm ci
npm run alpha:check
npm publish --dry-run --tag alpha
```

## Git metadata incident

Generated TOTEM.md files were found under `.git/refs`, where Git interprets them as refs. They were quarantined outside the checkout with SHA-256 records, and a complete Git bundle was created. Fetch works after quarantine. An extension watcher must ignore metadata paths before filesystem reads or writes; the CLI also rejects explicit Totem creation within Git/Mercurial/Subversion metadata. Extension 0.1.3 packages these protections; installed 0.1.2 must be upgraded to receive them. Avoid running the older extension on this repository until upgraded.
