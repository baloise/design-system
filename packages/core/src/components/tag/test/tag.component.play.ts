import { Tag, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.mount(`
      <bal-tag closable>My tag</bal-tag>
    `)
  })

  test('should have a default slot', async ({ page }) => {
    const dsTag = new Tag(page.locator('bal-tag'))

    await dsTag.assertToBeVisible()
    await dsTag.assertToContainText('My tag')
  })

  test('should fire dsCloseClick event', async ({ page }) => {
    const dsTag = new Tag(page.locator('bal-tag'))
    const spy = await dsTag.el.spyOnEvent('dsCloseClick')

    await dsTag.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
