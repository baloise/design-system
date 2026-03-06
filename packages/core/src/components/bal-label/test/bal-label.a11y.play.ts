import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-label>Label</bal-label>`)
  await a11y('bal-label')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<bal-label required>Label</bal-label>`)
  await a11y('bal-label')
})

test.describe('states', () => {
  const STATES = ['disabled', 'valid', 'invalid'] as const
  STATES.forEach(state => {
    test(state, async ({ page, a11y }) => {
      await page.mount(`<bal-label ${state}>Label</bal-label>`)
      await a11y(`bal-label`)
    })
  })
})

test.describe('sizes', () => {
  const SIZES = ['3xl', '2xl', 'xl', 'lg', 'sm'] as const
  SIZES.forEach(size => {
    test(size, async ({ page, a11y }) => {
      await page.mount(`<bal-label size="${size}">Label</bal-label>`)
      await a11y(`bal-label`)
    })
  })
})
