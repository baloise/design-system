import { Close, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should be visible', async ({ page }) => {
    await page.mount(`
      <bal-close></bal-close>
    `)

    const dsClose = new Close(page.locator('bal-close'))

    await dsClose.assertToBeVisible()
  })

  test('should click', async ({ page }) => {
    await page.mount(`
      <bal-close></bal-close>
    `)

    const dsClose = new Close(page.locator('bal-close'))

    await dsClose.click()
  })
})
