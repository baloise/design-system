import docs from './readme.docs.mdx'
import { BalComponentStory, withContent } from '../../../../stories/utils'
import { BalCheckbox } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Checkbox',
  component: BalCheckbox,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

const Template = args => ({
  components: { BalCheckbox },
  setup: () => ({ args }),
  template: `<bal-checkbox v-bind="args">
     {{ args.content }}
  </bal-checkbox>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Label',
}
Basic.parameters = { ...component.sourceCode(Basic) }

export const Switch = Template.bind({})
Switch.args = {
  content: 'Label',
  interface: 'switch',
}
Switch.parameters = { ...component.sourceCode(Switch) }
