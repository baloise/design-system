import { DsSpinner, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-spinner label="Loading..."></ds-spinner>`, renderToString, testInfo)

    const spinner = new DsSpinner(page.locator('ds-spinner'))
    await spinner.assertToBeVisible()
  })
})
