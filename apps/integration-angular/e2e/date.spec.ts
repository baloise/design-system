import { expect, test } from '@playwright/test'

test('ds-date fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const dateInput = page.getByTestId('date').locator('[part="input"]')
  await dateInput.click()
  await dateInput.pressSequentially('15.07.2026')

  await expect(page.getByTestId('date-value')).toHaveText('Date value: 2026-07-15')
})

test('ds-date deleting one digit removes only that digit, not the whole date', async ({ page }) => {
  await page.goto('/')

  const dateInput = page.getByTestId('date').locator('[part="input"]')
  await dateInput.click()
  await dateInput.pressSequentially('01.01.2000')
  await expect(dateInput).toHaveValue('01.01.2000')

  await dateInput.press('End')
  await dateInput.press('Backspace')

  await expect(dateInput).toHaveValue('01.01.200_')
})

test('ds-date clearing the whole date via backspace updates the reactive value like the clear button', async ({
  page,
}) => {
  await page.goto('/')

  const reactiveDate = page.getByTestId('reactive-date')
  const nativeInput = reactiveDate.locator('[part="input"]')

  await nativeInput.selectText()
  await nativeInput.pressSequentially('10.02.2024')
  await expect(page.getByTestId('reactive-date-value')).toHaveText('Reactive value: 2024-02-10')

  await nativeInput.press('End')
  for (let i = 0; i < '10.02.2024'.length; i++) {
    await nativeInput.press('Backspace')
  }

  await expect(page.getByTestId('reactive-date-value')).toHaveText('Reactive value:')
})

test('ds-date reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveDate = page.getByTestId('reactive-date')
  const nativeInput = reactiveDate.locator('[part="input"]')

  await expect(nativeInput).toHaveValue('15.01.2024')

  await nativeInput.selectText()
  await nativeInput.pressSequentially('10.02.2024')
  await nativeInput.blur()
  await expect(page.getByTestId('reactive-date-value')).toHaveText('Reactive value: 2024-02-10')

  await page.getByTestId('set-reactive-date-value').click()
  await expect(nativeInput).toHaveValue('20.03.2024')

  await page.getByTestId('toggle-reactive-date-disabled').click()
  await expect(nativeInput).toBeDisabled()

  await page.getByTestId('toggle-reactive-date-disabled').click()
  await expect(nativeInput).toBeEnabled()

  await reactiveDate.locator('[part="clear"]').click()
  await nativeInput.blur()
  await expect(nativeInput).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveDate.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-date autoInvalidOff skips the automatic touched+invalid state from the reactive form', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffDate = page.getByTestId('auto-invalid-off-date')
  const nativeInput = autoInvalidOffDate.locator('[part="input"]')

  await autoInvalidOffDate.locator('[part="clear"]').click()
  await nativeInput.blur()

  await expect(nativeInput).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffDate.locator('[role="alert"]')).toHaveCount(0)
})
