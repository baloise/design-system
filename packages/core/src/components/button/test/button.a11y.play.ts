import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-button>Button</ds-button>`)
  await a11y('ds-button')
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
      await page.mount(`<ds-button color="${color}">Button</ds-button>`)
      await a11y(`ds-button`)
    })
  })
})

test.describe('dashed', () => {
  const COLORS = ['tertiary-purple', 'tertiary-red', 'tertiary-yellow', 'tertiary-green'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-button color="${color}" size="lg" dashed icon="plus">Button</ds-button>`)
      await a11y(`ds-button`)
    })
  })
})
