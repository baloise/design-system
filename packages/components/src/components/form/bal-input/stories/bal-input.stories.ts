import docs from './bal-input.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalInput,
  BalInputDate,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/generated/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Input',
  component: BalInput,
  subcomponents: { BalInputDate },
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
    loading: false,
    hasFieldMessage: true,
    label: 'Label',
    placeholder: 'Enter a text',
    disabled: false,
    readonly: false,
    type: 'text',
  },
  docs,
})

export default component.story

const excludedControls = [
  'numberInput',
  'multiple',
  'spellcheck',
  'autocorrect',
  'autocapitalize',
  'autofocus',
  'clickable',
  'inputmode',
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
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>{{ args.label }}</bal-field-label>
    <bal-field-control :loading="args.loading">
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

export const PostalCodeInput = Template.bind({})
PostalCodeInput.args = {
  value: '4000',
  label: 'PostalCode',
  maxLength: 4,
  allowedKeyPress: '[0-9]',
  pattern: '[0-9]{4}',
  hasFieldMessage: false,
}
PostalCodeInput.parameters = {
  ...component.sourceCode(PostalCodeInput),
  controls: {
    exclude: excludedControls,
  },
}

export const SimplePhoneNumberInput = Template.bind({})
SimplePhoneNumberInput.args = {
  value: '0041665554433',
  label: 'Simple phone number input',
  type: 'tel',
  allowedKeyPress: '[0-9]',
  hasFieldMessage: false,
}
SimplePhoneNumberInput.parameters = {
  ...component.sourceCode(SimplePhoneNumberInput),
  controls: {
    exclude: excludedControls,
  },
}

export const NativeInput = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <div class="field">
  <label class="label">Name</label>
  <div class="control">
      <input class="input" type="text" placeholder="Text input" />
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
      <input class="input is-disabled" disabled type="text" placeholder="Text input" />
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
      <input class="input is-success" type="text" placeholder="Text input" />
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
      <input class="input is-danger" type="text" placeholder="Text input" />
  </div>
  <p class="help is-danger">This username is available</p>
</div>
  `,
})
NativeInput.args = {}
NativeInput.parameters = {
  ...component.sourceCode(NativeInput),
  controls: {
    exclude: excludedControls,
  },
}

export const InputDate = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `<bal-field>
  <bal-field-label for="bday">Birthday</bal-field-label>
  <bal-field-control>
    <bal-input-date name="bday" autocomplete="bday"></bal-input-date>
  </bal-field-control>
</bal-field>`,
})
InputDate.args = {
  placeholder: 'dd.mm.yyyy',
  disabled: false,
  readonly: false,
  invalid: false,
}
InputDate.parameters = {
  ...component.sourceCode(InputDate),
  controls: {
    exclude: excludedControls,
  },
}
