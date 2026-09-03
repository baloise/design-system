import { expect, test } from '@playwright/test'

test('ds-input fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('input').locator('input').fill('hello')

  await expect(page.getByTestId('input-value')).toHaveText('Input value: hello')
})

test('ds-input reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveInput = page.getByTestId('reactive-input')
  const nativeInput = reactiveInput.locator('input')

  await expect(nativeInput).toHaveValue('Alice')

  await nativeInput.fill('Bob')
  await nativeInput.blur()
  await expect(page.getByTestId('reactive-value')).toHaveText('Reactive value: Bob')

  await page.getByTestId('set-reactive-value').click()
  await expect(nativeInput).toHaveValue('Carol')

  await page.getByTestId('toggle-reactive-disabled').click()
  await expect(nativeInput).toBeDisabled()

  await page.getByTestId('toggle-reactive-disabled').click()
  await expect(nativeInput).toBeEnabled()

  await nativeInput.fill('')
  await nativeInput.blur()
  await expect(nativeInput).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveInput.locator('[role="alert"]')).toHaveText('This field is required')
})
