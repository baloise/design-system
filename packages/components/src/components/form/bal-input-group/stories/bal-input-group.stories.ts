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
    <bal-input placeholder="Enter text here" v-model="args.value" :disabled="args.disabled" :invalid="args.invalid"></bal-input>
    <bal-icon name="date" :class="args.disabled ? '' : is-clickable"></bal-icon>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-icon name="date" :class="args.disabled ? '' : is-clickable"></bal-icon>
    <bal-input placeholder="Enter text here" v-model="args.value" :disabled="args.disabled" :invalid="args.invalid"></bal-input>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-icon name="call"></bal-icon>
    <bal-select :disabled="args.disabled" :invalid="args.invalid" style="max-width: 106px" value="DE">
      <bal-select-option label="DE" value="DE">DE</bal-select-option>
      <bal-select-option label="FR" value="FR">FR</bal-select-option>
      <bal-select-option label="IT" value="IT">IT</bal-select-option>
    </bal-select>
    <bal-input placeholder="79 123 45 67" v-model="args.value" :disabled="args.disabled" :invalid="args.invalid"></bal-input>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-icon name="date" :class="args.disabled ? '' : is-clickable"></bal-icon>
    <bal-input placeholder="Enter text here" v-model="args.value" :disabled="args.disabled" :invalid="args.invalid"></bal-input>
    <bal-icon name="date" :class="args.disabled ? '' : is-clickable"></bal-icon>
  </bal-input-group>

  <bal-input-group v-bind="args" class="mb-4">
    <bal-tag closable>Tag</bal-tag>
    <bal-tag closable>Tag</bal-tag>
    <bal-tag closable>Tag</bal-tag>
    <bal-input placeholder="Enter text here" v-model="args.value" :disabled="args.disabled" :invalid="args.invalid"></bal-input>
    <bal-icon name="date" :class="args.disabled ? '' : is-clickable"></bal-icon>
  </bal-input-group>
  `,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
