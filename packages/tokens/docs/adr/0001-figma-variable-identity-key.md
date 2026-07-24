# 1. Figma Variable identity is `variableId`, not name/path

Date: 2026-07-24

## Status

Accepted

## Context

The Figma Token Sync Plugin must match a token in `Base.tokens.json`/brand
files to a Figma Variable across syncs, including when either side renames
it. `Base.tokens.json` already carries `$extensions.com.figma.variableId` on
nearly every token (populated by the current manual Figma export). The
alternative — matching by name/path — is simpler but cannot distinguish a
rename from a delete-plus-add, since the path is exactly what changes in a
rename.

## Decision

`variableId` is the primary identity key for matching a JSON token to a
Figma Variable. Path/name matching is used only as a fallback, for tokens
that don't yet have a `variableId` (newly created in Figma and never
round-tripped through GitHub, or newly authored in JSON and never pushed to
Figma). Once a token round-trips once, it gets a `variableId` and upgrades
to ID-based matching permanently.

## Consequences

- True rename detection: same `variableId`, different path → "renamed",
  not "deleted + added".
- A `variableId` collision (same ID, but the sync engine's fallback path
  match also finds a different candidate) must be surfaced as an explicit
  diff-table conflict rather than silently resolved either way.
- The identity key lives on the token itself (existing convention), not in
  a separate mapping table — keeping the mapping co-located with the value
  it describes.
