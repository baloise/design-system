import { DsPagination, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

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
