import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-label>Label</ds-label>`)
  await a11y('ds-label')
})

test('required', async ({ page, a11y }) => {
  await page.mount(`<ds-label required>Label</ds-label>`)
  await a11y('ds-label')
})

test.describe('states', () => {
  const STATES = ['disabled', 'valid', 'invalid'] as const
  STATES.forEach(state => {
    test(state, async ({ page, a11y }) => {
      await page.mount(`<ds-label ${state}>Label</ds-label>`)
      await a11y(`ds-label`)
    })
  })
})

test.describe('sizes', () => {
  const SIZES = ['3xl', '2xl', 'xl', 'lg', 'sm'] as const
  SIZES.forEach(size => {
    test(size, async ({ page, a11y }) => {
      await page.mount(`<ds-label size="${size}">Label</ds-label>`)
      await a11y(`ds-label`)
    })
  })
})
