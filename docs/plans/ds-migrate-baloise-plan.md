# Plan: `@helvetia-design/skills` — `ds-migrate-from-baloise` skill (first step)

> Supersedes the previous version of this plan (plugin-based distribution, badge as the first
> component). Those decisions were revisited and replaced by the ones below. **Reinstated from
> the previous version**, after a second look: the 4-item top-level menu (Init / Components / CSS
> utils / Assets, with "coming soon" stubs) and the npm-alias coexistence strategy — both were
> initially dropped, then brought back.

## Context

The Helvetia Design System (this repo, `next` branch) is the successor to the Baloise Design
System (`main` branch). Custom elements were renamed (`bal-*` → `ds-*`), but the npm packages
have **not** been renamed yet — both still publish as `@baloise/ds-core`, `@baloise/ds-react`,
`@baloise/ds-angular`, `@baloise/ds-styles` (old at `19.10.2`, new at `20.0.0-next.9`). The plan
is for the new packages to eventually publish under the **`@helvetia-design` npm scope**
(dropping the `ds-` infix per package, e.g. `@baloise/ds-core` → `@helvetia-design/core`) — see
`docs/plans/npm-scope-rename-plan.md` for that rename's own plan. That rename hasn't landed yet
and is an external prerequisite to this plan, not something it performs.

There is no tooling today to help consuming React/Angular/HTML applications adopt the new DS
component-by-component. This plan builds a Claude Code skill, `ds-migrate-from-baloise`,
distributed via a new npm package `@helvetia-design/skills`, that consumers install into their own
project with a one-shot CLI command. The skill:

1. Wires the new `@helvetia-design/*` packages into a consumer app **alongside**, not instead of, the
   existing `@baloise/ds-*` setup ("bootstrap/init").
2. Finds and (with confirmation) rewrites `bal-spinner` usages to `ds-spinner` across
   React/Angular/HTML source, as the template for migrating further components later
   ("bal-spinner").

Reference material read to build this plan:
- `packages/core/src/components/spinner/spinner.tsx` + `spinner.interfaces.ts` (new, `next`) vs.
  `origin/main:packages/core/src/components/bal-spinner/bal-spinner.tsx` +
  `bal-spinner.interfaces.ts` (old) — full prop diff, see table below.
- `packages/react/src/generated/components.ts` — confirms the new React wrapper export is
  `DsSpinner`.
- `README.md` (this repo) / `origin/main:README.md` — current install snippets for both DS
  versions (CSS `<link>` + JS `<script>` module, `@baloise/ds-styles` + `@baloise/ds-core`).
- `packages/playwright/package.json` — build/publish template this new package follows (swc,
  ESM, `dist/`, Turbo, changesets).
- `.claude/skills/ds-create-component/` — shape reference for a Claude Code skill folder
  (`SKILL.md` + plain, uncompiled scripts), used only as a structural example; this repo's own
  skills are out of scope and not otherwise reused.

## Decisions made

- **Distribution: a real npm package with its own installer CLI, not a Claude Code plugin.**
  `packages/skills` is a pnpm workspace member, published as `@helvetia-design/skills`, following
  the same build/publish pipeline as `packages/playwright` (swc, ESM `dist/`, Turbo, changesets).
  Consumers run `npx @helvetia-design/skills add`, which copies the skill payload into their own
  project's `.claude/skills/ds-migrate-from-baloise/`. No plugin manifest, no marketplace
  registration — that's explicitly out of scope for now.
- **Two-part package: compiled CLI + self-contained skill payload.**
  - `packages/skills/src/cli.ts` — the only thing that gets swc-compiled to `dist/`, exposed
    via `bin: { "skills": "dist/cli.js" }`. Its only job: `fs.cp` the skill payload directory
    into `<cwd>/.claude/skills/ds-migrate-from-baloise/`, creating `.claude/skills/` if missing,
    overwriting on re-run (re-running `add` doubles as "update" — no separate command).
  - `packages/skills/skills/ds-migrate-from-baloise/` — plain, **uncompiled** Markdown/JS,
    copied verbatim. Must work standalone in the consumer's repo with zero runtime dependency
    back on `@helvetia-design/skills` or this monorepo (no imports from `node_modules/@helvetia-design/*`).
- **CLI surface is just `add`.** `npx @helvetia-design/skills add`, no arguments, no `list`, no
  per-skill selection — there's only one skill today. Extending the surface is deferred until a
  second skill actually exists.
- **One skill, 4-item top-level menu inside it.** `ds-migrate-from-baloise`'s `SKILL.md` presents
  **Init** / **Components** / **CSS utils (coming soon)** / **Assets (coming soon)** rather than
  being split into multiple skills. Picking "CSS utils" or "Assets" reports "coming soon" instead
  of erroring — they're listed now so the menu communicates the eventual full scope, but neither
  is implemented in this plan. **Components** is itself a submenu: it lists every file present
  under `components/*/migration.md` (currently just `components/spinner/migration.md`) by
  reading its title, and dispatches to
  the matching instructions. Adding component #2 later means adding one file, not touching the
  skill's control logic — no other menu changes needed.
- **Scanning is regex/text-based, not a real parser.** Both the bootstrap-detection step and the
  bal-spinner finder use dependency-free regex/text scanning across `.tsx`, `.jsx`, `.html`, and
  `.ts` (for Angular inline `template:` strings) — no bundled `@angular/compiler`, JSX parser, or
  HTML parser. This is a deliberate accuracy/self-containment trade-off: best-effort detection,
  human review before any edit happens.
- **Scan scope:** walk the whole project from `cwd`; skip `node_modules`, `dist`, `build`, `out`,
  `.next`, `.angular`, `.git`, `coverage` by name at any depth. No hard requirement that matches
  live under a literal `src/` directory (breaks for monorepos / non-`src` layouts).
- **Rewrites are agent-driven, not scripted find/replace.** The scan script only *finds and
  lists* candidates (file, line, snippet). Claude itself performs the edits, guided by a
  human-readable `migration.md` per component — chosen over a scripted rewrite because prop/event
  changes aren't always 1:1 and a blind regex rewrite of a stranger's production code is a
  materially worse failure mode than a missed edge case a human review would catch.
- **Confirmation is bulk, not per-occurrence.** The skill lists every finding grouped by file, up
  front, then asks for one yes/no before editing anything. No stop-and-ask per match.
- **`components/spinner/migration.md` is written for real, now**, from the actual old↔new prop
  diff (below) — not a placeholder template. Each future component gets its own real
  `migration.md`, authored individually when that component's migration is tackled; this plan
  only covers spinner as the worked example that establishes the pattern.
- **Bootstrap/init requires an existing Baloise install as a precondition.** If no
  `@baloise/ds-*` dependency + CSS/JS import is detected, the skill stops with "no Baloise Design
  System installation detected, nothing to migrate" rather than doing a fresh install. This skill
  migrates, it doesn't onboard from scratch.
- **Bootstrap/init installs the new packages, not just the imports — via npm-alias coexistence,
  reinstated from the previous plan.** `@baloise/ds-core`/`ds-react`/`ds-angular`/`ds-styles`
  don't exist under an `@helvetia-design/*` npm scope yet, and old + new can't both be installed under
  the *same* package name at once. Init resolves this today, without waiting on a real rename, by
  adding npm aliases: `"@helvetia-design/react": "npm:@baloise/ds-react@<next-version>"` (and the
  matching entry for `ds-core`/`ds-angular`/`ds-styles`) to the consumer's `package.json`,
  resolving `<next-version>` dynamically (`npm view @baloise/ds-react dist-tags`, take the `next`
  tag) rather than hardcoding a version that will drift. All generated imports use the
  `@helvetia-design/*` alias name. It runs the install via the package manager detected from the
  consumer's lockfile (`pnpm-lock.yaml` → pnpm, `yarn.lock` → yarn, else npm), **then** inserts
  the new CSS/JS import next to — never replacing — the existing Baloise one. This is ADR-worthy
  (hard to reverse once consumer apps depend on the alias name, non-obvious without context) —
  see ADR below.
- **The skill never commits.** It edits files and leaves everything unstaged, mirroring this
  repo's own "never commit, leave changes for the user" rule — applied here to the *consumer's*
  repo, since the skill is touching a stranger's production codebase.
- **Automated tests are in scope now, not deferred.** vitest fixtures per framework
  (`test/fixtures/react/*.tsx`, `test/fixtures/angular/*.html`, `test/fixtures/html/*.html`)
  assert what the bal-spinner scanner does/doesn't flag, and cover the package-manager/framework
  detection logic for bootstrap/init.
- **Explicitly out of scope for this plan**: any component other than spinner, a
  plugin/marketplace distribution mechanism, actually building CSS-utils or assets migration
  (menu entries only, "coming soon"), and renaming the real published `@baloise/ds-*` package
  name — that's `docs/plans/npm-scope-rename-plan.md`'s job, not this plan's; npm-alias
  coexistence is how this plan works *around* that rename not having landed yet, per the ADR
  below.

### ADR: npm alias coexistence strategy

Create `docs/adr/0028-ds-migrate-npm-alias-coexistence.md`:

```md
# Coexist old and new DS packages via npm aliases

Old Baloise DS and new Helvetia DS custom-element tags don't collide
(`bal-*` vs `ds-*`), but their npm package names do — both publish as
`@baloise/ds-core`, `@baloise/ds-react`, etc. An app migrating
component-by-component needs both installed at once, which a single
package name can't do.

`ds-migrate-from-baloise`'s Init step installs the new packages under npm
aliases (`@helvetia-design/react`: `npm:@baloise/ds-react@<version>`, same
pattern for core/angular/styles) and generates all new imports against
those alias names. This makes incremental, per-component migration
possible today without waiting on the real rename
(`docs/plans/npm-scope-rename-plan.md`) to land.

Consequence: every consumer app that runs this skill ends up importing
the new DS via `@helvetia-design/*`, not the package's real published name
(still `@baloise/ds-*` until the rename plan lands). That rename plan
targets this exact same `@helvetia-design/*` scope and per-package names
(`core`, `react`, `angular`, `styles`), so once it lands these generated
aliases already match the real package — no codemod needed across
migrated apps, just a follow-up cleanup to drop the now-redundant alias
entries.
```

### Spinner prop mapping (`bal-spinner` → `ds-spinner`)

| old (`bal-spinner`) | new (`ds-spinner`) | handling |
|---|---|---|
| `deactivated` | `deactivated` | copy as-is |
| `variation="logo"` / `"circle"` | same | copy as-is |
| `inverted` | `inverted` | copy as-is |
| `small` (boolean) | `size="sm"` | rewrite: `small` / `small="true"` → `size="sm"`; `small="false"` → omit `size` |
| `color="blue"` (default) | *(no equivalent prop)* | drop the attribute — new component has no `color` prop, default rendering already matches |
| `color="white"` | `inverted` | rewrite: `color="white"` → `inverted="true"` (old `getColor()` treated `inverted \|\| color==='white'` the same; new only has `inverted`) |
| *(none)* | `label` | new prop, not touched — nothing to migrate from |
| *(none)* | `labelPosition="right"` / `"bottom"` | new prop, not touched |

Tag/import rewrite:
- **HTML**: `<bal-spinner>` → `<ds-spinner>`.
- **Angular**: `<bal-spinner>` in templates (`.html` and inline `template:` strings) →
  `<ds-spinner>`.
- **React**: `<BalSpinner ...>` (imported from `@baloise/ds-react`) → `<DsSpinner ...>` (imported
  from `@helvetia-design/react`), confirmed against `packages/react/src/generated/components.ts:998`
  which exports `DsSpinner`.

No event changes on this component (neither old nor new `bal-spinner`/`ds-spinner` emits custom
events) — `migration.md` should say so explicitly rather than silently having an empty section, so
the pattern is visible for components that *do* have event changes later.

## Implementation

### 1. Scaffold `packages/skills`

- `packages/skills/package.json`: `"name": "@helvetia-design/skills"`, `"type": "module"`,
  `"bin": { "skills": "dist/cli.js" }`, `"files": ["dist/", "skills/"]`, build script
  `"build": "swc src -d dist --config-file .swcrc"` (copy `.swcrc` from `packages/playwright`),
  versioned/published the same way as sibling packages.
- `packages/skills/CONTEXT.md`: document the package's purpose, the compiled-CLI /
  self-contained-payload split, and the "one `migration.md` per component" convention, following
  the format of other `packages/*/CONTEXT.md` files.
- `packages/skills/src/cli.ts`: parses `process.argv` for the single `add` subcommand; on
  `add`, resolves its own package root (works whether run via `npx` or from a local install),
  and `fs.cp`s `skills/ds-migrate-from-baloise` into `<cwd>/.claude/skills/ds-migrate-from-baloise`
  (`recursive: true, force: true`), creating `.claude/skills/` if it doesn't exist. Prints a short
  summary of what was copied.

### 2. Build the `ds-migrate-from-baloise` skill shell

`packages/skills/skills/ds-migrate-from-baloise/SKILL.md`:
- Frontmatter `name`/`description`.
- On invocation, presents the 4-item menu: **Init** / **Components** / **CSS utils (coming
  soon)** / **Assets (coming soon)**. The two "coming soon" items just say so and stop.
- **Components** reads `components/*/migration.md` (currently just
  `components/spinner/migration.md`), builds a picker from each file's title, and dispatches to
  the chosen file's instructions.
- **Init** dispatches to the bootstrap/init instructions below.
- States plainly, near the top: this skill edits files and never runs `git add`/`git commit`;
  reviewing and committing is left to the consumer.

### 3. Implement bootstrap/init

`packages/skills/skills/ds-migrate-from-baloise/scripts/detect-baloise.js` (plain Node, no
deps): walks the project (per the scan-scope rules above) for
- a `@baloise/ds-*` entry in the nearest `package.json`, and
- an existing CSS `<link>`/JS `<script>` (or framework-equivalent import) referencing
  `@baloise/ds-styles` / `@baloise/ds-core` / `@baloise/ds-react` / `@baloise/ds-angular`.

If neither is found, `SKILL.md` reports "no Baloise Design System installation detected, nothing
to migrate" and stops.

If found, `SKILL.md` instructs Claude to:
- Detect the package manager from the lockfile present (`pnpm-lock.yaml` / `yarn.lock` /
  `package-lock.json`, defaulting to npm).
- Detect the framework the same way the bal-spinner task does (React: `react`/`react-dom` in
  `package.json`; Angular: `@angular/core`; else HTML).
- Resolve the current `next`-tagged version via `npm view @baloise/ds-core dist-tags` (same
  version applies to all four sibling packages, they're released together).
- Add `"@helvetia-design/core": "npm:@baloise/ds-core@<version>"` + the matching `ds-styles` alias
  (HTML), or the `ds-react` (React) / `ds-angular` (Angular) alias + `ds-styles` alias, to
  `package.json`, and run the detected package manager's install command.
- Insert the new CSS `<link>`/JS `<script>` (HTML), `import '@helvetia-design/styles/css'` +
  framework wiring (React/Angular) — all against the `@helvetia-design/*` alias names — **next to** the
  existing `@baloise/*` one — never removing or editing the old line.
- Report exactly what was installed and which files were touched.

### 4. Implement bal-spinner

- `packages/skills/skills/ds-migrate-from-baloise/scripts/scan-bal-spinner.js` (plain Node, no
  deps): walks the project per the scan-scope rules, regex-matches `bal-spinner` usages across
  `.tsx`/`.jsx`/`.html`/`.ts`, and prints findings grouped by file (path, line, snippet) plus a
  total count.
- `packages/skills/skills/ds-migrate-from-baloise/components/spinner/migration.md`: the prop
  mapping table above, written out per framework (React/Angular/HTML), plus the "no event
  changes" note.
- `SKILL.md`'s bal-spinner flow: run the scan script, print the findings list, ask for one bulk
  confirmation, then — only if confirmed — read `migration.md` and edit each flagged occurrence
  with Claude's own judgment (not a scripted rewrite), printing a per-file summary of what
  changed and reminding the user changes are unstaged.

### 5. Tests

`packages/skills/test/`:
- `test/fixtures/react/App.tsx`, `test/fixtures/angular/app.component.html` +
  `app.component.ts` (inline template), `test/fixtures/html/index.html` — each seeded with a mix
  of real `bal-spinner` usages, look-alike false positives (e.g. `bal-spinner` inside a comment or
  string literal, to document known scanner limitations), and files that should be skipped
  (under a fixture `dist/`).
- vitest specs asserting `scan-bal-spinner.js`'s output against each fixture.
- vitest specs for the package-manager/framework detection logic used by both tasks (lockfile
  presence, `package.json` dependency checks).

### 6. Docs

- Add `@helvetia-design/skills` / `ds-migrate-from-baloise` to `docs/SKILLS.md`'s inventory, noting
  it's distributed as a standalone npm package (`npx @helvetia-design/skills add`) rather than living
  in this repo's own `.claude/skills/`.
- `packages/skills/CONTEXT.md` (from step 1) is the authoritative doc for the package's
  internal conventions and how to add the next component's `migration.md`.

### 7. Changeset

Add a changeset for `@helvetia-design/skills` (brand-new package — confirm against
`.changeset/config.json` how a first-time package version is assigned).

### 8. ADR

Create `docs/adr/0028-ds-migrate-npm-alias-coexistence.md` with the content drafted above.

## Verification

- From a scratch checkout of three throwaway test apps (Vite+React, Angular standalone, plain
  HTML) seeded with `@baloise/ds-core`/`@baloise/ds-react`/`@baloise/ds-angular` +
  `@baloise/ds-styles` and a `bal-spinner` usage:
  - `npx @helvetia-design/skills add` (via `pnpm --filter @helvetia-design/skills pack` + local install,
    or `node dist/cli.js add` run directly against the scratch app) creates
    `.claude/skills/ds-migrate-from-baloise/` with the expected file tree, and the 4-item menu
    (with the two "coming soon" stubs) renders correctly.
  - Init: confirms the `@helvetia-design/*` npm aliases (resolved to the current `next` version) land in
    `package.json` and install alongside the untouched `@baloise/*` entries, the new CSS/JS
    import appears next to the untouched old one, and running it against an app with no Baloise
    install at all correctly stops with the "nothing to migrate" message.
  - Components → spinner: confirms the scan lists every real `bal-spinner` usage without false
    positives from the fixture's comment/string decoys, the bulk-confirm gate works, and after
    confirming, `size`/`color`/`inverted`/`deactivated`/`variation` are rewritten per the mapping
    table above — imports pointing at the `@helvetia-design/*` alias names — with nothing staged or
    committed.
- `pnpm --filter @helvetia-design/skills test` (vitest) passes.
- `pnpm lint` / `pnpm format` pass on the new `packages/skills` content.
