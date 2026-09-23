import { DsAccordion, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-accordion>
          <span slot="summary">Title</span>
          <span slot="content">Content</span>
        </ds-accordion>
      `,
      renderToString,
      testInfo,
    )

    const dsAccordion = new DsAccordion(page.locator('ds-accordion'))
    await dsAccordion.assertToBeVisible()
  })
})
