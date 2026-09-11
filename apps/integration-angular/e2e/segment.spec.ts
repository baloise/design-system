import { expect, test } from '@playwright/test'

test('ds-segment fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const segment = page.getByTestId('segment')

  await segment.locator('input[value="premium"]').click()

  await expect(page.getByTestId('segment-value')).toHaveText('Segment value: premium')
})

test('ds-segment reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveSegment = page.getByTestId('reactive-segment')
  const basicItem = reactiveSegment.locator('#group input[value="basic"]')
  const premiumItem = reactiveSegment.locator('#group input[value="premium"]')

  await expect(basicItem).toBeChecked()
  await expect(page.getByTestId('reactive-segment-value')).toHaveText('Reactive value: basic')

  await premiumItem.click()
  await expect(page.getByTestId('reactive-segment-value')).toHaveText('Reactive value: premium')

  await page.getByTestId('set-reactive-segment-value').click()
  await expect(premiumItem).toBeChecked()

  await page.getByTestId('toggle-reactive-segment-disabled').click()
  await expect(basicItem).toBeDisabled()
  await expect(premiumItem).toBeDisabled()

  await page.getByTestId('toggle-reactive-segment-disabled').click()
  await expect(basicItem).toBeEnabled()
  await expect(premiumItem).toBeEnabled()

  // Deselecting the checked item (allowed via allowEmptySelection) then blurring the segment leaves the
  // control empty and touched, which should trigger the required validator.
  await premiumItem.click()
  await premiumItem.blur()
  await expect(reactiveSegment.locator('fieldset')).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveSegment.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-segment reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffSegment = page.getByTestId('auto-invalid-off-segment')
  const basicItem = autoInvalidOffSegment.locator('#group input[value="basic"]')

  // Deselecting the already-checked item (allowed via allowEmptySelection) leaves the control empty,
  // which would normally trigger the required validator — autoInvalidOff should suppress that.
  await basicItem.click()
  await basicItem.blur()

  await expect(autoInvalidOffSegment.locator('fieldset')).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffSegment.locator('[role="alert"]')).toHaveCount(0)
})
