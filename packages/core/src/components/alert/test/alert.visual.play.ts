import { Snackbar, Toast, expectScreenshot, screenshot, test } from '@baloise/ds-playwright'

const TAG = 'bal-alert'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test.describe('toast', () => {
  test('basic', async ({ page }) => {
    const el = page.getByTestId('toast-basic')
    await expectScreenshot(page, image('toast-basic-before'))
    await el.click()
    await expectScreenshot(page, image('toast-basic-open'))
  })

  test('closable', async ({ page }) => {
    const el = page.getByTestId('toast-closable')
    await expectScreenshot(page, image('toast-closable-before'))
    await el.click()
    await expectScreenshot(page, image('toast-closable-open'))
    const toast = new Toast(page.locator('bal-toast'))
    await toast.clickClose()
    await expectScreenshot(page, image('toast-closable-closed'))
  })

  test('infinite', async ({ page }) => {
    const el = page.getByTestId('toast-infinite')
    await expectScreenshot(page, image('toast-infinite-before'))
    await el.click()
    await expectScreenshot(page, image('toast-infinite-open'))
    const toast = new Toast(page.locator('bal-toast'))
    await toast.clickAction()
    await expectScreenshot(page, image('toast-infinite-closed'))
  })
})

test.describe('snackbar', () => {
  test('basic', async ({ page }) => {
    const el = page.getByTestId('snackbar-basic')
    await expectScreenshot(page, image('snackbar-basic-before'))
    await el.click()
    await expectScreenshot(page, image('snackbar-basic-open'))
  })

  test('closable', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Runs only on desktop')
    const el = page.getByTestId('snackbar-closable')
    await expectScreenshot(page, image('snackbar-closable-before'))
    await el.click()
    await expectScreenshot(page, image('snackbar-closable-open'))
    const snackbar = new Snackbar(page.locator('bal-snackbar'))
    await snackbar.clickClose()
    await expectScreenshot(page, image('snackbar-closable-closed'))
  })

  test('infinite', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Runs only on desktop')
    const el = page.getByTestId('snackbar-infinite')
    await expectScreenshot(page, image('snackbar-infinite-before'))
    await el.click()
    await expectScreenshot(page, image('snackbar-infinite-open'))
    const snackbar = new Snackbar(page.locator('bal-snackbar'))
    await snackbar.clickAction('Close')
    await expectScreenshot(page, image('snackbar-infinite-closed'))
  })
})
