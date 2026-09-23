import { expect, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-root data-testid="target-root" brand="baloise" region="DE" language="fr"></ds-root>`,
      renderToString,
      testInfo,
    )

    const dsRoot = page.locator('[data-testid="target-root"]')
    await expect(dsRoot).toBeAttached()
    await expect(dsRoot).toHaveAttribute('ready', '')
  })
})
