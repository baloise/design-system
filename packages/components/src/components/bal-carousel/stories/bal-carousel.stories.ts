import docs from './bal-carousel.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalCarousel, BalCarouselItem } from '../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Carousel',
  component: BalCarousel,
  subcomponents: {
    BalCarouselItem,
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-carousel v-bind="args">
  <bal-carousel-item>
    <div class="has-background-green-1 p-normal is-fullwidth">Slide 1</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-2 p-normal is-fullwidth">Slide 2</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-3 p-normal is-fullwidth">Slide 3</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-4 p-normal is-fullwidth">Slide 4</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-5 p-normal is-fullwidth has-text-white">Slide 5</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-6 p-normal is-fullwidth has-text-white">Slide 6</div>
  </bal-carousel-item>
</bal-carousel>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const ImageSlider = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div class="container is-compact">
  <bal-carousel v-bind="args">
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
})
ImageSlider.args = {
  interface: 'image',
  controls: 'dots',
}
ImageSlider.parameters = { ...component.sourceCode(ImageSlider) }

export const ProductSlider = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-carousel v-bind="args">
  <bal-carousel-item color="green" label="Auto" src="/assets/images/brand/car.svg"></bal-carousel-item>
  <bal-carousel-item color="yellow" label="Haushalt" src="/assets/images/brand/lamp.svg"></bal-carousel-item>
  <bal-carousel-item color="purple" label="Hypothek" src="/assets/images/brand/home.svg"></bal-carousel-item>
  <bal-carousel-item color="red" label="Pensionsplanung" src="/assets/images/brand/bars.svg"></bal-carousel-item>
  <bal-carousel-item color="green" label="Anlegen" src="/assets/images/brand/plant.svg"></bal-carousel-item>
  <bal-carousel-item color="yellow" label="Finanzplanung Finanzplanung Finanzplanung Finanzplanung Finanzplanung" src="/assets/images/brand/pie.svg"></bal-carousel-item>
  <bal-carousel-item color="purple" label="E-Banking" src="/assets/images/brand/notebook.svg"></bal-carousel-item>
  <bal-carousel-item color="red" label="Sparen" src="/assets/images/brand/pig.svg"></bal-carousel-item>
  <bal-carousel-item color="green" label="YouGo" src="/assets/images/brand/diamond.svg"></bal-carousel-item>
  <bal-carousel-item color="yellow" label="Alle Gegenstände" src="/assets/images/brand/items.svg"></bal-carousel-item>
  <bal-carousel-item color="purple" label="Motorrad & Roller" src="/assets/images/brand/roller.svg"></bal-carousel-item>
</bal-carousel>`,
})
ProductSlider.args = {
  interface: 'product',
  steps: 2,
  itemsPerView: 'auto',
  controls: 'large',
}
ProductSlider.parameters = { ...component.sourceCode(ProductSlider) }

export const CardSlider = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div class="container">
  <bal-carousel v-bind="args">
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
})
CardSlider.args = {
  interface: 'card',
  controls: 'tabs',
  controlsSticky: true,
  scrollY: true,
}
CardSlider.parameters = { ...component.sourceCode(CardSlider) }

export const ResponsiveSlider = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div class="container">
  <bal-carousel v-bind="args">
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
})
ResponsiveSlider.args = {
  itemsPerView: 'auto',
  controls: 'small',
  steps: 3,
}
ResponsiveSlider.parameters = { ...component.sourceCode(ResponsiveSlider) }
