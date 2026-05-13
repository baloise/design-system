import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(` <ds-snackbar heading="Information"> Your changes have been saved. </ds-snackbar>`)
  await a11y('ds-snackbar')
})

test.describe('colors', () => {
  const COLORS = ['base', 'danger', 'warning', 'success', 'info'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(
        `<ds-snackbar color="${color}" heading="Information">Your changes have been saved.</ds-snackbar>`,
      )
      await a11y(`ds-snackbar`)
    })
  })
})
