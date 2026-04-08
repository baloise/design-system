import { DsItem, DsList, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-list', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item label="Item 1"></ds-item>
      </ds-list>
    `)

    const dsList = new DsList(page.locator('ds-list'))

    await dsList.assertToBeVisible()
  })

  test('should render ds-item', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item label="Item 1"></ds-item>
      </ds-list>
    `)

    const dsItem = new DsItem(page.locator('ds-item'))

    await dsItem.assertToBeVisible()
  })

  test('should fire dsClick event on button variant', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item variant="button" label="Item 1"></ds-item>
      </ds-list>
    `)

    const dsItem = new DsItem(page.locator('ds-item'))
    const spy = await dsItem.el.spyOnEvent('dsClick')

    await dsItem.clickItem()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsAccordionToggle event on accordion variant', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item variant="accordion" label="Item 1">
          <span slot="accordion-content">Content</span>
        </ds-item>
      </ds-list>
    `)

    const dsItem = new DsItem(page.locator('ds-item'))
    const spy = await dsItem.el.spyOnEvent('dsAccordionToggle')

    await dsItem.clickItem()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should assert open and closed state on accordion variant', async ({ page }) => {
    await page.mount(`
      <ds-list>
        <ds-item variant="accordion" label="Item 1">
          <span slot="accordion-content">Content</span>
        </ds-item>
      </ds-list>
    `)

    const dsItem = new DsItem(page.locator('ds-item'))

    await dsItem.accordion.assertToBeClosed()

    await dsItem.clickItem()

    await dsItem.accordion.assertToBeOpen()
  })
})
