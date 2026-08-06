# 7. VariableId backfill is a direct commit to `next`, not a PR

Date: 2026-08-06

Status: Accepted

## Context

When Pull (from Code) creates a new Figma Variable for a token that had no
`$extensions.com.figma.variableId` yet, that id has to be written back into
`next` or every subsequent sync re-creates a duplicate variable. Everywhere
else in this domain, a GitHub write is PR-mediated — see
[packages/tokens/CONTEXT.md](../../CONTEXT.md)'s "Push (to Code)" entry
("always via PR review, never a direct commit to `next`") and `toky.md`'s
PR-mediated-writes principle for the wider Toky design. A metadata-only PR
for this would need to be reviewed or auto-merged on every single token
creation, which is friction with no decision behind it — nobody is ever
going to reject "this token's variableId is now X."

## Decision

The Action writes the new `variableId`(s) directly to `next`, bundled with
the same run's `.figma-sync-state.json` baseline update, as one atomic
commit via the Git Data API ([ADR-0004](0004-git-data-api-atomic-commits.md)).
This is a deliberate, narrow exception to PR-mediated writes — scoped to
exactly this one case (a new id, no value change, no human judgment
involved) and nothing else the Action does.

## Consequences

- The Action's bot token needs branch-protection bypass rights on `next`
  scoped to this write path — a provisioning dependency, not just a
  permissions checkbox, since most of this repo's automation deliberately
  does *not* have that right.
- A future reader of `next`'s commit history will see bot commits with no
  matching PR — worth a comment at the call site pointing back here so it
  doesn't read as an accidental bypass of branch protection.
- If this exception is ever misused for anything beyond an id-only write
  (e.g. someone later adds a value change to the same commit "since it's
  already bypassing review"), that's a silent expansion of a boundary this
  ADR intentionally drew tight — worth another ADR if it happens, not a
  quiet code change.
