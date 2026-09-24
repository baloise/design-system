import { DsModal, mountSsr, test } from '@helvetia-design/playwright'
import { renderToString } from '@helvetia-design/core/hydrate'

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(
      page,
      `
        <ds-modal id="modal">
          <ds-modal-header>Test Title</ds-modal-header>
          <ds-modal-body><p>Body content</p></ds-modal-body>
        </ds-modal>
      `,
      renderToString,
      testInfo,
    )

    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeClosed()
  })
})
