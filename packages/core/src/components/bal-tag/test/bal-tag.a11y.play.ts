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
    const colors = [
      'primary',
      'grey',
      'success',
      'info',
      'warning',
      'danger',
      'purple',
      'red',
      'yellow',
      'green',
      'purple-dark',
      'red-dark',
      'yellow-dark',
      'green-dark',
      'purple-light',
      'red-light',
      'yellow-light',
      'green-light',
    ]

    colors.forEach(color => {
      test(color, async ({ page, a11y }) => {
        await page.mount(`<bal-tag color="${color}">Tag</bal-tag>`)
        await a11y('bal-tag')
      })
    })
  })
})
