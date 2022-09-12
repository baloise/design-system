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
  color: 'red',
}
TagCard.parameters = { ...component.sourceCode(TagCard) }

export const TagCardCentered = args => ({
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
TagCardCentered.args = {
  content: 'Bestseller',
  color: 'red',
  size: 'large',
  position: 'center',
}
TagCardCentered.parameters = { ...component.sourceCode(TagCardCentered) }

export const Colors = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-tag color="" :closable="args.closable" :size="args.size" class="mr-1">Default</bal-tag>
  <bal-tag color="primary" :closable="args.closable" :size="args.size" class="mr-1">Primary</bal-tag>
  <bal-tag color="info" :closable="args.closable" :size="args.size" class="mr-1">Info</bal-tag>
  <bal-tag color="success" :closable="args.closable" :size="args.size" class="mr-1">Success</bal-tag>
  <bal-tag color="warning" :closable="args.closable" :size="args.size" class="mr-1">Warning</bal-tag>
  <bal-tag color="danger" :closable="args.closable" :size="args.size">Danger</bal-tag>
  <br>
  <br>
  <bal-tag color="purple" :closable="args.closable" :size="args.size" class="mr-1">Purple</bal-tag>
  <bal-tag color="red" :closable="args.closable" :size="args.size" class="mr-1">Red</bal-tag>
  <bal-tag color="yellow" :closable="args.closable" :size="args.size" class="mr-1">Yellow</bal-tag>
  <bal-tag color="green" :closable="args.closable" :size="args.size" class="mr-1">Green</bal-tag>
  <br>
  <br>
  <bal-tag color="purple" :closable="args.closable" :size="args.size" light class="mr-1">Purple</bal-tag>
  <bal-tag color="red" :closable="args.closable" :size="args.size" light class="mr-1">Red</bal-tag>
  <bal-tag color="yellow" :closable="args.closable" :size="args.size" light class="mr-1">Yellow</bal-tag>
  <bal-tag color="green" :closable="args.closable" :size="args.size" light class="mr-1">Green</bal-tag>
  <br>
  <br>
  <bal-tag invalid :closable="args.closable" :size="args.size" class="mr-1">Invalid</bal-tag>
  <bal-tag disabled :closable="args.closable" :size="args.size" class="mr-1">Disabled</bal-tag>`,
})
Colors.args = {
  closable: false,
}
Colors.parameters = { ...component.sourceCode(Colors) }
