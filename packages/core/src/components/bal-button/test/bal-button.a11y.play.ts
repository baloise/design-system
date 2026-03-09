import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-button>Button</bal-button>`)
  await a11y('bal-button')
})

test.describe('colors', () => {
  const COLORS = [
    'primary',
    'secondary',
    'tertiary',
    'tertiary-purple',
    'tertiary-red',
    'tertiary-yellow',
    'tertiary-green',
    'link',
    'light',
    'success',
    'warning',
    'danger',
  ] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-button color="${color}">Button</bal-button>`)
      await a11y(`bal-button`)
    })
  })
})

test.describe('dashed', () => {
  const COLORS = ['tertiary-purple', 'tertiary-red', 'tertiary-yellow', 'tertiary-green'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-button color="${color}" size="lg" dashed icon="plus">Button</bal-button>`)
      await a11y(`bal-button`)
    })
  })
})
