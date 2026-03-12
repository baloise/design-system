import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(` <bal-snackbar heading="Information"> Your changes have been saved. </bal-snackbar>`)
  await a11y('bal-snackbar')
})

test.describe('colors', () => {
  const COLORS = ['base', 'danger', 'warning', 'success', 'info'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(
        `<bal-snackbar color="${color}" heading="Information">Your changes have been saved.</bal-snackbar>`,
      )
      await a11y(`bal-snackbar`)
    })
  })
})
