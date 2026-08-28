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
    'ghost',
    'brand-purple',
    'brand-red',
    'brand-yellow',
    'brand-green',
    'link',
    'light',
    'info',
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
