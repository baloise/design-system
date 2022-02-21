import docs from './bal-input-group.docs.mdx'
import { BalComponentStory } from '../../../../stories/utils'
import { BalInputGroup, BalInput, BalIcon, BalTag } from '../../../../../.storybook/vue/components'

const component = BalComponentStory({
  title: 'Components/Form/Input Group',
  component: BalInputGroup,
  docs,
  args: {
    value: '',
  },
})

export default component.story

export const Basic = args => ({
  components: { ...component.components, BalInput, BalIcon, BalTag },
  setup: () => ({ args }),
  template: `
  <bal-input-group v-bind="args" class="mb-4">
    <bal-input placeholder="Enter text here" v-model="args.value"></bal-input>
    <bal-icon name="date" class="is-clickable"></bal-icon>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-icon name="date" class="is-clickable"></bal-icon>
    <bal-input placeholder="Enter text here" v-model="args.value"></bal-input>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-icon name="date" class="is-clickable"></bal-icon>
    <bal-input placeholder="Enter text here" v-model="args.value"></bal-input>
    <bal-icon name="date" class="is-clickable"></bal-icon>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-tag closable>Tag</bal-tag>
    <bal-tag closable>Tag</bal-tag>
    <bal-tag closable>Tag</bal-tag>
    <bal-input placeholder="Enter text here" v-model="args.value"></bal-input>
    <bal-icon name="date" class="is-clickable"></bal-icon>
  </bal-input-group>
  `,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
