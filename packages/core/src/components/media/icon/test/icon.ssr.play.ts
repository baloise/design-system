import { DsIcon, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-icon name="plus"></ds-icon>`, renderToString, testInfo)

    const dsIcon = new DsIcon(page.locator('ds-icon'))
    await dsIcon.assertToBeVisible()
  })
})
