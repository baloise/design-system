# ESLint Plugin — Component Style Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a local ESLint plugin (`@baloise/ds-eslint-plugin`) with 10 rules that enforce the component style guide, wired exclusively into `packages/core`.

**Architecture:** A new npm-workspace package at `libs/eslint-plugin/` exports an ESLint plugin (CommonJS, ESLint 8 compatible) named `@baloise/ds-eslint-plugin`. Because the monorepo uses npm workspaces (`libs/*`), `npm install` symlinks it to `node_modules/@baloise/ds-eslint-plugin`, making it available in `.eslintrc.json` as `@baloise/ds`. Only `packages/core/.eslintrc.json` is updated to activate the rules — all other packages remain unaffected.

**Tech Stack:** ESLint 8, `@typescript-eslint/parser` (for decorator AST), `@typescript-eslint/utils` (RuleCreator), ESLint `RuleTester`, Vitest, `@nx/js:tsc` (CommonJS build), npm workspaces.

---

## File Map

### New files (plugin package)

| File | Purpose |
|---|---|
| `libs/eslint-plugin/package.json` | Package metadata — name `@baloise/ds-eslint-plugin`, type `commonjs` |
| `libs/eslint-plugin/tsconfig.json` | TS project references base |
| `libs/eslint-plugin/tsconfig.lib.json` | Compiler config for build output |
| `libs/eslint-plugin/project.json` | Nx targets: `build`, `test` |
| `libs/eslint-plugin/vite.config.ts` | Vitest config for rule tests |
| `libs/eslint-plugin/.eslintrc.json` | ESLint config for plugin source |
| `libs/eslint-plugin/.eslintignore` | Ignore dist |
| `libs/eslint-plugin/src/utils.ts` | Shared AST helper functions used by all rules |
| `libs/eslint-plugin/src/index.ts` | Plugin entry — registers all rules + recommended config |
| `libs/eslint-plugin/src/rules/no-relative-imports.ts` | Rule 1 |
| `libs/eslint-plugin/src/rules/prop-readonly.ts` | Rule 2 |
| `libs/eslint-plugin/src/rules/prop-type-annotation.ts` | Rule 3 |
| `libs/eslint-plugin/src/rules/listen-naming.ts` | Rule 4 |
| `libs/eslint-plugin/src/rules/watch-naming.ts` | Rule 5 |
| `libs/eslint-plugin/src/rules/handler-naming.ts` | Rule 6 |
| `libs/eslint-plugin/src/rules/event-prefix.ts` | Rule 7 |
| `libs/eslint-plugin/src/rules/method-async.ts` | Rule 8 |
| `libs/eslint-plugin/src/rules/method-private.ts` | Rule 9 |
| `libs/eslint-plugin/src/rules/component-tag-prefix.ts` | Rule 10 |
| `libs/eslint-plugin/src/rules/no-relative-imports.spec.ts` | Tests for Rule 1 |
| `libs/eslint-plugin/src/rules/prop-readonly.spec.ts` | Tests for Rule 2 |
| `libs/eslint-plugin/src/rules/prop-type-annotation.spec.ts` | Tests for Rule 3 |
| `libs/eslint-plugin/src/rules/listen-naming.spec.ts` | Tests for Rule 4 |
| `libs/eslint-plugin/src/rules/watch-naming.spec.ts` | Tests for Rule 5 |
| `libs/eslint-plugin/src/rules/handler-naming.spec.ts` | Tests for Rule 6 |
| `libs/eslint-plugin/src/rules/event-prefix.spec.ts` | Tests for Rule 7 |
| `libs/eslint-plugin/src/rules/method-async.spec.ts` | Tests for Rule 8 |
| `libs/eslint-plugin/src/rules/method-private.spec.ts` | Tests for Rule 9 |
| `libs/eslint-plugin/src/rules/component-tag-prefix.spec.ts` | Tests for Rule 10 |

### Modified files

| File | Change |
|---|---|
| `packages/core/.eslintrc.json` | Add `@baloise/ds` plugin + activate all 10 rules on `*.tsx` files |

---

## Task 1: Plugin package scaffold

**Files:**
- Create: `libs/eslint-plugin/package.json`
- Create: `libs/eslint-plugin/tsconfig.json`
- Create: `libs/eslint-plugin/tsconfig.lib.json`
- Create: `libs/eslint-plugin/project.json`
- Create: `libs/eslint-plugin/vite.config.ts`
- Create: `libs/eslint-plugin/.eslintrc.json`
- Create: `libs/eslint-plugin/.eslintignore`

- [ ] **Step 1: Create `libs/eslint-plugin/package.json`**

```json
{
  "name": "@baloise/ds-eslint-plugin",
  "version": "0.0.1",
  "private": true,
  "type": "commonjs",
  "main": "./dist/src/index.js",
  "typings": "./dist/src/index.d.ts",
  "dependencies": {
    "@typescript-eslint/utils": "7.16.0"
  }
}
```

- [ ] **Step 2: Create `libs/eslint-plugin/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "strict": false
  },
  "files": [],
  "include": [],
  "references": [
    { "path": "./tsconfig.lib.json" }
  ]
}
```

- [ ] **Step 3: Create `libs/eslint-plugin/tsconfig.lib.json`**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist/out-tsc",
    "declaration": true,
    "types": ["node", "vitest/globals"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts", "src/**/*.test.ts"]
}
```

- [ ] **Step 4: Create `libs/eslint-plugin/project.json`**

```json
{
  "name": "ds-eslint-plugin",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/eslint-plugin/src",
  "projectType": "library",
  "targets": {
    "test": {
      "executor": "@nx/vitest:test",
      "outputs": ["{options.reportsDirectory}"],
      "options": {
        "reportsDirectory": "../../coverage/libs/eslint-plugin"
      }
    },
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "{projectRoot}/dist",
        "main": "libs/eslint-plugin/src/index.ts",
        "tsConfig": "libs/eslint-plugin/tsconfig.lib.json",
        "assets": []
      }
    }
  },
  "tags": ["scope:dev", "type:lib"]
}
```

- [ ] **Step 5: Create `libs/eslint-plugin/vite.config.ts`**

```ts
import { defineConfig } from 'vite'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/eslint-plugin',
  plugins: [nxViteTsPaths()],
  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: { reportsDirectory: '../../coverage/libs/eslint-plugin', provider: 'v8' },
  },
})
```

- [ ] **Step 6: Create `libs/eslint-plugin/.eslintrc.json`**

```json
{
  "extends": ["../../.eslintrc.base.json"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        "@nx/enforce-module-boundaries": "off"
      }
    }
  ]
}
```

- [ ] **Step 7: Create `libs/eslint-plugin/.eslintignore`**

```
dist
```

- [ ] **Step 8: Run `npm install` to link the workspace package**

```bash
npm install
```

Expected: `node_modules/@baloise/ds-eslint-plugin` is symlinked to `libs/eslint-plugin`.

- [ ] **Step 9: Commit**

```bash
git add libs/eslint-plugin/package.json libs/eslint-plugin/tsconfig.json libs/eslint-plugin/tsconfig.lib.json libs/eslint-plugin/project.json libs/eslint-plugin/vite.config.ts libs/eslint-plugin/.eslintrc.json libs/eslint-plugin/.eslintignore package-lock.json
git commit -m "chore(eslint-plugin): scaffold @baloise/ds-eslint-plugin package"
```

---

## Task 2: Shared AST utilities + plugin entry

**Files:**
- Create: `libs/eslint-plugin/src/utils.ts`
- Create: `libs/eslint-plugin/src/index.ts`

- [ ] **Step 1: Create `libs/eslint-plugin/src/utils.ts`**

These helpers are used by every rule to inspect decorators in a consistent way.

```ts
import type { TSESTree } from '@typescript-eslint/utils'

type DecoratedNode =
  | TSESTree.ClassDeclaration
  | TSESTree.MethodDefinition
  | TSESTree.PropertyDefinition

/** Returns true if the node has a decorator with the given name (e.g. 'Prop', 'Listen'). */
export function hasDecorator(node: DecoratedNode, name: string): boolean {
  return getDecorator(node, name) !== null
}

/** Returns the first decorator matching the given name, or null. */
export function getDecorator(node: DecoratedNode, name: string): TSESTree.Decorator | null {
  for (const decorator of node.decorators ?? []) {
    const expr = decorator.expression
    if (expr.type === 'Identifier' && expr.name === name) return decorator
    if (
      expr.type === 'CallExpression' &&
      expr.callee.type === 'Identifier' &&
      expr.callee.name === name
    ) return decorator
  }
  return null
}

/**
 * Returns the first string literal argument of a decorator call.
 * e.g. @Watch('value') → 'value'
 */
export function getDecoratorStringArg(decorator: TSESTree.Decorator, index = 0): string | null {
  const expr = decorator.expression
  if (expr.type !== 'CallExpression') return null
  const arg = expr.arguments[index]
  if (!arg || arg.type !== 'Literal') return null
  return typeof arg.value === 'string' ? arg.value : null
}

/**
 * Returns the string value of a named property in a decorator's object argument.
 * e.g. @Component({ tag: 'ds-button' }) → getDecoratorObjectProp(dec, 'tag') === 'ds-button'
 */
export function getDecoratorObjectProp(decorator: TSESTree.Decorator, propName: string): string | null {
  const expr = decorator.expression
  if (expr.type !== 'CallExpression') return null
  const obj = expr.arguments[0]
  if (!obj || obj.type !== 'ObjectExpression') return null
  for (const prop of obj.properties) {
    if (
      prop.type === 'Property' &&
      prop.key.type === 'Identifier' &&
      prop.key.name === propName &&
      prop.value.type === 'Literal' &&
      typeof prop.value.value === 'string'
    ) {
      return prop.value.value
    }
  }
  return null
}

/** Returns the string name of a MethodDefinition key. */
export function getMethodName(node: TSESTree.MethodDefinition): string | null {
  const key = node.key
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}

/** Returns the string name of a PropertyDefinition key. */
export function getPropertyName(node: TSESTree.PropertyDefinition): string | null {
  const key = node.key
  if (key.type === 'Identifier') return key.name
  if (key.type === 'Literal' && typeof key.value === 'string') return key.value
  return null
}
```

- [ ] **Step 2: Create `libs/eslint-plugin/src/index.ts`** (placeholder — will be filled as rules are added)

```ts
import { noRelativeImports } from './rules/no-relative-imports'

const plugin = {
  rules: {
    'no-relative-imports': noRelativeImports,
  },
  configs: {} as Record<string, unknown>,
}

plugin.configs['recommended'] = {
  plugins: ['@baloise/ds'],
  rules: {
    '@baloise/ds/no-relative-imports': 'error',
  },
}

export = plugin
```

> **Note:** `index.ts` will grow with each rule added in Tasks 3–12. Each task shows the full updated version.

- [ ] **Step 3: Create `libs/eslint-plugin/src/rules/no-relative-imports.ts`** (placeholder for Task 3)

```ts
import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const noRelativeImports = createRule({
  name: 'no-relative-imports',
  meta: {
    type: 'problem',
    docs: { description: 'Use @utils and @global path aliases instead of relative paths.' },
    messages: {
      useAlias: 'Use @utils or @global instead of relative path "{{path}}". Relative imports to ../../utils or ../../global are not allowed.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {}
  },
})
```

- [ ] **Step 4: Verify build works**

```bash
npx nx run ds-eslint-plugin:build
```

Expected: `libs/eslint-plugin/dist/src/index.js` created without errors.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/
git commit -m "chore(eslint-plugin): add shared AST utils and plugin entry point"
```

---

## Task 3: Rule — `no-relative-imports`

**Files:**
- Modify: `libs/eslint-plugin/src/rules/no-relative-imports.ts`
- Create: `libs/eslint-plugin/src/rules/no-relative-imports.spec.ts`

**What it checks:** Any `import` statement whose source path contains `/utils/` or `/global/` accessed via relative `../` paths (i.e. `../../utils/log`, `../../global/index`, etc.) must instead use `@utils` or `@global`.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/no-relative-imports.spec.ts
import { RuleTester } from 'eslint'
import { noRelativeImports } from './no-relative-imports'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
})

tester.run('ds/no-relative-imports', noRelativeImports as any, {
  valid: [
    { code: `import { Logger } from '@utils'` },
    { code: `import { DsConfigState } from '@global'` },
    { code: `import { Component } from '@stencil/core'` },
    { code: `import { foo } from './sibling'` },
    { code: `import { foo } from '../parent'` },
  ],
  invalid: [
    {
      code: `import { Logger } from '../../utils/log'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { DsConfigState } from '../../global'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { foo } from '../../../utils/attributes'`,
      errors: [{ messageId: 'useAlias' }],
    },
    {
      code: `import { bar } from '../../global/index'`,
      errors: [{ messageId: 'useAlias' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/no-relative-imports.spec.ts
```

Expected: FAIL — rule does nothing yet.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/no-relative-imports.ts
import { ESLintUtils } from '@typescript-eslint/utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const noRelativeImports = createRule({
  name: 'no-relative-imports',
  meta: {
    type: 'problem',
    docs: { description: 'Use @utils and @global path aliases instead of relative paths.' },
    messages: {
      useAlias: 'Use @utils or @global instead of relative path "{{path}}". Relative imports to ../../utils or ../../global are not allowed.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        const path = node.source.value
        if (/\.\.\/.*\/?(utils|global)(\/|$)/.test(path) || /\.\.\/.*\/(utils|global)$/.test(path)) {
          context.report({
            node: node.source,
            messageId: 'useAlias',
            data: { path },
          })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/no-relative-imports.spec.ts
```

Expected: PASS — all valid cases pass, all invalid cases produce the `useAlias` error.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/no-relative-imports.ts libs/eslint-plugin/src/rules/no-relative-imports.spec.ts
git commit -m "feat(eslint-plugin): add ds/no-relative-imports rule"
```

---

## Task 4: Rule — `prop-readonly`

**Files:**
- Create: `libs/eslint-plugin/src/rules/prop-readonly.ts`
- Create: `libs/eslint-plugin/src/rules/prop-readonly.spec.ts`

**What it checks:** Every `@Prop()` class field must have the `readonly` keyword. Without `readonly`, TypeScript allows accidental internal reassignment.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/prop-readonly.spec.ts
import { RuleTester } from 'eslint'
import { propReadonly } from './prop-readonly'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/prop-readonly', propReadonly as any, {
  valid: [
    { code: `class C { @Prop() readonly label: string = '' }` },
    { code: `class C { @Prop({ reflect: true }) readonly disabled: boolean = false }` },
    { code: `class C { @State() active: boolean = false }` },
    { code: `class C { label: string = '' }` },
  ],
  invalid: [
    {
      code: `class C { @Prop() label: string = '' }`,
      errors: [{ messageId: 'missingReadonly' }],
    },
    {
      code: `class C { @Prop({ reflect: true }) disabled: boolean = false }`,
      errors: [{ messageId: 'missingReadonly' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/prop-readonly.spec.ts
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/prop-readonly.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const propReadonly = createRule({
  name: 'prop-readonly',
  meta: {
    type: 'problem',
    docs: { description: 'All @Prop() fields must be readonly.' },
    messages: {
      missingReadonly: '@Prop() field "{{name}}" must be readonly. Add the readonly keyword.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Prop')) return
        if (node.readonly) return
        const key = node.key
        const name = key.type === 'Identifier' ? key.name : '(unknown)'
        context.report({ node, messageId: 'missingReadonly', data: { name } })
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/prop-readonly.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/prop-readonly.ts libs/eslint-plugin/src/rules/prop-readonly.spec.ts
git commit -m "feat(eslint-plugin): add ds/prop-readonly rule"
```

---

## Task 5: Rule — `prop-type-annotation`

**Files:**
- Create: `libs/eslint-plugin/src/rules/prop-type-annotation.ts`
- Create: `libs/eslint-plugin/src/rules/prop-type-annotation.spec.ts`

**What it checks:** When a `@Prop() readonly` field has a default value (i.e. `= something`), it must also have an explicit type annotation (`: Type`). TypeScript will infer the type, but without an explicit annotation the type may be too narrow or unclear to readers.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/prop-type-annotation.spec.ts
import { RuleTester } from 'eslint'
import { propTypeAnnotation } from './prop-type-annotation'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/prop-type-annotation', propTypeAnnotation as any, {
  valid: [
    { code: `class C { @Prop() readonly disabled: boolean = false }` },
    { code: `class C { @Prop() readonly label: string = '' }` },
    { code: `class C { @Prop() readonly count: number = 0 }` },
    { code: `class C { @Prop() readonly size: string }` }, // no default → no type required by this rule
    { code: `class C { @State() active = false }` }, // not a Prop → not checked
  ],
  invalid: [
    {
      code: `class C { @Prop() readonly disabled = false }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
    {
      code: `class C { @Prop() readonly size = 'md' }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
    {
      code: `class C { @Prop() readonly count = 0 }`,
      errors: [{ messageId: 'missingTypeAnnotation' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/prop-type-annotation.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/prop-type-annotation.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const propTypeAnnotation = createRule({
  name: 'prop-type-annotation',
  meta: {
    type: 'problem',
    docs: { description: '@Prop() fields with a default value must have an explicit type annotation.' },
    messages: {
      missingTypeAnnotation:
        '@Prop() field "{{name}}" has a default value but no type annotation. Add ": Type" (e.g. ": boolean", ": string", ": DS.ButtonSize").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Prop')) return
        if (!node.value) return // no default value → nothing to check
        if (node.typeAnnotation) return // explicit type present → OK
        const name = getPropertyName(node) ?? '(unknown)'
        context.report({ node, messageId: 'missingTypeAnnotation', data: { name } })
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/prop-type-annotation.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/prop-type-annotation.ts libs/eslint-plugin/src/rules/prop-type-annotation.spec.ts
git commit -m "feat(eslint-plugin): add ds/prop-type-annotation rule"
```

---

## Task 6: Rule — `listen-naming`

**Files:**
- Create: `libs/eslint-plugin/src/rules/listen-naming.ts`
- Create: `libs/eslint-plugin/src/rules/listen-naming.spec.ts`

**What it checks:** Methods decorated with `@Listen(...)` must be named `listenTo<Event>` in camelCase with a capital letter after `listenTo`.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/listen-naming.spec.ts
import { RuleTester } from 'eslint'
import { listenNaming } from './listen-naming'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/listen-naming', listenNaming as any, {
  valid: [
    { code: `class C { @Listen('click') listenToClick() {} }` },
    { code: `class C { @Listen('keydown') listenToKeyDown() {} }` },
    { code: `class C { @Listen('dsChange') listenToDsChange() {} }` },
    { code: `class C { onClick() {} }` }, // no @Listen → not checked
  ],
  invalid: [
    {
      code: `class C { @Listen('click') onClick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('keydown') onKeyDown() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('click') handleClick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
    {
      code: `class C { @Listen('click') listenclick() {} }`,
      errors: [{ messageId: 'badListenName' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/listen-naming.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/listen-naming.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const listenNaming = createRule({
  name: 'listen-naming',
  meta: {
    type: 'suggestion',
    docs: { description: '@Listen() methods must be named listenTo<Event> (camelCase).' },
    messages: {
      badListenName:
        '@Listen() method "{{name}}" must be named listenTo<Event> (e.g. listenToClick, listenToKeyDown).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (!hasDecorator(node, 'Listen')) return
        const name = getMethodName(node)
        if (!name || !/^listenTo[A-Z]/.test(name)) {
          context.report({ node, messageId: 'badListenName', data: { name: name ?? '(unknown)' } })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/listen-naming.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/listen-naming.ts libs/eslint-plugin/src/rules/listen-naming.spec.ts
git commit -m "feat(eslint-plugin): add ds/listen-naming rule"
```

---

## Task 7: Rule — `watch-naming`

**Files:**
- Create: `libs/eslint-plugin/src/rules/watch-naming.ts`
- Create: `libs/eslint-plugin/src/rules/watch-naming.spec.ts`

**What it checks:** A method decorated with `@Watch('propName')` must be named `propNameChanged`. This makes the prop-watcher relationship immediately obvious.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/watch-naming.spec.ts
import { RuleTester } from 'eslint'
import { watchNaming } from './watch-naming'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/watch-naming', watchNaming as any, {
  valid: [
    { code: `class C { @Watch('value') valueChanged() {} }` },
    { code: `class C { @Watch('disabled') disabledChanged() {} }` },
    { code: `class C { @Watch('myProp') myPropChanged() {} }` },
    { code: `class C { valueChanged() {} }` }, // no @Watch → not checked
  ],
  invalid: [
    {
      code: `class C { @Watch('value') onValueChange() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
    {
      code: `class C { @Watch('disabled') watchDisabled() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
    {
      code: `class C { @Watch('size') sizeChange() {} }`,
      errors: [{ messageId: 'badWatchName' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/watch-naming.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/watch-naming.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { getDecorator, getDecoratorStringArg, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const watchNaming = createRule({
  name: 'watch-naming',
  meta: {
    type: 'suggestion',
    docs: { description: '@Watch("prop") methods must be named propChanged.' },
    messages: {
      badWatchName:
        '@Watch("{{propName}}") method "{{actual}}" must be named "{{expected}}".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        const watchDecorator = getDecorator(node, 'Watch')
        if (!watchDecorator) return
        const propName = getDecoratorStringArg(watchDecorator, 0)
        if (!propName) return
        const expected = propName + 'Changed'
        const actual = getMethodName(node)
        if (actual !== expected) {
          context.report({
            node,
            messageId: 'badWatchName',
            data: { propName, actual: actual ?? '(unknown)', expected },
          })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/watch-naming.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/watch-naming.ts libs/eslint-plugin/src/rules/watch-naming.spec.ts
git commit -m "feat(eslint-plugin): add ds/watch-naming rule"
```

---

## Task 8: Rule — `handler-naming`

**Files:**
- Create: `libs/eslint-plugin/src/rules/handler-naming.ts`
- Create: `libs/eslint-plugin/src/rules/handler-naming.spec.ts`

**What it checks:** Arrow function class fields whose name starts with `on` followed by a capital letter (e.g. `onClick`, `onChange`) must be renamed to start with `handle` (e.g. `handleClick`, `handleChange`). The `handle*` prefix is the convention for DOM event handlers in this codebase.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/handler-naming.spec.ts
import { RuleTester } from 'eslint'
import { handlerNaming } from './handler-naming'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/handler-naming', handlerNaming as any, {
  valid: [
    { code: `class C { private handleClick = () => {} }` },
    { code: `class C { private handleKeyDown = (e: KeyboardEvent) => {} }` },
    { code: `class C { someOtherArrow = () => {} }` },
    { code: `class C { onClick() {} }` }, // regular method (not arrow fn) → not checked
  ],
  invalid: [
    {
      code: `class C { onClick = () => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
    {
      code: `class C { onChange = (e: Event) => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
    {
      code: `class C { private onFocus = () => {} }`,
      errors: [{ messageId: 'useHandlePrefix' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/handler-naming.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/handler-naming.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const handlerNaming = createRule({
  name: 'handler-naming',
  meta: {
    type: 'suggestion',
    docs: { description: 'Arrow function class fields that are DOM handlers must be named handle* not on*.' },
    messages: {
      useHandlePrefix:
        'Arrow function field "{{name}}" looks like a DOM handler. Rename it from "on*" to "handle*" (e.g. "handleClick").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!node.value || node.value.type !== 'ArrowFunctionExpression') return
        const name = getPropertyName(node)
        if (typeof name === 'string' && /^on[A-Z]/.test(name)) {
          context.report({ node, messageId: 'useHandlePrefix', data: { name } })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/handler-naming.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/handler-naming.ts libs/eslint-plugin/src/rules/handler-naming.spec.ts
git commit -m "feat(eslint-plugin): add ds/handler-naming rule"
```

---

## Task 9: Rule — `event-prefix`

**Files:**
- Create: `libs/eslint-plugin/src/rules/event-prefix.ts`
- Create: `libs/eslint-plugin/src/rules/event-prefix.spec.ts`

**What it checks:** Every class field decorated with `@Event()` must have a name that starts with `ds` (lowercase). This avoids collisions with native DOM events and makes custom events clearly identifiable.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/event-prefix.spec.ts
import { RuleTester } from 'eslint'
import { eventPrefix } from './event-prefix'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/event-prefix', eventPrefix as any, {
  valid: [
    { code: `class C { @Event() dsChange!: EventEmitter<string> }` },
    { code: `class C { @Event() dsCloseClick!: EventEmitter<void> }` },
    { code: `class C { @Event() dsBlur!: EventEmitter<void> }` },
    { code: `class C { change: EventEmitter<string> }` }, // no @Event → not checked
  ],
  invalid: [
    {
      code: `class C { @Event() change!: EventEmitter<string> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `class C { @Event() balChange!: EventEmitter<string> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `class C { @Event() closeClick!: EventEmitter<void> }`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/event-prefix.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/event-prefix.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getPropertyName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const eventPrefix = createRule({
  name: 'event-prefix',
  meta: {
    type: 'problem',
    docs: { description: '@Event() fields must start with "ds" (e.g. dsChange, dsCloseClick).' },
    messages: {
      missingDsPrefix:
        '@Event() field "{{name}}" must start with "ds" (e.g. "ds{{capitalized}}").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!hasDecorator(node, 'Event')) return
        const name = getPropertyName(node)
        if (typeof name === 'string' && !name.startsWith('ds')) {
          const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
          context.report({ node, messageId: 'missingDsPrefix', data: { name, capitalized } })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/event-prefix.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/event-prefix.ts libs/eslint-plugin/src/rules/event-prefix.spec.ts
git commit -m "feat(eslint-plugin): add ds/event-prefix rule"
```

---

## Task 10: Rule — `method-async`

**Files:**
- Create: `libs/eslint-plugin/src/rules/method-async.ts`
- Create: `libs/eslint-plugin/src/rules/method-async.spec.ts`

**What it checks:** Every method decorated with `@Method()` must be declared `async`. Stencil's public API methods must return Promises so callers can always `await` them.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/method-async.spec.ts
import { RuleTester } from 'eslint'
import { methodAsync } from './method-async'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/method-async', methodAsync as any, {
  valid: [
    { code: `class C { @Method() async open(): Promise<void> {} }` },
    { code: `class C { @Method() async getValue(): Promise<string> { return '' } }` },
    { code: `class C { open() {} }` }, // no @Method → not checked
  ],
  invalid: [
    {
      code: `class C { @Method() open(): void {} }`,
      errors: [{ messageId: 'mustBeAsync' }],
    },
    {
      code: `class C { @Method() getValue(): string { return '' } }`,
      errors: [{ messageId: 'mustBeAsync' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/method-async.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/method-async.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const methodAsync = createRule({
  name: 'method-async',
  meta: {
    type: 'problem',
    docs: { description: '@Method() methods must be async and return Promise<T>.' },
    messages: {
      mustBeAsync:
        '@Method() "{{name}}" must be async. Change to: async {{name}}(): Promise<void> {}',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (!hasDecorator(node, 'Method')) return
        if (node.value.async) return
        const name = getMethodName(node) ?? '(unknown)'
        context.report({ node, messageId: 'mustBeAsync', data: { name } })
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/method-async.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/method-async.ts libs/eslint-plugin/src/rules/method-async.spec.ts
git commit -m "feat(eslint-plugin): add ds/method-async rule"
```

---

## Task 11: Rule — `method-private`

**Files:**
- Create: `libs/eslint-plugin/src/rules/method-private.ts`
- Create: `libs/eslint-plugin/src/rules/method-private.spec.ts`

**What it checks:** All methods in a component class must be `private`, except: Stencil lifecycle hooks, `render()`, methods decorated with `@Method()`, `@Watch()`, `@Listen()`, or `@Logger()`, and getter/setter accessors. These exceptions exist because Stencil or TypeScript needs to call them from outside the class.

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/method-private.spec.ts
import { RuleTester } from 'eslint'
import { methodPrivate } from './method-private'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/method-private', methodPrivate as any, {
  valid: [
    { code: `class C { private doSomething() {} }` },
    { code: `class C { render() {} }` },
    { code: `class C { connectedCallback() {} }` },
    { code: `class C { disconnectedCallback() {} }` },
    { code: `class C { componentWillLoad() {} }` },
    { code: `class C { componentDidLoad() {} }` },
    { code: `class C { componentWillRender() {} }` },
    { code: `class C { componentDidRender() {} }` },
    { code: `class C { componentWillUpdate() {} }` },
    { code: `class C { componentDidUpdate() {} }` },
    { code: `class C { @Method() async open(): Promise<void> {} }` },
    { code: `class C { @Watch('value') valueChanged() {} }` },
    { code: `class C { @Listen('click') listenToClick() {} }` },
    { code: `class C { @Logger('ds-foo') createLogger(log: any) {} }` },
    { code: `class C { private get isActive() { return true } }` },
  ],
  invalid: [
    {
      code: `class C { doSomething() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
    {
      code: `class C { fetchData() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
    {
      code: `class C { protected computeLabel() {} }`,
      errors: [{ messageId: 'mustBePrivate' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/method-private.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/method-private.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { hasDecorator, getMethodName } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

const LIFECYCLE_HOOKS = new Set([
  'connectedCallback',
  'disconnectedCallback',
  'componentWillLoad',
  'componentDidLoad',
  'componentWillRender',
  'componentDidRender',
  'componentWillUpdate',
  'componentDidUpdate',
  'render',
])

const EXEMPT_DECORATORS = ['Method', 'Watch', 'Listen', 'Logger']

export const methodPrivate = createRule({
  name: 'method-private',
  meta: {
    type: 'suggestion',
    docs: { description: 'Component methods must be private unless they are lifecycle hooks or decorated with @Method, @Watch, @Listen, or @Logger.' },
    messages: {
      mustBePrivate:
        'Method "{{name}}" must be private. Add the private keyword, or it should be a lifecycle hook / decorated with @Method, @Watch, or @Listen.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        if (node.static) return
        if (node.kind === 'get' || node.kind === 'set') return
        const name = getMethodName(node)
        if (!name) return
        if (LIFECYCLE_HOOKS.has(name)) return
        if (EXEMPT_DECORATORS.some(d => hasDecorator(node, d))) return
        if (node.accessibility === 'private') return
        context.report({ node, messageId: 'mustBePrivate', data: { name } })
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/method-private.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/method-private.ts libs/eslint-plugin/src/rules/method-private.spec.ts
git commit -m "feat(eslint-plugin): add ds/method-private rule"
```

---

## Task 12: Rule — `component-tag-prefix`

**Files:**
- Create: `libs/eslint-plugin/src/rules/component-tag-prefix.ts`
- Create: `libs/eslint-plugin/src/rules/component-tag-prefix.spec.ts`

**What it checks:** The `tag` property in `@Component({ tag: '...' })` must start with `ds-`. The ES6 class name must NOT start with `Ds` (it's already unambiguous since it's inside `@Component`).

- [ ] **Step 1: Write the failing test**

```ts
// libs/eslint-plugin/src/rules/component-tag-prefix.spec.ts
import { RuleTester } from 'eslint'
import { componentTagPrefix } from './component-tag-prefix'

const tester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { legacyDecorators: true },
  },
})

tester.run('ds/component-tag-prefix', componentTagPrefix as any, {
  valid: [
    { code: `@Component({ tag: 'ds-button', shadow: true }) class Button {}` },
    { code: `@Component({ tag: 'ds-my-component' }) class MyComponent {}` },
    { code: `class Button {}` }, // no @Component → not checked
  ],
  invalid: [
    {
      code: `@Component({ tag: 'button' }) class Button {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `@Component({ tag: 'my-component' }) class MyComponent {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
    {
      code: `@Component({ tag: 'bal-button' }) class Button {}`,
      errors: [{ messageId: 'missingDsPrefix' }],
    },
  ],
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/component-tag-prefix.spec.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement the rule**

```ts
// libs/eslint-plugin/src/rules/component-tag-prefix.ts
import { ESLintUtils } from '@typescript-eslint/utils'
import { getDecorator, getDecoratorObjectProp } from '../utils'

const createRule = ESLintUtils.RuleCreator(
  name => `https://design.helvetia.com/contributing/component-style-guide#${name}`,
)

export const componentTagPrefix = createRule({
  name: 'component-tag-prefix',
  meta: {
    type: 'problem',
    docs: { description: '@Component({ tag }) must start with "ds-".' },
    messages: {
      missingDsPrefix:
        '@Component tag "{{tag}}" must start with "ds-" (e.g. "ds-{{suggested}}").',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorator = getDecorator(node as any, 'Component')
        if (!decorator) return
        const tag = getDecoratorObjectProp(decorator, 'tag')
        if (!tag) return
        if (!tag.startsWith('ds-')) {
          const suggested = tag.startsWith('bal-') ? tag.slice(4) : tag
          context.report({
            node: decorator,
            messageId: 'missingDsPrefix',
            data: { tag, suggested },
          })
        }
      },
    }
  },
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx nx run ds-eslint-plugin:test --testFile=src/rules/component-tag-prefix.spec.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add libs/eslint-plugin/src/rules/component-tag-prefix.ts libs/eslint-plugin/src/rules/component-tag-prefix.spec.ts
git commit -m "feat(eslint-plugin): add ds/component-tag-prefix rule"
```

---

## Task 13: Wire all rules into `index.ts` and run full test suite

**Files:**
- Modify: `libs/eslint-plugin/src/index.ts`

- [ ] **Step 1: Update `index.ts` with all 10 rules**

```ts
// libs/eslint-plugin/src/index.ts
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

plugin.configs['recommended'] = {
  plugins: ['@baloise/ds'],
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
}

export = plugin
```

- [ ] **Step 2: Run all plugin tests**

```bash
npx nx run ds-eslint-plugin:test
```

Expected: All 10 rule test files PASS.

- [ ] **Step 3: Build the plugin**

```bash
npx nx run ds-eslint-plugin:build
```

Expected: `libs/eslint-plugin/dist/src/index.js` built successfully.

- [ ] **Step 4: Commit**

```bash
git add libs/eslint-plugin/src/index.ts
git commit -m "feat(eslint-plugin): wire all 10 rules into recommended config"
```

---

## Task 14: Wire plugin into `packages/core` and verify

**Files:**
- Modify: `packages/core/.eslintrc.json`

- [ ] **Step 1: Update `packages/core/.eslintrc.json`**

```json
{
  "extends": ["../../.eslintrc.base.json"],
  "ignorePatterns": ["!**/*", "**/vite.config.*.timestamp*", "**/vitest.config.*.timestamp*"],
  "overrides": [
    {
      "files": ["*.play.ts"],
      "extends": ["plugin:playwright/recommended"],
      "rules": {
        "playwright/expect-expect": "off",
        "playwright/valid-title": "off"
      }
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-namespace": "off",
        "@nx/enforce-module-boundaries": "off",
        "no-extra-boolean-cast": "off",
        "no-self-assign": "off"
      }
    },
    {
      "files": ["*.tsx"],
      "plugins": ["@baloise/ds"],
      "rules": {
        "@baloise/ds/no-relative-imports": "error",
        "@baloise/ds/prop-readonly": "error",
        "@baloise/ds/prop-type-annotation": "error",
        "@baloise/ds/listen-naming": "error",
        "@baloise/ds/watch-naming": "error",
        "@baloise/ds/handler-naming": "warn",
        "@baloise/ds/event-prefix": "error",
        "@baloise/ds/method-async": "error",
        "@baloise/ds/method-private": "warn",
        "@baloise/ds/component-tag-prefix": "error"
      }
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    }
  ]
}
```

> **Note:** Rules target `*.tsx` only — not `*.ts` — so only component source files are linted, not test files, config files, or interface files.

- [ ] **Step 2: Run the core lint and inspect output**

```bash
npx nx run core:lint 2>&1 | head -80
```

Expected: ESLint runs and reports any style guide violations in `packages/core/src/components/**/*.tsx`. Review the output — violations here are pre-existing issues in the codebase, not bugs in the rules.

- [ ] **Step 3: If `method-private` or `handler-naming` generate too many false positives, downgrade to `warn`**

These two rules (`warn` by default) can be adjusted without a code change. If the output is noisy, check that the `warn` severity is already set — it is (see Step 1 above).

- [ ] **Step 4: Commit**

```bash
git add packages/core/.eslintrc.json
git commit -m "feat(core): activate @baloise/ds ESLint rules on *.tsx component files"
```

---

## Self-Review

**Spec coverage:**
- ✅ Import aliases → `no-relative-imports`
- ✅ `@Prop() readonly` → `prop-readonly`
- ✅ Prop type annotation → `prop-type-annotation`
- ✅ `@Listen()` naming → `listen-naming`
- ✅ `@Watch()` naming → `watch-naming`
- ✅ DOM handler naming → `handler-naming`
- ✅ `@Event()` prefix → `event-prefix`
- ✅ `@Method()` async → `method-async`
- ✅ Method visibility → `method-private`
- ✅ Component tag prefix → `component-tag-prefix`
- ℹ️ Const arrays / derived types (Check 1) — not implemented: requires semantic type analysis beyond ESLint's AST capabilities
- ℹ️ Reflect rule (Check 3) — not implemented: requires domain knowledge of which props are "state" vs "visual"
- ℹ️ validateProps (Check 4) — not implemented: requires cross-method call graph analysis
- ℹ️ Section dividers (Check 11) — not implemented: comment analysis is unreliable for autofixes
- ℹ️ JSDoc quality (Check 12) — not implemented: text quality can't be enforced via AST
- ℹ️ Alphabetical ordering (Check 13) — not implemented: class body ordering requires full prop-list traversal
- ℹ️ SCSS attribute selectors (Check 19) — out of scope: needs a Stylelint plugin, not ESLint

**Placeholder scan:** No TBDs, all code blocks are complete.

**Type consistency:** All rule functions are consistently named and exported. Decorator-checking goes through `utils.ts` helpers in every rule. RuleTester import and parser option is identical across all spec files.
