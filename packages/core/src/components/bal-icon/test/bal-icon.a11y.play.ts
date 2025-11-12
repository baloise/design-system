import { findPropertyValuesByTag, test, waitForChanges } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-icon name="info-circle"></bal-icon>`)
  await a11y('bal-icon')
})

const colors = findPropertyValuesByTag('bal-icon', 'color')
for (let index = 0; index < colors.length; index++) {
  const color = colors[index]
  test(`color ${color}`, async ({ page, a11y }) => {
    await page.mount(`<bal-icon color="${color}" name="info-circle"></bal-icon>`)
    await a11y('bal-icon')
  })
}

const sizes = findPropertyValuesByTag('bal-icon', 'size')
for (let index = 0; index < sizes.length; index++) {
  const size = sizes[index]
  test(`size ${size}`, async ({ page, a11y }) => {
    await page.mount(`<bal-icon size="${size}" name="info-circle"></bal-icon>`)
    await a11y('bal-icon')
  })
}
