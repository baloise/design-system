import docs from './bal-label.docs.mdx'
import { BalComponentStory, sourceCode, withContent } from '../../../../stories/utils'
import { BalLabel } from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Typography/Label',
  component: BalLabel,
  // subcomponents: { BalRadio },
  docs,
  argTypes: {
    ...withContent(),
  },
  args: {},
})

export default component.story

const excludedControls = []

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-label v-bind="args">{{ args.content }}</bal-label>`,
})

export const Basic = Template.bind({})
Basic.args = {
  content: 'Label',
  required: undefined,
  invalid: false,
  disabled: false,
  size: '',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const RequiredAndOptional = Template.bind({})
RequiredAndOptional.args = {
  content: 'Label',
  required: false,
  invalid: false,
  disabled: false,
  size: '',
}
RequiredAndOptional.parameters = {
  ...component.sourceCode(RequiredAndOptional),
  controls: { exclude: excludedControls },
}

export const States = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
  <div>
    <bal-label invalid>Invalid Label</bal-label>
  </div>
  <div>
    <bal-label disabled>Disabled Label</bal-label>
  </div>
</div>`,
})
States.args = {}
States.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-label invalid>Invalid Label</bal-label>
      <bal-label disabled>Disabled Label</bal-label>`,
      components: [],
    }),
    States.args,
    {},
  ),
  controls: { exclude: excludedControls },
}

export const Sizes = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<div>
    <div>
      <bal-label size="small">Small Label</bal-label>
    </div>
    <div>
      <bal-label>Normal Label</bal-label>
    </div>
    <div>
      <bal-label size="large">Large Label</bal-label>
    </div>
  </div>`,
})
Sizes.args = {}
Sizes.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-label size="small">Small Label</bal-label>
      <bal-label>Normal Label</bal-label>
      <bal-label size="large">Large Label</bal-label>`,
      components: [],
    }),
    Sizes.args,
    {},
  ),
  controls: { exclude: excludedControls },
}

export const FieldLabel = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-field v-bind="args">
    <bal-field-label required>Field Label</bal-field-label>
    <bal-field-control>
      <bal-input name="my-input" placeholder="Placeholder"></bal-input>
    </bal-field-control>
    <bal-field-message>Field Message</bal-field-message>
  </bal-field>`,
})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic) }
