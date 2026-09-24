import { DsSlider, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-slider label="Label"></ds-slider>`, renderToString, testInfo)

    const slider = new DsSlider(page.locator('ds-slider'))
    await slider.assertToBeVisible()
  })
})
