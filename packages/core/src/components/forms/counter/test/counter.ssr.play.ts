import { DsCounter, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-counter label="Label" value="3"></ds-counter>`, renderToString, testInfo)

    const counter = new DsCounter(page.locator('ds-counter'))
    await counter.assertToBeVisible()
  })
})
