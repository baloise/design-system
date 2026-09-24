import { DsAppNavbar, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-app-navbar>
          <a href="/" slot="brand">Logo</a>
          <a href="/about" slot="menu-start">About</a>
        </ds-app-navbar>
      `,
      renderToString,
      testInfo,
    )

    const navbar = new DsAppNavbar(page.locator('ds-app-navbar'))
    await navbar.assertToBeVisible()
  })
})
