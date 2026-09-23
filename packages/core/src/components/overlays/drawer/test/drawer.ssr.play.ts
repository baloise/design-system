import { DsDrawer, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-drawer id="drawer" label="Drawer">
          <p>Content</p>
        </ds-drawer>
      `,
      renderToString,
      testInfo,
    )

    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await dsDrawer.assertToBeClosed()
  })
})
