import { DsInputPhone, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-input-phone label="Phone number" initial-country="CH"></ds-input-phone>`,
      renderToString,
      testInfo,
    )

    const phone = new DsInputPhone(page.locator('ds-input-phone'))
    await phone.assertToBeVisible()
  })
})
