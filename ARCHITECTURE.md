# 🏗️ Architecture — Helvetia Design System

This document describes the architecture, design patterns, and technical organization of the Helvetia Design System.

## Table of Contents

- [Core Principles](#core-principles)
- [Workspace Structure](#workspace-structure)
- [Component Lifecycle](#component-lifecycle)
- [Build Environment Flags](#build-environment-flags)
- [TypeScript and Build System](#typescript-and-build-system)
- [Design Tokens](#design-tokens)
- [Web Components](#web-components)
- [Storybook Documentation](#storybook-documentation)
- [Testing Strategy](#testing-strategy)
- [Accessibility Requirements](#accessibility-requirements)
- [New Component Checklist](#new-component-checklist)
- [Release and Versioning](#release-and-versioning)
- [Code Quality and Standards](#code-quality-and-standards)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Key Dependencies](#key-dependencies)
- [Further Reading](#further-reading)

## Core Principles

Every component and design decision in this system must adhere to these principles:

- **Accessibility**: Always prioritize accessibility. Ensure that all components meet WCAG 2.2 AA standards.
- **Simplicity**: Solve problems with the simplest solution possible. If it can be done with HTML, use HTML. Then try to use CSS. Only use JavaScript when absolutely necessary.
- **Responsiveness**: Ensure that all components are fully responsive and work seamlessly from 320px to 2560px screen widths.
- **Standards Compliance**: Always follow W3C web standards best practices. Avoid using framework-specific solutions.
- **Compatibility**: Only use features that are baseline widely available according to [webstatus.dev](https://webstatus.dev) and [caniuse.com](https://caniuse.com).
- **Inclusion**: Ensure that components and documentation are usable by people with diverse abilities and technologies.

## Workspace Structure

This is a **Turborepo monorepo** for the Helvetia Design System — a multi-framework component library built on **Stencil.js** that outputs Angular and React bindings.

### Package Layout

```
packages/
  core/               # Stencil web components (primary source of truth)
    config/           # Stencil configurations and plugins for the compiler
    public/           # Static content for the Web Server
    src/
      components/     # Web Components
      utils/          # Globally shared helpers
    www/              # Generate Web Server content
  css/                # SCSS/CSS design system styles and utilities (uno-css)
  tokens/             # Style-dictionary design tokens
  assets/             # Fonts, icons, images
  playwright/         # Custom Playwright matchers for component testing

libs/
  output-target-angular/   # Stencil → Angular bindings generator
  output-target-web/       # Stencil → Web component output target
  eslint-plugin/           # ESLint plugin and configuration

docs/                 # Storybook documentation (Vite + @storybook/html-vite)
```

## Component Lifecycle

Components flow through this lifecycle:

1. **Authoring** — Components are authored in **`packages/core/src/components/`** as Stencil components (`.tsx` + `.scss`)
2. **Build** — Stencil compiler builds to `packages/core/dist/` with multiple output targets
3. **Angular Binding** — **`libs/output-target-angular/`** generates Angular wrapper components
4. **React Binding** — React bindings are generated directly by Stencil's React output target
5. **Documentation** — Storybook stories (`.stories.ts`, `.mdx`) in `docs/` drive component documentation

## Build Environment Flags

The Stencil config in `packages/core/stencil.config.ts` uses environment variables to switch behavior:

| Variable                | Purpose                                     |
| ----------------------- | ------------------------------------------- |
| `IS_DS_DEVELOPMENT`     | Enable dev/watch mode                       |
| `BAL_DOCUMENTATION`     | Build documentation site                    |
| `DS_RELEASE`            | Production release mode                     |
| `DS_PLAYWRIGHT_TESTING` | E2E test mode                               |
| `DS_TESTING`            | Unit test mode                              |
| `CI`                    | CI environment (auto-set in GitHub Actions) |

## TypeScript and Build System

### Path Aliases

`tsconfig.base.json` defines path aliases for all packages:

```json
{
  "paths": {
    "@baloise/ds-core": ["packages/core/src/index.ts"],
    "@baloise/ds-tokens": ["packages/tokens/src/index.ts"],
    "@utils": ["packages/core/src/utils/index.ts"],
    "@global": ["packages/core/src/global/index.ts"]
  }
}
```

These aliases are used in cross-package imports during development and resolve to dist artifacts in production.

### Build Tasks

Build tasks are defined in `turbo.json` and `package.json` scripts. Each package can have specialized build steps:

- **`packages/core`** — Runs Stencil compiler, generates web components
- **`packages/tokens`** — Runs Style Dictionary to compile tokens
- **`packages/css`** — Runs Sass + PostCSS to generate CSS
- **`packages/playwright`** — Compiles TypeScript for test utilities

Use `npm run <script>` or `turbo run <task>` to invoke tasks. Turborepo caches task outputs — only changed packages rebuild.

## Design Tokens

Tokens live in `packages/tokens/tokens/Base.tokens.json` and are processed by **Style Dictionary** into CSS, SCSS, JS, and JSON outputs.

### Three-Layer Token Architecture

Always prefer **Alias** tokens for consumer use:

| Layer     | JSON key       | Purpose                                 | When to use                                         |
| --------- | -------------- | --------------------------------------- | --------------------------------------------------- |
| Global    | `🌐 Global`    | Raw values (color scales, sizes, fonts) | Rarely — only when no alias token fits              |
| Alias     | `🔗 Alias`     | Meaningful abstractions                 | **Primary layer for component consumers**           |
| Component | `🧩 Component` | Per-component tokens                    | When building or overriding a specific DS component |

**Flow:** Components reference design tokens (`--ds-*`) → compiled from Alias/Global → values come from Figma.

### Naming Convention

Follows the [EightShapes naming guide](https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676): names move from broad category to specific modifier.

CSS variable pattern: `--ds-[category]-[name]`

| Example need       | Token                      | CSS variable                    |
| ------------------ | -------------------------- | ------------------------------- |
| Large spacing      | `space-lg`                 | `--ds-space-lg`                 |
| Primary background | `background-color-primary` | `--ds-background-color-primary` |
| Base border radius | `radius-base`              | `--ds-radius-base`              |
| Base text size     | `text-size-base`           | `--ds-text-size-base`           |

### Responsive Tokens

Space tokens have responsive variants. For most uses, reference the base token:

- `--ds-space-lg` — base value (mobile default)
- `--ds-space-lg-device` — automatically responsive via `@media` breakpoints

Use `--ds-space-lg` for static use, `--ds-space-lg-device` when you want automatic responsive scaling.

### Key Alias Categories

- **Space:** None, Auto, 2XS, XS, SM, Base, MD, LG, XL, 2XL, 3XL, 4XL
- **Background Color:** white, transparent, sky, grey, primary, info, success, warning, danger (+ light/dark variants)
- **Border:** Color, Width
- **Radius:** None, Base, LG, Rounded
- **Text:** Size, Color, Family, Weight, LineHeight, Shadow
- **Shadow:** Text, Box
- **Z-Index:** Deep, Masked, Mask, Sticky, Navigation, Popup, Modal, Toast, Tooltip
- **Opacity:** Hidden, Half, Disabled, Backdrop, Full
- **Breakpoint:** Tablet (769px), Desktop (1024px), DesktopLG, DesktopXL, Desktop2XL

### JSON Structure

Component tokens are nested under `"🧩 Component" > "<ComponentName>"`:

```json
{
  "🧩 Component": {
    "Button": {
      "Color": {
        "Primary": {
          "Base": {
            "Text": { "$type": "color", "$value": "{🔗 Alias.🔤 Text.Color.White}" }
          }
        }
      },
      "Gap": { "$type": "number", "$value": "{🔗 Alias.↔️ Space.MD}" }
    }
  }
}
```

This maps to: `--ds-button-color-primary-base-text` and `--ds-button-gap`

Each token includes `$extensions` with Figma metadata:

```json
"Text": {
  "$type": "color",
  "$value": "{🔗 Alias.🔤 Text.Color.White}",
  "$extensions": {
    "com.figma.variableId": "VariableID:369:1",
    "com.figma.scopes": ["ALL_SCOPES"],
    "com.figma.isOverride": true
  }
}
```

### Figma Integration

Each token in `Base.tokens.json` carries a `$extensions.com.figma.variableId`. The JSON file is the source of truth — tokens are synced to Figma as variables under the same name. When referencing a token by name, it is available as a Figma variable.

### Token Lookup Guide

When a developer asks "what token should I use for X?":

1. **Read** `packages/tokens/tokens/Base.tokens.json` — find the token in the Alias layer (prefer Alias; fall back to Global or Component only if needed)
2. **Read** `packages/tokens/dist/css/base.tokens.css` — find the exact CSS variable name and its resolved value
3. **Return** in this format:

> **Token:** `space-lg` > **CSS:** `var(--ds-space-lg)` → `1.5rem` > **Responsive variant:** `var(--ds-space-lg-device)` (scales with breakpoint)

If multiple tokens could fit, list the top 2–3 with a brief note on when to use each.

### Building Tokens

Rebuild compiled token output whenever `Base.tokens.json` changes:

```bash
npm run tokens
```

This regenerates:

- `packages/tokens/dist/css/base.tokens.css` — CSS variables
- `packages/tokens/dist/scss/_tokens.scss` — SCSS functions
- `packages/tokens/dist/json/tokens.json` — Structured JSON for libraries

## Web Components

### Naming Convention

- Use the `ds-` prefix for all custom elements to avoid naming collisions
- Use Shadow DOM for encapsulation of styles and markup
- Follow Stencil best practices for authoring components

### Component File Structure

Each component lives in `packages/core/src/components/<component>/`:

```
button/
  button.tsx              # Stencil component (props, events, render)
  button.interfaces.ts    # TypeScript types and enums
  button.host.scss        # Shadow DOM styles (scoped to :host)
  button.style.scss       # Shared CSS (web component + global)
  test/
    button.spec.ts              # Unit tests (Vitest)
    button.component.play.ts    # Interaction tests (Playwright)
    button.visual.play.ts       # Visual regression tests
    button.a11y.play.ts         # Accessibility tests
```

### Hybrid Component Model

The **hybrid component model** allows components to work in two modes:

**Mode 1: Web Component (Shadow DOM)**

- Components used as `<ds-button>` custom elements
- Styles encapsulated in Shadow DOM
- JavaScript logic runs in component

**Mode 2: CSS-Only (No Shadow DOM)**

- Consumers include global CSS stylesheet
- Components styled via CSS classes only
- No custom elements or JavaScript required

**How it works:**

`*.style.scss` is the single source of CSS truth:

- Imported by `*.host.scss` (with `$use-host: true`) → compiled into Shadow DOM bundle

Both modes share the exact same styling logic:

```scss
// button.style.scss — used by both modes
@include vars.local(button-color-text, var(--ds-button-color-primary-base-text));

.is-primary {
  --mod-button-color-text: var(--ds-button-color-primary-base-text);
}

.is-secondary {
  --mod-button-color-text: var(--ds-button-color-secondary-base-text);
}
```

```scss
// button.host.scss — only for web components
@import './button.style.scss' with (
  $use-host: true
);
```

### Stencil Component Patterns

Follow these naming and code organization patterns:

**Naming:**

- `@Prop()` handlers: No special naming (declare with `readonly`)
- `@Listen()` handlers: `listenTo<Event>` (e.g., `listenToClick`)
- `@Watch()` handlers: `<Prop>Changed` (e.g., `valueChanged`)
- DOM event handlers: `handle<Event>` as arrow functions (e.g., `handleClick = () => {}`)
- Custom events: `ds` prefix (e.g., `dsChange`, `dsCloseClick`)
- Public methods: `@Method()` decorated, always `async`, return `Promise`
- Private methods: Must be `private`, all other methods not listed above should be private

**Props:**

- Always use `readonly` for immutable props
- Always add type annotations
- Use `reflect: true` only for state props (disabled, value, checked, open, etc.)
- Use empty string `''` as default for optional enum props, not `undefined`

**Class Organization:**
Every component must implement `ComponentInterface` and `Loggable`:

```ts
import { Loggable, Logger, type LogInstance } from '@utils'

export class Button implements ComponentInterface, Loggable {
  log!: LogInstance

  @Logger('ds-button')
  createLogger(log: LogInstance) {
    this.log = log
  }
}
```

Methods must be organized by section with dividers:

1. PUBLIC PROPERTY API
2. LIFECYCLE
3. PROPERTY VALIDATION
4. PUBLIC LISTENERS
5. PUBLIC METHODS
6. EVENT HANDLERS
7. PRIVATE METHODS
8. RENDER

### CSS Variable Cascade

Components use a four-layer CSS custom property system for theming:

```
--_button-color-text          (private — used in CSS rules)
  └─ var(--button-color-text        (public — consumer override)
      , var(--mod-button-color-text  (modifier — set by .is-primary, .is-sm)
          , var(--ds-button-color-primary-base-text)))  (design token default)
```

| Layer        | Prefix                 | Who Sets It       | Purpose                                        |
| ------------ | ---------------------- | ----------------- | ---------------------------------------------- |
| Private      | `--_component-prop`    | (computed only)   | Used inside CSS rules. Never set from outside. |
| Public       | `--component-prop`     | Consumers/themes  | Override a single component instance           |
| Modifier     | `--mod-component-prop` | Variant classes   | Applied by `.is-primary`, `.is-sm`, etc.       |
| Design Token | `--ds-component-prop`  | `packages/tokens` | Default value from Figma                       |

**Private variable generation** via `vars.local()` mixin:

```scss
// Generates: --_button-color-text: var(--button-color-text, var(--mod-button-color-text, ...))
@include vars.local(button-color-text, var(--ds-button-color-primary-base-text));
```

**Modifier variables** set by variant mixins:

```scss
@mixin color($color) {
  --mod-button-color-text: var(--ds-button-color-#{$color}-base-text);
}

:host(.is-secondary) {
  @include color(secondary);
}
```

## Storybook Documentation

Each component has documentation under `docs/src/components/<ds-component>/`:

```
tag/
  tag.stories.ts   # Story definitions (StoryFactory + helpers)
  tag.mdx          # MDX documentation page
```

**Design Token Section** — The `.mdx` file includes a `<TokenOverview component="tag" />` block that reads from design tokens JSON and renders all CSS variables belonging to the component, showing consumers what's themeable.

## Testing Strategy

### Unit Tests

- **Location:** `packages/core/src/components/<component>/test/<component>.spec.ts`
- **Framework:** Vitest with jsdom environment
- **Purpose:** Test component logic, prop validation, and utility functions

### Component Interaction Tests

- **Location:** `packages/core/src/components/<component>/test/<component>.component.play.ts`
- **Framework:** Playwright with custom `@baloise/ds-playwright` matchers
- **Purpose:** Test user interactions, event firing, and event payloads

### Visual Regression Tests

- **Location:** `packages/core/src/components/<component>/test/<component>.visual.play.ts`
- **Snapshots:** Stored in `e2e/` directory
- **Purpose:** Detect unintended visual changes between builds

### Accessibility Tests

- **Location:** `packages/core/src/components/<component>/test/<component>.a11y.play.ts`
- **Purpose:** Verify WCAG 2.2 AA compliance, keyboard navigation, screen reader support

### Page Objects

Every component needs a **Page Object (PO)** in `packages/playwright/src/lib/components/<component>.po.ts`. POs extend `PageObject` and expose typed locators and helper methods:

```ts
export class DsTag extends PageObject {
  private readonly closeButton: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.closeButton = el.locator('ds-close')
  }

  async clickClose() {
    await this.closeButton.click()
  }
}
```

POs are the **only way** tests interact with components.

### Required Test Files

| File                               | Required For   |
| ---------------------------------- | -------------- |
| `*.po.ts` in `packages/playwright` | All components |
| `*.component.play.ts`              | All components |
| `*.visual.play.ts`                 | All components |
| `*.a11y.play.ts`                   | All components |

## Accessibility Requirements

All components **must** meet **WCAG 2.2 AA** compliance:

- **Color Contrast:** 4.5:1 for text, 3:1 for large text and UI components
- **Keyboard Navigation:** All interactive elements must be keyboard accessible
- **Focus Indicators:** Visible focus states on all interactive elements
- **ARIA Labels:** Proper roles, labels, and live regions where needed
- **Screen Reader Support:** Components work with assistive technologies

Accessibility is verified via `*.a11y.play.ts` Playwright tests.

## New Component Checklist

Use this checklist when creating a component from scratch:

- [ ] Create component directory in `packages/core/src/components/<name>/`
- [ ] Add `<name>.tsx` with `ds-` prefix, `ComponentInterface`, logger, props, events, render
- [ ] Add `<name>.interfaces.ts` for component-specific types/enums
- [ ] Add `<name>.style.scss` with CSS variable cascade via `vars.local()`
- [ ] Add `<name>.host.scss` that imports style.scss with `$use-host: true`
- [ ] Register component in `packages/core/src/index.ts`
- [ ] Add Page Object in `packages/playwright/src/lib/components/<name>.po.ts`
- [ ] Add `test/<name>.spec.ts` unit tests
- [ ] Add `test/<name>.component.play.ts` interaction tests
- [ ] Add `test/<name>.visual.play.ts` visual regression tests
- [ ] Add `test/<name>.a11y.play.ts` accessibility tests
- [ ] Add Storybook entry under `docs/src/components/<name>/` (stories + MDX)
- [ ] Create changeset entry with `npm run changeset`
- [ ] Pass all linting checks: `npm run lint && npm run format`

## Release and Versioning

### Changesets

All changes affecting end users must be documented in a changeset:

```bash
npm run changeset
```

This creates a `.md` file in `.changeset/` describing the changes. Choose version bump:

- **`patch`** — bug fixes, non-breaking style tweaks
- **`minor`** — new features, new components
- **`major`** — breaking changes (prop renames, removed elements, behavior changes)

**Why changesets matter:** When PRs are merged into `next`, the `prepare-release.yml` workflow scans all changesets and opens a "Changeset Release PR" that aggregates all changes into a single version bump. This PR is reviewed by the core team, then merged to trigger the actual npm publication via `release.yml`.

See [Changesets documentation](https://github.com/changesets/changesets) for format and best practices.

### Snapshot Versions (Testing Before Merge)

Before merging a feature branch, you can publish a **snapshot** — a pre-release version from your PR that others can test:

```bash
/snapshot
```

Post this comment in the PR to trigger `snapshot.yml`. The resulting version follows this format:

```
1.2.3-snapshot.456.abc1234
     └─ snapshot ─┘ └─ PR # ─┘ └─ commit ─┘
```

**When to use:** After significant features or breaking changes, invite reviewers or stakeholders to `npm install @baloise/ds-core@1.2.3-snapshot.456.abc1234` and test the design system in their project before the official release.

### Release Flow

```
1. Changes merged to next
   ↓
2. prepare-release.yml reads all .changeset/*.md files
   ↓
3. Changesets bot opens "Changeset Release PR" (aggregates version bumps)
   ↓
4. Core team reviews and approves Release PR
   ↓
5. Release PR merged to next
   ↓
6. release.yml publishes all packages to npm with GitHub provenance
   ↓
7. Docs automatically redeploy to design.baloise.dev
```

For LTS (`main` branch), follow the same process with `lts-prepare-release.yml` and `lts-release.yml`.

### Branch and PR Workflow

- Open PRs against the `next` branch
- Feature branches should use prefixes: `feat/`, `fix/`, `chore/`, `docs/`
- All checks must pass before merge
- Include a changeset unless your PR is documentation-only or infrastructure

### Semantic Versioning Policy

This project follows **Semantic Versioning** ([semver.org](https://semver.org/)):

```
MAJOR.MINOR.PATCH
│      │      └─ Patch: bug fixes, non-breaking improvements
│      └────────  Minor: new features, new components (backward-compatible)
└────────────────  Major: breaking changes (incompatible API changes)
```

**When to choose each version bump:**

#### Patch (Bug Fixes & Non-Breaking Changes)

Use `patch` for backward-compatible fixes and improvements:

- ✅ Bug fixes (e.g., "fixed focus state not showing on button")
- ✅ Non-breaking style tweaks (e.g., "adjusted padding for better alignment")
- ✅ Performance improvements (e.g., "optimized component re-renders")
- ✅ Accessibility improvements (e.g., "added missing ARIA label")
- ✅ Documentation updates (only if meaningful for consumers)

**Example changeset:**

```
fix: resolve focus state contrast issue on tag component
```

#### Minor (New Features & Components)

Use `minor` for backward-compatible additions:

- ✅ New components (e.g., "add card component")
- ✅ New props (e.g., "add size prop to button")
- ✅ New events (e.g., "emit dsHover event")
- ✅ New CSS variables (e.g., "add --button-border-radius")
- ✅ New public methods (e.g., "add async focus() method")

**Example changeset:**

```
feat: add button component with primary and secondary variants
feat: add size prop to input component
```

#### Major (Breaking Changes)

Use `major` for incompatible changes. Breaking changes include:

- ❌ **Prop removal** — Removing an existing `@Prop()` breaks consuming code
- ❌ **Prop rename** — Consumers using the old name will break
- ❌ **Prop type change** — Changing `string` to `number` may break consumers
- ❌ **Event removal** — Removing an `@Event()` breaks event listeners
- ❌ **Event name change** — Changing `dsChange` to `dsValueChange` breaks listeners
- ❌ **Method removal** — Removing a public `@Method()` breaks consumers
- ❌ **Method signature change** — Changing parameter types/count breaks callers
- ❌ **Component removal** — Removing the component entirely
- ❌ **Default value change** — Changing a prop's default (e.g., from `false` to `true`) may break assumptions
- ❌ **Behavior change** — Changing how a component behaves (e.g., auto-opening modal on mount instead of requiring explicit call)
- ❌ **HTML structure change** — Removing/renaming Shadow DOM slots or parts breaks styling

**Example changeset:**

```
breaking: remove deprecated variant prop from button, use type instead
breaking: rename dsChange event to dsValueChange
```

### Deprecation Policy

Rather than immediately removing features, follow this deprecation timeline:

1. **First major version**: Mark as deprecated in JSDoc, add deprecation warnings to console
2. **Minimum two versions later**: Remove in a new major version

**Example deprecation flow:**

```typescript
/**
 * @deprecated Use `type` prop instead. Removed in 2.0.0.
 */
@Prop() readonly variant: 'primary' | 'secondary' = 'primary'
```

Console warning when used:

```typescript
@Watch('variant')
variantChanged() {
  if (this.variant) {
    console.warn(
      '[ds-button] variant prop is deprecated. Use type instead. '
    )
  }
}
```

This gives consumers 2+ release cycles to migrate before the feature is removed.

### Version Support

- **Latest major version**: Receives patches and minor updates
- **Older major versions**: No longer receive updates (see [SECURITY.md](SECURITY.md#supported-versions))
- **LTS branch** (`main`): Parallel releases with same versioning scheme
- **Prerelease versions**: Snapshot versions (e.g., `1.2.3-snapshot.456.abc1234`) for testing before merge

## Code Quality and Standards

See [STYLE_GUIDE.md](STYLE_GUIDE.md) for detailed code standards and best practices.

### What to Avoid

**JavaScript / HTML:**

- Avoid JavaScript for tasks solvable with HTML/CSS
- Avoid non-standard HTML elements or attributes
- Avoid deprecated HTML, CSS, or JavaScript features

**Styling:**

- Avoid inline styles; use CSS classes
- Avoid CSS-in-JS; stick to Sass
- Avoid framework-specific code (Tailwind, Bootstrap, React, Angular, Vue)
- Avoid attribute selectors in SCSS (`:host([disabled])`); use CSS classes (`.is-disabled`)

**Dependencies:**

- Avoid heavy libraries that bloat the project
- Avoid external CDNs; keep assets self-contained
- Avoid non-approved fonts or icons

**Components:**

- Avoid rebuilding existing components; check first
- Avoid creating components in `/packages/angular` or `/packages/react` (auto-generated)

**Security:**

- Follow web security best practices
- Validate and sanitize external data
- Avoid TOCTOU (Time-of-Check, Time-of-Use) race conditions
- Use atomic file operations where applicable

## CI/CD Pipeline

All workflows live in `.github/workflows/`. Here is what runs automatically:

| Workflow                  | Trigger                                          | Purpose                                                                                                              |
| ------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `continuous.yml`          | Every push to `next` + all PRs                   | Lint, test, and build. Cancels superseded runs.                                                                      |
| `prepare-release.yml`     | Every push to `next`                             | Opens or updates a **Changeset Release PR** via the changesets bot.                                                  |
| `release.yml`             | Changeset Release PR merged (or manual dispatch) | Publishes all packages to npm with provenance.                                                                       |
| `lts-prepare-release.yml` | Every push to `main`                             | Same as prepare-release but for the LTS (`main`) branch.                                                             |
| `lts-release.yml`         | LTS Release PR merged                            | Publishes LTS packages to npm.                                                                                       |
| `security.yml`            | Push to `next` + all PRs + weekly schedule       | CodeQL static analysis. Results appear in the GitHub Security tab. Required for EU Cyber Resilience Act obligations. |
| `screenshots.yml`         | PR comment `/update-screenshots`                 | Regenerates visual regression snapshots for the PR branch and commits them.                                          |
| `snapshot.yml`            | PR comment `/snapshot`                           | Publishes a snapshot npm version from the PR branch for manual testing.                                              |
| `create-issue-branch.yml` | Issue comment                                    | Auto-creates a branch from an issue using the `robvanderleek/create-issue-branch` action.                            |

### Bot Commands

These commands can be posted as a PR comment to trigger workflows:

| Command               | Effect                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/update-screenshots` | Runs visual regression tests and commits updated snapshots to the PR branch. Use after intentional visual changes.           |
| `/snapshot`           | Publishes a snapshot npm version (e.g. `1.2.3-pr123.0`) so you can install and test the PR in a real project before merging. |
| `/cib`                | Posted on an **issue** — auto-creates a correctly named branch for that issue and posts the branch link as a comment.        |

### Release Flow

```
PR merged → prepare-release creates "Changeset Release PR"
                  ↓
          Release PR reviewed & merged
                  ↓
          release.yml publishes to npm
```

## Deployment

The design system documentation site is automatically deployed to **Vercel** whenever changes are pushed.

### Deployment Domains

| Domain                                                                         | Branch                  | Purpose                                                                     |
| ------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------- |
| [design.baloise.dev](https://design.baloise.dev)                               | `next` (latest release) | Production domain serving the latest published version                      |
| [baloise-design-preview.vercel.app](https://baloise-design-preview.vercel.app) | `main`                  | LTS version of Baloise                                                      |
| `design-system-*.vercel.app`                                                   | Every PR                | Each pull request gets a unique preview URL (linked in Vercel's PR comment) |

### How It Works

Vercel watches the repository for changes and automatically rebuilds and deploys when:

- Changes are pushed to `next` → rebuilds production docs at `design.baloise.dev`
- Changes are pushed to `main` → rebuilds lts at `baloise-design-lts.vercel.app`
- A pull request is opened or updated → builds a lts at a unique Vercel URL and comments with the link

This allows reviewers to see documentation changes live before merging.

## Key Dependencies

### Runtime (shipped to consumers)

| Library            | Version        | Used for                                                                       |
| ------------------ | -------------- | ------------------------------------------------------------------------------ |
| `lottie-web`       | 5.8.1 (pinned) | Logo and spinner animations — loads and plays Lottie JSON files                |
| `lottie-colorify`  | 0.8.0          | Dynamically recolours Lottie animations to match brand tokens                  |
| `@floating-ui/dom` | ^1.7           | Positioning engine for dropdowns, tooltips, and popovers                       |
| `dompurify`        | ^3.4           | Sanitizes any HTML passed into components to prevent XSS                       |
| `luxon`            | ^3.7           | Date and time formatting and manipulation                                      |
| `big.js`           | ^7.0           | Arbitrary-precision decimal arithmetic for number and currency inputs          |
| `filesize.js`      | ^2.0           | Formats raw byte counts into human-readable file sizes (file upload component) |
| `contactjs`        | ^2.1           | Touch and gesture event handling for swipe/drag interactions                   |
| `lodash`           | ^4.18          | General-purpose utility functions                                              |

> **Note:** `lottie-web` is pinned to `5.8.1` — do not upgrade without testing all animations.

### Build & Tooling (not shipped)

| Tool                                   | Used for                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Stencil.js** (`@stencil/core`)       | Web component compiler — transpiles `.tsx` + `.scss` into standards-based custom elements       |
| **Turborepo**                          | Monorepo task orchestration and build caching                                                   |
| **Style Dictionary**                   | Compiles design token JSON into CSS custom properties, SCSS variables, and TypeScript constants |
| **Storybook** (`@storybook/html-vite`) | Component documentation site                                                                    |
| **Sass** (`@stencil/sass`)             | CSS preprocessing for component styles                                                          |

### Testing

| Tool                                  | Used for                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Vitest**                            | Unit and utility tests (jsdom environment)                                                                          |
| **Playwright** (`@playwright/test`)   | Component interaction, visual regression, and accessibility E2E tests. Pinned to `1.59.1` for snapshot consistency. |
| **axe-core** (`@axe-core/playwright`) | Automated WCAG 2.2 AA accessibility checks inside Playwright tests                                                  |

### Code Quality & Release

| Tool                               | Used for                                             |
| ---------------------------------- | ---------------------------------------------------- |
| **ESLint**                         | Linting TypeScript and component code                |
| **Prettier**                       | Code formatting (enforces LF line endings)           |
| **cspell**                         | Spell checking across source files and documentation |
| **Changesets** (`@changesets/cli`) | Semantic versioning and changelog generation         |

## Further Reading

- **[DEVELOPMENT.md](DEVELOPMENT.md)** — Setup, dev servers, testing, common tasks
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution workflow and guidelines
- **[STYLE_GUIDE.md](STYLE_GUIDE.md)** — Code standards and naming conventions
- **[SECURITY.md](SECURITY.md)** — Security policy and best practices
