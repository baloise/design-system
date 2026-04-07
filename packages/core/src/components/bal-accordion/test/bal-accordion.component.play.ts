import { BalAccordion, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-accordion', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const balAccordion = new BalAccordion(page.locator('bal-accordion'))

    await balAccordion.assertToBeVisible()
  })

  test('should fire balToggle event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const balAccordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await balAccordion.el.spyOnEvent('balToggle')

    await balAccordion.clickSummary()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire balOpened event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const balAccordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await balAccordion.el.spyOnEvent('balOpened')

    await balAccordion.clickSummary()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should assert open and closed state', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const balAccordion = new BalAccordion(page.locator('bal-accordion'))

    await balAccordion.assertToBeClosed()

    await balAccordion.clickSummary()

    await balAccordion.assertToBeOpen()
  })

  test('should fire balClosed event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const balAccordion = new BalAccordion(page.locator('bal-accordion'))
    const spy = await balAccordion.el.spyOnEvent('balClosed')

    await balAccordion.clickSummary() // open
    await balAccordion.clickSummary() // close

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
