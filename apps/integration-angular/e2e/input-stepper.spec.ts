import { expect, test } from '@playwright/test'

// `ds-input-stepper` emits `dsBlur` only once *both* its buttons have lost focus, and does so from a `rIC`
// callback (see `input-stepper.tsx`'s `handleBlur`). A bare `.blur()` on the button that was just clicked is
// therefore not enough to mark the control touched — moving focus to a neighbouring element is what a real
// user does, and it survives that focus coalescing.

test('ds-input-stepper fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const stepper = page.getByTestId('input-stepper')
  await stepper.locator('[part="increase"]').click()

  await expect(page.getByTestId('input-stepper-value')).toHaveText('Input stepper value: 4')
})

test('ds-input-stepper reactive form: initial value, step up/down, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveInputStepper = page.getByTestId('reactive-input-stepper')
  const increase = reactiveInputStepper.locator('[part="increase"]')
  const decrease = reactiveInputStepper.locator('[part="decrease"]')
  const setValueButton = page.getByTestId('set-reactive-input-stepper-value')

  // `value` is a reflected prop, so the host attribute is the value the element actually holds.
  await expect(reactiveInputStepper).toHaveAttribute('value', '3')

  await increase.click()
  await expect(reactiveInputStepper).toHaveAttribute('value', '4')
  await expect(page.getByTestId('reactive-input-stepper-value')).toHaveText('Reactive value: 4')

  await decrease.click()
  await decrease.click()
  await expect(reactiveInputStepper).toHaveAttribute('value', '2')
  await expect(page.getByTestId('reactive-input-stepper-value')).toHaveText('Reactive value: 2')

  await decrease.click()
  await expect(reactiveInputStepper).toHaveAttribute('value', '1')

  // Clicking a neighbouring button moves focus out of the widget, which is what emits `dsBlur` and marks the
  // control touched — only then does the accessor derive `invalid`/`invalidText` from the form error.
  await setValueButton.focus()
  // `[part="inner"]` alone also matches the invalid-state `<ds-icon part="inner">`'s own, unrelated shadow
  // DOM (Playwright's CSS engine pierces every nested shadow root) — `[aria-invalid]` narrows to the
  // Field's own wrapper, the only one of the two that ever carries that attribute.
  await expect(reactiveInputStepper.locator('[part="inner"][aria-invalid]')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveInputStepper.locator('[part="description"]')).toHaveText('Value must be at least 2')

  // `disabled` is not a reflected prop on `ds-input-stepper`, so the Field's own `aria-disabled` is the
  // observable signal that `setDisabledState()` landed.
  await page.getByTestId('toggle-reactive-input-stepper-disabled').click()
  await expect(reactiveInputStepper.locator('[part="inner"][aria-disabled]')).toHaveAttribute('aria-disabled', 'true')

  await page.getByTestId('toggle-reactive-input-stepper-disabled').click()
  await expect(reactiveInputStepper.locator('[part="inner"][aria-disabled]')).not.toHaveAttribute(
    'aria-disabled',
    'true',
  )

  await setValueButton.click()
  await expect(reactiveInputStepper).toHaveAttribute('value', '7')

  // A `nonNullable` control resets to its initial value, never to `null`.
  await page.getByTestId('reset-reactive-input-stepper').click()
  await expect(reactiveInputStepper).toHaveAttribute('value', '3')
})

test('ds-input-stepper reactive form: resetting a nullable control resolves to min', async ({ page }) => {
  await page.goto('/')

  const nullableInputStepper = page.getByTestId('nullable-input-stepper')
  await expect(nullableInputStepper).toHaveAttribute('value', '3')

  // Unlike the `nonNullable` control above, this one's `reset()` really does call `writeValue(null)` — the
  // element's own `@Watch('value')` is what has to resolve that onto `min` (0).
  await page.getByTestId('reset-nullable-input-stepper').click()
  await expect(nullableInputStepper).toHaveAttribute('value', '0')
})

test('ds-input-stepper reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffInputStepper = page.getByTestId('auto-invalid-off-input-stepper')
  const decrease = autoInvalidOffInputStepper.locator('[part="decrease"]')

  await decrease.click()
  await decrease.click()
  await expect(autoInvalidOffInputStepper).toHaveAttribute('value', '1')

  await page.getByTestId('toggle-reactive-input-stepper-disabled').focus()

  await expect(autoInvalidOffInputStepper.locator('[part="inner"][aria-invalid]')).not.toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(autoInvalidOffInputStepper.locator('[part="description"]')).not.toHaveAttribute('role', 'alert')
})
