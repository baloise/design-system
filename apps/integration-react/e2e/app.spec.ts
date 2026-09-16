import { expect, test } from '@playwright/test'

test('renders without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'ds-react smoke test' })).toBeVisible()
  expect(errors).toEqual([])
})

test('ds-button fires dsClick and updates React state', async ({ page }) => {
  await page.goto('/')

  const clicks = page.getByTestId('clicks')
  await expect(clicks).toHaveText('Clicks: 0')

  await page.getByTestId('button').click()

  await expect(clicks).toHaveText('Clicks: 1')
})

test('ds-input fires dsInput and updates React state', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('input').locator('input').fill('hello')

  await expect(page.getByTestId('input-value')).toHaveText('Input value: hello')
})

test('ds-checkbox fires dsChange and updates React state', async ({ page }) => {
  await page.goto('/')

  const checked = page.getByTestId('checked')
  await expect(checked).toHaveText('Checked: false')

  await page.getByTestId('checkbox').locator('input[type="checkbox"]').click()

  await expect(checked).toHaveText('Checked: true')
})

test('Modal onOpenChange stays in sync when dismissed with Escape', async ({ page }) => {
  await page.goto('/')

  const openState = page.getByTestId('modal-open')
  await expect(openState).toHaveText('Modal open: false')

  await page.getByTestId('open-modal').click()
  await expect(openState).toHaveText('Modal open: true')
  await expect(page.locator('ds-modal dialog')).toHaveAttribute('open')

  await page.keyboard.press('Escape')

  await expect(openState).toHaveText('Modal open: false')
  await expect(page.locator('ds-modal')).not.toHaveAttribute('open')
})

test('useToast present and dismiss control a toast', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('show-toast').click()
  await expect(page.locator('ds-toast')).toBeVisible()
  await expect(page.locator('ds-toast')).toContainText('Your changes have been saved.')

  await page.getByTestId('dismiss-toast').click()
  await expect(page.locator('ds-toast')).toHaveCount(0)
})

test('useSnackbar present and dismiss control a snackbar', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('show-snackbar').click()
  await expect(page.locator('ds-snackbar')).toBeVisible()
  await expect(page.locator('ds-snackbar')).toContainText('You are currently offline.')

  await page.getByTestId('dismiss-snackbar').click()
  await expect(page.locator('ds-snackbar')).toHaveCount(0)
})
