import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalText } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Text',
  component: BalText,
  argTypes: withContent(generateArgType('bal-text')),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalText },
  setup: () => ({ args }),
  template: `<bal-text v-bind="args">{{ args.content }}</bal-text>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  color: 'info',
  bold: false,
  small: false,
}
