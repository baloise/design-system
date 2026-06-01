---
name: ds-vars-to-tokens
description: Analyze and sync a component's CSS variable usage with design tokens
---

# sync-component-tokens

Analyze and sync a component's CSS variable usage with the design token JSON and compiled output.

## Usage

```bash
/sync-component-tokens <component-name>
```

## What it does

1. **Identifies CSS variable usage** in `.style.scss`, `.host.scss`, and `*.mixin.scss` files
2. **Validates against JSON** to find missing or misaligned component tokens
3. **Reports violations** before making any changes
4. **Applies fixes** interactively (user confirms each action)
5. **Rebuilds tokens** with `npm run tokens` to ensure consistency

## Core Rule

**Components must NEVER reference alias or global `--ds-*` tokens directly.**

Every `var(--ds-color-*)`, `var(--ds-text-*)`, etc. used in a component's SCSS must be wrapped in a component-specific token (`--ds-<component>-*`).

## Example

```bash
/sync-component-tokens button
```

**Output:**

```
Component: ds-button (Button)

Violations found (3):
  ✗ button.style.scss:43
    vars.local(segment-item-color, var(--ds-color-primary-4))
    → Create --ds-button-segment-item-color

  ✗ button.host.scss:12
    var(--ds-text-weight-bold) used directly
    → Create --ds-button-text-weight

  ⚠ button.style.scss:27
    vars.local(button-gap, 0.5rem) [hardcoded]
    → Tokenize as --ds-button-gap?

Proceed with fixes? [y/n]
```

After approval:

```
Sync complete for ds-button:

Violations fixed (2):
  + Created --ds-button-segment-item-color (aliases --ds-color-primary-4)
  + Created --ds-button-text-weight (aliases --ds-text-weight-bold)

Candidates declined (1):
  button-gap = 0.5rem

Rebuilt tokens:
  ✓ npm run tokens successful

✅ Component tokens synced!
```

## Requirements

- Component directory exists: `packages/core/src/components/<name>/`
- At least one SCSS file present: `.style.scss`, `.host.scss`, or `*.mixin.scss`
- JSON file exists: `packages/tokens/tokens/Base.tokens.json`

## What Gets Fixed

✅ Missing component tokens (referenced in `vars.local()`)
✅ Direct alias/global refs in CSS rules (wrapped with private vars)
✅ Modifier vars with missing design tokens (reported)

## What Gets Tokenized (on approval)

⚠️ Hardcoded `vars.local()` literals (e.g., `0.5rem` → `--ds-button-gap`)

## Files Analyzed

- `<component>.style.scss` (if exists)
- `<component>.host.scss` (if exists)
- `<component>.mixin.scss` or any `*.mixin.scss` (if exists)
- At least one must be present

## Token Verification

The skill parses `Base.tokens.json` directly (source of truth) and always rebuilds with `npm run tokens` to ensure consistency.
