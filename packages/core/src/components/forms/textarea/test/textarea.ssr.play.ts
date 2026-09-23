import { DsTextarea, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-textarea label="Label"></ds-textarea>`, renderToString, testInfo)

    const textarea = new DsTextarea(page.locator('ds-textarea'))
    await textarea.assertToBeVisible()
  })
})
