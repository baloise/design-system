import docs from './bal-tag.docs.mdx'
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
  components: { ...component.components },
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

export const TagCard = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-card class="mt-4">
  <bal-tag v-bind="args">{{ args.content }}</bal-tag>
  <bal-card-title>Title</bal-card-title>
  <bal-card-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>
</bal-card>`,
})
TagCard.args = {
  content: 'Bestseller',
  color: 'success',
  light: true,
  size: 'small',
  closable: false,
}
TagCard.parameters = { ...component.sourceCode(TagCard) }
