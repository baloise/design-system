import { DsModal, expect, test } from '@helvetia-design/playwright'

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

  test('should apply is-fullscreen class when fullscreen=true', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" fullscreen>
        <ds-modal-header>Fullscreen</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    await page.evaluate(() => (document.querySelector('ds-modal') as any).present())
    await expect(page.locator('ds-modal')).toHaveClass(/is-fullscreen/)
  })

  test('should not apply is-fullscreen class when fullscreen=false', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal">
        <ds-modal-header>Normal</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    await expect(page.locator('ds-modal')).not.toHaveClass(/is-fullscreen/)
  })

  test('fullscreen modal should not close on Escape when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open fullscreen closable="false">
        <ds-modal-header>Fullscreen</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()

    await page.keyboard.press('Escape')

    await dsModal.assertToBeOpen()
  })

  test('dismiss(data, role) emits that payload on dsWillDismiss and dsDidDismiss', async ({ page }) => {
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
      return modal.dismiss({ confirmed: true }, 'confirm')
    })

    expect(willDismiss).toHaveReceivedEventDetail({ data: { confirmed: true }, role: 'confirm' })
    expect(didDismiss).toHaveReceivedEventDetail({ data: { confirmed: true }, role: 'confirm' })
  })

  test('dismissing via Escape emits role "escape"', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    const didDismiss = await dsModal.el.spyOnEvent('dsDidDismiss')

    await page.keyboard.press('Escape')

    expect(didDismiss).toHaveReceivedEventDetail({ data: undefined, role: 'escape' })
  })

  test('dismissing via backdrop click emits role "backdrop"', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    const didDismiss = await dsModal.el.spyOnEvent('dsDidDismiss')

    // Click the top-left corner of the viewport, which lands on the <dialog> backdrop
    // area (outside the centred modal box). ev.target === dialogEl triggers close.
    await page.mouse.click(5, 5)

    expect(didDismiss).toHaveReceivedEventDetail({ data: undefined, role: 'backdrop' })
  })

  test('dismissing via the close button emits role "close"', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    const didDismiss = await dsModal.el.spyOnEvent('dsDidDismiss')

    await dsModal.clickClose()

    expect(didDismiss).toHaveReceivedEventDetail({ data: undefined, role: 'close' })
  })

  test('ModalController.create() mounts a string component ref into the body slot (no-delegate fallback)', async ({
    page,
  }) => {
    await page.mount(`<div></div>`)

    await page.evaluate(() => {
      customElements.define(
        'test-modal-content',
        class extends HTMLElement {
          connectedCallback() {
            this.textContent = 'Mounted content'
          }
        },
      )
      const controller = (window as any).DesignSystem.modalController
      return controller.create({ component: 'test-modal-content' })
    })

    const modal = new DsModal(page.locator('ds-modal'))
    await modal.assertToBeOpen()
    const content = page.locator('ds-modal test-modal-content')
    await expect(content).toHaveAttribute('slot', 'body')
    await expect(content).toHaveText('Mounted content')
  })

  test('ModalController.create() mounts an HTMLElement component ref with componentProps into the body slot (no-delegate fallback)', async ({
    page,
  }) => {
    await page.mount(`<div></div>`)

    await page.evaluate(() => {
      const component = document.createElement('div')
      const controller = (window as any).DesignSystem.modalController
      return controller.create({ component, componentProps: { textContent: 'Props applied' } })
    })

    const modal = new DsModal(page.locator('ds-modal'))
    await modal.assertToBeOpen()
    const content = page.locator('ds-modal div[slot="body"]')
    await expect(content).toHaveAttribute('slot', 'body')
    await expect(content).toHaveText('Props applied')
  })
})
