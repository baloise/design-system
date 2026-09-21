import { DsTag, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.mount(`
      <ds-tag closable>My tag</ds-tag>
    `)
  })

  test('should have a default slot', async ({ page }) => {
    const dsTag = new DsTag(page.locator('ds-tag'))

    await dsTag.assertToBeVisible()
    await dsTag.assertToContainText('My tag')
  })

  test('should fire dsCloseClick event', async ({ page }) => {
    const dsTag = new DsTag(page.locator('ds-tag'))
    const spy = await dsTag.el.spyOnEvent('dsCloseClick')

    await dsTag.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
