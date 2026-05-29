import { DsModal, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-modal with sub-components', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>Test Title</ds-modal-header>
        <ds-modal-body><p>Body content</p></ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeVisible()
  })

  test('should open modal on present()', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeClosed()

    await page.evaluate(() => {
      const modal = document.querySelector('ds-modal') as any
      return modal.present()
    })

    await dsModal.assertToBeOpen()
  })

  test('should close modal on dismiss()', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()

    await page.evaluate(() => {
      const modal = document.querySelector('ds-modal') as any
      return modal.dismiss()
    })

    await dsModal.assertToBeClosed()
  })

  test('should emit dsWillPresent and dsDidPresent on open', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    const willPresent = await dsModal.el.spyOnEvent('dsWillPresent')
    const didPresent = await dsModal.el.spyOnEvent('dsDidPresent')

    await page.evaluate(() => {
      const modal = document.querySelector('ds-modal') as any
      return modal.present()
    })

    expect(willPresent).toHaveReceivedEventTimes(1)
    expect(didPresent).toHaveReceivedEventTimes(1)
  })

  test('should emit dsWillDismiss and dsDidDismiss on close', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    const willDismiss = await dsModal.el.spyOnEvent('dsWillDismiss')
    const didDismiss = await dsModal.el.spyOnEvent('dsDidDismiss')

    await page.evaluate(() => {
      const modal = document.querySelector('ds-modal') as any
      return modal.dismiss()
    })

    expect(willDismiss).toHaveReceivedEventTimes(1)
    expect(didDismiss).toHaveReceivedEventTimes(1)
  })

  test('should close on close button click when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()

    await dsModal.clickClose()

    await dsModal.assertToBeClosed()
  })

  test('should not render close button when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open closable="false">
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await expect(dsModal.close.el).not.toBeAttached()
  })

  test('should close on backdrop click when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()

    // Click the top-left corner of the viewport, which lands on the <dialog> backdrop
    // area (outside the centred modal box). ev.target === dialogEl triggers close.
    await page.mouse.click(5, 5)

    await dsModal.assertToBeClosed()
  })

  test('should not close on Escape when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open closable="false">
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()

    await page.keyboard.press('Escape')

    await dsModal.assertToBeOpen()
  })

  test('should support direct named slots without sub-components', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <span slot="header">Direct Title</span>
        <div slot="body"><p>Direct body</p></div>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()
    await dsModal.assertTitleText('Direct Title')
  })

  test('should assign ds-modal-header to header slot', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>My Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const slotValue = await page.evaluate(() => {
      return document.querySelector('ds-modal-header')?.slot
    })
    expect(slotValue).toBe('header')
  })

  test('should assign ds-modal-body to body slot', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const slotValue = await page.evaluate(() => {
      return document.querySelector('ds-modal-body')?.slot
    })
    expect(slotValue).toBe('body')
  })
})
