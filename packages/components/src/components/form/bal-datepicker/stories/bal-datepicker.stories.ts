import docs from './bal-datepicker.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalDatepicker,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Datepicker',
  component: BalDatepicker,
  docs,
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
  },
})

export default component.story

const excludedControls = ['allowedDates', 'readonly', 'name', 'required']

const Template = args => ({
  components: { ...component.components, BalField, BalFieldControl, BalFieldLabel, BalFieldMessage },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-datepicker v-bind="args" v-model="args.value"></bal-datepicker>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Pick a date',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const ManualInput = Template.bind({})
ManualInput.args = {
  placeholder: 'Type a date',
  triggerIcon: true,
}
ManualInput.parameters = { ...component.sourceCode(ManualInput), controls: { exclude: excludedControls } }

export const MinAndMax = Template.bind({})
MinAndMax.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-01-06',
  min: '2022-01-06',
  max: '2022-01-12',
}
MinAndMax.parameters = { ...component.sourceCode(MinAndMax), controls: { exclude: excludedControls } }
