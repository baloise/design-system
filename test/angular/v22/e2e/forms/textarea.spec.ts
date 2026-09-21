import { expect, test } from '@playwright/test'

test('syncs an externally-set FormControl value into ds-textarea', async ({ page }) => {
  await page.goto('/')

  const control = page.getByTestId('textarea-form-control').locator('textarea')
  await expect(control).toHaveValue('')

  await page.getByTestId('textarea-form-set-external-value').click()

  await expect(control).toHaveValue('external bio')
  await expect(page.getByTestId('textarea-form-value')).toHaveText('Form value: external bio')
})

test('disables ds-textarea when FormControl.disable() is called', async ({ page }) => {
  await page.goto('/')

  const control = page.getByTestId('textarea-form-control').locator('textarea')
  await expect(control).toBeEnabled()

  await page.getByTestId('textarea-form-toggle-disabled').click()

  await expect(control).toBeDisabled()
  await expect(page.getByTestId('textarea-form-disabled')).toHaveText('Form disabled: true')
})

test('shows invalidText once a required validator fails and the control is touched', async ({ page }) => {
  await page.goto('/')

  const formTextarea = page.getByTestId('textarea-form-control')
  await expect(formTextarea.locator('textarea')).toHaveAttribute('aria-invalid', 'false')

  await page.getByTestId('textarea-form-touch').click()

  await expect(formTextarea.locator('textarea')).toHaveAttribute('aria-invalid', 'true')
  await expect(formTextarea.getByRole('alert')).toHaveText('Bio is required')
})

test('updates the value span live as the user types', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('textarea-form-control').locator('textarea').fill('hello there')

  await expect(page.getByTestId('textarea-form-value')).toHaveText('Form value: hello there')
})
