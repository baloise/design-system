import { DsToggle, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-toggle value="on">Toggle</ds-toggle>`, renderToString, testInfo)

    const toggle = new DsToggle(page.locator('ds-toggle'))
    await toggle.assertToBeVisible()
  })
})
