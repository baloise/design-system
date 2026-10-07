# CONTEXT — packages/ds-skills (Consumer Claude Code Skills)

This document captures domain language, architectural patterns, and key concepts specific to the published skills package.

## Overview

**packages/ds-skills** (`@helvetia/ds-skills`) ships Claude Code skills that consuming applications install into their own repo. It is not a design-system runtime package — there are no web components, tokens, or styles here. Consumers run `npx @helvetia/ds-skills@next add`, which copies a skill folder into `<cwd>/.claude/skills/`. The `@next` tag is required: this repo publishes with `--tag next`, and `npx` without a tag resolves `latest`.

The first (and currently only) skill is **ds-migrate-from-baloise**: a menu-driven helper for migrating an app from the Baloise Design System (`bal-*`, `@baloise/ds-*`) to the Helvetia Design System (`ds-*`, `@helvetia-design/*`). The menu itself lives in the copied `SKILL.md`; this file documents package conventions, not the menu copy.

## Core Concepts

### Compiled CLI vs. self-contained payload

The package has two parts that must not be confused:

- **Compiled CLI** — `src/cli.ts`, swc-compiled to `dist/cli.js`, exposed as `bin.ds-skills`. Its only job is the `add` subcommand: copy the skill payload into the consumer's `.claude/skills/` directory (creating parents, overwriting on re-run). Re-running `add` is how a consumer updates the skill. The CLI has no other subcommands until a second skill exists.
- **Self-contained payload** — `skills/ds-migrate-from-baloise/`, plain uncompiled Markdown and dependency-free Node scripts. Copied verbatim. After copy, the skill must run inside the consumer's repo with **zero runtime dependency** back on `@helvetia/ds-skills` or this monorepo — no script imports from `node_modules/@helvetia-design/*`.

The compiled CLI is a delivery mechanism. The payload is the product.

### Skill payload, not a plugin

Distribution is `npx @helvetia/ds-skills@next add`. There is no Claude Code plugin manifest and no marketplace registration.

### One `migration.md` per component

**Components** offers two paths. **Manual** lists `components/*.md` and `components/*/migration.md` by the first heading. **Detect** runs `scripts/scan-migratable.mjs` and suggests only used `bal-*` components with a matching `components/<name>/migration.md`. Both paths dispatch to that migration file.

### Adding the next component

Paths below are inside `skills/ds-migrate-from-baloise/`.

1. Add `components/<name>/migration.md`. The first heading is the menu title.
2. Write the confirm-then-rewrite steps and the prop mapping in that file. When the component needs a finder, add a dependency-free `scripts/scan-bal-<name>.mjs` that prints JSON findings and does not edit files, and invoke it from the migration file.
3. When the legacy component has child tags, add an entry per child to `CHILD_SLUGS` in `scripts/scan-migratable.mjs`. Without it **Detect** reports the child as its own unmigratable component, when the parent migration already covers it.
4. Stop there. **Manual** lists the new file automatically. **Detect** suggests it automatically when the consumer project uses the matching component.

Accordion is the template: `components/accordion/migration.md` (heading `accordion`) and `scripts/scan-bal-accordion.mjs`. It is the richest case — child tags, two legacy shapes, renamed events, removed methods, and props with no replacement. Spinner is the minimal case: one tag, one prop table, nothing lost. The agent rewrites matches after one bulk confirmation. The script does not edit files.

Conventions that hold across every component:

- **The scanner stays flat.** It prints `{ total, files: [{ file, findings: [{ line, snippet }] }] }` and nothing else. Reach comes from widening the single `USAGE_RE`, not from adding fields — toast matches `balToastController`, accordion matches the four `BalAccordion*` bindings and `BalAccordionBundle`.
- **Never put a shared event name in a component regex.** `balChange` alone is emitted by 26 legacy components, so it would report checkbox, input, and dropdown usages as findings for whichever component you are migrating.
- **`CHILD_SLUGS` stays explicit.** Never fold by prefix: `bal-input-slider` becomes `ds-slider`, a separate component, not part of the input migration.
- **Anything with no `ds-*` equivalent is reported, never commented into the consumer's code.** The migration file's final step enumerates each loss for the summary. See `components/tooltip/migration.md` and `components/accordion/migration.md`.
- **When the component has methods or events, the migration file carries the sibling-file rule.** Angular splits a component across `x.component.html` and `x.component.ts`, and the class file often calls `present()` or handles an event without ever naming the tag, so the scan cannot see it. The migration file tells the agent to open the same-basename `.ts` beside every `.html` finding. See `components/accordion/migration.md`.
- **The directory is always the legacy slug**, because Detect derives it from the `bal-*` tag. When the component is renamed, the first heading names both sides so the Manual menu stays readable: `components/app/migration.md` opens with `# app → root`.
- **Fixtures are written inline in the spec** with the local `write()` helper. `test/fixtures/` predates that and serves spinner only; do not extend it.

Done when **Components** lists the new heading and choosing it follows that file.

### Independent versioning

This package publishes as `@helvetia/ds-skills`, outside the `@helvetia-design/*` fixed group in `.changeset/config.json`. A changeset bumps only this package, on its own version track.

### The skill never commits

The copied skill edits the consumer's files and leaves everything unstaged. It never runs `git add` or `git commit`. That is the same "leave changes for the user" rule this monorepo uses, applied to a stranger's production codebase.

## Key Constraints

- **CLI surface is `add` only** — no arguments, no `list`, no per-skill selection.
- **Payload stays uncompiled** — Markdown and dependency-free JS only. Do not import from this package's `dist/` or from other workspace packages.
- **Overwrite is the update path** — `add` replaces the destination folder; do not add a separate `update` command.
- **Coming-soon menu items report "coming soon" and stop** — they exist to show eventual scope, not as errors.

## Testing

Do **not** run `add` from this monorepo root — it would copy the skill into this repo's `.claude/skills/`. Always use a scratch directory.

### Unit tests and lint

```bash
nvm use
pnpm --filter @helvetia/ds-skills test
pnpm --filter @helvetia/ds-skills lint
```

Done when the CLI specs, `test/detect-baloise.spec.ts`, `test/scan-bal-accordion.spec.ts`, `test/scan-bal-app.spec.ts`, `test/scan-bal-badge.spec.ts`, `test/scan-bal-card.spec.ts`, `test/scan-bal-spinner.spec.ts`, `test/scan-bal-icon.spec.ts`, `test/scan-bal-text.spec.ts`, `test/scan-bal-toast.spec.ts`, and `test/scan-bal-tooltip.spec.ts` pass and eslint exits 0.

### Scratch CLI

```bash
nvm use
pnpm --filter @helvetia/ds-skills build

SCRATCH=$(mktemp -d)
cd "$SCRATCH"
node /absolute/path/to/packages/ds-skills/dist/cli.js add
```

Done when:

1. stdout is `Copied ds-migrate-from-baloise to <scratch>/.claude/skills/ds-migrate-from-baloise`
2. that folder contains `SKILL.md` with the 4-item menu (Init / Components / CSS utils (coming soon) / Assets (coming soon)) and the line that the skill never runs `git add` or `git commit`
3. `node …/dist/cli.js` with no args, or with `list`, prints `Usage: ds-skills add` and exits 1
4. after writing a stale `SKILL.md` and `stale.txt` into the destination, a second `add` restores `SKILL.md` and removes `stale.txt`

### Menu (Claude)

In the scratch directory, invoke `/ds-migrate-from-baloise`. Done when Init runs `scripts/detect-baloise.mjs`, Components offers **Manual** and **Detect**, Manual lists **accordion**, **app → root**, **badge**, **card**, **spinner**, **icon**, **text**, **toast**, and **tooltip** from the first headings of their `migration.md` files, Detect suggests a component only when the project uses it and that migration exists, and CSS utils / Assets report "coming soon" and stop.

Against a project with no `@baloise/ds-*` dependency and no CSS/JS import, Init says "no Baloise Design System installation detected, nothing to migrate" and does not edit files. Against a project that has both, Init adds the `@helvetia-design/*` packages from the script JSON, runs that JSON's `installCommand`, inserts the new import beside the untouched `@baloise/*` import, and leaves the result unstaged.

Spinner: `node <skill>/scripts/scan-bal-spinner.mjs <project>` prints JSON findings (`total`, then `files` with `line` and `snippet`) and does not edit files. After one yes, the agent rewrites from `components/spinner/migration.md` and leaves the result unstaged.

Accordion: `node <skill>/scripts/scan-bal-accordion.mjs <project>` prints the same JSON shape and does not edit files. The regex covers `bal-accordion` and its `bal-accordion-summary`, `bal-accordion-trigger`, and `bal-accordion-details` children, plus the `BalAccordion*` bindings and `BalAccordionBundle`. After one yes, the agent rewrites from `components/accordion/migration.md` and leaves the result unstaged.

App: `node <skill>/scripts/scan-bal-app.mjs <project>` prints the same JSON shape and does not edit files. The regex also matches `initializeBaloiseDesignSystem` and `useBaloiseDesignSystem`, so the startup file that holds the language and region is found even though it never names the tag. After one yes, the agent rewrites from `components/app/migration.md` and leaves the result unstaged.

Badge: `node <skill>/scripts/scan-bal-badge.mjs <project>` prints the same JSON shape and does not edit files. After one yes, the agent rewrites from `components/badge/migration.md` and leaves the result unstaged.

Icon: `node <skill>/scripts/scan-bal-icon.mjs <project>` prints the same JSON shape and does not edit files. After one yes, the agent rewrites from `components/icon/migration.md` and leaves the result unstaged.

Text: `node <skill>/scripts/scan-bal-text.mjs <project>` prints the same JSON shape and does not edit files. After one yes, the agent rewrites from `components/text/migration.md` and leaves the result unstaged.

Toast: `node <skill>/scripts/scan-bal-toast.mjs <project>` prints the same JSON shape and does not edit files. After one yes, the agent rewrites from `components/toast/migration.md` and leaves the result unstaged.

Tooltip: `node <skill>/scripts/scan-bal-tooltip.mjs <project>` prints the same JSON shape and does not edit files. After one yes, the agent rewrites from `components/tooltip/migration.md` and leaves the result unstaged.

Card: `node <skill>/scripts/scan-bal-card.mjs <project>` prints the same JSON shape and does not edit files. The regex also matches the four `BalCard*` children (`Actions`, `Button`, `Content`, `Subtitle`, `Title`) and `BalCardBundle`. After one yes, the agent rewrites from `components/card/migration.md`: it synthesizes a `ds-card-header` around a direct-child `bal-card-title`/`bal-card-subtitle`, rewrites `bal-card-button` into a `ds-button` inside `ds-card-actions` (no direct `ds-*` equivalent exists), and leaves the result unstaged.

Detection: `node <skill>/scripts/scan-migratable.mjs <project>` prints used components grouped into `suggested` (migration available) and `notYet` (no migration available), with usage totals, and does not edit files.

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[root|CONTEXT.md]] — repository-level concepts, release process

The full migration-skill plan this package starts is [docs/plans/ds-migrate-baloise-plan.md](../../docs/plans/ds-migrate-baloise-plan.md).
