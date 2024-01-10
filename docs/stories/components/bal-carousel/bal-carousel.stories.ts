import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import { props, withRender, withContent, withDefaultContent, withComponentControls, StoryFactory } from '../../utils'

type Args = JSX.BalCarousel & { content: string }

const meta: Meta<Args> = {
  title: 'Components/Data Display/Carousel',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-carousel' }),
  },
  ...withRender(
    () => `<bal-carousel>
  <bal-carousel-item>
    <div class="background-green-1 p-normal w-full">Slide 1</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="bg-green-2 p-normal w-full">Slide 2</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="bg-green-3 p-normal w-full">Slide 3</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="bg-green-4 p-normal w-full">Slide 4</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="bg-green-5 p-normal w-full text-white">Slide 5</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="bg-green-6 p-normal w-full text-white">Slide 6</div>
  </bal-carousel-item>
</bal-carousel>`,
  ),
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const ImageSlider = Story({
  ...withRender(
    ({ ...args }) => `<div class="container is-compact">
  <bal-carousel  ${props(args)}>
    <bal-carousel-item
      src="https://fastly.picsum.photos/id/626/1280/720.jpg?hmac=pHWhzQeCr1Zq8_NquZJ51qZ0xXa4psCZpoeJbaUbkWM">
    </bal-carousel-item>
    <bal-carousel-item
      src="https://fastly.picsum.photos/id/921/1280/720.jpg?hmac=_kfenyYI38K4FYrzavn01cZUPqpu1pbn2OYNhrGqwvg">
    </bal-carousel-item>
    <bal-carousel-item
      src="https://fastly.picsum.photos/id/235/1280/720.jpg?hmac=MBlYf-BNbNbdxmF-qCtt9eNsT1SKJy_1JCHeLDRHYEw">
    </bal-carousel-item>
  </bal-carousel>
</div>`,
  ),
  args: {
    interface: 'image',
    controls: 'dots',
  },
})

export const ProductSlider = Story({
  ...withRender(
    ({ ...args }) => `
    <bal-carousel ${props(args)} items-per-view="auto">
    <bal-carousel-item color="green" label="Auto" src="/assets/images/brand-icons/car-green.svg"></bal-carousel-item>
    <bal-carousel-item color="yellow" label="Haushalt" src="/assets/images/brand-icons/lamp-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item color="purple" label="Hypothek" src="/assets/images/brand-icons/building-purple.svg"></bal-carousel-item>
    <bal-carousel-item color="red" label="Pensionsplanung" src="/assets/images/brand-icons/bar-chart-purple.svg"></bal-carousel-item>
    <bal-carousel-item color="green" label="Anlegen" src="/assets/images/brand-icons/sustainability-green.svg"></bal-carousel-item>
    <bal-carousel-item color="yellow" label="Finanzplanung Finanzplanung Finanzplanung Finanzplanung Finanzplanung" src="/assets/images/brand-icons/pie-chart-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item color="purple" label="E-Banking" src="/assets/images/brand-icons/laptop-purple.svg"></bal-carousel-item>
    <bal-carousel-item color="red" label="Sparen" src="/assets/images/brand-icons/piggy-bank-red.svg"></bal-carousel-item>
    <bal-carousel-item color="green" label="YouGo" src="/assets/images/brand-icons/diamond-green.svg"></bal-carousel-item>
    <bal-carousel-item color="yellow" label="Alle Gegenstände" src="/assets/images/brand-icons/luggage-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item color="purple" label="Motorrad & Roller" src="/assets/images/brand-icons/scooter-purple.svg"></bal-carousel-item>
  </bal-carousel>`,
  ),
  args: {
    interface: 'product',
    steps: 2,
    controls: 'large',
  },
})

export const CardSlider = Story({
  ...withRender(
    ({ ...args }) => `<div class="container">
    <bal-carousel ${props(args)} controls-sticky="true" scroll-y="true">
      <bal-carousel-item label="ECO">
        <bal-card style="width: 100%">
          <bal-card-title>Title ECO</bal-card-title>
          <bal-card-content>Content Content Content</bal-card-content>
        </bal-card>
      </bal-carousel-item>
      <bal-carousel-item label="SMART">
        <bal-card style="width: 100%">
          <bal-card-title>Title SMART</bal-card-title>
          <bal-card-content>Content</bal-card-content>
        </bal-card>
      </bal-carousel-item>
      <bal-carousel-item label="TOP">
        <bal-card style="width: 100%">
          <bal-card-title>Title TOP</bal-card-title>
          <bal-card-content>Content</bal-card-content>
        </bal-card>
      </bal-carousel-item>
    </bal-carousel>
  </div>`,
  ),
  args: {
    interface: 'card',
    controls: 'tabs',
  },
})

export const ResponsiveSlider = Story({
  ...withRender(
    ({ ...args }) => `<div class="container">
    <bal-carousel ${props(args)} items-per-view="auto">
      <bal-carousel-item>
        <div class="px-x-small">Liverpool</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Valencia</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Madrid</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Barcelona</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">München</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Manchester</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">London</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Basel</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Brüssel</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Paris</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Berlin</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Hamburg</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Stuttgart</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Bern</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Zürich</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Dornach</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Reinach</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Olten</div>
      </bal-carousel-item>
      <bal-carousel-item>
        <div class="px-x-small">Solothurn Last</div>
      </bal-carousel-item>
    </bal-carousel>
  </div>`,
  ),
  args: {
    controls: 'small',
    steps: 3,
  },
})

export const TeaserSlider = Story({
  ...withRender(
    ({ ...args }) => `<bal-carousel ${props(args)} items-per-view="4" controls-overflow="true">
    <bal-carousel-item src="/assets/images/brand-icons/car-green.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/lamp-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/building-purple.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/bar-chart-purple.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/sustainability-green.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/pie-chart-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/laptop-purple.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/piggy-bank-red.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/diamond-green.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/luggage-tangerine.svg"></bal-carousel-item>
    <bal-carousel-item src="/assets/images/brand-icons/scooter-purple.svg"></bal-carousel-item>
  </bal-carousel>`,
  ),
  args: {
    steps: 1,
    controls: 'large',
  },
})
