# ds-test-component Reference

Detailed generation rules for each test file type.

---

## Visual Tests (visual.html + visual.play.ts)

### visual.html Structure

Each `<section data-testid="section-name">` contains:
1. Label: `<span>Section Name</span>`
2. Demo HTML: component with different prop values

### Section Types Generated

#### 1. Basic Section
**Always generated** if component has any testable content.

**Auto-detect common props:**
- `label`, `title`, `placeholder` → Include in demo
- `icon` → Include if prop exists
- `name`, `href`, `value`, `id` → Exclude (non-visual)

**Example:**
```html
<section data-testid="basic">
  <span>Basic</span>
  <ds-button icon="plus">Button</ds-button>
</section>
```

#### 2. Enum Props → Grouped Sections
**One section per enum prop** (user can deselect).

**Pattern:**
```html
<section data-testid="colors">
  <span>Colors</span>
  <ds-button color="primary">Primary</ds-button>
  <ds-button color="secondary">Secondary</ds-button>
  <ds-button color="tertiary">Tertiary</ds-button>
  <!-- ... all enum values -->
</section>
```

**Discovery:**
- Parse component props for types that are enums (e.g., `ButtonColor = 'primary' | 'secondary'`)
- Group all values in one section
- Section name: lowercase enum name (e.g., `color` → `colors`)

#### 3. State Props → Separate Sections
**One section per boolean state prop** (user can deselect).

**State props detected:**
- `disabled`, `loading`, `invalid`, `checked`, `selected`, `open`, `readonly`, etc.

**Pattern:**
```html
<section data-testid="disabled">
  <span>Disabled</span>
  <ds-button disabled>Disabled Button</ds-button>
</section>

<section data-testid="loading">
  <span>Loading</span>
  <ds-button loading>Loading Button</ds-button>
</section>
```

#### 4. Slots → Separate Sections
**One section per detected slot** (user can deselect).

**Discovery:**
- Parse `render()` JSX for `<slot>` elements
- Extract slot name from `name` attribute or position

**Demo content auto-detection:**
- Slot named `icon` → Show icon usage: `<ds-icon name="plus"></ds-icon>`
- Slot named `label`, `title`, `text`, `content` → Show text: "Label Text"
- Slot named `badge` → Show badge: `<ds-badge>5</ds-badge>`
- Default/unnamed slot → Show generic text: "Slot Content"

**Pattern:**
```html
<section data-testid="slot-label">
  <span>Slot: Label</span>
  <ds-button>Custom Label</ds-button>
</section>

<section data-testid="slot-icon">
  <span>Slot: Icon</span>
  <ds-button><ds-icon name="plus"></ds-icon>Button</ds-button>
</section>
```

### visual.play.ts Structure

```ts
import { expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'button'
const VARIANTS = ['basic', 'colors', 'sizes', 'disabled', 'loading', ...]

const image = screenshot(TAG)

// Style suite (tests styling without host element complications)
test.describe('style', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.setupVisualTest(`/components/${TAG}/test/${TAG}.style.html`)
  })

  VARIANTS.forEach(variant => {
    test(variant, async ({ page }) => {
      const el = page.getByTestId(variant)
      await expectScreenshot(el, image(`style-${variant}`))
    })
  })
})

// Host suite (tests complete component with shadow DOM)
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

---

## A11y Tests (a11y.play.ts)

### Comprehensive Coverage

#### 1. Axe-Core Checks
- Use `a11y()` function from `@baloise/ds-playwright`
- Auto-detects accessibility violations
- Tests all variant combinations

#### 2. Semantic Checks
- Verify interactive elements have ARIA labels
- Verify `role` attributes are correct
- Verify heading hierarchy (h1 → h2 → h3)
- Verify keyboard navigation works (Tab order, Enter/Space)
- Verify semantic HTML (button vs div, a vs span)

#### 3. Contrast Checks
- Parse component's CSS for colors
- Verify foreground/background contrast ≥ 4.5:1 (text) or 3:1 (large text)
- Test against WCAG AA standard
- Flag failures requiring manual review

### Generation

**Test all combinations:**
- Basic component
- Each enum variant separately (all colors, all sizes)
- Each state separately (disabled, loading, invalid)
- Slots populated with realistic content
- All together (enum + states combined)

**Example structure:**
```ts
import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-button>Button</ds-button>`)
  await a11y('ds-button')
})

test.describe('colors', () => {
  const COLORS = ['primary', 'secondary', 'tertiary', ...]
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-button color="${color}">Button</ds-button>`)
      await a11y('ds-button')
    })
  })
})

test.describe('states', () => {
  test('disabled', async ({ page, a11y }) => {
    await page.mount(`<ds-button disabled>Disabled</ds-button>`)
    await a11y('ds-button')
  })
  
  test('loading', async ({ page, a11y }) => {
    await page.mount(`<ds-button loading>Loading</ds-button>`)
    await a11y('ds-button')
  })
})
```

---

## Component Tests (component.play.ts)

### Event Testing

**Discovery:**
- Parse `@Event()` decorators from component class
- Extract event name and detail type

**Test generation (per event):**
```ts
test('should fire dsClick event', async ({ page }) => {
  await page.mount(`<ds-button>Click me</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  const spy = await dsButton.el.spyOnEvent('dsClick')
  
  await dsButton.click()
  
  expect(spy).toHaveReceivedEventTimes(1)
})
```

**Additional tests:**
- Event doesn't fire when state prevents it (e.g., disabled → no click)
- Event fires correct number of times (1, not multiple)
- Event contains correct detail (if applicable)

### State Testing

**Discovery:**
- Parse boolean props (disabled, loading, invalid, checked, etc.)
- Parse related event interactions

**Test generation (per state):**
```ts
test('should not fire dsClick when disabled', async ({ page }) => {
  await page.mount(`<ds-button disabled>Disabled</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  const spy = await dsButton.el.spyOnEvent('dsClick')
  
  await dsButton.assertToBeDisabled()
  
  expect(spy).toHaveReceivedEventTimes(0)
})

test('should render loading spinner when loading', async ({ page }) => {
  await page.mount(`<ds-button loading>Loading</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  
  await dsButton.assertToBeLoading()
  // If page object has part locator:
  await expect(dsButton.spinner).toBeVisible()
})
```

### Slot Testing

**Test each slot:**
```ts
test('should render slot content', async ({ page }) => {
  await page.mount(`<ds-button>Custom Label</ds-button>`)
  const dsButton = new DsButton(page.locator('ds-button'))
  
  await dsButton.assertToContainText('Custom Label')
})
```

### Value Testing

**If component has `value` prop:**
```ts
test('should have value set', async ({ page }) => {
  await page.mount(`<ds-input value="test-value"></ds-input>`)
  const dsInput = new DsInput(page.locator('ds-input'))
  
  await dsInput.hasValue('test-value')
})
```

---

## Page Object (button.po.ts)

### Structure

```ts
import { expect } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsButton extends PageObject {
  constructor(el: E2ELocator) {
    super(el)
  }

  // Part locators (readonly properties)
  readonly native = this.el.locator('[part="native"]')
  readonly spinner = this.el.locator('[part="spinner"]')
  readonly icon = this.el.locator('[part="icon"]')
  readonly label = this.el.locator('[part="label"]')

  // Action methods
  async click() {
    await this.native.click()
  }

  // State assertion methods
  async assertToBeDisabled() {
    await expect(this.el).toHaveAttribute('disabled')
  }

  async assertToBeLoading() {
    await expect(this.el).toHaveAttribute('loading')
  }

  async assertToBeInvalid() {
    await expect(this.el).toHaveAttribute('invalid')
  }

  // Value assertion
  async hasValue(value: string) {
    await expect(this.el).toHaveValue(value)
  }

  // Text assertion
  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
```

### Generation Rules

**Part Locators:**
- Parse `@part` JSDoc tags from component
- Generate `readonly` property for each
- Pattern: `readonly partName = this.el.locator('[part="partName"]')`

**Action Methods:**
- Standard actions: `click()`, `focus()`, `hover()`
- Form actions: `fill()`, `clear()`, `select()` (if applicable)
- Navigation: `navigate()` (if href-supporting component)

**State Assertion Methods:**
- One `assertToBe*()` method per boolean state prop
- Pattern: `async assertToBeDisabled() { await expect(this.el).toHaveAttribute('disabled') }`

**Value Assertion:**
- If component has `value` prop: `async hasValue(value: string)`
- Pattern: `await expect(this.el).toHaveValue(value)`

**Text Assertion:**
- `async assertToContainText(text: string)` (generated for all)

---

## Unit Tests (button.util.spec.ts)

### Auto-Detection

- Check if `button.util.ts` exists in component directory
- If not found, skip util test generation
- If found, parse exported functions

### Test Generation Per Function

#### Happy Path Tests
- Valid inputs → expected outputs
- Common use cases

**Example for `normalizeSize()`:**
```ts
describe('normalizeSize', () => {
  it('should normalize deprecated t-shirt sizes', () => {
    expect(normalizeSize('small')).toBe('sm')
    expect(normalizeSize('medium')).toBe('md')
    expect(normalizeSize('large')).toBe('lg')
  })

  it('should return unchanged for standard sizes', () => {
    expect(normalizeSize('sm')).toBe('sm')
    expect(normalizeSize('md')).toBe('md')
  })
})
```

#### Edge Case Tests
- Undefined / null / empty string
- Invalid type inputs
- Boundary values

**Example:**
```ts
describe('normalizeSize', () => {
  it('should handle undefined', () => {
    expect(normalizeSize(undefined)).toBeUndefined()
  })

  it('should handle invalid values', () => {
    expect(normalizeSize('invalid')).toBe('')
  })

  it('should handle empty string', () => {
    expect(normalizeSize('')).toBe('')
  })
})
```

#### Type Variation Tests
- If function accepts union types, test each
- If function accepts multiple overloads, test each

**Example for `getValue(prop: string | number)`:**
```ts
describe('getValue', () => {
  it('should handle string values', () => {
    expect(getValue('color')).toBe('primary')
  })

  it('should handle numeric values', () => {
    expect(getValue(0)).toBe('primary')
  })

  it('should return undefined for invalid values', () => {
    expect(getValue('invalid')).toBeUndefined()
  })
})
```

### Test File Structure

```ts
import { describe, it, expect } from 'vitest'
import {
  normalizeSize,
  getButtonClass,
  validateColor,
} from './button.util'

describe('normalizeSize', () => {
  // Happy path tests
  // Edge case tests
  // Type variation tests
})

describe('getButtonClass', () => {
  // ... tests
})

describe('validateColor', () => {
  // ... tests
})
```

---

## File Organization

### Generated Files

```
packages/core/src/components/button/
├── test/
│   ├── button.visual.html          ← Generated
│   ├── button.visual.play.ts       ← Generated
│   ├── button.a11y.play.ts         ← Generated
│   ├── button.component.play.ts    ← Generated
│   └── button.util.spec.ts         ← Generated (if .util.ts exists)

packages/playwright/src/lib/components/
└── button.po.ts                    ← Generated
```

### Running Tests

```bash
# Visual regression tests
npm run play -- --grep "button"

# A11y tests (part of play)
npm run play -- --grep "a11y"

# Component tests (part of play)
npm run play -- --grep "component"

# Unit tests
npm run test -- button.util.spec.ts
```

