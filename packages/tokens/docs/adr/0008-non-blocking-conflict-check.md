# 8. Conflict check comments, it doesn't block the merge

Date: 2026-08-06

Status: Accepted

## Context

`figma-conflict-check.yml` runs on the `toky/update-next` PR and can detect
a real Conflict (per [packages/tokens/CONTEXT.md](../../CONTEXT.md)'s
definition — both Figma and GitHub diverged from the sync baseline). The
job could fail as a required status check, blocking merge until resolved,
or it could just post a comment and let a human decide. The plugin plan
already took a position on the equivalent question for its own conflict
detection: "detecting and warning about conflicts, not resolving them" —
see [figma-token-sync-plugin-plan.md §8](../figma-token-sync-plugin-plan.md#8-future-extensions).

## Decision

The check posts/updates a PR comment listing conflicting tokens and always
passes. It never blocks merge. A human reviewer decides whether to merge
over a listed conflict (accepting that Pull will overwrite the Figma-side
change) or hold off.

## Consequences

- A conflict can be merged right past its own warning — the check has no
  teeth beyond visibility. This is accepted because the check itself can't
  resolve a conflict either way (per the plugin plan's stance above); a
  hard block would only ever be lifted by a human anyway, so it adds a step
  without adding a decision.
- If conflicts turn out to be common enough that they're getting merged
  through unnoticed, revisit this as a required check — but that's a
  reversal to make with evidence, not preemptively.
