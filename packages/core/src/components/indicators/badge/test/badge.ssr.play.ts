import { DsBadge, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-badge>42</ds-badge>`, renderToString, testInfo)

    const dsBadge = new DsBadge(page.locator('ds-badge'))
    await dsBadge.assertToBeVisible()
    await dsBadge.assertToContainText('42')
  })
})
