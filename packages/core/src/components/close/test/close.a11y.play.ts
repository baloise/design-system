import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-close></ds-close>`)
  await a11y('ds-close')
})

test('button', async ({ page, a11y }) => {
  await page.mount(`<ds-close button></ds-close>`)
  await a11y('ds-close')
})
