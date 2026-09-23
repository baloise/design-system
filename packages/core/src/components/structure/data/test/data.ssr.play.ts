import { DsData, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-data>
          <ds-data-item>
            <ds-data-label slot="label">Name</ds-data-label>
            <ds-data-value>John Doe</ds-data-value>
          </ds-data-item>
        </ds-data>
      `,
      renderToString,
      testInfo,
    )

    const data = new DsData(page.locator('ds-data'))
    await data.assertItemCount(1)
  })
})
