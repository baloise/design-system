import { DsCarousel, mountSsr, test } from '@baloise/ds-playwright'
import { renderToString } from '@baloise/ds-core/hydrate'

const ITEMS = `
  <ds-carousel-item name="s1"><div style="height:150px">Slide 1</div></ds-carousel-item>
  <ds-carousel-item name="s2"><div style="height:150px">Slide 2</div></ds-carousel-item>
`

test.describe('ssr', () => {
  test('renders and hydrates', async ({ page }, testInfo) => {
    await mountSsr(page, `<ds-carousel>${ITEMS}</ds-carousel>`, renderToString, testInfo)

    const carousel = new DsCarousel(page.locator('ds-carousel'))
    await carousel.assertItemSelected('s1')
  })
})
