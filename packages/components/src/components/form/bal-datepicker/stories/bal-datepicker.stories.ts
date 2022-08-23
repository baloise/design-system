import docs from './bal-datepicker.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalDatepicker,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'
import { configArgTypes, configDefaultArgs, reduceConfigArgs, setConfig } from '../../../../stories/utils/config'

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
    ...configArgTypes,
  },
  args: {
    ...configDefaultArgs,
    invalid: false,
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = ['allowedDates', 'name']

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    setConfig(args)
    return {
      args: reduceConfigArgs(args),
    }
  },
  template: `<div class="container"><bal-datepicker v-bind="args" v-model="args.value"></bal-datepicker></div>`,
})
Basic.args = {
  placeholder: 'Pick a date',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
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
    <bal-datepicker v-bind="args" v-model="args.value"></bal-datepicker>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})

export const FieldControl = Template.bind({})
FieldControl.args = {
  placeholder: 'Pick a date',
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: excludedControls },
}

export const ManualInput = Template.bind({})
ManualInput.args = {
  placeholder: 'Type a date',
  triggerIcon: true,
}
ManualInput.parameters = {
  ...component.sourceCode(ManualInput),
  controls: { exclude: excludedControls },
}

export const Min = Template.bind({})
Min.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-02-07',
  min: '2022-02-06',
}
Min.parameters = {
  ...component.sourceCode(Min),
  controls: { exclude: excludedControls },
}

export const Max = Template.bind({})
Max.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-02-11',
  max: '2022-02-12',
}
Max.parameters = {
  ...component.sourceCode(Max),
  controls: { exclude: excludedControls },
}

export const MinAndMax = Template.bind({})
MinAndMax.args = {
  placeholder: 'Type a date',
  defaultDate: '2022-02-07',
  min: '2022-02-06',
  max: '2022-03-12',
}
MinAndMax.parameters = {
  ...component.sourceCode(MinAndMax),
  controls: { exclude: excludedControls },
}
