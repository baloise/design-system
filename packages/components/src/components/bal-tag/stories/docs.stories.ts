import docs from './readme.docs.mdx'
import { generateArgType, withContent } from '../../../stories/helpers/args'
import { BalTag } from '../../../../.storybook/vue/components'

export default {
  title: '01-Components/Tag',
  component: BalTag,
  argTypes: withContent(generateArgType('bal-tag')),
  parameters: {
    docs: {
      page: docs,
    },
  },
}

const Template = args => ({
  components: { BalTag },
  setup: () => ({ args }),
  template: `<bal-tag v-bind="args">{{ args.content }}</bal-tag>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Tag',
  color: 'primary',
  size: '',
  closable: false,
}
