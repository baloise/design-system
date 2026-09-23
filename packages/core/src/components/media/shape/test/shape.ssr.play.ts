import { DsShape, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-shape></ds-shape>`, renderToString, testInfo)

    const dsShape = new DsShape(page.locator('ds-shape'))
    await dsShape.assertToBeVisible()
  })
})
