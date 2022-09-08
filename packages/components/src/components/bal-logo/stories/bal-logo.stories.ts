import docs from './bal-logo.docs.mdx'
import { BalComponentStory } from '../../../stories/utils'
import { BalLogo } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Logo',
  component: BalLogo,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-logo v-bind="args"></bal-logo>`,
})

export const Basic = Template.bind({})
Basic.args = {
  color: 'blue',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Animated = Template.bind({})
Animated.args = {
  color: 'blue',
  animated: true,
}
Animated.parameters = { ...component.sourceCode(Animated) }
