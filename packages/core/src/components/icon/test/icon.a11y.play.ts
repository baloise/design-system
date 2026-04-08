import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-icon name="check"></ds-icon>`)
  await a11y('ds-icon')
})
