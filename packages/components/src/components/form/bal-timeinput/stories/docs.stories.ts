import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../../stories/utils'
import { BalTimeinput } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Timeinput',
  component: BalTimeinput,
  argTypes: {
    ...stencilArgType('bal-timeinput'),
  },
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
