import { DsDatepicker, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-datepicker label="Date of birth"></ds-datepicker>`, renderToString, testInfo)

    const date = new DsDatepicker(page.locator('ds-datepicker'))
    await date.assertToBeVisible()
  })
})
