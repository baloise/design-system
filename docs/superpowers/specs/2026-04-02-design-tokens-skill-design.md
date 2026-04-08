# Design: Design Tokens Skill

**Date:** 2026-04-02  
**Status:** Approved

## Purpose

A Claude Code skill (`design-tokens`) that helps both DS developers and consumers find the right design token for a custom component need — returning the token name and its CSS variable usage with current value.

## Trigger

Invoke when a developer asks about:
- What token to use for spacing, color, background, border, radius, shadow, z-index, or typography
- CSS variables from the Baloise Design System
- How to implement a visual property (e.g. "what's the spacing for LG?", "which background color token for a card?")

## Token System Orientation

Tokens live in `packages/tokens/tokens/Base.tokens.json` and are processed by Style Dictionary into multiple output formats.

### Three-Layer Structure

| Layer | Key | Purpose | When to use |
|-------|-----|---------|-------------|
| Primitive | `🧱 Primitive` | Raw values (color scales, raw sizes, fonts) | Rarely — only when no semantic token fits |
| Semantic | `🏷️ Semantic` | Meaningful abstractions (Space, Background, Border, Radius, Z-Index, Text, Shadow) | Primary layer for component consumers |
| Component | `🧩 Component` | Per-component tokens (Button, Card, Badge, etc.) | When building or overriding a specific DS component |

### Key Semantic Categories

- **Space:** None, Auto, 2XS, XS, SM, Base, MD, LG, XL, 2XL, 3XL, 4XL
- **Background Color:** semantic color roles
- **Border:** Color, Width
- **Radius:** None, Base, LG, Rounded
- **Text:** Size, Color, Family, Weight, LineHeight, Shadow
- **Shadow:** Text, Box
- **Z-Index:** Deep, Masked, Mask, Sticky, Navigation, Popup, Modal, Toast, Tooltip
- **Opacity:** Hidden, Half, Disabled, Backdrop, Full
- **Breakpoint:** Tablet, Desktop, DesktopLG, DesktopXL, Desktop2XL

### Naming Convention Reference

Token names follow the [EightShapes naming guide](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676) — names move from broad category to specific property (e.g. `space` → `lg`, `color` → `primary`). When helping a developer name a new token, apply this principle: category first, modifier last.

### Figma Integration

Tokens are synced with Figma via the `$extensions.com.figma.variableId` field in `Base.tokens.json`. Each token carries a Figma variable ID, which means:
- The source of truth is `Base.tokens.json` — changes there propagate to Figma
- When referencing a token, it is available as a Figma variable under the same name

### CSS Variable Naming Convention

```
--ds-[category]-[name]
```

Examples:
- `--ds-space-lg`
- `--ds-color-primary`
- `--ds-radius-base`
- `--ds-text-size-base`

## Dynamic Lookup Flow

When a developer asks for a token:

1. **Read** `packages/tokens/tokens/Base.tokens.json` — locate the token in the correct layer (prefer Semantic, fall back to Primitive or Component)
2. **Read** `packages/tokens/dist/css/base.tokens.css` — find the exact CSS variable name and its resolved value
3. **Return** the result in this format:

> **Token:** `space-lg`  
> **CSS:** `var(--ds-space-lg)` → `1.5rem`

If multiple tokens could fit, list the top 2-3 with brief notes on when to use each.

## Output Files

| Format | Path |
|--------|------|
| Source | `packages/tokens/tokens/Base.tokens.json` |
| CSS variables | `packages/tokens/dist/css/base.tokens.css` |
| SCSS variables | `packages/tokens/dist/sass/base.tokens.scss` |
| JS constants | `packages/tokens/dist/js/base.tokens.js` |
| Web JSON | `packages/tokens/dist/web/base.tokens.json` |

## Skill File Location

`.claude/skills/design-tokens.md` in the project root (project-scoped skill, available to all contributors).
