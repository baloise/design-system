import { expect, test } from '@playwright/test'

test('ds-toggle fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const toggle = page.getByTestId('toggle')
  const toggleInput = toggle.locator('input')

  await expect(toggleInput).not.toBeChecked()
  await expect(page.getByTestId('toggle-value')).toHaveText('Toggle value: false')

  await toggleInput.click()
  await expect(page.getByTestId('toggle-value')).toHaveText('Toggle value: true')
})

test('ds-toggle reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveToggle = page.getByTestId('reactive-toggle')
  const reactiveToggleInput = reactiveToggle.locator('input')

  await expect(reactiveToggleInput).toBeChecked()
  await expect(page.getByTestId('reactive-toggle-value')).toHaveText('Reactive value: true')

  await reactiveToggleInput.click()
  await expect(page.getByTestId('reactive-toggle-value')).toHaveText('Reactive value: false')

  await page.getByTestId('set-reactive-toggle-value').click()
  await expect(reactiveToggleInput).not.toBeChecked()

  await page.getByTestId('toggle-reactive-toggle-disabled').click()
  await expect(reactiveToggleInput).toBeDisabled()

  await page.getByTestId('toggle-reactive-toggle-disabled').click()
  await expect(reactiveToggleInput).toBeEnabled()

  // The control is still unchecked (set via the "Set to false" button above), so blurring it while
  // unchecked triggers the required-with-message validator, which the `@baloise/ds-angular` integration
  // surfaces as `invalid`/`invalidText` once the control is touched.
  await reactiveToggleInput.focus()
  await reactiveToggleInput.blur()
  // Scoped via `aria-labelledby` (set by the shared `Field` wrapper's own `#inner`) rather than the
  // `#inner` id directly — the invalid-state alert icon rendered inside is itself a `ds-icon`, whose
  // shadow DOM also happens to use `#inner`, which a plain `#inner` locator would also match.
  await expect(reactiveToggle.locator('[aria-labelledby="label"]')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveToggle.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-toggle reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffToggle = page.getByTestId('auto-invalid-off-toggle')
  const autoInvalidOffToggleInput = autoInvalidOffToggle.locator('input')

  // Unchecking the already-checked toggle leaves the control invalid per the required-with-message
  // validator — autoInvalidOff should suppress the automatic invalid/invalidText behavior.
  await autoInvalidOffToggleInput.click()
  await autoInvalidOffToggleInput.blur()

  await expect(autoInvalidOffToggle.locator('[aria-labelledby="label"]')).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffToggle.locator('[role="alert"]')).toHaveCount(0)
})
