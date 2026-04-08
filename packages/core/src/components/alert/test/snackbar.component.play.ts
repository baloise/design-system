import { BalSnackbar, expect, test } from '@baloise/ds-playwright'

test.describe('component', () => {
  test.beforeEach('Setup', async ({ page }) => {
    await page.mount(`
      <bal-snackbar heading="My Snackbar" action="Action">This is a Snackbar content!</bal-tag>
    `)
  })

  test('Should have content', async ({ page }) => {
    const component = new BalSnackbar(page.locator('bal-snackbar'))

    await component.assertToBeVisible()
    await component.assertToHaveHeading('My Snackbar')
    await component.assertToContainText('This is a Snackbar')
  })

  test('Should fire balCloseClick event', async ({ page }) => {
    const component = new BalSnackbar(page.locator('bal-snackbar'))
    const spy = await component.el.spyOnEvent('balCloseClick')

    await component.clickClose()

    expect(spy).toHaveReceivedEventTimes(1)
  })

  test('Should fire balActionClick event', async ({ page }) => {
    const component = new BalSnackbar(page.locator('bal-snackbar'))
    const spy = await component.el.spyOnEvent('balActionClick')

    await component.clickAction('Action')

    expect(spy).toHaveReceivedEventTimes(1)
  })
})
