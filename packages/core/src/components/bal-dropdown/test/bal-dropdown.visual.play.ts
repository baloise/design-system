import { expect, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-dropdown'

const image = screenshot(TAG)

test.beforeEach(async ({ page }) => {
  await page.goto(`/components/${TAG}/test/${TAG}.visual.html`)
  await page.waitForSelector(TAG)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  await expect(el).toHaveScreenshot(image('basic-before'))

  const inputEl = page.locator('input[placeholder="visual-basic"]')
  await inputEl.click()
  await waitForChanges(page)
  await expect(el).toHaveScreenshot(image('basic-open'))

  const optionEl = el.getByRole('option', { name: '1992' })
  await optionEl.click()
  await waitForChanges(page)
  await expect(el).toHaveScreenshot(image('basic-selected'))
})

test('long-content', async ({ page }) => {
  const el = page.getByTestId('long-content')
  await expect(el).toHaveScreenshot(image('long-content-before'))

  const inputEl = page.locator('input[placeholder="visual-long-content"]')
  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('long-content-open'))
})

test('multiple', async ({ page }) => {
  const el = page.getByTestId('multiple')
  await expect(el).toHaveScreenshot(image('multiple-before'))

  const inputEl = page.locator('input[placeholder="visual-multiple"]')
  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('multiple-open'))

  const optionFirstEl = el.getByRole('option', { name: '1991' })
  await optionFirstEl.click()
  await waitForChanges(page)
  const optionSecondEl = el.getByRole('option', { name: '1992' })
  await optionSecondEl.click()
  await waitForChanges(page)
  await expect(el).toHaveScreenshot(image('multiple-selected'))
})

test('multiple-chips', async ({ page }) => {
  const el = page.getByTestId('multiple-chips')
  await expect(el).toHaveScreenshot(image('multiple-chips-before'))

  const inputEl = page.locator('input[placeholder="visual-multiple-chips"]')
  await inputEl.click({ force: true })
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('multiple-chips-open'))
})

test('form-field', async ({ page }) => {
  const el = page.getByTestId('form-field')
  await expect(el).toHaveScreenshot(image('form-field-before'))

  const inputEl = page.locator('input[placeholder="visual-form-field"]')
  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('form-field-open'))
})

test('small-purple', async ({ page }) => {
  const el = page.getByTestId('small-purple')
  await expect(el).toHaveScreenshot(image('small-purple-before'))
})

test('clearable', async ({ page }) => {
  const el = page.getByTestId('clearable')
  await expect(el).toHaveScreenshot(image('clearable-before'))

  const inputEl = page.locator('input[placeholder="visual-clearable"]')
  await inputEl.click()
  await waitForChanges(page)
  await expect(page).toHaveScreenshot(image('clearable-open'))

  const optionEl = el.getByRole('option', { name: '1988' })
  await optionEl.click()
  await waitForChanges(page)
  await expect(el).toHaveScreenshot(image('clearable-selected'))
})

test('loading', async ({ page }) => {
  const el = page.getByTestId('loading')
  await expect(el).toHaveScreenshot(image('loading-before'))
})

test('invalid', async ({ page }) => {
  const el = page.getByTestId('invalid')
  await expect(el).toHaveScreenshot(image('invalid-before'))
})

test('disabled', async ({ page }) => {
  const el = page.getByTestId('disabled')
  await expect(el).toHaveScreenshot(image('disabled-before'))
})
