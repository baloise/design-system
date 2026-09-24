import { DsInput, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-input label="Label"></ds-input>`, renderToString, testInfo)

    const input = new DsInput(page.locator('ds-input'))
    await input.assertToBeVisible()
  })
})
