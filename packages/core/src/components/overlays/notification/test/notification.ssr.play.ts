import { DsNotification, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-notification>Notification message</ds-notification>`, renderToString, testInfo)

    const dsNotification = new DsNotification(page.locator('ds-notification'))
    await dsNotification.assertToBeVisible()
    await dsNotification.assertToContainText('Notification message')
  })
})
