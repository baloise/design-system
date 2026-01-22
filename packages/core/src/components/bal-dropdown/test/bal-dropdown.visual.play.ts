import { expect, expectScreenshot, screenshot, test, waitForChanges } from '@baloise/ds-playwright'

const TAG = 'bal-dropdown'

const image = screenshot(TAG)

test.beforeEach('Setup', async ({ page }) => {
  await page.setupVisualTest(`/components/${TAG}/test/${TAG}.visual.html`)
})

test('basic', async ({ page }) => {
  const el = page.getByTestId('basic')
  await expectScreenshot(el, image('basic-before'))

  const inputEl = page.locator('input[placeholder="visual-basic"]')
  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(el, image('basic-open'))

  const optionEl = el.getByRole('option', { name: '1992' })
  await optionEl.click()
  await waitForChanges(page)
  await expectScreenshot(el, image('basic-selected'))
})

test('long-content', async ({ page }) => {
  const el = page.getByTestId('long-content')
  await expectScreenshot(el, image('long-content-before'))

  const inputEl = page.locator('input[placeholder="visual-long-content"]')
  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('long-content-open'))
})

test('multiple', async ({ page }) => {
  const el = page.getByTestId('multiple')
  await expectScreenshot(el, image('multiple-before'))

  const inputEl = page.locator('input[placeholder="visual-multiple"]')
  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('multiple-open'))

  const optionFirstEl = el.getByRole('option', { name: '1991' })
  await optionFirstEl.click()
  await waitForChanges(page)
  const optionSecondEl = el.getByRole('option', { name: '1992' })
  await optionSecondEl.click()
  await waitForChanges(page)
  await expectScreenshot(el, image('multiple-selected'))
})

test('multiple-chips', async ({ page }) => {
  const el = page.getByTestId('multiple-chips')
  await expectScreenshot(el, image('multiple-chips-before'))

  const inputEl = page.locator('input[placeholder="visual-multiple-chips"]')
  await inputEl.click({ force: true })
  await waitForChanges(page)
  await expectScreenshot(page, image('multiple-chips-open'))
})

test('form-field', async ({ page }) => {
  const el = page.getByTestId('form-field')
  await expectScreenshot(el, image('form-field-before'))

  const inputEl = page.locator('input[placeholder="visual-form-field"]')
  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('form-field-open'))
})

test('small-purple', async ({ page }) => {
  const el = page.getByTestId('small-purple')
  await expectScreenshot(el, image('small-purple-before'))
})

test('clearable', async ({ page }) => {
  const el = page.getByTestId('clearable')
  await expectScreenshot(el, image('clearable-before'))

  const inputEl = page.locator('input[placeholder="visual-clearable"]')
  await inputEl.click()
  await waitForChanges(page)
  await expectScreenshot(page, image('clearable-open'))

  const optionEl = el.getByRole('option', { name: '1988' })
  await optionEl.click()
  await waitForChanges(page)
  await expectScreenshot(el, image('clearable-selected'))
})

test('loading', async ({ page }) => {
  const el = page.getByTestId('loading')
  await expectScreenshot(el, image('loading-before'))
})

test('invalid', async ({ page }) => {
  const el = page.getByTestId('invalid')
  await expectScreenshot(el, image('invalid-before'))
})

test('disabled', async ({ page }) => {
  const el = page.getByTestId('disabled')
  await expectScreenshot(el, image('disabled-before'))
})
