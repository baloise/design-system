import { test, expect, screenshot } from '@baloise/ds-playwright'

test.describe('visual', () => {
  const image = screenshot('bal-tag')

  test.beforeEach(async ({ page }) => {
    await page.goto('/components/bal-tag/test/bal-tag.visual.html')
    await page.waitForSelector('bal-tag')
  })

  test('basic', async ({ page }) => {
    const el = page.getByTestId('basic')
    await expect(el).toHaveScreenshot(image('basic'))
  })

  test('colors', async ({ page }) => {
    const el = page.getByTestId('colors')
    await expect(el).toHaveScreenshot(image('colors'))
  })

  test('sizes', async ({ page }) => {
    const el = page.getByTestId('sizes')
    await expect(el).toHaveScreenshot(image('sizes'))
  })
})
