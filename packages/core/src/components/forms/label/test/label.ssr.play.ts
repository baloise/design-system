import { DsLabel, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-label>My Label</ds-label>`, renderToString, testInfo)

    const dsLabel = new DsLabel(page.locator('ds-label'))
    await dsLabel.assertToBeVisible()
    await dsLabel.assertToContainText('My Label')
  })
})
