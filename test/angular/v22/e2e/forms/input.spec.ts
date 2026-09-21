import { expect, test } from '@playwright/test'

test('syncs an externally-set FormControl value into ds-input', async ({ page }) => {
  await page.goto('/')

  const control = page.getByTestId('input-form-control').locator('input')
  await expect(control).toHaveValue('')

  await page.getByTestId('input-form-set-external-value').click()

  await expect(control).toHaveValue('external@example.com')
  await expect(page.getByTestId('input-form-value')).toHaveText('Form value: external@example.com')
})

test('disables ds-input when FormControl.disable() is called', async ({ page }) => {
  await page.goto('/')

  const control = page.getByTestId('input-form-control').locator('input')
  await expect(control).toBeEnabled()

  await page.getByTestId('input-form-toggle-disabled').click()

  await expect(control).toBeDisabled()
  await expect(page.getByTestId('input-form-disabled')).toHaveText('Form disabled: true')
})

test('shows invalidText once a required validator fails and the control is touched', async ({ page }) => {
  await page.goto('/')

  const formInput = page.getByTestId('input-form-control')
  await expect(formInput.locator('input')).toHaveAttribute('aria-invalid', 'false')

  await page.getByTestId('input-form-touch').click()

  await expect(formInput.locator('input')).toHaveAttribute('aria-invalid', 'true')
  await expect(formInput.getByRole('alert')).toHaveText('Email is required')
})

test('updates the value span live as the user types', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('input-form-control').locator('input').fill('a@b.c')

  await expect(page.getByTestId('input-form-value')).toHaveText('Form value: a@b.c')
})
