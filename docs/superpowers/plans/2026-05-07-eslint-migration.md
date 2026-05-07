# ESLint Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the monorepo from ESLint 8 `.eslintrc.json` files to ESLint 10 `eslint.config.ts` flat config, upgrading `@typescript-eslint` from v7 to v8 at the same time.

**Architecture:** One shared root `eslint.config.base.ts` built on `@nx/eslint-plugin`'s `flat/typescript` and `flat/javascript` configs. Each package has its own `eslint.config.ts` that spreads the base and adds package-specific overrides. The custom `@baloise/ds` plugin gets a `meta` field and a flat-config `configs.recommended`. Legacy `.eslintrc.*` files are deleted after all replacements are confirmed working.

**Tech Stack:** ESLint 10, typescript-eslint v8 (`tseslint.config()`), `@nx/eslint-plugin` flat configs, `eslint-plugin-playwright` v2, `jsonc-eslint-parser` v3, `jiti` v2 (TypeScript config loading).

---

## File map

| Action | File |
|---|---|
| modify | `package.json` |
| modify | `libs/eslint-plugin/package.json` |
| modify | `libs/eslint-plugin/src/index.ts` |
| create | `eslint.config.base.ts` |
| create | `eslint.config.ts` |
| create | `libs/output-target-angular/eslint.config.ts` |
| create | `libs/output-target-web/eslint.config.ts` |
| create | `libs/eslint-plugin/eslint.config.ts` |
| create | `libs/nx/eslint.config.ts` |
| create | `packages/playwright/eslint.config.ts` |
| create | `docs/eslint.config.ts` |
| create | `packages/core/eslint.config.ts` |
| delete | `.eslintrc.base.json`, `.eslintrc.json`, and all 7 package `.eslintrc.json` files |

---

## Task 1: Update package dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update versions in `package.json`**

In the `devDependencies` section, apply these changes:

```json
"eslint": "10.3.0",
"@typescript-eslint/eslint-plugin": "8.59.2",
"@typescript-eslint/parser": "8.59.2",
"@typescript-eslint/utils": "8.59.2",
"jsonc-eslint-parser": "3.1.0",
"typescript-eslint": "8.59.2",
"jiti": "2.4.2"
```

- [ ] **Step 2: Run install**

```bash
npm install
```

Expected: installs without errors. The new `typescript-eslint` meta-package and `jiti` appear in `node_modules`.

- [ ] **Step 3: Verify key packages installed**

```bash
node -e "console.log(require('eslint/package.json').version, require('typescript-eslint/package.json').version, require('jiti/package.json').version)"
```

Expected output: `10.3.0 8.59.2 2.4.2`

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(deps): upgrade eslint 10, typescript-eslint v8, add jiti"
```

---

## Task 2: Update custom ESLint plugin

**Files:**
- Modify: `libs/eslint-plugin/src/index.ts`
- Modify: `libs/eslint-plugin/package.json`

The plugin needs: (1) a `meta` field required by ESLint 9+, (2) `configs.recommended` updated to flat-config array format, (3) a source-level `exports` entry in `package.json` so `jiti` can load the TypeScript source without a build step.

- [ ] **Step 1: Update `libs/eslint-plugin/src/index.ts`**

Replace the entire file with:

```ts
import { noRelativeImports } from './rules/no-relative-imports'
import { propReadonly } from './rules/prop-readonly'
import { propTypeAnnotation } from './rules/prop-type-annotation'
import { listenNaming } from './rules/listen-naming'
import { watchNaming } from './rules/watch-naming'
import { handlerNaming } from './rules/handler-naming'
import { eventPrefix } from './rules/event-prefix'
import { methodAsync } from './rules/method-async'
import { methodPrivate } from './rules/method-private'
import { componentTagPrefix } from './rules/component-tag-prefix'

const plugin = {
  meta: { name: '@baloise/ds', version: '0.0.1' },
  rules: {
    'no-relative-imports': noRelativeImports,
    'prop-readonly': propReadonly,
    'prop-type-annotation': propTypeAnnotation,
    'listen-naming': listenNaming,
    'watch-naming': watchNaming,
    'handler-naming': handlerNaming,
    'event-prefix': eventPrefix,
    'method-async': methodAsync,
    'method-private': methodPrivate,
    'component-tag-prefix': componentTagPrefix,
  },
  configs: {} as Record<string, unknown>,
}

plugin.configs['recommended'] = [
  {
    plugins: { '@baloise/ds': plugin },
    rules: {
      '@baloise/ds/no-relative-imports': 'error',
      '@baloise/ds/prop-readonly': 'error',
      '@baloise/ds/prop-type-annotation': 'error',
      '@baloise/ds/listen-naming': 'error',
      '@baloise/ds/watch-naming': 'error',
      '@baloise/ds/handler-naming': 'warn',
      '@baloise/ds/event-prefix': 'error',
      '@baloise/ds/method-async': 'error',
      '@baloise/ds/method-private': 'warn',
      '@baloise/ds/component-tag-prefix': 'error',
    },
  },
]

export = plugin
```

- [ ] **Step 2: Add source export to `libs/eslint-plugin/package.json`**

Add an `exports` field so jiti resolves TypeScript source directly (no build required at lint time):

```json
{
  "name": "@baloise/ds-eslint-plugin",
  "version": "0.0.1",
  "private": true,
  "type": "commonjs",
  "main": "./dist/src/index.js",
  "exports": {
    ".": {
      "require": "./dist/src/index.js",
      "default": "./src/index.ts"
    }
  },
  "typings": "./dist/src/index.d.ts",
  "dependencies": {
    "@typescript-eslint/utils": "8.59.2"
  }
}
```

- [ ] **Step 3: Run existing plugin tests to ensure nothing broke**

```bash
npx nx run ds-eslint-plugin:test --watch=false
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add libs/eslint-plugin/src/index.ts libs/eslint-plugin/package.json
git commit -m "feat(eslint-plugin): update to flat config format with meta field"
```

---

## Task 3: Create root base config

**Files:**
- Create: `eslint.config.base.ts`

This replaces `.eslintrc.base.json`. It is the shared foundation for all packages.

- [ ] **Step 1: Create `eslint.config.base.ts` at repo root**

```ts
import nxPlugin from '@nx/eslint-plugin'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import * as jsoncParser from 'jsonc-eslint-parser'

export default tseslint.config(
  ...nxPlugin.configs['flat/typescript'],
  ...nxPlugin.configs['flat/javascript'],
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [{ sourceTag: '*', onlyDependOnLibsWithTags: ['*'] }],
        },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
    },
  },
  prettier,
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
  },
)
```

- [ ] **Step 2: Commit**

```bash
git add eslint.config.base.ts
git commit -m "feat(eslint): add flat config base (replaces .eslintrc.base.json)"
```

---

## Task 4: Create root config

**Files:**
- Create: `eslint.config.ts`

This replaces the root `.eslintrc.json`.

- [ ] **Step 1: Create `eslint.config.ts` at repo root**

```ts
import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from './eslint.config.base'

export default tseslint.config(
  { ignores: ['**/dist/**', '**/node_modules/**', '**/.nx/**', '**/www/**', '**/.worktrees/**'] },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
  {
    files: ['**/*.json'],
    languageOptions: { parser: jsoncParser },
    rules: {},
  },
  {
    files: ['package.json', 'executors.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: { '@nx/nx-plugin-checks': 'error' },
  },
)
```

- [ ] **Step 2: Verify root config loads without errors**

```bash
npx eslint --no-eslintrc --flag unstable_ts_config package.json 2>&1 | head -5
```

Expected: either no output or lint warnings/errors about the file content (not a config load error).

- [ ] **Step 3: Commit**

```bash
git add eslint.config.ts
git commit -m "feat(eslint): add root flat config (replaces .eslintrc.json)"
```

---

## Task 5: Create simple lib configs

**Files:**
- Create: `libs/output-target-angular/eslint.config.ts`
- Create: `libs/output-target-web/eslint.config.ts`
- Create: `libs/eslint-plugin/eslint.config.ts`

These three packages have minimal rules — just extend the base with ignores and one or two rule overrides.

- [ ] **Step 1: Create `libs/output-target-angular/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  ...baseConfig,
)
```

- [ ] **Step 2: Create `libs/output-target-web/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
```

- [ ] **Step 3: Create `libs/eslint-plugin/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@nx/enforce-module-boundaries': 'off',
    },
  },
)
```

- [ ] **Step 4: Commit**

```bash
git add libs/output-target-angular/eslint.config.ts libs/output-target-web/eslint.config.ts libs/eslint-plugin/eslint.config.ts
git commit -m "feat(eslint): add flat configs for output-target-angular, output-target-web, eslint-plugin"
```

---

## Task 6: Create libs/nx config

**Files:**
- Create: `libs/nx/eslint.config.ts`

This package has `@nx/dependency-checks` and `@nx/nx-plugin-checks` on JSON files.

- [ ] **Step 1: Create `libs/nx/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  ...baseConfig,
  {
    files: ['**/*.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: ['@nx/devkit', '@nx/vite', 'vite', 'util', 'archiver'],
        },
      ],
    },
  },
  {
    files: ['package.json', 'executors.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
)
```

- [ ] **Step 2: Commit**

```bash
git add libs/nx/eslint.config.ts
git commit -m "feat(eslint): add flat config for libs/nx"
```

---

## Task 7: Create packages/playwright config

**Files:**
- Create: `packages/playwright/eslint.config.ts`

- [ ] **Step 1: Create `packages/playwright/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../../eslint.config.base'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': 'off',
    },
  },
)
```

- [ ] **Step 2: Commit**

```bash
git add packages/playwright/eslint.config.ts
git commit -m "feat(eslint): add flat config for packages/playwright"
```

---

## Task 8: Create docs config

**Files:**
- Create: `docs/eslint.config.ts`

- [ ] **Step 1: Create `docs/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import nxPlugin from '@nx/eslint-plugin'
import * as jsoncParser from 'jsonc-eslint-parser'
import baseConfig from '../eslint.config.base'

export default tseslint.config(
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'no-empty-pattern': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: { '@nx': nxPlugin },
    languageOptions: { parser: jsoncParser },
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: [
            '@baloise/ds-assets',
            '@baloise/ds-tokens',
            'react',
            'react-dom',
            'js-beautify',
            'storybook',
            '@storybook/manager-api',
            '@storybook/html-vite',
            '@storybook/addon-essentials',
            '@storybook/addons',
            '@storybook/core-events',
            '@storybook/components',
            '@storybook/theming',
            '@storybook/addon-docs',
            '@storybook/global',
          ],
        },
      ],
    },
  },
)
```

- [ ] **Step 2: Commit**

```bash
git add docs/eslint.config.ts
git commit -m "feat(eslint): add flat config for docs"
```

---

## Task 9: Create packages/core config

**Files:**
- Create: `packages/core/eslint.config.ts`

This is the most complex config: DS plugin rules on `*.tsx`, Playwright rules on `*.play.ts`.

- [ ] **Step 1: Create `packages/core/eslint.config.ts`**

```ts
import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'
import baseConfig from '../../eslint.config.base'
import dsPlugin from '@baloise/ds-eslint-plugin'

export default tseslint.config(
  { ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'] },
  ...baseConfig,
  {
    files: ['**/*.play.ts'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      'playwright/expect-expect': 'off',
      'playwright/valid-title': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@nx/enforce-module-boundaries': 'off',
      'no-extra-boolean-cast': 'off',
      'no-self-assign': 'off',
    },
  },
  {
    files: ['**/*.tsx'],
    plugins: { '@baloise/ds': dsPlugin },
    rules: {
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreProperties: true }],
      '@baloise/ds/no-relative-imports': 'error',
      '@baloise/ds/prop-readonly': 'error',
      '@baloise/ds/prop-type-annotation': 'error',
      '@baloise/ds/listen-naming': 'error',
      '@baloise/ds/watch-naming': 'error',
      '@baloise/ds/handler-naming': 'warn',
      '@baloise/ds/event-prefix': 'error',
      '@baloise/ds/method-async': 'error',
      '@baloise/ds/method-private': 'warn',
      '@baloise/ds/component-tag-prefix': 'error',
    },
  },
)
```

- [ ] **Step 2: Commit**

```bash
git add packages/core/eslint.config.ts
git commit -m "feat(eslint): add flat config for packages/core"
```

---

## Task 10: Delete legacy config files

**Files:**
- Delete: `.eslintrc.base.json`
- Delete: `.eslintrc.json`
- Delete: `docs/.eslintrc.json`
- Delete: `libs/eslint-plugin/.eslintrc.json`
- Delete: `libs/nx/.eslintrc.json`
- Delete: `libs/output-target-angular/.eslintrc.json`
- Delete: `libs/output-target-web/.eslintrc.json`
- Delete: `packages/core/.eslintrc.json`
- Delete: `packages/playwright/.eslintrc.json`

- [ ] **Step 1: Delete all legacy files**

```bash
rm .eslintrc.base.json .eslintrc.json docs/.eslintrc.json libs/eslint-plugin/.eslintrc.json libs/nx/.eslintrc.json libs/output-target-angular/.eslintrc.json libs/output-target-web/.eslintrc.json packages/core/.eslintrc.json packages/playwright/.eslintrc.json
```

- [ ] **Step 2: Confirm no `.eslintrc.*` files remain**

```bash
find . -name ".eslintrc*" -not -path "*/node_modules/*" -not -path "*/.worktrees/*"
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(eslint): remove legacy .eslintrc.json files"
```

---

## Task 11: Verify and fix lint

- [ ] **Step 1: Run lint across all packages**

```bash
npm run lint 2>&1 | tail -30
```

Expected: exits 0 with no errors. If there are errors, they will be rule violations in source files (not config errors) — fix them as described in the next steps.

- [ ] **Step 2: If unknown rule warnings appear for `@typescript-eslint/no-extra-semi`**

This rule was removed in `@typescript-eslint` v8. If it appears in error output, remove it from the config that references it (it was in the original `packages/core/.eslintrc.json`). The base ESLint rule `no-extra-semi` replaces it — no action needed since we don't enable it.

- [ ] **Step 3: If `@nx/dependency-checks` flags a false positive**

Add the flagged package name to the `ignoredDependencies` list in the relevant package's `eslint.config.ts`.

- [ ] **Step 4: Run lint again to confirm clean**

```bash
npm run lint
```

Expected: exits 0.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(eslint): resolve lint errors after flat config migration"
```
