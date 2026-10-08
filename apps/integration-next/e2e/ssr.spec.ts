import { expect, test } from '@playwright/test'
import { collectPageErrors } from './collect-page-errors'

test('SSR HTML renders ds-* components before JS runs', async ({ request }) => {
  const response = await request.get('/')
  expect(response.ok()).toBeTruthy()

  const html = await response.text()
  expect(html).toMatch(/<ds-button[\s>]/)
  expect(html).toMatch(/<ds-input[\s>]/)
  expect(html).toMatch(/<ds-checkbox[\s>]/)

  // Button renders `scoped` under the generated components.server.ts default: real markup,
  // scoped classes, no shadow root of its own.
  expect(html).toMatch(/<ds-button[^>]*class="[^"]*sc-ds-button/)

  // Tooltip is on the DSD allow-list: real declarative shadow root at first paint.
  expect(html).toContain('shadowrootmode')
  expect(html).toMatch(/<ds-tooltip[\s>]/)
})

test('home page hydrates without console errors', async ({ page }) => {
  const errors = collectPageErrors(page)

  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'ds-react Next.js SSR' })).toBeVisible()
  expect(errors).toEqual([])
})
