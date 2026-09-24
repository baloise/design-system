import { DsText, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-text>Hello World</ds-text>`, renderToString, testInfo)

    const dsText = new DsText(page.locator('ds-text'))
    await dsText.assertToBeVisible()
    await dsText.assertToContainText('Hello World')
  })
})
