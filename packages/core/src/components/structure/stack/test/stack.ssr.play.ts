import { DsStack, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-stack>Hello World</ds-stack>`, renderToString, testInfo)

    const dsStack = new DsStack(page.locator('ds-stack'))
    await dsStack.assertToBeVisible()
    await dsStack.assertToContainText('Hello World')
  })
})
