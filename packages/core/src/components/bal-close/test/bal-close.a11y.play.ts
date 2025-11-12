import { findPropertyValuesByTag, test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-close></bal-close>`)
  await a11y('bal-close')
})

test('inverted', async ({ page, a11y }) => {
  await page.mount(`<bal-close inverted></bal-close>`)
  await a11y('bal-close')
})

const sizes = findPropertyValuesByTag('bal-close', 'size')
for (let index = 0; index < sizes.length; index++) {
  const size = sizes[index]
  test(`size ${size}`, async ({ page, a11y }) => {
    await page.mount(`<bal-close size="${size}"></bal-close>`)
    await a11y('bal-close')
  })
}
