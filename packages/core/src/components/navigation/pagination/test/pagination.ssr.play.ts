import { DsPagination, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-pagination page-range="2" total-pages="20" value="10"></ds-pagination>`,
      renderToString,
      testInfo,
    )

    const pagination = new DsPagination(page.locator('ds-pagination'))
    await pagination.assertToBeVisible()
  })
})
