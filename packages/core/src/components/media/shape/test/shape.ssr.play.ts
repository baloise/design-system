import { DsShape, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-shape></ds-shape>`, renderToString, testInfo)

    const dsShape = new DsShape(page.locator('ds-shape'))
    await dsShape.assertToBeVisible()
  })
})
