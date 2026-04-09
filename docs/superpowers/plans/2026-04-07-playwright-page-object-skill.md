# Playwright Page Object Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write a Claude skill that generates a Playwright Page Object and `.component.play.ts` test file for any Helvetia Design System web component from a single tag-name command.

**Architecture:** A single skill markdown file at `~/.claude/skills/playwright-page-object/skill.md` containing a deterministic extraction checklist. The skill reads each `.tsx` file in the component folder, extracts `part=""` attributes and `onClick` handlers to produce the PO, and extracts `@Event` decorators to produce event spy tests. Three validation runs (ds-badge → ds-accordion → ds-list) cover the simple, complex, and nested-children cases.

**Tech Stack:** Claude Code skill system (`~/.claude/skills/`), TypeScript, `@baloise/ds-playwright` (PageObject base, E2ELocator, spyOnEvent), Playwright test runner.

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| **Create** | `~/.claude/skills/playwright-page-object/skill.md` | The skill: step-by-step extraction checklist + templates |
| **Create** (validation) | `packages/playwright/src/lib/components/badge.po.ts` | PO for badge |
| **Create** (validation) | `packages/playwright/src/lib/components/accordion.po.ts` | PO for accordion |
| **Create** (validation) | `packages/playwright/src/lib/components/list.po.ts` | PO for list |
| **Create** (validation) | `packages/playwright/src/lib/components/item.po.ts` | PO for item (nested child of list) |
| **Modify** (validation) | `packages/playwright/src/lib/components/index.ts` | Export new POs |
| **Create** (validation) | `packages/core/src/components/badge/test/badge.component.play.ts` | Component test for badge |
| **Create** (validation) | `packages/core/src/components/accordion/test/ccordion.component.play.ts` | Component test for accordion |
| **Create** (validation) | `packages/core/src/components/list/test/list.component.play.ts` | Component test for list + item |

---

## Task 1: Write the skill file

**Files:**
- Create: `~/.claude/skills/playwright-page-object/skill.md`

- [ ] **Step 1: Create the skill directory**

```bash
mkdir -p ~/.claude/skills/playwright-page-object
```

- [ ] **Step 2: Write the skill file**

Create `~/.claude/skills/playwright-page-object/skill.md` with this exact content:

````markdown
---
name: playwright-page-object
description: Generate Playwright Page Object (.po.ts) and component test (.component.play.ts) for a Helvetia Design System web component. Trigger on: "create PO for ds-<name>", "add page object for ds-<name>", "generate playwright PO of ds-<name>"
---

# Playwright Page Object Generator

When invoked with a component name (e.g. "create PO for ds-accordion"), generate all Playwright testing artefacts for that component by following these steps exactly.

## Step 1 — Discover component files

Resolve `packages/core/src/components/<tag>/`. Recursively find every `.tsx` file within it. Each `.tsx` produces its own PO class. Process all in the same run.

Example: `list/` contains `list.tsx` and `item/item.tsx` → two PO classes: `DsList` and `DsItem`.

## Step 2 — Extract from each `.tsx` file

Read each `.tsx` and collect:

**A. `part="..."` attributes in `render()`**

Scan the `render()` method for every `part="<name>"` attribute. For each unique value:
- Note the JSX element tag (the tag the `part` attribute sits on)
- If the tag starts with `ds-`: locator type = the corresponding PO class (e.g. `<ds-icon part="marker">` → type `DsIcon`, import it)
- Otherwise: locator type = `Locator`
- If the same `part` name appears in multiple conditional branches, use the first occurrence for the type

**B. `onClick={...}` handlers in `render()`**

Find every JSX element with an `onClick` prop. For each:
- Read the nearest `part` or `id` attribute on that **same** element
- Derive the method name: `click` + PascalCase of that attribute value (e.g. `part="summary"` → `clickSummary()`)
- The method body calls `this.<partName>.click()`

**C. `@Event` decorators**

Collect every `@Event` property name (e.g. `@Event() dsToggle` → string `'dsToggle'`). These drive the test file.

**D. Default slot**

Check `render()` for a `<slot>` element with no `name` attribute. If present, add `assertToContainText` to the PO.

## Step 3 — Generate PO file(s)

One file per `.tsx` at `packages/playwright/src/lib/components/<tag>.po.ts`.

Class naming: convert tag to PascalCase (e.g. `ds-accordion` → `DsAccordion`, `ds-item` → `DsItem`).

```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
// Add one import per ds-* typed locator, e.g.:
// import { DsIcon } from './icon.po'

export class Ds<Name> extends PageObject {
  // One public property per part="..." found in render()
  public readonly <partName>: Locator          // for plain HTML elements
  public readonly <partName>: Ds<ChildName>   // for ds-* elements

  constructor(el: E2ELocator) {
    super(el)
    // Plain HTML part:
    this.<partName> = el.locator('[part="<partName>"]')
    // ds-* part:
    this.<partName> = new Ds<ChildName>(el.locator('[part="<partName>"]'))
  }

  // One method per onClick handler:
  async click<PartName>() {
    await this.<partName>.click()
  }

  // Only if a default <slot> exists in render():
  async assertToContainText(text: string) {
    await expect(this.el).toContainText(text)
  }
}
```

## Step 4 — Update index.ts

For each new PO, append to `packages/playwright/src/lib/components/index.ts`:

```ts
export * from './<tag>.po'
```

## Step 5 — Generate .component.play.ts

One test file at `packages/core/src/components/<tag>/test/<tag>.component.play.ts`.

```ts
import { Ds<Name>, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  // Always present — verifies the PO locator works
  test('should render <tag>', async ({ page }) => {
    await page.mount(`
      <!-- Minimal HTML for this test only -->
    `)

    const component = new Ds<Name>(page.locator('<tag>'))
    await component.assertToBeVisible()
    // If default slot exists: await component.assertToContainText('<text from mount>')
  })

  // One test per @Event — trigger the action that fires it, then assert count
  test('should fire <eventName> event', async ({ page }) => {
    await page.mount(`
      <!-- Minimal HTML to enable this interaction.
           Include only props required for this specific event. -->
    `)

    const component = new Ds<Name>(page.locator('<tag>'))
    const spy = await component.el.spyOnEvent('<eventName>')
    await component.click<TriggerPart>()
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

**Rules for `page.mount`:**
- Call `page.mount(...)` as the **first line inside each individual `test()` body** — never in `beforeEach`
- Having a mount in `beforeEach` AND inside a test does not work in this Playwright setup
- Each test mounts only what it needs for its own assertions
- For close/action events, include `closable`, `action`, or equivalent in that test's mount
- For open→close sequences (e.g. testing a `dsClosed` event), start in the default closed state and click twice: once to open, once to close

## Step 6 — Commit

```bash
git add \
  packages/playwright/src/lib/components/<tag>.po.ts \
  packages/playwright/src/lib/components/index.ts \
  packages/core/src/components/<tag>/test/<tag>.component.play.ts
git commit -m "test(<tag>): add page object and component playwright test"
```
````

- [ ] **Step 3: Verify the file was written**

```bash
cat ~/.claude/skills/playwright-page-object/skill.md | head -5
```

Expected output starts with `---` frontmatter containing `name: playwright-page-object`.

- [ ] **Step 4: Commit the skill**

```bash
cd /Users/hirsch/dev/baloise/design-system/next
git add docs/superpowers/specs/2026-04-07-playwright-page-object-skill-design.md \
        docs/superpowers/plans/2026-04-07-playwright-page-object-skill.md
git commit -m "docs: add playwright page object skill spec and plan"
```

---

## Task 2: Validate — `ds-badge` (simple case: no onClick, no events)

`ds-badge` has `part="badge"` on `<span>`, a default `<slot>`, no `onClick`, no `@Event`.

**Files:**
- Create: `packages/playwright/src/lib/components/badge.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/badge/test/badge.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for ds-badge" — the skill should produce all three files.

- [ ] **Step 2: Verify `badge.po.ts` content**

The generated file must match this exactly (modulo whitespace):

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

- [ ] **Step 3: Verify `index.ts` was updated**

```bash
grep "ds-badge" packages/playwright/src/lib/components/index.ts
```

Expected: `export * from './badge.po'`

- [ ] **Step 4: Verify `badge.component.play.ts` content**

The generated file must match this exactly:

```ts
import { DsBadge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-badge', async ({ page }) => {
    await page.mount(`<ds-badge>42</ds-badge>`)

    const badge = new DsBadge(page.locator('ds-badge'))
    await badge.assertToBeVisible()
    await badge.assertToContainText('42')
  })
})
```

- [ ] **Step 5: Commit**

```bash
git add packages/playwright/src/lib/components/badge.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/badge/test/badge.component.play.ts
git commit -m "test(ds-badge): add page object and component playwright test"
```

---

## Task 3: Validate — `ds-accordion` (complex case: onClick, ds-* part, multiple events)

`ds-accordion` has: `part="header"` on `<h3>`, `part="summary"` on `<button>` with `onClick`, `part="marker"` on `<ds-icon>`, `part="content"` on `<div>`. Events: `dsToggle`, `dsOpened`, `dsClosed`.

**Files:**
- Create: `packages/playwright/src/lib/components/accordion.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/accordion/test/accordion.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for ds-accordion"

- [ ] **Step 2: Verify `accordion.po.ts` content**

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

> Note: `ds-accordion` has no default `<slot>` (only named slots `summary` and `content`), so no `assertToContainText`.

- [ ] **Step 3: Verify `index.ts` was updated**

```bash
grep "ds-accordion" packages/playwright/src/lib/components/index.ts
```

Expected: `export * from './accordion.po'`

- [ ] **Step 4: Verify `accordion.component.play.ts` content**

```ts
import { DsAccordion, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-accordion', async ({ page }) => {
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
    await accordion.clickSummary() // open
    await accordion.clickSummary() // close
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

- [ ] **Step 5: Commit**

```bash
git add packages/playwright/src/lib/components/accordion.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/accordion/test/accordion.component.play.ts
git commit -m "test(ds-accordion): add page object and component playwright test"
```

---

## Task 4: Validate — `ds-list` (nested children case)

`list/` contains two `.tsx` files: `list.tsx` (part="list", no events, no onClick) and `item/item.tsx` (parts: "accordion" on `<ds-accordion>`, "item", "accordion-content"; events: dsClick, dsAccordionToggle, dsAccordionOpened, dsAccordionClosed).

**Files:**
- Create: `packages/playwright/src/lib/components/list.po.ts`
- Create: `packages/playwright/src/lib/components/item.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/list/test/list.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for ds-list"

- [ ] **Step 2: Verify `list.po.ts` content**

```ts
import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class DsList extends PageObject {
  public readonly list: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.list = el.locator('[part="list"]')
  }
}
```

- [ ] **Step 3: Verify `item.po.ts` content**

```ts
import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
import { DsAccordion } from './accordion.po'

export class DsItem extends PageObject {
  public readonly accordion: DsAccordion
  public readonly item: Locator
  public readonly accordionContent: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.accordion = new DsAccordion(el.locator('[part="accordion"]'))
    this.item = el.locator('[part="item"]')
    this.accordionContent = el.locator('[part="accordion-content"]')
  }
}
```

> Note: `ds-item` has no `onClick` directly (it delegates to `ds-accordion`), so no click methods. Events are still tested via the parent accordion's `clickSummary()`.

- [ ] **Step 4: Verify `index.ts` was updated**

```bash
grep -E "ds-list|ds-item" packages/playwright/src/lib/components/index.ts
```

Expected:
```
export * from './list.po'
export * from './item.po'
```

- [ ] **Step 5: Verify `list.component.play.ts` content**

```ts
import { DsItem, DsList, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-list', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item label="Item 1"></ds-item>
      </ds-list>
    `)

    const list = new DsList(page.locator('ds-list'))
    await list.assertToBeVisible()
  })

  test('should render ds-item', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item label="Item 1"></ds-item>
      </ds-list>
    `)

    const item = new DsItem(page.locator('ds-item'))
    await item.assertToBeVisible()
  })

  test('should fire dsClick event on ds-item', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item label="Item 1"></ds-item>
      </ds-list>
    `)

    const item = new DsItem(page.locator('ds-item'))
    const spy = await item.el.spyOnEvent('dsClick')
    await item.item.click()
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

- [ ] **Step 6: Commit**

```bash
git add packages/playwright/src/lib/components/list.po.ts \
        packages/playwright/src/lib/components/item.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/list/test/list.component.play.ts
git commit -m "test(ds-list): add page objects and component playwright test"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Skill file with step-by-step extraction checklist → Task 1
- ✅ `part=""` → public typed locator (Locator vs PO class) → Task 1 skill content, validated in Tasks 2-4
- ✅ `onClick` → click method → Task 1 skill content, validated in Task 3
- ✅ `@Event` → spy tests → Task 1 skill content, validated in Task 3
- ✅ Default slot → assertToContainText → Task 1 skill content, validated in Task 2
- ✅ Recursive child component discovery → Task 1 skill content, validated in Task 4
- ✅ `index.ts` export update → every task

**Edge case coverage:**
- Simple (no events, no onClick): ds-badge ✅
- Complex (onClick + events + ds-* part): ds-accordion ✅
- Nested children: ds-list + ds-item ✅
- Named-only slots (no assertToContainText): ds-accordion ✅

**Type consistency:** `DsAccordion`, `DsIcon`, `DsList`, `DsItem` class names used consistently across PO files and test imports. `DsIcon` referenced in accordion.po.ts — note this PO does not exist yet in the codebase and would need to be created separately if `ds-icon` has not yet had a PO generated.
