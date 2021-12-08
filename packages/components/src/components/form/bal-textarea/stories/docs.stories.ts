import docs from './readme.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import { BalTextarea, BalField, BalFieldControl, BalFieldLabel } from '../../../../../.storybook/vue/components'

const balFieldArgTypes = stencilArgType(BalField)

const component = BalComponentStory({
  title: 'Components/Form/Textarea',
  component: BalTextarea,
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

const excludedControls = ['autocapitalize', 'autofocus', 'clickable', 'inputmode', 'maxLength', 'minLength', 'name', 'readonly', 'required']

const Template = args => ({
  components: { ...component.components, BalField, BalFieldControl, BalFieldLabel },
  setup: () => ({ args }),
  template: `
  <bal-field :expanded="args.expanded" :disabled="args.disabled" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-textarea v-bind="args" v-model="args.value"></bal-textarea>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const Basic = Template.bind({})
Basic.args = {
  placeholder: 'Enter a comment',
  disabled: false,
  inverted: false,
  value: '',
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: excludedControls },
}

export const InvalidTextarea = Template.bind({})
InvalidTextarea.args = {
  value: 'Value',
  invalid: true,
  hasFieldMessage: true,
}
InvalidTextarea.parameters = {
  ...component.sourceCode(InvalidTextarea),
  controls: {
    exclude: excludedControls,
  },
}
