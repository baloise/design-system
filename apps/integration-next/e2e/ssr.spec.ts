import { expect, test } from '@playwright/test'
import { collectPageErrors } from './collect-page-errors'

test('SSR HTML includes declarative shadow DOM before JS runs', async ({ request }) => {
  const response = await request.get('/')
  expect(response.ok()).toBeTruthy()

  const html = await response.text()
  expect(html).toContain('shadowrootmode')
  expect(html).toMatch(/<ds-button[\s>]/)
  expect(html).toMatch(/<ds-input[\s>]/)
  expect(html).toMatch(/<ds-checkbox[\s>]/)
})

test('home page hydrates without console errors', async ({ page }) => {
  const errors = collectPageErrors(page)

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'ds-react Next.js SSR' })).toBeVisible()
  expect(errors).toEqual([])
})
