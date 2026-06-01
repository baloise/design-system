# ds-sync-a11y-tests

**Generate and maintain WCAG AA accessibility test files for design system components.**

## Quick Start

```bash
/ds-sync-a11y-tests <component-name>
```

## What it does

Analyzes a component's props and automatically generates accessibility test coverage:

- **`.a11y.play.ts`** — Playwright test file with accessibility audits
  - Default test for baseline accessibility
  - Describe blocks per enum category (colors, sizes, variants, etc.)
  - Form state tests (disabled, invalid, required, readonly, checked)

## Interactive workflow

1. Reads component TypeScript file and interfaces
2. Detects enum constants (`*_COLORS`, `*_SIZES`, `*_VARIANTS`, etc.)
3. Detects if component is a form component
4. Infers sensible default content from JSDoc
5. Generates tests for all variants + form states
6. Asks user if defaults look right
7. Creates/updates `.a11y.play.ts`
8. Formats and lints output
9. Shows diffs for review (no auto-commit)

## Example

```bash
/ds-sync-a11y-tests input
```

**Output:**

```
✓ Analyzing ds-input
  Type: Form component
  Enum variants: 5

✨ Generating accessibility tests...
  ✓ Created packages/core/src/components/input/test/input.a11y.play.ts

📋 Summary:
   Component: ds-input
   Type: Form component
   Total tests: 15
   Coverage: default + 1 enum category + form states

✅ Ready for review!
   Run tests: npm run play -- --grep="input" --grep="a11y"
```

## Generated Test File Structure

```typescript
import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label"></ds-input>`)
  await a11y('ds-input')
})

test.describe('colors', () => {
  const INPUT_COLORS = ['primary', 'danger', 'success', 'warning']
  INPUT_COLORS.forEach(value => {
    test(value, async ({ page, a11y }) => {
      await page.mount(`<ds-input label="Label" color="${value}"></ds-input>`)
      await a11y('ds-input')
    })
  })
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" disabled></ds-input>`)
  await a11y('ds-input')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" invalid invalid-text="Error"></ds-input>`)
  await a11y('ds-input')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" required></ds-input>`)
  await a11y('ds-input')
})

test('readonly', async ({ page, a11y }) => {
  await page.mount(`<ds-input label="Label" readonly></ds-input>`)
  await a11y('ds-input')
})
```

## Coverage Rules

**Always included:**

- ✅ `default` — baseline accessibility test
- ✅ All enum variants from `*_COLORS`, `*_SIZES`, `*_VARIANTS`, etc. (organized in describe blocks)

**For form components:**

- ✅ `disabled` — disabled state
- ✅ `invalid` + `invalid-text="Error"` — validation error state
- ✅ `required` — required field
- ✅ `readonly` — read-only state
- ✅ `checked` — (checkbox/radio only)

**Skipped:**

- ❌ Empty string enum values (covered by default test)
- ❌ Content variants (hand-written, context-specific)

## How it works

1. **Parses component file** — reads `component.tsx` to detect FormControlInterface
2. **Extracts enums** — scans `component.interfaces.ts` for `*_COLORS`, `*_SIZES`, etc.
3. **Infers content** — uses sensible defaults per component type (button → "Click me", input → "label='Label'", etc.)
4. **Generates tests** — creates organized test structure with describe blocks
5. **Formats & lints** — runs prettier/eslint
6. **Shows diffs** — leaves changes unstaged for review

## When to use

- Creating a11y test coverage for new components
- Adding new enum values to existing components (variant, color, size)
- Ensuring WCAG AA compliance per EAA standards
- Adding form state coverage (disabled, invalid, required, etc.)

## Manual alternative

If you prefer to write tests manually, follow the pattern above: one test per enum value, organized in describe blocks, plus form state tests. Ensure all variants from the interfaces file have corresponding tests for complete coverage.

## Standards

Tests audit components against **WCAG 2.2 AA** standards per the **European Accessibility Act (EAA)**, checking:

- Contrast ratios (important for color variants)
- Semantic HTML (form controls, labels, roles)
- Keyboard navigation (interactive elements)
- ARIA attributes (state management)
- Focus indicators (disabled, readonly states)
