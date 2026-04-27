import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-progress-bar value="50"></ds-progress-bar>`)
  await a11y('ds-progress-bar')
})
