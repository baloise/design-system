import { DsBrandIcon, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-brand-icon src="/assets/images/brand-icons/car-green.svg"></ds-brand-icon>`,
      renderToString,
      testInfo,
    )

    const dsBrandIcon = new DsBrandIcon(page.locator('ds-brand-icon'))
    await dsBrandIcon.assertToBeVisible()
  })
})
