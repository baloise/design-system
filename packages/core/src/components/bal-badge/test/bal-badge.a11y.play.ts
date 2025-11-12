import { findPropertyValuesByTag, test, waitForChanges } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-badge>42</bal-badge>`)
  await a11y('bal-badge')
})

const colors = findPropertyValuesByTag('bal-badge', 'color')
for (let index = 0; index < colors.length; index++) {
  const color = colors[index]
  test(`color ${color}`, async ({ page, a11y }) => {
    await page.mount(`<bal-badge color="${color}">42</bal-badge>`)
    await a11y('bal-badge')
  })
}

const sizes = findPropertyValuesByTag('bal-badge', 'size')
for (let index = 0; index < sizes.length; index++) {
  const size = sizes[index]
  test(`size ${size}`, async ({ page, a11y }) => {
    await page.mount(`<bal-badge size="${size}">42</bal-badge>`)
    await a11y('bal-badge')
  })
}
