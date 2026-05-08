# Turborepo Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Nx (v22) with Turborepo as the monorepo task orchestrator — preserving caching, build ordering, and all existing workflows. The custom `libs/nx` executor package is dissolved; logic moves to plain node scripts called directly from `package.json` scripts.

**Architecture:** Each workspace package keeps its own `package.json` with explicit `build`, `test`, `lint` scripts. A root `turbo.json` defines the pipeline, dependency ordering, and cache inputs/outputs. The Turborepo remote cache can replace Nx Cloud. Changesets (already in place) continues to handle versioning and publishing.

**Tech Stack:** `turbo` v2, `@turbo/gen` (optional, generators), plain `node` scripts to replace custom Nx executors, npm workspaces (already configured).

---

## Why Turborepo

| Concern | Nx | Turborepo |
|---|---|---|
| Custom executors | Required a full TS package (`libs/nx`) | Plain node/shell scripts, zero framework |
| Config surface | `nx.json` + `project.json` per package | Single `turbo.json` at root |
| Plugin auto-detection | `@nx/vite/plugin`, `@nx/eslint/plugin` | Explicit scripts per package (more predictable) |
| Remote cache | Nx Cloud (account required) | Vercel Remote Cache (free tier) or self-hosted |
| Learning curve | High (generators, executors, project graph) | Low (just pipeline + globs) |
| Lock-in | High | Low |

---

## File map

| Action | File |
|---|---|
| create | `turbo.json` |
| modify | `package.json` (root — replace nx scripts, add turbo) |
| modify | `packages/core/package.json` |
| modify | `packages/tokens/package.json` |
| modify | `packages/styles/package.json` |
| modify | `packages/assets/package.json` |
| modify | `packages/playwright/package.json` |
| modify | `libs/output-target-angular/package.json` |
| modify | `libs/output-target-web/package.json` |
| modify | `libs/eslint-plugin/package.json` |
| create | `scripts/build-core.mjs` (replaces `@baloise/ds-nx:build-core`) |
| create | `scripts/build-styles.mjs` (replaces `@baloise/ds-nx:build-styles`) |
| create | `scripts/build-svg.mjs` (replaces `@baloise/ds-nx:build-svg`) |
| create | `scripts/build-docs.mjs` (replaces `@baloise/ds-nx:build-docs`) |
| create | `scripts/build-e2e.mjs` (replaces `@baloise/ds-nx:build-e2e`) |
| create | `scripts/pre-publish.mjs` (replaces `@baloise/ds-nx:pre-publish`) |
| create | `scripts/test-ui.mjs` (replaces `@baloise/ds-nx:test-ui`) |
| create | `scripts/create-test-app.mjs` (replaces `@baloise/ds-nx:create-test-app`) |
| delete | `nx.json` |
| delete | `packages/core/project.json` |
| delete | `packages/tokens/project.json` |
| delete | `packages/styles/project.json` |
| delete | `packages/assets/project.json` |
| delete | `packages/playwright/project.json` |
| delete | `libs/output-target-angular/project.json` |
| delete | `libs/output-target-web/project.json` |
| delete | `libs/eslint-plugin/project.json` |
| delete | `libs/nx/project.json` |
| delete | `docs/project.json` |
| delete | `project.json` (root) |
| delete | `libs/nx/` (entire directory — executors dissolved into scripts) |

---

## Phase 1 — Install Turborepo

- [ ] Add `turbo` as a root devDependency:
  ```bash
  npm install --save-dev turbo@latest
  ```
- [ ] Verify `turbo --version` works.
- [ ] Add `.turbo/` to `.gitignore`.

---

## Phase 2 — Create `turbo.json`

Create `/turbo.json`:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "!**/*.spec.*", "!**/*.play.*"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "test/**"],
      "outputs": []
    },
    "lint": {
      "inputs": ["src/**", "eslint.config.*"],
      "outputs": []
    },
    "prepare": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

- [ ] Create `turbo.json` at the workspace root with the content above.

---

## Phase 3 — Convert Custom Executors to Plain Scripts

Each executor in `libs/nx/src/executors/` becomes a standalone `.mjs` script in `scripts/`. The scripts use the same logic as the current executor `executor.ts` files but are called directly via `node scripts/<name>.mjs`.

### 3.1 `build-core`

The current executor runs the Stencil CLI (`stencil build`) with env-var flags and does post-build cleanup (removing auto-generated Angular/React output).

- [ ] Create `scripts/build-core.mjs`:
  - Read env vars (`IS_DS_DEVELOPMENT`, `BAL_DOCUMENTATION`, `DS_RELEASE`, `DS_PLAYWRIGHT_TESTING`, `DS_TESTING`) from `process.env`.
  - Run `stencil build --config packages/core/stencil.config.ts` via `child_process.execSync`.
  - Run contributor/tag post-processing if applicable.
- [ ] Update `packages/core/package.json` scripts:
  ```json
  {
    "scripts": {
      "build": "node ../../scripts/build-core.mjs",
      "start": "IS_DS_DEVELOPMENT=true node ../../scripts/build-core.mjs --watch"
    }
  }
  ```

### 3.2 `build-styles`

The current executor compiles SCSS, generates CSS utilities, and copies output to `packages/core/www/`.

- [ ] Create `scripts/build-styles.mjs`:
  - Compile SCSS using `sass` CLI: `sass packages/styles/src/index.scss packages/styles/css/design-system.css`.
  - Copy output to `packages/core/www/` using `fs`.
- [ ] Update `packages/styles/package.json` scripts:
  ```json
  {
    "scripts": {
      "build": "node ../../scripts/build-styles.mjs"
    }
  }
  ```

### 3.3 `build-svg`

The current executor optimizes SVGs with SVGO and generates TypeScript/JSON exports.

- [ ] Create `scripts/build-svg.mjs`:
  - Run SVGO optimization on `packages/assets/src/**/*.svg`.
  - Generate `packages/assets/src/icons/index.ts` and JSON manifests.
- [ ] Update `packages/assets/package.json` scripts:
  ```json
  {
    "scripts": {
      "optimize": "node ../../scripts/build-svg.mjs"
    }
  }
  ```

### 3.4 `build-docs`

The current executor archives assets, copies resources, then builds Storybook.

- [ ] Create `scripts/build-docs.mjs`:
  - Copy `packages/assets` and `resources/` into `docs/public/assets/`.
  - Run Storybook build: `storybook build -c docs/.storybook -o docs/build`.
- [ ] Update `docs/package.json` scripts:
  ```json
  {
    "scripts": {
      "build": "node ../scripts/build-docs.mjs",
      "start": "storybook dev -p 6006"
    }
  }
  ```

### 3.5 `build-e2e`

The current executor copies `packages/core/dist` to `e2e/generated/`.

- [ ] Create `scripts/build-e2e.mjs`:
  - `fs.cpSync('packages/core/dist', 'e2e/generated/www', { recursive: true })`.
- [ ] Update root `package.json` (or an `e2e/package.json` if it exists) to call this script.

### 3.6 `pre-publish`

The current executor copies `LICENSE` and `README.md` into each package's `dist/` folder before publishing.

- [ ] Create `scripts/pre-publish.mjs`:
  - For each publishable package, copy root `LICENSE` and package `README.md` to `<package>/dist/`.
- [ ] Add `"prepare": "node ../../scripts/pre-publish.mjs"` to each publishable package's `package.json`.

### 3.7 `test-ui`

Launches Vitest in UI mode.

- [ ] Create `scripts/test-ui.mjs` (or simply inline as an npm script):
  ```bash
  vitest --ui
  ```
- [ ] Add `"test:ui": "vitest --ui"` to each package's `package.json` scripts.

### 3.8 `create-test-app`

Interactive CLI to scaffold Angular/React test apps. Keep as standalone script.

- [ ] Create `scripts/create-test-app.mjs` by extracting the logic from the current executor.
- [ ] Update root `package.json`:
  ```json
  {
    "scripts": {
      "angular-create": "node scripts/create-test-app.mjs --framework=angular",
      "react-create": "node scripts/create-test-app.mjs --framework=react"
    }
  }
  ```

---

## Phase 4 — Update Each Package's `package.json` Scripts

Every package needs explicit `build`, `test`, and `lint` scripts so Turborepo can discover and run them. Below are the minimal changes needed per package.

### `packages/tokens`

- [ ] Add `"build": "npm run build"` (currently runs `style-dictionary build` via `nx:run-commands` — move that command directly into the script).

### `packages/playwright`

- [ ] The SWC build currently uses `@nx/js:swc`. Replace with:
  ```json
  { "build": "swc src -d dist --config-file .swcrc" }
  ```

### `libs/output-target-angular` & `libs/output-target-web`

- [ ] The TSC build currently uses `@nx/js:tsc`. Replace with:
  ```json
  { "build": "tsc -p tsconfig.lib.json" }
  ```

### `libs/eslint-plugin`

- [ ] Same TSC build pattern as above.

---

## Phase 5 — Update Root `package.json` Scripts

Replace all `npx nx run ...` and `npx nx run-many ...` invocations with `turbo run ...`.

- [ ] Replace:
  ```json
  "build": "nx run-many --target=build"
  ```
  with:
  ```json
  "build": "turbo run build"
  ```
- [ ] Replace all individual target scripts accordingly:
  | Old | New |
  |---|---|
  | `npx nx run-many --target=build` | `turbo run build` |
  | `npx nx run-many --target=test` | `turbo run test` |
  | `npx nx run-many --target=lint` | `turbo run lint` |
  | `npx nx run core:start` | `turbo run start --filter=@baloise/ds-core` |
  | `npx nx run core:build` | `turbo run build --filter=@baloise/ds-core` |
  | `npx nx run styles:build` | `turbo run build --filter=@baloise/ds-styles` |
  | `npx nx run tokens:build` | `turbo run build --filter=@baloise/ds-tokens` |
  | `npx nx run docs:build` | `turbo run build --filter=docs` |

---

## Phase 6 — Remove Nx

- [ ] Uninstall all Nx packages:
  ```bash
  npm uninstall nx @nx/angular @nx/eslint @nx/js @nx/playwright @nx/rollup @nx/vite @nx/workspace
  ```
- [ ] Delete `nx.json`.
- [ ] Delete all `project.json` files (listed in the file map above).
- [ ] Delete `libs/nx/` directory (all executor code is now in `scripts/`).
- [ ] Remove any remaining `npx nx` references from docs and CI scripts.
- [ ] Update `.github/copilot-instructions.md` and `CLAUDE.md` to replace `npx nx run` commands with the new `turbo` equivalents.

---

## Phase 7 — TypeScript Path Aliases

Nx was not resolving TypeScript paths at runtime — that is handled by `tsconfig.base.json` which Stencil, Vite, and the TS compiler all read directly. No changes are needed here, but verify the aliases still resolve after Nx is removed.

- [ ] Run `tsc --noEmit -p tsconfig.base.json` to confirm path aliases compile cleanly.
- [ ] Run each package's build individually to ensure cross-package imports work.

---

## Phase 8 — CI/CD Updates

- [ ] Update `.github/workflows/` (or equivalent CI config) to replace `npx nx ...` with `npx turbo run ...`.
- [ ] Optionally enable Vercel Remote Cache for free distributed caching:
  ```bash
  TURBO_TOKEN=<token> TURBO_TEAM=<team> turbo run build
  ```
- [ ] Remove any Nx Cloud token / Nx Cloud references.

---

## Phase 9 — Validation

- [ ] `turbo run build` — all packages build in correct order.
- [ ] `turbo run test` — all Vitest unit tests pass.
- [ ] `turbo run lint` — all ESLint checks pass.
- [ ] Second run of `turbo run build` — cache hits for all unchanged packages.
- [ ] `npm start` — Stencil dev server starts correctly.
- [ ] `npm run docs` — Storybook starts correctly.
- [ ] `npm run e2e` — Playwright tests pass.

---

## Risk Register

| Risk | Mitigation |
|---|---|
| Nx plugins auto-detected tasks that are easy to miss | Audit `nx show projects --verbose` output before removing Nx; ensure every inferred target has an explicit replacement script |
| `@nx/js:tsc` executor options (e.g. `assets`, `transformers`) may not map 1:1 to plain `tsc` | Check each executor's schema.json for options; replicate them in `tsconfig.lib.json` or a custom build script |
| `nx release` is currently wired to the release pipeline | Changesets (`npm run changeset`) is already the source of truth for versioning — confirm CI uses changesets directly, not `nx release` |
| Turborepo does not support package-level generators (like `nx generate`) | Use `@turbo/gen` or keep generator scripts as standalone CLIs |
| Turborepo task graph is simpler than Nx's project graph | Explicit `dependsOn` in `turbo.json` covers all current `dependsOn: ["^build"]` patterns; no Nx-specific graph features are used here |
