import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(` <ds-toast heading="Information"> Your changes have been saved. </ds-toast>`)
  await a11y('ds-toast')
})

test.describe('colors', () => {
  const COLORS = ['base', 'danger', 'warning', 'success', 'info'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-toast color="${color}" heading="Information">Your changes have been saved.</ds-toast>`)
      await a11y(`ds-toast`)
    })
  })
})
