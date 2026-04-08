import { Notification, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-notification>Notification message</bal-notification>
    `)

    const dsNotification = new Notification(page.locator('bal-notification'))

    await dsNotification.assertToBeVisible()
    await dsNotification.assertToContainText('Notification message')
  })

  test('should fire dsCloseClick event', async ({ page }) => {
    await page.mount(`
      <bal-notification closable>Notification message</bal-notification>
    `)

    const dsNotification = new Notification(page.locator('bal-notification'))
    const spy = await dsNotification.el.spyOnEvent('dsCloseClick')

    await dsNotification.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
