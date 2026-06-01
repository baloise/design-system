# ds-sync-visual-tests

**Generate and maintain visual regression test files for components.**

## Quick Start

```bash
/ds-sync-visual-tests <component-name>
```

## What it does

Analyzes a component's props and automatically creates visual test files:

- **`.visual.html`** — Web component test harness
- **`.style.html`** — HTML/CSS test harness
- **`.visual.play.ts`** — Playwright visual regression tests

## Interactive workflow

1. Parses component `@Prop()` declarations (skips `@internal`, `@deprecated`)
2. Asks which props should have visual variants
3. Asks about structural patterns (slots, sub-components, etc.)
4. Generates HTML sections organized by variant
5. Creates Playwright specs with snapshot tests
6. Formats and lints output
7. Shows diffs for review (no auto-commit)

## Example

```bash
/ds-sync-visual-tests button
```

**Output:**

```
✓ Analyzed ds-button
  Props: size, color, variant, disabled, loading, ...

? Which props should have visual variants?
  ◉ size
  ◉ color
  ◉ variant
  ◯ disabled (state)
  ◯ loading (state)

? Add custom structural patterns? (y/n)
  [skipped]

✨ Generating files...
  ✓ Created packages/core/www/components/button/test/button.visual.html
  ✓ Created packages/core/www/components/button/test/button.style.html
  ✓ Created packages/core/src/components/button/test/button.visual.play.ts

📋 Summary:
  Component: ds-button
  Type: hybrid
  Variants: 8
  Test files: 2 HTML + 1 Playwright

✅ Ready for review!
  Run tests: npm run play -- --grep="button" --update-snapshots
```

## Features

- ✅ **Smart detection** — identifies component type (hybrid, web-component, HTML/CSS)
- ✅ **State-aware** — auto-includes `disabled`, `invalid`, `loading` variants
- ✅ **Interactive** — auto-wires buttons and scripts for `present()`, `dismiss()` methods
- ✅ **Merge strategy** — preserves existing sections, detects prop changes
- ✅ **Format & lint** — auto-formats and lints generated files
- ✅ **No commits** — leaves changes unstaged for review

## How it works

1. Reads `packages/core/src/components/<name>/<name>.tsx`
2. Extracts `@Prop()` declarations via TypeScript parsing
3. Detects files: `component.host.scss` (web component), `component.style.scss` (HTML/CSS)
4. Generates test HTML with organized sections
5. Creates Playwright test file with VARIANTS array
6. Runs prettier/eslint on output
7. Displays git diff

## When to use

- Creating visual tests for new components
- Adding new prop variants to existing components
- Updating tests when props change
- Ensuring visual regression coverage

## Manual alternative

If you prefer to create test files manually, follow this pattern:

**`packages/core/www/components/<name>/test/<name>.visual.html`:**

```html
<!doctype html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <link rel="stylesheet" href="/assets/section.css" />
    <link rel="stylesheet" href="/assets/css/design-system.local.min.css" />

    <script type="module" src="/build/design-system.esm.js"></script>
    <script nomodule src="/build/design-system.js"></script>
  </head>

  <body>
    <main class="container">
      <!-- Basic -->
      <section data-testid="basic">
        <span>Basic</span>
        <ds-component>Content</ds-component>
      </section>

      <!-- Disabled -->
      <section data-testid="disabled">
        <span>Disabled</span>
        <ds-component disabled>Content</ds-component>
      </section>
    </main>
  </body>
</html>
```

**`packages/core/src/components/<name>/test/<name>.visual.play.ts`:**

```typescript
import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'component'
const VARIANTS = ['basic', 'disabled']
const image = screenshot(TAG)

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(variant))
    })
  })
})
```

## Architecture

The skill uses:

- **AST parsing** of TypeScript component files
- **Regex-based prop detection** for `@Prop()` declarations
- **File system inspection** to detect component type
- **Interactive prompts** for user selections
- **Template generation** for HTML and test files
- **Prettier/ESLint integration** for formatting

See [SKILL.md](./SKILL.md) for CLI/harness integration details.
