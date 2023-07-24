import docs from './bal-tooltip.docs.mdx'
import { BalTooltip, BalButton } from '../../../../.storybook/vue/generated/components'
import { BalComponentStory } from '../../../stories/utils/story'

const component = BalComponentStory({
  title: 'Components/Tooltip',
  component: BalTooltip,
  subcomponents: { BalButton },
  docs,
})

export default component.story

export const Basic = args => ({
  components: { ...component.components },
  setup: () => {
    return {
      args,
    }
  },
  template: `
<div>
  <bal-button id="my-tooltip">Hover over me</bal-button>
  <bal-tooltip v-bind="args" id="my-tooltip" label="tooltip Label" reference="my-tooltip">Tooltip content</bal-tooltip>
</div>
`,
})
Basic.args = {
  label: 'Tooltip Label',
  arrow: true,
}
Basic.parameters = {
  ...component.sourceCode(Basic),
  controls: { exclude: [] },
}
