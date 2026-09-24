import { DsInput, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-input label="Label"></ds-input>`, renderToString, testInfo)

    const input = new DsInput(page.locator('ds-input'))
    await input.assertToBeVisible()
  })
})
