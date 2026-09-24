import { expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-progress-bar value="50"></ds-progress-bar>`, renderToString, testInfo)

    await expect(page.locator('ds-progress-bar')).toBeVisible()
  })
})
