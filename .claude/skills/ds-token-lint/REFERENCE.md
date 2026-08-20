# ds-token-lint — Reference

Background for how this skill's stance on "what's correct" changed, and how each rule is implemented.

## Current stance: the doc is canonical

`packages/tokens/CONTEXT.md`'s "Token Naming Anatomy" section (`component → variant → element → category → property → state`) is the source of truth this skill enforces. Where a shipped component's tokens disagree with it, the _tokens_ are what's wrong, not the doc — and fixing that, one component at a time, is this skill's job (Rule 4, added after the finding below). This reverses an earlier version of this skill, which took the opposite position; that history is kept below because the underlying empirical finding (what's actually shipped today) is still accurate and still useful context — it's the _conclusion drawn from it_ that changed.

## History: why an earlier version of this skill deferred to shipped tokens instead

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

By the literal STYLE_GUIDE.md rule, every existing component token in the library would be "wrong." The earlier version of this skill treated that as proof the doc's anatomy example was stale/aspirational rather than evidence that hundreds of shipped tokens needed fixing, and trusted the real, consistent, shipped convention over the doc as a result.

**That conclusion was overturned by explicit project decision**: `packages/tokens/CONTEXT.md`'s anatomy is the truth, full stop — not because the doc happens to already match what's shipped (it doesn't, for most components), but because a single enforced convention is the goal, and the doc is the one place that convention is written down. "Every existing token is wrong" isn't a reason to abandon the rule; it's the punch list Rule 4 exists to work through, one component per run. See "Current stance" above.

## What does still hold up

Not every STYLE_GUIDE.md rule was invalidated — checking against real data found:

- **`font-` prefix for typography**: genuinely inconsistent in practice today (`ds-accordion-summary-font-family` uses it, `ds-button-family` and `ds-badge-text-family` don't for the same kind of value). STYLE_GUIDE.md's `font-` prefix rule is a reasonable target to converge existing tokens toward — this is real drift, not a stale doc.
- **State segment vocabulary is closed**: `base`, `hover`, `active`, `disabled`, `focus`, `selected` recur consistently wherever a state segment appears. A typo here (`hoverr`, `actve`) is a real, checkable mistake.
- **A generic category/property/element vocabulary check is not viable**: a scan of every segment used across `dist/css/base.tokens.css` (excluding Alias/Global) turned up open-ended, legitimate element names — `item`, `tile`, `sidebar`, `progress`, `outline`, `dashed`, `upload`, `menu`, `circle`, `calendar`, and more. There's no fixed whitelist that wouldn't flag real, correct tokens. Rule 4 (added later, see below) sidesteps this: it only closes the vocabulary for `category` (`Color`/`Space`) and `state` (the Rule 2 set), and leaves `variant`/`element`/`property` as open, unclassified segments whose _relative order among themselves_ is preserved rather than judged.
- **A required "state" segment on every color token is not viable**: `badge`'s colors (`--ds-badge-color-danger-background`) never have a state segment because badges aren't interactive. Requiring one would be wrong for non-interactive components. Rule 4 reflects this too — it never requires a `state` segment to exist, only that one is terminal when present.

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

### Rule 4 — Segment order

Checks each leaf's JSON path against the canonical anatomy (`component → variant → element → category → property → state`) from `packages/tokens/CONTEXT.md`. `variant` and `element` are never distinguished from each other — both are open vocabulary, and there's no way to tell "primary" (variant) from "progress-bar" (element) short of a hardcoded per-token list, which is exactly the kind of whitelist ruled out above. They're grouped as a single `other` bucket, order preserved among themselves.

Classification per path segment, walking the path from the component root down:

- **`state`**: a member of the Rule 2 closed set (`Base`/`Hover`/`Active`/`Disabled`/`Focus`/`Selected`) — _unless_ its actual JSON siblings at that point in the tree supply positive evidence it's being used as a variant name instead. That evidence is: at least two siblings, fewer than half of which are state words (e.g. `Base` sibling to `Info`/`Success`/`Warning`/`Danger`/… under Badge's `Color`). A lone `Base` with no siblings to compare against — the common case for a component with only one, un-varied state — defaults to `state`, not variant. Getting this backwards was an actual bug caught while building the rule: an earlier version required _positive_ evidence to trust `Base` as a state, which flipped every single-state component's `Base` into a bogus `property` position. The fix is the version described here — trust the closed vocabulary by default, and only defer to sibling context when there's a real competing signal.
- **`category`**: a member of `CATEGORY_WORDS = {Color, Space}`. `Font` is deliberately excluded, so Rule 4 doesn't fight Rule 1 over the same leaf's typography grouping in the same pass — run Rule 1's fix first, then re-check.
- **`other`** (variant/element): everything else.

With the segments classified, the required order is computed as `[...other.slice(0, -1), ...category, other.at(-1), ...state]` — i.e. the segment in `other` closest to the value is treated as `property` (last non-state slot), everything else in `other` must precede `category`, and `state` is always terminal. If `other` has fewer than two members, there's no reliable way to separate "property" from "variant/element" (a single leftover segment could be either), so the full reorder is skipped — only the unambiguous half is still enforced: if a `state` segment exists, it must be last.

This is a heuristic, like Rule 1 — always show the proposed reorder before applying, and expect it to occasionally misjudge which `other` segment is really the property vs. an element when a leaf has three or more open-vocabulary segments (the algorithm always treats the deepest one as property, which won't always be right).

### Rule 5 — Disallowed abbreviations

Splits every path segment into words via `pascalToKebab` (the same word-splitter Rule 4 and the CSS-var derivation use), and checks each word against a closed map, `ABBREVIATIONS` — currently just `{ bg: 'background' }`. A match expands that one word and reassembles the segment in PascalCase, so both a whole-segment abbreviation (`Bg` → `Background`) and a compound one (`ProgressBg` → `ProgressBackground`, `BG` → `Background`) are caught; splitting on word boundaries first means a word that merely _contains_ "bg" as a substring without being its own PascalCase word (there's no real example of this today) would not false-positive.

`bg` was added because it's a real, current pattern — `Toast`, `Snackbar`, `Tag`, `Steps`, `Carousel`, and `Tooltip` all ship `Bg`/`BG`/`ProgressBg` segments today, while `Button` and `Badge` already spell it out as `Background`. Same shape of drift as Rule 1's `font-` prefix finding: one convention shipped inconsistently, closing it is mechanical. Extend the map the same way if another abbreviation turns up (nothing else was found in a scan of the current tree, so the map starts with just this one entry).

**Interaction with Rule 4**: both rules can in principle fire on the same leaf (a `Bg` segment that's also out of canonical order). `applyFixes` refuses to apply two violations that share the same origin leaf in one batch, since each violation's move is computed and applied independently against the pre-fix tree — see the guard in `applyFixes` and the note in SKILL.md. This hasn't happened against real data yet: every `Bg` leaf checked so far was already in canonical order (Rule 4 silent), so only Rule 5 fires.

## Name derivation

The skill derives a token's CSS variable name directly from its `Base.tokens.json` path (component key + kebab-cased JSON path segments), rather than running `pnpm tokens` and reading the compiled `dist/css/base.tokens.css`. This is faster and avoids a build dependency for the check phase, at the cost of needing to keep the kebab-case transform (`pascalToKebab` in `implementation.js`) in sync if Style Dictionary's own transform config ever changes.

## Scope limits (v1)

- **Base.tokens.json only.** `Tcs.tokens.json` (or any future brand file) is not scanned or updated. Per ADR-0012, brands are modes on the same variable rather than separate variables, so a component-layer override at the same path in a brand file would need the identical rename to stay matched — currently no component-layer tokens are overridden per-brand, so this is inert today, not silently broken.
- **Single component per run.** No `--all` mode; run once per component.
- **Whole-batch apply.** No per-row selection — approve the full table or none of it.
