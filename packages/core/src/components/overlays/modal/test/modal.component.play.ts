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

  test('a later close via the open prop does not replay a previous dismiss payload', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dsModal = new DsModal(page.locator('ds-modal'))
    await dsModal.assertToBeOpen()
    const didDismiss = await dsModal.el.spyOnEvent('dsDidDismiss')

    await page.evaluate(() => (document.querySelector('ds-modal') as any).dismiss({ confirmed: true }, 'confirm'))
    await expect.poll(() => didDismiss.length).toBe(1)

    await page.evaluate(() => ((document.querySelector('ds-modal') as any).open = true))
    await dsModal.assertToBeOpen()
    await page.evaluate(() => ((document.querySelector('ds-modal') as any).open = false))
    await expect.poll(() => didDismiss.length).toBe(2)

    expect(didDismiss.events.map(event => event.detail)).toEqual([
      { data: { confirmed: true }, role: 'confirm' },
      { data: undefined, role: undefined },
    ])
  })

  test('calling dismiss() twice in a row only emits one dsWillDismiss/dsDidDismiss pair', async ({ page }) => {
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
      modal.dismiss({ confirmed: true }, 'confirm')
      return modal.dismiss({ confirmed: false }, 'cancel')
    })
    await dsModal.assertToBeClosed()

    expect(willDismiss).toHaveReceivedEventTimes(1)
    expect(didDismiss).toHaveReceivedEventTimes(1)
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

  test('label sets aria-label on the dialog, replacing aria-labelledby', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open label="Component-overlay modal">
        <ds-modal-body>Body only, no header</ds-modal-body>
      </ds-modal>
    `)
    const dialog = page.locator('ds-modal').locator('dialog')
    await expect(dialog).toHaveAttribute('aria-label', 'Component-overlay modal')
    await expect(dialog).toHaveAccessibleName('Component-overlay modal')
  })

  test('label is ignored in favor of the header slot when no label is set', async ({ page }) => {
    await page.mount(`
      <ds-modal id="modal" open>
        <ds-modal-header>Visible title</ds-modal-header>
        <ds-modal-body>Body</ds-modal-body>
      </ds-modal>
    `)
    const dialog = page.locator('ds-modal').locator('dialog')
    await expect(dialog).toHaveAccessibleName('Visible title')
  })

  test('ModalController.create() passes label through to the mounted dialog', async ({ page }) => {
    await page.mount(`<div></div>`)

    await page.evaluate(() => {
      customElements.define(
        'test-modal-label',
        class extends HTMLElement {
          connectedCallback() {
            this.textContent = 'Mounted content'
          }
        },
      )
      const controller = (window as any).DesignSystem.modalController
      return controller.create({ component: 'test-modal-label', label: 'Mounted modal' })
    })

    const dialog = page.locator('ds-modal').locator('dialog')
    await expect(dialog).toHaveAccessibleName('Mounted modal')
  })

  test('ModalController.create() removes the modal from the DOM once dismissed', async ({ page }) => {
    await page.mount(`<div></div>`)

    await page.evaluate(() => {
      customElements.define(
        'test-modal-removal',
        class extends HTMLElement {
          connectedCallback() {
            this.textContent = 'Mounted content'
          }
        },
      )
      return (window as any).DesignSystem.modalController.create({ component: 'test-modal-removal' })
    })

    const modal = new DsModal(page.locator('ds-modal'))
    await modal.assertToBeOpen()
    await page.evaluate(() => (document.querySelector('ds-modal') as any).dismiss())
    await expect(page.locator('ds-modal')).toHaveCount(0)
    await expect(page.locator('test-modal-removal')).toHaveCount(0)
  })

  test('ModalController.create() ignores bubbled dsDidDismiss events of overlays nested in the content', async ({
    page,
  }) => {
    await page.mount(`<div></div>`)

    await page.evaluate(() => {
      customElements.define(
        'test-modal-nested',
        class extends HTMLElement {
          connectedCallback() {
            this.innerHTML = '<span id="nested-overlay">Mounted content</span>'
          }
        },
      )
      return (window as any).DesignSystem.modalController.create({ component: 'test-modal-nested' })
    })

    const modal = new DsModal(page.locator('ds-modal'))
    await modal.assertToBeOpen()

    // Same shape as the event a nested ds-popup/ds-drawer emits when it closes (bubbles + composed).
    await page.evaluate(() =>
      document
        .querySelector('#nested-overlay')!
        .dispatchEvent(new CustomEvent('dsDidDismiss', { bubbles: true, composed: true })),
    )

    await modal.assertToBeOpen()
    await expect(page.locator('test-modal-nested')).toHaveCount(1)

    await page.evaluate(() => (document.querySelector('ds-modal') as any).dismiss())
    await expect(page.locator('ds-modal')).toHaveCount(0)
  })
})
