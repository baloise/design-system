import docs from './readme.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalTimeinput } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Timeinput',
  component: BalTimeinput,
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-timeinput v-bind="args"></bal-timeinput>`,
})

export const Basic = Template.bind({})
Basic.args = {
  disabled: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }
