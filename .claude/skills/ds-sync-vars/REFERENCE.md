# ds-sync-vars Reference

Detailed technical documentation for component variable syncing.

---

## Token Naming Conventions

### CSS Variable Pattern

**Global/Alias:** `--ds-[category]-[name]`  
**Component:** `--ds-[component]-[property]`  
**Local (private):** `--_[component]-[property]`

Examples:

- `--ds-space-lg` (Alias)
- `--ds-button-font-family` (Component)
- `--_button-gap` (Local)

### Component Variable Names

**Format:** `[component]-[property]-[variant]`

Examples:

- `button-font-family` → Font family for button text
- `button-gap` → Gap between icon and label
- `button-color-primary-base-text` → Text color for primary button at base state
- `button-color-primary-hover-background` → Background color on hover state

### Token Categories & Aliases

| Property Pattern                                       | Category | Alias Path                      | Examples                                                   |
| ------------------------------------------------------ | -------- | ------------------------------- | ---------------------------------------------------------- |
| `font-family`, `font`                                  | Text     | `🔗 Alias.🔤 Text.Family.*`     | `Text.Family.Base`, `Text.Family.Monospace`                |
| `font-size`, `size` (typography)                       | Text     | `🔗 Alias.🔤 Text.Size.*`       | `Text.Size.SM`, `Text.Size.Base`, `Text.Size.LG`           |
| `font-weight`, `weight`                                | Text     | `🔗 Alias.🔤 Text.Weight.*`     | `Text.Weight.Regular`, `Text.Weight.Bold`                  |
| `line-height`                                          | Text     | `🔗 Alias.🔤 Text.LineHeight.*` | `Text.LineHeight.Tight`, `Text.LineHeight.Base`            |
| `gap`, `spacing`, `padding`, `margin`                  | Space    | `🔗 Alias.↔️ Space.*`           | `Space.XS`, `Space.SM`, `Space.MD`, `Space.LG`             |
| `radius`, `border-radius`                              | Border   | `🔗 Alias.🔘 Border.Radius.*`   | `Border.Radius.Base`, `Border.Radius.LG`                   |
| `border-width`                                         | Border   | `🔗 Alias.🔘 Border.Width.*`    | `Border.Width.Base`, `Border.Width.Thick`                  |
| `color-*-text`, `color-*-border`, `color-*-background` | Color    | `🔗 Alias.🎨 Color.*.*.*`       | `Color.Primary.Base.Text`, `Color.Danger.Hover.Background` |
| `shadow`, `box-shadow`, `text-shadow`                  | Shadow   | `🔗 Alias.🌫️ Shadow.*`          | `Shadow.Box.Default`, `Shadow.Text.Subtle`                 |

---

## SCSS Variable Definition Format

### Standard Pattern

```scss
@include vars.local(component-property, var(--ds-component-property));
```

Creates:

- Local variable: `--_component-property`
- References: `--ds-component-property` (should be a design token)

### Examples

**From button.style.scss:**

```scss
@include vars.local(button-font-family, var(--ds-button-family));
@include vars.local(button-font-weight, var(--ds-button-weight));
@include vars.local(button-font-size, var(--ds-button-size-base));
@include vars.local(button-color-text, var(--ds-button-color-primary-base-text));
```

**With fallback values:**

```scss
@include vars.local(button-width, var(--ds-button-width, fit-content));
@include vars.local(button-gap, 0.5rem);
```

---

## Token Lookup Process

### 1. Extract Variable Name

Input: `button-font-family`

Parse into:

- Component: `button`
- Property: `font-family`

### 2. Determine Category

Property `font-family` → Category: **Text → Family**

### 3. Search Alias Tokens

Look in `Base.tokens.json`:

```json
{
  "🔗 Alias": {
    "🔤 Text": {
      "Family": {
        "Base": { "$value": "..." }
      }
    }
  }
}
```

### 4. Match Result

If found:

- Use: `🔗 Alias.🔤 Text.Family.Base`
- CSS variable: `--ds-text-family-base`

If not found:

- Suggest creating new Alias
- Or ask user to select from similar matches

---

## Component Token Creation

### JSON Structure

Created under `🧩 Component > [Component]`:

```json
{
  "🧩 Component": {
    "Button": {
      "FontFamily": {
        "$type": "typography",
        "$value": "{🔗 Alias.🔤 Text.Family.Base}",
        "$extensions": {
          "com.figma.variableId": "PLACEHOLDER",
          "com.figma.scopes": ["ALL_SCOPES"],
          "com.figma.isOverride": true
        }
      },
      "ColorPrimaryBaseText": {
        "$type": "color",
        "$value": "{🔗 Alias.🎨 Color.Primary.Base.Text}",
        "$extensions": {
          "com.figma.variableId": "PLACEHOLDER",
          "com.figma.scopes": ["ALL_SCOPES"],
          "com.figma.isOverride": true
        }
      }
    }
  }
}
```

### CSS Variable Output

Generated from JSON structure:

- `button-font-family` → `--ds-button-font-family`
- `button-color-primary-base-text` → `--ds-button-color-primary-base-text`

---

## Space Scale Matching

For hardcoded pixel values, automatically match to Space scale:

| Pixel Value    | Space Token |
| -------------- | ----------- |
| 0.25rem (4px)  | `Space.2XS` |
| 0.5rem (8px)   | `Space.XS`  |
| 0.75rem (12px) | `Space.XS`  |
| 1rem (16px)    | `Space.SM`  |
| 1.25rem (20px) | `Space.SM`  |
| 1.5rem (24px)  | `Space.MD`  |
| 2rem (32px)    | `Space.LG`  |
| 2.5rem (40px)  | `Space.LG`  |
| 3rem (48px)    | `Space.XL`  |
| 4rem (64px)    | `Space.2XL` |

---

## Edge Case Handling

### Case 1: Already-Linked Token

**SCSS:**

```scss
@include vars.local(button-font-family, var(--ds-button-family));
```

**Check:** Does `--ds-button-family` exist in Alias tokens?

**If yes:**

- Action: Skip (already correct)
- Report: `✓ button-font-family → Uses: 🔗 Alias.🔤 Text.Family.Base`

### Case 2: Matching Alias Exists

**SCSS:**

```scss
@include vars.local(button-gap, var(--ds-button-gap));
```

**Check:** Is there an Alias token that matches the semantic meaning?

**If yes (e.g., `🔗 Alias.↔️ Space.SM`):**

- Action: Create component token linking to it
- Report: `✓ button-gap → Links to: 🔗 Alias.↔️ Space.SM`

### Case 3: Ambiguous Mapping

**SCSS:**

```scss
@include vars.local(button-width, var(--ds-button-width));
```

**Check:** Multiple Alias tokens could match (Space? Custom dimension?)

**Show options:**

```
? button-width → Multiple matches:
  1. 🔗 Alias.↔️ Space.LG
  2. 🔗 Alias.Custom.Width
  Select (1-2):
```

**Action:** User selects, create component token for selection

### Case 4: Hardcoded Value (No Token Reference)

**SCSS:**

```scss
@include vars.local(button-gap, 0.5rem);
```

**Check:** Is this a hardcoded value instead of a token reference?

**If yes:**

- Action: Warn and suggest creating new Alias token
- Auto-match: 0.5rem → Space.XS
- Report: `⚠ button-gap (0.5rem) → Suggest new Alias: 🔗 Alias.↔️ Space.Button.Gap (0.5rem = Space.XS)`
- Require user confirmation

### Case 5: No Matching Alias

**SCSS:**

```scss
@include vars.local(button-custom-color, var(--ds-button-custom-color));
```

**Check:** Does any Alias token exist for this semantic property?

**If not:**

- Action: Suggest creating new Alias token based on property meaning
- Report: `✗ button-custom-color → Suggest new Alias: 🔗 Alias.🎨 Color.Button.Custom (confirm?)`
- Require user confirmation

---

## Confirmation Checklist Format

### Markdown Table

```markdown
| Variable                       | Status      | Maps To                             | Action                 |
| ------------------------------ | ----------- | ----------------------------------- | ---------------------- |
| button-font-family             | ✓ Exists    | 🔗 Alias.🔤 Text.Family.Base        | Use existing           |
| button-font-weight             | ✓ Exists    | 🔗 Alias.🔤 Text.Weight.Base        | Use existing           |
| button-gap                     | ✓ Create    | 🔗 Alias.↔️ Space.SM                | Create component token |
| button-color-primary-base-text | ✓ Create    | 🔗 Alias.🎨 Color.Primary.Base.Text | Create component token |
| button-width                   | ? Select    | Multiple matches                    | User selects option    |
| button-padding-inline          | ⚠ Hardcoded | 1.5rem (Space.MD)                   | Confirm new Alias?     |
| button-custom-style            | ✗ No match  | (none)                              | Confirm new Alias?     |
```

**Status indicators:**

- `✓` — Use existing or create (approved)
- `?` — Multiple options (user selection needed)
- `⚠` — Hardcoded value (user confirmation needed)
- `✗` — No match (user confirmation needed)

### User Confirmation

```
Review changes above. Proceed with creation? (y/n)
```

**If yes:**

1. Create component tokens in `Base.tokens.json`
2. Run `npm run tokens`
3. Report results

**If no:**

- Cancel operation
- No files modified

---

## Sub-Component Handling

### Component Structure

```
button/
├── button.tsx
├── button.style.scss
├── button.host.scss
└── button-group/
    ├── button-group.tsx
    ├── button-group.style.scss
    └── button-group.host.scss
```

### SCSS File Parsing

1. Parse `button.style.scss` and `button.host.scss`
2. Extract variables → `button-*`
3. Parse `button-group/button-group.style.scss` and `.host.scss`
4. Extract variables → `button-group-*`

### Token Organization

Created in `Base.tokens.json`:

```json
{
  "🧩 Component": {
    "Button": {
      /* button variables */
    },
    "ButtonGroup": {
      /* button-group variables */
    }
  }
}
```

### Reporting

Report separately for each component:

```markdown
## Button

| Variable | Status | Maps To | Action |
...

## ButtonGroup

| Variable | Status | Maps To | Action |
...

## Summary

✅ Synced 2 components
• Button: 5 variables (2 existing, 3 created)
• ButtonGroup: 3 variables (1 existing, 2 created)
```

---

## Token Regeneration

### Command

```bash
npm run tokens
```

### Outputs Updated

- `dist/css/base.tokens.css` — CSS variables
- `dist/scss/_tokens.scss` — SCSS variables
- `dist/json/tokens.json` — JSON format
- `dist/web/base.tokens.json` — Web format
- `dist/docs/base.tokens.json` — Documentation

All outputs will include the newly created component tokens with their Alias references resolved.
