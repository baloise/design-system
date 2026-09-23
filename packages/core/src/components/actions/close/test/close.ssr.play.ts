import { DsClose, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-close></ds-close>`, renderToString, testInfo)

    const dsClose = new DsClose(page.locator('ds-close'))
    await dsClose.assertToBeVisible()
  })
})
