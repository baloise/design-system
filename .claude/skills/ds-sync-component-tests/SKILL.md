---
name: ds-sync-component-tests
description: Generate and maintain TDD test infrastructure for components
---

# ds-sync-component-tests

Generate and maintain TDD test infrastructure for components: Page Objects, component interaction tests, and util unit tests.

## Usage

```bash
/ds-sync-component-tests <component-name>
```

## What it does

1. **Analyzes the component** — parses TypeScript file for `@Event()`, `@Prop()`, `@Method()` declarations
2. **Detects component type** — determines if form component, interactive methods, events
3. **Asks user interactively** — which files to create/update (PO, component test, util test)
4. **Generates Page Object** (`.po.ts`)
   - Locators from shadow parts + JSDoc
   - Action methods (`click()`, `fill()`, `check()`, etc.)
   - Assertion methods (`assertToBeDisabled()`, `assertValue()`, etc.)
5. **Generates Component Test** (`.component.play.ts`)
   - Event spy tests per `@Event()` declaration
   - State tests (`disabled`, `readonly`, `checked`, `value`)
   - Form reset test (if form component)
   - Public `@Method()` tests
6. **Generates Util Test** (`.util.spec.ts`, if util file exists)
   - Branch coverage per exported function
   - TODO placeholders for expected values
7. **Updates index.ts** — exports PO from `packages/playwright/src/lib/components/`
8. **Verifies completeness** — auto-comments TODOs for gaps (missing events, methods, branches)
9. **Formats & lints** — leaves changes unstaged for review

## Example

```bash
/ds-sync-component-tests input
```

**Output:**

```
✓ Analyzed ds-input
  Events: dsChange, dsBlur, dsFocus, dsInput, dsKeyPress
  Props: value, disabled, invalid, required, readonly
  Methods: none
  Type: Form component
  Util file: yes

? Which files to generate?
  ◉ Page Object (packages/playwright/src/lib/components/input.po.ts)
  ◉ Component Test (packages/core/src/components/input/test/input.component.play.ts)
  ◉ Util Test (packages/core/src/components/input/test/input.util.spec.ts)

? Expected values for events (optional, or skip and add manually):
  dsChange detail example: { value: "typed text" }
  dsBlur detail example: { relatedTarget: null }
  [etc...]

✨ Generating files...
  ✓ Created packages/playwright/src/lib/components/input.po.ts
  ✓ Created packages/core/src/components/input/test/input.component.play.ts
  ✓ Created packages/core/src/components/input/test/input.util.spec.ts
  ✓ Updated packages/playwright/src/lib/components/index.ts

📋 Coverage verification:
  ✓ All 5 events have spy tests
  ⚠️  TODO: Form reset test — add manual steps
  ✓ All state props have tests
  ⚠️  TODO: Util function `formatPhone` — define expected outputs in tests
  ⚠️  TODO: Branch coverage incomplete for `validateEmail` — add edge cases

✅ Ready for TDD!
   Next: Fill in TODO placeholders, run tests, implement to make them pass.
   Run: npm run play -- --grep="input"
```

## Generated File Structure

### Page Object

```typescript
export class DsInput extends PageObject {
  readonly nativeInput: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.nativeInput = el.locator('[part="input"]')
  }

  async fill(value: string) {
    await this.nativeInput.fill(value)
  }

  async assertValue(value: string) {
    await expect(this.nativeInput).toHaveValue(value)
  }

  async assertToBeDisabled() {
    await expect(this.nativeInput).toBeDisabled()
  }
}
```

### Component Test

```typescript
test.describe('dsChange', () => {
  test('should fire dsChange with correct detail', async ({ page }) => {
    await page.mount(`<ds-input label="Name"></ds-input>`)
    const component = new DsInput(page.locator('ds-input'))
    const changeSpy = await component.el.spyOnEvent('dsChange')

    await component.fill('test value')

    expect(changeSpy).toHaveReceivedEventTimes(1)
    // TODO: Define expected detail
    // expect(changeSpy).toHaveReceivedEventDetail({ value: 'test value' })
  })
})

test.describe('disabled', () => {
  test('native input should be disabled', async ({ page }) => {
    await page.mount(`<ds-input label="Name" disabled></ds-input>`)
    const component = new DsInput(page.locator('ds-input'))
    const changeSpy = await component.el.spyOnEvent('dsChange')

    await component.assertToBeDisabled()
    expect(changeSpy).toHaveReceivedEventTimes(0)
  })
})
```

### Util Test

```typescript
describe('validateEmail', () => {
  it('returns true for valid email', () => {
    // TODO: Define expected output
    expect(validateEmail('user@example.com')).toBe(true)
  })

  it('handles edge case: empty string', () => {
    // TODO: Define expected output
    expect(validateEmail('')).toBe(false)
  })

  it('handles edge case: missing @', () => {
    // TODO: Define expected output
    expect(validateEmail('userexample.com')).toBe(false)
  })
})
```

## Coverage Rules

**Page Object:**

- ✅ Every interactive shadow part gets a locator + action method
- ✅ Every meaningful state gets an assertion method
- ✅ No raw `Locator` exposure — always wrap in typed helpers

**Component Test:**

- ✅ Every `@Event()` has at least one spy test
- ✅ Every state prop (`disabled`, `readonly`, `checked`, `value`) has a test
- ✅ Form reset test (if component is form component with `name` + `value`)
- ✅ Every public `@Method()` has a test
- ✅ `page.mount()` inside each test, never in `beforeEach`

**Util Test:**

- ✅ One describe block per exported function
- ✅ Coverage of all branches (if/else paths)
- ✅ Edge case tests (empty, zero, negative, max)
- ✅ Parameter combinations that diverge behavior

## Key Principles

- **TDD-first** — generates test structure, user fills in assertions
- **Type-safe** — PO methods are strongly typed, not raw Locators
- **Complete** — auto-comments TODOs for gaps in coverage
- **Learnable** — examples in comments guide user on what to test
- **No auto-commits** — changes staged for review

## Integration

Page Objects are exported from `packages/playwright/src/lib/components/index.ts` so tests can import:

```typescript
import { DsInput } from '@baloise/ds-playwright'
```

Component tests import PO class from same package:

```typescript
import { DsInput, test } from '@baloise/ds-playwright'
```
