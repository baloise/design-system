import docs from './readme.docs.mdx'
import { generateArgType } from '../../../../stories/helpers/args'
import { BalTextarea } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Textarea',
  component: BalTextarea,
  argTypes: generateArgType('bal-textarea'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalTextarea },
  setup: () => ({ args }),
  template: `<bal-textarea v-bind="args"></bal-textarea>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Enter a comment',
  disabled: false,
}
