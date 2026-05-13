import { test } from '@baloise/ds-playwright'

test('default', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on">Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})

test('checked', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on" checked>Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on" disabled>Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on" invalid>Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on" required>Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})

test('label position left', async ({ page, a11y }) => {
  await page.mount(`<ds-toggle value="on" label-position="left">Toggle</ds-toggle>`)
  await a11y('ds-toggle')
})
