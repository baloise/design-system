import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../../stories/utils'
import { BalDatepicker } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Datepicker',
  component: BalDatepicker,
  argTypes: {
    ...stencilArgType('bal-datepicker'),
  },
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
