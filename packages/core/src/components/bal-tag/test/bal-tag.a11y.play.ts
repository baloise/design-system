import { test } from '@baloise/ds-playwright'

test.describe('a11y', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount('<bal-tag>Tag</bal-tag>')
    await a11y('bal-tag')
  })
  test('closable', async ({ page, a11y }) => {
    await page.mount('<bal-tag closable>Tag</bal-tag>')
    await a11y('bal-tag')
  })

  test.describe('colors', () => {
    const colors = ['primary', 'grey', 'info', 'success', 'warning', 'danger', 'purple', 'green', 'red', 'yellow']

    colors.forEach(color => {
      test(color, async ({ page, a11y }) => {
        await page.mount(`<bal-tag color="${color}">Tag</bal-tag>`)
        await a11y('bal-tag')
      })
    })
  })
})
