# ds-create-component Skill

Generate a new design system component with full TDD scaffolding, backwards compatibility, and test infrastructure.

## Quick Start

```bash
/ds-create-component button
```

This generates:

- ✅ Component stub (`button.tsx`)
- ✅ Interfaces/types (`button.interfaces.ts`)
- ✅ Styling (`button.host.scss`, `button.style.scss`)
- ✅ Internationalization (`button.i18n.ts` if needed)
- ✅ Failing tests (red phase TDD)
- ✅ Auto-export in `index.ts`

## How It Works

### 1. Component Analysis

- Scans `origin/main` for old `bal-button` component
- Extracts API (props, events, methods)
- Detects if form component, has i18n, uses animations

### 2. File Generation

- Generates interfaces first (defines types for everything)
- Creates component stub (intentionally incomplete for TDD)
- Creates SCSS with design token comments
- Creates i18n file if needed
- Creates test directory

### 3. Test Scaffolding

- Calls `ds-sync-component-tests` to generate interaction tests
- Calls `ds-sync-visual-tests` to generate visual regression tests
- Calls `ds-sync-a11y-tests` to generate accessibility tests
- All tests fail initially (red phase)

### 4. Export

- Automatically adds export to `packages/core/src/index.ts`

## Component Types

### wc-only

Web component with shadow DOM only.

```
files: component.tsx, component.host.scss
```

### hybrid

Web component with shadow DOM + light DOM support.

```
files: component.tsx, component.host.scss, component.style.scss
```

### css-html

Pure HTML/CSS utility (no web component).

```
files: component.style.scss only
```

## Features

### ✅ Backwards Compatibility

- Extracts old `bal-*` component API from main branch
- Matches prop names, event names, behavior
- Marks deprecated patterns with migration guides
- Honors SEO/A11y as hard constraints

### ✅ Design Tokens Integration

- Parses `Base.tokens.json`
- Generates SCSS with available token comments
- Warns on missing tokens

### ✅ i18n Support

- Detects if component needs multi-language strings
- Generates i18n structure with all languages
- Auto-wires config listener for language changes

### ✅ Form Components

- Detects form components (input, select, etc.)
- Generates `@AttachInternals()` boilerplate
- Wires form submission/reset handling
- Generates form integration tests

### ✅ Animation Handling

- Detects animations in SCSS
- Auto-wires `dsConfig.animated` listener
- Generates no-animation class for visual tests
- Disables animations in test mode

### ✅ TDD-First Approach

- Generates stub component (intentionally incomplete)
- Tests fail initially (red phase)
- User implements to make tests pass (green phase)
- Tests verify behavior

## Examples

### Create a simple button

```bash
/ds-create-component button
# Generates wc-only button component with API matching old bal-button
```

### Create a form input

```bash
/ds-create-component input
# Detects form component, generates ElementInternals boilerplate
# Generates form submission/reset tests
```

### Create an animated modal

```bash
/ds-create-component modal
# Detects animations in SCSS
# Auto-wires animation config handling
# Disables animations in visual tests
```

## File Structure

```
packages/core/src/components/my-component/
├── my-component.tsx                    # Component stub
├── my-component.interfaces.ts          # Props, events, enums
├── my-component.host.scss              # Shadow DOM styles
├── my-component.style.scss             # Light DOM styles (optional)
├── my-component.i18n.ts                # Translations (optional)
└── test/
    ├── my-component.component.play.ts  # Component tests (generated)
    ├── my-component.visual.play.ts     # Visual tests (generated)
    ├── my-component.visual.html        # Visual test harness (generated)
    └── my-component.a11y.play.ts       # A11y tests (generated)

packages/playwright/src/lib/components/
└── my-component.po.ts                  # Page Object (generated)
```

## Related Skills

- `/ds-sync-component-tests` — Generate component interaction tests
- `/ds-sync-visual-tests` — Generate visual regression tests
- `/ds-sync-a11y-tests` — Generate a11y tests
- `/ds-lint-component` — Audit component against style guide

## Decision Log

This skill was designed via extensive grilling session documenting:

1. **Backwards Compatibility** — Match old API, SEO/A11y as hard constraints
2. **File Generation** — interfaces → stubs → tests → i18n → export
3. **Test Strategy** — Red phase TDD (tests fail initially)
4. **Design Tokens** — Parse and comment available tokens
5. **i18n** — Extract English, populate other languages
6. **Form Components** — Full ElementInternals + form integration
7. **Animations** — Auto-detect, wire config listener
8. **Orchestration** — Coordinate with test generation skills

See [REFERENCE.md](REFERENCE.md) for detailed rules and patterns.
