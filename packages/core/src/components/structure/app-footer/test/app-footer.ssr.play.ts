import { DsAppFooter, expect, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-app-footer legal-text="Test Legal Text">
          <p>Footer Content</p>
        </ds-app-footer>
      `,
      renderToString,
      testInfo,
    )

    const footer = new DsAppFooter(page.locator('ds-app-footer'))
    await expect(footer.el).toContainText('Footer Content')
  })
})
