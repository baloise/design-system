import { DsTooltip, test, expect } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.mount(`
      <button id="my-trigger">Hover over me</button>
      <ds-tooltip reference="my-trigger">Tooltip content</ds-tooltip>
    `)
  })

  test('should have a default slot', async ({ page }) => {
    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))

    await dsTooltip.assertToContainText('Tooltip content')
  })

  test('should be hidden by default', async ({ page }) => {
    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))

    await expect(dsTooltip.el).toHaveAttribute('aria-hidden', 'true')
  })

  test('should set aria-describedby on trigger after load', async ({ page }) => {
    const trigger = page.locator('#my-trigger')

    await expect(trigger).toHaveAttribute('aria-describedby')
  })

  test('should present and emit dsWillAnimate / dsDidAnimate', async ({ page }) => {
    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))
    const willSpy = await dsTooltip.el.spyOnEvent('dsWillAnimate')
    const didSpy = await dsTooltip.el.spyOnEvent('dsDidAnimate')

    await dsTooltip.el.evaluate((el: any) => el.present())

    expect(willSpy).toHaveReceivedEventTimes(1)
    expect(didSpy).toHaveReceivedEventTimes(1)
    await expect(dsTooltip.el).toHaveAttribute('aria-hidden', 'false')
  })

  test('should dismiss and emit dsWillAnimate / dsDidAnimate', async ({ page }) => {
    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))
    await dsTooltip.el.evaluate((el: any) => el.present())

    const willSpy = await dsTooltip.el.spyOnEvent('dsWillAnimate')
    const didSpy = await dsTooltip.el.spyOnEvent('dsDidAnimate')

    await dsTooltip.el.evaluate((el: any) => el.dismiss())

    expect(willSpy).toHaveReceivedEventTimes(1)
    expect(didSpy).toHaveReceivedEventTimes(1)
    await expect(dsTooltip.el).toHaveAttribute('aria-hidden', 'true')
  })

  test('should show on trigger mouseenter and hide on mouseleave', async ({ page }) => {
    const dsTooltip = new DsTooltip(page.locator('ds-tooltip'))
    const trigger = page.locator('#my-trigger')

    await trigger.hover()
    await expect(dsTooltip.el).toHaveAttribute('aria-hidden', 'false')

    await page.mouse.move(128, 128)
    await expect(dsTooltip.el).toHaveAttribute('aria-hidden', 'true')
  })
})
