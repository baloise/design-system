import { test } from '@baloise/ds-playwright'

test('unchecked', async ({ page, a11y }) => {
  await page.mount(`<ds-switch></ds-switch>`)
  await a11y('ds-switch')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<ds-switch checked></ds-switch>`)
  await a11y('ds-switch')
})
