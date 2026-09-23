import { DsNumberInput, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-number-input label="Label"></ds-number-input>`, renderToString, testInfo)

    const input = new DsNumberInput(page.locator('ds-number-input'))
    await input.assertToBeVisible()
  })
})
