import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-notification heading="Heading">Your changes have been saved.</bal-notification>`)
  await a11y('bal-notification')
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
        `<bal-notification color="${color}" heading="Heading">Your changes have been saved.</bal-heading>`,
      )
      await a11y(`bal-notification`)
    })
  })
})
