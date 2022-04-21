import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalSelect,
  BalSelectOption,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'
import { marvelHeros } from './bal-select.templates.ts'
import docs from './bal-select.docs.mdx'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Select',
  component: BalSelect,
  subcomponents: { BalSelectOption },
  docs,
  status: 'stable',
  argTypes: {
    invalid: balFieldArgTypes.invalid,
    hasFieldMessage: {
      description: 'Show a hint or validation message below the control',
      table: {
        category: 'custom',
      },
    },
  },
  args: {
    invalid: false,
    disabled: false,
    typeahead: false,
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = ['loading', 'multiple', 'name', 'hasMovement', 'noBorder', 'inverted']

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args" v-model="args.value">
    <bal-select-option value="v1995" label="1995">1995</bal-select-option>
    <bal-select-option value="v1996" label="1996">1996</bal-select-option>
    <bal-select-option value="v1997" label="1997">1997</bal-select-option>
    <bal-select-option value="v1998" label="1998">1998</bal-select-option>
    <bal-select-option value="v1999" label="1999">1999</bal-select-option>
    <bal-select-option value="v2000" label="2000">2000</bal-select-option>
  </bal-select>`,
})
Basic.args = {
  value: ['v2000'],
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const FieldControl = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-select v-bind="args" v-model="args.value">
        <bal-select-option value="v1995" label="1995">1995</bal-select-option>
        <bal-select-option value="v1996" label="1996">1996</bal-select-option>
        <bal-select-option value="v1997" label="1997">1997</bal-select-option>
        <bal-select-option value="v1998" label="1998">1998</bal-select-option>
        <bal-select-option value="v1999" label="1999">1999</bal-select-option>
        <bal-select-option value="v2000" label="2000">2000</bal-select-option>
      </bal-select>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})
FieldControl.args = {
  value: ['v2000'],
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: excludedControls },
}

export const Typeahead = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args" v-model="args.value">
  ${marvelHeros}
</bal-select>`,
})
Typeahead.args = {
  typeahead: true,
  placeholder: 'Try finding your hero',
  noDataLabel: 'No option available',
}
Typeahead.parameters = {
  ...component.sourceCode(Typeahead),
  controls: { exclude: excludedControls },
}

export const MultiSelect = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-select v-bind="args" v-model="args.value">
  ${marvelHeros}
</bal-select>`,
})
MultiSelect.args = {
  multiple: true,
  placeholder: 'Try finding your hero',
  value: ['SpiderMan', 'IronMan'],
}
MultiSelect.parameters = {
  ...component.sourceCode(MultiSelect),
  controls: { exclude: excludedControls },
}
