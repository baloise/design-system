import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-logo></bal-logo>`)
  await a11y('bal-logo')
})
