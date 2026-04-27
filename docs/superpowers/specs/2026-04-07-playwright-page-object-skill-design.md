# Design: Playwright Page Object Skill

**Date:** 2026-04-07
**Topic:** A Claude skill that generates Playwright Page Objects and component tests for Helvetia Design System web components.

---

## Overview

The skill is invoked with a single component tag name (e.g. `ds-accordion`) and produces:

- A Page Object (PO) class for every `.tsx` file in the component folder (including nested child components)
- A single `.component.play.ts` test file covering the PO and all events
- An updated `index.ts` export in `packages/playwright/src/lib/components/`

The approach is a **step-by-step extraction checklist** (Option B): deterministic rules applied to what the skill reads from the component source, so the same input always produces the same output.

---

## Trigger

User says something like:
- "create PO for ds-accordion"
- "add page object for ds-badge"
- "generate playwright PO of ds-list"

Input is always a single component tag name.

---

## Step-by-step Process

### Step 1 — Discover all component files

Resolve `packages/core/src/components/<tag>/` and recursively find every `.tsx` file within it. This handles both single-file components (`badge/al-badge.tsx`) and components with nested children (`list/al-list.tsx`, `list/al-item/item.tsx`).

Each `.tsx` file produces its own PO class. All are processed in the same run.

### Step 2 — Extract from each `.tsx` file

For each `.tsx`, read and collect:

**A. `part="..."` attributes in `render()`**

Each unique `part` value becomes a public locator on the PO class.

- If the element tag starts with `ds-`, type the locator as the corresponding PO class (e.g. `<ds-icon part="marker">` → `public readonly marker: DsIcon`)
- Otherwise type it as `Locator` (e.g. `<button part="summary">` → `public readonly summary: Locator`)
- Constructor initializes each via `el.locator('[part="<name>"]')`

**B. `onClick={...}` handlers in `render()`**

Each `onClick` handler produces one async click method named after the nearest `part` or `id` attribute on that element.

- `<button part="summary" onClick={...}>` → `async clickSummary()`
- Method body: `await this.summary.click()`

**C. `@Event` decorators**

Collect all `@Event` names (e.g. `dsToggle`, `dsOpened`, `dsClosed`). These drive the test file in Step 5.

### Step 3 — Generate PO file(s)

One file per component at `packages/playwright/src/lib/components/<tag>.po.ts`.

Structure:
```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
// import any referenced ds-* PO classes

export class Ds<ComponentName> extends PageObject {
  // one public locator per part=""
  public readonly <partName>: Locator | Ds<ChildComponent>

  constructor(el: E2ELocator) {
    super(el)
    this.<partName> = el.locator('[part="<partName>"]')
    // for ds-* parts: this.<partName> = new Ds<Child>(el.locator('[part="<partName>"]'))
  }

  // one method per onClick
  async click<PartName>() {
    await this.<partName>.click()
  }

  // always include assertToContainText if the component has a default slot
  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
```

### Step 4 — Update `index.ts`

Add `export * from './<tag>.po'` for each new PO to `packages/playwright/src/lib/components/index.ts`.

### Step 5 — Generate `.component.play.ts`

One file at `packages/core/src/components/<tag>/test/<tag>.component.play.ts`.

Structure:
```ts
import { Ds<ComponentName>, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  // always: verify PO works (visibility + slot content)
  test('should render <component>', async ({ page }) => {
    await page.mount(`<minimal HTML snippet>`)

    const component = new Ds<ComponentName>(page.locator('<tag>'))
    await component.assertToBeVisible()
    // assertToContainText if slot present
  })

  // one test per @Event — trigger the corresponding click, assert event count
  test('should fire <eventName> event', async ({ page }) => {
    await page.mount(`<minimal HTML snippet for this interaction>`)

    const component = new Ds<ComponentName>(page.locator('<tag>'))
    const spy = await component.el.spyOnEvent('<eventName>')
    await component.click<PartName>()
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

**Mount rule:** Call `page.mount(...)` as the **first line inside each individual `test()` body**. Never use `beforeEach` for mounting — having a mount in `beforeEach` AND inside a test does not work. Each test mounts only the HTML it needs for its own assertions.

---

## Output Summary

| File | Action |
|---|---|
| `packages/playwright/src/lib/components/<tag>.po.ts` | Create (one per `.tsx` in folder) |
| `packages/playwright/src/lib/components/index.ts` | Append export lines |
| `packages/core/src/components/<tag>/test/<tag>.component.play.ts` | Create |

---

## Concrete Example: `ds-badge`

`ds-badge` has `part="badge"` on a plain `<span>`, no `onClick`, no `@Event`.

**`badge.po.ts`:**
```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsBadge extends PageObject {
  public readonly badge: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.badge = el.locator('[part="badge"]')
  }

  async assertToContainText(text: string) {
    await expect(this.badge).toContainText(text)
  }
}
```

**`badge.component.play.ts`:**
```ts
import { DsBadge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render badge content', async ({ page }) => {
    await page.mount(`<ds-badge>42</ds-badge>`)

    const badge = new DsBadge(page.locator('ds-badge'))
    await badge.assertToBeVisible()
    await badge.assertToContainText('42')
  })
})
```

## Concrete Example: `ds-accordion`

`ds-accordion` has `part="header"`, `part="summary"` (with `onClick`), `part="marker"` on `<ds-icon>`, `part="content"`, and events `dsToggle`, `dsOpened`, `dsClosed`.

**`accordion.po.ts`:**
```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
import { DsIcon } from './icon.po'

export class DsAccordion extends PageObject {
  public readonly header: Locator
  public readonly summary: Locator
  public readonly marker: DsIcon
  public readonly content: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.header = el.locator('[part="header"]')
    this.summary = el.locator('[part="summary"]')
    this.marker = new DsIcon(el.locator('[part="marker"]'))
    this.content = el.locator('[part="content"]')
  }

  async clickSummary() {
    await this.summary.click()
  }
}
```

**`accordion.component.play.ts`:**
```ts
import { DsAccordion, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render accordion', async ({ page }) => {
    await page.mount(`
      <ds-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </ds-accordion>
    `)

    const accordion = new DsAccordion(page.locator('ds-accordion'))
    await accordion.assertToBeVisible()
  })

  test('should fire dsToggle event', async ({ page }) => {
    await page.mount(`
      <ds-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </ds-accordion>
    `)

    const accordion = new DsAccordion(page.locator('ds-accordion'))
    const spy = await accordion.el.spyOnEvent('dsToggle')
    await accordion.clickSummary()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsOpened event', async ({ page }) => {
    await page.mount(`
      <ds-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </ds-accordion>
    `)

    const accordion = new DsAccordion(page.locator('ds-accordion'))
    const spy = await accordion.el.spyOnEvent('dsOpened')
    await accordion.clickSummary()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsClosed event', async ({ page }) => {
    await page.mount(`
      <ds-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </ds-accordion>
    `)

    const accordion = new DsAccordion(page.locator('ds-accordion'))
    const spy = await accordion.el.spyOnEvent('dsClosed')
    // open first, then close
    await accordion.clickSummary()
    await accordion.clickSummary()
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

---

## Edge Cases

- **No `part` attributes:** PO only has the inherited `assertToBeVisible()` / `assertToBeHidden()` from `PageObject` plus `assertToContainText` if there is a default slot.
- **Same `part` name on multiple elements** (e.g. `part="marker"` appears conditionally in two branches): use the first occurrence for the locator type; the selector `[part="marker"]` will match whichever is rendered.
- **Child components (e.g. `list/al-item`):** generate a separate `item.po.ts` following the same rules; include it in the same `index.ts` update and the same `.component.play.ts`.
- **Referenced ds-* PO not yet created:** generate that PO too in the same run, or note it as a dependency if out of scope.
