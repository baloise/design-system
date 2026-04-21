# Design System Maintainers Guide

This file provides guidance when working with code in this repository.

## Core principles

- **Accessibility**: Always prioritize accessibility. Ensure that all components meet WCAG 2.2 AA standards.
- **Simplicity**: Solve problems with the simplest solution possible. If it can be done with HTML, use HTML. Then try to use CSS. Only use JavaScript when absolutely necessary.
- **Responsiveness**: Ensure that all components are fully responsive and work seamlessly from 320px to 2560px screen widths.
- **Standards Compliance**: Always follow W3C web standards best practices. Avoid using framework-specific solutions.
- **Compatibility**: Only use features that are baseline widely available according to webstatus.dev and caniuse.com.
- **Inclusion**: Ensure that components and documentation are usable by people with diverse abilities and technologies.

## Commands

```bash
# Development
npm start                  # Start core components in dev mode (IS_DS_DEVELOPMENT=true)
npm run docs               # Start Storybook documentation

# Build
npm run build              # Build all packages (respects Nx cache)
npm run tokens             # Build design tokens only
npm run styles             # Build styles only

# Testing
npm test                   # Run all Vitest unit tests (--watch=false)
npm run play               # Open Playwright UI test explorer
npm run e2e                # Run E2E tests

# Run single Vitest test
npx nx run <project>:test --testFile=<path>

# Run single Playwright test
npx nx run <project>:test-ui --grep="<test name>"

# Linting & Formatting
npm run lint               # Lint all packages
npm run format             # Auto-format code (enforces LF line endings)
npm run spell              # Spell check with cspell

# Version management
npm run changeset          # Create a changeset entry before publishing
```

## Architecture

This is an **Nx monorepo** for the Helvetia Design System — a multi-framework component library built on **Stencil.js** that outputs Angular and React bindings.

### Workspace layout

```
packages/
  core/               # Stencil web components (primary source of truth)
    config/.          # Stencil configurations and plugins for the compiler
    public/           # Static content for the Web Server
    src/
      components/     # Web Components
      utils/          # Globally shared helpers
    www/              # Generate Web Server content
  styles/             # SCSS/CSS design system styles
  tokens/             # Style-dictionary design tokens
  assets/             # Fonts, icons, images
  playwright/         # Custom Playwright matchers for component testing
  devkit/             # Developer utilities

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

- `IS_DS_DEVELOPMENT` — dev/watch mode
- `BAL_DOCUMENTATION` — doc site build
- `DS_RELEASE` — production release
- `DS_PLAYWRIGHT_TESTING` — E2E test mode
- `DS_TESTING` — unit test mode

### TypeScript paths

`tsconfig.base.json` defines path aliases for all packages (e.g. `@baloise/ds-core` → `packages/core/src/index.ts`). These are used in cross-package imports during development but resolve to dist artifacts in production.

### Nx targets

Custom executors in `libs/nx/src/executors/` handle specialized build steps (e.g. `build-core` wraps the Stencil CLI, `test-ui` runs Playwright with a running dev server). Use `npx nx run <project>:<target>` to invoke individual targets.

## Web components

- Use the `ds-` prefix for all custom elements to avoid naming collisions.
- Use Shadow DOM for encapsulation of styles and markup.
- Use Stencil best practices for authoring web components.

### Component file structure

Each component lives in `packages/core/src/components/<component>/`:

```
button/
  button.tsx            # Stencil component — props, events, render()
  button.interfaces.ts  # TypeScript types/enums specific to this component
  button.host.scss      # Shadow DOM styles — scoped inside :host {}; imports
                        #   button.style.scss with ($use-host: true)
  button.style.scss     # Shared CSS rules — used by BOTH the web component
                        #   (via host.scss) and the global stylesheet (via
                        #   packages/styles). This is what enables hybrid mode.
  test/
    button.spec.ts              # Vitest unit tests
    button.component.play.ts    # Playwright component and PO tests
    button.style.html           # Static HTML fixture for visual/style tests
    button.visual.html          # Visual regression baseline HTML
    button.visual.play.ts       # Playwright visual test
    button.a11y.play.ts         # Playwright accessibility test
```

### Hybrid component model

`*.style.scss` is the single source of CSS truth. It is:

- Imported by `*.host.scss` (with `$use-host: true`) → compiled into the Shadow DOM bundle
- Imported by `packages/styles/src/generated/components.scss` → compiled into the global CSS stylesheet

This means a component works either as a **web component with Shadow DOM** or as a **CSS-only component** (no JS, no custom elements) when consumers include the global stylesheet — both modes share the exact same styling logic.

### Stencil style guide

- All immutable `@Prop()` values should be `readonly`
- All `@Listen()` handlers should be named `listenTo<Event>` (e.g. `listenToClick`)
- All `@Watch()` handlers should be named `<Prop>Changed` (e.g. `valueChanged`)
- All DOM event handlers should be named `handle<Event>` (e.g. `handleClick`, not `onClick`) and be an arrow function (e.g. `handleClick = ()=> {...}`)
- All custom events must use the `ds` prefix (e.g. `dsChange`, `dsCloseClick`)
- Each component must implement `ComponentInterface` (from `packages/core/src/utils/`) and have a logger via the `Loggable` interface
- All methods must be private except `lifecycles`, `@Method()`, `@Watch()`, and `render`

### CSS variable cascade

Components use a four-layer CSS custom property system so that styles can be overridden at different levels of specificity without breaking encapsulation.

```
--_button-color-text          (private — used in CSS rules)
  └─ var(--button-color-text        (public — consumer override)
      , var(--mod-button-color-text  (modifier — set by .is-primary, .is-sm, etc.)
          , var(--ds-button-color-primary-base-text)))  (design token default from Figma)
```

| Layer        | Prefix                 | Who sets it                             | Purpose                                                         |
| ------------ | ---------------------- | --------------------------------------- | --------------------------------------------------------------- |
| Private      | `--_component-prop`    | Nobody — computed only                  | Used inside CSS rules. Never write to this from outside.        |
| Public       | `--component-prop`     | Consumers / themes                      | Override a single component instance from outside               |
| Modifier     | `--mod-component-prop` | Modifier classes in `*.style.scss`      | Applied by variants like `.is-primary`, `.is-sm`, `.has-shadow` |
| Design token | `--ds-component-prop`  | `packages/tokens` (imported from Figma) | The default value; changed only via token updates               |

The private variable is generated by the `vars.local` mixin in `packages/core/src/vars.scss`:

```scss
// vars.local($name, $default)
// generates: --_button-color-text: var(--button-color-text, var(--mod-button-color-text, <default>))
@include vars.local(button-color-text, var(--ds-button-color-primary-base-text));
```

Modifier variables are set directly on the host/selector by variant mixins:

```scss
@mixin color($color) {
  --mod-button-color-text: var(--ds-button-color-#{$color}-base-text);
  // ...
}
:host(.is-secondary) {
  @include color(secondary);
}
```

**Goal:** all new components should follow this pattern — Shadow DOM + CSS variables — so they work both as web components and as CSS-only elements.

## Storybook documentation

Each component has a dedicated Storybook entry under `docs/src/components/<ds-component>/`:

```
tag/
  tag.stories.ts   # Story definitions — uses StoryFactory + withRender helpers
  tag.mdx          # MDX page — imports stories, assembles the doc page
  api.md           # Auto-generated by Stencil — props, events, methods table
  testing.md       # Testing guidance (usually static)
  theming.md       # Theming notes (usually static)
```

**`api.md` is auto-generated** by the Stencil compiler from JSDoc on the component's `@Prop`, `@Event`, and `@Method` decorators. Never edit it by hand.

**Design token section** — the `.mdx` file includes a `<TokenOverview component="tag" />` React block. This reads from `@baloise/ds-tokens/dist/docs/base.tokens.json` and renders all CSS variables that belong to the component so consumers can see what is themeable at a glance.

```mdx
## Component API

import api from './api.md?raw'
;<Markdown>{api}</Markdown>

## CSS Variables

<TokenOverview component="tag" />
```

## Accessibility

All components must meet **WCAG 2.2 AA** compliance. This includes:

- Sufficient colour contrast ratios (4.5:1 for text, 3:1 for large text and UI components)
- Keyboard navigability and visible focus indicators
- Correct ARIA roles, labels, and live regions
- Screen reader compatibility

Component-level accessibility is verified with `*.a11y.play.ts` Playwright tests alongside each component.

## Testing

- **Unit tests**: Vitest with jsdom environment. Test files use `*.spec.ts` / `*.test.ts`. Config is `vite.config.ts` per package.
- **E2E / visual tests**: Playwright with custom `@baloise/ds-playwright` matchers. Visual regression uses screenshot snapshots stored in `e2e/`.
- Component-level Playwright tests live alongside components (`*.play.ts` suffix in `packages/core/src`).

### Page Objects

Every component needs a **Page Object (PO)** in `packages/playwright/src/lib/components/<component>.po.ts`. The PO extends `PageObject` and exposes typed locators and helper methods (`clickClose()`, `assertToContainText()`, etc.). It is the only way tests interact with a component.

```ts
// packages/playwright/src/lib/components/tag.po.ts
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

### Component tests

Every component needs a `*.component.play.ts` test. This serves two purposes: it verifies the PO itself works, and for components with JS logic it also asserts that events fire the correct number of times and carry the correct `detail` payload.

**Important:** `page.mount()` must be called inside each individual test body — never in `beforeEach`.

```ts
// test/tag.component.play.ts
test('should fire dsCloseClick event', async ({ page }) => {
  const dsTag = new DsTag(page.locator('ds-tag'))
  const spy = await dsTag.el.spyOnEvent('dsCloseClick')
  await dsTag.clickClose()
  expect(spy).toHaveReceivedEventTimes(1)
})
```

### Required test files per component

| File                               | Required for   |
| ---------------------------------- | -------------- |
| `*.po.ts` in `packages/playwright` | all components |
| `*.component.play.ts`              | all components |
| `*.visual.play.ts`                 | all components |
| `*.a11y.play.ts`                   | all components |

## New component checklist

Use this checklist when adding a component from scratch:

- [ ] Create component directory in `packages/core/src/components/<name>/`
- [ ] Add `<name>.tsx` with `ds-` prefix, `ComponentInterface`, logger, `@Prop()`, `@Event()`, `render()`
- [ ] Add `<name>.interfaces.ts` for component-specific types/enums
- [ ] Add `<name>.style.scss` with CSS variable cascade via `vars.local`
- [ ] Add `<name>.host.scss` that imports `<name>.style.scss` with `$use-host: true`
- [ ] Register the component in `packages/core/src/index.ts`
- [ ] Add `<name>.style.scss` import to `packages/styles/src/generated/components.scss`
- [ ] Add Page Object in `packages/playwright/src/lib/components/<name>.po.ts`
- [ ] Add `test/<name>.spec.ts` unit tests
- [ ] Add `test/<name>.component.play.ts` Playwright component tests
- [ ] Add `test/<name>.visual.html` visual regression fixture
- [ ] Add `test/<name>.visual.play.ts` Playwright visual tests
- [ ] Add `test/<name>.a11y.play.ts` Playwright accessibility tests
- [ ] Add Storybook entry under `docs/src/components/<name>/` (`.stories.ts` + `.mdx`)
- [ ] Create a changeset entry (`npm run changeset`)

## Process

- For changes affecting end users, create a changeset in the `/.changeset` directory before merging.
  - `patch` — bug fixes, non-breaking style tweaks
  - `minor` — new features, new components
  - `major` — breaking changes (prop renames, removed elements, behaviour changes)
- Follow the [Changesets documentation](https://github.com/changesets/changesets) for format and best practices.
- Open PRs against the `main` branch. Feature branches should be prefixed: `feat/`, `fix/`, `chore/`, `docs/`.

## Avoid

**JavaScript / HTML**

- Avoid using JavaScript for tasks that can be accomplished with HTML and CSS.
- Avoid using non-standard HTML elements or attributes.
- Avoid using deprecated HTML, CSS, or JavaScript features.

**Styling**

- Avoid inline styles; always use CSS classes for styling.
- Avoid using CSS-in-JS solutions; stick to Sass for styling.
- Avoid using framework-specific code or libraries like Tailwind, Bootstrap, React, Angular, Vue, etc.

**Dependencies**

- Avoid using heavy libraries or dependencies that can bloat the project.
- Avoid using any external resources or CDNs; all assets should be self-contained within the project.
- Avoid using any non-approved fonts or icons; only use those provided by the Design System.

**Components**

- Avoid rebuilding existing components; always check if a component already exists in the Design System before creating a new one.
- Avoid creating Angular or React components in the `/packages/angular` or `/packages/react` directories. These components are generated automatically from the web components.

**General**

- Avoid generating any security issues; always follow best security practices for web development.
- Avoid hallucinations; if unsure about a requirement or implementation detail, ask for clarification. Always ensure that references are actual and verifiable and that referenced websites are real.
