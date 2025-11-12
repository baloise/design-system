import { findPropertyValuesByTag, test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`<bal-button>Label</bal-button>`)
  await a11y('bal-button')
})

test('icon', async ({ page, a11y }) => {
  await page.mount(`<bal-button icon="plus" title="myLabel"></bal-button>`)
  await a11y('bal-button')
})

test('disabled', async ({ page, a11y }) => {
  await page.mount(`<bal-button disabled>Label</bal-button>`)
  await a11y('bal-button')
})

test('active', async ({ page, a11y }) => {
  await page.mount(`<bal-button is-active>Label</bal-button>`)
  await a11y('bal-button')
})

test('inverted', async ({ page, a11y }) => {
  await page.mount(`<bal-button inverted>Label</bal-button>`)
  await a11y('bal-button')
})

const colors = findPropertyValuesByTag('bal-button', 'color')
for (let index = 0; index < colors.length; index++) {
  const color = colors[index]
  test(`color ${color}`, async ({ page, a11y }) => {
    await page.mount(`<bal-button color="${color}">Label</bal-button>`)
    await a11y('bal-button')
  })
}

const sizes = findPropertyValuesByTag('bal-button', 'size')
for (let index = 0; index < sizes.length; index++) {
  const size = sizes[index]
  test(`size ${size}`, async ({ page, a11y }) => {
    await page.mount(`<bal-button size="${size}">Label</bal-button>`)
    await a11y('bal-button')
  })
}
