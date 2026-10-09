import { expect, test } from '@playwright/test'

test('DsToastService shows a toast and dismiss(id) removes it', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-toast').click()
  const toast = page.locator('ds-toast')
  await expect(toast).toBeVisible()
  await expect(toast).toContainText('Hello from DsToastService')

  await page.getByTestId('dismiss-toast').click()
  await expect(toast).toHaveCount(0)
})

test('DsSnackbarService shows a snackbar and dismiss(id) removes it', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-snackbar').click()
  const snackbar = page.locator('ds-snackbar')
  await expect(snackbar).toBeVisible()
  await expect(snackbar).toContainText('Hello from DsSnackbarService')

  await page.getByTestId('dismiss-snackbar').click()
  await expect(snackbar).toHaveCount(0)
})

test('dismissAll() removes every toast and snackbar', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-toast').click()
  await page.getByTestId('open-snackbar').click()
  await expect(page.locator('ds-toast')).toBeVisible()
  await expect(page.locator('ds-snackbar')).toBeVisible()

  await page.getByTestId('dismiss-all').click()

  await expect(page.locator('ds-toast')).toHaveCount(0)
  await expect(page.locator('ds-snackbar')).toHaveCount(0)
})

test('the closeHandler passed to create() fires when the user closes the toast', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-toast').click()
  await page.locator('ds-toast').locator('ds-close').click()

  await expect(page.getByTestId('alert-closed')).toHaveText('Closed by user: 1')
})
