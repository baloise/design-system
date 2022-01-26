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
  argTypes: {
    invalid: balFieldArgTypes.invalid,
    hasFieldMessage: {
      description: 'Show a hint or validation message below the control',
      table: {
        category: 'custom',
      },
    },
    region: {
      description: 'Region of the running app.',
      table: {
        category: 'global',
        defaultValue: { summary: 'CH' },
      },
      options: ['CH', 'BE', 'DE', 'LU'],
      control: {
        type: 'inline-radio',
      },
    },
    language: {
      description: 'Language of the running app.',
      table: {
        category: 'global',
        defaultValue: { summary: 'de' },
      },
      options: ['de', 'fr', 'en', 'it', 'nl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
  args: {
    region: 'CH',
    language: 'de',
    invalid: false,
    hasFieldMessage: true,
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
  'readonly',
  'required',
  'accept',
]

const Template = args => ({
  components: { ...component.components, BalField, BalFieldControl, BalFieldLabel, BalFieldMessage },
  setup: () => {
    const BDS = (window as any).BaloiseDesignSystem
    BDS.config.region = args.region
    BDS.config.language = args.language
    return {
      args: Object.keys(args)
        .filter(key => !['region', 'language'].includes(key))
        .reduce((obj, key) => {
          obj[key] = args[key]
          return obj
        }, {}),
    }
  },
  template: `
  <bal-field :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
    <bal-input v-bind="args" v-model="args.value"></bal-input>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
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

export const NumberInput = Template.bind({})
NumberInput.args = {
  placeholder: 'Enter a number',
  numberInput: true,
  invalid: false,
  suffix: 'CHF',
  decimal: '2',
}
NumberInput.parameters = {
  ...component.sourceCode(NumberInput),
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
