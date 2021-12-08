import docs from './readme.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import { BalRadio, BalRadioGroup, BalField, BalFieldControl, BalFieldLabel } from '../../../../../.storybook/vue/components'
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
    invalid: false,
    expanded: true,
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = ['name', 'expanded']

export const RadioGroup = args => ({
  components: { ...component.components, BalField, BalFieldControl, BalFieldLabel },
  setup: () => ({ args }),
  template: `
  <bal-field :expanded="args.expanded" :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="radio-example" value="1">Label 1</bal-radio>
      <bal-radio name="radio-example" value="2">Label 2</bal-radio>
      <bal-radio name="radio-example" value="3">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
RadioGroup.args = {
  value: '2',
}
RadioGroup.parameters = { ...component.sourceCode(RadioGroup), controls: { exclude: excludedControls } }

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
        <div @click="checkA()" :class="value === '1' ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
          <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
          <p class="has-text-blue mb-2">Selected Label</p>
          <bal-radio class="p-0" name="box-example" value="1" is-empty></bal-radio>
        </div>
      </div>
      <div class="column">
        <div @click="checkB()" :class="value === '2' ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
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
RadioBoxes.parameters = { ...component.sourceCode(RadioBoxes), controls: { exclude: excludedControls } }

export const RadioList = args => ({
  components: { ...component.components },
  setup: () => {
    const value = ref(args.value)
    const checkA = () => (value.value = '1')
    const checkB = () => (value.value = '2')

    return { args, value, checkA, checkB }
  },
  template: `
  <bal-radio-group v-bind="args" v-model="value">
    <div @click="checkA()" :class="value === '1' ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-3 mb-2 is-flex-direction-row is-justify-content-start is-align-items-center has-border-blue has-border-radius">
      <bal-radio name="list-example" value="1">
        <span class="pl-2"><b>Year 1</b> (CHF 66.00)</span>
      </bal-radio>
    </div>

    <div @click="checkB()" :class="value === '2' ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-3 mb-2 is-flex-direction-row is-justify-content-start is-align-items-center has-border-blue has-border-radius">
      <bal-radio name="list-example" class="mr-3" value="2">
        <div class="pl-2"><b>Year 2</b> (CHF 86.00)</div>
      </bal-radio>
    </div>
  </bal-radio-group>`,
})
RadioList.args = {
  value: '1',
}
RadioList.parameters = { ...component.sourceCode(RadioList), controls: { exclude: excludedControls } }

export const SelectButton = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `
  <bal-field :expanded="args.expanded" :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
  <bal-field-label>Label</bal-field-label>
  <bal-field-control>
    <bal-radio-group v-bind="args" v-model="args.value">
      <bal-radio name="radio-example" value="1">Label 1</bal-radio>
      <bal-radio name="radio-example" value="2">Label 2</bal-radio>
      <bal-radio name="radio-example" value="3">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
    </bal-radio-group>
  </bal-field-control>
  <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
</bal-field>`,
})
SelectButton.args = {
  value: '1',
  interface: 'select-button',
}
SelectButton.parameters = { ...component.sourceCode(SelectButton), controls: { exclude: excludedControls } }
