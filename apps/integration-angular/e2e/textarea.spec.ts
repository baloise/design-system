import { expect, test } from '@playwright/test'

test('ds-textarea fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('textarea').locator('textarea').fill('hello')

  await expect(page.getByTestId('textarea-value')).toHaveText('Textarea value: hello')
})

test('ds-textarea reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveTextarea = page.getByTestId('reactive-textarea')
  const nativeTextarea = reactiveTextarea.locator('textarea')

  await expect(nativeTextarea).toHaveValue('Alice')

  await nativeTextarea.fill('Bob')
  await nativeTextarea.blur()
  await expect(page.getByTestId('reactive-textarea-value')).toHaveText('Reactive value: Bob')

  await page.getByTestId('set-reactive-textarea-value').click()
  await expect(nativeTextarea).toHaveValue('Carol')

  await page.getByTestId('toggle-reactive-textarea-disabled').click()
  await expect(nativeTextarea).toBeDisabled()

  await page.getByTestId('toggle-reactive-textarea-disabled').click()
  await expect(nativeTextarea).toBeEnabled()

  await nativeTextarea.fill('')
  await nativeTextarea.blur()
  await expect(nativeTextarea).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveTextarea.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-textarea reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffTextarea = page.getByTestId('auto-invalid-off-textarea')
  const nativeTextarea = autoInvalidOffTextarea.locator('textarea')

  await nativeTextarea.fill('')
  await nativeTextarea.blur()

  await expect(nativeTextarea).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffTextarea.locator('[role="alert"]')).toHaveCount(0)
})
