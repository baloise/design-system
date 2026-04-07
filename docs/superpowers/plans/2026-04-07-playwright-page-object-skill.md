# Playwright Page Object Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write a Claude skill that generates a Playwright Page Object and `.component.play.ts` test file for any Baloise Design System web component from a single tag-name command.

**Architecture:** A single skill markdown file at `~/.claude/skills/playwright-page-object/skill.md` containing a deterministic extraction checklist. The skill reads each `.tsx` file in the component folder, extracts `part=""` attributes and `onClick` handlers to produce the PO, and extracts `@Event` decorators to produce event spy tests. Three validation runs (bal-badge → bal-accordion → bal-list) cover the simple, complex, and nested-children cases.

**Tech Stack:** Claude Code skill system (`~/.claude/skills/`), TypeScript, `@baloise/ds-playwright` (PageObject base, E2ELocator, spyOnEvent), Playwright test runner.

---

## File Structure

| Action | Path | Responsibility |
|---|---|---|
| **Create** | `~/.claude/skills/playwright-page-object/skill.md` | The skill: step-by-step extraction checklist + templates |
| **Create** (validation) | `packages/playwright/src/lib/components/bal-badge.po.ts` | PO for bal-badge |
| **Create** (validation) | `packages/playwright/src/lib/components/bal-accordion.po.ts` | PO for bal-accordion |
| **Create** (validation) | `packages/playwright/src/lib/components/bal-list.po.ts` | PO for bal-list |
| **Create** (validation) | `packages/playwright/src/lib/components/bal-item.po.ts` | PO for bal-item (nested child of bal-list) |
| **Modify** (validation) | `packages/playwright/src/lib/components/index.ts` | Export new POs |
| **Create** (validation) | `packages/core/src/components/bal-badge/test/bal-badge.component.play.ts` | Component test for bal-badge |
| **Create** (validation) | `packages/core/src/components/bal-accordion/test/bal-accordion.component.play.ts` | Component test for bal-accordion |
| **Create** (validation) | `packages/core/src/components/bal-list/test/bal-list.component.play.ts` | Component test for bal-list + bal-item |

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
description: Generate Playwright Page Object (.po.ts) and component test (.component.play.ts) for a Baloise Design System web component. Trigger on: "create PO for bal-<name>", "add page object for bal-<name>", "generate playwright PO of bal-<name>"
---

# Playwright Page Object Generator

When invoked with a component name (e.g. "create PO for bal-accordion"), generate all Playwright testing artefacts for that component by following these steps exactly.

## Step 1 — Discover component files

Resolve `packages/core/src/components/<tag>/`. Recursively find every `.tsx` file within it. Each `.tsx` produces its own PO class. Process all in the same run.

Example: `bal-list/` contains `bal-list.tsx` and `bal-item/bal-item.tsx` → two PO classes: `BalList` and `BalItem`.

## Step 2 — Extract from each `.tsx` file

Read each `.tsx` and collect:

**A. `part="..."` attributes in `render()`**

Scan the `render()` method for every `part="<name>"` attribute. For each unique value:
- Note the JSX element tag (the tag the `part` attribute sits on)
- If the tag starts with `bal-`: locator type = the corresponding PO class (e.g. `<bal-icon part="marker">` → type `BalIcon`, import it)
- Otherwise: locator type = `Locator`
- If the same `part` name appears in multiple conditional branches, use the first occurrence for the type

**B. `onClick={...}` handlers in `render()`**

Find every JSX element with an `onClick` prop. For each:
- Read the nearest `part` or `id` attribute on that **same** element
- Derive the method name: `click` + PascalCase of that attribute value (e.g. `part="summary"` → `clickSummary()`)
- The method body calls `this.<partName>.click()`

**C. `@Event` decorators**

Collect every `@Event` property name (e.g. `@Event() balToggle` → string `'balToggle'`). These drive the test file.

**D. Default slot**

Check `render()` for a `<slot>` element with no `name` attribute. If present, add `assertToContainText` to the PO.

## Step 3 — Generate PO file(s)

One file per `.tsx` at `packages/playwright/src/lib/components/<tag>.po.ts`.

Class naming: convert tag to PascalCase (e.g. `bal-accordion` → `BalAccordion`, `bal-item` → `BalItem`).

```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
// Add one import per bal-* typed locator, e.g.:
// import { BalIcon } from './bal-icon.po'

export class Bal<Name> extends PageObject {
  // One public property per part="..." found in render()
  public readonly <partName>: Locator          // for plain HTML elements
  public readonly <partName>: Bal<ChildName>   // for bal-* elements

  constructor(el: E2ELocator) {
    super(el)
    // Plain HTML part:
    this.<partName> = el.locator('[part="<partName>"]')
    // bal-* part:
    this.<partName> = new Bal<ChildName>(el.locator('[part="<partName>"]'))
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
import { Bal<Name>, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  // Always present — verifies the PO locator works
  test('should render <tag>', async ({ page }) => {
    await page.mount(`
      <!-- Minimal HTML for this test only -->
    `)

    const component = new Bal<Name>(page.locator('<tag>'))
    await component.assertToBeVisible()
    // If default slot exists: await component.assertToContainText('<text from mount>')
  })

  // One test per @Event — trigger the action that fires it, then assert count
  test('should fire <eventName> event', async ({ page }) => {
    await page.mount(`
      <!-- Minimal HTML to enable this interaction.
           Include only props required for this specific event. -->
    `)

    const component = new Bal<Name>(page.locator('<tag>'))
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
- For open→close sequences (e.g. testing a `balClosed` event), start in the default closed state and click twice: once to open, once to close

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

## Task 2: Validate — `bal-badge` (simple case: no onClick, no events)

`bal-badge` has `part="badge"` on `<span>`, a default `<slot>`, no `onClick`, no `@Event`.

**Files:**
- Create: `packages/playwright/src/lib/components/bal-badge.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/bal-badge/test/bal-badge.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for bal-badge" — the skill should produce all three files.

- [ ] **Step 2: Verify `bal-badge.po.ts` content**

The generated file must match this exactly (modulo whitespace):

```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalBadge extends PageObject {
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
grep "bal-badge" packages/playwright/src/lib/components/index.ts
```

Expected: `export * from './bal-badge.po'`

- [ ] **Step 4: Verify `bal-badge.component.play.ts` content**

The generated file must match this exactly:

```ts
import { BalBadge, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-badge', async ({ page }) => {
    await page.mount(`<bal-badge>42</bal-badge>`)

    const badge = new BalBadge(page.locator('bal-badge'))
    await badge.assertToBeVisible()
    await badge.assertToContainText('42')
  })
})
```

- [ ] **Step 5: Commit**

```bash
git add packages/playwright/src/lib/components/bal-badge.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/bal-badge/test/bal-badge.component.play.ts
git commit -m "test(bal-badge): add page object and component playwright test"
```

---

## Task 3: Validate — `bal-accordion` (complex case: onClick, bal-* part, multiple events)

`bal-accordion` has: `part="header"` on `<h3>`, `part="summary"` on `<button>` with `onClick`, `part="marker"` on `<bal-icon>`, `part="content"` on `<div>`. Events: `balToggle`, `balOpened`, `balClosed`.

**Files:**
- Create: `packages/playwright/src/lib/components/bal-accordion.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/bal-accordion/test/bal-accordion.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for bal-accordion"

- [ ] **Step 2: Verify `bal-accordion.po.ts` content**

```ts
import { expect, Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
import { BalIcon } from './bal-icon.po'

export class BalAccordion extends PageObject {
  public readonly header: Locator
  public readonly summary: Locator
  public readonly marker: BalIcon
  public readonly content: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.header = el.locator('[part="header"]')
    this.summary = el.locator('[part="summary"]')
    this.marker = new BalIcon(el.locator('[part="marker"]'))
    this.content = el.locator('[part="content"]')
  }

  async clickSummary() {
    await this.summary.click()
  }
}
```

> Note: `bal-accordion` has no default `<slot>` (only named slots `summary` and `content`), so no `assertToContainText`.

- [ ] **Step 3: Verify `index.ts` was updated**

```bash
grep "bal-accordion" packages/playwright/src/lib/components/index.ts
```

Expected: `export * from './bal-accordion.po'`

- [ ] **Step 4: Verify `bal-accordion.component.play.ts` content**

```ts
import { BalAccordion, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-accordion', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const accordion = new BalAccordion(page.locator('bal-accordion'))
    await accordion.assertToBeVisible()
  })

  test('should fire balToggle event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const accordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await accordion.el.spyOnEvent('balToggle')
    await accordion.clickSummary()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire balOpened event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const accordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await accordion.el.spyOnEvent('balOpened')
    await accordion.clickSummary()
    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire balClosed event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const accordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await accordion.el.spyOnEvent('balClosed')
    await accordion.clickSummary() // open
    await accordion.clickSummary() // close
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

- [ ] **Step 5: Commit**

```bash
git add packages/playwright/src/lib/components/bal-accordion.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/bal-accordion/test/bal-accordion.component.play.ts
git commit -m "test(bal-accordion): add page object and component playwright test"
```

---

## Task 4: Validate — `bal-list` (nested children case)

`bal-list/` contains two `.tsx` files: `bal-list.tsx` (part="list", no events, no onClick) and `bal-item/bal-item.tsx` (parts: "accordion" on `<bal-accordion>`, "item", "accordion-content"; events: balClick, balAccordionToggle, balAccordionOpened, balAccordionClosed).

**Files:**
- Create: `packages/playwright/src/lib/components/bal-list.po.ts`
- Create: `packages/playwright/src/lib/components/bal-item.po.ts`
- Modify: `packages/playwright/src/lib/components/index.ts`
- Create: `packages/core/src/components/bal-list/test/bal-list.component.play.ts`

- [ ] **Step 1: Invoke the skill**

Say: "create PO for bal-list"

- [ ] **Step 2: Verify `bal-list.po.ts` content**

```ts
import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'

export class BalList extends PageObject {
  public readonly list: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.list = el.locator('[part="list"]')
  }
}
```

- [ ] **Step 3: Verify `bal-item.po.ts` content**

```ts
import { Locator } from '@playwright/test'
import { PageObject } from './page-object'
import { E2ELocator } from '../page/utils'
import { BalAccordion } from './bal-accordion.po'

export class BalItem extends PageObject {
  public readonly accordion: BalAccordion
  public readonly item: Locator
  public readonly accordionContent: Locator

  constructor(el: E2ELocator) {
    super(el)
    this.accordion = new BalAccordion(el.locator('[part="accordion"]'))
    this.item = el.locator('[part="item"]')
    this.accordionContent = el.locator('[part="accordion-content"]')
  }
}
```

> Note: `bal-item` has no `onClick` directly (it delegates to `bal-accordion`), so no click methods. Events are still tested via the parent accordion's `clickSummary()`.

- [ ] **Step 4: Verify `index.ts` was updated**

```bash
grep -E "bal-list|bal-item" packages/playwright/src/lib/components/index.ts
```

Expected:
```
export * from './bal-list.po'
export * from './bal-item.po'
```

- [ ] **Step 5: Verify `bal-list.component.play.ts` content**

```ts
import { BalItem, BalList, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-list', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const list = new BalList(page.locator('bal-list'))
    await list.assertToBeVisible()
  })

  test('should render bal-item', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const item = new BalItem(page.locator('bal-item'))
    await item.assertToBeVisible()
  })

  test('should fire balClick event on bal-item', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const item = new BalItem(page.locator('bal-item'))
    const spy = await item.el.spyOnEvent('balClick')
    await item.item.click()
    expect(spy).toHaveReceivedEventTimes(1)
  })
})
```

- [ ] **Step 6: Commit**

```bash
git add packages/playwright/src/lib/components/bal-list.po.ts \
        packages/playwright/src/lib/components/bal-item.po.ts \
        packages/playwright/src/lib/components/index.ts \
        packages/core/src/components/bal-list/test/bal-list.component.play.ts
git commit -m "test(bal-list): add page objects and component playwright test"
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
- Simple (no events, no onClick): bal-badge ✅
- Complex (onClick + events + bal-* part): bal-accordion ✅
- Nested children: bal-list + bal-item ✅
- Named-only slots (no assertToContainText): bal-accordion ✅

**Type consistency:** `BalAccordion`, `BalIcon`, `BalList`, `BalItem` class names used consistently across PO files and test imports. `BalIcon` referenced in bal-accordion.po.ts — note this PO does not exist yet in the codebase and would need to be created separately if `bal-icon` has not yet had a PO generated.
