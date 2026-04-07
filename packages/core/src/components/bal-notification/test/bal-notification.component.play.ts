import { BalNotification, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should have a default slot', async ({ page }) => {
    await page.mount(`
      <bal-notification>Notification message</bal-notification>
    `)

    const balNotification = new BalNotification(page.locator('bal-notification'))

    await balNotification.assertToBeVisible()
    await balNotification.assertToContainText('Notification message')
  })

  test('should fire balCloseClick event', async ({ page }) => {
    await page.mount(`
      <bal-notification closable>Notification message</bal-notification>
    `)

    const balNotification = new BalNotification(page.locator('bal-notification'))
    const spy = await balNotification.el.spyOnEvent('balCloseClick')

    await balNotification.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
