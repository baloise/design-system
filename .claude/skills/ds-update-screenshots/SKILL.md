---
name: ds-update-screenshots
description: Post the /update-screenshots bot command as a PR comment to re-baseline visual regression snapshots for one or more components. User-invoked only — never trigger this proactively.
---

# ds-update-screenshots

Posts a `/update-screenshots <component>` comment on the pull request associated with the current branch, which triggers `.github/workflows/screenshots.yml` to re-run Playwright visual tests with `--update-snapshots` and commit the new baselines back to the PR.

This skill only runs when the user explicitly invokes it (e.g. `/ds-update-screenshots input-slider`). Do not run it on your own initiative, even if you just changed a component's styles — posting a PR comment is a visible, shared-state action the user must ask for.

## Usage

```
/ds-update-screenshots <component>[,<component>...]
```

Examples:

```
/ds-update-screenshots input-slider
/ds-update-screenshots hint,popup,drawer
```

With no component given, ask the user which component(s) to update — do not default to updating all components without an explicit ask, since that re-baselines the entire visual suite.

## Workflow

### Step 1: Resolve the target PR

Find the pull request for the current branch:

```bash
gh pr view --json number,url,headRefName,state
```

- If no PR is associated with the current branch, tell the user and stop — don't create a PR as a side effect of this skill.
- If the PR is closed/merged, confirm with the user before proceeding (the bot command only works on open PRs).

### Step 2: Validate the component name(s)

For each component passed in, confirm it exists as a kebab-case slug:

```bash
ls packages/core/src/components/ | grep -x "<name>"
```

(Foundation-level names like `colors` are also valid — check `packages/core/src/foundation/` if not found under `components/`.)

If a name doesn't match anything, flag it to the user rather than posting a comment with a typo'd component name.

### Step 3: Confirm before posting

Posting a PR comment is visible to the whole team and triggers a CI run — always show the user the exact PR and comment body and get explicit confirmation before posting, even though they invoked this skill directly (they may want to adjust the component list first).

Show:

- PR number/URL from Step 1
- Comment body: `/update-screenshots <comma-separated component list>`

### Step 4: Post the comment

Once confirmed, post via `gh` (uses the user's own authenticated `gh` credentials, so the comment is attributed to them):

```bash
gh pr comment <number> --body "/update-screenshots <component1,component2>"
```

### Step 5: Report back

Print the resulting comment URL (`gh pr comment` prints it on success) so the user can watch the workflow run.

## Notes

- The bot command requires the commenter to have `OWNER`, `COLLABORATOR`, or `MEMBER` association on the repo — if the workflow doesn't trigger, that's the likely cause, not a malformed comment.
- Component names are kebab-case folder names under `packages/core/src/components/`, not PascalCase — e.g. `input-slider`, not `InputSlider`.
- See `ARCHITECTURE.md` ("Bot Commands" table) and `CONTRIBUTING.md` for the full list of supported PR bot commands (`/update-screenshots`, `/snapshot`, `/cib`).
