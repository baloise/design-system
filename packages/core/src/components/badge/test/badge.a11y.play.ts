import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<ds-badge></ds-badge>`)
  await a11y('ds-badge')
})

test.describe('colors', () => {
  const COLORS = ['grey', 'danger', 'warning', 'success', 'red', 'yellow', 'green', 'purple'] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<ds-badge color="${color}">42</ds-badge>`)
      await a11y(`ds-badge`)
    })
  })
})
