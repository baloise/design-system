import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-heading>Heading</bal-heading>`)
  await a11y('bal-heading')
})

test.describe('colors', () => {
  const COLORS = ['info', 'success', 'warning', 'danger', 'blue', 'white'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-heading color="${color}">Heading</bal-heading>`)
      await a11y(`bal-heading`)
    })
  })
})

test.describe('sizes', () => {
  const SIZES = [
    'display',
    'display-2',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    '5xl',
    '4xl',
    '3xl',
    '2xl',
    'xl',
    'lg',
    'md',
  ] as const
  SIZES.forEach(size => {
    test(size, async ({ page, a11y }) => {
      await page.mount(`<bal-heading level="${size}">Heading</bal-heading>`)
      await a11y(`bal-heading`)
    })
  })
})
