# 9. React and Angular integration apps move to `apps/`, become normal workspace members

Package: `apps/integration-react`, `apps/integration-angular`

Date: 2026-08-02

## Status

Accepted. Supersedes [ADR-0004](0004-react-smoke-test-app-outside-workspace.md).

## Context

`test/react/v19` and `test/angular/v22` were generated on demand by
`build.sh` from a two-layer template (`base/app` shared shell +
`base/vNN` version overlay), gitignored, and deliberately kept outside
the pnpm workspace — resolving `@baloise/ds-react`/`@baloise/ds-angular`
via `pnpm link` against built `dist/` output rather than the workspace
protocol, to simulate a real npm-installed consumer (see ADR-0004).

That protection came at a real cost: a separate lockfile and
`node_modules` per app, an explicit `link.sh` step to wire up
`@baloise/ds-core`/`ds-css`/`ds-assets`/`ds-tokens` by hand, and a
scaffold-then-link-then-start dance (`build.sh` + `start.sh`) neither
`pnpm install` nor `turbo` know about. Since only the latest version of
each framework is ever supported (no version matrix to test against),
the templating layer this complexity was partly justified by
(swappable version overlays) also serves no purpose.

## Decision

`test/react` and `test/angular` are deleted. In their place,
`apps/integration-react` and `apps/integration-angular` are permanent,
git-tracked, ordinary workspace packages (named `integration-react` /
`integration-angular`), registered under the same `apps/*` workspace
glob as `apps/storybook`. They depend on `@baloise/ds-react` /
`@baloise/ds-angular` via `workspace:*`, resolved the normal pnpm way —
no `build.sh`, no `link.sh`, no per-app lockfile. Their Playwright e2e
suites are exposed as a `play:run` script in each package's
`package.json` — deliberately not named `test`, so the generic
`turbo run test` (run by every PR's CI job) doesn't pick them up.
Each app's e2e suite is invoked explicitly by its own dedicated CI job
(`react`/`angular` in `continuous.yml`), which builds the app first,
then runs `pnpm run play:run`.

## Consequences

- We lose the packaging-shape smoke test ADR-0004 was written for:
  workspace-protocol resolution won't catch a broken `exports` map, a
  dependency that should have been a `peerDependency`, or a file
  missing from `files:`. That's accepted as a residual risk, not
  covered by these apps anymore — the day-to-day cost of the separate
  lockfile/link step outweighed the bugs it caught in practice.
- Bumping the supported React/Angular version is now a normal
  dependency bump in `apps/integration-react/package.json` or
  `apps/integration-angular/package.json`, not a new `base/vNN`
  overlay + build.sh regeneration.
- CI no longer needs a "scaffold and link" step before installing
  Playwright browsers and running tests — `pnpm install
--frozen-lockfile` at the repo root is sufficient.
