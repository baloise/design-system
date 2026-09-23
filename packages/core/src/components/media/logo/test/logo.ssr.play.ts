import { DsLogo, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-logo></ds-logo>`, renderToString, testInfo)

    const dsLogo = new DsLogo(page.locator('ds-logo'))
    await dsLogo.assertToBeVisible()
  })
})
