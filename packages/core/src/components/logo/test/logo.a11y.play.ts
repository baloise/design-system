import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-logo></ds-logo>`)
  await a11y('ds-logo')
})
