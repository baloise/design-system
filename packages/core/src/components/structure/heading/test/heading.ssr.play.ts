import { DsHeading, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-heading>Hello World</ds-heading>`, renderToString, testInfo)

    const dsHeading = new DsHeading(page.locator('ds-heading'))
    await dsHeading.assertToBeVisible()
    await dsHeading.assertToContainText('Hello World')
  })
})
