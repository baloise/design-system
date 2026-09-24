import { DsText, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-text>Hello World</ds-text>`, renderToString, testInfo)

    const dsText = new DsText(page.locator('ds-text'))
    await dsText.assertToBeVisible()
    await dsText.assertToContainText('Hello World')
  })
})
