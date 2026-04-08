import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(` <bal-toast heading="Information"> Your changes have been saved. </bal-toast>`)
  await a11y('bal-toast')
})

test.describe('colors', () => {
  const COLORS = ['base', 'danger', 'warning', 'success', 'info'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-toast color="${color}" heading="Information">Your changes have been saved.</bal-toast>`)
      await a11y(`bal-toast`)
    })
  })
})
