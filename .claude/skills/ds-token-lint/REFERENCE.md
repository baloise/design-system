# ds-token-lint — Reference

Background for how this skill's rule checklist was derived, and how each rule is implemented.

## Color variant/category order: real drift, not a stale doc

Both `STYLE_GUIDE.md`'s "Token Naming Anatomy" section and `packages/tokens/CONTEXT.md`'s "Naming Convention" → "Color order" document the same rule: **variant before category**.

```
--ds-button-primary-color-bg-base
       │       │      │   │    └─ state
       │       │      │   └─ property
       │       │      └─ category
       │       └─ variant
       └─ component
```

`--ds-button-color-primary-text` is CONTEXT.md's explicit ❌ wrong-order example.

Checking the actual compiled tokens (`dist/css/base.tokens.css`) against this doc:

```
--ds-button-color-primary-base-text
--ds-button-color-primary-base-background
--ds-button-color-primary-base-border
--ds-badge-color-danger-background
--ds-badge-color-danger-text
```

The shipped order is **category before variant** (`color-primary-...`, not `primary-color-...`), driven directly by `Base.tokens.json`'s JSON nesting (`Button > Color > Primary > Base > Text`) joined straight into kebab-case by Style Dictionary — universal across every component checked.

Initially this looked like the doc was stale/aspirational (flagging every shipped token as "wrong" isn't a useful signal from a one-off check). But this is a documented, intentional convention that the token system is being migrated toward component by component — not a doc to reconcile away. `checkColorVariantOrder` in `implementation.js` now enforces it: any leaf whose path starts with `Color` (category as the top-level key) gets its first two segments swapped so variant leads.

**Scope of the fix**: only the variant/category swap. `state` vs `property` ordering (`Base > Text` vs `Text > Base`) is left alone — see "What does still hold up" below.

## What does still hold up

Not every STYLE_GUIDE.md rule was invalidated — checking against real data found:

- **`font-` prefix for typography**: genuinely inconsistent in practice today (`ds-accordion-summary-font-family` uses it, `ds-button-family` and `ds-badge-text-family` don't for the same kind of value). STYLE_GUIDE.md's `font-` prefix rule is a reasonable target to converge existing tokens toward — this is real drift, not a stale doc.
- **State segment vocabulary is closed**: `base`, `hover`, `active`, `disabled`, `focus`, `selected` recur consistently wherever a state segment appears. A typo here (`hoverr`, `actve`) is a real, checkable mistake.
- **A generic category/property vocabulary check is not viable**: a scan of every segment used across `dist/css/base.tokens.css` (excluding Alias/Global) turned up open-ended, legitimate element names — `item`, `tile`, `sidebar`, `progress`, `outline`, `dashed`, `upload`, `menu`, `circle`, `calendar`, and more. There's no fixed whitelist that wouldn't flag real, correct tokens. This rule was dropped rather than shipped as a source of false positives.
- **A required "state" segment on every color token is not viable**: `badge`'s colors (`--ds-badge-color-danger-background`) never have a state segment because badges aren't interactive. Requiring one would be wrong for non-interactive components.

## Rule implementation notes

### Rule 1 — Color variant/category order

Detects a leaf whose `jsonPath[0] === 'Color'` — i.e. `Color` is the top-level key directly under the component, with the variant (`Base`, `Danger`, `Primary`, ...) nested one level below it. This only checks the top-level shape, not every depth, for two reasons: every real component's `Color` tree is currently structured this way with `Color` as the direct child of the component, and checking only the top level makes the fix idempotent — after applying, the leaf's first segment is the variant (not `Color`), so a re-run naturally stops matching instead of swapping it back and forth.

Proposed fix: swap the first two path segments — `[Color, Variant, ...rest]` → `[Variant, Color, ...rest]`. Deeper segments (state, property) are left untouched; see "What does still hold up" above for why state/property order isn't part of this rule.

**SCSS interpolation gotcha**: several components build the variant segment of a color var dynamically in an `@each $color in (...)` loop instead of writing a fully-resolved name, e.g. `--ds-badge-color-#{$color}-text` in `badge.host.scss` (same pattern in `button.style.scss`, `card.style.scss`, `toast.host.scss`, `snackbar.host.scss`). The literal `renameMap` replace (`var(--ds-old-name)` → `var(--ds-new-name)`) can never match this — there is no literal `--ds-badge-color-danger-text` string in the file — so `applyFixes` runs a second, structural pass whenever a `color-variant-order` violation is in the batch: it matches `--ds-<component>-color-#{...}-` and swaps to `--ds-<component>-#{...}-color-`, mirroring the JSON path swap instead of a literal string swap. Without this, the rename would silently leave the `@each` block pointing at tokens that no longer exist.

### Rule 2 — Typography `font-` prefix

Detects a leaf token whose key is `Family`, `Weight`, `LineHeight`, or `Size` **and** whose `$value` resolves through the Alias `🔤 Text` typography category (regex match on the `$value` string for `🔤 Text.(Family|Weight|LineHeight|Size)`), and which isn't already nested under a `Font` grouping key.

Proposed fix:

- If the leaf already sits under some other wrapper key (e.g. `Text`), that wrapper is renamed to `Font`.
- If the leaf sits directly under the component (no wrapper), it's nested under a new `Font` group.

This is a heuristic, not a certainty — always show the proposed JSON restructuring to the user before applying, since a mis-detected wrapper rename could catch an unrelated sibling under the same key.

### Rule 3 — State vocabulary

A JSON object is treated as a "state group" once at least half of its non-`$`-prefixed children are already exact matches for the closed state set. Within a detected state group, any child that's a close (edit distance ≤ 2) but not exact match to a state word is flagged as a likely typo, with the nearest state word proposed as the fix.

Groups where fewer than half the children look state-like are left alone — that's ordinary component structure (e.g. color variant names), not a typo'd state group.

Note this set includes `Base`, which is also used as a default/no-variant _name_ (e.g. `Badge > Color > Base`) rather than a runtime state — Rule 1 doesn't consult this set at all, precisely to avoid that ambiguity; it treats whatever immediately follows `Color` as the variant regardless of whether that word happens to also be a state word.

### Rule 4 — JSON key casing

Every non-`$`-prefixed key in the component's token subtree must match `/^[A-Z0-9][A-Za-z0-9]*$/` — PascalCase, or a bare acronym/number. A camelCase or snake_case key would still resolve through Style Dictionary, but the derived kebab-case CSS variable name would likely be wrong or inconsistent with the rest of the token's siblings, so it's flagged early rather than discovered later as a mismatched CSS variable.

## Name derivation

The skill derives a token's CSS variable name directly from its `Base.tokens.json` path (component key + kebab-cased JSON path segments), rather than running `pnpm tokens` and reading the compiled `dist/css/base.tokens.css`. This is faster and avoids a build dependency for the check phase, at the cost of needing to keep the kebab-case transform (`pascalToKebab` in `implementation.js`) in sync if Style Dictionary's own transform config ever changes.

## Scope limits (v1)

- **Base.tokens.json only.** `Tcs.tokens.json` (or any future brand file) is not scanned or updated. Per ADR-0012, brands are modes on the same variable rather than separate variables, so a component-layer override at the same path in a brand file would need the identical rename to stay matched — currently no component-layer tokens are overridden per-brand, so this is inert today, not silently broken.
- **Single component per run.** No `--all` mode; run once per component.
- **Whole-batch apply.** No per-row selection — approve the full table or none of it.
