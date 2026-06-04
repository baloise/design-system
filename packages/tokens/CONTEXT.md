# CONTEXT — packages/tokens (Design Tokens)

This document captures domain language, architectural patterns, and key concepts specific to the design tokens package.

## Overview

**packages/tokens** is the source of truth for all design values (colors, spacing, fonts, shadows, etc.) in the system. It uses **Style Dictionary** to compile human-readable token definitions into multiple output formats:

- CSS variables (`dist/css/base.tokens.css`)
- SCSS functions/variables (`dist/scss/_tokens.scss`)
- JavaScript/JSON (`dist/json/tokens.json`)
- TypeScript types

## What are Design Tokens?

Design tokens are **named, reusable design decisions** stored as data rather than hard-coded values. Instead of writing `background-color: #005EFF` in your CSS, you write `background-color: var(--ds-button-primary-color-bg-base)`.

This approach provides:

- **Single source of truth** — designers and developers reference the same values
- **Easy rebranding** — change one token, update everywhere automatically
- **Consistency** — all components automatically stay aligned

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

**CSS variable prefix:** All CSS variables start with `--ds-` prefix.

Naming differs by layer:

#### Global Layer

Raw color scales with numbered intensity levels (1–5+):

- Pattern: `--ds-global-[category]-[name]-[number]`
- Examples:
  - `--ds-global-color-primary-1` through `--ds-global-color-primary-5` (lightest to darkest)
  - `--ds-global-color-danger-1` through `--ds-global-color-danger-4`
  - `--ds-global-color-grey-1` through `--ds-global-color-grey-5`

#### Alias Layer

Semantic abstractions for consumers (colors, spacing, typography, etc.):

- Pattern: `--ds-[category]-[subcategory]-[name]`
- Examples:
  - `--ds-background-color-sky` (references `--ds-global-color-sky-2`)
  - `--ds-background-color-info` (references `--ds-global-color-info-3`)
  - `--ds-space-lg` → `1.5rem`
  - `--ds-text-size-base` → `1rem`
  - `--ds-radius-base` → `0.25rem`

#### Component Layer

Per-component token overrides for specific use cases:

- Pattern: `--ds-[component]-[property]-[modifier]-[state]`
- Examples:
  - `--ds-button-color-primary-base-text` (button primary state text color)
  - `--ds-button-label-font-family` (button label typography)
  - `--ds-modal-header-border-color` (modal header styling)

### Figma Integration

Each token in `Base.tokens.json` carries a `$extensions.com.figma.variableId`. The JSON file is the source of truth — tokens are synced to Figma as variables. When referencing a token by name in Figma, the same name is used in CSS.

## Key Concepts

### Responsive Tokens

Typography and spacing tokens come in **three responsive variants** plus one auto-responsive form:

| Form        | Example                           | Behavior                     |
| ----------- | --------------------------------- | ---------------------------- |
| **Mobile**  | `--ds-alias-font-size-xl-mobile`  | Always mobile value          |
| **Tablet**  | `--ds-alias-font-size-xl-tablet`  | Always tablet value          |
| **Desktop** | `--ds-alias-font-size-xl-desktop` | Always desktop value         |
| **Device**  | `--ds-alias-font-size-xl-device`  | Auto-switches at breakpoints |

**Always prefer `-device`** in component code. The fixed variants exist only for special cases where you need to force a specific breakpoint value.

#### How `-device` Works

The `-device` variant automatically switches values at media breakpoints:

```css
:root {
  --ds-font-size-xl-device: var(--ds-font-size-28); /* mobile: 1.75rem */
}

@media (min-width: 769px) {
  :root {
    --ds-font-size-xl-device: var(--ds-font-size-40); /* tablet: 2.5rem */
  }
}

@media (min-width: 1024px) {
  :root {
    --ds-font-size-xl-device: var(--ds-font-size-40); /* desktop: 2.5rem */
  }
}
```

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

## Token Naming Anatomy

Token names are composed of ordered segments that narrow scope:

```
--ds  -  component  -  variant  -  element  -  category  -  property  -  state
```

**Example: Button Primary Color**

```
--ds-button-primary-color-bg-base
  │    │       │       │     │  │
  │    │       │       │     │  └─ state (base, hover, active, disabled)
  │    │       │       │     └─ property (bg = background, text = color, border)
  │    │       │       └─ category (color, font, space)
  │    │       └─ variant (primary, secondary, ghost)
  │    └─ component (button, input, tag)
  └─ namespace (--ds)
```

### Naming Rules

**Typography tokens** use `font-` prefix:

- ✅ `--ds-button-font-size` (not `--ds-button-size`)
- ✅ `--ds-button-font-weight` (not `--ds-button-weight`)

**Color order** — variant comes before category:

- ✅ `--ds-button-primary-color-text`
- ❌ `--ds-button-color-primary-text` (wrong order)

**State is required** for colors:

- ✅ `--ds-button-primary-color-bg-base`
- ❌ `--ds-button-primary-color-bg` (missing state)

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

## Using Tokens in Components

### In Shadow DOM (Web Components)

Web components use a four-layer CSS cascade for each token:

```scss
@include vars.local(button-color, var(--ds-button-primary-color-text-base));

// Generates:
// --_button-color: var(--button-color, var(--mod-button-color, var(--ds-button-primary-color-text-base)))
```

This allows:

1. **Private** (`--_button-color`) — computed locally
2. **Public** (`--button-color`) — consumers can override
3. **Modifier** (`--mod-button-color`) — variant classes set this
4. **Design token** (`--ds-button-...`) — system default

### In Global CSS

Outside Shadow DOM, use tokens directly:

```css
.my-card {
  background: var(--ds-alias-background-color-primary);
  padding: var(--ds-alias-space-16);
  border-radius: var(--ds-alias-radius-base);
}
```

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
