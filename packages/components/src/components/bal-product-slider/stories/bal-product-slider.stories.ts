import docs from './bal-product-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalProductSlider, BalProductSliderItem, BalTabs, BalTabItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Product Slider',
  component: BalProductSlider,
  subcomponents: {
    BalProductSliderItem,
  },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
<bal-product-slider class="mt-6">
  <bal-product-slider-item color="green" label="Auto" src="assets/images/brand/car.svg" />
  <bal-product-slider-item color="yellow" label="Haushalt" src="assets/images/brand/lamp.svg" />
  <bal-product-slider-item color="purple" label="Hypothek" src="assets/images/brand/home.svg" />
  <bal-product-slider-item color="red" label="Pensionsplanung" src="assets/images/brand/bars.svg" />
  <bal-product-slider-item color="green" label="Anlegen" src="assets/images/brand/plant.svg" />
  <bal-product-slider-item color="yellow" label="Finanzplanung" src="assets/images/brand/pie.svg" />
  <bal-product-slider-item color="purple" label="E-Banking" src="assets/images/brand/notebook.svg" />
  <bal-product-slider-item color="red" label="Sparen" src="assets/images/brand/pig.svg" />
  <bal-product-slider-item color="green" label="YouGo" src="assets/images/brand/diamond.svg" />
  <bal-product-slider-item color="yellow" label="Alle Gegenstände" src="assets/images/brand/items.svg" />
  <bal-product-slider-item color="purple" label="Motorrad & Roller" src="assets/images/brand/roller.svg" />
</bal-product-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }

export const WithTabs = args => ({
  components: { ...component.components, BalTabs, BalTabItem },
  setup: () => ({ args }),
  template: `
<bal-tabs border fullwidth interface="tabs" select-on-mobile value="all">
  <bal-tab-item value="all" label="Alle Angebote">
    <bal-product-slider class="mt-6">
      <bal-product-slider-item color="green" label="Auto" src="assets/images/brand/car.svg" />
      <bal-product-slider-item color="yellow" label="Haushalt" src="assets/images/brand/lamp.svg" />
      <bal-product-slider-item color="purple" label="Hypothek" src="assets/images/brand/home.svg" />
      <bal-product-slider-item color="red" label="Pensionsplanung" src="assets/images/brand/bars.svg" />
      <bal-product-slider-item color="green" label="Anlegen" src="assets/images/brand/plant.svg" />
      <bal-product-slider-item color="yellow" label="Finanzplanung" src="assets/images/brand/pie.svg" />
      <bal-product-slider-item color="purple" label="E-Banking" src="assets/images/brand/notebook.svg" />
      <bal-product-slider-item color="red" label="Sparen" src="assets/images/brand/pig.svg" />
      <bal-product-slider-item color="green" label="YouGo" src="assets/images/brand/diamond.svg" />
      <bal-product-slider-item color="yellow" label="Alle Gegenstände" src="assets/images/brand/items.svg" />
      <bal-product-slider-item color="purple" label="Motorrad & Roller" src="assets/images/brand/roller.svg" />
    </bal-product-slider>
  </bal-tab-item>
  <bal-tab-item value="tab-a" label="Fahrzeuge & Reisen">
    <bal-product-slider class="mt-6">
      <bal-product-slider-item color="green" label="Auto" src="assets/images/brand/car.svg" />
      <bal-product-slider-item color="purple" label="Motorrad & Roller" src="assets/images/brand/roller.svg" />
    </bal-product-slider>
  </bal-tab-item>
  <bal-tab-item value="tab-b" label="Wohnen & Eigenheim">
    <bal-product-slider class="mt-6">
      <bal-product-slider-item color="yellow" label="Haushalt" src="assets/images/brand/lamp.svg" />
      <bal-product-slider-item color="purple" label="Hypothek" src="assets/images/brand/home.svg" />
      <bal-product-slider-item color="yellow" label="Alle Gegenstände" src="assets/images/brand/items.svg" />
    </bal-product-slider>
  </bal-tab-item>
  <bal-tab-item value="tab-c" label="Zahlen & Sparen">
    <bal-product-slider class="mt-6">
      <bal-product-slider-item color="red" label="Pensionsplanung" src="assets/images/brand/bars.svg" />
      <bal-product-slider-item color="green" label="Anlegen" src="assets/images/brand/plant.svg" />
      <bal-product-slider-item color="yellow" label="Finanzplanung" src="assets/images/brand/pie.svg" />
      <bal-product-slider-item color="purple" label="E-Banking" src="assets/images/brand/notebook.svg" />
      <bal-product-slider-item color="red" label="Sparen" src="assets/images/brand/pig.svg" />
    </bal-product-slider>
  </bal-tab-item>
</bal-tabs>`,
})
WithTabs.args = {}
WithTabs.parameters = { ...component.sourceCode(WithTabs) }
