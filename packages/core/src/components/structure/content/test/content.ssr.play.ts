import { DsContent, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-content>Hello World</ds-content>`, renderToString, testInfo)

    const dsContent = new DsContent(page.locator('ds-content'))
    await dsContent.assertToBeVisible()
    await dsContent.assertToContainText('Hello World')
  })
})
