import { DsItem, DsList, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-list>
          <ds-item label="Item 1"></ds-item>
        </ds-list>
      `,
      renderToString,
      testInfo,
    )

    const dsList = new DsList(page.locator('ds-list'))
    await dsList.assertToBeVisible()

    const dsItem = new DsItem(page.locator('ds-item'))
    await dsItem.assertToBeVisible()
  })
})
