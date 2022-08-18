import docs from './bal-radio.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalRadio,
  BalRadioGroup,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/components'
import { ref } from 'vue'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Radio',
  component: BalRadioGroup,
  subcomponents: { BalRadio },
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
    readonly: false,
    invalid: false,
    vertical: false,
    hasFieldMessage: true,
  },
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
  setup: () => ({ args }),
  template: `
  <bal-radio-group v-bind="args" v-model="args.value">
    <bal-radio name="radio-example" value="1" :invalid="args.invalid">Label 1</bal-radio>
    <bal-radio name="radio-example" value="2" :invalid="args.invalid">Label 2</bal-radio>
    <bal-radio name="radio-example" value="3" disabled>Disabled</bal-radio>
    <bal-radio name="radio-example" value="4" :invalid="args.invalid">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
  </bal-radio-group>`,
})
Basic.args = {
  value: '1',
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
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="radio-example" value="1">Label 1</bal-radio>
      <bal-radio name="radio-example" value="2">Label 2</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
FieldControl.args = {
  value: '2',
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
  controls: { exclude: excludedControls },
}

export const Vertical = FieldControl.bind({})
Vertical.args = {
  content: 'Label',
  vertical: true,
}
Vertical.parameters = {
  ...component.sourceCode(Vertical),
  controls: { exclude: excludedControls },
}

export const RadioBoxes = args => ({
  components: { ...component.components },
  setup: () => {
    const value = ref(args.value)
    const checkA = () => (value.value = '1')
    const checkB = () => (value.value = '2')

    return { args, value, checkA, checkB }
  },
  template: `
  <bal-radio-group v-bind="args" v-model="value">
    <div class="columns" style="max-width: 400px">
      <div class="column">
        <div @click="checkA()" :class="value === '1' ? 'has-background-light-blue':''" class="clickable is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-primary has-radius">
          <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
          <p class="has-text-blue mb-2">Selected Label</p>
          <bal-radio class="p-0" name="box-example" value="1" is-empty></bal-radio>
        </div>
      </div>
      <div class="column">
        <div @click="checkB()" :class="value === '2' ? 'has-background-light-blue':''" class="clickable is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-primary has-radius">
          <img src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
          <p class="has-text-blue mb-2">Other Label</p>
          <bal-radio class="p-0" name="box-example" value="2" is-empty></bal-radio>
        </div>
      </div>
    </div>
  </bal-radio-group>`,
})
RadioBoxes.args = {
  value: '1',
}
RadioBoxes.parameters = {
  ...component.sourceCode(RadioBoxes),
  controls: { exclude: excludedControls },
}

export const SelectButton = args => ({
  components: {
    ...component.components,
    BalField,
    BalFieldLabel,
    BalFieldControl,
    BalFieldMessage,
  },
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="select-button-example" value="yes">Yes</bal-radio>
      <bal-radio name="select-button-example" value="no">No</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
SelectButton.args = {
  interface: 'select-button',
  value: 'yes',
}
SelectButton.parameters = {
  ...component.sourceCode(SelectButton),
  controls: { exclude: excludedControls },
}
