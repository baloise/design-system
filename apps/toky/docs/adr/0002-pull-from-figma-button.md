# 2. A Toky button owns Pull (from Figma), staged through working changes

## Status

Accepted. Supersedes the part of [ADR-0016](../../../docs/adr/0016-github-action-supersedes-plugin-pull.md)
that scoped this direction (there called "Push, Figma→GitHub") to Phase 3 of a
designer-facing Figma plugin.

## Context

Reading Figma Variable changes back into `*.tokens.json` — this repo's Pull (from
Figma), see [`packages/tokens/CONTEXT.md`](../../../packages/tokens/CONTEXT.md) — was
previously planned as a Figma plugin feature: a designer opens the plugin and pushes
their edits out to GitHub. That plugin was never built. Meanwhile Toky already owns
the only reviewed path from token edits to a GitHub PR (manual edits → working changes
→ Submit → `/api/propose-change`), and already holds the GitHub write credentials
server-side. Adding Pull (from Figma) as a Toky button reuses that entire review/PR
pipeline instead of building a second one inside a Figma plugin.

## Decision

- A server-side Toky API route reads Figma Variables (reusing/adapting
  `scripts/figma-sync/lib/figma.mjs`) — the Figma API token never reaches the browser,
  matching how the GitHub token is already handled in `propose-change`.
- Matching a Figma variable to a token is by `variableId` only. No match ⇒ always a new
  token (`create`); never guessed by name — a wrong name-based match would silently
  mis-attach a `variableId` to the wrong token, and there's no live-Figma-file way to
  double-check the guess.
- A token whose `variableId` no longer exists in Figma ⇒ proposed as a `delete`.
- One pull always covers Base + every brand in a single pass — Figma is one file, so a
  partial pull would leave the user unsure whether an out-of-view brand is stale.
- Both literal values and alias/reference values are handled (inverting
  `figma-value.mjs` and `alias.mjs`'s existing one-directional mappings).
- Colors are compared with tolerance (rounded to the same hex), not bit-exact — Figma's
  API round-trips floats and would otherwise produce spurious diffs on every pull.
- A variable Toky can't map (unsupported type/shape) is skipped and listed as a
  warning, not a hard failure of the whole pull.
- The full diff is computed and shown in a summary dialog (counts of
  created/updated/deleted/conflicting/skipped) with an Apply/Cancel gate — nothing
  touches working changes until confirmed, since a single pull can touch far more
  tokens than a person would ever hand-type in one sitting.
- A **Pull conflict** — a token edited in working changes _and_ changed in Figma since
  that edit — is surfaced for explicit resolution, never auto-resolved either
  direction. Non-conflicting changes still land in working changes immediately;
  **Submit is blocked while any Pull conflict is unresolved.**
- Every working-change entry created by a pull is tagged with its provenance (Figma vs.
  manual), shown in the staged-changes sidebar and carried into the PR/changeset text.

## Consequences

- Pull (from Figma) and manual edits share one working-changes state and one Submit
  path — no separate review surface to keep in sync.
- The Figma plugin's Phase 3 (per the original plan) is dropped; if a designer-driven,
  in-Figma trigger is wanted later, that would need un-superseding this decision, not
  just resuming the old plan.
- Alias/reference support means a pull can rewrite what a token points at, not just its
  literal value — this is more surface area than a literal-only pull would have had,
  chosen deliberately over deferring it, so bugs in alias resolution affect Pull (from
  Figma) from day one.
