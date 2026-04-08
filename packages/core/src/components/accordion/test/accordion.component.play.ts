import { DsAccordion, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render bal-accordion', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const dsAccordion = new DsAccordion(page.locator('bal-accordion'))

    await dsAccordion.assertToBeVisible()
  })

  test('should fire dsToggle event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const dsAccordion = new DsAccordion(page.locator('bal-accordion'))
    const spy = await dsAccordion.el.spyOnEvent('dsToggle')

    await dsAccordion.clickSummary()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should fire dsOpened event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const dsAccordion = new DsAccordion(page.locator('bal-accordion'))
    const spy = await dsAccordion.el.spyOnEvent('dsOpened')

    await dsAccordion.clickSummary()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('should assert open and closed state', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const dsAccordion = new DsAccordion(page.locator('bal-accordion'))

    await dsAccordion.assertToBeClosed()

    await dsAccordion.clickSummary()

    await dsAccordion.assertToBeOpen()
  })

  test('should fire dsClosed event', async ({ page }) => {
    await page.mount(`
      <bal-accordion>
        <span slot="summary">Title</span>
        <span slot="content">Content</span>
      </bal-accordion>
    `)

    const dsAccordion = new DsAccordion(page.locator('bal-accordion'))
    const spy = await dsAccordion.el.spyOnEvent('dsClosed')

    await dsAccordion.clickSummary() // open
    await dsAccordion.clickSummary() // close

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
