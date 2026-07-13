# Migration: npm → pnpm (`next` branch)

Step-by-step plan to move the `next` branch from npm to pnpm. The LTS line on
`main` **stays on npm** and is explicitly out of scope.

> **Do not commit anything.** Leave all changes unstaged for review.

## Decisions (locked in)

| Topic                  | Decision                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Internal deps          | Keep **exact pinned versions** (e.g. `@baloise/ds-core: 20.0.0-next.4`); **do not** introduce the `workspace:` protocol. Requires `link-workspace-packages: true`.                                   |
| pnpm version           | Pin **exactly** in root `packageManager`, latest pnpm **10.x** (confirm exact patch when generating the lockfile).                                                                                   |
| `packageManager` scope | **Root `package.json` only**; sub-packages untouched.                                                                                                                                                |
| Workspace definition   | Create `pnpm-workspace.yaml` mirroring today's globs (`packages/*`, `libs/*`, `docs`); `packages/core/components` stays **out** (unchanged). Remove the `workspaces` field from root `package.json`. |
| Registry               | Generate lockfile against **public `registry.npmjs.org`**; commit a minimal `.npmrc` pinning it. No post-hoc rewrite (the old `registry` script is already removed).                                 |
| CI install             | `pnpm/action-setup@v4` (version from `packageManager`) → `setup-node` with `cache: 'pnpm'` → `pnpm install --frozen-lockfile`.                                                                       |
| Workflows converted    | `continuous.yml`, `prepare-release.yml`, `release.yml`, `screenshots.yml`, `snapshot.yml`, and the shared `actions/setup-environment`.                                                               |
| LTS workflows          | `lts-continuous.yml`, `lts-prepare-release.yml`, `lts-release.yml` stay on **npm** (trigger only on `main`; dormant on `next`).                                                                      |
| Script bodies          | `npm --prefix <dir> run X` → `pnpm --filter <pkg> X`; `npm run X` → `pnpm X`; `npx <bin>` → `pnpm exec <bin>`.                                                                                       |
| Docs                   | Convert **contributor/dev commands** only. **Leave consumer install snippets as npm** (`npm install @baloise/...`, `npx ng add ...`). Include `.claude/skills/*`.                                    |
| pnpm 10 build scripts  | Allowlist legitimate dependency build scripts in `onlyBuiltDependencies` after the first install.                                                                                                    |
| Enforcement            | Add root `preinstall: "npx only-allow pnpm"` guard.                                                                                                                                                  |
| Deliverable            | This document. Execution is a separate, later step.                                                                                                                                                  |

### ⚠️ Shared-action caveat

`actions/setup-environment` is referenced by both pnpm workflows and the LTS
release workflows. On `next` we convert it to pnpm; the `lts-*` files on `next`
are **dormant** (they only trigger on `main`), so this is safe — **but do not
merge the pnpm version of `setup-environment` into `main`** until LTS itself is
migrated.

---

## Phase 1 — Package manager & workspace config

- [x] In root `package.json`, set `packageManager` to `pnpm@10.34.4` (exact patch).
- [x] Remove the `workspaces` array from root `package.json`.
- [x] Create `pnpm-workspace.yaml`:

  ```yaml
  packages:
    - 'packages/*'
    - 'libs/*'
    - 'docs'

  linkWorkspacePackages: true
  # onlyBuiltDependencies populated in Phase 4
  ```

- [x] Create root `.npmrc` pinning the public registry:
  ```ini
  registry=https://registry.npmjs.org/
  ```
- [x] Add the enforcement guard to root `package.json` scripts:
  ```json
  "preinstall": "npx only-allow pnpm"
  ```

## Phase 2 — Convert package.json script bodies

- [x] Root `package.json` — delegation scripts:
      `npm --prefix packages/core run <x>` → `pnpm --filter @baloise/ds-core <x>`
      (`start`, `start-two`, `play`, `play:file`, `play:a11y`, `play:components`,
      `play:visual`, `play:update`, `play:ci`).
- [x] Root `start:force`: `... && npm run start` → `... && pnpm start`.
- [x] Root `format` / `format:check`: `npx prettier ...` → `pnpm exec prettier ...`.
- [x] `packages/core/package.json`: `npx playwright ...` → `pnpm exec playwright ...` (all `play*` scripts).
- [x] `packages/tokens/package.json`: `npx tsc ...` → `pnpm exec tsc ...`.
- [x] Grep confirmed no remaining `npm --prefix` / `npm run` / `npx ` in any
      `package.json` (only the intentional `npx only-allow pnpm` preinstall guard).

## Phase 3 — Generate the lockfile

- [x] Ensure the local shell uses the **public** registry (so the committed lockfile is portable).
- [x] Run `pnpm install` to generate `pnpm-lock.yaml`.
- [x] Delete `package-lock.json`.
- [x] Verified internal `@baloise/ds-*` deps link locally (symlinks, not registry fetches)
      and `pnpm install --frozen-lockfile` passes.

## Phase 4 — Resolve pnpm 10 blocked build scripts

- [x] Review the "Ignored build scripts" warning from the Phase 3 install.
      Blocked: `@parcel/watcher`, `@swc/core`, `esbuild`, `libxmljs2`.
- [x] Added all four to `onlyBuiltDependencies` in `pnpm-workspace.yaml`.
- [x] Re-ran `pnpm install`; all four build scripts ran successfully, no remaining
      ignored-builds warning.

## Phase 5 — CI workflows (convert to pnpm)

- [x] `actions/setup-environment/action.yml`:
  - [x] Add `pnpm/action-setup@v4` (no version input — reads `packageManager`) **before** `setup-node`.
  - [x] Change `actions/setup-node@v6` cache from `'npm'` → `'pnpm'`.
  - [x] `.npmrc` creation step (publish token) unchanged — still needed for `pnpm publish` registry auth.
- [x] `continuous.yml`: `npm ci` → `pnpm install --frozen-lockfile`; `npm run x` → `pnpm x`;
      `npm audit` → `pnpm audit`; `npx turbo`/`npx playwright` → `pnpm exec …`; SBOM → cdxgen.
- [x] `prepare-release.yml`: `npm ci` → `pnpm install --frozen-lockfile` (changesets/action auto-detects pnpm).
- [x] `release.yml`: install/audit/build/SBOM converted; publish → `pnpm -r publish … --no-git-checks`;
      commit step now adds `pnpm-lock.yaml` instead of `package-lock.json`.
- [x] `screenshots.yml`: install + `npx turbo`/`npx playwright` converted.
- [x] **Do not touch** `lts-continuous.yml`, `lts-prepare-release.yml`, `lts-release.yml` (verified still npm).
- [x] Leave `create-issue-branch.yml` and `security.yml` (no npm references) untouched.
- [x] Build-helper scripts: `scripts/create-changeset.mjs`, `build-docs.mjs`, `build-core.mjs`
      `npx …` → `pnpm exec …`.
- [x] **Vercel deployment** (`vercel.json`): `installCommand` → `pnpm install --frozen-lockfile`,
      `buildCommand` → `pnpm build`. (Vercel honors `packageManager` via Corepack + the
      committed `.npmrc`; `onlyBuiltDependencies` carries over.)
- [x] `.prettierignore`: `package-lock.json` → `pnpm-lock.yaml`.
- [x] `packages/core/playwright.config.mts`: local `webServer` command `npm run start` → `pnpm start`.
- [x] `packages/css/src/build.ts`: dev-hint message `npm run tokens` → `pnpm tokens`.
- [x] **Left as npm (consumer install):** `docs/.storybook/blocks/ComponentPageObject.tsx`
      (`npm install @baloise/ds-playwright`) — shown to package consumers, per Phase 6 rule.

### Phase 5 decisions

- **SBOM tool:** `@cyclonedx/cyclonedx-npm` (reads npm's lockfile) replaced with
  **`@cyclonedx/cdxgen`** (reads `pnpm-lock.yaml`). devDependency swapped; command is
  `pnpm exec cdxgen -t pnpm -o sbom.cdx.json`. Smoke-tested locally → valid CycloneDX
  (specVersion **1.7**, 1212 components). ⚠️ Verify `advanced-security/sbom-report-action@v1`
  accepts CycloneDX 1.7; pin `--spec-version 1.6` if not.
- **Publish:** `npm publish --workspaces --tag X` → `pnpm -r publish --tag X --no-git-checks`
  (`--no-git-checks` is required because the release flow modifies each `package.json` for
  SBOM bundling before publishing).
- **`snapshot.yml` — OUT OF SCOPE** (per decision). Left on npm. It has **two pre-existing
  problems** to fix in a separate PR, independent of pnpm:
  1. References composite actions that **don't exist** (`actions/setup`, `actions/release-setup`).
  2. `npm version --workspaces` (line 73) **no longer works** now that the root `workspaces`
     field is removed — npm can't see the workspaces. Needs a pnpm/changesets-snapshot replacement.

## Phase 6 — Documentation (contributor commands only)

Convert dev/build/test commands (`npm run …`, `npm ci`, `npm start`, `npm test`) → pnpm.
**Leave consumer install snippets as npm.**

- [x] `CLAUDE.md` (Commands section). Single-test example → `pnpm --filter <project> test`.
- [x] `DEVELOPMENT.md`. Also updated the **pnpm** prerequisite (was `npm >=11`) and the
      troubleshooting reinstall block (`rm -rf node_modules pnpm-lock.yaml`).
      `npm run publish` → **`pnpm run publish`** (kept `run` — `pnpm publish` is a built-in).
- [x] `CONTRIBUTING.md`.
- [x] `ARCHITECTURE.md`. Consumer snapshot-install line (445) kept as npm.
- [x] `STYLE_GUIDE.md`.
- [x] `.github/copilot-instructions.md`.
- [x] `docs/src/contributing.mdx` & `docs/src/development/00-guides/*.mdx`: verified they
      contain **no contributor commands** — only consumer `npm install/add @baloise/*`
      snippets, intentionally **left as npm**.
- [x] `README.md` — consumer `npm install @baloise/ds-core` snippet kept as npm.
- [x] `.claude/skills/*` (`ds-create-component`, `ds-create-token`,
      `ds-document-component`, `ds-test-component`) — repo dev commands converted
      (incl. `.js`/`README`/`REFERENCE`/`SKILL` files).
- [x] `libs/CONTEXT.md`, `packages/tokens/CONTEXT.md`,
      `docs/security/incident-response-runbook.md`, `SECURITY.md`, `SKILLS.md` — dev
      commands converted; npm-registry prose (publishing, downloads) left intact.
- [x] **`SECURITY.md`** SBOM section updated to pnpm: `pnpm-lock.yaml`, `pnpm audit`,
      `pnpm list`, and the `cdxgen` command.
- [x] `docs/.storybook/blocks/ComponentPageObject.tsx` consumer install **left as npm**.
- [ ] **Intentionally NOT changed:** `packages/core/src/utils/property-decorators/MIGRATION.md`
      — it is a **historical completed log** (`[x]` gates recording that `npm run build` was
      actually run at the time). Rewriting it would falsify the record. Left as-is.

## Phase 7 — Verify

- [x] `pnpm install --frozen-lockfile` succeeds (lockfile is in sync).
- [x] `pnpm build` succeeds (full turbo build + Storybook/docs — proves esbuild/swc/parcel
      build-script allowlist works).
- [x] `pnpm test` passes (11/11 turbo tasks).
- [x] `pnpm lint` passes (7/7 tasks; 1 pre-existing skipped-test warning, 0 errors).
- [x] Binaries resolve via `pnpm exec`: `playwright` 1.59.1, `turbo` 2.9.18, `cdxgen`.
      (Full Playwright visual suite not run locally — needs browsers + dev server; defer to CI.)
- [x] `npm install` is blocked: exits 1 and creates **no** `package-lock.json`.
      ⚠️ Note: it fails during npm's own tree-build (npm can't parse the pnpm workspace),
      _before_ reaching the `only-allow pnpm` preinstall, so the failure message is an npm
      internal error rather than the friendly guard message. Protection holds either way.
- [ ] Push the branch and confirm the converted workflows go green (CI — not done locally;
      no commit per instructions).

## Phase 7.1 — pnpm-strictness fix: undeclared `typescript`

pnpm's strict (non-hoisted) `node_modules` exposed a latent bug: several packages run bare
`tsc` in their build scripts but never declared `typescript`. Under npm's hoisting they
silently borrowed the root's `tsc`; under pnpm they don't, so `tsc` resolved to whatever
was on `PATH` (a global/newer TypeScript), which failed with **TS5103 — Invalid value for
`--ignoreDeprecations`**. (The failure was environment-dependent: machines without a global
`tsc` fell back to the root 5.6.3 and passed, which is why CI/some devs saw it and others
didn't.)

- [x] Added `"typescript": "5.6.3"` (matching root) as a `devDependency` to:
      `libs/output-target-web`, `libs/output-target-angular`, `libs/eslint-plugin`,
      `packages/tokens`.
- [x] `pnpm install` → each package now has a deterministic local `node_modules/.bin/tsc` 5.6.3.
- [x] `pnpm build:force` → **9/9 tasks, 0 cached** (verified the fix without cache masking).
- [x] **Closed the same latent pattern for `eslint` and `vitest`** (added with `pnpm add -D -E`,
      exact versions matching root):
  - `eslint@10.5.0` → `docs`, `@baloise/ds-core`, `@baloise/ds-playwright`, `@baloise/ds-tokens`,
    `libs-eslint-plugin`, `libs-output-target-angular`, `libs-output-target-web` (7 packages).
  - `vitest@4.1.9` → `@baloise/ds-core`, `@baloise/ds-playwright`, `libs-eslint-plugin`,
    `libs-output-target-angular` (4 packages).
  - (`packages/css`, `packages/assets` run neither bare — left untouched.)
- [x] Re-scan confirms **no** package runs bare `eslint`/`vitest`/`tsc` without declaring it.
- [x] Forced verification (no cache): `lint` 7/7, `test` 11/11, `build` 9/9; `--frozen-lockfile` in sync.

## Out of scope / notes

- LTS (`main`) stays on npm — do not migrate or merge `setup-environment`'s pnpm
  version into `main` yet.
- `.nvmrc` (`lts/krypton`) vs `engines` (`node >=24 <25`) is a pre-existing
  mismatch — not part of this migration.
- Changesets config (`.changeset/config.json`) needs no changes: pinned internal
  versions + `fixed: ["@baloise/ds-*"]` continue to work as-is.
