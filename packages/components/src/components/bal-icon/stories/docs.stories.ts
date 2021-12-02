import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../stories/utils'
import { BalIcon } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Icon',
  component: BalIcon,
  argTypes: {
    ...stencilArgType('bal-icon'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalIcon },
  setup: () => ({ args }),
  template: `<bal-icon v-bind="args"></bal-icon>`,
})

export const Basic = Template.bind({})
Basic.args = {
  name: 'info-circle',
  size: 'xlarge',
  color: 'primary',
}
