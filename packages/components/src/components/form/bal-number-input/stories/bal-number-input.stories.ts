import docs from './bal-number-input.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalNumberInput,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'
import { configArgTypes, configDefaultArgs, reduceConfigArgs, setConfig } from '../../../../stories/utils/config'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Number Input',
  component: BalNumberInput,
  argTypes: {
    invalid: balFieldArgTypes.invalid,
    hasFieldMessage: {
      description: 'Show a hint or validation message below the control',
      table: {
        category: 'custom',
      },
    },
    ...configArgTypes,
  },
  args: {
    ...configDefaultArgs,
    invalid: false,
    hasFieldMessage: true,
  },
  docs,
})

export default component.story

const excludedControls = ['name']

export const Basic = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldControl,
    BalFieldLabel,
    BalFieldMessage,
  },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<bal-number-input v-bind="args" v-model="args.value"></bal-number-input>`,
})
Basic.args = {
  placeholder: 'Enter a number',
  inverted: false,
  disabled: false,
  invalid: false,
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
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
    <bal-number-input v-bind="args" v-model="args.value"></bal-number-input>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const FieldControl = Template.bind({})
FieldControl.args = {
  placeholder: 'Enter a number',
  inverted: false,
  disabled: false,
  invalid: false,
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: {
    exclude: excludedControls,
  },
}

export const Currency = Template.bind({})
Currency.args = {
  value: 1234.45,
  suffix: 'CHF',
  decimal: 2,
  inverted: false,
  disabled: false,
  invalid: false,
}
Currency.parameters = {
  ...component.sourceCode(Currency),
  controls: {
    exclude: excludedControls,
  },
}
