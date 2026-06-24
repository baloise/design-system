# ds-create-token Skill

Create component design tokens from CSS variables in component SCSS files.

## Overview

This skill helps you convert component CSS variables (defined with `@include vars.local()`) into proper component design tokens that live in `Base.tokens.json`.

The workflow is interactive:

1. **Extract** — Parse component SCSS to find all variables
2. **Review** — Show user what was found
3. **Suggest** — Propose component token paths
4. **Confirm** — User approves or edits suggestions
5. **Create** — Write tokens to `Base.tokens.json` and compile

## How It Works

### Token Path Structure

Component tokens follow this naming anatomy:

```
--ds-[component]-[variant]-[element]-[category]-[property]-[state]
```

Examples:

- `--ds-badge-primary-color-base-text` (badge with primary variant)
- `--ds-footer-background-base` (footer with no variant)
- `--ds-button-secondary-label-font-size-base` (button with secondary variant and element)

### Variable Types

The skill recognizes four types of values:

- **Alias** (`--ds-alias-*`) — Semantic design tokens (preferred)
- **Global** (`--ds-global-*`) — Raw values (should be replaced with alias)
- **Component** (`--ds-*` other) — Component-specific tokens
- **Hardcoded** (colors, numbers, strings) — Need to find or create alias match

## Usage

```bash
/ds-create-token badge
```

The skill will:

1. Find `packages/core/src/components/badge/badge.host.scss`
2. Parse all `@include vars.local()` calls
3. Extract `--mod-` variables from variant classes (`.is-primary`, etc.)
4. Show a table of what was found
5. Suggest component token paths
6. Ask for confirmation
7. Write approved tokens to `Base.tokens.json`
8. Run `pnpm tokens` to compile outputs

## Examples

### Simple Component (Footer)

```scss
@include vars.local(footer-background, var(--ds-alias-background-color-primary));
@include vars.local(footer-color, var(--ds-alias-text-color-white));
```

Creates:

```json
{
  "🧩 Component": {
    "Footer": {
      "Color": {
        "Background": {
          "$value": "{🔗 Alias.🎨 Background.Color.Primary}"
        },
        "Text": {
          "$value": "{🔗 Alias.🔤 Text.Color.White}"
        }
      }
    }
  }
}
```

### Component with Variants (Badge)

```scss
@include vars.local(badge-color, var(--ds-alias-text-color-primary));

:host(.is-primary) {
  --mod-badge-color: var(--ds-alias-text-color-white);
}

:host(.is-secondary) {
  --mod-badge-color: var(--ds-alias-text-color-secondary);
}
```

Creates:

```json
{
  "🧩 Component": {
    "Badge": {
      "Color": {
        "Primary": {
          "Text": {
            "$value": "{🔗 Alias.🔤 Text.Color.White}"
          }
        },
        "Secondary": {
          "Text": {
            "$value": "{🔗 Alias.🔤 Text.Color.Secondary}"
          }
        }
      }
    }
  }
}
```

## Features

- **Smart extraction** — Parses both base variables and variants
- **Type detection** — Identifies alias, global, and hardcoded values
- **Token suggestions** — Generates proper component token paths
- **Interactive workflow** — User confirms each step
- **Hardcoded handling** — Uses `ds-find-token` to find replacements
- **Backup & compile** — Backs up JSON and runs build after writing

## Requirements

- Component must exist in `packages/core/src/components/`
- Component must have a `.host.scss` file
- Must be run from design system root directory

## Important Notes

**JSDoc Comments:** When generating or updating JSDoc comments in the SCSS file, do NOT include default values in parentheses. Only include the property name and description. Example:

- ✓ `@prop --button-color: Text color of the button`
- ✗ `@prop --button-color: Text color of the button (default: --ds-alias-text-color-white)`
