import { findPropertyValuesByTag, test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-label>Label default</bal-label>`)
  await a11y('bal-label')
})

test('invalid', async ({ page, a11y }) => {
  await page.mount(`<bal-label invalid>Label default</bal-label>`)
  await a11y('bal-label')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<bal-label disabled>Label default</bal-label>`)
  await a11y('bal-label')
})

test('valid', async ({ page, a11y }) => {
  await page.mount(`<bal-label valid>Label default</bal-label>`)
  await a11y('bal-label')
})

const sizes = findPropertyValuesByTag('bal-label', 'size')
for (let index = 0; index < sizes.length; index++) {
  const size = sizes[index]
  test(`size ${size}`, async ({ page, a11y }) => {
    await page.mount(`<bal-label size="${size}">42</bal-label>`)
    await a11y('bal-label')
  })
}
