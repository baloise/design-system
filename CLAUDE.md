# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm start                  # Start core components in dev mode (IS_BAL_DEVELOPMENT=true)
npm run docs               # Start Storybook documentation

# Build
npm run build              # Build all packages (respects Nx cache)
npm run tokens             # Build design tokens only
npm run styles             # Build styles only

# Testing
npm test                   # Run all Vitest unit tests (--watch=false)
npm run play               # Open Playwright UI test explorer
npm run e2e                # Run E2E tests

# Linting & Formatting
npm run lint               # Lint all packages
npm run format             # Auto-format code (enforces LF line endings)
npm run spell              # Spell check with cspell

# Run single test (Vitest)
npx nx run <project>:test --testFile=<path>

# Version management
npm run changeset          # Create a changeset entry before publishing
```

## Architecture

This is an **Nx monorepo** for the Baloise Design System — a multi-framework component library built on **Stencil.js** that outputs Angular and React bindings.

### Workspace layout

```
packages/
  core/        # Stencil web components (primary source of truth)
  styles/      # SCSS/CSS design system styles
  tokens/      # Style-dictionary design tokens
  assets/      # Fonts, icons, images
  playwright/  # Custom Playwright matchers for component testing
  devkit/      # Developer utilities

libs/
  output-target-angular/   # Stencil → Angular bindings generator
  output-target-web/       # Stencil → Web component output target
  nx/                      # Custom Nx executors (build-core, test-ui, pre-publish, etc.)

docs/          # Storybook documentation (Vite + @storybook/html-vite)
e2e/           # Playwright E2E tests
test/          # Angular and React test apps
```

### Component lifecycle

1. Components are authored in **`packages/core/src/`** as Stencil components (`.tsx` + `.scss`)
2. Stencil build compiles to `packages/core/dist/` with multiple output targets
3. **`libs/output-target-angular/`** generates Angular wrapper components
4. React bindings are generated directly by Stencil's React output target
5. Docs are driven by Storybook stories (`.stories.ts`, `.mdx`) in `docs/`

### Build environment flags

The Stencil config in `packages/core/stencil.config.ts` uses these env vars to switch behavior:
- `IS_BAL_DEVELOPMENT` — dev/watch mode
- `BAL_DOCUMENTATION` — doc site build
- `BAL_DS_RELEASE` — production release
- `BAL_PLAYWRIGHT_TESTING` — E2E test mode
- `BAL_TESTING` — unit test mode

### Testing approach

- **Unit tests**: Vitest with jsdom environment. Test files use `*.spec.ts` / `*.test.ts`. Config is `vite.config.ts` per package.
- **E2E / visual tests**: Playwright with custom `@baloise/ds-playwright` matchers. Visual regression uses screenshot snapshots stored in `e2e/`.
- Component-level Playwright tests live alongside components (`*.play.ts` suffix in `packages/core/src`).

### TypeScript paths

`tsconfig.base.json` defines path aliases for all packages (e.g. `@baloise/ds-core` → `packages/core/src/index.ts`). These are used in cross-package imports during development but resolve to dist artifacts in production.

### Nx targets

Custom executors in `libs/nx/src/executors/` handle specialized build steps (e.g. `build-core` wraps the Stencil CLI, `test-ui` runs Playwright with a running dev server). Use `npx nx run <project>:<target>` to invoke individual targets.

### Changesets

Version bumps use [Changesets](https://github.com/changesets/changesets). Run `npm run changeset` to record a change before merging. CI publishes via `publish.yml` after release.
