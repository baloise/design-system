import { DsDrawer, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test('should render ds-drawer closed by default', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await dsDrawer.assertToBeClosed()
  })

  test('should open drawer on present()', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await dsDrawer.assertToBeClosed()

    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())

    await dsDrawer.assertToBeOpen()
  })

  test('should close drawer on dismiss()', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    await dsDrawer.assertToBeOpen()

    await page.evaluate(() => (document.querySelector('ds-drawer') as any).dismiss())

    await dsDrawer.assertToBeClosed()
  })

  test('should emit dsWillPresent and dsDidPresent on open', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    const willPresent = await dsDrawer.el.spyOnEvent('dsWillPresent')
    const didPresent = await dsDrawer.el.spyOnEvent('dsDidPresent')

    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())

    expect(willPresent).toHaveReceivedEventTimes(1)
    expect(didPresent).toHaveReceivedEventTimes(1)
  })

  test('should emit dsWillDismiss and dsDidDismiss on close', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())

    const willDismiss = await dsDrawer.el.spyOnEvent('dsWillDismiss')
    const didDismiss = await dsDrawer.el.spyOnEvent('dsDidDismiss')

    await page.evaluate(() => (document.querySelector('ds-drawer') as any).dismiss())

    expect(willDismiss).toHaveReceivedEventTimes(1)
    expect(didDismiss).toHaveReceivedEventTimes(1)
  })

  test('should render close button when closable=true', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    await expect(dsDrawer.close.el).toBeAttached()
  })

  test('should not render close button when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer" closable="false">
        <p>Content</p>
      </ds-drawer>
    `)
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await expect(dsDrawer.close.el).not.toBeAttached()
  })

  test('should close on close button click', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    await dsDrawer.assertToBeOpen()

    await dsDrawer.close.click()

    await dsDrawer.assertToBeClosed()
  })

  test('should close on Escape key', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    await dsDrawer.assertToBeOpen()

    await page.keyboard.press('Escape')

    await dsDrawer.assertToBeClosed()
  })

  test('should not close on Escape when closable=false', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer" closable="false" backdrop-dismiss="false">
        <p>Content</p>
      </ds-drawer>
    `)
    const dsDrawer = new DsDrawer(page.locator('ds-drawer'))
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())
    await dsDrawer.assertToBeOpen()

    await page.keyboard.press('Escape')

    await dsDrawer.assertToBeOpen()
  })

  test('should apply container class when container prop is set', async ({ page }) => {
    await page.mount(`
      <ds-drawer id="drawer" label="Drawer" container="fluid">
        <p>Content</p>
      </ds-drawer>
    `)
    await page.evaluate(() => (document.querySelector('ds-drawer') as any).present())

    const container = page.locator('ds-drawer').locator('.container')
    await expect(container).toHaveClass(/is-fluid/)
  })
})
