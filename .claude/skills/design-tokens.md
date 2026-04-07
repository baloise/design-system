---
name: design-tokens
description: Use when a developer asks what token to use for a component need — spacing, color, background, border, radius, shadow, z-index, or typography. Returns token name and CSS variable with current value.
---

# Design Tokens

## Token System Overview

Tokens live in `packages/tokens/tokens/Base.tokens.json` and are processed by Style Dictionary into CSS, SCSS, JS, and JSON outputs.

Three layers — always prefer Semantic for consumer use:

| Layer | JSON key | Purpose | When to use |
|-------|----------|---------|-------------|
| Primitive | `🧱 Primitive` | Raw values (color scales, sizes, fonts) | Rarely — only when no semantic token fits |
| Semantic | `🏷️ Semantic` | Meaningful abstractions | **Primary layer for component consumers** |
| Component | `🧩 Component` | Per-component tokens | When building or overriding a specific DS component |

## Naming Convention

Follows the [EightShapes naming guide](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676): names move from broad category to specific modifier.

CSS variable pattern: `--bal-[category]-[name]`

| Example need | Token | CSS variable |
|-------------|-------|-------------|
| Large spacing | `space-lg` | `--bal-space-lg` |
| Primary background | `background-color-primary` | `--bal-background-color-primary` |
| Base border radius | `radius-base` | `--bal-radius-base` |
| Base text size | `text-size-base` | `--bal-text-size-base` |

## Responsive Tokens

Space tokens have responsive variants. For most uses, reference the base token:

- `--bal-space-lg` — base value (mobile default)
- `--bal-space-lg-device` — automatically responsive via `@media` breakpoints

Use `--bal-space-lg` for static use, `--bal-space-lg-device` when you want automatic responsive scaling.

## Key Semantic Categories

- **Space:** None, Auto, 2XS, XS, SM, Base, MD, LG, XL, 2XL, 3XL, 4XL
- **Background Color:** white, transparent, sky, grey, primary, info, success, warning, danger (+ light/dark variants)
- **Border:** Color, Width
- **Radius:** None, Base, LG, Rounded
- **Text:** Size, Color, Family, Weight, LineHeight, Shadow
- **Shadow:** Text, Box
- **Z-Index:** Deep, Masked, Mask, Sticky, Navigation, Popup, Modal, Toast, Tooltip
- **Opacity:** Hidden, Half, Disabled, Backdrop, Full
- **Breakpoint:** Tablet (769px), Desktop (1024px), DesktopLG, DesktopXL, Desktop2XL

## Figma Integration

Each token in `Base.tokens.json` carries a `$extensions.com.figma.variableId`. The JSON file is the source of truth — tokens are synced to Figma as variables under the same name. When referencing a token by name, it is available as a Figma variable.

## How to Look Up a Token

When a developer asks "what token should I use for X?":

1. **Read** `packages/tokens/tokens/Base.tokens.json` — find the token in the Semantic layer (prefer Semantic; fall back to Primitive or Component only if needed)
2. **Read** `packages/tokens/dist/css/base.tokens.css` — find the exact CSS variable name and its resolved value
3. **Return** in this format:

> **Token:** `space-lg`
> **CSS:** `var(--bal-space-lg)` → `1.5rem`
> **Responsive variant:** `var(--bal-space-lg-device)` (scales with breakpoint)

If multiple tokens could fit, list the top 2–3 with a brief note on when to use each.
