import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="2"></ds-pagination>`)
  await a11y('ds-pagination')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="2" disabled></ds-pagination>`)
  await a11y('ds-pagination')
})

test('size sm', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="2" size="sm"></ds-pagination>`)
  await a11y('ds-pagination')
})

test('align start', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="2" align="start"></ds-pagination>`)
  await a11y('ds-pagination')
})

test('align end', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="2" align="end"></ds-pagination>`)
  await a11y('ds-pagination')
})

test('dots', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="3" value="1" variant="dots"></ds-pagination>`)
  await a11y('ds-pagination')
})

test('dots-with-text', async ({ page, a11y }) => {
  await page.mount(`<ds-pagination page-range="2" total-pages="20" value="1" variant="dots"></ds-pagination>`)
  await a11y('ds-pagination')
})
