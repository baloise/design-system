import { DsSheet, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-sheet style="position: relative">Sheet content</ds-sheet>`, renderToString, testInfo)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))
    await dsSheet.assertToBeVisible()
    await dsSheet.assertToContainText('Sheet content')
  })
})
