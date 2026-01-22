import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-pagination page-range="2" total-pages="20" value="2"></bal-pagination>`)
  await a11y('bal-pagination')
})

test('small', async ({ page, a11y }) => {
  await page.mount(`<bal-pagination interface="small" total-pages="10"></bal-pagination>`)
  await a11y('bal-pagination')
})

test('small-with-dots', async ({ page, a11y }) => {
  await page.mount(`<bal-pagination interface="small" total-pages="3"></bal-pagination>`)
  await a11y('bal-pagination')
})
