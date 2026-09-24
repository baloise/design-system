import { DsNotification, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-notification>Notification message</ds-notification>`, renderToString, testInfo)

    const dsNotification = new DsNotification(page.locator('ds-notification'))
    await dsNotification.assertToBeVisible()
    await dsNotification.assertToContainText('Notification message')
  })
})
