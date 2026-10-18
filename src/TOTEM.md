# Folder Totem: src

Created: 2026-09-23T04:06:21.363Z

## Folder Reference

Record conventions, ownership, risks, and useful reference information for this folder here.

## Append Log


### 2026-09-23T04:06:21.586Z | codex | dogfood-verification

AEGIS is now using its own append-only structure. Verification: npm test, npm run typecheck, npm run build passed.

### 2026-10-18 | codex-lumin | realpath-cli-entrypoint
Chain-Prev: GENESIS
Chain-Hash: 1e1dac2b92493aa46117919eb20dbacf448aa143a1425de8853cb9e5d6c45b41
src/cli.ts now resolves physical paths for direct execution detection so Windows NVM links do not cause silent no-op. CLIversion0.1.2. Full alpha check passed.
