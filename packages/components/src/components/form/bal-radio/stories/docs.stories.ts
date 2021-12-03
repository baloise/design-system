import docs from './readme.docs.mdx'
import { stencilArgType } from '../../../../stories/utils'
import { BalRadio, BalRadioGroup } from '../../../../../.storybook/vue/components'

export default {
  title: 'Components/Form/Radio',
  component: BalRadioGroup,
  subcomponent: { BalRadio },
  argTypes: {
    ...stencilArgType('bal-radio-group'),
  },
  parameters: {
    docs: {
      page: docs,
    },
  },
}

export const RadioGroup = args => ({
  components: { BalRadio, BalRadioGroup },
  setup: () => ({ args }),
  template: `<bal-radio-group v-bind="args">
  <bal-radio name="radio-example" value="1">Label 1</bal-radio>
  <bal-radio name="radio-example" value="2">Label 2</bal-radio>
  <bal-radio name="radio-example" value="3">Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it</bal-radio>
</bal-radio-group>`,
})
RadioGroup.args = {
  value: '2',
}

export const RadioBoxes = args => ({
  components: { BalRadio, BalRadioGroup },
  setup: () => ({ args }),
  template: `<bal-radio-group v-bind="args">
  <div class="columns" style="max-width: 400px">
    <div class="column">
      <div class="is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius has-background-blue-light">
        <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
        <p class="has-text-blue mb-2">Selected Label</p>
        <bal-radio class="p-0" name="box-example" value="1" is-empty></bal-radio>
      </div>
    </div>
    <div class="column">
      <div class="is-flex px-4 py-3 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
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

export const RadioList = args => ({
  components: { BalRadio, BalRadioGroup },
  setup: () => ({ args }),
  template: `<bal-radio-group v-bind="args">
  <div class="is-flex px-4 py-3 mb-2 is-flex-direction-row is-justify-content-start is-align-items-center has-border-blue has-border-radius has-background-blue-light">
    <bal-radio name="list-example" value="1">
      <span class="pl-2"><b>Year 1</b> (CHF 66.00)</span>
    </bal-radio>
  </div>

  <div class="is-flex px-4 py-3 mb-2 is-flex-direction-row is-justify-content-start is-align-items-center has-border-blue has-border-radius">
    <bal-radio name="list-example" class="mr-3" value="2">
      <div class="pl-2"><b>Year 2</b> (CHF 86.00)</div>
    </bal-radio>
  </div>
</bal-radio-group>`,
})
RadioList.args = {
  value: '1',
}

export const SelectButton = args => ({
  components: { BalRadio, BalRadioGroup },
  setup: () => ({ args }),
  template: `<bal-radio-group v-bind="args">
  <bal-radio name="select-button-example" value="1">Label 1</bal-radio>
  <bal-radio name="select-button-example" value="2">Label 2</bal-radio>
  <bal-radio name="select-button-example" value="3" disabled>Label Disabled</bal-radio>
</bal-radio-group>`,
})
SelectButton.args = {
  value: '1',
  interface: 'select-button',
}
