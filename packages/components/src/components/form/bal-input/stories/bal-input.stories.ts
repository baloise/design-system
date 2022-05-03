import docs from './bal-input.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalInput,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Input',
  component: BalInput,
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
    hasFieldMessage: true,
    placeholder: 'Enter a text',
    disabled: false,
    readonly: false,
    invalid: false,
    type: 'text',
  },
  docs,
})

export default component.story

const excludedControls = [
  'autocomplete',
  'autoComplete',
  'multiple',
  'spellcheck',
  'autocorrect',
  'autocapitalize',
  'autofocus',
  'clickable',
  'inputmode',
  'maxLength',
  'minLength',
  'min',
  'max',
  'name',
  'required',
  'accept',
]

export const Basic = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `<bal-input v-bind="args" v-model="args.value"></bal-input>`,
})
Basic.args = {
  placeholder: 'Enter a text',
  disabled: false,
  readonly: false,
  invalid: false,
  type: 'text',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: {
    exclude: excludedControls,
  },
}

const Template = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
    <bal-input v-bind="args" v-model="args.value"></bal-input>
    </bal-field-control>
    <bal-field-message :invalid="args.invalid" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const TextInput = Template.bind({})
TextInput.args = {
  placeholder: 'Enter a text',
  inverted: false,
  disabled: false,
  invalid: false,
  type: 'text',
}
TextInput.parameters = {
  ...component.sourceCode(TextInput),
  controls: {
    exclude: excludedControls,
  },
}

export const InvalidInput = Template.bind({})
InvalidInput.args = {
  value: 'Value',
  invalid: true,
  hasFieldMessage: true,
}
InvalidInput.parameters = {
  ...component.sourceCode(InvalidInput),
  controls: {
    exclude: excludedControls,
  },
}

export const ContractNumberInput = Template.bind({})
ContractNumberInput.args = {
  mask: 'contract-number',
  placeholder: 'Enter only numbers which will be formatted',
}
ContractNumberInput.parameters = {
  ...component.sourceCode(ContractNumberInput),
  controls: {
    exclude: excludedControls,
  },
}

export const ClaimNumberInput = Template.bind({})
ClaimNumberInput.args = {
  mask: 'claim-number',
  placeholder: 'Enter only numbers which will be formatted',
}
ClaimNumberInput.parameters = {
  ...component.sourceCode(ClaimNumberInput),
  controls: {
    exclude: excludedControls,
  },
}

export const OfferNumberInput = Template.bind({})
OfferNumberInput.args = {
  mask: 'offer-number',
  placeholder: 'Enter only numbers which will be formatted',
}
OfferNumberInput.parameters = {
  ...component.sourceCode(OfferNumberInput),
  controls: {
    exclude: excludedControls,
  },
}
