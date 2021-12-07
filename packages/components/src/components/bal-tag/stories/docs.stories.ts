import docs from './readme.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalTag } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalTag,
  argTypes: {
    ...withContent(),
  },
  docs,
})

export default component.story

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
Basic.parameters = { ...component.sourceCode(Basic) }

export const Closable = Template.bind({})
Closable.args = {
  content: 'Tag',
  color: 'primary',
  size: '',
  closable: true,
}
Closable.parameters = { ...component.sourceCode(Closable) }
