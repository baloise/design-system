import { DsFileUpload, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-file-upload label="Upload"></ds-file-upload>`, renderToString, testInfo)

    const component = new DsFileUpload(page.locator('ds-file-upload'))
    await component.assertToBeVisible()
  })
})
