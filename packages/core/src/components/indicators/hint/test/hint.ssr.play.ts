import { DsHint, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-hint>
          <ds-hint-title>Title</ds-hint-title>
          <ds-hint-text>Body content.</ds-hint-text>
        </ds-hint>
      `,
      renderToString,
      testInfo,
    )

    const dsHint = new DsHint(page.locator('ds-hint'))
    await dsHint.assertToBeClosed()
  })
})
