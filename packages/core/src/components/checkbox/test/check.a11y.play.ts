import { test } from '@baloise/ds-playwright'

test('unchecked', async ({ page, a11y }) => {
  await page.mount(`<ds-check></ds-check>`)
  await a11y('ds-check')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<ds-check checked></ds-check>`)
  await a11y('ds-check')
})
