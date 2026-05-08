# Plan: `@baloise/ds-css` — UnoCSS utility package

**Date:** 2026-05-08  
**Status:** Draft

---

## Goal

Replace (or complement) the hand-maintained SCSS utility classes in `packages/styles/src/generated/` with a new package `packages/css` that uses **UnoCSS** to generate identical classes from design tokens.

Outputs:
1. A **pre-built CSS bundle** (`dist/css/design-system.css`) — drop-in replacement for consumers who link a stylesheet.
2. A **UnoCSS preset** (`dist/preset/index.js`) — for consumers using Vite/webpack who want **tree-shaking** (only pay for the classes they actually use).

---

## Why UnoCSS

| Concern | UnoCSS answer |
|---|---|
| Token-driven values | Rules reference `var(--ds-…)` directly — tokens stay the single source of truth |
| Responsive variants | Custom variant `mobile:`, `tablet:`, etc. via the `variants` API |
| Class aliases | `shortcuts` map `m-xx-small` → same rule as `m-2xs` |
| Tree-shaking for apps | Preset mode — UnoCSS scans source files and emits only used classes |
| Pre-built bundle | CLI `--safelist` / `generate()` API with full class list |
| No framework lock-in | Pure CSS output, no runtime JS |

---

## Package layout

```
packages/css/
  src/
    preset/
      index.ts              # main preset export — rules + shortcuts + variants
      rules/
        spacing.ts          # m-*, p-*, gap-*, …
        typography.ts       # text-*, font-*, leading-*, …
        background.ts       # bg-*
        border.ts           # radius-*, border-*
        elevation.ts        # z-index-*, shadow-*
        flex.ts             # flex, align-*, justify-*, …
        interaction.ts      # cursor-*, select-*, pointer-events-*
        layout.ts           # hidden, block, inline, overflow-*, …
        sizing.ts           # h-*, w-*, min-*, max-*
      variants/
        responsive.ts       # mobile:, tablet:, desktop:, … prefixes
      theme.ts              # UnoCSS theme map (token CSS-var references)
    build.ts                # Node build script — generates full CSS bundle
  dist/
    css/
      design-system.css     # pre-built output (all classes)
    preset/
      index.cjs
      index.js              # UnoCSS preset for consumers
  package.json
  project.json
  tsconfig.json
  uno.config.ts             # used for local dev / testing
```

---

## Step-by-step implementation

### Step 1 — Scaffold the package

1. Create `packages/css/` directory.
2. `package.json`:
   ```json
   {
     "name": "@baloise/ds-css",
     "version": "20.0.0-next.1",
     "type": "module",
     "main": "dist/preset/index.cjs",
     "module": "dist/preset/index.js",
     "exports": {
       ".": {
         "import": "./dist/preset/index.js",
         "require": "./dist/preset/index.cjs"
       },
       "./css": "./dist/css/design-system.css"
     },
     "files": ["dist/"],
     "dependencies": {
       "@baloise/ds-tokens": "workspace:*",
       "unocss": "^66.x"
     },
     "devDependencies": {
       "@unocss/preset-mini": "^66.x"
     }
   }
   ```
3. `project.json` with two Nx targets:
   - `build-preset` — `tsc` to compile `src/preset/index.ts` to `dist/preset/`
   - `build-css` — run `src/build.ts` to emit `dist/css/design-system.css`
   - `build` — depends on `tokens:build` (to ensure token CSS exists), then runs both sub-targets

---

### Step 2 — Define the UnoCSS theme

`src/preset/theme.ts` maps UnoCSS theme keys to CSS variable references. UnoCSS rules can then reference `theme.spacing['2xs']` and emit `var(--ds-alias-space-2xs-device)`.

```ts
// src/preset/theme.ts
export const theme = {
  spacing: {
    none:   'var(--ds-alias-space-none-device)',
    auto:   'var(--ds-alias-space-auto-device)',
    '2xs':  'var(--ds-alias-space-2xs-device)',
    xs:     'var(--ds-alias-space-xs-device)',
    sm:     'var(--ds-alias-space-sm-device)',
    base:   'var(--ds-alias-space-base-device)',
    md:     'var(--ds-alias-space-md-device)',
    lg:     'var(--ds-alias-space-lg-device)',
    xl:     'var(--ds-alias-space-xl-device)',
    '2xl':  'var(--ds-alias-space-2xl-device)',
    '3xl':  'var(--ds-alias-space-3xl-device)',
    '4xl':  'var(--ds-alias-space-4xl-device)',
  },
  colors: {
    text: {
      primary:         'var(--ds-alias-text-color-primary)',
      'primary-hover': 'var(--ds-alias-text-color-primary-hover)',
      white:           'var(--ds-alias-text-color-white)',
      // … all text-color tokens
    },
    background: {
      white:       'var(--ds-alias-background-color-white)',
      'sky-light': 'var(--ds-alias-background-color-sky-light)',
      // … all background-color tokens
    },
  },
  borderRadius: {
    none:    'var(--ds-alias-radius-none)',
    base:    'var(--ds-alias-radius-base)',
    lg:      'var(--ds-alias-radius-lg)',
    rounded: 'var(--ds-alias-radius-rounded)',
  },
  zIndex: {
    deep:       'var(--ds-alias-z-index-deep)',
    masked:     'var(--ds-alias-z-index-masked)',
    // … all z-index tokens
  },
}
```

> **Why CSS variables and not raw values?**  
> The `-device` tokens change responsively via `@media` blocks inside `base.tokens.css`. Pointing to `var()` references means the generated classes are automatically responsive without any additional media-query logic in the rules themselves. Brand themes (`[data-theme="tcs"]`) also work for free because they only override the token values.

---

### Step 3 — Define responsive variants

`src/preset/variants/responsive.ts` mirrors the SCSS breakpoint mixins:

```ts
// src/preset/variants/responsive.ts
import type { VariantObject } from 'unocss'

const breakpoints = {
  mobile:       { max: '768px' },      // screen and (max-width: 768px)
  tablet:       { min: '769px' },      // screen and (min-width: 769px)
  'tablet-only':{ min: '769px', max: '1023px' },
  touch:        { max: '1023px' },
  desktop:      { min: '1024px' },
  'desktop-lg': { min: '1280px' },
  'desktop-xl': { min: '1440px' },
  'desktop-2xl':{ min: '1920px' },
}

export const responsiveVariants: VariantObject[] = Object.entries(breakpoints).map(
  ([name, { min, max }]) => ({
    match(matcher) {
      if (!matcher.startsWith(`${name}:`)) return
      return {
        matcher: matcher.slice(name.length + 1),
        selector: s => `${s}`,   // class stays the same, just wrapped in @media
        body: (body) => `@media screen and (${
          min && max ? `min-width: ${min}) and (max-width: ${max}` :
          min ? `min-width: ${min}` :
          `max-width: ${max}`
        }) { ${body} }`,
      }
    },
  })
)
```

This produces classes exactly as `mobile\:hidden`, `tablet\:flex`, etc. — matching the SCSS output character-for-character.

---

### Step 4 — Define rules per category

Each file in `src/preset/rules/` returns a `Rule[]`. Rules reference the theme or emit literal CSS variable strings.

#### spacing.ts (excerpt)

```ts
import type { Rule } from 'unocss'

const sizes = ['none','auto','2xs','xs','sm','base','md','lg','xl','2xl','3xl','4xl'] as const
const aliases: Record<string, string> = { 'xx-small':'2xs', 'x-small':'xs', small:'sm', normal:'base', medium:'md', large:'lg', 'x-large':'xl', 'xx-large':'2xl', 'xxx-large':'3xl', 'xxxx-large':'4xl' }

function spaceVar(size: string) {
  return `var(--ds-alias-space-${size}-device)`
}

export const spacingRules: Rule[] = [
  // margin shorthands: m-*, mx-*, my-*, mt-*, mr-*, mb-*, ml-*
  ...sizes.flatMap(s => [
    [`m-${s}`,  { margin: `${spaceVar(s)} !important` }],
    [`mx-${s}`, { 'margin-left': `${spaceVar(s)} !important`, 'margin-right': `${spaceVar(s)} !important` }],
    [`my-${s}`, { 'margin-top':  `${spaceVar(s)} !important`, 'margin-bottom': `${spaceVar(s)} !important` }],
    [`mt-${s}`, { 'margin-top':    `${spaceVar(s)} !important` }],
    [`mr-${s}`, { 'margin-right':  `${spaceVar(s)} !important` }],
    [`mb-${s}`, { 'margin-bottom': `${spaceVar(s)} !important` }],
    [`ml-${s}`, { 'margin-left':   `${spaceVar(s)} !important` }],
    // padding equivalents
    [`p-${s}`,  { padding: `${spaceVar(s)} !important` }],
    // … px, py, pt, pr, pb, pl
  ] as Rule[]),
  // gap-*
  ...sizes.map(s => [`gap-${s}`, { gap: `${spaceVar(s)} !important` }] as Rule),
]
```

#### Alias shortcuts

In `src/preset/index.ts` combine rules with shortcuts:

```ts
const spacingShortcuts: [string, string][] = []
for (const [alias, canonical] of Object.entries(aliases)) {
  for (const prefix of ['m','mx','my','mt','mr','mb','ml','p','px','py','pt','pr','pb','pl','gap']) {
    spacingShortcuts.push([`${prefix}-${alias}`, `${prefix}-${canonical}`])
  }
}
```

#### flex.ts (excerpt)

```ts
export const flexRules: Rule[] = [
  ['flex',        { display: 'flex !important' }],
  ['inline-flex', { display: 'inline-flex !important' }],
  ['flex-row',    { 'flex-direction': 'row !important' }],
  ['flex-col',    { 'flex-direction': 'column !important' }],
  ['flex-wrap',   { 'flex-wrap': 'wrap !important' }],
  ['flex-nowrap', { 'flex-wrap': 'nowrap !important' }],
  ['flex-1',      { flex: '1 1 0% !important' }],
  ['flex-auto',   { flex: '1 1 auto !important' }],
  ['flex-none',   { flex: 'none !important' }],
  // align-content-*
  ...['start','end','center','baseline','space-between','space-around','space-evenly'].map(v =>
    [`align-content-${v}`, { 'align-content': `${v} !important` }] as Rule
  ),
  // justify-content-*, align-items-*, …
]
```

#### background.ts / border.ts / elevation.ts / interaction.ts / layout.ts / sizing.ts / typography.ts

Same pattern — thin wrappers around CSS variable references. Full lists are enumerated from the existing `packages/styles/src/generated/*.scss` files so class names are byte-for-byte identical.

---

### Step 5 — Assemble the preset

`src/preset/index.ts`:

```ts
import type { Preset } from 'unocss'
import { theme } from './theme'
import { spacingRules, spacingShortcuts } from './rules/spacing'
import { typographyRules } from './rules/typography'
import { backgroundRules } from './rules/background'
import { borderRules } from './rules/border'
import { elevationRules } from './rules/elevation'
import { flexRules } from './rules/flex'
import { interactionRules } from './rules/interaction'
import { layoutRules } from './rules/layout'
import { sizingRules } from './rules/sizing'
import { responsiveVariants } from './variants/responsive'

export function presetDsUtilities(): Preset {
  return {
    name: '@baloise/ds-css',
    theme,
    rules: [
      ...spacingRules,
      ...typographyRules,
      ...backgroundRules,
      ...borderRules,
      ...elevationRules,
      ...flexRules,
      ...interactionRules,
      ...layoutRules,
      ...sizingRules,
    ],
    shortcuts: [
      ...spacingShortcuts,
      // … alias shortcuts for other categories
    ],
    variants: responsiveVariants,
  }
}
```

---

### Step 6 — Build the pre-built CSS bundle

`src/build.ts` uses the UnoCSS programmatic API to generate all classes at once:

```ts
import { createGenerator } from 'unocss'
import { presetDsUtilities } from './preset/index'
import { allClasses } from './safelist'   // complete list of every class name
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

const uno = createGenerator({ presets: [presetDsUtilities()] })

const { css } = await uno.generate(new Set(allClasses), { preflights: false })

// Prepend the token CSS so variables are defined
const tokensCss = readFileSync(resolve('../tokens/dist/css/base.tokens.css'), 'utf8')
const output = `${tokensCss}\n${css}`

mkdirSync('dist/css', { recursive: true })
writeFileSync('dist/css/design-system.css', output)
```

`src/safelist.ts` exports the flat array of every class name. It is mechanically derived from the same source data as the rules (the size/color/variant arrays) so it stays in sync automatically.

---

### Step 7 — Add Nx target

`project.json`:

```json
{
  "name": "css",
  "projectType": "library",
  "sourceRoot": "packages/css/src",
  "targets": {
    "build": {
      "executor": "nx:run-commands",
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/dist"],
      "options": {
        "commands": [
          "tsc --project tsconfig.lib.json",
          "node -r tsx/esm src/build.ts"
        ],
        "cwd": "{projectRoot}",
        "parallel": false
      }
    }
  },
  "tags": ["scope:release", "type:package"]
}
```

---

### Step 8 — Consumer integration

**Drop-in CSS** (same as `@baloise/ds-styles`):
```html
<link rel="stylesheet" href="node_modules/@baloise/ds-css/css" />
```

**UnoCSS preset** (tree-shaken, Vite project):
```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetDsUtilities } from '@baloise/ds-css'

export default defineConfig({
  presets: [presetDsUtilities()],
})
```

---

## Scope: utilities first, full replacement later

Phase 1 (this plan) covers **utility classes only**. The following areas of `@baloise/ds-styles` are out of scope now but are planned to move into `@baloise/ds-css` in a later phase:

| Area | `@baloise/ds-styles` file(s) | Notes for future migration |
|---|---|---|
| Component CSS | `generated/components.scss` + `*.style.scss` per component | Will become additional UnoCSS rules or a separate `components` layer in the preset |
| Normalize / reset | `normalize.scss`, `structure.scss` | UnoCSS has a `preflights` API — add as a preflight entry |
| Font loading | `font.scss` | Simple static CSS block — add as a preflight or separate export |
| Grid / container | `src/core/grid.scss`, `src/core/container.scss` | Needs `calc()` and column-count logic; may require dynamic UnoCSS rules |

**Design constraint for phase 1:** Structure `packages/css/` so these additions do not require architectural changes later:
- `src/preset/index.ts` already accepts `preflights` — reserve the slot now.
- Keep `src/preset/rules/` as a flat directory so `component.ts`, `grid.ts`, etc. can be added without restructuring.
- The `build.ts` safelist approach generalises to any rule category — no special-casing needed.

During phase 1, a consumer still needs both packages:
```html
<!-- phase 1 -->
<link rel="stylesheet" href="@baloise/ds-styles/css/design-system.css" />  <!-- components, reset, fonts -->
<link rel="stylesheet" href="@baloise/ds-css/css" />                        <!-- utilities (or use the preset) -->
```

After the full merge, `@baloise/ds-styles` is deprecated in favour of `@baloise/ds-css` as the single stylesheet entry point.

---

## Class parity checklist

| Category | SCSS file | UnoCSS rules file |
|---|---|---|
| Spacing | `generated/spacing.scss` | `rules/spacing.ts` |
| Typography | `generated/typography.scss` | `rules/typography.ts` |
| Background | `generated/background.scss` | `rules/background.ts` |
| Border / Radius | `generated/border.scss` | `rules/border.ts` |
| Elevation / Z-index | `generated/elevation.scss` | `rules/elevation.ts` |
| Flex | `generated/flex.scss` | `rules/flex.ts` |
| Interaction | `generated/interaction.scss` | `rules/interaction.ts` |
| Layout / Display | `generated/layout.scss` | `rules/layout.ts` |
| Sizing | `generated/sizing.scss` | `rules/sizing.ts` |

Each rule file should have a snapshot test comparing its output against the compiled CSS from the existing SCSS file to guarantee parity.

---

## Responsive strategy

Two independent mechanisms — both must be preserved:

| Mechanism | How it works | Classes affected |
|---|---|---|
| `-device` token | `var(--ds-alias-space-*-device)` is redefined at each `@media` breakpoint inside `base.tokens.css`. Classes that reference `-device` tokens respond automatically. | spacing, some typography |
| Responsive prefix | `mobile:hidden`, `tablet:flex`, etc. — a media-query wrapper added by the UnoCSS variant. | flex, layout, elevation, flex |

---

## Open questions

1. **Versioning** — should `@baloise/ds-css` ship in the same changeset as `@baloise/ds-styles`?  
2. **Migration path** — do we keep both packages forever (additive) or eventually deprecate the SCSS-generated utilities?  
3. **Grid utilities** — the grid/container helpers in `styles` are not purely token-driven (they use calc and fixed column counts). Decide whether they belong in this package.  
4. **Typography extra rules** — `typography.scss` adds `margin-bottom` on `:not(:last-child)` selectors. UnoCSS rules only emit single selectors cleanly; this would need a custom rule with a raw CSS string.

---

## Milestones

| # | Milestone | Deliverable |
|---|---|---|
| 1 | Scaffold + spacing | Package skeleton + working spacing rules + Nx build target |
| 2 | All rule categories | Full rule set with parity tests against existing SCSS output |
| 3 | Responsive variants | `mobile:`, `tablet:`, `desktop:`, etc. verified |
| 4 | Pre-built bundle | `dist/css/design-system.css` generated and served by Storybook |
| 5 | Preset export | `@baloise/ds-css` importable as UnoCSS preset in a test app |
| 6 | Parity sign-off | Automated CSS diff against `@baloise/ds-styles` generated utilities passes |
