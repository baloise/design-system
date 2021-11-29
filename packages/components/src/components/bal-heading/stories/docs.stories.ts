import docs from './readme.docs.mdx'
import { generateArgType } from '../../../stories/helpers/args'
import { BalHeading } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Heading',
  component: BalHeading,
  argTypes: generateArgType('bal-heading'),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalHeading },
  setup: () => ({ args }),
  template: `<bal-heading v-bind="args">{{ args.innerHTML }}</bal-heading>`,
})

export const Basic = Template.bind({})
Basic.args = {
  innerHTML: 'Heading',
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  innerHTML: 'Subtitle',
  level: 'h3',
  subtitle: true,
  space: 'none',
}
