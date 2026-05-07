# Task: Design Token & CSS Variable Linting

## Goal

Validate that design tokens (JSON) and CSS variables (SCSS) follow the naming and structural rules defined in our docs.
Two complementary linters — one for the token JSON files, one for SCSS — integrated into the existing `npm run lint` pipeline and runnable in-editor.

---

## Rules to enforce

### A — Token JSON files (`*.tokens.json`)

| #   | Rule                                                                               | Example violation                          |
| --- | ---------------------------------------------------------------------------------- | ------------------------------------------ |
| A1  | Final CSS name must be all lowercase kebab-case                                    | `--ds-Button-Color`                        |
| A2  | Global tokens: `--ds-global-{category}-{name}-{scale?}`                            | `--ds-global-primary-5` (missing category) |
| A3  | Alias tokens: `--ds-alias-{category}-{property}`                                   | `--ds-alias-primaryColor`                  |
| A4  | Component tokens: `--ds-{component}-{variant}-{category}-{property}-{state}`       | `--ds-button-bg` (too few segments)        |
| A5  | No double dashes after `--ds-` prefix                                              | `--ds-button--color-bg`                    |
| A6  | `$type` must be one of the allowed W3C DTCG types                                  | `"$type": "colour"`                        |
| A7  | References `{Group.Sub.Token}` must resolve within the same file or included files | `{Global.Color.Foo}` (Foo doesn't exist)   |

### B — SCSS files (`*.style.scss`, `*.host.scss`)

| #   | Rule                                                                                                                              | Example violation                                                        |
| --- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| B1  | `vars.local($key, ...)` key must match a CSS property name or approved shorthand (`px`, `py`, `mx`, `my`, `mt`, `mb`, `mr`, `ml`) | `vars.local(button-colour-text, ...)` (`colour` not a property)          |
| B2  | `--ds-*` values inside `vars.local()` must exist in `dist/docs/base.tokens.json`                                                  | `vars.local(x, var(--ds-button-typo))` (token doesn't exist)             |
| B3  | `--mod-*` variables must only be **set** inside a variant class selector (`.is-*`, `.has-*`, `.bal-is-*`)                         | `--mod-button-color-text: red` inside `:host {}` root                    |
| B4  | `--_*` private variables must never appear outside the component's own SCSS                                                       | Detected if a `--_*` var is referenced in a _different_ component's file |
| B5  | No attribute selectors in SCSS (`:host([disabled])`, `[color="primary"]`)                                                         | `:host([loading])`                                                       |
| B6  | `--ds-*` must never be set directly in component SCSS (only read via `vars.local`)                                                | `--ds-button-color-bg-base: red`                                         |

---

## Architecture

Two separate linters, both wired into `npm run lint`:

```
libs/
  eslint-plugin/
    src/
      rules/
        token-name-global.ts       ← A2: validates --ds-global-* names
        token-name-alias.ts        ← A3: validates --ds-alias-* names
        token-name-component.ts    ← A4: validates --ds-{component}-* names
        token-type-valid.ts        ← A6: validates $type values
      index.ts                     ← register new rules

libs/
  stylelint-plugin/                ← NEW package
    src/
      rules/
        vars-local-key.ts          ← B1: vars.local() key naming
        vars-local-token-exists.ts ← B2: --ds-* ref exists in tokens
        mod-only-in-variant.ts     ← B3: --mod-* set only in variant selectors
        no-attribute-selectors.ts  ← B5: forbid [attr] selectors
        no-set-ds-vars.ts          ← B6: no --ds-* assignment in component SCSS
    index.ts
    package.json
    project.json
```

The JSON rules use **`jsonc-eslint-parser`** (already installed). The SCSS rules use **`stylelint`** with a custom plugin (same approach as existing stylelint setup).

---

## Step 1 — ESLint rules for token JSON

`jsonc-eslint-parser` exposes the JSON AST to ESLint. The token rules inspect the resolved CSS name (computed from the JSON path) against the naming convention.

### Helper: compute CSS name from token path

Each rule needs to flatten the JSON path into the final CSS variable name (mirroring what `ds/css/name` transformer does):

```ts
// libs/eslint-plugin/src/utils-tokens.ts
export function pathToCssName(path: string[]): string {
  return path
    .join('-')
    .replace(/[^a-z0-9-]/gi, match => (match === ' ' ? '-' : '')) // emoji/unicode → ''
    .toLowerCase()
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
}
```

### Rule A2 — `token-name-global`

Fires on any JSON property whose path starts with `🌐 Global`. Validates the derived CSS name matches:

```
ds-global-{category}-{name}(-{scale})?
```

Allowed categories (from existing tokens): `color`, `font`, `size`, `elevation`.

```ts
// Pattern: --ds-global-{1+ segment}
const GLOBAL_PATTERN = /^global-[a-z][a-z0-9-]+$/
```

### Rule A3 — `token-name-alias`

Path starts with `🔗 Alias`. Derived name must match:

```
ds-alias-{category}-{property}(-{modifier})?
```

```ts
const ALIAS_PATTERN = /^alias-[a-z][a-z0-9-]+$/
```

### Rule A4 — `token-name-component`

Path starts with `🧩 Component`. After stripping the `-component` segment (transformer removes it), name must have **at least 4 segments** after `ds-`:

```
ds-{component}-{variant}-{category}-{property}(-{state})?
// minimum: 4 segments after ds
```

```ts
const COMPONENT_PATTERN = /^[a-z][a-z0-9]+-[a-z][a-z0-9-]+-[a-z]+-[a-z][a-z0-9-]+/
```

### Rule A6 — `token-type-valid`

Any leaf node with a `$type` field. Allowed values (W3C DTCG):

```ts
const ALLOWED_TYPES = new Set([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'string',
  'boolean',
  'shadow',
])
```

### Register in ESLint plugin

```ts
// libs/eslint-plugin/src/index.ts  (additions)
import { tokenNameGlobal } from './rules/token-name-global'
import { tokenNameAlias } from './rules/token-name-alias'
import { tokenNameComponent } from './rules/token-name-component'
import { tokenTypeValid } from './rules/token-type-valid'

// add to plugin.rules:
'token-name-global': tokenNameGlobal,
'token-name-alias': tokenNameAlias,
'token-name-component': tokenNameComponent,
'token-type-valid': tokenTypeValid,

// add to recommended config:
'@baloise/ds/token-name-global': 'error',
'@baloise/ds/token-name-alias': 'error',
'@baloise/ds/token-name-component': 'error',
'@baloise/ds/token-type-valid': 'error',
```

### ESLint config — scope to token files

In the root eslint config, add an override for `*.tokens.json`:

```js
{
  files: ['packages/tokens/tokens/**/*.tokens.json'],
  parser: 'jsonc-eslint-parser',
  plugins: ['@baloise/ds'],
  rules: {
    '@baloise/ds/token-name-global': 'error',
    '@baloise/ds/token-name-alias': 'error',
    '@baloise/ds/token-name-component': 'error',
    '@baloise/ds/token-type-valid': 'error',
  },
}
```

---

## Step 2 — Style Dictionary validator (build-time gate)

Register a custom validator inside `packages/tokens/src/transformers.ts` (alongside the transforms). This runs during `npm run tokens` and fails the build on violations, catching problems before the CSS is emitted.

```ts
sd.registerValidator({
  name: 'ds/token-name-kebab',
  validate: token => {
    const name = token.name
    if (/[A-Z]/.test(name)) {
      return [
        {
          type: 'error',
          message: `Token name "${name}" must be all lowercase. Found uppercase characters.`,
        },
      ]
    }
    if (/--/.test(name)) {
      return [
        {
          type: 'error',
          message: `Token name "${name}" contains double dashes.`,
        },
      ]
    }
    return []
  },
})
```

Add to each platform config:

```ts
// in config.base.ts platforms.css:
validators: ['ds/token-name-kebab'],
```

---

## Step 3 — Stylelint plugin for SCSS

Create `libs/stylelint-plugin/` as a new Nx library. Pattern follows the existing `libs/eslint-plugin/`.

### Package structure

```
libs/stylelint-plugin/
  src/
    index.ts             ← registers all rules as a stylelint plugin
    rules/
      vars-local-key.ts
      no-attribute-selectors.ts
      mod-only-in-variant.ts
      no-set-ds-vars.ts
  package.json
  project.json
  tsconfig.json
```

### `package.json`

```json
{
  "name": "@baloise/ds-stylelint-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "peerDependencies": {
    "stylelint": ">=16"
  }
}
```

### Rule B1 — `vars-local-key`

Parse `@include vars.local(key, ...)` calls. The `key` must follow `{component}-{css-property}` where the trailing segment is a known CSS property or approved spacing shorthand.

Approved CSS properties (subset, extendable):

- color-related: `color-text`, `color-bg`, `color-border`, `color-background`
- spacing: `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my`, `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py`
- layout: `width`, `height`, `min-width`, `max-width`, `gap`, `radius`, `border`, `shadow`
- typography: `font-size`, `font-weight`, `font-family`, `line-height`

Implementation: use stylelint's `Declaration` walker, check `prop === '--_*'` is never set directly (private vars come from mixin only), and check `AtRule` walker for `@include vars.local`.

### Rule B5 — `no-attribute-selectors`

Walk every `Rule` node. If the selector contains `[attr]` or `:host([attr])`, report an error.

```ts
// Fires on rules like: :host([disabled]), [loading], ds-button[color="primary"]
if (/\[.+\]/.test(rule.selector)) {
  report({ message: 'Attribute selectors are forbidden. Use CSS classes instead.' })
}
```

### Rule B6 — `no-set-ds-vars`

Walk every `Declaration` node. If `decl.prop` starts with `--ds-`, report an error. `--ds-*` tokens are read-only in component files; they are only **read** as fallback values inside `vars.local()`.

```ts
if (decl.prop.startsWith('--ds-')) {
  report({ message: `Do not set "--ds-*" variables in component SCSS. They are read-only design tokens.` })
}
```

### Register in stylelint config

```js
// .stylelintrc.js (or stylelint.config.js)
{
  plugins: ['@baloise/ds-stylelint-plugin'],
  rules: {
    '@baloise/ds/vars-local-key': true,
    '@baloise/ds/no-attribute-selectors': true,
    '@baloise/ds/mod-only-in-variant': [true, { severity: 'warning' }],
    '@baloise/ds/no-set-ds-vars': true,
  },
}
```

---

## Step 4 — Wire into `npm run lint`

The `lint` script in `package.json` already runs `npx nx run-many -t lint`. Each package has its own `lint` target. Add a `lint` target to:

- `packages/tokens/project.json` — runs `eslint packages/tokens/tokens/**/*.json`
- `packages/core/project.json` — add `--ext .scss` with stylelint (or extend existing lint target)

Or simpler: add a root-level `lint:tokens` and `lint:scss` script and have them called from `lint`.

---

## Step 5 — Vitest snapshot test as safety net

A simple test in `packages/tokens/` that imports the built `dist/docs/base.tokens.json`, iterates every token, and asserts all names pass the same regex patterns. This catches cases where the ESLint rules aren't yet covering a new token type.

```ts
// packages/tokens/src/tokens.spec.ts
import tokens from '../dist/docs/base.tokens.json'
import { describe, it, expect } from 'vitest'

function walk(obj: Record<string, any>, path: string[] = []): Array<{ path: string[]; name: string }> { ... }

describe('token naming conventions', () => {
  it('all global tokens match --ds-global-*', () => { ... })
  it('all alias tokens match --ds-alias-*', () => { ... })
  it('all component tokens have 4+ segments after ds', () => { ... })
  it('no token name has uppercase letters', () => { ... })
  it('no token name has double dashes', () => { ... })
})
```

Run with: `npx nx run tokens:test`

---

## Files to create / modify

| File                                                        | Action                              |
| ----------------------------------------------------------- | ----------------------------------- |
| `libs/eslint-plugin/src/rules/token-name-global.ts`         | Create                              |
| `libs/eslint-plugin/src/rules/token-name-alias.ts`          | Create                              |
| `libs/eslint-plugin/src/rules/token-name-component.ts`      | Create                              |
| `libs/eslint-plugin/src/rules/token-type-valid.ts`          | Create                              |
| `libs/eslint-plugin/src/utils-tokens.ts`                    | Create                              |
| `libs/eslint-plugin/src/index.ts`                           | Update — register 4 new rules       |
| `packages/tokens/src/transformers.ts`                       | Add `ds/token-name-kebab` validator |
| `packages/tokens/src/config.base.ts`                        | Add `validators` to css platform    |
| `libs/stylelint-plugin/`                                    | Create new Nx library               |
| `libs/stylelint-plugin/src/rules/vars-local-key.ts`         | Create                              |
| `libs/stylelint-plugin/src/rules/no-attribute-selectors.ts` | Create                              |
| `libs/stylelint-plugin/src/rules/mod-only-in-variant.ts`    | Create                              |
| `libs/stylelint-plugin/src/rules/no-set-ds-vars.ts`         | Create                              |
| `libs/stylelint-plugin/src/index.ts`                        | Create                              |
| `.stylelintrc.js`                                           | Update — add plugin + rules         |
| `packages/tokens/src/tokens.spec.ts`                        | Create — Vitest safety net          |

---

## Execution order

1. `utils-tokens.ts` helper
2. ESLint token JSON rules (A2–A6) + register in index
3. Style Dictionary build validator
4. Vitest snapshot test
5. `libs/stylelint-plugin/` package scaffolding
6. Stylelint rules (B1, B5, B6 first; B3 after)
7. Wire `lint` targets
