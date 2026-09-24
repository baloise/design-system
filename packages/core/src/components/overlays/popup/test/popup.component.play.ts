import { DsPopup, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-popup closed by default', async ({ page }) => {
    await page.mount(`
      <ds-button id="trigger">Open</ds-button>
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await dsPopup.assertToBeClosed()
  })

  test('should open popup on present()', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await dsPopup.assertToBeClosed()

    await page.evaluate(() => (document.getElementById('popup') as any).present())

    await dsPopup.assertToBeOpen()
  })

  test('should close popup on dismiss()', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup') as any).present())
    await dsPopup.assertToBeOpen()

    await page.evaluate(() => (document.getElementById('popup') as any).dismiss())

    await dsPopup.assertToBeClosed()
  })

  test('should toggle popup on toggle()', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))

    await page.evaluate(() => (document.getElementById('popup') as any).toggle())
    await dsPopup.assertToBeOpen()

    await page.evaluate(() => (document.getElementById('popup') as any).toggle())
    await dsPopup.assertToBeClosed()
  })

  test('should emit dsWillPresent and dsDidPresent on open', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    const willPresent = await dsPopup.el.spyOnEvent('dsWillPresent')
    const didPresent = await dsPopup.el.spyOnEvent('dsDidPresent')

    await page.evaluate(() => (document.getElementById('popup') as any).present())

    expect(willPresent).toHaveReceivedEventTimes(1)
    expect(didPresent).toHaveReceivedEventTimes(1)
  })

  test('should emit dsWillDismiss and dsDidDismiss on close', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup') as any).present())

    const willDismiss = await dsPopup.el.spyOnEvent('dsWillDismiss')
    const didDismiss = await dsPopup.el.spyOnEvent('dsDidDismiss')

    await page.evaluate(() => (document.getElementById('popup') as any).dismiss())

    expect(willDismiss).toHaveReceivedEventTimes(1)
    expect(didDismiss).toHaveReceivedEventTimes(1)
  })

  test('should render close button when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup" closable>
        <p>Content</p>
      </ds-popup>
    `)
    await page.evaluate(() => (document.getElementById('popup') as any).present())
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await expect(dsPopup.close.el).toBeAttached()
  })

  test('should not render close button when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup">
        <p>Content</p>
      </ds-popup>
    `)
    await page.evaluate(() => (document.getElementById('popup') as any).present())
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await expect(dsPopup.close.el).not.toBeAttached()
  })

  test('should close on close button click when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup" closable>
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup') as any).present())
    await dsPopup.assertToBeOpen()

    await dsPopup.close.click()

    await dsPopup.assertToBeClosed()
  })

  test('should close on Escape key when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-popup id="popup" label="Popup" closable>
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup') as any).present())
    await dsPopup.assertToBeOpen()

    await page.keyboard.press('Escape')

    await dsPopup.assertToBeClosed()
  })

  test('should open via declarative data-popup trigger', async ({ page }) => {
    await page.mount(`
      <ds-button data-popup="popup-declarative">Open</ds-button>
      <ds-popup id="popup-declarative" label="Declarative Popup">
        <p>Content</p>
      </ds-popup>
    `)
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.getByRole('button', { name: 'Open' }).click()
    await dsPopup.assertToBeOpen()
  })

  test('should set trigger via programmatic API', async ({ page }) => {
    await page.mount(`
      <ds-button id="prog-trigger">Open</ds-button>
      <ds-popup id="popup-prog" label="Programmatic Popup" backdrop-dismiss>
        <p>Content</p>
      </ds-popup>
    `)
    await page.evaluate(() => {
      const popup = document.getElementById('popup-prog') as any
      popup.trigger = document.getElementById('prog-trigger')
    })
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup-prog') as any).present())
    await dsPopup.assertToBeOpen()

    // Click outside should dismiss
    await page.mouse.click(128, 128)
    await dsPopup.assertToBeClosed()
  })

  test('should not close on trigger click when backdrop-dismiss and trigger set', async ({ page }) => {
    await page.mount(`
      <ds-button id="trigger-bd">Open</ds-button>
      <ds-popup id="popup-bd" label="Popup" backdrop-dismiss>
        <p>Content</p>
      </ds-popup>
    `)
    await page.evaluate(() => {
      const popup = document.getElementById('popup-bd') as any
      popup.trigger = document.getElementById('trigger-bd')
    })
    const dsPopup = new DsPopup(page.locator('ds-popup'))
    await page.evaluate(() => (document.getElementById('popup-bd') as any).present())
    await dsPopup.assertToBeOpen()

    await page.getByRole('button', { name: 'Open' }).click()

    await dsPopup.assertToBeOpen()
  })
})
