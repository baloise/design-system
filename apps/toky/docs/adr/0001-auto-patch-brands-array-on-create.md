# 1. Auto-patch packages/tokens/src/index.ts's brands array when creating a brand

## Status

Accepted

## Context

Creating a new brand means writing a sparse `packages/tokens/tokens/<Name>.tokens.json`
file. But that file alone doesn't get built into CSS — `packages/tokens/src/index.ts`
has a hardcoded `const brands = ['Tcs'] // add new brand names here` array that the
Style Dictionary build loops over. A brand created through Toky without also being
added to that array would silently produce no CSS output, with no error to signal it.

The alternative was to leave this as a manual follow-up, called out in the PR
description for a human to do in review. That's safer — Toky has otherwise only ever
written to `*.tokens.json` data files, never to TypeScript build source — but it means
"create a brand" doesn't actually finish the job in one step, and it's easy for the
manual follow-up to get missed.

## Decision

Toky's brand-creation submit also regex-patches the `const brands = [...]` line in
`packages/tokens/src/index.ts`, appending the new name, in the same PR as the new
token file. If the expected pattern isn't found (the file's shape has changed since
this was written), the whole submit fails with an explicit error rather than silently
creating the JSON file without wiring it in — same all-or-nothing guarantee the
token-diff submit path already has.

## Consequences

- Creating a brand is a genuinely one-step action — no manual follow-up PR needed for
  the common case.
- This is brittle by nature: if `index.ts`'s `brands` declaration is ever reshaped
  (renamed, split across lines, generated differently), the pattern match will stop
  matching and brand creation will hard-fail until this patch logic is updated to
  match. Anyone restructuring that file should grep for where Toky's regex lives and
  update it in the same change.
