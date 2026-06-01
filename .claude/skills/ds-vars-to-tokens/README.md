# sync-component-tokens

**Analyze and sync a component's CSS variable usage with the design token JSON.**

Ensures every `--ds-*` CSS variable reference is properly wrapped in a component-specific token, maintaining the design system's token architecture.

## Quick Start

```bash
/sync-component-tokens button
```

## The Core Rule

**Components must NEVER reference alias or global tokens directly.**

❌ **Wrong:**

```scss
@include vars.local(color, var(--ds-color-primary-4));
font-weight: var(--ds-text-weight-bold);
```

✅ **Right:**

```scss
@include vars.local(color, var(--ds-button-color-primary));
@include vars.local(weight, var(--ds-button-text-weight));

font-weight: var(--_button-weight);
```

The component token wraps the alias/global token. SCSS references the component token (or private var backed by it).

## What It Analyzes

The skill checks three categories of CSS variable usage:

### 1. vars.local() with component tokens ✓

```scss
@include vars.local(button-gap, var(--ds-button-gap));
```

**Action:** Verify the token exists in `Base.tokens.json`

### 2. vars.local() with alias/global tokens ✗

```scss
@include vars.local(segment-item-color, var(--ds-color-primary-4));
```

**Action:** Create component token `--ds-button-segment-item-color` → aliases `--ds-color-primary-4`

### 3. Direct alias/global refs in CSS rules ✗

```scss
font-weight: var(--ds-text-weight-bold);
outline: var(--ds-interaction-focus-color);
```

**Action:**

1. Create component tokens
2. Add `vars.local()` entries
3. Replace with private vars: `var(--_button-weight)`

### 4. Hardcoded vars.local() literals ⚠️

```scss
@include vars.local(button-gap, 0.5rem);
```

**Action:** Ask user to tokenize as `--ds-button-gap`

### 5. Modifier vars with missing tokens ℹ️

```scss
--mod-segment-item-selected: var(--ds-color-danger-4);
```

**Action:** Report if `--ds-color-danger-4` is missing; no action if it exists

## Files Analyzed

- **`<component>.style.scss`** — primary component styles (if exists)
- **`<component>.host.scss`** — host element styles (if exists)
- **`<component>.mixin.scss`** or `*.mixin.scss` — shared SCSS mixins (if exist)

**Requirement:** At least one of these must exist.

## Workflow

### Step 1: Invoke the skill

```bash
/sync-component-tokens button
```

The skill analyzes all SCSS files and reports findings.

### Step 2: Review violations

```
Violations found (4):

✗ button.style.scss:43
  vars.local(segment-item-color, var(--ds-color-primary-4))
  → Create --ds-button-segment-item-color

✗ button.host.scss:12
  var(--ds-text-weight-bold) used directly
  → Create --ds-button-text-weight

✗ button.style.scss:65
  @include vars.local(content-padding, var(--ds-space-md))
  → Create --ds-button-content-padding

⚠ button.style.scss:27
  vars.local(button-gap, 0.5rem) [hardcoded]
  → Tokenize as --ds-button-gap? [y/n]
```

### Step 3: Confirm each action

For hardcoded values, the skill prompts:

```
Tokenize button-gap = 0.5rem as --ds-button-gap? [y/n]
```

### Step 4: Approve edits

```
Proceed with fixes? [y/n]
```

### Step 5: Edits applied + tokens rebuilt

```
Sync complete for ds-button:

Violations fixed (3):
  + Created --ds-button-segment-item-color (aliases --ds-color-primary-4)
  + Created --ds-button-text-weight (aliases --ds-text-weight-bold)
  + Created --ds-button-content-padding (aliases --ds-space-md)

Candidates tokenized (1):
  + button-gap = 0.5rem → --ds-button-gap

SCSS changes:
  button.style.scss:27 vars.local(button-gap, var(--ds-button-gap))
  button.style.scss:65 vars.local(content-padding, var(--ds-button-content-padding))
  button.host.scss:12 var(--_button-text-weight) [backed by vars.local]

JSON changes:
  + "🧩 Component" > "Button" > "SegmentItemColor" → --ds-button-segment-item-color
  + "🧩 Component" > "Button" > "TextWeight" → --ds-button-text-weight
  + "🧩 Component" > "Button" > "ContentPadding" → --ds-button-content-padding
  + "🧩 Component" > "Button" > "Gap" → --ds-button-gap

Rebuilt tokens:
  ✓ npm run tokens successful

✅ Component tokens synced!
```

## JSON Path Mapping

The skill auto-derives JSON paths from CSS variable names:

| CSS variable                        | JSON path                           |
| ----------------------------------- | ----------------------------------- |
| `--ds-button-color-primary-base`    | `Button > Color > Primary > Base`   |
| `--ds-button-text-weight-bold`      | `Button > Text > Weight > Bold`     |
| `--ds-button-gap`                   | `Button > Gap`                      |
| `--ds-number-input-color-base-text` | `NumberInput > Color > Base > Text` |

Naming rules:

- First segment = component name (PascalCase)
- Compound words (line-height, font-size) merge into single keys
- State keys (base, hover, active) remain separate

## Design Token Reference

When creating component tokens, the skill looks up the alias/global token's value:

| Need                   | Alias reference                              |
| ---------------------- | -------------------------------------------- |
| Primary color          | `{🔗 Alias.🎨 Background.Color.Primary}`     |
| Bold text weight       | `{🔗 Alias.🔤 Text.Weight.Bold}`             |
| Base radius            | `{🔗 Alias.🔵 Radius.Base}`                  |
| LG spacing             | `{🔗 Alias.↔️ Space.LG.Mobile}`              |
| Transparent background | `{🔗 Alias.🎨 Background.Color.Transparent}` |

## Error Handling

| Condition              | Action                                      |
| ---------------------- | ------------------------------------------- |
| No SCSS files found    | Fail: "At least one SCSS file required"     |
| JSON file missing      | Fail: "Base.tokens.json not found"          |
| JSON is malformed      | Fail: "Invalid JSON"                        |
| `npm run tokens` fails | Fail: "Token rebuild failed" + error output |

## Files Modified

- `packages/core/src/components/<component>/<component>.style.scss`
- `packages/core/src/components/<component>/<component>.host.scss`
- `packages/tokens/tokens/Base.tokens.json`

## Related Commands

```bash
# Verify token output
grep "ds-button-" packages/tokens/dist/css/base.tokens.css

# Rebuild tokens manually
npm run tokens

# View component token section in JSON
cat packages/tokens/tokens/Base.tokens.json | grep -A 50 '"Button"'
```

## Requirements

- Baloise Design System monorepo structure
- Node.js 16+
- Write access to component and token files
- `npm run tokens` command available
