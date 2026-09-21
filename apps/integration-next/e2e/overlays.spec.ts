import { expect, test } from '@playwright/test'
import { collectPageErrors } from './collect-page-errors'

test('overlays page hydrates without console errors', async ({ page }) => {
  const errors = collectPageErrors(page)

  await page.goto('/overlays')

  await expect(page.getByRole('heading', { name: 'ds-react Next.js overlays' })).toBeVisible()
  expect(errors).toEqual([])
})

test('Modal onOpenChange stays in sync when dismissed with Escape', async ({ page }) => {
  await page.goto('/overlays')

  const openState = page.getByTestId('modal-open')
  await expect(openState).toHaveText('Modal open: false')

  await page.getByTestId('open-modal').click()
  await expect(openState).toHaveText('Modal open: true')
  await expect(page.locator('ds-modal dialog')).toHaveAttribute('open')

  await page.keyboard.press('Escape')

  await expect(openState).toHaveText('Modal open: false')
  await expect(page.locator('ds-modal')).not.toHaveAttribute('open')
})

test('useToast present and dismiss control a toast', async ({ page }) => {
  await page.goto('/overlays')

  await page.getByTestId('show-toast').click()
  await expect(page.locator('ds-toast')).toBeVisible()
  await expect(page.locator('ds-toast')).toContainText('Your changes have been saved.')

  await page.getByTestId('dismiss-toast').click()
  await expect(page.locator('ds-toast')).toHaveCount(0)
})

test('useSnackbar present and dismiss control a snackbar', async ({ page }) => {
  await page.goto('/overlays')

  await page.getByTestId('show-snackbar').click()
  await expect(page.locator('ds-snackbar')).toBeVisible()
  await expect(page.locator('ds-snackbar')).toContainText('You are currently offline.')

  await page.getByTestId('dismiss-snackbar').click()
  await expect(page.locator('ds-snackbar')).toHaveCount(0)
})
