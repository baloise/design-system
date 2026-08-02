# Plan: move React/Angular test apps to `apps/integration-react` and `apps/integration-angular`

Status: ready for implementation. Nothing in this plan has been implemented or committed yet.

Related decision: [ADR-0009](../adr/0009-integration-apps-as-workspace-members.md)
(supersedes [ADR-0004](../adr/0004-react-smoke-test-app-outside-workspace.md))

## Scope

Replace `test/react/` and `test/angular/` — gitignored, template-generated,
outside-workspace smoke-test apps linked via `pnpm link` — with two
permanent, git-tracked, ordinary workspace packages:

- **`apps/integration-react`** (package name `integration-react`)
- **`apps/integration-angular`** (package name `integration-angular`)

Both become real members of the `apps/*` workspace glob (already added for
`apps/storybook`), depending on `@baloise/ds-react` / `@baloise/ds-angular`
via `workspace:*` instead of `pnpm link`. No more version-suffixed
directories, `base/` templates, or `build.sh`/`start.sh` scaffolding —
bumping the supported framework version is now a normal dependency bump.

Out of scope: `.github/workflows/lts-continuous.yml` (its `react`/`angular`
jobs use Cypress and a version matrix unrelated to today's `test/react`/
`test/angular`, and are not touched by this move).

## Steps

1. **Create the apps**
   - `apps/integration-react/`: move `test/react/base/app/*` (e2e/,
     src/, index.html, vite.config.ts, tsconfig*.json,
     eslint.config.js) and `test/react/base/v19/package.json` content,
     merged into one static `package.json` + source tree. Rename package
     to `"integration-react"`. Add `@baloise/ds-react`, `@baloise/ds-core`,
     `@baloise/ds-css` as `"workspace:*"` dependencies (previously
     resolved only via `pnpm link`, never declared).
   - `apps/integration-angular/`: same treatment from
     `test/angular/base/app/*` + `test/angular/base/v22/package.json`,
     package renamed to `"integration-angular"`.
   - Drop the per-app `pnpm-workspace.yaml` (`packages: []`) — these apps
     are now genuinely part of the root workspace.
   - Delete `scripts/link.sh` from both (no more manual linking needed).
   - Add a `play:run` script (Playwright) to each `package.json` —
     deliberately not named `test`, so the generic `turbo run test` (run
     by every PR's CI job) doesn't try to run it without a prior build.
     Each app's dedicated CI job builds it, then runs `pnpm run play:run`.

2. **Delete the old structure**
   - Remove `test/react/` and `test/angular/` entirely (`build.sh`,
     `start.sh`, `base/`), via `git rm`.

3. **Workspace/build config**
   - `apps/*` glob in `pnpm-workspace.yaml` already covers these (added
     for `apps/storybook`) — no further change needed there.
   - Root `.gitignore`: remove the `test/angular/*` / `test/react/*`
     allow-list block (lines excluding `base/`, `build.sh`, `start.sh`).

4. **Root `package.json` scripts**
   - Replace `react:app` / `angular:app` with `app:react` / `app:angular`,
     pointing at the new static apps (e.g. `pnpm --filter integration-react
     start`, `pnpm --filter integration-angular start`) — no more
     build-then-start two-step.

5. **CI — `.github/workflows/continuous.yml`**
   - `react` job: drop the `matrix: apps: [v19]` (single static app, no
     version matrix needed). Replace "Scaffold and link the smoke-test
     app" step with nothing (root `pnpm install --frozen-lockfile`
     already resolves it). Update `working-directory` from
     `test/react/${{ matrix.apps }}` to `apps/integration-react`, and the
     artifact path/name accordingly (drop the `-${{ matrix.apps }}`
     suffix).
   - `angular` job: same treatment, `working-directory` →
     `apps/integration-angular`.

6. **Leave alone**
   - `.github/workflows/lts-continuous.yml` — unrelated legacy
     Cypress-based pipeline, not touched.

7. **Verify**
   - `pnpm install` — confirm both apps resolve `@baloise/ds-react`/
     `@baloise/ds-angular` via the workspace protocol with no manual
     linking.
   - `pnpm app:react` / `pnpm app:angular` — confirm dev servers start.
   - `pnpm --filter integration-react play:run` / `pnpm --filter
     integration-angular play:run` — confirm e2e suites run (after
     building the app first).
   - `pnpm build` — confirm `turbo run build` builds these apps in
     dependency order after `@baloise/ds-core`/`ds-react`/`ds-angular`/
     `ds-css`.
   - Grep the repo for any remaining `test/react`, `test/angular`,
     `react:app`, `angular:app` references this plan missed.
