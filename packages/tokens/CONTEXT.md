# CONTEXT — packages/tokens (Design Tokens)

This document captures domain language, architectural patterns, and key concepts specific to the design tokens package.

## Overview

**packages/tokens** is the source of truth for all design values (colors, spacing, fonts, shadows, etc.) in the system. It uses **Style Dictionary** to compile human-readable token definitions into multiple output formats:

- CSS variables (`dist/css/base.tokens.css`)
- SCSS functions/variables (`dist/scss/_tokens.scss`)
- JavaScript/JSON (`dist/json/tokens.json`)
- TypeScript types

## Core Concepts

### Token Definition

A **token** is a named design value that represents a single, reusable design decision. Examples:

- `space-lg` → `1.5rem` (spacing token)
- `color-primary` → `#0066CC` (color token)
- `text-size-base` → `1rem` (typography token)
- `shadow-box-default` → `0 2px 8px rgba(0,0,0,0.1)` (shadow token)

### Three-Layer Architecture

Tokens are organized into three layers:

| Layer         | JSON Key       | Purpose                               | Consumer Access                            |
| ------------- | -------------- | ------------------------------------- | ------------------------------------------ |
| **Global**    | `🌐 Global`    | Raw values (color scales, base sizes) | ❌ Rarely; only when no Alias fits         |
| **Alias**     | `🔗 Alias`     | Meaningful abstractions for consumers | ✅ **Primary layer** for component/app use |
| **Component** | `🧩 Component` | Per-component token overrides         | ✅ When styling a specific DS component    |

**Flow:** Components reference Alias tokens → resolved to Global values → values come from Figma

### Naming Convention

Token names follow the [EightShapes naming guide](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676): move from broad category to specific modifier.

**CSS variable pattern:** `--ds-[category]-[name]`

Examples:

- `space-lg` → `--ds-space-lg` → `1.5rem`
- `color-text-primary` → `--ds-color-text-primary` → `#000`
- `radius-base` → `--ds-radius-base` → `0.25rem`

### Figma Integration

Each token in `Base.tokens.json` carries a `$extensions.com.figma.variableId`. The JSON file is the source of truth — tokens are synced to Figma as variables. When referencing a token by name in Figma, the same name is used in CSS.

## Key Concepts

### Responsive Tokens

Some tokens have responsive variants (e.g., spacing scales with breakpoints):

- `--ds-space-lg` — base value (mobile default)
- `--ds-space-lg-device` — auto-responsive via `@media` breakpoints

Use the base token for static values; use `-device` variant when automatic scaling is desired.

### Token Categories

Common categories in the Alias layer:

- **Space** (2XS–4XL, plus responsive variants)
- **Color** (backgrounds, borders, text, with light/dark variants)
- **Border** (width, color, radius)
- **Text** (size, color, family, weight, line-height, shadow)
- **Opacity** (hidden, half, disabled, backdrop, full)
- **Z-Index** (deep, masked, sticky, navigation, popup, modal, toast, tooltip)
- **Shadow** (box, text)
- **Breakpoint** (tablet, desktop, desktop-lg, etc.)

### JSON Structure

Component tokens are nested under `"🧩 Component" > "<ComponentName>"`:

```json
{
  "🧩 Component": {
    "Button": {
      "Color": {
        "Primary": {
          "Base": {
            "Text": {
              "$type": "color",
              "$value": "{🔗 Alias.Color.Text.White}",
              "$extensions": { "com.figma.variableId": "..." }
            }
          }
        }
      }
    }
  }
}
```

This maps to CSS variable: `--ds-button-color-primary-base-text`

## Notable Patterns

### Building Tokens

Rebuild compiled outputs whenever `Base.tokens.json` changes:

```bash
npm run tokens
```

This regenerates:

- `dist/css/base.tokens.css`
- `dist/scss/_tokens.scss`
- `dist/json/tokens.json`

### Token Lookup Guide

When a developer asks "what token should I use for X?":

1. Read `Base.tokens.json` — find the token in the Alias layer (prefer Alias; fall back to Global only if needed)
2. Read `dist/css/base.tokens.css` — find the exact CSS variable and resolved value
3. Return: `Token: space-lg → CSS: var(--ds-space-lg) → 1.5rem`

## Key Constraints

- **Alias tokens are primary** — Don't encourage direct Global reference
- **Figma variables are synchronized** — Token changes must be reflected back to Figma
- **Naming is immutable** — Renaming a token is a breaking change for consumers
- **Values are inherited from Figma** — Design decisions flow from Figma → tokens → components

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/core|packages/core/CONTEXT.md]] — Component consumption of tokens
- [[packages/css|packages/css/CONTEXT.md]] — Utility class generation from tokens
- [[root|CONTEXT.md]] — Repository-level concepts
