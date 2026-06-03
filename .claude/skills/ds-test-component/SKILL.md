---
name: ds-test-component
description: Auto-generate all test files for DS components including visual, a11y, component, page object, and unit tests. Use when creating new components or setting up comprehensive test coverage.
---

# Test Component

Auto-generates all test files for a Helvetia Design System component in one command.

## Quick Start

Generate all tests for a component:

```bash
ds-test-component button
```

Process:
1. Parse component props, events, slots, parts, states
2. Show checklists for visual props and slots
3. Generate 6 file types (or fewer if not applicable)
4. Report summary with test counts

Output files:
- `button.visual.html` — Visual test fixture with variant sections
- `button.visual.play.ts` — Playwright visual regression tests
- `button.a11y.play.ts` — Comprehensive accessibility tests
- `button.component.play.ts` — Event and behavior tests
- `button.po.ts` — Page object in `packages/playwright/src/lib/components/`
- `button.util.spec.ts` — Unit tests (if `.util.ts` exists)

## What Gets Generated

### 1. Visual Tests

**visual.html** — Test fixture with sections:
- **Basic** — Minimal component demo with auto-detected common props
- **Enum variants** — All color/size values in one section per enum
- **State variants** — Separate section per state (disabled, loading, invalid, etc.)
- **Slot demos** — One section per slot, auto-detected from `render()` JSX

**visual.play.ts** — Playwright tests:
- "style" suite: screenshots from `button.style.html`
- "host" suite: screenshots from `button.visual.html`
- One test per variant

### 2. Accessibility Tests

**a11y.play.ts** — Comprehensive a11y coverage:
- Axe-core checks (auto-detected violations)
- Semantic checks (ARIA labels, roles, heading hierarchy)
- Contrast checks (WCAG AA compliance)
- Tests all variants (colors, sizes, states)

### 3. Component Tests

**component.play.ts** — Behavior tests:
- **Event tests** — Auto-discovered from `@Event()` decorators
  - Verify each event fires
  - Verify event doesn't fire when expected (e.g., disabled)
- **State tests** — Auto-discovered from boolean props
  - Assertions for each state (disabled, loading, invalid, etc.)
- **Slot tests** — Verify each slot renders correctly
- **Value tests** — If component has `value` prop, test `hasValue()` assertion

### 4. Page Object

**button.po.ts** — Page object for testing:
- **Part locators** — `readonly` property for each `@part` JSDoc tag
  - Pattern: `native = this.el.locator('[part="native"]')`
- **Action methods** — `click()`, `focus()`, etc.
- **Assertion methods** — `assertToBeDisabled()`, `assertToBeLoading()`, etc.
  - One method per boolean state prop
  - Plus `hasValue()` if component has `value` prop`

Located in: `packages/playwright/src/lib/components/button.po.ts`

### 5. Unit Tests (if applicable)

**button.util.spec.ts** — Tests for utility functions:
- Auto-detects `button.util.ts` if it exists
- Generates comprehensive test cases per function
  - Happy paths (valid inputs → expected outputs)
  - Edge cases (undefined, null, empty string, invalid values)
  - Type variations (if function accepts multiple types)
- Ready to run with `npm test`

## Workflow

### Step 1: Invoke
```bash
ds-test-component button
```

### Step 2: Confirm Visual Props
```
Detected props: color, size, disabled, loading, icon, label

Which are visual props? (deselect unwanted)
  ✓ color (enum)
  ✓ size (enum)
  ✓ disabled (state)
  ✓ loading (state)
  ✓ icon (prop)
  ✗ label (skip)
```

### Step 3: Confirm Slots
```
Detected slots: icon, label, badge

Which to demo? (deselect unwanted)
  ✓ icon
  ✓ label
  ✓ badge
```

### Step 4: Files Generated
```
✓ button.visual.html (8 variant sections)
✓ button.visual.play.ts (16 visual tests)
✓ button.a11y.play.ts (12 a11y tests)
✓ button.component.play.ts (8 event + 4 state tests)
✓ button.po.ts (5 parts + 4 assertions)
✓ button.util.spec.ts (4 utils, 18 test cases)

Next: Review files, run tests: npm run play, npm test
```

## Example: Button Component

### Generated visual.html sections:
```html
<!-- Basic -->
<section data-testid="basic">
  <span>Basic</span>
  <ds-button icon="plus">Button</ds-button>
</section>

<!-- Colors (enum) -->
<section data-testid="colors">
  <span>Colors</span>
  <ds-button color="primary">Primary</ds-button>
  <ds-button color="secondary">Secondary</ds-button>
  ...
</section>

<!-- Disabled (state) -->
<section data-testid="disabled">
  <span>Disabled</span>
  <ds-button disabled>Disabled</ds-button>
</section>

<!-- Icon slot demo -->
<section data-testid="slot-icon">
  <span>Slot: Icon</span>
  <ds-button><ds-icon name="plus"></ds-icon>Button</ds-button>
</section>
```

### Generated component test:
```ts
test('should fire dsClick event', async ({ page }) => {
  await page.mount(`<ds-button>Click me</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  const spy = await dsButton.el.spyOnEvent('dsClick')
  
  await dsButton.click()
  expect(spy).toHaveReceivedEventTimes(1)
})

test('should not fire dsClick when disabled', async ({ page }) => {
  await page.mount(`<ds-button disabled>Disabled</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  const spy = await dsButton.el.spyOnEvent('dsClick')
  
  await dsButton.assertToBeDisabled()
  expect(spy).toHaveReceivedEventTimes(0)
})
```

### Generated page object:
```ts
export class DsButton extends PageObject {
  readonly native = this.el.locator('[part="native"]')
  readonly spinner = this.el.locator('[part="spinner"]')
  readonly icon = this.el.locator('[part="icon"]')
  
  async click() { await this.native.click() }
  
  async assertToBeDisabled() {
    await expect(this.el).toHaveAttribute('disabled')
  }
  
  async assertToBeLoading() {
    await expect(this.el).toHaveAttribute('loading')
  }
  
  async hasValue(value: string) {
    await expect(this.el).toHaveValue(value)
  }
}
```

## Key Behaviors

- ✅ **Auto-discovers events** from `@Event()` decorators
- ✅ **Auto-discovers states** from boolean props (disabled, loading, invalid, checked, etc.)
- ✅ **Auto-discovers slots** from `render()` JSX, auto-generates demo content
- ✅ **Auto-discovers parts** from `@part` JSDoc tags
- ✅ **Auto-discovers utils** — generates comprehensive tests if `.util.ts` exists
- ✅ **Never skips visual props** that user confirms — all get sections
- ✅ **Never skips events or states** — all get test coverage
- ✅ **Comprehensive unit tests** — not stubs; edge cases included

## Related

See [REFERENCE.md](REFERENCE.md) for detailed generation rules for each test type.
