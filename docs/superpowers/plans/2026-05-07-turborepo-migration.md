# Turborepo Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Nx (v22) with Turborepo as the monorepo task orchestrator — preserving caching, build ordering, and all existing workflows. The custom `libs/nx` executor package is dissolved; logic moves to plain node scripts. Package manager stays **npm** (no pnpm migration).

**Architecture:** Each workspace package keeps its own `package.json` with explicit `build`, `test`, `lint` scripts. A root `turbo.json` defines the pipeline, dependency ordering, and cache inputs/outputs. Scripts fall into two buckets:
- **Root `scripts/*.mjs`** — cross-package orchestration scripts (touch multiple packages)
- **Inline `package.json` scripts** — single-package commands (no script file needed)

**Tech Stack:** `turbo` v2, plain `node` scripts to replace custom Nx executors, npm workspaces (already configured).

---

## Why Turborepo

| Concern | Nx | Turborepo |
| --- | --- | --- |
| Custom executors | Required a full TS package (`libs/nx`) | Plain node/shell scripts, zero framework |
| Config surface | `nx.json` + `project.json` per package | Single `turbo.json` at root |
| Plugin auto-detection | `@nx/vite/plugin`, `@nx/eslint/plugin` | Explicit scripts per package (more predictable) |
| Remote cache | Nx Cloud (account required) | Vercel Remote Cache (free tier) or self-hosted |
| Learning curve | High (generators, executors, project graph) | Low (just pipeline + globs) |
| Lock-in | High | Low |

---

## Current State (as of 2026-05-08)

### Already done ✓
- `libs/nx/` **deleted** — the entire executor package is gone
- `scripts/build-svg.mjs` — SVG optimization and TS/JSON generation
- `scripts/build-docs.mjs` — Storybook + asset copy orchestration
- `scripts/create-changeset.mjs` — interactive changeset CLI
- `test-ui` executor removed from all `project.json` files (replaced with `command: "npx vitest --ui"`)

### ⚠ Broken today (libs/nx is gone but these still reference it)
- `docs/project.json` → `@baloise/ds-nx:build-docs` (script exists, project.json not updated)
- `packages/core/project.json` → `@baloise/ds-nx:build-core` (no script yet)

### Still using Nx executors
| File | Executor | Replacement |
| --- | --- | --- |
| `packages/core/project.json` | `@baloise/ds-nx:build-core` | `scripts/build-core.mjs` |
| `docs/project.json` | `@baloise/ds-nx:build-docs` | `scripts/build-docs.mjs` (already exists) |
| `packages/assets/project.json` | `@nx/rollup:rollup` | `rollup -c rollup.config.mjs` |
| `packages/playwright/project.json` | `@nx/js:swc` | `swc src -d dist --config-file .swcrc` |
| `libs/output-target-angular/project.json` | `@nx/js:tsc` | `tsc -p tsconfig.lib.json` |
| `libs/output-target-web/project.json` | `@nx/js:tsc` | `tsc -p tsconfig.lib.json` |
| `libs/eslint-plugin/project.json` | `@nx/js:tsc` | `tsc -p tsconfig.lib.json` |
| `libs/output-target-angular/project.json` | `@nx/vitest:test` | `vitest --run` |
| `libs/eslint-plugin/project.json` | `@nx/vitest:test` | `vitest --run` |
| `packages/assets/project.json` | `@nx/js:release-publish` | handled by changesets |
| `**/project.json` | `nx:run-commands` | inline `command:` or package.json script |

---

## File Map

| Action | File |
| --- | --- |
| ~~done~~ | `scripts/build-svg.mjs` |
| ~~done~~ | `scripts/build-docs.mjs` |
| ~~done~~ | `scripts/create-changeset.mjs` |
| create | `turbo.json` |
| create | `scripts/build-core.mjs` |
| modify | `docs/project.json` → wire up `scripts/build-docs.mjs` |
| modify | `packages/core/project.json` → wire up `scripts/build-core.mjs` |
| modify | `package.json` (root — replace nx scripts, add turbo) |
| modify | `packages/core/package.json` |
| modify | `packages/css/package.json` |
| modify | `packages/tokens/package.json` |
| modify | `packages/assets/package.json` |
| modify | `packages/playwright/package.json` |
| modify | `libs/output-target-angular/package.json` |
| modify | `libs/output-target-web/package.json` |
| modify | `libs/eslint-plugin/package.json` |
| modify | `docs/package.json` |
| delete | `nx.json` |
| delete | `project.json` (root) |
| delete | `docs/project.json` |
| delete | `packages/core/project.json` |
| delete | `packages/css/project.json` |
| delete | `packages/tokens/project.json` |
| delete | `packages/assets/project.json` |
| delete | `packages/playwright/project.json` |
| delete | `libs/output-target-angular/project.json` |
| delete | `libs/output-target-web/project.json` |
| delete | `libs/eslint-plugin/project.json` |

---

## Phase 1 — Install Turborepo

- [ ] Install turbo as a root devDependency:
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
    "optimize": {
      "inputs": ["src/**/svg/*.svg"],
      "outputs": ["src/**/svg.ts", "src/**/svg.json"]
    }
  }
}
```

- [ ] Create `turbo.json` at the workspace root with the content above.

---

## Phase 3 — Fix Broken Executors and Create Remaining Scripts

> ⚠ **Do these first** — `@baloise/ds-nx:build-docs` and `@baloise/ds-nx:build-core` are broken because `libs/nx` was deleted. Builds are non-functional until these are resolved.

### 3.1 `build-core` (URGENT — broken)

The `build-core` executor: fetched contributors from GitHub, ran `stencil build`, then cleaned up stray output folders. Tag generation has already been moved into the Stencil rollup plugin (`buildStart` hook in `stencil.config.ts`), so the script only needs to handle contributors + stencil invocation + cleanup.

- [ ] Create `scripts/build-core.mjs`:
  - Fetch contributors from GitHub API → write to `resources/data/contributors.json` (with fallback)
  - Run `stencil build` via `child_process.execSync` from `packages/core/`
  - Remove `packages/core/icons/` and `packages/core/playwright/` if present (cleanup)
- [ ] Update `packages/core/project.json` `build` target:
  ```json
  "build": {
    "command": "node ../../scripts/build-core.mjs",
    "options": { "cwd": "{projectRoot}" }
  }
  ```

### 3.2 `build-docs` (URGENT — broken, script already exists)

`scripts/build-docs.mjs` already exists. Only the project.json wiring is missing.

- [ ] Update `docs/project.json`:
  - Replace `executor: "@baloise/ds-nx:build-docs"` on both `build` and `prepare` targets with `command: "node ../scripts/build-docs.mjs"` (and `command: "node ../scripts/build-docs.mjs --serve"` for the `prepare`/start target)

---

## Phase 4 — Replace Remaining Nx Executors with Inline Commands

These packages only need simple commands — no script file needed. Replace their executor-based targets with `command:` entries in `project.json` (temporary, until project.json files are deleted in Phase 6) and add the scripts to each `package.json`.

### `packages/css`

Already has `"build": "node --import tsx/esm src/build.ts"` in `package.json`. Only needs the project.json build target updated from `nx:run-commands` to `command:`.

- [ ] `packages/css/project.json` — change build target to:
  ```json
  "build": {
    "command": "node --import tsx/esm src/build.ts",
    "options": { "cwd": "{projectRoot}" }
  }
  ```

### `packages/tokens`

Already has `"build": "npx tsc && node dist/out-tsc"` in `package.json`. Update project.json.

- [ ] `packages/tokens/project.json` — change build target to:
  ```json
  "build": {
    "command": "npm run build",
    "options": { "cwd": "{projectRoot}" }
  }
  ```

### `packages/playwright`

- [ ] Add `"build": "swc src -d dist --config-file .swcrc"` to `packages/playwright/package.json`.
- [ ] `packages/playwright/project.json` — change build target to:
  ```json
  "build": {
    "command": "npm run build",
    "options": { "cwd": "{projectRoot}" }
  }
  ```

### `packages/assets`

The rollup build compiles `src/index.ts` to `dist/`. Replace `@nx/rollup:rollup` with a direct rollup command. Check if a `rollup.config.mjs` already exists; if not, create a minimal one.

- [ ] Add `"build": "rollup -c rollup.config.mjs"` to `packages/assets/package.json`.
- [ ] `packages/assets/project.json` — change build target to `command: "npm run build"`.
- [ ] Remove `nx-release-publish` target (publishing handled by changesets).

### `libs/output-target-angular`

- [ ] Add `"build": "tsc -p tsconfig.lib.json"` to `libs/output-target-angular/package.json`.
- [ ] Add `"test": "vitest --run"` to `libs/output-target-angular/package.json`.
- [ ] Update `project.json` targets to `command: "npm run build"` and `command: "npm run test"`.

### `libs/output-target-web`

- [ ] Add `"build": "tsc -p tsconfig.lib.json"` to `libs/output-target-web/package.json`.
- [ ] Update `project.json` build target to `command: "npm run build"`.

### `libs/eslint-plugin`

- [ ] Add `"build": "tsc -p tsconfig.lib.json"` to `libs/eslint-plugin/package.json`.
- [ ] Add `"test": "vitest --run"` to `libs/eslint-plugin/package.json`.
- [ ] Update `project.json` targets to `command: "npm run build"` and `command: "npm run test"`.

---

## Phase 5 — Add `package.json` Scripts to Every Package

Turborepo discovers tasks from `package.json` scripts. Every workspace package needs the scripts it participates in.

| Package | Scripts to add |
| --- | --- |
| `packages/core` | `"build": "node ../../scripts/build-core.mjs"`, `"test": "vitest --run"`, `"test:ui": "vitest --ui"` |
| `packages/css` | already has `"build"` |
| `packages/tokens` | already has `"build"` |
| `packages/assets` | `"build": "rollup -c rollup.config.mjs"`, `"optimize": "node ../../scripts/build-svg.mjs"` |
| `packages/playwright` | `"build": "swc src -d dist --config-file .swcrc"` |
| `libs/output-target-angular` | `"build": "tsc -p tsconfig.lib.json"`, `"test": "vitest --run"` |
| `libs/output-target-web` | `"build": "tsc -p tsconfig.lib.json"` |
| `libs/eslint-plugin` | `"build": "tsc -p tsconfig.lib.json"`, `"test": "vitest --run"` |
| `docs` | already has `"build"` and `"start"` |

---

## Phase 6 — Update Root `package.json` Scripts

Replace all `npx nx run ...` and `npx nx run-many ...` with `turbo run ...` (or direct node calls for workspace-level scripts).

| Old | New |
| --- | --- |
| `npx nx run-many -t build` | `turbo run build` |
| `npx nx run-many -t test -- --watch=false` | `turbo run test` |
| `npx nx run-many -t lint` | `turbo run lint` |
| `npx nx run-many -t optimize` | `turbo run optimize` |
| `npx nx run core:start` | `cd packages/core && stencil build --dev --serve --watch` |
| `npx nx run docs:start` | `node scripts/build-docs.mjs --serve` |
| `npx nx run tokens:build` | `turbo run build --filter=@baloise/ds-tokens` |
| `npx nx run styles:build` | `turbo run build --filter=@baloise/ds-css` |
| `npx nx run changeset` | `node scripts/create-changeset.mjs` |
| `npx nx run core:e2e-ui` | `cd packages/core && npx playwright test --ui` |
| `npx nx reset && ...` | `turbo run build --force` |

- [ ] Update all scripts in root `package.json`.
- [ ] Remove all `npx nx reset` patterns.

---

## Phase 7 — Remove Nx

- [ ] Delete `nx.json`.
- [ ] Delete `project.json` (root).
- [ ] Delete all package-level `project.json` files (listed in file map).
- [ ] Uninstall Nx packages:
  ```bash
  npm uninstall nx @nx/angular @nx/eslint @nx/js @nx/playwright @nx/rollup @nx/vite @nx/workspace @nx/vitest
  ```
- [ ] Remove any remaining `npx nx` references from docs, CI scripts, and `CLAUDE.md`.

---

## Phase 8 — TypeScript Path Aliases

Nx was not resolving TypeScript paths at runtime — that is handled by `tsconfig.base.json` which Stencil, Vite, and the TS compiler all read directly. No changes expected, but verify after Nx is removed.

- [ ] Run `tsc --noEmit -p tsconfig.base.json` to confirm path aliases compile cleanly.
- [ ] Run each package's build individually to ensure cross-package imports resolve.

---

## Phase 9 — CI/CD Updates

- [ ] Update `.github/workflows/` to replace `npx nx ...` with `npx turbo run ...`.
- [ ] Optionally enable Vercel Remote Cache:
  ```bash
  TURBO_TOKEN=<token> TURBO_TEAM=<team> turbo run build
  ```
- [ ] Remove any Nx Cloud token / Nx Cloud references from CI env vars.

---

## Phase 10 — Validation

- [ ] `turbo run build` — all packages build in correct order.
- [ ] `turbo run test` — all Vitest unit tests pass.
- [ ] `turbo run lint` — all ESLint checks pass.
- [ ] Second `turbo run build` — cache hits for all unchanged packages.
- [ ] `npm start` — Stencil dev server starts correctly.
- [ ] `npm run docs` — Storybook starts correctly.
- [ ] `npm run e2e` — Playwright tests pass.
- [ ] `npm run optimize` — SVG optimization runs cleanly.

---

## Risk Register

| Risk | Mitigation |
| --- | --- |
| `@baloise/ds-nx:build-docs` and `@baloise/ds-nx:build-core` are broken right now | Phase 3 is marked URGENT — do before anything else |
| `@nx/js:tsc` executor options (e.g. `assets`) may not map 1:1 to plain `tsc` | Check each `project.json` for non-standard options; replicate in `tsconfig.lib.json` or a copy step |
| `@nx/rollup:rollup` may have custom options for the assets build | Read the existing executor options carefully before writing the rollup config |
| Turborepo task graph is simpler than Nx's project graph | Explicit `dependsOn` in `turbo.json` covers all current patterns; no Nx-specific graph features are used |
| Nx plugins auto-detected lint/test tasks that might be missed | Audit `nx show projects --verbose` before removing Nx; ensure every inferred target has an explicit replacement |
| `nx release` wired to release pipeline | Changesets (`npm run changeset`) is already the source of truth — confirm CI uses changesets directly |
