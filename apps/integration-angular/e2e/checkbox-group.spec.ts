import { expect, Locator, test } from '@playwright/test'

const checkboxInput = (group: Locator, value: string) =>
  group.locator(`ds-checkbox[value="${value}"] input[type="checkbox"]`)

// `.blur()` alone is a no-op on an element that was never focused — it never emits `dsBlur`, so the control
// would stay untouched. Clicking a checkbox focuses it as a side effect of toggling it, so blurring it
// afterwards is enough to drive real user interaction without a separate focus step.
const blur = (input: Locator) => input.evaluate(el => (el as HTMLElement).blur())

test('ds-checkbox-group fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const checkboxGroup = page.getByTestId('checkbox-group')
  const apple = checkboxInput(checkboxGroup, 'apple')
  const banana = checkboxInput(checkboxGroup, 'banana')

  await expect(apple).toBeChecked()
  await expect(page.getByTestId('checkbox-group-value')).toHaveText('Checkbox group value: apple')

  await banana.click()
  await expect(page.getByTestId('checkbox-group-value')).toHaveText('Checkbox group value: apple,banana')

  await apple.click()
  await expect(page.getByTestId('checkbox-group-value')).toHaveText('Checkbox group value: banana')
})

test('ds-checkbox-group reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveCheckboxGroup = page.getByTestId('reactive-checkbox-group')
  const apple = checkboxInput(reactiveCheckboxGroup, 'apple')
  const banana = checkboxInput(reactiveCheckboxGroup, 'banana')
  const cherry = checkboxInput(reactiveCheckboxGroup, 'cherry')

  await expect(apple).toBeChecked()
  await expect(banana).not.toBeChecked()
  await expect(cherry).not.toBeChecked()
  await expect(page.getByTestId('reactive-checkbox-group-value')).toHaveText('Reactive value: apple')

  await page.getByTestId('set-reactive-checkbox-group-value').click()
  await expect(apple).not.toBeChecked()
  await expect(banana).toBeChecked()
  await expect(cherry).toBeChecked()
  await expect(page.getByTestId('reactive-checkbox-group-value')).toHaveText('Reactive value: banana,cherry')

  await page.getByTestId('toggle-reactive-checkbox-group-disabled').click()
  await expect(apple).toBeDisabled()
  await expect(banana).toBeDisabled()
  await expect(cherry).toBeDisabled()

  await page.getByTestId('toggle-reactive-checkbox-group-disabled').click()
  await expect(apple).not.toBeDisabled()

  await banana.click()
  await cherry.click()
  await blur(cherry)
  await expect(page.getByTestId('reactive-checkbox-group-value')).toHaveText('Reactive value: ')
  // `[part="inner"] [aria-invalid]` alone also matches unrelated shadow DOM (Playwright's CSS engine pierces
  // every nested shadow root) — `[aria-invalid]` narrows to the Field's own wrapper, the only one that ever
  // carries that attribute.
  await expect(reactiveCheckboxGroup.locator('[part="inner"][aria-invalid]')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveCheckboxGroup.locator('[part="description"]')).toHaveText('Select at least one fruit')
})

test('ds-checkbox-group reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffCheckboxGroup = page.getByTestId('auto-invalid-off-checkbox-group')
  const apple = checkboxInput(autoInvalidOffCheckboxGroup, 'apple')

  await apple.click()
  await blur(apple)

  await expect(autoInvalidOffCheckboxGroup.locator('[part="inner"][aria-invalid]')).not.toHaveAttribute(
    'aria-invalid',
    'true',
  )
  await expect(autoInvalidOffCheckboxGroup.locator('[part="description"]')).not.toHaveAttribute('role', 'alert')
})
