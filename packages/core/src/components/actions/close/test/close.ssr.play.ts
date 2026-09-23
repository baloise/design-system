import { DsClose, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-close></ds-close>`, renderToString, testInfo)

    const dsClose = new DsClose(page.locator('ds-close'))
    await dsClose.assertToBeVisible()
  })
})
