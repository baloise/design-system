import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalButton } from '../../../../.storybook/vue/components'
import docs from './bal-button.docs.mdx'

const component = BalComponentStory({
  component: BalButton,
  argTypes: {
    ...withContent(),
  },
  docs,
  status: 'stable',
  args: {
    content: 'Primary',
    color: 'primary',
    icon: '',
    size: '',
    disabled: false,
    loading: false,
    inverted: false,
    expanded: false,
    square: false,
  },
})

export default component.story

const excludedControls = ['outlined', 'rel', 'topRounded', 'value', 'bottomRounded', 'download']

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">{{ args.content }}</bal-button>`,
})

export const Primary = Template.bind({})
Primary.args = {}
Primary.parameters = { ...component.sourceCode(Primary), controls: { exclude: excludedControls } }

export const Secondary = Template.bind({})
Secondary.args = {
  content: 'Secondary',
  color: 'info',
}
Secondary.parameters = { ...component.sourceCode(Secondary), controls: { exclude: excludedControls } }

export const Link = Template.bind({})
Link.args = {
  content: 'Link',
  color: 'link',
  icon: 'link',
}
Link.parameters = { ...component.sourceCode(Link), controls: { exclude: excludedControls } }

export const Text = Template.bind({})
Text.args = {
  content: 'Text',
  color: 'text',
  icon: 'plus',
}
Text.parameters = { ...component.sourceCode(Text), controls: { exclude: excludedControls } }

export const Square = Template.bind({})
Square.args = {
  content: '',
  color: 'info',
  icon: 'edit',
  square: true,
}
Square.parameters = { ...component.sourceCode(Square), controls: { exclude: excludedControls } }
