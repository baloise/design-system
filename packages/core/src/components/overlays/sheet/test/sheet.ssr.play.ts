import { DsSheet, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-sheet style="position: relative">Sheet content</ds-sheet>`, renderToString, testInfo)

    const dsSheet = new DsSheet(page.locator('ds-sheet'))
    await dsSheet.assertToBeVisible()
    await dsSheet.assertToContainText('Sheet content')
  })
})
