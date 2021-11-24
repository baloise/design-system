import { generateArgType } from '../../stories/helpers/args'
import { BalDatepicker } from '../../../.storybook/vue/components'
import docs from './bal-datepicker.docs.mdx'

export default {
  title: '02-Form/Datepicker',
  component: BalDatepicker,
  argTypes: generateArgType('bal-datepicker'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const Basic = (args, { argTypes }) => ({
  components: { BalDatepicker },
  props: Object.keys(argTypes),
  setup: () => ({ args }),
  template: `<bal-datepicker v-bind="args"></bal-datepicker>`,
})
