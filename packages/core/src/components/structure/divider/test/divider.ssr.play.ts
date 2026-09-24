import { DsDivider, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-divider></ds-divider>`, renderToString, testInfo)

    const dsDivider = new DsDivider(page.locator('ds-divider'))
    await dsDivider.assertToBeVisible()
  })
})
