import docs from './bal-carousel.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalCarousel, BalCarouselItem } from '../../../../.storybook/vue/components'

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
    <div class="has-background-green-1 p-4 is-fullwidth">Slide 1</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-2 p-4 is-fullwidth">Slide 2</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-3 p-4 is-fullwidth">Slide 3</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-4 p-4 is-fullwidth">Slide 4</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-5 p-4 is-fullwidth has-text-white">Slide 5</div>
  </bal-carousel-item>
  <bal-carousel-item>
    <div class="has-background-green-6 p-4 is-fullwidth has-text-white">Slide 6</div>
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
      src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI">
    </bal-carousel-item>
    <bal-carousel-item
      src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I">
    </bal-carousel-item>
    <bal-carousel-item
      src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw">
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
}
CardSlider.parameters = { ...component.sourceCode(CardSlider) }

export const ResponsiveSlider = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div class="container">
  <bal-carousel v-bind="args">
    <bal-carousel-item>
      <div class="px-2">Liverpool</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Valencia</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Madrid</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Barcelona</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">München</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Manchester</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">London</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Basel</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Brüssel</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Paris</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Berlin</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Hamburg</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Stuttgart</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Bern</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Zürich</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Dornach</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Reinach</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Olten</div>
    </bal-carousel-item>
    <bal-carousel-item>
      <div class="px-2">Solothurn Last</div>
    </bal-carousel-item>
  </bal-carousel>
</div>`,
})
ResponsiveSlider.args = {
  itemsPerView: 'auto',
  steps: 3,
}
ResponsiveSlider.parameters = { ...component.sourceCode(ResponsiveSlider) }
