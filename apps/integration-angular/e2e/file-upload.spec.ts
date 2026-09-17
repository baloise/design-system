import { expect, test } from '@playwright/test'

test('ds-file-upload fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const fileUpload = page.getByTestId('file-upload')
  const nativeInput = fileUpload.locator('[part="input"]')

  await nativeInput.setInputFiles({ name: 'hello.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') })

  await expect(page.getByTestId('file-upload-value')).toHaveText('Value: hello.txt')
})

test('ds-file-upload reactive form: initial value, updates, disabled, and touched+invalid', async ({ page }) => {
  await page.goto('/')

  const reactiveFileUpload = page.getByTestId('reactive-file-upload')
  const nativeInput = reactiveFileUpload.locator('[part="input"]')

  await expect(page.getByTestId('reactive-file-upload-value')).toHaveText('Reactive value: a.txt')
  await expect(reactiveFileUpload.locator('.file-name')).toHaveText('a.txt')

  await page.getByTestId('set-reactive-file-upload-value').click()
  await expect(page.getByTestId('reactive-file-upload-value')).toHaveText('Reactive value: b.txt, c.txt')
  await expect(reactiveFileUpload.locator('.file-name')).toHaveText(['b.txt', 'c.txt'])

  await page.getByTestId('toggle-reactive-file-upload-disabled').click()
  await expect(nativeInput).toBeDisabled()

  await page.getByTestId('toggle-reactive-file-upload-disabled').click()
  await expect(nativeInput).toBeEnabled()

  await page.getByTestId('clear-reactive-file-upload-value').click()
  await nativeInput.focus()
  await nativeInput.blur()
  await expect(nativeInput).toHaveAttribute('aria-invalid', 'true')
  await expect(reactiveFileUpload.locator('[role="alert"]')).toHaveText('This field is required')
})

test('ds-file-upload reactive form: autoInvalidOff suppresses automatic invalid state', async ({ page }) => {
  await page.goto('/')

  const autoInvalidOffFileUpload = page.getByTestId('auto-invalid-off-file-upload')
  const nativeInput = autoInvalidOffFileUpload.locator('[part="input"]')

  await page.getByTestId('clear-auto-invalid-off-file-upload-value').click()
  await nativeInput.focus()
  await nativeInput.blur()

  await expect(nativeInput).not.toHaveAttribute('aria-invalid', 'true')
  await expect(autoInvalidOffFileUpload.locator('[role="alert"]')).toHaveCount(0)
})
