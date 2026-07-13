import { test } from '@baloise/ds-playwright'

const ITEMS = `
  <ds-carousel-item name="s1"><div style="height:150px;background:#4a5568">Slide 1</div></ds-carousel-item>
  <ds-carousel-item name="s2"><div style="height:150px;background:#2d3748">Slide 2</div></ds-carousel-item>
  <ds-carousel-item name="s3"><div style="height:150px;background:#1a202c">Slide 3</div></ds-carousel-item>
`

const PRODUCT_ITEMS = `
  <ds-carousel-item name="p1">Item 1</ds-carousel-item>
  <ds-carousel-item name="p2">Item 2</ds-carousel-item>
  <ds-carousel-item name="p3">Item 3</ds-carousel-item>
`

test.describe('a11y — image variant', () => {
  test('basic with dots', async ({ page, a11y }) => {
    await page.mount(`<ds-carousel label="Image gallery">${ITEMS}</ds-carousel>`)
    await a11y('ds-carousel')
  })

  test('no controls', async ({ page, a11y }) => {
    await page.mount(`<ds-carousel label="Image gallery" controls="none">${ITEMS}</ds-carousel>`)
    await a11y('ds-carousel')
  })

  test('preset value', async ({ page, a11y }) => {
    await page.mount(`<ds-carousel label="Image gallery" value="s2">${ITEMS}</ds-carousel>`)
    await a11y('ds-carousel')
  })
})

test.describe('a11y — tile variant', () => {
  test('basic', async ({ page, a11y }) => {
    await page.mount(`<ds-carousel variant="tile" controls="large" label="Products">${PRODUCT_ITEMS}</ds-carousel>`)
    await a11y('ds-carousel')
  })
})
