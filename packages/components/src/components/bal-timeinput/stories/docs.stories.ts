import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalTimeinput } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Form/Timeinput',
  component: BalTimeinput,
  argTypes: generateArgType('bal-timeinput'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalTimeinput },
  setup: () => ({ args }),
  template: `<bal-timeinput v-bind="args"></bal-timeinput>`,
})

export const Basic = Template.bind({})
Basic.args = {
  disabled: false,
}
