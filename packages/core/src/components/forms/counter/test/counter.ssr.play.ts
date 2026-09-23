import { DsCounter, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-counter label="Label" value="3"></ds-counter>`, renderToString, testInfo)

    const counter = new DsCounter(page.locator('ds-counter'))
    await counter.assertToBeVisible()
  })
})
