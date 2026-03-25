import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-close></bal-close>`)
  await a11y('bal-close')
})

test('button', async ({ page, a11y }) => {
  await page.mount(`<bal-close button></bal-close>`)
  await a11y('bal-close')
})
