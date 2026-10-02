import { expect, test } from '@playwright/test'

test('DsModalService opens a component with DS_MODAL_DATA and returns the dismiss data', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-modal').click()

  await expect(page.locator('ds-modal')).toHaveAttribute('open', '')
  await expect(page.getByTestId('modal-content')).toHaveText('Hello from DS_MODAL_DATA')
  await expect(page.getByRole('dialog', { name: 'Outer modal' })).toBeVisible()

  await page.getByTestId('modal-close').click()

  await expect(page.locator('ds-modal')).not.toHaveAttribute('open')
  await expect(page.getByTestId('modal-result')).toHaveText(
    'Result: confirm:{"message":"Hello from DS_MODAL_DATA","confirmed":true}',
  )
  // The modal and its mounted component are removed from the DOM once dismissed.
  await expect(page.locator('ds-modal')).toHaveCount(0)
})

test('dismissing a nested modal leaves the outer modal open', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-modal').click()
  await page.getByTestId('open-nested-modal').click()
  await expect(page.getByTestId('nested-modal-content')).toBeVisible()

  await page.getByTestId('nested-modal-close').click()

  const inner = page.locator('ds-modal', { has: page.getByTestId('nested-modal-content') })
  await expect(inner).toHaveCount(0)
  const outer = page.locator('ds-modal', { has: page.getByTestId('modal-content') })
  await expect(outer).toHaveAttribute('open', '')
  await expect(page.getByTestId('modal-content')).toBeVisible()
})

test('closable=false ignores Escape and backdrop click', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-modal-not-closable').click()
  const modal = page.locator('ds-modal')
  await expect(modal).toHaveAttribute('open', '')

  await page.keyboard.press('Escape')
  await expect(modal).toHaveAttribute('open', '')

  await page.mouse.click(5, 5)
  await expect(modal).toHaveAttribute('open', '')
  await expect(page.getByTestId('modal-content')).toBeVisible()

  await page.getByTestId('modal-close').click()
  await expect(modal).not.toHaveAttribute('open')
})

test('a closable modal closes on Escape', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('open-modal').click()
  await expect(page.locator('ds-modal')).toHaveAttribute('open', '')

  await page.keyboard.press('Escape')

  await expect(page.locator('ds-modal')).not.toHaveAttribute('open')
})
