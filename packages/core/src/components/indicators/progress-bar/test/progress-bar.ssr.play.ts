import { expect, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-progress-bar value="50"></ds-progress-bar>`, renderToString, testInfo)

    await expect(page.locator('ds-progress-bar')).toBeVisible()
  })
})
