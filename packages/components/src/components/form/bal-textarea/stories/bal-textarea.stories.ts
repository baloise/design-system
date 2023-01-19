import docs from './bal-textarea.docs.mdx'
import { BalComponentStory, stencilArgType } from '../../../../stories/utils'
import {
  BalTextarea,
  BalField,
  BalFieldControl,
  BalFieldLabel,
  BalFieldMessage,
} from '../../../../../.storybook/vue/generated/components'

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
    hasFieldMessage: true,
  },
})

export default component.story

const excludedControls = [
  'autocapitalize',
  'autofocus',
  'clickable',
  'inputmode',
  'maxLength',
  'minLength',
  'name',
  'required',
]

export const Basic = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-textarea v-bind="args" v-model="args.value"></bal-textarea>`,
})

Basic.args = {
  placeholder: 'Enter a comment',
  disabled: false,
  readonly: false,
  inverted: false,
  value: '',
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
  setup: () => ({ args }),
  template: `
  <bal-field :disabled="args.disabled" :readonly="args.readonly" :inverted="args.inverted" :invalid="args.invalid">
    <bal-field-label>Label</bal-field-label>
    <bal-field-control>
      <bal-textarea v-bind="args" v-model="args.value"></bal-textarea>
    </bal-field-control>
    <bal-field-message :color="args.invalid ? 'danger' : 'hint'" v-if="args.hasFieldMessage">Field Message</bal-field-message>
  </bal-field>`,
})

export const FieldControl = Template.bind({})
FieldControl.args = {
  placeholder: 'Enter a comment',
  disabled: false,
  readonly: false,
  inverted: false,
  value: '',
}
FieldControl.parameters = {
  ...component.sourceCode(FieldControl),
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

export const NativeTextarea = args => ({
  components: {},
  setup: () => ({ args }),
  template: `
  <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <textarea class="textarea" placeholder="Text input"></textarea>
  </div>
  <p class="help">This username is available</p>
</div>
<div class="field">
  <label class="label is-disabled">Name</label>
  <div class="control">
      <textarea class="textarea is-disabled" disabled type="text" placeholder="Text input" />
  </div>
  <p class="help is-disabled">This username is available</p>
</div>
<div class="field">
  <label class="label is-success">Name</label>
  <div class="control">
      <textarea class="textarea is-success" type="text" placeholder="Text input" />
  </div>
  <p class="help is-success">This username is available</p>
</div>
<div class="field">
  <label class="label is-danger">Name</label>
  <div class="control">
      <textarea class="textarea is-danger" type="text" placeholder="Text input" />
  </div>
  <p class="help is-danger">This username is available</p>
</div>
  `,
})
NativeTextarea.args = {}
NativeTextarea.parameters = {
  ...component.sourceCode(NativeTextarea),
  controls: {
    exclude: excludedControls,
  },
}
