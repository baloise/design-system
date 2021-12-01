import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../../stories/helpers/args'
import { BalCheckbox } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Checkbox',
  component: BalCheckbox,
  argTypes: withContent(generateArgType('bal-checkbox')),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

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

export const Switch = Template.bind({})
Switch.args = {
  content: 'Label',
  interface: 'switch',
}
