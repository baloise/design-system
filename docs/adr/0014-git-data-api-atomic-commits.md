# 14. GitHub writes use the Git Data API for atomic multi-file commits

Package: `packages/tokens`

Date: 2026-07-24

## Status

Accepted

## Context

A single Push-to-Code sync can touch multiple files at once: one or more
token files (`Base.tokens.json`, `Tcs.tokens.json`) and the sync-state
baseline file (`.figma-sync-state.json`, see ADR-0015). GitHub's Contents
API (`PUT /repos/{owner}/{repo}/contents/{path}`) writes one file per call,
which means one commit per file — a failure between calls would leave the
branch with a token change but no matching baseline update, corrupting the
next sync's 3-way diff.

## Decision

All GitHub writes go through the Git Data API: create a blob per changed
file, assemble a tree, create a commit against that tree, then update the
branch ref. Every sync session produces exactly one commit containing every
changed file, or none at all.

## Consequences

- More GitHub API calls per commit (blob creation is one call per file)
  than the Contents API, but each sync is infrequent and user-triggered, so
  this isn't a rate-limit concern in practice.
- No partial-write states to detect or recover from — a failed commit
  attempt simply hasn't happened yet from GitHub's point of view.
- The GitHub integration layer needs a small amount of Git Data API
  plumbing (blob/tree/commit/ref calls) that the simpler Contents API
  wouldn't require; this is isolated to the GitHub integration layer and
  doesn't leak into the diff/sync engine.
