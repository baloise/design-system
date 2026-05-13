import { DsClose, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <ds-close></ds-close>
    `)

    const dsClose = new DsClose(page.locator('ds-close'))

    await dsClose.assertToBeVisible()
  })

  test('should click', async ({ page }) => {
    await page.mount(`
      <ds-close></ds-close>
    `)

    const dsClose = new DsClose(page.locator('ds-close'))

    await dsClose.click()
  })
})
