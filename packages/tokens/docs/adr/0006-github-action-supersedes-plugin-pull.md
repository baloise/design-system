# 6. A GitHub Action, not the plugin, owns Pull (from Code)

Date: 2026-08-06

Status: Accepted

## Context

[figma-token-sync-plugin-plan.md](../figma-token-sync-plugin-plan.md) originally scoped Pull (from Code) as
Phase 2 of the Figma plugin: a designer opens the plugin and clicks "Check
for updates" to populate Figma Variables from GitHub. That plan's own
[§8 Future Extensions](../figma-token-sync-plugin-plan.md#8-future-extensions)
already named the alternative and explicitly deferred it: "a background
service polling via the Figma REST API instead of a plugin." Toky now needs
exactly that — an automatic sync that fires the moment a Toky-authored PR
merges, with no designer needing to open Figma at all.

## Decision

A standalone GitHub Action (`.github/workflows/figma-sync.yml`,
`figma-conflict-check.yml`) owns Pull (from Code) entirely, calling the
Figma Variables REST API server-to-server. The plugin plan is amended:
Phase 2 is removed. The plugin's remaining scope is Phase 1 (read-only diff
status) and Phase 3 (Push, Figma→GitHub) — a designer can still see what's
out of sync and propose Figma-side edits back to GitHub, but never
triggers the GitHub→Figma direction manually.

Both implementations share the same `variableId` identity rule
([ADR-0001](0001-figma-variable-identity-key.md)), brand-mode mapping
([ADR-0002](0002-brand-modes-not-collections.md)), native aliasing
([ADR-0003](0003-native-variable-aliasing.md)), and
`.figma-sync-state.json` baseline ([ADR-0005](0005-git-committed-sync-baseline.md)) —
there is one sync domain with two callers, not two competing sync engines.

## Consequences

- Pull can no longer be deferred or reviewed by a human before it happens —
  it fires unattended on every Toky-branch merge. The follow-on decisions
  in [ADR-0007](0007-direct-commit-variableid-backfill.md) and
  [ADR-0008](0008-non-blocking-conflict-check.md) exist because of this.
- The plugin never needs to implement Figma Variable creation/writing at
  all — only reading (for its diff view) and the Push-side write-to-GitHub
  path. Simpler plugin, smaller attack surface for plugin bugs to corrupt
  Figma state.
- If the Action's Figma REST credentials are ever revoked or the Action is
  disabled, there is no manual fallback for Pull anymore — reinstating the
  plugin's Phase 2 would require un-amending this decision, not just
  flipping a flag.
