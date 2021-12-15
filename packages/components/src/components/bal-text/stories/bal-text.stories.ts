import docs from './bal-text.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalText } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalText,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-text v-bind="args">{{ args.content }}</bal-text>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  color: '',
  bold: false,
  small: false,
}
Basic.parameters = { ...component.sourceCode(Basic) }
