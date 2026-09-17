import { expect, test } from '@playwright/test'

test('ds-select fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const select = page.getByTestId('select')
  const trigger = select.locator('.ss-main')

  await expect(trigger).toContainText('Switzerland')
  await expect(page.getByTestId('select-value')).toHaveText('Select value: ch')

  await trigger.click()
  await select.locator('.ss-option', { hasText: 'Germany' }).click()
  await expect(page.getByTestId('select-value')).toHaveText('Select value: de')
})

test('ds-select reactive form (single mode): initial value, updates, disabled, and touched+invalid', async ({
  page,
}) => {
  await page.goto('/')

  const reactiveSelect = page.getByTestId('reactive-select')
  const trigger = reactiveSelect.locator('.ss-main')

  await expect(trigger).toContainText('Switzerland')
  await expect(page.getByTestId('reactive-select-value')).toHaveText('Reactive value: ch')

  await trigger.click()
  await reactiveSelect.locator('.ss-option', { hasText: 'Austria' }).click()
  await expect(page.getByTestId('reactive-select-value')).toHaveText('Reactive value: at')

  await page.getByTestId('set-reactive-select-value').click()
  await expect(trigger).toContainText('Germany')

  await page.getByTestId('toggle-reactive-select-disabled').click()
  await expect(trigger).toHaveClass(/ss-disabled/)

  await page.getByTestId('toggle-reactive-select-disabled').click()
  await expect(trigger).not.toHaveClass(/ss-disabled/)

  // Clearing the value (via the `clearable` deselect button) then blurring the trigger leaves the
  // control empty and touched, which should trigger the required validator.
  await reactiveSelect.locator('.ss-deselect').click()
  await trigger.blur()
  // `#inner` isn't unique to assert on directly: the invalid-text span's `ds-icon` renders its own
  // shadow root with the same `id="inner"`, and Playwright's shadow-piercing locators reach it too —
  // so the `invalid` property is read directly off the element instead.
  await expect.poll(() => reactiveSelect.evaluate((el: HTMLDsSelectElement) => el.invalid)).toBe(true)
  await expect(reactiveSelect.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-select reactive form (multiple mode): initial value, updates, disabled, and touched+invalid', async ({
  page,
}) => {
  await page.goto('/')

  const reactiveSelect = page.getByTestId('reactive-multiple-select')
  const trigger = reactiveSelect.locator('.ss-main')

  await expect(trigger).toContainText('Switzerland')
  await expect(page.getByTestId('reactive-multiple-select-value')).toHaveText('Reactive value: ch')

  await trigger.click()
  await reactiveSelect.locator('.ss-option', { hasText: 'Austria' }).click()
  await expect(page.getByTestId('reactive-multiple-select-value')).toHaveText('Reactive value: ch,at')

  // Multiple mode keeps the dropdown open after selecting an option (unlike single mode), so it must be
  // closed again before interacting with anything else on the page.
  await trigger.click()

  await page.getByTestId('set-reactive-multiple-select-value').click()
  await expect(page.getByTestId('reactive-multiple-select-value')).toHaveText('Reactive value: de,at')

  await page.getByTestId('toggle-reactive-multiple-select-disabled').click()
  await expect(trigger).toHaveClass(/ss-disabled/)

  await page.getByTestId('toggle-reactive-multiple-select-disabled').click()
  await expect(trigger).not.toHaveClass(/ss-disabled/)

  // Deselecting both selected options then blurring the trigger leaves the control an empty array and
  // touched, which should trigger the required validator.
  await trigger.click()
  await reactiveSelect.locator('.ss-option', { hasText: 'Germany' }).click()
  await reactiveSelect.locator('.ss-option', { hasText: 'Austria' }).click()
  await trigger.blur()
  await expect.poll(() => reactiveSelect.evaluate((el: HTMLDsSelectElement) => el.invalid)).toBe(true)
  await expect(reactiveSelect.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-select reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffSelect = page.getByTestId('auto-invalid-off-select')
  const trigger = autoInvalidOffSelect.locator('.ss-main')

  // Clearing the value (allowed via `clearable`) then blurring the trigger leaves the control empty,
  // which would normally trigger the required validator — autoInvalidOff should suppress that.
  await autoInvalidOffSelect.locator('.ss-deselect').click()
  await trigger.blur()

  await expect.poll(() => autoInvalidOffSelect.evaluate((el: HTMLDsSelectElement) => el.invalid)).toBe(false)
  await expect(autoInvalidOffSelect.locator('[role="alert"]')).toHaveCount(0)
})
