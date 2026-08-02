import { expect, test } from '@playwright/test'

test('renders without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'ds-angular smoke test' })).toBeVisible()
  expect(errors).toEqual([])
})

test('ds-button fires dsClick and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const clicks = page.getByTestId('clicks')
  await expect(clicks).toHaveText('Clicks: 0')

  await page.getByTestId('button').click()

  await expect(clicks).toHaveText('Clicks: 1')
})

test('ds-input fires dsInput and updates Angular state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('input').locator('input').fill('hello')

  await expect(page.getByTestId('input-value')).toHaveText('Input value: hello')
})

test('ds-checkbox fires dsChange and updates Angular state', async ({ page }) => {
  await page.goto('/')

  const checked = page.getByTestId('checked')
  await expect(checked).toHaveText('Checked: false')

  await page.getByTestId('checkbox').locator('input[type="checkbox"]').click()

  await expect(checked).toHaveText('Checked: true')
})
