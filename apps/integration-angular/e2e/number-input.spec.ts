import { expect, test } from '@playwright/test'

test('ds-number-input fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('number-input').locator('input').fill('42')

  await expect(page.getByTestId('number-input-value')).toHaveText('Number input value: 42')
})

test('ds-number-input reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveNumberInput = page.getByTestId('reactive-number-input')
  const nativeInput = reactiveNumberInput.locator('input')

  await expect(nativeInput).toHaveValue('1')

  await nativeInput.fill('2')
  await nativeInput.blur()
  await expect(page.getByTestId('reactive-number-value')).toHaveText('Reactive value: 2')

  await page.getByTestId('set-reactive-number-value').click()
  await expect(nativeInput).toHaveValue('3')

  await page.getByTestId('toggle-reactive-number-disabled').click()
  await expect(nativeInput).toBeDisabled()

  await page.getByTestId('toggle-reactive-number-disabled').click()
  await expect(nativeInput).toBeEnabled()

  await nativeInput.fill('')
  await nativeInput.blur()
  await expect(nativeInput).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveNumberInput.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-number-input reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffNumberInput = page.getByTestId('auto-invalid-off-number-input')
  const nativeInput = autoInvalidOffNumberInput.locator('input')

  await nativeInput.fill('')
  await nativeInput.blur()

  await expect(nativeInput).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffNumberInput.locator('[role="alert"]')).toHaveCount(0)
})
