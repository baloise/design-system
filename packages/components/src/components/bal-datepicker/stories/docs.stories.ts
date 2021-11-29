import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalDatepicker } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Form/Datepicker',
  component: BalDatepicker,
  argTypes: generateArgType('bal-datepicker'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalDatepicker },
  setup: () => ({ args }),
  template: `<bal-datepicker v-bind="args"></bal-datepicker>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Pick a date',
}

export const ManualInput = Template.bind({})
ManualInput.args = {
  placeholder: 'Type a date',
  triggerIcon: true,
}
