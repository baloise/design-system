---
name: ds-sync-vars
description: Sync component CSS variables to design tokens in the tokens package. Reads SCSS files and generates corresponding component design tokens linking to Alias tokens. Use when setting up component styling or aligning with design system tokens.
---

# Sync Component Variables

Auto-generates component design tokens from CSS variables defined in component SCSS files.

## Quick Start

Sync a component's variables to design tokens:

```bash
ds-sync-vars button
```

Process:
1. Parse `button.style.scss` and `button.host.scss`
2. Extract CSS variable definitions from `@include vars.local()` calls
3. Check existing component tokens in `Base.tokens.json`
4. Map variables to Alias tokens using semantic rules
5. Show checklist of changes
6. User confirms
7. Create tokens and regenerate

Output:
```
✅ Synced button component variables
  • 5 variables processed
  • 2 used existing tokens
  • 3 created new component tokens
  • 0 required new Alias tokens
  
[Detailed markdown table of changes]
```

## How It Works

### 1. SCSS Parsing

Reads component SCSS files:
- `packages/core/src/components/[component]/[component].style.scss`
- `packages/core/src/components/[component]/[component].host.scss`
- Sub-components (e.g., button-group, carousel-item)

Extracts variable definitions:
```scss
@include vars.local(button-font-family, var(--ds-button-family));
@include vars.local(button-gap, 0.5rem);
@include vars.local(button-color-text, var(--ds-button-color-primary-base-text));
```

### 2. Token Mapping

**Semantic mapping rules** (property → token category):
- `font-*` → `🔗 Alias.🔤 Text.Family.*`
- `size` (typography) → `🔗 Alias.🔤 Text.Size.*`
- `gap`, `spacing`, `padding`, `margin` → `🔗 Alias.↔️ Space.*`
- `color-*-text`, `color-*-border`, `color-*-background` → `🔗 Alias.🎨 Color.*`
- `radius` → `🔗 Alias.🔘 Border.Radius.*`
- `shadow` → `🔗 Alias.🌫️ Shadow.*`
- `line-height`, `weight` → `🔗 Alias.🔤 Text.*`

### 3. Edge Cases Handled

**Already-linked:**
```
✓ button-font-family → Uses: 🔗 Alias.🔤 Text.Family.Base
```

**Matching Alias exists:**
```
✓ button-gap → Links to: 🔗 Alias.↔️ Space.SM
```

**Ambiguous mapping:**
```
? button-width → Multiple matches found:
  1. 🔗 Alias.↔️ Space.LG
  2. 🔗 Alias.Custom.Width
  Select: (user chooses)
```

**Hardcoded value:**
```
⚠ button-gap (0.5rem) → Suggest new Alias: 🔗 Alias.↔️ Space.Button.Gap
  (0.5rem matches Space.SM scale)
```

**No matching Alias:**
```
✗ button-custom-color → Suggest new Alias: 🔗 Alias.🎨 Color.Button.Custom
```

### 4. Review & Confirm

Shows markdown table:
```markdown
| Variable | Status | Maps To | Action |
|----------|--------|---------|--------|
| button-font-family | ✓ Exists | 🔗 Alias.🔤 Text.Family.Base | Use existing |
| button-gap | ✓ Create | 🔗 Alias.↔️ Space.SM | Create component token |
| button-color-primary-base-text | ? Select | 🔗 Alias.🎨 Color.Primary.Base.Text | User confirms |
```

User confirms: `Proceed with creation? (y/n)`

### 5. Token Creation

Creates in `Base.tokens.json` under `🧩 Component > [Component]`:
```json
{
  "FontFamily": {
    "$type": "typography",
    "$value": "{🔗 Alias.🔤 Text.Family.Base}",
    "$extensions": {
      "com.figma.variableId": "PLACEHOLDER",
      "com.figma.scopes": ["ALL_SCOPES"],
      "com.figma.isOverride": true
    }
  }
}
```

Generates CSS variable: `--ds-button-font-family`

### 6. Auto-Regenerate

Runs `npm run tokens` to regenerate:
- `dist/css/base.tokens.css`
- `dist/scss/_tokens.scss`
- `dist/json/tokens.json`

### 7. Report

Outputs detailed markdown table showing all processed variables, their status, mapped tokens, and actions taken.

## Sub-Components

Automatically handles sub-components (e.g., button-group, carousel-item):
```bash
ds-sync-vars button
# Processes:
# - button/button.tsx
# - button/button-group/button-group.tsx
```

Creates separate token sections:
```json
{
  "🧩 Component": {
    "Button": { /* button tokens */ },
    "ButtonGroup": { /* button-group tokens */ }
  }
}
```

Reports separately for each component.

## Pixel Scale Matching

For hardcoded values, automatically matches to Space scale:
- `0.5rem` → `Space.XS`
- `0.75rem` → `Space.XS`
- `1rem` → `Space.SM`
- `1.5rem` → `Space.MD`
- `2rem` → `Space.LG`
- `3rem` → `Space.XL`
- etc.

Suggests: "Create new Alias token (0.5rem matches Space.XS)"

## What Gets Synced

✅ Component SCSS variables  
✅ Sub-component variables  
✅ Links to existing Alias tokens  
✅ Creates new component tokens  
✅ Suggests new Alias tokens when needed  

❌ Global token references (always uses Alias layer)  
❌ Git operations (just reports changes)  
❌ Figma metadata (uses PLACEHOLDER for now)  

## Related

See [REFERENCE.md](REFERENCE.md) for detailed token naming conventions and mapping rules.
