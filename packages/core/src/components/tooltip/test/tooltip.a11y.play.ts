import { test } from '@baloise/ds-playwright'

test.describe('a11y', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`
      <button id="trigger-basic">Hover over me</button>
      <ds-tooltip reference="trigger-basic" open>Tooltip content</ds-tooltip>
    `)
    await a11y('ds-tooltip')
  })

  test('dismissed', async ({ page, a11y }) => {
    await page.mount(`
      <button id="trigger-dismissed">Hover over me</button>
      <ds-tooltip reference="trigger-dismissed">Tooltip content</ds-tooltip>
    `)
    await a11y('ds-tooltip')
  })

  test.describe('placements', () => {
    const placements = ['top', 'right', 'bottom', 'left'] as const

    placements.forEach(placement => {
      test(placement, async ({ page, a11y }) => {
        await page.mount(`
          <button id="trigger-${placement}">Hover over me</button>
          <ds-tooltip reference="trigger-${placement}" placement="${placement}" open>Tooltip content</ds-tooltip>
        `)
        await a11y('ds-tooltip')
      })
    })
  })
})
