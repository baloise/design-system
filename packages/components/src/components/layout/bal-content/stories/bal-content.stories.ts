import docs from './bal-content.docs.mdx'
import { BalComponentStory, sourceCode } from '../../../../stories/utils'
import { BalContent, BalLabel, BalText } from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Layout/Content',
  component: BalContent,
  subcomponents: { BalLabel, BalText },
  docs,
  argTypes: {},
  args: {},
})

export default component.story

const excludedControls = []

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-content v-bind="args">
  <bal-label>The Content Component</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>`,
})

export const Basic = Template.bind({})
Basic.args = {
  layout: '',
  align: '',
  space: '',
}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const Alignment = Template.bind({})
Alignment.args = {
  layout: '',
  align: 'center',
  space: '',
}
Alignment.parameters = { ...component.sourceCode(Alignment), controls: { exclude: excludedControls } }

export const Layout = Template.bind({})
Layout.args = {
  layout: 'horizontal',
  align: '',
  space: 'normal',
}
Layout.parameters = { ...component.sourceCode(Layout), controls: { exclude: excludedControls } }

export const Space = args => ({
  components: {
    ...component.components,
  },
  setup: () => ({ args }),
  template: `<div>
  <bal-content class="has-background-red-2">
    <bal-label class="has-background-green-2">Default Space</bal-label>
    <bal-text class="has-background-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="x-small" class="has-background-red-2 mt-medium">
    <bal-label class="has-background-green-2">X Small Space</bal-label>
    <bal-text class="has-background-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="small" class="has-background-red-2 mt-medium">
    <bal-label class="has-background-green-2">Small Space</bal-label>
    <bal-text class="has-background-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
  <bal-content space="normal" class="has-background-red-2 mt-medium">
    <bal-label class="has-background-green-2">Normal Space</bal-label>
    <bal-text class="has-background-green-2">Content helps to align text nodes inside a section.</bal-text>
  </bal-content>
</div>`,
})
Space.args = {}
Space.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-content>
  <bal-label>Default Space</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>
<bal-content space="x-small">
  <bal-label>X Small Space</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>
<bal-content space="small">
  <bal-label>Small Space</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>
<bal-content space="normal">
  <bal-label>Normal Space</bal-label>
  <bal-text>Content helps to align text nodes inside a section.</bal-text>
</bal-content>`,
      components: [],
    }),
    Space.args,
    {},
  ),
  controls: { exclude: excludedControls },
}
