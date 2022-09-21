import docs from './bal-slider.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalSlider, BalSliderItem } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Slider',
  component: BalSlider,
  subcomponents: { BalSliderItem },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-slider v-bind="args">
    <bal-slider-item >
      <bal-card flat fullheight class="mt-2" color="red-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="purple-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
    </bal-slider-item>
    <bal-slider-item>
      <bal-card flat fullheight class="mt-2" color="green-light">
        <bal-tag color="red" position="center" size="large">Bestseller</bal-tag>
        <bal-card-title>Title</bal-card-title>
        <bal-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </bal-card-content>
      </bal-card>
      </bal-slider-item>
  </bal-slider>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
