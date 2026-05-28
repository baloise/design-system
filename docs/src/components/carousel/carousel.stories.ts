import type { JSX } from '@baloise/ds-core'
import type { Meta } from '@storybook/html-vite'
import { props, StoryFactory, withComponentControls, withRender } from '../../utils'

type Args = JSX.DsCarousel

const SLIDE_ITEMS = `
  <ds-carousel-item name="s1" src="https://fastly.picsum.photos/id/626/1280/720.jpg?hmac=pHWhzQeCr1Zq8_NquZJ51qZ0xXa4psCZpoeJbaUbkWM"></ds-carousel-item>
  <ds-carousel-item name="s2" src="https://fastly.picsum.photos/id/921/1280/720.jpg?hmac=_kfenyYI38K4FYrzavn01cZUPqpu1pbn2OYNhrGqwvg"></ds-carousel-item>
  <ds-carousel-item name="s3" src="https://fastly.picsum.photos/id/235/1280/720.jpg?hmac=MBlYf-BNbNbdxmF-qCtt9eNsT1SKJy_1JCHeLDRHYEw"></ds-carousel-item>`

const TILE_ITEMS = `
  <ds-carousel-item name="auto" color="green" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-green" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/car-green.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Auto</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="haushalt" color="yellow" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-yellow" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/lamp-tangerine.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Haushalt</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="hypothek" color="purple" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-purple" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/building-purple.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Hypothek</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="pensionsplanung" color="red" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-red" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/bar-chart-purple.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Pensionsplanung</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="anlegen" color="green" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-green" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/sustainability-green.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Anlegen</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="finanzplanung" color="yellow" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-yellow" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/pie-chart-tangerine.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Finanzplanung</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="ebanking" color="purple" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-purple" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/laptop-purple.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">E-Banking</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="sparen" color="red" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-red" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/piggy-bank-red.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Sparen</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="yougo" color="green" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-green" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/diamond-green.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">YouGo</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="gegenstaende" color="yellow" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-yellow" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/luggage-tangerine.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Alle Gegenstände</span>
    </a>
  </ds-carousel-item>
  <ds-carousel-item name="motorrad" color="purple" navigation>
    <a href="#" class="stack align-top gap-xs button is-tertiary-purple" style="width:10rem">
      <ds-icon src="/assets/images/brand-icons/scooter-purple.svg" size="2xl"></ds-icon>
      <span class="stack align-center h-full w-full">Motorrad &amp; Roller</span>
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

const Story = StoryFactory<Args>(meta)

export const Slide = Story({
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)}>${SLIDE_ITEMS}
</ds-carousel>`,
  ),
})
Slide.storyName = '🧩 Slide'

export const SlideHtml = Story({})
SlideHtml.storyName = '🌍 Slide'

export const Tile = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Insurance products',
    steps: 3,
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="--carousel-item-width:10rem">${TILE_ITEMS}
</ds-carousel>`,
  ),
})
Tile.storyName = '🧩 Tile'

export const TileHtml = Story({
  args: {
    variant: 'tile',
    controls: 'large',
    label: 'Insurance products',
    steps: 3,
  },
  ...withRender(
    ({ ...args }) => `<ds-carousel ${props(args)} style="--carousel-item-width:10rem">${TILE_ITEMS}
</ds-carousel>`,
  ),
})
TileHtml.storyName = '🌍 Tile'
