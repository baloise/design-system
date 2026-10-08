import { expect, test } from '@playwright/test'

test('server response is fully rendered HTML before any JS runs', async ({ request }) => {
  const response = await request.get('/')
  expect(response.ok()).toBeTruthy()

  const html = await response.text()
  expect(html).toContain('Hello World')
  expect(html).toMatch(/<ds-button[\s>]/)
  expect(html).toMatch(/<ds-input[\s>]/)
  expect(html).toMatch(/<ds-checkbox[\s>]/)

  // Button renders `scoped` under recommendedSerializeShadowRoot: real markup, scoped classes,
  // no shadow root of its own.
  expect(html).toMatch(/<ds-button[^>]*class="[^"]*sc-ds-button/)

  // Tooltip is on the DSD allow-list: real declarative shadow root at first paint.
  expect(html).toContain('shadowrootmode')
  expect(html).toMatch(/<ds-tooltip[\s>]/)
})

test('page hydrates in the browser without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', error => errors.push(error.message))

  await page.goto('/')

  await expect(page.getByTestId('heading')).toHaveText('Hello World')
  await expect(page.getByTestId('button').first()).toBeVisible()
  expect(errors).toEqual([])
})
