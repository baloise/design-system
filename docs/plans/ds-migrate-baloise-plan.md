# Plan: `ds-migrate-baloise` migration skill (first step)

## Context

The Helvetia Design System (this repo, `next` branch) is the successor to the Baloise Design System (`main` branch). They are **API-incompatible but not tag-incompatible**: old components are `bal-*` (Stencil namespace `baloise-design-system`, e.g. `bal-badge`), new components are `ds-*` (Stencil namespace `design-system`, e.g. `ds-badge`), so the two can render side by side in the same page without custom-element collisions.

The npm packages, however, **do** collide: both old and new ship as `@baloise/ds-core`, `@baloise/ds-react`, `@baloise/ds-angular`, `@baloise/ds-css`, `@baloise/ds-assets` (old at `19.10.2`, new at `20.0.0-next.9`). A consumer app migrating incrementally — old badge everywhere, new badge in one spot, both live at once — cannot `npm install` two versions of the same package name side by side. Renaming the real published package name is a separate, larger decision that is explicitly out of scope here (see "Decisions made").

There is currently no tooling to help consuming React/Angular/HTML applications adopt the new DS component-by-component. This plan builds the first piece of that: a Claude Code skill, `ds-migrate-baloise`, that (a) installs and wires up the new DS packages into a consumer app without displacing the old ones, and (b) rewrites `bal-badge` usages to `ds-badge`, as a template for migrating further components later.

Reference material already in this repo that the skill's generated setup must match:
- `apps/storybook/src/development/00-guides/00-getting-started.mdx` — per-framework (Angular/HTML/React) install & wiring instructions for the new DS. The skill's Init step reproduces this, but against aliased package names.
- `packages/core/src/components/badge/badge.tsx` + `badge.interfaces.ts` (new) vs. `origin/main:packages/core/src/components/bal-badge/bal-badge.tsx` + `bal-badge.interfaces.ts` (old) — the full old↔new badge API diff (see prop-mapping table below).

## Decisions made

- **New workspace package, shipped as a Claude Code plugin.** `packages/ds-skills` is a real pnpm workspace member, published to npm as `@baloise/ds-skills` (private: false, normal changeset/release flow — even though the plugin itself is consumed via the Claude Code marketplace mechanism, not `npm install`). It contains a `.claude-plugin/plugin.json` and a `skills/ds-migrate-baloise/` skill directory. A root-level `.claude-plugin/marketplace.json` registers it so consumer apps can run `claude plugin marketplace add baloise/design-system` → `claude plugin install ds-skills`, then invoke `/ds-skills:ds-migrate-baloise`.
- **Top-level menu shows all four future migration targets**, not just what's built: `Init`, `Components`, `CSS utils (coming soon)`, `Assets (coming soon)`. Only Init and Components are functional; picking a "coming soon" option says so instead of erroring.
- **Init actually performs the work** (installs packages, edits config files) rather than just printing instructions — consistent with how `ds-create-component` operates. Changes are left unstaged (per this repo's own `CLAUDE.md` rule, applied here to the *consumer app* the skill is run against).
- **Package coexistence via npm aliases, `@helvetia/<pkg>` convention.** Init adds e.g. `"@helvetia/ds-react": "npm:@baloise/ds-react@20.0.0-next.9"` to the consumer app's `package.json` alongside the existing `@baloise/ds-react` (old) entry, and all generated import statements use the `@helvetia/*` alias. This is the mechanism that makes "both DS in one project without clashes" concretely possible today, ahead of any real package rename. **This is ADR-worthy** (hard to reverse once consumer apps depend on the alias name, non-obvious without context, genuine trade-off against waiting for a real rename) — see ADR below.
- **Components menu lists Badge only**, not the full ~55-component old-DS inventory. Avoids a 54-way "not supported" list that goes stale on every future PR; new components are added by adding one reference file (see below), which naturally makes them appear in the menu.
- **Component migration requires Init to have run first.** If the skill detects no `@helvetia/*` aliases in the consumer app's `package.json`, it stops and tells the user to run Init — no auto-chaining.
- **Component migration scans the whole project automatically** (no path/glob prompt) — detects the framework from `package.json`, greps for `bal-badge` usages (JSX, Angular templates, plain HTML/`.html`), and rewrites every occurrence it finds, printing a per-file summary.
- **Badge prop mapping**: rewrite what maps, flag the rest — never guess.

  | old (`bal-badge`) | new (`ds-badge`) | handling |
  |---|---|---|
  | `icon` | `icon` | copy as-is |
  | `size="small"` | `size="sm"` | rewrite |
  | `size="large"` | `size="lg"` | rewrite |
  | `size=""` | *(omit prop)* | drop empty-string default |
  | `color="danger"` / `"warning"` / `"success"` | same | copy as-is |
  | `color="grey"` / `"red"` / `"yellow"` / `"green"` / `"purple"` | *no equivalent* | keep old value, insert `TODO(ds-migrate)` comment above the usage naming the gap and the available new values (`disabled`, `danger`, `warning`, `success`) |
  | `position="card"` / `"button"` / `"tabs"` | same | copy as-is |
  | *(none)* | `pulse` | new prop, not touched — nothing to migrate from |

  React export names: old `BalBadge` (from `@baloise/ds-react` / would-be old scope), new `DsBadge` (from `@helvetia/ds-react`). Angular/HTML use the tag names directly (`bal-badge` → `ds-badge`).

- **Per-component migration knowledge lives in one reference file per component**: `packages/ds-skills/skills/ds-migrate-baloise/components/badge.md`, containing the old↔new tag/prop mapping and per-framework (React/Angular/HTML) rewrite rules. `SKILL.md` dispatches to the file matching the user's component choice. Adding component #2 later means adding one file, not touching the skill's control logic.
- **No post-migration build/typecheck.** The skill reports what it changed (files touched, items flagged) and leaves the diff unstaged; it doesn't assume the consumer app's package manager or script names.
- **Explicitly out of scope for this plan**: CSS-utils migration, assets migration, renaming the real published `@baloise/ds-*` npm package name, and any component other than badge.

### ADR: npm alias coexistence strategy

Create `docs/adr/0028-ds-migrate-npm-alias-coexistence.md`:

```md
# Coexist old and new DS packages via npm aliases

Old Baloise DS and new Helvetia DS custom-element tags don't collide
(`bal-*` vs `ds-*`), but their npm package names do — both publish as
`@baloise/ds-core`, `@baloise/ds-react`, etc. An app migrating
component-by-component needs both installed at once, which a single
package name can't do.

`ds-migrate-baloise`'s Init step installs the new packages under npm
aliases (`@helvetia/ds-react`: `npm:@baloise/ds-react@<version>`, same
pattern for ds-core/ds-angular/ds-css/ds-assets) and generates all new
imports against those alias names. This makes incremental, per-component
migration possible today without waiting on a real rename of the
published package name — which remains a separate, unscheduled decision.

Consequence: every consumer app that runs this skill ends up importing
the new DS via `@helvetia/*`, not the package's real published name. If
the real package is later renamed to something under an `@helvetia`
scope, these generated imports would already match; if it's renamed to
anything else, a follow-up codemod will be needed across every migrated
app. This trade-off was chosen deliberately over blocking this entire
migration tool on an unscheduled rename decision.
```

## Implementation

### 1. Scaffold `packages/ds-skills`

- `packages/ds-skills/package.json` — `"name": "@baloise/ds-skills"`, versioned like sibling packages (start at `20.0.0-next.9` to match the monorepo's current prerelease line, or `0.1.0` if changesets treats new packages independently — confirm against `.changeset/config.json`), no build step needed (plugin content is markdown/JSON, not compiled).
- `packages/ds-skills/CONTEXT.md` — document the package's purpose (home for Claude Code DS-migration plugins/skills), the plugin/skill-directory structure, and the "one reference file per component" convention, following the format other `packages/*/CONTEXT.md` files use.
- `packages/ds-skills/.claude-plugin/plugin.json` — plugin manifest (name `ds-skills`, description, version).
- Root `.claude-plugin/marketplace.json` (repo root, new file) — registers `packages/ds-skills` as an installable plugin source.

### 2. Build the `ds-migrate-baloise` skill shell

`packages/ds-skills/skills/ds-migrate-baloise/SKILL.md`:
- Frontmatter `name`/`description` following the convention in existing `.claude/skills/ds-*/SKILL.md`.
- Top-level menu: Init / Components / CSS utils (coming soon) / Assets (coming soon).
- Components submenu: lists every file present under `components/*.md` (currently just Badge) by reading its title.

### 3. Implement Init

`packages/ds-skills/skills/ds-migrate-baloise/init.md` (or inline in `SKILL.md` if short enough — decide during writing based on length):
- Framework detection: inspect consumer app's `package.json` dependencies (`react`/`react-dom` → React, `@angular/core` → Angular, neither → HTML) and, for React, whether it's Vite or Next.js (relevant only for *where* the entry-file edit goes).
- For each framework, reproduce the equivalent of `00-getting-started.mdx`'s install + wiring steps, but:
  - `npm add`/`pnpm add` targets use the alias syntax: `pnpm add @helvetia/ds-react@npm:@baloise/ds-react@<version> @helvetia/ds-css@npm:@baloise/ds-css@<version>` (React); equivalent for Angular (`@helvetia/ds-angular`, `@helvetia/ds-css`) and HTML (`@helvetia/ds-core`, `@helvetia/ds-css`).
  - Resolve `<version>` dynamically at run time (`npm view @baloise/ds-react dist-tags`, take the `next` tag) rather than hardcoding — the exact next-prerelease number will drift.
  - React: add `bootstrapDesignSystem` (from `@helvetia/ds-react`) call at module scope in the detected entry file (`src/main.tsx` for Vite, a `'use client'` entry for Next.js), and `import '@helvetia/ds-css/css'`.
  - Angular: add `provideDesignSystem()` (from `@helvetia/ds-angular`) to `app.config.ts` (standalone) or `DesignSystemModule.forRoot()` to the root `NgModule` (module-based) — detect which pattern the app uses by checking for `app.config.ts` vs `app.module.ts`. Add `CUSTOM_ELEMENTS_SCHEMA`. Add the `@use '@helvetia/ds-css/scss/base'` (or `@import` CSS equivalent) to the global stylesheet.
  - HTML: add `<link>`/`<script>` tags pointing at `node_modules/@helvetia/ds-css/...` and `node_modules/@helvetia/ds-core/...` to the app's `index.html` `<head>`.
- Report exactly what was installed/edited (package.json diff summary, files touched).

### 4. Implement Components → Badge

`packages/ds-skills/skills/ds-migrate-baloise/components/badge.md`:
- The prop-mapping table and TODO-flagging rule from "Decisions made" above, written out per framework:
  - **React**: find `<BalBadge ...>` JSX usages (import from old package), rewrite to `<DsBadge ...>` with remapped props, add/adjust the import to pull from `@helvetia/ds-react`.
  - **Angular**: find `<bal-badge ...>` in templates (`.html` and inline `template:` strings), rewrite to `<ds-badge ...>` with remapped bound/static attributes.
  - **HTML**: find `<bal-badge ...>` tags directly, rewrite to `<ds-badge ...>`.
- Precondition check: verify `@helvetia/ds-react` (or the framework-appropriate alias) is present in the consumer app's `package.json` before doing anything; if missing, stop with a message pointing at Init.
- After rewriting, print a summary: files touched, usage count, count flagged for manual review, and remind the user changes are unstaged.

### 5. Wire menu dispatch

`SKILL.md`'s Components flow reads `components/*.md`, extracts each file's title (e.g. the `## bal-badge → ds-badge` heading) to build the picker, and follows the chosen file's instructions. This is the extension point — no other code changes needed to add component #2.

### 6. Docs

- Add `ds-migrate-baloise` to `docs/SKILLS.md`'s skill inventory (new section, same format as existing entries), noting it lives in `packages/ds-skills` rather than `.claude/skills/` and is distributed as a plugin.
- `packages/ds-skills/CONTEXT.md` (from step 1) is the authoritative doc for the package's internal conventions.

### 7. Changeset

Add a changeset for `@baloise/ds-skills` (the package doesn't exist yet, so this is its first entry — confirm changesets handles a brand-new package correctly, i.e. it'll get an initial version rather than needing a pre-existing changelog).

### 8. ADR

Create `docs/adr/0028-ds-migrate-npm-alias-coexistence.md` with the content drafted above.

## Verification

- `claude plugin marketplace add .` (or the local-path equivalent) from within a scratch checkout, then `claude plugin install ds-skills`, confirms the plugin installs and `/ds-skills:ds-migrate-baloise` is invocable.
- Manually run the skill against three throwaway test apps (one Vite+React, one Angular standalone, one plain HTML) seeded with a `bal-badge` usage on the old DS:
  - Init: confirm `@helvetia/*` aliases land in `package.json`, `node_modules` contains both old and new packages simultaneously, and the wiring edits (entry file / app config / index.html) match the getting-started guide's pattern.
  - Components → Badge: confirm `bal-badge`/`BalBadge` usages are rewritten to `ds-badge`/`DsBadge`, `size="small"`/`"large"` become `sm`/`lg`, a `color="red"` usage gets a `TODO(ds-migrate)` comment and is left otherwise migrated, and running Components before Init correctly stops with a message instead of partially applying.
- `pnpm lint` / `pnpm format` pass on the new `packages/ds-skills` content (markdown/JSON only, but keep repo-wide formatting consistent).
