import { test } from '@baloise/ds-playwright'

test('unchecked', async ({ page, a11y }) => {
  await page.mount(`<bal-check></bal-check>`)
  await a11y('bal-check')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<bal-check checked></bal-check>`)
  await a11y('bal-check')
})
