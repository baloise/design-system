import { test } from '@baloise/ds-playwright'

test('unchecked', async ({ page, a11y }) => {
  await page.mount(`<bal-switch></bal-switch>`)
  await a11y('bal-switch')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<bal-switch checked></bal-switch>`)
  await a11y('bal-switch')
})
