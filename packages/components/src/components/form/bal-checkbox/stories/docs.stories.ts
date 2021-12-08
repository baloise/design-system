import docs from './readme.docs.mdx'
import { BalComponentStory, withContent, stencilArgType } from '../../../../stories/utils'
import { BalCheckbox, BalField, BalFieldControl, BalFieldLabel } from '../../../../../.storybook/vue/components'
import { ref } from 'vue'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Checkbox',
  component: BalCheckbox,
  docs,
  argTypes: {
    ...withContent(),
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

const excludedControls = ['name']

const Template = args => ({
  components: { ...component.components, BalField, BalFieldControl, BalFieldLabel },
  setup: () => ({ args }),
  template: `
  <bal-field :expanded="args.expanded" :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-checkbox v-bind="args" v-model="args.value">
        {{ args.content }}
      </bal-checkbox>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Label',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const Switch = Template.bind({})
Switch.args = {
  content: 'Label',
  interface: 'switch',
}
Switch.parameters = {
  ...component.sourceCode(Switch),
  controls: { exclude: excludedControls },
}

export const Box = args => ({
  components: { ...component.components },
  setup: () => {
    const selectedA = ref(true)
    const selectedB = ref(false)

    const checkA = () => {
      selectedA.value = !selectedA.value
    }

    const checkB = () => {
      selectedB.value = !selectedB.value
    }

    return {
      args,
      selectedA,
      selectedB,
      checkA,
      checkB,
    }
  },
  template: `
  <div class="columns" style="max-width: 400px">
    <div class="column">
      <div @click="checkA()" :class="selectedA ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
        <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
        <p class="has-text-blue is-bold mb-0">Title</p>
        <p class="has-text-blue mb-3">Subtitle</p>
        <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
        <bal-checkbox class="mb-3" v-bind="args" v-model="selectedA">Add</bal-checkbox>
      </div>
    </div>
    <div class="column">
      <div @click="checkB()" :class="selectedB ? 'has-background-blue-light':''" class="clickable is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
        <img src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
        <p class="has-text-blue is-bold mb-0">Title</p>
        <p class="has-text-blue mb-3">Subtitle</p>
        <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
        <bal-checkbox class="mb-3" v-bind="args" v-model="selectedB">Add</bal-checkbox>
      </div>
    </div>
  </div>`,
})
Box.args = {}
Box.parameters = {
  ...component.sourceCode(Box),
  controls: { exclude: [...excludedControls, 'expanded', 'interface', 'invalid', 'checked', 'hasFieldMessage', 'inverted', 'value', 'content'] },
}
