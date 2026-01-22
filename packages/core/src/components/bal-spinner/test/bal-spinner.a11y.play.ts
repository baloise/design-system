import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-spinner></bal-spinner>`)
  await a11y('bal-spinner')
})
