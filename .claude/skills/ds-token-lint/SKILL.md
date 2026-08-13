---
name: ds-token-lint
description: Check a component's design tokens in Base.tokens.json against the canonical naming convention (packages/tokens/CONTEXT.md "Token Naming Anatomy"), report violations as a markdown table, and apply approved renames to Base.tokens.json and the component's SCSS. Use when the user asks to lint/check/audit design tokens for a component.
---

# Token Lint

Checks a component's **Component-layer** design tokens (`🧩 Component > <ComponentName>` in `Base.tokens.json`) against `packages/tokens/CONTEXT.md`'s "Token Naming Anatomy" — the canonical order:

```
--ds - component - variant - element - category - property - state
```

This doc is the source of truth, not whatever a given component currently ships. An earlier version of this skill trusted "the real, empirically-verified convention" over the doc, on the finding that most shipped tokens don't follow it (`category` before `variant`, not after). That finding still stands as a description of _today's_ state — but it's exactly the drift this skill exists to close, not a convention to defer to. See [REFERENCE.md](REFERENCE.md) for that history and why the checklist below no longer treats shipped tokens as authoritative.

**The convergence model is one component at a time.** Every run targets a single component; there's no `--all`. Work through components one by one, review + apply + changeset each before moving to the next, so the codebase moves steadily toward a single naming convention instead of accumulating a second, half-migrated one. Don't skip around — finish (or consciously defer) one component before starting the next, so it's always clear which components are done.

Two phases: **Check** (report violations) and **Apply** (write approved renames).

## Quick Start

Check a component's tokens:

```bash
node .claude/skills/ds-token-lint/index.js button
```

Output: markdown table of violations, printed to the terminal.

After the user approves the table, apply the fixes:

```bash
node .claude/skills/ds-token-lint/index.js button --apply
```

Output: summary of renamed tokens and updated files.

## What Gets Checked

Scope is **Component-layer tokens only** — everything under `🧩 Component > <ComponentName>` in `packages/tokens/tokens/Base.tokens.json`. Alias/Global token _usage_ inside a component's SCSS is `ds-lint-component`'s job, not this skill's.

1. **Typography `font-` prefix** — a leaf key of `Family`, `Weight`, `LineHeight`, or `Size` whose value resolves through the Alias `🔤 Text` typography category, but isn't grouped under a `Font` key, is flagged (e.g. `--ds-button-family` → `--ds-button-font-family`). This is real, present drift — some components already use `Font` (e.g. `ds-accordion-summary-font-family`), others don't (`ds-button-family`, `ds-badge-text-family`).
2. **State vocabulary** — when a group of sibling JSON keys looks like a state group (at least half its members are already `Base`/`Hover`/`Active`/`Disabled`/`Focus`/`Selected`), any sibling that's a close misspelling of one of those (edit distance ≤ 2) is flagged as a likely typo.
3. **JSON key casing** — every key under the component's token tree must be PascalCase (or a bare acronym/number). camelCase or snake_case keys break Style Dictionary's kebab-case transform in ways that are easy to miss.
4. **Segment order** — a leaf's JSON path is checked against the canonical anatomy (`component → variant → element → category → property → state`). `category` is the closed set `Color`/`Space` (`Font` is deliberately excluded — see below). `state` is the closed set from Rule 2, with the same sibling-context disambiguation: a state word (`Base` in particular) only counts as `state` when its actual JSON siblings look like a state group; a lone `Base`, or one sibling to `Info`/`Success`/`Danger`/…, is treated as a variant instead — matching how its non-`Base` siblings are already classified. Everything that's neither `category` nor `state` is `variant`/`element` (the two aren't separately distinguishable — both are open vocabulary), and the segment closest to the value is treated as `property`. Flagged when the actual order doesn't match `[...variant/element, ...category, property, ...state]` (e.g. `--ds-button-color-primary-base-text` → `--ds-button-primary-color-text-base`). Skipped (not enough signal to safely reorder) when fewer than two non-category, non-state segments are present — in that case only the unambiguous part is still enforced: a state segment must be terminal.
5. **Disallowed abbreviations** — a path segment containing the word `Bg` (whole, e.g. `Bg`, or as part of a compound, e.g. `ProgressBg`) is flagged; the full word `Background` is required instead (e.g. `--ds-toast-primary-color-bg-base` → `--ds-toast-primary-color-background-base`, `ProgressBg` → `ProgressBackground`). `bg` → `background` is currently the only entry in this vocabulary — extend `ABBREVIATIONS` in `implementation.js` if another shorthand needs closing off the same way.

**Not checked**:

- A generic "category/property vocabulary" whitelist — element names (`tile`, `sidebar`, `outline`, `upload`, `progress`, …) are legitimate, open vocabulary, not a fixed set. Rule 4 only classifies the closed-vocabulary `category`/`state` segments; everything else is left as-is, relative to itself.
- Whether a color token has a state segment — this is legitimately optional (non-interactive components like `badge` never have one). Rule 4 doesn't require a `state` segment to exist, only that one is terminal when it does.
- Reordering around `Font` groupings — Rule 4 excludes `Font` from its `category` vocabulary on purpose, so it doesn't fight Rule 1 over the same leaf in one pass. Fix Rule 1's `font-` prefix drift first, then re-run the check — Rule 4 will see the now-grouped `Font` segment as an ordinary `variant`/`element` segment and check the rest of the path around it.

**A safety note on Rules 4 and 5 co-occurring**: if a single token trips both a segment-order violation and an abbreviation violation, `--apply` refuses the whole batch with an error rather than risk silently dropping one of the two fixes (each violation's fix is applied against the pre-fix tree independently, so a second fix targeting an already-moved leaf would otherwise no-op). This hasn't happened yet against real data. If it does, this skill has no per-row apply — resolve it by hand-editing that one token's rename directly in `Base.tokens.json` (folding both fixes into a single move), then re-run the check to confirm it's clean before applying the rest of the batch normally.

## Workflow

### Phase 1: Check (Report)

```bash
node .claude/skills/ds-token-lint/index.js button
```

Prints a markdown table:

```
| # | Current Token | Violation | Proposed Fix |
|---|---|---|---|
| 1 | `--ds-button-family` | Typography token missing "font-" prefix | `--ds-button-font-family` |
| 2 | `--ds-button-weight` | Typography token missing "font-" prefix | `--ds-button-font-weight` |
```

Show this table to the user and ask for approval **before** running `--apply` — renaming a shipped token is a breaking change for consumers (`packages/tokens/CONTEXT.md`, "Naming is immutable"). Approval is whole-batch: either apply every row in the table, or none. If the user wants a subset, re-run after they've told you which rows to skip and adjust manually.

### Phase 2: Apply (only after explicit approval)

```bash
node .claude/skills/ds-token-lint/index.js button --apply
```

This:

1. Renames the token(s) in place in `Base.tokens.json`, preserving `$extensions.com.figma.variableId` (renaming is not delete+add — see ADR-0011, Figma Variable identity is `variableId`, not name).
2. Rewrites every `var(--ds-old-name)` reference across `packages/core/src/**/*.scss` and `packages/css/src/**/*.scss`.
3. Runs `pnpm tokens` to recompile `dist/css/base.tokens.css`, `dist/scss/_tokens.scss`, `dist/json/tokens.json`.

**After applying, invoke the `ds-changeset` skill** (bump: `major`, scope: `tokens` + the component name) — every rename here is a breaking change and must be recorded, per project convention.

`Tcs.tokens.json` (and any future brand file) is out of scope for v1 — currently no component-layer tokens are overridden there. If a future brand file does override a path this skill renames, it will go out of sync silently; check for that manually until brand-file support is added.

## Examples

### Example 1: Clean component

```bash
node .claude/skills/ds-token-lint/index.js toast
```

Toast already nests `variant → category → element → state` (e.g. `--ds-toast-primary-color-progress-bar-base`), which happens to satisfy Rule 4 as-is (no separate `property` segment beyond the element itself) — prints "No naming violations found."

### Example 2: Component with drift

```bash
node .claude/skills/ds-token-lint/index.js button
```

Reports `--ds-button-family`, `--ds-button-weight`, `--ds-button-line-height`, and the `--ds-button-size-*` group as missing the `font-` prefix, plus every `--ds-button-color-*` token as segment-order violations (e.g. `--ds-button-color-primary-base-text` → `--ds-button-primary-color-text-base`).

## Important Notes

- **Never commit** — per CLAUDE.md, leave all changes (Base.tokens.json, SCSS, changeset) unstaged for the user to review.
- **No backup file** — git is the safety net; changes stay unstaged until reviewed.
- Run from the design system repo root (or any subdirectory — the script walks up to find `packages/tokens/tokens/Base.tokens.json`).

## Related

See [REFERENCE.md](REFERENCE.md) for the history behind this skill's stance (why it used to defer to shipped tokens, and why it now treats the doc as canonical instead) and implementation notes per rule, and [packages/tokens/CONTEXT.md](../../../packages/tokens/CONTEXT.md) for the "Token Naming Anatomy" section this skill enforces.
