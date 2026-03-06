import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-divider></bal-divider>`)
  await a11y('bal-divider')
})

test.describe('colors', () => {
  const COLORS = [
    'primary',
    'primary-light',
    'primary-dark',
    'grey-light',
    'grey',
    'grey-dark',
    'warning',
    'success',
    'danger',
    'danger-dark',
    'danger-darker',
    'white',
    'light-blue',
  ] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-divider color="${color}"></bal-divider>`)
      await a11y(`bal-divider`)
    })
  })
})
