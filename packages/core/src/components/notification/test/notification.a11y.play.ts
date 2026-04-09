import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-notification heading="Heading">Your changes have been saved.</ds-notification>`)
  await a11y('ds-notification')
})

test.describe('colors', () => {
  const COLORS = [
    'base',
    'info',
    'success',
    'warning',
    'danger',
    'outline-base',
    'outline-purple',
    'outline-green',
    'outline-yellow',
    'outline-red',
  ] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(
        `<ds-notification color="${color}" heading="Heading">Your changes have been saved.</ds-heading>`,
      )
      await a11y(`ds-notification`)
    })
  })
})
