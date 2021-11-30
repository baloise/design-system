import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalHeading } from '../../../../.storybook/vue/components'

export default {
  title: 'Components/Heading',
  component: BalHeading,
  argTypes: withContent(generateArgType('bal-heading')),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalHeading },
  setup: () => ({ args }),
  template: `<bal-heading v-bind="args">{{ args.content }}</bal-heading>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Heading',
}

export const Subtitle = Template.bind({})
Subtitle.args = {
  content: 'Subtitle',
  level: 'h3',
  subtitle: true,
  space: 'none',
}
