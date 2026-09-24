import { DsTooltip, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <button id="my-trigger">Hover over me</button>
        <ds-tooltip reference="my-trigger">Tooltip content</ds-tooltip>
      `,
      renderToString,
      testInfo,
    )

    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))
    await dsTooltip.assertToContainText('Tooltip content')
  })
})
