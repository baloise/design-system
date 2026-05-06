---
name: rename-component-tokens
description: >
  Use when auditing or renaming the design token CSS variables of a Baloise DS
  component to comply with the official naming convention — reads *.style.scss,
  *.host.scss, and Base.tokens.json, produces a rename map, then applies it to
  all three files so variable names, @prop JSDoc comments, and JSON token keys
  are all in sync. Covers two audits: (A) --ds-* design token segment ordering
  (font- prefix, variant before category, color property→state, scale at end) and (B) public
  vars.local() key names must match CSS property names with spacing shorthands
  (px, py, mx, my, mt, mb, etc.).
---

# Rename Component Tokens

This skill runs **two parallel audits** on a component and fixes violations in all affected files:

**Part A — Design token names (`--ds-<component>-*`)**  
Audits token names in `*.style.scss` for segment ordering, font- prefix, explicit color states, and scale position. Applies fixes to the SCSS and to `Base.tokens.json`.

**Part B — Public/private variable names (the `vars.local()` key layer)**  
Audits the key names passed to `vars.local()`, which generate both the public override variable (`--tag-*`) and the private computed variable (`--_tag-*`). These names must mirror actual CSS property names as closely as possible, using standard shorthands for spacing.

Changes are applied to:

1. `packages/core/src/components/<name>/<name>.style.scss` — `vars.local()` keys, `var(--_*)` usages, modifier `--mod-*` names
2. `packages/core/src/components/<name>/<name>.host.scss` — `@prop` JSDoc comments
3. `packages/tokens/tokens/Base.tokens.json` — token keys inside `"🧩 Component" > "<ComponentName>"`

---

## Token Naming Convention

Token names are **ordered segments** that narrow scope from system → component → element → type:

```
--ds  -  <component>  -  [<variant>]  -  [<element>]  -  <category>  -  [<property>]  -  [<state>]  -  [<scale/breakpoint>]
```

| Segment       | Role                                                | Examples                                           |
| ------------- | --------------------------------------------------- | -------------------------------------------------- |
| `ds`          | Namespace — always first                            | `ds`                                               |
| `<component>` | Component tag without `ds-` prefix                  | `tag`, `button`, `number-input`                    |
| `[variant]`   | Visual variant — **before element and category**    | `primary`, `secondary`, `ghost`, `grey`            |
| `[element]`   | Sub-element / shadow part (omit if whole component) | `icon`, `label`, `header`                          |
| `<category>`  | Visual property category — **required**             | `color`, `font`, `space`, `radius`                 |
| `[property]`  | Attribute within the category                       | `bg`, `text`, `border`, `size`, `weight`, `family` |
| `[state]`     | Interactive state — **required for color tokens**   | `base`, `hover`, `active`, `disabled`, `focus`     |
| `[scale]`     | Size / breakpoint scale                             | `sm`, `md`, `lg`, `mobile`, `desktop`              |

### Mandatory rules

**Rule 1 — `font-` category prefix for all typography tokens**

Typography-related tokens must start with `font-` after the component (and optional element) segment:

```
❌  --ds-tag-family         ❌  --ds-tag-size         ❌  --ds-tag-weight
✅  --ds-tag-font-family    ✅  --ds-tag-font-size     ✅  --ds-tag-font-weight
❌  --ds-tag-line-height
✅  --ds-tag-font-line-height
```

**Rule 2 — Variant comes immediately after component (before category)**

Variant segments (`primary`, `secondary`, `ghost`, etc.) must appear right after the component name — before any element, category, or property. This matches the button token pattern: `--ds-button-primary-color-bg-base`.

```
❌  --ds-tag-color-primary-text          ❌  --ds-tag-color-text-primary-base
✅  --ds-tag-primary-color-text-base     ✅  --ds-tag-primary-color-bg-base
```

**Rule 3 — Within the color block, property comes before state**

After the variant, the order must be: `color → property → state`. Never put state before property.

```
❌  --ds-tag-primary-color-base-text     (state before property)
✅  --ds-tag-primary-color-text-base     (property then state)
```

**Rule 4 — `space-` category for all spacing tokens**

Spacing tokens must start with `space-`. Padding axis suffixes use `x` (inline) and `y` (block):

```
❌  --ds-tag-space-y    ❌  --ds-tag-space-x
✅  --ds-tag-space-padding-y   ✅  --ds-tag-space-padding-x
```

> **Exception:** If the existing compiled output uses `--ds-tag-space-y` / `--ds-tag-space-x` and there is no state variant, the shorthand `space-x` / `space-y` is acceptable for now — prefer the explicit form only on new tokens.

**Rule 5 — Scale variants belong at the end, after state**

Size-variant tokens group as: `<category>-<property>-<scale>` or `<category>-<property>-<variant>-<state>`:

```
❌  --ds-tag-sm-size      ❌  --ds-tag-sm-weight    ❌  --ds-tag-sm-space-y
✅  --ds-tag-font-size-sm ✅  --ds-tag-font-weight-sm ✅  --ds-tag-space-padding-y-sm
```

**Rule 6 — No bare `size` / `weight` / `family` without `font-` prefix**

```
❌  --ds-tag-size          ❌  --ds-tag-weight
✅  --ds-tag-font-size     ✅  --ds-tag-font-weight
```

---

## Key Files

| File                                                    | Purpose                                              |
| ------------------------------------------------------- | ---------------------------------------------------- |
| `packages/core/src/components/<name>/<name>.style.scss` | SCSS — vars.local() keys, CSS rules, modifier blocks |
| `packages/core/src/components/<name>/<name>.host.scss`  | `@prop` JSDoc lines                                  |
| `packages/tokens/tokens/Base.tokens.json`               | Token source of truth — must stay in sync            |
| `packages/tokens/dist/css/base.tokens.css`              | Compiled output — verify after rebuild               |

---

## Part A — Design Token Names (`--ds-<component>-*`)

See the Token Naming Convention section above for the rules (Rules 1–6).

---

## Part B — Public Variable Names (the `vars.local()` key)

The `vars.local(key, default)` mixin generates the entire four-layer cascade from a single key:

```scss
@include vars.local(tag-px, var(--ds-tag-space-x));
// → --_tag-px: var(--tag-px, var(--mod-tag-px, var(--ds-tag-space-x)))
```

The key must match the **actual CSS property name** that the private variable is applied to. This means consumers reading `--tag-px` immediately know they are overriding `padding-inline`. The same key drives three names simultaneously:

- `--_tag-px` (private — used in CSS rules)
- `--tag-px` (public — documented in `@prop`, overridden by consumers)
- `--mod-tag-px` (modifier — set by variant classes)

### B1 — CSS property alignment rules

**Rule B1a — Use the exact CSS property name where possible**

The key must match the CSS property it controls, minus the component prefix:

```
❌  tag-color-text     →  color rule uses `color: var(--_tag-color-text)`
✅  tag-color          →  color rule uses `color: var(--_tag-color)`

❌  tag-color-background  →  background-color rule
✅  tag-bg                →  background-color rule

❌  tag-radius         →  border-radius rule
✅  tag-radius         →  OK (use shorthand `radius`)

❌  tag-line-height    →  line-height rule (already a CSS property — ✅ correct)
✅  tag-line-height    →  OK

❌  tag-font-size      →  font-size rule (already a CSS property — ✅ correct)
✅  tag-font-size      →  OK
```

The only deviation allowed: when a key controls a **sub-element**, prefix with the element name:

```
✅  tag-icon-color        →  icon element's `color` property
✅  tag-close-mr          →  close sub-element's `margin-right` → should be `tag-close-mr` (shorthand) or `tag-close-margin-right`
```

**Rule B1b — Append `-<element>` for sub-element overrides**

When a vars.local key controls a CSS property on a named sub-element (shadow part, child component, internal element), the element comes **between** the component name and the property:

```
✅  --_tag-icon-color         →  > ds-icon { color: var(--_tag-icon-color) }
✅  --_tag-close-margin-right →  > ds-close { margin-right: var(--_tag-close-margin-right) }
```

### B2 — Spacing shorthand rules

Spacing properties use short aliases to keep variable names concise. Use these names exclusively:

| CSS property           | Key suffix |
| ---------------------- | ---------- |
| `padding`              | `p`        |
| `padding-inline`       | `px`       |
| `padding-block`        | `py`       |
| `padding-inline-start` | `ps`       |
| `padding-inline-end`   | `pe`       |
| `padding-block-start`  | `pt`       |
| `padding-block-end`    | `pb`       |
| `padding-left`         | `pl`       |
| `padding-right`        | `pr`       |
| `margin`               | `m`        |
| `margin-inline`        | `mx`       |
| `margin-block`         | `my`       |
| `margin-inline-start`  | `ms`       |
| `margin-inline-end`    | `me`       |
| `margin-block-start`   | `mt`       |
| `margin-block-end`     | `mb`       |
| `margin-left`          | `ml`       |
| `margin-right`         | `mr`       |
| `background-color`     | `bg`       |
| `border-radius`        | `radius`   |

Examples:

```
❌  tag-padding-inline   ✅  tag-px
❌  tag-padding-block    ✅  tag-py
❌  tag-margin-inline    ✅  tag-mx
❌  close-margin-right   ✅  close-mr
```

For sub-element spacing, place the shorthand after the element name:

```
✅  tag-close-mr    →  > ds-close { margin-right: var(--_tag-close-mr) }
✅  tag-icon-px     →  > ds-icon { padding-inline: var(--_tag-icon-px) }
```

### B3 — Complete rename table for public variable keys

Run this check on every `vars.local()` key in the component:

| Old key (violation)      | Fixed key         | Rule                         |
| ------------------------ | ----------------- | ---------------------------- |
| `tag-color-text`         | `tag-color`       | B1a: match `color` property  |
| `tag-color-background`   | `tag-bg`          | B2: shorthand                |
| `tag-radius`             | `tag-radius`      | ✓ OK (B2: already shorthand) |
| `tag-padding-inline`     | `tag-px`          | B2: shorthand                |
| `tag-padding-block`      | `tag-py`          | B2: shorthand                |
| `tag-padding-left`       | `tag-pl`          | B2: shorthand                |
| `tag-margin-inline`      | `tag-mx`          | B2: shorthand                |
| `tag-margin-right`       | `tag-mr`          | B2: shorthand                |
| `tag-close-margin-right` | `tag-close-mr`    | B2: shorthand                |
| `tag-font-family`        | `tag-font-family` | ✓ OK (matches `font-family`) |
| `tag-font-size`          | `tag-font-size`   | ✓ OK (matches `font-size`)   |
| `tag-font-weight`        | `tag-font-weight` | ✓ OK (matches `font-weight`) |
| `tag-line-height`        | `tag-line-height` | ✓ OK (matches `line-height`) |
| `tag-gap`                | `tag-gap`         | ✓ OK (matches `gap`)         |
| `tag-min-height`         | `tag-min-height`  | ✓ OK (matches `min-height`)  |

---

## Step 1 — Identify the Component

Ask the user for the component name if not provided. Derive:

- SCSS file: `packages/core/src/components/<name>/<name>.style.scss`
- Host file: `packages/core/src/components/<name>/<name>.host.scss`
- JSON key: PascalCase of component name (e.g., `tag` → `Tag`, `number-input` → `NumberInput`)

---

## Step 2 — Extract All References

Read the `*.style.scss` file and collect **two** sets:

### 2a — Design token names (`--ds-<component>-*`)

1. All `vars.local(…, var(--ds-<component>-…))` calls → extract the token name inside `var(…)`
2. All direct `var(--ds-<component>-…)` calls in modifier blocks or CSS rules

### 2b — Public variable keys (the `vars.local()` first argument)

1. All `vars.local(<key>, …)` calls → extract the key (e.g. `tag-padding-inline`)
2. All `var(--_<component>-…)` usages in CSS rules — these are the private vars; their names are derived from the key
3. All `--mod-<component>-…` assignments in modifier/variant blocks — also derived from the key

Also read `*.host.scss` and collect:

- Every `@prop --<component>-…` line — these document the public variable names

---

## Step 3 — Build Both Rename Maps

For each extracted token name, apply the rules to derive the correct name. Use this decision tree:

### 3a — Typography tokens (family, weight, size, line-height)

```
--ds-<comp>-family          →  --ds-<comp>-font-family
--ds-<comp>-weight          →  --ds-<comp>-font-weight
--ds-<comp>-size            →  --ds-<comp>-font-size
--ds-<comp>-line-height     →  --ds-<comp>-font-line-height
--ds-<comp>-<scale>-size    →  --ds-<comp>-font-size-<scale>
--ds-<comp>-<scale>-weight  →  --ds-<comp>-font-weight-<scale>
```

### 3b — Color tokens: move variant before category and add state

Color segments must follow `<variant> → color → property → state`. Two violations commonly appear together: variant is nested inside the color block (after category), and the state is missing.

```
--ds-<comp>-color-<variant>-text        →  --ds-<comp>-<variant>-color-text-base
--ds-<comp>-color-<variant>-background  →  --ds-<comp>-<variant>-color-bg-base
--ds-<comp>-color-<variant>-border      →  --ds-<comp>-<variant>-color-border-base
--ds-<comp>-color-<variant>-icon        →  --ds-<comp>-<variant>-color-icon-base
```

Skip tokens that already have the correct order AND end with a state keyword (`-base`, `-hover`, `-active`, `-disabled`, `-focus`).

Examples using `tag`:

```
--ds-tag-color-base-text        →  --ds-tag-default-color-text-base
--ds-tag-color-base-background  →  --ds-tag-default-color-bg-base
--ds-tag-color-primary-text     →  --ds-tag-primary-color-text-base
--ds-tag-color-grey-text        →  --ds-tag-grey-color-text-base
```

> If the variant name is `base` and it represents the default/unstyled style, prefer `default` as the variant name to avoid confusion: `--ds-tag-default-color-text-base`. Ask the developer which variant name to use for the unstyled default.

### 3c — Spacing tokens with scale prefix

```
--ds-<comp>-<scale>-space-y  →  --ds-<comp>-space-padding-y-<scale>
--ds-<comp>-<scale>-space-x  →  --ds-<comp>-space-padding-x-<scale>
```

> If the existing shorthand (`space-y`, `space-x`) has no scale variant, it may stay unchanged (Rule 4 exception).

### 3d — Already-correct tokens

Tokens that already comply need no rename. Mark them `✓ OK`.

### 3e — Public variable keys (Part B)

For each `vars.local()` key collected in Step 2b, apply Rules B1a, B1b, and B2 to derive the correct key name. Build a parallel rename map:

```
vars.local key: tag-color-text    →  tag-color        (Rule B1a)
vars.local key: tag-color-background  →  tag-bg               (Rule B2)
vars.local key: tag-radius        →  ✓ OK                  (already shorthand)
vars.local key: tag-padding-inline →  tag-px           (Rule B2)
vars.local key: tag-padding-block  →  tag-py           (Rule B2)
vars.local key: tag-close-mr       →  ✓ OK             (already shorthand)
```

---

## Step 4 — Report Proposed Renames

Output a full table **before making any changes**, split into two sections:

```
Component: ds-tag (Tag)

── Part A: Design token names (--ds-tag-*) ─────────────────────────────

Proposed renames:
  --ds-tag-family                     →  --ds-tag-font-family         (Rule 1: font- prefix)
  --ds-tag-weight                     →  --ds-tag-font-weight         (Rule 1: font- prefix)
  --ds-tag-size                       →  --ds-tag-font-size           (Rule 1: font- prefix)
  --ds-tag-line-height                →  --ds-tag-font-line-height    (Rule 1: font- prefix)
  --ds-tag-sm-size                    →  --ds-tag-font-size-sm        (Rules 1+5)
  --ds-tag-sm-weight                  →  --ds-tag-font-weight-sm      (Rules 1+5)
  --ds-tag-md-size                    →  --ds-tag-font-size-md        (Rules 1+5)
  --ds-tag-md-weight                  →  --ds-tag-font-weight-md      (Rules 1+5)
  --ds-tag-lg-size                    →  --ds-tag-font-size-lg        (Rules 1+5)
  --ds-tag-lg-weight                  →  --ds-tag-font-weight-lg      (Rules 1+5)
  --ds-tag-color-primary-text         →  --ds-tag-primary-color-text-base  (Rule 2)
  --ds-tag-color-primary-background   →  --ds-tag-primary-color-bg-base    (Rule 2)
  … (repeat for all color variants)

Already correct:
  ✓ --ds-tag-radius-base
  ✓ --ds-tag-space-x
  ✓ --ds-tag-space-y

── Part B: Public variable keys (vars.local keys) ───────────────────────

Proposed renames:
  tag-color-text        →  tag-color              (affects --_tag-color, --tag-color, --mod-tag-color)
  tag-color-background  →  tag-bg                 (affects --_tag-bg, etc.)
  tag-radius            →  tag-radius             ✓ OK (already shorthand)
  tag-padding-inline    →  tag-px                 (Rule B2)
  tag-padding-block     →  tag-py                 (Rule B2)

Already correct:
  ✓ tag-font-family
  ✓ tag-font-size
  ✓ tag-font-weight
  ✓ tag-line-height
  ✓ tag-gap
  ✓ tag-min-height
  ✓ tag-close-mr

Total: 15 token renames, 5 key renames, 9 already correct.
```

Ask the developer to confirm before writing changes. If the developer says "yes" or "proceed", apply all renames.

---

## Step 5 — Apply Renames to `*.style.scss`

Apply **both** rename maps in one pass.

### 5a — Part A: design token names

Global find-and-replace for each `--ds-<component>-old` → `--ds-<component>-new` in:

- `vars.local(…, var(--ds-tag-old))` → update the token inside `var(…)`
- Direct `var(--ds-tag-old)` references in modifier/variant blocks and CSS rules

### 5b — Part B: vars.local key renames

For each key rename (e.g. `tag-padding-inline` → `tag-px`), update **all three derivative forms** throughout the file:

1. The `vars.local()` call itself:

   ```scss
   // Before
   @include vars.local(tag-padding-inline, var(--ds-tag-space-x));
   // After
   @include vars.local(tag-px, var(--ds-tag-space-x));
   ```

2. Every `var(--_tag-<old-key>)` usage in CSS rules:

   ```scss
   // Before
   padding-inline: var(--_tag-padding-inline);
   // After
   padding-inline: var(--_tag-px);
   ```

3. Every `--mod-tag-<old-key>:` assignment in modifier/variant blocks:
   ```scss
   // Before
   --mod-tag-padding-inline: 1rem;
   // After
   --mod-tag-px: 1rem;
   ```

> When both renames apply to the same `vars.local()` line (key rename + token rename), update both in the same edit.
> Example: `vars.local(tag-color-text, var(--ds-tag-color-base-text))` → `vars.local(tag-color, var(--ds-tag-color-text-default-base))`

---

## Step 6 — Apply Renames to `*.host.scss` @prop Comments

The `@prop` JSDoc entries document the **public override variable** — i.e. the `vars.local()` key with `--<component>-` prefix. Update them for **both** Part A and Part B renames.

### Part A renames that affect @prop

If the vars.local key was already named after the token (pre-existing bad names), and the key is also being renamed in Part B, the `@prop` name changes by the Part B rename only.

### Part B renames always update @prop

Every key rename produces a new public variable name. Update the corresponding `@prop` line:

```scss
// Before (tag.host.scss)
 * @prop --tag-color-text: Text color of the tag.
 * @prop --tag-color-background: Background color of the tag.
 * @prop --tag-radius: Border radius of the tag.
 * @prop --tag-padding-inline: Horizontal padding of the tag.
 * @prop --tag-padding-block: Vertical padding of the tag.

// After
 * @prop --tag-color: Text color of the tag.
 * @prop --tag-bg: Background color of the tag.
 * @prop --tag-border-radius: Border radius of the tag.
 * @prop --tag-px: Horizontal padding of the tag.
 * @prop --tag-py: Vertical padding of the tag.
```

Keep descriptions accurate and concise. Remove any `@prop` entries for variables that no longer exist.

---

## Step 7 — Map New Token Name → JSON Path

Use this algorithm to derive the JSON nesting path for each renamed token:

### Algorithm

Given: `--ds-tag-font-size-sm`

1. Strip `--ds-` prefix → `tag-font-size-sm`
2. First segment = component → `Tag`
3. Remaining: `font-size-sm`
4. Map each segment to a capitalised JSON key using compound-word rules:

| CSS segment    | JSON key                |
| -------------- | ----------------------- |
| `font`         | `Font`                  |
| `size`         | `Size`                  |
| `sm`           | `SM`                    |
| `md`           | `MD`                    |
| `lg`           | `LG`                    |
| `xl`           | `XL`                    |
| `2xl`          | `2XL`                   |
| `line-height`  | `LineHeight`            |
| `background`   | `Background`            |
| `color`        | `Color`                 |
| `padding`      | `Padding`               |
| `border`       | `Border`                |
| `radius`       | `Radius`                |
| `space`        | `Space`                 |
| `base`         | `Base`                  |
| `hover`        | `Hover`                 |
| `active`       | `Active`                |
| `disabled`     | `Disabled`              |
| `focus`        | `Focus`                 |
| `primary`      | `Primary`               |
| `secondary`    | `Secondary`             |
| `text`         | `Text`                  |
| `icon`         | `Icon`                  |
| Any other word | Capitalise first letter |

Result path: `Tag > Font > Size > SM`

### Examples

| New CSS variable                   | JSON path under `"🧩 Component"`      |
| ---------------------------------- | ------------------------------------- |
| `--ds-tag-font-family`             | `Tag > Font > Family`                 |
| `--ds-tag-font-size`               | `Tag > Font > Size`                   |
| `--ds-tag-font-weight`             | `Tag > Font > Weight`                 |
| `--ds-tag-font-line-height`        | `Tag > Font > LineHeight`             |
| `--ds-tag-font-size-sm`            | `Tag > Font > Size > SM`              |
| `--ds-tag-font-weight-sm`          | `Tag > Font > Weight > SM`            |
| `--ds-tag-primary-color-text-base` | `Tag > Primary > Color > Text > Base` |
| `--ds-tag-primary-color-bg-base`   | `Tag > Primary > Color > Bg > Base`   |
| `--ds-tag-space-padding-y`         | `Tag > Space > Padding > Y`           |
| `--ds-tag-space-padding-x`         | `Tag > Space > Padding > X`           |

---

## Step 8 — Apply Renames to `Base.tokens.json`

For each renamed token, you need to:

1. **Find the old JSON path** — derive it from the old token name using the same algorithm above
2. **Determine the new JSON path** — derive it from the new token name
3. **Move the JSON node** — if the path changes, relocate the entry (preserving `$type`, `$value`, `$extensions`)
4. **Rename the JSON key** if only the leaf key changes

### Example transformation

Old token: `--ds-tag-family` → JSON path: `Tag > Family`  
New token: `--ds-tag-font-family` → JSON path: `Tag > Font > Family`

Before:

```json
"Tag": {
  "Family": {
    "$type": "string",
    "$value": "{🏷️ Semantic.🔤 Text.Family.Body}",
    "$extensions": { "com.figma.variableId": "VariableID:58:2", ... }
  }
}
```

After:

```json
"Tag": {
  "Font": {
    "Family": {
      "$type": "string",
      "$value": "{🏷️ Semantic.🔤 Text.Family.Body}",
      "$extensions": { "com.figma.variableId": "VariableID:58:2", ... }
    }
  }
}
```

> **Preserve all `$extensions` fields exactly** — especially `com.figma.variableId` values, which must remain unique and unchanged.

### Color token property/variant/state reordering

Old: `Tag > Color > Primary > Text` (`--ds-tag-color-primary-text`)  
New: `Tag > Primary > Color > Text > Base` (`--ds-tag-primary-color-text-base`)

The JSON nesting mirrors the CSS segment order: `Primary → Color → Text → Base`.

Before:

```json
"Color": {
  "Primary": {
    "Text": { ... },
    "Background": { ... }
  }
}
```

After:

```json
"Primary": {
  "Color": {
    "Text": { "Base": { ... } },
    "Bg":   { "Base": { ... } }
  }
},
"Grey": {
  "Color": {
    "Text": { "Base": { ... } },
    "Bg":   { "Base": { ... } }
  }
}
```

### Scale variant restructuring

Old: `Tag > SM > Size` (`--ds-tag-sm-size`)  
New: `Tag > Font > Size > SM` (`--ds-tag-font-size-sm`)

Move the node from the old path to the new path.

---

## Step 9 — Verify

After applying all changes, rebuild the token output and confirm the renamed variables appear:

```bash
# Rebuild tokens
npm run tokens

# Verify new names
grep "ds-<component>-" packages/tokens/dist/css/base.tokens.css

# Check for any leftover old names (should be empty)
grep "ds-<component>-family\|ds-<component>-sm-size" packages/tokens/dist/css/base.tokens.css
```

Also run a build to confirm the SCSS compiles without errors:

```bash
cd packages/core && npx stencil build
```

---

## Step 10 — Output Summary

```
Rename complete for ds-tag (Tag):

── Part A: Design token names ──────────────────────────────────────────
SCSS changes (tag.style.scss):
  --ds-tag-family        →  --ds-tag-font-family
  --ds-tag-weight        →  --ds-tag-font-weight
  --ds-tag-size          →  --ds-tag-font-size
  --ds-tag-sm-size       →  --ds-tag-font-size-sm       (5 occurrences)
  … etc.

JSON changes (Base.tokens.json):
  Tag > Family             →  Tag > Font > Family
  Tag > SM > Size          →  Tag > Font > Size > SM
  Tag > Color > Primary > Text  →  Tag > Primary > Color > Text > Base
  … etc.

── Part B: Public variable keys ────────────────────────────────────────
SCSS changes (tag.style.scss):
  vars.local(tag-color-text, …)       →  vars.local(tag-color, …)
  var(--_tag-color-text)              →  var(--_tag-color)           (4 occurrences)
  --mod-tag-color-text:               →  --mod-tag-color:            (2 occurrences)
  vars.local(tag-padding-inline, …)   →  vars.local(tag-px, …)
  var(--_tag-padding-inline)          →  var(--_tag-px)              (1 occurrence)
  … etc.

Host changes (tag.host.scss):
  @prop --tag-color-text       →  @prop --tag-color
  @prop --tag-color-background →  @prop --tag-bg
  @prop --tag-padding-inline   →  @prop --tag-px
  @prop --tag-padding-block    →  @prop --tag-py
  … etc.

Run `npm run tokens && cd packages/core && npx stencil build` to verify.
```

---

## Quick Reference: Violation Patterns

### Part A — Design tokens (`--ds-<component>-*`)

| Old pattern                     | Issue                          | Fix                                |
| ------------------------------- | ------------------------------ | ---------------------------------- |
| `--ds-<c>-family`               | Rule 1: no `font-`             | `--ds-<c>-font-family`             |
| `--ds-<c>-weight`               | Rule 1: no `font-`             | `--ds-<c>-font-weight`             |
| `--ds-<c>-size`                 | Rule 1: no `font-`             | `--ds-<c>-font-size`               |
| `--ds-<c>-line-height`          | Rule 1: no `font-`             | `--ds-<c>-font-line-height`        |
| `--ds-<c>-<scale>-size`         | Rules 1+5                      | `--ds-<c>-font-size-<scale>`       |
| `--ds-<c>-<scale>-weight`       | Rules 1+5                      | `--ds-<c>-font-weight-<scale>`     |
| `--ds-<c>-color-<v>-text`       | Rule 2: variant after category | `--ds-<c>-<v>-color-text-base`     |
| `--ds-<c>-color-<v>-background` | Rule 2: variant after category | `--ds-<c>-<v>-color-bg-base`       |
| `--ds-<c>-color-<v>-icon`       | Rule 2: variant after category | `--ds-<c>-<v>-color-icon-base`     |
| `--ds-<c>-<scale>-space-y`      | Rule 5: scale first            | `--ds-<c>-space-padding-y-<scale>` |
| `--ds-<c>-<scale>-space-x`      | Rule 5: scale first            | `--ds-<c>-space-padding-x-<scale>` |

> Only rename tokens **exclusively used by this component**. Semantic tokens belong to the semantic layer and must not be renamed here.

### Part B — Public variable keys (`vars.local()` first argument)

| Old key pattern            | Issue                   | Fixed key    |
| -------------------------- | ----------------------- | ------------ |
| `<c>-color-text`           | B1a: not a CSS property | `<c>-color`  |
| `<c>-color-background`     | B2: use shorthand       | `<c>-bg`     |
| `<c>-radius`               | ✓ already shorthand     | `<c>-radius` |
| `<c>-padding-inline`       | B2: use shorthand       | `<c>-px`     |
| `<c>-padding-block`        | B2: use shorthand       | `<c>-py`     |
| `<c>-padding-left`         | B2: use shorthand       | `<c>-pl`     |
| `<c>-padding-right`        | B2: use shorthand       | `<c>-pr`     |
| `<c>-padding-block-start`  | B2: use shorthand       | `<c>-pt`     |
| `<c>-padding-block-end`    | B2: use shorthand       | `<c>-pb`     |
| `<c>-padding-inline-start` | B2: use shorthand       | `<c>-ps`     |
| `<c>-padding-inline-end`   | B2: use shorthand       | `<c>-pe`     |
| `<c>-margin-inline`        | B2: use shorthand       | `<c>-mx`     |
| `<c>-margin-block`         | B2: use shorthand       | `<c>-my`     |
| `<c>-margin-left`          | B2: use shorthand       | `<c>-ml`     |
| `<c>-margin-right`         | B2: use shorthand       | `<c>-mr`     |
| `<c>-margin-block-start`   | B2: use shorthand       | `<c>-mt`     |
| `<c>-margin-block-end`     | B2: use shorthand       | `<c>-mb`     |
| `<c>-margin-inline-start`  | B2: use shorthand       | `<c>-ms`     |
| `<c>-margin-inline-end`    | B2: use shorthand       | `<c>-me`     |
