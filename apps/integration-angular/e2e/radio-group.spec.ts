import { expect, test } from '@playwright/test'

test('ds-radio-group reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveRadioGroup = page.getByTestId('reactive-radio-group')
  const basicRadio = page.getByTestId('reactive-radio-basic').locator('input')
  const premiumRadio = page.getByTestId('reactive-radio-premium').locator('input')

  await expect(basicRadio).toBeChecked()
  await expect(page.getByTestId('reactive-radio-value')).toHaveText('Reactive value: basic')

  await premiumRadio.click()
  await expect(page.getByTestId('reactive-radio-value')).toHaveText('Reactive value: premium')

  await page.getByTestId('set-reactive-radio-value').click()
  await expect(premiumRadio).toBeChecked()

  await page.getByTestId('toggle-reactive-radio-disabled').click()
  await expect(basicRadio).toBeDisabled()
  await expect(premiumRadio).toBeDisabled()

  await page.getByTestId('toggle-reactive-radio-disabled').click()
  await expect(basicRadio).toBeEnabled()
  await expect(premiumRadio).toBeEnabled()

  // Deselecting the checked radio (allowed via allowEmptySelection) then blurring the group leaves the
  // control empty and touched, which should trigger the required validator.
  await premiumRadio.click()
  await premiumRadio.blur()
  await expect(reactiveRadioGroup.locator('fieldset')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveRadioGroup.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-radio-group reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffRadioGroup = page.getByTestId('auto-invalid-off-radio-group')
  const basicRadio = page.getByTestId('auto-invalid-off-radio-basic').locator('input')

  // Deselecting the already-checked radio (allowed via allowEmptySelection) leaves the control empty,
  // which would normally trigger the required validator — autoInvalidOff should suppress that.
  await basicRadio.click()
  await basicRadio.blur()

  await expect(autoInvalidOffRadioGroup.locator('fieldset')).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffRadioGroup.locator('[role="alert"]')).toHaveCount(0)
})
