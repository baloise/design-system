import { DsNotification, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <ds-notification>Notification message</ds-notification>
    `)

    const dsNotification = new DsNotification(page.locator('ds-notification'))

    await dsNotification.assertToBeVisible()
    await dsNotification.assertToContainText('Notification message')
  })

  test('should fire dsCloseClick event', async ({ page }) => {
    await page.mount(`
      <ds-notification closable>Notification message</ds-notification>
    `)

    const dsNotification = new DsNotification(page.locator('ds-notification'))
    const spy = await dsNotification.el.spyOnEvent('dsCloseClick')

    await dsNotification.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
