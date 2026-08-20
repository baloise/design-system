# 15. Sync baseline is a git-committed file, not local Figma clientStorage

Package: `packages/tokens`

Date: 2026-07-24

## Status

Accepted

## Context

The diff engine needs a 3-way merge baseline (the token state as of the
last successful sync) to distinguish a genuine conflict — both Figma and
GitHub changed the same token since last sync — from a one-sided change.
That baseline has to live somewhere. Figma's `clientStorage` API is the
obvious first candidate, since the plugin already uses it to store the
designer's GitHub PAT, but it's scoped per plugin install per user/machine
— it doesn't sync across a designer's own machines, let alone across
different designers working from the same Figma file.

## Decision

The baseline lives in `packages/tokens/.figma-sync-state.json`, committed
to the repository in the same commit as the token change it accompanies
(see ADR-0014). It is keyed by `variableId` and records, at minimum, the
last-synced value and the last-synced commit SHA per token.

## Consequences

- Every designer and every machine reads the same baseline — a prerequisite
  for correct conflict detection with more than one designer involved,
  which the phased rollout plan explicitly defers hardening for but the
  data model needs to support from the start.
- `.figma-sync-state.json` is sync bookkeeping, not Design Tokens Format
  content — it must be excluded from anywhere that parses `*.tokens.json`
  as spec-compliant token files (Style Dictionary sources, docs tooling),
  and named/located so it's obviously not one.
- The baseline file changes on every sync, in both directions — Pull writes
  it as part of the same commit that updates Figma-facing state
  bookkeeping (there's no Figma-side commit, but Push still updates it),
  and Push writes it alongside the token file changes.
