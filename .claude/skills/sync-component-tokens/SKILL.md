---
name: sync-component-tokens
description: >
  Use when auditing or syncing a Baloise DS component's CSS variables against
  Base.tokens.json — reads a component's *.style.scss, checks which --ds-*
  tokens exist in the compiled dist, and either wires up existing tokens via
  vars.local() or creates missing token entries in the JSON with Figma-compatible
  format.
---

# Sync Component Tokens

Reads a component's SCSS file, checks every `--ds-*` CSS variable reference
against the compiled token output, and brings the component and token file
into sync.

**Core rule: a component must NEVER reference a semantic or primitive `--ds-*` token directly.** Every `--ds-color-*`, `--ds-radius-*`, `--ds-text-*`, `--ds-interaction-*`, etc. used in a component's SCSS must be wrapped in a component-specific token (`--ds-<component>-*`). The component token is what the SCSS references; the semantic/primitive token is what the JSON value points to.

Works in three directions:

- **vars.local() with --ds-\* defaults:** Each `vars.local(name, var(--ds-*))` must have a matching `--ds-<component>-name` component token in the JSON. Create it if missing.
- **Hardcoded vars.local() literals:** Values like `0.5rem` should be tokenised as `--ds-<component>-*` tokens. Present candidates to developer.
- **Direct --ds-\* refs in CSS rules:** Any `var(--ds-color-*)`, `var(--ds-text-*)`, etc. used directly in CSS properties (not inside vars.local) must be replaced with a private var `var(--_<component>-*)`, backed by a new `vars.local()` + component token.

---

## Key Files

| File                                                    | Purpose                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| `packages/core/src/components/<name>/<name>.style.scss` | Component SCSS — source of all CSS variable usage            |
| `packages/tokens/tokens/Base.tokens.json`               | Token source of truth — edit this to add/change tokens       |
| `packages/tokens/dist/css/base.tokens.css`              | Compiled output — use to verify if a `--ds-*` var is defined |

---

## Step 1 — Identify the Component

Ask the user for the component name if not provided. Derive:

- Component directory: `packages/core/src/components/<name>/`
- SCSS file: `packages/core/src/components/<name>/<name>.style.scss`
- Token JSON component key: PascalCase of the component name (e.g., `button` → `Button`, `number-input` → `NumberInput`)

---

## Step 2 — Extract CSS Variables from SCSS

Read the component's `*.style.scss` file (and any `*.mixin.scss` it imports). Collect **four** sets of variable references:

### 2a. vars.local() defaults — component-token-referenced ✓

```scss
@include vars.local(button-gap, var(--ds-button-gap));
//                   ↑ private var     ↑ already a component token — just verify it exists in JSON
```

Regex: `vars\.local\([^,]+,\s*var\((--ds-<component>-[^)]+)\)`

Each match yields a `--ds-<component>-*` component token name. Verify it exists in the JSON.

### 2b. vars.local() defaults — direct semantic/primitive reference ✗

```scss
@include vars.local(segment-item-selected-color-base, var(--ds-color-primary-4));
//                                                         ↑ WRONG — semantic/primitive used directly
```

Regex: `vars\.local\(([^,]+),\s*var\((--ds-(?!<component>)[^)]+)\)`

Each match is a violation. The fix is:

1. Create component token `--ds-<component>-<var-name>` in JSON with the semantic/primitive as its `$value`
2. Change the `vars.local()` to reference the new component token: `var(--ds-<component>-<var-name>)`

### 2c. vars.local() defaults — hardcoded literals

```scss
@include vars.local(button-gap, 0.5rem);
```

Regex: `vars\.local\(([^,]+),\s*(?!var\()([^)]+)\)`

Each match is a candidate for tokenisation. Present to developer; create `--ds-<component>-<var-name>` token if confirmed.

### 2d. Direct semantic/primitive refs in CSS rules ✗

```scss
font-weight: var(--ds-text-weight-bold); // WRONG
outline: ... solid var(--ds-interaction-focus-color-base); // WRONG
```

Regex: `var\((--ds-(?!<component>)[^)]+)\)` — anywhere outside a `vars.local()` call.

Each match is a violation. The fix:

1. Create component token in JSON for the semantic/primitive value
2. Add a `vars.local(<component>-<descriptive-name>, var(--ds-<component>-<descriptive-name>))` to the `vars()` mixin
3. Replace the direct ref in the CSS rule with the private var: `var(--_<component>-<descriptive-name>)`

### 2e. Modifier vars — --mod-\* references (informational only)

```scss
--mod-segment-item-selected-background: var(--ds-color-danger-4);
```

These are state-override properties. The `--ds-*` values they reference are hardcoded state values (danger, disabled colours); they do **not** need component tokens because they are transient overrides, not base defaults. Flag them as informational but do not require tokenisation.

---

## Step 3 — Classify All Findings

After extracting the four sets, classify every item:

| Finding                                        | Classification    | Action                                             |
| ---------------------------------------------- | ----------------- | -------------------------------------------------- |
| `vars.local(name, var(--ds-<component>-name))` | ✓ Correct pattern | Verify token exists in JSON                        |
| `vars.local(name, var(--ds-color-*))`          | ✗ Violation (2b)  | Create `--ds-<component>-name` token; update SCSS  |
| `vars.local(name, var(--ds-radius-*))`         | ✗ Violation (2b)  | Same                                               |
| `vars.local(name, var(--ds-text-*))`           | ✗ Violation (2b)  | Same                                               |
| `vars.local(name, 0.5rem)`                     | ⚠ Candidate (2c) | Create `--ds-<component>-name` token if confirmed  |
| `var(--ds-color-*)` in CSS rule                | ✗ Violation (2d)  | Add vars.local + component token + use private var |
| `var(--ds-text-*)` in CSS rule                 | ✗ Violation (2d)  | Same                                               |
| `--mod-*: var(--ds-*)` overrides               | ℹ Informational  | No action required (transient state overrides)     |

Check whether component tokens (`--ds-<component>-*`) exist in the compiled CSS:

```bash
grep "^  --ds-<component>-" packages/tokens/dist/css/base.tokens.css
```

---

## Step 4 — Check JSON Structure

Read `packages/tokens/tokens/Base.tokens.json`. Locate the component's section:

```json
{
  "🧩 Component": {
    "Button": { ... },
    "Badge":  { ... }
  }
}
```

Look for `"🧩 Component" > "<ComponentPascalName>"`. If the section exists, note the existing nesting patterns — they are the blueprint for new entries.

---

## Step 5 — Report to Developer

Output a summary before making any changes:

```
Component: ds-button (Button)

Token-referenced (--ds-*):
  ✓ --ds-button-color-primary-base-text   → exists
  ✓ --ds-button-radius-base               → exists
  ✗ --ds-button-color-disabled-base-icon  → MISSING from JSON

Hardcoded vars.local() (potential token candidates):
  ⚠ button-gap              = 0.5rem    → no token
  ⚠ button-min-height       = 3rem      → no token
  ⚠ button-border-style     = solid     → no token

Actions:
  1. Create token in JSON: --ds-button-color-disabled-base-icon
  2. Prompt: tokenise hardcoded values? (y/n per item)
```

Ask the developer to confirm before writing any changes.

---

## Step 6 — Map CSS Variable Name → JSON Path

Use this algorithm to derive the JSON path for a missing token:

### Algorithm

Given: `--ds-button-color-disabled-base-icon`

1. Strip `--ds-` prefix → `button-color-disabled-base-icon`
2. First segment = component name → capitalize → `Button`
3. Remaining segments: `color-disabled-base-icon`
4. Reconstruct path keys by capitalising segments and merging compound words that appear as single keys in the JSON:

**Compound key rules (CamelCase ↔ kebab-case):**

| JSON key                       | CSS segment(s)                 |
| ------------------------------ | ------------------------------ |
| `LineHeight`                   | `line-height`                  |
| `FontSize`                     | `font-size`                    |
| `SM`, `LG`, `XL`, `2XL`, `3XL` | `sm`, `lg`, `xl`, `2xl`, `3xl` |
| `Base`, `Hover`, `Active`      | `base`, `hover`, `active`      |
| `Text`, `Background`, `Border` | `text`, `background`, `border` |
| Any single word                | Capitalise first letter        |

5. Look at the existing JSON component section for the same component (Step 4) to confirm the nesting depth and pattern before inserting.

### Examples

| CSS variable                          | JSON path under `"🧩 Component"`         |
| ------------------------------------- | ---------------------------------------- |
| `--ds-button-color-primary-base-text` | `Button > Color > Primary > Base > Text` |
| `--ds-button-radius-base`             | `Button > Radius > Base`                 |
| `--ds-button-size-sm`                 | `Button > Size > SM`                     |
| `--ds-button-line-height`             | `Button > LineHeight`                    |
| `--ds-badge-text-size-lg`             | `Badge > Text > Size > LG`               |
| `--ds-number-input-color-base-text`   | `NumberInput > Color > Base > Text`      |

**Rule of thumb:** match the nesting depth of similar existing tokens in the same component section.

---

## Step 7 — Create Missing Tokens in JSON

For each missing `--ds-*` token confirmed by the developer:

### 7a. Determine type and value

| Token property                   | JSON `$type` | `$value`                                                                  |
| -------------------------------- | ------------ | ------------------------------------------------------------------------- |
| Color                            | `"color"`    | Semantic color reference e.g. `{🏷️ Semantic.🎨 Background.Color.Primary}` |
| Size / spacing / radius          | `"number"`   | Semantic size reference e.g. `{🏷️ Semantic.↔️ Space.LG.Mobile}`           |
| Font family, font weight         | `"string"`   | Semantic text reference e.g. `{🏷️ Semantic.🔤 Text.Family.Heading}`       |
| Literal (no good semantic match) | appropriate  | Literal string/number e.g. `"inherit"`, `9999`                            |

To find the right semantic reference:

1. Read the dist CSS: what is the token's likely resolved value?
2. Search `Base.tokens.json` under `"🏷️ Semantic"` for a matching semantic token.
3. Use the semantic token's JSON path as the reference: `{🏷️ Semantic.Section.Key}`.

### 7b. Generate a new VariableID

Find the current highest VariableID:

```bash
grep -o '"VariableID:[0-9]*:[0-9]*"' packages/tokens/tokens/Base.tokens.json \
  | sort -t: -k2 -k3 -n | tail -1
```

If the result is e.g. `"VariableID:368:8"`, new tokens should use `"VariableID:369:1"`,
`"VariableID:369:2"`, etc. (increment the group by 1, start index at 1).

Note: these IDs are placeholders until synced from Figma, but Figma needs unique IDs to import the file.

### 7c. JSON token template

```json
"TokenKey": {
  "$type": "color",
  "$value": "{🏷️ Semantic.🎨 Background.Color.Primary}",
  "$extensions": {
    "com.figma.variableId": "VariableID:369:1",
    "com.figma.scopes": [
      "ALL_SCOPES"
    ],
    "com.figma.isOverride": true
  }
}
```

For string types, also add `"com.figma.type": "string"` inside `$extensions`.

### 7d. Insert into JSON

Insert the new entry at the correct nesting level inside `"🧩 Component" > "<ComponentName>"`.
If the component section doesn't exist yet, create it at the same nesting level as other components.

**Preserve JSON formatting:** 2-space indentation, trailing comma rules match the file's existing style.

---

## Step 8 — Update SCSS (if tokenising hardcoded values)

For each hardcoded `vars.local()` that the developer confirmed should be a token, update the SCSS:

```scss
// Before
@include vars.local(button-gap, 0.5rem);

// After — reference the new token
@include vars.local(button-gap, var(--ds-button-gap));
```

If the token doesn't exist yet in the JSON, create it in Step 7 first, then update the SCSS.

---

## Step 9 — Verify

After editing the JSON and/or SCSS, rebuild the token output to verify there are no errors:

```bash
npm run tokens
```

Then confirm the new CSS variables appear in the compiled output:

```bash
grep "ds-<component>-" packages/tokens/dist/css/base.tokens.css
```

---

## Output Format

```
Sync complete for ds-<component>:

JSON changes:
  + Added "🧩 Component" > "Button" > "Gap" (VariableID:369:1) → --ds-button-gap

SCSS changes:
  button.style.scss line 43: vars.local(button-gap, 0.5rem)
                           → vars.local(button-gap, var(--ds-button-gap))

No action taken for:
  button-border-style = solid  (developer declined)
  button-min-height   = 3rem   (developer declined)

Run `npm run tokens` to rebuild the compiled output.
```

---

## Quick Reference: JSON $value Patterns

| Need                             | Semantic reference                              |
| -------------------------------- | ----------------------------------------------- |
| Primary brand color (background) | `{🏷️ Semantic.🎨 Background.Color.Primary}`     |
| White text                       | `{🏷️ Semantic.🔤 Text.Color.White}`             |
| Primary border                   | `{🏷️ Semantic.▭ Border.Color.Primary}`          |
| Base radius                      | `{🏷️ Semantic.🔵 Radius.Base}`                  |
| Heading font family              | `{🏷️ Semantic.🔤 Text.Family.Heading}`          |
| Bold weight                      | `{🏷️ Semantic.🔤 Text.Weight.Bold}`             |
| Base font size (mobile)          | `{🏷️ Semantic.🔤 Text.Size.Base.Mobile}`        |
| LG spacing (mobile)              | `{🏷️ Semantic.↔️ Space.LG.Mobile}`              |
| Transparent background           | `{🏷️ Semantic.🎨 Background.Color.Transparent}` |

For references not in this table, search `Base.tokens.json` under `"🏷️ Semantic"` for the matching semantic token and copy its JSON path.
