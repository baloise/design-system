# 21. Extract shared CSS variable naming/serialization instead of duplicating in Toky

Package: `packages/tokens`, `apps/toky`

Date: 2026-08-08

## Status

Accepted

## Context

Toky's live token preview (see [`docs/plans/toky-live-token-preview-plan.md`](../plans/toky-live-token-preview-plan.md)) needs to turn a token's path into its final `--ds-*` CSS custom property name, and its resolved DTCG value into a CSS-ready string, so it can `postMessage` changed tokens to the `packages/core` preview iframe. `packages/tokens/src/transformers.ts` (`ds/css/name`) and `packages/tokens/src/formatter.ts` already implement this logic for the Style Dictionary build pipeline, but as functions shaped around Style-Dictionary `token` objects, not plain path arrays/DTCG values — reusing them as-is isn't possible without a small refactor.

The alternative was to duplicate the ~30 lines directly in `apps/toky`, annotated with a comment pointing back at the source of truth. That's faster short-term, but the two copies silently drift whenever a DTCG value shape changes (e.g. a new token `$type`) and only one side gets updated — a bug that shows up as "the preview lied," which is the one failure mode this feature exists to prevent.

## Decision

Extract pure functions (name transform, value serialization) out of `packages/tokens`' Style Dictionary transforms and export them from the package. The Style Dictionary transform becomes a thin wrapper calling the pure function; `apps/toky` imports the same function instead of reimplementing it.

## Consequences

- `apps/toky` gains a workspace dependency on `packages/tokens`.
- Adding a new DTCG `$type`/value shape to the token pipeline updates preview rendering for free, instead of requiring a matching edit in two places.
