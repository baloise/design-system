import { DsCarousel, expect, test } from '@baloise/ds-playwright'

const ITEMS = `
  <ds-carousel-item name="s1"><div style="height:150px">Slide 1</div></ds-carousel-item>
  <ds-carousel-item name="s2"><div style="height:150px">Slide 2</div></ds-carousel-item>
  <ds-carousel-item name="s3"><div style="height:150px">Slide 3</div></ds-carousel-item>
`

test.describe('image variant — initial state', () => {
  test('selects the first item by default', async ({ page }) => {
    await page.mount(`<ds-carousel>${ITEMS}</ds-carousel>`)
    const carousel = new DsCarousel(page.locator('ds-carousel'))

    await carousel.assertItemSelected('s1')
    await carousel.assertItemNotSelected('s2')
  })

  test('respects a preset value prop', async ({ page }) => {
    await page.mount(`<ds-carousel value="s2">${ITEMS}</ds-carousel>`)
    const carousel = new DsCarousel(page.locator('ds-carousel'))

    await carousel.assertItemSelected('s2')
    await carousel.assertItemNotSelected('s1')
  })
})

test.describe('image variant — dsChange event', () => {
  test('emits dsChange when dot is clicked', async ({ page }) => {
    await page.mount(`<ds-carousel style="width:300px">${ITEMS}</ds-carousel>`)
    const carousel = new DsCarousel(page.locator('ds-carousel'))
    const spy = await carousel.el.spyOnEvent('dsChange')

    await carousel.clickDot(1)

    expect(spy).toHaveReceivedEventTimes(1)
  })
})

test.describe('tile variant — initial state', () => {
  test('selects the first item by default', async ({ page }) => {
    await page.mount(`
      <ds-carousel variant="tile" controls="large">
        <ds-carousel-item name="p1">Item 1</ds-carousel-item>
        <ds-carousel-item name="p2">Item 2</ds-carousel-item>
      </ds-carousel>
    `)
    const carousel = new DsCarousel(page.locator('ds-carousel'))
    await carousel.assertItemSelected('p1')
  })

  test('emits dsChange on item click', async ({ page }) => {
    await page.mount(`
      <ds-carousel variant="tile" controls="large">
        <ds-carousel-item name="p1">Item 1</ds-carousel-item>
        <ds-carousel-item name="p2">Item 2</ds-carousel-item>
      </ds-carousel>
    `)
    const carousel = new DsCarousel(page.locator('ds-carousel'))
    const spy = await carousel.el.spyOnEvent('dsChange')

    await carousel.item('p2').click()

    expect(spy).toHaveReceivedEventTimes(1)
    expect(spy).toHaveReceivedEventDetail({ value: 'p2' })
  })
})
