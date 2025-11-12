import { findPropertyValuesByTag, test, waitForChanges } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-divider></bal-divider>`)
  await a11y('bal-divider')
})

const colors = findPropertyValuesByTag('bal-divider', 'color')
for (let index = 0; index < colors.length; index++) {
  const color = colors[index]
  test(`color ${color}`, async ({ page, a11y }) => {
    await page.mount(`<bal-divider color="${color}"></bal-divider>`)
    await a11y('bal-divider')
  })
}

