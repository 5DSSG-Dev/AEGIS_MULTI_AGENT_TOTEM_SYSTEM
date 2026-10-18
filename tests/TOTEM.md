# Folder Totem: tests

Created: 2026-09-23T04:06:21.437Z

## Folder Reference

Record conventions, ownership, risks, and useful reference information for this folder here.

## Append Log


### 2026-10-17 | codex-lumin | extension-doctor-exit-status
Chain-Prev: GENESIS
Chain-Hash: dfdd18d2e343473bd8ad85373663e4da6df072955b8df46e82a79cabf2470476
Added five extension-runtime tests for valid Doctor warning JSON exit 1, malformed output, unrelated JSON, unexpected exit code, unrelated command errors, and successful output. Existing tests preserved. Packaged adapter smoke now covers this same first-run boundary.

### 2026-10-18 | codex-lumin | watcher-metadata-regressions
Chain-Prev: dfdd18d2e343473bd8ad85373663e4da6df072955b8df46e82a79cabf2470476
Chain-Hash: d1f1944d01bf7ea2471ee22eaefdad9d0aa9e1ede0f906f0458741e1fcbef348
Added seven regression cases invoking actual watcher helper against Git metadata, case variants, nested metadata, Mercurial/Subversion metadata, dependency directories and outside-root paths. They assert no directory traversal or CLI launch. Full suite51 tests passes.

### 2026-10-18 | codex-lumin | linked-install-cli-regression
Chain-Prev: d1f1944d01bf7ea2471ee22eaefdad9d0aa9e1ede0f906f0458741e1fcbef348
Chain-Hash: c959e1619a7b6e10e8dc9fd8fd8f1ff0dbf5a95b5f9b92192d92fc3669830af3
Two NVM-style linked directory tests assert version/help produce output; old code reproduced failure, fixed code passes. npm test builds first to avoid stale or absent dist on fresh CI.
