---
name: ds-sync-visual-tests
description: Generate and maintain visual regression test files for design system components
---

# ds-sync-visual-tests

Generate and maintain visual regression test files for design system components by analyzing props and creating HTML harnesses + Playwright specs.

## Usage

```bash
/ds-sync-visual-tests <component-name>
```

## What it does

1. **Analyzes the component** — parses TypeScript `@Prop()` declarations (skips `@internal` and `@deprecated`)
2. **Detects component type** — checks for `.style.scss` (HTML/CSS), `.host.scss` (web component), or both (hybrid)
3. **Interactive selection** — asks which props are visually significant and which structural patterns to test
4. **Generates/updates test files**:
   - `.visual.html` — web component test harness (if web component)
   - `.style.html` — HTML/CSS test harness (if HTML/CSS)
   - `.visual.play.ts` — Playwright visual regression tests
5. **Merge strategy** — preserves existing sections, detects prop changes, asks for approval before updating
6. **Auto-generates interactive setup** — for components with `present()`, `dismiss()`, `show()`, `hide()` methods, creates trigger buttons + wiring scripts
7. **Formats & lints** — uses existing project tooling (prettier, eslint)
8. **Shows diffs** — displays exactly what changed; leaves changes unstaged for user review

## Examples

### Create visual tests for a new component

```bash
/ds-sync-visual-tests button
```

Output:

```
✓ Analyzed ds-button
  Props: size, color, variant, disabled, loading, ...

? Which props should have visual variants?
  ◉ size
  ◉ color
  ◯ variant
  ◯ disabled (state)
  ◯ loading (state)
  ...

? Does this component have structural patterns to test?
  Suggested: None detected
  Add custom pattern? (or leave blank to skip)

Creating: packages/core/www/components/button/test/button.visual.html
Creating: packages/core/www/components/button/test/button.style.html
Creating: packages/core/src/components/button/test/button.visual.play.ts

Formatted: button.visual.html, button.style.html, button.visual.play.ts

Summary:
  button.visual.html: 6 sections (basic, sizes, colors, disabled, loading, focus)
  button.style.html: 6 sections
  button.visual.play.ts: 6 variants

Changes ready for review in git. Run: npm run play -- --grep="button" --update-snapshots
```

### Update existing tests when props change

```bash
/ds-sync-visual-tests input
```

Output:

```
✓ Analyzed ds-input
  Existing sections: basic, disabled, invalid, valid, warning, loading, long-content, suffix, number-type, slots, form-reset, button-reset, formatter

? Props that changed:
  ✨ New: mask (NEW in component)
  ⚠️  Removed: autocorrect (no longer in component)

  Update input.visual.html to include mask variant and remove autocorrect section? (y/n)
```

## Interactive Features

- **Prop selection** — checkboxes for which props matter visually
- **Pattern selection** — choose structural patterns (slots, sub-components, etc.) if component supports multiple ways to use it
- **Approval** — review changes before files are written
- **State detection** — auto-suggests testing `disabled`, `invalid`, `loading`, `readonly`, `required`

## Detection Rules

- **Web component**: `component.host.scss` exists
- **HTML/CSS**: `component.style.scss` exists
- **Hybrid**: both exist
- **Interactive**: component class has methods like `present()`, `dismiss()`, `show()`, `hide()`
- **State props**: hardcoded list (`disabled`, `invalid`, `loading`, `readonly`, `required`, `readonly`)

## Generated File Structure

### HTML Harness (`.visual.html`)

```html
<!-- One section per prop variant + one per structural pattern -->
<section data-testid="sizes">
  <span>Sizes</span>
  <ds-component size="sm">Small</ds-component>
  <ds-component size="sm" disabled>Small Disabled</ds-component>
  <ds-component size="md">Medium</ds-component>
  <!-- ... -->
</section>

<!-- Interactive components get trigger buttons -->
<section data-testid="basic">
  <span>Basic</span>
  <ds-button data-popup="popup-basic">Open basic</ds-button>
  <ds-popup id="popup-basic">Content</ds-popup>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      // wiring code
    })
  </script>
</section>
```

### Playwright Test (`.visual.play.ts`)

```ts
import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'component'
const VARIANTS = ['basic', 'sizes', 'colors', 'disabled' /* ... */]

test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })
  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, screenshot(TAG)(`style-${variant}`))
    })
  })
})

test.describe('host', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
  })
  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      // for interactive components, interact first
      await expectScreenshot(el, screenshot(TAG)(variant))
    })
  })
})
```

## Notes

- **No commits** — changes are left unstaged for user review
- **No test runs** — user runs `npm run play -- --grep="<component>" --update-snapshots` manually
- **Preserved tweaks** — existing section markup is merged, not overwritten
- **Deprecation-aware** — skips `@deprecated` props
- **State-aware** — includes `disabled`, `invalid`, etc. variants in sections
