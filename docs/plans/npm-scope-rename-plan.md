# Plan: rename npm packages `@baloise/ds-*` → `@helvetia-design/*`

## Context

This repo (`next` branch) publishes 8 npm packages under the `@baloise/ds-*` scope/prefix,
currently on the `20.0.0-next.9` prerelease line (changesets "pre" mode, tag `next`):

| current name | package dir |
|---|---|
| `@baloise/ds-core` | `packages/core` |
| `@baloise/ds-angular` | `packages/angular` |
| `@baloise/ds-playwright` | `packages/playwright` |
| `@baloise/ds-styles` | `packages/styles` |
| `@baloise/ds-ag-grid` | `packages/ag-grid` |
| `@baloise/ds-assets` | `packages/assets` |
| `@baloise/ds-tokens` | `packages/tokens` |
| `@baloise/ds-react` | `packages/react` |

The **old** Baloise Design System (`main` branch, a separate ongoing product that still receives
its own fixes) publishes the *same package names* (`@baloise/ds-core` etc.) at `19.x` under the
`latest` npm dist-tag, via `.github/workflows/lts-release.yml` and `lts-prepare-release.yml`. This
plan does not touch `main` or those workflows — the old packages keep publishing as
`@baloise/ds-*` indefinitely.

Custom element tags in this repo are already `ds-*` (not `bal-*`) — this plan is **only** about the
npm package name/scope, not component tags.

There is an existing, not-yet-built plan (`docs/plans/ds-migrate-baloise-plan.md`) for a consumer
migration tool that assumed the new scope would be `@helvetia/ds-*`. That assumption is wrong and
gets corrected as part of this plan (see step 8).

## Decisions made

- **Scope: all 8 packages**, each losing its `ds-` infix: `@baloise/ds-core` →
  `@helvetia-design/core`, `@baloise/ds-angular` → `@helvetia-design/angular`, and so on 1:1 for
  `playwright`, `styles`, `ag-grid`, `assets`, `tokens`, `react`. Package directory names
  (`packages/core`, etc.) are already unprefixed and don't change.
- **npm org**: `@helvetia-design` is already owned/available — not a blocker.
- **Cutover: hard, this-branch-only.** Once merged, `next` branch releases stop publishing under
  `@baloise/ds-*` entirely (no dual-publish, no npm alias shims, no deprecation notice — the old
  name keeps living a separate life on `main`).
- **Repo/domain: explicitly out of scope.** GitHub repo stays `github.com/baloise/design-system`,
  `homepage`/`security` URLs stay `design.baloise.dev` / the `baloise/design-system` GitHub URL.
  Only npm package identity changes.
- **Versioning: reset to plain `0.0.0`, exit changesets pre mode.** No `-next.N` suffix. Delete
  `.changeset/pre.json` (equivalent of `changeset pre exit`); subsequent changesets bump normally
  (`0.0.1`, `0.1.0`, …) as an ordinary semver 0.x line. Intent: stay under `1.0.0` deliberately
  until the team is ready for a real 1.0.0 launch — not a temporary prerelease tag.
- **Dist-tag: `latest`.** Drop `--tag next` from the `pnpm -r publish` step in `release.yml` —
  `npm install @helvetia-design/core` resolves normally, as is standard for an actively-developed
  0.x package.
- **CI secret: add `NPM_HELVETIA_TOKEN`, don't touch `NPM_PUBLISH_TOKEN`.** `NPM_PUBLISH_TOKEN` is
  currently shared by both `release.yml` (this branch) and `lts-release.yml` (old `main`-branch
  releases) — splitting scopes means splitting the secret too. `release.yml`'s
  `setup-environment` call switches its `npm-token` input to `secrets.NPM_HELVETIA_TOKEN`;
  `lts-release.yml` is untouched. **User creates the `NPM_HELVETIA_TOKEN` GitHub Actions secret
  themselves** — not something this plan can do.
- **Changelog: split, don't rewrite history.** Copy current `CHANGELOG.md` content verbatim to a
  new `BALOISE_CHANGELOG.md`. Replace `CHANGELOG.md` with a fresh, empty changelog (just the
  standard changesets header) plus a one-line note linking to `BALOISE_CHANGELOG.md` for history
  predating the rename. Going forward, changesets writes new entries into the fresh
  `CHANGELOG.md` under the new package names.
- **Already-released changeset files (`.changeset/*.md` not tracked in `.changeset/pre.json`'s
  `changesets` list, plus anything already consumed) are left untouched** — they're historical
  record of what was actually published as `@baloise/ds-*` at the time.
- **Pending/unreleased changesets get their frontmatter package names updated** to the new scope,
  so the next `changeset version` run correctly bumps the renamed packages. (The ~46 pending
  `.changeset/*.md` files currently reference `@baloise/ds-*` in frontmatter; the `toky-update-*`
  ones reference an unrelated `toky` package and are untouched.)
- **Living docs get updated, changelog does not.** `README.md`, `SECURITY.md`, `AEM-with-DS.md`,
  `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, `docs/adr/*.md`, every `packages/*/CONTEXT.md`,
  and `apps/storybook/CONTEXT.md` get their `@baloise/ds-*` references (install snippets, CDN
  links, badges, prose) updated to `@helvetia-design/*` — these are current operational docs, not
  historical records.
- **`docs/plans/ds-migrate-baloise-plan.md` gets updated in place**, not deleted: its scope-name
  assumption (`@helvetia/ds-*`) and the ADR draft text it contains are corrected to
  `@helvetia-design/*` (no `ds-` infix), since nothing described in that plan has been built yet.
- **This must land as one atomic change**, not phased — pnpm workspace linking resolves by
  `package.json` `name` field and `workspace:*` protocol; a partially-renamed workspace would
  break `pnpm install`/builds mid-way. Single PR, single commit boundary for the mechanical
  rename.

## Implementation

### 1. Rename the 8 package identities

In each of the 8 `package.json` files (`packages/core`, `packages/angular`, `packages/playwright`,
`packages/styles`, `packages/ag-grid`, `packages/assets`, `packages/tokens`, `packages/react`):
- `"name"`: `@baloise/ds-X` → `@helvetia-design/X`
- `"version"`: → `"0.0.0"`
- Update any `dependencies`/`devDependencies`/`peerDependencies` entries referencing sibling
  packages by their old scoped name (e.g. `packages/react/package.json` likely depends on
  `@baloise/ds-core: workspace:*`) to the new name, keeping the `workspace:*` protocol.
- `packages/core/package.json` also has subpath exports referencing itself
  (`@baloise/ds-core/components`, `.../hydrate`) — update those too.

### 2. Exit changesets pre mode, reset the fixed group

- Delete `.changeset/pre.json` (equivalent to running `changeset pre exit`).
- `.changeset/config.json`: `"fixed": [["@baloise/ds-*"]]` → `"fixed": [["@helvetia-design/*"]]`.

### 3. Update pending changesets

For each pending `.changeset/*.md` file whose frontmatter references `@baloise/ds-*` (the ~46
files identified above, excluding `toky-update-*`), rewrite the frontmatter package names to
`@helvetia-design/*`. Leave changeset body prose as-is unless it names the old package
inline.

### 4. Split the changelog

- Copy current `CHANGELOG.md` → new `BALOISE_CHANGELOG.md` verbatim.
- Replace `CHANGELOG.md` with a fresh file: standard changesets top header + a short note:
  `> History prior to the @helvetia-design/* rename lives in [BALOISE_CHANGELOG.md](./BALOISE_CHANGELOG.md).`

### 5. Global mechanical rename of references

Find-and-replace `@baloise/ds-` → `@helvetia-design/` across the repo, **excluding**:
- `CHANGELOG.md` (now fresh, nothing to replace) and `BALOISE_CHANGELOG.md` (frozen copy)
- already-released/consumed `.changeset/*.md` entries (not in the pending list from step 3)

Files/areas known to need it (from repo scan, ~350+ files, all mechanical literal substitution —
package specifiers, not component APIs):
- `tsconfig.base.json` path mappings (`@baloise/ds-core`, `@baloise/ds-tokens`,
  `@baloise/ds-playwright` entries)
- Root `package.json` scripts — every `turbo run ... --filter=@baloise/ds-X` and
  `pnpm --filter @baloise/ds-X` invocation (`start`, `docs`, `app:react`, `app:angular`,
  `app:next`, `play*`, `build*`, `tokens`, `styles`, `assets`, `core`, etc.)
- `scripts/create-changeset.mjs` — `SCOPE_PACKAGE_MAP` object and its fallback default
- Source imports across `packages/core/src/**` (`.play.ts` test files import
  `@baloise/ds-playwright`), `packages/react/src/**`, `packages/angular/src/**`,
  `packages/styles/src/**`, `packages/tokens/src/**`
- `apps/storybook/**` (`.storybook/blocks/**`, `src/components/**/*.stories.ts`)
- `apps/integration-next/**`, `apps/integration-angular/**`, `apps/integration-react/**`
- `packages/core/vercel.json`, `packages/core/stencil.config.ts`,
  `packages/core/config/{generate-angular-meta.mjs,stencil.bindings.angular.ts,stencil.bindings.react.ts,docs-json-no-timestamp.ts}`
- `README.md` (npm badges, bundlephobia badge, `npm install` snippet, CDN `<link>`/`<script>`
  snippets), `SECURITY.md`, `AEM-with-DS.md`
- `docs/ARCHITECTURE.md`, `docs/DEVELOPMENT.md`, all `docs/adr/*.md` that reference the package
  name in current (non-historical-decision) context
- Every `packages/*/CONTEXT.md` and `apps/storybook/CONTEXT.md`
- `.github/workflows/screenshots.yml`, `.github/workflows/continuous.yml` (any `--filter=@baloise/ds-*`
  or install references)

### 6. Update `release.yml`

- `setup-environment` step: `npm-token: ${{ secrets.NPM_PUBLISH_TOKEN }}` →
  `npm-token: ${{ secrets.NPM_HELVETIA_TOKEN }}`.
- Publish step: `pnpm -r publish --tag next --no-git-checks` → `pnpm -r publish --no-git-checks`
  (drop `--tag next`, defaults to `latest`).
- Same tag removal in the dry-run preview step's `pnpm -r publish --tag next --dry-run ...` line.
- Leave `lts-release.yml` / `lts-prepare-release.yml` untouched.

### 7. Regenerate the lockfile

Run `pnpm install` after the rename so `pnpm-lock.yaml` reflects the new package names/workspace
links (required for the workspace to resolve at all post-rename).

### 8. Correct the migration-tooling plan doc

In `docs/plans/ds-migrate-baloise-plan.md`:
- Replace every `@helvetia/ds-*` reference (npm alias examples, ADR draft body, prose) with
  `@helvetia-design/*` (dropping the `ds-` infix to match the real new names, e.g.
  `"@helvetia-design/react": "npm:@baloise/ds-react@<version>"`).
- Update the "Context" section's framing — the rename is now planned/executed (via *this* plan),
  not "unscheduled."

### 9. `NPM_HELVETIA_TOKEN` secret (user action, not automatable)

Flag clearly in the PR description: repo owner must create the `NPM_HELVETIA_TOKEN` secret in
GitHub Actions settings (npm automation token scoped to publish under `@helvetia-design`) before
the next `release.yml` run.

## Verification

- `pnpm install` succeeds with no unresolved workspace references.
- `grep -rn "@baloise/ds-" --exclude-dir=node_modules --exclude-dir=dist .` returns only:
  `BALOISE_CHANGELOG.md`, already-released `.changeset/*.md` entries, and any intentionally-frozen
  historical text (e.g. ADRs describing past decisions, if any remain by design).
- `pnpm build`, `pnpm lint`, `pnpm test` all pass post-rename.
- `pnpm exec changeset status` reports the pending changesets against the new package names with
  no errors, and confirms pre mode is off (no `-next.N` versions proposed).
- `packages/core/package.json` (and the other 7) show `"name": "@helvetia-design/X"`,
  `"version": "0.0.0"`.
- `.changeset/pre.json` no longer exists; `.changeset/config.json`'s `fixed` group reads
  `@helvetia-design/*`.
- `release.yml` dry-run (`workflow_dispatch` with `dry-run: true`) shows the expected
  `@helvetia-design/*` package.json contents and a publish plan with no `--tag next`.
- Manual read-through of `README.md` install instructions and CDN snippets resolve to
  `@helvetia-design/*` paths.
