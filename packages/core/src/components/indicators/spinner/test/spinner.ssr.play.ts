import { DsSpinner, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-spinner label="Loading..."></ds-spinner>`, renderToString, testInfo)

    const spinner = new DsSpinner(page.locator('ds-spinner'))
    await spinner.assertToBeVisible()
  })
})
