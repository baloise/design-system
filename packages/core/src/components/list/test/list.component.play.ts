import { BalItem, BalList, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-list', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const balList = new BalList(page.locator('bal-list'))

    await balList.assertToBeVisible()
  })

  test('should render bal-item', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const balItem = new BalItem(page.locator('bal-item'))

    await balItem.assertToBeVisible()
  })

  test('should fire balClick event on button variant', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item variant="button" label="Item 1"></bal-item>
      </bal-list>
    `)

    const balItem = new BalItem(page.locator('bal-item'))
    const spy = await balItem.el.spyOnEvent('balClick')

    await balItem.clickItem()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire balAccordionToggle event on accordion variant', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item variant="accordion" label="Item 1">
          <span slot="accordion-content">Content</span>
        </bal-item>
      </bal-list>
    `)

    const balItem = new BalItem(page.locator('bal-item'))
    const spy = await balItem.el.spyOnEvent('balAccordionToggle')

    await balItem.clickItem()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should assert open and closed state on accordion variant', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item variant="accordion" label="Item 1">
          <span slot="accordion-content">Content</span>
        </bal-item>
      </bal-list>
    `)

    const balItem = new BalItem(page.locator('bal-item'))

    await balItem.accordion.assertToBeClosed()

    await balItem.clickItem()

    await balItem.accordion.assertToBeOpen()
  })
})
