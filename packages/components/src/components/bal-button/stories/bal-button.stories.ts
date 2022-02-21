import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalButton } from '../../../../.storybook/vue/components'
import docs from './bal-button.docs.mdx'

const component = BalComponentStory({
  component: BalButton,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">{{ args.content }}</bal-button>`,
})

export const Primary = Template.bind({})
Primary.args = {
  content: 'Primary',
}
Primary.parameters = { ...component.sourceCode(Primary) }

export const Secondary = Template.bind({})
Secondary.args = {
  content: 'Secondary',
  color: 'info',
}
Secondary.parameters = { ...component.sourceCode(Secondary) }

export const Tertiary = Template.bind({})
Tertiary.args = {
  content: 'Tertiary',
  color: 'info',
  outlined: true,
}
Tertiary.parameters = { ...component.sourceCode(Tertiary) }

export const Link = Template.bind({})
Link.args = {
  content: 'Link',
  color: 'link',
}
Link.parameters = { ...component.sourceCode(Link) }

export const Square = Template.bind({})
Square.args = {
  content: '',
  color: 'info',
  icon: 'edit',
  square: true,
  outlined: true,
}
Square.parameters = { ...component.sourceCode(Square) }

export const ButtonGroup = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-button-group>
  <bal-button>First</bal-button>
  <bal-button color="info">Second</bal-button>
</bal-button-group>
  `,
})
