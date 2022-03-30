import docs from './bal-timeinput.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalTimeinput } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Time Input',
  component: BalTimeinput,
  docs,
  status: 'beta',
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-timeinput v-bind="args" v-model="args.value"></bal-timeinput>`,
})

export const Basic = Template.bind({})
Basic.args = {
  disabled: false,
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: {
    exclude: [],
  },
}
