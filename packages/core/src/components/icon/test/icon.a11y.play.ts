import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-icon name="check"></bal-icon>`)
  await a11y('bal-icon')
})
