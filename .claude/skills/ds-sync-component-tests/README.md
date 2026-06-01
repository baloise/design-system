# ds-sync-component-tests

**Generate TDD test infrastructure for components: Page Objects, component interaction tests, and util unit tests.**

## Quick Start

```bash
/ds-sync-component-tests <component-name>
```

## What it generates

Three coordinated files per component:

### 1. Page Object (`packages/playwright/src/lib/components/<component>.po.ts`)

Typed wrapper around Playwright locators with action & assertion methods.

```typescript
export class DsInput extends PageObject {
  readonly nativeInput: Locator

  async fill(value: string) { ... }
  async assertValue(value: string) { ... }
  async assertToBeDisabled() { ... }
}
```

**Purpose:**

- Used by both internal tests AND published as part of `@baloise/ds-playwright` for customers
- Encapsulates all locator logic; no raw Locators exposed
- Provides typed methods for actions and assertions

### 2. Component Test (`packages/core/src/components/<component>/test/<component>.component.play.ts`)

Playwright tests for component interaction, state management, and event firing.

```typescript
test.describe('dsChange', () => {
  test('should fire dsChange with correct detail', async ({ page }) => {
    await page.mount(`<ds-input label="Name"></ds-input>`)
    const component = new DsInput(page.locator('ds-input'))
    const changeSpy = await component.el.spyOnEvent('dsChange')

    await component.fill('test value')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    expect(changeSpy).toHaveReceivedEventDetail({ value: 'test value' })
  })
})
```

**Test coverage:**

- ✅ Every `@Event()` declaration → spy test
- ✅ Every state prop (`disabled`, `readonly`, `checked`, `value`) → state test
- ✅ Form reset test (if form component)
- ✅ Every public `@Method()` → method test

### 3. Util Test (`packages/core/src/components/<component>/test/<component>.util.spec.ts`, if util exists)

Vitest unit tests for utility functions with full branch coverage.

```typescript
describe('validateEmail', () => {
  it('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('handles edge case: empty string', () => {
    expect(validateEmail('')).toBe(false)
  })

  it('each branch documented with describe blocks', () => {
    // ...
  })
})
```

**Test coverage:**

- ✅ Happy path per function
- ✅ All branches (if/else paths)
- ✅ Edge cases (empty, zero, negative, max)
- ✅ Parameter combinations that diverge behavior

## Workflow

```bash
/ds-sync-component-tests input
```

1. **Analyze** component file → extract events, props, methods
2. **Ask user** which files to generate (PO / component test / util test)
3. **Ask user** for expected event detail values (or skip to add manually)
4. **Generate** all three files with:
   - PO: locators + action/assertion methods
   - Component test: event spies + state tests
   - Util test: branch structure with TODO placeholders
5. **Update** `packages/playwright/src/lib/components/index.ts` to export PO
6. **Verify** completeness → auto-comment TODOs for gaps:
   - Missing event coverage
   - Missing state tests
   - Missing branches in util functions
7. **Format & lint** → leave unstaged for review

## Key Features

✅ **TDD-first design** — generates test structure, user fills in assertions  
✅ **Type-safe POs** — no raw Locators, all methods strongly typed  
✅ **Complete coverage** — auto-comments TODOs for gaps  
✅ **Public API** — POs are published to `@baloise/ds-playwright` for customers  
✅ **Smart analysis** — detects events, props, methods, form components, util files  
✅ **User-guided** — asks for expected values instead of guessing

## Page Object Design

**Locators** are detected from:

1. Component JSDoc (`@part` declarations)
2. Shadow DOM structure (search for `[part="…"]`)
3. Native elements (`input`, `select`, `textarea`)

**Action methods** generated per element type:

- `fill(value)` — for text inputs
- `check()` / `uncheck()` — for checkboxes/radios
- `click()` — for buttons/clickables
- `select(value)` — for selects
- `focus()` / `blur()` — for focusable elements

**Assertion methods** cover all meaningful states:

- `assertValue(value)` — native input value
- `assertToBeChecked()` / `assertToBeUnchecked()`
- `assertToBeDisabled()` / `assertToBeEnabled()`
- `assertToContainText(text)`
- Custom assertions per component

## Component Test Rules

- ✅ `page.mount()` called **inside each test**, never in `beforeEach`
- ✅ `spyOnEvent()` set up BEFORE triggering action
- ✅ Assert both count (`toHaveReceivedEventTimes`) AND payload (`toHaveReceivedEventDetail`)
- ✅ Test inverse states: unchecked after checked, blur after focus, etc.
- ✅ Form reset test: mount in `<form>`, change state, click reset button, verify initial state

## Util Test Rules

- ✅ One `describe` block per exported function
- ✅ One `it` per distinct behavior/branch — not per input value
- ✅ Group related assertions only when they test same behavior
- ✅ Import: `import { myUtil } from '../component.util'`
- ✅ Globals available: `describe`, `it`, `expect` (no imports needed)

## Completeness Checklist

After generation, verify:

- [ ] All `@Event()` declarations have spy tests
- [ ] All state props (`disabled`, `readonly`, `checked`, `value`) have tests
- [ ] Form reset test exists (if form component with `name` + `value`)
- [ ] All public `@Method()` declarations have tests
- [ ] Util file coverage: all functions tested, all branches covered
- [ ] TODO comments address: missing event details, missing branches, incomplete coverage
- [ ] PO exported in `packages/playwright/src/lib/components/index.ts`
- [ ] Tests ready to run: `npm run play -- --grep="component-name"`

## Integration

### Exporting PO

The skill auto-updates `packages/playwright/src/lib/components/index.ts`:

```typescript
export * from './input.po'
export * from './button.po'
// ... all POs exported
```

### Using PO in component tests

```typescript
import { DsInput, test } from '@baloise/ds-playwright'

test('...', async ({ page }) => {
  const component = new DsInput(page.locator('ds-input'))
  await component.fill('text')
  await component.assertValue('text')
})
```

### Using PO in customer code

Customers of the design system can import POs for their own tests:

```typescript
import { DsButton, DsInput } from '@baloise/ds-playwright'

// Use in customer's test suite
const button = new DsButton(page.locator('ds-button'))
await button.click()
```

## Testing Philosophy

This skill embraces **Test-Driven Development (TDD)**:

1. **Red** — Generate test structure with TODOs
2. **Green** — Fill in assertions, run tests (they fail)
3. **Refactor** — Implement component to make tests pass

The skill does the heavy lifting of test structure; you focus on defining behavior.
