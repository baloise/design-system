import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalSlider } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Slider',
  component: BalSlider,
  docs,
})

export default component.story

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
Basic.parameters = { ...component.sourceCode(Basic) }
