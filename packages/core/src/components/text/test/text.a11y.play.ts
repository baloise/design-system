import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-text>This is a text</ds-text>`)
  await a11y('ds-text')
})

test.describe('colors', () => {
  const COLORS = [
    'light-blue',
    'blue-dark',
    'blue-light',
    'primary-light',
    'white',
    'black',
    'grey',
    'primary',
    'blue',
    'info',
    'success',
    'warning',
    'danger',
  ] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-text color="${color}">This is a text</ds-text>`)
      await a11y(`ds-text`)
    })
  })
})

test.describe('sizes', () => {
  const SIZES = ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'small', 'lead', 'block'] as const
  SIZES.forEach(size => {
    test(size, async ({ page, a11y }) => {
      await page.mount(`<ds-text size="${size}">This is a text</ds-text>`)
      await a11y(`ds-text`)
    })
  })
})
