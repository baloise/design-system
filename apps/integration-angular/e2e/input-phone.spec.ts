import { expect, test } from '@playwright/test'

test('ds-input-phone fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('phone').locator('[part="input"]').fill('791234567')

  await expect(page.getByTestId('phone-value')).toHaveText('Phone value: +41791234567')
})

test('ds-input-phone reactive form: initial value, value update, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactivePhone = page.getByTestId('reactive-phone')
  const nativeInput = reactivePhone.locator('[part="input"]')
  const trigger = reactivePhone.locator('#country-trigger')

  await expect(nativeInput).toHaveValue('79 123 45 67')

  await page.getByTestId('set-reactive-phone-value').click()
  await expect(nativeInput).toHaveValue('79 876 54 32')
  await expect(page.getByTestId('reactive-phone-value')).toHaveText('Reactive value: +41798765432')

  await page.getByTestId('toggle-reactive-phone-disabled').click()
  await expect(nativeInput).toBeDisabled()
  await expect(trigger).toBeDisabled()

  await page.getByTestId('toggle-reactive-phone-disabled').click()
  await expect(nativeInput).toBeEnabled()
  await expect(trigger).toBeEnabled()

  await nativeInput.fill('')
  await nativeInput.blur()
  await expect(nativeInput).toHaveAttribute('aria-invalid', 'true')
  await expect(reactivePhone.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-input-phone reactive form: country change updates the form control immediately, without blur', async ({
  page,
}) => {
  await page.goto('/')

  const reactivePhone = page.getByTestId('reactive-phone')
  const trigger = reactivePhone.locator('#country-trigger')
  const filter = reactivePhone.locator('#country-filter')

  await trigger.click()
  await filter.waitFor({ state: 'visible' })
  await filter.fill('DE')
  await reactivePhone.locator('#country-option-DE').click()

  // Asserted with no blur in between: proves `ds-input-phone` itself fires `dsChange` from a country
  // switch that re-formats an already-typed national number, not only from blur.
  await expect(page.getByTestId('reactive-phone-value')).toContainText('+49')
})

test('ds-input-phone reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffPhone = page.getByTestId('auto-invalid-off-phone')
  const nativeInput = autoInvalidOffPhone.locator('[part="input"]')

  await nativeInput.fill('')
  await nativeInput.blur()

  await expect(nativeInput).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffPhone.locator('[role="alert"]')).toHaveCount(0)
})
