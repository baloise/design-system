import { DsLogo, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-logo></ds-logo>`, renderToString, testInfo)

    const dsLogo = new DsLogo(page.locator('ds-logo'))
    await dsLogo.assertToBeVisible()
  })
})
