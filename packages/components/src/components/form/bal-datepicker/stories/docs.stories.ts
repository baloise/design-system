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

export const MinAndMax = Template.bind({})
MinAndMax.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-01-06',
  min: '2022-01-06',
  max: '2022-01-12',
}
MinAndMax.parameters = { controls: { include: ['min', 'max', 'minYearProp', 'maxYearProp', 'defaultDate', 'placeholder'] } }
