import { DsSlider, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-slider label="Label"></ds-slider>`, renderToString, testInfo)

    const slider = new DsSlider(page.locator('ds-slider'))
    await slider.assertToBeVisible()
  })
})
