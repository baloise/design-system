import docs from './bal-product-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalProductSlider } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Product Slider',
  component: BalProductSlider,
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
<bal-tabs border fullwidth interface="tabs" select-on-mobile value="all">
  <bal-tab-item value="all" label="All">
    <bal-product-slider class="mt-4">
      <bal-product-slider-item label="Product 1" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" />
      <bal-product-slider-item label="Product 2" src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" />
      <bal-product-slider-item label="Product 3" src="https://www.baloise.ch/dam/jcr:c2b4e9bc-149e-4067-9a57-3b7a63432c5d/Hypotheken.svg" />
      <bal-product-slider-item label="Product 4" src="https://www.baloise.ch/dam/jcr:0e3cc188-f628-451e-99ad-48ccb04b9653/Invest%20Sparen.svg" />
      <bal-product-slider-item label="Product 5" src="https://www.baloise.ch/dam/jcr:94d828be-2ac1-4173-92e8-2a537de28c89/Cyberversicherung.svg" />
      <bal-product-slider-item label="Product 6" src="https://www.baloise.ch/dam/jcr:3ebb3230-7dd2-40b8-9773-be4aa01687f6/Krankentaggeldversicherung.svg" />
      <bal-product-slider-item label="Product 7" src="https://www.baloise.ch/dam/jcr:184e95e6-518f-4401-9379-cd0f3c47c048/Fondskonto.svg" />
      <bal-product-slider-item label="Product 8" src="https://www.baloise.ch/dam/jcr:57293172-e72a-4ff4-b0d3-4a259e217bb9/autoversicherung.svg" />
      <bal-product-slider-item label="Product 9" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" />
      <bal-product-slider-item label="Product 10" src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" />
      <bal-product-slider-item label="Product 11" src="https://www.baloise.ch/dam/jcr:c2b4e9bc-149e-4067-9a57-3b7a63432c5d/Hypotheken.svg" />
      <bal-product-slider-item label="Product 12" src="https://www.baloise.ch/dam/jcr:0e3cc188-f628-451e-99ad-48ccb04b9653/Invest%20Sparen.svg" />
      <bal-product-slider-item label="Product 13" src="https://www.baloise.ch/dam/jcr:94d828be-2ac1-4173-92e8-2a537de28c89/Cyberversicherung.svg" />
      <bal-product-slider-item label="Product 14" src="https://www.baloise.ch/dam/jcr:3ebb3230-7dd2-40b8-9773-be4aa01687f6/Krankentaggeldversicherung.svg" />
      <bal-product-slider-item label="Product 15" src="https://www.baloise.ch/dam/jcr:184e95e6-518f-4401-9379-cd0f3c47c048/Fondskonto.svg" />
      <bal-product-slider-item label="Product 16" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" />
      <bal-product-slider-item label="Product 17" src="https://www.baloise.ch/dam/jcr:57293172-e72a-4ff4-b0d3-4a259e217bb9/autoversicherung.svg" />
    </bal-product-slider>
  </bal-tab-item>
  <bal-tab-item value="tab-a" label="Tab A">
    <bal-product-slider>
      <bal-product-slider-item label="Product 2" src="abc" />
    </bal-product-slider>
  </bal-tab-item>
</bal-tabs>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
