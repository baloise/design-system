import { DsPopup, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-button id="trigger">Open</ds-button>
        <ds-popup id="popup" label="Popup">
          <p>Content</p>
        </ds-popup>
      `,
      renderToString,
      testInfo,
    )

    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await dsPopup.assertToBeClosed()
  })
})
