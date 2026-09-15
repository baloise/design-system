# CONTEXT — packages/styles (Global Styles & Utilities)

This document captures domain language, architectural patterns, and key concepts specific to the CSS package.

## Overview

**packages/styles** provides the global CSS styles and utility classes for the design system. It includes:

- **Global styles** — Base element styling, resets, typography defaults
- **Utility classes** — `.bg-primary`, `.text-lg`, `.p-md`, etc. for rapid prototyping
- **CSS variable system** — Token-driven theming via `--ds-*` variables
- **Responsive design** — Mobile-first breakpoint system

The package is built with **Sass** and generates a single CSS output that can be included globally in applications.

**Foundation**: ds-styles's reset + structural-styles layer. Named "Foundation," not "Base,"
specifically to avoid colliding with "Base" the default brand (see
[[packages/tokens|packages/tokens/CONTEXT.md]]) — a component's `Base` interaction state is a
third, unrelated use of the word. Foundation carries no token values at all (see "Token
Integration" below); it's pure reset/structure. Has no standalone compiled CSS file, and no
public Sass entry point either — `packages/styles/src/scss/foundation.scss` exists as a source file
(consumed internally by `packages/styles/src/build.ts` to produce `css/design-system`), but is not
listed in `package.json`'s `exports`, so it isn't importable from outside the package. See "CSS
Bundling" below.
_Avoid_: "base" (for this layer specifically — reserved for the brand)

### CSS Bundling

ds-styles ships exactly two compiled CSS outputs: `css/design-system` (Foundation + Components
together, with `.min`/`.local`/`.local.min` variants) and `css/utilities` (Utilities alone).
Utilities is genuinely optional and separate, not folded into `css/design-system` — a consumer
adds `css/utilities` only if they use utility classes. There is no standalone `css/foundation` or
`css/components` compiled CSS. `scss/design-system` (the one public Sass entry point besides
`scss/mixins`) transitively `@use`s Foundation's Sass source, so a Sass consumer still gets
Foundation that way — but ships no Component or Utility Sass at all, only via the compiled
`css/design-system` / `css/utilities` bundles.

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

- `.bg-primary` — background color primary (from token `--ds-alias-background-color-primary`)
- `.text-lg` — text size large (from token `--ds-alias-text-size-lg`)
- `.p-md` — padding medium (from token `--ds-alias-space-md`)
- `.border-2` — border width 2px (from token `--ds-alias-border-width-2`)

### Responsive Breakpoints

Breakpoints follow a mobile-first approach:

| Breakpoint      | Width     | Usage                   |
| --------------- | --------- | ----------------------- |
| **Mobile**      | `<768px`  | Default (no prefix)     |
| **Tablet**      | `≥769px`  | `.tablet:property`      |
| **Desktop**     | `≥1024px` | `.desktop:property`     |
| **Desktop LG**  | `≥1408px` | `.desktop-lg:property`  |
| **Desktop XL**  | `≥1856px` | `.desktop-xl:property`  |
| **Desktop 2XL** | `≥2560px` | `.desktop-2xl:property` |

Example: `.tablet:p-lg` applies padding-lg on tablet and up; base rules apply on mobile.

### Token Integration

All utility values come from design tokens. No hardcoded colors, sizes, or spacing in utilities:

- Color values → `packages/tokens/dist/json/tokens.json` (Color layer)
- Spacing values → `packages/tokens/dist/json/tokens.json` (Space layer)
- Font sizes → `packages/tokens/dist/json/tokens.json` (Text.Size layer)

When a token value changes, utility classes automatically reflect the new value.

**ds-styles never ships token values, only `var(--ds-*)` references.** `@baloise/ds-tokens` is
a build-time-only (`devDependencies`) input — `packages/styles/src/build.ts` reads its token JSON
to know which var names to reference when generating a utility like `.p-lg { padding:
var(--ds-alias-space-lg) }`, but no ds-styles output (`utilities.css`, `design-system.css`, …) ever
re-declares `--ds-alias-space-lg`'s actual value. A consumer of ds-styles
must separately install `@baloise/ds-tokens` and load one of its theme files (see
[[packages/tokens|packages/tokens/CONTEXT.md]]'s "Theme File vs Override File") for those
references to resolve to anything — see
[ADR-0030](../../docs/adr/0030-full-merge-brand-token-css.md). The one exception is
`foundation.scss`'s `@use '@baloise/ds-tokens/dist/sass/base.tokens.scss'`, a narrow Sass-only import
of just the Breakpoint tokens, needed for `@media` mixins at compile time — that's a Sass
variable, not a shipped CSS custom property, so it isn't "bundling tokens" in the sense this
section means.

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
  --ds-color-primary: #ff6600; /* Override primary color */
  --ds-space-lg: 2rem; /* Override large spacing */
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
- **No token values in shipped output** — ds-styles output references `var(--ds-*)` names only;
  the values themselves come from a separately installed `@baloise/ds-tokens` theme file, never
  from ds-styles itself (see [ADR-0030](../../docs/adr/0030-full-merge-brand-token-css.md))

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/tokens|packages/tokens/CONTEXT.md]] — Token definitions and values
- [[packages/core|packages/core/CONTEXT.md]] — Component styles (not utilities)
- [[root|CONTEXT.md]] — Repository-level concepts
