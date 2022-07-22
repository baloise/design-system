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
  <bal-product-slider>
    <div slot="tabs">
      <bal-tabs border fullwidth interface="tabs" select-on-mobile value="all">
          <bal-tab-item value="all" label="All"/>
          <bal-tab-item value="tab-a" label="Tab A"/>
          <bal-tab-item value="tab-b" label="Tab B"/>
          <bal-tab-item value="tab-c" label="Tab C"/>
          <bal-tab-item value="tab-d" label="Tab D"/>
      </bal-tabs>
    </div>
    <div slot="images">
      <div class="bal-product-slider__product-item" data-category="tab-a">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 1</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-a">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:57293172-e72a-4ff4-b0d3-4a259e217bb9/autoversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 2</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-a">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" />
        <bal-text class="p-2" bold=true>Product 3</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-a">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:c2b4e9bc-149e-4067-9a57-3b7a63432c5d/Hypotheken.svg" />
        <bal-text class="p-2" bold=true>Product 4</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-b">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:0e3cc188-f628-451e-99ad-48ccb04b9653/Invest%20Sparen.svg" />
        <bal-text class="p-2" bold=true>Product 5</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-b">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:94d828be-2ac1-4173-92e8-2a537de28c89/Cyberversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 6</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-b">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:3ebb3230-7dd2-40b8-9773-be4aa01687f6/Krankentaggeldversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 7</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-c">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:184e95e6-518f-4401-9379-cd0f3c47c048/Fondskonto.svg" />
        <bal-text class="p-2" bold=true>Product 8</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-c">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 9</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-c">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:57293172-e72a-4ff4-b0d3-4a259e217bb9/autoversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 10</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-c">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" />
        <bal-text class="p-2" bold=true>Product 11</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-c">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:c2b4e9bc-149e-4067-9a57-3b7a63432c5d/Hypotheken.svg" />
        <bal-text class="p-2" bold=true>Product 12</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-d">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:0e3cc188-f628-451e-99ad-48ccb04b9653/Invest%20Sparen.svg" />
        <bal-text class="p-2" bold=true>Product 13</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-d">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:94d828be-2ac1-4173-92e8-2a537de28c89/Cyberversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 14</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-d">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:3ebb3230-7dd2-40b8-9773-be4aa01687f6/Krankentaggeldversicherung.svg" />
        <bal-text class="p-2" bold=true>Product 15</bal-text>
      </div>
      <div class="bal-product-slider__product-item" data-category="tab-d">
        <img class="bal-product-slider__product-image" src="https://www.baloise.ch/dam/jcr:184e95e6-518f-4401-9379-cd0f3c47c048/Fondskonto.svg" />
        <bal-text class="p-2" bold=true>Product 16</bal-text>
      </div>
    </div>
  </bal-product-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
