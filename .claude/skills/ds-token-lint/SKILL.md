---
name: ds-token-lint
description: Check a component's design tokens in Base.tokens.json against naming convention (packages/tokens/CONTEXT.md, STYLE_GUIDE.md), report violations as a markdown table, and apply approved renames to Base.tokens.json and the component's SCSS. Use when the user asks to lint/check/audit design tokens for a component.
---

# Token Lint

Checks a component's **Component-layer** design tokens (`🧩 Component > <ComponentName>` in `Base.tokens.json`) against the repo's real, empirically-verified naming convention — not the illustrative examples in STYLE_GUIDE.md's "Token Naming Anatomy" section, which document a segment order (`variant` before `category`) that the actual compiled tokens do not follow. See [REFERENCE.md](REFERENCE.md) for the discrepancy and why the rule checklist below diverges from that doc.

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

**Not checked** (deliberately dropped after verifying against real compiled tokens — see REFERENCE.md):

- Absolute segment order (`variant` before `category`, etc.) — the real convention is `component → category → variant → state → property`, driven by JSON nesting, and there's no single canonical order to enforce.
- A generic "category/property vocabulary" whitelist — element names (`tile`, `sidebar`, `outline`, `upload`, …) are legitimate, open vocabulary, not a fixed set.
- Whether a color token has a state segment — this is legitimately optional (non-interactive components like `badge` never have one).

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
node .claude/skills/ds-token-lint/index.js badge
```

If badge's tokens are compliant, prints "No naming violations found."

### Example 2: Component with drift

```bash
node .claude/skills/ds-token-lint/index.js button
```

Reports `--ds-button-family`, `--ds-button-weight`, `--ds-button-line-height`, and the `--ds-button-size-*` group as missing the `font-` prefix.

## Important Notes

- **Never commit** — per CLAUDE.md, leave all changes (Base.tokens.json, SCSS, changeset) unstaged for the user to review.
- **No backup file** — git is the safety net; changes stay unstaged until reviewed.
- Run from the design system repo root (or any subdirectory — the script walks up to find `packages/tokens/tokens/Base.tokens.json`).

## Related

See [REFERENCE.md](REFERENCE.md) for the empirical findings behind the rule checklist, [packages/tokens/CONTEXT.md](../../../packages/tokens/CONTEXT.md) for token architecture, and [STYLE_GUIDE.md](../../../docs/STYLE_GUIDE.md) for the (partially stale) naming anatomy doc.
