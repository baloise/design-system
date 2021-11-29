import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalSpinner } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Spinner',
  component: BalSpinner,
  argTypes: generateArgType('bal-spinner'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalSpinner },
  setup: () => ({ args }),
  template: `<bal-spinner v-bind="args"></bal-spinner>`,
})

export const Basic = Template.bind({})
Basic.args = {}
