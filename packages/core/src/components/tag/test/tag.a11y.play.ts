import { test } from '@baloise/ds-playwright'

test.describe('a11y', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount('<ds-tag>Tag</ds-tag>')
    await a11y('ds-tag')
  })

  test('closable', async ({ page, a11y }) => {
    await page.mount('<ds-tag closable>Tag</ds-tag>')
    await a11y('ds-tag')
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
        await page.mount(`<ds-tag color="${color}">Tag</ds-tag>`)
        await a11y('ds-tag')
      })
    })
  })
})
