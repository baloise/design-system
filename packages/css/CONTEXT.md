# CONTEXT — packages/css (Global Styles & Utilities)

This document captures domain language, architectural patterns, and key concepts specific to the CSS package.

## Overview

**packages/css** provides the global CSS styles and utility classes for the design system. It includes:

- **Global styles** — Base element styling, resets, typography defaults
- **Utility classes** — `.bg-primary`, `.text-lg`, `.p-md`, etc. for rapid prototyping
- **CSS variable system** — Token-driven theming via `--ds-*` variables
- **Responsive design** — Mobile-first breakpoint system

The package is built with **Sass** and generates a single CSS output that can be included globally in applications.

## Core Concepts

### Utility Classes

Utility classes provide single-purpose CSS rules for common styling needs:

- **Color utilities** — `.bg-primary`, `.text-danger`, `.border-success`
- **Spacing utilities** — `.p-lg`, `.m-md`, `.gap-sm`
- **Typography utilities** — `.text-lg`, `.text-bold`, `.line-height-tight`
- **Display utilities** — `.d-flex`, `.d-grid`, `.hidden`
- **Responsive utilities** — `.tablet:p-lg`, `.desktop:text-xl`

### Naming Convention

Utilities follow a consistent pattern: `.<property>-<value>`

Examples:
- `.bg-primary` — background color primary (from token `--ds-color-background-primary`)
- `.text-lg` — text size large (from token `--ds-text-size-lg`)
- `.p-md` — padding medium (from token `--ds-space-md`)
- `.border-2` — border width 2px (from token `--ds-border-width-2`)

### Responsive Breakpoints

Breakpoints follow a mobile-first approach:

| Breakpoint | Width | Usage |
| --- | --- | --- |
| **Mobile** | `<768px` | Default (no prefix) |
| **Tablet** | `≥769px` | `.tablet:property` |
| **Desktop** | `≥1024px` | `.desktop:property` |
| **Desktop LG** | `≥1408px` | `.desktop-lg:property` |
| **Desktop XL** | `≥1856px` | `.desktop-xl:property` |
| **Desktop 2XL** | `≥2560px` | `.desktop-2xl:property` |

Example: `.tablet:p-lg` applies padding-lg on tablet and up; base rules apply on mobile.

### Token Integration

All utility values come from design tokens. No hardcoded colors, sizes, or spacing in utilities:

- Color values → `packages/tokens/dist/json/tokens.json` (Color layer)
- Spacing values → `packages/tokens/dist/json/tokens.json` (Space layer)
- Font sizes → `packages/tokens/dist/json/tokens.json` (Text.Size layer)

When a token value changes, utility classes automatically reflect the new value.

## Notable Patterns

### Global Resets
- Standard CSS resets (margins, paddings, box-sizing)
- Baseline typography (font family, line height, color)
- Focus states for keyboard navigation
- No element styling beyond basics (let components handle their own styles)

### Theming via CSS Variables
Applications can override token values by setting CSS variables:

```css
:root {
  --ds-color-primary: #FF6600; /* Override primary color */
  --ds-space-lg: 2rem;         /* Override large spacing */
}
```

All utilities and components automatically use the new values.

### Utility Generation

Utilities are generated from `packages/tokens/dist/json/tokens.json` via a build process. The generator:

1. Reads token definitions
2. Creates utility classes for each token
3. Generates responsive variants (tablet:, desktop:, etc.)
4. Outputs a single CSS file

## Key Constraints

- **Token-driven only** — No hardcoded values; everything references tokens
- **Single-purpose utilities** — Each class does one thing
- **No component-specific utilities** — Component styling lives in `packages/core`
- **Mobile-first responsive** — Base rules apply to mobile; add breakpoint prefixes for larger screens
- **Standards compliance** — Use standard CSS features; avoid experimental syntax

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:
- [[packages/tokens|packages/tokens/CONTEXT.md]] — Token definitions and values
- [[packages/core|packages/core/CONTEXT.md]] — Component styles (not utilities)
- [[root|CONTEXT.md]] — Repository-level concepts
