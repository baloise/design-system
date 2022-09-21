import docs from './bal-tab-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalTabSlider, BalTabSliderItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Tab Slider',
  component: BalTabSlider,
  subcomponents: { BalTabSliderItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-tab-slider v-bind="args">
    <bal-tab-slider-item >
      <bal-card flat fullheight class="mt-2" color="red-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-tab-slider-item>
    <bal-tab-slider-item>
      <bal-card flat fullheight class="mt-2" color="purple-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-tab-slider-item>
    <bal-tab-slider-item>
      <bal-card flat fullheight class="mt-2" color="green-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
      </bal-tab-slider-item>
  </bal-tab-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
