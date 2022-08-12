import docs from './bal-tag.docs.mdx'
import { BalComponentStory, withContent } from '../../../stories/utils'
import { BalTag } from '../../../../.storybook/vue/components'

const component = BalComponentStory({
  component: BalTag,
  argTypes: {
    ...withContent(),
  },
  docs,
  status: 'stable',
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

export const TagGroup = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-tag-group>
  <bal-tag>Primary</bal-tag>
  <bal-tag color="success">Success</bal-tag>
  <bal-tag color="danger">Danger</bal-tag>
</bal-tag-group>`,
})
TagGroup.args = {}
TagGroup.parameters = { ...component.sourceCode(TagGroup) }

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

export const TagCardCentered = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-card class="mt-4">
  <bal-tag v-bind="args" position="center">{{ args.content }}</bal-tag>
  <bal-card-title>Title</bal-card-title>
  <bal-card-content>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </bal-card-content>
</bal-card>`,
})
TagCardCentered.args = {
  content: 'Bestseller',
  color: 'success',
  light: true,
  size: 'small',
  closable: false,
}
TagCardCentered.parameters = { ...component.sourceCode(TagCardCentered) }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-tag color="" class="mr-1">Default</bal-tag>
  <bal-tag color="primary" class="mr-1">Primary</bal-tag>
  <bal-tag color="info" class="mr-1">Info</bal-tag>
  <bal-tag color="success" class="mr-1">Success</bal-tag>
  <bal-tag color="warning" class="mr-1">Warning</bal-tag>
  <bal-tag color="danger">Danger</bal-tag>
  <br>
  <br>
  <bal-tag color="purple" class="mr-1">Purple</bal-tag>
  <bal-tag color="red" class="mr-1">Red</bal-tag>
  <bal-tag color="yellow" class="mr-1">Yellow</bal-tag>
  <bal-tag color="green" class="mr-1">Green</bal-tag>`,
})
Colors.args = {
  content: 'Bestseller',
  color: 'success',
  light: true,
  size: 'small',
  closable: false,
}
Colors.parameters = { ...component.sourceCode(Colors) }
