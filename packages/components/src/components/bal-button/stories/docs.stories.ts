import { stencilArgType, withContent } from '../../../stories/utils'
import { BalButton } from '../../../../.storybook/vue/components'
import docs from './readme.docs.mdx'

export default {
  title: 'Components/Button',
  component: BalButton,
  argTypes: {
    ...stencilArgType('bal-button'),
    ...withContent(),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalButton },
  setup: () => ({ args }),
  template: `<bal-button v-bind="args">{{ args.content }}</bal-button>`,
})

export const Primary = Template.bind({})
Primary.args = {
  content: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  content: 'Secondary',
  color: 'link',
}

export const Link = Template.bind({})
Link.args = {
  content: 'Link',
  color: 'link',
}

export const Square = Template.bind({})
Square.args = {
  content: '',
  color: 'info',
  icon: 'edit',
  square: true,
  outlined: true,
}
