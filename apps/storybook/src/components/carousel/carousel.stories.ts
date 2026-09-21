import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsCarousel

const SLIDE_ITEMS = `
  <ds-carousel-item name="s1" src="https://fastly.picsum.photos/id/626/1280/720.jpg?hmac=pHWhzQeCr1Zq8_NquZJ51qZ0xXa4psCZpoeJbaUbkWM"></ds-carousel-item>
  <ds-carousel-item name="s2" src="https://fastly.picsum.photos/id/921/1280/720.jpg?hmac=_kfenyYI38K4FYrzavn01cZUPqpu1pbn2OYNhrGqwvg"></ds-carousel-item>
  <ds-carousel-item name="s3" src="https://fastly.picsum.photos/id/235/1280/720.jpg?hmac=MBlYf-BNbNbdxmF-qCtt9eNsT1SKJy_1JCHeLDRHYEw"></ds-carousel-item>`

const slideStyle = (background: string) =>
  `display: flex; align-items: center; justify-content: center; height: 200px; border-radius: 0.5rem; font-size: 1.5rem; font-weight: 700; color: white; background: ${background};`

const NO_CONTROLS_ITEMS = `
  <ds-carousel-item name="s1">
    <div style="${slideStyle('#4a5568')}">Slide 1</div>
  </ds-carousel-item>
  <ds-carousel-item name="s2">
    <div style="${slideStyle('#2d3748')}">Slide 2</div>
  </ds-carousel-item>`

const PRODUCT_ITEMS = `
  <ds-carousel-item name="p1">Item 1</ds-carousel-item>
  <ds-carousel-item name="p2">Lorem ipsum dolor sit amet</ds-carousel-item>
  <ds-carousel-item name="p3">Item 3</ds-carousel-item>
  <ds-carousel-item name="p4">Item 4</ds-carousel-item>
  <ds-carousel-item name="p5">Item 5</ds-carousel-item>
  <ds-carousel-item name="p6">Last item with a long content</ds-carousel-item>`

const BRAND_ICON_ITEMS = `
  <ds-carousel-item name="auto" color="green" navigation>
    <a href="/auto" class="ds-stack align-top gap-xs ds-button is-brand-green" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/car-green.svg" color="green" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Auto</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="haushalt" color="yellow" navigation>
    <a href="/haushalt" class="ds-stack align-top gap-xs ds-button is-brand-yellow" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/lamp-tangerine.svg" color="yellow" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Haushalt</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="hypothek" color="purple" navigation>
    <a href="/hypothek" class="ds-stack align-top gap-xs ds-button is-brand-purple" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/building-purple.svg" color="purple" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Hypothek</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="pensionsplanung" color="red" navigation>
    <a href="/pensionsplanung" class="ds-stack align-top gap-xs ds-button is-brand-red" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/bar-chart-purple.svg" color="purple" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Pensionsplanung</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="anlegen" color="green" navigation>
    <a href="/anlegen" class="ds-stack align-top gap-xs ds-button is-brand-green" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/sustainability-green.svg" color="green" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Anlegen</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="finanzplanung" color="yellow" navigation>
    <a href="/finanzplanung" class="ds-stack align-top gap-xs ds-button is-brand-yellow" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/pie-chart-tangerine.svg" color="yellow" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Finanzplanung</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="ebanking" color="purple" navigation>
    <a href="/ebanking" class="ds-stack align-top gap-xs ds-button is-brand-purple" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/laptop-purple.svg" color="purple" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">E-Banking</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="sparen" color="red" navigation>
    <a href="/sparen" class="ds-stack align-top gap-xs ds-button is-brand-red" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/piggy-bank-red.svg" color="red" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Sparen</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="yougo" color="green" navigation>
    <a href="/yougo" class="ds-stack align-top gap-xs ds-button is-brand-green" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/diamond-green.svg" color="green" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">YouGo</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="gegenstaende" color="yellow" navigation>
    <a href="/gegenstaende" class="ds-stack align-top gap-xs ds-button is-brand-yellow" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/luggage-tangerine.svg" color="yellow" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Alle Gegenstände</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="motorrad" color="purple" navigation>
    <a href="/motorrad" class="ds-stack align-top gap-xs ds-button is-brand-purple" style="width: 10rem">
      <ds-brand-icon src="/assets/images/brand-icons/scooter-purple.svg" color="purple" size="2xl"></ds-brand-icon>
      <span class="ds-stack align-center h-full w-full">Motorrad &amp; Roller</span>
    </a>
  </ds-carousel-item>`

const meta: Meta<Args> = {
  title: 'Components/Carousel/Variants',
  args: {
    variant: 'slide',
    controls: 'dots',
    label: 'Image gallery',
  },
  argTypes: {
    ...withComponentControls({ tag: 'ds-carousel' }),
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)}>${SLIDE_ITEMS}
</ds-carousel>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

// Slides with Dots
// ------------------------------------------------------

export const Slide = Story({})
Slide.storyName = '🧩 Slides with Dots'

export const SlideHtml = Story({})
SlideHtml.storyName = '🌍 Slides with Dots'

// Slides with Large Controls
// ------------------------------------------------------

export const SlideLargeControls = Story({
  args: {
    controls: 'large',
  },
})
SlideLargeControls.storyName = '🧩 Slides with Large Controls'

export const SlideLargeControlsHtml = Story({
  args: {
    controls: 'large',
  },
})
SlideLargeControlsHtml.storyName = '🌍 Slides with Large Controls'

// Slides (no controls)
// ------------------------------------------------------

export const SlideNoControls = Story({
  args: {
    controls: 'none',
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)}>${NO_CONTROLS_ITEMS}
</ds-carousel>`,
  ),
})
SlideNoControls.storyName = '🧩 Slides (no controls)'

export const SlideNoControlsHtml = Story({
  args: {
    controls: 'none',
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)}>${NO_CONTROLS_ITEMS}
</ds-carousel>`,
  ),
})
SlideNoControlsHtml.storyName = '🌍 Slides (no controls)'

// Product Carousel (auto width)
// ------------------------------------------------------

export const Product = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Products',
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="max-width: 600px">${PRODUCT_ITEMS}
</ds-carousel>`,
  ),
})
Product.storyName = '🧩 Product Carousel (auto width)'

export const ProductHtml = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Products',
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="max-width: 600px">${PRODUCT_ITEMS}
</ds-carousel>`,
  ),
})
ProductHtml.storyName = '🌍 Product Carousel (auto width)'

// Product Carousel (brand icons, navigation)
// ------------------------------------------------------

export const ProductBrandIcons = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Insurance products',
    steps: 3,
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="--carousel-item-width: 10rem">${BRAND_ICON_ITEMS}
</ds-carousel>`,
  ),
})
ProductBrandIcons.storyName = '🧩 Product Carousel (brand icons, navigation)'

export const ProductBrandIconsHtml = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Insurance products',
    steps: 3,
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="--carousel-item-width: 10rem">${BRAND_ICON_ITEMS}
</ds-carousel>`,
  ),
})
ProductBrandIconsHtml.storyName = '🌍 Product Carousel (brand icons, navigation)'
