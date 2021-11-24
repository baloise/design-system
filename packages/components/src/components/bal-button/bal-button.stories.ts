import { generateArgType } from '../../stories/helpers/args'
import { BalButton } from '../../../.storybook/vue/components'
import docs from './bal-button.docs.mdx'

export default {
  title: '01-Atoms/BalButton',
  component: BalButton,
  argTypes: generateArgType('bal-button'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalButton },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">{{ args.inner }}</bal-button>`,
})

export const Primary = Template.bind({})
Primary.args = {
  inner: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  inner: 'Secondary',
  color: 'link',
}
