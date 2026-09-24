# CONTEXT — packages/ds-skills (Consumer Claude Code Skills)

This document captures domain language, architectural patterns, and key concepts specific to the published skills package.

## Overview

**packages/ds-skills** (`@helvetia/ds-skills`) ships Claude Code skills that consuming applications install into their own repo. It is not a design-system runtime package — there are no web components, tokens, or styles here. Consumers run `npx @helvetia/ds-skills@next add`, which copies a skill folder into `<cwd>/.claude/skills/`. The `@next` tag is required: this repo publishes with `--tag next`, and `npx` without a tag resolves `latest`.

The first (and currently only) skill is **ds-migrate-from-baloise**: a menu-driven helper for migrating an app from the Baloise Design System (`bal-*`, `@baloise/ds-*`) to the Helvetia Design System (`ds-*`, `@helvetia/ds-*`). The menu itself lives in the copied `SKILL.md`; this file documents package conventions, not the menu copy.

## Core Concepts

### Compiled CLI vs. self-contained payload

The package has two parts that must not be confused:

- **Compiled CLI** — `src/cli.ts`, swc-compiled to `dist/cli.js`, exposed as `bin.ds-skills`. Its only job is the `add` subcommand: copy the skill payload into the consumer's `.claude/skills/` directory (creating parents, overwriting on re-run). Re-running `add` is how a consumer updates the skill. The CLI has no other subcommands until a second skill exists.
- **Self-contained payload** — `skills/ds-migrate-from-baloise/`, plain uncompiled Markdown (and, later, plain Node scripts). Copied verbatim. After copy, the skill must run inside the consumer's repo with **zero runtime dependency** back on `@helvetia/ds-skills` or this monorepo — no imports from `node_modules/@helvetia/*`.

The compiled CLI is a delivery mechanism. The payload is the product.

### Skill payload, not a plugin

Distribution is `npx @helvetia/ds-skills@next add`. There is no Claude Code plugin manifest and no marketplace registration.

### One `migration.md` per component

**Components** is a file-driven submenu. Adding a component means adding `components/<name>/migration.md` (title in the first heading). `SKILL.md` lists `components/*.md` and `components/*/migration.md` by title and dispatches to the chosen file; the menu control logic does not change. No component files ship in this package version — the first one lands in a follow-up.

### Independent versioning

This package publishes as `@helvetia/ds-skills`, outside the `@baloise/ds-*` lockstep group in `.changeset/config.json`. It versions on its own changeset track, not at `20.0.0-next.x`.

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

Done when all four CLI specs pass and eslint exits 0.

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

In the scratch directory, invoke `/ds-migrate-from-baloise`. Done when Init reports it is a follow-up and stops, Components reports no migrations available and stops, and CSS utils / Assets report "coming soon" and stop.

Init, spinner scan, and rewrites are follow-up tickets — they are out of scope for this package version.

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[root|CONTEXT.md]] — repository-level concepts, release process

The full migration-skill plan this package starts is [docs/plans/ds-migrate-baloise-plan.md](../../docs/plans/ds-migrate-baloise-plan.md).
