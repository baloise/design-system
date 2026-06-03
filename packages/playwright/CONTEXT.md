# CONTEXT — packages/playwright (E2E Testing Library)

This document captures domain language, architectural patterns, and key concepts specific to the Playwright testing package.

## Overview

**packages/playwright** is a custom testing library built on **Playwright** that provides:

- **Page Objects (POs)** — Typed locators and helper methods for component interaction
- **Custom matchers** — Extended assertions for design system components
- **Test utilities** — Mounting helpers, wait conditions, accessibility testing
- **Snapshot storage** — Visual regression snapshot management

All component tests in the design system use this library for consistent, maintainable E2E testing.

## Core Concepts

### Page Object Pattern

A **Page Object** is a class that encapsulates the interaction logic for a component. Instead of tests directly querying the DOM, they call PO methods:

```typescript
// Page Object (does the heavy lifting)
export class DsButton extends PageObject {
  async click() {
    await this.el.click()
  }
}

// Test (calls the PO method)
test('button fires dsChange event', async ({ page, mount }) => {
  const button = await mount(DsButton, {
    /*props*/
  })
  await button.click()
  // assert event was fired
})
```

Benefits:

- **Maintainability** — If component structure changes, only the PO needs updating
- **Readability** — Tests read like plain English
- **Reusability** — All tests for a component use the same PO

### Test Types

| Test Type       | File Pattern         | Purpose                      | Assertions                          |
| --------------- | -------------------- | ---------------------------- | ----------------------------------- |
| **Unit**        | `.spec.ts`           | Logic, utilities, edge cases | Vitest assertions                   |
| **Interaction** | `.component.play.ts` | User interactions, events    | Custom matchers for events          |
| **Visual**      | `.visual.play.ts`    | Visual regression            | Screenshot comparisons              |
| **A11y**        | `.a11y.play.ts`      | Accessibility compliance     | axe-core checks + manual assertions |

### Test Mounting

Components are mounted in each test using the `mount` fixture:

```typescript
test('button renders correctly', async ({ page, mount }) => {
  const button = await mount(DsButton, {
    label: 'Click me',
    type: 'primary',
  })

  await expect(button.el).toBeVisible()
  await button.click()
})
```

**Key rule:** Mount in the test body, never in `beforeEach`. This ensures test isolation and clear test intent.

### Custom Matchers

The library provides domain-specific matchers:

```typescript
// Event firing assertions
await expect(button).toHaveEmitted('dsChange')
await expect(button).toHaveEmittedWith('dsChange', { value: true })

// Accessibility checks
await expect(button).toBeAccessible()

// Component state assertions
await expect(button).toBeDisabled()
await expect(button).toHaveFocus()
```

### Accessibility Testing

A11y tests verify WCAG 2.2 AA compliance:

- **Automated checks** via axe-core within Playwright
- **Keyboard navigation** — Tab, Enter, Space, Arrow keys
- **Focus management** — Visible focus indicators, logical tab order
- **Screen reader support** — Proper ARIA labels, roles, live regions
- **Color contrast** — 4.5:1 for text, 3:1 for UI components

## Notable Patterns

### PO Organization

Each component has a PO in `packages/playwright/src/lib/components/<component>.po.ts`:

```typescript
import { PageObject, E2ELocator } from '@baloise/ds-playwright'

export class DsTag extends PageObject {
  private readonly closeButton: Locator
  private readonly icon: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.closeButton = el.locator('ds-close')
    this.icon = el.locator('[role="img"]')
  }

  async clickClose() {
    await this.closeButton.click()
  }

  async getIcon() {
    return await this.icon.getAttribute('aria-label')
  }
}
```

### Visual Regression Snapshots

Snapshots are stored in `e2e/snapshots/` and tracked in git:

- **Baseline** — The approved visual state
- **Compare** — New screenshots are compared to baseline
- **Update** — Run `/update-screenshots` bot command to re-baseline after intentional changes

### Test File Organization

Each component needs test files in `packages/core/src/components/<component>/test/`:

- `<component>.spec.ts` — Unit tests (Vitest)
- `<component>.component.play.ts` — Interaction tests (Playwright)
- `<component>.visual.play.ts` — Visual regression (Playwright)
- `<component>.a11y.play.ts` — Accessibility (Playwright + axe)

## Key Constraints

- **Page Objects required** — All tests must use POs; no direct DOM queries in tests
- **Test isolation** — Mount in test body, not beforeEach
- **Accessibility mandatory** — Components with no a11y tests cannot merge
- **Visual snapshots tracked** — All visual tests must have approved snapshots
- **No console errors** — Tests fail if components emit console errors or warnings

## Related Contexts

See [CONTEXT-MAP.md](../../CONTEXT-MAP.md) for:

- [[packages/core|packages/core/CONTEXT.md]] — Components being tested
- [[root|CONTEXT.md]] — Repository-level concepts
