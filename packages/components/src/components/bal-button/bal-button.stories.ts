import { generateArgType } from '../../stories/helpers/args'
import { BalButton } from '../../../.storybook/vue/components'
import docs from './bal-button.docs.mdx'

export default {
  title: '01-Atoms/Button',
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
  template: `<bal-button v-bind="args">{{ args.innerHTML }}</bal-button>`,
})

export const Primary = Template.bind({})
Primary.args = {
  innerHTML: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  innerHTML: 'Secondary',
  color: 'link',
}

export const Link = Template.bind({})
Link.args = {
  innerHTML: 'Link',
  color: 'link',
}

export const Square = Template.bind({})
Square.args = {
  innerHTML: '',
  color: 'info',
  icon: 'edit',
  square: true,
  outlined: true,
}
