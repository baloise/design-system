# ESLint Migration Design — v8 → v10 + Flat Config

## Overview

Migrate the Nx monorepo from ESLint 8 with `.eslintrc.json` files to ESLint 10 with TypeScript flat config (`eslint.config.ts`). Upgrade `@typescript-eslint` from v7 to v8 at the same time. All 9 legacy config files are replaced.

---

## Package changes

| Action | Package | From → To |
|---|---|---|
| update | `eslint` | `8.57.1` → `10.3.0` |
| update | `@typescript-eslint/eslint-plugin` | `7.16.0` → `8.59.2` |
| update | `@typescript-eslint/parser` | `7.16.0` → `8.59.2` |
| update | `@typescript-eslint/utils` | `7.16.0` → `8.59.2` |
| update | `jsonc-eslint-parser` | `2.1.0` → `3.1.0` |
| add | `typescript-eslint` | — → `8.59.2` |
| add | `jiti` | — → `2.4.2` |

`eslint-config-prettier@10.1.8` already supports flat config — no change needed.

---

## Config structure

One `eslint.config.ts` per package, all extending a shared root base. Legacy files are deleted once replacements are in place.

```
eslint.config.base.ts                        ← replaces .eslintrc.base.json
eslint.config.ts                             ← replaces .eslintrc.json (root)
docs/eslint.config.ts
libs/eslint-plugin/eslint.config.ts
libs/nx/eslint.config.ts
libs/output-target-angular/eslint.config.ts
libs/output-target-web/eslint.config.ts
packages/core/eslint.config.ts
packages/playwright/eslint.config.ts
```

### Root base (`eslint.config.base.ts`)

Exports a `tseslint.config()` array containing:
- `@nx/eslint-plugin` with `enforce-module-boundaries` rule
- TypeScript configs via `tseslint.configs.recommended`
- `eslint-config-prettier` to disable formatting rules
- JSONC parsing via `jsonc-eslint-parser` for `*.json` files

### Root config (`eslint.config.ts`)

Extends base and adds:
- `@nx/nx-plugin-checks` for `package.json` / `executors.json`
- `@nx/dependency-checks` disabled at root level (enabled per package)
- Global `ignores` for generated files and dist

### Per-package configs

Each package imports the base, spreads it, and adds file-scoped overrides. Packages with no additional rules (`output-target-angular`, `output-target-web`, `eslint-plugin`) get a minimal two-liner.

Notable per-package additions:
- **`packages/core`** — `@baloise/ds` plugin rules on `*.tsx` files; `playwright/recommended` on `*.play.ts` files
- **`libs/nx`** — `@nx/dependency-checks` on `*.json` files with `ignoredDependencies` list
- **`docs`** — `@nx/dependency-checks` on `*.json` with Storybook/DS package ignores
- **`packages/playwright`** — permissive TypeScript rules, `@nx/dependency-checks` off

---

## Custom plugin update (`libs/eslint-plugin`)

Two changes to `src/index.ts`, rule implementations unchanged:

1. Add `meta` field:
```ts
const plugin = {
  meta: { name: '@baloise/ds', version: '0.0.1' },
  rules: { ... },
  configs: {},
}
```

2. Update `configs.recommended` to flat-config format:
```ts
plugin.configs['recommended'] = tseslint.config({
  plugins: { '@baloise/ds': plugin },
  files: ['**/*.tsx'],
  rules: {
    '@baloise/ds/no-relative-imports': 'error',
    // ... rest of rules unchanged
  },
})
```

---

## File cleanup

Delete after all replacements are verified working:
- `.eslintrc.base.json`
- `.eslintrc.json`
- `docs/.eslintrc.json`
- `libs/eslint-plugin/.eslintrc.json`
- `libs/nx/.eslintrc.json`
- `libs/output-target-angular/.eslintrc.json`
- `libs/output-target-web/.eslintrc.json`
- `packages/core/.eslintrc.json`
- `packages/playwright/.eslintrc.json`

---

## Composition pattern

All configs use `tseslint.config()` as the primary composer:

```ts
// packages/core/eslint.config.ts
import baseConfig from '../../eslint.config.base'
import tseslint from 'typescript-eslint'
import dsPlugin from '@baloise/ds-eslint-plugin'
import playwright from 'eslint-plugin-playwright'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.tsx'],
    plugins: { '@baloise/ds': dsPlugin },
    rules: { /* component rules */ },
  },
  {
    files: ['**/*.play.ts'],
    ...playwright.configs['flat/recommended'],
    rules: { 'playwright/expect-expect': 'off', 'playwright/valid-title': 'off' },
  },
)
```

---

## Success criteria

- `npm run lint` passes with zero errors
- All `@baloise/ds/*` component rules still enforced on `*.tsx` files
- Playwright rules apply only to `*.play.ts` files
- JSONC / `@nx/dependency-checks` rules apply to `*.json` files per package
- No `.eslintrc.*` files remain in the repo
