import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalIcon } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Icon',
  component: BalIcon,
  argTypes: generateArgType('bal-icon'),
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
