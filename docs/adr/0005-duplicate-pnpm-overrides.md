# 5. Duplicate pnpm `overrides` in both `pnpm-workspace.yaml` and `package.json`

Package: repo-wide

Date: 2026-07-21

## Status

Accepted

## Context

pnpm dependency overrides (used here to force patched versions of
transitive devDependencies like `brace-expansion` and `js-yaml` that carry
high-severity advisories) moved from `package.json`'s `pnpm.overrides`
field to `pnpm-workspace.yaml`'s `overrides` field in pnpm 11. Running
`pnpm install` locally (pnpm 11.12.0) now prints:

```
[WARN] The "pnpm" field in package.json is no longer read by pnpm. The
following keys were ignored: "pnpm.overrides".
```

...and only applies the `pnpm-workspace.yaml` copy. This makes the
`package.json` copy look like dead config that should be deleted.

It isn't. Removing it broke the Vercel build: `pnpm install
--frozen-lockfile` (configured in `vercel.json`) failed there once
`package.json`'s `pnpm.overrides` no longer matched what the lockfile
expected, even though `pnpm-workspace.yaml`'s `overrides` were untouched
and the exact same `pnpm@11.12.0` is pinned via `packageManager` and
resolved through corepack (`ENABLE_EXPERIMENTAL_COREPACK=1`). In practice,
Vercel's install path is sensitive to the `package.json` copy in a way
local pnpm is not.

## Decision

Keep both override blocks — `overrides` in `pnpm-workspace.yaml` and
`pnpm.overrides` in `package.json` — and require them to stay identical.

Enforcement:

- `scripts/check-overrides.mjs` parses both files and fails if the
  override sets don't match exactly (ignoring an informational
  `_comment` key in `package.json`'s block, see below).
- The root `lint` script (`package.json`) runs this check after `turbo
run lint`, so it runs in CI alongside normal linting and fails the
  build on drift.
- Each file carries a short comment pointing at the other and at this
  ADR. `package.json` is strict JSON and can't hold a `//` comment, so
  the pointer lives as a `_comment` string _sibling_ of `overrides`
  inside the `pnpm` object — not a key inside the `overrides` map
  itself, where pnpm would try to parse it as a `package@range` rule
  and fail on `"Kept in sync..."` not being a valid version.

When adding, changing, or removing an override: update both files in the
same commit. The check script will catch it if you forget.

## Consequences

- Two files to touch for one logical change; mildly annoying but cheap
  compared to a broken Vercel deploy.
- The `_comment` key is invisible to pnpm's override resolution (it's
  outside the `overrides` map) but is technically dead data from pnpm's
  point of view — it exists purely for the next human reading the file.
- If a future pnpm/Vercel upgrade makes `pnpm-workspace.yaml` the single
  source of truth everywhere, this ADR and the duplication it describes
  should be revisited and likely deleted.
