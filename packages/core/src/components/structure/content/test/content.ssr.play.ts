import { DsContent, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-content>Hello World</ds-content>`, renderToString, testInfo)

    const dsContent = new DsContent(page.locator('ds-content'))
    await dsContent.assertToBeVisible()
    await dsContent.assertToContainText('Hello World')
  })
})
