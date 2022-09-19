import docs from './bal-slider.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalSlider,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Slider',
  component: BalSlider,
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

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-slider v-bind="args" v-model="args.value"></bal-slider>`,
})
Basic.args = {
  value: '20',
  hasTicks: true,
  step: 20,
  min: 0,
  max: 100,
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: ['name', 'required'] },
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
      <bal-slider v-bind="args" v-model="args.value"></bal-slider>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})
FieldControl.args = {
  value: '20',
  hasTicks: true,
  step: 20,
  min: 0,
  max: 100,
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: ['name', 'readonly', 'required'] },
}
