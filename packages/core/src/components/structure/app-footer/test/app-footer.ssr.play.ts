import { DsAppFooter, expect, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

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
