# 9. Pull deletes the Figma Variable when a token is removed

Date: 2026-08-06

Status: Accepted

## Context

The plugin plan treats Figma Variable deletion as deliberately dangerous:
"extra confirmation step, excluded from 'Apply All'" — because deleting a
Variable is destructive on Figma's side and the plugin's Push direction is
designer-initiated, so a confirmation step is cheap to insert. The GitHub
Action's Pull direction has no human in the loop at sync time — it runs
unattended after every Toky-branch merge.

## Decision

When a merged PR removes a token that carries a `variableId`, Pull deletes
the matching Figma Variable in the same run, keeping Figma an exact mirror
of `next`. No confirmation step, no orphan-flagging fallback.

## Consequences

- A token deletion that later turns out to be a mistake takes the Figma
  Variable down with it, irreversibly, before anyone reviewing the Toky PR
  gets a second unattended checkpoint — the PR review that already
  happened (per Toky's PR-mediated-writes principle) is the only gate.
  This is accepted as consistent with "GitHub is the sole source of truth":
  a merged deletion is not tentative.
- This is a real deviation from the plugin's deletion-safety stance, scoped
  specifically to this automated path — the plugin's own Push-side
  deletion handling is untouched by this decision.
