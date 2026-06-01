---
name: ds-sync-a11y-tests
description: Generate and maintain WCAG AA accessibility test files for design system components
---

# ds-sync-a11y-tests

Generate and maintain WCAG AA accessibility test files for design system components.

## Usage

```bash
/ds-sync-a11y-tests <component-name>
```

## What it does

1. **Analyzes the component** — reads TypeScript file and interfaces
2. **Detects component type** — determines if it's a form component
3. **Extracts enum props** — finds `*_COLORS`, `*_SIZES`, `*_VARIANTS` constants
4. **Generates test file** — creates `.a11y.play.ts` with:
   - Describe blocks per enum category (colors, sizes, variants, etc.)
   - Flat tests for form states (disabled, invalid, required, readonly, checked)
   - Sensible default content based on JSDoc
5. **Merge strategy** — updates existing tests, preserves manual tweaks
6. **Formats & lints** — auto-formats output
7. **Shows diffs** — leaves changes unstaged for review

## Example

```bash
/ds-sync-a11y-tests badge
```

Output:

```
✓ Analyzed ds-badge
  Props: color, size, position
  Type: non-form component
  Enum values: 8 colors, 2 sizes, 3 positions

✨ Generating tests...
  Default test
  Colors describe block (8 tests)
  Sizes describe block (2 tests)
  Positions describe block (3 tests)

Created: packages/core/src/components/badge/test/badge.a11y.play.ts
Formatted and linted.

Summary:
  Total tests: 14
  Coverage: colors, sizes, positions

✅ Ready for review!
   Run tests: npm run play -- --grep="badge" --grep="a11y"
```

## Generated Test Structure

```typescript
import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-component>Content</ds-component>`)
  await a11y('ds-component')
})

test.describe('colors', () => {
  const COLORS = ['primary', 'danger', 'success'] // from interfaces
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-component color="${color}">Content</ds-component>`)
      await a11y('ds-component')
    })
  })
})

// Form state tests (if applicable)
test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-component disabled>Content</ds-component>`)
  await a11y('ds-component')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-component invalid invalid-text="Error">Content</ds-component>`)
  await a11y('ds-component')
})
```

## Coverage Rules

- ✅ **Mandatory**: `default` + `disabled` tests always included
- ✅ **Enum props**: All `*_COLORS`, `*_SIZES`, `*_VARIANTS`, `*_POSITIONS` values tested (skip empty strings)
- ✅ **Form states** (if FormControlInterface or form props detected):
  - `invalid` + `invalid-text`
  - `required`
  - `readonly`
  - `checked` (for checkbox/radio)
- ✅ **Organization**: Describe blocks per enum category, flat tests for states
- ✅ **Standards**: WCAG 2.2 AA compliance per European Accessibility Act (EAA)

## Detection Rules

- **Form component**: Has `FormControlInterface` or props like `disabled`, `invalid`, `required`
- **Enum props**: Constants matching pattern `<COMPONENT>_*` in interfaces.ts
- **Content defaults**: Inferred from JSDoc or sensible defaults per component type

## No Auto-Commits

Changes are left unstaged for user review. Run `npm run play -- --grep="<component>"` to execute tests and generate snapshots.
