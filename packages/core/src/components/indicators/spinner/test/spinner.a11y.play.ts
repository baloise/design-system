import { test } from '@helvetia-design/playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-spinner></ds-spinner>`)
  await a11y('ds-spinner')
})
