import { Item, List, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-list', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const dsList = new List(page.locator('bal-list'))

    await dsList.assertToBeVisible()
  })

  test('should render bal-item', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item label="Item 1"></bal-item>
      </bal-list>
    `)

    const dsItem = new Item(page.locator('bal-item'))

    await dsItem.assertToBeVisible()
  })

  test('should fire dsClick event on button variant', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item variant="button" label="Item 1"></bal-item>
      </bal-list>
    `)

    const dsItem = new Item(page.locator('bal-item'))
    const spy = await dsItem.el.spyOnEvent('dsClick')

    await dsItem.clickItem()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsAccordionToggle event on accordion variant', async ({ page }) => {
    await page.mount(`
      <bal-list>
        <bal-item variant="accordion" label="Item 1">
          <span slot="accordion-content">Content</span>
        </bal-item>
      </bal-list>
    `)

    const dsItem = new Item(page.locator('bal-item'))
    const spy = await dsItem.el.spyOnEvent('dsAccordionToggle')

    await dsItem.clickItem()

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

    const dsItem = new Item(page.locator('bal-item'))

    await dsItem.accordion.assertToBeClosed()

    await dsItem.clickItem()

    await dsItem.accordion.assertToBeOpen()
  })
})
