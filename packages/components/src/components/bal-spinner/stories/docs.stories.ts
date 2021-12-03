import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalSpinner } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Spinner',
  component: BalSpinner,
  argTypes: {
    ...stencilArgType('bal-spinner'),
  },
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
