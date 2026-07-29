---
name: ds-changeset
description: Create a changeset entry for pending changes using the repo's create-changeset.mjs CLI. Use when the user asks to add/create a changeset, or wants their current changes recorded for the changelog.
---

# ds-changeset

Creates a changeset file (`.changeset/*.md`) for the current changes by driving the repo's existing CLI, `scripts/create-changeset.mjs`, non-interactively — no reimplementation of that logic here.

## Workflow

### Step 1: Understand the change

Look at the changes to be recorded (uncommitted diff by default, or the diff/commits the user points to):

```bash
git status --short
git diff
git diff --staged
```

Use this to determine:

- **Bump level** — `patch` (bug fixes, dependency bumps, docs), `minor` (new features, non-breaking additions), or `major` (breaking changes). Ask the user if it's ambiguous.
- **Scope(s)** — one or more entries from the same combined list the interactive prompt offers:
  - Packages: `core`, `angular`, `css`, `devkit`, `testing`, `tokens`, `react`, `table`, `assets`, `deps`, `a11y`
  - Components: derived from the changed file paths under `packages/core/src/components/<name>/` (e.g. a change in `packages/core/src/components/input-slider/` → scope `input-slider`)
  - Combine both when relevant, e.g. `core` + `input-slider` for a component-level change in core.
- **Summary** — a concise, single-line description of the change (same tone as existing entries in `.changeset/*.md` or `CHANGELOG.md` files — imperative, no trailing period).

If multiple unrelated changes are staged, create one changeset per logical change (run the command multiple times) rather than combining them into one summary.

### Step 2: Run the CLI non-interactively

```bash
node scripts/create-changeset.mjs --bump=<patch|minor|major> --scope=<scope1,scope2,...> --summary="<summary>"
```

Example:

```bash
node scripts/create-changeset.mjs --bump=minor --scope=core,input-slider --summary="Add keyboard support for range slider"
```

This reuses the exact same `writeChangeset()` logic as the interactive `pnpm changeset` flow (same file format, same `pnpm exec changeset add --empty` filename generation) — only the input source differs.

### Step 3: Confirm

Report the created file path and print its contents so the user can review it before committing:

```bash
cat .changeset/<generated-name>.md
```

Do not stage or commit the file — leave it for the user to review.

## Notes

- The scope becomes the bold label in the changelog entry, e.g. `**core/input-slider**: Add keyboard support for range slider`.
- If unsure which components were touched, list the directories under `packages/core/src/components/` referenced in the diff rather than guessing.
- For non-code changes affecting the whole system (e.g. dependency bumps across the workspace), `deps` is an acceptable standalone scope.
