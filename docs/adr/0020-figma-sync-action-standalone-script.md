# 20. The Figma Sync Action's code stays standalone, not shared with apps/toky

Package: `packages/tokens`

Date: 2026-08-06

Status: Accepted

## Context

`apps/toky/src/tokens/github.ts` and `github-write.ts` already implement
GitHub Contents API reads/writes, branch/PR helpers, and the
`toky/update-*` branch-naming convention this Action depends on
(`workingBranchFor()`). The Action could import that code as a shared
package, or duplicate the small slice it actually needs.

## Decision

The Action's implementation is a self-contained script under its own
location (not `apps/toky`), with no shared package between the two. It
re-derives the GitHub plumbing it needs rather than importing from
`apps/toky/src/tokens`.

## Consequences

- `next`-branch write logic now exists in two places
  (`apps/toky/src/tokens/github-write.ts` and the Action's own script).
  A fix to one (e.g. a GitHub API edge case) does not automatically apply
  to the other — worth checking both when GitHub-write bugs surface in
  either.
- The Action has zero build/runtime dependency on the Next.js app — it can
  run as a plain script in CI without `apps/toky` building successfully
  first, and a change to `apps/toky` (including one that temporarily
  breaks its build) can never break the Figma sync.
- If the duplication becomes painful (the two diverge, or a third caller
  appears), extracting the shared slice into its own package is the
  natural reversal — this ADR is the record of why it wasn't done up
  front.
