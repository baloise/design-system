import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalSlider } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Slider',
  component: BalSlider,
  argTypes: generateArgType('bal-slider'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = args => ({
  components: { BalSlider },
  setup: () => ({ args }),
  template: `<bal-slider v-bind="args"></bal-slider>`,
})
Basic.args = {
  value: '20',
  hasTicks: true,
  step: 20,
  min: 0,
  max: 100,
}
