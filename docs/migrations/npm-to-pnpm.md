# Migration: npm → pnpm (`next` branch)

Step-by-step plan to move the `next` branch from npm to pnpm. The LTS line on
`main` **stays on npm** and is explicitly out of scope.

> **Do not commit anything.** Leave all changes unstaged for review.

## Decisions (locked in)

| Topic | Decision |
| --- | --- |
| Internal deps | Keep **exact pinned versions** (e.g. `@baloise/ds-core: 20.0.0-next.4`); **do not** introduce the `workspace:` protocol. Requires `link-workspace-packages: true`. |
| pnpm version | Pin **exactly** in root `packageManager`, latest pnpm **10.x** (confirm exact patch when generating the lockfile). |
| `packageManager` scope | **Root `package.json` only**; sub-packages untouched. |
| Workspace definition | Create `pnpm-workspace.yaml` mirroring today's globs (`packages/*`, `libs/*`, `docs`); `packages/core/components` stays **out** (unchanged). Remove the `workspaces` field from root `package.json`. |
| Registry | Generate lockfile against **public `registry.npmjs.org`**; commit a minimal `.npmrc` pinning it. No post-hoc rewrite (the old `registry` script is already removed). |
| CI install | `pnpm/action-setup@v4` (version from `packageManager`) → `setup-node` with `cache: 'pnpm'` → `pnpm install --frozen-lockfile`. |
| Workflows converted | `continuous.yml`, `prepare-release.yml`, `release.yml`, `screenshots.yml`, `snapshot.yml`, and the shared `actions/setup-environment`. |
| LTS workflows | `lts-continuous.yml`, `lts-prepare-release.yml`, `lts-release.yml` stay on **npm** (trigger only on `main`; dormant on `next`). |
| Script bodies | `npm --prefix <dir> run X` → `pnpm --filter <pkg> X`; `npm run X` → `pnpm X`; `npx <bin>` → `pnpm exec <bin>`. |
| Docs | Convert **contributor/dev commands** only. **Leave consumer install snippets as npm** (`npm install @baloise/...`, `npx ng add ...`). Include `.claude/skills/*`. |
| pnpm 10 build scripts | Allowlist legitimate dependency build scripts in `onlyBuiltDependencies` after the first install. |
| Enforcement | Add root `preinstall: "npx only-allow pnpm"` guard. |
| Deliverable | This document. Execution is a separate, later step. |

### ⚠️ Shared-action caveat

`actions/setup-environment` is referenced by both pnpm workflows and the LTS
release workflows. On `next` we convert it to pnpm; the `lts-*` files on `next`
are **dormant** (they only trigger on `main`), so this is safe — **but do not
merge the pnpm version of `setup-environment` into `main`** until LTS itself is
migrated.

---

## Phase 1 — Package manager & workspace config

- [ ] In root `package.json`, set `packageManager` to `pnpm@10.<latest>` (exact patch).
- [ ] Remove the `workspaces` array from root `package.json`.
- [ ] Create `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - 'packages/*'
    - 'libs/*'
    - 'docs'

  linkWorkspacePackages: true
  # onlyBuiltDependencies populated in Phase 4
  ```
- [ ] Create root `.npmrc` pinning the public registry:
  ```ini
  registry=https://registry.npmjs.org/
  ```
- [ ] Add the enforcement guard to root `package.json` scripts:
  ```json
  "preinstall": "npx only-allow pnpm"
  ```

## Phase 2 — Convert package.json script bodies

- [ ] Root `package.json` — delegation scripts:
      `npm --prefix packages/core run <x>` → `pnpm --filter @baloise/ds-core <x>`
      (`start`, `start-two`, `play`, `play:file`, `play:a11y`, `play:components`,
      `play:visual`, `play:update`, `play:ci`).
- [ ] Root `start:force`: `... && npm run start` → `... && pnpm start`.
- [ ] Root `format` / `format:check`: `npx prettier ...` → `pnpm exec prettier ...`.
- [ ] `packages/core/package.json`: `npx playwright ...` → `pnpm exec playwright ...` (all `play*` scripts).
- [ ] `packages/tokens/package.json`: `npx tsc ...` → `pnpm exec tsc ...`.
- [ ] Grep for any remaining `npm run` / `npx ` in all `package.json` files and convert.

## Phase 3 — Generate the lockfile

- [ ] Ensure the local shell uses the **public** registry (so the committed lockfile is portable).
- [ ] Run `pnpm install` to generate `pnpm-lock.yaml`.
- [ ] Delete `package-lock.json`.

## Phase 4 — Resolve pnpm 10 blocked build scripts

- [ ] Review the "Ignored build scripts" warning from the Phase 3 install.
- [ ] Add the legitimate ones (e.g. `esbuild`, `playwright` / `@playwright/*`,
      `@swc/core`, `core-js`, `nx`, …) to `onlyBuiltDependencies` in `pnpm-workspace.yaml`.
- [ ] Re-run `pnpm install` and confirm no needed build script is skipped.

## Phase 5 — CI workflows (convert to pnpm)

- [ ] `actions/setup-environment/action.yml`:
  - [ ] Add `pnpm/action-setup@v4` (no version input — reads `packageManager`) **before** `setup-node`.
  - [ ] Change `actions/setup-node@v6` cache from `'npm'` → `'pnpm'`.
  - [ ] Confirm the `.npmrc` creation step (publish token) still works under pnpm.
- [ ] `continuous.yml`: `npm ci` → `pnpm install --frozen-lockfile`; other `npm run x` → `pnpm x`.
- [ ] `prepare-release.yml`: same conversions.
- [ ] `release.yml`: same conversions (publish step uses pnpm).
- [ ] `screenshots.yml`: same conversions.
- [ ] `snapshot.yml`: same conversions.
- [ ] **Do not touch** `lts-continuous.yml`, `lts-prepare-release.yml`, `lts-release.yml`.
- [ ] Leave `create-issue-branch.yml` and `security.yml` (no npm references) untouched.

## Phase 6 — Documentation (contributor commands only)

Convert dev/build/test commands (`npm run …`, `npm ci`, `npm start`, `npm test`) → pnpm.
**Leave consumer install snippets as npm.**

- [ ] `CLAUDE.md` (Commands section).
- [ ] `DEVELOPMENT.md`.
- [ ] `CONTRIBUTING.md`.
- [ ] `ARCHITECTURE.md`.
- [ ] `STYLE_GUIDE.md`.
- [ ] `.github/copilot-instructions.md`.
- [ ] `docs/src/contributing.mdx` — **dev-workflow commands only**; keep the
      snapshot consumer-install snippet (`npm install @baloise/ds-core@…`) as npm.
- [ ] `docs/src/development/00-guides/*.mdx` — dev commands only; **keep**
      `npm install @baloise/ds-*` / `npm add` / `npx ng add` consumer snippets in
      `00-getting-started.mdx`, `04-assets.mdx`, `05-styles.mdx`.
- [ ] `README.md` — keep the consumer `npm install @baloise/ds-core` snippet.
- [ ] `.claude/skills/*` (`ds-create-component`, `ds-create-token`,
      `ds-document-component`, `ds-test-component`) — convert repo dev commands to pnpm.
- [ ] Review `libs/CONTEXT.md`, `packages/tokens/CONTEXT.md`,
      `packages/core/src/utils/property-decorators/MIGRATION.md`,
      `docs/security/incident-response-runbook.md`, `SECURITY.md`, `SKILLS.md` and
      convert only repo dev commands (keep consumer/incident-response references intact).

## Phase 7 — Verify

- [ ] `pnpm install --frozen-lockfile` succeeds (lockfile is in sync).
- [ ] `pnpm build` succeeds.
- [ ] `pnpm test` passes.
- [ ] `pnpm lint` passes.
- [ ] `pnpm exec playwright …` / `pnpm play:ci` works (confirms build-scripts allowlist).
- [ ] `npm install` fails fast with the `only-allow pnpm` message.
- [ ] Push the branch and confirm the converted workflows go green.

## Out of scope / notes

- LTS (`main`) stays on npm — do not migrate or merge `setup-environment`'s pnpm
  version into `main` yet.
- `.nvmrc` (`lts/krypton`) vs `engines` (`node >=24 <25`) is a pre-existing
  mismatch — not part of this migration.
- Changesets config (`.changeset/config.json`) needs no changes: pinned internal
  versions + `fixed: ["@baloise/ds-*"]` continue to work as-is.
