import { DsTag, expect, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-tag closable>My tag</ds-tag>`, renderToString, testInfo)

    const dsTag = new DsTag(page.locator('ds-tag'))
    await dsTag.assertToBeVisible()
    await dsTag.assertToContainText('My tag')
  })

  test('renders ds-tag-group and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-tag-group>
          <ds-tag>A</ds-tag>
          <ds-tag>B</ds-tag>
        </ds-tag-group>
      `,
      renderToString,
      testInfo,
    )

    await expect(page.locator('ds-tag-group')).toBeVisible()
  })
})
