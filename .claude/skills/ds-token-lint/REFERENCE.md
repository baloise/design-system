# ds-token-lint — Reference

Background for why this skill's rule checklist differs from a literal reading of STYLE_GUIDE.md's "Token Naming Anatomy" section, and how each rule is implemented.

## Why the checklist diverges from STYLE_GUIDE.md

STYLE_GUIDE.md documents this anatomy for component tokens:

```
--ds-button-primary-color-bg-base
       │       │      │   │    └─ state
       │       │      │   └─ property
       │       │      └─ category
       │       └─ variant
       └─ component
```

i.e. **variant before category**, with `--ds-button-color-primary-text` marked as the ❌ wrong-order example.

Checking the actual compiled tokens (`dist/css/base.tokens.css`) against this doc:

```
--ds-button-color-primary-base-text
--ds-button-color-primary-base-background
--ds-button-color-primary-base-border
--ds-badge-color-danger-background
--ds-badge-color-danger-text
```

The real, shipped order is **category before variant** (`color-primary-...`, not `primary-color-...`), driven directly by `Base.tokens.json`'s JSON nesting (`Button > Color > Primary > Base > Text`) joined straight into kebab-case by Style Dictionary. This is universal across every component checked — not an isolated exception.

By the literal STYLE_GUIDE.md rule, every existing component token in the library would be "wrong." That's not a useful signal — it means the doc's anatomy example is stale/aspirational, not that hundreds of shipped tokens are all broken. This skill trusts the real, consistent, shipped convention over the doc.

**Action item for someone who owns STYLE_GUIDE.md:** the "Token Naming Anatomy" section should be corrected to match reality (`component → category → variant → state → property`) or clearly marked as aspirational for a future format.

## What does still hold up

Not every STYLE_GUIDE.md rule was invalidated — checking against real data found:

- **`font-` prefix for typography**: genuinely inconsistent in practice today (`ds-accordion-summary-font-family` uses it, `ds-button-family` and `ds-badge-text-family` don't for the same kind of value). STYLE_GUIDE.md's `font-` prefix rule is a reasonable target to converge existing tokens toward — this is real drift, not a stale doc.
- **State segment vocabulary is closed**: `base`, `hover`, `active`, `disabled`, `focus`, `selected` recur consistently wherever a state segment appears. A typo here (`hoverr`, `actve`) is a real, checkable mistake.
- **A generic category/property vocabulary check is not viable**: a scan of every segment used across `dist/css/base.tokens.css` (excluding Alias/Global) turned up open-ended, legitimate element names — `item`, `tile`, `sidebar`, `progress`, `outline`, `dashed`, `upload`, `menu`, `circle`, `calendar`, and more. There's no fixed whitelist that wouldn't flag real, correct tokens. This rule was dropped rather than shipped as a source of false positives.
- **A required "state" segment on every color token is not viable**: `badge`'s colors (`--ds-badge-color-danger-background`) never have a state segment because badges aren't interactive. Requiring one would be wrong for non-interactive components.

## Rule implementation notes

### Rule 1 — Typography `font-` prefix

Detects a leaf token whose key is `Family`, `Weight`, `LineHeight`, or `Size` **and** whose `$value` resolves through the Alias `🔤 Text` typography category (regex match on the `$value` string for `🔤 Text.(Family|Weight|LineHeight|Size)`), and which isn't already nested under a `Font` grouping key.

Proposed fix:

- If the leaf already sits under some other wrapper key (e.g. `Text`), that wrapper is renamed to `Font`.
- If the leaf sits directly under the component (no wrapper), it's nested under a new `Font` group.

This is a heuristic, not a certainty — always show the proposed JSON restructuring to the user before applying, since a mis-detected wrapper rename could catch an unrelated sibling under the same key.

### Rule 2 — State vocabulary

A JSON object is treated as a "state group" once at least half of its non-`$`-prefixed children are already exact matches for the closed state set. Within a detected state group, any child that's a close (edit distance ≤ 2) but not exact match to a state word is flagged as a likely typo, with the nearest state word proposed as the fix.

Groups where fewer than half the children look state-like are left alone — that's ordinary component structure (e.g. color variant names), not a typo'd state group.

### Rule 3 — JSON key casing

Every non-`$`-prefixed key in the component's token subtree must match `/^[A-Z0-9][A-Za-z0-9]*$/` — PascalCase, or a bare acronym/number. A camelCase or snake_case key would still resolve through Style Dictionary, but the derived kebab-case CSS variable name would likely be wrong or inconsistent with the rest of the token's siblings, so it's flagged early rather than discovered later as a mismatched CSS variable.

## Name derivation

The skill derives a token's CSS variable name directly from its `Base.tokens.json` path (component key + kebab-cased JSON path segments), rather than running `pnpm tokens` and reading the compiled `dist/css/base.tokens.css`. This is faster and avoids a build dependency for the check phase, at the cost of needing to keep the kebab-case transform (`pascalToKebab` in `implementation.js`) in sync if Style Dictionary's own transform config ever changes.

## Scope limits (v1)

- **Base.tokens.json only.** `Tcs.tokens.json` (or any future brand file) is not scanned or updated. Per ADR-0012, brands are modes on the same variable rather than separate variables, so a component-layer override at the same path in a brand file would need the identical rename to stay matched — currently no component-layer tokens are overridden per-brand, so this is inert today, not silently broken.
- **Single component per run.** No `--all` mode; run once per component.
- **Whole-batch apply.** No per-row selection — approve the full table or none of it.
