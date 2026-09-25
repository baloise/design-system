import { DsPhoneInput, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `<ds-phone-input label="Phone number" initial-country="CH"></ds-phone-input>`,
      renderToString,
      testInfo,
    )

    const phone = new DsPhoneInput(page.locator('ds-phone-input'))
    await phone.assertToBeVisible()
  })
})
