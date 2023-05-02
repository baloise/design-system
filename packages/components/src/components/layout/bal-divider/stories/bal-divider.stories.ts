import docs from './bal-divider.docs.mdx'
import { BalComponentStory, sourceCode } from '../../../../stories/utils'
import { BalDivider, BalStack, BalText } from '../../../../../.storybook/vue/generated/components'

const component = BalComponentStory({
  title: 'Components/Layout/Divider',
  component: BalDivider,
  subcomponents: { BalStack, BalText },
  docs,
  argTypes: {},
  args: {},
})

export default component.story

const excludedControls = []

const Template = args => ({
  components: { ...component.components },
  setup: () => ({ args }),
  template: `<bal-divider></bal-divider>`,
})

export const Basic = Template.bind({})
Basic.args = {}
Basic.parameters = { ...component.sourceCode(Basic), controls: { exclude: excludedControls } }

export const Layout = args => ({
  components: {
    ...component.components,
  },
  setup: () => ({ args }),
  template: `<bal-stack>
  <bal-text>Left</bal-text>
  <bal-divider layout="vertical" color="primary"></bal-divider>
  <bal-text>Right</bal-text>
</bal-stack>`,
})
Layout.args = {}
Layout.parameters = {
  ...sourceCode(
    () => ({
      template: `<bal-stack>
      <bal-text>Left</bal-text>
      <bal-divider layout="vertical" color="primary"></bal-divider>
      <bal-text>Right</bal-text>
    </bal-stack>`,
      components: [],
    }),
    Layout.args,
    {},
  ),
  controls: { exclude: excludedControls },
}
