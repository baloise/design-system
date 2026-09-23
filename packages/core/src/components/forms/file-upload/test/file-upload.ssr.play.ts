import { DsFileUpload, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-file-upload label="Upload"></ds-file-upload>`, renderToString, testInfo)

    const component = new DsFileUpload(page.locator('ds-file-upload'))
    await component.assertToBeVisible()
  })
})
